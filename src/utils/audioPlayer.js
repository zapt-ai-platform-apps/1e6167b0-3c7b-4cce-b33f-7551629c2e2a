export function playAudio(url) {
  const audioPlayer = new Audio();
  audioPlayer.src = url;
  audioPlayer.play().catch((error) => {
    console.error('Error playing audio:', error);
  });
}