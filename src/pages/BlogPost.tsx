import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { blogContent } from "@/data/blogContent";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);
  const content = slug ? blogContent[slug] : undefined;

  if (!post || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light">Article Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category or adjacent posts)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : b.category === post.category ? 1 : 0))
    .slice(0, 3);

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `https://roopstoneimpex.in${post.image}`,
    author: {
      "@type": "Organization",
      name: "Roop Stone Impex",
      url: "https://roopstoneimpex.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Roop Stone Impex",
      logo: {
        "@type": "ImageObject",
        url: "https://roopstoneimpex.in/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://roopstoneimpex.in/blog/${post.slug}`,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <SEO
        title={post.title}
        description={post.metaDescription}
        keywords={post.keywords}
        url={`https://roopstoneimpex.in/blog/${post.slug}`}
        type="article"
        structuredData={articleSchema}
        breadcrumbs={[
          { name: "Home", url: "https://roopstoneimpex.in/" },
          { name: "Blog", url: "https://roopstoneimpex.in/blog" },
          { name: post.title, url: `https://roopstoneimpex.in/blog/${post.slug}` },
        ]}
      />

      {/* Back Button */}
      <div className="pt-28 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="px-4 md:px-8 pb-10">
        <div className="container mx-auto max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-xs tracking-[0.2em] uppercase text-[#C4A265] font-medium mb-4"
          >
            {post.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight mb-6"
            style={{ fontFamily: "'Poiret One', cursive" }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </header>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="px-4 md:px-8 pb-12"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl aspect-[21/9]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 md:px-8 pb-20"
      >
        <div
          className="container mx-auto max-w-3xl prose prose-lg dark:prose-invert prose-headings:font-light prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed prose-li:text-muted-foreground prose-li:font-light prose-strong:text-foreground prose-strong:font-medium prose-a:text-[#C4A265] prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:text-left prose-th:font-medium prose-td:py-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.article>

      {/* CTA Banner */}
      <section className="px-4 md:px-8 pb-16">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center">
            <h3
              className="text-2xl md:text-3xl font-light mb-3"
              style={{ fontFamily: "'Poiret One', cursive" }}
            >
              Ready to Source Premium Stone?
            </h3>
            <p className="text-muted-foreground font-light mb-6 max-w-lg mx-auto">
              Get a free quote from Roop Stone Impex. 43 years of expertise, zero-damage
              export guarantee, and direct quarry access.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#C4A265] hover:bg-[#B8944F] text-[#F7F5F3] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A265]/20"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="px-4 md:px-8 pb-24 border-t border-border pt-16">
        <div className="container mx-auto max-w-6xl">
          <h2
            className="text-2xl md:text-3xl font-light text-center mb-12"
            style={{ fontFamily: "'Poiret One', cursive" }}
          >
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="group block"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-4">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs tracking-wider uppercase text-muted-foreground font-medium">
                  {related.category}
                </span>
                <h3 className="text-base font-medium mt-2 leading-snug group-hover:text-primary/80 transition-colors duration-300">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPost;
