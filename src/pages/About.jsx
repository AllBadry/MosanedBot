import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  // تقسيم العنوان لكلمات لعمل دخول فخم (Word-by-word reveal)
  const titleWords = "نحن نبني العقل الرقمي لمؤسستك".split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // =========================================
      // 1. الدخول الفخم للنص عند تحميل الصفحة (Hero Reveal)
      // =========================================
      const heroTl = gsap.timeline();
      
      heroTl.fromTo(".badge-reveal", 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
      )
      .fromTo(".word-reveal",
        { opacity: 0, y: 50, rotationX: -50 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".desc-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

      // =========================================
      // 2. تأثير الغرق في الفضاء (Immersive Parallax Scrub)
      // =========================================
      // كلما نزل المستخدم، ترتفع الأجرام المضيئة بسرعات مختلفة لتعطي عمقاً (3D)
      gsap.to(".parallax-bg-fast", {
        y: -500,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5 // الحركة ناعمة وتتبع الماوس
        }
      });

      gsap.to(".parallax-bg-slow", {
        y: -200,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // =========================================
      // 3. ظهور الكروت أثناء التمرير (Scroll Reveal)
      // =========================================
      const cards = gsap.utils.toArray('.scroll-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // يبدأ الظهور عندما يلمس الكرت أسفل الشاشة
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // أنيميشن نقل البيانات المستمر
      gsap.to(".data-particle", {
        strokeDashoffset: -100,
        duration: 2,
        repeat: -1,
        ease: "linear"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden" dir="rtl">
      
      {/* =========================================
          طبقات العمق البصري (The AI Space Depth Layers)
      ========================================= */}
      {/* شبكة الفضاء (تتحرك ببطء شديد) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:64px_64px] fixed z-0"
           style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' }}>
      </div>

      {/* أجرام مضيئة (تتحرك بسرعة لتعطي شعور الغوص) */}
      <div className="parallax-bg-fast absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-electric-cyan/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="parallax-bg-slow absolute top-[60%] left-[5%] w-[500px] h-[500px] bg-electric-green/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="parallax-bg-fast absolute top-[110%] right-[20%] w-[300px] h-[300px] bg-electric-orange/10 rounded-full blur-[90px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* =========================================
            1. الترويسة الرئيسية (Hero Text)
        ========================================= */}
        <div className="text-center max-w-4xl mx-auto mb-32" style={{ perspective: '1000px' }}>
          <div className="badge-reveal inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-surface border border-slate-200 shadow-sm mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-cyan"></span>
            </span>
            <span className="text-sm font-bold text-slate-700 tracking-wider uppercase">من نحن</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-textMain mb-8 leading-[1.2] tracking-tight flex flex-wrap justify-center gap-x-4 gap-y-2">
            {titleWords.map((word, i) => (
              <span key={i} className="word-reveal inline-block">
                {/* تلوين كلمة العقل الرقمي */}
                {word === "العقل" || word === "الرقمي" ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-electric-cyan to-electric-green">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>
          
          <p className="desc-reveal text-xl text-textMuted font-medium max-w-2xl mx-auto leading-relaxed bg-surface/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
            <strong className="text-slate-900">مساند (Mosaned)</strong> ليس مجرد بوت دردشة تقليدي. نحن نوفر <span className="text-electric-cyan font-bold">بنية تحتية (API)</span> ونظام استرجاع معزز (RAG) يربط بيانات مؤسستك بنماذج الذكاء الاصطناعي العالمية، ليخلق مساعداً ذكياً يفهم عملائك بدقة متناهية.
          </p>
        </div>

        {/* =========================================
            2. قصة التأسيس (الكرت ينبثق من العمق)
        ========================================= */}
        <div className="scroll-card group relative bg-surface/80 backdrop-blur-lg rounded-[2.5rem] p-1 border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:shadow-glow hover:border-electric-cyan/30 mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 via-transparent to-electric-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10 bg-surface/90 rounded-[2.4rem] p-8 md:p-14 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-md mb-4 border border-slate-200">الشركة الأم</div>
              <h2 className="text-3xl lg:text-4xl font-black text-textMain mb-6">
                انطلاقتنا من <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-600">شركة عبور</span>
              </h2>
              <p className="text-lg text-textMuted leading-relaxed mb-8 font-medium">
                وُلدت منصة <strong className="text-slate-800">مساند</strong> كذراع متخصصة للذكاء الاصطناعي من رحم <strong>شركة عبور</strong>. استندنا إلى بنيتهم التحتية القوية لتقديم حلول رقمية موثوقة، بهدف واحد: سد الفجوة بين الشركات وتكنولوجيا الـ AI المعقدة، وتقديمها في قالب برمجي (Widget/API) جاهز للاستخدام الفوري.
              </p>
              <a 
                href="https://uboor.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-surface bg-textMain hover:bg-electric-cyan hover:text-textMain px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-glow group/btn"
              >
                <span>استكشف شركة عبور</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:rotate-180 transform group-hover/btn:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </a>
            </div>

            {/* التمثيل البصري لنقل التكنولوجيا */}
            <div className="w-full lg:w-[40%] flex justify-center items-center h-64 relative">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
                <path d="M 50 100 Q 200 100 350 100" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5 5" />
                <path className="data-particle" d="M 50 100 Q 200 100 350 100" fill="none" stroke="url(#flowGrad)" strokeWidth="4" strokeDasharray="20 100" strokeLinecap="round" />
                <defs>
                  <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#00FF81" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute left-4 lg:left-0 w-24 h-24 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center justify-center z-10">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-1">
                  <span className="font-black text-slate-400 text-xl">U</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Uboor</span>
              </div>

              <div className="absolute right-4 lg:right-0 w-32 h-32 flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-electric-cyan rounded-full blur-lg opacity-20 animate-pulse"></div>
                <div className="w-full h-full bg-slate-900 rounded-full flex flex-col items-center justify-center border-4 border-electric-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.2)] relative overflow-hidden">
                  <svg className="w-10 h-10 text-electric-cyan relative z-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-xs font-bold text-white relative z-10 tracking-wider">MOSANED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            3. المبادئ الهندسية (الشبكة)
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="scroll-card group bg-surface rounded-[2rem] p-8 border border-slate-200/80 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-electric-cyan/10 flex items-center justify-center mb-6 border border-electric-cyan/20 group-hover:bg-electric-cyan group-hover:text-slate-900 transition-colors duration-300 text-electric-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h3 className="text-xl font-black text-textMain mb-4">بنية لامركزية</h3>
            <p className="text-textMuted font-medium leading-relaxed">
              نظامنا لا يعتمد على واجهة واحدة، بل يوفر (API) يمكنك ربطها بمتجرك، الواتساب، أو تطبيقاتك الخاصة بمرونة تامة.
            </p>
          </div>

          <div className="scroll-card group bg-surface rounded-[2rem] p-8 border border-slate-200/80 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-electric-green/10 flex items-center justify-center mb-6 border border-electric-green/20 group-hover:bg-electric-green group-hover:text-slate-900 transition-colors duration-300 text-electric-green">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="text-xl font-black text-textMain mb-4">دقة (RAG)</h3>
            <p className="text-textMuted font-medium leading-relaxed">
              نمنع "الهلوسة" تماماً. روبوتك سيستمد إجاباته حصرياً من ملفات (PDF/Text) أو قواعد البيانات التي تقوم برفعها.
            </p>
          </div>

          <div className="scroll-card group bg-surface rounded-[2rem] p-8 border border-slate-200/80 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-electric-orange/10 flex items-center justify-center mb-6 border border-electric-orange/20 group-hover:bg-electric-orange group-hover:text-slate-900 transition-colors duration-300 text-electric-orange">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl font-black text-textMain mb-4">عزل البيانات</h3>
            <p className="text-textMuted font-medium leading-relaxed">
              تشفير متقدم (AES) يضمن أن بيانات مؤسستك لا تتداخل مع بيانات عملاء آخرين، ولا تُستخدم لتدريب النماذج العامة.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}