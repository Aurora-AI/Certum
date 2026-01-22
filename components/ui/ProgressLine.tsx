import { motion } from 'framer-motion';

interface ProgressLineProps {
  progress?: number; // 0-1
  className?: string;
}

export function ProgressLine({ progress = 0, className = '' }: ProgressLineProps) {
  return (
    <div className={`relative h-[1px] w-32 bg-neutral-800 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-white origin-left"
      />
    </div>
  );
}
