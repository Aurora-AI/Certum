export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
}

export interface Value {
  id: string;
  title: string;
  highlight: string;
}
