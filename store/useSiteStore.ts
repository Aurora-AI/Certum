import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { INITIAL_SITE_STATE } from "@/constants/initialState";
import type { ElysianQualifyResponse } from "@/types/elysian";
import type {
  AssetCategory,
  ClientProfile,
  ConversationMessage,
  SimulationPackage,
  SiteMode,
  SiteState,
  UISignals,
} from "@/types/siteState";

interface SiteStore extends SiteState {
  setMode: (mode: SiteMode) => void;
  setClientProfile: (profile: ClientProfile) => void;
  setUISignals: (signals: Partial<UISignals>) => void;
  setRelevantCategories: (categories: AssetCategory[]) => void;
  addConversationMessage: (message: ConversationMessage) => void;
  setSimulationData: (data: SimulationPackage) => void;
  applyElysianResponse: (response: ElysianQualifyResponse) => void;
  resetToAnonymous: () => void;
}

function createNoopStorage(): Storage {
  return {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
    clear: () => undefined,
    key: () => null,
    length: 0,
  };
}

export const useSiteStore = create<SiteStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_SITE_STATE,

        setMode: (mode) => set({ mode }, false, "setMode"),

        setClientProfile: (profile) =>
          set(
            {
              clientProfile: profile,
              mode: "qualified",
            },
            false,
            "setClientProfile",
          ),

        setUISignals: (signals) =>
          set(
            (state) => ({
              uiSignals: { ...state.uiSignals, ...signals },
            }),
            false,
            "setUISignals",
          ),

        setRelevantCategories: (categories) =>
          set({ relevantCategories: categories }, false, "setRelevantCategories"),

        addConversationMessage: (message) =>
          set(
            (state) => ({
              conversationHistory: [...state.conversationHistory, message],
            }),
            false,
            "addConversationMessage",
          ),

        setSimulationData: (data) =>
          set(
            {
              simulationData: data,
              mode: "simulating",
            },
            false,
            "setSimulationData",
          ),

        applyElysianResponse: (response) =>
          set(
            {
              mode: "qualified",
              clientProfile: response.profile,
              relevantCategories: response.relevantCategories,
              uiSignals: {
                ...get().uiSignals,
                ...response.uiSignals,
              },
            },
            false,
            "applyElysianResponse",
          ),

        resetToAnonymous: () => set(INITIAL_SITE_STATE, false, "resetToAnonymous"),
      }),
      {
        name: "certum-site-state",
        storage: createJSONStorage(() =>
          typeof window === "undefined" ? createNoopStorage() : sessionStorage,
        ),
        partialize: (state) => ({
          clientProfile: state.clientProfile,
          conversationHistory: state.conversationHistory,
        }),
      },
    ),
    { name: "CertumSiteStore" },
  ),
);

declare global {
  interface Window {
    useSiteStore?: typeof useSiteStore;
  }
}

if (import.meta.env.DEV && typeof window !== "undefined") {
  window.useSiteStore = useSiteStore;
}
