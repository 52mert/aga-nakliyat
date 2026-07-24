import React, { useState } from 'react';
import { X, Star, MessageSquare, CheckCircle2, User, MapPin, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AddReviewModal() {
  const { isAddReviewOpen, setIsAddReviewOpen, addTestimonial } = useApp();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('Fatsa, Ordu');
  const [serviceType, setServiceType] = useState('Asansörlü Evden Eve');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isAddReviewOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addTestimonial({
      name,
      location,
      serviceType,
      rating,
      comment
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
      setIsAddReviewOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800/80 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 flex flex-col transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Blur */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-600/30 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xl leading-tight">
                Değerlendirme Ekle
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Aga Nakliyat deneyiminizi paylaşın.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddReviewOpen(false)}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 dark:border-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative p-6 sm:p-8 pt-6 space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-5 animate-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  Teşekkür Ederiz!
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">
                  Değerlendirmeniz başarıyla eklendi ve yayına alındı.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Star Rating Selection */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 text-center">
                  Memnuniyet Puanınız
                </label>
                <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-all duration-300 hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 transition-all duration-300 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                            : 'text-slate-300 dark:text-slate-700 hover:text-amber-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                    Adınız Soyadınız *
                  </label>
                  <div className="relative group">
                    <User className="w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Örn: Serkan Yılmaz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500/50 dark:focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all placeholder:text-slate-400/70"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                    Lokasyon / Şehir
                  </label>
                  <div className="relative group">
                    <MapPin className="w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Örn: Fatsa, Ordu"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500/50 dark:focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all placeholder:text-slate-400/70"
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                  Aldığınız Hizmet Türü
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500/50 dark:focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="Asansörlü Evden Eve">Asansörlü Evden Eve</option>
                  <option value="Evden Eve Nakliyat">Evden Eve Nakliyat</option>
                  <option value="Şehirlerarası Nakliyat">Şehirlerarası Nakliyat</option>
                  <option value="Ambalajlı & Marangozlu">Ambalajlı & Marangozlu Taşıma</option>
                  <option value="Ofis / İşyeri Taşıma">Ofis / İşyeri Taşıma</option>
                  <option value="Parça Eşya Taşıma">Parça Eşya Taşıma</option>
                </select>
              </div>

              {/* Comment text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                  Yorumunuz *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Eşyalarınızın ambalajlanması, personel ilgisi ve taşıma kalitesi hakkındaki deneyimlerinizi yazın..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500/50 dark:focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all resize-none placeholder:text-slate-400/70"
                />
              </div>

              {/* Glowing Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-sm rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_25px_rgba(220,38,38,0.45)] border border-red-500/50 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Yorumu Yayınla</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}