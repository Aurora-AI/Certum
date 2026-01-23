import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleText } from './ScrambleText';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, dark = false }) => {
  return (
    <div className="mb-16 md:mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-xs md:text-sm font-mono tracking-widest uppercase mb-4 ${dark ? 'text-gray-400' : 'text-muted'}`}
      >
        <ScrambleText text={eyebrow} delay={0.2} />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`text-4xl md:text-6xl font-serif font-bold tracking-tight ${dark ? 'text-white' : 'text-primary'}`}
      >
        {title}
      </motion.h2>
    </div>
  );
};