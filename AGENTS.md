# Aga Nakliyat - Proje Rehberi ve Geliştirme Kuralları

Bu dosya, Aga Nakliyat web uygulamasının mimari, tasarım ve performans ilkelerini barındırır.

---

## Proje Hakkında

Aga Nakliyat, Ordu / Fatsa merkezli evden eve asansörlü taşımacılık, ambalajlı nakliyat ve şehirlerarası lojistik hizmetleri sunan bir web uygulamasıdır.

### Temel Özellikler

1. **Hero & Scroll Parallax**: Framer Motion `useTransform` ile optimize edilmiş (4 transform) smooth scroll
2. **Akıllı Fiyat Hesaplayıcı**: Supabase `pricing_config` tablosundan okur, oda/güzergah/kat/asansöre göre anında fiyat
3. **Müşteri Yorumları**: Supabase `testimonials` tablosu, admin onaylı yayın, carousel gösterim
4. **Saha Galerisi**: Kategori filtreli, lightbox incelemeli dinamik galeri
5. **Admin Paneli** (`/mertadmin`): Supabase Auth ile giriş, 4 sekme (teklifler, yorumlar, fiyatlandırma, ayarlar)
6. **Supabase Backend**: Postgres tabloları + RLS + Auth ile güvenli CRUD

---

## Tasarım ve Animasyon İlkeleri

- **Motion**: `will-change: transform, opacity` ve `transform-gpu` GPU hızlandırma. Layout thrashing'den kaçınılır.
- **Renk Paleti**: Kırmızı (`#dc2626`), Slate (`#0f172a`, `#020617`), Altın/Kehribar (`#f59e0b`)
- **Mobil Öncelikli**: 44px+ dokunma alanları (`--touch-min`), responsive tasarım
- **prefers-reduced-motion** animasyonlarda dikkate alınmalı

---

## Hero Scroll Parallax Detayları

### Section
- Mobile: `h-[70vh]`, Desktop: `lg:h-[130vh]`
- Sticky iç container: `h-[calc(100dvh-64px)]` (header offseti hesaba katılır)
- Arkaplan: section'a `background-attachment: fixed` ile sabitlenmiş gradient + image

### Kart Efektleri (motion.div)
| Property | scrollYProgress range | Output range | Açıklama |
|---|---|---|---|
| `contentY` | `[0, 1]` | `[0px, -200px]` | Yukarı kayma (teleport hissi) |
| `contentScale` | `[0, 0.8]` | `[1, 0.85]` | Scroll ilerledikçe küçülme |
| `contentOpacity` | `[0, 1]` | `[1, 0]` | Scroll sonunda kaybolma |
| `contentFilter` | `[0, 0.8]` | `blur(0px)` → `blur(8px)` | Scroll sonunda bulanıklaşma |

### Bottom Fade
- `z-[3]` overlay, `bg-gradient-to-t from-white` → sonraki section'a (Hizmetler) geçişi yumuşatır
- Kart `z-[2]`'de, fade bunun üstünde

---

## Mobil Düzen Detayları

### Section Padding
- Hizmetler, Galeri, Yorumlar: `pl-[46px] pr-4 sm:px-6 lg:px-8`
- `46px = 30px (sidebar'dan ilk card gap) + 16px (px-4)`
- Mobilde sidebar kapalıyken asimetrik padding oluşur, ama scroll container snap mantığı için gereklidir

### FloatingButtons (Mobil Alt Bar)
- `pl-2 pr-[50px]` — sağdaki 50px alan scrollbar/kenar boşluğu
- WhatsApp shake animasyonu: `shake-cycle` (4s, sadece vertical translate)
- `env(safe-area-inset-bottom)` eklenmeli (iPhone çentik uyumu)

### Galeri Lightbox (Mobil)
- `mr-[50px]` — kapatma butonu için sağ boşluk
- `w-[calc(100%-50px)]` — içerik genişliği
- Prev/Next butonları `w-5 h-5` — mobilde çok küçük (20px), 44px'e çıkarılmalı
- Görsel `max-h-[150px]` — lightbox için çok kısıtlı, `max-h-[40dvh]` önerilir

### Yorumlar Kontrolleri
- Prev/Next butonları `justify-center sm:justify-end` — mobilde ortalanır

---

## Dosya Yapısı

```
src/
├── components/
│   ├── layout/           Hero, Sidebar, Footer, FloatingButtons
│   ├── sections/         Hizmetler, Galeri, Yorumlar, NedenBiz, Iletisim
│   ├── modals/           TeklifModal, AddReviewModal, HizmetDetayModal
│   ├── ui/               WhatsAppIcon (yeniden kullanılabilir UI'lar)
│   └── admin/            AdminPage
├── context/              AppContext (global state, Supabase CRUD)
├── data/                 nakliyatData (statik veri / sabitler)
├── types.ts              TypeScript interface'leri
├── lib/                  supabase client
└── assets/               asansorPhoto.ts (sabit URL)
```

---

## Mimari Kararlar

### Routing
- `/` → Ana site (tüm bileşenler tek sayfada)
- `/mertadmin` → Admin paneli (gizli rota, hiçbir yerde buton yok)

### Auth
- `supabase.auth.signInWithPassword({ email, password })` kullanılır
- Admin email: `admin@aganakliyat.com`, şifre Supabase Auth'da tanımlı
- `VITE_ADMIN_PASSWORD` kullanılmaz, `.env`'den kaldırılabilir

### Supabase Tabloları (lowercase column names)
- `testimonials`, `quote_requests`, `company_settings`, `pricing_config`
- Tümü RLS ile korunur: SELECT public, diğer işlemler authenticated

### Teklif Hesaplayıcı
- `TeklifModal.tsx` fiyatları `pricingConfig` context'inden alır
- Context, `pricing_config` tablosundan yüklenir, uygulama açılışında
- Admin paneli Fiyatlandırma sekmesi ile canlı düzenlenir

### WhatsApp İkonları
- Gerçek WhatsApp SVG (`ui/WhatsAppIcon.tsx`) kullanılır, lucide-react Send değil

---

## Önemli Uyarılar

- `.env` dosyası `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` içermelidir
- Supabase anon key RLS ile sınırlandırılmıştır, SELECT dışı işlemler auth gerektirir
- Admin paneline erişim yalnızca `/mertadmin` URL'si üzerinden mümkündür
