import NavLinks from './NavLinks';

function Navigation(props) {
  return (
    <nav
      class={`absolute top-full right-0 mt-2 w-full bg-white shadow-md md:static md:mt-0 md:w-auto md:flex md:items-center ${
        props.menuOpen() ? 'block' : 'hidden'
      } md:block`}
    >
      <NavLinks {...props} />
    </nav>
  );
}

export default Navigation;