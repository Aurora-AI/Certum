import { useMemo } from "react";

import { useSiteStore } from "@/store/useSiteStore";
import type { UISignals } from "@/types/siteState";

export function useUISignals() {
  const uiSignals = useSiteStore((state) => state.uiSignals);
  const mode = useSiteStore((state) => state.mode);

  const classes = useMemo(() => {
    const backgroundClasses: Record<UISignals["backgroundMood"], string> = {
      void: "bg-[#FFFFFF]",
      warm: "bg-[#F5F0E6]",
      trust: "bg-[#E6EDF5]",
      success: "bg-[#E6F5E6]",
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
