export interface NavItem {
  label: string;
  href: string;
}

export interface PillarProps {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  delay: number;
}

export interface VaultItem {
  id: number;
  category: string;
  title: string;
  value: string;
  leverage: string;
  image: string;
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  description: string;
}
