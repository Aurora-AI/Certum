import { cn } from "@/lib/utils";

type GridVariant = "dots" | "lines" | "combo";
type GridTone = "dark" | "light";

interface GridBackgroundProps {
  className?: string;
  variant?: GridVariant;
  tone?: GridTone;
}

export function GridBackground({ className, variant = "combo", tone = "dark" }: GridBackgroundProps) {
  const rgb = tone === "light" ? "255,255,255" : "0,0,0";

  const backgroundImage =
    variant === "dots"
      ? `radial-gradient(rgba(${rgb},0.06) 1px, transparent 1px)`
      : variant === "lines"
        ? `linear-gradient(to right, rgba(${rgb},0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(${rgb},0.03) 1px, transparent 1px)`
        : `radial-gradient(rgba(${rgb},0.05) 1px, transparent 1px), linear-gradient(to right, rgba(${rgb},0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(${rgb},0.03) 1px, transparent 1px)`;

  const backgroundSize = variant === "dots" ? "26px 26px" : variant === "lines" ? "80px 80px" : "26px 26px, 80px 80px, 80px 80px";

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ backgroundImage, backgroundSize }}
    />
  );
}
