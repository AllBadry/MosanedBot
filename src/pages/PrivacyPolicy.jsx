import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-200 selection:text-slate-900" dir="rtl">
      
      {/* 
        ================= Header =================
        تم إضافة pt-32 (Padding Top) لكي تنزل الصفحة تحت الناف بار الثابت
        تم إضافة تأثيرات لونية رسمية وأنيقة 
      */}
      <header className="bg-[#0f172a] text-white pt-32 pb-20 text-center relative overflow-hidden">
        {/* إضاءة خلفية ناعمة لتناسب ثيم الذكاء الاصطناعي */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">سياسة الخصوصية</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">
            الشفافية والأمان هما أساس الثقة. تعرف على كيف نحمي بياناتك وبيانات عملائك.
          </p>
          <div className="inline-block mt-6 px-4 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full">
            <p className="text-slate-300 text-sm font-medium">
              تاريخ آخر تحديث: <span className="text-[#00F0FF]">{new Date().toLocaleDateString('ar-EG')}</span>
            </p>
          </div>
        </div>
      </header>

      {/* 
        ================= Content ================= 
        تم رفع المحتوى قليلاً للأعلى (-mt-10) ليعطي تداخلاً احترافياً مع الهيدر الداكن
      */}
      <main className="max-w-4xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 relative -mt-8 z-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 space-y-12 leading-relaxed">
          
          {/* المقدمة */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              1. مقدمة
            </h2>
            <p className="text-slate-600 text-lg">
              مرحباً بك في منصة <strong>مساند</strong>. تشرح سياسة الخصوصية هذه كيف نقوم بجمع، استخدام، وحماية بياناتك الشخصية وبيانات زوار موقعك عند استخدامك لخدماتنا والمساعد الذكي (Widget). نحن نلتزم بأعلى معايير الأمان التقنية والقانونية لضمان سرية معلوماتك.
            </p>
          </section>

          {/* البيانات التي نجمعها */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              2. البيانات التي نجمعها
            </h2>
            <p className="text-slate-600 mb-5 text-lg">نقوم بجمع نوعين رئيسيين من البيانات لضمان تشغيل الخدمة بكفاءة:</p>
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">أ. بيانات أصحاب الحسابات:</h3>
                <p className="text-slate-600">عند التسجيل، نجمع اسمك وبريدك الإلكتروني بغرض إنشاء الحساب، تأمين الدخول، وإرسال إشعارات التوثيق أو التحديثات الهامة المتعلقة بالخدمة.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">ب. البيانات التقنية والأمنية:</h3>
                <p className="text-slate-600">نجمع النطاق (Domain) الخاص بموقعك الإلكتروني كإجراء أمني؛ للتأكد من أن المساعد الذكي يعمل فقط على موقعك المصرح له، ولمنع أي استخدام غير مصرح به لمواردك.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">ج. بيانات المحادثات (لزوار موقعك):</h3>
                <p className="text-slate-600">نقوم بحفظ نصوص المحادثات التي تتم بين زوار موقعك والمساعد الذكي. تُجمع هذه البيانات <em>حصرياً</em> لتمكينك كصاحب موقع من مراجعتها في لوحة التحكم وتحسين جودة دعمك الفني.</p>
              </div>
            </div>
          </section>

          {/* دورنا ودور العميل (البند الأهم قانونياً) */}
          <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              المسؤولية القانونية (مهم)
            </h2>
            <p className="text-blue-800 leading-relaxed">
              قانونياً، تعتبر منصة <strong>"مساند"</strong> بمثابة <span className="font-bold">معالج البيانات (Data Processor)</span> لمحادثات زوارك، في حين تُعتبر <strong>أنت (صاحب الموقع)</strong> <span className="font-bold">المتحكم في البيانات (Data Controller)</span>. هذا يعني أنك المسؤول الأول عن إعلام زوار موقعك ضمن سياسة خصوصيتك بأنك تستخدم مساعداً ذكياً يقوم بمعالجة وحفظ المحادثات.
            </p>
          </section>

          {/* كيف نستخدم البيانات */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              3. كيف نستخدم البيانات؟
            </h2>
            <p className="text-slate-600 mb-4 text-lg">نحن لا نبيع بياناتك مطلقاً. نقتصر في استخدامها على:</p>
            <ul className="space-y-3 text-slate-600 list-none pr-2">
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                تقديم الخدمة وتشغيل المساعد الذكي على موقعك الإلكتروني.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                معالجة النصوص عبر نماذج الذكاء الاصطناعي لتوليد ردود سريعة ودقيقة.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold mt-1">✓</span>
                تمكينك من متابعة أداء البوت وتحليل محادثات عملائك من خلال لوحة التحكم.
              </li>
            </ul>
          </section>

          {/* حماية البيانات */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              4. حماية البيانات وأمنها
            </h2>
            <p className="text-slate-600 text-lg">
              نتخذ تدابير أمنية تقنية وتنظيمية متقدمة لحماية بياناتك من الوصول غير المصرح به. تشمل هذه التدابير تشفير كلمات المرور، استخدام بروتوكولات الاتصال الآمن (HTTPS)، وتخزين البيانات في خوادم سحابية محمية بأنظمة جدار حماية (Firewalls) خاضعة للمراقبة المستمرة.
            </p>
          </section>

          {/* حقوق المستخدم */}
          <section className="group">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[#00F0FF] group-hover:scale-y-110 transition-transform"></span>
              5. حقوقك كصاحب حساب
            </h2>
            <p className="text-slate-600 mb-4 text-lg">بصفتك مستخدماً لمنصتنا، يحق لك في أي وقت:</p>
            <ul className="space-y-3 text-slate-600 list-none pr-2">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold mt-1">•</span>
                الوصول إلى بياناتك الشخصية وتعديلها من خلال إعدادات الحساب.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold mt-1">•</span>
                الاطلاع على سجلات محادثات زوارك بالكامل.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold mt-1">•</span>
                طلب حذف حسابك وكافة البيانات (والمحادثات) المرتبطة به نهائياً من خوادمنا.
              </li>
            </ul>
          </section>

          {/* تواصل معنا */}
          <section className="mt-12 bg-slate-900 text-white p-8 md:p-10 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00F0FF]/20 blur-2xl rounded-full"></div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">6. تواصل معنا</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">
              إذا كانت لديك أي استفسارات قانونية أو تقنية حول سياسة الخصوصية، يسعدنا تواصلك معنا مباشرة.
            </p>
            <a href="mailto:info@mosaned.org" className="relative z-10 inline-flex items-center gap-2 bg-[#00F0FF] text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              مراسلة الدعم: info@mosaned.org
            </a>
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