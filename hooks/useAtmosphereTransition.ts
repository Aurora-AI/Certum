import { useCallback } from "react";
import gsap from "gsap";

import { useSiteStore } from "@/store/useSiteStore";
import type { UISignals } from "@/types/siteState";

export function useAtmosphereTransition() {
  const backgroundMood = useSiteStore((state) => state.uiSignals.backgroundMood);

  const triggerTransition = useCallback((mood: UISignals["backgroundMood"]) => {
    useSiteStore.getState().setUISignals({ backgroundMood: mood });
  }, []);

  const pulseAccent = useCallback(() => {
    const root = document.documentElement;

    const tween = gsap.to(root, {
      "--accent-color-alpha": "rgba(201, 162, 39, 0.6)",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    } as Record<string, string | number>);

    return () => tween.kill();
  }, []);

  return {
    currentMood: backgroundMood,
    triggerTransition,
    pulseAccent,
  };
}

