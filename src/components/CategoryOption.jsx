function CategoryOption(props) {
  return (
    <li
      class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
      onClick={props.onClick}
    >
      <div class="flex items-center">
        <span class="ml-3 block truncate font-normal">
          {props.category.name}
        </span>
      </div>
    </li>
  );
}

export default CategoryOption;