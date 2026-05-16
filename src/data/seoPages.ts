// ============================================================
// Programmatic SEO — Page Data Generator
// Generates 200+ unique landing pages from product data
// ============================================================

import { products, type Product } from './products';

// ── Application Definitions ────────────────────────────────
export interface Application {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  benefits: string[];          // Why this application matters
  idealProperties: string[];   // What stone properties matter
  categories: string[];        // Which stone categories work
  relatedFormats: string[];    // Which formats are relevant
}

export const APPLICATIONS: Application[] = [
  {
    slug: 'patio-paving',
    name: 'Patio Paving',
    shortName: 'Patios',
    description: 'Transform outdoor living spaces with durable, weather-resistant natural stone patio paving that adds beauty and value to any home.',
    benefits: ['Weather resistant for year-round outdoor use', 'Natural slip resistance in wet conditions', 'Increases property value by up to 15%', 'Low maintenance with proper sealing'],
    idealProperties: ['Frost resistant', 'Slip resistant', 'Durable', 'Weather proof'],
    categories: ['sandstone', 'limestone', 'quartzite', 'slate'],
    relatedFormats: ['pavers', 'tiles', 'circles'],
  },
  {
    slug: 'driveway',
    name: 'Driveway Paving',
    shortName: 'Driveways',
    description: 'Create a stunning first impression with natural stone driveways that withstand heavy vehicle traffic while maintaining their beauty for decades.',
    benefits: ['Withstands heavy vehicle loads', 'Excellent drainage properties', 'Decades-long lifespan', 'Superior kerb appeal'],
    idealProperties: ['High compressive strength', 'Slip resistant', 'Dense', 'Frost resistant'],
    categories: ['sandstone', 'limestone', 'quartzite'],
    relatedFormats: ['pavers', 'cobbles', 'tiles'],
  },
  {
    slug: 'wall-cladding',
    name: 'Wall Cladding',
    shortName: 'Wall Cladding',
    description: 'Elevate interior and exterior walls with premium natural stone cladding that adds texture, depth, and timeless character to any surface.',
    benefits: ['Transforms plain walls into architectural features', 'Excellent thermal insulation properties', 'Fire resistant and non-combustible', 'Available in stacked, ledger, and veneer formats'],
    idealProperties: ['Lightweight options available', 'Varied textures', 'Easy to install', 'Durable'],
    categories: ['quartzite', 'sandstone', 'slate', 'marble'],
    relatedFormats: ['ledger', 'stacked', 'thin-veneer', 'tiles'],
  },
  {
    slug: 'flooring',
    name: 'Interior Flooring',
    shortName: 'Flooring',
    description: 'Achieve timeless elegance with natural stone flooring that brings warmth, durability, and sophistication to living rooms, hallways, and commercial spaces.',
    benefits: ['Naturally cool underfoot — ideal for warm climates', 'Compatible with underfloor heating', 'Extremely durable for high-traffic areas', 'Each tile is naturally unique'],
    idealProperties: ['Smooth finish available', 'High density', 'Scratch resistant', 'Easy to clean'],
    categories: ['limestone', 'marble', 'quartzite', 'sandstone', 'slate'],
    relatedFormats: ['tiles', 'slabs'],
  },
  {
    slug: 'pool-surround',
    name: 'Pool Surrounds & Copings',
    shortName: 'Pool Surrounds',
    description: 'Design safe, beautiful pool areas with slip-resistant natural stone copings and surrounds that stay cool underfoot even in direct sunlight.',
    benefits: ['Naturally slip-resistant when wet', 'Stays cooler than concrete in sunlight', 'Resistant to chlorine and salt water', 'Bullnose edges available for safety'],
    idealProperties: ['Slip resistant', 'Low water absorption', 'Cool underfoot', 'Salt resistant'],
    categories: ['sandstone', 'limestone', 'quartzite'],
    relatedFormats: ['copings', 'pavers', 'tiles'],
  },
  {
    slug: 'garden-path',
    name: 'Garden Paths & Walkways',
    shortName: 'Garden Paths',
    description: 'Create charming garden pathways with natural stone that blends seamlessly with landscaping and withstands weather year after year.',
    benefits: ['Natural aesthetic complements any garden', 'Excellent drainage between joints', 'Moss and lichen add character over time', 'Available in stepping stone and crazy paving styles'],
    idealProperties: ['Weather resistant', 'Natural texture', 'Slip resistant', 'Durable'],
    categories: ['sandstone', 'limestone', 'slate', 'quartzite'],
    relatedFormats: ['pavers', 'cobbles', 'tiles'],
  },
  {
    slug: 'roofing',
    name: 'Natural Stone Roofing',
    shortName: 'Roofing',
    description: 'Crown your building with natural slate roofing tiles that offer unmatched longevity, fire resistance, and classic architectural beauty.',
    benefits: ['100+ year lifespan with proper installation', 'Class A fire rating — non-combustible', 'Naturally waterproof', 'Increases property value significantly'],
    idealProperties: ['Very low water absorption', 'Lightweight per tile', 'Frost resistant', 'Cleavable into thin sheets'],
    categories: ['slate'],
    relatedFormats: ['roofing', 'tiles'],
  },
  {
    slug: 'countertop',
    name: 'Kitchen & Bath Countertops',
    shortName: 'Countertops',
    description: 'Craft stunning kitchen and bathroom countertops from natural stone that combines beauty with the durability needed for daily use.',
    benefits: ['Heat resistant — safe for hot pots and pans', 'Unique natural patterns in every slab', 'Extremely durable work surface', 'Adds significant resale value'],
    idealProperties: ['Hard surface', 'Low porosity', 'Scratch resistant', 'Polishable'],
    categories: ['quartzite', 'marble', 'limestone'],
    relatedFormats: ['slabs', 'countertops'],
  },
  {
    slug: 'fireplace',
    name: 'Fireplace Surrounds',
    shortName: 'Fireplaces',
    description: 'Create a stunning focal point with natural stone fireplace surrounds that bring warmth, texture, and dramatic visual impact to any room.',
    benefits: ['Naturally fire-resistant and heat-proof', 'Creates a premium focal point', 'Stacked stone and ledger panels for easy install', 'Retains and radiates warmth'],
    idealProperties: ['Fire resistant', 'Heat tolerant', 'Dramatic texture', 'Easy to install'],
    categories: ['quartzite', 'slate', 'sandstone'],
    relatedFormats: ['ledger', 'stacked', 'thin-veneer', 'corners'],
  },
  {
    slug: 'facade',
    name: 'Building Facades & Exterior Cladding',
    shortName: 'Facades',
    description: 'Make a lasting architectural statement with natural stone facade cladding that protects and beautifies commercial and residential buildings.',
    benefits: ['Superior weather protection for structures', 'Dramatic architectural presence', 'Ventilated facade systems available', 'Low lifetime maintenance cost'],
    idealProperties: ['Weather resistant', 'UV stable', 'Strong', 'Lightweight options'],
    categories: ['sandstone', 'quartzite', 'limestone', 'marble'],
    relatedFormats: ['tiles', 'ledger', 'stacked', 'thin-veneer'],
  },
  {
    slug: 'landscape',
    name: 'Landscaping & Retaining Walls',
    shortName: 'Landscaping',
    description: 'Build beautiful, functional landscapes with natural stone retaining walls, edging, and garden features that stand the test of time.',
    benefits: ['Natural integration with outdoor environments', 'Structural strength for retaining walls', 'Versatile — walls, edging, planters, features', 'Sustainable and eco-friendly material'],
    idealProperties: ['Strong', 'Weather resistant', 'Natural look', 'Stackable'],
    categories: ['sandstone', 'limestone', 'quartzite', 'slate'],
    relatedFormats: ['walling', 'cobbles', 'pavers', 'copings'],
  },
  {
    slug: 'bathroom',
    name: 'Bathroom Walls & Floors',
    shortName: 'Bathrooms',
    description: 'Design spa-like bathrooms with natural stone tiles and slabs that bring luxury, warmth, and a sense of tranquility to wet areas.',
    benefits: ['Creates a spa-like luxury atmosphere', 'Naturally anti-bacterial surface', 'Compatible with heated flooring systems', 'Water-resistant with proper sealing'],
    idealProperties: ['Low water absorption', 'Slip resistant', 'Easy to seal', 'Elegant'],
    categories: ['marble', 'limestone', 'slate', 'quartzite'],
    relatedFormats: ['tiles', 'slabs', 'mosaics'],
  },
  {
    slug: 'commercial-flooring',
    name: 'Commercial & High-Traffic Flooring',
    shortName: 'Commercial Flooring',
    description: 'Specify natural stone flooring for commercial projects that demands exceptional durability, low maintenance, and professional aesthetics.',
    benefits: ['Withstands millions of footfall cycles', 'Fire-rated for commercial compliance', 'Low lifetime maintenance cost vs alternatives', 'Premium appearance for hotels, lobbies, retail'],
    idealProperties: ['Extremely hard', 'Scratch resistant', 'Low maintenance', 'Calibrated thickness'],
    categories: ['limestone', 'quartzite', 'marble'],
    relatedFormats: ['tiles', 'slabs'],
  },
  {
    slug: 'step-treads-copings',
    name: 'Steps, Treads & Copings',
    shortName: 'Steps & Copings',
    description: 'Complete your project with precision-cut natural stone step treads, wall copings, and pier caps that combine safety with elegant design.',
    benefits: ['Bullnose and pencil-round edge profiles', 'Anti-slip textures for wet conditions', 'Matching copings for wall finishing', 'Custom lengths available to order'],
    idealProperties: ['Strong', 'Slip resistant', 'Precision cut', 'Weather resistant'],
    categories: ['sandstone', 'limestone', 'quartzite'],
    relatedFormats: ['step-treads', 'copings'],
  },
];

