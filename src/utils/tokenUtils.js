// التحقق من صلاحية التوكن محلياً عبر حقل انتهاء الصلاحية (exp) في JWT
// دون استدعاء السيرفر — يمنع اعتبار التوكن المنتهي جلسة صالحة
export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true; // ليس JWT صالحاً → نعتبره منتهياً
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload.exp) return true;
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // أي فشل في الفك → توكن غير صالح
  }
}
