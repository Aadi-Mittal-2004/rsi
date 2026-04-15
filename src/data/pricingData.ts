// ============================================================
// International Pricing Data — Quartzite Collection
// All base prices are in INR per square meter (Natural finish)
// ============================================================

export const INR_TO_USD = 89;
export const MARGIN_MULTIPLIER = 1.35; // 35% margin
export const TRANSPORT_INR = 200; // ₹200/sq m to nearest port
export const SQM_TO_SQFT_DIVISOR = 10; // approximate sq m → sq ft

export type FinishType = 'natural' | 'brushed' | 'polished' | 'sandblast';

export interface FinishOption {
  id: FinishType;
  label: string;
  surchargeINR: number; // additional INR per sq m
}

export const FINISH_OPTIONS: FinishOption[] = [
  { id: 'natural', label: 'Natural', surchargeINR: 0 },
  { id: 'brushed', label: 'Brushed', surchargeINR: 250 },
  { id: 'polished', label: 'Polished', surchargeINR: 600 },
  { id: 'sandblast', label: 'Sandblast', surchargeINR: 375 },
];

export type SizeKey = '30x30' | '40x40' | '60x30' | '60x40';

export interface SizeOption {
  id: SizeKey;
  label: string;
  dimensions: string; // e.g. "30cm × 30cm"
}

export const SIZE_OPTIONS: SizeOption[] = [
  { id: '30x30', label: '30×30', dimensions: '30cm × 30cm' },
  { id: '40x40', label: '40×40', dimensions: '40cm × 40cm' },
  { id: '60x30', label: '60×30', dimensions: '60cm × 30cm' },
  { id: '60x40', label: '60×40', dimensions: '60cm × 40cm' },
];

export interface StoneVariety {
  id: string;
  name: string;
  tag?: string; // e.g. "Specialty", "Premium"
  basePricesINR: Record<SizeKey, number>; // INR per sq m, natural finish
}

export const STONE_VARIETIES: StoneVariety[] = [
  {
    id: 'deoli-green',
    name: 'Deoli Green',
    tag: 'Specialty',
    basePricesINR: { '30x30': 400, '40x40': 500, '60x30': 600, '60x40': 650 },
  },
  {
    id: 'silver-shine',
    name: 'Silver Shine',
    basePricesINR: { '30x30': 420, '40x40': 550, '60x30': 600, '60x40': 650 },
  },
  {
    id: 'silver-grey',
    name: 'Silver Grey',
    basePricesINR: { '30x30': 480, '40x40': 580, '60x30': 780, '60x40': 850 },
  },
  {
    id: 'golden',
    name: 'Golden',
    basePricesINR: { '30x30': 520, '40x40': 650, '60x30': 750, '60x40': 900 },
  },
  {
    id: 'copper',
    name: 'Copper',
    tag: 'Premium',
    basePricesINR: { '30x30': 700, '40x40': 900, '60x30': 1200, '60x40': 1300 },
  },
  {
    id: 'himachal-white',
    name: 'Himachal White',
    tag: 'Premium',
    basePricesINR: { '30x30': 1000, '40x40': 1200, '60x30': 1400, '60x40': 1600 },
  },
  {
    id: 'ocean-green',
    name: 'Ocean Green',
    basePricesINR: { '30x30': 600, '40x40': 800, '60x30': 800, '60x40': 900 },
  },
  {
    id: 'zeera-green',
    name: 'Zeera Green',
    basePricesINR: { '30x30': 500, '40x40': 600, '60x30': 800, '60x40': 900 },
  },
  {
    id: 'forest-fire',
    name: 'Forest Fire',
    basePricesINR: { '30x30': 600, '40x40': 700, '60x30': 800, '60x40': 900 },
  },
];

/**
 * Calculate the FOB price per sq ft in USD.
 *
 * Formula:
 *   1. totalINR = baseINR + finishSurcharge + ₹200 transport
 *   2. withMargin = totalINR × 1.35
 *   3. usdPerSqM = withMargin / 89
 *   4. roundedSqM = round up to nearest 0.1  (e.g. 9.12 → 9.2)
 *   5. perSqFt = roundedSqM / 10
 */
export function calculateFOBPerSqFt(
  baseINR: number,
  finish: FinishType
): number {
  const surcharge = FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + TRANSPORT_INR;
  const withMargin = totalINR * MARGIN_MULTIPLIER;
  const usdPerSqM = withMargin / INR_TO_USD;
  const roundedSqM = Math.ceil(usdPerSqM * 10) / 10; // round up to nearest 0.1
  const perSqFt = roundedSqM / SQM_TO_SQFT_DIVISOR;
  return perSqFt;
}

