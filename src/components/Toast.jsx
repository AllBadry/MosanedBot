import { useEffect, useRef } from 'react';

const successIcon = (
  <svg className="w-5 h-5 text-electric-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const errorIcon = (
  <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const loadingIcon = <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin shrink-0"></div>;

const icons = { success: successIcon, error: errorIcon, loading: loadingIcon };

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (duration > 0 && onClose) {
      timeoutRef.current = setTimeout(onClose, duration);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [duration, onClose]);

  if (!message) return null;

  const bg = type === 'error' ? 'bg-red-500 text-white border-red-600' :
             type === 'loading' ? 'bg-slate-900 text-white border-electric-cyan/30' :
             'bg-slate-900 text-white border-electric-green/30';

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-fade-in pointer-events-none">
      <div className={`px-6 py-4 rounded-full font-bold text-sm flex items-center gap-3 shadow-2xl border ${bg}`}>
        {icons[type] || null}
        <span className="tracking-wide">{message}</span>
      </div>
    </div>
  );
}
