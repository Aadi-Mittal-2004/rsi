// ============================================================
// Stone Finishes & Available Formats — Per Stone Type
// Maps product IDs → available finishes + product formats
// ============================================================

export interface StoneFinish {
  id: string;
  label: string;
  description: string;
}

export interface StoneFormat {
  id: string;
  label: string;
  icon: string; // emoji icon
  description: string;
}

// ── Master Finish Definitions ──────────────────────────────
export const ALL_FINISHES: Record<string, StoneFinish> = {
  'natural':     { id: 'natural',     label: 'Natural / Cleft', description: 'Raw split surface with authentic rustic texture' },
  'honed':       { id: 'honed',       label: 'Honed',           description: 'Smooth matte finish, slip-resistant & low-maintenance' },
  'polished':    { id: 'polished',    label: 'Polished',        description: 'High-gloss reflective surface showcasing color depth' },
  'sandblasted': { id: 'sandblasted', label: 'Sandblasted',     description: 'Textured non-slip surface via high-pressure sand' },
  'brushed':     { id: 'brushed',     label: 'Brushed / Antique', description: 'Worn-down look with a soft, aged character' },
  'tumbled':     { id: 'tumbled',     label: 'Tumbled',         description: 'Weathered edges with a rustic, aged appearance' },
  'flamed':      { id: 'flamed',      label: 'Flamed',          description: 'Heat-treated rough surface for extreme slip resistance' },
  'leather':     { id: 'leather',     label: 'Leathered',       description: 'Textured satin surface with a tactile feel' },
};

// ── Master Format Definitions ──────────────────────────────
export const ALL_FORMATS: Record<string, StoneFormat> = {
  'tiles':          { id: 'tiles',          label: 'Tiles',              icon: '▦', description: 'Standard cut tiles in various sizes' },
  'slabs':          { id: 'slabs',          label: 'Slabs',              icon: '▬', description: 'Large-format slabs for countertops & features' },
  'pavers':         { id: 'pavers',         label: 'Pavers',             icon: '▩', description: 'Thick-cut stones for outdoor paving' },
  'cobbles':        { id: 'cobbles',        label: 'Cobbles & Setts',    icon: '⬮', description: 'Small blocks for pathways & edging' },
  'circles':        { id: 'circles',        label: 'Paving Circles',     icon: '◎', description: 'Circle kits for patio centrepieces' },
  'step-treads':    { id: 'step-treads',    label: 'Step Treads',        icon: '▤', description: 'Bullnose-edged treads for stairs' },
  'copings':        { id: 'copings',        label: 'Copings & Caps',     icon: '⊓', description: 'Wall caps, pier caps & pool copings' },
  'walling':        { id: 'walling',        label: 'Walling Blocks',     icon: '⊞', description: 'Cut blocks for traditional walling' },
  'ledger':         { id: 'ledger',         label: 'Ledger Stone',       icon: '☰', description: '6×24 panels for stacked stone cladding' },
  'stacked':        { id: 'stacked',        label: 'Stacked Stone',      icon: '▥', description: 'Pre-assembled stacked stone veneer panels' },
  'thin-veneer':    { id: 'thin-veneer',    label: 'Thin Stone Veneer',  icon: '◫', description: 'Ultra-thin sheets (1–2mm) for lightweight cladding' },
  'corners':        { id: 'corners',        label: 'Corner Pieces',      icon: '⌐', description: 'L-shaped pieces for seamless outside corners' },
  'roofing':        { id: 'roofing',        label: 'Roofing Tiles',      icon: '⌂', description: 'Split stone tiles for natural roofing' },
  'countertops':    { id: 'countertops',    label: 'Countertop Blanks',  icon: '▭', description: 'Pre-cut blanks for kitchen & bath counters' },
  'mosaics':        { id: 'mosaics',        label: 'Mosaics',            icon: '⿴', description: 'Small-format pieces for decorative patterns' },
  'waterjet':       { id: 'waterjet',       label: 'Waterjet Cut',       icon: '✦', description: 'Precision waterjet patterns & medallions' },
};

// ── Category-level defaults ────────────────────────────────
// These define the baseline finishes & formats for each stone category.
// Individual products can override via the overrides map below.

interface CategoryDefaults {
  finishes: string[];
  formats: string[];
}

const CATEGORY_DEFAULTS: Record<string, CategoryDefaults> = {
  quartzite: {
    finishes: ['natural', 'honed', 'polished', 'sandblasted', 'brushed'],
    formats: ['tiles', 'slabs', 'ledger', 'stacked', 'thin-veneer', 'corners'],
  },
  sandstone: {
    finishes: ['natural', 'honed', 'polished', 'sandblasted', 'brushed', 'tumbled'],
    formats: ['tiles', 'pavers', 'cobbles', 'circles', 'step-treads', 'copings', 'walling', 'ledger'],
  },
  limestone: {
    finishes: ['natural', 'honed', 'polished', 'sandblasted', 'brushed'],
    formats: ['tiles', 'pavers', 'cobbles', 'step-treads', 'copings', 'slabs'],
  },
  slate: {
    finishes: ['natural', 'honed', 'sandblasted', 'brushed'],
    formats: ['tiles', 'pavers', 'cobbles', 'thin-veneer', 'stacked', 'roofing', 'corners'],
  },
  marble: {
    finishes: ['polished', 'honed'],
    formats: ['slabs', 'tiles', 'countertops'],
  },
};

