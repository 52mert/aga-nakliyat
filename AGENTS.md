# Aga Nakliyat - Proje Rehberi ve Geliştirme Kuralları

Bu dosya, Aga Nakliyat web uygulamasının mimari, tasarım ve performans ilkelerini barındırır.

---

## Proje Hakkında

Aga Nakliyat, Ordu / Fatsa merkezli evden eve asansörlü taşımacılık, ambalajlı nakliyat ve şehirlerarası lojistik hizmetleri sunan bir web uygulamasıdır.

### Temel Özellikler

1. **Hero & Scroll Parallax**: Framer Motion `useTransform` ile optimize edilmiş (4 transform) smooth scroll
2. **Akıllı Fiyat Hesaplayıcı**: Supabase `pricing_config` tablosundan okur, oda/güzergah/kat/asansöre göre anında fiyat
3. **Müşteri Yorumları**: Supabase `testimonials` tablosu, admin onaylı yayın, carousel gösterim
4. **Saha Galerisi**: Supabase `gallery` tablosundan çekilen, admin panelden yönetilen (Storage yükleme), kategori filtreli, lightbox incelemeli dinamik galeri
5. **SEO Dinamik Rotaları**: 3 bölge (`/bolge/`) + 6 hizmet (`/hizmet/`) için ayrı title, description, OG, JSON-LD
6. **Admin Paneli** (`/mertadmin`): Supabase Auth ile giriş, 6 sekme (hizmetler, ayarlar, galeri, teklifler, yorumlar, fiyatlandırma)
7. **Hizmetler Yönetimi**: `services` tablosu + Storage ile admin panelden hizmet ekleme/düzenleme/silme, `Hizmetler.tsx` Supabase'den çeker
8. **Instagram Popup**: Sayfa açılışında 3sn sonra Instagram yönlendirme popup'ı
9. **Supabase Backend**: Postgres tabloları + RLS + Auth ile güvenli CRUD

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
- **Sol buton**: `PhoneCall` ikonu + `{companyInfo.phonePrimary}` → `tel:` arama
- **Sağ buton**: `PhoneCall` ikonu + `0535 599 15 72` → `tel:` arama (whatsAppNumber üzerinden)
- `env(safe-area-inset-bottom)` eklenmeli (iPhone çentik uyumu)

### Galeri Lightbox (Mobil)
- `mr-[50px]` — kapatma butonu için sağ boşluk
- `w-[calc(100%-50px)]` — içerik genişliği
- Prev/Next butonları `w-5 h-5` — mobilde çok küçük (20px), 44px'e çıkarılmalı
- Görsel `max-h-[150px]` — lightbox için çok kısıtlı, `max-h-[40dvh]` önerilir

### Yorumlar Kontrolleri
- Prev/Next butonları `justify-center sm:justify-end` — mobilde ortalanır

### Instagram Popup
- **Zamanlama**: 3sn sonra göster, 7sn açık kal, toplam 10. saniyede kapanır
- **Pozisyon**: `fixed z-50 bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:max-w-[320px]`
- **Animasyon**: Framer Motion `AnimatePresence` + scale/opacity/y
- **Dark/Light**: AppContext theme ile tüm stiller
- **Erişilebilirlik**: `role="dialog"`, `aria-modal`, Escape tuşu, 44px dokunma hedefleri
- **Timer cleanup**: `useRef` + `clearTimeout` ile memory leak önlenir

---

## Dosya Yapısı

```
src/
├── config/               seoRoutes.ts (SEO rota veri sözlüğü)
├── components/
│   ├── layout/           MainApp, Hero, Sidebar, Footer, FloatingButtons
│   ├── sections/         Hizmetler, Galeri, Yorumlar, NedenBiz, Iletisim
│   ├── modals/           TeklifModal, AddReviewModal, HizmetDetayModal
│   ├── ui/               WhatsAppIcon, InstagramPopup
│   └── admin/            AdminPage
├── context/              AppContext (global state, Supabase CRUD)
├── data/                 nakliyatData (statik veri / sabitler)
├── types.ts              TypeScript interface'leri
├── lib/                  supabase client
└── assets/               asansorPhoto.ts (sabit SVG data URI)
```

