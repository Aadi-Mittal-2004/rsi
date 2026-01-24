import { MapPin, Phone, Mail } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Contact = () => {
  return (
    <PageTransition>
    <div className="min-h-screen pt-24 pb-12" data-section-theme="dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            Get in Touch
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Contact us directly to discuss your
            premium natural stone needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="text-center group">
            <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
              <Phone className="h-10 w-10 text-accent" strokeWidth={0.75} />
            </div>
            <h3 className="text-lg font-medium mb-3 tracking-wide">Phone</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Reach out to our sales team directly.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <a href="tel:+919214083550" className="text-white text-lg font-medium tracking-wide hover:text-accent transition-colors">
                +91 9214083550
              </a>
              <a href="tel:+917357923414" className="text-white text-lg font-medium tracking-wide hover:text-accent transition-colors">
                +91 7357923414
              </a>
            </div>
          </div>

          <div className="text-center group">
            <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
              <Mail className="h-10 w-10 text-accent" strokeWidth={0.75} />
            </div>
            <h3 className="text-lg font-medium mb-3 tracking-wide">Email</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">For general inquiries and support.</p>
            <a href="mailto:aadi.mittal@roopstoneimpex.email" className="text-white text-lg font-medium tracking-wide hover:text-accent transition-colors break-all mt-4 inline-block">
              aadi.mittal@roopstoneimpex.email
            </a>
          </div>

          <div className="text-center group">
            <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
              <MapPin className="h-10 w-10 text-accent" strokeWidth={0.75} />
            </div>
            <h3 className="text-lg font-medium mb-3 tracking-wide">Address</h3>
            <a 
              href="https://maps.app.goo.gl/vCza1eT2qfBgYx9Y9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-lg font-medium tracking-wide hover:text-accent transition-colors mt-4 inline-block"
            >
              Old Ajmer Road, RICCO Industrial Area, Deoli, Rajasthan, India
            </a>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Contact;
