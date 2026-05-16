import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { products } from '@/data/products';
import { APPLICATIONS, generateApplicationIntro, generateApplicationPageSlugs, type Application } from '@/data/seoPages';
import { getStoneFinishes, getStoneFormats, getPricingLink, FULL_CONTAINER_DISCOUNT } from '@/data/stoneFormats';
import { getSpecsForStone } from '@/data/technicalSpecs';
import {
  STONE_VARIETIES, SIZE_OPTIONS, FINISH_OPTIONS, calculateFOBPerSqFt, formatUSD,
  SANDSTONE_VARIETIES, SANDSTONE_SIZE_OPTIONS, SANDSTONE_FINISH_OPTIONS, calculateSandstoneFOBPerSqFt,
  LIMESTONE_VARIETIES, LIMESTONE_SIZE_OPTIONS, LIMESTONE_FINISH_OPTIONS, calculateLimestoneFOBPerSqFt,
  SLATE_VARIETIES, SLATE_SIZE_OPTIONS, SLATE_FINISH_OPTIONS, calculateSlateFOBPerSqFt,
} from '@/data/pricingData';
import { cn } from '@/lib/utils';

function getStartingPrice(productId: string): string | null {
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
  const minPrice = calcFn(Math.min(...prices));
  return formatUSD(minPrice);
}

