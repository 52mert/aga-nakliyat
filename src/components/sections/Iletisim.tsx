import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  Send, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Iletisim() {
  const { companyInfo, addQuoteRequest } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fromLocation: 'Fatsa',
    toLocation: 'Ordu',
    moveType: '2+1 Daire',
    moveDate: '',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Add to app context so admin panel receives it
    addQuoteRequest({
      name: formData.name,
      phone: formData.phone,
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      moveType: formData.moveType,
      moveDate: formData.moveDate,
      note: formData.note
    });

    // Build pre-filled WhatsApp link for direct fast submission
    const message = `Merhaba Aga Nakliyat,%0A%0A*YENİ TEKLİF TALEBİ*%0A• *Ad Soyad:* ${formData.name}%0A• *Telefon:* ${formData.phone}%0A• *Nereden:* ${formData.fromLocation}%0A• *Nereye:* ${formData.toLocation}%0A• *Eşya Tipi:* ${formData.moveType}%0A• *Tarih:* ${formData.moveDate || 'Belirtilmedi'}%0A• *Not:* ${formData.note || 'Yok'}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${message}`, '_blank');
    }, 400);
  };

  return (
    <section id="iletisim" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 font-semibold text-xs tracking-wider uppercase mb-4"
          >
            Anında Teklif Alın
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            Ücretsiz Ekspertiz ve Teklif Talebi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-slate-600 dark:text-slate-400"
          >
            Formu doldurun veya telefon numaralarımızdan doğrudan ustalarımızla iletişime geçin.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Map Info */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-30px", amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="lg:col-span-5 space-y-6 transform-gpu"
          >
            
            {/* Primary Phone Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 dark:from-red-950/90 dark:via-slate-900 dark:to-slate-900 text-white border border-red-500/30 dark:border-red-800/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center mb-4 shadow-lg">
                <PhoneCall className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-red-100 dark:text-red-400 uppercase tracking-widest">
                7/24 Kesintisiz Hat
              </span>
              <h3 className="text-3xl font-black text-white mt-1">
                {companyInfo.phonePrimary}
              </h3>
              <p className="text-xs text-red-100 dark:text-slate-400 mt-2">
                Fatsa, Ünye ve Ordu merkez tüm ev ve işyeri taşımalarınız için hemen arayın.
              </p>

              <div className="mt-6 pt-4 border-t border-white/20 dark:border-slate-800 flex items-center gap-3">
                <a
                  href={`tel:${companyInfo.phonePrimaryRaw}`}
                  className="flex-1 py-3 bg-white text-red-600 dark:bg-red-600 dark:text-white hover:bg-slate-100 dark:hover:bg-red-700 rounded-xl font-bold text-sm text-center shadow-lg transition-all"
                >
                  Hemen Ara
                </a>
                <a
                  href={`https://wa.me/${companyInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-red-600 dark:text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Adresimiz</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {companyInfo.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Çalışma Saatlerimiz</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Pazartesi - Pazar: 07:00 - 22:00
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">E-Posta</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {companyInfo.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Tüm taşınma taleplerinizde ekspertiz hizmetimiz %100 ücretsizdir.
              </p>
            </div>

          </motion.div>

          {/* Right Column: Quote Form */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-30px", amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md sm:shadow-xl dark:sm:shadow-2xl relative transform-gpu"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Hızlı Teklif Talebi Formu
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-white dark:bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  Talebiniz Alındı!
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Bilgileriniz kaydedildi ve WhatsApp üzerinden Aga Nakliyat yetkilisine iletildi.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Yeni Form Doldur
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Mehmet Yılmaz"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nereden Taşınacak?
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Fatsa Dolunay Mah."
                      value={formData.fromLocation}
                      onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nereye Taşınacak?
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Ünye veya Ordu Merkez"
                      value={formData.toLocation}
                      onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Eşya Durumu / Ev Tipi
                    </label>
                    <select
                      value={formData.moveType}
                      onChange={(e) => setFormData({ ...formData, moveType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    >
                      <option value="1+1 Daire">1+1 Daire</option>
                      <option value="2+1 Daire">2+1 Daire</option>
                      <option value="3+1 Daire">3+1 Daire</option>
                      <option value="4+1 veya Müstakil">4+1 veya Müstakil</option>
                      <option value="Parça Eşya">Parça Eşya / Tekli Mobilya</option>
                      <option value="Ofis / İşyeri">Ofis / İşyeri</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Tahmini Taşınma Tarihi
                    </label>
                    <input
                      type="date"
                      value={formData.moveDate}
                      onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Özel Notunuz veya Kat Bilgisi (Opsiyonel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Örn: 4. kattan 2. kata taşınacak, asansörlü olsun..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-base shadow-xl shadow-red-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>WhatsApp ile Anında Teklif Al</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center mt-2">
                  * Gönder butonuna bastığınızda bilgileriniz doğrudan WhatsApp yetkilimize iletilecektir.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
