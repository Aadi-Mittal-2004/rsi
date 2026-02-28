import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { products, Product } from "@/data/products";
import PageTransition, { staggerContainer, staggerItem } from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_PER_PAGE = 16;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const subcategoryFromUrl = searchParams.get("subcategory") || "all";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSelectedSubcategory(subcategoryFromUrl);
    setCurrentPage(pageFromUrl);
  }, [categoryFromUrl, subcategoryFromUrl, pageFromUrl]);

  const categories = [
    { id: "all", name: "All Stones" },
    // { id: "marble", name: "Marble" }, // Hidden temporarily
    { id: "sandstone", name: "Sandstone" },
    { id: "quartzite", name: "Quartzite" },
    { id: "limestone", name: "Limestone" },
    { id: "slate", name: "Slate" },
    { id: "mosaic", name: "Patterns & Panels" },
  ];

  const marbleSubcategories = [
    { id: "all", name: "All Marble" },
    { id: "exotic", name: "Exotic" },
    { id: "beige", name: "Beige" },
    { id: "grey", name: "Grey" },
    { id: "imported-white", name: "Imported White" },
    { id: "black", name: "Black" },
    { id: "brown", name: "Brown" },
    { id: "onyx", name: "Onyx" },
    { id: "cladding", name: "Cladding" },
    { id: "makrana", name: "Makrana" },
  ];

  const mosaicSubcategories = [
    { id: "all", name: "All" },
    { id: "pebbles", name: "Pebbles" },
    { id: "corner-pieces", name: "Corner Pieces" },
    { id: "wall-cladding", name: "Wall Cladding" },
  ];

  const filteredProducts = products.filter((p) => {
    // Hide marble products temporarily
    if (p.category === "marble") return false;
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (selectedCategory === "marble" && selectedSubcategory !== "all" && p.subcategory !== selectedSubcategory) return false;
    if (selectedCategory === "mosaic" && selectedSubcategory !== "all" && p.subcategory !== selectedSubcategory) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams();
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && !(key === "page" && value === "1")) {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      updateParams({ category: categoryId });
    }
    setSelectedSubcategory("all");
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subId: string) => {
    updateParams({ category: selectedCategory, subcategory: subId });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: String(page) };
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (selectedSubcategory !== "all") params.subcategory = selectedSubcategory;
    updateParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSubcategories = selectedCategory === "marble" ? marbleSubcategories : selectedCategory === "mosaic" ? mosaicSubcategories : null;

  return (
    <PageTransition>
      <SEO 
        title={selectedCategory === 'all' ? 'Our Premium Stone Collection' : `${categories.find(c => c.id === selectedCategory)?.name || 'Products'} Collection`}
        description={`Explore our curated collection of ${selectedCategory === 'all' ? 'natural stones' : selectedCategory}. Premium quality, direct from quarry to your project.`}
        keywords={`${selectedCategory}, natural stone, marble, sandstone, quartzite, limestone, slate, Roop Stone Impex`}
      />
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">

        {/* Elegant Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.35em] uppercase text-accent font-medium mb-4">
            Curated Stone Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 relative inline-block">
            Our Products
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Over 150 premium natural stones, sourced directly from the finest quarries. One destination for every stone you need.
          </p>
        </div>

        {/* Category Navigation — elegant underline tabs */}
        <nav className="relative mb-8">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center border-b border-border min-w-max md:justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative px-4 md:px-6 py-3 text-sm tracking-wide transition-colors duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/70"
                  }`}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="category-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Subcategory Pills — for Marble and Mosaic */}
        <AnimatePresence>
          {activeSubcategories && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
            >
              <div className="flex justify-center px-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {activeSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryChange(sub.id)}
                      className={`px-4 py-1.5 text-xs tracking-wider uppercase border transition-all duration-300 ${
                        selectedSubcategory === sub.id
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count — minimal */}
        <div className="flex items-center justify-between mb-8 px-1">
          <p className="text-xs tracking-wider uppercase text-muted-foreground">
            {startIndex + 1}–{Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} stones
          </p>
          {totalPages > 1 && (
            <p className="text-xs tracking-wider uppercase text-muted-foreground">
              Page {safePage} / {totalPages}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedSubcategory}-${safePage}`}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7"
          >
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.02 }}
              >
                <Link to={`/products/${product.id}`} className="block h-full group">
                  <div className="overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="500"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 bg-muted">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    </div>

                    {/* Name + tags */}
                    <div className="pt-3 pb-2">
                      <h3 className="text-base font-semibold leading-tight tracking-wide text-foreground/70 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {product.properties.slice(0, 2).map((prop, i) => (
                          <span key={i} className="text-[10px] tracking-wider uppercase text-muted-foreground/70">
                            {prop}{i < Math.min(product.properties.length, 2) - 1 ? " · " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination — refined */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-14">
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage <= 1}
              className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage = page === 1 || page === totalPages || Math.abs(page - safePage) <= 1;
              const showEllipsis = (page === 2 && safePage > 3) || (page === totalPages - 1 && safePage < totalPages - 2);
              
              if (!showPage && !showEllipsis) return null;
              if (showEllipsis && !showPage) {
                return <span key={page} className="px-1 text-muted-foreground/50 text-xs">···</span>;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 text-xs tracking-wider transition-all duration-200 ${
                    page === safePage
                      ? "text-foreground border-b-2 border-accent font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}


      </div>
    </div>
    </PageTransition>
  );
};

export default Products;
