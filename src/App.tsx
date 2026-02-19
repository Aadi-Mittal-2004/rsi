import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO from "./components/SEO";
import ExitIntentPopup from "./components/ExitIntentPopup";
import UrgencyBanner from "./components/UrgencyBanner";
import StickyCTABar from "./components/StickyCTABar";

const queryClient = new QueryClient();

import Incubator from "./pages/Incubator";
import Apply from "./pages/Apply";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/incubator" element={<Incubator />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SEO 
          title="Roop Stone Impex"
          verification={{
            // google: "your-google-verification-code",
            // bing: "your-bing-verification-code",
            // yandex: "your-yandex-verification-code",
          }}
        />
        <ScrollToTop />
        <UrgencyBanner />
        <Navigation />
        <AnimatedRoutes />
        <Footer />
        <StickyCTABar />
        <WhatsAppButton />
        <ExitIntentPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
