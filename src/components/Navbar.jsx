import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const links = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'الأسعار', path: '/pricing' },
    { name: 'تواصل معنا', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? 'bg-surface/80 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <Link to="/" className="group flex items-center gap-2 text-2xl font-black text-textMain hover:scale-105 transition-transform duration-300">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-electric-cyan to-electric-green"></span>
          </span>
          مساند<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">بوت</span>
        </Link>

        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`relative group py-2 font-semibold transition-colors duration-300 ${
                isActive(link.path) ? 'text-textMain' : 'text-textMuted hover:text-electric-green'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 right-0 h-0.5 bg-electric-green transition-all duration-300 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden md:inline-flex relative group items-center justify-center px-6 py-2.5 font-bold text-textMain bg-surface border-2 border-slate-200 rounded-xl overflow-hidden transition-all hover:border-transparent hover:shadow-glow">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric-cyan to-electric-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
            <span className="relative flex items-center gap-2 group-hover:text-slate-900 transition-colors duration-300">
              تسجيل الدخول
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
              </svg>
            </span>
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors" aria-label="القائمة">
            <svg className="w-6 h-6 text-textMain" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
      </div>

      <div className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
        mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-surface/95 backdrop-blur-md border-t border-slate-100 shadow-lg">
          <div className="px-6 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-electric-cyan/10 text-electric-cyan'
                    : 'text-textMuted hover:bg-slate-50 hover:text-textMain'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-4 py-3 rounded-xl font-bold text-center bg-gradient-to-r from-electric-cyan to-electric-green text-slate-900 mt-3"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}