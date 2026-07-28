import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  // حالة لمعرفة هل المستخدم قام بالتمرير للأسفل أم لا
  const [isScrolled, setIsScrolled] = useState(false);
  
  // لمعرفة مسار الصفحة الحالية وتمييز الرابط النشط
  const location = useLocation();

  // تفعيل تأثير التمرير (Scroll Effect)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // دالة بسيطة للتحقق من الرابط النشط
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-surface/80 backdrop-blur-md shadow-soft py-3' // شكل الناف بار عند التمرير للأسفل (تأثير زجاجي وتصغير)
          : 'bg-transparent py-6' // شكل الناف بار في أعلى الصفحة (شفاف وكبير)
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* 1. الشعار (Logo) مع نقطة نابضة وتدرج لوني */}
        <Link to="/" className="group flex items-center gap-2 text-2xl font-black text-textMain hover:scale-105 transition-transform duration-300">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-electric-cyan to-electric-green"></span>
          </span>
          مساند<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">بوت</span>
        </Link>

        {/* 2. روابط الصفحات مع أنيميشن التسطير الذكي */}
        <div className="hidden md:flex gap-8">
          {[
            { name: 'الرئيسية', path: '/' },
            { name: 'من نحن', path: '/about' },
            { name: 'خدماتنا', path: '/services' },
            { name: 'الأسعار', path: '/pricing' },
            { name: 'تواصل معنا', path: '/contact' }
          ].map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`relative group py-2 font-semibold transition-colors duration-300 ${
                isActive(link.path) ? 'text-textMain' : 'text-textMuted hover:text-electric-green'
              }`}
            >
              {link.name}
              
              {/* الخط السفلي المتحرك */}
              <span className={`absolute bottom-0 right-0 h-0.5 bg-electric-green transition-all duration-300 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        {/* 3. زر الدخول (Magic Hover Button) */}
        <div>
          <Link to="/login" className="relative group inline-flex items-center justify-center px-6 py-2.5 font-bold text-textMain bg-surface border-2 border-slate-200 rounded-xl overflow-hidden transition-all hover:border-transparent hover:shadow-glow">
            
            {/* الخلفية المتدرجة التي تظهر ببطء من الأسفل عند المرور */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric-cyan to-electric-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
            
            {/* محتوى الزر (النص والأيقونة) */}
            <span className="relative flex items-center gap-2 group-hover:text-slate-900 transition-colors duration-300">
              تسجيل الدخول
              {/* سهم يظهر ويتحرك للداخل عند المرور */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
              </svg>
            </span>
            
          </Link>
        </div>
        
      </div>
    </nav>
  );
}