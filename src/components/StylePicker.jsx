import { FAMILIES } from '../config/styleDefs';

function adjustColor(hex, amount) {
  if (!hex || hex === 'null') return '#94a3b8';
  try {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0xFF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  } catch { return '#94a3b8'; }
}

function corners(r) {
  if (typeof r === 'number') return `${r}px ${r}px ${r}px ${r}px`;
  if (typeof r === 'string') return r;
  const o = r || {};
  return `${o.tl || 0}px ${o.tr || 0}px ${o.br || 0}px ${o.bl || 0}px`;
}

const WINDOW_CFG = {
  'classic':       { radius: { tl: 16, tr: 16, br: 16, bl: 16 }, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.14)' },
  'glass':         { radius: 16, bg: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.4)', shadow: '0 3px 10px rgba(0,0,0,0.1)', glass: true, headerBg: 'transparent', headerColor: '#0f172a' },
  'cyber':         { radius: 0, bg: '#0f172a', border: '1px solid', shadow: '0 0 8px rgba(0,0,0,0.6)', cyber: true, headerBg: 'transparent', headerColor: null },
  'terminal':      { radius: 0, bg: '#0f172a', border: '1px solid #334155', terminal: true, headerBg: '#0f172a', headerColor: '#00FF81' },
  'neo-brutalist': { radius: 0, bg: '#ffffff', border: '2px solid #0f172a', shadow: '3px 3px 0 rgba(0,0,0,0.55)' },
  'corporate':     { radius: 4, bg: '#f8fafc', border: '2px solid #cbd5e1', shadow: '3px 3px 0 rgba(0,0,0,0.12)' },
  'minimal':       { radius: 0, bg: '#ffffff', border: '1px solid #e2e8f0', shadow: 'none', headerBg: 'transparent', headerColor: '#0f172a' },
  'luxury':        { radius: 4, bg: '#0b1220', border: '1px solid rgba(255,215,0,0.3)', shadow: '0 3px 10px rgba(0,0,0,0.25)', luxury: true, headerBg: '#0b1220', headerColor: '#FFD700' },
  'cloud':         { radius: 0, bg: '#ffffff', cloud: true },
  'floating':      { radius: 24, bg: 'transparent', shadow: 'none', floating: true }
};

