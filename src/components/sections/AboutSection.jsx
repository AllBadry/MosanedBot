import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. أنيميشن الدخول الرسمي
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".about-text-fade",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
      .fromTo(".stat-box",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(".arch-node",
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" },
        "-=0.6"
      );

      // 2. أنيميشن تدفق البيانات (خطوط الـ SVG)
      gsap.fromTo(".data-line-path",
        { strokeDasharray: 300, strokeDashoffset: 300 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // حزم البيانات المتحركة باستمرار (مدعومة بالـ GPU لعدم التقطيع)
      gsap.to(".data-packet", {
        strokeDashoffset: -50,
        duration: 1.5,
        repeat: -1,
        ease: "linear",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // تقليل pt-32 إلى pt-12 لتقريب المحتوى من الهيرو، مع الحفاظ على pb-32 من الأسفل
    <section ref={sectionRef} className="relative pt-12 pb-32 bg-background overflow-hidden z-10" dir="rtl">
      
      {/* =========================================
          الشبكة الهندسية مع تأثير التلاشي العلوي
      ========================================= */}
      <div 
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:64px_64px] -z-10"
        style={{ 
          // هذا السطر السحري يجعل الشبكة شفافة في أعلى 15% وتظهر تدريجياً لدمجها مع الهيرو
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mt-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* =========================================
              الجانب الأيمن: النص المؤسسي 
          ========================================= */}
          <div>
            <div className="about-text-fade inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-slate-200 shadow-sm mb-8">
              {/* نقطة تنبض بلونك الخاص */}
              <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse"></div>
              <span className="text-sm font-bold text-slate-700 tracking-wide uppercase">بنية تحتية موثوقة</span>
            </div>
            
            <h2 className="about-text-fade text-4xl md:text-5xl lg:text-6xl font-black text-textMain mb-6 leading-[1.15] tracking-tight">
              قوة الذكاء الاصطناعي، <br/>
              بمرونة <span className="text-transparent bg-clip-text bg-gradient-to-l from-electric-cyan to-electric-green">الشركات الكبرى.</span>
            </h2>
            
            <div className="about-text-fade space-y-5 text-lg text-textMuted font-medium leading-relaxed mb-12">
              <p>
                تم بناء <strong>مساند (Mosaned)</strong> ليكون أكثر من مجرد أداة دردشة. إنه محرك واجهة برمجة تطبيقات (API) متطور يندمج بسلاسة في قلب عملياتك التجارية.
              </p>
              <p>
                نحن نوفر لك تحكماً مركزياً، أماناً فائقاً لبياناتك، ومعالجة لحظية تضمن بقاء عملائك على اتصال دائم بعلامتك التجارية، دون أي حاجة لتعقيدات البنية التحتية.
              </p>
            </div>

            {/* إحصائيات بستايل الـ Dashboard المكتبي */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-8">
              

              <div className="stat-box border-r border-slate-200/60 pr-4">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-textMain">٩٩.٩</span>
                  <span className="text-lg font-bold text-electric-green">%</span>
                </div>
                <div className="text-sm text-slate-500 font-semibold">استقرار الخوادم</div>
              </div>

              <div className="stat-box border-r border-slate-200/60 pr-4">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-textMain">٢٠٠</span>
                  <span className="text-lg font-bold text-electric-orange">ms</span>
                </div>
                <div className="text-sm text-slate-500 font-semibold">زمن الاستجابة</div>
              </div>
            </div>
          </div>

          {/* =========================================
              الجانب الأيسر: المعمارية الهندسية بألوانك
          ========================================= */}
          <div className="relative h-[450px] lg:h-[550px] flex items-center justify-center mt-10 lg:mt-0 w-full">
            
            {/* خطوط الاتصال (SVG Data Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lineGradCyan" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00FF81" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="lineGradOrange" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFA900" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF6800" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* الخط العلوي */}
              <path className="data-line-path will-change-transform transform-gpu" d="M 250 250 L 250 100 L 100 100" fill="none" stroke="url(#lineGradCyan)" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" />
              <path className="data-packet will-change-transform transform-gpu" d="M 250 250 L 250 100 L 100 100" fill="none" stroke="#00F0FF" strokeWidth="4" strokeDasharray="15 300" strokeLinecap="round" />

              {/* الخط السفلي الأيمن */}
              <path className="data-line-path will-change-transform transform-gpu" d="M 250 250 L 400 250 L 400 380" fill="none" stroke="url(#lineGradCyan)" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" />
              <path className="data-packet will-change-transform transform-gpu" d="M 250 250 L 400 250 L 400 380" fill="none" stroke="#00FF81" strokeWidth="4" strokeDasharray="15 300" strokeLinecap="round" />

              {/* الخط السفلي الأيسر */}
              <path className="data-line-path will-change-transform transform-gpu" d="M 250 250 L 100 250 L 100 400" fill="none" stroke="url(#lineGradOrange)" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" />
              <path className="data-packet will-change-transform transform-gpu" d="M 250 250 L 100 250 L 100 400" fill="none" stroke="#FFA900" strokeWidth="4" strokeDasharray="15 300" strokeLinecap="round" />
            </svg>

            {/* --- العُقد (Nodes) بلمسات Electric --- */}
            
            {/* العقدة المركزية */}
            <div className="arch-node absolute z-20 w-48 p-6 bg-surface border border-slate-200 shadow-xl rounded-2xl flex flex-col items-center justify-center transform-gpu hover:shadow-glow hover:border-electric-cyan/50 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <svg className="w-6 h-6 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="text-lg font-black text-textMain tracking-wide">MOSANED API</div>
              <div className="text-xs text-electric-cyan font-bold mt-1">المركز الرئيسي</div>
            </div>

            {/* العقدة العلوية */}
            <div className="arch-node absolute top-[50px] left-[20px] lg:left-[50px] z-10 w-36 p-4 bg-surface border border-slate-200 shadow-soft rounded-xl flex flex-col items-center transform-gpu hover:border-electric-cyan/40 transition-colors">
              <div className="w-8 h-8 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-2 text-electric-cyan">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <div className="text-sm font-bold text-textMain">المتجر الإلكتروني</div>
            </div>

            {/* العقدة السفلية اليمنى */}
            <div className="arch-node absolute bottom-[20px] right-[20px] lg:right-[50px] z-10 w-36 p-4 bg-surface border border-slate-200 shadow-soft rounded-xl flex flex-col items-center transform-gpu hover:border-electric-green/40 transition-colors">
              <div className="w-8 h-8 bg-electric-green/10 rounded-lg flex items-center justify-center mb-2 text-electric-green">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div className="text-sm font-bold text-textMain">قنوات الواتساب</div>
            </div>

            {/* العقدة السفلية اليسرى */}
            <div className="arch-node absolute bottom-[50px] left-[20px] lg:left-[50px] z-10 w-36 p-4 bg-surface border border-slate-200 shadow-soft rounded-xl flex flex-col items-center transform-gpu hover:border-electric-yellow/40 transition-colors">
              <div className="w-8 h-8 bg-electric-yellow/10 rounded-lg flex items-center justify-center mb-2 text-electric-yellow">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="text-sm font-bold text-textMain">إدارة المعرفة</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}