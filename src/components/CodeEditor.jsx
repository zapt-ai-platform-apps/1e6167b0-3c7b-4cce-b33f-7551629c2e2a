function CodeEditor(props) {
  const { htmlCode, setHtmlCode, cssCode, setCssCode, jsCode, setJsCode } = props;

  return (
    <div class="flex flex-col space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-2">كود HTML</label>
        <textarea
          value={htmlCode()}
          onInput={(e) => setHtmlCode(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none h-32"
          placeholder="<h1>مرحباً بالعالم</h1>"
        ></textarea>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">كود CSS</label>
        <textarea
          value={cssCode()}
          onInput={(e) => setCssCode(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none h-32"
          placeholder="body { background-color: #f0f0f0; }"
        ></textarea>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">كود JavaScript</label>
        <textarea
          value={jsCode()}
          onInput={(e) => setJsCode(e.target.value)}
          class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none h-32"
          placeholder="console.log('Hello, World!');"
        ></textarea>
      </div>
    </div>
  );
}

export default CodeEditor;