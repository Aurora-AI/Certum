import { motion } from 'framer-motion';

interface CounterProps {
  count: number;
  className?: string;
}

export function Counter({ count, className = '' }: CounterProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`font-mono text-sm ${className}`}
    >
      ({count})
    </motion.span>
  );
}
