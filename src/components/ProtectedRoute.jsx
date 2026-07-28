import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

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

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}