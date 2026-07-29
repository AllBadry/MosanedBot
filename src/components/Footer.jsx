import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-surface pt-16 pb-8 border-t border-slate-200 mt-auto overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-t from-electric-cyan/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5">
            {/* الشعار المحدث في الفوتر */}
            <Link to="/" className="group flex items-center gap-2 text-2xl font-black text-textMain mb-6">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-electric-cyan to-electric-green"></span>
              </span>
              مساند<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-green">بوت</span>
            </Link>
            <p className="text-textMuted leading-relaxed max-w-sm mb-6">
              منصة الجيل القادم لخدمة العملاء. اربط متجرك بذكاء اصطناعي متطور في دقائق، وقدم لعملائك تجربة استثنائية على مدار الساعة.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-textMain font-bold mb-6 text-lg">المنصة</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-textMuted hover:text-electric-cyan transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="text-textMuted hover:text-electric-cyan transition-colors">المميزات التقنية</Link></li>
              <li><Link to="/pricing" className="text-textMuted hover:text-electric-cyan transition-colors">الخطط والأسعار</Link></li>
              <li><Link to="/contact" className="text-textMuted hover:text-electric-cyan transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-textMain font-bold mb-6 text-lg">الموارد</h4>
            <ul className="space-y-4">
              <li><Link to="/support" className="text-textMuted hover:text-electric-green transition-colors">مركز المساعدة</Link></li>
              <li><Link to="/terms" className="text-textMuted hover:text-electric-green transition-colors">شروط الاستخدام</Link></li>
              <li><Link to="/Privacy" className="text-textMuted hover:text-electric-green transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          
          {/* تحديث حقوق النشر */}
          <p className="text-textMuted text-sm font-medium">
            © {new Date().getFullYear()} منصة مساند بوت (Mosaned Bot). جميع الحقوق محفوظة.
          </p>
          
          <div className="flex gap-4">
            <a href="https://github.com/Uboor-Tech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-800 hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://www.facebook.com/UboorTech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:bg-[#1877F2]/10 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://www.instagram.com/uboor1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.165 2 12.315 2zm0 1.802h-.08c-2.572 0-2.87.01-3.88.056-1.054.048-1.48.224-1.827.372-.459.196-.787.43-1.131.774-.344.344-.578.672-.774 1.131-.148.347-.324.773-.372 1.827-.047 1.11-.057 1.406-.057 3.88v.63c0 2.473.01 2.77.057 3.88.048 1.054.224 1.48.372 1.827.196.459.43.787.774 1.131.344.344.672.578 1.131.774.347.148.773.324 1.827.372 1.11.047 1.406.057 3.88.057h.63c2.473 0 2.77-.01 3.88-.057 1.054-.048 1.48-.224 1.827-.372.459-.196.787-.43 1.131-.774.344-.344.578-.672.774-1.131.148-.347.324-.773.372-1.827.047-1.11.057-1.406.057-3.88v-.63c0-2.473-.01-2.77-.057-3.88-.048-1.054-.224-1.48-.372-1.827-.196-.459-.43-.787-.774-1.131-.344-.344-.672-.578-1.131-.774-.347-.148-.773-.324-1.827-.372-1.087-.043-1.375-.053-3.8-.056zm0 9.83a3.003 3.003 0 110-6.006 3.003 3.003 0 010 6.006zm0-7.808a4.805 4.805 0 100 9.611 4.805 4.805 0 000-9.611zm6.318-.804a1.123 1.123 0 11-2.246 0 1.123 1.123 0 012.246 0z" clipRule="evenodd" /></svg>
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}