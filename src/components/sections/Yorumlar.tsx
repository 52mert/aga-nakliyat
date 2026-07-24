import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MapPin, CheckCircle2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Yorumlar() {
  const { testimonials, setIsAddReviewOpen } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter approved ones
  const approvedTestimonials = testimonials.filter((t) => t.status !== 'pending');

  // Calculate real average score & count
  const totalRating = approvedTestimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgScore = approvedTestimonials.length > 0 ? (totalRating / approvedTestimonials.length).toFixed(1) : '5.0';
  const evaluationCount = approvedTestimonials.length;

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
  }, [approvedTestimonials]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="yorumlar" className="py-24 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:pl-[46px] lg:pr-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 font-semibold text-xs tracking-wider uppercase mb-4"
          >
            Gerçek Müşteri Deneyimleri
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            Müşterilerimiz Bizim İçin Ne Diyor?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-slate-600 dark:text-slate-400"
          >
            Fatsa, Ünye ve Ordu’da evini taşımış mutlu müşterilerimizin gerçek yorumları.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(avgScore)) ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                ))}
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base">{avgScore} / 5.0</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">({evaluationCount} Değerlendirme)</span>
            </div>

            {/* Add Review Button */}
            <button
              onClick={() => setIsAddReviewOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yorum / Değerlendirme Ekle</span>
            </button>
          </motion.div>
        </div>

        {/* Horizontal Carousel Controls & Track */}
        <div className="relative">
          {/* Carousel Header Controls */}
          <div className="flex items-center justify-center sm:justify-end mb-4 px-1">
<div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft 
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white shadow-sm active:scale-95' 
                    : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
                }`}
                aria-label="Önceki Yorumlar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight 
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white shadow-sm active:scale-95' 
                    : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
                }`}
                aria-label="Sonraki Yorumlar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonials Horizontal Slider Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x pan-y' }}
          >
            {approvedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-30px", amount: 0.1 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="w-[calc(100vw-32px)] sm:w-[420px] md:w-[calc(50%-12px)] shrink-0 snap-center p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-900/50 shadow-md dark:shadow-2xl transition-all duration-300 relative flex flex-col justify-between transform-gpu"
              >
                {/* Background Watermark Quote (Placed in bottom-right corner to avoid badge overlap) */}
                <Quote className="absolute bottom-16 right-6 w-12 h-12 text-slate-100 dark:text-slate-800/40 pointer-events-none select-none z-0" />

                <div className="relative z-10">
                  {/* Rating Stars & Service Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1 text-amber-400 shrink-0">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/80 px-2.5 py-1 rounded-md border border-red-200 dark:border-red-800/40 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                      {testimonial.serviceType}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between relative z-10">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <span>{testimonial.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    {testimonial.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

