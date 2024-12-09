import NavLink from './NavLink';
import { Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function NavLinks(props) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ul class="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-x-reverse">
      <li onClick={() => props.setMenuOpen(false)}>
        <NavLink
          href="/"
          end
          class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
          activeClass="text-primary-dark font-bold"
        >
          الرئيسية
        </NavLink>
      </li>
      <li onClick={() => props.setMenuOpen(false)}>
        <NavLink
          href="/services"
          class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
          activeClass="text-primary-dark font-bold"
        >
          خدمات
        </NavLink>
      </li>
      <li onClick={() => props.setMenuOpen(false)}>
        <NavLink
          href="/tools"
          class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
          activeClass="text-primary-dark font-bold"
        >
          أدوات
        </NavLink>
      </li>
      <Show when={props.user()}>
        <li onClick={() => props.setMenuOpen(false)}>
          <NavLink
            href="/account"
            class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
            activeClass="text-primary-dark font-bold"
          >
            حسابي
          </NavLink>
        </li>
        <li>
          <button
            class="cursor-pointer block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 focus:outline-none"
            onClick={handleSignOut}
          >
            تسجيل الخروج
          </button>
        </li>
      </Show>
      <Show when={!props.user()}>
        <li onClick={() => props.setMenuOpen(false)}>
          <NavLink
            href="/login"
            class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
            activeClass="text-primary-dark font-bold"
          >
            تسجيل الدخول
          </NavLink>
        </li>
      </Show>
    </ul>
  );
}

export default NavLinks;