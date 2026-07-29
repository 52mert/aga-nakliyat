import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../../context/AppContext';
import { seoRoutes, serviceRoutes, type SeoRoute } from '../../config/seoRoutes';
import Sidebar from './Sidebar';
import Hero from './Hero';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import InstagramPopup from '../ui/InstagramPopup';
import Hizmetler from '../sections/Hizmetler';
import NedenBiz from '../sections/NedenBiz';
import Galeri from '../sections/Galeri';
import Yorumlar from '../sections/Yorumlar';
import Iletisim from '../sections/Iletisim';
import TeklifModal from '../modals/TeklifModal';
import AddReviewModal from '../modals/AddReviewModal';

export default function MainApp() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useApp();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const pathPrefix = window.location.pathname.startsWith('/hizmet/') ? 'hizmet' :
                     window.location.pathname.startsWith('/bolge/') ? 'bolge' : null;

  const seoData: SeoRoute | null = slug
    ? (seoRoutes[slug] || serviceRoutes[slug] || null)
    : null;

  useEffect(() => {
    if (slug && !seoData) {
      navigate('/', { replace: true });
      return;
    }
    if (slug && seoData) {
      const el = document.getElementById(seoData.sectionId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      }
    }
  }, [slug, seoData, navigate]);

  const canonicalUrl = slug
    ? `https://www.orduaganakliyat.com.tr/${pathPrefix}/${slug}`
    : 'https://www.orduaganakliyat.com.tr/';

  return (
    <>
      {seoData && (
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <meta name="keywords" content={seoData.keywords} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={seoData.title} />
          <meta property="og:description" content={seoData.description} />
          <meta property="og:image" content={seoData.ogImage} />
          <meta property="og:url" content={canonicalUrl} />
          <meta name="twitter:title" content={seoData.title} />
          <meta name="twitter:description" content={seoData.description} />
          <meta name="twitter:image" content={seoData.ogImage} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": seoData.schemaType,
              "name": "Aga Nakliyat",
              "description": seoData.description,
              "url": canonicalUrl,
              "areaServed": seoData.schemaType === 'LocalBusiness' && slug
                ? [{"@type": "City", "name": slug === 'fatsa' ? 'Fatsa' : slug === 'unye' ? 'Ünye' : 'Ordu'}]
                : undefined,
            })}
          </script>
        </Helmet>
      )}

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white'
          : 'bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white'
      }`}>
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
}
