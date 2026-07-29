# GÖREV: React Router DOM v7 ile Mevcut Yapıyı Bozmadan Dinamik SEO Rotaları Oluşturma (Faz 1)

## 1. Bağlam ve Strateji
Aga Nakliyat web sitesi tek sayfa (SPA) yapısında çalışmaktadır. Rakiplerin (harbinakliyat, fatsanakliyat) "her ilçe/hizmet için ayrı sayfa" avantajını yakalamak için, mevcut tasarımı BÖLMEDEN ve BOZMADAN dinamik yönlendirmeler ve SEO optimizasyonu yapılacaktır.

**Kopya İçerik (Duplicate Content) Çözümü:** Sayfalar arası geçişlerde sadece URL değişmeyecek; sayfanın en üstünde (Hero içinde) dinamik bir `<h1>` başlığı ve açıklama metni belirecek. Böylece Googlebot'a "Bu sayfa özel bir sayfadır" sinyali verilecektir.

---

## 2. Kesin Kurallar
- **MEVCUT HİÇBİR BİLEŞEN SİLİNMEYECEK VEYA ÇALIŞMA MANTIĞI BOZULMAYACAK.**
- Sadece ekleme (addition) yapılacaktır.
- Mevcut `/` (Ana sayfa) ve `/mertadmin` (Admin panel) rotaları kesinlikle korunacaktır.
- `react-helmet-async` kütüphanesi kullanılacaktır (endüstri standardı).

---

## 3. Hedef Kelimeler ve Örnek Rotalar

Sistem şu URL yapılarını desteklemelidir:

| Rota Türü | Örnek | Hedef Kelime |
|---|---|---|
| **Bölge** | `/bolge/fatsa` | fatsa nakliyat, fatsa evden eve nakliyat |
| **Bölge** | `/bolge/unye` | ünye nakliyat, ünye evden eve nakliyat |
| **Bölge** | `/bolge/ordu` | ordu nakliyat, ordu evden eve nakliyat |
| **Hizmet** | `/hizmet/asansorlu-nakliyat` | fatsa asansörlü nakliyat |
| **Hizmet** | `/hizmet/parca-esya-tasima` | parça eşya taşıma |
| **Hizmet** | `/hizmet/evden-eve` | evden eve nakliyat |
| **Hizmet** | `/hizmet/sehirlerarasi` | şehirlerarası nakliyat |
| **Hizmet** | `/hizmet/ambalajlama` | ambalajlı nakliyat |
| **Hizmet** | `/hizmet/ofis-tasima` | ofis taşımacılığı |

---

## 4. Adım Adım Yapılacaklar Listesi

### Adım 1: Kütüphane Kurulumu

```bash
npm install react-helmet-async
```

### Adım 2: SEO Konfigürasyon Dosyası Oluşturma

`src/config/seoRoutes.ts` dosyası oluşturulacak. Aşağıdaki yapıyı içermeli:

