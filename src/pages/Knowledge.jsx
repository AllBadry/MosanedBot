import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import API_BASE_URL from '../config/api';

// إعداد مسار الـ Worker الخاص بمكتبة PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function Knowledge() {
  const fileInputRef = useRef(null);
  
  const [userPlan, setUserPlan] = useState('free');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [message, setMessage] = useState('');
  
  const [activeTab, setActiveTab] = useState('file'); 
  const [textEntry, setTextEntry] = useState({ title: '', content: '' });
  const [knowledgeEntries, setKnowledgeEntries] = useState([]);
  const [previewEntry, setPreviewEntry] = useState(null);

  useEffect(() => {
    const loadUserPlan = async () => {
      const profile = await fetchCurrentUser();
      if (profile?.plan) setUserPlan(profile.plan);
    };

    loadUserPlan();
    fetchKnowledgeList();
  }, []);

  const fetchKnowledgeList = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(API_BASE_URL + '/api/v1/knowledge', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.status === 'success' && data.data.knowledge) {
        setKnowledgeEntries(data.data.knowledge);
      }
    } catch (err) {
      console.error('فشل جلب البيانات', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const getPlanLimits = () => {
    switch (userPlan) {
      case 'pro': 
        return { maxEntries: 50, maxSize: '200MB', maxEntriesNum: 50 };
      case 'enterprise': 
        return { maxEntries: 'غير محدود', maxSize: '200MB', maxEntriesNum: Infinity };
      case 'free':
      default:
        return { maxEntries: 10, maxSize: '3 صفحات للملف', maxEntriesNum: 10 };
    }
  };

  const limits = getPlanLimits();
  const entriesCount = knowledgeEntries.length;
  const usagePercentage = limits.maxEntriesNum === Infinity ? 0 : (entriesCount / limits.maxEntriesNum) * 100;

  const postKnowledgeEntry = async (title, content) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(API_BASE_URL + '/api/v1/knowledge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ title, content })
      });
      
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setKnowledgeEntries([data.data.knowledge, ...knowledgeEntries]);
        setMessage('تمت إضافة القاعدة بنجاح! ✅');
        return true;
      } else {
        setMessage(`❌ ${data.message || 'فشل في الإضافة'}`);
        return false;
      }
    } catch (err) {
      setMessage('❌ خطأ في الاتصال بالخادم.');
      return false;
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textEntry.title.trim() || !textEntry.content.trim()) {
      setMessage('❌ يرجى تعبئة العنوان والمحتوى.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setMessage('جاري حفظ المعلومات... ⏳');
    const success = await postKnowledgeEntry(textEntry.title, textEntry.content);
    
    if (success) {
      setTextEntry({ title: '', content: '' });
    }
    setTimeout(() => setMessage(''), 4000);
  };

  const extractTextFromTXT = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const extractTextFromDOCX = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          resolve(result.value);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    // التحقق من عدد صفحات الخطة المجانية مسبقاً
    if (userPlan === 'free' && pdf.numPages > 3) {
      throw new Error(`الخطة المجانية تسمح بـ 3 صفحات كحد أقصى. هذا الملف يحتوي على ${pdf.numPages} صفحات.`);
    }

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    // 1. التحقق من حجم الملف الفيزيائي (تطبيق شروط الـ 200MB والـ 5MB)
    const fileSizeBytes = uploadedFile.size;
    const maxSizeAllowed = userPlan === 'free' ? (5 * 1024 * 1024) : (200 * 1024 * 1024);
    
    if (fileSizeBytes > maxSizeAllowed) {
      setMessage(`❌ عذراً، حجم الملف يتجاوز الحد المسموح في خطتك.`);
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    if (entriesCount >= limits.maxEntriesNum) {
      setMessage('❌ عذراً، لقد وصلت للحد الأقصى لقواعد المعرفة في خطتك.');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    setIsUploading(true);
    setMessage('جاري قراءة الملف واستخراج النص محلياً... ⏳');

    try {
      let extractedText = '';
      const fileName = uploadedFile.name;
      const titleWithoutExt = fileName.replace(/\.[^/.]+$/, "");

      if (fileName.endsWith('.txt')) {
        extractedText = await extractTextFromTXT(uploadedFile);
      } else if (fileName.endsWith('.docx')) {
        extractedText = await extractTextFromDOCX(uploadedFile);
      } else if (fileName.endsWith('.pdf')) {
        extractedText = await extractTextFromPDF(uploadedFile);
      } else {
        throw new Error("صيغة الملف غير مدعومة. يرجى رفع PDF, DOCX, أو TXT.");
      }

      if (!extractedText || extractedText.trim() === '') {
        throw new Error("الملف فارغ أو لا يحتوي على نص قابل للقراءة.");
      }

      // التحقق الاحترافي من طول النص (حارس النص البديل)
      if (userPlan === 'free' && extractedText.length > 12000) {
        throw new Error("النص المستخرج يتجاوز الحد المسموح للخطة المجانية (~3 صفحات).");
      }

      setMessage('جاري التدريب والحفظ... ⏳');
      await postKnowledgeEntry(titleWithoutExt, extractedText);

    } catch (err) {
      console.error(err);
      setMessage(`❌ فشلت المعالجة: ${err.message || 'تأكد من أن الملف يحتوي على نصوص واضحة.'}`);
    } finally {
      setIsUploading(false);
      setTimeout(() => setMessage(''), 5000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه القاعدة المعرفية؟')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/v1/knowledge/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok || response.status === 204) {
        setKnowledgeEntries(knowledgeEntries.filter(entry => entry._id !== id));
      } else {
        const data = await response.json();
        alert(data.message || 'فشل الحذف');
      }
    } catch (err) {
      alert('خطأ في الاتصال بالخادم');
    }
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 font-sans" dir="rtl">
      
      {/* نافذة المعاينة المنبثقة */}
      {previewEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setPreviewEntry(null)}></div>
          <div className="relative bg-surface w-full max-w-3xl rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 text-electric-cyan flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-textMain">{previewEntry.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">معاينة النص المستخرج والمدرب عليه</p>
                </div>
              </div>
              <button onClick={() => setPreviewEntry(null)} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-slate-50/30 flex-1">
              {previewEntry.content ? (
                <pre className="text-slate-700 font-medium text-sm leading-loose whitespace-pre-wrap font-sans" dir="auto">
                  {previewEntry.content}
                </pre>
              ) : (
                <div className="text-center text-slate-400 py-10">المحتوى فارغ أو قيد المعالجة...</div>
              )}
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={() => setPreviewEntry(null)} className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition-colors">
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan font-bold text-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse"></span>
            محرك الاسترجاع المعزز (RAG)
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-textMain mb-2">إدارة المعرفة 🧠</h1>
          <p className="text-textMuted text-lg font-medium">قم بتغذية البوت بالمعلومات إما برفع ملفات جاهزة أو بكتابتها يدوياً.</p>
        </div>
        
        {message && (
          <div className={`px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all ${message.includes('❌') ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-electric-green/10 text-emerald-600 border border-electric-green/20'}`}>
            {message}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-surface rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
              <button 
                onClick={() => setActiveTab('file')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'file' ? 'bg-white text-electric-cyan shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <span className="text-lg">📄</span> رفع ملف
              </button>
              <button 
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'text' ? 'bg-white text-electric-cyan shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <span className="text-lg">📝</span> إضافة نصية
              </button>
            </div>

            <div className="p-6 md:p-8 relative group">
              {activeTab === 'file' ? (
                <div className="flex flex-col items-center">
                  <div className="w-full bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-xl mb-6 flex items-start gap-3 shadow-sm relative z-10">
                    <span className="text-xl">💡</span>
                    <div>
                      <p className="text-sm font-bold mb-1">تعليمات هامة قبل الرفع:</p>
                      <ul className="list-disc list-inside text-xs font-medium space-y-1">
                        <li><strong>اسم الملف:</strong> سيُستخدم كعنوان للقاعدة. يرجى تسمية الملف بوضوح (مثال: <i>سياسة-الشحن.pdf</i>).</li>
                        <li>تأكد أن الملف يحتوي على <strong>نصوص واضحة وقابلة للنسخ</strong> (وليس صوراً ممسوحة ضوئياً).</li>
                        <li><strong className="text-red-700">ملاحظة هامة للملفات العربية:</strong> قد تظهر الحروف العربية في المعاينة مقلوبة أو متقطعة. **لا تقلق**، هذا أمر طبيعي عند قراءة PDF في المتصفح، **والذكاء الاصطناعي سيفهم محتوى الملف بدقة تامة** ويجيب على الأسئلة بناءً عليه.</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    onClick={() => !isUploading && fileInputRef.current.click()}
                    className={`w-full border-2 border-dashed rounded-[1.5rem] p-12 text-center transition-all duration-300 ${isUploading ? 'border-slate-200 bg-slate-50 cursor-wait' : 'border-slate-300 hover:border-electric-cyan hover:bg-electric-cyan/5 cursor-pointer'}`}
                  >
                    <input type="file" accept=".pdf,.txt,.docx" ref={fileInputRef} onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 border border-slate-100">
                      {isUploading ? (
                        <div className="w-8 h-8 border-4 border-slate-200 border-t-electric-cyan rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-8 h-8 text-slate-400 group-hover:text-electric-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">انقر أو اسحب الملف هنا للرفع</h3>
                    <p className="text-slate-500 font-medium text-xs">
                      يدعم صيغ (PDF, DOCX, TXT) - الحد الأقصى لحجم الملف: <span className="font-bold text-slate-700">{limits.maxSize}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTextSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">العنوان (المرجع)</label>
                    <input 
                      type="text" 
                      required
                      value={textEntry.title}
                      onChange={(e) => setTextEntry({...textEntry, title: e.target.value})}
                      placeholder="مثال: سياسة الشحن والتوصيل" 
                      className="w-full bg-slate-50 border border-slate-200 text-textMain rounded-xl p-3.5 outline-none font-medium focus:border-electric-cyan focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">المعلومات والمحتوى</label>
                    <textarea 
                      required
                      value={textEntry.content}
                      onChange={(e) => setTextEntry({...textEntry, content: e.target.value})}
                      placeholder="أدخل المعلومات هنا بالتفصيل ليقوم البوت بفهمها واستخدامها في الإجابات..." 
                      className="w-full bg-slate-50 border border-slate-200 text-textMain rounded-xl p-4 h-32 resize-none outline-none font-medium focus:border-electric-cyan focus:bg-white transition-colors leading-relaxed"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={message.includes('جاري')} className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-electric-cyan hover:text-slate-900 transition-all shadow-md hover:shadow-glow disabled:opacity-50">
                      إضافة وتدريب البوت
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="bg-surface rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-textMain text-lg">قواعد المعرفة الحالية ({entriesCount})</h3>
            </div>
            
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {isLoadingData ? (
                <div className="p-10 text-center text-slate-500 font-bold animate-pulse">جاري تحميل القواعد...</div>
              ) : knowledgeEntries.length === 0 ? (
                <div className="p-10 text-center text-slate-500 font-medium">لا توجد قواعد معرفة حالياً.</div>
              ) : (
                knowledgeEntries.map((entry) => (
                  <div key={entry._id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4 overflow-hidden pr-2">
                      <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-800 text-sm truncate">{entry.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500 font-medium">قاعدة مسجلة</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-xs text-slate-500 font-medium" dir="ltr">{new Date(entry.createdAt).toISOString().split('T')[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 mr-2 rounded-md bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        نشط
                      </span>
                      
                      <button 
                        onClick={() => setPreviewEntry(entry)}
                        className="text-slate-400 hover:text-electric-cyan hover:bg-electric-cyan/10 p-2 rounded-lg transition-colors"
                        title="معاينة القاعدة"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>

                      <button 
                        onClick={() => handleDeleteEntry(entry._id)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="حذف القاعدة"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-cyan to-electric-green"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-electric-cyan/20 blur-3xl rounded-full"></div>
            
            <h3 className="text-white font-bold mb-6 text-lg">استهلاك قواعد المعرفة</h3>
            
            <div className="mb-4 relative z-10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 font-medium">الخانات المستخدمة</span>
                <span className="text-white font-bold">{entriesCount} / {limits.maxEntries}</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${usagePercentage > 80 ? 'bg-electric-orange' : 'bg-electric-cyan'}`}
                  style={{ width: `${limits.maxEntriesNum === Infinity ? 100 : usagePercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 mt-6 border border-slate-700/50 relative z-10">
              <div className="text-xs text-slate-400 font-medium mb-1">الخطة الحالية</div>
              <div className="text-electric-yellow font-black uppercase tracking-widest text-sm mb-3">
                {userPlan === 'free' ? 'المجانية' : userPlan === 'pro' ? 'الأساسية' : 'الخارقة VIP'}
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-electric-green">✔</span> الحد الأقصى للخانات: {limits.maxEntries}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}