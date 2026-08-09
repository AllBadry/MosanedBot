import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenExpired } from '../utils/tokenUtils';

export default function ProtectedRoute() {
  const location = useLocation();

  // 🚀 1. فحص الرابط أولاً: إذا كان قادماً من جوجل/جيت هب ويحمل توكن، نحفظه فوراً
  const searchParams = new URLSearchParams(location.search);
  const urlToken = searchParams.get('token');

  if (urlToken) {
    localStorage.setItem('accessToken', urlToken);
    // تنظيف الرابط من التوكن لأسباب أمنية ولجمالية الموقع
    window.history.replaceState({}, document.title, location.pathname);
  }

  // 2. الآن يمكن للحارس فحص الـ LocalStorage بأمان
  const token = localStorage.getItem('accessToken');

  // 🚀 3. التوكن موجود لكنه منتهي الصلاحية → نعيد توجيهه لتسجيل الدخول فوراً
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}