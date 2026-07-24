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
    <section id="yorumlar" className="py-24 bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200/50 dark:border-slate-800/50 transition-colors">
      
      {/* Subtle Background Glows for Premium Feel */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white dark:from-slate-900 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto pl-[46px] pr-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100/80 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold text-[11px] tracking-widest uppercase mb-4 shadow-sm"
          >
            Gerçek Müşteri Deneyimleri
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            Müşterilerimiz Bizim İçin Ne Diyor?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-slate-600 dark:text-slate-400"
          >
            Fatsa, Ünye ve Ordu’da evini taşımış mutlu müşterilerimizin gerçek yorumları.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-5"
          >
            {/* Glassmorphism Rating Box */}
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.round(Number(avgScore)) ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-slate-300 dark:text-slate-700'}`} 
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 border-l border-slate-300 dark:border-slate-600 pl-3">
                <span className="font-black text-slate-900 dark:text-white text-lg leading-none">{avgScore}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider leading-tight">
                  ({evaluationCount} Yorum)
                </span>
              </div>
            </div>

            {/* Glowing Add Review Button */}
            <button
              onClick={() => setIsAddReviewOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-sm shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_25px_rgba(220,38,38,0.45)] border border-red-500/50 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Değerlendirme Ekle</span>
            </button>
          </motion.div>
        </div>

        {/* Horizontal Carousel Controls & Track */}
        <div className="relative mt-12">
          {/* Carousel Header Controls */}
          <div className="flex items-center justify-center sm:justify-end mb-6 px-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  canScrollLeft 
                    ? 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-600 shadow-lg active:scale-95' 
                    : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
                }`}
                aria-label="Önceki Yorumlar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  canScrollRight 
                    ? 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-600 shadow-lg active:scale-95' 
                    : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
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
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 -mx-4 px-[calc(50vw-210px)] sm:mx-0 sm:px-0 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollPadding: '0 calc(50vw - 210px)' }}
          >
            {approvedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="group w-[85vw] sm:w-[420px] md:w-[calc(50%-12px)] shrink-0 snap-center p-7 sm:p-8 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/90 dark:to-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 hover:border-red-400/40 dark:hover:border-red-500/30 shadow-xl shadow-slate-200/30 dark:shadow-black/40 hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-between transform-gpu"
              >
                {/* Subtle Background Watermark Quote */}
                <Quote className="absolute bottom-12 right-6 w-16 h-16 text-slate-100 dark:text-slate-800/30 group-hover:text-red-50 dark:group-hover:text-red-900/20 transition-colors duration-500 pointer-events-none select-none z-0" />

                <div className="relative z-10">
                  {/* Rating Stars & Service Badge */}
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="flex items-center gap-1 shrink-0">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-200/60 dark:border-red-500/20 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                      {testimonial.serviceType}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-slate-700 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
                    "{testimonial.comment}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between relative z-10">
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                      <span>{testimonial.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-md">
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