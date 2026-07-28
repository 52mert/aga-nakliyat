# Hizmetler Yönetimi — Admin Panel Entegrasyonu

## Amaç
Şu an `src/data/nakliyatData.ts` içinde sabit olan hizmet verilerini, Supabase tabanlı dinamik bir yapıya taşımak. Admin panel üzerinden hizmet ekleme, düzenleme, silme ve sıralama işlemleri yapılabilir hale getirilecek.

---

## Veritabanı: Yeni Tablo `services`

| Sütun | Tip | Açıklama |
|---|---|---|
| id | int8 (PK, auto) | Otomatik artan |
| title | text | Hizmet başlığı (örn: "Profesyonel Ambalajlama") |
| description | text | Kısa açıklama |
| icon_name | text | Lucide ikon adı (örn: "Package", "Truck") |
| image_url | text | Supabase Storage public URL |
| features | jsonb | Özellik listesi (örn: `["Özenli paketleme", "Sigortalı taşıma"]`) |
| popular | boolean (default: false) | Öne çıkan hizmet mi? |
| sort_order | int | Sıralama (küçükten büyüğe) |
| created_at | timestamptz | Otomatik |
| updated_at | timestamptz | Otomatik |

**RLS**: SELECT → herkese açık, INSERT/UPDATE/DELETE → yalnızca authenticated (admin).

---

## Supabase Storage

- **Bucket**: `gallery-images` (mevcut)
- **Klasör**: `hizmetler/` — Hizmet görselleri bu klasöre yüklenecek
- **MIME**: `image/jpeg`, `image/png`, `image/webp`
- **Limit**: 5 MB

Admin panelden yükleme yapılırken `hizmetler/` prefix'i otomatik eklenir. Galeri görselleriyle karışmaması için klasörleme yapılır.

---

## Admin Panel: 6. Sekme "Hizmetler"

Mevcut 5 sekmeye ek olarak **Hizmetler** sekmesi eklenecek.

### Özellikler

- **Liste**: Tüm hizmetler `sort_order`'a göre listelenir. Kart görünümü: ikon, başlık, açıklama (kısa), popüler rozeti.
- **Yeni Ekle**: Butonla form açılır.
- **Düzenle**: Her kartta düzenle butonu.
- **Sil**: Onay dialog'u ile silme (Storage'daki dosya silinmez, opsiyonel).

### Form Alanları

| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | text input | Zorunlu |
| Açıklama | textarea | Zorunlu |
| İkon | dropdown | Lucide ikon listesi |
| Görsel | file upload + preview | Yükleme sonrası preview |
| Özellik 1 | text input | |
| Özellik 2 | text input | |
| Özellik 3 | text input | |
| Özellik 4 | text input | |
| Öne Çıkan | toggle/checkbox | |
| Sıralama | number input | Otomatik önerilir (son sıra + 1) |

### Silme Davranışı
- Tablodan satır silinir.
- Storage'daki dosya silinmez (başka yerlerde kullanılıyor olabilir).

---

## Site Tarafı: `Hizmetler.tsx` Güncellemesi

- `Hizmetler.tsx` artık `nakliyatData.ts`'teki `SERVICES` sabitini değil, Supabase `services` tablosundan veri çekecek.
- `useEffect` ile `supabase.from('services').select('*').order('sort_order')` çekilir.
- `features` JSONB → `string[]` olarak parse edilir.
- `icon_name` → lucide-react dinamik ikon render (önceden tanımlı map ile eşleme).
- Yükleme sırasında skeleton loader, hata durumunda fallback gösterilir.
- Eğer tablo boşsa, `nakliyatData.ts`'teki sabit veriler fallback olarak kullanılır.

---

## Veri Akışı

```
AdminPage (Hizmetler sekmesi)
  ├── Ekle    → services.insert() + storage.upload("hizmetler/...")
  ├── Düzenle → services.update() + (yeni dosya varsa) storage.upload()
  ├── Sil     → services.delete()
  └── Sırala  → services.update({ sort_order })

Hizmetler.tsx
  └── supabase.from('services').select('*').order('sort_order')
        → mapping → HizmetCard bileşenleri
```

---

## Context Güncellemesi (`AppContext`)

- Yeni state: `services: Service[]`
- Yeni fonksiyonlar: `fetchServices()`, `addService()`, `updateService()`, `deleteService()`
- `fetchServices()` uygulama açılışında çağrılır.
- Admin paneldeki CRUD işlemleri context üzerinden yapılır.

---

## İkon Eşleme (lucide-react)

```ts
const iconMap: Record<string, LucideIcon> = {
  Home: Home,
  Truck: Truck,
  Package: Package,
  Building2: Building2,
  Shield: Shield,
  Wrench: Wrench,
  Box: Box,
  Layers: Layers,
  MapPin: MapPin,
  CheckCircle: CheckCircle,
}
```

Admin panelde dropdown'da görünen isim → bileşen eşlemesi yukarıdaki gibi yapılır.

---

## Responsive ve Tema

- Admin panel formu: Mobilde tam genişlik, masaüstünde 2 sütun grid.
- Dark/light tema: Mevcut admin panel stilleriyle uyumlu (slate tonları).
- Dokunma hedefleri: Mobilde butonlar 44px.

---

## Dosya Değişiklik Listesi

| Dosya | İşlem |
|---|---|
| `src/types.ts` | `Service` interface güncellenir (`features` jsonb uyumu) |
| `src/data/nakliyatData.ts` | `SERVICES` sabiti fallback olarak kalır |
| `src/components/sections/Hizmetler.tsx` | Supabase'den veri çekecek şekilde güncellenir |
| `src/context/AppContext.tsx` | `services` state ve CRUD fonksiyonları eklenir |
| `src/components/admin/AdminPage.tsx` | 6. sekme "Hizmetler" ve form eklenir |

---

## Mevcut Verilerin Migrasyonu

İlk kurulumda `nakliyatData.ts`'teki 6 hizmet, `services` tablosuna elle eklenmelidir (admin panelden veya Supabase SQL Editor ile). Görseller `public/images/` klasöründen Storage'a yüklenip URL'leri güncellenmelidir.

---

## SQL

```sql
CREATE TABLE services (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Home',
  image_url TEXT NOT NULL DEFAULT '',
  features JSONB DEFAULT '[]'::jsonb,
  popular BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hizmetler herkese acik"
  ON services FOR SELECT USING (true);

CREATE POLICY "Admin hizmet insert"
  ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin hizmet update"
  ON services FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin hizmet delete"
  ON services FOR DELETE USING (auth.role() = 'authenticated');
```

---

## Uygulama Sırası

1. SQL'i Supabase Editor'da çalıştır
2. `types.ts` → `Service` interface'ini güncelle (`features: string[]`, `image` → `image_url`)
3. `AppContext.tsx` → `services` state + CRUD fonksiyonları ekle
4. `AdminPage.tsx` → 6. sekme "Hizmetler" ekle (form + liste + düzenle + sil)
5. `Hizmetler.tsx` → Supabase'den çekecek şekilde güncelle
6. Mevcut 6 hizmeti Supabase'e migrasyon et
