import { Link } from "react-router-dom";
import { ArrowRight, Building2, Heart, Shield } from "lucide-react";
import quarryImage from "@/assets/querry.webp";
import craftsmanshipImage from "@/assets/worker.webp";
import PageTransition from "@/components/PageTransition";

const About = () => {
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
    <PageTransition>
    <div className="min-h-screen">
      {/* About Roop Stone Impex */}
      <section className="pt-24 pb-20 px-4" data-section-theme="dark">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">About Roop Stone Impex</h1>
            <p className="text-accent text-lg font-medium">A Leading Global Stone Export Agency</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Image with Years Badge */}
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src={quarryImage} 
                alt="Stone quarry" 
                className="w-full h-[600px] object-cover shadow-xl transition-transform duration-500 group-hover:scale-110" 
              />
              {/* Years Badge Overlay */}
              <div className="absolute bottom-6 right-6 bg-accent text-black px-6 py-6 rounded-lg shadow-2xl text-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] cursor-default">
                <span className="text-5xl font-bold block">43+</span>
                <span className="text-sm font-medium">Years Of</span>
                <span className="text-sm font-medium block">Experience</span>
              </div>
            </div>

            {/* Right - Text Content */}
            <div className="space-y-5 text-muted-foreground">
              <p>
                <strong className="text-foreground">Roop Stone Impex</strong> is an Indian company specializing in the 
                fabrication of Very Premium Quality Natural Stone products with a proud owner of stone quarries since 1982. 
                As leading natural stone cladding exporters in India, we have established ourselves as a trusted 
                natural stone supplier for global markets.
              </p>
              
              <p>
                Our main office is located in Deoli (Rajasthan) on the Old Ajmer Road, RICCO Industrial Area. 
                Our main products are Slate, Sandstone, Limestone, Quartzite, and Marble. We are the major manufacturers 
                and exporter of Natural Stone Tiles, Natural Stone Claddings, Stone Slabs, and Stone Veneer in all 
                standards and customize sizes, thicknesses, and surface finishes (flamed, brushed, polished, tumbled, etc.) 
                for various purposes.
              </p>
              
              <p>
                As a prominent Indian sandstone manufacturer, we can supply non-standard sizes and thicknesses as per 
                our customer's requirements. We not only supply the material to our buyer but also provide full logistic 
                solutions at a very competitive price.
              </p>
              
              <p>
                Being established natural stone cladding exporters in India, we ensure seamless delivery worldwide. 
                Our strength is our presence in India and across the Globe. Our competent & experienced team under 
                the guidance of our mentors makes us confident to provide our customers best quality natural stones 
                according to their requirements.
              </p>
              
              <p>
                Our reputation as a reliable natural stone supplier and Indian sandstone manufacturer is built on 
                decades of excellence. We provide customized packaging for our core products i.e. Slate, Sandstone, 
                Stone Cladding, Stone Slabs, and Stone Veneer as per International Packaging Standards, reinforcing 
                our position as premier natural stone cladding exporters in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 px-4 bg-black text-white" data-section-theme="dark">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              Our Core Values
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h2>
            <p className="text-muted-foreground text-lg mt-6">
              The principles that guide our work, our partnerships, and our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value) => (
              <div key={value.title} className="text-center group">
                <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  <value.icon className="h-10 w-10 text-accent" strokeWidth={0.75} />
                </div>
                <h3 className="text-lg font-medium mb-3 tracking-wide">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 px-4" data-section-theme="dark">
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
              <h2 className="text-4xl font-bold mb-6 relative inline-block">
                The Craftsmanship
                <span className="absolute bottom-0 left-0 w-16 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground mb-4">
                Our process is a blend of time-honored techniques and cutting-edge technology. Each slab is
                a testament to the skill of our artisans, who transform raw stone into works of art.
              </p>
              <p className="text-muted-foreground mb-6">
                We invest in the latest machinery to ensure precision, consistency, and a finish that
                reveals the true beauty of the material. From the quarry to your project, every step is
                executed with meticulous care.
              </p>
              <Link 
                to="/products" 
                className="group inline-flex items-center gap-3 text-muted-foreground hover:text-white font-light tracking-wide transition-all duration-300"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
};

export default About;
