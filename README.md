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
| Animasyon | motion (Framer Motion) |
| CSS | Tailwind CSS v4 |
| İkonlar | lucide-react |
| Backend | Supabase (Postgres + Auth) |
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
├── responsive.md
├── responsive3.md
├── sontasarim.md
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
        │   └── WhatsAppIcon.tsx
        └── admin/
            └── AdminPage.tsx
```

---

## Mimari Ağaç Yapısı

### Routing Katmanı
```
<BrowserRouter>
  ├── Route "/"
  │   └── <MainApp>
  │       ├── <Sidebar>                  # Navigasyon + mobil drawer
  │       ├── <main>
  │       │   ├── <Hero>                 # Scroll parallax + puan rozeti
  │       │   ├── <Hizmetler>            # Hizmet kartları
  │       │   ├── <NedenBiz>             # İstatistikler + avantajlar
  │       │   ├── <Galeri>               # Filtreli fotoğraf galerisi
  │       │   ├── <Yorumlar>             # Yorum carousel
  │       │   ├── <Iletisim>             # İletişim + teklif formu
  │       │   └── <Footer>               # Alt bilgi
  │       ├── <TeklifModal>              # Fiyat hesaplama (state: isCalculatorOpen)
  │       ├── <HizmetDetayModal>         # Hizmet kartı detay
  │       ├── <AddReviewModal>           # Yorum ekleme
  │       └── <FloatingButtons>          # Sabit WhatsApp + telefon
  │
  └── Route "/mertadmin"
      └── <AdminPage>                    # Auth korumalı admin paneli
          ├── Login (email + password)   # supabase.auth.signInWithPassword()
          └── 4 Sekme:
              ├── Teklif Talepleri       # quote_requests CRUD
              ├── Müşteri Yorumları      # testimonials CRUD
              ├── Fiyatlandırma          # pricing_config CRUD
              └── Şirket Ayarları        # company_settings CRUD
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

### RLS Politikaları

Tablolar `Row Level Security` ile korunur:

| Tablo | SELECT | INSERT / UPDATE / DELETE |
|---|---|---|
| testimonials | Herkese açık | Yalnızca authenticated (admin) |
| quote_requests | Herkese açık | Yalnızca authenticated (admin) |
| company_settings | Herkese açık | Yalnızca authenticated (admin) |
| pricing_config | Herkese açık | Yalnızca authenticated (admin) |

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
| `/mertadmin` | Admin paneli (gizli, hiçbir yerde buton yok) |

Admin paneline yalnızca URL'den `/mertadmin` yazarak erişilir.

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

## Bileşen Detayları

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
- 4 sekme: Teklif Talepleri, Müşteri Yorumları, Fiyatlandırma, Şirket Ayarları
- CRUD işlemleri Supabase üzerinden, auth ile korunur
- Çıkış: `supabase.auth.signOut()`

### HizmetDetayModal
- Hizmet kartlarına tıklandığında açılan detay modalı
- Hizmet açıklaması, görsel ve iletişim butonları içerir
- Mobilde bottom sheet, masaüstünde ortalı pencere

### WhatsAppIcon
- Gerçek WhatsApp SVG ikonu (lucide-react Send değil)
- Hero, Hizmetler, FloatingButtons, Sidebar, TeklifModal'de kullanılır

---

## Performans

- `transform-gpu` ve `will-change` ile GPU hızlandırma
- Scroll animasyonlarında layout thrashing önlenmiş
- Mobilde 44px+ dokunma alanları
- Tailwind CSS v4 ile optimize bundle
