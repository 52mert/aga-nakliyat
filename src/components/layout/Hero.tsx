import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PhoneCall, ShieldCheck, Truck, Star } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { useApp } from '../../context/AppContext';

export default function Hero() {
  const { companyInfo, testimonials } = useApp();
  const sectionRef = useRef<HTMLElement>(null);

  const approvedTestimonials = testimonials.filter((t) => t.status !== 'pending');
  const totalRating = approvedTestimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgScore = approvedTestimonials.length > 0 ? (totalRating / approvedTestimonials.length).toFixed(1) : '5.0';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
  const contentFilter = useTransform(scrollYProgress, (v) => {
    const t = Math.max(0, Math.min(1, v / 0.8));
    return `blur(${t * 8}px)`;
  });

  return (
    <section id="anasayfa" ref={sectionRef} className="relative h-[70vh] lg:h-[130vh] w-full overflow-clip bg-center bg-cover bg-no-repeat bg-slate-50 dark:bg-slate-950 transition-colors"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(248,250,252,0.65), rgba(248,250,252,0.95)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80')`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="sticky top-16 h-[calc(100dvh-64px)] flex items-center justify-center overflow-hidden px-4 sm:px-9 pb-20 md:pb-12">
        <div className="absolute inset-0 z-[1] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,17,31,0.5)_100%),linear-gradient(180deg,rgba(7,17,31,0.3)_0%,rgba(7,17,31,0.85)_100%)] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(241,245,249,0.8)_100%),linear-gradient(180deg,rgba(248,250,252,0.3)_0%,rgba(248,250,252,0.95)_100%)]" />

        {/* Bottom fade to blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 z-[3] pointer-events-none bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />

        <motion.div
          className="relative z-[2] text-center w-full sm:max-w-[820px] px-4 sm:px-8 md:px-10 py-6 sm:py-9 md:py-11 rounded-[32px] border shadow-2xl bg-white/88 dark:bg-slate-900/65 border-slate-300/90 dark:border-white/18 shadow-slate-950/12 dark:shadow-black/60 backdrop-blur-[20px] saturate-[180%] transform-gpu"
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale, filter: contentFilter }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-[0.75rem] sm:text-[0.85rem] font-bold mb-3 sm:mb-5 uppercase tracking-[1px] shadow-md shadow-red-600/40"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60" />
            Fatsa · Ünye · Ordu
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-extrabold mb-3 sm:mb-[18px] tracking-tight bg-gradient-to-b text-transparent bg-clip-text from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
          >
            Fatsa Nakliyat ve Ordu Evden Eve Taşımacılık
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 mb-4 sm:mb-[30px] leading-relaxed max-w-[680px] mx-auto hidden sm:block"
          >
            Aga Nakliyat güvencesiyle bölgenin en güvenilir,
            asansörlü, ambalajlı ve sigortalı evden eve taşımacılık hizmeti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row gap-1.5 sm:gap-[14px] justify-center items-center"
          >
              <a
                href={`tel:${companyInfo.phonePrimaryRaw}`}
                className="inline-flex items-center justify-center gap-1 sm:gap-[10px] px-2.5 sm:px-7 min-h-[44px] sm:py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-[0.65rem] sm:text-base whitespace-nowrap no-underline shadow-lg shadow-red-600/35 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/50 transition-all duration-200 cursor-pointer border border-transparent"
              >
                <PhoneCall className="w-2.5 h-2.5 sm:w-5 sm:h-5 shrink-0" />
                <span>Hemen Ara</span>
              </a>

              <a
                href={`https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent('Merhaba Aga Nakliyat, Fatsa/Ordu evden eve nakliyat hakkında bilgi almak istiyorum.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 sm:gap-[10px] px-2.5 sm:px-7 min-h-[44px] sm:py-3.5 rounded-xl font-bold text-[0.65rem] sm:text-base whitespace-nowrap no-underline shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer bg-emerald-600/15 dark:bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 border border-emerald-600/40 dark:border-emerald-500/30 shadow-emerald-600/10 hover:bg-emerald-600/25 hover:text-emerald-800 dark:hover:text-white"
              >
                <WhatsAppIcon className="w-2.5 h-2.5 sm:w-5 sm:h-5 shrink-0" />
                <span>WhatsApp</span>
              </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center gap-3 sm:gap-6 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/80 dark:border-white/10 flex-wrap"
          >
            <div className="flex items-center gap-2 text-[11px] sm:text-sm text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 dark:text-emerald-400" />
              <span><strong className="text-slate-900 dark:text-white">%100 Sigortalı</strong> Taşıma</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-sm text-slate-600 dark:text-slate-400">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 dark:text-red-400" />
              <span><strong className="text-slate-900 dark:text-white">25. Kat</strong> Asansörlü Kamyon</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-sm text-slate-600 dark:text-slate-400">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400" />
              <span><strong className="text-slate-900 dark:text-white">{avgScore} / 5</strong> Memnuniyet</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
