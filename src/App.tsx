import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import MainApp from './components/layout/MainApp';
import AdminPage from './components/admin/AdminPage';

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/hizmet/:slug" element={<MainApp />} />
            <Route path="/bolge/:slug" element={<MainApp />} />
            <Route path="/mertadmin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}
