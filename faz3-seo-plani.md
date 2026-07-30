# Faz 3: Vercel Middleware ile Dynamic Rendering (Puppeteer'sız)

## Mimari Özet

```
İstek (Kullanıcı / Googlebot)
        │
        ▼
  Vercel Edge Middleware (middleware.ts)
        │
        ├── User-Agent "Googlebot" mi?
        │       │
        │       ▼ EVET
        │   index.html'i al
        │       │
        │       ▼
        │   String replace ile:
        │   ├── <title> → seoRoutes.title
        │   ├── <meta description> → seoRoutes.description
        │   └── <div id="seo-content"> → seoRoutes.seoContent (görünür HTML bloğu)
        │       │
        │       ▼
        │   Googlebot'a DOLU HTML döndür ✅
        │
        └── HAYIR (insan)
                │
                ▼
            Normal SPA (index.html) devam eder
```

### Temel Kurallar
- **Puppeteer/Playwright YOK** — build süresi değişmez, Vercel Hobby'de sorunsuz çalışır
- **Ek kütüphane YOK** — sadece `replace()` ile string manipülasyonu
- **Gizli text YOK** — içerik `<div id="seo-content">` ile görünür şekilde eklenir, React yüklenince SPA üstüne yazar (Google'ın Dynamic Rendering kılavuzuna uygun)
- **Cloaking değil** — bot ve kullanıcı aynı içeriği görür, sadece sunum farklıdır

---

## Adım 1: `seoRoutes.ts` Güncellemesi

Aşağıdaki kod, mevcut `seoRoutes.ts` dosyasının yerini alacaktır. Her route'a `seoContent` alanı eklenmiştir. Bu alan, Googlebot'a middleware tarafından enjekte edilecek zengin HTML içeriğini barındırır.

```ts
export interface SeoRoute {
  slug: string;
  title: string;
  description: string;
  h1Text: string;
  subText: string;
  seoContent: string;
  sectionId: string;
  schemaType: 'LocalBusiness' | 'Service';
  ogImage: string;
  keywords: string;
}

export const seoRoutes: Record<string, SeoRoute> = {
  'fatsa': {
    slug: 'fatsa',
    title: 'Fatsa Nakliyat | Aga Nakliyat - Fatsa Evden Eve Taşımacılık',
    description: 'Fatsa nakliyat, Fatsa evden eve nakliyat hizmetleri. Fatsa merkezli asansörlü, sigortalı taşımacılık. Ücretsiz ekspertiz için hemen teklif alın.',
    h1Text: 'Fatsa Nakliyat ve Evden Eve Taşımacılık',
    subText: 'Aga Nakliyat Fatsa merkezli olarak evden eve, asansörlü ve şehirlerarası nakliyat hizmeti vermektedir. Fatsa ve çevre ilçelerde 10+ yıllık tecrübemizle eşyalarınızı güvenle taşıyoruz.',
    seoContent: `<div>
  <h2>Fatsa Evden Eve Nakliyat Hizmeti</h2>
  <p>Fatsa nakliyat sektöründe 10 yılı aşkın tecrübemizle evden eve taşımacılık, ofis taşımacılığı ve şehirlerarası nakliyat hizmetleri sunuyoruz. Fatsa merkezli olarak hizmet veren firmamız, modern araç filosu ve uzman personeliyle eşyalarınızı güvenle yeni adresinize ulaştırır.</p>
  <p>Fatsa evden eve nakliyat sürecinde eşyalarınız profesyonel ekipler tarafından özenle paketlenir, demonte edilir ve sigorta kapsamında taşınır. Fatsa asansörlü nakliyat hizmetimiz sayesinde yüksek katlı binalarda dahi eşyalarınız hasarsız bir şekilde taşınır.</p>
  <h3>Fatsa Nakliyat Neden Aga Nakliyat?</h3>
  <ul>
    <li>Fatsa merkezli, yerel hizmet anlayışı</li>
    <li>Sigortalı ve sözleşmeli taşımacılık</li>
    <li>Mobil hidrolik asansör ile yüksek katlara güvenli taşıma</li>
    <li>Profesyonel ambalajlama ve paketleme hizmeti</li>
    <li>Marangozlu demonte ve montaj desteği</li>
    <li>Ücretsiz keşif ve ekspertiz hizmeti</li>
  </ul>
  <p>Fatsa nakliyat firması ararken dikkat edilmesi gereken en önemli husus, firmanın sigorta kapsamı ve referanslarıdır. Aga Nakliyat olarak tüm taşımalarımızı sigorta güvencesi altında gerçekleştiriyoruz. Fatsa evden eve nakliyat talepleriniz için hemen bizimle iletişime geçebilir, ücretsiz keşif randevusu alabilirsiniz.</p>
  <p>Fatsa başta olmak üzere Ünye, Ordu merkez ve çevre ilçelerde hizmet veren firmamız, şehirlerarası nakliyat taleplerinizde de Türkiye'nin dört bir yanına güvenli taşımacılık imkanı sunmaktadır. Fatsa nakliyat sektöründe kaliteli ve uygun fiyatlı hizmet arayışınızda doğru adrestesiniz.</p>
</div>`,
    sectionId: 'anasayfa',
    schemaType: 'LocalBusiness',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'fatsa nakliyat,fatsa evden eve nakliyat,fatsa asansörlü nakliyat,fatsa nakliye,fatsa evden eve,fatsa ofis taşımacılığı',
  },

  'unye': {
    slug: 'unye',
    title: 'Ünye Nakliyat | Aga Nakliyat - Ünye Evden Eve Taşımacılık',
    description: 'Ünye nakliyat, Ünye evden eve nakliyat. Ünye merkezli asansörlü, sigortalı taşımacılık hizmetleri. Hemen teklif alın.',
    h1Text: 'Ünye Nakliyat ve Evden Eve Taşımacılık',
    subText: 'Ünye ve çevresinde Aga Nakliyat güvencesiyle evden eve nakliyat, asansörlü taşıma ve şehirlerarası lojistik.',
    seoContent: `<div>
  <h2>Ünye Evden Eve Nakliyat Hizmeti</h2>
  <p>Ünye nakliyat hizmetlerinde kalite ve güvenin adresi Aga Nakliyat. Ünye merkezli evden eve nakliyat, ofis taşımacılığı ve şehirlerarası taşımacılık konularında profesyonel çözümler sunuyoruz. Ünye ve çevre ilçelerde geniş hizmet ağımızla müşterilerimize kesintisiz destek sağlıyoruz.</p>
  <p>Ünye evden eve nakliyat sürecinde eşyalarınızın güvenliği bizim önceliğimizdir. Profesyonel paketleme ekiplerimiz, eşyalarınızı avrupa standartlarında ambalaj malzemeleriyle paketler ve güvenle yeni adresinize taşır. Ünye asansörlü nakliyat hizmetimiz ile özellikle yüksek katlı binalarda eşyalarınızı hasarsız bir şekilde taşıyoruz.</p>
  <h3>Ünye Nakliyat Hizmetlerimiz</h3>
  <ul>
    <li>Ünye evden eve nakliyat</li>
    <li>Ünye ofis ve işyeri taşımacılığı</li>
    <li>Ünye asansörlü taşımacılık</li>
    <li>Ünye şehirlerarası nakliyat</li>
    <li>Ünye parça eşya taşımacılığı</li>
  </ul>
  <p>Ünye nakliyat firması seçerken dikkat etmeniz gereken unsurların başında güven ve tecrübe gelir. Aga Nakliyat olarak 10 yılı aşkın tecrübemiz ve referanslarımızla Ünye'de güvenilir nakliyat hizmeti sunuyoruz. Tüm taşımalarımız sigorta kapsamında olup, yaşanabilecek olası hasarlara karşı güvence altındasınız.</p>
  <p>Ünye nakliyat talepleriniz için ücretsiz keşif ve ekspertiz hizmetimizden yararlanabilir, uzman ekibimizin size özel hazırladığı teklifle taşınma sürecinizi planlayabilirsiniz. Ünye evden eve nakliyat için hemen bizimle iletişime geçin.</p>
</div>`,
    sectionId: 'anasayfa',
    schemaType: 'LocalBusiness',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'ünye nakliyat,ünye evden eve nakliyat,ünye asansörlü nakliyat,ünye nakliye,ünye ev taşıma',
  },

  'ordu': {
    slug: 'ordu',
    title: 'Ordu Nakliyat | Aga Nakliyat - Ordu Evden Eve Taşımacılık',
    description: 'Ordu nakliyat, Ordu evden eve nakliyat. Ordu merkezli asansörlü, sigortalı evden eve taşımacılık.',
    h1Text: 'Ordu Nakliyat ve Evden Eve Taşımacılık',
    subText: 'Ordu merkez ve tüm ilçelerde Aga Nakliyat güvencesiyle profesyonel evden eve nakliyat hizmeti.',
    seoContent: `<div>
  <h2>Ordu Evden Eve Nakliyat Hizmeti</h2>
  <p>Ordu nakliyat hizmetlerinde Aga Nakliyat farkıyla tanışın. Ordu merkez ve tüm ilçelerinde evden eve nakliyat, ofis taşımacılığı ve şehirlerarası taşımacılık konularında profesyonel çözümler üretiyoruz. Modern araç filomuz ve deneyimli kadromuzla Ordu'da nakliyat denince akla gelen ilk firmayız.</p>
  <p>Ordu evden eve nakliyat sürecinde müşteri memnuniyetini her şeyin önünde tutuyoruz. Eşyalarınız özenle paketlenir, demonte işlemleri marangoz ekibimiz tarafından titizlikle yapılır ve taşıma işlemi sigorta güvencesi altında gerçekleştirilir. Ordu asansörlü nakliyat hizmetimizle yüksek katlı binalarda dahi güvenli taşıma imkanı sunuyoruz.</p>
  <h3>Ordu Nakliyat Hizmet Bölgelerimiz</h3>
  <ul>
    <li>Ordu merkez evden eve nakliyat</li>
    <li>Fatsa, Ünye, Perşembe, Gülyalı ilçeleri</li>
    <li>Kumru, Korgan, Gölköy, Mesudiye çevresi</li>
    <li>Aybastı, Çamaş, İkizce, Çaybaşı bölgeleri</li>
    <li>Ulubey, Gürgentepe, Kabataş, Akkuş ilçeleri</li>
  </ul>
  <p>Ordu nakliyat firması seçerken firmanın deneyimi, sigorta kapsamı ve müşteri yorumları büyük önem taşır. Aga Nakliyat olarak tüm taşımalarımızda sigorta garantisi sunuyor, müşterilerimizin eşyalarını kendi eşyamız gibi koruyoruz. Ordu evden eve nakliyat talepleriniz için ücretsiz keşif ve teklif alabilirsiniz.</p>
  <p>Ordu genelinde hizmet veren firmamız, şehirlerarası nakliyat konusunda da Türkiye'nin her noktasına güvenli taşımacılık imkanı sunmaktadır. Ordu nakliyat ihtiyaçlarınızda profesyonel, güvenilir ve ekonomik çözüm için bizi arayın.</p>
</div>`,
    sectionId: 'anasayfa',
    schemaType: 'LocalBusiness',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'ordu nakliyat,ordu evden eve nakliyat,ordu asansörlü nakliyat,ordu nakliye,ordu ev taşıma',
  },
};

export const serviceRoutes: Record<string, SeoRoute> = {
  'evden-eve': {
    slug: 'evden-eve',
    title: 'Evden Eve Nakliyat | Aga Nakliyat',
    description: 'Profesyonel evden eve nakliyat hizmeti. Sigortalı, marangozlu, ambalajlı taşıma. Fatsa, Ünye, Ordu için hemen teklif alın.',
    h1Text: 'Evden Eve Nakliyat Hizmeti',
    subText: 'Eşyalarınız özenle paketlenir, sigortalı olarak yeni adresinize teslim edilir. Marangozlu söküm ve montaj dahil.',
    seoContent: `<div>
  <h2>Profesyonel Evden Eve Nakliyat Hizmeti</h2>
  <p>Evden eve nakliyat süreci, hayatınızın en stresli anlarından biri olabilir. Aga Nakliyat olarak bu süreci sizin için kolaylaştırıyor, eşyalarınızı güvenle yeni evinize taşıyoruz. Evden eve nakliyat hizmetimiz profesyonel ekipler, modern araçlar ve kaliteli malzemelerle kesintisiz şekilde yürütülür.</p>
  <p>Evden eve taşımacılık hizmetimizde öncelikle ücretsiz keşif yapılır, eşyalarınızın envanteri çıkarılır ve size özel teklif hazırlanır. Taşınma günü profesyonel ekiplerimiz eşyalarınızı özenle paketler, demonte eder ve güvenle yeni adresinize taşır. Yeni adresinizde montaj işlemleri marangoz ekibimiz tarafından yapılır.</p>
  <h3>Evden Eve Nakliyat Sürecimiz</h3>
  <ol>
    <li>Ücretsiz keşif ve ekspertiz</li>
    <li>Size özel fiyat teklifi</li>
    <li>Profesyonel paketleme ve ambalajlama</li>
    <li>Demonte işlemleri (marangoz ekibi)</li>
    <li>Asansörlü veya klasik taşıma</li>
    <li>Yeni adreste montaj ve yerleştirme</li>
    <li>Sigorta kapsamında güvence</li>
  </ol>
  <p>Evden eve nakliyat fiyatları; eşya miktarı, mesafe, kat bilgisi ve asansör ihtiyacına göre belirlenir. Aga Nakliyat olarak şeffaf fiyat politikamızla taşınma öncesinde net teklif sunuyor, taşınma sırasında ek ücret talep etmiyoruz. Fatsa, Ünye ve Ordu başta olmak üzere tüm bölgede evden eve nakliyat hizmeti veriyoruz.</p>
  <p>Evden eve nakliyat firması seçerken dikkat etmeniz gereken en önemli unsur firmanın referansları ve sigorta kapsamıdır. Aga Nakliyat olarak tüm taşımalarımız sigortalıdır. Evden eve nakliyat talepleriniz için hemen bizimle iletişime geçin, ücretsiz keşif randevunuzu alın.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/foto.jpeg',
    keywords: 'evden eve nakliyat,fatsa evden eve,ordu evden eve,ünye evden eve,evden eve taşımacılık',
  },

  'asansorlu-nakliyat': {
    slug: 'asansorlu-nakliyat',
    title: 'Asansörlü Nakliyat | Aga Nakliyat',
    description: 'Mobil hidrolik asansörle 25. kata kadar eşya taşıma. Fatsa, Ünye, Ordu asansörlü nakliyat.',
    h1Text: 'Asansörlü Nakliyat Hizmeti',
    subText: 'Modüler mobil hidrolik asansörlerimizle eşyalarınız çizilmeden ve bina içi yıpranmadan taşınır.',
    seoContent: `<div>
  <h2>Asansörlü Nakliyat Hizmeti</h2>
  <p>Yüksek katlı binalarda yaşanan en büyük sorunlardan biri eşyaların güvenli şekilde taşınamamasıdır. Aga Nakliyat olarak mobil hidrolik asansör sistemimizle 25. kata kadar güvenli taşıma imkanı sunuyoruz. Asansörlü nakliyat hizmetimiz sayesinde eşyalarınız çizilmez, bina içi duvarlarınız yıpranmaz ve taşınma süreci hızlanır.</p>
  <p>Fatsa asansörlü nakliyat, Ünye asansörlü taşıma ve Ordu asansörlü nakliyat talepleriniz için modern ekipmanlarımızla hizmetinizdeyiz. Asansörlü taşımacılık özellikle büyük eşyaların (koltuk takımı, buzdolabı, çamaşır makinesi vb.) yüksek katlardan güvenle indirilmesini sağlar.</p>
  <h3>Asansörlü Nakliyat Avantajları</h3>
  <ul>
    <li>Eşyalarınız hasarsız taşınır</li>
    <li>Bina içi duvar ve merdivenler zarar görmez</li>
    <li>Taşınma süresi önemli ölçüde kısalır</li>
    <li>Ağır eşyalar kolayca taşınır</li>
    <li>Personel yorgunluğu azalır, iş kalitesi artar</li>
  </ul>
  <p>Asansörlü nakliyat fiyatları genellikle kat sayısı ve asansör kurulum süresine göre belirlenir. Aga Nakliyat olarak uygun fiyat politikamızla asansörlü taşıma hizmetini herkes için erişilebilir kılıyoruz. Mobil asansörümüz tüm bina tiplerine uyumlu olup, dar sokaklarda dahi rahatlıkla kurulabilir.</p>
  <p>Asansörlü nakliyat hizmeti almak istiyorsanız taşınma tarihinizden en az bir gün önce bizimle iletişime geçmeniz yeterlidir. Fatsa, Ünye ve Ordu bölgesinde asansörlü nakliyat için doğru adres Aga Nakliyat. Hemen teklif alın, güvenle taşının.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/asansor2.jpeg',
    keywords: 'asansörlü nakliyat,fatsa asansörlü nakliyat,ordu asansörlü taşıma,asansörlü taşımacılık',
  },

  'sehirlerarasi': {
    slug: 'sehirlerarasi',
    title: 'Şehirlerarası Nakliyat | Aga Nakliyat',
    description: 'Ordu ve Karadeniz bölgesinden Türkiye\'nin 81 iline güvenli şehirlerarası nakliyat.',
    h1Text: 'Şehirlerarası Nakliyat Hizmeti',
    subText: 'GPS takipli araçlarımızla Türkiye\'nin her noktasına güvenli ve zamanında teslimat.',
    seoContent: `<div>
  <h2>Şehirlerarası Nakliyat Hizmeti</h2>
  <p>Şehirlerarası nakliyat, uzun mesafe taşımacılık sürecinde profesyonellik ve güven gerektirir. Aga Nakliyat olarak Fatsa, Ünye ve Ordu başta olmak üzere Karadeniz bölgesinden Türkiye'nin 81 iline güvenli şehirlerarası nakliyat hizmeti sunuyoruz.</p>
  <p>Şehirlerarası evden eve nakliyat sürecinde eşyalarınız profesyonel ekipler tarafından özenle paketlenir, araç içinde güvenli şekilde sabitlenir ve GPS takipli araçlarımızla yeni adresinize ulaştırılır. Uzun yol taşımacılığında eşyalarınızın hasar görmemesi için özel ambalajlama teknikleri kullanıyoruz.</p>
  <h3>Şehirlerarası Nakliyat Hizmetlerimiz</h3>
  <ul>
    <li>Fatsa'dan İstanbul'a şehirlerarası nakliyat</li>
    <li>Ordu'dan Ankara'ya evden eve taşıma</li>
    <li>Ünye'den İzmir'e uzun mesafe taşımacılık</li>
    <li>Karadeniz bölgesinden tüm illere nakliyat</li>
    <li>Karışık yük ve parça eşya taşımacılığı</li>
  </ul>
  <p>Şehirlerarası nakliyat fiyatları mesafe, eşya miktarı ve nakliye türüne göre hesaplanır. Aga Nakliyat olarak uzun mesafe taşımacılıkta uygun fiyat ve kaliteli hizmeti bir arada sunuyoruz. Tüm şehirlerarası taşımalarımız sigorta kapsamında olup, eşyalarınız güvence altındadır.</p>
  <p>Şehirlerarası nakliyat talepleriniz için web sitemizden teklif alabilir veya telefonla bizimle iletişime geçebilirsiniz. Türkiye'nin her noktasına güvenli ve zamanında teslimat için Aga Nakliyat'ı tercih edin.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/kamyon.jpeg',
    keywords: 'şehirlerarası nakliyat,ordu şehirlerarası taşıma,fatsa uzak nakliyat,iller arası nakliyat',
  },

  'ambalajlama': {
    slug: 'ambalajlama',
    title: 'Profesyonel Ambalajlama | Aga Nakliyat',
    description: 'Çift kat balonlu patpat, streç ve köpüklü koruma ile sıfır hasar garantili paketleme hizmeti.',
    h1Text: 'Profesyonel Ambalajlama Hizmeti',
    subText: 'Mobilya, beyaz eşya, cam ve hassas eşyalarınız hijyenik malzemelerle özenle paketlenir.',
    seoContent: `<div>
  <h2>Profesyonel Ambalajlama ve Paketleme Hizmeti</h2>
  <p>Nakliyat sürecinde eşyalarınızın güvenliği, kullanılan ambalaj malzemelerinin kalitesine doğrudan bağlıdır. Aga Nakliyat olarak avrupa standartlarında ambalaj malzemeleri kullanarak eşyalarınızı hasarlara karşı koruyoruz. Profesyonel paketleme hizmetimiz, taşınma sürecinin en kritik aşamalarından biridir.</p>
  <p>Ambalajlama hizmetimizde çift kat balonlu patpat, streç film, köpük levha, karton kutu ve özel koruma malzemeleri kullanıyoruz. Kırılacak eşyalar, cam ürünler, beyaz eşya ve mobilyalar türüne göre farklı tekniklerle paketlenir. Profesyonel ambalajlama sayesinde taşınma sonrası eşyalarınızı ilk günkü gibi teslim alırsınız.</p>
  <h3>Ambalajlama Hizmetimizin Kapsamı</h3>
  <ul>
    <li>Mobilya paketleme (koltuk, yatak, dolap)</li>
    <li>Beyaz eşya paketleme (buzdolabı, çamaşır makinesi)</li>
    <li>Kırılacak eşya paketleme (tabak, bardak, ayna)</li>
    <li>Elektronik eşya paketleme (TV, bilgisayar)</li>
    <li>Özel eşya paketleme (tablo, avize, antika)</li>
  </ul>
  <p>Nakliyat öncesi profesyonel paketleme hizmeti almak, taşınma sürecinde size zaman kazandırır ve eşyalarınızın güvenliğini garanti altına alır. Aga Nakliyat olarak paketleme hizmetimizi taşıma hizmetiyle birlikte veya ayrı olarak sunuyoruz. Hemen bizimle iletişime geçin, eşyalarınız güvende olsun.</p>
  <p>Fatsa, Ünye ve Ordu bölgesinde profesyonel ambalajlama ve paketleme hizmeti için Aga Nakliyat'ı arayın. Uzman ekibimiz eşyalarınızı özenle paketler, taşınma stresinizi azaltır.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme2.jpeg',
    keywords: 'ambalajlı nakliyat,fatsa ambalajlama,ordu paketleme,profesyonel paketleme',
  },

  'ofis-tasima': {
    slug: 'ofis-tasima',
    title: 'Ofis ve İşyeri Taşıma | Aga Nakliyat',
    description: 'Şirket, büro ve kurumsal ofis taşımacılığı. Mesai saatleri dışında taşıma opsiyonu.',
    h1Text: 'Ofis ve İşyeri Taşıma Hizmeti',
    subText: 'İş akışınızı aksatmadan, mesai saatleri dışında ofis taşıma imkanı. Gizlilik esaslı çalışma.',
    seoContent: `<div>
  <h2>Ofis ve İşyeri Taşıma Hizmeti</h2>
  <p>Ofis taşımacılığı, evden eve nakliyattan farklı olarak daha fazla planlama ve profesyonellik gerektirir. Aga Nakliyat olarak Fatsa, Ünye ve Ordu bölgesinde ofis, işyeri ve kurumsal taşımacılık hizmetleri sunuyoruz. İş akışınızı aksatmadan, mesai saatleri dışında taşıma imkanımızla işlerinizin devamlılığını sağlıyoruz.</p>
  <p>Ofis taşımacılığı sürecinde masa, sandalye, bilgisayar, sunucu ve diğer ofis ekipmanlarınız özenle paketlenir ve yeni adresinize güvenle taşınır. Ofis taşıma öncesi detaylı keşif yapılır, ekipman envanteri çıkarılır ve size özel taşıma planı hazırlanır. Gizlilik esaslı çalışma prensibimizle tüm belge ve dosyalarınız güvendedir.</p>
  <h3>Ofis Taşımacılığı Hizmetlerimiz</h3>
  <ul>
    <li>Kurumsal ofis taşımacılığı</li>
    <li>Banka ve finans kurumu taşımacılığı</li>
    <li>Sağlık kuruluşu taşımacılığı</li>
    <li>Okul ve eğitim kurumu taşımacılığı</li>
    <li>Depo ve mağaza taşımacılığı</li>
  </ul>
  <p>Ofis taşıma fiyatları; ofis büyüklüğü, ekipman miktarı ve taşınma mesafesine göre belirlenir. Aga Nakliyat olarak kurumsal müşterilerimize özel indirimler ve esnek ödeme seçenekleri sunuyoruz. Referanslarımız arasında bankalar, devlet kurumları ve özel şirketler bulunmaktadır.</p>
  <p>Fatsa ofis taşıma, Ünye işyeri nakliyat ve Ordu kurumsal taşımacılık talepleriniz için Aga Nakliyat'ı tercih edin. Profesyonel ekibimizle işyerinizi sorunsuz şekilde taşıyalım.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/aganakliyat2.jpeg',
    keywords: 'ofis taşıma,fatsa işyeri nakliyat,ordu büro taşımacılığı,kurumsal taşımacılık',
  },

  'parca-esya-tasima': {
    slug: 'parca-esya-tasima',
    title: 'Parça Eşya Taşımacılığı | Aga Nakliyat',
    description: 'Aynı güzergahtaki az sayıdaki eşyalarınız için ekonomik parça taşıma çözümü.',
    h1Text: 'Parça Eşya Taşımacılığı',
    subText: 'Bütçe dostu paylaşım opsiyonuyla Fatsa-Ünye-Ordu arası günlük seferler.',
    seoContent: `<div>
  <h2>Parça Eşya Taşımacılığı Hizmeti</h2>
  <p>Her zaman tüm evinizi taşımanız gerekmez. Bazen sadece birkaç parça eşyanızı başka bir şehre veya adrese göndermek istersiniz. Aga Nakliyat olarak parça eşya taşımacılığı hizmetimizle az miktardaki eşyalarınızı ekonomik ve güvenli şekilde göndermenizi sağlıyoruz.</p>
  <p>Parça eşya taşıma hizmetimiz, aynı güzergahtaki diğer taşımalarla birleştirilerek size en uygun fiyatı sunar. Fatsa, Ünye ve Ordu bölgesinde günlük seferlerimizle parça eşyalarınızı hızlıca gönderebilirsiniz. Koltuk, masa, beyaz eşya gibi tek parça eşyalarınız özenle paketlenir ve taşınır.</p>
  <h3>Parça Eşya Taşımacılığı Uygun Durumlar</h3>
  <ul>
    <li>Öğrenci eşya taşıma (yurt, öğrenci evi)</li>
    <li>Tek mobilya parçası gönderimi</li>
    <li>Beyaz eşya nakliyesi</li>
    <li>Paket ve koli gönderimi</li>
    <li>İkinci el eşya alım-satım nakliyesi</li>
  </ul>
  <p>Parça eşya taşımacılığı fiyatları, eşyanın büyüklüğü ve gönderim mesafesine göre belirlenir. Tam bir ev taşımasına göre çok daha ekonomik olan bu hizmetimizle bütçenizi koruyun. Parça eşya taşımalarında da sigorta hizmetimiz mevcuttur.</p>
  <p>Fatsa, Ünye ve Ordu arası parça eşya taşımacılığı için Aga Nakliyat'ı arayın. Tek parça eşyanızı bile güvenle gönderelim, taşınma stresi yaşamayın.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme3.jpeg',
    keywords: 'parça eşya taşıma,fatsa parça nakliyat,ordu uygun nakliyat,ekonomik nakliyat',
  },
};
```

---

## Adım 2: `middleware.ts` (Proje Kökünde)

**Gerçek uygulama:** Middleware `seoRoutes.ts`'den import eder, veri tekrarı (code duplication) yoktur.

```ts
import { next } from '@vercel/edge';
import { seoRoutes, serviceRoutes, type SeoRoute } from './src/config/seoRoutes';

export const config = {
  matcher: ['/((?!robots.txt|sitemap.xml|index.html|favicon|assets|.*\\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|json)).*)'],
};

const BOT_REGEX = /googlebot|bingbot|yandexbot|facebookexternalhit|twitterbot|whatsapp|linkedinbot|slackbot|pinterestbot/i;

function findSeoData(pathname: string): SeoRoute | null {
  if (pathname === '/') return null;

  const parts = pathname.split('/').filter(Boolean);

  if (parts[0] === 'bolge' && parts[1]) {
    return seoRoutes[parts[1]] || null;
  }

  if (parts[0] === 'hizmet' && parts[1]) {
    return serviceRoutes[parts[1]] || null;
  }

  return null;
}

export default async function middleware(req: Request): Promise<Response | void> {
  const ua = req.headers.get('user-agent') || '';
  if (!BOT_REGEX.test(ua.toLowerCase())) {
    return next();
  }

  const url = new URL(req.url);
  const seo = findSeoData(url.pathname);
  if (!seo) {
    return next();
  }

  const origin = url.origin;
  const html = await fetch(`${origin}/index.html`).then(r => r.text());

  let botHtml = html.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);

  botHtml = botHtml.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${seo.description}" />`
  );

  botHtml = botHtml.replace(
    `<meta property="og:title" content="Aga Nakliyat - Fatsa, Ünye, Ordu Evden Eve Nakliyat" />`,
    `<meta property="og:title" content="${seo.title}" />`
  );

  botHtml = botHtml.replace(
    `<meta property="og:description" content="Aga Nakliyat - Fatsa, Ünye ve Ordu'da asansörlü, sigortalı, marangozlu evden eve nakliyat. 10+ yıl tecrübe, ücretsiz ekspertiz, hemen teklif alın." />`,
    `<meta property="og:description" content="${seo.description}" />`
  );

  botHtml = botHtml.replace(
    '<div id="root"></div>',
    `<div id="seo-content" style="padding:20px;max-width:1200px;margin:0 auto;font-family:sans-serif;color:#333;line-height:1.8;font-size:16px">${seo.seoContent}</div>\n  <div id="root"></div>`
  );

  return new Response(botHtml, {
    headers: { 'content-type': 'text/html;charset=utf-8' },
  });
}
```

---

## Adım 3: Deploy ve Test

```bash
# Deploy
npm run build && vercel --prod

