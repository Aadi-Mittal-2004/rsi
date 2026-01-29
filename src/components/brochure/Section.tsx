import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="container">
        <header className="mb-7">
          {eyebrow ? (
            <p className="text-sm tracking-[0.22em] text-accent">{eyebrow}</p>
          ) : null}
          <h2 className="mt-2 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
