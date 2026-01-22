import { useEffect, useRef, useState } from "react";

import { useElysianQualify } from "@/hooks/useElysianQualify";
import { useSiteStore } from "@/store/useSiteStore";
import { DreamStream } from "@/components/ui/DreamStream";

export default function TheConcierge() {
  const [input, setInput] = useState("");
  const { qualify, isLoading } = useElysianQualify();
  const history = useSiteStore((s) => s.conversationHistory);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await qualify(input);
    setInput("");
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history]);

  return (
    <section className="relative min-h-screen w-full flex bg-[#050505]">
      <div className="hidden lg:block w-1/2 relative border-r border-white/5">
        <div className="sticky top-0 h-screen w-full overflow-hidden relative">
          <DreamStream />

          <div className="absolute bottom-12 left-12 z-30 max-w-sm">
            <h3 className="text-white font-serif text-3xl mb-2 mix-blend-difference">
              Materialize o impossível.
            </h3>
            <p className="text-white/60 text-sm font-mono">// Acesso a inventário off-market</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center relative z-30 px-6 lg:px-20 py-20">
        <div
          className={[
            "mb-8 w-12 h-12 rounded-full blur-xl transition-all duration-1000",
            isLoading ? "bg-[var(--accent-color)] scale-150 opacity-80" : "bg-white/10 scale-100 opacity-30",
          ].join(" ")}
        />

        <div ref={containerRef} className="w-full max-w-xl space-y-6 max-h-[50vh] overflow-y-auto pr-2 mb-8 custom-scrollbar">
          {history.length === 0 && (
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                Qual é o tamanho do seu legado?
              </h2>
              <p className="text-slate-400 font-light">
                O Wealth OS está pronto para configurar sua estrutura de alavancagem.
              </p>
            </div>
          )}

          {history.map((msg, idx) => (
            <div key={`${msg.timestamp}-${idx}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={[
                  "max-w-[90%] p-5 rounded-2xl backdrop-blur-sm border text-sm md:text-base",
                  msg.role === "user"
                    ? "bg-white/5 border-white/10 text-white rounded-tr-none"
                    : "bg-black/60 border-white/10 text-slate-200 rounded-tl-none",
                ].join(" ")}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="text-xs text-[var(--accent-color)] font-mono animate-pulse ml-2">
              &gt; ELYSIAN IS THINKING...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xl relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-color-alpha)] to-white/10 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite seu objetivo..."
            className="relative w-full bg-[#0A0A0A] border border-white/10 text-white text-lg px-6 py-4 rounded-full focus:outline-none focus:border-white/20 transition-all font-light placeholder:text-white/20"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            →
          </button>
        </form>
      </div>
    </section>
  );
}
