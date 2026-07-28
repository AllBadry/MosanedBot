import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل إضافة التمرير
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. حركة تنفس بطيئة جداً للإضاءة الخلفية (Floating Orbs)
      gsap.to(".bg-orb", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. أنيميشن الدخول للترويسة (يعمل فور فتح الصفحة)
      gsap.fromTo(".header-element",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // 3. أنيميشن شبكة البينتو الرئيسية (يعمل عند التمرير)
      gsap.fromTo(".bento-card",
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%", // تبدأ الحركة عندما يصل أعلى الشبكة إلى 80% من الشاشة
          },
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.2)" 
        }
      );

      // 4. التفاصيل الدقيقة: واجهة الـ RAG المصغرة (تظهر كأنها تتركب)
      gsap.fromTo(".rag-ui-box",
        { opacity: 0, x: 30, scale: 0.9 },
        {
          scrollTrigger: { trigger: ".rag-container", start: "top 85%" },
          opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.5)"
        }
      );

      // 5. التفاصيل الدقيقة: كود البرمجة (يظهر سطراً بسطر)
      gsap.fromTo(".code-line",
        { opacity: 0, x: -20 },
        {
          scrollTrigger: { trigger: ".code-container", start: "top 85%" },
          opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out"
        }
      );

      // 6. شبكة المميزات السفلية (الكروت الصغيرة)
      gsap.fromTo(".feature-card",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: ".features-grid", start: "top 85%" },
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out"
        }
      );

    }, containerRef);

    return () => ctx.revert(); // تنظيف الذاكرة عند الخروج من الصفحة
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-36 pb-24 relative overflow-hidden">
      
      {/* تأثيرات الإضاءة الخلفية (تم إضافة كلاس bg-orb لها) */}
      <div className="bg-orb absolute top-10 left-0 w-[600px] h-[600px] bg-electric-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="bg-orb absolute bottom-10 right-0 w-[600px] h-[600px] bg-electric-green/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. الترويسة الرئيسية */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="header-element opacity-0 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface shadow-soft border border-slate-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-electric-green animate-pulse"></span>
            <span className="text-sm font-bold text-slate-700">قدرات لا محدودة</span>
          </div>
          
          <h1 className="header-element opacity-0 text-4xl md:text-5xl font-extrabold text-textMain mb-6 leading-tight">
            كل ما تحتاجه لبناء <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">مساعدك الذكي</span>
          </h1>
          <p className="header-element opacity-0 text-lg text-textMuted leading-relaxed">
            من لوحة تحكم شاملة إلى خيارات ربط برمجية متقدمة، صممنا "مساند بوت" ليكون الأداة الأقوى والأكثر مرونة لخدمة عملائك.
          </p>
        </div>

        {/* 2. شبكة المميزات (Bento Grid) */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* الميزة 1: تغذية البيانات (RAG) */}
          <div className="bento-card opacity-0 group md:col-span-2 bg-surface/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-200 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-electric-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-textMain mb-4">قاعدة معرفة ديناميكية (RAG)</h3>
                <p className="text-textMuted leading-relaxed mb-4">
                  زود البوت بمعلومات شركتك بكل سهولة! يمكنك إنشاء مقاطع نصية منظمة بعناوين ولصق التفاصيل الدقيقة تحتها، أو حتى رفع ملفات كاملة. 
                </p>
                <p className="text-textMuted leading-relaxed">
                  سيقوم الذكاء الاصطناعي بقراءة هذه البيانات، فهمها بعمق، والرجوع إليها حصرياً لاستخراج إجابات دقيقة وموثوقة لعملائك دون أي تأليف.
                </p>
              </div>
              
              {/* واجهة مصغرة توضيحية */}
              <div className="rag-container w-full md:w-2/5 bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-inner group-hover:scale-[1.02] transition-transform duration-500 flex flex-col gap-3">
                <div className="rag-ui-box opacity-0 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="text-xs font-bold text-electric-cyan mb-1">عنوان السياق:</div>
                  <div className="text-sm text-slate-700 font-medium">أسعار التوصيل الدولي</div>
                </div>
                <div className="rag-ui-box opacity-0 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex-1">
                  <div className="text-xs font-bold text-slate-400 mb-1">المحتوى:</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    التوصيل لدول الخليج يكلف 15 دولار ويستغرق 3-5 أيام عمل. الشحن مجاني للطلبات فوق 100 دولار.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الميزة 2: بنية الـ Stateless */}
          <div className="bento-card opacity-0 group md:col-span-1 bg-surface/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-200 shadow-soft hover:shadow-glow hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-electric-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-14 h-14 rounded-2xl bg-electric-green/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-textMain mb-4 relative z-10">هندسة متطورة للجلسات</h3>
            <p className="text-textMuted leading-relaxed relative z-10">
              لتوفير أقصى سرعة وأقل استهلاك للموارد، يعمل البوت بنظام <strong>الاحتفاظ بالسياق لدى العميل (Stateless)</strong>. 
            </p>
            <p className="text-textMuted leading-relaxed mt-2 relative z-10">
              تتم إدارة جلسة المحادثة وتاريخها في متصفح الزائر نفسه، مما يضمن استجابة لحظية للخوادم وعدم تأثر متجرك بالضغط.
            </p>
          </div>

          {/* الميزة 3: خيارات الربط والتضمين */}
          <div className="bento-card opacity-0 group md:col-span-2 bg-surface/80 backdrop-blur-xl rounded-3xl p-0 border border-slate-200 shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden flex flex-col md:flex-row">
            
            <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-electric-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-textMain mb-4">مرونة فائقة في الربط (API)</h3>
              <p className="text-textMuted leading-relaxed">
                <strong>لأصحاب المتاجر:</strong> انسخ كود HTML جاهز وضعه في موقعك ليعمل الشات بواجهة متكاملة فوراً.
              </p>
              <p className="text-textMuted leading-relaxed mt-2">
                <strong>للمطورين:</strong> نوفر لك رابط API نظيف لتتمكن من بناء واجهة المحادثة برمجياً لتناسب تصميم تطبيقك.
              </p>
            </div>

            {/* تمثيل بصري للكود (تم تقسيمه لأسطر لعمل تأثير الكتابة) */}
            <div className="code-container md:w-1/2 bg-slate-900 p-8 flex flex-col justify-center relative group-hover:bg-slate-800 transition-colors duration-500">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-mono flex flex-col gap-1" dir="ltr">
                <div className="code-line opacity-0"><span className="text-slate-500">// 1. HTML Widget Option</span></div>
                <div className="code-line opacity-0 mb-3"><span className="text-pink-400">&lt;script</span> <span className="text-green-300">src</span>=<span className="text-yellow-200">"..."</span><span className="text-pink-400">&gt;&lt;/script&gt;</span></div>
                <div className="code-line opacity-0"><span className="text-slate-500">// 2. API Endpoint Option</span></div>
                <div className="code-line opacity-0"><span className="text-electric-cyan">fetch</span>(<span className="text-yellow-200">'https://api.uboor.com/chat'</span>, &#123;</div>
                <div className="code-line opacity-0 ml-4">method: <span className="text-yellow-200">'POST'</span>,</div>
                <div className="code-line opacity-0 ml-4">body: <span className="text-electric-cyan">JSON</span>.stringify(&#123; msg &#125;)</div>
                <div className="code-line opacity-0">&#125;);</div>
              </div>
            </div>
          </div>

          {/* الميزة 4: الأسئلة الجاهزة */}
          <div className="bento-card opacity-0 group md:col-span-1 bg-surface/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-soft hover:shadow-glow hover:-translate-y-2 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-textMain mb-4">الردود الثابتة السريعة</h3>
            <p className="text-textMuted leading-relaxed">
              وفّر وقت المعالجة! يمكنك تحديد أسئلة شائعة وربطها بإجابات ثابتة. سيتعرف البوت على القصد ويرسل الإجابة المحددة مسبقاً فوراً.
            </p>
          </div>

        </div>

        {/* 3. شبكة المميزات السفلية */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          <div className="feature-card opacity-0 group bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-electric-cyan/50 hover:shadow-md transition-all">
            <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-textMain mb-2 group-hover:text-electric-cyan transition-colors">تخصيص المظهر</h4>
              <p className="text-sm text-textMuted leading-relaxed">تغيير ألوان الواجهة والخطوط لتتطابق تماماً مع الهوية البصرية لمتجرك.</p>
            </div>
          </div>

          <div className="feature-card opacity-0 group bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-electric-green/50 hover:shadow-md transition-all">
            <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-textMain mb-2 group-hover:text-electric-green transition-colors">شخصية البوت</h4>
              <p className="text-sm text-textMuted leading-relaxed">تحكم في أسلوب الرد؛ رسمي، مرح، أو بإيموجي؟ أنت تضع قواعد الروبوت.</p>
            </div>
          </div>

          <div className="feature-card opacity-0 group bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-red-400/50 hover:shadow-md transition-all">
            <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-textMain mb-2 group-hover:text-red-400 transition-colors">حماية من الـ Spam</h4>
              <p className="text-sm text-textMuted leading-relaxed">يمنع البوت إرسال طلبات عشوائية وسريعة من نفس المستخدم لحماية باقتك.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}