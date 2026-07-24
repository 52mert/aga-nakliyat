# Aga Nakliyat - Mobil Tasarım Kapsamlı Düzeltme Rehberi (responsive3.md)

> **KRİTİK UYARI VE UYGULAMA DİREKTİFİ (AI AGENT & YAZILIM YÖNETİCİSİ)**
> Bu doküman, uygulamada tespit edilen **4 kritik mobil UI kusurunun** (Sabit Alt Bar genişliği/boşluğu, Yorumlar kartı genişliği, Teklif Modal WhatsApp butonu yüksekliği ve Galeri Lightbox modal hizanması) **BİR DAHA TEKRARLANMAMASI VE SIFIR HATA İLE ÇALIŞMASI** için hazırlanmıştır.
> **MASAÜSTÜ (DESKTOP >= 1024px) TASARIMINA KESİNLİKLE DOKUNULMAYACAKTIR.**

---

## 🛠️ 1. SABİT ALT İLETİŞİM BARI (STICKY BOTTOM COMM BAR) - SAĞDA BOŞLUK & EŞİT DÜZEN

### Sorunun Tanımı
Cihazın alt kısmına sabitlenen `Hemen Ara` ve `WhatsApp Hat` çubuğunda `left-0 right-0` kullanımı yerine `inset-x-0 w-full` kullanılmadığında veya butonların metinleri `whitespace-nowrap` olmadığında sağ tarafta asimetrik boşluk kalmakta ve buton boyutları eşitsiz durmaktadır.

### Uygulanan İdeal Kod Yapısı (`FloatingButtons.tsx`)
```tsx
<div className="sm:hidden fixed bottom-0 inset-x-0 w-full z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-2 flex items-center justify-between gap-2.5 text-white pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-2xl mx-auto">
  <a
    href={`tel:${companyInfo.phonePrimaryRaw}`}
    className="flex-1 py-3 bg-red-600 active:bg-red-700 active:scale-98 text-white rounded-xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all min-h-[44px]"
  >
    <PhoneCall className="w-4 h-4 shrink-0" />
    <span className="whitespace-nowrap">Hemen Ara</span>
  </a>

  <a
    href={`https://wa.me/${companyInfo.whatsappNumber}...`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 py-3 bg-emerald-600 active:bg-emerald-700 active:scale-98 text-white rounded-xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all min-h-[44px]"
  >
    <WhatsAppIcon className="w-4 h-4 shrink-0" />
    <span className="whitespace-nowrap">WhatsApp Hat</span>
  </a>
</div>
```
- **Kural**: Alt sabit çubukta `inset-x-0 w-full` kullanılmalı, iki buton da `flex-1` olarak %50/%50 eşit genişlik almalı, metinlerde `whitespace-nowrap` bulunmalıdır.

---

## 💬 2. YORUMLAR (CUSTOMER REVIEWS) CAROUSEL - SAĞA YATIKLIK & KART GENİŞLİĞİ

### Sorunun Tanımı
Mobil slider kartlarına verilen sabit genişlik yüzdeleri (`w-[88vw]`) ekran genişliği azaldığında sağ tarafta 12vw boşluk bırakmakta ve kart sola yatık/asimetrik görünmektedir.

### Uygulanan İdeal Kod Yapısı (`Yorumlar.tsx`)
```tsx
<div
  ref={scrollContainerRef}
  className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
>
  {approvedTestimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="w-[calc(100vw-32px)] sm:w-[420px] md:w-[calc(50%-12px)] max-w-full shrink-0 snap-center p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-md flex flex-col justify-between transform-gpu"
    >
      ...
    </div>
  ))}
