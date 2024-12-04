function SpeakButton(props) {
  return (
    <button
      class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform box-border ${
        props.listening ? 'bg-red-600 hover:bg-red-700' : ''
      }`}
      onClick={props.onListen}
      disabled={props.disabled}
    >
      {props.listening ? 'إيقاف' : 'تحدث'}
    </button>
  );
}

export default SpeakButton;