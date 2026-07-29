import API_BASE_URL from '../config/api';

async function refreshAccessToken() {
  try {
    const res = await fetch(API_BASE_URL + '/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok && data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    }
  } catch { /* ignore */ }
  return null;
}

export async function fetchCurrentUser() {
  let token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const response = await fetch(API_BASE_URL + '/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      token = await refreshAccessToken();
      if (!token) return null;
      const retry = await fetch(API_BASE_URL + '/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const retryData = await retry.json();
      if (retry.ok && retryData.status === 'success' && retryData.data?.user) {
        return retryData.data.user;
      }
      return null;
    }

    const data = await response.json();
    if (response.ok && data.status === 'success' && data.data?.user) {
      return data.data.user;
    }
  } catch (err) {
    console.error('فشل جلب بيانات المستخدم', err);
  }

  return null;
}
