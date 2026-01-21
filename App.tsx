import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GridBackground from './components/GridBackground';
import Statement from './components/Statement';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { Concierge } from './components/Concierge';
import DarkGallery from './components/DarkGallery';

const App: React.FC = () => {
  // Ensure GSAP ScrollTrigger is registered if available
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <div className="font-sans antialiased text-ink bg-white min-h-screen selection:bg-ink selection:text-white">
      <GridBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        <div id="thesis" className="mt-20 md:mt-0">
          <DarkGallery />
        </div>
        
        <Statement />
        <CTA />
      </main>
      
      <Concierge />
      <Footer />
    </div>
  );
};

export default App;
