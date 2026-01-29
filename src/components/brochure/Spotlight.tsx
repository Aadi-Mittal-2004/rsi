import * as React from "react";

import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  children: React.ReactNode;
  strength?: number; // 0..1
};

/**
 * Signature moment: a subtle spotlight that follows the pointer.
 * Respects prefers-reduced-motion.
 */
export function Spotlight({ className, children, strength = 0.8 }: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    },
    [enabled],
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("relative", className)}
      style={{
        // keep this minimal; all color uses semantic HSL tokens
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      } as React.CSSProperties}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-100",
          "[background:radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,30%),hsl(var(--foreground)/0.25),transparent_55%)]",
          "transition-opacity duration-500",
        )}
        style={{ opacity: enabled ? strength : 0 }}
      />
      {children}
    </div>
  );
}
