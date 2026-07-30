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
