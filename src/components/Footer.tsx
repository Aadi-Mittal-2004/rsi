import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => scrollToTop(), 100);
  };

  return (
    <footer className="bg-white text-black border-t border-black/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" onClick={handleHomeClick} className="flex items-center gap-2 cursor-pointer">
              <img
                src="/navbar-logo.png"
                alt="Roop Stone Impex"
                className="h-7"
              />
            </a>
            <p className="text-sm text-black/60 font-light leading-relaxed">
              Your trusted partner for premium quality natural stones, sourced and crafted with excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wide mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" onClick={handleHomeClick} className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <Link to="/products" className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-medium tracking-wide mb-5">Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="/products?category=sandstone" onClick={(e) => { e.preventDefault(); navigate('/products?category=sandstone'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }} className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300 cursor-pointer">
                  Sandstone
                </a>
              </li>
              <li>
                <a href="/products?category=quartzite" onClick={(e) => { e.preventDefault(); navigate('/products?category=quartzite'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }} className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300 cursor-pointer">
                  Quartzite
                </a>
              </li>
              <li>
                <a href="/products?category=limestone" onClick={(e) => { e.preventDefault(); navigate('/products?category=limestone'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }} className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300 cursor-pointer">
                  Limestone
                </a>
              </li>
              <li>
                <a href="/products?category=mosaic" onClick={(e) => { e.preventDefault(); navigate('/products?category=mosaic'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }} className="text-sm text-black/50 font-light hover:text-black transition-colors duration-300 cursor-pointer">
                  Patterns & Panels
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-wide mb-5">Connect</h3>
            <div className="space-y-3">
              <p className="text-sm text-black/50 font-light">+91 9214083550</p>
              <p className="text-sm text-black/50 font-light">+91 7357923414</p>
              <p className="text-sm text-black/50 font-light">aadi.mittal@roopstoneimpex.email</p>
              <p className="text-sm text-black/50 font-light leading-relaxed">
                Old Ajmer Road, RICCO Industrial Area, Deoli, Rajasthan, India
              </p>
              <div className="flex gap-8 pt-6">
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300" aria-label="Facebook">
                  <Facebook className="h-4 w-4" strokeWidth={1} />
                </a>
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300" aria-label="Instagram">
                  <Instagram className="h-4 w-4" strokeWidth={1} />
                </a>
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" strokeWidth={1} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 mt-12 pt-8 text-center">
          <p className="text-xs text-black/40 font-light tracking-wide">© {new Date().getFullYear()} Roop Stone Impex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
