import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { products, Product } from "@/data/products";
import PageTransition, { staggerContainer, staggerItem } from "@/components/PageTransition";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  
  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSelectedSubcategory("all"); // Reset subcategory when category changes
  }, [categoryFromUrl]);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "sandstone", name: "Sandstone" },
    { id: "quartzite", name: "Quartzite" },
    { id: "limestone", name: "Limestone" },
    { id: "mosaic", name: "Patterns & Panels" },
  ];

  const subcategories = [
    { id: "all", name: "All" },
    { id: "pebbles", name: "Pebbles" },
    { id: "corner-pieces", name: "Corner Pieces" },
    { id: "wall-cladding", name: "Wall Cladding" },
    { id: "matrix", name: "Matrix" },
    { id: "stone-patterns", name: "Stone Patterns" },
  ];

  const filteredProducts = products.filter((p) => {
    // Category filter
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    // Subcategory filter (only for mosaic category)
    if (selectedCategory === "mosaic" && selectedSubcategory !== "all" && p.subcategory !== selectedSubcategory) return false;
    return true;
  });

  return (
    <PageTransition>
    <div className="min-h-screen pt-24 pb-12" data-section-theme="dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            Our Products
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our extensive collection of premium natural stones, perfect for any project.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedSubcategory("all");
              }}
              className="min-w-[120px]"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Subcategory Filter - Only shown for Patterns & Panels */}
        <AnimatePresence>
          {selectedCategory === "mosaic" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {subcategories.map((sub) => (
                <Button
                  key={sub.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`transition-all duration-300 ${
                    selectedSubcategory === sub.id 
                      ? "bg-white text-black border-white hover:bg-white/90" 
                      : "bg-transparent text-muted-foreground border-white/10 hover:border-white/40 hover:text-white hover:bg-transparent"
                  }`}
                >
                  {sub.name}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedSubcategory}`}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.015 }}
              >
                <Link to={`/products/${product.id}`} className="block h-full">
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-white h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="400"
                        className="w-full h-full object-cover scale-150 transition-transform duration-300 group-hover:scale-[1.65]"
                      />
                    </div>
                    <CardHeader className="flex-none text-left">
                      <CardTitle className="text-xl group-hover:text-white transition-colors line-clamp-1" title={product.name}>{product.name}</CardTitle>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.properties.slice(0, 3).map((prop, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground">
                            {prop}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Info Section */}
        <div className="mt-16 text-center bg-black text-white rounded-lg p-8 border border-white">
          <h2 className="text-2xl font-bold mb-4">Looking for something specific?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We have a wide variety of natural stones in stock. Contact us to discuss your requirements
            and we'll help you find the perfect stone for your project.
          </p>
          <Button asChild className="bg-transparent border-white text-white hover:border-accent hover:text-accent hover:bg-transparent transition-colors" variant="outline">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Products;
