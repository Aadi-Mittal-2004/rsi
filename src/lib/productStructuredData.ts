import { absoluteUrl, canonicalUrl, SITE_URL } from '@/lib/seo';

interface ProductPageData {
  name: string;
  description: string;
  url: string;
  image?: string;
  sku: string;
  category: string;
  properties?: string[];
  price?: number | null;
}

/** Quote-only catalog pages have no offer or customer reviews to mark up. */
export function buildProductPageStructuredData(data: ProductPageData) {
  const url = canonicalUrl(data.url);
  const organization = { '@type': 'Organization', name: 'Roop Stone Impex', url: SITE_URL };
  const image = data.image ? absoluteUrl(data.image) : undefined;
  const common = { '@context': 'https://schema.org', name: data.name, description: data.description, url };

  if (data.price == null || !Number.isFinite(data.price) || data.price <= 0) {
    return {
      ...common, '@type': 'WebPage', '@id': `${url}#webpage`,
      about: { '@type': 'Thing', name: data.name, identifier: data.sku },
      publisher: organization,
      ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
    };
  }

  const price = data.price.toFixed(2);
  return {
    ...common, '@type': 'Product', '@id': `${url}#product`, sku: data.sku,
    ...(image ? { image } : {}),
    brand: { '@type': 'Brand', name: 'Roop Stone Impex' },
    manufacturer: organization, category: data.category,
    ...(data.properties?.length ? { additionalProperty: data.properties.map(value => ({ '@type': 'PropertyValue', name: 'Feature', value })) } : {}),
    offers: {
      '@type': 'Offer', url, priceCurrency: 'USD', price, seller: organization,
      priceSpecification: {
        '@type': 'UnitPriceSpecification', priceCurrency: 'USD', price,
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'FTK', unitText: 'square foot' },
      },
    },
  };
}
