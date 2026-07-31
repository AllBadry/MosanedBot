import API_BASE_URL from '../config/api';

let refreshPromise = null;

// تحديث access token عبر الـ httpOnly cookie — مرة واحدة في نفس الوقت
async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(API_BASE_URL + '/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          return data.accessToken;
        }
        return null;
      })
      .catch(() => null)
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}

function handleSessionExpired() {
  localStorage.removeItem('accessToken');
  const current = window.location.pathname + window.location.search;
  const target = current && current !== '/login' ? `/login?redirect=${encodeURIComponent(current)}` : '/login';
  if (window.location.pathname !== '/login') {
    window.location.href = target;
  }
}

// fetch موحّد: يضيف Authorization تلقائياً، ويعيد المحاولة بعد تجديد التوكن عند 401،
// وعند فشل التجديد يحذف الجلسة ويحوّل إلى صفحة الدخول.
// auth: false للاستدعاءات العامة (login/signup/contact...) دون إضافة توكن أو إعادة توجيه.
export async function apiFetch(path, options = {}) {
  const { auth = true, ...fetchOptions } = options;
  const token = localStorage.getItem('accessToken');

  const headers = new Headers(fetchOptions.headers || {});
  if (auth && token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const doFetch = (authToken) =>
    fetch(API_BASE_URL + path, {
      ...fetchOptions,
      credentials: fetchOptions.credentials || 'include',
      headers: authToken
        ? new Headers({ ...Object.fromEntries(headers), Authorization: `Bearer ${authToken}` })
        : headers,
    });

  let res = await doFetch(null);

  if (auth && res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await doFetch(newToken);
    } else {
      handleSessionExpired();
      const err = new Error('SESSION_EXPIRED');
      err.isSessionExpired = true;
      throw err;
    }
  }

  return res;
}
