import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import type { GalleryItem } from '../../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function Galeri() {
  const { companyInfo } = useApp();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    supabase.from('gallery').select('*').order('sort_order')
      .then(({ data }) => {
        if (data) {
          setGalleryItems(data.map((item: any) => ({
            id: String(item.id),
            title: item.title,
            category: item.category,
            image: item.image_url,
            description: item.description || '',
          })));
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
  }, [activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const categories = [
    { id: 'all', label: 'Tüm Çalışmalar' },
    { id: 'asansor', label: 'Asansörlü Taşıma' },
    { id: 'ambalaj', label: 'Ambalajlama & Paketleme' },
    { id: 'araclar', label: 'Araçlarımız' },
    { id: 'tasima', label: 'Ev Taşıma Kareleri' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === 0 ? filteredItems.length - 1 : selectedImageIndex - 1);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === filteredItems.length - 1 ? 0 : selectedImageIndex + 1);
  };

  return (
    <section id="galeri" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:pl-[46px] lg:pr-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 font-semibold text-xs tracking-wider uppercase mb-4"
          >
            Gerçek Saha Fotoğrafları
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            Yaptığımız İşler ve Araç Filomuz
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-slate-600 dark:text-slate-400"
          >
            Fatsa, Ünye ve Ordu genelinde gerçekleştirdiğimiz nakliyat operasyonlarından canlı kareler.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px", amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">Henüz galeri resmi eklenmemiş.</div>
        ) : (
       <div ref={scrollContainerRef}
  className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {filteredItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-30px", amount: 0.1 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative w-[calc(100vw-32px)] sm:w-[360px] lg:w-[calc(33.33%-16px)] shrink-0 snap-center h-56 sm:h-64 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-xl hover:border-red-600/50 transition-all duration-300 transform-gpu"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-slate-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-700">
                  <Maximize2 className="w-5 h-5 text-red-400" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase bg-red-950/80 px-2.5 py-0.5 rounded-md border border-red-800/40">
                    {item.category === 'asansor' ? 'Asansörlü Nakliyat' : item.category === 'ambalaj' ? 'Ambalaj' : 'Saha Operasyonu'}
                  </span>
                  <h3 className="font-bold text-lg mt-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 w-full overflow-hidden"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-20 cursor-pointer"
          >
            <X className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Modal Image Box */}
          <div 
            className="relative w-full max-w-3xl max-h-[85dvh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col mx-auto my-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                className="w-full h-full object-cover object-[center_35%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
            </div>

            <div className="p-1 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-2 sm:gap-4">
              <div>
                <h3 className="font-bold text-white text-xl">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {filteredItems[selectedImageIndex].description}
                </p>
              </div>

              <a
                href={`https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(`Merhaba Aga Nakliyat, galerinideki "${filteredItems[selectedImageIndex].title}" gibi bir nakliye hizmeti almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] sm:text-xs flex items-center gap-1.5 sm:gap-2 shadow-lg"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Bunun İçin Teklif Al</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
