import heroImage from "@/assets/hero-split-stone.jpg";
import stoneTexture from "@/assets/stone-texture.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrochureHeroProps = {
  onRegister?: () => void;
};

export function BrochureHero({ onRegister }: BrochureHeroProps) {
  return (
    <header className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-hero" />
      <div aria-hidden className="absolute inset-0 bg-hero" />
      {/* Background image removed */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/25 to-background" />

      <div className="container relative py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm tracking-[0.28em] text-accent">ROOP STONE IMPEX PRESENTS</p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              THE ROOP STONE INNOVATION CHALLENGE 2026
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              From Quarry to Legacy: Where Your Vision Becomes Industry.
            </p>

            <div className="mt-7">
              <span
                className={cn(
                  "inline-flex items-center rounded-md border border-accent/40 bg-secondary px-3 py-2",
                  "text-xs font-medium tracking-[0.14em] text-foreground shadow-gilded",
                )}
              >
                15-Year Revenue Royalty & Real-World Funding
              </span>
              <p className="mt-3 text-xs tracking-[0.14em] text-muted-foreground">
                Teams • Design • Manufacture • Market
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="outline" size="lg" onClick={onRegister} className="relative">
                <span className="relative z-10">Register Your Team</span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/25 to-transparent opacity-60 mask-image:linear-gradient(to_right,transparent,black,transparent) motion-safe:animate-shine"
                />
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="#roadmap">Explore the Roadmap</a>
              </Button>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Professional. Visionary. Industrial. Sophisticated.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/25 via-transparent to-transparent blur-2xl" />
            <figure className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <img
                src={heroImage}
                alt="Split scene: raw stone block versus a finished luxury stone product under moody lighting"
                className="h-[320px] w-full object-cover sm:h-[380px]"
                loading="eager"
              />
              <figcaption className="p-4">
                <p className="text-sm text-muted-foreground">
                  A challenge built for teams who can design, fabricate, and bring stone products to market.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </header>
  );
}
