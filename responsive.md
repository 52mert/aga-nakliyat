# Aga Nakliyat - Mobil Responsive Tasarım & Kodlama Rehberi (responsive.md)

Bu doküman, **Aga Nakliyat** projesinde masaüstü (web/desktop) görünümüne **kesinlikle dokunmadan**, sadece mobil cihazlarda (iOS/Android tüm çözünürlükler) mükemmel kullanıcı deneyimi (UX/UI) ve performans elde etmek için uygulanan mobil responsive değişiklikleri ve gelecekteki geliştirmelerde dikkat edilmesi gereken kuralları adım adım detaylandırır.

---

## 🎯 Temel İlke: Masaüstü Görünümü Koruma & Mobil İzolasyon

Tüm mobil düzenlemeler Tailwind CSS'in **Mobile-First** kırılım prefix'leri (`sm:`, `md:`, `lg:`, `xl:`) kullanılarak izole edilmiştir.

- **Varsayılan Class'lar**: Yalnızca mobil ekranları hedef alır (örn: `grid-cols-1`, `w-[88vw]`, `flex-col`, `p-4`).
- **Masaüstü/Tablet Class'ları**: Masaüstü görünümünün bozulmaması için `sm:`, `md:`, `lg:` ön ekleriyle korunmuştur (örn: `md:grid-cols-3`, `sm:w-auto`, `md:flex-row`, `sm:p-8`).
- **Görünürlük İzolasyonu**: Mobilde olan ancak masaüstünde istenmeyen elemanlarda `md:hidden`, masaüstünde olan ama mobilde gizlenmesi gerekenlerde `hidden md:flex` veya `hidden md:block` kullanılır.

---

## 📐 Mobil Tasarım Değişiklikleri & Mimari Standartlar

### 1. Garantili Dokunma Alanları (Touch Targets ≥ 44px)
- **Problem**: Mobilde parmakla tıklamada küçük buton ve linklerin tıklanamaması veya yanlış tıklanması.
- **Çözüm**: Tüm buton, form girdisi, sekme ve ikonlara en az `44px` yüksekliği garantileyen standartlar uygulandı:
  - `min-h-[44px]` ve `min-w-[44px]` utility sınıfları eklendi.
  - CSS değişkeni olarak `index.css` içinde `--touch-min: 44px` tanımlandı.
  - Form elemanları ve butonlarda dikey iç boşluklar (`py-3`, `py-3.5`) mobil için genişletildi.

---

### 2. Sabit Mobil İletişim Çubuğu (Mobile Sticky Bottom Bar)
- **Bileşen**: `src/components/layout/FloatingButtons.tsx`
- **Değişiklik**:
  - Mobil cihazlarda ekranın en altında sabitlenen **Hemen Ara** (Kırmızı) ve **WhatsApp** (Yeşil) ikili iletişim barı yerleştirildi.
  - `md:hidden` sınıfı eklenerek **masaüstü web görünümünde bu çubuğun çıkması engellendi**.
  - iPhone çentik alanı (home indicator) için `pb-[calc(0.75rem+env(safe-area-inset-bottom))]` güvenli alan tamponu verildi.
  - Sayfa içeriğinin alt kısımda çubuk arkasında kalmaması için `App.tsx` / `main` bileşenine mobil tabanlı alt boşluk verildi.

---

### 3. Mobil Akıcı Yatay Kaydırmalı Kartlar (Horizontal Snap Carousels)
- **Bileşenler**: `Hizmetler.tsx`, `Galeri.tsx`, `Yorumlar.tsx`
- **Masaüstü Durumu**: `md:grid md:grid-cols-3` ile klasik 3'lü veya 4'lü düzenini korur.
- **Mobil Durumu**: Dikey sayfa uzunluğunu aşırı uzatmamak için mobilde `flex overflow-x-auto snap-x snap-mandatory scrollbar-none` yapısına geçer.
- **Kart Genişliği**: Mobilde `w-[88vw]` verilerek sağ taraftaki kartın ucu hafif görünür kılındı. Bu sayede kullanıcıya sezgisel "kaydırılabilir içerik" mesajı verilir.
- **Kart Hizalama**: `snap-center` ile parmak kaydırma bittiğinde kart otomatik ortalanır.

---

### 4. Esnek & Ergonomik Modallar (Mobile Bottom Sheets)
- **Bileşenler**: `TeklifModal.tsx`, `HizmetDetayModal.tsx`, `AddReviewModal.tsx`
- **Masaüstü Durumu**: Ekranın tam ortasında pop-up pencere (`sm:items-center sm:rounded-3xl sm:max-w-xl`).
- **Mobil Durumu**:
  - Ekranın altından yükselen kart yapısı (`items-end sm:items-center`).
  - Üst köşeler kavisli, alt corners sıfırlanmış yapıda (`rounded-t-3xl sm:rounded-3xl`).
  - Maksimum yükseklik `max-h-[90dvh]` ile sınırlandırıldı ve `overflow-y-auto` verildi.
  - Mobil klavye açıldığında form elemanlarının ekran dışına taşması engellendi.
  - Kapatma `X` butonu mobilde `44px` dokunma boyutuna getirildi.

---

