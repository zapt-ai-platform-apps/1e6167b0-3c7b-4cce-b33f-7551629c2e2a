import { NavLink } from '@solidjs/router';
import { Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function Navigation(props) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav
      class={`absolute top-full right-0 mt-2 w-full bg-white shadow-md md:static md:mt-0 md:w-auto md:flex md:items-center ${
        props.menuOpen() ? 'block' : 'hidden'
      } md:block`}
    >
      <ul class="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-x-reverse">
        <li>
          <NavLink
            href="/"
            end
            class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
            activeClass="text-primary-dark font-bold"
            onClick={() => props.setMenuOpen(false)}
          >
            الرئيسية
          </NavLink>
        </li>
        <li>
          <NavLink
            href="/services"
            class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
            activeClass="text-primary-dark font-bold"
            onClick={() => props.setMenuOpen(false)}
          >
            خدمات
          </NavLink>
        </li>
        <li>
          <NavLink
            href="/tools"
            class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
            activeClass="text-primary-dark font-bold"
            onClick={() => props.setMenuOpen(false)}
          >
            أدوات
          </NavLink>
        </li>
        <Show when={props.user()}>
          <li>
            <NavLink
              href="/account"
              class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
              activeClass="text-primary-dark font-bold"
              onClick={() => props.setMenuOpen(false)}
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
          <li>
            <NavLink
              href="/login"
              class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
              activeClass="text-primary-dark font-bold"
              onClick={() => props.setMenuOpen(false)}
            >
              تسجيل الدخول
            </NavLink>
          </li>
        </Show>
      </ul>
    </nav>
  );
}

export default Navigation;