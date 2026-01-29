import cncImage from "@/assets/cnc-machinery.jpg";
import { motion } from "framer-motion";
import PageTransition, { fadeIn, slideUp, staggerContainer, staggerItem } from "@/components/PageTransition";
import { BrochureHero } from "@/components/brochure/BrochureHero";
import { RoadmapTimeline } from "@/components/brochure/RoadmapTimeline";
import { Section } from "@/components/brochure/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Film, Instagram, Linkedin, Mail, Phone, TrendingUp } from "lucide-react";

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
            <Section id="intro" eyebrow="THE WHY" title="Carve Your Legacy in Stone" className="py-14 md:py-18">
              <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center"
              >
                <div className="max-w-prose space-y-5 text-base font-normal leading-loose text-muted-foreground md:text-lg">
                  <motion.p variants={slideUp}>
                    Roop Stone Impex invites the brightest minds to redefine how the world sees Natural Stone. This is not just
                    a design competition; it is a product launchpad.
                  </motion.p>
                  <motion.p variants={slideUp}>
                    We are looking for multidisciplinary teams to design, manufacture, and market the next generation of luxury
                    stone products using the finest materials from Rajasthan.
                  </motion.p>
                  <motion.p variants={slideUp} className="font-medium text-accent">Don&apos;t just design it. Build it. Sell it. Own it.</motion.p>
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

            {/* 3. Who Should Apply */}
            <Section id="talent" eyebrow="THE TALENT" title="Calling All Visionaries" className="py-14 md:py-18">
              <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <motion.div variants={slideUp}>
                    <p className="max-w-prose text-base font-normal leading-loose text-muted-foreground md:text-lg">
                      The strongest products aren’t built by one skill—they’re built by teams. This challenge is designed for
                      students from different backgrounds to come together, combine their strengths, and make a name in the
                      industry.
                    </p>
                    <p className="max-w-prose mt-6 text-base font-normal leading-loose text-muted-foreground md:text-lg">
                      Architects and civil engineers shape what’s feasible. Product designers define form and function.
                      Cinematographers, filmmakers, and photographers build the story and the visual proof. Marketing,
                      management, and business students take it to market.
                    </p>
                  </motion.div>
                </div>

                {/* Team Formula Equation */}
                <div className="relative">
                  <div className="rounded-xl bg-[#111111] p-8 md:p-10 relative z-10">
                    <p className="text-center text-xs tracking-[0.2em] text-accent font-medium mb-8">THE SQUAD FORMULA</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:gap-8">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-lg md:text-2xl font-serif font-medium text-foreground">Architects & Designers</span>
                      </div>
                      <span className="text-2xl text-accent font-serif">+</span>
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-lg md:text-2xl font-serif font-medium text-foreground">Filmmakers</span>
                      </div>
                      <span className="text-2xl text-accent font-serif">+</span>
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-lg md:text-2xl font-serif font-medium text-foreground">Marketers</span>
                      </div>
                      <span className="text-2xl text-accent font-serif hidden md:inline">=</span>
                      <div className="mt-4 md:mt-0 flex flex-col items-center gap-3 rounded-lg border border-accent/20 bg-accent/5 px-6 py-3">
                        <span className="text-xl md:text-2xl font-serif font-semibold text-accent">The Perfect Squad</span>
                      </div>
                    </div>
                  </div>
                  {/* Connector Line 1: Formula to Quote */}
                  <div className="absolute left-1/2 -bottom-8 h-8 w-px bg-accent/30 -translate-x-1/2" />
                </div>

                {/* The Advantage Pull-Quote - Centered */}
                <div className="relative py-8 text-center">
                  <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4">THE ADVANTAGE</p>
                  <p className="text-2xl md:text-3xl font-serif italic text-accent max-w-4xl mx-auto leading-relaxed">
                    &ldquo;Different disciplines. One outcome: a market-ready stone product—with a brand, a launch plan, and real commercial traction.&rdquo;
                  </p>
                  {/* Connector Line 2: Quote to Cards */}
                  <div className="absolute left-1/2 -bottom-4 h-4 w-px bg-accent/30 -translate-x-1/2" />
                </div>
              </motion.div>

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
                      <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Design + Build</h3>
                      <p className="mt-4 text-base font-normal leading-loose text-muted-foreground/80">
                        Architecture, Product Design, and Civil Engineering—turn ideas into engineered, buildable products.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={slideUp}>
                  <Card className="h-full border-0 bg-[#1A1A1A]">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Film className="h-5 w-5 text-accent" />
                        <p className="text-xs tracking-[0.18em] text-muted-foreground">THE STORYTELLERS</p>
                      </div>
                      <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Capture + Craft</h3>
                      <p className="mt-4 text-base font-normal leading-loose text-muted-foreground/80">
                        Cinematography, Filmmaking, and Photography—create premium visuals that sell the product.
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
                      <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Launch + Lead</h3>
                      <p className="mt-4 text-base font-normal leading-loose text-muted-foreground/80">
                        Marketing, Management, and Business—position, price, and launch to win real orders.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </Section>

            {/* 4. Roadmap */}
            <Section id="roadmap" eyebrow="THE PROCESS" title="The Roadmap" className="py-14 md:py-18">
              <RoadmapTimeline />
            </Section>

            {/* 5. The Ultimate Prize (Pyramid Hierarchy) */}
            <Section id="prize" eyebrow="THE INCENTIVE" title="The Ultimate Prize" className="py-14 md:py-18">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer} 
                className="space-y-8"
              >
                {/* 1. Main Paragraph */}
                <motion.p variants={slideUp} className="max-w-prose text-base font-normal leading-loose text-muted-foreground md:text-lg">
                  We don&apos;t just give out certificates. We build partnerships. Successful product lines will be inducted into
                  the Roop Stone Impex Premium Collection.
                </motion.p>

                {/* Hero Card - The Big Hook */}
                <motion.div variants={slideUp} className="relative overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-b from-card to-background p-8 text-center shadow-2xl md:p-12">
                  <p className="text-xs tracking-[0.2em] text-accent font-medium mb-4">THE INCENTIVE</p>
                  <h3 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    15-Year Revenue Royalty
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
                    <h4 className="font-sans text-sm font-semibold tracking-[0.15em] text-accent mb-2">THE DEAL</h4>
                    <p className="text-sm text-muted-foreground">Royalty of up to 10% on revenue per unit sold.</p>
                  </motion.div>
                  <motion.div variants={slideUp} className="rounded-lg border border-white/10 p-6 text-center">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.15em] text-accent mb-2">THE DURATION</h4>
                    <p className="text-sm text-muted-foreground">Contracts valid for up to 15 years.</p>
                  </motion.div>
                  <motion.div variants={slideUp} className="rounded-lg border border-white/10 p-6 text-center">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.15em] text-accent mb-2">THE OUTCOME</h4>
                    <p className="text-sm text-muted-foreground">Create today, earn from it for a decade.</p>
                  </motion.div>
                </div>
              </motion.div>
            </Section>

            {/* 6. Technical Toolbox */}
            <Section id="toolbox" eyebrow="THE CAPABILITIES" title="Your Playground" className="py-14 md:py-18">
              <motion.p 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={slideUp}
                className="max-w-prose text-base font-normal leading-loose text-muted-foreground md:text-lg"
              >
                You dream it, we help you build it. Available finishes and techniques:
              </motion.p>
              
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {/* All capabilities as elegant cards */}
                {[
                  { category: "TEXTURAL", items: ["Leathered", "Split Face", "Sandblasted", "River-washed"] },
                  { category: "PRECISION", items: ["CNC Carving", "Waterjet Cutting", "Shot Blasting"] },
                  { category: "CLASSIC", items: ["Honed", "Polished", "Tumbled", "Bush Hammered"] },
                ].map((group) => (
                  <motion.div 
                    key={group.category} 
                    variants={staggerItem}
                    className="rounded-lg border border-white/10 p-6"
                  >
                    <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-accent mb-4">
                      {group.category}
                    </h4>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-base text-foreground/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
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
                    Ready to set your future in stone?
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    Register your team and we'll share timelines, eligibility, and next steps.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button variant="outline" size="lg" asChild className="border-accent/40 hover:border-accent">
                      <a href="#">Register Your Team</a>
                    </Button>
                    <Button variant="ghost" size="lg" asChild>
                      <a href="#intro">Back to top</a>
                    </Button>
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
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-accent" />
                        <span>aadimittalyt@gmail.com</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                      href="#"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                      href="#"
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