### 5. Mobil Çekmece Menü (Mobile Drawer Navigation)
- **Bileşen**: `src/components/layout/Sidebar.tsx`
- **Masaüstü Durumu**: Sabit üst navbar (`hidden md:flex items-center gap-6`).
- **Mobil Durumu**:
  - Sağ/Sol üst köşede dokunmatik hamburger menü ikonu.
  - Menü açıldığında yumuşak yay animasyonlu (framer-motion spring transition) mobil çekmece.
  - Çekmece açıldığında sayfanın arkada kaymasını önleyen body scroll kilidi.
  - Menü içi linklerde `min-h-[44px]` ve geniş dikey padding (`py-3`).

---

### 6. Görsel & Tipografi Ölçekleme (Fluid Responsive Typography)
- **Metin Boyutları**:
  - Ana Başlıklar: Mobilde `text-2xl` veya `text-3xl`, masaüstünde `sm:text-4xl lg:text-5xl`.
  - Alt Metinler: Mobilde `text-xs` veya `text-sm`, masaüstünde `sm:text-base`.
  - Etiket & Rozetler: Mobilde `text-[10px]` veya `text-xs`, masaüstünde `sm:text-sm`.
- **Taşma Önleme**: `break-words`, `hyphens-none` ve `whitespace-nowrap` kullanılarak mobilde kelimelerin garip yerlerden bölünmesi veya ekran dışına taşması engellendi.

---

## 📋 Bileşen Bazlı Mobil Değişiklik Özeti

| Bileşen Dosyası | Mobil Özellik (Mobile) | Masaüstü Koruma (Desktop) |
| :--- | :--- | :--- |
| `FloatingButtons.tsx` | Ekran altı sabit Ara/WhatsApp çubuğu | `md:hidden` ile tamamen gizli |
| `Sidebar.tsx` | Hamburger buton + Yan çekmece menü | `hidden md:flex` ile yatay geniş menü |
| `Hero.tsx` | `min-h-[calc(100dvh-64px)]`, tek sütun butonlar | `lg:grid-cols-12` geniş hero layout |
| `Hizmetler.tsx` | Yatay `snap-x` kaydırma (`w-[88vw]`) | `md:grid md:grid-cols-3` |
| `NedenBiz.tsx` | 2x2 rozet grid + tek sütun liste | `lg:grid-cols-2` dengeli çift sütun |
| `Galeri.tsx` | Dokunmatik kategori barı + mobil lightbox | `md:grid-cols-3` tam ızgara görünümü |
| `Yorumlar.tsx` | Yatay slider + mobil yorum ekleme modalı | `md:grid-cols-3` kart görünümü |
| `Iletisim.tsx` | Tek sütun dokunmatik form | `lg:grid-cols-12` adres ve form yan yana |
| `TeklifModal.tsx` | Alt sheet modal, dokunmatik slider (`90dvh`) | Ortalı pencere modal (`max-w-xl`) |

---

## 🛠️ İleride Kod Yazarken Neleri Nasıl Yapmalısın? (Geliştirici Rehberi)

Gelecekte yeni bir özellik veya bileşen eklerken masaüstü tasarımı **asla bozmamak** için şu adımları izle:

### 1. Yeni Bir Bileşen Eklerken
```tsx
{/* DOĞRU KULLANIM: Mobil öncelikli yaz, masaüstünü md: veya lg: ile ayır */}
<div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8">
  <div className="w-full md:w-1/2">
    <h2 className="text-xl md:text-3xl font-bold">Başlık</h2>
  </div>
</div>
```

### 2. Sadece Mobile Özel Eleman Eklerken
Masaüstünde görünmesini istemediğin elemanlara mutlaka `md:hidden` ver:
```tsx
<div className="block md:hidden">
  {/* Sadece mobilde gözükecek buton veya bildirim */}
</div>
```

### 3. Sadece Masaüstüne Özel Eleman Eklerken
Mobilde görünmesini istemediğin elemanlara `hidden md:block` veya `hidden md:flex` ver:
```tsx
<div className="hidden md:flex items-center gap-4">
  {/* Sadece masaüstünde gözükecek detaylı bilgi barı */}
</div>
```

### 4. Dokunma Alanlarını Kontrol Etme
Ekleyeceğin tüm buton ve tıklanabilir alanlara `min-h-[44px]` ve `flex items-center justify-center` ekle:
```tsx
<button className="w-full py-3 min-h-[44px] bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
  Tıkla
</button>
```

### 5. Izgara (Grid) Yapılarını Düzenleme
Mobilde tek sütun başlayıp ekran büyüdükçe sütun sayısını artır:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* Kartlar */}
</div>
```

---

## 🚀 Sonuç

Bu responsive mimari sayesinde **Aga Nakliyat** uygulaması:
1. Masaüstü tarayıcılarda geniş, şık ve kurumsal yapısını korur.
2. Mobil cihazlarda (iPhone, Android, Tablet) tıpkı bir mobil uygulama (Native App) gibi hızlı, dokunmatik dostu ve akıcı çalışır.
3. Masaüstü kodları ile mobil kodlar Tailwind break-point'leri sayesinde birbirini etkilemez ve bozmaz.
