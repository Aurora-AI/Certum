import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-[linear-gradient(to_top,#FAFAFA,white)] border-t border-ink/5">
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-xl">
                <h4 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-8">
                    Receive system updates.
                </h4>
                <div className="flex gap-4 border-b border-ink/20 pb-4 focus-within:border-ink transition-colors">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-transparent outline-none flex-grow text-ink placeholder:text-muted"
                    />
                    <button className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent">
                        Sign Up
                    </button>
                </div>
            </div>

            <div className="flex gap-16">
                <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Ecosystem</h5>
                    <ul className="space-y-4 text-sm font-medium text-ink/80">
                        <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Governance</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Tokenomics</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Socials</h5>
                    <ul className="space-y-4 text-sm font-medium text-ink/80">
                        <li><a href="#" className="hover:text-accent transition-colors">X (Twitter)</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Discord</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Telegram</a></li>
                    </ul>
                </div>
            </div>
        </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ink/5">
            <p className="text-xs text-muted">Certum Private ©2026</p>
            <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="text-xs text-muted hover:text-ink">Privacy Policy</a>
                <a href="#" className="text-xs text-muted hover:text-ink">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
