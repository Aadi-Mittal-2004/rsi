import cncImage from "@/assets/cnc-machinery.jpg";
import { BrochureHero } from "@/components/brochure/BrochureHero";
import { RoadmapTimeline } from "@/components/brochure/RoadmapTimeline";
import { Section } from "@/components/brochure/Section";
import { Spotlight } from "@/components/brochure/Spotlight";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const LegacyProject = () => {
  const scrollToRegister = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-20">
        <Spotlight className="min-h-screen">
          <BrochureHero onRegister={scrollToRegister} />

          <main className="relative">
            {/* 2. Introduction */}
            <Section id="intro" eyebrow="THE WHY" title="Carve Your Legacy in Stone" className="py-14 md:py-18">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    Roop Stone Impex invites the brightest minds to redefine how the world sees Natural Stone. This is not just
                    a design competition; it is a product launchpad.
                  </p>
                  <p>
                    We are looking for multidisciplinary teams to design, manufacture, and market the next generation of luxury
                    stone products using the finest materials from Rajasthan.
                  </p>
                  <p className="text-foreground/90">Don&apos;t just design it. Build it. Sell it. Own it.</p>
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
              </div>
            </Section>

            {/* 3. Who Should Apply */}
            <Section id="apply" eyebrow="THE TALENT" title="Calling All Visionaries" className="py-14 md:py-18">
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="space-y-4">
                  <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    The strongest products aren’t built by one skill—they’re built by teams. This challenge is designed for
                    students from different backgrounds to come together, combine their strengths, and make a name in the
                    industry.
                  </p>
                  <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    Architects and civil engineers shape what’s feasible. Product designers define form and function.
                    Cinematographers, filmmakers, and photographers build the story and the visual proof. Marketing,
                    management, and business students take it to market.
                  </p>

                  <div className="rounded-md border border-border bg-secondary p-5">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">THE ADVANTAGE</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      Different disciplines. One outcome: a market-ready stone product—with a brand, a launch plan, and real
                      commercial traction.
                    </p>
                  </div>
                </div>

                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">TEAM FORMULA</p>
                    <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight">Build a balanced squad</h3>
                    <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                      <li>Architecture • Civil Engineering</li>
                      <li>Product / Industrial Design</li>
                      <li>Cinematography • Filmmaking • Photography</li>
                      <li>Marketing • Management • Business</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">THE CREATORS</p>
                    <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight">Design + Build</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Architecture, Product Design, and Civil Engineering—turn ideas into engineered, buildable products.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">THE STORYTELLERS</p>
                    <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight">Capture + Craft</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Cinematography, Filmmaking, and Photography—create premium visuals that sell the product.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">THE STRATEGISTS</p>
                    <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight">Launch + Lead</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Marketing, Management, and Business—position, price, and launch to win real orders.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* 4. Roadmap */}
            <Section id="roadmap" eyebrow="THE PROCESS" title="The Roadmap" className="py-14 md:py-18">
              <RoadmapTimeline />
            </Section>

            {/* 5. Reward */}
            <Section id="reward" eyebrow="THE LEGACY" title="The Ultimate Prize" className="py-14 md:py-18">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      We don&apos;t just give out certificates. We build partnerships. Successful product lines will be inducted into
                      the Roop Stone Impex Premium Collection.
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-md border border-border bg-secondary p-4">
                        <p className="text-xs tracking-[0.18em] text-muted-foreground">THE DEAL</p>
                        <p className="mt-2 text-sm text-foreground/90">Royalty of up to 10% on revenue per unit sold.</p>
                      </div>
                      <div className="rounded-md border border-border bg-secondary p-4">
                        <p className="text-xs tracking-[0.18em] text-muted-foreground">THE DURATION</p>
                        <p className="mt-2 text-sm text-foreground/90">Contracts valid for up to 15 years.</p>
                      </div>
                      <div className="rounded-md border border-border bg-secondary p-4">
                        <p className="text-xs tracking-[0.18em] text-muted-foreground">THE OUTCOME</p>
                        <p className="mt-2 text-sm text-foreground/90">Create today, earn from it for a decade.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">INCENTIVE</p>
                    <p className="mt-3 font-serif text-2xl font-semibold tracking-tight text-foreground">
                      15-Year Revenue Royalty
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">& real-world funding to launch.</p>
                    <div aria-hidden className="mt-6 h-px w-full bg-border" />
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                      This is a product pipeline—your team builds something commercial, with support, and owns the upside.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* 6. Technical Toolbox */}
            <Section id="toolbox" eyebrow="THE CAPABILITIES" title="Your Playground" className="py-14 md:py-18">
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                You dream it, we help you build it. Available finishes and techniques:
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">TEXTURAL</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                      <li>Leathered</li>
                      <li>Split Face</li>
                      <li>Sandblasted</li>
                      <li>River-washed</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">PRECISION</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                      <li>CNC Carving</li>
                      <li>Waterjet Cutting</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs tracking-[0.18em] text-muted-foreground">CLASSIC</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                      <li>Honed</li>
                      <li>Polished</li>
                      <li>Tumbled</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* 7. Footer / CTA */}
            <section id="cta" className="relative py-16">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />
              <div className="container relative">
                <Card className="overflow-hidden">
                  <CardContent className="p-6 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                          Ready to set your future in stone?
                        </h2>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                          Register your team and we’ll share timelines, eligibility, and next steps.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <Button variant="outline" size="lg" asChild>
                            <a href="#">Register Your Team Now at [Website URL]</a>
                          </Button>
                          <Button variant="ghost" size="lg" asChild>
                            <a href="#intro">Back to top</a>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-md border border-border bg-secondary p-5">
                          <p className="text-xs tracking-[0.18em] text-muted-foreground">CONTACT</p>
                          <div className="mt-3 space-y-2 text-sm text-foreground/90">
                            <p className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-primary" />
                              <span>[Phone Number]</span>
                            </p>
                            <p className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-primary" />
                              <span>[Email Address]</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            href="#"
                            aria-label="Instagram"
                          >
                            <Instagram className="h-5 w-5" />
                          </a>
                          <a
                            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            href="#"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <p className="ml-auto text-xs tracking-[0.18em] text-muted-foreground">ROOP STONE • 2026</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </Spotlight>
      </div>
    </div>
  );
};

export default LegacyProject;
