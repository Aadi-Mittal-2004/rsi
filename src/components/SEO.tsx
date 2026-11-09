import { Helmet } from "react-helmet-async";
import { SITE_URL, absoluteUrl, canonicalUrl } from '@/lib/seo';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  language?: string;
  alternates?: { language: string; url: string }[];
  imageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
  verification?: {
    google?: string;
    bing?: string;
    yandex?: string;
    baidu?: string;
  };
  geo?: {
    region?: string;
    placename?: string;
    position?: string;
  };
}

const SEO = ({ 
  title, 
  description = "Roop Stone Impex - Premium Natural Stone Cladding, Quartzite & Sandstone Manufacturer | Rajasthan, India", 
  keywords = "natural stone cladding, quartzite, Deoli Green, sandstone, limestone, manufacturer, exporter, Rajasthan, India, natural stone exporter USA, quartzite slabs USA",
  image = "https://www.roopstoneimpex.in/logo.png",
  url = typeof window === 'undefined' ? SITE_URL : window.location.href,
  type = "website",
  structuredData,
  breadcrumbs,
  noindex = false,
  verification,
  geo,
  language = 'en', alternates = [], imageAlt = title
}: SEOProps) => {
  const siteTitle = "Roop Stone Impex";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const canonical = canonicalUrl(url);
  const socialImage = absoluteUrl(image);

  // Generate BreadcrumbList schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  return (
    <Helmet>
      <html lang={language} />
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonical} />
      {alternates.map(alternate => <link key={alternate.language} rel="alternate" href={absoluteUrl(alternate.url)} hrefLang={alternate.language} />)}

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content={geo?.region || "IN-RJ"} />
      <meta name="geo.placename" content={geo?.placename || "Deoli, Rajasthan"} />
      <meta name="geo.position" content={geo?.position || "25.6167;75.9667"} />
      <meta name="ICBM" content={geo?.position || "25.6167, 75.9667"} />

      {/* Verification Tags */}
      {verification?.google && <meta name="google-site-verification" content={verification.google} />}
      {verification?.bing && <meta name="msvalidate.01" content={verification.bing} />}
      {verification?.yandex && <meta name="yandex-verification" content={verification.yandex} />}
      {verification?.baidu && <meta name="baidu-site-verification" content={verification.baidu} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData).replace(/</g, '\\u003c')}
        </script>
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={language === 'de' ? 'de_DE' : language === 'ru' ? 'ru_RU' : 'en_US'} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
    </Helmet>
  );
};

export default SEO;