function WindowPreview({ styleId, color }) {
  const c = color || '#00F0FF';
  const cfg = WINDOW_CFG[styleId] || WINDOW_CFG['classic'];
  const isDark = cfg.cyber || cfg.terminal || cfg.luxury;
  const isLightColor = (hex) => {
    try {
      const h = (hex || '').replace('#', '');
      if (h.length < 6) return false;
      const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
      return (r * 299 + g * 587 + b * 114) / 1000 > 180;
    } catch { return false; }
  };
  const headerBg = cfg.headerBg !== undefined ? cfg.headerBg : (cfg.cloud || cfg.floating ? c : c);
  const headerColor = cfg.headerColor !== undefined && cfg.headerColor !== null
    ? cfg.headerColor
    : (cfg.cyber ? c : (isDark ? (cfg.terminal ? '#00FF81' : '#FFD700') : (isLightColor(c) ? '#0f172a' : '#ffffff')));

  const l = 3;
  const r = 3;
  const t = cfg.cloud ? 8 : 1;
  const b = 1;

  const shadow = cfg.border === '2px solid' || cfg.border === '1px solid'
    ? (cfg.cyber ? `0 0 0 1px ${c}50` : (cfg.border === '2px solid' ? '3px 3px 0 rgba(0,0,0,0.35)' : '0 0 0 1px rgba(0,0,0,0.06)'))
    : (cfg.cloud ? '0 3px 10px rgba(0,0,0,0.12)' : cfg.shadow);

  return (
    <div className="flex-shrink-0" style={{
      width: 54, height: 40, borderRadius: 6, position: 'relative',
      background: 'linear-gradient(135deg, #eef2f7, #d3dbe5)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        position: 'absolute', left: l, right: r, top: t, bottom: b,
        background: cfg.bg, borderRadius: corners(cfg.radius),
        border: cfg.border || 'none', boxShadow: shadow || 'none',
        backdropFilter: cfg.glass ? 'blur(3px)' : 'none',
        WebkitBackdropFilter: cfg.glass ? 'blur(3px)' : 'none',
        overflow: cfg.cloud ? 'visible' : 'hidden', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          height: 8, flexShrink: 0, background: headerBg, color: headerColor,
          display: 'flex', alignItems: 'center', padding: '0 4px', gap: 2,
          boxShadow: cfg.floating ? '0 2px 6px rgba(0,0,0,0.12)' : 'none',
          ...(cfg.cloud ? {
            position: 'absolute', top: -5, left: 8, right: 8,
            height: 7, borderRadius: 50, boxShadow: `0 2px 4px ${c}55`, zIndex: 1
          } : {})
        }}>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: headerColor, opacity: 0.9, display: 'inline-block' }} />
          <span style={{ width: 10, height: 1.5, background: headerColor, opacity: 0.5, borderRadius: 1, display: 'inline-block' }} />
        </div>
        {cfg.cloud && <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '4px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'flex-end' }}>
            <div style={{ height: 5, width: '72%', background: '#e2e8f0', borderRadius: 2, alignSelf: 'flex-start' }} />
            <div style={{ height: 5, width: '55%', background: c, borderRadius: 2, alignSelf: 'flex-end' }} />
          </div>
        </div>}
        {!cfg.cloud && (
          <div style={{ flex: 1, padding: '4px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'flex-end' }}>
            {isDark ? (
              <>
                <div style={{ height: 2.5, width: '70%', background: headerColor, opacity: 0.55, borderRadius: 1 }} />
                <div style={{ height: 2.5, width: '50%', background: headerColor, opacity: 0.3, borderRadius: 1 }} />
              </>
            ) : (
              <>
                <div style={{ height: 5, width: '72%', background: '#e2e8f0', borderRadius: 2, alignSelf: 'flex-start' }} />
                <div style={{ height: 5, width: '55%', background: c, borderRadius: 2, alignSelf: 'flex-end' }} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const BUBBLE_CFG = {
  'modern':   { rBot: 16, rUser: 16 },
  'classic':  { rBot: '12px 12px 12px 0', rUser: '12px 12px 0 12px' },
  'shadow':   { rBot: 12, rUser: 12, shadowBot: '0 2px 4px rgba(0,0,0,0.2)' },
  'gradient': { rBot: 16, rUser: 16, gradient: true },
  'sharp':    { rBot: 0, rUser: 0 },
  'outline':  { rBot: 16, rUser: 16, outline: true },
  'glassy':   { rBot: 12, rUser: 12, glass: true },
  'pill':     { rBot: 24, rUser: 24 },
  '3d':       { rBot: 12, rUser: 12, shadowBot: '0 2px 0 #cbd5e1', shadowUser: '0 2px 0 rgba(0,0,0,0.2)' },
  'layered':  { rBot: 8, rUser: 8, layered: true }
};

function BubblePreview({ styleId, color }) {
  const c = color || '#00F0FF';
  const cfg = BUBBLE_CFG[styleId] || BUBBLE_CFG['modern'];
  const transparent = cfg.outline || cfg.minimal;
  const botBg = cfg.gradient ? 'linear-gradient(135deg,#e2e8f0,#cbd5e1)' : (transparent ? 'transparent' : '#e2e8f0');
  const userBg = cfg.gradient ? `linear-gradient(135deg,${c},${adjustColor(c, -50)})` : (transparent ? 'transparent' : c);
  const botColor = '#64748b';
  const userColor = transparent ? '#0f172a' : '#ffffff';
  const botBorder = cfg.borderBot || (cfg.outline ? `1.5px solid ${c}` : 'none');
  const userBorder = cfg.borderUser || (cfg.outline ? `1.5px solid ${c}` : 'none');
  const botShadow = cfg.shadowBot ||
    (cfg.layered ? '1px 1px 0 #cbd5e1' : 'none');
  const userShadow = cfg.layered ? '1px 1px 0 rgba(0,0,0,0.2)' : 'none';

  const base = { display: 'flex', alignItems: 'center', justifyContent: 'center', color: botColor, fontSize: 6, fontWeight: 700 };
  return (
    <div className="flex-shrink-0" style={{
      width: 54, height: 34, borderRadius: 6, padding: 4,
      display: 'flex', alignItems: 'flex-end', gap: 5,
      background: 'linear-gradient(135deg, #eef2f7, #d3dbe5)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        ...base, width: 20, height: 12, borderRadius: cfg.rBot, background: botBg,
        border: botBorder, boxShadow: botShadow, clipPath: cfg.clipBot || 'none',
        borderBottom: cfg.minimal ? '1px solid #cbd5e1' : 'none',
        backdropFilter: cfg.glass ? 'blur(2px)' : 'none'
      }} />
      <div style={{
        ...base, color: userColor, width: 15, height: 10, borderRadius: cfg.rUser, background: userBg,
        border: userBorder, boxShadow: userShadow, clipPath: cfg.clipUser || 'none',
        borderBottom: cfg.minimal ? '1px solid #cbd5e1' : 'none',
        backdropFilter: cfg.glass ? 'blur(2px)' : 'none'
      }} />
    </div>
  );
}

function LauncherPreview({ styleId, color }) {
  const c = color || '#00F0FF';

  const cfg = {
    'round':       { radius: '50%', w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'square':      { radius: 7, w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'transparent': { radius: '50%', w: 24, h: 24, bg: 'transparent', shadow: 'none' },
    'pill-text':   { radius: 14, w: 34, h: 13, text: 'مساعدة؟', shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'bar':         { radius: 6, w: 38, h: 13, text: 'تحدث مع الدعم', shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'glow':        { radius: '50%', w: 24, h: 24, shadow: `0 0 10px ${c}` },
    'hexagon':     { radius: 0, w: 24, h: 21, clip: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)', shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'ring':        { radius: '50%', w: 24, h: 24, border: `2px solid ${c}`, bg: 'transparent', shadow: `0 0 0 2px ${c}33` },
    'teardrop':    { radius: '24px 24px 0 24px', w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'cloud':       { radius: '40% 60% 60% 40% / 60% 30% 70% 40%', w: 24, h: 24, shadow: `0 3px 8px rgba(0,0,0,0.22)` }
  }[styleId] || { radius: '50%', w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` };

  const shape = {
    width: cfg.w, height: cfg.h, borderRadius: cfg.radius,
    background: cfg.bg === 'transparent' ? 'transparent' : (cfg.bg || c),
    border: cfg.border || 'none', boxShadow: cfg.shadow || 'none',
    clipPath: cfg.clip || 'none',
    transform: cfg.rotate ? 'rotate(45deg)' : 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative'
  };

  return (
    <div className="flex-shrink-0" style={{
      width: 54, height: 40, borderRadius: 6,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #eef2f7, #d3dbe5)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.08)'
    }}>
      <div style={shape}>
        {cfg.text && (
          <span style={{
            color: '#fff', fontSize: 6, fontWeight: 700, whiteSpace: 'nowrap',
            overflow: 'hidden', maxWidth: '100%', textOverflow: 'ellipsis'
          }}>{cfg.text}</span>
        )}
      </div>
    </div>
  );
}

function ShapePreview({ type, styleId, color }) {
  if (type === 'window') return <WindowPreview styleId={styleId} color={color} />;
  if (type === 'bubble') return <BubblePreview styleId={styleId} color={color} />;
  return <LauncherPreview styleId={styleId} color={color} />;
}

export default function StylePicker({ type, styles, value, onChange, color }) {
  const families = FAMILIES.map(f => ({
    ...f,
    styles: styles.filter(s => s.family === f.id)
  })).filter(f => f.styles.length > 0);

  return (
    <div className="space-y-4">
      {families.map(family => (
        <div key={family.id}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: family.color }} />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{family.name}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {family.styles.map(style => {
              const isSelected = value === style.id;
              const bg = isSelected ? (color || family.color) : (color ? adjustColor(color, 60) : '#e2e8f0');
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onChange(style.id)}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-electric-cyan/10 border-electric-cyan shadow-sm'
                      : 'border-transparent bg-white hover:bg-slate-50 hover:border-slate-200 shadow-sm'
                  }`}
                  title={style.name}
                >
                  <ShapePreview type={type} styleId={style.id} color={bg} />
                  <span className="text-xs text-slate-600 whitespace-nowrap">{style.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
