import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 px-6 md:px-16 flex items-center justify-between bg-white/80 backdrop-blur-[2px] border-b border-transparent transition-all duration-300">
      <div className="flex items-center">
        <span className="text-xl font-bold tracking-tight text-ink">Certum Private</span>
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="hidden md:block text-xs font-medium tracking-[0.2em] text-ink hover:opacity-60 transition-opacity">
          BLOG
        </a>
        <button className="bg-ink text-white text-xs font-semibold tracking-wide px-6 py-3 rounded hover:bg-neutral-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
          INITIATE
        </button>
      </div>
    </header>
  );
};

export default Header;