/**
 * Get the intermediate breakdown (useful for the calculator UI).
 */
export function getPriceBreakdown(
  baseINR: number,
  finish: FinishType
) {
  const surcharge = FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + TRANSPORT_INR;
  const withMargin = totalINR * MARGIN_MULTIPLIER;
  const usdPerSqM = withMargin / INR_TO_USD;
  const roundedSqM = Math.ceil(usdPerSqM * 10) / 10; // round up to nearest 0.1
  const perSqFt = roundedSqM / SQM_TO_SQFT_DIVISOR;

  return {
    baseINR,
    surchargeINR: surcharge,
    transportINR: TRANSPORT_INR,
    totalINR,
    withMarginINR: withMargin,
    usdPerSqM,
    roundedSqM,
    fobPerSqFt: perSqFt,
  };
}

/**
 * Format USD price for display.
 * Shows 2 decimal places (e.g. "$1.00", "$3.70").
 */
export function formatUSD(value: number): string {
  return `$${value.toFixed(2)}`;
}


// ============================================================
// International Pricing Data — Sandstone Collection
// All base prices are in INR per square foot (Natural finish)
// ============================================================

export const SANDSTONE_MARGIN_MULTIPLIER = 1.40; // 40% margin
export const SANDSTONE_TRANSPORT_INR = 20;       // ₹20/sq ft to nearest port

export interface SandstoneFinishOption {
  id: FinishType;
  label: string;
  surchargeINR: number; // additional INR per sq ft
}

export const SANDSTONE_FINISH_OPTIONS: SandstoneFinishOption[] = [
  { id: 'natural',   label: 'Natural',   surchargeINR: 0 },
  { id: 'brushed',   label: 'Brushed',   surchargeINR: 25 },
  { id: 'polished',  label: 'Polished',  surchargeINR: 60 },
  { id: 'sandblast', label: 'Sandblast', surchargeINR: 37.5 },
];

export type SandstoneSizeKey = '30x30' | '40x40' | '60x30' | '60x40' | '60x60' | '60x90';

export interface SandstoneSizeOption {
  id: SandstoneSizeKey;
  label: string;
  dimensions: string;
}

export const SANDSTONE_SIZE_OPTIONS: SandstoneSizeOption[] = [
  { id: '30x30', label: '30×30', dimensions: '30cm × 30cm' },
  { id: '40x40', label: '40×40', dimensions: '40cm × 40cm' },
  { id: '60x30', label: '60×30', dimensions: '60cm × 30cm' },
  { id: '60x40', label: '60×40', dimensions: '60cm × 40cm' },
  { id: '60x60', label: '60×60', dimensions: '60cm × 60cm' },
  { id: '60x90', label: '60×90', dimensions: '60cm × 90cm' },
];

export interface SandstoneVariety {
  id: string;
  name: string;
  tag?: string;
  basePricesINR: Record<SandstoneSizeKey, number>; // INR per sq ft, natural finish
}