const StoneForApplication = () => {
  const { slug } = useParams<{ slug: string }>();

  const pageData = useMemo(() => {
    if (!slug) return null;
    for (const app of APPLICATIONS) {
      const slugs = generateApplicationPageSlugs(app);
      const match = slugs.find(s => s.slug === slug);
      if (match) return { ...match, application: app };
    }
    return null;
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

  const { product, application } = pageData;
  const finishes = getStoneFinishes(product.id, product.category);
  const formats = getStoneFormats(product.id, product.category);
  const specs = getSpecsForStone(product.id, product.category);
  const intro = generateApplicationIntro(product, application);
  const startPrice = getStartingPrice(product.id);
  const siteUrl = 'https://roopstoneimpex.in';
  const pageUrl = `${siteUrl}/stone/${slug}`;
  const catLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  // Related stones for same application
  const related = useMemo(() => {
    return products
      .filter(p => application.categories.includes(p.category) && p.id !== product.id && p.image)
      .slice(0, 6);
  }, [product.id, application]);

  // Relevant formats for this application
  const relevantFormats = formats.filter(f => application.relatedFormats.includes(f.id));

  // FAQ data
  const faqs = [
    { q: `Is ${product.name} suitable for ${application.name.toLowerCase()}?`, a: `Yes. ${product.name} is an excellent choice for ${application.name.toLowerCase()} due to its ${specs.weatherResistance.toLowerCase()} weather resistance, ${specs.slipResistance} slip resistance rating, and ${specs.porosity.toLowerCase()} porosity. It is ${specs.frostResistant ? 'frost resistant' : 'recommended for indoor use or mild climates'}.` },
    { q: `What finishes are available for ${product.name}?`, a: `${product.name} is available in ${finishes.map(f => f.label).join(', ')} finishes. For ${application.name.toLowerCase()}, we recommend ${finishes[0]?.label || 'Natural'} finish for the best performance.` },
    { q: `How much does ${product.name} cost for ${application.name.toLowerCase()}?`, a: startPrice ? `${product.name} starts from ${startPrice}/sq ft FOB (Free on Board, delivered to nearest Indian port). Full container orders of a single stone variety receive a ${Math.round(FULL_CONTAINER_DISCOUNT * 100)}% discount.` : `Contact us for a custom quote tailored to your ${application.name.toLowerCase()} project. Pricing depends on the format, finish, and quantity required.` },
    { q: `Can ${product.name} be used outdoors?`, a: specs.frostResistant ? `Absolutely. ${product.name} has a water absorption rate of ${specs.waterAbsorption}%, making it highly resistant to frost damage and suitable for outdoor use in all climates.` : `${product.name} is best suited for sheltered or indoor ${application.name.toLowerCase()} applications. For exposed outdoor projects, consider our quartzite or sandstone ranges.` },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: `${product.name} for ${application.name}`,
    description: intro,
    image: product.image ? `${siteUrl}${product.image}` : undefined,
    brand: { '@type': 'Brand', name: 'Roop Stone Impex' },
    manufacturer: { '@type': 'Organization', name: 'Roop Stone Impex', url: siteUrl },
    category: `Natural Stone > ${catLabel} > ${application.name}`,
    ...(startPrice ? { offers: { '@type': 'Offer', priceCurrency: 'USD', price: startPrice.replace('$', ''), availability: 'https://schema.org/InStock' } } : {}),
  };

  return (
    <PageTransition>
      <SEO
        title={`${product.name} for ${application.name} — Premium Indian ${catLabel}`}
        description={`Buy ${product.name} for ${application.name.toLowerCase()}. ${startPrice ? `From ${startPrice}/sq ft FOB.` : ''} Direct from quarry in Rajasthan, India. Available in ${finishes.length} finishes and ${relevantFormats.length}+ formats.`}
        keywords={`${product.name} for ${application.name.toLowerCase()}, ${product.name}, ${application.name.toLowerCase()}, Indian ${product.category}, natural stone ${application.slug}, ${product.category} ${application.slug}`}
        url={pageUrl}
        image={product.image}
        structuredData={productSchema}
        breadcrumbs={[
          { name: 'Home', url: siteUrl }, { name: 'Products', url: `${siteUrl}/products` },
          { name: product.name, url: `${siteUrl}/products/${product.id}` },
          { name: `For ${application.name}`, url: pageUrl },
        ]}
      />

      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link to={`/products/${product.id}`} className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {product.name}
          </Link>

          {/* Hero */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {product.image && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden shadow-lg border border-border">
                <img src={product.image} alt={`${product.name} for ${application.name}`} className="w-full h-auto object-cover max-h-[500px]" />
              </motion.div>
            )}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-2 block">{catLabel} · {application.shortName}</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name} for {application.name}</h1>
              <p className="text-muted-foreground leading-relaxed mb-6">{intro}</p>
              {startPrice && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-foreground">From {startPrice}</span>
                  <span className="text-sm text-muted-foreground">/sq ft FOB</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-semibold">{Math.round(FULL_CONTAINER_DISCOUNT * 100)}% OFF Full Container</span>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-accent text-white hover:bg-accent/90">
                  <Link to="/contact#query-form">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={`/products/${product.id}`}>View Full Product Page</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Why This Stone */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why {product.name} for {application.name}?</h2>
              <ul className="space-y-3">
                {application.benefits.map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />{b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
              <div className="border border-border rounded-lg overflow-hidden">
                {[
                  ['Compressive Strength', `${specs.compressiveStrength} MPa`],
                  ['Water Absorption', `${specs.waterAbsorption}%`],
                  ['Mohs Hardness', specs.mohsHardness],
                  ['Density', `${specs.density} kg/m³`],
                  ['Frost Resistant', specs.frostResistant ? '✓ Yes' : '✗ Not recommended'],
                  ['Slip Resistance', specs.slipResistance],
                  ['Porosity', specs.porosity],
                  ['Weather Resistance', specs.weatherResistance],
                ].map(([label, value], i) => (
                  <div key={label} className={cn('flex justify-between px-4 py-2.5 text-sm', i % 2 === 0 ? 'bg-muted/30' : '')}>
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Finishes & Formats */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Finishes</h2>
              <div className="space-y-2">
                {finishes.map(f => (
                  <div key={f.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <div><p className="text-sm font-medium">{f.label}</p><p className="text-xs text-muted-foreground">{f.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Formats for {application.shortName}</h2>
              <div className="grid grid-cols-2 gap-2">
                {(relevantFormats.length > 0 ? relevantFormats : formats).map(f => (
                  <div key={f.id} className="flex items-center gap-2.5 p-3 rounded-lg border border-border bg-muted/20">
                    <span className="text-lg">{f.icon}</span>
                    <div><p className="text-xs font-medium">{f.label}</p><p className="text-[10px] text-muted-foreground">{f.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <details key={i} className="group border border-border rounded-lg overflow-hidden" open={i === 0}>
                  <summary className="px-5 py-4 cursor-pointer text-sm font-medium hover:bg-muted/30 transition-colors list-none flex items-center justify-between">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
          {/* FAQ Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

          {/* Related Stones */}
          {related.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2">Other Stones for {application.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">Explore more options for your {application.name.toLowerCase()} project.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {related.map(p => {
                  const rSlug = `${p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-for-${application.slug}`;
                  return (
                    <Link key={p.id} to={`/stone/${rSlug}`} className="group border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-all">
                      {p.image && <img src={p.image} alt={p.name} className="w-full h-28 object-cover" />}
                      <div className="p-2.5">
                        <p className="text-xs font-medium truncate group-hover:text-accent transition-colors">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground capitalize">{p.category}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center py-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-3">Ready to order {product.name}?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Get a custom quote for your {application.name.toLowerCase()} project. Direct from our quarry — no middlemen.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 px-8">
                <Link to="/contact#query-form">Request Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`https://wa.me/917357923414?text=${encodeURIComponent(`Hi — I need ${product.name} for a ${application.name.toLowerCase()} project. Can you share pricing and availability?`)}`} target="_blank" rel="noopener noreferrer">
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

export default StoneForApplication;
