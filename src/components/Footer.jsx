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
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-electric-cyan hover:border-electric-cyan transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.93H5.078z" /></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-electric-green hover:border-electric-green transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}