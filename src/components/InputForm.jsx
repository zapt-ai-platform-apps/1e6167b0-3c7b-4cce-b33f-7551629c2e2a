import { TextInputField, TextAreaField, SelectField, NumberInputField } from './FormFields';

function InputForm(props) {
  return (
    <div class="w-full max-w-md">
      <TextInputField
        label="العنوان"
        value={props.title}
        onInput={props.setTitle}
      />
      <TextAreaField
        label="الوصف"
        value={props.description}
        onInput={props.setDescription}
      />
      <SelectField
        label="الحجم"
        value={props.size}
        onChange={props.setSize}
        options={props.sizes}
      />
      <SelectField
        label="النمط"
        value={props.style}
        onChange={props.setStyle}
        options={props.styles}
        placeholder="اختر النمط"
      />
      <NumberInputField
        label="عدد الصور"
        value={props.numberOfImages}
        onInput={props.setNumberOfImages}
        min="1"
        max="4"
      />
      <div class="flex items-center justify-between">
        <button
          type="button"
          class={`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            props.loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={props.loading()}
          onClick={props.handleGenerateImage}
        >
          {props.loading() ? 'جارٍ التوليد...' : 'توليد الصورة'}
        </button>
      </div>
    </div>
  );
}

export default InputForm;