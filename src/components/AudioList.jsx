import { For } from 'solid-js';
import AudioItem from './AudioItem';

function AudioList(props) {
  return (
    <div class="flex flex-col space-y-4">
      <For each={props.filteredAudioItems()}>
        {(audio) => (
          <AudioItem
            audio={audio}
            currentAudio={props.currentAudio}
            isPlaying={props.isPlaying}
            handlePlayPause={props.handlePlayPause}
          />
        )}
      </For>
    </div>
  );
}

export default AudioList;