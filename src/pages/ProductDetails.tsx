
import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
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

  // Session-based urgency toast — fires once per product per session
  useEffect(() => {
    const toastKey = `urgencyToast_${product.id}`;
    if (sessionStorage.getItem(toastKey)) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(toastKey, "true");
      toast(`📦 ${product.name} is in high demand this quarter`, {
        description: "Request your specs now to lock in current container availability.",
        action: {
          label: "Request Quote",
          onClick: () => {
            const el = document.querySelector("#query-form") || document.querySelector("a[href*='contact']");
            if (el && 'click' in el) (el as HTMLElement).click();
          },
        },
        duration: 8000,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [product.id, product.name]);

  const siteUrl = "https://roopstoneimpex.in";
  const categoryLabel = product.category.replace("-", " & ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image ? window.location.origin + product.image : undefined,
    "brand": {
      "@type": "Brand",
      "name": "Roop Stone Impex"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Roop Stone Impex",
      "url": "https://roopstoneimpex.in"
    },
    "category": `Building Materials > Natural Stone > ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
    "material": product.category.charAt(0).toUpperCase() + product.category.slice(1),
    "additionalProperty": product.properties.map(prop => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": prop
    }))
  };

  const breadcrumbs = [
    { name: "Home", url: `${siteUrl}/` },
    { name: "Products", url: `${siteUrl}/products` },
    { name: categoryLabel, url: `${siteUrl}/products?category=${product.category}` },
    { name: product.name, url: `${siteUrl}/products/${product.id}` },
  ];

  return (
    <PageTransition>
    <SEO 
      title={product.name}
      description={product.description}
      keywords={`${product.name}, ${product.category}, ${product.subcategory || ''}, natural stone, Roop Stone Impex`}
      image={product.image}
      url={`${siteUrl}/products/${product.id}`}
      type="product"
      structuredData={jsonLd}
      breadcrumbs={breadcrumbs}
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
            
            <p className="text-xs text-muted-foreground/70 mb-6 italic">
              ⏱ Most buyers request specs 2–3 weeks before container booking. Don't wait until slots fill up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-cta-hover bg-accent text-[#F7F5F3] hover:bg-accent/90 px-10 py-8 text-lg">
                <Link to="/contact#query-form">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="px-10 py-8 text-lg btn-whatsapp-anim">
                <a href={`https://wa.me/919214083550?text=${encodeURIComponent(`Hi — I'm interested in your ${product.name} (${product.category}). Can you share more details?`)}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
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
