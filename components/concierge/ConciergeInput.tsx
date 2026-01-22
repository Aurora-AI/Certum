import { useEffect, useRef, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

interface ConciergeInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ConciergeInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = "Digite sua mensagem...",
}: ConciergeInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "transition-all duration-300",
        "focus-within:border-white/20 focus-within:bg-white/10",
      )}
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        rows={1}
        className={cn(
          "w-full px-6 py-4 pr-14",
          "bg-transparent text-white placeholder-white/30",
          "font-light text-lg leading-relaxed",
          "resize-none outline-none",
          "disabled:opacity-50",
        )}
      />

      <button
        onClick={() => onSubmit(value)}
        disabled={isLoading || !value.trim()}
        className={cn(
          "absolute right-3 bottom-3",
          "w-10 h-10 rounded-full",
          "flex items-center justify-center",
          "bg-[var(--accent-color)] text-black",
          "transition-all duration-200",
          "hover:scale-105 active:scale-95",
          "disabled:opacity-30 disabled:cursor-not-allowed",
        )}
        aria-label="Enviar mensagem"
      >
        {isLoading ? <LoadingSpinner /> : <ArrowIcon />}
      </button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" aria-label="Carregando">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeDasharray="30 70"
      />
    </svg>
  );
}

