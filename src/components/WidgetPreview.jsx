const WINDOW_PREVIEW = {
  'classic': { radius: 16, shadow: '0 10px 40px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' },
  'glass': { radius: 16, shadow: '0 8px 32px rgba(0,0,0,0.1)', bg: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.4)', blur: 'blur(16px)' },
  'cyber': { radius: 0, shadow: '0 0 20px rgba(0,0,0,0.5)', bg: '#0f172a', border: '1px solid' },
  'terminal': { radius: 0, shadow: 'none', bg: '#0f172a', border: '1px solid #334155' },
  'neo-brutalist': { radius: 0, shadow: '6px 6px 0px rgba(0,0,0,0.2)', bg: '#fff', border: '2px solid #0f172a' },
  'corporate': { radius: 4, shadow: '6px 6px 0px rgba(0,0,0,0.1)', bg: '#f8fafc', border: '2px solid #cbd5e1' },
  'minimal': { radius: 0, shadow: 'none', bg: '#fff', border: '1px solid #e2e8f0' },
  'luxury': { radius: 6, shadow: '0 20px 60px rgba(0,0,0,0.4)', bg: '#0b1220', border: '1px solid rgba(255,215,0,0.3)' },
  'cloud': { radius: 0, shadow: 'none', bg: 'transparent', border: 'none', cloud: true },
  'floating': { radius: 24, shadow: 'none', bg: 'transparent', border: 'none', floating: true, gap: 12, inputRadius: 12 }
};

