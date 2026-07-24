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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg leading-tight">
                Müşteri Yorumu & Değerlendirme Ekle
              </h3>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                Aga Nakliyat deneyiminizi diğer müşterilerimizle paylaşın.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddReviewOpen(false)}
            className="min-h-[44px] min-w-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                Değerlendirmeniz Eklendi!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Görüşleriniz için teşekkür ederiz. Yorumunuz başarıyla yayınlandı.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 text-center">
                  Memnuniyet Puanınız
                </label>
                <div className="flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1.5 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Adınız Soyadınız *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Örn: Serkan Yılmaz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lokasyon / Şehir
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Örn: Fatsa, Ordu"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Aldığınız Hizmet Türü
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Yorumunuz *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Eşyalarınızın ambalajlanması, personel ilgisi ve taşıma kalitesi hakkındaki deneyimlerinizi yazın..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Yorumu Yayınla</span>
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
