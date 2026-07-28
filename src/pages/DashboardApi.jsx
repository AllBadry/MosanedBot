import React, { useState, useEffect, useRef } from 'react';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';

export default function DashboardApi() {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [userPlan, setUserPlan] = useState('free');
  const toastTimeoutRef = useRef(null);
  const [testMessage, setTestMessage] = useState('');
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);

  const showToast = (msg, duration = 3000) => {
    setMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setMessage(''), duration);
  };

  useEffect(() => {
    const loadData = async () => {
      const profile = await fetchCurrentUser();
      if (profile?.plan) setUserPlan(profile.plan);

      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('http://localhost:5000/api/v1/api/key', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.status === 'success') {
          setApiKey(data.data.apiKey);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleRegenerate = async () => {
    if (!window.confirm('هل أنت متأكد؟ إعادة التوليد ستعطل أي تطبيق يستخدم المفتاح القديم.')) return;
    setRegenerating(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:5000/api/v1/api/key/regenerate', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setApiKey(data.data.apiKey);
        showToast('تم توليد مفتاح API جديد بنجاح! 🔑');
      } else {
        showToast('❌ ' + data.message);
      }
    } catch (err) {
      showToast('❌ فشل الاتصال بالخادم.');
    } finally {
      setRegenerating(false);
    }
  };

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleTestApi = async () => {
    if (!testMessage.trim()) {
      showToast('❌ يرجى كتابة رسالة للاختبار.');
      return;
    }
    setTesting(true);
    setTestResult('');
    try {
      const res = await fetch('http://localhost:5000/api/v1/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ message: testMessage })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setTestResult(data.data.response);
      } else {
        setTestResult('❌ خطأ: ' + data.message);
      }
    } catch (err) {
      setTestResult('❌ فشل الاتصال بالخادم.');
    } finally {
      setTesting(false);
    }
  };

  const curlExample = `curl -X POST http://localhost:5000/api/v1/api/chat \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey || 'YOUR_API_KEY'}" \\
  -d '{"message": "ما هي سياسة الإرجاع؟"}'`;

  const fetchExample = `fetch('http://localhost:5000/api/v1/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '${apiKey || 'YOUR_API_KEY'}'
  },
  body: JSON.stringify({
    message: 'ما هي سياسة الإرجاع؟'
  })
})
.then(res => res.json())
.then(data => console.log(data.data.response));`;

  const axiosExample = `const response = await axios.post(
  'http://localhost:5000/api/v1/api/chat',
  { message: 'ما هي سياسة الإرجاع؟' },
  { headers: { 'x-api-key': '${apiKey || 'YOUR_API_KEY'}' } }
);
console.log(response.data.data.response);`;

  const pythonExample = `import requests

response = requests.post(
    'http://localhost:5000/api/v1/api/chat',
    json={"message": "ما هي سياسة الإرجاع؟"},
    headers={"x-api-key": "${apiKey || 'YOUR_API_KEY'}"}
)
print(response.json()["data"]["response"])`;

  const codeSnippets = [
    { lang: 'cURL', code: curlExample },
    { lang: 'JavaScript (Fetch)', code: fetchExample },
    { lang: 'JavaScript (Axios)', code: axiosExample },
    { lang: 'Python', code: pythonExample },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto relative min-h-[80vh]" dir="rtl">
      {message && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-fade-in pointer-events-none">
          <div className={`px-6 py-4 rounded-full font-bold text-sm flex items-center gap-3 transition-all duration-300 transform border shadow-2xl ${
            message.includes('❌') || message.includes('فشل')
              ? 'bg-red-500 text-white border-red-600 shadow-red-400/40'
              : 'bg-slate-900 text-white border-electric-cyan/30 shadow-cyan-400/20'
          }`}>
            <span className="text-xl">{message.includes('❌') ? '⚠️' : '✨'}</span>
            <span>{message}</span>
          </div>
        </div>
      )}

      <header className="mb-12">
        <h1 className="text-4xl font-black text-textMain mb-2">واجهة API للمطورين 🔗</h1>
        <p className="text-textMuted text-lg font-medium">قم بدمج مساعدك الذكي في أي تطبيق عبر REST API.</p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-10">
          {}
          <div className="bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-textMain mb-2 flex items-center gap-2">
                  <span>🔑</span> مفتاح API الخاص بك
                </h2>
                <p className="text-sm text-slate-500">استخدم هذا المفتاح لمصادقة طلباتك. حافظ على سريته ولا تشاركه مع الآخرين.</p>
              </div>
              {apiKey && (
                <button
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0"
                >
                  {regenerating ? 'جاري التوليد...' : 'توليد مفتاح جديد'}
                </button>
              )}
            </div>

            {apiKey ? (
              <div className="mt-6 bg-slate-900 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between gap-4">
                  <code className="text-electric-cyan font-mono text-sm md:text-base break-all ltr" dir="ltr">{apiKey}</code>
                  <button
                    onClick={() => handleCopy(apiKey, 'key')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold shrink-0 transition-all ${
                      copiedSection === 'key' ? 'bg-electric-green text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {copiedSection === 'key' ? 'تم النسخ ✓' : 'نسخ'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                <p className="text-amber-700 font-bold">لم يتم إنشاء مفتاح API بعد. قم بإنشاء بوت أولاً ليتم توليد مفتاح تلقائياً.</p>
              </div>
            )}
          </div>

          {}
          <div className="bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
              <span>📚</span> توثيق API
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">نقطة النهاية (Endpoint)</h3>
                <div className="bg-slate-900 rounded-xl p-3.5 text-center">
                  <code className="text-electric-cyan font-mono text-lg">POST /api/v1/api/chat</code>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-textMain mb-3">الـ Headers المطلوبة</h3>
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

              <div>
                <h3 className="font-bold text-textMain mb-3">جسم الطلب (Request Body)</h3>
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
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
              </div>

              <div>
                <h3 className="font-bold text-textMain mb-3">مثال على جسم الطلب</h3>
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

              <div>
                <h3 className="font-bold text-textMain mb-3">مثال على الاستجابة</h3>
                <div className="bg-slate-900 rounded-xl p-4">
                  <pre className="text-slate-300 text-sm font-mono text-left overflow-x-auto" dir="ltr">
                    <code>{`{
  "status": "success",
  "data": {
    "response": "سياسة الإرجاع لدينا تسمح بإرجاع المنتجات خلال 14 يوماً من تاريخ الشراء..."
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <span>⚠️</span> حدود الاستخدام (Rate Limits)
                </h3>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside font-medium">
                  <li>عدد الجلسات شهرياً حسب خطتك الحالية</li>
                  <li>الحد الأقصى: 50 رسالة لكل جلسة</li>
                  <li>مفتاح API خاص بك لا تشاركه مع أي جهة أخرى</li>
                </ul>
              </div>
            </div>
          </div>

          {}
          <div className="bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
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

          {}
          {apiKey && (
            <div className="bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
                <span>🧪</span> جرب API الآن
              </h2>
              <p className="text-slate-500 text-sm mb-4">اكتب رسالة لترى كيف سيرد مساعدك الذكي عبر API.</p>

              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTestApi()}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3.5 outline-none font-medium focus:border-electric-cyan focus:bg-white transition-colors"
                />
                <button
                  onClick={handleTestApi}
                  disabled={testing}
                  className="px-6 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-electric-cyan hover:text-slate-900 transition-all disabled:opacity-60 flex items-center gap-2"
                >
                  {testing ? (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                  ) : 'إرسال'}
                </button>
              </div>

              {testResult && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">🤖</span>
                    <div>
                      <p className="font-bold text-sm text-slate-500 mb-1">رد المساعد:</p>
                      <p className="text-textMain leading-relaxed">{testResult}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