---

## Mimari Kararlar

### Routing
- `/` → Ana site (tüm bileşenler tek sayfada)
- `/hizmet/:slug` → SEO hizmet sayfası (dinamik title, H1, JSON-LD, scrollIntoView)
- `/bolge/:slug` → SEO bölge sayfası (dinamik title, H1, JSON-LD, scrollIntoView)
- `/mertadmin` → Admin paneli (gizli rota, hiçbir yerde buton yok)
- Geçersiz slug → `/` redirect (useNavigate ile)

### Auth
- `supabase.auth.signInWithPassword({ email, password })` kullanılır
- Admin email: `admin@aganakliyat.com`, şifre Supabase Auth'da tanımlı
- `VITE_ADMIN_PASSWORD` kullanılmaz, `.env`'den kaldırılabilir

### Dynamic Rendering (Vercel Edge Middleware)
- **Amaç**: Googlebot'a dolu HTML göstermek, insan kullanıcıya normal SPA sunmak
- **Yöntem**: `middleware.ts` (proje kökü) — User-Agent kontrolü ile bot/insan ayrımı
- **Puppeteer/Playwright**: KESİNLİKLE KULLANILMAZ (Vercel Hobby build süresini aşar)
- **Ek kütüphane yok**: Sadece `String.replace()` ile manipülasyon
- **İçerik kaynağı**: `src/config/seoRoutes.ts` → `seoRoutes` ve `serviceRoutes` objelerinden import edilir
- **seoContent alanı**: Her route için ~300-500 kelimelik, Google dostu HTML içerik
- **Loop önleme**: `matcher` config'de `/index.html`, statik dosyalar (`*.js`, `*.css`, resimler) hariç tutulur
- **Gizli text yok**: Enjekte edilen içerik `<div id="seo-content">` ile normal görünür
- **Cloaking değil**: Bot ve insan aynı içeriği görür (Google'ın Dynamic Rendering kılavuzuna uygun)
- **Detaylı plan**: `faz3-seo-plani.md`

### Supabase Tabloları (lowercase column names)
- `testimonials`, `quote_requests`, `company_settings`, `pricing_config`, `gallery`, `services`
- Tümü RLS ile korunur: SELECT public, diğer işlemler authenticated

### Supabase Storage
- **Bucket**: `gallery-images` (public)
- **MIME**: yalnızca `image/jpeg`, `image/png`, `image/webp`
- **Dosya limiti**: 5 MB
- **RLS**: SELECT public, INSERT/UPDATE/DELETE authenticated (bucket seviyesinde MIME kontrolü)
- **Kullanım**: Admin panel Galeri sekmesi → file upload → Storage → `gallery` tablosu → `Galeri.tsx`

### Teklif Hesaplayıcı
- `TeklifModal.tsx` fiyatları `pricingConfig` context'inden alır
- Context, `pricing_config` tablosundan yüklenir, uygulama açılışında
- Admin paneli Fiyatlandırma sekmesi ile canlı düzenlenir

### WhatsApp İkonları
- Gerçek WhatsApp SVG (`ui/WhatsAppIcon.tsx`) kullanılır, lucide-react Send değil
- Hero, Hizmetler, Sidebar, TeklifModal'de kullanılır (mobil alt barda kullanılmaz)

### Mobil Alt Bar (FloatingButtons)
- **Sol**: `PhoneCall` ikonu + `{companyInfo.phonePrimary}` → `tel:` arama
- **Sağ**: `PhoneCall` ikonu + `0535 599 15 72` → `tel:` arama
- Her iki buton da telefon araması yapar, WhatsApp ikonu kullanılmaz

### SEO Rotaları (Dinamik Routing)
- `src/config/seoRoutes.ts` → 3 bölge (fatsa, unye, ordu) + 6 hizmet (evden-eve, asansorlu-nakliyat, ...) SEO veri sözlüğü
- `src/components/layout/MainApp.tsx` → `useParams()` ile slug okur, Helmet ile title/meta/OG/JSON-LD basar
- `App.tsx` → HelmetProvider sarmalar, 2 yeni route ekler (`/hizmet/:slug`, `/bolge/:slug`)
- JSON-LD: LocalBusiness (bölge) veya Service (hizmet) şeması, areaServed dinamik
- 404 redirect: Geçersiz slug → `/` ana sayfaya yönlendir
- Scroll: `document.getElementById().scrollIntoView({ behavior: 'smooth' })`
- Kütüphane: `react-helmet-async`

### Internal Linking (İç Linkleme)
- **Footer.tsx**: "Hizmetlerimiz" ve "Hizmet Bölgelerimiz" sütunları `<Link>` ile SEO rotalara yönlendirir
- **Hizmetler.tsx**: Kart altındaki "Hizmet Detaylarını İncele" butonu `<Link to="/hizmet/{slug}">` ile SEO sayfasına yönlendirir
- `serviceRouteMap`: service.id → SEO slug dönüşümü (örn: `asansorlu-tasima` → `asansorlu-nakliyat`)

### Hizmetler Veri Akışı
- `AdminPage.tsx` → form → `storage.upload("hizmetler/...")` + `services.insert()`
- `AppContext.tsx` → `addService()`, `updateService()`, `deleteService()` → state + Supabase
- `Hizmetler.tsx` → `supabase.from('services').select('*').order('sort_order')` → mapping → kartlar
- Boş tablo durumunda `nakliyatData.ts`'teki `SERVICES` sabiti fallback olarak kullanılır
- Görseller `object-cover aspect-[4/3]` ile responsive gösterilir

### Galeri Veri Akışı
- `AdminPage.tsx` → file upload → `supabase.storage.from('gallery-images').upload()` → public URL al
- `AdminPage.tsx` → `supabase.from('gallery').insert({title, image_url, category, ...})` → veritabanına kaydet
- `Galeri.tsx` → `supabase.from('gallery').select('*').order('sort_order')` → `useEffect` ile çek
- Mapping: `image_url` → `image` (GalleryItem tipine uygun)
- Silme: Storage'dan dosya sil + `gallery` tablosundan satır sil

---
- **Galeri görselleri**: Supabase Storage (`gallery-images` bucket) üzerinden yayınlanır, `gallery` tablosundan çekilir
- **Hizmetler görselleri**: Admin panel Hizmetler sekmesinden yüklenir, `hizmetler/` klasörüne kaydedilir
- **Hizmetler kartları**: `object-cover aspect-[4/3]` ile responsive, her boyutta görsel düzgün sığar
- **Admin panel**: Galeri + Hizmetler sekmelerinden resim ekleme/silme yapılır (Storage + PostgreSQL)
- **Hero**: Kısmen `public/images/` klasöründen beslenir
- **`public/images/`**: Eski repodan kalan JPEG'ler

### Pricing Config
- `updatePricingConfig` (`AppContext.tsx`) artık `Promise<boolean>` döndürür
- Başarısız olursa state eski haline döner, admin panelinde kırmızı "kaydedilemedi" uyarısı çıkar
- `handleSavePricing` (`AdminPage.tsx`): `useEffect` ile `pricingForm` senkronizasyonu eklendi

### Google Analytics (GA4)
- **Kütüphane**: `react-ga4` — client'ta çalışır, edge middleware ile çakışmaz
- **Route tracking**: `useAnalytics()` hook'u ile `src/hooks/useAnalytics.ts`
- **Hook mantığı**: `useLocation()` + `useEffect([location])` ile her route değişiminde `ReactGA.send({ hitType: 'pageview', page })`
- **.env**: `VITE_GA_MEASUREMENT_ID` ile Measurement ID alınır
- **Detaylı plan**: `faz4-ga4-plani.md`

---

## Önemli Uyarılar

- `.env` dosyası `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` içermelidir
- Supabase anon key RLS ile sınırlandırılmıştır, SELECT dışı işlemler auth gerektirir
- Admin paneline erişim yalnızca `/mertadmin` URL'si üzerinden mümkündür
