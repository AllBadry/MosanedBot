import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // إخفاء الصفحة فوراً عند النقر على الرابط
    setIsVisible(false);
    
    // تأخير أجزاء من الثانية لضمان نعومة الانتقال
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); 

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-[800ms] ease-out transform ${
        isVisible 
          ? 'opacity-100 scale-100'        // حالة الاستقرار: وضوح كامل وحجم طبيعي
          : 'opacity-0 scale-[0.98]'       // حالة البداية: شفاف ومصغر بنسبة 2% فقط
      }`}
    >
      {children}
    </div>
  );
}