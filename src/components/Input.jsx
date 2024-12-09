function Input(props) {
  return (
    <input
      type={props.type || 'text'}
      value={props.value}
      onInput={props.onInput}
      class={`box-border w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 focus:border-transparent ${props.class}`}
      placeholder={props.placeholder}
    />
  );
}

export default Input;