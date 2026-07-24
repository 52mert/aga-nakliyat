import { useState } from 'react';
import { X, Calculator, PhoneCall, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import WhatsAppIcon from '../ui/WhatsAppIcon';

interface TeklifModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeklifModal({ isOpen, onClose }: TeklifModalProps) {
  const { companyInfo, pricingConfig } = useApp();
  const [roomType, setRoomType] = useState('2+1');
  const [fromFloor, setFromFloor] = useState<number>(3);
  const [toFloor, setToFloor] = useState<number>(2);
  const [route, setRoute] = useState('fatsa-fatsa');
  const [hasElevatorFrom, setHasElevatorFrom] = useState(true);
  const [hasElevatorTo, setHasElevatorTo] = useState(true);

  if (!isOpen) return null;

  // Price / Quote Calculation Logic
  const calculatePrice = () => {
    const base = pricingConfig.base_prices[roomType] || 7500;
    const floorCost = (fromFloor + toFloor) * pricingConfig.floor_cost_per_floor;
    const routeCost = pricingConfig.route_costs[route] || 0;
    const elevatorCost = (hasElevatorFrom ? pricingConfig.elevator_cost : 0) + (hasElevatorTo ? pricingConfig.elevator_cost : 0);
    const markup = 1 + (pricingConfig.markup_percent / 100);

    const minPrice = base + floorCost + routeCost + elevatorCost;
    const maxPrice = Math.round(minPrice * markup);

    return { minPrice, maxPrice };
  };

  const { minPrice, maxPrice } = calculatePrice();

  const handleSendWhatsApp = () => {
    const routeText = 
      route === 'fatsa-fatsa' ? 'Fatsa Şehir İçi' :
      route === 'fatsa-unye' ? 'Fatsa -> Ünye' :
      route === 'fatsa-ordu' ? 'Fatsa -> Ordu Merkez' : 'Şehirlerarası';

    const text = `Merhaba Aga Nakliyat, web sitenizdeki Teklif Hesaplayıcıdan teklif aldım:%0A%0A• *Eşya Tipi:* ${roomType}%0A• *Güzergah:* ${routeText}%0A• *Kalkış Katı:* ${fromFloor}. Kat (${hasElevatorFrom ? 'Asansörlü' : 'Bina İçi'})%0A• *Varış Katı:* ${toFloor}. Kat (${hasElevatorTo ? 'Asansörlü' : 'Bina İçi'})%0A• *Tahmini Teklif Aralığı:* ₺${minPrice.toLocaleString('tr-TR')} - ₺${maxPrice.toLocaleString('tr-TR')}%0A%0ABu teklife göre net randevu ve ekspertiz tarihi belirleyebilir miyiz?`;

    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 dark:from-slate-950 dark:via-slate-900 dark:to-red-950 border-b border-red-500/20 dark:border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-red-600 text-white flex items-center justify-center font-bold shadow-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">
                Hızlı Nakliyat Teklif Hesaplama
              </h3>
              <p className="text-xs text-red-100 dark:text-red-400 font-medium">
                Fatsa, Ünye ve Ordu için Anında Tahmini Teklif
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-full bg-white/20 hover:bg-white/30 dark:bg-slate-800 dark:hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Room Type */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              1. Oda / Ev Tipi Seçin:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['1+1', '2+1', '3+1', '4+1'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRoomType(type)}
                  className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border cursor-pointer ${
                    roomType === type
                      ? 'bg-red-600 text-white border-red-500 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  {type} Daire
                </button>
              ))}
            </div>
          </div>

          {/* Route */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              2. Güzergah Seçin:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'fatsa-fatsa', label: 'Fatsa Şehir İçi' },
                { id: 'fatsa-unye', label: 'Fatsa - Ünye Arası' },
                { id: 'fatsa-ordu', label: 'Fatsa - Ordu Merkez' },
                { id: 'sehirlerarasi', label: 'Şehirlerarası (İller Arası)' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRoute(item.id)}
                  className={`py-2.5 px-4 rounded-xl font-bold text-xs text-left transition-all border cursor-pointer ${
                    route === item.id
                      ? 'bg-red-600 text-white border-red-500 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Floors & Elevator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* From Floor */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Nereden (Yükleme Katı)
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kat:</span>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={fromFloor}
                  onChange={(e) => setFromFloor(Number(e.target.value))}
                  className="flex-1 accent-red-600 cursor-pointer"
                />
                <span className="font-extrabold text-slate-900 dark:text-white text-sm w-12 text-right">
                  {fromFloor === 0 ? 'Zemin' : `${fromFloor}. Kat`}
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1 border-t border-slate-200 dark:border-slate-900">
                <input
                  type="checkbox"
                  checked={hasElevatorFrom}
                  onChange={(e) => setHasElevatorFrom(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-0 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Dış Cephe Asansörü Kurulsun (+₺{pricingConfig.elevator_cost.toLocaleString('tr-TR')})
                </span>
              </label>
            </div>

            {/* To Floor */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Nereye (Boşaltma Katı)
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kat:</span>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={toFloor}
                  onChange={(e) => setToFloor(Number(e.target.value))}
                  className="flex-1 accent-red-600 cursor-pointer"
                />
                <span className="font-extrabold text-slate-900 dark:text-white text-sm w-12 text-right">
                  {toFloor === 0 ? 'Zemin' : `${toFloor}. Kat`}
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1 border-t border-slate-200 dark:border-slate-900">
                <input
                  type="checkbox"
                  checked={hasElevatorTo}
                  onChange={(e) => setHasElevatorTo(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-0 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Dış Cephe Asansörü Kurulsun (+₺{pricingConfig.elevator_cost.toLocaleString('tr-TR')})
                </span>
              </label>
            </div>

          </div>

          {/* Price Calculation Output Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 dark:from-red-950/60 dark:via-slate-950 dark:to-slate-950 border border-red-500/30 dark:border-red-800/50 text-white text-center relative overflow-hidden">
            <Sparkles className="absolute top-4 right-4 w-6 h-6 text-amber-300 dark:text-amber-400/50" />
            
            <div className="text-xs font-bold text-red-100 dark:text-red-400 uppercase tracking-widest">
              Tahmini Teklif Aralığı
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              ₺{minPrice.toLocaleString('tr-TR')} – ₺{maxPrice.toLocaleString('tr-TR')}
            </div>

            <p className="text-xs text-red-100 dark:text-slate-400 mt-2 max-w-md mx-auto">
              * Teklife ambalajlama, montaj-demontaj ustası ve sigorta dahildir. Net kesin teklif için WhatsApp'tan bilgi alabilirsiniz.
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            onClick={handleSendWhatsApp}
            className="flex-1 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[44px]"
          >
            <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" />
            <span className="whitespace-nowrap">WhatsApp ile Teklif Al</span>
          </button>

          <a
            href={`tel:${companyInfo.phonePrimaryRaw}`}
            className="px-4 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all min-h-[44px] shrink-0"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Hemen Ara</span>
          </a>
        </div>
      </div>
    </div>
  );
}
