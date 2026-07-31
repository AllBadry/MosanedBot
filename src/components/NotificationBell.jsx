import { useState, useEffect, useRef, useCallback } from 'react';
import API_BASE_URL from '../config/api';

const typeIcons = {
  billing: '💳',
  system: '⚙️',
  bot: '🤖',
  info: '💡',
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} د`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} س`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `منذ ${days} ي`;
  return new Date(dateStr).toLocaleDateString('ar-JO');
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setNotifications(data.data || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    // تحديث الإشعارات عند عودة المستخدم للتبويب (بدل استطلاع مستمر كل 30 ثانية)
    const onFocus = () => fetchNotifications();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleMarkRead = async (id) => {
    const token = localStorage.getItem('accessToken');
    try {
      await fetch(API_BASE_URL + `/api/v1/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch { /* ignore */ }
  };

  const handleMarkAllRead = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await fetch(API_BASE_URL + '/api/v1/notifications/read-all', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch { /* ignore */ }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => { const willOpen = !open; setOpen(willOpen); if (willOpen) fetchNotifications(); }}
        className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
        aria-label="الإشعارات"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-surface rounded-2xl border border-slate-200 shadow-2xl z-[100] max-h-[70vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <h3 className="font-bold text-textMain flex items-center gap-2">
              <span>🔔</span> الإشعارات
            </h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs font-bold text-electric-cyan hover:underline">
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {loading && notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 mx-auto border-3 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-medium text-sm">
                <span className="text-3xl block mb-2">🔔</span>
                لا توجد إشعارات
              </div>
            ) : (
              notifications.map(n => (
                <button
                  key={n._id}
                  onClick={() => { if (!n.read) handleMarkRead(n._id); }}
                  className={`w-full text-right p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-start gap-3 ${!n.read ? 'bg-electric-cyan/5' : ''}`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{typeIcons[n.type] || '💡'}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-bold text-textMain' : 'font-medium text-slate-600'}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-slate-300 mt-1">{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-electric-cyan shrink-0 mt-2"></div>}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
