import { motion } from 'framer-motion';

interface BracketsProps {
  side: 'left' | 'right';
  className?: string;
}

export function Brackets({ side, className = '' }: BracketsProps) {
  const isLeft = side === 'left';

  return (
    <motion.span
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`text-7xl md:text-8xl lg:text-9xl font-thin text-neutral-400/30 select-none ${className}`}
    >
      {isLeft ? '[' : ']'}
    </motion.span>
  );
}
