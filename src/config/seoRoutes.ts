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
  <p>Fatsa nakliyat sektöründe 10 yılı aşkın tecrübemizle evden eve taşımacılık, ofis taşımacılığı ve şehirlerarası nakliyat hizmetleri sunuyoruz. Fatsa merkezli olarak hizmet veren firmamız, modern araç filosu ve uzman personeliyle eşyalarınızı güvenle yeni adresinize ulaştırır. Fatsa evden eve nakliyat sürecinde eşyalarınız profesyonel ekipler tarafından özenle paketlenir, demonte edilir ve sigorta kapsamında taşınır.</p>
  <p>Fatsa asansörlü nakliyat hizmetimiz sayesinde yüksek katlı binalarda dahi eşyalarınız hasarsız bir şekilde taşınır. Mobil hidrolik asansör sistemimiz ile 25. kata kadar güvenli taşıma imkanı sunuyoruz. Fatsa merkezli olarak hizmet veren firmamız, aynı zamanda Fatsa ofis taşımacılığı ve Fatsa şehirlerarası nakliyat konusunda da profesyonel çözümler üretmektedir.</p>
  <h3>Fatsa Nakliyat Neden Aga Nakliyat?</h3>
  <ul>
    <li>Fatsa merkezli, yerel hizmet anlayışı ile her mahallede hızlı ve güvenilir taşıma</li>
    <li>Sigortalı ve sözleşmeli taşımacılık ile eşyalarınız güvence altında</li>
    <li>Mobil hidrolik asansör ile yüksek katlara güvenli taşıma imkanı</li>
    <li>Profesyonel ambalajlama ve paketleme hizmeti ile sıfır hasar garantisi</li>
    <li>Marangozlu demonte ve montaj desteği ile taşınma sonrası kurulum</li>
    <li>Ücretsiz keşif ve ekspertiz hizmeti ile taşınma öncesi net fiyat teklifi</li>
  </ul>
  <p>Fatsa nakliyat firması ararken dikkat edilmesi gereken en önemli husus, firmanın sigorta kapsamı ve referanslarıdır. Aga Nakliyat olarak tüm taşımalarımızı sigorta güvencesi altında gerçekleştiriyoruz. Fatsa evden eve nakliyat talepleriniz için hemen bizimle iletişime geçebilir, ücretsiz keşif randevusu alabilirsiniz. Fatsa başta olmak üzere Ünye, Ordu merkez ve çevre ilçelerde hizmet veren firmamız, şehirlerarası nakliyat taleplerinizde de Türkiye'nin dört bir yanına güvenli taşımacılık imkanı sunmaktadır.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Ünye Evden Eve Nakliyat Hizmeti</h2>
  <p>Ünye nakliyat hizmetlerinde kalite ve güvenin adresi Aga Nakliyat. Ünye merkezli evden eve nakliyat, ofis taşımacılığı ve şehirlerarası taşımacılık konularında profesyonel çözümler sunuyoruz. Ünye ve çevre ilçelerde geniş hizmet ağımızla müşterilerimize kesintisiz destek sağlıyoruz.</p>
  <p>Ünye evden eve nakliyat sürecinde eşyalarınızın güvenliği bizim önceliğimizdir. Profesyonel paketleme ekiplerimiz eşyalarınızı avrupa standartlarında ambalaj malzemeleriyle paketler ve güvenle yeni adresinize taşır. Ünye asansörlü nakliyat hizmetimiz ile özellikle yüksek katlı binalarda eşyalarınızı hasarsız bir şekilde taşıyoruz. Mobil asansör sistemimiz sayesinde Ünye'de her kattan güvenli taşıma imkanı sunuyoruz.</p>
  <h3>Ünye Nakliyat Hizmetlerimiz</h3>
  <ul>
    <li>Ünye evden eve nakliyat ile eşyalarınız güvenle yeni adresinize ulaşır</li>
    <li>Ünye ofis ve işyeri taşımacılığı ile iş akışınız aksamaz</li>
    <li>Ünye asansörlü taşımacılık ile yüksek kat sorunu ortadan kalkar</li>
    <li>Ünye şehirlerarası nakliyat ile Türkiye'nin her noktasına taşıma</li>
    <li>Ünye parça eşya taşımacılığı ile ekonomik çözümler</li>
  </ul>
  <p>Ünye nakliyat firması seçerken dikkat etmeniz gereken unsurların başında güven ve tecrübe gelir. Aga Nakliyat olarak 10 yılı aşkın tecrübemiz ve referanslarımızla Ünye'de güvenilir nakliyat hizmeti sunuyoruz. Tüm taşımalarımız sigorta kapsamında olup, yaşanabilecek olası hasarlara karşı güvence altındasınız.</p>
  <p>Ünye nakliyat talepleriniz için ücretsiz keşif ve ekspertiz hizmetimizden yararlanabilir, uzman ekibimizin size özel hazırladığı teklifle taşınma sürecinizi planlayabilirsiniz. Ünye evden eve nakliyat, Ünye asansörlü taşıma veya Ünye ofis taşımacılığı talepleriniz için hemen bizimle iletişime geçin.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Ordu Evden Eve Nakliyat Hizmeti</h2>
  <p>Ordu nakliyat hizmetlerinde Aga Nakliyat farkıyla tanışın. Ordu merkez ve tüm ilçelerinde evden eve nakliyat, ofis taşımacılığı ve şehirlerarası taşımacılık konularında profesyonel çözümler üretiyoruz. Modern araç filomuz ve deneyimli kadromuzla Ordu'da nakliyat denince akla gelen ilk firmayız.</p>
  <p>Ordu evden eve nakliyat sürecinde müşteri memnuniyetini her şeyin önünde tutuyoruz. Eşyalarınız özenle paketlenir, demonte işlemleri marangoz ekibimiz tarafından titizlikle yapılır ve taşıma işlemi sigorta güvencesi altında gerçekleştirilir. Ordu asansörlü nakliyat hizmetimizle yüksek katlı binalarda dahi güvenli taşıma imkanı sunuyoruz.</p>
  <h3>Ordu Nakliyat Hizmet Bölgelerimiz</h3>
  <ul>
    <li>Ordu merkez evden eve nakliyat hizmeti</li>
    <li>Fatsa, Ünye, Perşembe, Gülyalı ilçelerinde profesyonel taşıma</li>
    <li>Kumru, Korgan, Gölköy, Mesudiye çevresinde güvenli nakliyat</li>
    <li>Aybastı, Çamaş, İkizce, Çaybaşı bölgelerinde ekonomik taşıma</li>
    <li>Ulubey, Gürgentepe, Kabataş, Akkuş ilçelerinde sigortalı nakliyat</li>
  </ul>
  <p>Ordu nakliyat firması seçerken firmanın deneyimi, sigorta kapsamı ve müşteri yorumları büyük önem taşır. Aga Nakliyat olarak tüm taşımalarımızda sigorta garantisi sunuyor, müşterilerimizin eşyalarını kendi eşyamız gibi koruyoruz. Ordu evden eve nakliyat talepleriniz için ücretsiz keşif ve teklif alabilirsiniz.</p>
  <p>Ordu genelinde hizmet veren firmamız, şehirlerarası nakliyat konusunda da Türkiye'nin her noktasına güvenli taşımacılık imkanı sunmaktadır. Ordu nakliyat, Ordu evden eve nakliyat ve Ordu asansörlü taşımacılık ihtiyaçlarınızda profesyonel, güvenilir ve ekonomik çözüm için bizi arayın.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Profesyonel Evden Eve Nakliyat Hizmeti</h2>
  <p>Evden eve nakliyat süreci, hayatınızın en stresli anlarından biri olabilir. Aga Nakliyat olarak bu süreci sizin için kolaylaştırıyor, eşyalarınızı güvenle yeni evinize taşıyoruz. Evden eve nakliyat hizmetimiz profesyonel ekipler, modern araçlar ve kaliteli malzemelerle kesintisiz şekilde yürütülür. Fatsa, Ünye ve Ordu başta olmak üzere tüm Karadeniz bölgesinde evden eve taşımacılık hizmeti sunuyoruz.</p>
  <p>Taşınma sürecinde öncelikle ücretsiz keşif yapılır, eşyalarınızın envanteri çıkarılır ve size özel teklif hazırlanır. Taşınma günü profesyonel ekiplerimiz eşyalarınızı özenle paketler, demonte eder ve güvenle yeni adresinize taşır. Yeni adresinizde montaj işlemleri marangoz ekibimiz tarafından yapılır. Tüm bu süreç boyunca eşyalarınız sigorta kapsamındadır.</p>
  <h3>Evden Eve Nakliyat Sürecimiz</h3>
  <ol>
    <li>Ücretsiz keşif ve ekspertiz ile taşınma öncesi değerlendirme</li>
    <li>Size özel fiyat teklifi ile şeffaf fiyatlandırma</li>
    <li>Profesyonel paketleme ve ambalajlama ile eşyalarınız korunur</li>
    <li>Demonte işlemleri marangoz ekibi tarafından titizlikle yapılır</li>
    <li>Asansörlü veya klasik taşıma ile güvenli nakliyat</li>
    <li>Yeni adreste montaj ve yerleştirme ile taşınma tamamlanır</li>
    <li>Sigorta kapsamında güvence ile olası hasarlara karşı koruma</li>
  </ol>
  <p>Evden eve nakliyat fiyatları, eşya miktarı, mesafe, kat bilgisi ve asansör ihtiyacına göre belirlenir. Aga Nakliyat olarak şeffaf fiyat politikamızla taşınma öncesinde net teklif sunuyor, taşınma sırasında ek ücret talep etmiyoruz. Evden eve nakliyat firması seçerken dikkat etmeniz gereken en önemli unsur firmanın referansları ve sigorta kapsamıdır. Profesyonel evden eve nakliyat için hemen bizimle iletişime geçin, ücretsiz keşif randevunuzu alın.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Asansörlü Nakliyat Hizmeti</h2>
  <p>Yüksek katlı binalarda yaşanan en büyük sorunlardan biri eşyaların güvenli şekilde taşınamamasıdır. Aga Nakliyat olarak mobil hidrolik asansör sistemimizle 25. kata kadar güvenli taşıma imkanı sunuyoruz. Asansörlü nakliyat hizmetimiz sayesinde eşyalarınız çizilmez, bina içi duvarlarınız yıpranmaz ve taşınma süreci hızlanır.</p>
  <p>Fatsa asansörlü nakliyat, Ünye asansörlü taşıma ve Ordu asansörlü nakliyat talepleriniz için modern ekipmanlarımızla hizmetinizdeyiz. Asansörlü taşımacılık özellikle büyük eşyaların (koltuk takımı, buzdolabı, çamaşır makinesi, kurutma makinesi, yatak) yüksek katlardan güvenle indirilmesini sağlar. Geleneksel yöntemlerle saatler süren taşıma işlemi, asansörlü sistemle dakikalara iner.</p>
  <h3>Asansörlü Nakliyat Avantajları</h3>
  <ul>
    <li>Eşyalarınız hasarsız ve çizilmeden taşınır</li>
    <li>Bina içi duvar, merdiven ve kapılar zarar görmez</li>
    <li>Taşınma süresi önemli ölçüde kısalır</li>
    <li>Ağır eşyalar kolayca ve güvenle taşınır</li>
    <li>Personel yorgunluğu azalır, iş kalitesi artar</li>
  </ul>
  <p>Asansörlü nakliyat fiyatları genellikle kat sayısı ve asansör kurulum süresine göre belirlenir. Aga Nakliyat olarak uygun fiyat politikamızla asansörlü taşıma hizmetini herkes için erişilebilir kılıyoruz. Mobil asansörümüz tüm bina tiplerine uyumlu olup, dar sokaklarda dahi rahatlıkla kurulabilir. Apartman yönetiminden izin alma ve park sorunu yaşamadan hızlı kurulum avantajı sunuyoruz.</p>
  <p>Asansörlü nakliyat hizmeti almak istiyorsanız taşınma tarihinizden en az bir gün önce bizimle iletişime geçmeniz yeterlidir. Fatsa, Ünye ve Ordu bölgesinde asansörlü nakliyat için doğru adres Aga Nakliyat. Hemen teklif alın, güvenle taşının.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Şehirlerarası Nakliyat Hizmeti</h2>
  <p>Şehirlerarası nakliyat, uzun mesafe taşımacılık sürecinde profesyonellik ve güven gerektirir. Aga Nakliyat olarak Fatsa, Ünye ve Ordu başta olmak üzere Karadeniz bölgesinden Türkiye'nin 81 iline güvenli şehirlerarası nakliyat hizmeti sunuyoruz. İster bir evinizi tamamen taşıyın, ister birkaç parça eşya gönderin, profesyonel ekibimiz her zaman yanınızda.</p>
  <p>Şehirlerarası evden eve nakliyat sürecinde eşyalarınız profesyonel ekipler tarafından özenle paketlenir, araç içinde güvenli şekilde sabitlenir ve GPS takipli araçlarımızla yeni adresinize ulaştırılır. Uzun yol taşımacılığında eşyalarınızın hasar görmemesi için özel ambalajlama teknikleri ve sabitleme ekipmanları kullanıyoruz.</p>
  <h3>Şehirlerarası Nakliyat Hizmetlerimiz</h3>
  <ul>
    <li>Fatsa'dan İstanbul'a şehirlerarası nakliyat</li>
    <li>Ordu'dan Ankara'ya evden eve taşıma</li>
    <li>Ünye'den İzmir'e uzun mesafe taşımacılık</li>
    <li>Karadeniz bölgesinden tüm illere güvenli nakliyat</li>
    <li>Karışık yük ve parça eşya taşımacılığı</li>
  </ul>
  <p>Şehirlerarası nakliyat fiyatları mesafe, eşya miktarı ve nakliye türüne göre hesaplanır. Aga Nakliyat olarak uzun mesafe taşımacılıkta uygun fiyat ve kaliteli hizmeti bir arada sunuyoruz. Tüm şehirlerarası taşımalarımız sigorta kapsamında olup, eşyalarınız güvence altındadır. Araçlarımız düzenli bakımdan geçer ve uzun yol için özel olarak hazırlanır.</p>
  <p>Şehirlerarası nakliyat talepleriniz için web sitemizden teklif alabilir veya telefonla bizimle iletişime geçebilirsiniz. Fatsa, Ünye, Ordu ve Karadeniz bölgesinden Türkiye'nin her noktasına güvenli ve zamanında teslimat için Aga Nakliyat'ı tercih edin.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Profesyonel Ambalajlama ve Paketleme Hizmeti</h2>
  <p>Nakliyat sürecinde eşyalarınızın güvenliği, kullanılan ambalaj malzemelerinin kalitesine doğrudan bağlıdır. Aga Nakliyat olarak avrupa standartlarında ambalaj malzemeleri kullanarak eşyalarınızı hasarlara karşı koruyoruz. Profesyonel paketleme hizmetimiz, taşınma sürecinin en kritik aşamalarından biridir ve uzman ekiplerimiz tarafından titizlikle yürütülür.</p>
  <p>Ambalajlama hizmetimizde çift kat balonlu patpat, streç film, köpük levha, karton kutu ve özel koruma malzemeleri kullanıyoruz. Kırılacak eşyalar, cam ürünler, beyaz eşya ve mobilyalar türüne göre farklı tekniklerle paketlenir. Profesyonel ambalajlama sayesinde taşınma sonrası eşyalarınızı ilk günkü gibi teslim alırsınız.</p>
  <h3>Ambalajlama Hizmetimizin Kapsamı</h3>
  <ul>
    <li>Mobilya paketleme ile koltuk, yatak, dolap ve konsollar korunur</li>
    <li>Beyaz eşya paketleme ile buzdolabı, çamaşır makinesi güvence altında</li>
    <li>Kırılacak eşya paketleme ile tabak, bardak, ayna ve porselenler korunur</li>
    <li>Elektronik eşya paketleme ile TV, bilgisayar ve ses sistemleri güvenle taşınır</li>
    <li>Özel eşya paketleme ile tablo, avize, antika ve değerli eşyalar özenle sarılır</li>
  </ul>
  <p>Nakliyat öncesi profesyonel paketleme hizmeti almak, taşınma sürecinde size zaman kazandırır ve eşyalarınızın güvenliğini garanti altına alır. Aga Nakliyat olarak paketleme hizmetimizi taşıma hizmetiyle birlikte veya ayrı olarak sunuyoruz. Fatsa, Ünye ve Ordu bölgesinde profesyonel ambalajlama ve paketleme hizmeti için hemen bizi arayın, eşyalarınız güvende olsun.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Ofis ve İşyeri Taşıma Hizmeti</h2>
  <p>Ofis taşımacılığı, evden eve nakliyattan farklı olarak daha fazla planlama ve profesyonellik gerektirir. Aga Nakliyat olarak Fatsa, Ünye ve Ordu bölgesinde ofis, işyeri ve kurumsal taşımacılık hizmetleri sunuyoruz. İş akışınızı aksatmadan, mesai saatleri dışında taşıma imkanımızla işlerinizin devamlılığını sağlıyoruz.</p>
  <p>Ofis taşımacılığı sürecinde masa, sandalye, bilgisayar, sunucu ve diğer ofis ekipmanlarınız özenle paketlenir ve yeni adresinize güvenle taşınır. Taşınma öncesi detaylı keşif yapılır, ekipman envanteri çıkarılır ve size özel taşıma planı hazırlanır. Gizlilik esaslı çalışma prensibimizle tüm belge ve dosyalarınız güvendedir.</p>
  <h3>Ofis Taşımacılığı Hizmetlerimiz</h3>
  <ul>
    <li>Kurumsal ofis taşımacılığı ile şirketiniz sorunsuz taşınır</li>
    <li>Banka ve finans kurumu taşımacılığında gizlilik esaslı çalışma</li>
    <li>Sağlık kuruluşu taşımacılığı ile hasta kaydı ve ekipman güvende</li>
    <li>Okul ve eğitim kurumu taşımacılığı ile ders materyalleri korunur</li>
    <li>Depo ve mağaza taşımacılığı ile stok ve raf sistemleri hızlıca taşınır</li>
  </ul>
  <p>Ofis taşıma fiyatları, ofisin büyüklüğü, ekipman miktarı ve taşınma mesafesine göre belirlenir. Aga Nakliyat olarak kurumsal müşterilerimize özel indirimler ve esnek ödeme seçenekleri sunuyoruz. Referanslarımız arasında bankalar, devlet kurumları ve özel şirketler bulunmaktadır.</p>
  <p>Fatsa ofis taşıma, Ünye işyeri nakliyat ve Ordu kurumsal taşımacılık talepleriniz için Aga Nakliyat'ı tercih edin. Profesyonel ekibimizle işyerinizi sorunsuz şekilde taşıyalım. Hafta sonu ve mesai sonrası taşıma opsiyonlarımız için bize ulaşın.</p>
