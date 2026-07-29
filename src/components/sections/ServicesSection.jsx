import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const codeScannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. أنيميشن الظهور المتتابع للبطاقات (Enterprise Reveal)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".service-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
      .fromTo(".bento-card",
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );

      // 2. أنيميشن مستمر لشات الذكاء الاصطناعي (محاكاة الكتابة)
      const chatTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      chatTl.fromTo(".typing-dot", 
        { y: 0, opacity: 0.4 }, 
        { y: -4, opacity: 1, duration: 0.3, stagger: 0.1, yoyo: true, repeat: 3 }
      )
      .to(".typing-indicator", { display: "none", duration: 0 })
      .fromTo(".ai-reply", 
        { opacity: 0, scale: 0.9, transformOrigin: "bottom left" }, 
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      )
      .to({}, { duration: 3 }) // انتظار 3 ثواني قبل إعادة الدورة
      .to(".ai-reply", { opacity: 0, scale: 0.9, duration: 0.2 })
      .to(".typing-indicator", { display: "flex", duration: 0 });

      // 3. أنيميشن ماسح ضوئي للكود (Code Scanner)
      gsap.to(codeScannerRef.current, {
        top: "100%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-background overflow-hidden z-10" dir="rtl">
      
      {/* خلفية تقنية ناعمة */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* =========================================
            1. الترويسة المؤسسية
        ========================================= */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="service-header inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-slate-200 shadow-sm mb-6">
            <svg className="w-4 h-4 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            <span className="text-sm font-bold text-slate-700 tracking-wide uppercase">المحرك التقني</span>
          </div>
          
          <h2 className="service-header text-4xl md:text-5xl lg:text-6xl font-black text-textMain mb-6 leading-[1.15] tracking-tight">
            بنية تحتية <span className="text-transparent bg-clip-text bg-gradient-to-l from-electric-cyan to-electric-green">لا تُقهر</span>
          </h2>
          <p className="service-header text-lg text-textMuted font-medium leading-relaxed">
            لم نكتفِ ببرمجة بوت دردشة عادي، بل صممنا نظاماً متكاملاً (Enterprise-grade) يضمن لك أقصى درجات الاستقرار، الدقة، والسرعة.
          </p>
        </div>
        
        {/* =========================================
            2. شبكة البينتو الرسمية (Enterprise Bento Grid)
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* البطاقة الأولى: الاسترجاع المعزز (RAG) */}
          <div className="bento-card group relative md:col-span-2 bg-surface rounded-[2rem] p-1 border border-slate-200/80 shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden">
            {/* توهج خلفي فاخر */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
            
            <div className="relative z-10 bg-surface rounded-[1.8rem] h-full p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-electric-green/10 flex items-center justify-center mb-6 border border-electric-green/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-textMain mb-4 tracking-tight">الاسترجاع المعزز (RAG)</h3>
                <p className="text-textMuted font-medium leading-relaxed">
                  وداعاً للهلوسة التقنية. محركنا يقرأ ويفهم بياناتك الخاصة فقط. كل إجابة يقدمها البوت لعملائك مبنية بدقة 100% على سياسات ومستندات متجرك.
                </p>
              </div>
              
              {/* واجهة محاكاة ذكية (Smart Chat Micro-UI) */}
              <div className="w-full md:w-[45%] bg-slate-50/80 rounded-2xl p-5 border border-slate-200 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex flex-col gap-4">
                  <div className="self-end bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-t-xl rounded-br-xl rounded-bl-sm shadow-sm w-[85%]">
                    هل يوجد ضمان على منتجاتكم؟
                  </div>
                  
                  <div className="self-start w-[90%] relative">
                    {/* مؤشر الكتابة */}
                    <div className="typing-indicator flex items-center gap-1 bg-electric-green/10 px-4 py-3 rounded-t-xl rounded-bl-xl rounded-br-sm w-fit border border-electric-green/20">
                      <div className="typing-dot w-2 h-2 rounded-full bg-electric-green"></div>
                      <div className="typing-dot w-2 h-2 rounded-full bg-electric-green"></div>
                      <div className="typing-dot w-2 h-2 rounded-full bg-electric-green"></div>
                    </div>
                    
                    {/* الرد اللحظي */}
                    <div className="ai-reply absolute top-0 right-0 bg-gradient-to-l from-electric-green to-teal-400 text-slate-900 font-bold text-sm px-4 py-2.5 rounded-t-xl rounded-bl-xl rounded-br-sm shadow-md opacity-0 flex gap-2 items-start">
                      <span className="text-base">✨</span>
                      <span>نعم، بناءً على سياسة الاسترجاع المحدثة، جميع المنتجات مشمولة بضمان لمدة عام كامل.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* البطاقة الثانية: سرعة الاستجابة (Latency) */}
          <div className="bento-card group relative md:col-span-1 bg-surface rounded-[2rem] p-1 border border-slate-200/80 shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
            
            <div className="relative z-10 bg-surface rounded-[1.8rem] h-full p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-electric-cyan/10 flex items-center justify-center mb-6 border border-electric-cyan/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-textMain mb-4 tracking-tight">سرعة البرق</h3>
                <p className="text-textMuted font-medium leading-relaxed mb-8">
                  بنية Edge Computing تضمن معالجة لحظية لآلاف الطلبات دون أي تأخير (Stateless Server).
                </p>
              </div>

              {/* عداد السرعة المؤسسي */}
              <div className="bg-slate-900 rounded-2xl p-6 text-center border border-slate-800 shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-cyan to-blue-500"></div>
                
                {/* رسم بياني وهمي بالخلفية */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex-1 bg-electric-cyan mx-[1px]" style={{ height: `${Math.random() * 100}%` }}></div>
                  ))}
                </div>

                <div className="relative z-10 text-electric-cyan font-black text-4xl mb-1 flex justify-center items-baseline gap-1" dir="ltr">
                  <span className="font-mono">~120</span> <span className="text-sm font-bold text-slate-500">ms</span>
                </div>
                <div className="relative z-10 text-slate-400 text-xs font-bold uppercase tracking-widest">Global Latency</div>
              </div>
            </div>
          </div>

          {/* البطاقة الثالثة: كود الـ Widget الجاهز */}
          <div className="bento-card group relative md:col-span-3 bg-surface rounded-[2rem] p-1 border border-slate-200/80 shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
            
            <div className="relative z-10 bg-surface rounded-[1.8rem] h-full flex flex-col md:flex-row overflow-hidden">
              
              <div className="p-8 md:w-5/12 flex flex-col justify-center border-b md:border-b-0 md:border-l border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 border border-electric-yellow/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-electric-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="text-2xl font-black text-textMain mb-4 tracking-tight">تضمين برمجي سلس</h3>
                <p className="text-textMuted font-medium leading-relaxed mb-8">
                  لا تعقيدات، لا حاجة لمطور. انسخ سطر الكود البرمجي (Snippet) وضعه في موقعك، وسيبدأ البوت بالعمل فوراً.
                </p>
                <button className="self-start text-sm font-bold text-textMain bg-surface border-2 border-slate-200 hover:border-electric-yellow hover:bg-slate-50 px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2">
                  <span>قراءة الوثائق</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>

              {/* محاكي محرر الأكواد (Code Editor Micro-UI) */}
              <div className="bg-[#0f172a] md:w-7/12 p-6 md:p-10 relative group-hover:bg-[#1e293b] transition-colors duration-500">
                
                {/* خط الماسح الضوئي */}
                <div ref={codeScannerRef} className="absolute left-0 w-full h-[2px] bg-electric-yellow shadow-[0_0_15px_#FFA900] z-20 pointer-events-none"></div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  </div>
                  <div className="text-slate-500 text-xs font-mono">index.html</div>
                </div>
                
                <pre className="text-sm md:text-base font-mono leading-loose overflow-x-auto" dir="ltr">
                  <code>
                    <span className="text-slate-400">&lt;!-- 1. Include Mosaned Script --&gt;</span>
                    <br/>
                    <span className="text-pink-400">&lt;script</span> <span className="text-green-300">src</span>=<span className="text-yellow-200">"https://cdn.mosaned.com/v1/widget.js"</span><span className="text-pink-400">&gt;&lt;/script&gt;</span>
                    <br/>
                    <br/>
                    <span className="text-slate-400">&lt;!-- 2. Initialize the Bot --&gt;</span>
                    <br/>
                    <span className="text-pink-400">&lt;script&gt;</span>
                    <br/>
                    {'  '}MosanedAPI.<span className="text-electric-cyan">init</span>(&#123;
                    <br/>
                    {'    '}clientKey: <span className="text-yellow-200">"mk_live_83js9df..."</span>,
                    <br/>
                    {'    '}theme: <span className="text-yellow-200">"dark"</span>,
                    <br/>
                    {'    '}position: <span className="text-yellow-200">"bottom-right"</span>
                    <br/>
                    {'  '}&#125;);
                    <br/>
                    <span className="text-pink-400">&lt;/script&gt;</span>
                  </code>
                </pre>
                
                {/* زر النسخ الوهمي */}
                <div className="absolute top-8 right-8 w-11 h-11 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition-all border border-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}