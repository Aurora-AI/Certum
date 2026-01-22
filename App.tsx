// ═══════════════════════════════════════════════════════════════════════════
// CERTUM WEALTH V2 — SOVEREIGN LIGHT ARCHITECTURE
// Blueprint: docs/CERTUM_MASTER_BLUEPRINT_V2.md
// ═══════════════════════════════════════════════════════════════════════════

// 1. COMPONENTES ORIGINAIS MAD AURORA (Intocáveis)
import Hero from "@/components/Hero";
import TheConcierge from "@/components/features/TheConcierge";
import KineticMenu from "@/components/ui/KineticMenu";
import { SiteAtmosphere } from "@/components/ui/SiteAtmosphere";

// 2. BLOCOS DO BLUEPRINT V2
import GenesisProtocol from "@/components/sections/GenesisProtocol";
import HallOfClarity from "@/components/sections/HallOfClarity";
import MissionCommand from "@/components/sections/MissionCommand";
import SystemProof from "@/components/sections/SystemProof";
import TheVault from "@/components/sections/TheVault";

import { useLenis } from "@/hooks/useLenis";
import { useEffect } from "react";

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Ensure GSAP ScrollTrigger is registered if available
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <main className="relative min-h-screen text-[#1A1A1A] selection:bg-[#C9A227] selection:text-white overflow-x-hidden">
      {/* ═══ ATMOSFERA SOVEREIGN LIGHT ═══ */}
      <SiteAtmosphere />

      {/* ═══ NAVEGAÇÃO GLOBAL ═══ */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-none">
        <span className="font-serif text-2xl font-bold tracking-tight text-white">
          CERTUM
        </span>
      </div>
      <KineticMenu />

      {/* ═══ BLOCO 1: HERO (A Promessa) — INTOCÁVEL ═══ */}
      <section id="HERO" className="relative z-10">
        <Hero />
      </section>

      {/* ═══ BLOCO 2: HALL OF CLARITY (3 Pilares) ═══ */}
      <section id="HALL_OF_CLARITY" className="relative z-10">
        <HallOfClarity />
      </section>

      {/* ═══ BLOCO 3: THE VAULT (Galeria de Ativos) ═══ */}
      <section id="THE_VAULT" className="relative z-10">
        <TheVault />
      </section>

      {/* ═══ BLOCO 4: GENESIS PROTOCOL (Timeline 3 Fases) ═══ */}
      <section id="GENESIS_PROTOCOL" className="relative z-10">
        <GenesisProtocol />
      </section>

      {/* ═══ BLOCO 5: SYSTEM PROOF (Dashboard de Performance) ═══ */}
      <section id="SYSTEM_PROOF" className="relative z-10">
        <SystemProof />
      </section>

      {/* ═══ THE CONCIERGE (Elysian AI) ═══ */}
      <section id="CONCIERGE" className="pt-16 pb-10 relative z-30">
        <TheConcierge />
      </section>

      {/* ═══ BLOCO 6: MISSION COMMAND (Footer Dark) ═══ */}
      <footer className="relative z-30">
        <MissionCommand />
      </footer>
    </main>
  );
}

export default App;
