# Faz 4: Google Analytics (GA4) Entegrasyonu

## Mimari Karar

| Karar | Seçim | Gerekçe |
|---|---|---|
| Kütüphane | `react-ga4` (2KB gzipped) | En hafif, SPA route değişimlerini destekler, middleware ile çakışmaz |
| SPA Route Tracking | `useLocation` hook + `useEffect` | React Router v7 ile her route değişiminde otomatik page_view |
| Middleware Uyumu | Sorunsuz | GA4 sadece client'ta (tarayıcıda) çalışır, middleware edge'de çalışır |
| Performans Etkisi | Yok denecek kadar az | Async script, 2KB kütüphane, render blocking yapmaz |

## Akış Şeması

```
Kullanıcı siteye girer
        │
        ▼
    main.tsx başlatılır
        │
        ├── GA4 init edilir (react-ga4)
        │   └── GA4 script'i async yüklenir
        │
        ▼
    App.tsx mount olur
        │
        ├── useLocation hook'u ile pathname dinlenir
        │   └── Her route değişiminde → ga4.send({ hitType: "pageview", page: pathname })
        │
        ▼
    Kullanıcı sayfada gezinir (SPA)
        │
        ├── /bolge/fatsa'ya gider → GA4: pageview /bolge/fatsa
        ├── /hizmet/asansorlu-nakliyat'a gider → GA4: pageview /hizmet/asansorlu-nakliyat
        └── WhatsApp butonuna tıklar → GA4: event "whatsapp_click" (opsiyonel)
```

## Kütüphane Seçimi Neden `react-ga4`?

| Kriter | react-ga4 | gtag.js (manual) | @ga-4/react-ga4 |
|---|---|---|---|
| Boyut | ~2KB gzipped | Script ~50KB | ~3KB |
| SPA route tracking | Dahili destek | Manuel `useEffect` | Dahili destek |
| TypeScript | Tam destek | Yok | Tam destek |
| Güncellik | Aktif | N/A | Daha az bilinir |
| Middleware çakışması | Yok (client) | Yok (client) | Yok (client) |

**`react-ga4` seçildi** — en hafif, en yaygın, SPA route tracking'i manuel ama temiz.

---

## Adım 1: Kütüphaneyi Kur

```bash
npm install react-ga4
```

## Adım 2: `.env` Dosyasına GA4 Measurement ID'sini Ekle

`.env` dosyasına yeni satır eklenir:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`G-XXXXXXXXXX` yerine Google Analytics 4'ten aldığın Measurement ID yazılır.
(Google Analytics → Admin → Data Streams → Web → Measurement ID)

## Adım 3: Analytics Hook'u Oluştur

`src/hooks/useAnalytics.ts` dosyası oluşturulur:

```ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID) return;

    // GA4'ü bir kere init et (sayfa ilk yüklendiğinde)
    if (!ReactGA.isInitialized) {
      ReactGA.initialize(GA_ID);
    }

    // Her route değişiminde page_view gönder
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);
}
```

### Neden Hook Olarak?

- `useLocation()` → React Router'dan anlık path alınır
- `useEffect([location])` → Her sayfa/rout değişiminde tetiklenir
- `ReactGA.isInitialized` → GA4 bir kere init edilir, tekrar init edilmez
- Hook'un kendisi App.tsx'te çağrılır

## Adım 4: App.tsx'e Hook'u Ekle

```tsx
import { useAnalytics } from './hooks/useAnalytics';

export default function App() {
  useAnalytics(); // ← Tek satır, tüm routing tracking'ini açar

  return (
    <HelmetProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/hizmet/:slug" element={<MainApp />} />
            <Route path="/bolge/:slug" element={<MainApp />} />
            <Route path="/mertadmin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}
```

### Neden App.tsx?

- Tüm route'ları kapsar
- `useLocation()` en üst seviyede çalışır
- Tek satır, başka hiçbir bileşen değişmez

## Adım 5: Event Tracking (İsteğe Bağlı)

