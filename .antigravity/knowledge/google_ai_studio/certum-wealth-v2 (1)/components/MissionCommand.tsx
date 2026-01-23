import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleText } from './ui/ScrambleText';

const MissionCommand: React.FC = () => {
  return (
    <section id="mission-command" className="bg-dark text-white py-32 px-6 md:px-12 relative overflow-hidden">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-gold text-xs font-mono tracking-[0.3em] uppercase mb-8"
        >
            <ScrambleText text="Mission Command" delay={0.2} />
        </motion.div>

        <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8"
        >
            INITIATE YOUR PROTOCOL
        </motion.h2>
        
        <p className="font-light text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            O momento de construir seu legado é agora. Agende sua sessão de arquitetura patrimonial.
        </p>

        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
        >
            <button className="bg-white text-dark px-10 py-5 text-sm font-mono tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300">
                Agendar Sessão Estratégica
            </button>
        </motion.div>

        <div className="mt-8 text-sm font-mono text-gray-500">
            ou ligue: <a href="tel:08001234567" className="hover:text-white transition-colors">0800 123 4567</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 border-t border-white/10 pt-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
            <h4 className="text-xl font-serif font-bold mb-4">CERTUM PRIVATE</h4>
            <p className="text-xs text-gray-500 font-sans">Wealth Architecture by Rodobens.</p>
        </div>
        
        <div>
            <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Produtos</h5>
            <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:text-gold transition-colors">Consórcio</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Seguros Resgatáveis</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Wealth Management</a></li>
            </ul>
        </div>
        
        <div>
            <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Empresa</h5>
            <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:text-gold transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Imprensa</a></li>
            </ul>
        </div>
        
        <div>
            <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Legal</h5>
            <ul className="space-y-3 text-xs text-gray-500 font-light">
                <li>Privacidade</li>
                <li>Termos de Uso</li>
                <li>Compliance</li>
            </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] text-gray-600 font-mono uppercase">
         <div>© 2026 Certum Private. All rights reserved.</div>
         <div className="mt-2 md:mt-0">Av. Brigadeiro Faria Lima, 1234</div>
      </div>
    </section>
  );
};

export default MissionCommand;