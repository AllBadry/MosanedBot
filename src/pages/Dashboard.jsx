import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WidgetPreview from '../components/WidgetPreview';

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
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({ 
    name: '', 
    themeColor: '#00F0FF', 
    welcomeMessage: '',
    avatarUrl: '',
    widgetStyle: 'classic',
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
        const response = await fetch('http://localhost:5000/api/v1/bot', {
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
            widgetStyle: fetchedBot.widgetStyle || 'classic',
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

    fetchBotData();
    
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [location, navigate]);

  const handleCreateBot = async () => {
    setIsCreating(true);
    showToast('جاري إنشاء مساعدك الذكي... ⏳', 10000);
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/bot', {
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
            widgetStyle: 'classic',
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
      const response = await fetch('http://localhost:5000/api/v1/bot', {
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

  const handleCopyScript = () => {
    if (!botData || !botData.widgetKey) return;
    const scriptCode = `<script src="http://localhost:5000/mosaned-widget.js" data-widget-key="${botData.widgetKey}"></script>`;
    navigator.clipboard.writeText(scriptCode);
    showToast('تم نسخ كود الربط بنجاح! 📋');
  };

  // 🚀 حساب النسب المئوية لشرائط التقدم
  const sessionPercent = Math.min((usage.sessions / limits.sessions) * 100, 100) || 0;
  const isUnlimitedKnowledge = limits.knowledge === 'unlimited';
  const knowledgePercent = isUnlimitedKnowledge ? 0 : Math.min((usage.knowledge / limits.knowledge) * 100, 100) || 0;

  return (
    <div className="animate-fade-in max-w-7xl mx-auto relative min-h-[80vh]" dir="rtl">
      
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

      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-textMain mb-2">إعدادات المساعد 🤖</h1>
          <p className="text-textMuted text-lg font-medium">قم بتخصيص هوية البوت وتصميمه لموقعك.</p>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
        </div>
      ) : !botData ? (
        
        <div className="bg-surface border border-slate-200 rounded-[2.5rem] p-12 shadow-sm text-center max-w-3xl mx-auto mt-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-electric-cyan to-electric-green"></div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-electric-cyan/10 blur-3xl rounded-full pointer-events-none"></div>
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
                أكواد الفورم القديمة التي عادت كاملة
            ========================================= */}
            <form id="botSettingsForm" onSubmit={handleUpdateBot} className="space-y-8">
              
              <div className="bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
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
              </div>

              <div className="bg-surface p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-textMain mb-6 flex items-center gap-2">
                  <span className="text-electric-green">2.</span> تخصيص المظهر (UI/UX)
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">شكل النافذة (Theme)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {[ { id: 'classic', icon: '📱' }, { id: 'cyber', icon: '⚡' }, { id: 'glass', icon: '🧊' }, { id: 'floating', icon: '☁️' }, { id: 'minimal', icon: '📐' }, { id: 'corporate', icon: '💼' } ].map(style => (
                        <button key={style.id} type="button" onClick={() => setFormData({...formData, widgetStyle: style.id})} className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${formData.widgetStyle === style.id ? 'border-electric-cyan bg-electric-cyan/10 border-electric-cyan shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}>
                          <span className="text-2xl">{style.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">فقاعات المحادثة (Bubbles)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {[ { id: 'modern', icon: '☁️' }, { id: 'classic', icon: '🗨️' }, { id: 'sharp', icon: '⬛' }, { id: 'pill', icon: '💊' }, { id: 'outline', icon: '⭕' }, { id: '3d', icon: '🎛️' } ].map(style => (
                        <button key={style.id} type="button" onClick={() => setFormData({...formData, bubbleStyle: style.id})} className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${formData.bubbleStyle === style.id ? 'border-electric-cyan bg-electric-cyan/10 border-electric-cyan shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}>
                          <span className="text-2xl">{style.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">الزر العائم (Launcher)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {[ { id: 'round', icon: '🔴' }, { id: 'square', icon: '🔲' }, { id: 'teardrop', icon: '💧' }, { id: 'transparent', icon: '👻' }, { id: 'glow', icon: '🌟' }, { id: 'cloud', icon: '☁️' } ].map(style => (
                        <button key={style.id} type="button" onClick={() => setFormData({...formData, launcherStyle: style.id})} className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${formData.launcherStyle === style.id ? 'border-electric-cyan bg-electric-cyan/10 border-electric-cyan shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}>
                          <span className="text-2xl">{style.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button 
                  type="submit" 
                  className="bg-slate-900 text-white font-black px-12 py-4 rounded-2xl hover:bg-electric-cyan hover:text-slate-900 shadow-lg hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                >
                  حفظ الإعدادات بالكامل
                </button>
              </div>
            </form>

            {/* =========================================
                كود التضمين عاد أيضاً
            ========================================= */}
            {botData.widgetKey && (
              <div className="bg-[#0f172a] rounded-3xl p-8 relative overflow-hidden shadow-2xl mt-12 border border-slate-800">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-electric-cyan/20 blur-3xl rounded-full"></div>
                
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-electric-cyan">3.</span> كود التضمين (Integration Script)
                  </h2>
                  <p className="text-slate-400 text-sm mb-6">انسخ هذا الكود وضعه في الـ <code>&lt;head&gt;</code> أو قبل إغلاق <code>&lt;/body&gt;</code> في موقعك الإلكتروني ليعمل البوت.</p>
                  
                  <div className="bg-black/50 border border-slate-800 rounded-xl p-4 mb-6 relative group">
                    <pre className="text-slate-300 text-sm font-mono text-left overflow-x-auto whitespace-pre-wrap leading-loose" dir="ltr">
                      <code>
                        <span className="text-slate-500">&lt;!-- Mosaned Chat Widget --&gt;</span>{'\n'}
                        <span className="text-pink-400">&lt;script</span> <span className="text-green-300">src=</span><span className="text-yellow-300">"http://localhost:5000/mosaned-widget.js"</span> <span className="text-green-300">data-widget-key=</span><span className="text-yellow-300">"{botData.widgetKey}"</span><span className="text-pink-400">&gt;&lt;/script&gt;</span>
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
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3 sticky top-8">
            <div className="bg-slate-100 rounded-3xl p-2 border border-slate-200/60 shadow-inner relative overflow-hidden h-[600px] flex items-end justify-end">
              <div className="absolute top-6 left-0 w-full text-center z-10">
                <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-600 shadow-sm border border-slate-200">
                  🔴 معاينة حية (Live Preview)
                </span>
              </div>
              
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 p-6 w-full h-full pointer-events-none">
                <WidgetPreview formData={{...formData, avatarUrl: formData.avatarUrl.startsWith('/uploads') ? `http://localhost:5000${formData.avatarUrl}` : formData.avatarUrl}} />
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}