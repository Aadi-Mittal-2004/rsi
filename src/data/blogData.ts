import quartziteImg from "@/assets/quartzite-texture.jpg";
import sandstoneImg from "@/assets/sandstone-texture.jpg";
import stoneTextureImg from "@/assets/stone-texture.jpg";
import quarryImg from "@/assets/quarry-new.jpg";
import workerImg from "@/assets/worker.webp";
import cncImg from "@/assets/cnc-machinery.jpg";
import craftsmanshipImg from "@/assets/craftsmanship-new.jpg";
import silverShineImg from "@/assets/products/silver-shine.jpg";
import rainbowImg from "@/assets/products/rainbow.jpg";
import teakwoodImg from "@/assets/products/teakwood.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-natural-stone-exterior-cladding",
    title: "How to Choose the Best Natural Stone for Exterior Cladding",
    metaDescription: "Discover how to select the perfect natural stone cladding for your exterior walls. Compare quartzite, sandstone, and limestone options with expert tips from Roop Stone Impex.",
    keywords: "natural stone cladding, exterior wall cladding, quartzite cladding, sandstone cladding, stone facade, best stone for exterior walls",
    excerpt: "Selecting the right natural stone for your building's exterior is one of the most important architectural decisions you'll make. This guide breaks down everything you need to know about quartzite, sandstone, and limestone cladding options.",
    image: stoneTextureImg,
    author: "Roop Stone Impex",
    date: "2026-02-15",
    category: "Buying Guide",
    readTime: "8 min read",
  },
  {
    slug: "indian-sandstone-paving-complete-buyers-guide",
    title: "Indian Sandstone Paving: The Complete Buyer's Guide",
    metaDescription: "Everything you need to know about Indian sandstone paving. From Kandla Grey to Autumn Brown, learn about colors, durability, installation, and costs.",
    keywords: "Indian sandstone paving, Kandla Grey sandstone, Autumn Brown sandstone, sandstone patio, garden paving, Indian stone supplier",
    excerpt: "Indian sandstone has become the go to choice for patios, driveways, and garden paths across the UK, USA, and Australia. Learn why architects and homeowners prefer it, and how to choose the right variety for your project.",
    image: sandstoneImg,
    author: "Roop Stone Impex",
    date: "2026-02-12",
    category: "Buying Guide",
    readTime: "10 min read",
  },
  {
    slug: "deoli-green-quartzite-why-architects-love-it",
    title: "Deoli Green Quartzite: Why Architects Love This Indian Stone",
    metaDescription: "Explore the beauty and durability of Deoli Green quartzite from Rajasthan. Learn about its unique properties, applications, and why top architects specify it worldwide.",
    keywords: "Deoli Green quartzite, green quartzite, premium quartzite, Indian quartzite, quartzite wall cladding, Rajasthan stone",
    excerpt: "Deoli Green quartzite is one of India's most sought after natural stones. With its rich emerald tones and exceptional durability, this Rajasthan quartzite has found its way into luxury projects on every continent.",
    image: quartziteImg,
    author: "Roop Stone Impex",
    date: "2026-02-10",
    category: "Product Spotlight",
    readTime: "7 min read",
  },
  {
    slug: "natural-stone-maintenance-sealing-cleaning-guide",
    title: "Natural Stone Maintenance: Sealing, Cleaning, and Long-Term Care",
    metaDescription: "Learn how to maintain, seal, and clean natural stone surfaces. Expert tips for quartzite, sandstone, and limestone care to keep your stone looking pristine for decades.",
    keywords: "natural stone maintenance, how to seal sandstone, clean quartzite, stone care guide, natural stone cleaning, stone sealing",
    excerpt: "Natural stone is built to last centuries, but proper maintenance ensures it stays beautiful throughout its lifetime. This comprehensive guide covers sealing, cleaning, stain removal, and seasonal care for every stone type.",
    image: craftsmanshipImg,
    author: "Roop Stone Impex",
    date: "2026-02-08",
    category: "Care & Maintenance",
    readTime: "9 min read",
  },
  {
    slug: "sustainable-natural-stone-responsible-quarrying",
    title: "Sustainable Natural Stone: How Responsible Quarrying Benefits Your Project",
    metaDescription: "Discover why natural stone is one of the most sustainable building materials. Learn about responsible quarrying practices and eco-friendly stone sourcing from India.",
    keywords: "sustainable stone, eco-friendly building materials, responsible quarrying, green building, natural stone sustainability, ethical stone sourcing",
    excerpt: "In an era where sustainability matters more than ever, natural stone stands out as one of the most environmentally responsible building materials available. Learn how responsible quarrying makes a real difference.",
    image: quarryImg,
    author: "Roop Stone Impex",
    date: "2026-02-05",
    category: "Sustainability",
    readTime: "6 min read",
  },
  {
    slug: "natural-stone-packing-export-avoid-breakage",
    title: "Natural Stone Packing for Export: How to Avoid Breakage",
    metaDescription: "Learn the proven packing methods that prevent stone breakage during international shipping. Roop Stone Impex shares 43 years of zero-damage export expertise.",
    keywords: "stone export packing, stone breakage rate, stone shipping logistics, natural stone packaging, export stone India, wooden crating stone",
    excerpt: "The industry average for stone breakage during export is 12 to 18 percent. At Roop Stone Impex, we have maintained zero damage deliveries for over four decades. Here is how our 14 point packing protocol works.",
    image: workerImg,
    author: "Roop Stone Impex",
    date: "2026-02-02",
    category: "Export & Logistics",
    readTime: "7 min read",
  },
  {
    slug: "natural-stone-trends-2025-architecture",
    title: "Top 5 Natural Stone Trends Shaping Architecture in 2025",
    metaDescription: "Explore the biggest natural stone design trends for 2025 including biophilic design, stone drenching, textured finishes, and sustainable sourcing.",
    keywords: "natural stone trends 2025, biophilic design stone, stone cladding ideas, architecture trends, textured stone finishes, stone drenching",
    excerpt: "From biophilic design to stone drenching, the world of architecture is embracing natural stone in exciting new ways. Discover the five trends driving the industry forward in 2025 and beyond.",
    image: silverShineImg,
    author: "Roop Stone Impex",
    date: "2026-01-28",
    category: "Trends & Inspiration",
    readTime: "6 min read",
  },
  {
    slug: "quartzite-vs-sandstone-vs-limestone-comparison",
    title: "Quartzite vs Sandstone vs Limestone: Which Stone Is Right for Your Project?",
    metaDescription: "A detailed comparison of quartzite, sandstone, and limestone for cladding, paving, and flooring. Compare durability, cost, maintenance, and best applications.",
    keywords: "quartzite vs sandstone, limestone cladding, stone comparison, best stone for paving, natural stone selection, quartzite durability",
    excerpt: "Choosing between quartzite, sandstone, and limestone can be overwhelming. This side by side comparison covers durability, aesthetics, cost, maintenance, and ideal applications to help you make the right choice.",
    image: rainbowImg,
    author: "Roop Stone Impex",
    date: "2026-01-25",
    category: "Buying Guide",
    readTime: "10 min read",
  },
  {
    slug: "guide-to-indian-stone-finishes",
    title: "The Ultimate Guide to Indian Stone Finishes: Polished, Honed, Flamed & More",
    metaDescription: "Understand every natural stone finish available from Indian manufacturers. From polished to flamed, brushed to tumbled, learn which finish suits your project best.",
    keywords: "stone finishes, flamed quartzite, polished sandstone, tumbled stone, honed limestone, brushed stone, natural cleft finish",
    excerpt: "The finish you choose for your natural stone completely transforms its appearance and performance. This guide explains every finish available from Indian stone manufacturers and when to use each one.",
    image: teakwoodImg,
    author: "Roop Stone Impex",
    date: "2026-01-20",
    category: "Product Knowledge",
    readTime: "8 min read",
  },
  {
    slug: "how-to-import-natural-stone-from-india",
    title: "How to Import Natural Stone from India: Logistics, Costs & Quality Checks",
    metaDescription: "A step-by-step guide to importing natural stone from India. Learn about logistics, costs, quality inspections, documentation, and finding the right supplier.",
    keywords: "import stone India, natural stone supplier, stone exporter Rajasthan, import natural stone, Indian stone logistics, bulk stone import",
    excerpt: "India is one of the world's largest exporters of natural stone, and for good reason. This guide walks you through the entire import process, from finding a supplier to receiving your shipment at port.",
    image: cncImg,
    author: "Roop Stone Impex",
    date: "2026-01-15",
    category: "Export & Logistics",
    readTime: "11 min read",
  },
];
