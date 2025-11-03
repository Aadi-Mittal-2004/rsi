import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe2, Leaf, Scissors } from "lucide-react";
import heroImage from "@/assets/hero-stone.jpg";
import quartziteImg from "@/assets/quartzite-texture.jpg";
import graniteImg from "@/assets/granite-texture.jpg";
import marbleImg from "@/assets/marble-texture.jpg";
import sandstoneImg from "@/assets/sandstone-texture.jpg";

const Home = () => {
  const products = [
    { name: "Quartzite", image: quartziteImg, description: "Elegant veining with a warm, creamy base" },
    { name: "Granite", image: graniteImg, description: "Bold patterns with exceptional durability" },
    { name: "Marble", image: marbleImg, description: "Classic white with subtle grey veining" },
    { name: "Sandstone", image: sandstoneImg, description: "Natural layers with earthy warmth" },
  ];

  const advantages = [
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Every stone is meticulously inspected to meet the highest standards of quality and beauty.",
    },
    {
      icon: Globe2,
      title: "Global Experience",
      description: "We export our premium stones worldwide, catering to diverse architectural and design needs.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Our quarrying and processing methods are designed to be environmentally responsible.",
    },
    {
      icon: Scissors,
      title: "Custom Solutions",
      description: "We offer bespoke cutting and finishing to bring your unique design visions to life.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center text-background px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Roop Stone Impex</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Crafting Nature's Beauty into Stone
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/products">
              Explore Our Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Premium Collection */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Premium Collection</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our curated selection of the world's finest natural stones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.name}
                to="/products"
                className="group relative overflow-hidden rounded-lg aspect-square hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-background text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-background/90 text-sm">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">A Legacy in Stone</h2>
              <p className="text-muted-foreground mb-4">
                Discover our heritage of excellence. With decades of experience, we source the finest
                natural stones and transform them into masterpieces of design and durability, upholding
                a steadfast commitment to craftsmanship and quality.
              </p>
              <p className="text-muted-foreground mb-6">
                From quarry to final product, we adhere to the strictest quality controls to deliver
                superior natural stone that enhances architectural projects worldwide.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={quartziteImg}
                  alt="Stone texture 1"
                  className="rounded-lg w-full h-48 object-cover"
                />
                <img
                  src={graniteImg}
                  alt="Stone texture 2"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src={marbleImg}
                  alt="Stone texture 3"
                  className="rounded-lg w-full h-64 object-cover"
                />
                <img
                  src={sandstoneImg}
                  alt="Stone texture 4"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Roop Stone Advantage */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Roop Stone Advantage</h2>
            <p className="text-muted-foreground text-lg">
              Our commitment to excellence sets us apart in the global market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <advantage.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent text-accent-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're here to help you find the perfect stone. Contact us for inquiries or to request a quote.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
