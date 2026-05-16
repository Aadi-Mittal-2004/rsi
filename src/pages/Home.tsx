import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Globe2, Leaf, Scissors, Shield, Package, Clock, Truck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-bg-new-1.webp";
import mainBackground from "@/assets/home-bg-new-2.webp";
import silverGrayPolishedImg from "@/assets/products/silver-gray-polished.webp";
import rainbowImg from "@/assets/products/rainbow.webp";
import kotaBlueImg from "@/assets/products/kota-blue.webp";
import patternsImg from "@/assets/products/patterns-panels.webp";
import slateIndianAutumnImg from "@/assets/products/slate-indian-autumn.webp";
import legacyImg1 from "@/assets/generated/legacy_img_1_luxury_1772359881585.png";
import legacyImg2 from "@/assets/generated/legacy_img_2_luxury_1772359896592.png";
import legacyImg3 from "@/assets/generated/legacy_img_3_luxury_1772359911001.png";
import legacyImg4 from "@/assets/generated/legacy_img_4_luxury_1772359925757.png";

// Generated New Luxury Images
import galleryInsta1 from "@/assets/generated/luxury_villa_exterior_1772359277045.png";
import galleryInsta2 from "@/assets/generated/quartzite_feature_wall_1772359292214.png";
import galleryInsta3 from "@/assets/generated/limestone_luxury_floor_1772359308511.png";
import galleryInsta4 from "@/assets/generated/luxury_slate_texture_1772359350320.png";
import advantageSplitImage from "@/assets/products/sandstone-fossil-high-res.jpg";
import appFlooring from "@/assets/generated/app_flooring_1772359378532.png";
import appCladding from "@/assets/generated/app_cladding_1772359403793.png";
import appPoolDeck from "@/assets/generated/app_pool_deck_1772359417973.png";
import appFacade from "@/assets/generated/app_facades_1772359434259.png";

// Client/Partner names
const clientNames = ["Jagson India", "Mehta Stone", "SK World", "RM International"];

