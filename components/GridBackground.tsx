import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Lines */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11,11,13,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,13,0.06) 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }}
      />
      
      {/* Ghost Labels */}
      <div className="absolute top-[120px] left-[60px] text-[10px] uppercase tracking-widest text-ink/10 font-mono">
        SYS.01 // ORIGIN
      </div>
      <div className="absolute top-[480px] right-[120px] text-[10px] uppercase tracking-widest text-ink/10 font-mono">
        COORD 32.44
      </div>
      <div className="absolute bottom-[240px] left-[15%] text-[10px] uppercase tracking-widest text-ink/10 font-mono">
        SECTOR 7G
      </div>
      
      {/* Technical markers */}
      <svg className="absolute top-20 right-20 w-6 h-6 text-ink/10" viewBox="0 0 24 24">
        <path d="M0,0 L8,0 M0,0 L0,8" fill="none" stroke="currentColor" />
      </svg>
      <svg className="absolute bottom-40 left-10 w-6 h-6 text-ink/10" viewBox="0 0 24 24">
        <path d="M0,24 L8,24 M0,24 L0,16" fill="none" stroke="currentColor" />
      </svg>
    </div>
  );
};

export default GridBackground;