import { Show } from 'solid-js';

function AudioPlayer(props) {
  const { audioUrl } = props;

  return (
    <Show when={audioUrl()}>
      <div class="mt-4">
        <audio controls src={audioUrl()} class="w-full">
          متصفحك لا يدعم تشغيل الصوت. يرجى تحديث المتصفح أو استخدام متصفح آخر.
        </audio>
      </div>
    </Show>
  );
}

export default AudioPlayer;