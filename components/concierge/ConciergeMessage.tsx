import { useEffect, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import type { GeneratedUIComponent } from "@/types/siteState";

import { GenerativeComponent } from "./GenerativeComponent";

interface ConciergeMessageProps {
  role: "user" | "assistant";
  content: string;
  uiComponents?: GeneratedUIComponent[];
  isLatest?: boolean;
}

export function ConciergeMessage({ role, content, uiComponents, isLatest = false }: ConciergeMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messageRef.current;
    if (!el || !isLatest) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
    );

    return () => tween.kill();
  }, [isLatest]);

  const isUser = role === "user";

  return (
    <div ref={messageRef} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-6 py-4",
          isUser
            ? "bg-[var(--accent-color)] text-black rounded-br-sm"
            : "bg-white/5 backdrop-blur-md border border-white/10 rounded-bl-sm text-white",
        )}
      >
        <p className={cn("text-base leading-relaxed whitespace-pre-wrap", isUser ? "font-medium" : "font-light")}>
          {content}
        </p>

        {!isUser && uiComponents && uiComponents.length > 0 && (
          <div className="mt-4 space-y-3">
            {uiComponents.map((component, index) => (
              <GenerativeComponent key={index} component={component} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