// ── Export Country Definitions ──────────────────────────────
export interface ExportCountry {
  slug: string;
  name: string;
  flag: string;
  nearestPort: string;
  transitDays: string;
  popularCategories: string[];
  popularStoneIds: string[];
  climateNote: string;
  complianceNote: string;
  currencyCode: string;
}

export const EXPORT_COUNTRIES: ExportCountry[] = [
  {
    slug: 'usa', name: 'United States', flag: '🇺🇸',
    nearestPort: 'Mundra / Kandla → New York / Houston / Los Angeles',
    transitDays: '25–35 days',
    popularCategories: ['quartzite', 'sandstone', 'slate', 'marble'],
    popularStoneIds: ['q2', 'q3', 'q7', 's4', 's14', 'sl4', 'sl11'],
    climateNote: 'Frost-resistant stones are essential for northern states. Southern regions benefit from heat-resistant, cool-underfoot options.',
    complianceNote: 'All stones meet ASTM C615 (granite/quartzite), C616 (sandstone), C568 (limestone), and C629 (slate) standards.',
    currencyCode: 'USD',
  },
  {
    slug: 'uk', name: 'United Kingdom', flag: '🇬🇧',
    nearestPort: 'Mundra / Kandla → Felixstowe / Southampton',
    transitDays: '20–28 days',
    popularCategories: ['sandstone', 'limestone', 'slate', 'quartzite'],
    popularStoneIds: ['s4', 's14', 's18', 's6', 'l2', 'sl2', 'sl11'],
    climateNote: 'UK climate demands frost-resistant, low-absorption stones. Riven finishes provide excellent grip in wet conditions year-round.',
    complianceNote: 'All paving meets BS EN 1341 (slabs), BS EN 1342 (setts/cobbles), and BS 7533 installation standards.',
    currencyCode: 'GBP',
  },
  {
    slug: 'australia', name: 'Australia', flag: '🇦🇺',
    nearestPort: 'Mundra / Kandla → Melbourne / Sydney / Brisbane',
    transitDays: '18–25 days',
    popularCategories: ['sandstone', 'quartzite', 'limestone'],
    popularStoneIds: ['s1', 's2', 's7', 'q2', 'q6', 'l3'],
    climateNote: 'Australian heat requires stones that stay cool underfoot. UV stability and salt resistance are critical for coastal projects.',
    complianceNote: 'Stones comply with AS/NZS 4456 for dimensional tolerance and AS 4586 for slip resistance classification.',
    currencyCode: 'AUD',
  },
  {
    slug: 'canada', name: 'Canada', flag: '🇨🇦',
    nearestPort: 'Mundra / Kandla → Montreal / Vancouver',
    transitDays: '28–38 days',
    popularCategories: ['quartzite', 'slate', 'sandstone'],
    popularStoneIds: ['q2', 'q8', 'q7', 'sl4', 'sl3', 's4'],
    climateNote: 'Extreme freeze-thaw cycles demand very low water absorption (<1%) and proven frost resistance. Quartzite and slate excel here.',
    complianceNote: 'All stones meet CSA A231.1 for natural stone and Canadian building code requirements for exterior applications.',
    currencyCode: 'CAD',
  },
  {
    slug: 'uae', name: 'United Arab Emirates', flag: '🇦🇪',
    nearestPort: 'Mundra / Kandla → Jebel Ali, Dubai',
    transitDays: '5–8 days',
    popularCategories: ['marble', 'limestone', 'sandstone'],
    popularStoneIds: ['l4', 'l3', 's8', 's9', 'mm1'],
    climateNote: 'Extreme heat requires stones that stay cool. Light-colored limestones and sandstones reflect heat effectively. Salt resistance is vital for coastal projects.',
    complianceNote: 'Stones meet Dubai Municipality and Abu Dhabi QCC specifications for building materials.',
    currencyCode: 'AED',
  },
  {
    slug: 'germany', name: 'Germany', flag: '🇩🇪',
    nearestPort: 'Mundra / Kandla → Hamburg / Bremerhaven',
    transitDays: '22–30 days',
    popularCategories: ['quartzite', 'sandstone', 'slate'],
    popularStoneIds: ['q4', 'q2', 's4', 's10', 'sl6'],
    climateNote: 'Cold winters require frost-proof stones with low absorption. German buyers value calibrated thickness and tight tolerances.',
    complianceNote: 'All stones comply with DIN EN 12057/12058 and CE marking requirements for the European market.',
    currencyCode: 'EUR',
  },
  {
    slug: 'france', name: 'France', flag: '🇫🇷',
    nearestPort: 'Mundra / Kandla → Marseille / Le Havre',
    transitDays: '18–26 days',
    popularCategories: ['limestone', 'sandstone', 'marble'],
    popularStoneIds: ['l3', 'l4', 's6', 's8', 'l7'],
    climateNote: 'Mediterranean south favors warm-toned limestones. Northern regions need frost-resistant options. French design sensibility values subtle, natural finishes.',
    complianceNote: 'Stones meet NF EN standards and CE marking requirements. CSTB certification available on request.',
    currencyCode: 'EUR',
  },
  {
    slug: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦',
    nearestPort: 'Mundra / Kandla → Jeddah / Dammam',
    transitDays: '6–10 days',
    popularCategories: ['marble', 'limestone', 'sandstone'],
    popularStoneIds: ['mm1', 'l4', 'l3', 's8', 's9'],
    climateNote: 'Desert heat and sandstorms demand extremely hard, low-maintenance surfaces. Light colors are preferred to minimize heat absorption.',
    complianceNote: 'Stones meet SASO standards and Saudi Building Code (SBC) requirements.',
    currencyCode: 'SAR',
  },
  {
    slug: 'south-africa', name: 'South Africa', flag: '🇿🇦',
    nearestPort: 'Mundra / Kandla → Durban / Cape Town',
    transitDays: '14–20 days',
    popularCategories: ['sandstone', 'quartzite', 'slate'],
    popularStoneIds: ['s2', 's14', 'q6', 'q9', 'sl5'],
    climateNote: 'Varied climate zones — coastal areas need salt-resistant stone, Highveld needs frost resistance, and all regions benefit from UV-stable options.',
    complianceNote: 'Stones comply with SANS standards for natural stone products.',
    currencyCode: 'ZAR',
  },
  {
    slug: 'italy', name: 'Italy', flag: '🇮🇹',
    nearestPort: 'Mundra / Kandla → Genoa / Livorno',
    transitDays: '16–24 days',
    popularCategories: ['marble', 'quartzite', 'limestone'],
    popularStoneIds: ['q4', 'q2', 'l3', 'l7'],
    climateNote: 'Italy — the heartland of stone — values premium quality and unique color variants. Northern Italy needs frost resistance; southern regions favor cool-underfoot options.',
    complianceNote: 'All stones meet UNI EN standards and carry CE marking for the European market.',
    currencyCode: 'EUR',
  },
];

