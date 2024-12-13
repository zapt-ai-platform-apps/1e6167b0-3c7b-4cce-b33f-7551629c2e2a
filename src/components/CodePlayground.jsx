import { createSignal, Show } from 'solid-js';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';

function CodePlayground() {
  const [htmlCode, setHtmlCode] = createSignal('');
  const [cssCode, setCssCode] = createSignal('');
  const [jsCode, setJsCode] = createSignal('');
  const [srcDoc, setSrcDoc] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const runCode = () => {
    setLoading(true);
    setTimeout(() => {
      const combinedCode = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
          <head>
            <meta charset="UTF-8" />
            <style>
              ${cssCode()}
            </style>
          </head>
          <body>
            ${htmlCode()}
            <script>
              ${jsCode()}
            </script>
          </body>
        </html>
      `;
      setSrcDoc(combinedCode);
      setLoading(false);
    }, 250);
  };

  return (
    <div class="flex flex-col flex-grow h-full px-4">
      <div class="flex flex-col items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-2">أداة تجربة الأكواد البرمجية</h2>
        <p class="text-lg text-center text-gray-700">
          أدخل أكواد HTML وCSS وJavaScript الخاصة بك، ثم اضغط على زر "تشغيل" لمعاينة النتيجة.
        </p>
      </div>
      <CodeEditor
        htmlCode={htmlCode}
        setHtmlCode={setHtmlCode}
        cssCode={cssCode}
        setCssCode={setCssCode}
        jsCode={jsCode}
        setJsCode={setJsCode}
      />
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full mt-4 transition duration-300 ease-in-out transform box-border ${
          loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'
        }`}
        onClick={runCode}
        disabled={loading()}
      >
        <Show when={!loading()} fallback="جارٍ التشغيل...">
          تشغيل
        </Show>
      </button>
      <CodePreview srcDoc={srcDoc} />
    </div>
  );
}

export default CodePlayground;