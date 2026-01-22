# 🧪 Sistema de Testes - Certum Private

## Protocolo de Blindagem Mad Lab Aurora

Este documento descreve o sistema imunológico do Certum Private - a camada de testes automatizados que garante que a "pele bonita" nunca quebre.

---

## 🎯 Filosofia

> "Nós não testamos código. Nós blindamos arquitetura."
> — Manifesto Mad Aurora

O sistema de testes do Certum segue 3 princípios:

1. **Resiliência**: Componentes com animações complexas (GSAP) devem funcionar em ambiente de teste
2. **Velocidade**: Testes executam em < 3s sem processar CSS real
3. **Clareza**: Cada teste tem um propósito claro e nome descritivo

---

## 🛠️ Stack de Testes

- **Vitest**: Executor de testes (compatível com Vite)
- **JSDOM**: Navegador simulado
- **Testing Library**: Ferramentas de interação com DOM
- **jest-dom**: Matchers personalizados (toBeInTheDocument, etc)

---

## 📦 Comandos

```bash
# Executar todos os testes (watch mode)
npm test

# Executar uma vez (CI/CD)
npm run test:run

# Executar com interface visual
npm run test:ui

# Executar com coverage
npm run test:coverage
```

---

## 📂 Estrutura

```
components/
├── sections/
│   ├── GravityGallery.tsx          # Componente
│   └── __tests__/
│       └── GravityGallery.test.tsx # Testes
setupTests.ts                        # Mocks globais
types/
└── gsap.d.ts                        # Type declarations
```

---

## 🧩 Anatomia de um Teste

### Exemplo: GravityGallery

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('GravityGallery Component', () => {
  it('deve renderizar os Pilares Estratégicos', () => {
    render(<GravityGallery />);

    expect(screen.getByText(/CONSÓRCIOS/i)).toBeInTheDocument();
    expect(screen.getByText(/ALAVANCAGEM PURA/i)).toBeInTheDocument();
  });
});
```

### O que estamos testando?

1. **Renderização**: O componente monta sem crashar
2. **Conteúdo**: Textos críticos estão presentes
3. **Estrutura**: Classes CSS e hierarquia DOM
4. **Comportamento**: Não trava mesmo com GSAP mocado

---

## 🔧 Mocks Críticos

### GSAP (setupTests.ts)

O GSAP usa APIs do navegador que não existem no JSDOM. Precisamos "fingir" que elas existem:

```typescript
// Mock do ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock;

// Mock do requestAnimationFrame
window.requestAnimationFrame = vi.fn((cb) => {
  cb(0);
  return 0;
});
```

### GSAP (test file)

Cada teste que usa GSAP precisa mocá-lo:

```typescript
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn().mockReturnValue({ kill: vi.fn() }),
    // ...
  },
}));
```

---

## 🚨 Problemas Comuns

### "window.matchMedia is not a function"

**Solução**: Adicione o mock no `setupTests.ts`:

```typescript
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    // ...
  })),
});
```

### "ResizeObserver is not defined"

**Solução**: Já está no `setupTests.ts`. Certifique-se de que o arquivo está sendo carregado.

### "Cannot find module '@/components/...'"

**Solução**: Verifique o path alias no `vite.config.ts`:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, '.'),
  }
}
```

---

## 📊 Resultado dos Testes

### ✅ GravityGallery (10 testes)

```
✓ deve renderizar sem crashar
✓ deve renderizar os Pilares Estratégicos (White Theme)
✓ deve renderizar SEGUROS como segundo pilar
✓ deve renderizar WEALTH como terceiro pilar
✓ deve renderizar os Produtos Táticos (Dark Theme)
✓ deve renderizar produtos com tickets de preço
✓ deve ter a estrutura de trilho horizontal
✓ deve renderizar múltiplos cards (Pillars + Products)
✓ deve ter background escuro (#050505)
✓ deve renderizar o indicador de scroll "Drag / Scroll"
```

**Status**: 🟢 Todos passando
**Tempo**: ~450ms

---

## 🎯 Próximos Componentes a Testar

1. **ProjectsShowcase**: Carousel de projetos
2. **AllWorkGrid**: Grid masonry
3. **VisionSection**: Seção fullscreen com parallax
4. **Hero**: Hero principal
5. **CoreArchitecture**: Seção de arquitetura

---

## 📝 Convenções

### Nomenclatura de Testes

- **deve + ação**: Descreve o comportamento esperado
- **Português**: Mantém consistência com o domínio (Certum é brasileiro)
- **Específico**: "deve renderizar CONSÓRCIOS" > "deve renderizar conteúdo"

### Organização

- 1 arquivo de teste por componente
- Testes agrupados por `describe()`
- Mocks no topo do arquivo
- `beforeEach()` para limpar estado

### Matchers Favoritos

```typescript
// Presença no DOM
expect(element).toBeInTheDocument()

// Visibilidade
expect(element).toBeVisible()

// Classes CSS
expect(element).toHaveClass('bg-white')

// Conteúdo
expect(element).toHaveTextContent('CONSÓRCIOS')

// Quantidade
expect(elements.length).toBeGreaterThan(3)
```

---

## 🔐 Integração CI/CD

### GitHub Actions (exemplo)

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run test:run
```

---

## 📚 Referências

- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [jest-dom](https://github.com/testing-library/jest-dom)

---

**Status**: 🟢 Sistema Ativo
**Coverage**: Componente crítico (GravityGallery) coberto
**Última atualização**: 2026-01-21

---

*"A beleza sem engenharia é efêmera. A engenharia sem beleza é irrelevante."*
— Manifesto Mad Aurora
