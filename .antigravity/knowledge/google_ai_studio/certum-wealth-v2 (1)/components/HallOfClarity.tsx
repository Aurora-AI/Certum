import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { PillarProps } from '../types';

const Pillar: React.FC<PillarProps> = ({ title, description, metric, metricLabel, delay }) => (
  <motion.div
    initial={{ scaleY: 0, opacity: 0 }}
    whileInView={{ scaleY: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "circOut" }}
    style={{ transformOrigin: "bottom" }}
    className="relative flex flex-col justify-end min-h-[500px] border border-primary/5 bg-white/40 backdrop-blur-sm p-8 group hover:-translate-y-2 transition-transform duration-500"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 group-hover:bg-primary/30 transition-colors" />
    
    <div className="mb-auto pt-8">
      <h3 className="text-2xl font-serif font-bold mb-2">{title}</h3>
      <div className="w-12 h-[1px] bg-primary/20 mb-4" />
      <p className="font-sans font-light text-muted">{description}</p>
    </div>

    <div className="mt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.4, duration: 0.5 }}
        className="text-4xl font-mono font-medium mb-1 tracking-tighter"
      >
        {metric}
      </motion.div>
      <div className="text-xs font-mono text-muted uppercase tracking-widest">{metricLabel}</div>
    </div>
  </motion.div>
);

const HallOfClarity: React.FC = () => {
  return (
    <section id="hall-of-clarity" className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <SectionHeading 
                eyebrow="Protocol Genesis V.3"
                title="THE HALL OF CLARITY"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <Pillar 
                    title="CONSÓRCIO"
                    description="Alavancagem de capital soberano com custo efetivo de 1.2% a.a."
                    metric="R$ 8.2Bi"
                    metricLabel="em cartas ativas"
                    delay={0}
                />
                <Pillar 
                    title="SEGUROS"
                    description="Proteção de ativos e blindagem sucessória via Whole Life."
                    metric="R$ 4.1Bi"
                    metricLabel="em prêmio"
                    delay={0.2}
                />
                <Pillar 
                    title="WEALTH"
                    description="Gestão ativa e multiplicação de legado familiar."
                    metric="R$ 1.9Bi"
                    metricLabel="sob gestão"
                    delay={0.4}
                />
            </div>

            {/* Connection Line Visual */}
            <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                className="h-[1px] bg-primary/20 mt-12 mx-auto"
            />
            
            <div className="flex justify-center mt-0">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                    className="border-x border-b border-primary/20 px-8 py-4 bg-background"
                >
                    <span className="text-xs font-mono tracking-[0.2em] uppercase">Genesis Core</span>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default HallOfClarity;