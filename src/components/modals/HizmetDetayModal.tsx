import { X, CheckCircle2, PhoneCall } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { useApp } from '../../context/AppContext';
import type { Service } from '../../types';

interface HizmetDetayModalProps {
  service: Service;
  onClose: () => void;
}

export default function HizmetDetayModal({ service, onClose }: HizmetDetayModalProps) {
  const { companyInfo } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-y-auto overflow-x-hidden shadow-2xl max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-16 sm:h-60 shrink-0">
          <img
            src={service.image}
            alt={service.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-[10px] right-[10px] sm:top-4 sm:right-4 min-h-[44px] min-w-[44px] sm:w-10 sm:h-10 rounded-full bg-slate-950/80 border border-slate-700 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3 sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
            <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-red-800/40">
              Aga Nakliyat Uzmanlığı
            </span>
            <h3 className="text-xs sm:text-3xl font-black text-white mt-1 sm:mt-2">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-1 sm:p-8 overflow-y-auto flex-1 space-y-3 sm:space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            {service.description}
          </p>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3">
              Bu Hizmette Sunduğumuz Ayrıcalıklar:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-2.5 p-2 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/30 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Eşyalarınız İçin Ücretsiz Ekspertiz
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Fatsa, Ünye ve Ordu içi yerinde veya fotoğraf üzerinden anında tekliflendirilir.
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center gap-2 sm:gap-3 flex-wrap">
          <a
            href={`tel:${companyInfo.phonePrimaryRaw}`}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hemen Ara</span>
          </a>
          <a
            href={`https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(`Merhaba Aga Nakliyat, ${service.title} hakkında bilgi ve randevu almak istiyorum.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp İletişim</span>
          </a>
        </div>
      </div>
    </div>
  );
}
