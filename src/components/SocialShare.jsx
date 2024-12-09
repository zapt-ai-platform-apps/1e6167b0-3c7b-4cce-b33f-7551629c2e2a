import { Show } from 'solid-js';
import SocialMediaIcons from './SocialMediaIcons';
import CopyLinkSection from './CopyLinkSection';

function SocialShare(props) {
  const { appTitle, appDescription, appLink, copySuccess, handleCopyLink } = props;

  return (
    <section class="text-center mb-12">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
        شارك التطبيق مع أصدقائك
      </h2>
      <p class="text-lg mb-6 text-center">
        ساعدنا في نشر الفائدة ومشاركة التطبيق مع الآخرين.
      </p>
      <SocialMediaIcons appLink={appLink} appDescription={appDescription} />
      <CopyLinkSection appLink={appLink} copySuccess={copySuccess} handleCopyLink={handleCopyLink} />
    </section>
  );
}

export default SocialShare;