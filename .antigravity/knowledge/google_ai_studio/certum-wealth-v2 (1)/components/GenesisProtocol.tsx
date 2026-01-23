import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const phases = [
    {
        id: "01",
        title: "ANÁLISE",
        description: "Mapeamos seu patrimônio atual, seus objetivos e seu apetite por risco em 72 horas."
    },
    {
        id: "02",
        title: "ESTRATÉGIA",
        description: "Desenhamos a arquitetura de alavancagem ideal com simulações de Monte Carlo."
    },
    {
        id: "03",
        title: "EXECUÇÃO",
        description: "Ativamos as cartas, os seguros e a blindagem patrimonial em paralelo."
    }
];

const GenesisProtocol: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const currentPhase = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#F5F5F0]">
            <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden">
                
                {/* Background Decoration */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#E8E8E0] to-transparent opacity-50 pointer-events-none" />

                <div className="max-w-4xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Indicators */}
                    <div className="md:col-span-4 flex flex-col items-start relative h-[400px] justify-between border-l-2 border-primary/10 pl-8">
                        {/* Progress Line */}
                        <motion.div 
                            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                            className="absolute left-[-2px] top-0 w-[2px] h-full bg-gold"
                        />

                        {phases.map((phase, index) => (
                            <motion.div 
                                key={phase.id}
                                style={{
                                    opacity: useTransform(
                                        scrollYProgress, 
                                        [(index * 0.3) - 0.1, index * 0.3, (index * 0.3) + 0.1], 
                                        [0.3, 1, 0.3]
                                    )
                                }}
                                className="transition-opacity duration-300"
                            >
                                <div className="text-6xl font-serif font-bold text-primary opacity-20">{phase.id}</div>
                                <div className="text-xs font-mono tracking-widest mt-2">{phase.title}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column: Dynamic Content */}
                    <div className="md:col-span-8 relative min-h-[300px]">
                        {phases.map((phase, index) => (
                             <motion.div
                                key={phase.id}
                                className="absolute top-0 left-0 w-full"
                                initial={{ opacity: 0, y: 50 }}
                                style={{
                                    opacity: useTransform(
                                        scrollYProgress, 
                                        [(index * 0.33) - 0.15, index * 0.33, (index * 0.33) + 0.15], 
                                        [0, 1, 0]
                                    ),
                                    y: useTransform(
                                        scrollYProgress, 
                                        [(index * 0.33) - 0.15, index * 0.33, (index * 0.33) + 0.15], 
                                        [50, 0, -50]
                                    )
                                }}
                             >
                                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                                    {phase.title}
                                </h3>
                                <p className="text-xl md:text-2xl font-light font-sans text-primary/80 leading-relaxed max-w-2xl">
                                    {phase.description}
                                </p>
                             </motion.div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-12">
                     <div className="text-xs font-mono uppercase text-muted tracking-widest">Protocol Genesis Sequence</div>
                </div>
            </div>
        </section>
    );
};

export default GenesisProtocol;