import { For } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';

function MessageList(props) {
  return (
    <div>
      <For each={props.messages()}>
        {(msg) => (
          <div class={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              class={`inline-block px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.role === 'user' ? (
                msg.content
              ) : (
                <SolidMarkdown class="prose text-gray-800 leading-relaxed" children={msg.content} />
              )}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

export default MessageList;