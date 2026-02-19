import { Link } from "react-router-dom";
import { ArrowRight, Building2, Heart, Shield } from "lucide-react";
import quarryImage from "@/assets/querry.webp";
import craftsmanshipImage from "@/assets/worker.webp";
import PageTransition from "@/components/PageTransition";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "14 Point Quality Protocol",
      description:
        "Every stone passes a 14 step inspection before packing. Dimensional accuracy, surface finish, shade consistency, edge integrity, nothing leaves our facility unchecked.",
    },
    {
      icon: Heart,
      title: "Zero Excuses Policy",
      description:
        "Wrong specs? We re-cut. Shade mismatch? We re-sort. Damaged in transit? We replace. Our reputation is built on making problems disappear, not making excuses.",
    },
    {
      icon: Building2,
      title: "End to End Control",
      description:
        "From quarry selection to container loading, every step is documented and supervised. You get photo proof at each stage, not just promises.",
    },
  ];

  return (
    <PageTransition>
    <div className="min-h-screen">
      {/* About Roop Stone Impex */}
      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">About Roop Stone Impex</h1>
            <p className="text-accent text-lg font-medium">A Leading Global Stone Export Agency</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Image with Years Badge */}
            <div className="relative group overflow-hidden">
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
              <p className="text-foreground font-medium text-lg leading-relaxed border-l-2 border-accent pl-4">
                Every year, procurement managers lose their credibility because they trusted the wrong stone supplier. Broken cargo, delayed shipments, and sub grade material don't just cost money, they cost relationships and reputations.
              </p>
              
              <p>
                <strong className="text-foreground">Roop Stone Impex</strong> has been fabricating and exporting 
                premium quality natural stone since 1982. Based in Deoli, Rajasthan, the heart of India's stone belt, we 
                specialize in Slate, Sandstone, Limestone, Quartzite, and Marble.
              </p>
              
              <p>
                You need consistent quality. You need on-time delivery. You need a supplier who handles 
                logistics end to end. When you <em className="text-foreground not-italic font-medium">partner with Roop Stone Impex</em>, 
                you get all three, backed by 43 years of proven exports.
              </p>
              
              <p>
                We supply tiles, cladding, slabs, and veneer in all standard and custom sizes, 
                thicknesses, and surface finishes (flamed, brushed, polished, tumbled). We don't just 
                supply material, we provide full logistic solutions at competitive prices, from our 
                factory floor to your destination port.
              </p>
              
              <p>
                Our customized packaging follows International Packaging Standards, double layer wooden 
                crating, foam padded cardboard boxing, and weather sealed plastic wrapping. This 14 point 
                packing protocol, refined over four decades, is why our clients keep coming back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 px-4 bg-card text-card-foreground">
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src={craftsmanshipImage}
                alt="Craftsmanship"
                className="w-full h-[500px] object-cover shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6 relative inline-block">
                The Craftsmanship
                <span className="absolute bottom-0 left-0 w-16 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground mb-4">
                Our process combines decades of hands on experience with modern fabrication equipment. Each 
                slab is cut, finished, and inspected by a team that understands what international buyers expect, 
                because we've been shipping to them for 43 years.
              </p>
              <p className="text-muted-foreground mb-6">
                Every piece is individually inspected for dimensional accuracy, surface quality, shade consistency, 
                and edge integrity. Then it's packed using our 14 point protocol, the same system that keeps 
                our breakage rate near zero across thousands of containers shipped.
              </p>
              <Link 
                to="/products" 
                className="group inline-flex items-center gap-3 text-muted-foreground hover:text-foreground font-medium tracking-wide transition-all duration-300"
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
