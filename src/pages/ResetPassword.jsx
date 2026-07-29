import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import API_BASE_URL from '../config/api';

export default function ResetPassword() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_BASE_URL + '/api/v1/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code,
          newPassword,
          newPasswordConfirm: newPassword
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('accessToken', data.accessToken);
        setSuccess('تم إعادة تعيين كلمة المرور بنجاح!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(data.message || 'فشلت عملية إعادة التعيين');
      }
    } catch (err) {
      setError('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb", { y: "random(-20, 20)", x: "random(-20, 20)", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      const tl = gsap.timeline();
      tl.fromTo(".card", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" })
        .fromTo(".item", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-36 pb-12 px-6">
      <div className="bg-orb absolute top-[-10%] left-[-10%] w-96 h-96 bg-electric-green/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="bg-orb absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-electric-cyan/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="card opacity-0 relative z-10 w-full max-w-md bg-surface/80 backdrop-blur-xl p-10 rounded-3xl shadow-soft border border-slate-200">
        <div className="item opacity-0 flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2 text-3xl font-black text-textMain">
            <span className="relative flex h-4 w-4">
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-tr from-electric-cyan to-electric-green shadow-glow"></span>
            </span>
            مساند<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">بوت</span>
          </Link>
        </div>

        <h2 className="item opacity-0 text-2xl font-extrabold text-center text-textMain mb-2">إعادة تعيين كلمة المرور 🔑</h2>
        <p className="item opacity-0 text-center text-textMuted mb-8 font-medium">أدخل الكود الذي وصل إلى بريدك وكلمة المرور الجديدة</p>

        {error && <div className="item text-red-500 text-sm font-bold text-center mb-4">{error}</div>}
        {success && <div className="item text-electric-green text-sm font-bold text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="item opacity-0 mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all font-medium" dir="ltr" required />
          </div>

          <div className="item opacity-0 mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">كود إعادة التعيين</label>
            <input type="text" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 text-center text-2xl font-mono font-bold tracking-[8px] focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all" dir="ltr" inputMode="numeric" required />
          </div>

          <div className="item opacity-0 mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور الجديدة</label>
            <input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all font-medium" dir="ltr" required />
          </div>

          <button type="submit" disabled={loading || code.length !== 6} className="item opacity-0 w-full px-8 py-4 bg-gradient-to-r from-electric-cyan to-electric-green rounded-xl font-bold text-slate-900 shadow-glow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50">
            {loading ? 'جاري الحفظ...' : 'إعادة تعيين كلمة المرور'}
          </button>
        </form>

        <p className="item opacity-0 text-center text-sm text-textMuted mt-8 font-medium">
          <Link to="/forgot-password" className="text-electric-cyan hover:text-electric-green font-bold transition-colors">إعادة إرسال الكود</Link>
        </p>
      </div>
    </div>
  );
}
