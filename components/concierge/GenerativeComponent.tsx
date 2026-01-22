import { useEffect, useRef } from "react";
import gsap from "gsap";

import type { AssetCategory, GeneratedUIComponent } from "@/types/siteState";

interface GenerativeComponentProps {
  component: GeneratedUIComponent;
}

export function GenerativeComponent({ component }: GenerativeComponentProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = componentRef.current;
    if (!el) return;
    const tween = gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
    return () => tween.kill();
  }, []);

  return <div ref={componentRef}>{renderComponent(component)}</div>;
}

function renderComponent(component: GeneratedUIComponent) {
  switch (component.type) {
    case "wealth_projection":
      return <WealthProjectionCard props={component.props} />;
    case "comparison":
      return <PlaceholderCard label="Comparison Component" />;
    case "product_card":
      return <PlaceholderCard label="Product Component" />;
    default:
      return null;
  }
}

function WealthProjectionCard({ props }: { props: Record<string, unknown> }) {
  const targetValue = typeof props.targetValue === "number" ? props.targetValue : null;
  const timeHorizon = typeof props.timeHorizon === "number" ? props.timeHorizon : null;
  const categories = Array.isArray(props.categories) ? props.categories : null;

  if (targetValue === null || timeHorizon === null) return null;

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(targetValue);

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-white/40 tracking-wider">PROJEÇÃO GERADA</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-white/60 text-sm">Objetivo</span>
          <span className="text-[var(--accent-color)] text-xl font-light">{formattedValue}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-white/60 text-sm">Prazo</span>
          <span className="text-white text-lg font-light">{timeHorizon} meses</span>
        </div>

        {categories && categories.length > 0 && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/5 flex-wrap">
            {categories.map((cat) => (
              <span key={String(cat)} className="px-2 py-1 bg-white/5 rounded text-xs text-white/60 font-mono">
                {formatCategory(cat)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatCategory(value: unknown) {
  const str = typeof value === "string" ? value : "";
  return str.replaceAll("_", " ");
}

function PlaceholderCard({ label }: { label: string }) {
  return <div className="text-white/40 text-sm">{label}</div>;
}