const Home = () => {
  const { scrollY } = useScroll();

  // --- Per-section parallax refs & transforms ---
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"], // smoother animation based on section visibility
  });
  
  const aboutY1 = useTransform(aboutProgress, [0, 1], [30, -30]); 
  const aboutY2 = useTransform(aboutProgress, [0, 1], [-30, 30]);
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



  // Background image rotation — non-blocking (no preload gate)
  const backgroundImages = [heroImage, mainBackground];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [secondImageReady, setSecondImageReady] = useState(false);

  // Pre-fetch only the second image in the background (first renders immediately)
  useEffect(() => {
    const img = new Image();
    img.src = mainBackground;
    img.onload = () => setSecondImageReady(true);
  }, []);

  useEffect(() => {
    // Only start rotation after second image is cached
    if (!secondImageReady) return;
    
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000); // Change every 8 seconds for a relaxed gallery feel

    return () => clearInterval(bgInterval);
  }, [secondImageReady]);



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
      name: "Slate",
      image: slateIndianAutumnImg,
      description: "Rich textures with deep, rustic colorations",
      category: "slate",
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
      <section className="sticky top-0 z-0 min-h-screen w-full relative" data-section-theme="dark">
        {/* Background wrapper - overflow-hidden only here so Ken Burns doesn't spill */}
        <div className="absolute inset-0 overflow-hidden">
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
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
        {/* Vignette gradient for cinematic depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-10" />
        {/* Strong gradient behind text area (bottom-left) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent pointer-events-none z-10" />

        {/* Bottom shadow gradient for emphasis */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-15" />
        </div>

        <div className="relative z-20 flex flex-col justify-center items-start min-h-screen text-left px-8 md:px-16 lg:px-24 pt-20 pb-16 md:pb-20 animate-fade-in">
          <p className="uppercase tracking-[0.35em] font-medium text-[10px] md:text-xs text-white/80 mb-5 md:mb-5 elegant-fade-in" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Zero Damage Packing · 43 Years · 20+ Countries
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium mb-6 md:mb-6 text-white elegant-fade-in" style={{ animationDelay: '0.15s', textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 4px 32px rgba(0,0,0,0.4)' }}>
            India's Most Trusted<br />Stone Exporter
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl elegant-fade-in leading-relaxed" style={{ animationDelay: '0.3s', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            When you <em className="not-italic font-semibold text-white">choose Roop Stone Impex</em>, you eliminate the #1 risk in stone procurement — breakage, delays, and inconsistent quality.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 elegant-fade-in" style={{ animationDelay: '0.45s' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" className="btn-cta-hover bg-accent text-[#F7F5F3] hover:bg-accent/90 px-8 py-6 text-base font-semibold tracking-wide shadow-lg group">
                <Link to="/contact#query-form">
                  <span className="mr-2">Get a Free Quote</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white/70 px-8 py-6 text-base font-semibold tracking-wide shadow-lg">
                <a href="https://wa.me/917357923414?text=Hi%20-%20I%27d%20like%20to%20schedule%20a%20call%20about%20stone%20exports" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Schedule a Call</span>
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator - absolute at bottom edge of hero */}
        <div
          className="absolute bottom-3 inset-x-0 z-30 flex flex-col items-center cursor-pointer group"
          onClick={() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-transparent to-white/40 group-hover:to-white/70 transition-colors duration-300" />
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
          <motion.div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6" style={{ y: collectionCardsY }}>
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
      <section className="py-20 px-4 bg-card text-card-foreground" ref={aboutRef}>
        <div className="container mx-auto">
          <div className="relative">
            {/* Image Grid - Primary Visual */}
            <div className="grid grid-cols-2 gap-4 md:w-3/5 md:ml-auto">
              <motion.div className="space-y-4" style={{ y: aboutY1 }}>
                <img
                  src={legacyImg1}
                  alt="Golden Teak Sandstone Detail"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={legacyImg2}
                  alt="Luxury Modern Villa Exterior with Stone"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div className="space-y-4 mt-8" style={{ y: aboutY2 }}>
                <img
                  src={legacyImg3}
                  alt="Luxurious Quartzite Feature Wall"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={legacyImg4}
                  alt="Rich Stacked Slate Texture"
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

      {/* Stone in the World - Inspirations Gallery */}
      <section className="py-24 px-4 bg-background overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold text-muted-foreground mb-4">Inspirations</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">Stone in the World</h2>
          </div>
          
          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
            {/* Large Feature - Spans 2 rows, 8 cols */}
            <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden">
              <img src={galleryInsta1} alt="Luxury Villa Exterior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span className="text-white font-medium tracking-wide text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-sm">Natural Stone · Villa Facade</span>
              </div>
            </div>
            
            {/* Top Right - 4 cols, 1 row */}
            <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden">
              <img src={galleryInsta2} alt="Quartzite Feature Wall" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span className="text-white font-medium tracking-wide text-xs bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-sm">Quartzite · Feature Wall</span>
              </div>
            </div>
            
            {/* Bottom Right - 2 cols, 1 row */}
            <div className="md:col-span-4 md:row-span-1 grid grid-cols-2 gap-4 md:gap-6">
              <div className="col-span-1 group relative overflow-hidden">
                <img src={galleryInsta3} alt="Limestone Luxury Floor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-white font-medium tracking-wide text-[10px] uppercase bg-black/50 backdrop-blur-sm px-2 py-1 rounded-sm">Limestone</span>
                </div>
              </div>
              <div className="col-span-1 group relative overflow-hidden">
                <img src={galleryInsta4} alt="Slate Texture Wall" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-white font-medium tracking-wide text-[10px] uppercase bg-black/50 backdrop-blur-sm px-2 py-1 rounded-sm">Slate Cladding</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
             <Link to="/products" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold hover:text-accent transition-colors pb-1 border-b border-foreground hover:border-accent">
               Explore the Collections <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* The Roop Stone Advantage */}
      <section className="bg-card w-full" ref={advantagesRef}>
        <div className="flex flex-col lg:flex-row w-full min-h-[800px]">
          {/* Left Column: Image */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <img src={advantageSplitImage} alt="Premium Quality Stone" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          
          {/* Right Column: Content */}
          <div className="lg:w-1/2 px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center">
            <motion.div style={{ y: advantagesHeadingY }} className="mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-medium mb-6">
                The Roop Stone Advantage
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Our commitment to excellence sets us apart in the global market. We don't just export stone; we export peace of mind.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14" style={{ y: advantagesCardsY }}>
              {advantages.map((advantage, index) => (
                <motion.div 
                  key={advantage.title} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <advantage.icon className="h-8 w-8 text-accent mb-5" strokeWidth={1} />
                  <h3 className="text-xl font-medium mb-3 font-serif">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
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

      {/* Applications Strip */}
      <section className="py-20 px-4 bg-background overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif font-medium tracking-wide">Where Our Stone Lives</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Flooring", image: appFlooring },
              { name: "Wall Cladding", image: appCladding },
              { name: "Pool Decks", image: appPoolDeck },
              { name: "Facades", image: appFacade },
            ].map((app) => (
              <div key={app.name} className="flex flex-col gap-4 group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <span className="text-center font-medium tracking-widest uppercase text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
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
            <Button asChild variant="ghost" size="lg" className="px-10 py-8 text-lg btn-whatsapp-anim">
              <a href="https://wa.me/917357923414?text=Hi%20-%20I%27d%20like%20to%20schedule%20a%20call%20about%20stone%20exports" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp Us</span>
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
