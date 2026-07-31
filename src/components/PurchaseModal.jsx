import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import { apiFetch } from '../utils/apiFetch';

const plans = {
  basic: { id: 'basic', name: 'الأساسية', price: 10, icon: '🚀', color: 'from-electric-green to-teal-400' },
  enterprise: { id: 'enterprise', name: 'الخارقة', price: 25, icon: '💎', color: 'from-electric-yellow to-orange-400' },
};

export default function PurchaseModal({ isOpen, onClose, planId }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('checking');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const plan = plans[planId];

  useEffect(() => {
    if (isOpen) {
      setStep('checking');
      setName('');
      setError('');
      setResult(null);
      setCountdown(5);

      const token = localStorage.getItem('accessToken');
      if (token) {
        fetchCurrentUser().then(u => {
          if (u) {
            setUser(u);
            setName(u.name || '');
            setStep('confirm');
          } else {
            setUser(null);
            setStep('login-prompt');
          }
        });
      } else {
        setUser(null);
        setStep('login-prompt');
      }
    }
  }, [isOpen, planId]);

  useEffect(() => {
    if (step === 'success') {
      if (countdown > 0) {
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
      } else {
        handleGoToDashboard();
      }
    }
  }, [step, countdown]);

  const handleGoToDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError('يرجى إدخال اسمك'); return; }
    setError('');
    setStep('submitting');

    try {
      const res = await apiFetch('/api/v1/billing/request-upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, name: name.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setResult(data.data);
        setStep('success');
      } else {
        setError(data.message || 'حدث خطأ، حاول مرة أخرى');
        setStep('confirm');
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً');
      setStep('confirm');
    }
  };

  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" dir="rtl">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-surface rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === 'checking' && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
            <p className="text-textMuted font-medium">جاري التحقق من حسابك...</p>
          </div>
        )}

        {step === 'login-prompt' && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{plan.icon}</span>
              <div>
                <h2 className="text-2xl font-black text-textMain">الخطة {plan.name}</h2>
                <p className="text-textMuted text-sm font-medium">{plan.price} د.أ / شهرياً</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">🔒</span>
                <div>
                  <p className="font-bold text-textMain mb-1">يجب تسجيل الدخول أولاً</p>
                  <p className="text-sm text-textMuted leading-relaxed">
                    لطلب الترقية، يرجى تسجيل الدخول إلى حسابك. إذا لم يكن لديك حساب، يمكنك إنشاء حساب جديد مجاناً.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => { onClose(); navigate('/login'); }}
                className="w-full bg-gradient-to-l from-electric-cyan to-electric-green text-slate-900 font-black py-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => { onClose(); navigate('/register'); }}
                className="w-full bg-slate-100 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-200 transition-all duration-300"
              >
                إنشاء حساب جديد
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{plan.icon}</span>
              <div>
                <h2 className="text-2xl font-black text-textMain">الخطة {plan.name}</h2>
                <p className="text-textMuted text-sm font-medium">{plan.price} د.أ / شهرياً</p>
              </div>
            </div>

            <div className="bg-electric-green/5 border border-electric-green/20 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">⏳</span>
                <div>
                  <p className="font-bold text-textMain mb-1">تفعيل تجريبي لمدة 24 ساعة</p>
                  <p className="text-sm text-textMuted leading-relaxed">
                    بعد إرسال طلبك، سنقوم بتفعيل الخطة {plan.name} لمدة 24 ساعة بشكل مؤقت لتجربتها.
                    يمكنك إكمال عملية الدفع لاحقاً من لوحة التحكم لتفعيل الخطة بشكل دائم.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
              <p className="text-xs text-slate-500 font-medium mb-1">البريد الإلكتروني المرتبط بحسابك</p>
              <p className="text-textMain font-bold" dir="ltr">{user?.email}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">اسمك (لعرضه في طلبك)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ادخل اسمك"
                className="w-full bg-slate-50 border border-slate-200 text-textMain rounded-xl p-3.5 outline-none font-medium focus:border-electric-cyan focus:bg-white transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium p-3 rounded-xl mb-4 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-l from-electric-cyan to-electric-green text-slate-900 font-black py-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg"
            >
              إرسال طلب الترقية
            </button>

            <p className="text-xs text-slate-400 text-center mt-4 font-medium">
              بالضغط على "إرسال طلب الترقية" أنت توافق على{' '}
              <a href="/terms" className="text-electric-cyan hover:underline">شروط الاستخدام</a>
            </p>
          </div>
        )}

        {step === 'submitting' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
            <h3 className="text-xl font-black text-textMain mb-2">جاري إرسال طلبك...</h3>
            <p className="text-textMuted font-medium">يرجى الانتظار قليلاً</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-electric-green/10 rounded-full flex items-center justify-center border-4 border-electric-green/30">
              <svg className="w-10 h-10 text-electric-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-textMain mb-2">تم استلام طلبك بنجاح! 🎉</h3>
            <p className="text-textMuted font-medium mb-6">
              تم تفعيل الخطة <strong className="text-textMain">{plan.name}</strong> لمدة 24 ساعة بشكل تجريبي.
            </p>

            <p className="text-sm text-textMuted mb-6">
              سيتم توجيهك إلى لوحة التحكم خلال {countdown} ثوانٍ...
            </p>

            <button
              onClick={handleGoToDashboard}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-electric-cyan hover:text-slate-900 transition-all duration-300 text-lg"
            >
              الذهاب إلى لوحة التحكم
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