</div>
```
- **Kural**: Mobilde kart genişliği `w-[calc(100vw-32px)]` olarak verilerek 16px sol + 16px sağ kenar boşlukları hesaba katılmalı ve kart ekranı tam doldurarak ortalanmalıdır.

---

## 🧮 3. HIZLI TEKLİF MODALI (TEKLİFMODAL) - AŞIRI BÜYÜK WHATSAPP BUTONU

### Sorunun Tanımı
Modal altındaki WhatsApp buton metni ("Bu Teklifle WhatsApp'tan İletişime Geçin") çok uzun olduğu için mobil cihazlarda 3 satıra kırılmakta, buton yüksekliği devasa hale gelmekte ve yanındaki "Hemen Ara" butonuyla biçimsiz bir görüntü oluşturmaktaydı.

### Uygulanan İdeal Kod Yapısı (`TeklifModal.tsx`)
```tsx
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
```
- **Kural**: Buton yazıları her zaman kısa, net ve `whitespace-nowrap` olmalı; mobil cihazlarda dikey yüksekliği 44px kuralına uygun şekilde tek satırda tutulmalıdır.

---

## 🖼️ 4. SAHA GALERİSİ & LIGHTBOX MODAL - SOLA HİZALANMA & EKRAN MERKEZLEME

### Sorunun Tanımı
Saha galeri fotoğraflarına tıklandığında açılan büyük resim modalı (`Lightbox`) `mx-auto` eksikliği ve flex hizalama sorunları nedeniyle sola yaslanmakta, sağ tarafta boşluk kalmaktaydı. Ayrıca galeri kartları mobilde küçük kalmaktaydı.

### Uygulanan İdeal Kod Yapısı (`Galeri.tsx`)
1. **Galeri Kartları**: `w-[calc(100vw-32px)] sm:w-[360px]`
2. **Lightbox Modal**:
```tsx
<div 
  className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 w-full overflow-hidden"
  onClick={() => setSelectedImageIndex(null)}
>
  <div 
    className="relative w-full max-w-3xl max-h-[85dvh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col mx-auto my-auto z-10"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="relative flex-1 min-h-[220px] sm:min-h-[380px] bg-slate-950 flex items-center justify-center p-2 w-full">
      <img
        src={filteredItems[selectedImageIndex].image}
        alt={filteredItems[selectedImageIndex].title}
        className="max-w-full max-h-[50dvh] object-contain rounded-2xl mx-auto"
        referrerPolicy="no-referrer"
      />
    </div>
    ...
  </div>
</div>
```
- **Kural**: Lightbox modalı açıldığında ana kapsayıcı `flex items-center justify-center w-full` olmalı, iç modal kartı `w-full max-w-3xl mx-auto my-auto` ile tam ekranın ortasında simetrik olarak hizalanmalıdır.

---

## ↕️ 5. DİKEY DOKUNMA & KAYMA (TOUCH JITTER / VERTICAL DISPLACEMENT) ENGELLEME

### Sorunun Tanımı
Mobil cihazlarda Hizmetler, Yorumlar veya Galeri kartlarına dokunarak sayfayı dikeyde aşağı/yukarı kaydırmak isterken kartların yukarı-aşağı zıplaması veya sayfa kaydırmayı engellemesi sorunu.

### Sorunun Sebepleri & Çözümleri
1. **Mobil Touch Hover Tetiklenmesi (`hover:-translate-y-1.5`)**:
   - `hover:-translate-y-1.5` sınıfı dokunmatik ekranlarda parmak karta değer değmez kartı 6px yukarı kaydırır.
   - **Çözüm**: Mobilde hover transform kaldırılmalı, sadece masaüstü ve tablette etkinleştirilmelidir (`sm:hover:-translate-y-1.5`).
2. **Yatay Scroll Dokunma Eylemi (`touch-action`)**:
   - Yatay kaydırma track'lerine CSS `touchAction: 'pan-x pan-y'` veya Tailwind `touch-pan-x` sınıfı eklenmediğinde tarayıcı dikey sayfa kaydırmasını kartın yatay kaydırmasıyla karıştırır.
   - **Çözüm**: Tüm kaydırma ebeveynlerine (`Hizmetler`, `Galeri`, `Yorumlar` scroll track):
     ```tsx
     <div
       ref={scrollContainerRef}
       className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth touch-pan-x"
       style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x pan-y' }}
     >
     ```

---

## 📋 ÖZET CHECKLIST (AGENT SIFIR HATA TALİMATI)

- [x] Mobil alt sabit iletişim barında `inset-x-0 w-full` ve `flex-1` ile %50/%50 eşit dağılım sağlandı mı?
- [x] Yorumlar, Hizmetler ve Galeri kartları mobilde `w-[calc(100vw-32px)]` ile ekranı ortalayıp boşluk bırakmayacak şekilde ayarlandı mı?
- [x] Dokunmada kartların dikeyde zıplamaması için `sm:hover:-translate-y-1.5` ve `touchAction: 'pan-x pan-y'` uygulandı mı?
- [x] Teklif hesaplayıcı WhatsApp buton metni tek satırda kalacak şekilde kısalıp `whitespace-nowrap` yapıldı mı?
- [x] Galeri detay modalı (`Lightbox`) `mx-auto my-auto` ile tam ortalandı mı?
- [x] Masaüstü (`>= 1024px`) görünümüne kesinlikle dokunulmadı mı?