// ── Per-product overrides ──────────────────────────────────
// Only list products that DIFFER from their category defaults.

const PRODUCT_OVERRIDES: Record<string, Partial<CategoryDefaults>> = {
  // Quartzite — Matrix & Forest Fire: natural cleft dominant, no polished
  'q11': { finishes: ['natural', 'honed', 'sandblasted', 'brushed'] },
  'q12': { finishes: ['natural', 'honed', 'sandblasted', 'brushed'] },

  // Sandstone — Monsoon Black: extra formats (waterjet available)
  's12': {
    formats: ['tiles', 'pavers', 'cobbles', 'circles', 'step-treads', 'copings', 'walling', 'ledger', 'waterjet'],
  },
  // Sandstone — Fossil: special stone, limited formats
  's15': {
    formats: ['tiles', 'pavers', 'step-treads', 'copings', 'walling'],
    finishes: ['natural', 'honed', 'brushed'],
  },
  // Sandstone — Dholpur Beige: architectural stone, extra formats
  's8': {
    formats: ['tiles', 'pavers', 'cobbles', 'step-treads', 'copings', 'walling', 'ledger', 'slabs'],
  },
  // Sandstone — Dholpur Pink: same as Dholpur Beige
  's9': {
    formats: ['tiles', 'pavers', 'cobbles', 'step-treads', 'copings', 'walling', 'ledger', 'slabs'],
  },
  // Sandstone — Heritage Pink: architectural/heritage stone
  's11': {
    formats: ['tiles', 'pavers', 'step-treads', 'copings', 'walling', 'slabs'],
  },

  // Limestone — Kadappa Black: polished very popular, extra formats
  'l5': {
    formats: ['tiles', 'pavers', 'cobbles', 'step-treads', 'copings', 'slabs', 'countertops'],
  },
  // Limestone — Kota Brown/Blue: extremely common in tiles/pavers
  'l1': {
    formats: ['tiles', 'pavers', 'cobbles', 'step-treads', 'copings'],
  },
  'l2': {
    formats: ['tiles', 'pavers', 'cobbles', 'step-treads', 'copings'],
  },

  // Slate — Jak Black: also available in waterjet
  'sl4': {
    formats: ['tiles', 'pavers', 'cobbles', 'thin-veneer', 'stacked', 'roofing', 'corners', 'waterjet'],
  },

  // Marble — Exotic: add leather finish, waterjet & mosaics
  'me1': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet', 'mosaics'] },
  'me2': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet', 'mosaics'] },
  'me3': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'me4': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'me5': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'me6': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'me7': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'me8': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops'] },
  'me9': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops'] },
  'me10': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops'] },

  // Marble — Onyx: backlit panels are key format
  'mo1': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'mo2': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'mo3': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'mo4': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'mo5': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'mo6': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },

  // Marble — Makrana: traditional Indian marble, unique formats
  'mm1': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops', 'mosaics'] },
  'mm2': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops'] },
  'mm3': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops'] },
  'mm4': { finishes: ['polished', 'honed'], formats: ['slabs', 'tiles', 'countertops'] },

  // Marble — Cladding: specific cladding formats
  'cs1': { finishes: ['natural', 'honed', 'brushed'], formats: ['tiles', 'ledger', 'stacked', 'thin-veneer', 'corners'] },
  'cs2': { finishes: ['natural', 'honed', 'brushed', 'tumbled'], formats: ['tiles', 'ledger', 'stacked', 'thin-veneer', 'corners'] },
  'cs3': { finishes: ['natural', 'honed', 'brushed'], formats: ['tiles', 'ledger', 'stacked', 'thin-veneer', 'corners'] },
  'cs4': { finishes: ['natural', 'honed', 'brushed'], formats: ['tiles', 'ledger', 'stacked', 'thin-veneer', 'corners'] },
  'cs5': { finishes: ['natural', 'honed', 'brushed', 'tumbled'], formats: ['tiles', 'ledger', 'stacked', 'thin-veneer', 'corners'] },

  // Marble — Imported White: premium finishes
  'mw1': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet', 'mosaics'] },
  'mw2': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
  'mw6': { finishes: ['polished', 'honed', 'leather'], formats: ['slabs', 'tiles', 'countertops', 'waterjet'] },
};

// ── Pricing Data Link Map ──────────────────────────────────
// Maps product IDs to their pricing variety IDs in pricingData.ts
// Only products with pricing data are listed here.

