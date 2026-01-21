import React, { useMemo, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const Concierge: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const disabled = useMemo(() => draft.trim().length === 0, [draft]);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <div className="mb-3 w-[min(92vw,380px)] rounded border border-ink/10 bg-white shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-ink" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink">
                Concierge
              </span>
            </div>
            <button
              type="button"
              className="p-2 rounded hover:bg-neutral-100 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close concierge"
            >
              <X size={16} className="text-ink" />
            </button>
          </div>

          <div className="px-4 py-4 text-sm text-muted leading-relaxed">
            Describe objective, constraints, and timeframe. The system will structure a protocol.
          </div>

          <form
            className="px-4 pb-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (disabled) return;
              setDraft('');
            }}
          >
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message…"
                className="flex-1 h-11 px-3 rounded border border-ink/10 bg-white text-ink placeholder:text-muted outline-none focus:border-ink/30"
              />
              <button
                type="submit"
                disabled={disabled}
                className="h-11 px-4 rounded bg-ink text-white text-xs font-bold tracking-[0.2em] uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-900 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full bg-ink text-white shadow-xl shadow-black/20 hover:bg-neutral-900 transition-colors grid place-items-center"
        aria-label={open ? 'Close concierge' : 'Open concierge'}
      >
        {open ? <X size={18} /> : <MessageSquare size={18} />}
      </button>
    </div>
  );
};

