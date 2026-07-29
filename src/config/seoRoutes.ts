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
