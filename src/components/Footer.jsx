import { Show } from 'solid-js';

function Footer(props) {
  const user = props.user;

  return (
    <footer class="mt-8 text-center text-gray-700">
      <p>جميع الحقوق محفوظة © 2023 Blind Accessibility</p>
      <Show when={user() && user().email === 'daoudi.abdennour@gmail.com'}>
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