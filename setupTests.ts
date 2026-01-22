import '@testing-library/jest-dom';
import { vi } from 'vitest';

// 1. Mock do ResizeObserver (Necessário para layouts responsivos)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// 2. Mock do window.matchMedia (Necessário para temas/responsividade)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 3. Mock do ScrollTo (O JSDOM não rola página)
window.scrollTo = vi.fn();

// 4. Mock do IntersectionObserver (usado por muitas libs de animação)
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

// 5. Mock do requestAnimationFrame (necessário para animações)
window.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
  cb(0);
  return 0;
});

window.cancelAnimationFrame = vi.fn();
