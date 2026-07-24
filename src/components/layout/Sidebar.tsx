import { useState, useEffect } from 'react';
import { 
  Home, 
  Truck, 
  Shield, 
  Images, 
  MessageSquare, 
  PhoneCall, 
  Send, 
  Menu, 
  X, 
  MapPin, 
  Calculator,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  onOpenCalculator: () => void;
}

export default function Sidebar({ onOpenCalculator }: SidebarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme, companyInfo } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('anasayfa');
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollRatio(Math.min(window.scrollY / 200, 1));

      const sections = ['anasayfa', 'hizmetler', 'neden-biz', 'galeri', 'yorumlar', 'iletisim'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'anasayfa', label: 'Ana Sayfa', icon: Home },
    { id: 'hizmetler', label: 'Hizmetlerimiz', icon: Truck },
    { id: 'neden-biz', label: 'Neden Biz?', icon: Shield },
    { id: 'galeri', label: 'Yaptığımız İşler', icon: Images },
    { id: 'yorumlar', label: 'Müşteri Yorumları', icon: MessageSquare },
    { id: 'iletisim', label: 'İletişim', icon: Send },
  ];

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overscrollBehavior = 'contain';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overscrollBehavior = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overscrollBehavior = '';
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Full-Width Top Navbar Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrollRatio > 0.15 ? 'shadow-lg py-3 border-b' : 'shadow-sm py-3.5 border-b'
        }`}
        style={{
          backgroundColor: theme === 'dark'
            ? `rgba(2, 6, 23, ${0.75 + scrollRatio * 0.2})`
            : `rgba(255, 255, 255, ${0.7 + scrollRatio * 0.25})`,
          borderColor: theme === 'dark'
            ? `rgba(30, 41, 59, ${0.4 + scrollRatio * 0.4})`
            : `rgba(226, 232, 240, ${0.3 + scrollRatio * 0.5})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('anasayfa')}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center font-black text-white text-xl sm:text-2xl shadow-xl shadow-red-900/50 border border-red-500/30 shrink-0">
              A
            </div>
            <div>
              <div className="font-black text-sm sm:text-lg tracking-tight leading-none flex items-center gap-2 text-slate-900 dark:text-white">
                <span>AGA NAKLİYAT</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/50 text-[10px] text-red-600 dark:text-red-400 font-semibold tracking-wider uppercase">
                  Fatsa · Ordu
                </span>
              </div>
              <p className="text-xs font-medium mt-0.5 tracking-wide items-center gap-1 text-slate-600 dark:text-slate-300 hidden sm:flex">
                <MapPin className="w-3 h-3 text-red-500 inline" />
                <span>Evden Eve Asansörlü Taşımacılık</span>
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 px-3 py-1.5 rounded-full shadow-lg">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-3 ml-auto sm:pr-0 flex-nowrap shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="min-h-[44px] min-w-[44px] sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-900 text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              title={theme === 'dark' ? 'Açık Mod (Light)' : 'Koyu Mod (Dark)'}
              aria-label="Mod Değiştir"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
            </button>

            {/* Teklif Hesapla Button - Solely located in top header / menu */}
            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden min-[400px]:inline">Teklif Hesapla</span>
            </button>

            <a
              href={`tel:${companyInfo.phonePrimaryRaw}`}
              className="hidden sm:flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] min-w-[44px] sm:w-auto sm:px-4 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-900/40 active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">{companyInfo.phonePrimary}</span>
            </a>

            <a
              href={`https://wa.me/${companyInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center min-h-[44px] min-w-[44px] sm:w-10 sm:h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/30 transition-all"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden shrink-0 ml-0.5 min-h-[44px] min-w-[44px] sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
            onClick={() => setMobileOpen(false)} 
          />

          <div className="relative w-[320px] max-w-[85vw] bg-white dark:bg-slate-950 text-slate-900 dark:text-white h-full border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-lg">
                  A
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white text-base leading-none">AGA NAKLİYAT</h2>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">Fatsa - Ünye - Ordu</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="min-h-[44px] min-w-[44px] rounded-lg bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 flex items-center justify-center"
                  title="Mod Değiştir"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="min-h-[44px] min-w-[44px] rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-sm shadow-md cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Teklif Hesapla</span>
                </button>


              </div>
            </nav>

            {/* Mobile Drawer Bottom Call */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
              <a
                href={`tel:${companyInfo.phonePrimaryRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-900/50"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hemen Ara: {companyInfo.phonePrimary}</span>
              </a>
              <a
                href={`https://wa.me/${companyInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Mesaj Gönder</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
