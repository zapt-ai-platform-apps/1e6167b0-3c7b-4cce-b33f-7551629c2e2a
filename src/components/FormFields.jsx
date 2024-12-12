import { For } from 'solid-js';

export function TextInputField(props) {
  return (
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      <input
        type="text"
        class="box-border shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={props.value()}
        onInput={(e) => props.onInput(e.target.value)}
      />
    </div>
  );
}

export function TextAreaField(props) {
  return (
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      <textarea
        class="box-border shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
        value={props.value()}
        onInput={(e) => props.onInput(e.target.value)}
      ></textarea>
    </div>
  );
}

export function SelectField(props) {
  return (
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      <select
        class="box-border shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
        value={props.value()}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        <For each={props.options}>
          {(option) => (
            <option value={option}>{option}</option>
          )}
        </For>
      </select>
    </div>
  );
}

export function NumberInputField(props) {
  return (
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      <input
        type="number"
        min={props.min}
        max={props.max}
        class="box-border shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={props.value()}
        onInput={(e) => props.onInput(e.target.value)}
      />
    </div>
  );
}