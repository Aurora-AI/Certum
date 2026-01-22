import type {
  AssetCategory,
  ClientProfile,
  GeneratedUIComponent,
  UISignals,
} from "@/types/siteState";

export interface ElysianQualifyRequest {
  message: string;
  conversationHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ElysianQualifyResponse {
  meta: {
    apiVersion: string;
    source: "fixture" | "elysian-engine";
    traceId: string;
  };
  profile: ClientProfile;
  relevantCategories: AssetCategory[];
  suggestedProducts: Array<{
    id: string;
    weight: number;
  }>;
  uiSignals: Partial<UISignals>;
  responseText: string;
  generatedComponents?: GeneratedUIComponent[];
}

