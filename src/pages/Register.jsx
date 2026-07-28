import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';

export default function Register() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState('register');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // إذا جاء المستخدم من صفحة تسجيل الدخول للتحقق
  useEffect(() => {
    const verifyEmail = searchParams.get('verify');
    if (verifyEmail) {
      setRegisteredEmail(verifyEmail);
      setStep('verify');
      startResendTimer();
    }
  }, []);

  function startResendTimer() {
    setResendDisabled(true);
    setResendTimer(60);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const handleGoogleAuth = () => window.location.href = "http://localhost:5000/api/v1/auth/google";
  const handleGithubAuth = () => window.location.href = "http://localhost:5000/api/v1/auth/github";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setRegisteredEmail(data.data.email);
        setStep('verify');
        startResendTimer();
      } else {
        setError(data.message || 'حدث خطأ أثناء التسجيل');
      }
    } catch (err) {
      setError('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail, code })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/dashboard');
      } else {
        setError(data.message || 'كود التحقق غير صحيح');
      }
    } catch (err) {
      setError('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;
    setResendDisabled(true);
    setResendTimer(60);

    try {
      await fetch('http://localhost:5000/api/v1/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail })
      });
    } catch (err) {
      console.error(err);
    }

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline();
      tl.fromTo(".register-card",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
      )
      .fromTo(".animate-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [step]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-36 pb-12 px-6">
      <div className="bg-orb absolute top-[-10%] right-[-10%] w-96 h-96 bg-electric-green/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="bg-orb absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-electric-cyan/20 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="register-card opacity-0 relative z-10 w-full max-w-md bg-surface/80 backdrop-blur-xl p-10 rounded-3xl shadow-soft border border-slate-200 transition-all duration-500">
        {step === 'register' ? (
          <>
            <div className="animate-item opacity-0 flex justify-center mb-6">
              <Link to="/" className="group flex items-center gap-2 text-3xl font-black text-textMain hover:scale-105 transition-transform duration-300">
                <span className="relative flex h-4 w-4">
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-tr from-electric-cyan to-electric-green shadow-glow"></span>
                </span>
                مساند<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">بوت</span>
              </Link>
            </div>

            <h2 className="animate-item opacity-0 text-2xl font-extrabold text-center text-textMain mb-2">ابدأ رحلتك معنا 🚀</h2>
            <p className="animate-item opacity-0 text-center text-textMuted mb-8 font-medium">أنشئ حسابك المجاني في ثوانٍ معدودة</p>

            {error && <div className="animate-item text-red-500 text-sm font-bold text-center mb-4">{error}</div>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="animate-item opacity-0">
                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
                <input type="text" placeholder="أدخل اسمك هنا" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all placeholder:text-slate-400 font-medium" />
              </div>

              <div className="animate-item opacity-0">
                <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                <input type="email" placeholder="name@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all placeholder:text-slate-400 font-medium" dir="ltr" />
              </div>

              <div className="animate-item opacity-0">
                <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
                <input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all placeholder:text-slate-400 font-medium" dir="ltr" />
              </div>

              <button type="submit" disabled={loading} className="animate-item opacity-0 w-full group relative px-8 py-4 bg-gradient-to-r from-electric-cyan to-electric-green rounded-xl font-bold text-slate-900 shadow-glow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden mt-6 disabled:opacity-70">
                <span className="relative flex justify-center items-center gap-2">
                  {loading ? 'جاري التسجيل...' : 'إنشاء حساب مجاني'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14" /></svg>
                </span>
              </button>
            </form>

            <div className="animate-item opacity-0 my-8 flex items-center gap-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-sm text-slate-400 font-medium">أو التسجيل بواسطة</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleGoogleAuth} type="button" className="animate-item opacity-0 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:bg-white hover:border-electric-cyan hover:shadow-soft rounded-xl p-3 transition-all text-slate-700 font-bold group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
              <button onClick={handleGithubAuth} type="button" className="animate-item opacity-0 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-800 hover:shadow-soft rounded-xl p-3 transition-all text-slate-700 font-bold group">
                <svg className="w-5 h-5 text-slate-800 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                GitHub
              </button>
            </div>

            <p className="animate-item opacity-0 text-center text-sm text-textMuted mt-8 font-medium">
              لديك حساب بالفعل؟ <Link to="/login" className="text-electric-cyan hover:text-electric-green font-bold transition-colors">سجل دخولك من هنا</Link>
            </p>
          </>
        ) : (
          <>
            <div className="animate-item opacity-0 flex justify-center mb-6">
              <div className="w-20 h-20 bg-electric-cyan/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">📧</span>
              </div>
            </div>

            <h2 className="animate-item opacity-0 text-2xl font-extrabold text-center text-textMain mb-2">تحقق من بريدك الإلكتروني</h2>
            <p className="animate-item opacity-0 text-center text-textMuted mb-2 font-medium">
              أدخل كود التفعيل المكون من 6 أرقام
            </p>
            <p className="animate-item opacity-0 text-center text-slate-400 text-sm mb-6" dir="ltr">
              {registeredEmail}
            </p>

            {error && <div className="animate-item text-red-500 text-sm font-bold text-center mb-4">{error}</div>}

            <form onSubmit={handleVerifyCode}>
              <div className="animate-item opacity-0 mb-6">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 text-center text-2xl font-mono font-bold tracking-[8px] focus:outline-none focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </div>

              <button type="submit" disabled={loading || code.length !== 6} className="animate-item opacity-0 w-full px-8 py-4 bg-gradient-to-r from-electric-cyan to-electric-green rounded-xl font-bold text-slate-900 shadow-glow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 mb-4">
                {loading ? 'جاري التحقق...' : 'تفعيل الحساب'}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={handleResendCode}
                disabled={resendDisabled}
                className="text-sm text-electric-cyan hover:text-electric-green font-bold transition-colors disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                {resendDisabled ? `إعادة إرسال الكود بعد ${resendTimer} ثانية` : 'إعادة إرسال الكود'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
