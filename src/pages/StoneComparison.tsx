import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { COMPARISON_PAIRS, generateComparisonIntro } from '@/data/seoPages';
import { products } from '@/data/products';
import { getStoneFinishes, getStoneFormats, getPricingLink, FULL_CONTAINER_DISCOUNT } from '@/data/stoneFormats';
import { getSpecsForStone } from '@/data/technicalSpecs';
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

const StoneComparison = () => {
  const { slug } = useParams<{ slug: string }>();

  const pageData = useMemo(() => {
    if (!slug) return null;
    const pair = COMPARISON_PAIRS.find(p => p.slug === slug);
    if (!pair) return null;
    const productA = products.find(p => p.id === pair.stoneA);
    const productB = products.find(p => p.id === pair.stoneB);
    if (!productA || !productB) return null;
    return { pair, productA, productB };
  }, [slug]);

  if (!pageData) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Comparison Not Found</h1>
          <Button asChild><Link to="/products">Browse All Products</Link></Button>
        </div>
      </PageTransition>
    );
  }

  const { pair, productA, productB } = pageData;
  const specsA = getSpecsForStone(productA.id, productA.category);
  const specsB = getSpecsForStone(productB.id, productB.category);
  const finishesA = getStoneFinishes(productA.id, productA.category);
  const finishesB = getStoneFinishes(productB.id, productB.category);
  const formatsA = getStoneFormats(productA.id, productA.category);
  const formatsB = getStoneFormats(productB.id, productB.category);
  const priceA = getLowestPrice(productA.id);
  const priceB = getLowestPrice(productB.id);
  const intro = generateComparisonIntro(productA, productB, pair.context);
  const siteUrl = 'https://roopstoneimpex.in';
  const pageUrl = `${siteUrl}/compare/${slug}`;
  const catA = productA.category.charAt(0).toUpperCase() + productA.category.slice(1);
  const catB = productB.category.charAt(0).toUpperCase() + productB.category.slice(1);

  const comparisonRows = [
    { label: 'Stone Type', a: catA, b: catB },
    { label: 'Color Tone', a: productA.properties[0] || '—', b: productB.properties[0] || '—' },
    { label: 'Best For', a: productA.usage.split(',')[0], b: productB.usage.split(',')[0] },
    { label: 'Compressive Strength', a: `${specsA.compressiveStrength} MPa`, b: `${specsB.compressiveStrength} MPa` },
    { label: 'Water Absorption', a: `${specsA.waterAbsorption}%`, b: `${specsB.waterAbsorption}%` },
    { label: 'Mohs Hardness', a: specsA.mohsHardness, b: specsB.mohsHardness },
    { label: 'Frost Resistant', a: specsA.frostResistant ? '✓ Yes' : '✗ No', b: specsB.frostResistant ? '✓ Yes' : '✗ No' },
    { label: 'Slip Resistance', a: specsA.slipResistance, b: specsB.slipResistance },
    { label: 'Weather Resistance', a: specsA.weatherResistance, b: specsB.weatherResistance },
    { label: 'Available Finishes', a: finishesA.length.toString(), b: finishesB.length.toString() },
    { label: 'Available Formats', a: formatsA.length.toString(), b: formatsB.length.toString() },
    { label: 'Starting Price (FOB)', a: priceA ? `${formatUSD(priceA)}/ft²` : 'Contact us', b: priceB ? `${formatUSD(priceB)}/ft²` : 'Contact us' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `Which is better, ${productA.name} or ${productB.name}?`, acceptedAnswer: { '@type': 'Answer', text: pair.verdict } },
      { '@type': 'Question', name: `Is ${productA.name} more expensive than ${productB.name}?`, acceptedAnswer: { '@type': 'Answer', text: priceA && priceB ? `${productA.name} starts at ${formatUSD(priceA)}/sq ft while ${productB.name} starts at ${formatUSD(priceB)}/sq ft (FOB, natural finish). Full container orders receive a ${Math.round(FULL_CONTAINER_DISCOUNT * 100)}% discount.` : `Contact us for current pricing on both options.` } },
      { '@type': 'Question', name: `Can I get samples of both ${productA.name} and ${productB.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Yes, Roop Stone Impex provides free samples of both stones. WhatsApp us at +91 7357923414 or use the contact form to request samples delivered to your door.` } },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={`${productA.name} vs ${productB.name} — Comparison for ${pair.context}`}
        description={`${productA.name} vs ${productB.name}: detailed comparison for ${pair.context}. Compare pricing, durability, finishes, and specs. ${pair.verdict}`}
        keywords={`${productA.name} vs ${productB.name}, ${productA.category} vs ${productB.category}, ${pair.context} stone comparison, Indian natural stone comparison`}
        url={pageUrl}
        structuredData={faqSchema}
        breadcrumbs={[
          { name: 'Home', url: siteUrl }, { name: 'Products', url: `${siteUrl}/products` },
          { name: `${productA.name} vs ${productB.name}`, url: pageUrl },
        ]}
      />

      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-3 block">Stone Comparison · {pair.context}</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{productA.name} <span className="text-accent">vs</span> {productB.name}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{intro}</p>
          </motion.div>

          {/* Side-by-side images */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {[productA, productB].map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="group border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-all">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-48 md:h-64 object-cover" />}
                <div className="p-4 text-center">
                  <p className="font-semibold group-hover:text-accent transition-colors">{p.name}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-1">{p.category}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Head-to-Head Comparison</h2>
            <div className="border border-border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-muted/50">
                <div className="px-4 py-3 text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Feature</div>
                <div className="px-4 py-3 text-xs tracking-[0.2em] uppercase text-accent font-medium text-center">{productA.name}</div>
                <div className="px-4 py-3 text-xs tracking-[0.2em] uppercase text-accent font-medium text-center">{productB.name}</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div key={row.label} className={cn('grid grid-cols-3', i % 2 === 0 ? 'bg-muted/20' : '')}>
                  <div className="px-4 py-3 text-sm text-muted-foreground">{row.label}</div>
                  <div className="px-4 py-3 text-sm font-medium text-center">{row.a}</div>
                  <div className="px-4 py-3 text-sm font-medium text-center">{row.b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict */}
          <div className="max-w-2xl mx-auto mb-16 p-6 rounded-xl border border-accent/30 bg-accent/5">
            <h2 className="text-xl font-bold mb-3">Our Recommendation</h2>
            <p className="text-muted-foreground leading-relaxed">{pair.verdict}</p>
            <p className="text-sm text-muted-foreground mt-3">Not sure? Request free samples of both stones and see them in your own space before deciding.</p>
          </div>

          {/* CTA */}
          <div className="text-center py-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-3">Need help choosing?</h2>
            <p className="text-muted-foreground mb-6">We'll send you free samples of both stones. Direct from our quarry.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 px-8">
                <Link to="/contact#query-form">Request Free Samples <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`https://wa.me/917357923414?text=${encodeURIComponent(`Hi — I'm comparing ${productA.name} vs ${productB.name} for a ${pair.context} project. Can you send samples of both?`)}`} target="_blank" rel="noopener noreferrer">
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

export default StoneComparison;
