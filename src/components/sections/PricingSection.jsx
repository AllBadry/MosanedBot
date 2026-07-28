import { Link } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";


export default function PricingSection() {
  useEffect(() => {
  gsap.fromTo(
    ".animate-up",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    }
  );
}, []);
  return (
    <section className="relative py-24 bg-background overflow-hidden z-10 min-h-screen pt-36">
      
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-electric-cyan/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-electric-green/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* الترويسة */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface shadow-soft border border-slate-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-electric-orange animate-pulse"></span>
            <span className="text-sm font-bold text-slate-700">استثمارك الذكي</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-textMain mb-6">
            خطط أسعار <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">مرنة وواضحة</span>
          </h2>
          <p className="text-lg text-textMuted leading-relaxed">
            اختر الخطة التي تناسب حجم أعمالك. يمكنك الترقية أو الإلغاء في أي وقت بدون أي رسوم خفية.
          </p>
        </div>
        
        {/* شبكة الأسعار (3 خطط) */}
        {/* =========================================
            شبكة الأسعار (3 خطط)
        ========================================= */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-24">
          
          {/* 1. الخطة المجانية */}
          <div className="animate-up opacity-0 bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-glow hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            
            <h3 className="text-2xl font-bold text-textMain mb-2 relative z-10">المجانية</h3>
            <p className="text-textMuted mb-6 text-sm relative z-10">للتجربة والمشاريع الناشئة.</p>
            
            <div className="text-5xl font-black text-textMain mb-8 relative z-10">
              0 <span className="text-lg font-medium text-textMuted">د.أ / شهرياً</span>
            </div>
            
            <ul className="text-textMuted space-y-4 mb-10 flex-1 relative z-10 text-sm font-medium">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span><span className="text-slate-700 font-bold">100 جلسة محادثة</span> شهرياً</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>دعم الـ RAG (بحد أقصى 3 صفحات للملف)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>10 قواعد معرفة كحد أقصى</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>حرية تخصيص الألوان (ضمن أشكال محددة)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400/70">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                لا تشمل الوصول للـ API
              </li>
            </ul>
            
            <Link to="/register" className="relative z-10 w-full flex justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-colors duration-300">
              ابدأ مجاناً
            </Link>
          </div>

          {/* 2. الخطة الأساسية (10 دنانير) */}
          <div className="animate-up opacity-0 relative bg-surface/90 backdrop-blur-xl p-10 rounded-3xl border-2 border-electric-green shadow-glow md:-translate-y-4 hover:-translate-y-6 transition-all duration-300 flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-green/5 to-transparent pointer-events-none rounded-3xl"></div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-electric-cyan to-electric-green text-slate-900 px-6 py-1.5 rounded-full text-sm font-black shadow-lg w-max">
              الخطة المفضلة 🚀
            </div>
            
            <h3 className="text-2xl font-bold text-textMain mb-2 relative z-10">الأساسية</h3>
            <p className="text-textMuted mb-6 text-sm relative z-10">للمتاجر النشطة التي تحتاج مرونة برمجية.</p>
            
            <div className="text-5xl font-black text-textMain mb-8 relative z-10">
              10 <span className="text-lg font-medium text-textMuted">د.أ / شهرياً</span>
            </div>
            
            <ul className="text-textMain font-medium space-y-4 mb-10 flex-1 relative z-10 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-green mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span><span className="text-electric-green font-bold">1,500 جلسة محادثة</span> شهرياً</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-green mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>دعم الـ RAG المتقدم (حتى 200MB للملف)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-green mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>50 قاعدة معرفة كحد أقصى</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-green mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>وصول كامل للـ API (لتغيير الستايل والبرمجة من طرفكم)</span>
              </li>
            </ul>
            
            <Link to="/register" className="relative z-10 w-full flex justify-center bg-gradient-to-r from-electric-cyan to-electric-green hover:shadow-lg hover:scale-[1.02] text-slate-900 font-bold py-4 rounded-2xl transition-all duration-300">
              اشترك في الأساسية
            </Link>
          </div>

          {/* 3. الخطة الخارقة (25 دينار) */}
          <div className="animate-up opacity-0 bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-glow hover:-translate-y-2 hover:border-electric-yellow/50 transition-all duration-300 flex flex-col h-full relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            
            <h3 className="text-2xl font-bold text-textMain mb-2 relative z-10">الخارقة</h3>
            <p className="text-textMuted mb-6 text-sm relative z-10">للمؤسسات والكيانات ذات الكثافة العالية.</p>
            
            <div className="text-5xl font-black text-textMain mb-8 relative z-10">
              25 <span className="text-lg font-medium text-textMuted">د.أ / شهرياً</span>
            </div>
            
            <ul className="text-textMuted space-y-4 mb-10 flex-1 relative z-10 text-sm font-medium">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-yellow mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span><span className="text-slate-800 font-bold">15,000 جلسة محادثة</span> (وجلسات إضافية بسعر رمزي جداً)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-yellow mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>عدد <span className="font-bold text-slate-800">غير محدود</span> من قواعد المعرفة</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-yellow mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>إنشاء أكثر من بوت (Bot) وتخصيص كل واحد بشكل مستقل</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-yellow mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>محلل بيانات متقدم (Data Analyst) داخل لوحة التحكم</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-electric-yellow mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>خدمات ودعم VIP حصري للمؤسسات</span>
              </li>
            </ul>
            
            <Link to="/register" className="relative z-10 w-full flex justify-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-2xl transition-colors duration-300">
              اشترك في الخارقة
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}