import { For } from 'solid-js';
import CategoryOption from './CategoryOption';

function DropdownList(props) {
  return (
    <ul class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
      <For each={props.categories}>
        {(category) => (
          <CategoryOption
            category={category}
            onClick={() => props.handleOptionClick(category.name)}
          />
        )}
      </For>
    </ul>
  );
}

export default DropdownList;