export interface ChipData {
  icon: string;
  label: string;
}

export interface FeatureData {
  id: string;
  eyebrow: string;
  body: string;
  chips?: ChipData[];
}
