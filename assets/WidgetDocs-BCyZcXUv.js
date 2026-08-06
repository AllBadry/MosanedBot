import{o as e}from"./rolldown-runtime-DAXXjFlN.js";import{p as t,t as n,u as r}from"./react-vendor-BSRmGhlt.js";var i=e(t(),1),a=n();function o(e){return`<!-- Mosaned AI Bot -->\n<script src="https://api.mosaned.org/mosaned-widget.js" data-widget-key="${e}"><\/script>`}function s(){let[e]=r(),[t,n]=(0,i.useState)(null),s=e.get(`key`)||``,c=/^[a-f0-9]{40}$/i.test(s)?s:`YOUR_KEY_HERE`,l=c!==`YOUR_KEY_HERE`;(0,i.useEffect)(()=>{let e=window.location.hash;e&&setTimeout(()=>{document.querySelector(e)?.scrollIntoView({behavior:`smooth`})},100)},[]);let u=o(c),d=(e,t)=>{navigator.clipboard.writeText(e),n(t),setTimeout(()=>n(null),2e3)},f=[{id:`html`,title:`مواقع HTML الثابتة`,desc:`ضع الكود في وسم &lt;body&gt; فقط.`,lang:`HTML`,code:u},{id:`react`,title:`تطبيقات React & SPAs`,desc:`ضع الكود في ملف index.html فقط.`,lang:`public/index.html`,code:`<!DOCTYPE html>\n<html lang="en">\n  <body>\n    <div id="root"></div>\n    ${u}\n  </body>\n</html>`},{id:`php`,title:`مواقع PHP`,desc:`ضع الكود في ملف الفوتر العام footer.php.`,lang:`footer.php`,code:`<footer></footer>\n${u}\n</body>\n</html>`},{id:`global`,title:`الحقن عبر Global JS`,desc:`لحقن البوت عبر ملف جافاسكريبت عام.`,lang:`main.js`,code:`document.addEventListener('DOMContentLoaded', function() {\n    const script = document.createElement('script');\n    script.src = 'https://api.mosaned.org/mosaned-widget.js';\n    script.setAttribute('data-widget-key', '${c}');\n    document.body.appendChild(script);\n});`}],p=[{id:`python`,title:`🐍 سكريبت Python`,lang:`python`,code:`import os
import shutil

WIDGET_KEY = "${c}"
WIDGET_CODE = f'\\n<!-- Mosaned Bot -->\\n<script src="https://api.mosaned.org/mosaned-widget.js" data-widget-key="{WIDGET_KEY}"><\/script>\\n'

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
    inject_mosaned_bot()`},{id:`nodejs`,title:`🟢 سكريبت Node.js`,lang:`javascript`,code:`const fs = require('fs');
const path = require('path');

const WIDGET_KEY = '${c}';
const WIDGET_CODE = \`\\n<!-- Mosaned Bot -->\\n<script src="https://api.mosaned.org/mosaned-widget.js" data-widget-key="\${WIDGET_KEY}"><\/script>\\n\`;

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
console.log(\`🎉 تمت العملية! تم إضافة البوت إلى \${modifiedCount} صفحة.\`);`}];return(0,a.jsxs)(`div`,{className:`min-h-screen bg-[#060a14] text-slate-300 font-sans relative overflow-hidden`,dir:`rtl`,children:[(0,a.jsx)(`div`,{className:`absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none`}),(0,a.jsx)(`div`,{className:`absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none`}),(0,a.jsxs)(`div`,{className:`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24`,children:[(0,a.jsxs)(`header`,{className:`text-center mb-16`,children:[(0,a.jsxs)(`div`,{className:`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF] text-sm font-bold mb-6`,children:[(0,a.jsx)(`span`,{className:`w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse`}),`وثائق المطورين`]}),(0,a.jsxs)(`h1`,{className:`text-4xl md:text-5xl font-black text-white mb-4`,children:[`دليل دمج بوت مساند `,(0,a.jsx)(`span`,{className:`text-transparent bg-clip-text bg-gradient-to-l from-[#00F0FF] to-blue-500`,children:`🚀`})]}),(0,a.jsx)(`p`,{className:`text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed`,children:`في هذه الصفحة ستجد جميع الطرق الهندسية لزرع ويدجيت الذكاء الاصطناعي في موقعك، بغض النظر عن لغة البرمجة أو إطار العمل الذي تستخدمه.`})]}),(0,a.jsxs)(`div`,{className:`rounded-2xl border p-6 mb-10 ${l?`bg-emerald-900/20 border-emerald-500/30`:`bg-amber-900/20 border-amber-500/30`}`,children:[(0,a.jsxs)(`div`,{className:`flex items-center gap-3 mb-3`,children:[(0,a.jsx)(`span`,{className:`text-2xl`,children:`🔑`}),(0,a.jsx)(`h2`,{className:`text-white font-bold text-lg`,children:`مفتاحك الخاص (Widget Key)`})]}),l?(0,a.jsx)(`p`,{className:`text-emerald-400 text-sm font-medium`,children:`تم التعرف على مفتاحك. جميع الأمثلة أدناه مضمنة بمفتاحك تلقائياً.`}):(0,a.jsxs)(`p`,{className:`text-amber-400 text-sm font-medium`,children:[`هذا هو المفتاح الذي يربط موقعك بالبوت الخاص بك. استبدل `,(0,a.jsx)(`code`,{className:`bg-white/10 px-2 py-0.5 rounded text-amber-300`,children:`YOUR_KEY_HERE`}),` بمفتاحك الحقيقي في الأمثلة التالية.`]}),(0,a.jsx)(`div`,{className:`mt-3 bg-black/40 rounded-xl p-3 font-mono text-sm text-center`,dir:`ltr`,children:(0,a.jsx)(`code`,{className:`text-[#00F0FF] break-all`,children:l?c:`YOUR_KEY_HERE`})})]}),(0,a.jsxs)(`div`,{className:`bg-white/5 border border-white/10 rounded-2xl p-6 mb-12`,children:[(0,a.jsx)(`h3`,{className:`text-white font-bold mb-4`,children:`📋 المحتويات`}),(0,a.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm`,children:[(0,a.jsx)(`a`,{href:`#html`,className:`text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5`,children:`1. مواقع HTML الثابتة`}),(0,a.jsx)(`a`,{href:`#react`,className:`text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5`,children:`2. تطبيقات React & SPAs`}),(0,a.jsx)(`a`,{href:`#php`,className:`text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5`,children:`3. مواقع PHP`}),(0,a.jsx)(`a`,{href:`#global`,className:`text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5`,children:`4. الحقن عبر Global JS`}),(0,a.jsx)(`a`,{href:`#auto-inject`,className:`text-slate-300 hover:text-[#00F0FF] transition-colors p-2 rounded-lg hover:bg-white/5`,children:`5. أدوات الحقن التلقائي`})]})]}),(0,a.jsx)(`section`,{className:`space-y-8 mb-16`,children:f.map((e,n)=>(0,a.jsx)(`div`,{id:e.id,className:`bg-white/5 border border-white/10 rounded-2xl overflow-hidden scroll-mt-20`,children:(0,a.jsxs)(`div`,{className:`p-6 md:p-8`,children:[(0,a.jsxs)(`div`,{className:`flex items-center gap-3 mb-3`,children:[(0,a.jsxs)(`span`,{className:`w-8 h-8 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center text-sm font-black`,children:[n+1,`.`]}),(0,a.jsx)(`h2`,{className:`text-xl font-bold text-white`,children:e.title})]}),(0,a.jsx)(`p`,{className:`text-slate-400 mb-4 text-sm`,children:e.desc}),(0,a.jsxs)(`div`,{className:`bg-black/60 rounded-xl overflow-hidden border border-white/5`,children:[(0,a.jsxs)(`div`,{className:`flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5`,children:[(0,a.jsx)(`span`,{className:`text-xs text-slate-500 font-mono`,children:e.lang}),(0,a.jsx)(`button`,{onClick:()=>d(e.code,e.id),className:`text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-medium`,children:t===e.id?`تم النسخ ✓`:`نسخ الكود 📋`})]}),(0,a.jsx)(`pre`,{className:`p-4 overflow-x-auto text-sm font-mono leading-relaxed`,dir:`ltr`,children:(0,a.jsx)(`code`,{children:e.code.split(`
`).map((e,t)=>(0,a.jsxs)(`span`,{className:`block`,children:[(0,a.jsx)(`span`,{className:`text-slate-600 select-none ml-4`,children:String(t+1).padStart(2,` `)}),e.includes(`YOUR_KEY_HERE`)&&!l?(0,a.jsx)(`span`,{children:e.split(`YOUR_KEY_HERE`).map((e,t)=>(0,a.jsxs)(`span`,{children:[t>0&&(0,a.jsx)(`span`,{className:`text-amber-300 bg-amber-500/10 px-1 rounded`,children:`YOUR_KEY_HERE`}),(0,a.jsx)(`span`,{className:`text-slate-300`,children:e})]},t))}):(0,a.jsx)(`span`,{className:`text-slate-300`,children:e})]},t))})})]})]})},e.id))}),(0,a.jsxs)(`section`,{id:`auto-inject`,children:[(0,a.jsxs)(`div`,{className:`bg-gradient-to-r from-amber-900/20 to-red-900/20 border border-amber-500/20 rounded-2xl p-6 md:p-8 mb-8`,children:[(0,a.jsxs)(`h2`,{className:`text-xl font-bold text-white mb-4 flex items-center gap-3`,children:[(0,a.jsx)(`span`,{children:`⚡`}),` 5. أدوات الحقن التلقائي المتقدمة`]}),(0,a.jsx)(`p`,{className:`text-slate-400 text-sm mb-4`,children:`هل موقعك يحتوي على مئات صفحات الـ HTML الثابتة؟ هذه السكربتات تمر على جميع ملفاتك، تأخذ نسخة احتياطية (Backup)، وتزرع كود البوت فيها آلياً في ثوانٍ.`}),(0,a.jsxs)(`div`,{className:`bg-red-900/20 border border-red-500/20 rounded-xl p-4 text-sm text-red-300`,children:[(0,a.jsx)(`p`,{className:`font-bold mb-2`,children:`⚠️ تحذيرات هامة قبل الاستخدام`}),(0,a.jsxs)(`ul`,{className:`space-y-1 text-red-400/80 list-disc list-inside`,children:[(0,a.jsxs)(`li`,{children:[`مخصصة فقط للـ `,(0,a.jsx)(`strong`,{children:`Static HTML`}),` — لا تستخدمها في أطر العمل الحديثة (React, Vue, Next.js).`]}),(0,a.jsx)(`li`,{children:`غير صالحة لأنظمة المحتوى — تجنب استخدامها داخل مجلدات WordPress أو المتاجر الإلكترونية.`}),(0,a.jsx)(`li`,{children:`جرّب محلياً أولاً — شغّل السكربت على نسخة من موقعك في جهازك الشخصي قبل الرفع للاستضافة.`})]})]})]}),(0,a.jsx)(`div`,{className:`space-y-6`,children:p.map(e=>(0,a.jsx)(`div`,{className:`bg-white/5 border border-white/10 rounded-2xl overflow-hidden`,children:(0,a.jsxs)(`div`,{className:`p-6 md:p-8`,children:[(0,a.jsx)(`h3`,{className:`text-lg font-bold text-white mb-4`,children:e.title}),(0,a.jsxs)(`div`,{className:`bg-black/60 rounded-xl overflow-hidden border border-white/5`,children:[(0,a.jsxs)(`div`,{className:`flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5`,children:[(0,a.jsx)(`span`,{className:`text-xs text-slate-500 font-mono`,children:e.lang}),(0,a.jsx)(`button`,{onClick:()=>d(e.code,e.id),className:`text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-medium`,children:t===e.id?`تم النسخ ✓`:`عرض كود السكريبت`})]}),(0,a.jsx)(`pre`,{className:`p-4 overflow-x-auto text-sm font-mono leading-relaxed max-h-96 overflow-y-auto`,dir:`ltr`,children:(0,a.jsx)(`code`,{children:e.code.split(`
`).map((e,t)=>(0,a.jsxs)(`span`,{className:`block`,children:[(0,a.jsx)(`span`,{className:`text-slate-600 select-none ml-4`,children:String(t+1).padStart(2,` `)}),(0,a.jsx)(`span`,{className:`text-slate-300`,children:e})]},t))})})]})]})},e.id))})]}),(0,a.jsx)(`footer`,{className:`mt-20 text-center text-slate-500 text-sm border-t border-white/5 pt-8`,children:(0,a.jsxs)(`p`,{children:[`© `,new Date().getFullYear(),` مساند — جميع الحقوق محفوظة`]})})]})]})}export{s as default};