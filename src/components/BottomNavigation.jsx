import { NavLink } from '@solidjs/router';

function BottomNavigation() {
  return (
    <nav class="fixed bottom-0 left-0 w-full bg-white shadow-inner">
      <div class="flex justify-around">
        <NavLink
          href="/"
          end
          class="flex-1 text-center py-2 cursor-pointer hover:bg-primary-light transition duration-300"
          activeClass="text-primary-dark font-bold border-t-2 border-primary-dark"
        >
          الرئيسية
        </NavLink>
        <NavLink
          href="/services"
          class="flex-1 text-center py-2 cursor-pointer hover:bg-primary-light transition duration-300"
          activeClass="text-primary-dark font-bold border-t-2 border-primary-dark"
        >
          خدمات
        </NavLink>
        <NavLink
          href="/tools"
          class="flex-1 text-center py-2 cursor-pointer hover:bg-primary-light transition duration-300"
          activeClass="text-primary-dark font-bold border-t-2 border-primary-dark"
        >
          أدوات
        </NavLink>
      </div>
    </nav>
  );
}

export default BottomNavigation;