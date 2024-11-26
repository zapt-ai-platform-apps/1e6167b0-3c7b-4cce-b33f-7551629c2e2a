import { Show } from 'solid-js';

function Footer(props) {
  const user = props.user;
  const isAdmin = user && user.email === 'daoudi.abdennour@gmail.com';

  return (
    <footer class="mt-8 text-center text-gray-700">
      جميع الحقوق محفوظة © 2023 Blind Accessibility
      <Show when={isAdmin}>
        <div class="mt-2">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline cursor-pointer"
          >
            Made on ZAPT
          </a>
        </div>
      </Show>
    </footer>
  );
}

export default Footer;