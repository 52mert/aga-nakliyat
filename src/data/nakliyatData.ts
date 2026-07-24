import type { Service, GalleryItem } from '../types';
import { ASANSOR_PHOTO_URL } from '../assets/asansorPhoto';

export const COMPANY_INFO = {
  name: 'Aga Nakliyat',
  slogan: 'Fatsa, Ünye ve Ordu Evden Eve Güvenli Taşımacılık',
  phonePrimary: '0542 437 52 52',
  phonePrimaryRaw: '05424375252',
  whatsappNumber: '905355991572',
  whatsappDisplay: '0535 599 15 72',
  address: 'Sakarya Mah. Evren Cad. No: 14/A, Fatsa / Ordu',
  email: 'info@aganakliyat.com',
  workingHours: 'Pazartesi - Pazar: 07:00 - 22:00',
  regions: ['Fatsa', 'Ünye', 'Ordu (Altınordu)', 'Perşembe', 'Kümbet', 'Kumru', 'Korgan', 'Çamaş', 'Gölköy', 'Aybastı', 'Tüm Türkiye Şehirlerarası']
};

export const SERVICES: Service[] = [
  {
    id: 'evden-eve',
    title: 'Evden Eve Nakliyat',
    description: 'Fatsa, Ünye ve tüm Ordu bölgesinde eşyalarınız özenle ambalajlanarak yeni adresinize güvenle taşınır.',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    features: ['Marangozlu söküm ve montaj', 'Havalı patpat ile özel paketleme', 'Sigortalı ve sözleşmeli taşıma', 'Anahtar teslim yerleşim'],
    popular: true
  },
  {
    id: 'asansorlu-tasima',
    title: 'Mobil Asansörlü Taşımacılık',
    description: '25. kata kadar ulaşan yüksek tonajlı modüler mobil hidrolik asansörlerimizle eşyalarınız çizilmeden ve bina içi yıpranmadan taşınır.',
    iconName: 'Layers',
    image: ASANSOR_PHOTO_URL,
    features: ['25. Kata kadar erişim imkanı', 'Çizilme ve kırılma riskini sıfıra indirir', 'Bina yönetimi ile sorunsuz taşıma', '%50 daha hızlı nakliye süresi'],
    popular: true
  },
  {
    id: 'sehirlerarasi',
    title: 'Şehirlerarası Nakliyat',
    description: 'Ordu ve Karadeniz bölgesinden Türkiye’nin 81 iline kapalı kasa özel süspansiyonlu araçlarımızla güvenli nakliye.',
    iconName: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    features: ['GPS ile anlık araç takibi', 'Zamanında adrese teslimat garantisi', 'Kasko ve nakliyat sigortası', 'Direkt veya parça eşya taşıma'],
    popular: false
  },
  {
    id: 'ambalajlama',
    title: 'Profesyonel Ambalajlama',
    description: 'Mobilya, beyaz eşya, cam ve hassas eşyalarınız çift kat balonlu patpat ve streç ile sıfır hasar prensibiyle paketlenir.',
    iconName: 'Package',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    features: ['Hijyenik sıfır ambalaj malzemeleri', 'Kırılacak eşyalara köpüklü koruma', 'Elbise dolaplı özel taşıma kolileri', 'Etiketli ve düzenli paketleme'],
    popular: false
  },
  {
    id: 'ofis-tasima',
    title: 'Ofis ve İşyeri Taşıma',
    description: 'Şirket, büro, kurumsal dosya ve hassas teknolojik cihazlarınızı iş akışınızı aksatmadan hızlıca taşıyoruz.',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Etiketli klasör ve arşiv nakli', 'Elektronik cihazlara özel koruma', 'Mesai saatleri dışında taşıma opsiyonu', 'Sözleşmeli ve gizlilik esaslı'],
    popular: false
  },
  {
    id: 'parca-esyasi',
    title: 'Parça Eşya Taşımacılığı',
    description: 'Aynı güzergahtaki az sayıdaki eşyalarınız için ekonomik ve hızlı parça taşıma çözümü sunuyoruz.',
    iconName: 'Box',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    features: ['Bütçe dostu paylaşım opsiyonu', 'Fatsa-Ünye-Ordu arası günlük sefer', 'Küçük hacimli hızlı nakliye', 'Kapıdan kapıya teslimat'],
    popular: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Aga Nakliyat Asansörlü Araç',
    category: 'asansor',
    image: ASANSOR_PHOTO_URL,
    description: '25. katta bina dışından yüksek tonajlı asansörlü nakliyat operasyonumuz.'
  },
  {
    id: '2',
    title: 'Özel Balonlu Ambalajlama',
    category: 'ambalaj',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    description: 'Koltuk takımı ve beyaz eşyaların patpat ile sıfır hasar paketlemesi.'
  },
  {
    id: '3',
    title: 'Kapalı Kasa Nakliye Kamyonumuz',
    category: 'araclar',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    description: 'Hijyenik ahşap kaplamalı, çelik kasa evden eve taşıma aracımız.'
  },
  {
    id: '4',
    title: 'Fatsa Evden Eve Taşıma',
    category: 'tasima',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    description: 'Fatsa Sahil bölgesinde site içi asansörlü nakliyat çalışması.'
  },
  {
    id: '5',
    title: 'Ünye Asansör Kurulumu',
    category: 'asansor',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Ünye dar sokaklarda dikey dış cephe nakliye asansörü.'
  },
  {
    id: '6',
    title: 'Marangozlu Mobilya Demontajı',
    category: 'ambalaj',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    description: 'Gardırop ve yatak odası takımlarının profesyonel ustalarımızca sökümü.'
  }
];

export const WHY_US_REASONS = [
  {
    title: 'Bölge Uzmanı (Fatsa-Ünye-Ordu)',
    desc: 'Bölgemizin mimari yapısını, dar sokaklarını ve yüksek binalarını çok iyi tanıyoruz.',
    icon: 'MapPin'
  },
  {
    title: 'Son Teknoloji Dış Cephe Asansörü',
    desc: 'Dar merdiven boşluklarında eşyalarınızın zarar görmesini önleyen mobil hidrolik asansör.',
    icon: 'Zap'
  },
  {
    title: 'Sigortalı & Sözleşmeli Nakliye',
    desc: 'Tüm taşımalarımız nakliyat emtia sigortası ve yazılı taahhüt altındadır.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Usta Marangoz Kadrosu',
    desc: 'Gardırop, baza ve ünitelerin uzman marangozlarımızca sökülüp yeni adreste montajı.',
    icon: 'Wrench'
  },
  {
    title: 'Çift Kat Hijyenik Paketleme',
    desc: 'Kişiye özel sıfır balonlu patpat naylonlar ve köpük destekli muhafaza.',
    icon: 'PackageCheck'
  },
  {
    title: 'Şeffaf ve Sabit Fiyat Garantisi',
    desc: 'Ekspertiz sonrası belirlenen fiyat haricinde sürpriz ek maliyet çıkarılmaz.',
    icon: 'BadgePercent'
  }
];

