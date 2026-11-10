import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO from "./components/SEO";
import ExitIntentPopup from "./components/ExitIntentPopup";
import UrgencyBanner from "./components/UrgencyBanner";
import StickyCTABar from "./components/StickyCTABar";

const queryClient = new QueryClient();

const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Incubator = lazy(() => import('./pages/Incubator'));
const Apply = lazy(() => import('./pages/Apply'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Pricing = lazy(() => import('./pages/Pricing'));
const StoneForApplication = lazy(() => import('./pages/StoneForApplication'));
const StoneComparison = lazy(() => import('./pages/StoneComparison'));
const ExportToCountry = lazy(() => import('./pages/ExportToCountry'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const StoneGuides = lazy(() => import('./pages/StoneGuides'));

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/incubator" element={<Incubator />} />
        <Route path="/competition" element={<Navigate to="/incubator" replace />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/:locale/blog" element={<Blog />} />
        <Route path="/:locale/blog/:slug" element={<BlogPost />} />
        <Route path="/guides/cold-climate-stone" element={<StoneGuides />} />
        <Route path="/thin-stone-veneer" element={<StoneGuides />} />
        {/* Programmatic SEO pages */}
        <Route path="/stone/:slug" element={<StoneForApplication />} />
        <Route path="/compare/:slug" element={<StoneComparison />} />
        <Route path="/export/:slug" element={<ExportToCountry />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
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
        <Suspense fallback={<main className="min-h-screen pt-32 px-4" aria-busy="true"><p role="status" className="text-center text-sm text-muted-foreground">Loading…</p></main>}>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
        <StickyCTABar />
        <WhatsAppButton />
        <ExitIntentPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
