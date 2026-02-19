import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import SEO from "@/components/SEO";

const Blog = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <SEO
        title="Blog | Natural Stone Guides & Insights"
        description="Expert guides on natural stone cladding, quartzite, sandstone, and limestone. Buying tips, maintenance advice, design trends, and export insights from Roop Stone Impex."
        keywords="natural stone blog, quartzite guide, sandstone paving tips, stone cladding trends, Indian stone exporter blog"
        url="https://roopstoneimpex.in/blog"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4"
          >
            Knowledge &amp; Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
            style={{ fontFamily: "'Poiret One', cursive" }}
          >
            The Stone Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            Expert guides, buying advice, and design inspiration for architects, builders,
            and stone enthusiasts worldwide.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs font-medium tracking-wider uppercase px-3 py-1.5 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-medium leading-snug group-hover:text-primary/80 transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary/70 group-hover:text-primary transition-colors duration-300 pt-1">
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: "'Poiret One', cursive" }}
          >
            Need Stone for Your Project?
          </h2>
          <p className="text-muted-foreground font-light mb-8 max-w-xl mx-auto">
            43 years of expertise. Zero-damage deliveries. Get a free quote for premium
            quartzite, sandstone, and limestone from Rajasthan.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#C4A265] hover:bg-[#B8944F] text-[#F7F5F3] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A265]/20"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Blog;
