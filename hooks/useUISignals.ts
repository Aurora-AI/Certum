import { useMemo } from "react";

import { useSiteStore } from "@/store/useSiteStore";
import type { UISignals } from "@/types/siteState";

export function useUISignals() {
  const uiSignals = useSiteStore((state) => state.uiSignals);
  const mode = useSiteStore((state) => state.mode);

  const classes = useMemo(() => {
    const backgroundClasses: Record<UISignals["backgroundMood"], string> = {
      void: "bg-[#0A0A0A]",
      warm: "bg-gradient-to-b from-[#0A0A0A] to-[#1A1A0A]",
      trust: "bg-gradient-to-b from-[#0A0A0A] to-[#0A0A1A]",
      success: "bg-gradient-to-b from-[#0A0A0A] to-[#0A1A0A]",
    };

    return {
      background: backgroundClasses[uiSignals.backgroundMood],
      accent: uiSignals.accentColor,
      isTransformed: mode !== "anonymous",
    };
  }, [uiSignals, mode]);

  return {
    ...uiSignals,
    mode,
    classes,
  };
}

