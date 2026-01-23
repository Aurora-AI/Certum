---
name: vercel-ai-sdk-expert
description: Use when implementing AI features, streaming responses, generative UI, or LLM integrations using Vercel AI SDK. Specializes in useChat, useCompletion, streaming, and AI-powered interfaces.
version: 1.0.0
author: Mad Lab Aurora
tags: [ai, llm, streaming, generative-ui, vercel-ai]
---

# Vercel AI SDK Expert

## Goal

Implement AI-powered features and generative UI using Vercel AI SDK with seamless streaming and React integration.

## Knowledge Base

Consult `.antigravity/knowledge/vercel_sdk/` for AI SDK documentation.

## When to Use

- User wants to integrate AI/LLM features
- User needs streaming responses
- User asks about generative UI
- User mentions "AI SDK", "useChat", "streaming", "LLM"

## Instructions

### 1. Installation

```bash
npm install ai @ai-sdk/openai
```

### 2. Basic Chat Implementation

```typescript
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: "You are a wealth architecture advisor for Certum Private.",
  });

  return result.toDataStreamResponse();
}
```

```typescript
// components/Chat.tsx
'use client';

import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col gap-4">
      {messages.map(m => (
        <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about wealth architecture..."
          className="border border-black/10 px-4 py-2 w-full"
        />
      </form>
    </div>
  );
}
```

### 3. Streaming Text Completion

```typescript
// API Route
import { streamText } from 'ai';

const result = streamText({
  model: openai('gpt-4-turbo'),
  prompt: 'Explain wealth architecture in one paragraph.',
});

return result.toDataStreamResponse();

// Client
import { useCompletion } from 'ai/react';

const { completion, complete, isLoading } = useCompletion();

<button onClick={() => complete('Explain wealth architecture')}>
  Generate
</button>
<p>{completion}</p>
```

### 4. Generative UI (Server Components)

```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

async function WealthInsight({ topic }: { topic: string }) {
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `Provide a brief insight about ${topic} for high-net-worth individuals.`,
  });

  return (
    <div className="p-6 border border-black/5">
      <h3 className="font-serif text-xl mb-2">{topic}</h3>
      <p className="text-[#8A8A8A]">{text}</p>
    </div>
  );
}
```

### 5. Tool Calling (Function Execution)

```typescript
import { generateText, tool } from "ai";
import { z } from "zod";

const result = await generateText({
  model: openai("gpt-4-turbo"),
  tools: {
    calculateLeverage: tool({
      description: "Calculate optimal leverage for an asset",
      parameters: z.object({
        assetValue: z.number(),
        riskTolerance: z.enum(["low", "medium", "high"]),
      }),
      execute: async ({ assetValue, riskTolerance }) => {
        const rates = { low: 0.5, medium: 0.7, high: 0.85 };
        return { leverage: assetValue * rates[riskTolerance] };
      },
    }),
  },
  prompt: "Calculate leverage for a R$500k asset with medium risk tolerance.",
});
```

### 6. Structured Output

```typescript
import { generateObject } from "ai";
import { z } from "zod";

const { object } = await generateObject({
  model: openai("gpt-4-turbo"),
  schema: z.object({
    recommendation: z.string(),
    riskLevel: z.enum(["low", "medium", "high"]),
    expectedReturn: z.number(),
  }),
  prompt: "Recommend a wealth strategy for a conservative investor.",
});
```

## Certum Integration

```typescript
// Custom system prompt for Certum
const CERTUM_SYSTEM = `
You are Elysian, the AI wealth architect for Certum Private.
- Speak with authority and precision
- Use financial terminology accurately
- Focus on wealth preservation and growth
- Maintain a professional, exclusive tone
`;
```

## Constraints

- 🚫 NEVER stream sensitive financial data without encryption
- 🚫 NEVER expose API keys to client
- ✅ ALWAYS handle loading and error states
- ✅ ALWAYS implement rate limiting for production

## Output Format

Provide:

1. API route code
2. Client component code
3. Type definitions
4. Error handling
