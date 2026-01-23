import React, { useRef } from 'react';

const SovereignResidence: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#F2F2F2]" data-hero-bg>
            <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop" 
                alt="Sovereign Architecture" 
                className="w-full h-full object-cover grayscale opacity-100 contrast-[1.1]"
            />
            {/* Overlay to ensure text readability if blend modes fail */}
            <div className="absolute inset-0 bg-white/10" />
        </div>
    );
};
export default SovereignResidence;