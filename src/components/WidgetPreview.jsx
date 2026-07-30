const WINDOW_PREVIEW = {
  'standard-saas': { radius: 12, shadow: '0 10px 40px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' },
  'teardrop': { radius: 16, shadow: '0 8px 30px rgba(0,0,0,0.08)', bg: '#fff', border: 'none' },
  'squircle': { radius: 8, shadow: '0 4px 20px rgba(0,0,0,0.06)', bg: '#fff', border: 'none' },
  'edge-tab': { radius: '16px 16px 0 0', shadow: '0 -4px 20px rgba(0,0,0,0.08)', bg: '#fff', border: 'none' },
  'detached': { radius: 16, shadow: '0 10px 40px rgba(0,0,0,0.1)', bg: '#f5f7fa', border: 'none', gap: 10 },
  'floating-screen': { radius: 16, shadow: '0 15px 50px rgba(0,0,0,0.12)', bg: '#fff', border: 'none' },
  'neo-brutalist': { radius: 0, shadow: '6px 6px 0px rgba(0,0,0,0.2)', bg: '#fff', border: '2px solid #0f172a' },
  'terminal': { radius: 0, shadow: 'none', bg: '#0f172a', border: '1px solid #334155' },
  'outline': { radius: 4, shadow: 'none', bg: '#fff', border: '2px solid' },
  'ticket': { radius: 0, shadow: '0 5px 20px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' },
  'grid-block': { radius: 0, shadow: 'none', bg: '#fff', border: '1px solid #e2e8f0' },
  'cloud': { radius: 30, shadow: '0 10px 40px rgba(0,0,0,0.08)', bg: '#fff', border: 'none' },
  'friendly-pill': { radius: 24, shadow: '0 8px 30px rgba(0,0,0,0.06)', bg: '#fff', border: 'none' },
  'egg': { radius: '40px 40px 10px 10px', shadow: '0 10px 40px rgba(0,0,0,0.08)', bg: '#fff', border: 'none' },
  'bouncy-bubble': { radius: 20, shadow: '0 10px 40px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' },
  'organic-attached': { radius: '20px 0 0 20px', shadow: '-5px 0 25px rgba(0,0,0,0.06)', bg: '#fff', border: 'none' },
  'asymmetrical': { radius: '20px 0px 20px 0px', shadow: '0 10px 40px rgba(0,0,0,0.08)', bg: '#fff', border: 'none' },
  'glassmorphism': { radius: 16, shadow: '0 8px 32px rgba(0,0,0,0.1)', bg: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.3)', blur: 'blur(16px)' },
  'ultra-minimal': { radius: 0, shadow: '0 2px 30px rgba(0,0,0,0.04)', bg: 'transparent', border: 'none' },
  'faded-edge': { radius: '0 0 16px 16px', shadow: '0 10px 40px rgba(0,0,0,0.08)', bg: '#fff', border: 'none' },
  'classic-elegant': { radius: 4, shadow: '0 10px 40px rgba(0,0,0,0.06)', bg: '#fff', border: 'none' },
  'detached-input': { radius: 12, shadow: '0 10px 40px rgba(0,0,0,0.08)', bg: '#f8fafc', border: 'none', gap: 6 },
  '3d-pop': { radius: 12, shadow: '0 8px 0px #cbd5e1, 0 10px 30px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' },
  'neumorphism': { radius: 16, shadow: '8px 8px 16px #d1d3d7, -8px -8px 16px #ffffff', bg: '#eef0f4', border: 'none' },
  'layered-cards': { radius: 12, shadow: '0 10px 40px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' },
  'deep-inner-shadow': { radius: 12, shadow: 'inset 0 4px 20px rgba(0,0,0,0.08)', bg: '#f8fafc', border: 'none' },
  'flip-card': { radius: 12, shadow: '0 10px 40px rgba(0,0,0,0.1)', bg: '#fff', border: 'none' }
};

