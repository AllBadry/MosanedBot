import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-200 selection:text-slate-900" dir="rtl">
      
      {/* 
        ================= Header =================
        نفس التنسيق المعتمد لحل مشكلة الناف بار (pt-32)
      */}
      <header className="bg-[#0f172a] text-white pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">شروط الاستخدام</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">
            تنظم هذه الشروط العلاقة بينك وبين منصة "مساند". نرجو قراءتها بعناية.
          </p>
          <div className="inline-block mt-6 px-4 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full">
            <p className="text-slate-300 text-sm font-medium">
              تاريخ التفعيل: <span className="text-[#00F0FF]">{new Date().toLocaleDateString('ar-EG')}</span>
            </p>
          </div>
        </div>
      </header>

      {/* 
        ================= Content ================= 
      */}
      <main className="max-w-4xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 relative -mt-8 z-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 space-y-12 leading-relaxed">
          
          {/* القبول */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              1. قبول الشروط
            </h2>
            <p className="text-slate-600 text-lg">
              باستخدامك لمنصة <strong>"مساند"</strong> أو تضمين المساعد الذكي <span dir="ltr">(Widget)</span> في موقعك، فإنك توافق بشكل كامل على هذه الشروط. إذا كنت لا توافق على أي جزء منها، يُرجى التوقف عن استخدام خدماتنا فوراً.
            </p>
          </section>

          {/* التزامات العميل */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              2. التزامات صاحب الحساب (المستخدم)
            </h2>
            <p className="text-slate-600 mb-4 text-lg">بصفتك مستخدماً لمنصتنا، فإنك تتعهد بالآتي:</p>
            <ul className="space-y-3 text-slate-600 list-none pr-2">
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                <span>استخدام كود التضمين <span dir="ltr">(Script)</span> الخاص بالبوت <strong>فقط</strong> في النطاقات <span dir="ltr">(Domains)</span> التي تملكها أو المصرح لك باستخدامها.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                <span>الحفاظ على سرية معلومات الدخول لحسابك، وتحمل المسؤولية الكاملة عن أي نشاط يتم من خلاله.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                <span>عدم استخدام المساعد الذكي في أي أنشطة غير قانونية، احتيالية، أو ضارة بالغير.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                <span>عدم محاولة اختراق، فك تشفير، أو الهندسة العكسية لأي جزء من منصة مساند أو الـ <span dir="ltr">API</span> الخاص بها.</span>
              </li>
            </ul>
          </section>

          {/* حدود الذكاء الاصطناعي (الأهم قانونياً) */}
          <section className="bg-yellow-50/80 p-8 rounded-3xl border border-yellow-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400"></div>
            <h2 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> إخلاء مسؤولية الذكاء الاصطناعي
            </h2>
            <p className="text-yellow-800 leading-relaxed mb-3">
              يعتمد "مساند" على تقنيات الذكاء الاصطناعي التوليدي. على الرغم من سعينا لتقديم ردود دقيقة بناءً على البيانات التي تقوم أنت بتزويدها للبوت، إلا أن <strong>الذكاء الاصطناعي قد يُنتج أحياناً ردوداً غير دقيقة، غير مكتملة، أو غير مناسبة (ما يُعرف بالهلوسة).</strong>
            </p>
            <p className="text-yellow-800 leading-relaxed font-bold">
              أنت تقر وتوافق على أن منصة "مساند" لا تتحمل أي مسؤولية قانونية أو مالية تجاهك أو تجاه عملائك نتيجة لأي خطأ، وعد، أو معلومة خاطئة يقدمها المساعد الذكي. تقع مسؤولية مراجعة المحادثات وتصحيح مسارها على عاتقك كلياً.
            </p>
          </section>

          {/* الاشتراكات والاستخدام العادل */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              3. الاشتراكات والاستخدام العادل
            </h2>
            <p className="text-slate-600 text-lg mb-3">
              تخضع خدماتنا لحدود استهلاك (عدد الجلسات وحجم قاعدة المعرفة) بناءً على الباقة المختارة.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 pr-4">
              <li>نحتفظ بالحق في إيقاف الخدمة أو تقييدها فوراً في حال تجاوز الحد المسموح به للباقة دون ترقية.</li>
              <li>أي محاولة لعمل <span dir="ltr">(Spam)</span> أو إرسال طلبات وهمية للـ <span dir="ltr">API</span> بغرض استنزاف موارد النظام ستؤدي إلى الحظر الفوري دون استرجاع للأموال.</li>
            </ul>
          </section>

          {/* الملكية الفكرية */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              4. حقوق الملكية الفكرية
            </h2>
            <p className="text-slate-600 text-lg">
              جميع حقوق الملكية الفكرية المرتبطة بمنصة "مساند" (بما في ذلك الأكواد البرمجية، التصاميم، الواجهات، والخوارزميات) هي ملكية حصرية لنا. نمنحك رخصة محدودة، غير قابلة للتحويل، لاستخدام المساعد الذكي على موقعك طوال فترة اشتراكك الفعال.
            </p>
          </section>

          {/* التعديلات */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              5. تعديل الشروط
            </h2>
            <p className="text-slate-600 text-lg">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار في لوحة التحكم. استمرار استخدامك للخدمة بعد التحديث يُعد قبولاً بالشروط الجديدة.
            </p>
          </section>

        </div>

        {/* زر العودة */}
        <div className="text-center mt-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors">
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}