// ── Comparison Pairs ───────────────────────────────────────
export interface ComparisonPair {
  slug: string;
  stoneA: string;  // product ID
  stoneB: string;  // product ID
  context: string;  // e.g. "paving", "flooring", "cladding"
  verdict: string;  // Brief recommendation
}

// Helper to build slug from two product names
function cSlug(a: string, b: string): string {
  return `${a}-vs-${b}`;
}

export const COMPARISON_PAIRS: ComparisonPair[] = [
  // Sandstone vs Sandstone
  { slug: cSlug('kandla-grey', 'raj-green-sandstone'), stoneA: 's4', stoneB: 's14', context: 'patio paving', verdict: 'Kandla Grey for modern gardens; Raj Green for traditional, natural landscapes.' },
  { slug: cSlug('autumn-brown', 'raveena-sandstone'), stoneA: 's18', stoneB: 's17', context: 'garden paving', verdict: 'Autumn Brown for warmer tones; Raveena for multi-tonal depth and character.' },
  { slug: cSlug('buff', 'dholpur-beige-sandstone'), stoneA: 's6', stoneB: 's8', context: 'patio and walling', verdict: 'Buff for a clean contemporary look; Dholpur Beige for a softer, warmer aesthetic.' },
  { slug: cSlug('teakwood', 'rainbow-sandstone'), stoneA: 's1', stoneB: 's2', context: 'feature walls', verdict: 'Teakwood for subtle wood-grain elegance; Rainbow for bold, artistic statement pieces.' },
  { slug: cSlug('agra-red', 'heritage-pink-sandstone'), stoneA: 's5', stoneB: 's11', context: 'heritage projects', verdict: 'Agra Red for deep, regal red tones; Heritage Pink for softer, palace-inspired warmth.' },
  { slug: cSlug('monsoon-black', 'chocolate-sandstone'), stoneA: 's12', stoneB: 's3', context: 'modern patios', verdict: 'Monsoon Black for dramatic contemporary contrast; Chocolate for rich, earthy warmth.' },
  { slug: cSlug('gwalior-mint', 'raj-green-sandstone'), stoneA: 's10', stoneB: 's14', context: 'garden paving', verdict: 'Gwalior Mint for a fresh, unique green; Raj Green for a classic, time-tested choice.' },
  { slug: cSlug('fossil', 'lalitpur-yellow-sandstone'), stoneA: 's15', stoneB: 's16', context: 'feature paving', verdict: 'Fossil for unique ancient textures; Lalitpur Yellow for vibrant, sunny warmth.' },

  // Limestone vs Limestone
  { slug: cSlug('kota-blue', 'kadappa-black-limestone'), stoneA: 'l2', stoneB: 'l5', context: 'interior flooring', verdict: 'Kota Blue for cool, classic elegance; Kadappa Black for dramatic, sophisticated contrast.' },
  { slug: cSlug('kota-brown', 'kota-blue-limestone'), stoneA: 'l1', stoneB: 'l2', context: 'commercial flooring', verdict: 'Kota Brown for warm neutrality; Kota Blue for cooler, more refined tones.' },
  { slug: cSlug('jaisalmer-yellow', 'ita-gold-limestone'), stoneA: 'l4', stoneB: 'l3', context: 'exterior facades', verdict: 'Jaisalmer Yellow for heritage golden warmth; Ita Gold for a more luxurious, amber glow.' },
  { slug: cSlug('pearl-gold', 'shabad-yellow-limestone'), stoneA: 'l7', stoneB: 'l8', context: 'interior walls', verdict: 'Pearl Gold for premium pearlescent elegance; Shabad Yellow for cheerful, natural warmth.' },

  // Quartzite vs Quartzite
  { slug: cSlug('silver-shine', 'silver-grey-quartzite'), stoneA: 'q2', stoneB: 'q3', context: 'wall cladding', verdict: 'Silver Shine for metallic glamour; Silver Grey for versatile modern neutrality.' },
  { slug: cSlug('deoli-green', 'ocean-green-quartzite'), stoneA: 'q4', stoneB: 'q9', context: 'outdoor paving', verdict: 'Deoli Green for rich emerald luxury; Ocean Green for calming, natural serenity.' },
  { slug: cSlug('copper', 'golden-quartzite'), stoneA: 'q7', stoneB: 'q6', context: 'feature walls', verdict: 'Copper for dramatic reddish-brown warmth; Golden for inviting, sunlit elegance.' },
  { slug: cSlug('himachal-white', 'silver-shine-quartzite'), stoneA: 'q8', stoneB: 'q2', context: 'interior design', verdict: 'Himachal White for pristine minimalism; Silver Shine for shimmering sophistication.' },

  // Slate vs Slate
  { slug: cSlug('jak-black', 'california-gold-slate'), stoneA: 'sl4', stoneB: 'sl11', context: 'flooring and cladding', verdict: 'Jak Black for sleek modern drama; California Gold for warm, inviting sunshine.' },
  { slug: cSlug('indian-autumn', 'kund-multi-slate'), stoneA: 'sl2', stoneB: 'sl5', context: 'paving and walls', verdict: 'Indian Autumn for warm, cohesive tones; Kund Multi for vibrant, eye-catching variety.' },

  // Cross-category — the big money keywords
  { slug: cSlug('sandstone', 'limestone-paving'), stoneA: 's4', stoneB: 'l2', context: 'patio paving', verdict: 'Sandstone offers warmer colours and natural riven texture; limestone provides a smoother, more contemporary finish.' },
  { slug: cSlug('quartzite', 'sandstone-cladding'), stoneA: 'q2', stoneB: 's4', context: 'wall cladding', verdict: 'Quartzite for premium shimmer and extreme durability; sandstone for classic, rustic natural charm.' },
  { slug: cSlug('slate', 'sandstone-paving'), stoneA: 'sl4', stoneB: 's4', context: 'outdoor paving', verdict: 'Slate for ultra-low maintenance and sleek texture; sandstone for warmer tones and classic aesthetics.' },
  { slug: cSlug('quartzite', 'limestone-flooring'), stoneA: 'q3', stoneB: 'l3', context: 'interior flooring', verdict: 'Quartzite for extreme hardness and sparkle; limestone for subtle, classic elegance.' },
  { slug: cSlug('marble', 'quartzite-countertops'), stoneA: 'me1', stoneB: 'q7', context: 'kitchen countertops', verdict: 'Marble for timeless luxury and iconic veining; quartzite for superior scratch and heat resistance.' },
  { slug: cSlug('slate', 'quartzite-cladding'), stoneA: 'sl4', stoneB: 'q2', context: 'wall cladding', verdict: 'Slate for layered natural texture; quartzite for sparkling metallic lustre.' },
];

