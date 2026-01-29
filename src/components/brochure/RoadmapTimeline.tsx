import { motion } from "framer-motion";
import { CheckCircle2, Factory, Lightbulb, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";

type Phase = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  bullets: string[];
};

const phases: Phase[] = [
  {
    icon: Lightbulb,
    title: "Immersion & Ideation",
    subtitle: "Explore the potential. Draft concepts with expert mentorship.",
    bullets: [
      "Explore the potential of Rajasthani natural stone.",
      "Receive mentorship on material properties, durability, and luxury aesthetics.",
      "Draft your initial product concepts.",
    ],
  },
  {
    icon: Factory,
    title: "The Factory Floor",
    subtitle: "Shortlisted teams only. Turn renders into reality.",
    bullets: [
      "Visit the Roop Stone Impex factory.",
      "Utilize CNC, Shot Blast, Leathering, Honing, and Polishing units.",
      "Work alongside master craftsmen and machine operators.",
      "Rigorous analysis against market giants for commercial viability.",
    ],
  },
  {
    icon: Rocket,
    title: "Go-To-Market",
    subtitle: "Create campaigns. Secure real purchase orders.",
    bullets: [
      "Seed funding: ₹15,000 – ₹20,000 marketing budget for selected prototypes.",
      "Create professional marketing assets (photo + film).",
      "Launch to market and bring in actual purchase orders.",
    ],
  },
];

export function RoadmapTimeline() {
  return (
    <div className="relative py-8">
      {/* Vertical golden line - centered */}
      <motion.div
        aria-hidden
        initial={{ height: 0, x: "-50%" }}
        whileInView={{ height: "100%", x: "-50%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent to-accent/20"
      />

      <div className="space-y-20">
        {phases.map((p, idx) => {
          const Icon = p.icon;
          const isEven = idx % 2 === 0;

          return (
            <div key={p.title} className="relative">
              {/* Timeline node - centered on the line */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: "-50%" }}
                whileInView={{ scale: 1, opacity: 1, x: "-50%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                aria-hidden
                className="absolute left-1/2 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-background shadow-lg"
              >
                <Icon className="h-6 w-6 text-accent" />
              </motion.div>

              {/* Content wrapper - alternates sides */}
              <div className="grid grid-cols-2 gap-8 pt-2">
                {/* Left side */}
                <div className="flex justify-end pr-12">
                  {isEven ? (
                    // Phase card on left for phases 1 & 3
                    <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="max-w-md rounded-lg border border-border bg-card p-6 shadow-sm"
                    >
                      <p className="text-xs font-medium tracking-[0.2em] text-accent">
                        PHASE {idx + 1}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-base font-normal leading-relaxed text-muted-foreground">
                        {p.subtitle}
                      </p>
                    </motion.div>
                  ) : (
                    // Bullets on left for phase 2 - right aligned
                    <ul className="max-w-md space-y-3 text-right pt-6">
                      {p.bullets.map((b, i) => (
                        <motion.li
                          key={b}
                          initial={{ x: -30, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                          className="flex flex-row-reverse gap-3 text-base font-normal leading-relaxed text-foreground/90"
                        >
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Right side */}
                <div className="flex justify-start pl-12">
                  {isEven ? (
                    // Bullets on right for phases 1 & 3
                    <ul className="max-w-md space-y-3 pt-6">
                      {p.bullets.map((b, i) => (
                        <motion.li
                          key={b}
                          initial={{ x: 30, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                          className="flex gap-3 text-base font-normal leading-relaxed text-foreground/90"
                        >
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    // Phase card on right for phase 2
                    <motion.div 
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="max-w-md rounded-lg border border-border bg-card p-6 shadow-sm"
                    >
                      <p className="text-xs font-medium tracking-[0.2em] text-accent">
                        PHASE {idx + 1}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-base font-normal leading-relaxed text-muted-foreground">
                        {p.subtitle}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* End marker */}
      <motion.div
        aria-hidden
        initial={{ scale: 0, x: "-50%" }}
        whileInView={{ scale: 1, x: "-50%" }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-1/2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-accent"
      >
        <div className="h-2 w-2 rounded-full bg-background" />
      </motion.div>
    </div>
  );
}
