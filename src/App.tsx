import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';
import Hizmetler from './components/sections/Hizmetler';
import NedenBiz from './components/sections/NedenBiz';
import Galeri from './components/sections/Galeri';
import Yorumlar from './components/sections/Yorumlar';
import Iletisim from './components/sections/Iletisim';
import TeklifModal from './components/modals/TeklifModal';
import AddReviewModal from './components/modals/AddReviewModal';
import AdminPage from './components/admin/AdminPage';

function MainApp() {
  const { theme } = useApp();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className={`min-h-screen w-full max-w-full overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white' 
        : 'bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white'
    }`}>
      <Sidebar onOpenCalculator={() => setIsCalculatorOpen(true)} />
      <main className="w-full min-h-screen pt-16">
        <Hero />
        <Hizmetler />
        <NedenBiz />
        <Galeri />
        <Yorumlar />
        <Iletisim />
        <Footer />
      </main>
      <TeklifModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <AddReviewModal />
      <FloatingButtons />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/mertadmin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
