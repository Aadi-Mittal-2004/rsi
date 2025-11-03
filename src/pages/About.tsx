import { Award, Building2, Heart, Shield } from "lucide-react";
import heroImage from "@/assets/hero-stone.jpg";
import quarryImage from "@/assets/quarry.jpg";
import craftsmanshipImage from "@/assets/craftsmanship.jpg";

const About = () => {
  const timeline = [
    { year: "1995", event: "Foundation of Roop Stone Impex" },
    { year: "2002", event: "First International Export" },
    { year: "2010", event: "ISO 9001 Certification" },
    { year: "2018", event: "Launch of Sustainable Quarrying Initiative" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Uncompromising Quality",
      description:
        "From quarry to final product, we adhere to the strictest quality controls to deliver superior natural stone.",
    },
    {
      icon: Heart,
      title: "Integrity & Trust",
      description:
        "We build lasting relationships through transparent, honest, and ethical business practices.",
    },
    {
      icon: Building2,
      title: "Sustainability",
      description:
        "We are committed to responsible sourcing and environmentally conscious processes to protect our planet.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center text-background px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Crafting Nature's Legacy: The Story of Roop Stone Impex
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our journey, our values, and our unwavering commitment to quality in every stone we
            shape.
          </p>
        </div>
      </section>

      {/* Our Heritage */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Heritage</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Founded on the principles of quality and integrity, Roop Stone Impex has grown from a humble
              beginning to a leading manufacturer and exporter of premium natural stones. Our journey is one
              of passion, precision, and a deep respect for nature's artistry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">A Journey Through Time</h3>
              <div className="space-y-6">
                {timeline.map((item) => (
                  <div key={item.year} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold">
                        <Award className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{item.event}</h4>
                      <p className="text-muted-foreground">{item.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={quarryImage} alt="Stone quarry" className="rounded-lg w-full h-[500px] object-cover shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide our work, our partnerships, and our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6 bg-background rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src={craftsmanshipImage}
                alt="Craftsmanship"
                className="rounded-lg w-full h-[500px] object-cover shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">The Craftsmanship</h2>
              <p className="text-muted-foreground mb-4">
                Our process is a blend of time-honored techniques and cutting-edge technology. Each slab is
                a testament to the skill of our artisans, who transform raw stone into works of art.
              </p>
              <p className="text-muted-foreground mb-6">
                We invest in the latest machinery to ensure precision, consistency, and a finish that
                reveals the true beauty of the material. From the quarry to your project, every step is
                executed with meticulous care.
              </p>
              <a
                href="/products"
                className="inline-flex items-center text-accent hover:underline font-medium"
              >
                Explore Our Products →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
