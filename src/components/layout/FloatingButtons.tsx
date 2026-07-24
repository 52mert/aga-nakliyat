import { PhoneCall } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { useApp } from '../../context/AppContext';

export default function FloatingButtons() {
  const { companyInfo } = useApp();

  return (
    <>
      <style>{`@keyframes shake-cycle { 0%,50%,100%{transform:translateY(0)} 5%{transform:translateY(-3px)} 10%{transform:translateY(3px)} 15%{transform:translateY(-2px)} 20%{transform:translateY(2px)} 25%{transform:translateY(-1px)} 30%{transform:translateY(1px)} 35%{transform:translateY(0)} }`}</style>
      {/* Desktop Floating Right Widgets */}
      <div className="hidden sm:flex fixed bottom-8 right-8 z-40 flex-col gap-3">
        {/* WhatsApp Float */}
        <a
          href={`https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent('Merhaba Aga Nakliyat, evden eve nakliyat hakkında bilgi almak istiyorum.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all border border-emerald-300/30"
          aria-label="WhatsApp Canlı Destek"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 shadow-xl">
            WhatsApp Canlı Destek
          </span>
        </a>

        {/* Call Float */}
        <a
          href={`tel:${companyInfo.phonePrimaryRaw}`}
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-2xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-all border border-red-300/30 animate-bounce"
          aria-label="Hemen Ara"
        >
          <PhoneCall className="w-6 h-6" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 shadow-xl">
            Aga Nakliyat'ı Ara: {companyInfo.phonePrimary}
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Communication Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 w-full z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-2 flex items-center justify-between gap-2.5 text-white pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-2xl mx-auto">
        <a
          href={`tel:${companyInfo.phonePrimaryRaw}`}
          className="flex-1 py-3 bg-red-600 active:bg-red-700 active:scale-98 text-white rounded-xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all min-h-[44px]"
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">Hemen Ara</span>
        </a>

        <a
          href={`https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent('Merhaba Aga Nakliyat, evden eve nakliye teklifi almak istiyorum.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-emerald-600 active:bg-emerald-700 active:scale-98 text-white rounded-xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all min-h-[44px]"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">WhatsApp Hat</span>
        </a>
      </div>
    </>
  );
}
