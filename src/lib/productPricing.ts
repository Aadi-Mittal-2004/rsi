import { getPricingLink } from '@/data/stoneFormats';
import {
  STONE_VARIETIES, SIZE_OPTIONS, FINISH_OPTIONS, calculateFOBPerSqFt,
  SANDSTONE_VARIETIES, SANDSTONE_SIZE_OPTIONS, SANDSTONE_FINISH_OPTIONS, calculateSandstoneFOBPerSqFt,
  LIMESTONE_VARIETIES, LIMESTONE_SIZE_OPTIONS, LIMESTONE_FINISH_OPTIONS, calculateLimestoneFOBPerSqFt,
  SLATE_VARIETIES, SLATE_SIZE_OPTIONS, SLATE_FINISH_OPTIONS, calculateSlateFOBPerSqFt,
} from '@/data/pricingData';

export function getProductPricingConfig(type: string) {
  switch (type) {
    case 'quartzite': return { varieties: STONE_VARIETIES, sizes: SIZE_OPTIONS, finishes: FINISH_OPTIONS, calcFn: calculateFOBPerSqFt };
    case 'sandstone': return { varieties: SANDSTONE_VARIETIES, sizes: SANDSTONE_SIZE_OPTIONS, finishes: SANDSTONE_FINISH_OPTIONS, calcFn: calculateSandstoneFOBPerSqFt };
    case 'limestone': return { varieties: LIMESTONE_VARIETIES, sizes: LIMESTONE_SIZE_OPTIONS, finishes: LIMESTONE_FINISH_OPTIONS, calcFn: calculateLimestoneFOBPerSqFt };
    case 'slate': return { varieties: SLATE_VARIETIES, sizes: SLATE_SIZE_OPTIONS, finishes: SLATE_FINISH_OPTIONS, calcFn: calculateSlateFOBPerSqFt };
    default: return null;
  }
}

function getPublicPrice(productId: string | undefined, starting: boolean): number | null {
  const link = productId ? getPricingLink(productId) : null;
  const config = link ? getProductPricingConfig(link.type) : null;
  const variety = config?.varieties.find(item => item.id === link.varietyId);
  if (!variety || !config) return null;
  const basePrices = variety.basePricesINR as Record<string, number>;
  const base = starting
    ? Math.min(...Object.values(basePrices))
    : basePrices[config.sizes[config.sizes.length - 1].id];
  const price = config.calcFn(base, config.finishes[0].id as never);
  return Number.isFinite(price) && price > 0 ? price : null;
}

/** Match the initial size and finish shown in the product's pricing calculator. */
export const getDefaultProductPrice = (productId?: string) => getPublicPrice(productId, false);

/** Match the visible "From" price on an application page. */
export const getStartingProductPrice = (productId: string) => getPublicPrice(productId, true);
