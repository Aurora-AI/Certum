export type SiteMode =
  | "anonymous"
  | "exploring"
  | "conversing"
  | "qualified"
  | "simulating"
  | "checkout";

export type RiskProfile = "conservative" | "moderate" | "aggressive";

export type AssetCategory =
  | "real_estate"
  | "heavy_vehicles"
  | "agricultural"
  | "automotive"
  | "marine";

export interface ClientProfile {
  objective: string;
  targetValue: number;
  concerns: string[];
  riskProfile: RiskProfile;
  timeHorizon?: number;
}

export interface UISignals {
  heroVariant: "default" | "wealth_target" | "protection" | "succession";
  vaultFilter: AssetCategory[] | "all";
  showSimulation: boolean;
  showPackageBuilder: boolean;
  backgroundMood: "void" | "warm" | "trust" | "success";
  accentColor: string;
}

export type GeneratedUIComponentType =
  | "chart"
  | "comparison"
  | "product_card"
  | "timeline"
  | "wealth_projection"
  | (string & {});

export interface GeneratedUIComponent {
  type: GeneratedUIComponentType;
  props: Record<string, unknown>;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  uiComponents?: GeneratedUIComponent[];
}

export interface SelectedProduct {
  id: string;
  category?: AssetCategory;
  value?: number;
  meta?: Record<string, unknown>;
}

export interface Projection {
  month: number;
  value: number;
}

export interface SimulationPackage {
  products: SelectedProduct[];
  totalValue: number;
  monthlyPayment: number;
  leverageRatio: number;
  projections: Projection[];
}

export interface SiteState {
  mode: SiteMode;
  clientProfile: ClientProfile | null;
  relevantCategories: AssetCategory[];
  uiSignals: UISignals;
  conversationHistory: ConversationMessage[];
  simulationData: SimulationPackage | null;
}

