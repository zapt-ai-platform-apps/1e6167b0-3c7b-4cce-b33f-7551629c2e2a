import Header from './components/Header';
import MainContent from './components/MainContent';
import SocialMediaLinks from './components/SocialMediaLinks';
import Footer from './components/Footer';

function App() {
  return (
    <div
      class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900 flex flex-col"
      dir="rtl"
    >
      <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
        <Header />
        <MainContent />
        <SocialMediaLinks />
      </div>
      <Footer />
    </div>
  );
}

export default App;