// ── Slug Generators ────────────────────────────────────────
// Generate all stone-for-application page slugs

export interface SEOPageSlug {
  slug: string;
  productId: string;
  product: Product;
}

export function generateApplicationPageSlugs(application: Application): SEOPageSlug[] {
  const relevantProducts = products.filter(p =>
    application.categories.includes(p.category) && p.category !== 'mosaic'
  );

  return relevantProducts.map(p => {
    const stoneName = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return {
      slug: `${stoneName}-for-${application.slug}`,
      productId: p.id,
      product: p,
    };
  });
}

// Get all application page slugs
export function getAllApplicationSlugs(): Array<SEOPageSlug & { application: Application }> {
  const all: Array<SEOPageSlug & { application: Application }> = [];
  for (const app of APPLICATIONS) {
    const slugs = generateApplicationPageSlugs(app);
    for (const s of slugs) {
      all.push({ ...s, application: app });
    }
  }
  return all;
}

// Get all comparison slugs with resolved products
export function getAllComparisonSlugs() {
  return COMPARISON_PAIRS.map(pair => {
    const productA = products.find(p => p.id === pair.stoneA);
    const productB = products.find(p => p.id === pair.stoneB);
    return { ...pair, productA, productB };
  }).filter(p => p.productA && p.productB);
}