```ts
export interface SeoRoute {
  slug: string;
  title: string;
  description: string;
  h1Text: string;
  subText: string;
  sectionId: string;
  schemaType: 'LocalBusiness' | 'Service';
  ogImage: string;
  keywords: string;
}

export const seoRoutes: Record<string, SeoRoute> = {
  // Bölge rotaları
  'fatsa': {
    slug: 'fatsa',
    title: 'Fatsa Nakliyat | Aga Nakliyat - Fatsa Evden Eve Taşımacılık',
    description: 'Fatsa nakliyat, Fatsa evden eve nakliyat hizmetleri. Fatsa merkezli asansörlü, sigortalı taşımacılık. Ücretsiz ekspertiz için hemen teklif alın.',
    h1Text: 'Fatsa Nakliyat ve Evden Eve Taşımacılık',
    subText: 'Aga Nakliyat Fatsa merkezli olarak evden eve, asansörlü ve şehirlerarası nakliyat hizmeti vermektedir. Fatsa ve çevre ilçelerde 10+ yıllık tecrübemizle eşyalarınızı güvenle taşıyoruz.',
    sectionId: 'anasayfa',
    schemaType: 'LocalBusiness',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'fatsa nakliyat,fatsa evden eve nakliyat,fatsa asansörlü nakliyat,fatsa nakliye,fatsa evden eve',
  },
  'unye': {
    slug: 'unye',
    title: 'Ünye Nakliyat | Aga Nakliyat - Ünye Evden Eve Taşımacılık',
    description: 'Ünye nakliyat, Ünye evden eve nakliyat. Ünye merkezli asansörlü, sigortalı taşımacılık hizmetleri. Hemen teklif alın.',
    h1Text: 'Ünye Nakliyat ve Evden Eve Taşımacılık',
    subText: 'Ünye ve çevresinde Aga Nakliyat güvencesiyle evden eve nakliyat, asansörlü taşıma ve şehirlerarası lojistik.',
    sectionId: 'anasayfa',
    schemaType: 'LocalBusiness',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'ünye nakliyat,ünye evden eve nakliyat,ünye asansörlü nakliyat',
  },
  'ordu': {
    slug: 'ordu',
    title: 'Ordu Nakliyat | Aga Nakliyat - Ordu Evden Eve Taşımacılık',
    description: 'Ordu nakliyat, Ordu evden eve nakliyat. Ordu merkezli asansörlü, sigortalı evden eve taşımacılık.',
    h1Text: 'Ordu Nakliyat ve Evden Eve Taşımacılık',
    subText: 'Ordu merkez ve tüm ilçelerde Aga Nakliyat güvencesiyle profesyonel evden eve nakliyat hizmeti.',
    sectionId: 'anasayfa',
    schemaType: 'LocalBusiness',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'ordu nakliyat,ordu evden eve nakliyat,ordu asansörlü nakliyat,ordu nakliye',
  },
};

export const serviceRoutes: Record<string, SeoRoute> = {
  'evden-eve': {
    slug: 'evden-eve',
    title: 'Evden Eve Nakliyat | Aga Nakliyat',
    description: 'Profesyonel evden eve nakliyat hizmeti. Sigortalı, marangozlu, ambalajlı taşıma. Fatsa, Ünye, Ordu için hemen teklif alın.',
    h1Text: 'Evden Eve Nakliyat Hizmeti',
    subText: 'Eşyalarınız özenle paketlenir, sigortalı olarak yeni adresinize teslim edilir. Marangozlu söküm ve montaj dahil.',
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/foto.jpeg',
    keywords: 'evden eve nakliyat,fatsa evden eve,ordu evden eve,ünye evden eve',
  },
  'asansorlu-nakliyat': {
    slug: 'asansorlu-nakliyat',
    title: 'Asansörlü Nakliyat | Aga Nakliyat',
    description: 'Mobil hidrolik asansörle 25. kata kadar eşya taşıma. Fatsa, Ünye, Ordu asansörlü nakliyat.',
    h1Text: 'Asansörlü Nakliyat Hizmeti',
    subText: 'Modüler mobil hidrolik asansörlerimizle eşyalarınız çizilmeden ve bina içi yıpranmadan taşınır.',
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/asansor2.jpeg',
    keywords: 'asansörlü nakliyat,fatsa asansörlü nakliyat,ordu asansörlü taşıma',
  },
  'sehirlerarasi': {
    slug: 'sehirlerarasi',
    title: 'Şehirlerarası Nakliyat | Aga Nakliyat',
    description: 'Ordu ve Karadeniz bölgesinden Türkiye\'nin 81 iline güvenli şehirlerarası nakliyat.',
    h1Text: 'Şehirlerarası Nakliyat Hizmeti',
    subText: 'GPS takipli araçlarımızla Türkiye\'nin her noktasına güvenli ve zamanında teslimat.',
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/kamyon.jpeg',
    keywords: 'şehirlerarası nakliyat,ordu şehirlerarası taşıma,fatsa uzak nakliyat',
  },
  'ambalajlama': {
    slug: 'ambalajlama',
    title: 'Profesyonel Ambalajlama | Aga Nakliyat',
    description: 'Çift kat balonlu patpat, streç ve köpüklü koruma ile sıfır hasar garantili paketleme hizmeti.',
    h1Text: 'Profesyonel Ambalajlama Hizmeti',
    subText: 'Mobilya, beyaz eşya, cam ve hassas eşyalarınız hijyenik malzemelerle özenle paketlenir.',
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme2.jpeg',
    keywords: 'ambalajlı nakliyat,fatsa ambalajlama,ordu paketleme',
  },
  'ofis-tasima': {
    slug: 'ofis-tasima',
    title: 'Ofis ve İşyeri Taşıma | Aga Nakliyat',
    description: 'Şirket, büro ve kurumsal ofis taşımacılığı. Mesai saatleri dışında taşıma opsiyonu.',
    h1Text: 'Ofis ve İşyeri Taşıma Hizmeti',
    subText: 'İş akışınızı aksatmadan, mesai saatleri dışında ofis taşıma imkanı. Gizlilik esaslı çalışma.',
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'ofis taşıma,fatsa işyeri nakliyat,ordu büro taşımacılığı',
  },
  'parca-esya-tasima': {
    slug: 'parca-esya-tasima',
    title: 'Parça Eşya Taşımacılığı | Aga Nakliyat',
    description: 'Aynı güzergahtaki az sayıdaki eşyalarınız için ekonomik parça taşıma çözümü.',
    h1Text: 'Parça Eşya Taşımacılığı',
    subText: 'Bütçe dostu paylaşım opsiyonuyla Fatsa-Ünye-Ordu arası günlük seferler.',
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme3.jpeg',
    keywords: 'parça eşya taşıma,fatsa parça nakliyat,ordu uygun nakliyat',
  },
};
```

