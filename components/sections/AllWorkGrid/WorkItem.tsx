import { motion } from 'framer-motion';
import type { Project } from '../ProjectsShowcase/types';

interface WorkItemProps {
  project: Project;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
  };
  index: number;
}

export function WorkItem({ project, position, index }: WorkItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={position}
      className="work-item absolute group cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden rounded-sm">
        {/* Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          whileHover={{ scale: 1.05 }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6 transition-opacity duration-500"
        >
          <span className="text-white/60 text-xs font-mono mb-2 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-white text-xl md:text-2xl font-serif">
            {project.title}
          </h3>
          <span className="text-white/40 text-xs font-mono mt-1">
            {project.year}
          </span>
        </motion.div>

        {/* Border */}
        <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
      </div>
    </motion.div>
  );
}
