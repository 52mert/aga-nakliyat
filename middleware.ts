import { next } from '@vercel/edge';
import { seoRoutes, serviceRoutes, type SeoRoute } from './src/config/seoRoutes';

export const config = {
  matcher: ['/((?!robots.txt|sitemap.xml|index.html|favicon|assets|.*\\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|json)).*)'],
};

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
  const url = new URL(req.url);
  const seo = findSeoData(url.pathname);
  if (!seo) {
    return next();
  }

  const origin = url.origin;
  const html = await fetch(`${origin}/index.html`).then(r => r.text());

  // Dinamik olarak Title ve Meta Description etiketlerini güncelle
  let finalHtml = html.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);

  finalHtml = finalHtml.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${seo.description}" />`
  );

  finalHtml = finalHtml.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${seo.title}" />`
  );

  finalHtml = finalHtml.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${seo.description}" />`
  );

  finalHtml = finalHtml.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${seo.title}" />`
  );

  // BOT/İNSAN AYRIMINI (CLOAKING RISKINI) SIFIRA İNDİRDİK
  // SEO içeriklerini %100 legal olan <noscript> etiketiyle DOM'a basıyoruz
  finalHtml = finalHtml.replace(
    '<div id="root"></div>',
    `<noscript id="seo-content">${seo.seoContent}</noscript>\n  <div id="root"></div>`
  );

  return new Response(finalHtml, {
    headers: { 'content-type': 'text/html;charset=utf-8' },
  });
}
