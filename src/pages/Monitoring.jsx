import { useEffect, useRef, useState } from 'react';
import { apiFetch } from '../utils/apiFetch';

const REFRESH_MS = 5000;
const LIVE_NOW_MS = 5 * 60 * 1000;
const RECENT_MS = 60 * 60 * 1000;
const PAGE_LOADED_AT = Date.now();

function timeAgo(iso, now) {
  if (!iso) return '—';
  const diff = Math.max(0, now - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} د`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} س`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

function visitorLabel(session) {
  if (session?.visitorName) return session.visitorName;
  if (session?.visitorEmail) return session.visitorEmail;
  return `زائر #${String(session?.visitorId || '????').slice(-4)}`;
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="bg-surface rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${accent || 'bg-slate-100'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500">{label}</p>
        <p className="text-2xl font-black text-textMain tabular-nums">{value}</p>
      </div>
    </div>
  );
}

export default function Monitoring() {
  const [now, setNow] = useState(PAGE_LOADED_AT);
  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [botInfo, setBotInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const loadOverview = async () => {
    if (!localStorage.getItem('accessToken')) return;
    try {
      const res = await apiFetch('/api/v1/bot/monitoring/overview');
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        setStats(data.data.stats);
        setSessions(data.data.liveSessions || []);
        setBotInfo(data.data.bot || null);
        setError('');
      } else if (data.status === 'fail') {
        setError(data.message || 'تعذر جلب بيانات المراقبة');
      }
    } catch {
      setError('تعذر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const loadSessionMessages = async (sessionId) => {
    if (!sessionId) return;
    setMessagesLoading(true);
    try {
      const res = await apiFetch(`/api/v1/bot/history/sessions/${sessionId}/messages`);
      const data = await res.json();
      if (data.status === 'success') setMessages(data.data.messages || []);
    } catch {
      // ignore
    } finally {
      setMessagesLoading(false);
    }
  };

  // ساعة حية + استطلاع الإحصائيات (تحميل فوري ثم كل 5 ثوانٍ)
  useEffect(() => {
    const initial = setTimeout(() => {
      setNow(Date.now());
      loadOverview();
    }, 0);
    const timer = setInterval(() => {
      setNow(Date.now());
      loadOverview();
    }, REFRESH_MS);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, []);

  // استطلاع رسائل الجلسة المختارة (تحميل فوري ثم كل 5 ثوانٍ)
  useEffect(() => {
    if (!selectedSession?._id) return;
    const initial = setTimeout(() => loadSessionMessages(selectedSession._id), 0);
    const timer = setInterval(() => loadSessionMessages(selectedSession._id), REFRESH_MS);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, [selectedSession?._id]);

  // تمرير تلقائي لأسفل عند وصول رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, selectedSession?._id]);

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setMessages([]);
    loadSessionMessages(session._id);
  };

  const statusTone = (session) => {
    const last = session?.lastActivity ? new Date(session.lastActivity).getTime() : 0;
    if (now - last < LIVE_NOW_MS) return 'bg-green-500 animate-pulse';
    if (now - last < RECENT_MS) return 'bg-amber-400';
    return 'bg-slate-400';
  };

  return (
    <div className="animate-fade-in">
      {/* الهيدر */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-textMain">المراقبة الحية 📡</h1>
          <p className="text-sm text-textMuted mt-1">
            {botInfo ? `بوت: ${botInfo.name}` : 'لوحة معلومات البوت'}
            {!error && <span className="mr-2 text-green-600 font-bold">● متصل — يتحدث كل {REFRESH_MS / 1000} ثوانٍ</span>}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm font-bold text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🟢" label="نشطون الآن" value={stats?.activeNow ?? '—'} accent="bg-green-100" />
        <StatCard icon="📅" label="جلسات اليوم" value={stats?.sessionsToday ?? '—'} accent="bg-blue-100" />
        <StatCard icon="💬" label="رسائل اليوم" value={stats?.messagesToday ?? '—'} accent="bg-electric-cyan/10" />
        <StatCard icon="👥" label="زوار اليوم" value={stats?.visitorsToday ?? '—'} accent="bg-yellow-100" />
      </div>

      {/* الجلسات الحية + المحادثة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* قائمة الجلسات الحية */}
        <div className="bg-surface rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-black text-textMain">الجلسات النشطة ({sessions.length})</h2>
            <span className="text-xs font-bold text-slate-500">آخر 24 ساعة</span>
          </div>
          <div className="max-h-[540px] overflow-y-auto hide-scrollbar">
            {loading ? (
              <div className="text-center p-8 text-slate-500">جاري التحميل...</div>
            ) : sessions.length === 0 ? (
              <div className="text-center p-8 text-slate-400">
                <span className="text-5xl block mb-3">🌙</span>
                <p className="font-bold">لا توجد جلسات نشطة حالياً</p>
              </div>
            ) : (
              sessions.map(session => {
                const active = selectedSession?._id === session._id;
                return (
                  <button
                    key={session._id}
                    onClick={() => handleSelectSession(session)}
                    className={`w-full text-right p-4 border-b border-slate-100 transition-all relative group ${active ? 'bg-electric-cyan/10 border-r-4 border-r-electric-cyan' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${statusTone(session)}`}></span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-textMain truncate">{visitorLabel(session)}</span>
                          <span className="text-[11px] text-slate-500 shrink-0 font-medium">{timeAgo(session.lastActivity, now)}</span>
                        </div>
                        <p className="text-sm text-slate-500 truncate mt-0.5">
                          {session.lastMessage
                            ? `${session.lastMessage.sender === 'visitor' ? 'الزائر' : 'البوت 🤖'}: ${session.lastMessage.content}`
                            : 'لا توجد رسائل بعد'}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-medium">
                          {session.visitorEmail && <span>✉️ {session.visitorEmail}</span>}
                          {session.deviceInfo && <span>📱 {session.deviceInfo}</span>}
                          {session.ipAddress && <span>🌐 {session.ipAddress}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* نافذة المحادثة */}
        <div className="bg-surface rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {!selectedSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
              <span className="text-6xl mb-4">👁️</span>
              <p className="font-bold text-lg">اختر جلسة من القائمة لمشاهدتها مباشرة</p>
              <p className="text-sm mt-2">تتحدث الرسائل الجديدة تلقائياً دون تحديث الصفحة</p>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="min-w-0">
                  <h3 className="font-bold text-textMain truncate">{visitorLabel(selectedSession)}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedSession.deviceInfo || ''} {selectedSession.ipAddress ? `· ${selectedSession.ipAddress}` : ''}
                    <span className="mr-2">آخر نشاط: {timeAgo(selectedSession.lastActivity, now)}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200 transition-colors text-sm font-bold shrink-0"
                >
                  إغلاق ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 max-h-[480px]">
                {messagesLoading && messages.length === 0 ? (
                  <div className="text-center text-slate-500 py-8">جاري تحميل الرسائل...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-slate-400 py-8">لا توجد رسائل في هذه الجلسة</div>
                ) : (
                  messages.map(msg => (
                    <div key={msg._id} className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] p-3 rounded-2xl ${
                        msg.sender === 'visitor'
                          ? 'bg-slate-900 text-white rounded-tl-none'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tr-none'
                      }`}>
                        <span className="block text-xs mb-1 opacity-70 font-bold">
                          {msg.sender === 'visitor' ? 'الزائر' : 'البوت 🤖'}
                        </span>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                        <span className="block text-left text-[10px] mt-2 opacity-50">
                          {new Date(msg.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
