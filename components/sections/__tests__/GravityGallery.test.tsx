import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GravityGallery from "../GravityGallery";

// MOCK CRÍTICO: Desativa o GSAP real durante os testes para não travar o JSDOM
vi.mock("gsap", () => {
  const mockTimeline = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  };

  return {
    default: {
      registerPlugin: vi.fn(),
      to: vi.fn().mockReturnValue({ kill: vi.fn() }),
      from: vi.fn().mockReturnValue({ kill: vi.fn() }),
      set: vi.fn(),
      timeline: vi.fn().mockReturnValue(mockTimeline),
      context: vi.fn().mockImplementation((callback, scope) => {
        if (callback) callback();
        return {
          revert: vi.fn(),
        };
      }),
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    update: vi.fn(),
    clearScrollMemory: vi.fn(),
    defaults: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn((callback) => {
    // Executa o callback imediatamente para simular o hook
    if (callback) {
      try {
        callback();
      } catch (e) {
        // Ignora erros de execução no ambiente de teste
      }
    }
  }),
}));

describe("GravityGallery Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar sem crashar", () => {
    const { container } = render(<GravityGallery />);
    expect(container).toBeInTheDocument();
  });

  it("deve renderizar os Pilares Estratégicos (White Theme)", () => {
    render(<GravityGallery />);

    // Verifica se os textos principais dos Pillars estão na tela
    expect(screen.getByText(/CONSÓRCIOS/i)).toBeInTheDocument();
    expect(screen.getByText(/ALAVANCAGEM PURA/i)).toBeInTheDocument();
  });

  it("deve renderizar SEGUROS como segundo pilar", () => {
    render(<GravityGallery />);

    expect(screen.getByText(/SEGUROS/i)).toBeInTheDocument();
    expect(screen.getByText(/IRON SHIELD/i)).toBeInTheDocument();
  });

  it("deve renderizar WEALTH como terceiro pilar", () => {
    render(<GravityGallery />);

    // Usa getAllByText porque "WEALTH" aparece no label e no card
    const wealthElements = screen.getAllByText(/WEALTH/i);
    expect(wealthElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/ARQUITETURA/i)).toBeInTheDocument();
  });

  it("deve renderizar os Produtos Táticos (Dark Theme)", () => {
    render(<GravityGallery />);

    // Verifica se os produtos existem
    expect(screen.getByText(/Heavy Metal/i)).toBeInTheDocument();
    expect(screen.getByText(/CAMINHÕES & FROTA/i)).toBeInTheDocument();
  });

  it("deve renderizar produtos com tickets de preço", () => {
    render(<GravityGallery />);

    // Verifica se há tickets de preço exibidos
    const ticketElements = screen.getAllByText(/Ticket: R\$/i);
    expect(ticketElements.length).toBeGreaterThan(0);
  });

  it("deve ter a estrutura de trilho horizontal", () => {
    const { container } = render(<GravityGallery />);

    // Verifica se existe o container com overflow hidden
    const overflowContainer = container.querySelector(".overflow-hidden");
    expect(overflowContainer).toBeInTheDocument();
  });

  it("deve renderizar múltiplos cards (Pillars + Products)", () => {
    const { container } = render(<GravityGallery />);

    // Verifica se há múltiplos cards renderizados (nova estrutura usa 'shrink-0')
    const cards = container.querySelectorAll('[class*="shrink-0"]');
    expect(cards.length).toBeGreaterThan(3); // Pelo menos 3 Pillars + Products
  });

  it("deve ter background escuro (#050505)", () => {
    const { container } = render(<GravityGallery />);

    // Verifica se o background principal existe
    const mainContainer = container.querySelector(
      '[class*="bg-\\[\\#050505\\]"]',
    );
    expect(mainContainer).toBeInTheDocument();
  });

  it('deve renderizar o header "Inventory"', () => {
    render(<GravityGallery />);

    // A versão simplificada tem um header "Inventory" em vez do indicador de scroll
    const inventoryHeader = screen.getByText(/Inventory/i);
    expect(inventoryHeader).toBeInTheDocument();
  });
});
