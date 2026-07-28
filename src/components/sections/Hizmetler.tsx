import { useState, useRef, useEffect, type ElementType } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { SERVICES } from '../../data/nakliyatData';
import { Service } from '../../types';
import { 
  Home, 
  Layers, 
  Truck, 
  Package, 
  Building2, 
  Box, 
  Shield,
  Wrench,
  MapPin,
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import HizmetDetayModal from '../modals/HizmetDetayModal';

const iconMap: Record<string, ElementType> = {
  Home,
  Layers,
  Truck,
  Package,
  Building2,
  Box,
  Shield,
  Wrench,
  MapPin,
  CheckCircle2,
};

export default function Hizmetler() {
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    supabase.from('services').select('*').order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) {
          setServiceList(data.map((s: any) => ({
            id: String(s.id),
            title: s.title,
            description: s.description,
            iconName: s.icon_name,
            image: s.image_url,
            features: s.features || [],
            popular: s.popular || false,
            sort_order: s.sort_order || 0,
          })));
        } else {
          setServiceList(SERVICES);
        }
        setLoading(false);
      });
  }, []);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="hizmetler" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:pl-[46px] lg:pr-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 font-semibold text-xs tracking-wider uppercase mb-4"
          >
            Aga Nakliyat Çözümleri
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            Fatsa ve Ordu Profesyonel Nakliyat Hizmetlerimiz
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Eşyalarınızın her aşamada güvenliğini sağlayan, modern araç filomuz ve tecrübeli ekibimizle sunduğumuz nakliye çözümleri.
          </motion.p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-red-600 hover:text-white shadow-sm active:scale-95' : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
              }`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} disabled={!canScrollRight}
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-red-600 hover:text-white shadow-sm active:scale-95' : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
              }`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Service Cards Horizontal Track */}
       <div ref={scrollContainerRef}
  className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>  {loading ? (
    <div className="flex items-center justify-center w-full py-20">
      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ) : serviceList.length === 0 ? (
    <div className="w-full py-12 text-center text-slate-500 text-sm">Henüz hizmet eklenmemiş.</div>
  ) : serviceList.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Truck;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-30px", amount: 0.1 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative w-[calc(100vw-32px)] sm:w-[400px] lg:w-[calc(33.33%-16px)] shrink-0 snap-center bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-red-600/50 rounded-3xl overflow-hidden transition-all duration-300 sm:hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between transform-gpu"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    En Çok Tercih Edilen
                  </div>
                )}

                {/* SADECE BURASI DEĞİŞTİ: Resimlerin kesilmeden küçülüp tam sığması için object-contain ve arkaplan eklendi */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800/50">
                  <img
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-6 w-12 h-12 rounded-2xl bg-slate-950/90 border border-slate-700/80 text-red-500 flex items-center justify-center shadow-lg group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-200 dark:border-slate-800/80 pt-4">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="hidden sm:flex w-full py-2 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-xs font-bold text-slate-800 dark:text-slate-200 items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Hizmet Detaylarını İncele</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <HizmetDetayModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
}