</div>`,
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
    seoContent: `<div>
  <h2>Parça Eşya Taşımacılığı Hizmeti</h2>
  <p>Her zaman tüm evinizi taşımanız gerekmez. Bazen sadece birkaç parça eşyanızı başka bir şehre veya adrese göndermek istersiniz. Aga Nakliyat olarak parça eşya taşımacılığı hizmetimizle az miktardaki eşyalarınızı ekonomik ve güvenli şekilde göndermenizi sağlıyoruz.</p>
  <p>Parça eşya taşıma hizmetimiz, aynı güzergahtaki diğer taşımalarla birleştirilerek size en uygun fiyatı sunar. Fatsa, Ünye ve Ordu bölgesinde günlük seferlerimizle parça eşyalarınızı hızlıca gönderebilirsiniz. Koltuk, masa, beyaz eşya, bisiklet gibi tek parça eşyalarınız özenle paketlenir ve taşınır.</p>
  <h3>Parça Eşya Taşımacılığı Uygun Durumlar</h3>
  <ul>
    <li>Öğrenci eşya taşıma ile yurt ve öğrenci evi eşyaları uygun fiyata taşınır</li>
    <li>Tek mobilya parçası gönderimi ile koltuk veya dolap tek başına gönderilir</li>
    <li>Beyaz eşya nakliyesi ile buzdolabı veya çamaşır makinesi güvenle taşınır</li>
    <li>Paket ve koli gönderimi ile kargo hacmi üzeri gönderiler ekonomik çözüm bulur</li>
    <li>İkinci el eşya alım-satım nakliyesi ile alıcıya doğrudan teslimat yapılır</li>
  </ul>
  <p>Parça eşya taşımacılığı fiyatları, eşyanın büyüklüğü ve gönderim mesafesine göre belirlenir. Tam bir ev taşımasına göre çok daha ekonomik olan bu hizmetimizle bütçenizi koruyun. Parça eşya taşımalarında da sigorta hizmetimiz mevcuttur.</p>
  <p>Fatsa, Ünye ve Ordu arası parça eşya taşımacılığı için Aga Nakliyat'ı arayın. İstanbul, Ankara, İzmir gibi büyük şehirlere de parça eşya gönderimi yapıyoruz. Tek parça eşyanızı bile güvenle gönderin, taşınma stresi yaşamayın.</p>
</div>`,
    sectionId: 'hizmetler',
    schemaType: 'Service',
    ogImage: 'https://oluxuyjancmjsgjkcfjx.supabase.co/storage/v1/object/public/gallery-images/paketleme3.jpeg',
    keywords: 'parça eşya taşıma,fatsa parça nakliyat,ordu uygun nakliyat',
  },
};
