import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config/api';

export default function History() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. جلب الجلسات عند فتح الصفحة
  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const response = await fetch(API_BASE_URL + '/api/v1/bot/history/sessions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.status === 'success') {
          setSessions(data.data.sessions);
        }
      } catch (err) {
        console.error('خطأ في جلب الجلسات', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // 2. جلب الرسائل عند النقر على جلسة
  const handleSelectSession = async (session) => {
    setSelectedSession(session);
    setMessages([]); // تفريغ الرسائل القديمة أثناء التحميل
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/bot/history/sessions/${session._id}/messages`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setMessages(data.data.messages);
      }
    } catch (err) {
      console.error('خطأ في جلب الرسائل', err);
    }
  };

  // 3. حذف جلسة
  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation(); // لمنع تفعيل النقر على الجلسة نفسها
    if (!window.confirm('هل أنت متأكد من حذف هذه المحادثة نهائياً؟')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/bot/history/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      if (response.ok) {
        setSessions(sessions.filter(s => s._id !== sessionId));
        if (selectedSession && selectedSession._id === sessionId) {
          setSelectedSession(null);
          setMessages([]);
        }
      }
    } catch (err) {
      console.error('فشل الحذف', err);
    }
  };

  // دالة لتنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden flex">
      
      {/* القائمة اليمنى: قائمة الجلسات */}
      <div className="w-1/3 bg-slate-50 border-l border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 bg-slate-100 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">المحادثات الأخيرة 📩</h2>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center p-6 text-slate-500">جاري التحميل...</div>
          ) : sessions.length === 0 ? (
            <div className="text-center p-6 text-slate-500">لا توجد محادثات حتى الآن.</div>
          ) : (
            sessions.map(session => (
              <div 
                key={session._id} 
                onClick={() => handleSelectSession(session)}
                className={`p-4 border-b border-slate-200 cursor-pointer transition relative group ${selectedSession?._id === session._id ? 'bg-electric-cyan/10 border-r-4 border-r-electric-cyan' : 'hover:bg-slate-100'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800">زائر #{session.visitorId.slice(-4)}</span>
                  <span className="text-xs text-slate-500">{formatDate(session.lastActivity)}</span>
                </div>
                <div className="text-sm text-slate-500 truncate">
                  {session.status === 'active' ? '🟢 نشط مؤخراً' : '⚪ مغلق'}
                </div>
                
                {/* زر الحذف يظهر عند التمرير بالماوس */}
                <button 
                  onClick={(e) => handleDeleteSession(e, session._id)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                  title="حذف المحادثة"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* المنطقة اليسرى: تفاصيل المحادثة (الرسائل) */}
      <div className="w-2/3 flex flex-col bg-white">
        {!selectedSession ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <span className="text-6xl mb-4">💬</span>
            <p className="text-lg">اختر محادثة من القائمة لعرض تفاصيلها</p>
          </div>
        ) : (
          <>
            <div className="p-4 bg-slate-50 border-b border-slate-200 shadow-sm z-10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800">تفاصيل المحادثة مع: زائر #{selectedSession.visitorId.slice(-4)}</h3>
                <p className="text-xs text-slate-500">تم الإنشاء: {formatDate(selectedSession.createdAt)}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.length === 0 ? (
                <div className="text-center text-slate-500">جاري تحميل الرسائل...</div>
              ) : (
                messages.map(msg => (
                  <div key={msg._id} className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.sender === 'visitor' 
                          ? 'bg-slate-900 text-white rounded-tl-none' 
                          : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tr-none'
                      }`}
                    >
                      <span className="block text-xs mb-1 opacity-70 font-bold">
                        {msg.sender === 'visitor' ? 'الزائر' : 'البوت 🤖'}
                      </span>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                      <span className="block text-left text-[10px] mt-2 opacity-50">
                        {new Date(msg.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}