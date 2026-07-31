import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/apiFetch';

export default function DashboardBilling() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState('free');
  const [hasActiveSub, setHasActiveSub] = useState(false);
  const [hasActiveTrial, setHasActiveTrial] = useState(false);
  const [subscriptionExpiresAt, setSubscriptionExpiresAt] = useState(null);
  const [trialExpiresAt, setTrialExpiresAt] = useState(null);
  const [queuedPlan, setQueuedPlan] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  const fetchData = async () => {
    try {
      const res = await apiFetch('/api/v1/billing/my-request');
      const data = await res.json();
      if (res.ok && data.status === 'success' && data.data) {
        setPlan(data.data.plan || 'free');
        setHasActiveSub(data.data.hasActiveSub);
        setHasActiveTrial(data.data.hasActiveTrial);
        setSubscriptionExpiresAt(data.data.subscriptionExpiresAt);
        setTrialExpiresAt(data.data.trialExpiresAt);
        setQueuedPlan(data.data.queuedPlan);
        setPaymentRequest(data.data.paymentRequest);
      }
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadReceipt = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      showToast('❌ يرجى اختيار صورة أو ملف PDF');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('❌ حجم الملف يتجاوز 5 ميغابايت');
      return;
    }
    setIsUploadingReceipt(true);
    try {
      const form = new FormData();
      form.append('receipt', file);
      const res = await apiFetch('/api/v1/billing/upload-receipt', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('✅ تم رفع الإيصال، سيتم مراجعته قريباً');
        fetchData();
      } else {
        showToast(`❌ ${data.message || 'فشل رفع الإيصال'}`);
      }
    } catch (err) {
      showToast('❌ فشل الاتصال بالخادم');
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const pr = paymentRequest;
  const planLabel = pr?.planName || (plan === 'pro' ? 'الأساسية' : plan === 'enterprise' ? 'الخارقة' : 'مجانية');
  const planIcon = plan === 'free' ? '⭐' : plan === 'pro' ? '🚀' : '💎';
  const prStatus = pr?.status;

  const renderCountdown = (label, endTime, isTrial) => {
    const now = Date.now();
    const target = endTime ? new Date(endTime).getTime() : null;
    if (!target || target < now) return null;
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return (
      <div className="text-center py-3 border-b border-slate-100 last:border-b-0">
        <p className="text-xs text-slate-500 font-bold mb-1">{label}</p>
        <p className="text-3xl font-black text-textMain">{days}</p>
        <p className="text-xs text-slate-400 font-bold">يوم</p>
        <span dir="ltr" className="font-mono font-bold text-lg text-textMain">{String(hours).padStart(2, '0')}:{String(mins).padStart(2, '0')}</span>
        <p className="text-xs text-slate-400">ساعة : دقيقة</p>
        {isTrial && <p className="text-xs text-amber-600 font-bold mt-1">تفعيل تجريبي</p>}
      </div>
    );
  };

  const showPaymentSection = prStatus === 'Pending_Approval' || prStatus === 'Reviewing';

  return (
    <div className="animate-fade-in max-w-3xl mx-auto" dir="rtl">
      {message && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-fade-in pointer-events-none">
          <div className={`px-6 py-4 rounded-full font-bold text-sm flex items-center gap-3 shadow-2xl ${
            message.includes('❌') ? 'bg-red-500 text-white' : 'bg-slate-900 text-white border border-electric-cyan/30'
          }`}>
            <span>{message.includes('❌') ? '⚠️' : '✨'}</span>
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* بطاقة الخطة الحالية */}
      <div className="bg-gradient-to-l from-electric-cyan/10 to-electric-green/10 border border-electric-cyan/20 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden mb-6">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-electric-cyan/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">{planIcon}</div>
            <div>
              <p className="text-sm text-slate-500 font-bold">الخطة الحالية</p>
              <p className="text-xl font-black text-textMain">{planLabel}</p>
              {queuedPlan && <p className="text-xs text-amber-600 font-bold mt-1">↪ سيتم التخفيض إلى {queuedPlan === 'pro' ? 'الأساسية' : 'الخارقة'} بعد انتهاء الاشتراك</p>}
            </div>
          </div>
          {!pr && !hasActiveTrial && (
            <button onClick={() => navigate('/pricing')} className="bg-slate-900 text-white font-black px-8 py-3.5 rounded-2xl hover:bg-electric-cyan hover:text-slate-900 hover:shadow-glow transition-all duration-300 flex items-center gap-2 shrink-0">
              <span>تطوير الخطة</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* عداد المدة — يظهر دائماً إذا في اشتراك أو تجربة نشطة */}
      <div className="bg-surface rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-2 flex items-center gap-2">
          <span>⏳</span> مدة الاشتراك المتبقية
        </h3>

        {(hasActiveSub || hasActiveTrial) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCountdown('الرصيد الحالي', subscriptionExpiresAt, false)}
            {renderCountdown('تفعيل تجريبي', trialExpiresAt, true)}
          </div>
        )}

        {!hasActiveSub && !hasActiveTrial && (
          prStatus === 'Expired' ? (
            <div className="text-center py-6">
              <p className="text-5xl mb-3">⏰</p>
              <p className="text-lg text-slate-500 font-bold">انتهت صلاحية الطلب</p>
              <p className="text-sm text-amber-600 font-bold mt-2">انتهت الفترة التجريبية دون رفع إيصال. يمكنك تقديم طلب جديد.</p>
              <button onClick={() => navigate('/pricing')} className="mt-4 bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-electric-cyan hover:text-slate-900 transition-all">تقديم طلب جديد</button>
            </div>
          ) : prStatus === 'Pending_Approval' ? (
            <div className="text-center py-6">
              <p className="text-5xl mb-3">⏳</p>
              <p className="text-lg text-slate-500 font-bold">قيد المعالجة</p>
              <p className="text-sm text-amber-600 font-bold mt-2">بانتظار مراجعة الأدمن</p>
            </div>
          ) : prStatus === 'Rejected' ? (
            <div className="text-center py-6">
              <p className="text-5xl mb-3">❌</p>
              <p className="text-lg text-slate-500 font-bold">تم رفض الطلب</p>
              <p className="text-sm text-red-600 font-bold mt-2">يرجى التواصل مع الدعم الفني</p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-5xl mb-3">📭</p>
              <p className="text-lg text-slate-500 font-bold">لا توجد خطة نشطة</p>
              <button onClick={() => navigate('/pricing')} className="mt-3 text-sm font-bold text-electric-cyan hover:underline">اشترك الآن</button>
            </div>
          )
        )}

        {/* شارة حالة الطلب — تظهر فوق العداد إذا في اشتراك نشط */}
        {prStatus === 'Pending_Approval' && (hasActiveSub || hasActiveTrial) && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm font-medium text-amber-800 flex items-center gap-2 justify-center">
            <span>⏳</span> يوجد طلب قيد المعالجة — سيبقى اشتراكك الحالي نشطاً لحين البتّ فيه
          </div>
        )}
        {prStatus === 'Rejected' && (hasActiveSub || hasActiveTrial) && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm font-medium text-red-700 flex items-center gap-2 justify-center">
            <span>❌</span> تم رفض الطلب السابق — اشتراكك الحالي ما زال نشطاً
          </div>
        )}
        {prStatus === 'Expired' && (hasActiveSub || hasActiveTrial) && (
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm font-medium text-orange-700 flex items-center gap-2 justify-center">
            <span>⏰</span> انتهت صلاحية الطلب التجريبي — اشتراكك الحالي ما زال نشطاً
          </div>
        )}
      </div>

      {/* بطاقة الدفع */}
      {showPaymentSection && (
        <div className="bg-surface p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💳</span>
            <h2 className="text-xl font-bold text-textMain">إكمال الدفع — {planLabel}</h2>
          </div>
          <p className="text-textMuted text-sm font-medium mb-6">
            {hasActiveTrial ? 'التفعيل التجريبي لمدة 24 ساعة نشط. قم بتحويل المبلغ وإرفاق الإيصال لتفعيل باقتك بشكل دائم.' : prStatus === 'Reviewing' ? 'تم استلام إيصالك، سنقوم بمراجعته وتفعيل باقتك قريباً.' : 'قم بتحويل المبلغ إلى رقم كليك أدناه وأرفق الإيصال لتأكيد الدفع.'}
          </p>

          {/* معلومات كليك */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-textMain mb-3 flex items-center gap-2">
              <span>📱</span> معلومات الدفع عبر كليك (Click)
            </h3>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">رقم كليك:</span>
                <span className="text-textMain font-bold text-lg" dir="ltr">0785290948</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">اسم المستفيد:</span>
                <span className="text-textMain font-bold">عُبور تِك (Uboor Tech)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">المبلغ:</span>
                <span className="text-electric-green font-black text-xl">{pr?.planPrice || '10'} د.أ</span>
              </div>
            </div>
            <div className="mt-4 bg-electric-yellow/10 border border-electric-yellow/20 rounded-xl p-3 text-xs text-amber-800 font-medium flex items-start gap-2">
              <span>💡</span>
              <span>حول المبلغ إلى رقم كليك أعلاه، ثم أرفق صورة الإيصال بالأسفل لتأكيد الدفع.</span>
            </div>
          </div>

          {/* رفع الإيصال */}
          {prStatus === 'Pending_Approval' && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">إرفاق إيصال التحويل</label>
              <div className="flex items-center gap-4">
                <label className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${isUploadingReceipt ? 'bg-slate-200 text-slate-500' : 'bg-slate-900 text-white hover:bg-electric-cyan hover:text-slate-900'}`}>
                  {isUploadingReceipt ? (
                    <><div className="w-4 h-4 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin"></div>جاري الرفع...</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>رفع الإيصال</>
                  )}
                  <input type="file" accept="image/*,application/pdf" onChange={handleUploadReceipt} className="hidden" disabled={isUploadingReceipt} />
                </label>
                {pr?.receiptUrl && (
                  <span className="text-sm text-electric-green font-bold flex items-center gap-1">
                    <span>✓</span> تم الرفع
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">يُسمح بصيغ JPG, PNG, PDF. حجم أقصى 5MB.</p>
            </div>
          )}

          {/* الإيصال قيد المراجعة */}
          {prStatus === 'Reviewing' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm font-medium text-amber-800 flex items-start gap-3">
              <span className="text-lg">🕐</span>
              <div>
                <p className="font-bold">الإيصال قيد المراجعة</p>
                <p className="text-amber-700">بمجرد تأكيد الدفع، سيتم تفعيل باقتك تلقائياً وسنرسل لك إشعاراً بذلك.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* للمكتملة */}
      {hasActiveSub && !pr && (
        <div className="bg-electric-green/5 border border-electric-green/20 rounded-3xl p-8 text-center">
          <p className="text-5xl mb-4">🎉</p>
          <p className="text-xl font-black text-textMain">اشتراكك نشط</p>
          <p className="text-sm text-slate-500 font-medium mt-2">خطة {planLabel} مفعلة حتى الآن</p>
        </div>
      )}
    </div>
  );
}
