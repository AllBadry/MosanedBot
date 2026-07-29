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

      tl.fromTo(".organic-tube",
        { scale: 0.3, opacity: 0, rotation: 45 },
        { scale: 1, opacity: 0.85, rotation: 0, duration: 1.8, stagger: 0.2, ease: "back.out(1.2)" }
      );

      tl.fromTo(".char",
        { opacity: 0, y: 80, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.08, ease: "back.out(1.7)" },
        "-=1.2"
      );

      tl.fromTo(".bot-word",
        { opacity: 0, scale: 0.5, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo([".hero-subtitle", ".hero-btn"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
      );

      tl.eventCallback("onComplete", () => {
        rightTubeRef.current?.classList.add('animate-float-right');
        leftTubeRef.current?.classList.add('animate-float-left');
      });
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
      <div
        ref={rightTubeRef}
        className="organic-tube absolute -top-10 -right-10 sm:-right-20 w-[180px] h-[260px] sm:w-[400px] sm:h-[500px] lg:w-[600px] lg:h-[700px] pointer-events-none z-0 will-change-transform transform-gpu">
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

      <div
        ref={leftTubeRef}
        className="organic-tube absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-[180px] h-[260px] sm:w-[400px] sm:h-[500px] lg:w-[600px] lg:h-[700px] pointer-events-none z-0 will-change-transform transform-gpu">
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

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto my-auto">

        <h1 className="flex flex-wrap justify-center items-center text-5xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6">

          <div className="flex text-textMain mr-4 lg:mr-8">
            {mosanedLetters.map((char, index) => (
              <span key={index} className="char inline-block will-change-transform transform-gpu" style={{ transformOrigin: "50% 50% -50px" }}>
                {char}
              </span>
            ))}
          </div>

          <div className="bot-word relative inline-block">
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

      <style>{`
        .animate-float-right {
          animation: floatRight 4s ease-in-out infinite;
        }
        .animate-float-left {
          animation: floatLeft 5s ease-in-out infinite;
        }
        @keyframes floatRight {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        @keyframes floatLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-5deg); }
        }
        .bot-glow {
          animation: glowPulse 2s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-right,
          .animate-float-left,
          .bot-glow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
