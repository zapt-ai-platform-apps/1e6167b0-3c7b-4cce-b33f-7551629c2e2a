import { NavLink } from '@solidjs/router';
import { Show } from 'solid-js';

function Header(props) {
  const user = props.user;

  return (
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-primary-dark">Blind Accessibility</h1>
      <nav>
        <ul class="flex items-center space-x-4 space-x-reverse">
          <li>
            <NavLink
              href="/"
              end
              class="text-gray-800 hover:text-primary-dark cursor-pointer transition duration-300"
              activeClass="text-primary-dark font-bold"
            >
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/services"
              class="text-gray-800 hover:text-primary-dark cursor-pointer transition duration-300"
              activeClass="text-primary-dark font-bold"
            >
              خدمات
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/tools"
              class="text-gray-800 hover:text-primary-dark cursor-pointer transition duration-300"
              activeClass="text-primary-dark font-bold"
            >
              أدوات
            </NavLink>
          </li>
          <Show when={user}>
            <li>
              <button
                onClick={props.onSignOut}
                class="cursor-pointer text-gray-800 hover:text-primary-dark transition duration-300"
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