### Adım 3: App.tsx Güncellemesi

`HelmetProvider` eklenir ve yeni rotalar eklenir:

```tsx
import { HelmetProvider } from 'react-helmet-async';
// ... diğer importlar

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/mertadmin" element={<AdminPage />} />
            <Route path="/hizmet/:slug" element={<MainApp />} />
            <Route path="/bolge/:slug" element={<MainApp />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}
```

**Kritik:** `MainApp` fonksiyonu mevcut `App.tsx` içinden alınıp ayrı bir dosyaya (`src/components/layout/MainApp.tsx`) taşınmalıdır. Aksi halde `useParams()` kullanılamaz.

### Adım 4: MainApp.tsx Güncellemesi

Yeni içe aktarmalar ve parametre okuma:

```tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoRoutes, serviceRoutes, type SeoRoute } from '../../config/seoRoutes';
```

`MainApp` içinde:

```tsx
function MainApp() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useApp();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // SEO route kontrolü
  const seoData: SeoRoute | null = slug
    ? (seoRoutes[slug] || serviceRoutes[slug] || null)
    : null;

  useEffect(() => {
    if (!slug) return;
    if (!seoData) {
      navigate('/', { replace: true });
      return;
    }
    const el = document.getElementById(seoData.sectionId);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [slug, seoData, navigate]);
```

Render kısmı:

```tsx
return (
  <>
    {seoData && (
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={`https://www.orduaganakliyat.com.tr/${slug ? `${slug.startsWith('hizmet') ? '' : 'bolge/'}${slug}` : ''}`} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": seoData.schemaType,
            "name": "Aga Nakliyat",
            "description": seoData.description,
            "url": `https://www.orduaganakliyat.com.tr/${slug ? slug : ''}`,
            "areaServed": seoData.schemaType === 'LocalBusiness'
              ? slug === 'fatsa' ? [{"@type": "City", "name": "Fatsa"}]
                : slug === 'unye' ? [{"@type": "City", "name": "Ünye"}]
                : [{"@type": "City", "name": "Ordu"}]
              : undefined,
          })}
        </script>
      </Helmet>
    )}
    <div className={`min-h-screen transition-colors duration-300 ${...}`}>
      {seoData && (
        <div className={`py-6 px-4 text-center border-b ${slug?.startsWith('hizmet') ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {seoData.h1Text}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {seoData.subText}
            </p>
          </div>
        </div>
      )}
      <Sidebar onOpenCalculator={() => setIsCalculatorOpen(true)} />
      <main className="w-full min-h-screen pt-16">
        <Hero />
        <Hizmetler />
        <NedenBiz />
        <Galeri />
        <Yorumlar />
        <Iletisim />
        <Footer />
      </main>
      <TeklifModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <AddReviewModal />
      <FloatingButtons />
      <InstagramPopup />
    </div>
  </>
);
```

### Adım 5: JSON-LD Entegrasyonu

JSON-LD, `seoData.schemaType` alanına göre dinamik oluşturulur (`LocalBusiness` veya `Service`). `<Helmet>` içinde render edilir.

---

## 5. Test Senaryoları

| # | Senaryo | Beklenen |
|---|---|---|
| 1 | `/hizmet/asansorlu-nakliyat` | Title: "Asansörlü Nakliyat | Aga Nakliyat", H1 görünür, Hizmetler section'a scroll |
| 2 | `/bolge/fatsa` | Title: "Fatsa Nakliyat | Aga Nakliyat", H1 görünür, Hero'a scroll |
| 3 | `/bolge/rastgele` | `/` ana sayfaya yönlendir, hata yok |
| 4 | `/` (ana sayfa) | Eski halinde kusursuz çalışır |
| 5 | `/mertadmin` | Admin panel kusursuz çalışır |
| 6 | OG meta doğru basılıyor | Facebook/WhatsApp paylaşımında doğru başlık + görsel çıkar |
| 7 | JSON-LD güncelleniyor | Bölge sayfasında `areaServed` güncel, hizmet sayfasında `@type: Service` |

---

## 6. Dosya Değişiklik Listesi

| İşlem | Dosya |
|---|---|
| **YENİ** | `src/config/seoRoutes.ts` |
| **Ayrı dosya** | `src/components/layout/MainApp.tsx` (mevcut inline fonksiyon taşınır) |
| **DÜZENLE** | `src/App.tsx` (HelmetProvider + yeni route + MainApp import) |
| **DÜZENLE** | `index.html` (varsayılan meta OG kalır, Helmet override eder) |
| **KUR** | `npm install react-helmet-async` |

---

## 7. Çıktı Beklentisi

Kodlar `App.tsx`, `MainApp.tsx` ve `seoRoutes.ts` olarak üç dosya halinde, kopyala-yapıştır yapılabilecek şekilde sunulacak. Mevcut yapı korunduğu (sadece ekleme yapıldığı) kısaca açıklanacak.
