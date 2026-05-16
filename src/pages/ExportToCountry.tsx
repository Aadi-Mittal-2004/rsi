import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { products } from '@/data/products';
import { EXPORT_COUNTRIES, getAllExportSlugs, generateExportIntro } from '@/data/seoPages';
import { getPricingLink, FULL_CONTAINER_DISCOUNT } from '@/data/stoneFormats';
import {
  STONE_VARIETIES, calculateFOBPerSqFt, formatUSD,
  SANDSTONE_VARIETIES, calculateSandstoneFOBPerSqFt,
  LIMESTONE_VARIETIES, calculateLimestoneFOBPerSqFt,
  SLATE_VARIETIES, calculateSlateFOBPerSqFt,
} from '@/data/pricingData';
import { cn } from '@/lib/utils';

function getLowestPrice(productId: string): number | null {
  const link = getPricingLink(productId);
  if (!link) return null;
  let variety: any, calcFn: any;
  switch (link.type) {
    case 'quartzite': variety = STONE_VARIETIES.find(v => v.id === link.varietyId); calcFn = (b: number) => calculateFOBPerSqFt(b, 'natural'); break;
    case 'sandstone': variety = SANDSTONE_VARIETIES.find(v => v.id === link.varietyId); calcFn = (b: number) => calculateSandstoneFOBPerSqFt(b, 'natural'); break;
    case 'limestone': variety = LIMESTONE_VARIETIES.find(v => v.id === link.varietyId); calcFn = (b: number) => calculateLimestoneFOBPerSqFt(b, 'natural'); break;
    case 'slate': variety = SLATE_VARIETIES.find(v => v.id === link.varietyId); calcFn = (b: number) => calculateSlateFOBPerSqFt(b, 'natural'); break;
  }
  if (!variety) return null;
  const prices = Object.values(variety.basePricesINR) as number[];
  return calcFn(Math.min(...prices));
}