const BUBBLE_PREVIEW = {
  'modern': { rBot: 16, rUser: 16, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: 'none', bdUser: 'none', shBot: 'none', shUser: 'none' },
  'classic': { rBot: '12px 12px 12px 0', rUser: '12px 12px 0 12px', bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: 'none', bdUser: 'none', shBot: 'none', shUser: 'none' },
  'squircle-bubble': { rBot: 6, rUser: 6, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: 'none', bdUser: 'none' },
  'sharp': { rBot: 0, rUser: 0, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'brutalist-bubble': { rBot: 0, rUser: 0, bgBot: '#f8fafc', bgUser: null, cBot: '#0f172a', cUser: '#fff', bdBot: '2px solid #0f172a', bdUser: '2px solid', shBot: '3px 3px 0px #0f172a', shUser: '3px 3px 0px rgba(0,0,0,0.15)' },
  'terminal-bubble': { rBot: 0, rUser: 0, bgBot: 'transparent', bgUser: 'transparent', cBot: '#00FF81', cUser: '#00FF81', bdBot: 'none', bdUser: 'none', shBot: 'none', shUser: 'none', font: '"Courier New", monospace' },
  'beveled': { rBot: 0, rUser: 0, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'grid-bubble': { rBot: 0, rUser: 0, bgBot: '#fff', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: '1px solid #e2e8f0', bdUser: '1px solid' },
  'pill': { rBot: 24, rUser: 24, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'bouncy': { rBot: 20, rUser: 20, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', shBot: '0 4px 15px rgba(0,0,0,0.06)', shUser: '0 4px 15px rgba(0,0,0,0.1)' },
  'circle-tail': { rBot: '18px 18px 18px 4px', rUser: '18px 18px 4px 18px', bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'pill-wide': { rBot: 20, rUser: 20, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'asym-bubble': { rBot: '16px 4px 16px 4px', rUser: '16px 4px 16px 4px', bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff' },
  'outline': { rBot: 16, rUser: 16, bgBot: 'transparent', bgUser: 'transparent', cBot: '#334155', cUser: null, bdBot: '1px solid', bdUser: '1px solid' },
  'minimal-text': { rBot: 0, rUser: 0, bgBot: 'transparent', bgUser: 'transparent', cBot: '#334155', cUser: null, bdBot: 'none', bdUser: 'none', bdb: '1px solid #e2e8f0' },
  'glassy-bubble': { rBot: 12, rUser: 12, bgBot: 'rgba(255,255,255,0.6)', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: '1px solid rgba(255,255,255,0.3)', bdUser: '1px solid rgba(255,255,255,0.3)' },
  'classic-elegant-bubble': { rBot: 4, rUser: 4, bgBot: '#fff', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: '1px solid #e2e8f0' },
  '3d': { rBot: 12, rUser: 12, bgBot: '#f1f5f9', bgUser: null, cBot: '#334155', cUser: '#fff', shBot: '0 4px 0px #cbd5e1', shUser: '0 4px 0px rgba(0,0,0,0.2)' },
  'neumorphic': { rBot: 12, rUser: 12, bgBot: '#eef0f4', bgUser: null, cBot: '#334155', cUser: '#fff', shBot: '4px 4px 8px #d1d3d7, -4px -4px 8px #ffffff', shUser: '4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.5)' },
  'inset': { rBot: 8, rUser: 8, bgBot: '#eef0f4', bgUser: null, cBot: '#334155', cUser: '#fff', shBot: 'inset 3px 3px 6px #d1d3d7, inset -3px -3px 6px #ffffff' },
  'layered-card': { rBot: 8, rUser: 8, bgBot: '#fff', bgUser: null, cBot: '#334155', cUser: '#fff', bdBot: '1px solid #e2e8f0', shBot: '2px 2px 0px #e2e8f0, 4px 4px 0px #f1f5f9', shUser: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.05)' }
};

const LAUNCHER_PREVIEW = {
  'round': { radius: '50%', w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'square': { radius: 16, w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'teardrop': { radius: '50px 50px 0 50px', w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'oval': { radius: 40, w: 70, h: 50, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'pill-text': { radius: 30, w: 'auto', h: 50, shadow: '0 4px 15px rgba(0,0,0,0.2)', text: 'مساعدة؟', px: 24 },
  'bar': { radius: 12, w: 'auto', h: 48, shadow: '0 4px 15px rgba(0,0,0,0.2)', text: 'تحدث مع الدعم', px: 20 },
  'half-circle': { radius: '30px 0 0 30px', w: 50, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'diamond': { radius: 0, w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)', clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  'hexagon': { radius: 0, w: 60, h: 52, shadow: '0 4px 15px rgba(0,0,0,0.2)', clip: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  'transparent': { radius: '50%', w: 60, h: 60, shadow: 'none', bg: 'transparent' },
  'ring': { radius: '50%', w: 60, h: 60, shadow: '0 0 0 3px' },
  'icon-only': { radius: 0, w: 32, h: 32, shadow: 'none', bg: 'transparent' },
  'glowing-dot': { radius: '50%', w: 40, h: 40, shadow: '0 0 20px' },
  'cloud': { radius: '40% 60% 60% 40% / 60% 30% 70% 40%', w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'tongue': { radius: '30px 0 0 30px', w: 48, h: 80, shadow: '-4px 0 15px rgba(0,0,0,0.1)' },
  'blob': { radius: '40% 60% 60% 40% / 60% 30% 70% 40%', w: 60, h: 60, shadow: '0 4px 20px rgba(0,0,0,0.2)' },
  'egg-shape': { radius: '50% 50% 50% 50% / 60% 60% 40% 40%', w: 55, h: 65, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'bubble-ring': { radius: '50%', w: 64, h: 64, shadow: '0 0 0 8px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.15)' },
  'glow': { radius: '50%', w: 60, h: 60, shadow: null },
  'mechanical': { radius: 8, w: 60, h: 60, shadow: '0 6px 0px rgba(0,0,0,0.2), 0 4px 15px rgba(0,0,0,0.2)' },
  'stacked-circles': { radius: '50%', w: 60, h: 60, shadow: '0 4px 15px rgba(0,0,0,0.2)' },
  'flip-launcher': { radius: 0, w: 55, h: 55, shadow: '0 4px 15px rgba(0,0,0,0.2)' }
};

export default function WidgetPreview({ formData }) {
  const { name, themeColor, welcomeMessage, avatarUrl, widgetStyle, bubbleStyle, launcherStyle } = formData;
  const activeAvatar = avatarUrl || '/botimage.jpg';
  const color = themeColor || '#00F0FF';

  const w = WINDOW_PREVIEW[widgetStyle] || WINDOW_PREVIEW['standard-saas'];
  const b = BUBBLE_PREVIEW[bubbleStyle] || BUBBLE_PREVIEW['modern'];
  const l = LAUNCHER_PREVIEW[launcherStyle] || LAUNCHER_PREVIEW['round'];

  const headerBg = widgetStyle === 'terminal' || widgetStyle === 'classic-elegant' || widgetStyle === 'ultra-minimal' || widgetStyle === 'neumorphism' ? w.bg : color;
  const headerColor = w.bg === '#0f172a' || w.bg === 'transparent' || widgetStyle === 'ultra-minimal' || widgetStyle === 'classic-elegant' || widgetStyle === 'neumorphism' ? '#0f172a' : '#fff';

  return (
    <div className="flex flex-col w-full">
      <div style={{
        display: 'flex', flexDirection: 'column', height: '350px', width: '100%',
        borderRadius: w.radius, backgroundColor: w.bg, boxShadow: w.shadow,
        border: w.border, backdropFilter: w.blur, WebkitBackdropFilter: w.blur,
        transition: 'all 0.4s ease', overflow: typeof w.radius === 'number' || typeof w.radius === 'string' ? 'hidden' : 'visible',
        gap: w.gap || 0
      }}>
        <div style={{
          padding: '16px', display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: headerBg, color: headerColor,
          borderBottom: typeof w.radius === 'number' || widgetStyle === 'standard-saas' || widgetStyle.includes('floating') ? 'none' : (w.border !== 'none' ? w.border : 'none'),
          borderRadius: w.radius, transition: 'all 0.4s'
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

        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex gap-2 justify-start items-end">
            <img src={activeAvatar} className="w-6 h-6 rounded-full object-cover mb-1" alt="bot"
              onError={(e) => e.target.src = '/botimage.jpg'} />
            <div style={{
              padding: '12px', fontSize: '12px', maxWidth: '85%', lineHeight: '1.6',
              borderRadius: b.rBot, backgroundColor: b.bgBot === 'transparent' ? 'transparent' : (b.bgBot || '#f1f5f9'),
              color: b.cBot || '#334155', border: b.bdBot || 'none',
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
          backgroundColor: w.bg === '#f5f7fa' || w.bg === '#f8fafc' ? '#fff' : w.bg,
          borderTop: '1px solid #f1f5f9',
          margin: w.gap ? '0 4px 4px 4px' : 0,
          borderRadius: w.inputRadius || 0
        }}>
          <input type="text" placeholder="اكتب رسالتك..." disabled
            className="flex-1 text-xs p-2 outline-none"
            style={{
              backgroundColor: widgetStyle === 'terminal' ? '#1e293b' : '#f8fafc',
              color: widgetStyle === 'terminal' ? '#fff' : '#0f172a',
              border: widgetStyle === 'terminal' ? '1px solid #334155' : '1px solid transparent',
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
