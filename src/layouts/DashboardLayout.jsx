import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: 'مستخدم', plan: 'free' });

  // جلب بيانات المستخدم من السيرفر (الخطة والاسم غير موجودين في JWT)
  useEffect(() => {
    const loadUser = async () => {
      const profile = await fetchCurrentUser();
      if (profile) {
        setUser({
          name: profile.name || 'مستخدم',
          plan: profile.plan || 'free',
        });
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  const isFreePlan = user.plan === 'free';

  // تحديد ألوان الباقة بناءً على الخطة
  const getPlanStyles = (plan) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'pro': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      default: return 'bg-slate-700 text-slate-300 border border-slate-600';
    }
  };

  const planNameArabic = user.plan === 'enterprise' ? 'خارقة (Enterprise)' : user.plan === 'pro' ? 'أساسية (Pro)' : 'مجانية (Free)';

  return (
    <div className="flex h-screen bg-background font-sans" dir="rtl">
      
      {/* =========================================
          القائمة الجانبية
      ========================================= */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-electric-cyan/10 to-transparent pointer-events-none"></div>

        {/* اللوجو */}
        <div className="p-8 text-3xl font-black border-b border-slate-800/80 flex items-center gap-3 relative z-10">
          <div className="relative">
            <img 
              src="http://localhost:5000/botimage2.jpg" 
              alt="بوت مساند" 
              className="w-12 h-12 rounded-xl object-cover border-2 border-electric-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] relative z-10" 
              onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
            />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-white to-slate-300 tracking-tight">
            مساند
          </span>
        </div>

        {/* روابط التصفح */}
        <nav className="flex-1 p-5 space-y-2 overflow-y-auto relative z-10 mt-4">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-3 w-full text-right p-3.5 rounded-xl font-bold transition-all duration-300 ${isActive('/dashboard') ? 'bg-electric-cyan text-slate-900 shadow-glow' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'}`}
          >
            <span className="text-lg">⚙️</span> إعدادات المساعد
          </Link>
          
          <Link 
            to="/dashboard/knowledge" 
            className={`flex items-center gap-3 w-full text-right p-3.5 rounded-xl font-bold transition-all duration-300 ${isActive('/dashboard/knowledge') ? 'bg-electric-cyan text-slate-900 shadow-glow' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'}`}
          >
            <span className="text-lg">🧠</span> قاعدة المعرفة (البيانات)
          </Link>

          <Link 
            to="/dashboard/history" 
            className={`flex items-center gap-3 w-full text-right p-3.5 rounded-xl font-bold transition-all duration-300 ${isActive('/dashboard/history') ? 'bg-electric-cyan text-slate-900 shadow-glow' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'}`}
          >
            <span className="text-lg">📩</span> سجل المحادثات
          </Link>

          {/* تبويب الـ API (مقفل للخطة المجانية) */}
          <div className="pt-4 mt-4 border-t border-slate-800/80">
            {isFreePlan ? (
              <div className="group relative flex items-center justify-between p-3.5 rounded-xl font-bold text-slate-500 bg-slate-900/50 border border-slate-800 cursor-not-allowed overflow-hidden">
                <div className="flex items-center gap-3 opacity-60">
                  <span className="text-lg">🔗</span> إعدادات API
                </div>
                <div className="flex items-center gap-1 bg-slate-800 text-xs px-2 py-1 rounded-md text-slate-400">
                  <span>🔒</span> مقفل
                </div>
                <div className="absolute inset-0 bg-slate-800 text-electric-yellow flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  رقي الباقة لفتح الـ API
                </div>
              </div>
            ) : (
              <Link 
                to="/dashboard/api" 
                className={`flex items-center gap-3 w-full text-right p-3.5 rounded-xl font-bold transition-all duration-300 ${isActive('/dashboard/api') ? 'bg-electric-cyan text-slate-900 shadow-glow' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white border border-transparent hover:border-slate-700'}`}
              >
                <span className="text-lg">🔗</span> إعدادات API
              </Link>
            )}
          </div>
        </nav>

        {/* بطاقة المستخدم */}
        <div className="p-4 mx-4 mb-6 bg-slate-900 rounded-2xl border border-slate-700/50 shadow-lg relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-cyan to-electric-green flex items-center justify-center text-slate-900 font-black text-lg shadow-inner">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm text-white truncate w-32">{user.name}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 inline-block ${getPlanStyles(user.plan)}`}>
                {planNameArabic}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="w-full bg-slate-800 text-slate-300 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 font-bold p-2.5 rounded-xl transition-all flex justify-center items-center gap-2 text-sm"
          >
            <span>🚪</span> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* مساحة العمل */}
      <main className="flex-1 overflow-y-auto relative p-8 lg:p-12">
        <Outlet /> 
      </main>
      
    </div>
  );
}