# Test (Googlebot simülasyonu)
curl -A "Googlebot" https://www.orduaganakliyat.com.tr/bolge/fatsa | head -100

# Normal kullanıcı
curl -A "Mozilla/5.0" https://www.orduaganakliyat.com.tr/bolge/fatsa | head -10
```

---

## Sonraki Aşama: Faz 4 - Google Analytics (GA4) Entegrasyonu

Faz 3 tamamlandıktan sonra hangi sayfadan ne kadar trafik aldığını ölçmek için GA4 entegrasyonu yapılır.

[**Faz 4 Planı → `faz4-ga4-plani.md`**](./faz4-ga4-plani.md)

---

## Kontrol Listesi

- [x] `seoRoutes.ts` güncellendi (tüm route'lara `seoContent` eklendi)
- [x] `middleware.ts` oluşturuldu (`@vercel/edge` kuruldu)
- [x] `npm run build` hatasız çalışıyor
- [x] `curl -A "Googlebot"` ile test edildi (dolu HTML dönüyor ✅)
- [x] `curl -A "Mozilla/5.0"` normal SPA dönüyor
- [x] Google Search Console'a sitemap gönderildi
- [x] Tüm SEO route'ları (`/bolge/fatsa`, `/hizmet/evden-eve` vb.) bot testinden geçti
