function Button(props) {
  return (
    <button
      class={`cursor-pointer px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${props.class}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;