import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const rightTubeRef = useRef(null);
  const leftTubeRef = useRef(null);

  const mosanedLetters = "MOSANED".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. الدخول الدرامي للأنابيب العضوية
      tl.fromTo(".organic-tube",
        { scale: 0.3, opacity: 0, rotation: 45 },
        { scale: 1, opacity: 0.85, rotation: 0, duration: 1.8, stagger: 0.2, ease: "back.out(1.2)" }
      );

      // 2. دخول حروف MOSANED
      tl.fromTo(".char",
        { opacity: 0, y: 80, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.08, ease: "back.out(1.7)" },
        "-=1.2"
      );

      // 3. دخول كلمة BOT والوهج الخاص بها
      tl.fromTo(".bot-word",
        { opacity: 0, scale: 0.5, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      // 4. دخول باقي العناصر
      tl.fromTo([".hero-subtitle", ".hero-btn"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
      );

      // =========================================
      // أنيميشن الحياة المستمرة (محسن للأداء)
      // =========================================
      
      gsap.to(rightTubeRef.current, { y: -25, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(leftTubeRef.current, { y: 25, rotation: -5, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      
      gsap.to(".bot-glow", { opacity: 0.4, scale: 1.1, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // =========================================
      // تأثير الماوس فائق السرعة (GSAP quickTo)
      // =========================================
      
      // إعداد دوال سريعة جداً لمعالجة الإحداثيات دون إرهاق المتصفح
      const xToRight = gsap.quickTo(rightTubeRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const yToRight = gsap.quickTo(rightTubeRef.current, "y", { duration: 0.8, ease: "power3.out" });
      
      const xToLeft = gsap.quickTo(leftTubeRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const yToLeft = gsap.quickTo(leftTubeRef.current, "y", { duration: 0.8, ease: "power3.out" });

      const handleMouseMove = (e) => {
        // حساب قوة الإزاحة
        const xPos = (e.clientX / window.innerWidth - 0.5) * 40; 
        const yPos = (e.clientY / window.innerHeight - 0.5) * 40;

        // تطبيق القيم فوراً دون إنشاء توينز (Tweens) جديدة
        xToRight(xPos); 
        yToRight(yPos);
        xToLeft(-xPos); 
        yToLeft(-yPos);
      };

      // ربط الحدث بالـ window خارج دورة حياة React لضمان أقصى سرعة
      window.addEventListener("mousemove", handleMouseMove);

      // تنظيف الحدث عند تدمير المكون
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full min-h-screen bg-background overflow-hidden flex flex-col justify-between items-center pt-28 pb-16 px-6" 
      dir="ltr"
      style={{ perspective: '1000px' }} 
    >
      
      {/* =========================================
          الأنابيب العضوية الخلفية (مدعومة بالـ GPU)
      ========================================= */}
      
      {/* الأنبوب الأيمن */}
      {/* تم إضافة will-change-transform و transform-gpu لتسريع الأداء */}
      <div 
        ref={rightTubeRef} 
        className="organic-tube absolute -top-10 -right-20 w-[400px] h-[500px] lg:w-[600px] lg:h-[700px] pointer-events-none z-0 will-change-transform transform-gpu"
      >
        {/* تمت إزالة drop-shadow-2xl لأنها تسبب تقطيع (Lag) شديد عند الحركة المستمرة */}
        <svg viewBox="0 0 500 600" fill="none" className="w-full h-full">
          <path
            d="M400 50C300 150 450 300 300 400C150 500 50 400 100 550"
            stroke="url(#rightGrad)"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />   
              <stop offset="50%" stopColor="#00FF81" />  
              <stop offset="100%" stopColor="#FFA900" /> 
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* الأنبوب الأيسر */}
      <div 
        ref={leftTubeRef} 
        className="organic-tube absolute -bottom-20 -left-20 w-[400px] h-[500px] lg:w-[600px] lg:h-[700px] pointer-events-none z-0 will-change-transform transform-gpu"
      >
        <svg viewBox="0 0 500 600" fill="none" className="w-full h-full">
          <path
            d="M50 100C150 200 50 350 200 450C350 550 450 400 400 550"
            stroke="url(#leftGrad)"
            strokeWidth="110"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="leftGrad" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF6800" />   
              <stop offset="50%" stopColor="#FFA900" />  
              <stop offset="100%" stopColor="#00F0FF" /> 
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* غطاء لوني */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none z-0"></div>

      {/* =========================================
          المحتوى الرئيسي في المنتصف 
      ========================================= */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto my-auto">
        
        <h1 className="flex flex-wrap justify-center items-center text-[5.5rem] sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6">
          
          <div className="flex text-textMain mr-4 lg:mr-8">
            {mosanedLetters.map((char, index) => (
              <span key={index} className="char inline-block will-change-transform transform-gpu" style={{ transformOrigin: "50% 50% -50px" }}>
                {char}
              </span>
            ))}
          </div>

          <div className="bot-word relative inline-block">
            {/* تمت إضافة transform-gpu للوهج لتخفيف الضغط عن الـ CPU */}
            <span className="bot-glow absolute inset-0 bg-gradient-to-r from-electric-cyan to-electric-orange blur-2xl opacity-20 rounded-full mix-blend-multiply will-change-transform transform-gpu"></span>
            
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-electric-green to-electric-orange">
              BOT
            </span>
          </div>

        </h1>

        <p className="hero-subtitle text-base sm:text-lg text-textMuted font-semibold tracking-wide uppercase mb-10 max-w-xl px-4" dir="rtl">
          أضف الذكاء الاصطناعي الفوري إلى متجرك وأعمالك بكل سهولة وسرعة
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link to="/login" className="hero-btn px-8 py-3.5 rounded-full bg-textMain text-surface font-bold text-base hover:bg-electric-cyan hover:text-textMain hover:scale-105 transition-all duration-300 shadow-soft will-change-transform">
            أنشئ بوتك الآن
          </Link>
          
          <Link to="/services" className="hero-btn px-8 py-3.5 rounded-full bg-surface border-2 border-slate-200 text-textMain font-bold text-base hover:border-electric-orange hover:shadow-soft transition-all duration-300 will-change-transform">
            تصفح الخدمات
          </Link>
        </div>

      </div>

    </section>
  );
}