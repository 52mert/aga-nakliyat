import React from 'react';
import { motion } from 'motion/react';
import { WHY_US_REASONS } from '../../data/nakliyatData';
import { 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  PackageCheck, 
  BadgePercent, 
  CheckCircle,
  Truck,
  Award,
  Users
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Zap,
  ShieldCheck,
  Wrench,
  PackageCheck,
  BadgePercent
};

export default function NedenBiz() {
  return (
    // border-t border-slate-200 dark:border-slate-800 kısımlarını sildik
    <section id="neden-biz" className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      
      {/* Üstteki Hizmetler bölümünden pürüzsüzce aşağı akan soluklu geçiş (Fade) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white dark:from-slate-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 font-semibold text-xs tracking-wider uppercase">
              Bölgenin Güvenilir Markası
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Neden <span className="text-red-600 dark:text-red-500">Aga Nakliyat</span>'ı Tercih Etmelisiniz?
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Fatsa, Ünye ve Ordu genelinde evden eve taşımacılıkta yıllların getirdiği tecrübe, modern mobil asansör sistemleri ve sıfır hasar ilkemizle hizmet veriyoruz.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-2 text-red-600 dark:text-red-500 font-black text-3xl">
                  <Truck className="w-6 h-6 shrink-0" />
                  <span>2,500+</span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Başarıyla Tamamlanan Ev Taşıma
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-black text-3xl">
                  <Award className="w-6 h-6 shrink-0" />
                  <span>10+ Yıl</span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Sektörel Tecrübe & Güven
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-3xl">
                  <ShieldCheck className="w-6 h-6 shrink-0" />
                  <span>%100</span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Sigortalı & Kaskolu Nakliye
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-3xl">
                  <Users className="w-6 h-6 shrink-0" />
                  <span>%99.8</span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Müşteri Memnuniyet Oranı
                </div>
              </motion.div>
            </div>

            {/* Regional Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-600/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-500 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  Hizmet Bölgelerimiz:
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Fatsa, Ünye, Ordu (Altınordu), Perşembe, Kümbet, Kumru, Korgan, Aybastı ve Tüm Türkiye
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Reasons Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_US_REASONS.map((reason, idx) => {
              const IconComp = iconMap[reason.icon] || CheckCircle;
              const delay = (idx % 2) * 0.1;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-30px" }}
                  transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-red-500/50 shadow-sm hover:shadow-xl transition-all duration-300 group transform-gpu"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-500 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {reason.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}