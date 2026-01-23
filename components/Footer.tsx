import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#020408] border-t border-slate-900 pt-20 pb-8 text-slate-400 font-mono text-[10px] uppercase tracking-widest selection:bg-cyan-900 selection:text-white">
      {/* GRID DECORATIVO */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(51, 65, 85, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* LINHA SUPERIOR DO DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* COLUNA 1: IDENTIDADE */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-lg font-serif tracking-normal normal-case mb-6">
              Certum Private
            </h4>
            <p className="max-w-xs text-slate-500 normal-case tracking-normal leading-relaxed mb-8">
              Arquitetura financeira para perpetuidade patrimonial. O sistema
              operacional da riqueza soberana.
            </p>
            <div className="flex items-center gap-2 text-cyan-500 animate-pulse">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              SYSTEM STATUS: OPERATIONAL
            </div>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO TÉCNICA */}
          <div>
            <h5 className="text-slate-600 mb-6">:: NAVIGATION</h5>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="opacity-30">01.</span> PROTOCOLS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="opacity-30">02.</span> NETWORK
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="opacity-30">03.</span> INTELLIGENCE
                </a>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: COMUNICAÇÃO */}
          <div>
            <h5 className="text-slate-600 mb-6">:: UPLINKS</h5>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  LINKEDIN_SECURE
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  INSTAGRAM_FEED
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  WHATSAPP_ENCRYPTED
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* STATUS BAR INFERIOR */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center opacity-60">
          <div className="flex gap-8 mb-4 md:mb-0">
            <span>LATENCY: 12ms</span>
            <span>REGION: SA-EAST-1</span>
            <span>BUILD: v2.4.0-RC</span>
          </div>

          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY_PROTOCOL
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS_OF_ENGAGEMENT
            </a>
            <span>©2026 GENESIS INC.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
