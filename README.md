# Aga Nakliyat

Fatsa, Ünye, Ordu bölgesinde evden eve asansörlü taşımacılık, ambalajlı nakliyat ve şehirlerarası lojistik hizmetleri sunan modern web uygulaması.

**Canlı:** [orduaganakliyat.com.tr](https://www.orduaganakliyat.com.tr/)

---

## Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Routing | react-router-dom v7 |
| SEO Meta | react-helmet-async |
| Animasyon | motion (Framer Motion) |
| CSS | Tailwind CSS v4 |
| İkonlar | lucide-react |
| Backend | Supabase (Postgres + Auth) |
| SEO Dynamic Rendering | Vercel Edge Middleware |
| Analytics | Google Analytics 4 (react-ga4) |
| Deployment | Vercel |

---

## Proje Dosya Yapısı

```
/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json
├── package.json
├── .env
├── AGENTS.md
├── README.md
├── responsive3.md
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types.ts
    │
    ├── lib/
    │   └── supabase.ts
│
├── config/
│   └── seoRoutes.ts
│
├── context/
│   └── AppContext.tsx
│
├── data/
    │   └── nakliyatData.ts
    │
    ├── assets/
    │   └── asansorPhoto.ts
    │
    └── components/
        ├── layout/
        │   ├── MainApp.tsx
        │   ├── Hero.tsx
        │   ├── Sidebar.tsx
        │   ├── Footer.tsx
        │   └── FloatingButtons.tsx
        ├── sections/
        │   ├── Hizmetler.tsx
        │   ├── NedenBiz.tsx
        │   ├── Galeri.tsx
        │   ├── Yorumlar.tsx
        │   └── Iletisim.tsx
        ├── modals/
        │   ├── TeklifModal.tsx
        │   ├── AddReviewModal.tsx
        │   └── HizmetDetayModal.tsx
        ├── ui/
        │   ├── WhatsAppIcon.tsx
        │   └── InstagramPopup.tsx
        └── admin/
            └── AdminPage.tsx
```

---

## Mimari Ağaç Yapısı

### Routing Katmanı
```
<BrowserRouter> (HelmetProvider ile sarılı)
  ├── Route "/"
  │   └── <MainApp>
  │       ├── Helmet (dinamik title, description, OG, JSON-LD)
  │       ├── <Sidebar>                  # Navigasyon + mobil drawer
  │       ├── <main>
  │       │   ├── <Hero>                 # Scroll parallax + puan rozeti
  │       │   ├── <Hizmetler>            # Hizmet kartları (Link ile /hizmet/)
  │       │   ├── <NedenBiz>             # İstatistikler + avantajlar
  │       │   ├── <Galeri>               # Filtreli fotoğraf galerisi
  │       │   ├── <Yorumlar>             # Yorum carousel
  │       │   ├── <Iletisim>             # İletişim + teklif formu
  │       │   └── <Footer>               # Alt bilgi (Link ile /hizmet/, /bolge/)
  │       ├── <TeklifModal>              # Fiyat hesaplama (state: isCalculatorOpen)
  │       ├── <AddReviewModal>           # Yorum ekleme
  │       ├── <FloatingButtons>          # Sabit telefon + WhatsApp
  │       └── <InstagramPopup>           # 3sn sonra göster, 10sn açık kal
  │
  ├── Route "/hizmet/:slug" (SEO)
  │   └── <MainApp> (Helmet ile title/meta/JSON-LD güncellenir)
  ├── Route "/bolge/:slug" (SEO)
  │   └── <MainApp> (Helmet ile title/meta/JSON-LD güncellenir)
  └── Route "/mertadmin"
      └── <AdminPage>                    # Auth korumalı admin paneli
          ├── Login (email + password)   # supabase.auth.signInWithPassword()
          └── 6 Sekme:
              ├── Hizmetler              # services CRUD + Storage upload
              ├── Şirket Ayarları        # company_settings CRUD
              ├── Galeri Yönetimi        # gallery CRUD + Storage upload
              ├── Teklif Talepleri       # quote_requests CRUD
              ├── Müşteri Yorumları      # testimonials CRUD
              └── Fiyatlandırma          # pricing_config CRUD
```

### Context (Global State) Katmanı
```
<AppProvider> ──── AppContext
  ├── theme                 # dark / light
  ├── companyInfo           # company_settings (Supabase)
  ├── testimonials          # testimonials (Supabase)
  ├── quoteRequests         # quote_requests (Supabase)
  ├── pricingConfig         # pricing_config (Supabase)
  ├── isAddReviewOpen       # AddReviewModal görünürlük
  └── CRUD fonksiyonları    # Her tablo için update/delete/add
```

### Supabase Veri Akışı
```
public → SELECT (RLS: true)                   → Site (herkes görebilir)
admin  → INSERT/UPDATE/DELETE (RLS: auth)     → AdminPage (giriş yapınca)

pricing_config ──→ AppContext ──→ TeklifModal (fiyat hesaplama)
testimonials    ──→ AppContext ──→ Yorumlar (carousel gösterim)
quote_requests  ──→ AppContext ──→ AdminPage (teklif listesi)
company_settings ──→ AppContext ──→ Footer, Iletisim, FloatingButtons (iletişim bilgileri)
gallery          ──→ Galeri.tsx (useEffect ile Supabase'den direkt çekim)
gallery-images (Storage) ──→ Galeri.tsx → <img> src (public URL)
```

### Bileşen-Bileşen İlişkisi
```
Sidebar ──→ "Teklif Al" butonu ──→ AppContext (setIsCalculatorOpen) ──→ TeklifModal
Hero    ──→ "Yorum Yap" butonu ──→ AppContext (setIsAddReviewOpen) ──→ AddReviewModal
App.tsx ──→ useState(isCalculatorOpen) ──→ prop olarak TeklifModal'a geçer
```
---

## Supabase Entegrasyonu

### Tablolar

#### `testimonials`
| Sütun | Tip | Açıklama |
|---|---|---|
| id | int8 (PK) | Otomatik |
| name | text | Müşteri adı |
| location | text | Lokasyon |
| rating | int2 | 1-5 arası puan |
| comment | text | Yorum metni |
| date | text | Tarih (tr-TR format) |
| servicetype | text | Hizmet türü |
| status | text | approved / pending |
| created_at | timestamptz | Oluşturulma |

#### `quote_requests`
| Sütun | Tip | Açıklama |
|---|---|---|
| id | int8 (PK) | Otomatik |
| name | text | İsim |
| phone | text | Telefon |
| fromlocation | text | Nereden |
| tolocation | text | Nereye |
| movetype | text | Eşya tipi |
| movedate | text | Taşınma tarihi |
| note | text | Not |
| createdat | text | Oluşturulma |
| created_at | timestamptz | Otomatik timestamp |

#### `company_settings`
| Sütun | Tip | Açıklama |
|---|---|---|
| id | int4 (PK) | Her zaman 1 |
| phoneprimary | text | Görünen telefon |
| phoneprimaryraw | text | Arama linki (sadece rakam) |
| whatsappnumber | text | WhatsApp (ülke koduyla) |
| address | text | Adres |
| email | text | E-posta |

#### `pricing_config`
| Sütun | Tip | Açıklama |
|---|---|---|
| id | int4 (PK) | Her zaman 1 |
| base_prices | jsonb | `{"1+1": 5500, "2+1": 7500, "3+1": 9800, "4+1": 12500}` |
| floor_cost_per_floor | int4 | Kat başı maliyet (₺) |
| route_costs | jsonb | `{"fatsa-fatsa": 0, "fatsa-unye": 1500, ...}` |
| elevator_cost | int4 | Asansör başı ücret (₺) |
| markup_percent | int4 | Maks fiyat katsayısı (%) |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `services`
| Sütun | Tip | Açıklama |
|---|---|---|
| id | bigint (PK) | Otomatik |
| title | text | Hizmet başlığı |
| description | text | Açıklama |
| icon_name | text | Lucide ikon adı (Home, Truck, Package...) |
| image_url | text | Supabase Storage public URL |
| features | jsonb | Özellik listesi |
| popular | boolean | Öne çıkan hizmet |
| sort_order | int | Sıralama |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `gallery`
| Sütun | Tip | Açıklama |
|---|---|---|
| id | bigint (PK) | Otomatik |
| title | text | Resim başlığı |
| image_url | text | Supabase Storage public URL |
| category | text | asansor / ambalaj / araclar / tasima |
| description | text | Açıklama |
| sort_order | int | Sıralama |
| created_at | timestamptz | Oluşturulma |

### Supabase Storage

- **Bucket**: `gallery-images` (public)
- **MIME**: yalnızca `image/jpeg`, `image/png`, `image/webp`
- **Dosya limiti**: 5 MB
- **RLS**: SELECT public, INSERT/UPDATE/DELETE authenticated

### RLS Politikaları

Tablolar `Row Level Security` ile korunur:

| Tablo | SELECT | INSERT / UPDATE / DELETE |
|---|---|---|
| testimonials | Herkese açık | Yalnızca authenticated (admin) |
| quote_requests | Herkese açık | Yalnızca authenticated (admin) |
| company_settings | Herkese açık | Yalnızca authenticated (admin) |
| pricing_config | Herkese açık | Yalnızca authenticated (admin) |
| services | Herkese açık | Yalnızca authenticated (admin) |
| gallery | Herkese açık | Yalnızca authenticated (admin) |

### Auth

- Admin girişi: `supabase.auth.signInWithPassword()` ile email + şifre
- Email: `admin@aganakliyat.com` (email confirmation kapalı)
- Şifre: Supabase Authentication > Users kısmında belirlenen şifre
- `VITE_ADMIN_PASSWORD` artık kullanılmamaktadır

---

## Routing

| Rota | Açıklama |
|---|---|
| `/` | Ana site (Hero, Hizmetler, Galeri, Yorumlar, İletişim, Footer) |
| `/hizmet/:slug` | SEO hizmet sayfası (dinamik title + H1 + JSON-LD) |
| `/bolge/:slug` | SEO bölge sayfası (dinamik title + H1 + JSON-LD) |
| `/mertadmin` | Admin paneli (gizli, hiçbir yerde buton yok) |

Admin paneline yalnızca URL'den `/mertadmin` yazarak erişilir.

---

## SEO Rotaları (Dinamik Routing - Faz 1)

3 bölge + 6 hizmet için dinamik SEO sayfaları oluşturulmuştur. Her sayfanın kendine özgü title, description, h1, OG meta ve JSON-LD (Schema.org) değeri vardır.

### Bölge Rotaları

| Rota | Title | JSON-LD Tipi |
|---|---|---|
| `/bolge/fatsa` | Fatsa Nakliyat | LocalBusiness |
| `/bolge/unye` | Ünye Nakliyat | LocalBusiness |
| `/bolge/ordu` | Ordu Nakliyat | LocalBusiness |

### Hizmet Rotaları

| Rota | Title | JSON-LD Tipi |
|---|---|---|
| `/hizmet/evden-eve` | Evden Eve Nakliyat | Service |
| `/hizmet/asansorlu-nakliyat` | Asansörlü Nakliyat | Service |
| `/hizmet/sehirlerarasi` | Şehirlerarası Nakliyat | Service |
| `/hizmet/ambalajlama` | Profesyonel Ambalajlama | Service |
| `/hizmet/ofis-tasima` | Ofis Taşıma | Service |
| `/hizmet/parca-esya-tasima` | Parça Eşya Taşıma | Service |

### SEO Bileşenleri

- **Metrik**: `react-helmet-async` ile <Helmet> (title, meta, OG, canonical, JSON-LD)
- **Görsel değişiklik**: Sayfa tasarımı aynen kalır, ekstra banner/HTML eklenmez
- **Redirect**: Geçersiz slug → ana sayfaya yönlendir
- **Scroll**: Sayfa yüklenince ilgili section'a smooth scroll
- **JSON-LD**: LocalBusiness (bölge) / Service (hizmet) şeması

### İç Linkleme (Internal Linking)

- **Footer**: "Hizmetlerimiz" ve "Hizmet Bölgelerimiz" sütunları `<Link>` ile SEO rotalara yönlendirir
- **Hizmet Kartları**: "Hizmet Detaylarını İncele" butonu `<Link to="/hizmet/{slug}">` ile SEO sayfasına yönlendirir

---

## Fiyatlandırma Sistemi

`TeklifModal.tsx` içindeki fiyat hesaplayıcı, Supabase `pricing_config` tablosundan veri okur:

```
minPrice = base_price + (kat₁ + kat₂) × floor_cost + route_cost + elevator(s)
maxPrice = minPrice × (1 + markup_percent / 100)
```

Admin paneli > **Fiyatlandırma** sekmesinden tüm parametreler canlı düzenlenebilir.

---

## Geliştirme

```bash
# .env dosyasını oluştur
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (port 3000)
npm run dev

# Production build
npm run build

# Tip kontrolü
npm run lint
```

## Deployment (Vercel)

```bash
# Vercel CLI ile
vercel --prod

# veya GitHub reposu bağla:
# Vercel > Import Project > Set Framework: Vite
# Root Directory: ./
# Build: npm run build
# Output: dist
```

### .com.tr Domain

- Vercel Dashboard > Domain ekle: `aganakliyat.com.tr`
- DNS: Nameserver veya CNAME ile yönlendir
- `vercel.json` ile SPA fallback hazır

---

## Google Analytics (GA4) Entegrasyonu

GA4, site trafiğini ölçmek ve hangi SEO sayfasının (`/bolge/fatsa`, `/hizmet/asansorlu-nakliyat` vb.) ne kadar ziyaret aldığını görmek için kullanılır.

### Kullanılan Yöntem

- **Kütüphane**: `react-ga4` (2KB gzipped)
- **SPA Route Tracking**: `useLocation` + `useEffect` ile her route değişiminde `page_view` gönderilir
- **Middleware Çakışması**: Yok — GA4 client'ta çalışır, middleware edge'de çalışır

### Kurulum

```bash
npm install react-ga4
```

`.env` dosyasına `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` eklenir. Detaylı plan için: [`faz4-ga4-plani.md`](./faz4-ga4-plani.md)

---

## Bileşen Detayları

### MainApp (Çatı Bileşen)
- Dinamik `useParams()` ile `/hizmet/:slug` ve `/bolge/:slug` rotalarını yönetir
- Geçersiz slug → `/` ana sayfaya yönlendirir (`useNavigate`)
- `<Helmet>` ile title, description, OG, JSON-LD dinamik basar
- `scrollIntoView` ile ilgili section'a otomatik scroll
- Tüm alt bileşenleri (Hero, Hizmetler, Footer vb.) içerir

### Hero
- 130vh yükseklik, smooth scroll animasyonu
- 3 adet `useTransform` ile optimize edilmiş (bgY, contentOpacity, contentY)
- Framer Motion staggered entrance animasyonları
- Onaylanmış yorum sayısı ve ortalama puan rozeti

### TeklifModal
- Oda tipi, güzergah, kat bilgisi, asansör durumuna göre anında hesaplama
- Fiyatlar Supabase `pricing_config`'ten okunur
- WhatsApp'a yönlendirme (WhatsAppIcon SVG ikonu ile)
- Hemen Ara butonu

### AdminPage
- Giriş: email + şifre (Supabase Auth)
- 6 sekme: Hizmetler, Şirket Ayarları, Galeri, Teklif Talepleri, Müşteri Yorumları, Fiyatlandırma
- CRUD işlemleri Supabase üzerinden, auth ile korunur
- Galeri Yönetimi: Resim yükleme (Storage → gallery tablosu), listeleme, silme
- Hizmetler Yönetimi: Hizmet ekleme/düzenleme/silme, Storage yükleme, özellik listesi, sıralama
- Çıkış: `supabase.auth.signOut()`

### HizmetDetayModal
- Hizmet kartlarına tıklandığında açılan detay modalı
- Hizmet açıklaması, görsel ve iletişim butonları içerir
- Mobilde bottom sheet, masaüstünde ortalı pencere

### WhatsAppIcon
- Gerçek WhatsApp SVG ikonu (lucide-react Send değil)
- Hero, Hizmetler, Sidebar, TeklifModal'de kullanılır

### FloatingButtons (Mobil Alt Bar)
- **Sol buton**: `PhoneCall` ikonu + `0542 437 52 52` → telefon araması (`tel:` link)
- **Sağ buton**: `PhoneCall` ikonu + `0535 599 15 72` → telefon araması (`tel:` link)
- Masaüstü: Sağ alt köşede WhatsApp + Telefon floating widget

### InstagramPopup
- Sayfa açıldıktan **3 saniye** sonra görünür
- **7 saniye** boyunca açık kalır, sonra otomatik kapanır
- "İncele" butonu → Instagram yeni sekmede açar
- "Hayır" / çarpı → kapanır, aynı seansta tekrar göstermez
- Dark/light uyumlu, `Framer Motion` animasyonlu (`scale + opacity`)
- `role="dialog"`, `aria-modal`, Escape tuşu ile kapatma

---

## Performans

- `transform-gpu` ve `will-change` ile GPU hızlandırma
- Scroll animasyonlarında layout thrashing önlenmiş
- Mobilde 44px+ dokunma alanları
- Tailwind CSS v4 ile optimize bundle
