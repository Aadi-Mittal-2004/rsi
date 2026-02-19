import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Globe2, Leaf, Scissors, Shield, Package, Clock, Truck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-bg-new-1.webp";
import mainBackground from "@/assets/home-bg-new-2.webp";
import quartziteImg from "@/assets/quartzite-texture.jpg";
import graniteImg from "@/assets/granite-texture.jpg";
import marbleImg from "@/assets/marble-texture.jpg";
import sandstoneImg from "@/assets/sandstone-texture.jpg";
import silverGrayPolishedImg from "@/assets/products/silver-gray-polished.jpg";
import rainbowImg from "@/assets/products/rainbow.jpg";
import kotaBlueImg from "@/assets/products/kota-blue.jpg";
import patternsImg from "@/assets/products/patterns-panels.png";
import goldenTeakImg from "@/assets/legacy/golden-teak.png";
import villaExteriorImg from "@/assets/legacy/villa-exterior.png";
import quartziteWallImg from "@/assets/legacy/quartzite-wall.png";
import stackedSlateImg from "@/assets/legacy/stacked-slate.png";

// Client/Partner names
const clientNames = ["Jagson India", "Mehta Stone", "SK World", "RM International"];

const Home = () => {
  const { scrollY } = useScroll();

  const aboutY1 = useTransform(scrollY, [500, 1500], [0, -50]);
  const aboutY2 = useTransform(scrollY, [500, 1500], [0, 50]);

  // --- Per-section parallax refs & transforms ---
  const collectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: collectionProgress } = useScroll({
    target: collectionRef,
    offset: ["start end", "end start"],
  });
  const collectionHeadingY = useTransform(collectionProgress, [0, 1], [60, -30]);
  const collectionCardsY = useTransform(collectionProgress, [0, 1], [80, -20]);

  const advantagesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: advantagesProgress } = useScroll({
    target: advantagesRef,
    offset: ["start end", "end start"],
  });
  const advantagesHeadingY = useTransform(advantagesProgress, [0, 1], [50, -25]);
  const advantagesCardsY = useTransform(advantagesProgress, [0, 1], [70, -15]);

  const trustedRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trustedProgress } = useScroll({
    target: trustedRef,
    offset: ["start end", "end start"],
  });
  const trustedHeadingY = useTransform(trustedProgress, [0, 1], [40, -20]);
  const trustedGridY = useTransform(trustedProgress, [0, 1], [50, -10]);

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaHeadingY = useTransform(ctaProgress, [0, 1], [50, -30]);
  const ctaButtonY = useTransform(ctaProgress, [0, 1], [30, -10]);



  // Background image rotation
  const backgroundImages = [heroImage, mainBackground];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = backgroundImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images", error);
        setImagesLoaded(true); // Proceed anyway to avoid getting stuck
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000); // Change every 8 seconds for a relaxed gallery feel

    return () => clearInterval(bgInterval);
  }, [imagesLoaded]);


  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
      </div>
    );
  }



  const products = [
    {
      name: "Quartzite",
      image: silverGrayPolishedImg,
      description: "Durable stones with metallic and earthy textures",
      category: "quartzite",
    },
    {
      name: "Sandstone",
      image: rainbowImg,
      description: "Natural layers with warm, earthy tones",
      category: "sandstone",
    },
    {
      name: "Limestone",
      image: kotaBlueImg,
      description: "Subtle elegance with smooth finishes",
      category: "limestone",
    },
    {
      name: "Patterns & Panels",
      image: patternsImg,
      description: "Decorative stone panels, pebbles & patterns",
      category: "mosaic",
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Zero Damage Packing",
      description:
        "What's your current supplier's breakage rate? We use double layer wooden crating, foam padded cardboard boxing, and weather sealed plastic wrapping, refined over 43 years.",
    },
    {
      icon: Truck,
      title: "End to End Logistics",
      description:
        "Full logistic solutions at competitive prices. We don't just supply, we deliver to your port, handled end to end with customs documentation.",
    },
    {
      icon: CheckCircle2,
      title: "14 Point Quality Check",
      description:
        "Every stone passes our 14 step quality control process before packing. From raw block inspection to container seal verification.",
    },
    {
      icon: Scissors,
      title: "Custom Fabrication",
      description:
        "Non standard sizes, thicknesses, and finishes, flamed, brushed, polished, tumbled, cut to your exact specifications. No minimums on customization.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - full bleed */}
      <section className="sticky top-0 z-0 h-[90vh] md:h-screen w-full overflow-hidden" data-section-theme="dark">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentBgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center kenburns-bg transform-gpu"
          style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
        />
      </AnimatePresence>

        {/* Dark scrim overlay for consistent readability across all slides */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
        {/* Vignette gradient for cinematic depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-start justify-end h-full text-left px-8 md:px-16 lg:px-24 pb-40 md:pb-40 animate-fade-in">
          <p className="uppercase tracking-[0.35em] font-medium text-[10px] md:text-xs text-white/80 mb-2 md:mb-6 elegant-fade-in">
            Zero Damage Packing · 43 Years · Trusted Worldwide
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium mb-2 md:mb-6 text-white drop-shadow-md elegant-fade-in" style={{ animationDelay: '0.15s' }}>
            India's Most Trusted<br />Stone Exporter
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl elegant-fade-in" style={{ animationDelay: '0.3s' }}>
            What's your current supplier's breakage rate? Ours has been near zero for 43 years. Quartzite, sandstone, limestone & slate, packed to perfection.
          </p>
          <div className="mt-6 md:mt-8 elegant-fade-in" style={{ animationDelay: '0.45s' }}>
            <Button asChild size="lg" className="btn-cta-hover bg-accent text-black hover:bg-accent/90 px-8 py-6 text-base font-semibold tracking-wide">
              <Link to="/contact#query-form">
                <span className="mr-2">Get Your Free Export Consultation</span>
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom shadow gradient for emphasis */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-15" />

        {/* Scroll Down Indicator */}
        <div
          className="absolute bottom-2 inset-x-0 z-20 flex flex-col items-center cursor-pointer group"
          onClick={() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/40 group-hover:to-white/70 transition-colors duration-300" />
          <ChevronDown className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors duration-300 animate-bounce mt-1" style={{ animationDuration: '2s' }} />
        </div>
      </section>


      {/* Content Layer – slides over the sticky hero */}
      <div className="relative z-10 bg-background">

      {/* Trust Authority Bar */}
      <section className="py-6 px-4 border-b border-border bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { icon: Shield, label: "Zero Damage Packing", sublabel: "14 Point Protocol" },
              { icon: Package, label: "500+ Containers", sublabel: "Shipped Worldwide" },
              { icon: Globe2, label: "20+ Countries", sublabel: "Global Exports" },
              { icon: Clock, label: "43+ Years", sublabel: "Of Excellence" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 group">
                <item.icon className="h-5 w-5 text-accent mb-1 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <span className="text-sm font-semibold tracking-wide text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Premium Collection */}
      <section id="products-section" className="py-20 px-4 overflow-hidden" ref={collectionRef}>
        <div className="container mx-auto">
          <motion.div className="text-center mb-12" style={{ y: collectionHeadingY }}>
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              Our Premium Collection
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
              Explore our curated selection of the world's finest natural
              stones.
            </p>
          </motion.div>

          {/* Mobile: Swipeable carousel with scroll indicator */}
          <div className="md:hidden">
            <div className="flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[75vw] flex-shrink-0 snap-center"
                >
                <Link
                  to={`/products?category=${product.category}`}
                  className="group relative overflow-hidden aspect-square transition-shadow duration-500 border-2 border-transparent hover:border-accent/50 block h-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-2 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                </Link>
                </motion.div>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-2">
              {products.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-foreground/40"
                />
              ))}
            </div>
            <p className="text-center text-muted-foreground text-xs mt-2">← Swipe to browse →</p>
          </div>

          {/* Desktop: Grid layout */}
          <motion.div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ y: collectionCardsY }}>
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <Link
                to={`/products?category=${product.category}`}
                className="group relative overflow-hidden aspect-square transition-shadow duration-500 border-2 border-transparent hover:border-accent/50 block h-full"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {product.description}
                  </p>
                </div>
              </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* About Section - Broken Grid Layout */}
      <section className="py-20 px-4 bg-card text-card-foreground">
        <div className="container mx-auto">
          <div className="relative">
            {/* Image Grid - Primary Visual */}
            <div className="grid grid-cols-2 gap-4 md:w-3/5 md:ml-auto">
              <motion.div className="space-y-4" style={{ y: aboutY1 }}>
                <img
                  src={goldenTeakImg}
                  alt="Golden Teak Sandstone Texture"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={villaExteriorImg}
                  alt="Luxury Stone Villa Exterior"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div className="space-y-4 mt-8" style={{ y: aboutY2 }}>
                <img
                  src={quartziteWallImg}
                  alt="Quartzite Feature Wall"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={stackedSlateImg}
                  alt="Stacked Slate Detail"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />

              </motion.div>
            </div>

            {/* Overlapping Text Container */}
            <div className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-1/2 mt-8 md:mt-0">
              <div className="bg-card/95 backdrop-blur-md p-8 md:p-10 rounded-lg shadow-2xl border border-border">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                  A Legacy in Stone
                  <span className="absolute bottom-0 left-0 w-16 h-px bg-accent"></span>
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You need a stone exporter you can trust. You know the risks — breakage during transit,
                  port delays, inconsistent quality grades. For over four decades,
                  we've eliminated those risks for buyers worldwide with our
                  14-point quality protocol and zero-damage packing system.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  From quarry selection to container loading, every step is
                  controlled and documented. When you <em className="text-foreground not-italic font-medium">partner with Roop Stone Impex</em>, you
                  get a supplier whose track record speaks for itself.
                </p>
                <Link 
                  to="/about" 
                  className="group inline-flex items-center gap-3 text-muted-foreground hover:text-foreground font-medium tracking-wide transition-all duration-300"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Stats Banner */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { value: "43+", label: "Years of Excellence", highlight: true },
              { value: "20+", label: "Countries Served" },
              { value: "100+", label: "Stone Varieties" },
              { value: "500+", label: "Projects Delivered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <span
                  className={`font-serif text-4xl md:text-5xl font-bold tracking-tight mb-2 ${
                    stat.highlight ? "text-accent" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-sm md:text-base tracking-wide uppercase font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* The Roop Stone Advantage */}
      <section className="py-32 px-4 bg-card overflow-hidden" ref={advantagesRef}>
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center mb-20" style={{ y: advantagesHeadingY }}>
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              The Roop Stone Advantage
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h2>
            <p className="text-muted-foreground text-lg mt-6">
              Our commitment to excellence sets us apart in the global market.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16" style={{ y: advantagesCardsY }}>
            {advantages.map((advantage, index) => (
              <motion.div 
                key={advantage.title} 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  <advantage.icon className="h-10 w-10 text-accent" strokeWidth={0.75} />
                </div>
                <h3 className="text-lg font-medium mb-3 tracking-wide">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Trusted By Section */}
      <section className="py-20 overflow-hidden" ref={trustedRef}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-10" style={{ y: trustedHeadingY }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block">
              Trusted Worldwide
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h3>
            <p className="text-muted-foreground text-sm mt-4 tracking-wide">
              Partnering with industry leaders across the globe
            </p>
          </motion.div>
          
          {/* Static minimalist grid */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto items-center justify-items-center" style={{ y: trustedGridY }}>
            {clientNames.map((name) => (
              <span 
                key={name} 
                className="text-muted-foreground text-lg md:text-xl font-medium tracking-wide whitespace-nowrap transition-opacity duration-300 hover:text-foreground/80 cursor-default"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-card flex items-center justify-center overflow-hidden" ref={ctaRef}>
        <div className="container mx-auto text-center max-w-3xl">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block" style={{ y: ctaHeadingY }}>
            Stop Risking Your Next Shipment
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
          </motion.h2>
          <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto mt-6 text-muted-foreground font-medium leading-relaxed">
            Every day you delay switching to a reliable supplier is another shipment at risk.
          </p>
          <p className="text-base mb-12 max-w-2xl mx-auto text-muted-foreground/80 leading-relaxed">
            Would you prefer to secure your container allocation now, or schedule a call with our export team for tomorrow?
          </p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ y: ctaButtonY }}>
            <Button asChild variant="outline" size="lg" className="btn-cta-hover px-10 py-8 text-lg hover:border-foreground">
              <Link to="/contact#query-form">
                <span className="mr-2">Request a Quote Now</span>
                <ArrowRight className="h-5 w-5" strokeWidth={1} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="px-10 py-8 text-lg text-muted-foreground hover:text-foreground">
              <a href="https://wa.me/919214083550?text=Hi%20-%20I%27d%20like%20to%20schedule%20a%20call%20about%20stone%20exports" target="_blank" rel="noopener noreferrer">
                <span>Schedule a Call Instead</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
      </div>{/* end content layer */}
    </div>
  );
};

export default Home;
