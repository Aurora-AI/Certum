import type { ElysianQualifyRequest, ElysianQualifyResponse } from "@/types/elysian";
import type { AssetCategory } from "@/types/siteState";

function analyzeMessage(message: string): ElysianQualifyResponse {
  const lowerMessage = message.toLowerCase();

  const valueMatch = message.match(/(\d+)\s*(m|mi|milhões?|milhao)/i);
  const targetValue = valueMatch ? Number.parseInt(valueMatch[1], 10) * 1_000_000 : 1_000_000;

  const concerns: string[] = [];
  if (lowerMessage.includes("proteg") || lowerMessage.includes("segur")) {
    concerns.push("asset_protection");
  }
  if (
    lowerMessage.includes("sucess") ||
    lowerMessage.includes("família") ||
    lowerMessage.includes("familia") ||
    lowerMessage.includes("herança") ||
    lowerMessage.includes("heranca")
  ) {
    concerns.push("succession_planning");
  }
  if (lowerMessage.includes("fiscal") || lowerMessage.includes("imposto")) {
    concerns.push("tax_efficiency");
  }

  const categories: AssetCategory[] = [];
  if (lowerMessage.includes("imóv") || lowerMessage.includes("imov") || lowerMessage.includes("casa") || lowerMessage.includes("apart")) {
    categories.push("real_estate");
  }
  if (lowerMessage.includes("carro") || lowerMessage.includes("veículo") || lowerMessage.includes("veiculo") || lowerMessage.includes("auto")) {
    categories.push("automotive");
  }
  if (lowerMessage.includes("caminhão") || lowerMessage.includes("caminhao") || lowerMessage.includes("ônibus") || lowerMessage.includes("onibus") || lowerMessage.includes("frota")) {
    categories.push("heavy_vehicles");
  }
  if (lowerMessage.includes("trator") || lowerMessage.includes("agrícola") || lowerMessage.includes("agricola") || lowerMessage.includes("fazenda")) {
    categories.push("agricultural");
  }
  if (lowerMessage.includes("barco") || lowerMessage.includes("lancha") || lowerMessage.includes("iate")) {
    categories.push("marine");
  }

  if (categories.length === 0) {
    if (targetValue >= 2_000_000) {
      categories.push("real_estate", "automotive");
    } else if (targetValue >= 500_000) {
      categories.push("automotive", "real_estate");
    } else {
      categories.push("automotive");
    }
  }

  const riskProfile = concerns.includes("asset_protection") ? "conservative" : "moderate";

  let heroVariant: "default" | "wealth_target" | "protection" | "succession" = "wealth_target";
  if (concerns.includes("asset_protection")) {
    heroVariant = "protection";
  } else if (concerns.includes("succession_planning")) {
    heroVariant = "succession";
  }

  let backgroundMood: "void" | "warm" | "trust" | "success" = "warm";
  if (concerns.includes("succession_planning") || concerns.includes("asset_protection")) {
    backgroundMood = "trust";
  }

  const moodAccent: Record<typeof backgroundMood, string> = {
    void: "#C9A227",
    warm: "#C9A227",
    trust: "#4A9CC9",
    success: "#27C96B",
  };

  return {
    meta: {
      apiVersion: "v1.0",
      source: "fixture",
      traceId: `MOCK-${Date.now()}`,
    },
    profile: {
      objective: "wealth_building",
      targetValue,
      concerns,
      riskProfile,
      timeHorizon: 84,
    },
    relevantCategories: categories,
    suggestedProducts: categories.map((category, index) => ({
      id: `${category}_standard`,
      weight: Math.max(0, 1 - index * 0.2),
    })),
    uiSignals: {
      heroVariant,
      vaultFilter: categories,
      showSimulation: true,
      showPackageBuilder: false,
      backgroundMood,
      accentColor: moodAccent[backgroundMood],
    },
    responseText: generateResponseText(targetValue, concerns, categories),
    generatedComponents: [
      {
        type: "wealth_projection",
        props: {
          targetValue,
          timeHorizon: 84,
          categories,
        },
      },
    ],
  };
}

function generateResponseText(targetValue: number, concerns: string[], categories: AssetCategory[]): string {
  const valueFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(targetValue);

  let response = `Entendi. Seu objetivo é construir um patrimônio de ${valueFormatted}. `;

  if (concerns.includes("asset_protection")) {
    response +=
      "A proteção do investimento durante a aquisição é uma preocupação válida — nosso protocolo inclui blindagem patrimonial desde o primeiro dia. ";
  }

  if (concerns.includes("succession_planning")) {
    response +=
      "Quanto à sucessão familiar, estruturamos através de holding familiar com benefícios fiscais. ";
  }

  response += "\n\nBaseado no seu perfil, identifiquei as melhores categorias de alavancagem para você. ";
  response += "Vou mostrar uma simulação personalizada.";

  return response;
}

export async function mockQualify(request: ElysianQualifyRequest): Promise<ElysianQualifyResponse> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 800 + Math.random() * 400);
  });

  return analyzeMessage(request.message);
}
