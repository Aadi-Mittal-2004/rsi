import { useState, useEffect } from "react";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (~600px)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left - Contact info (hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-accent" />
            <a
              href="tel:+919214083550"
              className="font-medium text-foreground hover:text-accent transition-colors"
            >
              +91 9214083550
            </a>
          </div>

          {/* Center/Right - Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-center md:justify-end">
            <a
              href="tel:+919214083550"
              className="md:hidden flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border border-border text-foreground hover:border-accent hover:text-accent transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </a>

            <a
              href="https://wa.me/919214083550?text=Hi%20%E2%80%94%20I%20noticed%20you%20export%20natural%20stone.%20I%27m%20looking%20for%20a%20reliable%20supplier.%20Can%20we%20discuss%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border btn-whatsapp-anim transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">Chat</span>
            </a>

            <Link
              to="/contact#query-form"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm bg-accent text-[#F7F5F3] hover:bg-accent/90 btn-cta-hover transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Request Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
