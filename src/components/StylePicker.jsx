import { FAMILIES } from '../config/styleDefs';

function getStylePreview(type, styleId, familyColor) {
  const base = 'w-10 h-10 rounded-xl border-2 mx-auto transition-all duration-300';
  const active = `border-[${familyColor}] bg-[${familyColor}]/10`;

  if (type === 'window') {
    const radii = {
      'standard-saas': 'rounded-xl', 'teardrop': 'rounded-2xl', 'squircle': 'rounded-lg',
      'edge-tab': 'rounded-t-2xl rounded-b-none', 'detached': 'rounded-xl shadow-md',
      'floating-screen': 'rounded-2xl mt-3', 'neo-brutalist': 'rounded-none border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.3)]',
      'terminal': 'rounded-none', 'outline': 'rounded border-2', 'ticket': 'rounded-none',
      'grid-block': 'rounded-none border border-dashed', 'cloud': 'rounded-[20px]',
      'friendly-pill': 'rounded-3xl', 'egg': 'rounded-t-[30px] rounded-b-lg',
      'bouncy-bubble': 'rounded-2xl', 'organic-attached': 'rounded-r-2xl rounded-l-none',
      'asymmetrical': 'rounded-[20px_0px_20px_0px]', 'glassmorphism': 'rounded-2xl bg-white/50 backdrop-blur',
      'ultra-minimal': 'rounded-none shadow-sm', 'faded-edge': 'rounded-b-2xl rounded-t-none',
      'classic-elegant': 'rounded', 'detached-input': 'rounded-xl shadow-md',
      '3d-pop': 'rounded-xl shadow-[0_4px_0px_rgba(0,0,0,0.15)]', 'neumorphism': 'rounded-2xl shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.7)]',
      'layered-cards': 'rounded-xl', 'deep-inner-shadow': 'rounded-xl shadow-inner',
      'flip-card': 'rounded-xl'
    };
    return `${base} ${radii[styleId] || 'rounded-xl'}`;
  }
  if (type === 'bubble') {
    const classes = {
      'modern': 'rounded-xl', 'classic': 'rounded-[12px_12px_12px_0]', 'squircle-bubble': 'rounded',
      'sharp': 'rounded-none', 'brutalist-bubble': 'rounded-none border-2 border-black',
      'terminal-bubble': 'rounded-none border border-green-500', 'beveled': 'rounded-none',
      'grid-bubble': 'rounded-none border border-dashed', 'pill': 'rounded-full',
      'bouncy': 'rounded-xl shadow-md', 'circle-tail': 'rounded-[18px_18px_18px_4px]',
      'pill-wide': 'rounded-full w-24', 'asym-bubble': 'rounded-[12px_4px_12px_4px]',
      'outline': 'rounded-xl border-2 bg-transparent', 'minimal-text': 'rounded-none border-b',
      'glassy-bubble': 'rounded-xl bg-white/50', 'classic-elegant-bubble': 'rounded border',
      '3d': 'rounded-xl shadow-[0_3px_0px_rgba(0,0,0,0.15)]', 'neumorphic': 'rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]',
      'inset': 'rounded-lg shadow-inner', 'layered-card': 'rounded-lg shadow-[1px_1px_0px_rgba(0,0,0,0.1),2px_2px_0px_rgba(0,0,0,0.05)]'
    };
    return `${base} h-6 w-16 mx-auto ${classes[styleId] || 'rounded-xl'}`;
  }
  if (type === 'launcher') {
    const classes = {
      'round': 'rounded-full', 'square': 'rounded-xl', 'teardrop': 'rounded-[16px_16px_0_16px]',
      'oval': 'rounded-full w-12', 'pill-text': 'rounded-full w-16',
      'bar': 'rounded-lg w-20', 'half-circle': 'rounded-l-full rounded-r-none',
      'diamond': 'rotate-45 rounded-none', 'hexagon': 'rounded-none',
      'transparent': 'rounded-full bg-transparent border-2', 'ring': 'rounded-full border-2 bg-transparent',
      'icon-only': 'rounded-none w-6 h-6', 'glowing-dot': 'rounded-full w-6 h-6',
      'cloud': 'rounded-[40%_60%_60%_40%/60%_30%_70%_40%]', 'tongue': 'rounded-l-full rounded-r-none h-12',
      'blob': 'rounded-[40%_60%_60%_40%/60%_30%_70%_40%]', 'egg-shape': 'rounded-[50%_50%_50%_50%/60%_60%_40%_40%]',
      'bubble-ring': 'rounded-full shadow-[0_0_0_3px_rgba(0,0,0,0.1)]', 'glow': 'rounded-full shadow-lg',
      'mechanical': 'rounded-lg shadow-[0_3px_0px_rgba(0,0,0,0.2)]', 'stacked-circles': 'rounded-full',
      'flip-launcher': 'rotate-45 rounded-lg'
    };
    return `${base} ${classes[styleId] || 'rounded-full'}`;
  }
  return base;
}

export default function StylePicker({ type, styles, value, onChange }) {
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
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1.5">
            {family.styles.map(style => {
              const isSelected = value === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onChange(style.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-electric-cyan/10 border-electric-cyan shadow-sm'
                      : 'border-transparent bg-slate-50 hover:bg-slate-100 hover:border-slate-200'
                  }`}
                  title={style.name}
                >
                  <div
                    className={getStylePreview(type, style.id, family.color)}
                    style={{ backgroundColor: isSelected ? family.color : '#e2e8f0', borderColor: isSelected ? family.color : '#e2e8f0' }}
                  />
                  <span className="text-[10px] text-slate-500 leading-tight text-center">{style.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
