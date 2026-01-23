import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, FileText } from 'lucide-react';

const tvlData = [
  { v: 10 }, { v: 11 }, { v: 10.5 }, { v: 12 }, { v: 12.8 }, { v: 13.5 }, { v: 14 }, { v: 14.2 }
];

const SystemProof: React.FC = () => {
  return (
    <section id="system-proof" className="py-32 px-6 md:px-12 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
            eyebrow="System Proof"
            title="ECOSYSTEM PERFORMANCE"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* TVL Card - Large */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2 bg-white p-8 border border-gray-200 shadow-sm flex flex-col justify-between"
            >
                <div>
                    <div className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Total Value Locked</div>
                    <div className="text-6xl font-serif font-bold">14.2<span className="text-3xl text-muted ml-2 font-normal">Bi</span></div>
                    <div className="text-sm font-sans text-muted mt-2">Reais brasileiros sob gestão estratégica</div>
                </div>
                <div className="h-32 w-full mt-8">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tvlData}>
                          <Line type="monotone" dataKey="v" stroke="#0A0A0A" strokeWidth={2} dot={false} />
                        </LineChart>
                     </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Yield Card */}
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="bg-white p-6 border border-gray-200 shadow-sm md:col-span-1"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-mono text-muted uppercase tracking-widest">Yield Médio</div>
                    <TrendingUp size={16} className="text-accent" />
                </div>
                <div className="text-4xl font-mono font-medium text-primary">+18.4%</div>
                <div className="text-xs text-accent mt-2 font-mono">▲ 2.3% vs Last Qtr</div>
            </motion.div>

            {/* Active Cards */}
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="bg-white p-6 border border-gray-200 shadow-sm md:col-span-1"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-mono text-muted uppercase tracking-widest">Cartas Ativas</div>
                    <FileText size={16} className="text-primary" />
                </div>
                <div className="text-4xl font-mono font-medium text-primary">127.4K</div>
                 <div className="w-full bg-gray-100 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[70%]" />
                 </div>
            </motion.div>

             {/* Time to Contemplation */}
             <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="bg-white p-6 border border-gray-200 shadow-sm md:col-span-1"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-mono text-muted uppercase tracking-widest">Tempo Médio</div>
                    <Clock size={16} className="text-primary" />
                </div>
                <div className="text-4xl font-mono font-medium text-primary">38</div>
                <div className="text-xs font-mono text-muted mt-1 uppercase">Meses</div>
            </motion.div>

            {/* Quote Card */}
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="bg-primary p-6 shadow-sm md:col-span-1 flex flex-col justify-center"
            >
                <p className="text-white/90 font-serif italic text-lg leading-relaxed">
                    "Desde 1949, mais de R$ 180 bilhões em créditos liberados."
                </p>
                <div className="mt-4 text-[10px] font-mono text-white/50 uppercase tracking-widest">— Ecossistema Rodobens</div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SystemProof;