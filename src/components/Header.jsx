import { NavLink } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import { supabase } from '../supabaseClient';

function Header(props) {
  const [menuOpen, setMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header class="flex justify-between items-center mb-8 relative">
      <h1 class="text-4xl font-bold text-primary-dark">Blind Accessibility</h1>
      <button
        aria-label="القائمة"
        onClick={toggleMenu}
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
            when={!menuOpen()}
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
      <nav
        class={`absolute top-full right-0 mt-2 w-full bg-white shadow-md md:static md:mt-0 md:w-auto md:flex md:items-center ${
          menuOpen() ? 'block' : 'hidden'
        } md:block`}
      >
        <ul class="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-x-reverse">
          <li>
            <NavLink
              href="/"
              end
              class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
              activeClass="text-primary-dark font-bold"
              onClick={() => setMenuOpen(false)}
            >
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/services"
              class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
              activeClass="text-primary-dark font-bold"
              onClick={() => setMenuOpen(false)}
            >
              خدمات
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/tools"
              class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
              activeClass="text-primary-dark font-bold"
              onClick={() => setMenuOpen(false)}
            >
              أدوات
            </NavLink>
          </li>
          <Show when={props.isAdmin}>
            <li>
              <NavLink
                href="/admin"
                class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
                activeClass="text-primary-dark font-bold"
                onClick={() => setMenuOpen(false)}
              >
                لوحة التحكم
              </NavLink>
            </li>
          </Show>
          <Show when={props.user}>
            <li>
              <NavLink
                href="/account"
                class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer"
                activeClass="text-primary-dark font-bold"
                onClick={() => setMenuOpen(false)}
              >
                حسابي
              </NavLink>
            </li>
            <li>
              <button
                class="block px-4 py-2 text-gray-800 hover:text-primary-dark transition duration-300 cursor-pointer focus:outline-none"
                onClick={handleSignOut}
              >
                تسجيل الخروج
              </button>
            </li>
          </Show>
        </ul>
      </nav>
    </header>
  );
}

export default Header;