GA4 ile sadece sayfa görüntülemeleri değil, kullanıcı etkileşimleri de takip edilebilir.
Önerilen event'ler:

| Event | Tetiklenme Anı | Kullanım Amacı |
|---|---|---|
| `whatsapp_click` | WhatsApp butonuna tıklandığında | Dönüşüm oranı ölçümü |
| `phone_call` | Telefon butonuna tıklandığında | Dönüşüm oranı ölçümü |
| `teklif_hesapla` | Fiyat hesaplayıcı açıldığında | Kullanıcı ilgisi ölçümü |
| `form_submit` | Teklif formu gönderildiğinde | Lead yakalama ölçümü |
| `yorum_ekle` | Yorum eklendiğinde | Kullanıcı memnuniyeti ölçümü |

Event gönderme örneği:

```ts
import ReactGA from 'react-ga4';

// WhatsApp butonuna tıklandığında
<button onClick={() => {
  ReactGA.event({
    category: 'engagement',
    action: 'whatsapp_click',
    label: window.location.pathname,
  });
  // WhatsApp linkine yönlendir
}}>
```

---

## Adım 6: Middleware ile Çakışma Kontrolü

Middleware sadece **sunucu tarafında** (Vercel Edge) çalışır. GA4 sadece **istemci tarafında** (tarayıcı / JavaScript) çalışır.

| Katman | Middleware | GA4 |
|---|---|---|
| Çalışma yeri | Vercel Edge (server) | Tarayıcı (client) |
| Googlebot'a etkisi | SEO HTML enjekte eder | Çalışmaz (bot JS çalıştırmaz) |
| İnsan kullanıcıya etkisi | Pas geçer (next()) | Normal çalışır |
| Çakışma | Yok | Yok |

**Kesinlikle çakışma yok.** Middleware Googlebot'a özel HTML döndürürken GA4 script'i çalışmaz (bot JS çalıştırmaz). İnsan kullanıcı SPA'yı normal kullanırken GA4 normal çalışır.

---

## Adım 7: Deploy ve Doğrulama

```bash
# Deploy
npm run build && vercel --prod

# Doğrulama (tarayıcıdan):
# 1. Siteyi aç
# 2. F12 → Network tab → "collect" veya "g" filtresi uygula
# 3. Sayfalar arasında gez
# 4. Google Analytics > Realtime > Şu andaki kullanıcılar
```

### Doğrulama Adımları

1. Canlı siteyi aç (`https://www.orduaganakliyat.com.tr/`)
2. `/bolge/fatsa` sayfasına git
3. `/hizmet/asansorlu-nakliyat` sayfasına git
4. Ana sayfaya dön
5. **Google Analytics > Realtime > Events** → `page_view` event'leri görülmeli
6. **Google Analytics > Realtime > Pages and Screens** → ziyaret edilen yollar görülmeli

---

## Dosya Değişiklik Listesi

| İşlem | Dosya |
|---|---|
| KUR | `npm install react-ga4` |
| YENİ | `src/hooks/useAnalytics.ts` |
| DÜZENLE | `src/App.tsx` (useAnalytics eklenecek) |
| DÜZENLE | `.env` (VITE_GA_MEASUREMENT_ID eklenecek) |
| DÜZENLENMEZ | `middleware.ts` (etkilenmez) |
| DÜZENLENMEZ | `vercel.json` (değişmez) |

---

## Kontrol Listesi

- [ ] Google Analytics 4'te proje oluşturuldu ve Measurement ID alındı
- [ ] `npm install react-ga4` yapıldı
- [ ] `.env` dosyasına `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` eklendi
- [ ] `src/hooks/useAnalytics.ts` oluşturuldu
- [ ] `src/App.tsx` içinde `useAnalytics()` çağrıldı
- [ ] `npm run build` hatasız çalışıyor
- [ ] Deploy yapıldı
- [ ] Google Analytics Realtime'de sayfa görüntülemeleri görülüyor
