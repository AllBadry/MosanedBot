import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const KEY_PLACEHOLDER = 'YOUR_KEY_HERE';

function makeWidgetCode(key) {
  return `<!-- Mosaned AI Bot -->\n<script src="https://api.mosaned.org/mosaned-widget.js" data-widget-key="${key}"></script>`;
}

export default function WidgetDocs() {
  const [searchParams] = useSearchParams();
  const [copiedSection, setCopiedSection] = useState(null);

  const rawKey = searchParams.get('key') || '';
  const widgetKey = /^[a-f0-9]{40}$/i.test(rawKey) ? rawKey : 'YOUR_KEY_HERE';
  const hasKey = widgetKey !== 'YOUR_KEY_HERE';

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const widgetCode = makeWidgetCode(widgetKey);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const codeExamples = [
    {
      id: 'html',
      title: 'مواقع HTML الثابتة',
      desc: 'ضع الكود قبل وسم &lt;/body&gt; في كل صفحة.',
      lang: 'HTML',
      code: widgetCode,
    },
    {
      id: 'react',
      title: 'تطبيقات React & SPAs',
      desc: 'ضع الكود مرة واحدة في public/index.html.',
      lang: 'public/index.html',
      code: `<!DOCTYPE html>\n<html lang="en">\n  <body>\n    <div id="root"></div>\n    ${widgetCode}\n  </body>\n</html>`,
    },
    {
      id: 'php',
      title: 'مواقع PHP',
      desc: 'ضع الكود في ملف الفوتر العام footer.php.',
      lang: 'footer.php',
      code: `<footer></footer>\n${widgetCode}\n</body>\n</html>`,
    },
    {
      id: 'global',
      title: 'الحقن عبر Global JS',
      desc: 'لحقن البوت عبر ملف جافاسكريبت عام.',
      lang: 'main.js',
      code: `document.addEventListener('DOMContentLoaded', function() {\n    const script = document.createElement('script');\n    script.src = 'https://api.mosaned.org/mosaned-widget.js';\n    script.setAttribute('data-widget-key', '${widgetKey}');\n    document.body.appendChild(script);\n});`,
    },
  ];

  const scripts = [
    {
      id: 'python',
      title: '🐍 سكريبت Python',
      lang: 'python',
      code: `import os
import shutil

WIDGET_KEY = "${widgetKey}"
WIDGET_CODE = f'\\n<!-- Mosaned Bot -->\\n<script src="https://api.mosaned.org/mosaned-widget.js" data-widget-key="{WIDGET_KEY}"></script>\\n'

def inject_mosaned_bot(directory="."):
    print("🚀 بدء عملية حقن بوت مساند...")
    backup_dir = os.path.join(directory, "mosaned_backup")
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
        print(f"📁 تم إنشاء مجلد نسخ احتياطي: {backup_dir}")
    modified_count = 0
    for root, dirs, files in os.walk(directory):
        if "mosaned_backup" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    if "api.mosaned.org/mosaned-widget.js" in content:
                        continue
                    if "</body>" in content or "</BODY>" in content:
                        shutil.copy2(filepath, os.path.join(backup_dir, file))
                        new_content = content.replace("</body>", WIDGET_CODE + "</body>")
                        new_content = new_content.replace("</BODY>", WIDGET_CODE + "</BODY>")
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        modified_count += 1
                except Exception as e:
                    print(f"❌ حدث خطأ في ملف {file}: {e}")
    print(f"🎉 تمت العملية! تم إضافة البوت إلى {modified_count} صفحة.")

if __name__ == "__main__":
    inject_mosaned_bot()`,
    },
    {
      id: 'nodejs',
      title: '🟢 سكريبت Node.js',
      lang: 'javascript',
      code: `const fs = require('fs');
const path = require('path');

const WIDGET_KEY = '${widgetKey}';
const WIDGET_CODE = \`\\n<!-- Mosaned Bot -->\\n<script src="https://api.mosaned.org/mosaned-widget.js" data-widget-key="\${WIDGET_KEY}"></script>\\n\`;

const targetDir = './';
const backupDir = './mosaned_backup';

console.log('🚀 بدء عملية حقن بوت مساند...');

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

let modifiedCount = 0;

function injectBot(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fullPath.includes('mosaned_backup') || fullPath.includes('node_modules')) continue;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            injectBot(fullPath);
        } else if (path.extname(fullPath).toLowerCase() === '.html') {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('api.mosaned.org/mosaned-widget.js')) continue;
            if (content.includes('</body>') || content.includes('</BODY>')) {
                fs.copyFileSync(fullPath, path.join(backupDir, file));
                content = content.replace(/<\\/body>/i, WIDGET_CODE + '</body>');
                fs.writeFileSync(fullPath, content, 'utf8');
                modifiedCount++;
            }
        }
    }
}

injectBot(targetDir);
console.log(\`🎉 تمت العملية! تم إضافة البوت إلى \${modifiedCount} صفحة.\`);`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-300 font-sans relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF] text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            وثائق المطورين
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            دليل دمج بوت مساند <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#00F0FF] to-blue-500">🚀</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            في هذه الصفحة ستجد جميع الطرق الهندسية لزرع ويدجيت الذكاء الاصطناعي في موقعك، بغض النظر عن لغة البرمجة أو إطار العمل الذي تستخدمه.
          </p>
        </header>

        {/* Widget Key Banner */}
        <div className={`rounded-2xl border p-6 mb-10 ${hasKey ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-amber-900/20 border-amber-500/30'}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔑</span>
            <h2 className="text-white font-bold text-lg">مفتاحك الخاص (Widget Key)</h2>
          </div>
          {hasKey ? (
            <p className="text-emerald-400 text-sm font-medium">
              تم التعرف على مفتاحك. جميع الأمثلة أدناه مضمنة بمفتاحك تلقائياً.
            </p>
          ) : (
            <p className="text-amber-400 text-sm font-medium">
              هذا هو المفتاح الذي يربط موقعك بالبوت الخاص بك. استبدل <code className="bg-white/10 px-2 py-0.5 rounded text-amber-300">YOUR_KEY_HERE</code> بمفتاحك الحقيقي في الأمثلة التالية.
            </p>
          )}
          <div className="mt-3 bg-black/40 rounded-xl p-3 font-mono text-sm text-center" dir="ltr">
            <code className="text-[#00F0FF] break-all">{hasKey ? widgetKey : 'YOUR_KEY_HERE'}</code>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <h3 className="text-white font-bold mb-4">📋 المحتويات</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <a href="#html" className="text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5">1. مواقع HTML الثابتة</a>
            <a href="#react" className="text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5">2. تطبيقات React & SPAs</a>
            <a href="#php" className="text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5">3. مواقع PHP</a>
            <a href="#global" className="text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5">4. الحقن عبر Global JS</a>
            <a href="#auto-inject" className="text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5">5. أدوات الحقن التلقائي</a>
          </div>
        </div>

        {/* Integration Methods */}
        <section className="space-y-8 mb-16">
          {codeExamples.map((ex, i) => (
            <div key={ex.id} id={ex.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden scroll-mt-20">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center text-sm font-black">{i + 1}.</span>
                  <h2 className="text-xl font-bold text-white">{ex.title}</h2>
                </div>
                <p className="text-slate-400 mb-4 text-sm">{ex.desc}</p>
                <div className="bg-black/60 rounded-xl overflow-hidden border border-white/5">
                  <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                    <span className="text-xs text-slate-500 font-mono">{ex.lang}</span>
                    <button
                      onClick={() => copyToClipboard(ex.code, ex.id)}
                      className="text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-medium"
                    >
                      {copiedSection === ex.id ? 'تم النسخ ✓' : 'نسخ الكود 📋'}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed" dir="ltr">
                    <code>{ex.code.split('\n').map((line, li) => (
                      <span key={li} className="block">
                        <span className="text-slate-600 select-none ml-4">{String(li + 1).padStart(2, ' ')}</span>
                        {line.includes('YOUR_KEY_HERE') && !hasKey ? (
                          <span>
                            {line.split('YOUR_KEY_HERE').map((part, pi) => (
                              <span key={pi}>
                                {pi > 0 && <span className="text-amber-300 bg-amber-500/10 px-1 rounded">YOUR_KEY_HERE</span>}
                                <span className="text-slate-300">{part}</span>
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="text-slate-300">{line}</span>
                        )}
                      </span>
                    ))}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Auto Inject Tools */}
        <section id="auto-inject">
          <div className="bg-gradient-to-r from-amber-900/20 to-red-900/20 border border-amber-500/20 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span>⚡</span> 5. أدوات الحقن التلقائي المتقدمة
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              هل موقعك يحتوي على مئات صفحات الـ HTML الثابتة؟ هذه السكربتات تمر على جميع ملفاتك، تأخذ نسخة احتياطية (Backup)، وتزرع كود البوت فيها آلياً في ثوانٍ.
            </p>
            <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 text-sm text-red-300">
              <p className="font-bold mb-2">⚠️ تحذيرات هامة قبل الاستخدام</p>
              <ul className="space-y-1 text-red-400/80 list-disc list-inside">
                <li>مخصصة فقط للـ <strong>Static HTML</strong> — لا تستخدمها في أطر العمل الحديثة (React, Vue, Next.js).</li>
                <li>غير صالحة لأنظمة المحتوى — تجنب استخدامها داخل مجلدات WordPress أو المتاجر الإلكترونية.</li>
                <li>جرّب محلياً أولاً — شغّل السكربت على نسخة من موقعك في جهازك الشخصي قبل الرفع للاستضافة.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {scripts.map((s) => (
              <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-4">{s.title}</h3>
                  <div className="bg-black/60 rounded-xl overflow-hidden border border-white/5">
                    <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                      <span className="text-xs text-slate-500 font-mono">{s.lang}</span>
                      <button
                        onClick={() => copyToClipboard(s.code, s.id)}
                        className="text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-medium"
                      >
                        {copiedSection === s.id ? 'تم النسخ ✓' : 'عرض كود السكريبت'}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed max-h-96 overflow-y-auto" dir="ltr">
                      <code>{s.code.split('\n').map((line, li) => (
                        <span key={li} className="block">
                          <span className="text-slate-600 select-none ml-4">{String(li + 1).padStart(2, ' ')}</span>
                          <span className="text-slate-300">{line}</span>
                        </span>
                      ))}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-500 text-sm border-t border-white/5 pt-8">
          <p>© {new Date().getFullYear()} مساند — جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
  );
}