const ExportToCountry = () => {
  const { slug } = useParams<{ slug: string }>();

  const pageData = useMemo(() => {
    if (!slug) return null;
    const all = getAllExportSlugs();
    return all.find(s => s.slug === slug) || null;
  }, [slug]);

  if (!pageData) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Button asChild><Link to="/products">Browse All Products</Link></Button>
        </div>
      </PageTransition>
    );
  }

  const { category, categoryLabel, country } = pageData;
  const intro = generateExportIntro(categoryLabel, country);
  const siteUrl = 'https://roopstoneimpex.in';
  const pageUrl = `${siteUrl}/export/${slug}`;

  // All products in this category
  const categoryProducts = products.filter(p => p.category === category && p.category !== 'mosaic');

  // Popular stones for this country
  const popularProducts = country.popularStoneIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p != null && p.category === category);

  // Build pricing table
  const pricingRows = categoryProducts.map(p => {
    const price = getLowestPrice(p.id);
    return { product: p, price };
  }).filter(r => r.price !== null);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `How long does shipping take from India to ${country.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Shipping from India to ${country.name} typically takes ${country.transitDays} via the route: ${country.nearestPort}. We handle all export documentation and customs clearance.` } },
      { '@type': 'Question', name: `What ${categoryLabel.toLowerCase()} is most popular in ${country.name}?`, acceptedAnswer: { '@type': 'Answer', text: `The most popular Indian ${categoryLabel.toLowerCase()} varieties in ${country.name} include ${popularProducts.map(p => p.name).join(', ')}. ${country.climateNote}` } },
      { '@type': 'Question', name: `Do you offer full container discounts?`, acceptedAnswer: { '@type': 'Answer', text: `Yes! Full container orders of a single stone variety receive a ${Math.round(FULL_CONTAINER_DISCOUNT * 100)}% discount on FOB pricing. A 20ft container holds approximately 1,200–1,500 sq ft of stone depending on thickness.` } },
    ],
  };

  const orgSchema = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'Roop Stone Impex', url: siteUrl,
    description: `Premium Indian ${categoryLabel.toLowerCase()} exporter to ${country.name}`,
    address: { '@type': 'PostalAddress', addressRegion: 'Rajasthan', addressCountry: 'IN' },
    areaServed: { '@type': 'Country', name: country.name },
  };

  return (
    <PageTransition>
      <SEO
        title={`Indian ${categoryLabel} Exporter to ${country.name} — Direct from Quarry`}
        description={`Buy premium Indian ${categoryLabel.toLowerCase()} direct from the quarry. Export to ${country.name} via ${country.nearestPort.split('→')[1]?.trim() || country.name}. ${country.transitDays} transit. FOB pricing with ${Math.round(FULL_CONTAINER_DISCOUNT * 100)}% full container discount.`}
        keywords={`Indian ${categoryLabel.toLowerCase()} ${country.name}, ${categoryLabel.toLowerCase()} exporter to ${country.name}, Indian natural stone supplier ${country.name}, buy ${categoryLabel.toLowerCase()} from India`}
        url={pageUrl}
        structuredData={orgSchema}
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: `${categoryLabel} to ${country.name}`, url: pageUrl },
        ]}
      />

      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> All Products
          </Link>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-4xl mb-4 block">{country.flag}</span>
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-3 block">Export · {categoryLabel}</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Premium Indian {categoryLabel} — Export to {country.name}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{intro}</p>
          </motion.div>

          {/* Shipping Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: 'Shipping Route', value: country.nearestPort, icon: '🚢' },
              { label: 'Transit Time', value: country.transitDays, icon: '⏱️' },
              { label: 'Container Discount', value: `${Math.round(FULL_CONTAINER_DISCOUNT * 100)}% off full container`, icon: '📦' },
            ].map(item => (
              <div key={item.label} className="p-5 rounded-xl border border-border bg-muted/20 text-center">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Why this stone for this country */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4">Why Indian {categoryLabel} for {country.name}?</h2>
            <div className="space-y-3">
              {[
                `${country.climateNote}`,
                `Direct-from-quarry pricing eliminates middlemen costs — saving importers 30–50% vs domestic alternatives.`,
                `${country.complianceNote}`,
                `Full container loads of a single variety qualify for a ${Math.round(FULL_CONTAINER_DISCOUNT * 100)}% discount on our published FOB prices.`,
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />{point}
                </div>
              ))}
            </div>
          </div>

          {/* Popular stones */}
          {popularProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2">Most Popular in {country.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">These {categoryLabel.toLowerCase()} varieties are the top choices for {country.name} projects.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularProducts.map(p => {
                  const price = getLowestPrice(p.id);
                  return (
                    <Link key={p.id} to={`/products/${p.id}`} className="group border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-all">
                      {p.image && <img src={p.image} alt={p.name} className="w-full h-36 object-cover" />}
                      <div className="p-3">
                        <p className="text-sm font-medium group-hover:text-accent transition-colors">{p.name}</p>
                        {price && <p className="text-xs text-accent mt-1">From {formatUSD(price)}/ft²</p>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing table */}
          {pricingRows.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2">FOB Pricing — {categoryLabel}</h2>
              <p className="text-sm text-muted-foreground mb-6">Starting prices per sq ft (natural finish, FOB nearest Indian port).</p>
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 px-4 py-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Stone</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium text-center">FOB Price</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium text-center">Full Container</span>
                </div>
                {pricingRows.map((row, i) => (
                  <Link key={row.product.id} to={`/products/${row.product.id}`}
                    className={cn('grid grid-cols-3 px-4 py-3 hover:bg-muted/40 transition-colors', i % 2 === 0 ? 'bg-muted/20' : '')}>
                    <span className="text-sm font-medium">{row.product.name}</span>
                    <span className="text-sm text-center tabular-nums">{formatUSD(row.price!)}/ft²</span>
                    <span className="text-sm text-center tabular-nums text-green-600 dark:text-green-400">{formatUSD(Math.ceil(row.price! * (1 - FULL_CONTAINER_DISCOUNT) * 100) / 100)}/ft²</span>
                  </Link>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-3 text-center">Prices are indicative FOB. Final pricing confirmed upon order. Full container = single stone variety.</p>
            </div>
          )}

          {/* All stones in category */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2">Full {categoryLabel} Collection</h2>
            <p className="text-sm text-muted-foreground mb-6">All {categoryLabel.toLowerCase()} varieties available for export to {country.name}.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categoryProducts.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="group border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-all">
                  {p.image ? <img src={p.image} alt={p.name} className="w-full h-24 object-cover" /> : <div className="w-full h-24 bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">No image</div>}
                  <div className="p-2"><p className="text-[11px] font-medium truncate group-hover:text-accent transition-colors">{p.name}</p></div>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

          {/* CTA */}
          <div className="text-center py-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-3">Export to {country.name}? Let's Talk.</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Get FOB pricing, container specifications, and shipping timeline for your {country.name} project.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 px-8">
                <Link to="/contact#query-form">Request Export Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`https://wa.me/917357923414?text=${encodeURIComponent(`Hi — I'm looking to import Indian ${categoryLabel.toLowerCase()} to ${country.name}. Can you share pricing and container details?`)}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExportToCountry;
