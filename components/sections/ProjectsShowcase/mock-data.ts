import type { Project, Value } from './types';

export const PROJECTS: Project[] = [
  {
    id: "consorcio-porsche",
    title: "Consórcio Porsche",
    category: "Automotive Excellence",
    year: "2024",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
    description: "Acesso inteligente a veículos premium através de estruturação financeira estratégica."
  },
  {
    id: "blindagem-patrimonial",
    title: "Blindagem Patrimonial",
    category: "Wealth Protection",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    description: "Arquitetura de proteção patrimonial com holdings e estruturas offshore."
  },
  {
    id: "offshore-structure",
    title: "Offshore Structure",
    category: "International Banking",
    year: "2024",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    description: "Estruturação internacional de ativos com compliance global."
  },
  {
    id: "family-office",
    title: "Family Office",
    category: "Private Banking",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    description: "Gestão integrada de patrimônio familiar com visão multigeracional."
  },
  {
    id: "yacht-consortium",
    title: "Marine Consortium",
    category: "Lifestyle Assets",
    year: "2024",
    image: "/assets/yacht-bw.jpeg",
    description: "Acesso a ativos náuticos sem descapitalização através de consórcios estruturados."
  },
  {
    id: "real-estate",
    title: "Sovereign Estate",
    category: "Premium Properties",
    year: "2024",
    image: "/assets/mansion-dark.jpeg",
    description: "Alavancagem estratégica para aquisição de imóveis de alto padrão."
  }
];

export const VALUES: Value[] = [
  {
    id: "01",
    title: "Sovereign Protection",
    highlight: "Protection"
  },
  {
    id: "02",
    title: "Wealth Continuity",
    highlight: "Continuity"
  },
  {
    id: "03",
    title: "Design Integrity",
    highlight: "Integrity"
  }
];

export const VISION_TEXT = `
Nossa missão transcende a simples gestão de ativos. Projetamos arquiteturas
financeiras que resistem ao tempo, protegem gerações e amplificam o poder
do capital inteligente. Cada estrutura é uma obra de engenharia patrimonial,
onde segurança e rentabilidade dançam em harmonia absoluta.
`.trim();
