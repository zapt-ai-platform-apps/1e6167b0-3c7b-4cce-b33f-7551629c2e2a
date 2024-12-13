import { Show } from 'solid-js';

function CodePreview(props) {
  const { srcDoc } = props;

  return (
    <Show when={srcDoc()}>
      <div class="mt-6">
        <h3 class="text-xl font-bold text-purple-600 mb-4">المعاينة:</h3>
        <div class="border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            srcDoc={srcDoc()}
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
            frameborder="0"
            class="w-full h-96"
          ></iframe>
        </div>
      </div>
    </Show>
  );
}

export default CodePreview;