import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const codeSnippets = [
  {
    lang: 'cURL',
    code: `curl -X POST http://localhost:5000/api/v1/api/chat \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{"message": "ما هي سياسة الإرجاع؟"}'`,
  },
  {
    lang: 'JavaScript (Fetch)',
    code: `fetch('http://localhost:5000/api/v1/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    message: 'ما هي سياسة الإرجاع؟'
  })
})
.then(res => res.json())
.then(data => console.log(data.data.response));`,
  },
  {
    lang: 'JavaScript (Axios)',
    code: `const response = await axios.post(
  'http://localhost:5000/api/v1/api/chat',
  { message: 'ما هي سياسة الإرجاع؟' },
  { headers: { 'x-api-key': 'YOUR_API_KEY' } }
);
console.log(response.data.data.response);`,
  },
  {
    lang: 'Python',
    code: `import requests

response = requests.post(
    'http://localhost:5000/api/v1/api/chat',
    json={"message": "ما هي سياسة الإرجاع؟"},
    headers={"x-api-key": "YOUR_API_KEY"}
)
print(response.json()["data"]["response"])`,
  },
];

export default function ApiDocs() {
  const containerRef = useRef(null);
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".docs-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(".docs-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-36 pb-24 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="docs-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface shadow-soft border border-slate-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-electric-cyan absolute"></span>
            <span className="text-sm font-bold text-slate-700 ml-2">للمطورين</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-textMain mb-6 leading-tight">
            توثيق <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">API</span>
          </h1>
          <p className="text-lg text-textMuted leading-relaxed">
            قم بدمج مساعدك الذكي في أي تطبيق عبر REST API. استخدم مفتاح API الخاص بك لمصادقة الطلبات.
          </p>
        </div>

        <div className="space-y-8">
          <div className="docs-card bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>📡</span> نقطة النهاية (Endpoint)
            </h2>
            <div className="bg-slate-900 rounded-xl p-4 text-center">
              <code className="text-electric-cyan font-mono text-xl">POST /api/v1/api/chat</code>
            </div>
          </div>

          <div className="docs-card bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>🔑</span> المصادقة (Authentication)
            </h2>
            <p className="text-textMuted mb-4">يتطلب كل طلب إرسال مفتاح API في الـ Header التالي:</p>
            <div className="bg-slate-900 rounded-xl p-4">
              <code className="text-electric-cyan font-mono">x-api-key: YOUR_API_KEY</code>
            </div>
          </div>

          <div className="docs-card bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>📋</span> الـ Headers المطلوبة
            </h2>
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="text-right p-3 font-bold text-slate-700">Header</th>
                    <th className="text-right p-3 font-bold text-slate-700">القيمة</th>
                    <th className="text-right p-3 font-bold text-slate-700">إجباري</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-mono text-sm text-electric-cyan">Content-Type</td>
                    <td className="p-3 font-mono text-sm">application/json</td>
                    <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold">نعم</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-sm text-electric-cyan">x-api-key</td>
                    <td className="p-3 font-mono text-sm">{'<مفتاح API>'}</td>
                    <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold">نعم</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="docs-card bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>📦</span> جسم الطلب (Request Body)
            </h2>
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="text-right p-3 font-bold text-slate-700">الحقل</th>
                    <th className="text-right p-3 font-bold text-slate-700">النوع</th>
                    <th className="text-right p-3 font-bold text-slate-700">الوصف</th>
                    <th className="text-right p-3 font-bold text-slate-700">إجباري</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-mono text-sm">message</td>
                    <td className="p-3 font-mono text-sm">string</td>
                    <td className="p-3 text-sm text-slate-600">رسالة المستخدم</td>
                    <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold">نعم</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-sm">history</td>
                    <td className="p-3 font-mono text-sm">array</td>
                    <td className="p-3 text-sm text-slate-600">سجل المحادثة السابقة (اختياري)</td>
                    <td className="p-3"><span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md text-xs font-bold">لا</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="font-bold text-textMain mb-3">مثال:</h3>
            <div className="bg-slate-900 rounded-xl p-4 relative group">
              <pre className="text-slate-300 text-sm font-mono text-left overflow-x-auto" dir="ltr">
                <code>{`{
  "message": "ما هي سياسة الإرجاع؟",
  "history": [
    { "role": "user", "content": "مرحباً" },
    { "role": "assistant", "content": "أهلاً بك! كيف يمكنني مساعدتك؟" }
  ]
}`}</code>
              </pre>
              <button
                onClick={() => handleCopy(JSON.stringify({ message: "ما هي سياسة الإرجاع؟", history: [{ role: "user", content: "مرحباً" }, { role: "assistant", content: "أهلاً بك! كيف يمكنني مساعدتك؟" }] }, null, 2), 'body')}
                className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copiedSection === 'body' ? 'bg-electric-green text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {copiedSection === 'body' ? 'تم ✓' : 'نسخ'}
              </button>
            </div>
          </div>

          <div className="docs-card bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>✅</span> مثال على الاستجابة
            </h2>
            <div className="bg-slate-900 rounded-xl p-4">
              <pre className="text-slate-300 text-sm font-mono text-left overflow-x-auto" dir="ltr">
                <code>{`{
  "status": "success",
  "data": {
    "response": "سياسة الإرجاع لدينا تسمح بإرجاع المنتجات خلال 14 يوماً..."
  }
}`}</code>
              </pre>
            </div>
          </div>

          <div className="docs-card bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>💻</span> أمثلة برمجية
            </h2>
            <div className="space-y-4">
              {codeSnippets.map((snippet) => (
                <div key={snippet.lang} className="bg-slate-900 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border-b border-slate-800">
                    <span className="text-slate-400 text-xs font-bold">{snippet.lang}</span>
                    <button
                      onClick={() => handleCopy(snippet.code, snippet.lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        copiedSection === snippet.lang ? 'bg-electric-green text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {copiedSection === snippet.lang ? 'تم النسخ ✓' : 'نسخ'}
                    </button>
                  </div>
                  <pre className="p-4 text-slate-300 text-sm font-mono text-left overflow-x-auto" dir="ltr">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div className="docs-card bg-amber-50/50 p-8 rounded-3xl border border-amber-200">
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <span>⚠️</span> حدود الاستخدام (Rate Limits)
            </h2>
            <ul className="text-sm text-amber-800 space-y-2 list-disc list-inside font-medium">
              <li>عدد الجلسات شهرياً حسب خطتك الحالية</li>
              <li>الحد الأقصى: 50 رسالة لكل جلسة</li>
              <li>مفتاح API خاص بك لا تشاركه مع أي جهة أخرى</li>
              <li>للحصول على مفتاح API، قم <a href="/login" className="text-electric-cyan font-bold hover:underline">بتسجيل الدخول</a> وإنشاء بوت</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
