export async function fetchCurrentUser() {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const response = await fetch('http://localhost:5000/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (response.ok && data.status === 'success' && data.data?.user) {
      return data.data.user;
    }
  } catch (err) {
    console.error('فشل جلب بيانات المستخدم', err);
  }

  return null;
}
