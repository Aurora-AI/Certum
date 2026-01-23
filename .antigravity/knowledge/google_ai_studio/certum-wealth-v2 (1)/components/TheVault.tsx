import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { VaultItem } from '../types';
import { ArrowRight } from 'lucide-react';

const vaultItems: VaultItem[] = [
  { id: 1, category: "IMÓVEIS", title: "High-End Residential", value: "R$ 500k+", leverage: "70%", image: "https://picsum.photos/id/48/400/600" },
  { id: 2, category: "FROTA", title: "Porsche & Supercars", value: "R$ 300k+", leverage: "80%", image: "https://picsum.photos/id/111/400/600" },
  { id: 3, category: "AGRO", title: "Heavy Machinery", value: "R$ 400k+", leverage: "70%", image: "https://picsum.photos/id/192/400/600" },
  { id: 4, category: "NÁUTICA", title: "Vessels & Jets", value: "R$ 600k+", leverage: "60%", image: "https://picsum.photos/id/214/400/600" },
  { id: 5, category: "SERVICES", title: "Wealth Advisory", value: "Custom", leverage: "N/A", image: "https://picsum.photos/id/1/400/600" },
];

const VaultCard: React.FC<{ item: VaultItem; index: number }> = ({ item, index }) => {
    return (
        <motion.div 
            className="flex-shrink-0 w-[300px] md:w-[400px] bg-white h-[500px] relative group overflow-hidden border border-gray-200"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="absolute inset-0 z-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            <div className="absolute top-6 left-6 z-10">
                <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-mono tracking-widest uppercase border border-gray-200">
                    {item.category}
                </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                    <div>
                        <div className="text-[10px] font-mono text-gray-300 uppercase mb-1">Entry Ticket</div>
                        <div className="font-mono text-lg">{item.value}</div>
                    </div>
                    <div className="text-right">
                         <div className="text-[10px] font-mono text-gray-300 uppercase mb-1">Leverage</div>
                         <div className="font-mono text-lg text-emerald-400">{item.leverage}</div>
                    </div>
                </div>
                <div className="mt-6 flex items-center text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Explore Asset <ArrowRight size={14} className="ml-2" />
                </div>
            </div>
        </motion.div>
    );
};

const TheVault: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-32 bg-background border-t border-gray-200">
      <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
         <SectionHeading 
            eyebrow="Asset Inventory"
            title="THE VAULT"
         />
         <div className="hidden md:flex items-center text-xs font-mono text-muted">
            <span className="mr-4">DRAG TO EXPLORE</span>
            <div className="w-12 h-[1px] bg-primary/30"></div>
         </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto space-x-6 px-6 md:px-12 pb-12 cursor-grab active:cursor-grabbing scrollbar-hide snap-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {vaultItems.map((item, index) => (
            <div key={item.id} className="snap-center">
                 <VaultCard item={item} index={index} />
            </div>
        ))}
        {/* Spacer for right padding */}
        <div className="w-12 flex-shrink-0" />
      </div>
    </section>
  );
};

export default TheVault;