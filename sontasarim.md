# Aga Nakliyat — Son Tasarım Notları

## Tarih: 24 Temmuz 2026

---

## Görsel Sistemi

### Mevcut Durum
- Hero, Hizmetler, Galeri: **remote URL** (Unsplash)
- Asansör görseli: **SVG data URI** (`asansorPhoto.ts`)
- Gerçek firma fotoğrafları: **`public/images/`** (yeni eklendi, 14 adet JPEG)

### `public/images/` içindeki dosyalar

| Dosya | Boyut |
|---|---|
| `aganakliyat2.jpeg` | 164 KB |
| `asansor.jpeg` | 216 KB |
| `asansor2.jpeg` | 169 KB |
| `asansoryukardancekım.jpeg` | 219 KB |
| `foto.jpeg` | 140 KB |
| `foto2.jpeg` | 127 KB |
| `kamyon.jpeg` | 194 KB |
| `kamyon2.jpeg` | 155 KB |
| `kamyonıcı.jpeg` | 139 KB |
| `paketleme.jpeg` | 209 KB |
| `paketleme2.jpeg` | 176 KB |
| `paketleme3.jpeg` | 155 KB |
| `paketleme4.jpeg` | 125 KB |
| `paketleme5.jpeg` | 121 KB |

### Kullanım Planı
- `nakliyatData.ts`'deki Unsplash URL'leri → `/images/dosyaadi.jpeg` ile değiştirilecek
- Hero arkaplanı → en iyi kalite JPEG seçilecek
- `asansorPhoto.ts` → SVG korunabilir veya `asansor.jpeg`/`asansor2.jpeg` ile değiştirilebilir

### Gelecek: Supabase Storage
- Admin panelinden galeri resmi yükleme/silme eklenecek
- Görseller Supabase Storage'da tutulacak
- `galeri` tablosuna `image_url` column'ı eklenecek

---

## Admin Panel — Pricing Fix (24 Temmuz)

- `updatePricingConfig` → hata yönetimi eklendi (`Promise<boolean>`)
- `AdminPage.tsx` → `useEffect` ile form senkronizasyonu
- Kırmızı "Fiyatlar kaydedilemedi!" uyarısı eklendi

---

## Yapılacaklar (öncelik sırasına göre)

- [ ] `public/images/`'deki JPEG'leri `nakliyatData.ts`'ye bağla (Unsplash'leri değiştir)
- [ ] Galeri lightbox'ta gerçek firma fotoğraflarını kullan
- [ ] Admin panelinde yorum ekleme formu düzgün çalışıyor mu test et
- [ ] Fiyat hesaplayıcı mobilde test
- [ ] Supabase Storage + galeri yönetimi (uzun vade)
