import { Router, Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import AnnouncementBanner from './components/AnnouncementBanner';
import MainContent from './components/MainContent';
import Services from './components/Services';
import Tools from './components/Tools';
import ToolPage from './components/ToolPage';
import SocialMediaLinks from './components/SocialMediaLinks';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Store from './components/Store';
import Forum from './components/Forum';

function App() {
  return (
    <div class="min-h-screen h-full bg-white text-gray-900 flex flex-col" dir="rtl">
      <Router>
        <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
          <Header />
          <AnnouncementBanner />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:toolName" element={<ToolPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/store" element={<Store />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
          <SocialMediaLinks />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;