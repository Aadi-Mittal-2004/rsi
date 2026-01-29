import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/competition", label: "Competition" },
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
      
      // Default to dark since the entire site is in dark mode
      setNavTheme(theme || "dark");
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 items-center py-2 md:py-3">
            {/* Left: Logo */}
            <div className="flex items-center pl-4 md:pl-8">
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

            {/* Right: Links + Mobile Menu (aligned right) */}
            <div className="flex justify-end items-center gap-4 pr-4 md:pr-8">
              <div className="hidden md:flex items-center gap-8">
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
