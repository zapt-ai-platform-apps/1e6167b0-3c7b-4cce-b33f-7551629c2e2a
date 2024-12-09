import { createSignal, Show, onMount, onCleanup } from 'solid-js';
import DropdownList from './DropdownList';

function CategorySelector(props) {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen());
  };

  const handleOptionClick = (categoryName) => {
    props.setSelectedCategory(categoryName);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  let dropdownRef;
  const handleClickOutside = (event) => {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div class="relative inline-block w-full max-w-md text-gray-700" ref={dropdownRef}>
      <button
        class="cursor-pointer relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
        onClick={toggleDropdown}
      >
        <span class="flex items-center">
          <span class="ml-3 block truncate">
            {props.selectedCategory() || 'اختر فئة التطبيقات'}
          </span>
        </span>
        <span class="absolute inset-y-0 left-0 flex items-center pr-2 pointer-events-none">
          <svg
            class={`h-5 w-5 text-gray-400 transition-transform duration-200 transform ${
              isOpen() ? 'rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </span>
      </button>
      <Show when={isOpen()}>
        <DropdownList categories={props.categories} handleOptionClick={handleOptionClick} />
      </Show>
    </div>
  );
}

export default CategorySelector;