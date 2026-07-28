import React from 'react';

export default function WidgetPreview({ formData }) {
  // 🚀 استخراج launcherStyle بالإضافة للمتغيرات السابقة
  const { name, themeColor, welcomeMessage, avatarUrl, widgetStyle, bubbleStyle, launcherStyle } = formData;
  
  const activeAvatar = avatarUrl || '/botimage.jpg';

  // 1. حاوية الودجت الأساسية (Container)
  const getContainerStyles = () => {
    const base = { transition: 'all 0.4s ease', display: 'flex', flexDirection: 'column', height: '400px', width: '100%' };
    switch(widgetStyle) {
      case 'cyber': return { ...base, borderRadius: '0px', backgroundColor: '#0f172a', boxShadow: `0 0 20px ${themeColor}40`, border: `1px solid ${themeColor}` };
      case 'glass': return { ...base, borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.4)' };
      case 'floating': return { ...base, backgroundColor: 'transparent', gap: '12px' }; 
      case 'minimal': return { ...base, borderRadius: '0px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' };
      case 'corporate': return { ...base, borderRadius: '4px', backgroundColor: '#f8fafc', border: '2px solid #cbd5e1', boxShadow: '6px 6px 0px rgba(0,0,0,0.1)' };
      case 'classic': default: return { ...base, borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden' };
    }
  };

  // 2. الترويسة (Header)
  const getHeaderStyles = () => {
    const base = { padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.4s' };
    switch(widgetStyle) {
      case 'minimal': case 'glass': return { ...base, backgroundColor: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(0,0,0,0.05)' };
      case 'corporate': return { ...base, backgroundColor: themeColor, color: '#fff', borderBottom: '2px solid #cbd5e1' };
      case 'floating': return { ...base, backgroundColor: themeColor, color: '#fff', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' };
      case 'cyber': return { ...base, backgroundColor: 'transparent', color: themeColor, borderBottom: `1px solid ${themeColor}40` };
      case 'classic': default: return { ...base, backgroundColor: themeColor, color: '#fff' };
    }
  };

  // 3. مساحة الرسائل
  const getBodyStyles = () => {
    const base = { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' };
    if (widgetStyle === 'floating') return { ...base, backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
    return base;
  };

  // 4. رسالة البوت
  const getBotMessageStyles = () => {
    const isDark = widgetStyle === 'cyber';
    let base = { padding: '12px', fontSize: '12px', maxWidth: '85%', lineHeight: '1.6', backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: isDark ? '#fff' : '#334155', border: isDark ? `1px solid ${themeColor}40` : 'none', transition: 'all 0.3s ease' };
    switch(bubbleStyle) {
      case 'classic': return { ...base, borderRadius: '12px 12px 12px 0' };
      case 'sharp': return { ...base, borderRadius: '0px' };
      case 'pill': return { ...base, borderRadius: '24px' };
      case 'outline': return { ...base, backgroundColor: 'transparent', border: `1px solid ${themeColor}`, color: isDark ? '#fff' : '#334155' };
      case '3d': return { ...base, borderRadius: '12px', boxShadow: `0 4px 0px ${isDark ? '#000' : '#cbd5e1'}` };
      case 'modern': default: return { ...base, borderRadius: '16px' };
    }
  };

  // 5. رسالة الزائر
  const getUserMessageStyles = () => {
    let base = { padding: '12px', fontSize: '12px', maxWidth: '85%', lineHeight: '1.6', backgroundColor: themeColor, color: '#fff', border: 'none', transition: 'all 0.3s ease' };
    switch(bubbleStyle) {
      case 'classic': return { ...base, borderRadius: '12px 12px 0 12px' };
      case 'sharp': return { ...base, borderRadius: '0px' };
      case 'pill': return { ...base, borderRadius: '24px' };
      case 'outline': return { ...base, backgroundColor: 'transparent', border: `1px solid ${themeColor}`, color: themeColor };
      case '3d': return { ...base, borderRadius: '12px', boxShadow: `0 4px 0px rgba(0,0,0,0.2)` };
      case 'modern': default: return { ...base, borderRadius: '16px' };
    }
  };

  // 6. منطقة الإدخال
  const getInputAreaStyles = () => {
    const base = { padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' };
    switch(widgetStyle) {
      case 'floating': return { ...base, backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
      case 'cyber': return { ...base, backgroundColor: 'transparent', borderTop: `1px solid ${themeColor}40` };
      case 'corporate': return { ...base, backgroundColor: '#ffffff', borderTop: '2px solid #cbd5e1' };
      case 'minimal': return { ...base, backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' };
      case 'glass': return { ...base, backgroundColor: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.2)' };
      case 'classic': default: return { ...base, backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' };
    }
  };

  // 🚀 7. تصميم زر الإطلاق العائم (الجديد)
  const getLauncherStyles = () => {
    let radius = '50%', bg = themeColor, shadow = '0 4px 15px rgba(0,0,0,0.2)', imgRadius = '50%';
    switch(launcherStyle) {
      case 'square': radius = '16px'; imgRadius = '16px'; break;
      case 'teardrop': radius = '50px 50px 0 50px'; imgRadius = '50px 50px 0 50px'; break;
      case 'transparent': bg = 'transparent'; shadow = 'none'; break;
      case 'glow': shadow = `0 0 25px ${themeColor}`; break;
      case 'cloud': 
        radius = '40% 60% 60% 40% / 60% 30% 70% 40%'; 
        imgRadius = '40% 60% 60% 40% / 60% 30% 70% 40%'; 
        break;
      case 'round': default: break;
    }
    
    return {
      container: {
        width: '60px', height: '60px', borderRadius: radius, background: bg, 
        boxShadow: shadow, display: 'flex', justifyContent: 'center', alignItems: 'center', 
        transition: 'all 0.3s ease', cursor: 'pointer', marginTop: '20px', alignSelf: 'flex-end'
      },
      image: { width: '100%', height: '100%', borderRadius: imgRadius, objectFit: 'cover' }
    };
  };

  const launcherStyleConfig = getLauncherStyles();

  return (
    <div className="flex flex-col w-full">
      {/* 📱 نافذة المحادثة */}
      <div style={getContainerStyles()}>
        <div style={getHeaderStyles()}>
          <img 
            src={activeAvatar} alt="bot avatar" 
            className="w-10 h-10 object-cover rounded-full shadow-sm"
            style={{ border: widgetStyle === 'cyber' ? `2px solid ${themeColor}` : '2px solid rgba(255,255,255,0.5)' }}
            onError={(e) => e.target.src = '/botimage.jpg'}
          />
          <div>
            <h3 className="font-bold text-sm m-0 leading-tight">{name || 'مساعد ذكي'}</h3>
            <p className="text-[10px] m-0 mt-1 opacity-80 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> متصل الآن
            </p>
          </div>
        </div>

        <div style={getBodyStyles()}>
          <div className="flex gap-2 justify-start items-end">
            <img src={activeAvatar} className="w-6 h-6 rounded-full object-cover mb-1" alt="bot" onError={(e) => e.target.src = '/botimage.jpg'} />
            <div style={getBotMessageStyles()}>
              {welcomeMessage || 'مرحباً بك! كيف يمكنني مساعدتك؟'}
            </div>
          </div>
          <div className="flex justify-end">
            <div style={getUserMessageStyles()}>أريد الاستفسار عن الخدمة.</div>
          </div>
        </div>

        <div style={getInputAreaStyles()}>
          <input 
            type="text" placeholder="اكتب رسالتك..." className="flex-1 text-xs p-2 outline-none"
            style={{ 
              backgroundColor: widgetStyle === 'cyber' ? '#1e293b' : '#f8fafc',
              color: widgetStyle === 'cyber' ? '#fff' : '#0f172a',
              border: widgetStyle === 'cyber' ? `1px solid ${themeColor}40` : '1px solid transparent',
              borderRadius: widgetStyle === 'floating' ? '16px' : widgetStyle === 'cyber' || widgetStyle === 'minimal' ? '0px' : '8px' 
            }} disabled 
          />
          <div className="w-9 h-9 flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: themeColor, borderRadius: widgetStyle === 'cyber' || widgetStyle === 'minimal' ? '0px' : '50%' }}>➤</div>
        </div>
      </div>

      {/* 🚀 زر الإطلاق العائم للودجت */}
      <div style={launcherStyleConfig.container} className="hover:scale-110">
        <img 
          src={activeAvatar} 
          style={launcherStyleConfig.image} 
          alt="launcher"
          onError={(e) => e.target.src = '/botimage.jpg'}
        />
      </div>
      
    </div>
  );
}