export const SANDSTONE_VARIETIES: SandstoneVariety[] = [
  {
    id: 'teakwood',
    name: 'Teakwood',
    basePricesINR: { '30x30': 60, '40x40': 65, '60x30': 70, '60x40': 70, '60x60': 80, '60x90': 100 },
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    basePricesINR: { '30x30': 55, '40x40': 60, '60x30': 65, '60x40': 65, '60x60': 75, '60x90': 90 },
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    basePricesINR: { '30x30': 40, '40x40': 45, '60x30': 50, '60x40': 50, '60x60': 60, '60x90': 75 },
  },
  {
    id: 'kandla-grey',
    name: 'Kandla Grey',
    basePricesINR: { '30x30': 55, '40x40': 60, '60x30': 65, '60x40': 65, '60x60': 75, '60x90': 95 },
  },
  {
    id: 'agra-red',
    name: 'Agra Red',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50, '60x60': 60, '60x90': 75 },
  },
  {
    id: 'buff',
    name: 'Buff',
    basePricesINR: { '30x30': 50, '40x40': 55, '60x30': 60, '60x40': 60, '60x60': 70, '60x90': 85 },
  },
  {
    id: 'desert-brown',
    name: 'Desert Brown',
    basePricesINR: { '30x30': 65, '40x40': 70, '60x30': 75, '60x40': 75, '60x60': 90, '60x90': 110 },
  },
  {
    id: 'dholpur-beige-pink',
    name: 'Dholpur Beige/Pink',
    basePricesINR: { '30x30': 35, '40x40': 38, '60x30': 40, '60x40': 40, '60x60': 50, '60x90': 65 },
  },
  {
    id: 'gwalior-mint',
    name: 'Gwalior Mint',
    basePricesINR: { '30x30': 55, '40x40': 60, '60x30': 65, '60x40': 65, '60x60': 75, '60x90': 90 },
  },
  {
    id: 'heritage-pink',
    name: 'Heritage Pink',
    tag: 'Premium',
    basePricesINR: { '30x30': 70, '40x40': 72, '60x30': 75, '60x40': 75, '60x60': 85, '60x90': 100 },
  },
  {
    id: 'monsoon-black',
    name: 'Monsoon Black',
    basePricesINR: { '30x30': 55, '40x40': 58, '60x30': 60, '60x40': 60, '60x60': 70, '60x90': 85 },
  },
  {
    id: 'raj-green',
    name: 'Raj Green',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50, '60x60': 60, '60x90': 75 },
  },
  {
    id: 'fossil',
    name: 'Fossil',
    tag: 'Premium',
    basePricesINR: { '30x30': 90, '40x40': 95, '60x30': 100, '60x40': 100, '60x60': 120, '60x90': 140 },
  },
  {
    id: 'lalitpur-yellow',
    name: 'Lalitpur Yellow',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50, '60x60': 60, '60x90': 75 },
  },
  {
    id: 'raveena',
    name: 'Raveena',
    basePricesINR: { '30x30': 35, '40x40': 38, '60x30': 40, '60x40': 40, '60x60': 50, '60x90': 65 },
  },
  {
    id: 'autumn-brown',
    name: 'Autumn Brown',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50, '60x60': 60, '60x90': 75 },
  },
  {
    id: 'multi-brown',
    name: 'Multi Brown',
    basePricesINR: { '30x30': 50, '40x40': 55, '60x30': 60, '60x40': 60, '60x60': 70, '60x90': 85 },
  },
];

/**
 * Calculate the FOB price per sq ft in USD for Sandstone.
 *
 * Formula (prices already in INR per sq ft):
 *   1. totalINR = baseINR + finishSurcharge + ₹20 transport
 *   2. withMargin = totalINR × 1.40
 *   3. usdPerSqFt = withMargin / 89
 *   4. rounded = round up to nearest 0.1
 */
export function calculateSandstoneFOBPerSqFt(
  baseINR: number,
  finish: FinishType
): number {
  const surcharge = SANDSTONE_FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + SANDSTONE_TRANSPORT_INR;
  const withMargin = totalINR * SANDSTONE_MARGIN_MULTIPLIER;
  const usdPerSqFt = withMargin / INR_TO_USD;
  const rounded = Math.ceil(usdPerSqFt * 10) / 10; // round up to nearest 0.1
  return rounded;
}

/**
 * Get the intermediate breakdown for Sandstone (calculator UI).
 */
export function getSandstonePriceBreakdown(
  baseINR: number,
  finish: FinishType
) {
  const surcharge = SANDSTONE_FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + SANDSTONE_TRANSPORT_INR;
  const withMargin = totalINR * SANDSTONE_MARGIN_MULTIPLIER;
  const usdPerSqFt = withMargin / INR_TO_USD;
  const rounded = Math.ceil(usdPerSqFt * 10) / 10;

  return {
    baseINR,
    surchargeINR: surcharge,
    transportINR: SANDSTONE_TRANSPORT_INR,
    totalINR,
    withMarginINR: withMargin,
    usdPerSqFt,
    fobPerSqFt: rounded,
  };
}


// ============================================================
// International Pricing Data — Limestone Collection
// All base prices are in INR per square foot (Natural finish)
// Limestone only goes up to 60×40
// ============================================================

export const LIMESTONE_MARGIN_MULTIPLIER = 1.40; // 40% margin
export const LIMESTONE_TRANSPORT_INR = 20;       // ₹20/sq ft to nearest port

export const LIMESTONE_FINISH_OPTIONS: SandstoneFinishOption[] = [
  { id: 'natural',   label: 'Natural',   surchargeINR: 0 },
  { id: 'brushed',   label: 'Brushed',   surchargeINR: 25 },
  { id: 'polished',  label: 'Polished',  surchargeINR: 60 },
  { id: 'sandblast', label: 'Sandblast', surchargeINR: 37.5 },
];

