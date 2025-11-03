import { Link } from "react-router-dom";
import { Diamond, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Diamond className="h-6 w-6" />
              <span className="font-bold text-lg">Roop Stone Impex</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for premium quality natural stones, sourced and crafted with excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Marble</li>
              <li className="text-sm text-muted-foreground">Granite</li>
              <li className="text-sm text-muted-foreground">Quartzite</li>
              <li className="text-sm text-muted-foreground">Sandstone</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Phone: +91 123 456 7890</p>
              <p className="text-sm text-muted-foreground">info@roopstone.com</p>
              <p className="text-sm text-muted-foreground">
                123 Stone Avenue, Jaipur, Rajasthan, 302001, India
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Roop Stone Impex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
