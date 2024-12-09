import { Show } from 'solid-js';

function MenuButton(props) {
  return (
    <button
      aria-label="القائمة"
      onClick={props.toggleMenu}
      class="md:hidden cursor-pointer p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark flex items-center"
    >
      <svg
        class="h-6 w-6 text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <Show
          when={!props.menuOpen()}
          fallback={
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          }
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8h16M4 16h16"
          />
        </Show>
      </svg>
      <span class="mr-2">القائمة</span>
    </button>
  );
}

export default MenuButton;