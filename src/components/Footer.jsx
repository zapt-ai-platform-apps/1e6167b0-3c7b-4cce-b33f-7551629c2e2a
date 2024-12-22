import { Show } from 'solid-js';

function Footer(props) {
  const isAdmin = props.user && props.user().email === 'daoudi.abdennour@gmail.com';
  return (
    <footer class="mt-8 text-center text-gray-700 p-4 bg-white shadow-inner">
      <p>جميع الحقوق محفوظة © 2023 Blind Accessibility</p>
      <Show when={isAdmin}>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          تم الإنشاء باستخدام ZAPT
        </a>
      </Show>
    </footer>
  );
}

export default Footer;