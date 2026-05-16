// ============================================================
// Technical Specifications per Stone Category & Variety
// Used by programmatic SEO pages for unique, valuable content
// ============================================================

export interface TechnicalSpec {
  compressiveStrength: string;  // MPa
  waterAbsorption: string;     // %
  mohsHardness: string;        // 1-10
  density: string;             // kg/m³
  frostResistant: boolean;
  slipResistance: string;      // R-value or descriptor
  porosity: string;            // Low / Medium / High
  weatherResistance: string;   // Excellent / Good / Moderate
}

// Category-level defaults
export const CATEGORY_SPECS: Record<string, TechnicalSpec> = {
  quartzite: {
    compressiveStrength: '150–300',
    waterAbsorption: '0.2–1.5',
    mohsHardness: '7–8',
    density: '2,600–2,700',
    frostResistant: true,
    slipResistance: 'R11–R12',
    porosity: 'Low',
    weatherResistance: 'Excellent',
  },
  sandstone: {
    compressiveStrength: '40–120',
    waterAbsorption: '1.0–6.0',
    mohsHardness: '6–7',
    density: '2,200–2,500',
    frostResistant: true,
    slipResistance: 'R10–R11',
    porosity: 'Medium',
    weatherResistance: 'Good',
  },
  limestone: {
    compressiveStrength: '50–170',
    waterAbsorption: '0.5–4.0',
    mohsHardness: '3–4',
    density: '2,300–2,700',
    frostResistant: true,
    slipResistance: 'R10–R11',
    porosity: 'Medium',
    weatherResistance: 'Good',
  },
  slate: {
    compressiveStrength: '100–200',
    waterAbsorption: '0.1–0.6',
    mohsHardness: '5.5–6',
    density: '2,700–2,900',
    frostResistant: true,
    slipResistance: 'R11–R13',
    porosity: 'Very Low',
    weatherResistance: 'Excellent',
  },
  marble: {
    compressiveStrength: '50–150',
    waterAbsorption: '0.2–1.0',
    mohsHardness: '3–5',
    density: '2,500–2,700',
    frostResistant: false,
    slipResistance: 'R9–R10',
    porosity: 'Medium',
    weatherResistance: 'Moderate',
  },
};

// Per-stone overrides (only notable deviations)
export const STONE_SPEC_OVERRIDES: Record<string, Partial<TechnicalSpec>> = {
  // Extra hard quartzites
  'q7': { compressiveStrength: '200–350', mohsHardness: '7.5–8' },
  'q8': { compressiveStrength: '180–320' },

  // Dense sandstones
  's12': { waterAbsorption: '0.8–2.0', slipResistance: 'R11–R12', weatherResistance: 'Excellent' },
  's15': { compressiveStrength: '60–140', density: '2,300–2,600' },

  // Kota limestone — extremely dense
  'l1': { compressiveStrength: '110–180', waterAbsorption: '0.5–1.5', slipResistance: 'R11' },
  'l2': { compressiveStrength: '110–180', waterAbsorption: '0.5–1.5', slipResistance: 'R11' },
  'l5': { compressiveStrength: '80–160', waterAbsorption: '0.3–0.8', density: '2,600–2,800' },

  // Jak Black slate — very hard
  'sl4': { compressiveStrength: '150–250', slipResistance: 'R12–R13' },
};

export function getSpecsForStone(productId: string, category: string): TechnicalSpec {
  const base = CATEGORY_SPECS[category] || CATEGORY_SPECS['marble'];
  const overrides = STONE_SPEC_OVERRIDES[productId];
  return overrides ? { ...base, ...overrides } : base;
}
