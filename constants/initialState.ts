import type { SiteState } from "@/types/siteState";

export const INITIAL_SITE_STATE: SiteState = {
  mode: "anonymous",
  clientProfile: null,
  relevantCategories: [],
  uiSignals: {
    heroVariant: "default",
    vaultFilter: "all",
    showSimulation: false,
    showPackageBuilder: false,
    backgroundMood: "void",
    accentColor: "#C9A227",
  },
  conversationHistory: [],
  simulationData: null,
};

