import { cn } from "@/lib/utils";

interface TechnicalLabelProps {
  children: string;
  className?: string;
}

export function TechnicalLabel({ children, className }: TechnicalLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-ink/70" aria-hidden="true" />
      {children}
    </span>
  );
}

