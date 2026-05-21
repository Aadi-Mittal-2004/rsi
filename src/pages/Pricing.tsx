import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import {
  STONE_VARIETIES,
  SIZE_OPTIONS,
  FINISH_OPTIONS,
  calculateFOBPerSqFt,
  formatUSD,
  SANDSTONE_VARIETIES,
  SANDSTONE_SIZE_OPTIONS,
  SANDSTONE_FINISH_OPTIONS,
  calculateSandstoneFOBPerSqFt,
  LIMESTONE_VARIETIES,
  LIMESTONE_SIZE_OPTIONS,
  LIMESTONE_FINISH_OPTIONS,
  calculateLimestoneFOBPerSqFt,
  SLATE_VARIETIES,
  SLATE_SIZE_OPTIONS,
  SLATE_FINISH_OPTIONS,
  calculateSlateFOBPerSqFt,
  type FinishType,
  type SizeKey,
  type SandstoneSizeKey,
  type LimestoneSizeKey,
  type SlateSizeKey,
  type SlateFinishType,
} from "@/data/pricingData";
import { cn } from "@/lib/utils";

type StoneCategory = "quartzite" | "sandstone" | "limestone" | "slate";

const CATEGORY_LABELS: Record<StoneCategory, string> = {
  quartzite: "Quartzite",
  sandstone: "Sandstone",
  limestone: "Limestone",
  slate: "Slate",
};

// ─── Quote item type ───
interface QuoteItem {
  id: string;
  category: StoneCategory;
  stoneName: string;
  stoneId: string;
  sizeLabel: string;
  sizeId: string;
  finishLabel: string;
  finishId: string;
  quantity: number; // sq ft
  pricePerSqFt: number;
  totalPrice: number;
}

// ─── Helper to get price for any category ───
function getPriceForItem(
  cat: StoneCategory,
  stoneId: string,
  sizeId: string,
  finishId: string
): number | null {
  switch (cat) {
    case "quartzite": {
      const stone = STONE_VARIETIES.find((s) => s.id === stoneId);
      if (!stone) return null;
      return calculateFOBPerSqFt(stone.basePricesINR[sizeId as SizeKey], finishId as FinishType);
    }
    case "sandstone": {
      const stone = SANDSTONE_VARIETIES.find((s) => s.id === stoneId);
      if (!stone) return null;
      return calculateSandstoneFOBPerSqFt(stone.basePricesINR[sizeId as SandstoneSizeKey], finishId as FinishType);
    }
    case "limestone": {
      const stone = LIMESTONE_VARIETIES.find((s) => s.id === stoneId);
      if (!stone) return null;
      return calculateLimestoneFOBPerSqFt(stone.basePricesINR[sizeId as LimestoneSizeKey], finishId as FinishType);
    }
    case "slate": {
      const stone = SLATE_VARIETIES.find((s) => s.id === stoneId);
      if (!stone) return null;
      return calculateSlateFOBPerSqFt(stone.basePricesINR[sizeId as SlateSizeKey], finishId as SlateFinishType);
    }
  }
}

// ─── Config lookups ───
const CONFIG = {
  quartzite:  { varieties: STONE_VARIETIES,     sizes: SIZE_OPTIONS,           finishes: FINISH_OPTIONS },
  sandstone:  { varieties: SANDSTONE_VARIETIES,  sizes: SANDSTONE_SIZE_OPTIONS, finishes: SANDSTONE_FINISH_OPTIONS },
  limestone:  { varieties: LIMESTONE_VARIETIES,  sizes: LIMESTONE_SIZE_OPTIONS, finishes: LIMESTONE_FINISH_OPTIONS },
  slate:      { varieties: SLATE_VARIETIES,      sizes: SLATE_SIZE_OPTIONS,     finishes: SLATE_FINISH_OPTIONS },
};

