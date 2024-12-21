// Updated components files where buttons and inputs were missing 'cursor-pointer' and 'box-border' classes

// Example for Button elements:

<button
  class={`cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform`}
  onClick={handleClick}
>
  زر المثال
</button>

// Example for Input elements:

<input
  type="text"
  value={inputValue()}
  onInput={(e) => setInputValue(e.target.value)}
  class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  placeholder="أدخل نصًا"
/>