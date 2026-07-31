import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import WidgetPreview from '../components/WidgetPreview';
import StylePicker from '../components/StylePicker';
import { WINDOW_STYLES, BUBBLE_STYLES, LAUNCHER_STYLES } from '../config/styleDefs';
import API_BASE_URL from '../config/api';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const toastTimeoutRef = useRef(null);

  const [botData, setBotData] = useState(null);
  
  // 🚀 حالات جديدة لحفظ الاستهلاك والحدود
  const [usage, setUsage] = useState({ sessions: 0, knowledge: 0 });
  const [limits, setLimits] = useState({ sessions: 100, knowledge: 10 });

  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState('');
  const [userPlan, setUserPlan] = useState('free');
  
  const [formData, setFormData] = useState({ 
    name: '', 
    themeColor: '#00F0FF', 
    welcomeMessage: '',
    avatarUrl: '',
    widgetStyle: 'standard-saas',
    bubbleStyle: 'modern',
    launcherStyle: 'round',
    allowedDomain: '' 
  });

  const showToast = (msg, duration = 3000) => {
    setMessage(msg);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, duration);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get('token');
    if (urlToken) {
      localStorage.setItem('accessToken', urlToken);
      window.history.replaceState({}, document.title, "/dashboard");
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
        navigate('/login');
        return;
    }

    const fetchBotData = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/api/v1/bot', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        // 🚀 التأكد من فحص data.data.bot وليس فقط data.data
        if (response.ok && data.status === 'success' && data.data && data.data.bot) {
          const fetchedBot = data.data.bot;
          setBotData(fetchedBot);
          
          if (data.data.usage && data.data.limits) {
            setUsage(data.data.usage);
            setLimits(data.data.limits);
          }

          setFormData({
            name: fetchedBot.name || 'مساعد ذكي',
            themeColor: fetchedBot.themeColor || '#00F0FF',
            welcomeMessage: fetchedBot.welcomeMessage || 'مرحباً بك!',
            avatarUrl: fetchedBot.avatarUrl || '/botimage2.jpg',
            widgetStyle: fetchedBot.widgetStyle || 'standard-saas',
            bubbleStyle: fetchedBot.bubbleStyle || 'modern',
            launcherStyle: fetchedBot.launcherStyle || 'round',
            allowedDomain: fetchedBot.allowedDomains && fetchedBot.allowedDomains.length > 0 
                           ? fetchedBot.allowedDomains[0] 
                           : ''
          });
        } else {
          setBotData(null);
        }
      } catch (err) {
        console.error('خطأ في جلب بيانات البوت', err);
        setBotData(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPlan = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(API_BASE_URL + '/api/v1/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.status === 'success' && data.data?.user?.plan) {
          setUserPlan(data.data.user.plan);
        }
      } catch { /* ignore */ }
    };

    fetchBotData();
    fetchUserPlan();
    
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleCreateBot = async () => {
    setIsCreating(true);
    showToast('جاري إنشاء مساعدك الذكي... ⏳', 10000);
    
    try {
      const response = await fetch(API_BASE_URL + '/api/v1/bot', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: 'مساعد مساند',
            themeColor: '#00F0FF',
            welcomeMessage: 'مرحباً! كيف يمكنني مساعدتك اليوم؟'
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        setBotData(data.data.bot);
        setFormData({
            name: data.data.bot.name,
            themeColor: data.data.bot.themeColor,
            welcomeMessage: data.data.bot.welcomeMessage,
            avatarUrl: data.data.bot.avatarUrl || '/botimage2.jpg',
            widgetStyle: 'standard-saas',
            bubbleStyle: 'modern',
            launcherStyle: 'round',
            allowedDomain: ''
        });
        showToast('تم إنشاء البوت بنجاح! 🎉 يمكنك الآن تخصيصه.', 4000);
      } else {
        showToast(`❌ ${data.message || 'فشل في إنشاء البوت.'}`);
      }
    } catch (err) {
      showToast('❌ خطأ في الاتصال بالخادم.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateBot = async (e) => {
    e.preventDefault();
    
    if (formData.avatarUrl && !formData.avatarUrl.startsWith('http') && !formData.avatarUrl.startsWith('/')) {
        showToast('❌ خطأ: رابط الصورة يجب أن يكون خارجياً (http) أو مساراً داخلياً صحيحاً (/).', 4000);
        return;
    }

    let cleanDomain = formData.allowedDomain.trim().toLowerCase();
    if (cleanDomain && cleanDomain.endsWith('/')) {
        cleanDomain = cleanDomain.slice(0, -1);
    }

    const dataToSend = {
      ...formData,
      allowedDomains: cleanDomain ? [cleanDomain] : [] 
    };

    showToast('جاري الحفظ... ⏳', 10000);
    try {
      const response = await fetch(API_BASE_URL + '/api/v1/bot', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(dataToSend)
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        setBotData(data.data.bot);
        showToast('تم حفظ الإعدادات بنجاح! ✅');
      } else {
        showToast(`❌ فشل الحفظ: ${data.message || 'يرجى مراجعة البيانات.'}`);
      }
    } catch (err) {
      showToast('❌ فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('❌ يرجى اختيار صورة فقط.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('❌ حجم الصورة يتجاوز 2 ميغابايت.');
      return;
    }
    setIsUploadingAvatar(true);
    showToast('جاري رفع الصورة... ⏳', 10000);
    try {
      const token = localStorage.getItem('accessToken');
      const form = new FormData();
      form.append('avatar', file);
      const res = await fetch(API_BASE_URL + '/api/v1/bot/upload-avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
      });
      const data = await res.json();
      if (data.status === 'success') {
        setFormData(prev => ({ ...prev, avatarUrl: data.data.avatarUrl }));
        showToast('تم رفع الصورة بنجاح! ✅');
      } else {
        showToast(`❌ ${data.message || 'فشل الرفع'}`);
      }
    } catch (err) {
      showToast('❌ فشل الاتصال بالخادم.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCopyScript = () => {
    if (!botData || !botData.widgetKey) return;
    const scriptCode = `<script src="${API_BASE_URL}/mosaned-widget.js" data-widget-key="${botData.widgetKey}"></script>`;
    navigator.clipboard.writeText(scriptCode);
    showToast('تم نسخ كود الربط بنجاح! 📋');
  };

  // 🚀 حساب النسب المئوية لشرائط التقدم
  const sessionPercent = Math.min((usage.sessions / limits.sessions) * 100, 100) || 0;
  const isUnlimitedKnowledge = limits.knowledge === 'unlimited';
  const knowledgePercent = isUnlimitedKnowledge ? 0 : Math.min((usage.knowledge / limits.knowledge) * 100, 100) || 0;

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 relative min-h-[80vh]" dir="rtl">
      
      {/* بوب اب الإشعارات */}
      {message && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-fade-in pointer-events-none">
          <div className={`px-6 py-4 rounded-full font-bold text-sm flex items-center gap-3 transition-all duration-300 transform border shadow-2xl ${
            message.includes('خطأ') || message.includes('❌') || message.includes('فشل') 
              ? 'bg-red-500 text-white border-red-600 shadow-[0_10px_40px_rgba(239,68,68,0.4)]' 
              : 'bg-slate-900 text-white border-electric-cyan/30 shadow-[0_10px_40px_rgba(0,240,255,0.2)]'
          }`}>
            <span className="text-xl">
              {message.includes('خطأ') || message.includes('❌') || message.includes('فشل') ? '⚠️' : message.includes('⏳') ? '⚙️' : '✨'}
            </span>
            <span className="tracking-wide">{message}</span>
          </div>
        </div>
      )}

      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-textMain mb-2">إعدادات المساعد 🤖</h1>
          <p className="text-textMuted text-lg font-medium">قم بتخصيص هوية البوت وتصميمه لموقعك.</p>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
        </div>
      ) : !botData ? (
        
        <div className="bg-surface border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-center max-w-3xl mx-auto mt-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-electric-cyan to-electric-green"></div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-electric-cyan/10 blur-2xl rounded-full pointer-events-none"></div>
            <div className="w-32 h-32 mx-auto bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl mb-8 relative z-10">
                <span className="text-6xl">✨🤖</span>
            </div>
            <h2 className="text-3xl font-black text-textMain mb-4 relative z-10">أهلاً بك في مساند!</h2>
            <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto relative z-10 leading-relaxed">
                يبدو أنك لم تقم بإنشاء المساعد الذكي الخاص بك بعد. اضغط على الزر أدناه لنقوم بتوليد البوت وإعداد مساحة العمل الخاصة بك.
            </p>
            <button onClick={handleCreateBot} disabled={isCreating} className="relative z-10 bg-slate-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-electric-cyan hover:text-slate-900 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 mx-auto">
                {isCreating ? ( <> <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div> جاري الإنشاء... </> ) : ( <> <span>إنشاء المساعد الذكي الآن</span> <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> </> )}
            </button>
        </div>

      ) : (
        <>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-full lg:w-2/3 space-y-8">

            {/* =========================================
                🚀 بطاقات الاستهلاك (Usage Stats) الجديدة 
            ========================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* كرت استهلاك الجلسات */}
              <div className="bg-surface p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-slate-500 font-bold text-sm mb-1">جلسات المحادثة (هذا الشهر)</h3>
                    <p className="text-2xl font-black text-slate-800">
                      <span className={sessionPercent > 90 ? 'text-red-500' : 'text-slate-800'}>{usage.sessions}</span> 
                      <span className="text-slate-400 text-lg font-medium mx-1">/</span> 
                      <span className="text-slate-500 text-lg">{limits.sessions}</span>
                    </p>
                  </div>
                  <div className="text-3xl">💬</div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${sessionPercent > 90 ? 'bg-red-500' : sessionPercent > 70 ? 'bg-yellow-400' : 'bg-electric-cyan'}`} 
                    style={{ width: `${sessionPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* كرت قواعد المعرفة */}
              <div className="bg-surface p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-slate-500 font-bold text-sm mb-1">قواعد المعرفة (البيانات)</h3>
                    <p className="text-2xl font-black text-slate-800">
                      <span>{usage.knowledge}</span> 
                      <span className="text-slate-400 text-lg font-medium mx-1">/</span> 
                      <span className="text-slate-500 text-lg">{isUnlimitedKnowledge ? 'غير محدود ♾️' : limits.knowledge}</span>
                    </p>
                  </div>
                  <div className="text-3xl">🧠</div>
                </div>
                {!isUnlimitedKnowledge && (
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${knowledgePercent > 90 ? 'bg-red-500' : knowledgePercent > 70 ? 'bg-yellow-400' : 'bg-electric-green'}`} 
                      style={{ width: `${knowledgePercent}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>

            {/* =========================================
                أكواد الفورم
            ========================================= */}
            <form id="botSettingsForm" onSubmit={handleUpdateBot} className="space-y-8">
              
              <div className="bg-surface p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
                  <span className="text-electric-cyan">1.</span> هوية البوت الأساسية والأمان
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">اسم المساعد</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-textMain rounded-xl p-3.5 outline-none font-medium focus:border-electric-cyan focus:bg-white transition-colors" placeholder="مثال: الدعم الفني" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">اللون الأساسي (Brand Color)</label>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3 focus-within:border-electric-cyan focus-within:bg-white transition-colors">
                      <input type="color" value={formData.themeColor} onChange={(e) => setFormData({...formData, themeColor: e.target.value})} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                      <span className="text-slate-600 font-bold font-mono text-sm uppercase" dir="ltr">{formData.themeColor}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                  <label className="block text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                    <span>🔒</span> نطاق الموقع المسموح (Domain)
                  </label>
                  <p className="text-xs text-blue-600 font-medium mb-3">حماية لبوتك: أدخل رابط موقعك لكي يعمل البوت فيه فقط. (مثال: https://mystore.com)</p>
                  <input 
                    type="url" 
                    required
                    value={formData.allowedDomain} 
                    onChange={(e) => setFormData({...formData, allowedDomain: e.target.value})} 
                    className="w-full bg-white border border-blue-200 text-blue-900 rounded-xl p-3.5 outline-none font-medium focus:border-blue-500 transition-colors" 
                    placeholder="https://yourwebsite.com" 
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رسالة الترحيب</label>
                  <textarea value={formData.welcomeMessage} onChange={(e) => setFormData({...formData, welcomeMessage: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 h-24 resize-none focus:border-electric-cyan focus:bg-white transition-colors outline-none font-medium text-textMain" placeholder="أهلاً بك! كيف يمكنني مساعدتك اليوم؟" />
                </div>

                <div className="border-t border-slate-100 pt-6 mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-4">صورة المساعد (Avatar)</label>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shrink-0 bg-slate-50">
                      <img
                        src={formData.avatarUrl?.startsWith('/') ? API_BASE_URL + formData.avatarUrl : formData.avatarUrl || '/botimage2.jpg'}
                        alt="avatar preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/botimage2.jpg' }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${isUploadingAvatar ? 'bg-slate-200 text-slate-500' : 'bg-slate-900 text-white hover:bg-electric-cyan hover:text-slate-900'}`}>
                        {isUploadingAvatar ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin"></div>
                            جاري الرفع...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            تغيير الصورة
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={isUploadingAvatar} />
                      </label>
                      <p className="text-xs text-slate-400 mt-2 font-medium">يُسمح بصيغ JPG, PNG, GIF. حجم أقصى 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
                  <span className="text-electric-green">2.</span> تخصيص المظهر (UI/UX)
                </h2>
                
                <div className="space-y-10">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">شكل النافذة (Window Style)</label>
                    <StylePicker type="window" styles={WINDOW_STYLES} value={formData.widgetStyle} color={formData.themeColor} onChange={(v) => setFormData({...formData, widgetStyle: v})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">فقاعات المحادثة (Bubble Style)</label>
                    <StylePicker type="bubble" styles={BUBBLE_STYLES} value={formData.bubbleStyle} color={formData.themeColor} onChange={(v) => setFormData({...formData, bubbleStyle: v})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">الزر العائم (Launcher Style)</label>
                    <StylePicker type="launcher" styles={LAUNCHER_STYLES} value={formData.launcherStyle} color={formData.themeColor} onChange={(v) => setFormData({...formData, launcherStyle: v})} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button 
                  type="submit" 
                  className="bg-slate-900 text-white font-black px-8 md:px-12 py-4 rounded-2xl hover:bg-electric-cyan hover:text-slate-900 shadow-lg hover:shadow-glow hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
                >
                  حفظ الإعدادات بالكامل
                </button>
              </div>
            </form>

            {/* =========================================
                كود التضمين عاد أيضاً
            ========================================= */}
            {botData.widgetKey && (
              <div className="bg-[#0f172a] rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl mt-12 border border-slate-800">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-electric-cyan/20 blur-2xl rounded-full"></div>
                
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-electric-cyan">3.</span> كود التضمين (Integration Script)
                  </h2>
                  <p className="text-slate-400 text-sm mb-6">انسخ هذا الكود وضعه في الـ <code>&lt;head&gt;</code> أو قبل إغلاق <code>&lt;/body&gt;</code> في موقعك الإلكتروني ليعمل البوت.</p>
                  
                  <div className="bg-black/50 border border-slate-800 rounded-xl p-4 mb-6 relative group">
                    <pre className="text-slate-300 text-sm font-mono text-left overflow-x-auto whitespace-pre-wrap leading-loose" dir="ltr">
                      <code>
                        <span className="text-slate-500">&lt;!-- Mosaned Chat Widget --&gt;</span>{'\n'}
                        <span className="text-pink-400">&lt;script</span>                         <span className="text-green-300">src=</span><span className="text-yellow-300">"${API_BASE_URL}/mosaned-widget.js"</span> <span className="text-green-300">data-widget-key=</span><span className="text-yellow-300">"{botData.widgetKey}"</span><span className="text-pink-400">&gt;&lt;/script&gt;</span>
                      </code>
                    </pre>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={handleCopyScript} 
                    className="w-full bg-electric-cyan hover:bg-teal-400 text-slate-900 font-black px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer pointer-events-auto"
                  >
                    <span>نسخ الكود إلى الحافظة</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>

                  <a
                    href={`/docs?key=${botData.widgetKey}`}
                    className="mt-3 block text-center text-sm text-slate-400 hover:text-[#00F0FF] transition-colors font-medium"
                  >
                    📚 دليل الدمج الكامل ←
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 space-y-6">
            <div className="bg-slate-100 rounded-3xl p-2 border border-slate-200/60 shadow-inner relative h-[460px] lg:h-[540px] flex items-end justify-end">
              <div className="absolute top-6 left-0 w-full text-center z-10">
                <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-600 shadow-sm border border-slate-200">
                  🔴 معاينة حية (Live Preview)
                </span>
              </div>
              
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 p-6 w-full h-full pointer-events-none">
                <WidgetPreview formData={{...formData, avatarUrl: formData.avatarUrl.startsWith('/uploads') ? `${API_BASE_URL}${formData.avatarUrl}` : formData.avatarUrl}} />
              </div>
            </div>
          </div>

        </div>
      </>
      )}
    </div>
  );
}