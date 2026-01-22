import Hero from "@/components/Hero";
import CoreArchitecture from "@/components/sections/CoreArchitecture";
import GravityGallery from "@/components/sections/GravityGallery";
import KineticMenu from "@/components/ui/KineticMenu";
import TacticalFooter from "@/components/ui/TacticalFooter";
import { useLenis } from "@/hooks/useLenis";
import { useEffect } from "react";

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Ensure GSAP ScrollTrigger is registered if available
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <main className="relative bg-[#050505] min-h-screen text-slate-200 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 1. NAVEGAÇÃO E LOGO (Global) */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-none">
        <span className="font-serif text-2xl font-bold tracking-tight text-white">
          CERTUM
        </span>
      </div>
      <KineticMenu />

      {/* 2. HERO (A Promessa) */}
      <div id="CORE_01" className="relative z-10">
        <Hero />
      </div>

      {/* 3. GALERIA (O "Black Void" corrigido) */}
      <div id="GALLERY" className="relative z-20">
        <GravityGallery />
      </div>

      {/* 4. ARQUITETURA (O "Controle Manual" corrigido) */}
      <div id="CORE_03" className="relative z-20">
        <CoreArchitecture />
      </div>

      {/* 5. RODAPÉ TÁTICO (O Encerramento Único) */}
      <div className="relative z-30">
        <TacticalFooter />
      </div>
    </main>
  );
}

export default App;