const BUBBLE_PREVIEW = {
  'modern': { rBot: 16, rUser: 16, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: 'none', bdUser: 'none', shBot: 'none', shUser: 'none' },
  'classic': { rBot: '12px 12px 12px 0', rUser: '12px 12px 0 12px', bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: 'none', bdUser: 'none', shBot: 'none', shUser: 'none' },
  'sharp': { rBot: 0, rUser: 0, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'pill': { rBot: 24, rUser: 24, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'outline': { rBot: 16, rUser: 16, bgBot: 'transparent', bgUser: 'transparent', cBot: '#334155', cUser: null, bdBot: '1px solid', bdUser: '1px solid' },
  '3d': { rBot: 12, rUser: 12, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', shBot: '0 4px 0 rgba(203,213,225,0.9)', shUser: '0 4px 0 rgba(0,0,0,0.2)' },
  'shadow': { rBot: 12, rUser: 12, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', shBot: '0 4px 10px rgba(0,0,0,0.08)', shUser: '0 4px 12px rgba(0,0,0,0.18)' },
  'gradient': { rBot: 16, rUser: 16, bgBot: 'linear-gradient(135deg,#f1f5f9,#e2e8f0)', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'glassy': { rBot: 12, rUser: 12, bgBot: 'rgba(255,255,255,0.6)', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: '1px solid rgba(255,255,255,0.3)', bdUser: '1px solid rgba(255,255,255,0.3)' },
  'layered': { rBot: 10, rUser: 10, bgBot: '#fff', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: '1px solid #e2e8f0', shBot: '3px 3px 0px #e2e8f0, 6px 6px 0px #f1f5f9', shUser: '3px 3px 0px rgba(0,0,0,0.1), 6px 6px 0px rgba(0,0,0,0.05)' }
};

const LAUNCHER_PREVIEW = {
  'round': { radius: '50%', w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'square': { radius: 16, w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'transparent': { radius: '50%', w: 60, h: 60, bg: 'transparent', shadow: 'none' },
  'pill-text': { radius: 30, w: 'auto', h: 50, shadow: '0 4px 15px rgba(0,0,0,0.2)', text: 'مساعدة؟', px: 24 },
  'bar': { radius: 12, w: 'auto', h: 48, shadow: '0 4px 15px rgba(0,0,0,0.2)', text: 'تحدث مع الدعم', px: 20 },
  'glow': { radius: '50%', w: 60, h: 60, shadow: null },
  'hexagon': { radius: 0, w: 60, h: 52, shadow: '0 4px 15px rgba(0,0,0,0.2)', clip: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  'ring': { radius: '50%', w: 60, h: 60, shadow: '0 0 0 3px' },
  'teardrop': { radius: '50px 50px 0 50px', w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'cloud': { radius: '40% 60% 60% 40% / 60% 30% 70% 40%', w: 60, h: 60, shadow: '0 4px 20px rgba(0,0,0,0.2)' }
};

export default function WidgetPreview({ formData }) {
  const { name, themeColor, welcomeMessage, avatarUrl, widgetStyle, bubbleStyle, launcherStyle } = formData;
  const activeAvatar = avatarUrl || '/botimage.jpg';
  const color = themeColor || '#00F0FF';

  const w = WINDOW_PREVIEW[widgetStyle] || WINDOW_PREVIEW['classic'];
  const b = BUBBLE_PREVIEW[bubbleStyle] || BUBBLE_PREVIEW['modern'];
  const l = LAUNCHER_PREVIEW[launcherStyle] || LAUNCHER_PREVIEW['round'];

  const isLight = (c) => {
    const hex = (c || '').replace('#', '');
    if (hex.length < 6) return false;
    const r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 180;
  };
  const HEADER_OVERRIDE = {
    'terminal': { bg: '#0f172a', color: '#00FF81' },
    'cyber': { bg: 'transparent', color: color },
    'minimal': { bg: 'transparent', color: '#0f172a' },
    'glass': { bg: 'transparent', color: '#0f172a' },
    'luxury': { bg: '#0b1220', color: '#FFD700' }
  };
  const headerOverride = HEADER_OVERRIDE[widgetStyle];
  const headerBg = headerOverride ? headerOverride.bg : color;
  const headerColor = headerOverride ? headerOverride.color : (isLight(color) ? '#0f172a' : '#ffffff');

  return (
    <div className="flex flex-col w-full">
      <div style={{
        display: 'flex', flexDirection: 'column', height: '350px', width: '100%',
        borderRadius: w.radius, backgroundColor: w.bg, boxShadow: w.shadow,
        border: w.border, backdropFilter: w.blur, WebkitBackdropFilter: w.blur,
        transition: 'all 0.4s ease', overflow: w.cloud ? 'visible' : 'hidden',
        gap: w.gap || 0
      }}>
        <div style={{
          padding: '16px', display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: headerBg, color: headerColor,
          borderBottom: w.border !== 'none' ? w.border : 'none',
          borderRadius: w.radius, transition: 'all 0.4s',
          ...(w.cloud ? {
            width: 'fit-content', margin: '-24px auto 0', zIndex: 2,
            borderRadius: 50, boxShadow: `0 8px 20px ${color}66`,
            borderBottom: 'none', padding: '10px 20px'
          } : {}),
          ...(w.floating ? { boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: 18 } : {})
        }}>
          <img src={activeAvatar} alt="bot" className="w-10 h-10 rounded-full object-cover shadow-sm"
            onError={(e) => e.target.src = '/botimage.jpg'} />
          <div>
            <h3 className="font-bold text-sm m-0 leading-tight">{name || 'مساعد ذكي'}</h3>
            <p className="text-[10px] m-0 mt-1 opacity-80 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> متصل الآن
            </p>
          </div>
        </div>

        <div style={{
          flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px',
          ...(w.cloud ? {
            background: '#ffffff', borderRadius: '20px 20px 0 0', margin: '0 10px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
          } : {})
        }}>
          <div className="flex gap-2 justify-start items-end">
            <img src={activeAvatar} className="w-6 h-6 rounded-full object-cover mb-1" alt="bot"
              onError={(e) => e.target.src = '/botimage.jpg'} />
            <div style={{
              padding: '12px', fontSize: '12px', maxWidth: '85%', lineHeight: '1.6',
              borderRadius: b.rBot, backgroundColor: b.bgBot === 'transparent' ? 'transparent' : (b.bgBot || '#f1f5f9'),
              color: b.cBot || '#334155', border: b.bdBot === '1px solid' ? `1px solid ${color}` : (b.bdBot || 'none'),
              boxShadow: b.shBot || 'none', fontFamily: b.font || 'inherit',
              borderBottom: b.bdb || 'none'
            }}>
              {welcomeMessage || 'مرحباً بك! كيف يمكنني مساعدتك؟'}
            </div>
          </div>
          <div className="flex justify-end">
            <div style={{
              padding: '12px', fontSize: '12px', maxWidth: '85%', lineHeight: '1.6',
              borderRadius: b.rUser, backgroundColor: b.bgUser === 'transparent' ? 'transparent' : (b.bgUser || color),
              color: b.cUser || (b.bgUser === 'transparent' ? color : '#fff'),
              border: b.bdUser === '1px solid' ? `1px solid ${color}` : (b.bdUser || 'none'),
              boxShadow: b.shUser || 'none', fontFamily: b.font || 'inherit',
              borderBottom: b.bdb || 'none'
            }}>
              أريد الاستفسار عن الخدمة.
            </div>
          </div>
        </div>

        <div style={{
          padding: '12px', display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: w.cloud ? '#ffffff' : (w.floating ? '#ffffff' : (w.bg === '#f5f7fa' || w.bg === '#f8fafc' ? '#fff' : w.bg)),
          borderTop: '1px solid #f1f5f9',
          margin: w.gap ? '0 4px 4px 4px' : (w.cloud ? '0 10px' : 0),
          borderRadius: w.inputRadius || 0,
          ...(w.cloud ? { borderRadius: '0 0 20px 20px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' } : {})
        }}>
          <input type="text" placeholder="اكتب رسالتك..." disabled
            className="flex-1 text-xs p-2 outline-none"
            style={{
              backgroundColor: '#f8fafc',
              color: '#0f172a',
              border: '1px solid transparent',
              borderRadius: w.inputRadius || (typeof w.radius === 'number' ? w.radius / 2 : 8)
            }}
          />
          <div className="w-9 h-9 flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: color, borderRadius: '50%' }}>➤</div>
        </div>
      </div>

      <div style={{
        width: l.w, height: l.h, borderRadius: l.radius, background: l.bg || color,
        boxShadow: l.shadow ? (l.shadow === '0 0 0 3px' ? `0 0 0 3px ${color}` : l.shadow === '0 0 20px' ? `0 0 20px ${color}` : l.shadow) : `0 0 25px ${color}`,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        cursor: 'pointer', marginTop: '20px', alignSelf: 'flex-end',
        transition: 'all 0.3s ease', clipPath: l.clip || 'none',
        padding: l.px || 0
      }} className="hover:scale-110">
        {l.text ? (
          <span className="text-white text-xs font-bold whitespace-nowrap">{l.text}</span>
        ) : (
          <img src={activeAvatar} style={{ width: '100%', height: '100%', borderRadius: l.radius, objectFit: 'cover' }}
            alt="launcher" onError={(e) => e.target.src = '/botimage.jpg'} />
        )}
      </div>
    </div>
  );
}
