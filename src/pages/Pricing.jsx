import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Pricing() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".title-word", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" }
      )
      .fromTo(glowRef.current,
        { scale: 0.5, opacity: 1 },
        { scale: 2.5, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.1"
      )
      .fromTo(highlightRef.current,
        { opacity: 0, y: -40, scale: 1.1 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.5"
      )
      .fromTo(".animate-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-36 pb-24 relative overflow-hidden" dir="rtl">
      
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-electric-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* =========================================
            الترويسة الرئيسية 
        ========================================= */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="animate-up opacity-0 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface shadow-soft border border-slate-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-electric-orange animate-pulse"></span>
            <span className="text-sm font-bold text-slate-700">استثمارك الذكي</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-textMain mb-6 leading-tight flex flex-wrap justify-center gap-2 md:gap-3">
            <span className="title-word opacity-0 block">خطط</span>
            <span className="title-word opacity-0 block">أسعار</span>
            <span className="relative block">
              <span ref={glowRef} className="absolute inset-0 bg-gradient-to-r from-electric-cyan to-electric-green blur-xl rounded-full opacity-0 pointer-events-none"></span>
              <span ref={highlightRef} className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green opacity-0 inline-block pb-2">
                مرنة وواضحة
              </span>
            </span>
          </h1>
          
          <p className="animate-up opacity-0 text-lg text-textMuted leading-relaxed">
            ميزات متقدمة تناسب كافة أحجام الأعمال. يمكنك ربط البوت بعدد غير محدود من المتاجر في جميع الخطط، والدفع يتم بناءً على استهلاك الجلسات والمميزات.
          </p>
        </div>
        
        {/* =========================================
            شبكة الأسعار (3 خطط)
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-24">
          
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
                <span><span className="text-slate-800 font-bold">8,000 جلسة محادثة</span> (وجلسات إضافية بسعر رمزي جداً)</span>
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

        {/* =========================================
            قسم الأسئلة الشائعة
        ========================================= */}
        <div className="animate-up opacity-0 max-w-3xl mx-auto border-t border-slate-200 pt-16">
          <h3 className="text-2xl font-bold text-center text-textMain mb-10">الأسئلة الشائعة حول الأسعار</h3>
          
          <div className="space-y-6">
            <div className="bg-surface p-6 rounded-2xl border border-slate-200">
              <h4 className="text-lg font-bold text-textMain mb-2">ما المقصود بـ "جلسة المحادثة" (Session) وهل يمكنني ربط البوت بعدة متاجر؟</h4>
              <p className="text-textMuted text-sm leading-relaxed">
                جلسة المحادثة هي تفاعل مستمر بين زائر واحد والبوت الخاص بك خلال مدة 24 ساعة، مهما بلغ عدد الرسائل فيها. كما <strong>يُمكنك في جميع الخطط (بما فيها المجانية) ربط البوت بأي عدد تريده من المتاجر</strong>، وسيتم خصم الجلسات من رصيد باقتك الأساسي المجمع.
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-2xl border border-slate-200">
              <h4 className="text-lg font-bold text-textMain mb-2">كيف يُحسب الدعم الفني، ومن يحصل على دعم VIP؟</h4>
              <p className="text-textMuted text-sm leading-relaxed">
                الدعم الفني الأساسي للتدخل في الحالات الطارئة والقصوى متوفر لجميع المستخدمين في كافة الخطط. أما <strong>دعم الـ VIP</strong> المخصص للاستشارات الفنية المتقدمة وأولوية الردود والتدخل المباشر، فهو ميزة حصرية لمشتركي "الخطة الخارقة" (25 د.أ).
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-2xl border border-slate-200">
              <h4 className="text-lg font-bold text-textMain mb-2">ماذا يحدث إذا تجاوزت 15,000 جلسة في الخطة الخارقة؟</h4>
              <p className="text-textMuted text-sm leading-relaxed">
                نحن ندرك أن الأعمال الكبيرة تحتاج مرونة فائقة؛ لذلك لن تتوقف الخدمة أبداً. إذا تجاوزت الحد الأقصى في خطة الـ 25 دينار، سنوفر لك جلسات إضافية لامحدودة، وسيتم محاسبتك عليها لاحقاً <strong>بسعر رمزي جداً</strong> (Pay-as-you-go) لضمان استمرارية عملك بأقل تكلفة ممكنة.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}