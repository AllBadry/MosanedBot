import { useState, useEffect } from 'react';
import axios from 'axios';

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default function Support() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });
    try {
      await axios.post('/api/v1/contact/send', formData);
      setStatus({ type: 'success', text: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.response?.data?.message || 'فشل إرسال الرسالة، حاول مرة أخرى' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "كيف أقوم بتركيب البوت على موقعي؟",
      a: "ببساطة انسخ كود التضمين (Script) من لوحة التحكم والصقه قبل إغلاق وسم </body> في موقعك، وسيعمل فوراً."
    },
    {
      q: "هل أحتاج لمعرفة بالبرمجة لتدريب الذكاء الاصطناعي؟",
      a: "إطلاقاً! يمكنك تدريب البوت عبر إعطائه نصوصاً، أو روابط صفحات موقعك، وسيتعلم منها تلقائياً وبسهولة تامة."
    },
    {
      q: "ماذا لو تجاوزت الحد المسموح من المحادثات؟",
      a: "سيستمر البوت في العمل لضمان عدم انقطاع الخدمة عن عملائك، ولكن سيصلك تنبيه لترقية باقتك للشهر التالي."
    },
    {
      q: "هل يمكنني تخصيص شكل البوت ليناسب هويتي البصرية؟",
      a: "نعم بالتأكيد! يمكنك تغيير الألوان، شكل الأيقونة، نمط الفقاعة، ورسالة الترحيب من قسم 'تخصيص الودجت' في لوحة التحكم."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // ==========================================
  // محرك الحركات الخفيف (بدون أي مكتبات خارجية)
  // ==========================================
  useEffect(() => {
    // الأسئلة الشائعة تُشغَّل بـ CSS animation وليس observer (تجنباً لاختفائها عند re-render)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // فقط العناصر غير FAQ تُراقَب (الرقم والفورم)
    document.querySelectorAll('.scroll-reveal:not(.faq-card)').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-300 font-sans selection:bg-[#00F0FF] selection:text-slate-900 relative overflow-hidden" dir="rtl">
      
      <style>{`
        @keyframes faqFadeIn {
          from { opacity: 0; transform: translateY(1.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .faq-card {
          animation: faqFadeIn 0.5s ease-out both;
        }
      `}</style>
      
      {/* إضاءات المعرض */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="pt-32 pb-16 text-center relative z-10 px-4 scroll-reveal opacity-0 translate-y-12 transition-transform duration-700 md:duration-1000 ease-out">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
          كيف يمكننا <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#00F0FF] to-blue-500">مساعدتك؟</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          نحن هنا لضمان تجربة سلسة لك ولعملائك. استكشف الأسئلة الشائعة أو تواصل معنا مباشرة.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10 space-y-32">
        
        {/* ================= القسم الأول: الأسئلة الشائعة ================= */}
        <section>
          <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-12 transition-transform duration-500 md:duration-700 ease-out">
            <h2 className="text-3xl font-bold text-white mb-2">الأسئلة الشائعة</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                onClick={() => toggleFaq(index)}
                style={{ animationDelay: `${index * 150}ms` }}
                className={`faq-card group cursor-pointer rounded-2xl border overflow-hidden ${
                  activeFaq === index 
                    ? 'bg-white/10 border-[#00F0FF]/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className={`font-bold text-lg transition-colors duration-300 ${activeFaq === index ? 'text-[#00F0FF]' : 'text-white'}`}>
                      {faq.q}
                    </h3>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ${activeFaq === index ? 'rotate-180 bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-slate-400'}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div>
                      <p className="text-slate-400 leading-relaxed pr-2 border-r-2 border-[#00F0FF]/50">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= القسم الثاني: المنحوتة الفنية (رقم التواصل) ================= */}
        <section className="relative py-12 text-center group scroll-reveal opacity-0 translate-y-12 transition-transform duration-700 md:duration-1000 ease-out delay-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F0FF]/5 to-transparent blur-lg group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <h2 className="text-xl text-slate-400 mb-4 tracking-widest uppercase">الدعم الفني المباشر</h2>
            <a href="tel:+962785290948" className="inline-block" dir="ltr">
              <div className="text-5xl md:text-7xl font-black text-white hover:text-[#00F0FF] transition-colors duration-300 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] tracking-wider">
                +962 785 290 948
              </div>
            </a>
            <p className="mt-6 text-slate-500">متاحون للرد على استفساراتكم من 9 صباحاً حتى 6 مساءً</p>
          </div>
        </section>

        {/* ================= القسم الثالث: لوحة التواصل (الفورم الزجاجي) ================= */}
        <section className="max-w-3xl mx-auto scroll-reveal opacity-0 translate-y-12 transition-transform duration-700 md:duration-1000 ease-out">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">أرسل لنا رسالة</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>

          <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative">
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00F0FF]/30 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500/30 rounded-bl-3xl"></div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">

              {status.text && (
                <div className={`px-5 py-3 rounded-xl text-sm font-bold text-center ${
                  status.type === 'success' ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20' : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {status.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-[#00F0FF] focus:bg-white/10 focus:ring-4 focus:ring-[#00F0FF]/10 transition-all placeholder-slate-500"
                  placeholder="الاسم الكريم"
                />
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required dir="ltr"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-[#00F0FF] focus:bg-white/10 focus:ring-4 focus:ring-[#00F0FF]/10 transition-all placeholder-slate-500"
                  placeholder="بريدك الإلكتروني"
                />
              </div>

              <input
                type="text" name="subject" value={formData.subject} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-[#00F0FF] focus:bg-white/10 focus:ring-4 focus:ring-[#00F0FF]/10 transition-all placeholder-slate-500"
                placeholder="عنوان الرسالة"
              />

              <textarea
                name="message" value={formData.message} onChange={handleChange} required rows="5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:outline-none focus:border-[#00F0FF] focus:bg-white/10 focus:ring-4 focus:ring-[#00F0FF]/10 transition-all resize-none placeholder-slate-500"
                placeholder="اكتب رسالتك هنا..."
              ></textarea>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-xl font-black text-xl hover:bg-[#00F0FF] hover:text-slate-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                <span className={`${isSubmitting ? 'animate-pulse' : 'group-hover:-translate-x-1 transition-transform'}`}>
                  <SendIcon />
                </span>
              </button>

            </form>
          </div>
        </section>

      </main>
    </div>
  );
}