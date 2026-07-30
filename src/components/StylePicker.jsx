import { FAMILIES } from '../config/styleDefs';

function ShapePreview({ type, styleId, color }) {
  const previewStyle = {
    width: type === 'bubble' ? 28 : 36,
    height: type === 'bubble' ? 18 : 32,
    background: color || '#e2e8f0',
    borderRadius: 8,
    transition: 'all 0.3s ease',
    flexShrink: 0
  };

  if (type === 'window') {
    const radii = {
      'standard-saas': 12, 'teardrop': 16, 'squircle': 8,
      'edge-tab': '16px 16px 0 0', 'detached': 12, 'floating-screen': 16,
      'neo-brutalist': 0, 'terminal': 0, 'outline': 4,
      'ticket': 0, 'grid-block': 0, 'cloud': 30,
      'friendly-pill': 24, 'egg': '40px 40px 10px 10px', 'bouncy-bubble': 20,
      'organic-attached': '20px 0 0 20px', 'asymmetrical': '20px 0px 20px 0px',
      'glassmorphism': 16, 'ultra-minimal': 0, 'faded-edge': '0 0 16px 16px',
      'classic-elegant': 4, 'detached-input': 12,
      '3d-pop': 12, 'neumorphism': 16, 'layered-cards': 12,
      'deep-inner-shadow': 12, 'flip-card': 12
    };
    const r = radii[styleId] || 12;
    const shadow = styleId === 'neo-brutalist' ? '3px 3px 0 rgba(0,0,0,0.2)' :
      styleId === '3d-pop' ? `0 3px 0 ${adjustColor(color, -40)}` :
      styleId === 'neumorphism' ? '3px 3px 6px #d1d3d7, -3px -3px 6px #fff' :
      styleId === 'deep-inner-shadow' ? 'inset 0 2px 8px rgba(0,0,0,0.1)' :
      styleId === 'glassmorphism' ? '0 4px 12px rgba(0,0,0,0.08)' :
      styleId === 'edge-tab' ? '0 -2px 8px rgba(0,0,0,0.06)' :
      '0 2px 8px rgba(0,0,0,0.06)';
    const border = styleId === 'neo-brutalist' ? '2px solid #0f172a' :
      styleId === 'outline' ? `2px solid ${color || '#94a3b8'}` :
      styleId === 'grid-block' ? '1px solid #cbd5e1' :
      styleId === 'terminal' ? '1px solid #475569' :
      'none';
    return (
      <div style={{
        ...previewStyle, borderRadius: r, border, boxShadow: shadow,
        background: styleId === 'terminal' ? '#0f172a' : (styleId === 'glassmorphism' ? 'rgba(255,255,255,0.6)' : (color || '#e2e8f0')),
        backdropFilter: styleId === 'glassmorphism' ? 'blur(4px)' : 'none'
      }}>
        {styleId === 'detached-input' && <div style={{ height: 4, background: '#fff', margin: '2px 3px', borderRadius: 2 }} />}
      </div>
    );
  }
  if (type === 'bubble') {
    const classes = {
      'modern': 16, 'classic': '12px 12px 12px 0', 'squircle-bubble': 6,
      'sharp': 0, 'brutalist-bubble': 0, 'terminal-bubble': 0,
      'beveled': 0, 'grid-bubble': 0, 'pill': 24,
      'bouncy': 16, 'circle-tail': '18px 18px 18px 4px',
      'pill-wide': 20, 'asym-bubble': '16px 4px 16px 4px',
      'outline': 16, 'minimal-text': 0, 'glassy-bubble': 12,
      'classic-elegant-bubble': 4,
      '3d': 12, 'neumorphic': 12, 'inset': 8, 'layered-card': 8
    };
    const r = classes[styleId] || 16;
    const border = styleId === 'brutalist-bubble' ? '1.5px solid #0f172a' :
      styleId === 'outline' || styleId === 'grid-bubble' ? `1.5px solid ${color || '#94a3b8'}` :
      styleId === 'classic-elegant-bubble' ? '1px solid #cbd5e1' : 'none';
    const shadow = styleId === '3d' ? `0 2px 0 ${adjustColor(color, -40)}` :
      styleId === 'neumorphic' ? '2px 2px 4px #d1d3d7, -2px -2px 4px #fff' :
      styleId === 'inset' ? 'inset 1px 1px 3px #d1d3d7' :
      styleId === 'layered-card' ? '1px 1px 0 #cbd5e1' : 'none';
    const bg = styleId === 'terminal-bubble' ? 'transparent' :
      styleId === 'outline' || styleId === 'minimal-text' ? 'transparent' :
      color || '#e2e8f0';
    return <div style={{ ...previewStyle, borderRadius: r, border, boxShadow: shadow, background: bg }} />;
  }
  if (type === 'launcher') {
    const classes = {
      'round': '50%', 'square': 12, 'teardrop': '16px 16px 0 16px',
      'oval': '50%', 'pill-text': 20, 'bar': 8,
      'half-circle': '20px 0 0 20px', 'diamond': 0, 'hexagon': 0,
      'transparent': '50%', 'ring': '50%', 'icon-only': 0,
      'glowing-dot': '50%', 'cloud': '40% 60% 60% 40%/60% 30% 70% 40%',
      'tongue': '20px 0 0 20px', 'blob': '40% 60% 60% 40%/60% 30% 70% 40%',
      'egg-shape': '50% 50% 50% 50%/60% 60% 40% 40%', 'bubble-ring': '50%',
      'glow': '50%', 'mechanical': 6, 'stacked-circles': '50%', 'flip-launcher': 0
    };
    const r = classes[styleId] || '50%';
    const s = styleId === 'diamond' ? { transform: 'rotate(45deg)' } :
      styleId === 'flip-launcher' ? { transform: 'rotate(45deg)' } :
      styleId === 'hexagon' ? { clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' } : {};
    const dims = styleId === 'pill-text' || styleId === 'bar' ? { width: 44, height: 20 } : { width: 26, height: 26 };
    const border = styleId === 'transparent' || styleId === 'ring' ? `2px solid ${color || '#94a3b8'}` : 'none';
    const bg = styleId === 'transparent' || styleId === 'ring' || styleId === 'icon-only' ? 'transparent' : (color || '#e2e8f0');
    const shadow = styleId === 'glow' || styleId === 'glowing-dot' ? `0 0 10px ${color}` :
      styleId === 'mechanical' ? `0 2px 0 ${adjustColor(color, -40)}` :
      styleId === 'bubble-ring' ? `0 0 0 3px ${color || '#94a3b8'}40` : '0 1px 4px rgba(0,0,0,0.1)';
    const clip = styleId === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
      styleId === 'hexagon' ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' : 'none';
    return <div style={{ ...previewStyle, ...dims, borderRadius: r, background: bg, boxShadow: shadow, border, clipPath: clip, ...s }} />;
  }
  return null;
}

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
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border-2 transition-all ${
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