export type LimestoneSizeKey = '30x30' | '40x40' | '60x30' | '60x40';

export interface LimestoneSizeOption {
  id: LimestoneSizeKey;
  label: string;
  dimensions: string;
}

export const LIMESTONE_SIZE_OPTIONS: LimestoneSizeOption[] = [
  { id: '30x30', label: '30×30', dimensions: '30cm × 30cm' },
  { id: '40x40', label: '40×40', dimensions: '40cm × 40cm' },
  { id: '60x30', label: '60×30', dimensions: '60cm × 30cm' },
  { id: '60x40', label: '60×40', dimensions: '60cm × 40cm' },
];

export interface LimestoneVariety {
  id: string;
  name: string;
  tag?: string;
  basePricesINR: Record<LimestoneSizeKey, number>; // INR per sq ft, natural finish
}

export const LIMESTONE_VARIETIES: LimestoneVariety[] = [
  {
    id: 'kota-brown',
    name: 'Kota Brown',
    basePricesINR: { '30x30': 22, '40x40': 24, '60x30': 26, '60x40': 26 },
  },
  {
    id: 'kota-blue',
    name: 'Kota Blue',
    basePricesINR: { '30x30': 20, '40x40': 22, '60x30': 24, '60x40': 24 },
  },
  {
    id: 'ita-gold',
    name: 'Ita Gold',
    basePricesINR: { '30x30': 55, '40x40': 58, '60x30': 60, '60x40': 60 },
  },
  {
    id: 'jaisalmer-yellow',
    name: 'Jaisalmer Yellow',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50 },
  },
  {
    id: 'kadappa-black',
    name: 'Kadappa Black',
    basePricesINR: { '30x30': 28, '40x40': 30, '60x30': 35, '60x40': 35 },
  },
  {
    id: 'kota-mix',
    name: 'Kota Mix',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50 },
  },
  {
    id: 'pearl-gold',
    name: 'Pearl Gold',
    basePricesINR: { '30x30': 50, '40x40': 53, '60x30': 55, '60x40': 55 },
  },
  {
    id: 'shabad-yellow',
    name: 'Shabad Yellow',
    basePricesINR: { '30x30': 45, '40x40': 48, '60x30': 50, '60x40': 50 },
  },
];

/**
 * Calculate the FOB price per sq ft in USD for Limestone.
 */
export function calculateLimestoneFOBPerSqFt(
  baseINR: number,
  finish: FinishType
): number {
  const surcharge = LIMESTONE_FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + LIMESTONE_TRANSPORT_INR;
  const withMargin = totalINR * LIMESTONE_MARGIN_MULTIPLIER;
  const usdPerSqFt = withMargin / INR_TO_USD;
  const rounded = Math.ceil(usdPerSqFt * 10) / 10;
  return rounded;
}

/**
 * Get the intermediate breakdown for Limestone (calculator UI).
 */
export function getLimestonePriceBreakdown(
  baseINR: number,
  finish: FinishType
) {
  const surcharge = LIMESTONE_FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + LIMESTONE_TRANSPORT_INR;
  const withMargin = totalINR * LIMESTONE_MARGIN_MULTIPLIER;
  const usdPerSqFt = withMargin / INR_TO_USD;
  const rounded = Math.ceil(usdPerSqFt * 10) / 10;

  return {
    baseINR,
    surchargeINR: surcharge,
    transportINR: LIMESTONE_TRANSPORT_INR,
    totalINR,
    withMarginINR: withMargin,
    usdPerSqFt,
    fobPerSqFt: rounded,
  };
}


// ============================================================
// International Pricing Data — Slate Collection
// All base prices are in INR per square foot (Natural finish)
// Slate does NOT get polished — only Natural, Brushed, Sandblast
// ============================================================

export const SLATE_MARGIN_MULTIPLIER = 1.40; // 40% margin
export const SLATE_TRANSPORT_INR = 20;       // ₹20/sq ft to nearest port

export type SlateFinishType = 'natural' | 'brushed' | 'sandblast';

export interface SlateFinishOption {
  id: SlateFinishType;
  label: string;
  surchargeINR: number; // additional INR per sq ft
}

export const SLATE_FINISH_OPTIONS: SlateFinishOption[] = [
  { id: 'natural',   label: 'Natural',   surchargeINR: 0 },
  { id: 'brushed',   label: 'Brushed',   surchargeINR: 25 },
  { id: 'sandblast', label: 'Sandblast', surchargeINR: 37.5 },
];

