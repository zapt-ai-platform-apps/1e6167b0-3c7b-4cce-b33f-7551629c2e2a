import { Show } from 'solid-js';

function LoadingButton(props) {
  return (
    <button
      class={`cursor-pointer px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${props.class} ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={props.onClick}
      disabled={props.loading || props.disabled}
    >
      <Show when={!props.loading} fallback={
        <div class="flex items-center justify-center">
          <span class="loader mr-2"></span>
          {props.loadingText || 'جاري التحميل...'}
        </div>
      }>
        {props.children}
      </Show>
    </button>
  );
}

export default LoadingButton;