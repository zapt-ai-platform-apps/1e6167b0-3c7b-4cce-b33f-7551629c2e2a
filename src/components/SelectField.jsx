function SelectField(props) {
  const [value, setValue] = props.signal;

  return (
    <div>
      <label class="block text-neutral-dark font-semibold mb-2">
        {props.label}
      </label>
      <select
        value={value()}
        onInput={(e) => setValue(e.target.value)}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
        required={props.required}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;