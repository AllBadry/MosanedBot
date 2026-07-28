import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation(); // استخراج مسار الصفحة الحالية

  useEffect(() => {
    // رفع الصفحة للأعلى عند كل تغيير في المسار
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // هذا المكون لا يعرض أي شيء على الشاشة
}