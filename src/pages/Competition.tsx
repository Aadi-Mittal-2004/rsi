import cncImage from "@/assets/cnc-machinery.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition, { fadeIn, slideUp, staggerContainer, staggerItem } from "@/components/PageTransition";
import { BrochureHero } from "@/components/brochure/BrochureHero";
import { RoadmapTimeline } from "@/components/brochure/RoadmapTimeline";
import { Section } from "@/components/brochure/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Film, Instagram, Lightbulb, Linkedin, Mail, Phone, TrendingUp } from "lucide-react";

const Competition = () => {
  const scrollToRegister = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-20">
        <div>
          <BrochureHero onRegister={scrollToRegister} />

          <main className="relative">
            {/* 2. Introduction */}
            <Section id="intro" eyebrow="THE STORY" title="The Industry is Stuck. Unstick It." className="py-14 md:py-18">
              <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center"
              >
                <div className="max-w-prose space-y-5 text-base font-normal leading-loose text-muted-foreground md:text-lg">
                  <motion.p variants={slideUp}>
                    For 20 years, the Indian stone industry has sold the same polished slabs. No innovation. No risk-taking.
                    We are opening our factory doors to change that.
                  </motion.p>
                  <motion.p variants={slideUp}>
                    We are looking for <span className="text-foreground font-medium">Architects</span> to reimagine the form, <span className="text-foreground font-medium">Geologists</span> to rediscover the material, and <span className="text-foreground font-medium">Marketers</span> to tell the new story.
                  </motion.p>
                  <motion.p variants={slideUp} className="font-medium text-accent">Your Mission: Create a design that forces the market to evolve.</motion.p>
                </div>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={cncImage}
                        alt="CNC machining stone in a moody factory environment"
                        className="h-56 w-full object-cover"
                        loading="lazy"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground">
                        A rare opportunity to move from concept to market with real production access and commercial scrutiny.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Section>

            {/* 3. Build Your Dream Team */}
            <Section id="talent" eyebrow="THE ROLES" title="Build Your Dream Team" className="py-14 md:py-18">
              <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-12"
              >
                
                {/* Team Formula Equation */}
                <div className="relative">
                  <div className="rounded-xl bg-[#111111] p-5 sm:p-8 md:p-10 relative z-10">
                    <p className="text-center text-xs tracking-[0.2em] text-accent font-medium mb-6 md:mb-8">THE SQUAD FORMULA</p>
                    <div className="flex flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-6 lg:gap-8">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-base sm:text-lg md:text-2xl font-serif font-medium text-foreground">1. Architects</span>
                        <span className="text-xs tracking-wider text-muted-foreground">DESIGN</span>
                      </div>
                      <span className="text-xl md:text-2xl text-accent font-serif">+</span>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-base sm:text-lg md:text-2xl font-serif font-medium text-foreground">2. Geologists</span>
                        <span className="text-xs tracking-wider text-muted-foreground">SCIENCE</span>
                      </div>
                      <span className="text-xl md:text-2xl text-accent font-serif">+</span>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-base sm:text-lg md:text-2xl font-serif font-medium text-foreground">3. Marketers</span>
                        <span className="text-xs tracking-wider text-muted-foreground">BUSINESS</span>
                      </div>
                      <span className="text-xl md:text-2xl text-accent font-serif hidden md:inline">=</span>
                      <div className="mt-3 md:mt-0 flex flex-col items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 sm:px-6 sm:py-3">
                        <span className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-accent">The Perfect Squad</span>
                      </div>
                    </div>
                  </div>
                  {/* Connector Line 1: Formula to Quote */}
                  <div className="absolute left-1/2 -bottom-8 h-8 w-px bg-accent/30 -translate-x-1/2" />
                </div>

                <motion.div 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={staggerContainer} 
                  className="mt-12 grid gap-6 md:grid-cols-3"
                >
                  <motion.div variants={slideUp}>
                    <Card className="h-full border-0 bg-[#1A1A1A]">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Compass className="h-5 w-5 text-accent" />
                          <p className="text-xs tracking-[0.18em] text-muted-foreground">THE CREATORS</p>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Architects & Designers</h3>
                        <p className="mt-4 text-base font-normal leading-loose text-muted-foreground/80">
                          Break the mold. Move beyond CAD and learn to design for real-world CNC and hand-carving. Create a product that carries your name.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={slideUp}>
                    <Card className="h-full border-0 bg-[#1A1A1A]">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Lightbulb className="h-5 w-5 text-accent" />
                          <p className="text-xs tracking-[0.18em] text-muted-foreground">THE SCIENTISTS</p>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">The Geologists</h3>
                        <p className="mt-4 text-base font-normal leading-loose text-muted-foreground/80">
                          Be the consultant. Don&apos;t just study rocks in a lab. Join our residency to analyze raw stone, advise designers on structural integrity, and rediscover lost textures in our quarry.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={slideUp}>
                    <Card className="h-full border-0 bg-[#1A1A1A]">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="h-5 w-5 text-accent" />
                          <p className="text-xs tracking-[0.18em] text-muted-foreground">THE STRATEGISTS</p>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Marketers & Entrepreneurs</h3>
                        <p className="mt-4 text-base font-normal leading-loose text-muted-foreground/80">
                          Don&apos;t have a design idea? That&apos;s fine. We need you to build the business case. Manage the budget, hire influencers, and create the launch strategy.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Section>

            {/* 4. The Support Ecosystem */}
            <Section id="support" eyebrow="THE SYSTEM" title="You Are Not Alone." className="py-14 md:py-18 bg-[#0A0A0A]">
              <div className="space-y-12">
                <motion.div 
                   initial="initial"
                   whileInView="animate"
                   viewport={{ once: true, margin: "-100px" }}
                   variants={staggerContainer}
                >
                  <p className="max-w-prose text-base font-normal leading-loose text-muted-foreground md:text-lg mb-10">
                    We don&apos;t expect you to know everything. The &quot;Creation Triad&quot; is with you at every step:
                  </p>

                  <div className="grid gap-6 md:grid-cols-3">
                     <motion.div variants={slideUp} className="rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                        <h4 className="font-serif text-xl font-semibold text-foreground mb-3">The Geologist Guild</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A dedicated team of geology students will act as technical consultants, helping you choose the right stone for your design.
                        </p>
                     </motion.div>
                     <motion.div variants={slideUp} className="rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                        <h4 className="font-serif text-xl font-semibold text-foreground mb-3">The Master Craftsmen</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Our in-house artisans will work alongside you to prove if your design is manufacturable.
                        </p>
                     </motion.div>
                     <motion.div variants={slideUp} className="rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                        <h4 className="font-serif text-xl font-semibold text-foreground mb-3">The Infrastructure</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Roop Stone provides the CNC machines, the raw material, and the capital. You just provide the vision.
                        </p>
                     </motion.div>
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* 5. Roadmap */}
            <Section id="roadmap" eyebrow="THE PROCESS" title="The Roadmap" className="py-14 md:py-18">
              <RoadmapTimeline />
            </Section>

            {/* 6. The Financials */}
            <Section id="prize" eyebrow="THE FINANCIALS" title="The Financials" className="py-14 md:py-18">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer} 
                className="space-y-8"
              >
                {/* 1. Main Paragraph */}
                <motion.p variants={slideUp} className="max-w-prose text-base font-normal leading-loose text-muted-foreground md:text-lg">
                  We don&apos;t just give out certificates. We build partnerships. Check the numbers.
                </motion.p>

                {/* Hero Card - The Big Hook */}
                <motion.div variants={slideUp} className="relative overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-b from-card to-background p-8 text-center shadow-2xl md:p-12">
                  <p className="text-xs tracking-[0.2em] text-accent font-medium mb-4">THE DEAL</p>
                  <h3 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Upto 10% Revenue Royalty for Upto 15 Years
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">& real-world funding to launch.</p>
                  <div className="my-6 h-px w-24 bg-accent/30 mx-auto" />
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground mx-auto">
                    This is a product pipeline—your team builds something commercial, with support, and owns the upside.
                  </p>
                </motion.div>

                {/* Supporting Details - 3 Column Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                  <motion.div variants={slideUp} className="rounded-lg border border-white/10 p-6 text-center">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.15em] text-accent mb-2">THE SEED FUND</h4>
                    <p className="text-sm text-muted-foreground">Up to ₹20,000 provided upfront to winning proposals for marketing and prototyping expenses.</p>
                  </motion.div>
                  <motion.div variants={slideUp} className="rounded-lg border border-white/10 p-6 text-center">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.15em] text-accent mb-2">THE ROYALTY</h4>
                    <p className="text-sm text-muted-foreground">A signed licensing agreement offering you upto 10% of gross sales for upto 15 years.</p>
                  </motion.div>
                  <motion.div variants={slideUp} className="rounded-lg border border-white/10 p-6 text-center">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.15em] text-accent mb-2">THE EXPOSURE</h4>
                    <p className="text-sm text-muted-foreground">Your name stamped on every product and featured in our catalog.</p>
                  </motion.div>
                </div>
              </motion.div>
            </Section>

            {/* 7. Footer / CTA */}
            <section id="cta" className="relative py-16 md:py-24">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background via-background to-[#111]" />
              <div className="container relative">
                {/* CTA Content */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <p className="text-sm tracking-[0.22em] text-accent mb-4">GET STARTED</p>
                  <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                    From Screen to Stone.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    The factory is waiting. The stone is ready. The budget is approved.
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center w-full">
                      <Button variant="outline" size="lg" asChild className="border-accent/40 hover:border-accent w-full sm:w-auto">
                        <Link to="/apply">Start Your Application</Link>
                      </Button>
                      <Button variant="ghost" size="lg" asChild className="w-full sm:w-auto">
                        <a href="#intro">Back to top</a>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground/60">
                      Open to students of Architecture, Design, Geology, and Business/Marketing.
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-12" />

                {/* Footer Info */}
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] text-accent">CONTACT</p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-accent" />
                        <span>+91 7357923714</span>
                      </p>
                      <a href="mailto:aadi@roopstoneimpex.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <Mail className="h-4 w-4 text-accent" />
                        <span>aadi@roopstoneimpex.in</span>
                      </a>
                      <a href="mailto:snipun@roopstoneimpex.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <Mail className="h-4 w-4 text-accent" />
                        <span>snipun@roopstoneimpex.in</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                      href="https://www.instagram.com/roopstone/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                      href="https://www.linkedin.com/in/roopstoneimpex"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="text-xs tracking-[0.14em] text-muted-foreground/60">
                    © {new Date().getFullYear()} ROOP STONE IMPEX. All rights reserved.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Competition;
