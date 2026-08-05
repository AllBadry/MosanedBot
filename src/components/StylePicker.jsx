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
  'standard-saas':     { radius: { tl: 12, tr: 12, br: 12, bl: 12 }, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.14)' },
  'teardrop':          { radius: 16, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.14)' },
  'squircle':          { radius: 8, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'edge-tab':          { radius: { tl: 14, tr: 14, br: 0, bl: 0 }, bg: '#ffffff', shadow: '0 2px 8px rgba(0,0,0,0.12)', edge: 'top' },
  'detached':          { radius: 14, bg: '#f5f7fa', shadow: '0 4px 12px rgba(0,0,0,0.15)', detached: true },
  'floating-screen':   { radius: 16, bg: '#ffffff', shadow: '0 6px 16px rgba(0,0,0,0.18)' },
  'neo-brutalist':     { radius: 0, bg: '#ffffff', border: '2px solid #0f172a', shadow: '3px 3px 0 rgba(0,0,0,0.55)' },
  'terminal':          { radius: 0, bg: '#0f172a', border: '1px solid #334155', terminal: true },
  'outline':           { radius: 4, bg: '#ffffff', border: '2px solid', shadow: 'none' },
  'ticket':            { radius: 0, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)', clip: 'polygon(0% 4px,4px 0%,calc(100% - 4px) 0%,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0% calc(100% - 4px))' },
  'grid-block':        { radius: 0, bg: '#ffffff', border: '1px solid #e2e8f0', grid: true },
  'cloud':             { radius: { tl: 26, tr: 26, br: 26, bl: 26 }, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'friendly-pill':     { radius: 22, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'egg':               { radius: { tl: 30, tr: 30, br: 8, bl: 8 }, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'bouncy-bubble':     { radius: 18, bg: '#ffffff', shadow: '0 4px 12px rgba(0,0,0,0.14)' },
  'organic-attached':  { radius: { tl: 16, tr: 0, br: 0, bl: 16 }, bg: '#ffffff', shadow: '-3px 0 10px rgba(0,0,0,0.08)', attachRight: true },
  'asymmetrical':      { radius: { tl: 16, tr: 0, br: 16, bl: 0 }, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'glassmorphism':     { radius: 14, bg: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.5)', shadow: '0 3px 10px rgba(0,0,0,0.1)', glass: true },
  'ultra-minimal':     { radius: 0, bg: 'transparent', shadow: 'none' },
  'faded-edge':        { radius: { tl: 0, tr: 0, br: 14, bl: 14 }, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'classic-elegant':   { radius: 4, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.1)', headerBg: '#ffffff', headerColor: '#0f172a' },
  'detached-input':    { radius: 12, bg: '#f8fafc', shadow: '0 4px 12px rgba(0,0,0,0.14)', detached: true },
  '3d-pop':            { radius: 12, bg: '#ffffff', pop: true },
  'neumorphism':       { radius: 14, bg: '#eef0f4', shadow: '3px 3px 6px #d1d3d7, -3px -3px 6px #ffffff', headerBg: '#eef0f4', headerColor: '#0f172a' },
  'layered-cards':     { radius: 12, bg: '#ffffff', shadow: '0 3px 10px rgba(0,0,0,0.12)' },
  'deep-inner-shadow': { radius: 12, bg: '#f8fafc', shadow: 'inset 0 2px 6px rgba(0,0,0,0.12)' },
  'flip-card':         { radius: 12, bg: '#ffffff', shadow: '0 3px 12px rgba(0,0,0,0.15)' }
};

function WindowPreview({ styleId, color }) {
  const c = color || '#00F0FF';
  const cfg = WINDOW_CFG[styleId] || WINDOW_CFG['standard-saas'];
  const isDark = cfg.terminal;
  const headerBg = cfg.headerBg || (isDark ? '#0f172a' : c);
  const headerColor = cfg.headerColor || (isDark ? '#00FF81' : (cfg.headerBg ? '#0f172a' : '#ffffff'));

  const l = cfg.edge === 'top' ? 0 : (cfg.attachRight ? 4 : 3);
  const r = (cfg.edge === 'top' || cfg.attachRight) ? 0 : 3;
  const t = cfg.edge === 'top' ? 0 : (cfg.detached ? 2 : 1);
  const b = cfg.detached ? 6 : 1;

  const shadow = cfg.shadow === 'pop' ? `0 3px 0 ${adjustColor(c, -45)}, 0 4px 10px rgba(0,0,0,0.12)` :
    (cfg.border === '2px solid' ? `0 0 0 1px ${c}40` : cfg.shadow);

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
        clipPath: cfg.clip || 'none',
        backdropFilter: cfg.glass ? 'blur(3px)' : 'none',
        WebkitBackdropFilter: cfg.glass ? 'blur(3px)' : 'none',
        backgroundImage: cfg.grid ? 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)' : 'none',
        backgroundSize: cfg.grid ? '6px 6px' : 'auto',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          height: 8, flexShrink: 0, background: headerBg, color: headerColor,
          display: 'flex', alignItems: 'center', padding: '0 4px', gap: 2
        }}>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: headerColor, opacity: 0.9, display: 'inline-block' }} />
          <span style={{ width: 10, height: 1.5, background: headerColor, opacity: 0.5, borderRadius: 1, display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, padding: '4px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'flex-end' }}>
          {isDark ? (
            <>
              <div style={{ height: 2.5, width: '70%', background: '#00FF81', opacity: 0.55, borderRadius: 1 }} />
              <div style={{ height: 2.5, width: '50%', background: '#00FF81', opacity: 0.3, borderRadius: 1 }} />
            </>
          ) : (
            <>
              <div style={{ height: 5, width: '72%', background: '#e2e8f0', borderRadius: 2, alignSelf: 'flex-start' }} />
              <div style={{ height: 5, width: '55%', background: c, borderRadius: 2, alignSelf: 'flex-end' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const BUBBLE_CFG = {
  'modern':              { rBot: 14, rUser: 14 },
  'classic':             { rBot: '12px 12px 12px 0', rUser: '12px 12px 0 12px' },
  'squircle-bubble':     { rBot: 5, rUser: 5 },
  'sharp':               { rBot: 0, rUser: 0 },
  'brutalist-bubble':    { rBot: 0, rUser: 0, borderBot: '1.5px solid #0f172a', shadowBot: '2px 2px 0 rgba(0,0,0,0.35)' },
  'terminal-bubble':     { rBot: 0, rUser: 0, terminal: true },
  'beveled':             { rBot: 0, rUser: 0, clipBot: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)', clipUser: 'polygon(0% 0%,calc(100% - 3px) 0%,100% 100%,3px 100%)' },
  'grid-bubble':         { rBot: 0, rUser: 0, borderUser: '1px solid' },
  'pill':                { rBot: 24, rUser: 24 },
  'bouncy':              { rBot: 18, rUser: 18, shadowBot: '0 2px 5px rgba(0,0,0,0.18)' },
  'circle-tail':         { rBot: '16px 16px 16px 3px', rUser: '16px 16px 3px 16px' },
  'pill-wide':           { rBot: 18, rUser: 18 },
  'asym-bubble':         { rBot: '14px 4px 14px 4px', rUser: '14px 4px 14px 4px' },
  'outline':             { rBot: 14, rUser: 14, outline: true },
  'minimal-text':        { rBot: 0, rUser: 0, minimal: true },
  'glassy-bubble':       { rBot: 12, rUser: 12, glass: true },
  'classic-elegant-bubble': { rBot: 4, rUser: 4, borderBot: '1px solid #cbd5e1' },
  '3d':                  { rBot: 10, rUser: 10, pop: true },
  'neumorphic':          { rBot: 10, rUser: 10, neumo: true },
  'inset':               { rBot: 8, rUser: 8, inset: true },
  'layered-card':        { rBot: 8, rUser: 8, layered: true }
};

function BubblePreview({ styleId, color }) {
  const c = color || '#00F0FF';
  const cfg = BUBBLE_CFG[styleId] || BUBBLE_CFG['modern'];
  const transparent = cfg.outline || cfg.minimal || cfg.terminal;
  const botBg = transparent ? 'transparent' : '#e2e8f0';
  const userBg = transparent ? 'transparent' : c;
  const botColor = cfg.terminal ? '#00FF81' : '#64748b';
  const userColor = cfg.terminal ? '#00FF81' : (transparent ? '#0f172a' : '#ffffff');
  const botBorder = cfg.borderBot || (cfg.outline ? `1.5px solid ${c}` : 'none');
  const userBorder = cfg.borderUser || (cfg.outline ? `1.5px solid ${c}` : 'none');
  const botShadow = cfg.shadowBot ||
    (cfg.neumo ? '2px 2px 4px #d1d3d7, -2px -2px 4px #ffffff' :
     cfg.inset ? 'inset 1px 1px 3px #d1d3d7' :
     cfg.pop ? `0 2px 0 ${adjustColor(c, -50)}` :
     cfg.layered ? '1px 1px 0 #cbd5e1' : 'none');
  const userShadow = cfg.neumo ? '2px 2px 4px rgba(0,0,0,0.18)' :
    cfg.inset ? 'inset 1px 1px 3px #d1d3d7' :
    cfg.pop ? `0 2px 0 ${adjustColor(c, -50)}` :
    cfg.layered ? '1px 1px 0 #cbd5e1' : 'none';

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
      }}>
        {cfg.terminal && <span>~$</span>}
      </div>
      <div style={{
        ...base, color: userColor, width: 15, height: 10, borderRadius: cfg.rUser, background: userBg,
        border: userBorder, boxShadow: userShadow, clipPath: cfg.clipUser || 'none',
        borderBottom: cfg.minimal ? '1px solid #cbd5e1' : 'none',
        backdropFilter: cfg.glass ? 'blur(2px)' : 'none'
      }}>
        {cfg.terminal && <span>&gt;_</span>}
      </div>
    </div>
  );
}

function LauncherPreview({ styleId, color }) {
  const c = color || '#00F0FF';
  const darker = adjustColor(c, -55);

  const cfg = {
    'round':          { radius: '50%', w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'square':         { radius: 7, w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'teardrop':       { radius: '18px 18px 0 18px', w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'oval':           { radius: 20, w: 28, h: 20, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'pill-text':      { radius: 14, w: 34, h: 13, text: 'مساعدة؟', shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'bar':            { radius: 6, w: 38, h: 13, text: 'تحدث مع الدعم', shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'half-circle':    { radius: '10px 0 0 10px', w: 18, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'diamond':        { radius: 0, w: 24, h: 24, clip: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)', rotate: 45, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'hexagon':        { radius: 0, w: 24, h: 21, clip: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)', shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'transparent':    { radius: '50%', w: 24, h: 24, border: `2px solid ${c}`, bg: 'transparent', shadow: 'none' },
    'ring':           { radius: '50%', w: 24, h: 24, border: `2px solid ${c}`, bg: 'transparent', shadow: `0 0 0 2px ${c}33` },
    'icon-only':      { radius: 0, w: 12, h: 12, border: `1.5px solid ${c}`, bg: 'transparent', shadow: 'none' },
    'glowing-dot':    { radius: '50%', w: 16, h: 16, shadow: `0 0 8px ${c}` },
    'cloud':          { radius: '40% 60% 60% 40% / 60% 30% 70% 40%', w: 24, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'tongue':         { radius: '10px 0 0 10px', w: 16, h: 28, shadow: `-2px 0 6px rgba(0,0,0,0.12)` },
    'blob':           { radius: '40% 60% 60% 40% / 60% 30% 70% 40%', w: 24, h: 24, shadow: `0 3px 8px rgba(0,0,0,0.22)` },
    'egg-shape':      { radius: '50% 50% 50% 50% / 60% 60% 40% 40%', w: 20, h: 24, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'bubble-ring':    { radius: '50%', w: 26, h: 26, border: `2px solid ${c}66`, bg: 'transparent', shadow: 'none' },
    'glow':           { radius: '50%', w: 24, h: 24, shadow: `0 0 10px ${c}` },
    'mechanical':     { radius: 4, w: 24, h: 24, shadow: `0 3px 0 ${darker}` },
    'stacked-circles': { radius: '50%', w: 24, h: 24, stacked: true, shadow: `0 2px 6px rgba(0,0,0,0.2)` },
    'flip-launcher':  { radius: 0, w: 22, h: 22, clip: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)', rotate: 45, shadow: `0 2px 6px rgba(0,0,0,0.2)` }
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
      {cfg.stacked ? (
        <div style={{ width: cfg.w, height: cfg.h, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: '70%', height: '70%', borderRadius: '50%', background: c + '55' }} />
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '70%', height: '70%', borderRadius: '50%', background: c }} />
        </div>
      ) : (
        <div style={shape}>
          {cfg.text && (
            <span style={{
              color: '#fff', fontSize: 6, fontWeight: 700, whiteSpace: 'nowrap',
              overflow: 'hidden', maxWidth: '100%', textOverflow: 'ellipsis'
            }}>{cfg.text}</span>
          )}
        </div>
      )}
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