// Get all export page slugs
export function getAllExportSlugs() {
  const all: Array<{ slug: string; category: string; categoryLabel: string; country: ExportCountry }> = [];
  for (const country of EXPORT_COUNTRIES) {
    for (const cat of country.popularCategories) {
      const label = cat.charAt(0).toUpperCase() + cat.slice(1);
      all.push({
        slug: `${cat}-to-${country.slug}`,
        category: cat,
        categoryLabel: label,
        country,
      });
    }
  }
  return all;
}

// ── Content Generators ─────────────────────────────────────

export function generateApplicationIntro(product: Product, app: Application): string {
  const cat = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  return `${product.name} is an exceptional choice for ${app.name.toLowerCase()}. As a premium Indian ${cat.toLowerCase()}, it combines ${product.properties.slice(0, 2).join(' and ').toLowerCase()} qualities with the durability needed for ${app.shortName.toLowerCase()} applications. ${product.description.split('.')[0]}, making it naturally suited for ${app.name.toLowerCase()} projects where both beauty and performance are non-negotiable.`;
}

export function generateComparisonIntro(pA: Product, pB: Product, context: string): string {
  return `Choosing between ${pA.name} and ${pB.name} for your ${context} project? Both are premium Indian natural stones, but they serve different design visions. ${pA.name} is known for its ${pA.properties.slice(0, 2).join(', ').toLowerCase()} characteristics, while ${pB.name} stands out with its ${pB.properties.slice(0, 2).join(', ').toLowerCase()} appeal. This comparison breaks down everything — from pricing and durability to available finishes — so you can make the right choice for your project.`;
}

export function generateExportIntro(categoryLabel: string, country: ExportCountry): string {
  return `Roop Stone Impex is a leading direct-from-quarry exporter of premium Indian ${categoryLabel.toLowerCase()} to ${country.name}. With our own manufacturing facility in Rajasthan and established shipping routes via ${country.nearestPort}, we deliver container-loads of hand-selected natural stone in ${country.transitDays}. ${country.climateNote}`;
}
