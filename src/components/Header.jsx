import { createSignal } from 'solid-js';
import MenuButton from './MenuButton';
import Navigation from './Navigation';

function Header(props) {
  const [menuOpen, setMenuOpen] = createSignal(false);

  return (
    <header class="flex justify-between items-center mb-8 relative bg-white shadow-md p-4 md:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-primary-dark cursor-pointer" onClick={() => props.navigate('/')}>
        Blind Accessibility
      </h1>
      <MenuButton menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen())} />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={props.user} />
    </header>
  );
}

export default Header;