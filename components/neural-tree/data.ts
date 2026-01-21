export interface NodeData {
  id: string;
  label: string;
  type: "core" | "category" | "strategy";
  description?: string;
  stats?: { label: string; value: string }[];
  parentId?: string;
}

export const neuralNodes: NodeData[] = [
  // NÚCLEO
  {
    id: "core",
    label: "GENESIS CORE",
    type: "core",
    description:
      "Hub central de arquitetura financeira. Selecione uma vertical para iniciar a operação.",
  },

  // RAMO 1: HEAVY METAL (Paraná Focus)
  {
    id: "metal",
    label: "HEAVY METAL",
    type: "category",
    parentId: "core",
    description:
      "Estratégia de renovação de frota e maquinário agrícola sem o custo do capital bancário.",
    stats: [
      { label: "ALVO GEOGRÁFICO", value: "PR / OESTE" },
      { label: "TIPO DE ATIVO", value: "FROTA & AGRO" },
    ],
  },
  // Estratégias Metal
  {
    id: "frota",
    label: "FROTA TÁTICA",
    type: "strategy",
    parentId: "metal",
    description:
      "Planejamento de renovação programada. Substitua juros de Finame por Taxa de Admin diluída.",
    stats: [{ label: "ECONOMIA ESTIMADA", value: "35% vs CDC" }],
  },
  {
    id: "agro",
    label: "AGRO POWER",
    type: "strategy",
    parentId: "metal",
    description:
      "Alavancagem para safra. Utilize o fluxo de caixa sazonal para lances estratégicos.",
    stats: [{ label: "LIQUIDEZ", value: "SAZONAL" }],
  },
  {
    id: "agio",
    label: "LIQUIDEZ IMEDIATA",
    type: "strategy",
    parentId: "metal",
    description:
      "Acesso a cartas contempladas para aquisição imediata de ativos pesados.",
    stats: [{ label: "STATUS", value: "PREMIUM" }],
  },

  // RAMO 2: SOVEREIGN ESTATE (SC Focus)
  {
    id: "estate",
    label: "SOVEREIGN ESTATE",
    type: "category",
    parentId: "core",
    description:
      "Construção de patrimônio imobiliário blindado contra inflação e volatilidade.",
    stats: [
      { label: "ALVO GEOGRÁFICO", value: "SC / LITORAL" },
      { label: "INDEXADOR", value: "INCC / IGPM" },
    ],
  },
  // Estratégias Estate
  {
    id: "build",
    label: "BUILD TO SUIT",
    type: "strategy",
    parentId: "estate",
    description:
      "Crédito para construção customizada em terreno próprio ou aquisição de terreno + obra.",
  },
  {
    id: "quitante",
    label: "INTERV. QUITANTE",
    type: "strategy",
    parentId: "estate",
    description:
      "Operação cirúrgica: Troca de dívida bancária cara pelo custo barato do consórcio.",
    stats: [{ label: "REDUÇÃO CET", value: "-60%" }],
  },

  // RAMO 3: IRON SHIELD (Seguros)
  {
    id: "shield",
    label: "IRON SHIELD",
    type: "category",
    parentId: "core",
    description:
      "Mecanismos de blindagem sucessória e proteção de liquidez em vida.",
    stats: [
      { label: "PROTEÇÃO", value: "GLOBAL" },
      { label: "BENEFICIÁRIO", value: "LIVRE" },
    ],
  },
  // Estratégias Shield
  {
    id: "sucessao",
    label: "SUCESSÃO",
    type: "strategy",
    parentId: "shield",
    description:
      "Liquidez imediata para custeio de inventário sem bloqueio de bens.",
  },
  {
    id: "keyman",
    label: "KEY MAN",
    type: "strategy",
    parentId: "shield",
    description:
      "Proteção financeira para a empresa na ausência de sócios ou executivos chave.",
  },
];
