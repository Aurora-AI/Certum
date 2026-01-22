import { useCallback, useState } from "react";

import { mockQualify } from "@/lib/elysian/mockQualify";
import { useSiteStore } from "@/store/useSiteStore";
import type { ElysianQualifyRequest, ElysianQualifyResponse } from "@/types/elysian";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_ELYSIAN === "true";

export function useElysianQualify() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyElysianResponse = useSiteStore((state) => state.applyElysianResponse);
  const addConversationMessage = useSiteStore((state) => state.addConversationMessage);
  const conversationHistory = useSiteStore((state) => state.conversationHistory);

  const qualify = useCallback(
    async (message: string) => {
      setIsLoading(true);
      setError(null);

      addConversationMessage({
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      });

      try {
        const request: ElysianQualifyRequest = {
          message,
          conversationHistory: conversationHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        };

        let response: ElysianQualifyResponse;

        if (USE_MOCK) {
          response = await mockQualify(request);
        } else {
          const res = await fetch("/api/elysian/qualify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
          });

          if (!res.ok) {
            throw new Error("Falha na comunicação com Elysian");
          }

          response = (await res.json()) as ElysianQualifyResponse;
        }

        addConversationMessage({
          role: "assistant",
          content: response.responseText,
          timestamp: new Date().toISOString(),
          uiComponents: response.generatedComponents,
        });

        applyElysianResponse(response);

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addConversationMessage, applyElysianResponse, conversationHistory],
  );

  return { qualify, isLoading, error };
}

