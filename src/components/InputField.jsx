function InputField(props) {
  const [value, setValue] = props.signal;

  return (
    <div>
      <label class="block text-neutral-dark font-semibold mb-2">
        {props.label}
      </label>
      <input
        type={props.type}
        value={value()}
        onInput={(e) => setValue(e.target.value)}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        required={props.required}
      />
    </div>
  );
}

export default InputField;