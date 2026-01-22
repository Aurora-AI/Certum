import { create } from "zustand";

// Define o formato do nosso Cérebro
interface AppState {
  // Estado de Navegação
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  // Estado de Contexto (Onde o usuário está?)
  activeSection: string | null;
  setSection: (section: string) => void;

  // Estado Visual (Global Theme Override - Opcional)
  globalTheme: "dark" | "light" | "auto";
  setGlobalTheme: (theme: "dark" | "light" | "auto") => void;
}

// Cria o Hook Global
export const useAppStore = create<AppState>((set) => ({
  // Navegação
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  // Contexto Inicial
  activeSection: "HERO",
  setSection: (section) => set({ activeSection: section }),

  // Tema
  globalTheme: "auto",
  setGlobalTheme: (theme) => set({ globalTheme: theme }),
}));
