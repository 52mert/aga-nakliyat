# Instagram Popup Bileşeni — Tasarım ve Geliştirme Kuralları

## Amaç
Kullanıcı siteye girdikten 5 saniye sonra Instagram sayfasına yönlendirmeyi teklif eden, marka kimliğine uygun, animasyonlu ve temaya duyarlı bir popup bildirimi gösterilir. Kullanıcı bir kez etkileşime girip kapatırsa aynı oturumda bir daha gösterilmez.

---

## Davranış ve Zamanlama

| Olay | Süre | Açıklama |
|---|---|---|
| Sayfa yüklenir | 0s | Bileşen mount olur, timer başlar |
| Popup görünür | **+5s** | `isVisible = true`, fade + scale + yukarı kayma animasyonu ile giriş |
| "İncele" tıklanırsa | anlık | `window.open(instagramURL, '_blank')` + popup kapanır, state false |
| "Hayır" / çarpı tıklanırsa | anlık | Popup kapanır, aynı seansta tekrar açılmaz |
| Kullanıcı hiçbir şey yapmazsa | **+10s** (toplam 15s) | Popup otomatik kapanır |

Not: Aynı seansta tekrar gösterilmemesi için bileşen içindeki `useState` yeterlidir. `localStorage` veya çerez kullanılmaz.

---

## Pozisyon ve Z-index

| Cihaz | Konum | Z-index |
|---|---|---|
| Masaüstü (md+) | Sağ alt köşe, `bottom-8 right-8`, `max-w-[320px]` | `z-50` |
| Mobil (<md) | Alt kısım, `bottom-4 left-4 right-4`, tam genişlik (`w-[calc(100%-32px)]`) | `z-50` |

Not: Çentikli mobil cihazlarda `env(safe-area-inset-bottom)` eklenmeli (örn: `pb-[calc(1rem+env(safe-area-inset-bottom))]`).

---

## Tema Desteği (Dark / Light)

Mevcut `AppContext` içindeki `theme` değişkeni kullanılır.

| Öğe | Dark Mod | Light Mod |
|---|---|---|
| Arka plan | `bg-slate-950/95 backdrop-blur-md` | `bg-white/95 backdrop-blur-md` |
| Kenarlık | `border-slate-800/80` | `border-slate-200/80` |
| Başlık metni | `text-white` | `text-slate-900` |
| Açıklama metni | `text-slate-400` | `text-slate-500` |
| "İncele" butonu | `bg-red-600 hover:bg-red-700 text-white` | aynı |
| "Hayır" butonu | `bg-slate-800 hover:bg-slate-700 text-slate-300` | `bg-slate-200 hover:bg-slate-300 text-slate-700` |
| Çarpı (×) ikonu | `text-slate-400 hover:text-white` | `text-slate-400 hover:text-slate-800` |

Proje renk paleti referansı:
- Kırmızı: `#dc2626` → `red-600`
- Koyu slate: `#0f172a` → `slate-900`, `#020617` → `slate-950`

---

## Animasyon

Kütüphane: **Framer Motion** (`motion.div`)

| Aşama | Değer |
|---|---|
| **Giriş** | `initial={{ opacity: 0, scale: 0.9, y: 20 }}` → `animate={{ opacity: 1, scale: 1, y: 0 }}` |
| **Çıkış** | `exit={{ opacity: 0, scale: 0.9, y: 20 }}` |
| **Süre** | `duration: 0.3` (giriş), `duration: 0.2` (çıkış) |
| **Easing** | `[0.16, 1, 0.3, 1]` (projedeki diğer animasyonlarla tutarlı) |

- `AnimatePresence` ile sarılarak exit animasyonu çalıştırılır
- GPU hızlandırma: `will-change: transform, opacity` ve `transform-gpu`
- `prefers-reduced-motion` aktifse animasyon süresi 0s yapılmalı

---

## İçerik ve Etkileşim

- **Başlık**: "📸 Bizi Takip Edin!"
- **Açıklama**: "Aga Nakliyat Instagram sayfamızı incelemek ister misiniz?"
- **Buton 1 (İncele)**: Instagram'ı yeni sekmede açar + popup kapatır
- **Buton 2 (Hayır)**: Popup'ı kapatır, başka işlem yapmaz
- **Çarpı (×)**: Sağ üst köşe, `lucide-react` `X` ikonu, 44px dokunma alanı
- **Instagram URL**: `https://www.instagram.com/aganakliyat52/`

---

## Dosya Yapısı ve Kullanım

```
src/
  components/
    ui/
      InstagramPopup.tsx
```

`App.tsx` içinde `<FloatingButtons />` yanına:

```tsx
<FloatingButtons />
<InstagramPopup />
```

---

## Responsive Kırılımlar ve Dokunma Hedefleri

| Özellik | Mobil (<md) | Masaüstü (md+) |
|---|---|---|
| Genişlik | `left-4 right-4` (tam genişlik) | `max-w-[320px]` |
| İç padding | `p-4` | `p-5` |
| Alt boşluk | `bottom-4` | `bottom-8` |
| Buton yüksekliği | `min-h-[44px]` | `min-h-[40px]` |
| Çarpı (×) boyutu | `w-11 h-11` (44px) | `w-8 h-8` |
| Başlık fontu | `text-sm` | `text-base` |
| Açıklama fontu | `text-xs` | `text-sm` |

---

## State Yönetimi ve Cleanup

```
const [isVisible, setIsVisible] = useState(false);
```
- `useEffect` 1: Mount sonrası 5s `setTimeout` → `setIsVisible(true)`
- `useEffect` 2: `isVisible=true` olduğunda 10s `setTimeout` → `setIsVisible(false)`
- Tüm timer'lar `clearTimeout` ile temizlenir (`return () => clearTimeout(timer)`)
- Kullanıcı "Hayır", "İncele" veya çarpıya bastığında `setIsVisible(false)` + timer temizlenir
- `isVisible=false` iken bileşen `null` döner, DOM tamamen kalkar

---

## Erişilebilirlik

- `role="dialog"` ve `aria-modal="true"` (açıkken)
- `aria-label="Instagram popup"` root elementte
- Butonlarda `aria-label` ("Instagram'da incele", "Kapat")
- **Escape** tuşuna basıldığında `setIsVisible(false)`
- Popup açıldığında ilk butona focus verilir (opsiyonel)

---

## Performans

- Popup kapandığında state `false` → `null` döner → DOM'da hiçbir iz kalmaz
- Animasyon sadece `transform` ve `opacity` üzerinden → layout thrashing yok
- `backdrop-blur` performansı etkileyebilir; mobil düşük öncelikli cihazlarda sadece `bg-opacity-95` ile yetinilebilir (opsiyonel)
- Timer'lar `clearTimeout` ile her koşulda temizlenir, memory leak önlenir
