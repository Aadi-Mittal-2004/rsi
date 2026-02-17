
import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  
  // Combine primary image with additional images
  const allImages = product ? [product.image, ...(product.images || [])] : [];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The product you are looking for does not exist.
        </p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": window.location.origin + product.image,
    "brand": {
      "@type": "Brand",
      "name": "Roop Stone Impex"
    },
    "category": product.category,
    "keywords": product.properties.join(", "),
    "additionalProperty": product.properties.map(prop => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": prop
    }))
  };

  return (
    <PageTransition>
    <SEO 
      title={product.name}
      description={product.description}
      keywords={`${product.name}, ${product.category}, ${product.subcategory || ''}, natural stone, Roop Stone Impex`}
      image={product.image}
      url={window.location.href}
      type="product"
      structuredData={jsonLd}
    />
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Link
          to={`/products?category=${product.category}${product.subcategory ? `&subcategory=${product.subcategory}` : ''}`}
          className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Section with Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div
              className="relative overflow-hidden shadow-lg border border-border bg-gray-50 cursor-zoom-in group"
              onClick={() => openLightbox(selectedImageIndex)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={allImages[selectedImageIndex]}
                  src={allImages[selectedImageIndex]}
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-auto object-cover max-h-[600px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Click to enlarge
                </span>
              </div>
            </div>
            
            {/* Thumbnail Strip - only shown when multiple images exist */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-accent shadow-md"
                        : "border-border hover:border-foreground/40 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Details Section */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-2 block">
              {product.category.replace("-", " & ")}
            </span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Recommended Usage:</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.usage}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Key Features:</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.properties.map((prop) => (
                  <li key={prop} className="flex items-center text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    {prop}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Fullscreen Lightbox Modal */}
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors p-2"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation Arrows - only if multiple images */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 z-10 text-white/80 hover:text-white transition-colors p-2 bg-black/30 rounded-full hover:bg-black/50"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 z-10 text-white/80 hover:text-white transition-colors p-2 bg-black/30 rounded-full hover:bg-black/50"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Lightbox Image */}
          <motion.img
            key={allImages[selectedImageIndex]}
            src={allImages[selectedImageIndex]}
            alt={`${product.name} - Full view ${selectedImageIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Bottom Thumbnails in Lightbox */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(index); }}
                  className={`flex-shrink-0 w-14 h-14 overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-white shadow-lg"
                      : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
    </PageTransition>
  );
};

export default ProductDetails;
