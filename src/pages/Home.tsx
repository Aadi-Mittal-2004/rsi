import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Globe2, Leaf, Scissors } from "lucide-react";
import { useState, useEffect } from "react";
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
const clientNames = ["Jagson India", "Mehta Stone", "SK World", "RM International", "Stone World"];

const Home = () => {

  // Background image rotation
  const backgroundImages = [heroImage, mainBackground];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000); // Change every 8 seconds for a relaxed gallery feel

    return () => clearInterval(bgInterval);
  }, []);



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
      icon: CheckCircle2,
      title: "Quality Assurance",
      description:
        "Every stone is meticulously inspected to meet the highest standards of quality and beauty.",
    },
    {
      icon: Globe2,
      title: "Global Experience",
      description:
        "We export our premium stones worldwide, catering to diverse architectural and design needs.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description:
        "Our quarrying and processing methods are designed to be environmentally responsible.",
    },
    {
      icon: Scissors,
      title: "Custom Solutions",
      description:
        "We offer bespoke cutting and finishing to bring your unique design visions to life.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - full bleed */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden" data-section-theme="dark">
      <div
        className="absolute inset-0 bg-cover bg-center kenburns-bg transform-gpu transition-all duration-2000"
        style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
      />

        {/* Dark scrim overlay for consistent readability across all slides */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
        {/* Vignette gradient for cinematic depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
          <p className="uppercase tracking-[0.35em] font-medium text-sm md:text-base text-white/90 mb-2 elegant-fade-in">
            Timeless Surfaces
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium mb-8 text-white drop-shadow-md elegant-fade-in" style={{ animationDelay: '0.15s' }}>
            Where Stone Becomes Art
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl elegant-fade-in" style={{ animationDelay: '0.3s' }}>
            Discover the timeless elegance of our natural stones for exquisite living.
          </p>
        </div>

        {/* Bottom shadow gradient for emphasis */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-15" />

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex flex-col items-center justify-center cursor-pointer scroll-indicator w-full opacity-50 hover:opacity-80 transition-opacity">
          <span className="text-muted-foreground text-xs tracking-widest mb-1">Scroll</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </section>


      {/* Premium Collection */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              Our Premium Collection
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
              Explore our curated selection of the world's finest natural
              stones.
            </p>
          </div>

          {/* Mobile: Swipeable carousel with scroll indicator */}
          <div className="md:hidden">
            <div className="flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x px-4">
              {products.map((product) => (
                <Link
                  key={product.name}
                  to={`/products?category=${product.category}`}
                  className="group relative overflow-hidden rounded-lg aspect-square transition-shadow duration-500 border-2 border-transparent hover:border-accent/50 w-[75vw] flex-shrink-0 snap-center"
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
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-2">
              {products.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-white/40"
                />
              ))}
            </div>
            <p className="text-center text-muted-foreground text-xs mt-2">← Swipe to browse →</p>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.name}
                to={`/products?category=${product.category}`}
                className="group relative overflow-hidden rounded-lg aspect-square transition-shadow duration-500 border-2 border-transparent hover:border-accent/50"
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
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* About Section - Broken Grid Layout */}
      <section className="py-20 px-4 bg-black text-white" data-section-theme="dark">
        <div className="container mx-auto">
          <div className="relative">
            {/* Image Grid - Primary Visual */}
            <div className="grid grid-cols-2 gap-4 md:w-3/5 md:ml-auto">
              <div className="space-y-4">
                <img
                  src={goldenTeakImg}
                  alt="Golden Teak Sandstone Texture"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={villaExteriorImg}
                  alt="Luxury Stone Villa Exterior"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src={quartziteWallImg}
                  alt="Quartzite Feature Wall"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={stackedSlateImg}
                  alt="Stacked Slate Detail"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Overlapping Text Container */}
            <div className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-1/2 mt-8 md:mt-0">
              <div className="bg-black/80 backdrop-blur-md p-8 md:p-10 rounded-lg shadow-2xl border border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                  A Legacy in Stone
                  <span className="absolute bottom-0 left-0 w-16 h-px bg-accent"></span>
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Discover our heritage of excellence. With decades of experience,
                  we source the finest natural stones and transform them into
                  masterpieces of design and durability, upholding a steadfast
                  commitment to craftsmanship and quality.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  From quarry to final product, we adhere to the strictest quality
                  controls to deliver superior natural stone that enhances
                  architectural projects worldwide.
                </p>
                <Link 
                  to="/about" 
                  className="group inline-flex items-center gap-3 text-muted-foreground hover:text-white font-light tracking-wide transition-all duration-300"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* The Roop Stone Advantage */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              The Roop Stone Advantage
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h2>
            <p className="text-muted-foreground text-lg mt-6">
              Our commitment to excellence sets us apart in the global market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="text-center group">
                <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  <advantage.icon className="h-10 w-10 text-accent" strokeWidth={0.75} />
                </div>
                <h3 className="text-lg font-medium mb-3 tracking-wide">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Trusted By Section */}
      <section className="py-20 bg-black" data-section-theme="dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block">
              Trusted Worldwide
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h3>
            <p className="text-muted-foreground text-sm mt-4 tracking-wide">
              Partnering with industry leaders across the globe
            </p>
          </div>
          
          {/* Static minimalist grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 max-w-4xl mx-auto items-center justify-items-center">
            {clientNames.map((name) => (
              <span 
                key={name} 
                className="text-muted-foreground text-lg md:text-xl font-medium tracking-wide whitespace-nowrap transition-opacity duration-300 hover:text-white/80 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-black text-white flex items-center justify-center" data-section-theme="dark">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            Get in Touch
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto mt-6 text-muted-foreground font-light leading-relaxed">
            We're here to help you find the perfect stone. Contact us for
            inquiries or to request a quote.
          </p>
          <Button asChild variant="outline" size="lg" className="px-10 py-8 text-lg hover:border-white">
            <Link to="/contact">
              <span className="mr-2">Get in Touch</span>
              <ArrowRight className="h-5 w-5" strokeWidth={1} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
