import React from 'react';
import Hero from './components/Hero';
import HallOfClarity from './components/HallOfClarity';
import TheVault from './components/TheVault';
import GenesisProtocol from './components/GenesisProtocol';
import SystemProof from './components/SystemProof';
import MissionCommand from './components/MissionCommand';
import { MessageSquare } from 'lucide-react';

function App() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Hero />
      <HallOfClarity />
      <TheVault />
      <GenesisProtocol />
      <SystemProof />
      <MissionCommand />

      {/* Floating Action Button for Chat/Identity */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group relative">
             <MessageSquare size={24} />
             <span className="absolute right-full mr-4 bg-primary text-white text-xs font-mono px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Speak to Wealth Architect
             </span>
        </button>
      </div>
    </main>
  );
}

export default App;