import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/incubator", label: "Incubator" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Track scroll position to switch navbar style (transparent over hero -> solid on scroll)
  const [scrolled, setScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      // Detect theme based on element at top center
      // We check slightly below the navbar (e.g. 80px) to see what's "behind" it
      const element = document.elementFromPoint(window.innerWidth / 2, 80);
      const section = element?.closest("[data-section-theme]");
      const theme = section?.getAttribute("data-section-theme") as "light" | "dark" | null;
      
      // Default based on whether dark class is on html
      const isDark = document.documentElement.classList.contains("dark");
      setNavTheme(theme || (isDark ? "dark" : "light"));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const shouldShowSolid = scrolled || !isHome;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-auto">
      {/* Background Layer with Slide Animation */}
      <div
        className={cn(
          "absolute inset-0 border-b shadow-lg transition-transform duration-700 ease-in-out backdrop-blur-md",
          navTheme === "dark" 
            ? "bg-black/20 border-white/10" 
            : "bg-white/20 border-black/5",
          shouldShowSolid ? "translate-y-0" : "-translate-y-full"
        )}
      />

      {/* Main Content Layer */}
      <div className="relative z-10 transition-colors duration-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center py-3 md:py-4">
            {/* Left: Logo */}
            <div className="flex-1 flex items-center">
              <Link
                to="/"
                className="flex items-center hover:opacity-80 transition-opacity"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img
                  src="/navbar-logo.png"
                  alt="Navbar Logo"
                  className={cn(
                    "h-5 md:h-7 transition-all duration-300",
                    navTheme === "dark" ? "filter invert" : ""
                  )}
                />
              </Link>
            </div>

            {/* Center: Nav Links (desktop only) */}
            <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12 whitespace-nowrap ml-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-base font-medium transition-all duration-300 relative tracking-wide",
                    isActive(link.href)
                      ? navTheme === "dark"
                        ? "text-white"
                        : "text-black"
                      : navTheme === "dark"
                      ? "text-white/60 hover:text-white"
                      : "text-black/60 hover:text-black"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent/70"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right: WhatsApp + Theme Toggle + Mobile Menu */}
            <div className="flex-1 flex justify-end items-center gap-3">
              <ThemeToggle className={cn(navTheme === "dark" ? "text-white" : "text-black")} />
              <a
                href={`https://wa.me/917357923414?text=${encodeURIComponent("Hello! I'm interested in your products.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  navTheme === "dark"
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-black/15 text-black hover:bg-black/5"
                )}
                aria-label="Contact us on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <div className="md:hidden">
                <button
                  className="p-2"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X
                      className={cn(
                        "h-6 w-6 transition-colors",
                        navTheme === "dark" ? "text-white" : "text-black"
                      )}
                    />
                  ) : (
                    <Menu
                      className={cn(
                        "h-6 w-6 transition-colors",
                        navTheme === "dark" ? "text-white" : "text-black"
                      )}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className={cn(
          "md:hidden py-4 animate-slide-in backdrop-blur-md border-t",
          navTheme === "dark" 
            ? "bg-black/95 border-white/10 text-white" 
            : "bg-white/95 border-black/10 text-black"
        )}>
          <div className="flex flex-col gap-4 container px-4 mx-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-accent py-2",
                  isActive(link.href)
                    ? "text-accent font-semibold"
                    : "currentColor"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