const Pricing = () => {
  const [category, setCategory] = useState<StoneCategory>("quartzite");

  // ─── Per-category finish state (for pricing table) ───
  const [qFinish, setQFinish] = useState<FinishType>("natural");
  const [sFinish, setSFinish] = useState<FinishType>("natural");
  const [lFinish, setLFinish] = useState<FinishType>("natural");
  const [slFinish, setSlFinish] = useState<SlateFinishType>("natural");

  // ─── Quote Builder state ───
  const [quoteCategory, setQuoteCategory] = useState<StoneCategory>("quartzite");
  const [quoteStone, setQuoteStone] = useState(STONE_VARIETIES[0].id);
  const [quoteSize, setQuoteSize] = useState<string>("60x40");
  const [quoteFinish, setQuoteFinish] = useState<string>("natural");
  const [quoteQty, setQuoteQty] = useState<string>("100");
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  // Reset quote builder fields when switching category
  const handleQuoteCategoryChange = (cat: StoneCategory) => {
    setQuoteCategory(cat);
    setQuoteFinish("natural");
    setQuoteSize("60x40");
    setQuoteStone(CONFIG[cat].varieties[0].id);
  };

  // Add item to quote
  const addToQuote = useCallback(() => {
    const qty = parseFloat(quoteQty);
    if (!qty || qty <= 0) return;

    const cfg = CONFIG[quoteCategory];
    const stone = cfg.varieties.find((s) => s.id === quoteStone);
    const size = cfg.sizes.find((s) => s.id === quoteSize);
    const finish = cfg.finishes.find((f) => f.id === quoteFinish);

    if (!stone || !size || !finish) return;

    const pricePerSqFt = getPriceForItem(quoteCategory, quoteStone, quoteSize, quoteFinish);
    if (pricePerSqFt === null) return;

    const item: QuoteItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      category: quoteCategory,
      stoneName: stone.name,
      stoneId: quoteStone,
      sizeLabel: size.label,
      sizeId: quoteSize,
      finishLabel: finish.label,
      finishId: quoteFinish,
      quantity: qty,
      pricePerSqFt,
      totalPrice: Math.ceil(pricePerSqFt * qty * 100) / 100,
    };

    setQuoteItems((prev) => [...prev, item]);
  }, [quoteCategory, quoteStone, quoteSize, quoteFinish, quoteQty]);

  // Remove item from quote
  const removeFromQuote = (id: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all items
  const clearQuote = () => setQuoteItems([]);

  // Quote totals
  const quoteTotalSqFt = quoteItems.reduce((sum, item) => sum + item.quantity, 0);
  const quoteTotalPrice = quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Live preview price
  const livePreviewPrice = useMemo(() => {
    return getPriceForItem(quoteCategory, quoteStone, quoteSize, quoteFinish);
  }, [quoteCategory, quoteStone, quoteSize, quoteFinish]);

  // WhatsApp message with full quote
  const whatsappMsg = quoteItems.length > 0
    ? encodeURIComponent(
        `Hi! I'd like a quote for the following order:\n\n${quoteItems
          .map(
            (item, i) =>
              `${i + 1}. ${item.stoneName} ${CATEGORY_LABELS[item.category]} — ${item.sizeLabel}cm, ${item.finishLabel} finish — ${item.quantity} sq ft @ ${formatUSD(item.pricePerSqFt)}/sq ft = ${formatUSD(item.totalPrice)}`
          )
          .join("\n")}\n\nTotal: ${quoteTotalSqFt.toLocaleString()} sq ft — ${formatUSD(quoteTotalPrice)}\n\nCould you confirm availability and share a final quote?`
      )
    : "";

  // ─── Table data ───
  const quartziteTableData = useMemo(() => {
    return STONE_VARIETIES.map((stone) => ({
      ...stone,
      prices: SIZE_OPTIONS.map((size) => ({
        sizeId: size.id,
        fobPerSqFt: calculateFOBPerSqFt(stone.basePricesINR[size.id], qFinish),
      })),
    }));
  }, [qFinish]);

  const sandstoneTableData = useMemo(() => {
    return SANDSTONE_VARIETIES.map((stone) => ({
      ...stone,
      prices: SANDSTONE_SIZE_OPTIONS.map((size) => ({
        sizeId: size.id,
        fobPerSqFt: calculateSandstoneFOBPerSqFt(stone.basePricesINR[size.id], sFinish),
      })),
    }));
  }, [sFinish]);

  const limestoneTableData = useMemo(() => {
    return LIMESTONE_VARIETIES.map((stone) => ({
      ...stone,
      prices: LIMESTONE_SIZE_OPTIONS.map((size) => ({
        sizeId: size.id,
        fobPerSqFt: calculateLimestoneFOBPerSqFt(stone.basePricesINR[size.id], lFinish),
      })),
    }));
  }, [lFinish]);

  const slateTableData = useMemo(() => {
    return SLATE_VARIETIES.map((stone) => ({
      ...stone,
      prices: SLATE_SIZE_OPTIONS.map((size) => ({
        sizeId: size.id,
        fobPerSqFt: calculateSlateFOBPerSqFt(stone.basePricesINR[size.id], slFinish),
      })),
    }));
  }, [slFinish]);

  // ─── Active table config ───
  const getActiveFinish = () => {
    switch (category) {
      case "quartzite": return qFinish;
      case "sandstone": return sFinish;
      case "limestone": return lFinish;
      case "slate": return slFinish;
    }
  };
  const setActiveFinish = (id: string) => {
    switch (category) {
      case "quartzite": setQFinish(id as FinishType); break;
      case "sandstone": setSFinish(id as FinishType); break;
      case "limestone": setLFinish(id as FinishType); break;
      case "slate": setSlFinish(id as SlateFinishType); break;
    }
  };
  const activeFinish = getActiveFinish();
  const activeFinishOptions = CONFIG[category].finishes;
  const activeSizeOptions = CONFIG[category].sizes;
  const activeTableData = (() => {
    switch (category) {
      case "quartzite": return quartziteTableData;
      case "sandstone": return sandstoneTableData;
      case "limestone": return limestoneTableData;
      case "slate": return slateTableData;
    }
  })();

  // ─── Quote builder config ───
  const quoteSizeOptions = CONFIG[quoteCategory].sizes;
  const quoteFinishOptions = CONFIG[quoteCategory].finishes;
  const quoteStoneVarieties = CONFIG[quoteCategory].varieties;

  return (
    <PageTransition>
      <SEO
        title="International Pricing — FOB Export Prices"
        description="Transparent FOB export prices for premium Indian quartzite, sandstone, limestone & slate in USD per sq ft. Natural, Brushed, Polished & Sandblast finishes available. Direct from manufacturer — Roop Stone Impex."
        keywords="quartzite price, sandstone price, limestone price, slate price, indian stone export price, FOB price natural stone, Roop Stone Impex pricing"
        url="https://www.roopstoneimpex.in/pricing"
      />

      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* ─── Hero Header ─── */}
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-accent font-medium mb-4">
              Transparent Export Pricing
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 relative inline-block">
              International Pricing
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              FOB prices in USD per sq ft — delivered to the nearest Indian port, ready for export.
              <br className="hidden md:inline" />
              Direct from our quarries &amp; factory in Rajasthan.
            </p>
          </div>

          {/* ─── Category Tabs ─── */}
          <div className="flex flex-wrap items-center justify-center gap-1 mb-12" id="category-tabs">
            {(["quartzite", "sandstone", "limestone", "slate"] as StoneCategory[]).map((cat) => (
              <button
                key={cat}
                id={`tab-${cat}`}
                onClick={() => setCategory(cat)}
                className={cn(
                  "relative px-5 sm:px-7 py-3 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 rounded-full",
                  category === cat
                    ? "bg-foreground text-background shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {CATEGORY_LABELS[cat]}
                {category === cat && (
                  <motion.span
                    layoutId="categoryUnderline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ─── Finish Selector ─── */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-5">
              Select Finish
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {activeFinishOptions.map((finish) => {
                const active = activeFinish === finish.id;
                const margin = category === "quartzite" ? 1.35 : 1.40;
                const unit = category === "quartzite" ? "/m²" : "/ft²";
                const surchargeUSD = finish.surchargeINR > 0
                  ? `+$${(finish.surchargeINR * margin / 89).toFixed(category === "quartzite" ? 0 : 2)}${unit}`
                  : "Base";
                return (
                  <button
                    key={finish.id}
                    id={`finish-${finish.id}`}
                    onClick={() => setActiveFinish(finish.id)}
                    className={cn(
                      "relative px-5 py-2.5 text-sm tracking-wide border transition-all duration-300 rounded-full",
                      active
                        ? "bg-foreground text-background border-foreground shadow-lg"
                        : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    <span className="font-medium">{finish.label}</span>
                    <span className={cn(
                      "ml-2 text-[10px] tracking-wider uppercase",
                      active ? "text-background/60" : "text-muted-foreground/60"
                    )}>
                      {surchargeUSD}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Pricing Table ─── */}
          <div className="mb-20">
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <table className="w-full min-w-[600px] border-collapse" id="pricing-table">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium border-b border-border">
                      Stone Variety
                    </th>
                    {activeSizeOptions.map((size) => (
                      <th
                        key={size.id}
                        className="text-center py-4 px-4 text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium border-b border-border"
                      >
                        <span>{size.label}</span>
                        <span className="block text-[10px] text-muted-foreground/50 font-normal mt-0.5">
                          {size.dimensions}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <motion.tbody
                    key={`${category}-${activeFinish}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTableData.map((stone, rowIdx) => (
                      <tr
                        key={stone.id}
                        className={cn(
                          "group transition-colors duration-200",
                          rowIdx % 2 === 0
                            ? "bg-muted/30 hover:bg-muted/60"
                            : "hover:bg-muted/40"
                        )}
                      >
                        <td className="py-4 px-4 border-b border-border/50">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground tracking-wide">
                              {stone.name}
                            </span>
                            {stone.tag && (
                              <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                                {stone.tag}
                              </span>
                            )}
                          </div>
                        </td>
                        {stone.prices.map((p) => (
                          <td
                            key={p.sizeId}
                            className="text-center py-4 px-4 border-b border-border/50"
                          >
                            <span className="text-base font-semibold text-foreground tabular-nums">
                              {formatUSD(p.fobPerSqFt)}
                            </span>
                            <span className="block text-[10px] text-muted-foreground/60 mt-0.5">
                              /sq ft
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>

            <p className="text-center text-xs text-muted-foreground/50 mt-4 tracking-wide">
              All prices are FOB (Free on Board) — includes transportation to nearest Indian port.
            </p>
          </div>

          {/* ─── Quote Builder ─── */}
          <div className="max-w-3xl mx-auto mb-20" id="quote-builder">
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.35em] uppercase text-accent font-medium mb-3">
                Build Your Order
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Mixed Order Calculator
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Mix and match different stones, sizes &amp; finishes — see your total instantly.
              </p>
            </div>

            <div className="border border-border rounded-2xl overflow-hidden backdrop-blur-sm bg-card/50 shadow-xl">
              {/* ─── Add Item Form ─── */}
              <div className="p-6 md:p-8 space-y-5">
                {/* Stone Type */}
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-medium">
                    Stone Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["quartzite", "sandstone", "limestone", "slate"] as StoneCategory[]).map((cat) => (
                      <button
                        key={cat}
                        id={`quote-type-${cat}`}
                        onClick={() => handleQuoteCategoryChange(cat)}
                        className={cn(
                          "py-2.5 px-3 text-sm border rounded-lg transition-all duration-200 text-center tracking-wide",
                          quoteCategory === cat
                            ? "bg-foreground text-background border-foreground font-medium"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        )}
                      >
                        {CATEGORY_LABELS[cat]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stone + Finish row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-medium">
                      Stone Variety
                    </label>
                    <select
                      id="quote-stone"
                      value={quoteStone}
                      onChange={(e) => setQuoteStone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                    >
                      {quoteStoneVarieties.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} {s.tag ? `(${s.tag})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-medium">
                      Finish
                    </label>
                    <select
                      id="quote-finish"
                      value={quoteFinish}
                      onChange={(e) => setQuoteFinish(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                    >
                      {quoteFinishOptions.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-medium">
                    Tile Size
                  </label>
                  <div className={cn(
                    "grid gap-2",
                    quoteCategory === "sandstone" ? "grid-cols-3 sm:grid-cols-6" : "grid-cols-4"
                  )}>
                    {quoteSizeOptions.map((size) => (
                      <button
                        key={size.id}
                        id={`quote-size-${size.id}`}
                        onClick={() => setQuoteSize(size.id)}
                        className={cn(
                          "py-2.5 px-2 text-sm border rounded-lg transition-all duration-200 text-center",
                          quoteSize === size.id
                            ? "bg-foreground text-background border-foreground font-medium"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        )}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity + Live price + Add button */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-medium">
                      Quantity (sq ft)
                    </label>
                    <input
                      id="quote-qty"
                      type="number"
                      min="1"
                      value={quoteQty}
                      onChange={(e) => setQuoteQty(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all tabular-nums"
                    />
                  </div>
                  {livePreviewPrice !== null && (
                    <div className="text-center sm:text-right pb-1">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Unit Price</p>
                      <p className="text-lg font-bold text-accent tabular-nums">{formatUSD(livePreviewPrice)}<span className="text-xs font-normal text-muted-foreground">/ft²</span></p>
                    </div>
                  )}
                  <button
                    id="quote-add-btn"
                    onClick={addToQuote}
                    disabled={!quoteQty || parseFloat(quoteQty) <= 0}
                    className="px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    + Add to Quote
                  </button>
                </div>
              </div>

              {/* ─── Quote Items List ─── */}
              {quoteItems.length > 0 && (
                <div className="border-t border-border">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
                        Your Quote ({quoteItems.length} {quoteItems.length === 1 ? "item" : "items"})
                      </h3>
                      <button
                        onClick={clearQuote}
                        className="text-xs text-muted-foreground/60 hover:text-destructive transition-colors tracking-wide"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence>
                        {quoteItems.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.2 }}
                            className="group flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors"
                          >
                            <span className="text-xs text-muted-foreground/50 font-mono w-5 shrink-0">{idx + 1}.</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">
                                {item.stoneName}
                                <span className="font-normal text-muted-foreground ml-1.5">
                                  {CATEGORY_LABELS[item.category]}
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.sizeLabel}cm · {item.finishLabel} · {item.quantity.toLocaleString()} sq ft
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-bold tabular-nums text-foreground">{formatUSD(item.totalPrice)}</p>
                              <p className="text-[10px] text-muted-foreground/60 tabular-nums">@ {formatUSD(item.pricePerSqFt)}/ft²</p>
                            </div>
                            <button
                              onClick={() => removeFromQuote(item.id)}
                              className="shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                              aria-label="Remove item"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Totals */}
                    <div className="mt-5 pt-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Area</p>
                          <p className="text-lg font-bold tabular-nums">{quoteTotalSqFt.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">sq ft</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Estimated Total</p>
                          <motion.p
                            key={quoteTotalPrice}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-3xl font-bold text-accent tabular-nums"
                          >
                            {formatUSD(quoteTotalPrice)}
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                      href={`https://wa.me/917357923414?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="pricing-whatsapp-cta"
                      className="flex items-center justify-center gap-2 w-full mt-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1fba59] text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send Quote via WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ─── Bottom Notes ─── */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="h-px w-12 bg-accent/40 mx-auto mb-6"></div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prices are indicative FOB (Free on Board) — includes manufacturing and transportation to the nearest Indian seaport. Final pricing is confirmed upon order placement.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Volume discounts available on orders over 1,000 sq ft.{" "}
              <a href="/contact" className="text-accent hover:underline">
                Contact us
              </a>{" "}
              for a custom quote.
            </p>
            <p className="text-[11px] text-muted-foreground/40 mt-6 tracking-wide">
              Exchange rate: 1 USD = ₹89 · Prices subject to market fluctuations
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Pricing;