export type SlateSizeKey = '30x30' | '40x40' | '60x30' | '60x40';

export interface SlateSizeOption {
  id: SlateSizeKey;
  label: string;
  dimensions: string;
}

export const SLATE_SIZE_OPTIONS: SlateSizeOption[] = [
  { id: '30x30', label: '30×30', dimensions: '30cm × 30cm' },
  { id: '40x40', label: '40×40', dimensions: '40cm × 40cm' },
  { id: '60x30', label: '60×30', dimensions: '60cm × 30cm' },
  { id: '60x40', label: '60×40', dimensions: '60cm × 40cm' },
];

export interface SlateVariety {
  id: string;
  name: string;
  tag?: string;
  basePricesINR: Record<SlateSizeKey, number>; // INR per sq ft, natural finish
}

export const SLATE_VARIETIES: SlateVariety[] = [
  {
    id: 'terra-red',
    name: 'Terra Red',
    basePricesINR: { '30x30': 40, '40x40': 45, '60x30': 50, '60x40': 50 },
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    basePricesINR: { '30x30': 50, '40x40': 55, '60x30': 60, '60x40': 60 },
  },
  {
    id: 'indian-autumn',
    name: 'Indian Autumn',
    basePricesINR: { '30x30': 40, '40x40': 45, '60x30': 50, '60x40': 50 },
  },
  {
    id: 'jak-black-rustic',
    name: 'Jak Black (Rustic)',
    basePricesINR: { '30x30': 55, '40x40': 60, '60x30': 65, '60x40': 65 },
  },
  {
    id: 'jak-black-regular',
    name: 'Jak Black (Regular)',
    basePricesINR: { '30x30': 60, '40x40': 65, '60x30': 70, '60x40': 70 },
  },
  {
    id: 'kund-multi-color',
    name: 'Kund Multi Color',
    basePricesINR: { '30x30': 45, '40x40': 50, '60x30': 55, '60x40': 55 },
  },
  {
    id: 'mac-green-rustic',
    name: 'Mac Green Rustic',
    tag: 'Premium',
    basePricesINR: { '30x30': 80, '40x40': 85, '60x30': 90, '60x40': 90 },
  },
  {
    id: 'pure-pink',
    name: 'Pure Pink',
    basePricesINR: { '30x30': 50, '40x40': 55, '60x30': 60, '60x40': 60 },
  },
  {
    id: 'raja-red',
    name: 'Raja Red',
    basePricesINR: { '30x30': 50, '40x40': 55, '60x30': 60, '60x40': 60 },
  },
  {
    id: 'sra-multicolor',
    name: 'SRA Multicolor',
    basePricesINR: { '30x30': 45, '40x40': 50, '60x30': 55, '60x40': 55 },
  },
  {
    id: 'autumn-rustic',
    name: 'Autumn Rustic',
    basePricesINR: { '30x30': 50, '40x40': 55, '60x30': 60, '60x40': 60 },
  },
  {
    id: 'california-gold',
    name: 'California Gold',
    basePricesINR: { '30x30': 55, '40x40': 60, '60x30': 65, '60x40': 65 },
  },
];

/**
 * Calculate the FOB price per sq ft in USD for Slate.
 */
export function calculateSlateFOBPerSqFt(
  baseINR: number,
  finish: SlateFinishType
): number {
  const surcharge = SLATE_FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + SLATE_TRANSPORT_INR;
  const withMargin = totalINR * SLATE_MARGIN_MULTIPLIER;
  const usdPerSqFt = withMargin / INR_TO_USD;
  const rounded = Math.ceil(usdPerSqFt * 10) / 10;
  return rounded;
}

/**
 * Get the intermediate breakdown for Slate (calculator UI).
 */
export function getSlatePriceBreakdown(
  baseINR: number,
  finish: SlateFinishType
) {
  const surcharge = SLATE_FINISH_OPTIONS.find((f) => f.id === finish)?.surchargeINR ?? 0;
  const totalINR = baseINR + surcharge + SLATE_TRANSPORT_INR;
  const withMargin = totalINR * SLATE_MARGIN_MULTIPLIER;
  const usdPerSqFt = withMargin / INR_TO_USD;
  const rounded = Math.ceil(usdPerSqFt * 10) / 10;

  return {
    baseINR,
    surchargeINR: surcharge,
    transportINR: SLATE_TRANSPORT_INR,
    totalINR,
    withMarginINR: withMargin,
    usdPerSqFt,
    fobPerSqFt: rounded,
  };
}


