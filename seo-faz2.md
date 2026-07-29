# Faz 2: Arama Motoru Botları İçin Statik Dosyaların Oluşturulması

## 0. Bağlam ve Kritik Uyarı
Bu plan, Faz 1'de oluşturulan dinamik SEO rotalarının (React Router + Helmet) Google ve Vercel tarafından doğru şekilde tanınmasını sağlar.

**En Büyük Risk:** `vercel.json` dosyasındaki `rewrites` kuralı, `/robots.txt` ve `/sitemap.xml` isteklerini de `index.html`'e yönlendirir. Bu durumda Google, XML yerine HTML görür ve "Site Haritası HTML'dir" hatasını vermeye devam eder. **Bu plan, bu hatayı kökten çözer.**

---

## 1. `public/robots.txt`

```txt
User-agent: *
Allow: /
Allow: /images/
Disallow: /mertadmin

Sitemap: https://www.orduaganakliyat.com.tr/sitemap.xml
```

- `Allow: /images/` → Galeri görsellerinin botlar tarafından taranmasına izin verir (Google Görsel Arama için)
- `Disallow: /mertadmin` → Admin paneli gizli kalır
- `Sitemap:` satırı tam URL ile belirtilir

---

## 2. `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- ANA SAYFA -->
  <url>
    <loc>https://www.orduaganakliyat.com.tr/</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg</image:loc>
    </image:image>
  </url>

  <!-- BÖLGE SAYFALARI -->
  <url>
    <loc>https://www.orduaganakliyat.com.tr/bolge/fatsa</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/asansor2.jpeg</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/foto.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/bolge/unye</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/kamyon.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/bolge/ordu</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme2.jpeg</image:loc>
    </image:image>
  </url>

  <!-- HİZMET SAYFALARI -->
  <url>
    <loc>https://www.orduaganakliyat.com.tr/hizmet/evden-eve</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/foto.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/hizmet/asansorlu-nakliyat</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/asansor2.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/hizmet/sehirlerarasi</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/kamyon.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/hizmet/ambalajlama</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme2.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/hizmet/ofis-tasima</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg</image:loc>
    </image:image>
  </url>

  <url>
    <loc>https://www.orduaganakliyat.com.tr/hizmet/parca-esya-tasima</loc>
    <lastmod>2026-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme3.jpeg</image:loc>
    </image:image>
  </url>
</urlset>
```

---

## 3. `vercel.json` Güncellemesi (KRİTİK)

**Mevcut (YANLIŞ):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Güncel (DOĞRU):**
```json
{
  "rewrites": [
    { "source": "/robots.txt", "destination": "/robots.txt" },
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Eğer istek `/robots.txt` veya `/sitemap.xml` ise → olduğu gibi sun (public klasöründen). Diğer tüm istekler (`/bolge/fatsa`, `/hizmet/...` vb.) → React uygulamasına (index.html) yönlendir.

---

## 4. Deploy Sonrası Test

```bash
curl -I https://www.orduaganakliyat.com.tr/robots.txt
# Beklenen: HTTP/2 200

curl -I https://www.orduaganakliyat.com.tr/sitemap.xml
# Beklenen: HTTP/2 200, Content-Type: application/xml

curl -I https://www.orduaganakliyat.com.tr/bolge/fatsa
# Beklenen: HTTP/2 200 (index.html döner, React Router devreye girer)
```

---

## 5. Google Search Console'a Gönderme

1. Google Search Console'a gir
2. Sol menü → **Sitemap**
3. "Yeni sitemap ekle" → `sitemap.xml` yaz
4. Gönder
5. Birkaç saat sonra durumu kontrol et: "Başarılı" yazmalı

---

## 6. Dosya Değişiklik Listesi

| İşlem | Dosya |
|---|---|
| YENİ | `public/robots.txt` |
| YENİ | `public/sitemap.xml` (10 URL + görseller) |
| DÜZENLE | `vercel.json` (statik dosya exception) |

---

## 7. Son Kontrol

- [ ] `public/robots.txt` oluşturuldu
- [ ] `public/sitemap.xml` oluşturuldu (10 URL + görseller)
- [ ] `vercel.json` güncellendi (exception eklendi)
- [ ] Deploy yapıldı
- [ ] `curl` ile test edildi (HTTP 200)
- [ ] Google Search Console'a sitemap gönderildi
