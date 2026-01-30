import { motion } from "framer-motion";
import { CheckCircle2, Factory, FileText, Rocket, Users } from "lucide-react";

type Phase = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  bullets: string[];
};

const phases: Phase[] = [
  {
    icon: Users,
    title: "The Open Call (Virtual)",
    subtitle: "Join the community. Find your squad.",
    bullets: [
      "Join the WhatsApp Community.",
      "Submit your rough concept or portfolio.",
      "Find potential teammates—Marketers, find your Designers here.",
    ],
  },
  {
    icon: Factory,
    title: "The Residency (Rajasthan)",
    subtitle: "The Golden Ticket. Free Stay & Food.",
    bullets: [
      "Day 1: Geology students lead the Quarry Survey.",
      "Day 2: Designers sketch concepts based on stone constraints.",
      "Day 3: Master Craftsmen review sketches for feasibility.",
    ],
  },
  {
    icon: FileText,
    title: "The Pitch (The Gateway)",
    subtitle: "Return home and finalize your plan.",
    bullets: [
      "Submit your Design + Feasibility Report.",
      "Present your Market Analysis.",
      "Successful pitches unlock the seed fund.",
    ],
  },
  {
    icon: Rocket,
    title: "The Launch",
    subtitle: "Execute. Sell. Earn.",
    bullets: [
      "We release your ₹15k-20k Seed Fund.",
      "You execute your marketing plan (Ads, Influencers, Samples).",
      "We manufacture the orders.",
    ],
  },
];

export function RoadmapTimeline() {
  return (
    <div className="relative py-8">
      {/* 
        CONTINUOUS VERTICAL LINE 
        - Absolute positioned relative to the container.
        - Mobile: Left-aligned (through the icon centers).
        - Desktop: Center-aligned.
      */}
      <motion.div
        aria-hidden
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent to-accent/20
                   left-[20px] md:left-1/2 md:-translate-x-1/2" 
      />

      <div className="space-y-12 md:space-y-0">
        {phases.map((p, idx) => {
          const Icon = p.icon;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={p.title} 
              className="relative grid items-center gap-6 md:gap-0
                         grid-cols-[40px_1fr] 
                         md:grid-cols-[1fr_80px_1fr]"
            >
              {/* 
                 MOBILE: ICON COLUMN (Col 1)
                 We only show the icon here on mobile.
              */}
              <div className="md:hidden flex justify-center">
                 <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background shadow-lg"
                >
                  <Icon className="h-5 w-5 text-accent" />
                </motion.div>
              </div>

              {/* 
                 DESKTOP: LEFT COLUMN (Col 1)
                 - If Even (0, 2..): Show Content
                 - If Odd (1..): Show Bullets (Right aligned) or Empty?
                   User wants Zig-Zag.
                   Phase 1 (index 0, even): Content Left, Bullets Right? Or Content Left.
                   Let's follow original: Phase 1 Content Left.
              */}
              <div className="hidden md:flex md:justify-end md:pr-8">
                {isEven ? (
                  <PhaseCard phase={p} index={idx} align="right" />
                ) : (
                  <PhaseBullets phase={p} align="right" />
                )}
              </div>

              {/* 
                 DESKTOP: CENTER ION COLUMN (Col 2)
                 This is the "spine". 
              */}
              <div className="hidden md:flex md:justify-center md:items-center relative h-full min-h-[150px]">
                 <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-background shadow-lg"
                >
                  <Icon className="h-6 w-6 text-accent" />
                </motion.div>
              </div>
              
              {/* 
                 DESKTOP: RIGHT COLUMN (Col 3)
              */}
              <div className="hidden md:flex md:justify-start md:pl-8">
                {isEven ? (
                  <PhaseBullets phase={p} align="left" />
                ) : (
                  <PhaseCard phase={p} index={idx} align="left" />
                )}
              </div>

              {/* 
                 MOBILE: CONTENT COLUMN (Col 2)
                 Stacked layout: Card then Bullets.
              */}
              <div className="md:hidden space-y-4 pt-1">
                 <PhaseCard phase={p} index={idx} align="left" mobile />
                 <PhaseBullets phase={p} align="left" mobile />
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
}

// Subcomponents for cleaner code relative to the main loop

function PhaseCard({ phase, index, align, mobile }: { phase: Phase; index: number; align: "left" | "right"; mobile?: boolean }) {
  return (
    <motion.div 
      initial={{ x: mobile ? 0 : align === "left" ? 50 : -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`rounded-lg border border-border bg-card p-5 shadow-sm 
                  ${mobile ? "w-full" : "max-w-md w-full"}`}
    >
      <p className="text-xs font-medium tracking-[0.2em] text-accent">
        PHASE {index + 1}
      </p>
      <h3 className="mt-2 font-serif text-xl md:text-2xl font-semibold tracking-tight text-foreground">
        {phase.title}
      </h3>
      <p className="mt-2 text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
        {phase.subtitle}
      </p>
    </motion.div>
  );
}

function PhaseBullets({ phase, align, mobile }: { phase: Phase; align: "left" | "right"; mobile?: boolean }) {
  return (
    <ul className={`space-y-3 pt-2 md:pt-6 ${mobile ? "" : "max-w-md w-full"}`}>
      {phase.bullets.map((b, i) => (
        <motion.li
          key={b}
          initial={{ x: mobile ? 0 : align === "left" ? 30 : -30, opacity: 0 }}
          whileInView={{ x:0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
          className={`flex gap-3 text-sm md:text-base font-normal leading-relaxed text-foreground/90 
                      ${!mobile && align === "right" ? "flex-row-reverse text-right" : ""}`}
        >
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
          <span>{b}</span>
        </motion.li>
      ))}
    </ul>
  );
}
