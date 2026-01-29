import React from "react";
import { CheckCircle2, Factory, Lightbulb, Rocket } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "Phase 1: Immersion & Ideation",
    subtitle: "Explore the potential. Draft concepts with expert mentorship.",
    bullets: [
      "Explore the potential of Rajasthani natural stone.",
      "Receive mentorship on material properties, durability, and luxury aesthetics.",
      "Draft your initial product concepts.",
    ],
  },
  {
    icon: Factory,
    title: "Phase 2: The Factory Floor (Prototyping)",
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
    title: "Phase 3: Go-To-Market (The Launch)",
    subtitle: "Create campaigns. Secure real purchase orders.",
    bullets: [
      "Seed funding: \u20B915,000 \u2013 \u20B920,000 marketing budget for selected prototypes.",
      "Create professional marketing assets (photo + film).",
      "Launch to market and bring in actual purchase orders.",
    ],
  },
];

export function RoadmapTimeline() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {phases.map((p, idx) => {
        const Icon = p.icon;
        return (
          <Card key={p.title} className="relative overflow-hidden">
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-px",
                "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
              )}
            />
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-md border border-border bg-secondary shadow-sm">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-xl font-semibold tracking-tight">{p.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div aria-hidden className="mt-6 h-px w-full bg-border" />
              <p className="mt-4 text-xs tracking-[0.16em] text-muted-foreground">
                STEP {idx + 1} / {phases.length}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
