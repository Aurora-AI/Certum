import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useElysianQualify } from "@/hooks/useElysianQualify";
import { useSiteStore } from "@/store/useSiteStore";

import { ConciergeInput } from "./ConciergeInput";
import { ConciergeMessage } from "./ConciergeMessage";
import { ConciergeOrb } from "./ConciergeOrb";
import { ConciergeThinking } from "./ConciergeThinking";

interface TheConciergeProps {
  variant?: "embedded" | "floating" | "fullscreen";
  initialQuestion?: string;
}

export function TheConcierge({
  variant = "embedded",
  initialQuestion = "Qual o tamanho do seu legado?",
}: TheConciergeProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationHistory = useSiteStore((state) => state.conversationHistory);
  const { qualify, isLoading, error } = useElysianQualify();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;
    setInputValue("");
    try {
      await qualify(message);
    } catch (err) {
      console.error("Erro na qualificação:", err);
    }
  };

  const hasMessages = conversationHistory.length > 0;

  return (
    <section
      id="concierge"
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center",
        "px-6 md:px-12 lg:px-24",
        variant === "fullscreen" && "fixed inset-0 z-50",
        variant === "floating" && "fixed right-6 bottom-6 z-50 min-h-[unset] w-[min(520px,calc(100vw-3rem))]",
      )}
    >
      <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-xl" />

      <div className="relative z-10 w-full max-w-3xl">
        {!hasMessages && (
          <div className="flex flex-col items-center mb-12">
            <ConciergeOrb isActive={!isLoading} />

            <h2 className="mt-8 text-3xl md:text-4xl font-serif text-white/90 text-center">
              {initialQuestion}
            </h2>

            <p className="mt-4 text-sm text-white/40 font-mono tracking-wider">
              PROTOCOL GENESIS V.3
            </p>
          </div>
        )}

        {hasMessages && (
          <div className="mb-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
              {conversationHistory.map((message, index) => (
                <ConciergeMessage
                  key={`${message.timestamp}-${index}`}
                  role={message.role}
                  content={message.content}
                  uiComponents={message.uiComponents}
                  isLatest={index === conversationHistory.length - 1}
                />
              ))}

              {isLoading && <ConciergeThinking />}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <ConciergeInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder={hasMessages ? "Continue a conversa..." : "Descreva seu objetivo patrimonial..."}
        />

        {error && (
          <p className="mt-4 text-sm text-red-400/80 text-center font-mono">{error}</p>
        )}
      </div>
    </section>
  );
}

