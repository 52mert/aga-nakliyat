import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const INSTAGRAM_URL = 'https://www.instagram.com/aganakliyat52/';

export default function InstagramPopup() {
  const { theme } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (showTimerRef.current !== null) clearTimeout(showTimerRef.current);
    if (autoCloseTimerRef.current !== null) clearTimeout(autoCloseTimerRef.current);
    showTimerRef.current = null;
    autoCloseTimerRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    clearAllTimers();
    setIsVisible(false);
  }, [clearAllTimers]);

  const handleInstagram = useCallback(() => {
    clearAllTimers();
    setIsVisible(false);
    window.open(INSTAGRAM_URL, '_blank');
  }, [clearAllTimers]);

  useEffect(() => {
    showTimerRef.current = setTimeout(() => setIsVisible(true), 3000);
    return () => clearAllTimers();
  }, [clearAllTimers]);

  useEffect(() => {
    if (isVisible) {
      autoCloseTimerRef.current = setTimeout(handleClose, 10000);
    }
    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, [isVisible, handleClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Instagram popup"
          className={`fixed z-50 bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:w-auto md:max-w-[320px] p-4 md:p-5 rounded-2xl border shadow-2xl backdrop-blur-md will-change-transform will-change-opacity transform-gpu pb-[max(1rem,env(safe-area-inset-bottom))] ${
            theme === 'dark'
              ? 'bg-slate-950/95 border-slate-800/80'
              : 'bg-white/95 border-slate-200/80'
          }`}
        >
          <button
            onClick={handleClose}
            aria-label="Kapat"
            className={`absolute top-2 right-2 w-11 h-11 md:w-8 md:h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-400 hover:text-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-lg shrink-0">
              🚛
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <h3 className={`font-extrabold text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Bizi Takip Edin!
              </h3>
              <p className={`text-xs md:text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Aga Nakliyat Instagram sayfamızı incelemek ister misiniz?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleInstagram}
              aria-label="Instagram'da incele"
              className="flex-1 py-2.5 min-h-[44px] md:min-h-[40px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-extrabold text-xs transition-all cursor-pointer"
            >
              İncele
            </button>
            <button
              onClick={handleClose}
              className={`flex-1 py-2.5 min-h-[44px] md:min-h-[40px] rounded-xl font-bold text-xs transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              Hayır
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