export interface PricingLink {
  type: 'quartzite' | 'sandstone' | 'limestone' | 'slate';
  varietyId: string;
}

export const PRICING_LINKS: Record<string, PricingLink> = {
  // Quartzite
  'q2':  { type: 'quartzite', varietyId: 'silver-shine' },
  'q3':  { type: 'quartzite', varietyId: 'silver-grey' },
  'q4':  { type: 'quartzite', varietyId: 'deoli-green' },
  'q6':  { type: 'quartzite', varietyId: 'golden' },
  'q7':  { type: 'quartzite', varietyId: 'copper' },
  'q8':  { type: 'quartzite', varietyId: 'himachal-white' },
  'q9':  { type: 'quartzite', varietyId: 'ocean-green' },
  'q10': { type: 'quartzite', varietyId: 'zeera-green' },
  'q11': { type: 'quartzite', varietyId: 'forest-fire' },

  // Sandstone
  's1':  { type: 'sandstone', varietyId: 'teakwood' },
  's2':  { type: 'sandstone', varietyId: 'rainbow' },
  's3':  { type: 'sandstone', varietyId: 'chocolate' },
  's4':  { type: 'sandstone', varietyId: 'kandla-grey' },
  's5':  { type: 'sandstone', varietyId: 'agra-red' },
  's6':  { type: 'sandstone', varietyId: 'buff' },
  's7':  { type: 'sandstone', varietyId: 'desert-brown' },
  's8':  { type: 'sandstone', varietyId: 'dholpur-beige-pink' },
  's9':  { type: 'sandstone', varietyId: 'dholpur-beige-pink' },
  's10': { type: 'sandstone', varietyId: 'gwalior-mint' },
  's11': { type: 'sandstone', varietyId: 'heritage-pink' },
  's12': { type: 'sandstone', varietyId: 'monsoon-black' },
  's14': { type: 'sandstone', varietyId: 'raj-green' },
  's15': { type: 'sandstone', varietyId: 'fossil' },
  's16': { type: 'sandstone', varietyId: 'lalitpur-yellow' },
  's17': { type: 'sandstone', varietyId: 'raveena' },
  's18': { type: 'sandstone', varietyId: 'autumn-brown' },

  // Limestone
  'l1':  { type: 'limestone', varietyId: 'kota-brown' },
  'l2':  { type: 'limestone', varietyId: 'kota-blue' },
  'l3':  { type: 'limestone', varietyId: 'ita-gold' },
  'l4':  { type: 'limestone', varietyId: 'jaisalmer-yellow' },
  'l5':  { type: 'limestone', varietyId: 'kadappa-black' },
  'l6':  { type: 'limestone', varietyId: 'kota-mix' },
  'l7':  { type: 'limestone', varietyId: 'pearl-gold' },
  'l8':  { type: 'limestone', varietyId: 'shabad-yellow' },

  // Slate
  'sl0': { type: 'slate', varietyId: 'terra-red' },
  'sl1': { type: 'slate', varietyId: 'chocolate' },
  'sl2': { type: 'slate', varietyId: 'indian-autumn' },
  'sl3': { type: 'slate', varietyId: 'jak-black-rustic' },
  'sl4': { type: 'slate', varietyId: 'jak-black-regular' },
  'sl5': { type: 'slate', varietyId: 'kund-multi-color' },
  'sl6': { type: 'slate', varietyId: 'mac-green-rustic' },
  'sl7': { type: 'slate', varietyId: 'pure-pink' },
  'sl8': { type: 'slate', varietyId: 'raja-red' },
  'sl9': { type: 'slate', varietyId: 'sra-multicolor' },
  'sl10': { type: 'slate', varietyId: 'autumn-rustic' },
  'sl11': { type: 'slate', varietyId: 'california-gold' },
};

// ── Public API ─────────────────────────────────────────────

export function getStoneFinishes(productId: string, category: string): StoneFinish[] {
  const overrides = PRODUCT_OVERRIDES[productId];
  const defaults = CATEGORY_DEFAULTS[category] || CATEGORY_DEFAULTS['marble'];

  const finishIds = overrides?.finishes || defaults.finishes;
  return finishIds.map(id => ALL_FINISHES[id]).filter(Boolean);
}

export function getStoneFormats(productId: string, category: string): StoneFormat[] {
  const overrides = PRODUCT_OVERRIDES[productId];
  const defaults = CATEGORY_DEFAULTS[category] || CATEGORY_DEFAULTS['marble'];

  const formatIds = overrides?.formats || defaults.formats;
  return formatIds.map(id => ALL_FORMATS[id]).filter(Boolean);
}

export function getPricingLink(productId: string): PricingLink | null {
  return PRICING_LINKS[productId] || null;
}

// Full container discount constant
export const FULL_CONTAINER_DISCOUNT = 0.15; // 15% discount for full container of single stone
