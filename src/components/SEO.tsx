import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
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
  image = "https://roopstoneimpex.in/logo.png",
  url = window.location.href,
  type = "website",
  structuredData,
  verification,
  geo
}: SEOProps) => {
  const siteTitle = "Roop Stone Impex";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <link rel="alternate" href={url} hrefLang="en-US" />
      <link rel="alternate" href={url} hrefLang="x-default" />

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
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
