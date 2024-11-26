import { Router, Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Services from './components/Services';
import Tools from './components/Tools';
import ToolPage from './components/ToolPage';
import SocialMediaLinks from './components/SocialMediaLinks';
import BottomNavigation from './components/BottomNavigation';
import Footer from './components/Footer';

function App() {
  return (
    <div
      class="h-full bg-white text-gray-900 flex flex-col"
      dir="rtl"
    >
      <Router>
        <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:toolName" element={<ToolPage />} />
          </Routes>
          <SocialMediaLinks />
        </div>
        <BottomNavigation />
      </Router>
      <Footer />
    </div>
  );
}

export default App;