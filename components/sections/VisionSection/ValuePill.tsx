import { motion } from 'framer-motion';

interface ValuePillProps {
  number: string;
  title: string;
  highlight: string;
  index: number;
}

export function ValuePill({ number, title, highlight, index }: ValuePillProps) {
  // Split title by highlight word
  const parts = title.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-6 mb-8"
    >
      {/* Number */}
      <span className="text-white/20 text-xl font-mono">{number}</span>

      {/* Title with italic highlight */}
      <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
        {parts.map((part, i) => {
          const isHighlight = part.toLowerCase() === highlight.toLowerCase();
          return (
            <span key={i} className={isHighlight ? 'italic' : ''}>
              {part}
            </span>
          );
        })}
      </h3>
    </motion.div>
  );
}
