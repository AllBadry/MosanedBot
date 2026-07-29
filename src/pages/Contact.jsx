import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef(null);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. حركة تنفس الإضاءة الخلفية
      gsap.to(".bg-orb", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline();

      // 2. ظهور الترويسة (العنوان والوصف)
      tl.fromTo(".header-element",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
      )
      
      // 3. انزلاق بطاقة معلومات عبور من اليمين (x: 50)
      .fromTo(".contact-info-card",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3" // تبدأ قبل أن ينتهي العنوان
      )

      // 4. انزلاق بطاقة نموذج المراسلة من اليسار (x: -50) في نفس اللحظة
      .fromTo(".contact-form-card",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "<" // علامة "<" تعني: ابدأ هذا الأنيميشن في نفس اللحظة مع الأنيميشن الذي قبله
      )

      // 5. ظهور عناصر التواصل (الهاتف، الإيميل، السوشيال) بالتتابع
      .fromTo(".contact-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )

      // 6. ظهور حقول نموذج المراسلة
      .fromTo(".contact-form-card input, .contact-form-card textarea, .contact-form-card button",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "<"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-36 pb-24 relative overflow-hidden">
      
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="bg-orb absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="bg-orb absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* الترويسة الرئيسية */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="header-element opacity-0 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface shadow-soft border border-slate-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-electric-cyan absolute"></span>
            <span className="text-sm font-bold text-slate-700 ml-2">نحن هنا لخدمتك</span>
          </div>
          
          <h1 className="header-element opacity-0 text-4xl md:text-5xl font-extrabold text-textMain mb-6 leading-tight">
            دعنا نتحدث عن <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">مستقبل متجرك</span>
          </h1>
          <p className="header-element opacity-0 text-lg text-textMuted leading-relaxed max-w-2xl mx-auto">
            سواء كان لديك استفسار حول باقات "مساند بوت"، أو تحتاج إلى مساعدة تقنية، فريقنا التقني في <strong>شركة عبور</strong> جاهز للرد عليك في أسرع وقت.
          </p>
        </div>

        {/* شبكة التواصل */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* الجانب الأيمن: معلومات التواصل لشركة عبور */}
          <div className="space-y-8">
            <div className="contact-info-card opacity-0 bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="contact-item opacity-0 text-2xl font-bold text-textMain mb-6 relative z-10">
                الدعم الفني والتقني بواسطة <span className="text-transparent bg-clip-text bg-gradient-to-l from-electric-cyan to-electric-green">عبور</span>
              </h3>
              
              <div className="space-y-6 relative z-10">
                
                {/* رقم الهاتف */}
                <a href="tel:+962785290948" className="contact-item opacity-0 flex items-center gap-4 group/item hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover/item:text-electric-cyan group-hover/item:border-electric-cyan/30 group-hover/item:bg-electric-cyan/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div dir="ltr" className="text-lg font-bold text-slate-700 group-hover/item:text-electric-cyan transition-colors">
                    +962 785290948
                  </div>
                </a>

                {/* البريد الإلكتروني */}
                <a href="mailto:info@uboor.org" className="contact-item opacity-0 flex items-center gap-4 group/item hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover/item:text-electric-green group-hover/item:border-electric-green/30 group-hover/item:bg-electric-green/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="text-lg font-bold text-slate-700 group-hover/item:text-electric-green transition-colors">
                    info@uboor.org
                  </div>
                </a>

                {/* روابط السوشيال ميديا و جيت هب */}
                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <a href="https://www.facebook.com/UboorTech" target="_blank" rel="noopener noreferrer" className="contact-item opacity-0 flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 px-5 py-3 rounded-xl transition-colors group/social">
                    <svg className="w-5 h-5 text-slate-500 group-hover/social:text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-slate-600 group-hover/social:text-[#1877F2]">فيسبوك</span>
                  </a>

                  <a href="https://github.com/Uboor-Company" target="_blank" rel="noopener noreferrer" className="contact-item opacity-0 flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-800 hover:border-slate-800 px-5 py-3 rounded-xl transition-colors group/social">
                    <svg className="w-5 h-5 text-slate-500 group-hover/social:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-slate-600 group-hover/social:text-white">GitHub</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* الجانب الأيسر: نموذج المراسلة - عبور */}
          <div className="contact-form-card opacity-0 bg-surface/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-soft hover:shadow-glow transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">

              {status.text && (
                <div className={`px-5 py-3 rounded-xl text-sm font-bold text-center ${
                  status.type === 'success' ? 'bg-electric-green/10 text-electric-green border border-electric-green/20' : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {status.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-textMain font-bold focus:outline-none focus:border-electric-cyan focus:bg-white focus:ring-4 focus:ring-electric-cyan/10 transition-all placeholder-slate-400"
                  placeholder="الاسم الكريم"
                />
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-textMain font-bold focus:outline-none focus:border-electric-cyan focus:bg-white focus:ring-4 focus:ring-electric-cyan/10 transition-all placeholder-slate-400"
                  placeholder="بريدك الإلكتروني"
                />
              </div>

              <input
                type="text" name="subject" value={formData.subject} onChange={handleChange} required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-textMain font-bold focus:outline-none focus:border-electric-cyan focus:bg-white focus:ring-4 focus:ring-electric-cyan/10 transition-all placeholder-slate-400"
                placeholder="عنوان الرسالة"
              />

              <textarea
                name="message" value={formData.message} onChange={handleChange} required rows="5"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-textMain font-medium focus:outline-none focus:border-electric-cyan focus:bg-white focus:ring-4 focus:ring-electric-cyan/10 transition-all resize-none placeholder-slate-400"
                placeholder="اكتب رسالتك هنا..."
              ></textarea>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-textMain text-surface px-8 py-5 rounded-xl font-black text-xl hover:bg-electric-cyan hover:text-textMain transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                <span className={`${isSubmitting ? 'animate-pulse' : 'group-hover:-translate-x-1 transition-transform'}`}>
                  <SendIcon />
                </span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}