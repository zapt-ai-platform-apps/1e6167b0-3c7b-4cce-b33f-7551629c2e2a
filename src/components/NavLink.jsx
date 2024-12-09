import { NavLink as RouterNavLink } from '@solidjs/router';

function NavLink(props) {
  return (
    <RouterNavLink
      href={props.href}
      end={props.end}
      class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
      activeClass="text-primary-dark font-bold"
      onClick={props.onClick}
    >
      {props.children}
    </RouterNavLink>
  );
}

export default NavLink;