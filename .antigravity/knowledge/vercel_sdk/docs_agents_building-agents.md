# https://sdk.vercel.ai/docs/agents/building-agents

Copy markdown

[Building Agents](#building-agents)
===================================

The Agent class provides a structured way to encapsulate LLM configuration, tools, and behavior into reusable components. It handles the agent loop for you, allowing the LLM to call tools multiple times in sequence to accomplish complex tasks. Define agents once and use them across your application.

[Why Use the ToolLoopAgent Class?](#why-use-the-toolloopagent-class)
--------------------------------------------------------------------

When building AI applications, you often need to:

* **Reuse configurations** - Same model settings, tools, and prompts across different parts of your application
* **Maintain consistency** - Ensure the same behavior and capabilities throughout your codebase
* **Simplify API routes** - Reduce boilerplate in your endpoints
* **Type safety** - Get full TypeScript support for your agent's tools and outputs

The ToolLoopAgent class provides a single place to define your agent's behavior.

[Creating an Agent](#creating-an-agent)
---------------------------------------

Define an agent by instantiating the ToolLoopAgent class with your desired configuration:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent } from 'ai';



2



3

const myAgent = new ToolLoopAgent({



4

model: "anthropic/claude-sonnet-4.5",



5

instructions: 'You are a helpful assistant.',



6

tools: {



7

// Your tools here



8

},



9

});
```

[Configuration Options](#configuration-options)
-----------------------------------------------

The Agent class accepts all the same settings as `generateText` and `streamText`. Configure:

### [Model and System Instructions](#model-and-system-instructions)

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent } from 'ai';



2



3

const agent = new ToolLoopAgent({



4

model: "anthropic/claude-sonnet-4.5",



5

instructions: 'You are an expert software engineer.',



6

});
```

### [Tools](#tools)

Provide tools that the agent can use to accomplish tasks:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent, tool } from 'ai';



2

import { z } from 'zod';



3



4

const codeAgent = new ToolLoopAgent({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: {



7

runCode: tool({



8

description: 'Execute Python code',



9

inputSchema: z.object({



10

code: z.string(),



11

}),



12

execute: async ({ code }) => {



13

// Execute code and return result



14

return { output: 'Code executed successfully' };



15

},



16

}),



17

},



18

});
```

### [Loop Control](#loop-control)

By default, agents run for 20 steps (`stopWhen: stepCountIs(20)`). In each step, the model either generates text or calls a tool. If it generates text, the agent completes. If it calls a tool, the AI SDK executes that tool.

To let agents call multiple tools in sequence, configure `stopWhen` to allow more steps. After each tool execution, the agent triggers a new generation where the model can call another tool or generate text:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent, stepCountIs } from 'ai';



2



3

const agent = new ToolLoopAgent({



4

model: "anthropic/claude-sonnet-4.5",



5

stopWhen: stepCountIs(20), // Allow up to 20 steps



6

});
```

Each step represents one generation (which results in either text or a tool call). The loop continues until:

* A finish reasoning other than tool-calls is returned, or
* A tool that is invoked does not have an execute function, or
* A tool call needs approval, or
* A stop condition is met

You can combine multiple conditions:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent, stepCountIs } from 'ai';



2



3

const agent = new ToolLoopAgent({



4

model: "anthropic/claude-sonnet-4.5",



5

stopWhen: [



6

stepCountIs(20), // Maximum 20 steps



7

yourCustomCondition(), // Custom logic for when to stop



8

],



9

});
```

Learn more about [loop control and stop conditions](/docs/agents/loop-control).

### [Tool Choice](#tool-choice)

Control how the agent uses tools:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent } from 'ai';



2



3

const agent = new ToolLoopAgent({



4

model: "anthropic/claude-sonnet-4.5",



5

tools: {



6

// your tools here



7

},



8

toolChoice: 'required', // Force tool use



9

// or toolChoice: 'none' to disable tools



10

// or toolChoice: 'auto' (default) to let the model decide



11

});
```

You can also force the use of a specific tool:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent } from 'ai';



2



3

const agent = new ToolLoopAgent({



4

model: "anthropic/claude-sonnet-4.5",



5

tools: {



6

weather: weatherTool,



7

cityAttractions: attractionsTool,



8

},



9

toolChoice: {



10

type: 'tool',



11

toolName: 'weather', // Force the weather tool to be used



12

},



13

});
```

### [Structured Output](#structured-output)

Define structured output schemas:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { ToolLoopAgent, Output, stepCountIs } from 'ai';



2

import { z } from 'zod';



3



4

const analysisAgent = new ToolLoopAgent({



5

model: "anthropic/claude-sonnet-4.5",



6

output: Output.object({



7

schema: z.object({



8

sentiment: z.enum(['positive', 'neutral', 'negative']),



9

summary: z.string(),



10

keyPoints: z.array(z.string()),



11

}),



12

}),



13

stopWhen: stepCountIs(10),



14

});



15



16

const { output } = await analysisAgent.generate({



17

prompt: 'Analyze customer feedback from the last quarter',



18

});
```

[Define Agent Behavior with System Instructions](#define-agent-behavior-with-system-instructions)
-------------------------------------------------------------------------------------------------

System instructions define your agent's behavior, personality, and constraints. They set the context for all interactions and guide how the agent responds to user queries and uses tools.

### [Basic System Instructions](#basic-system-instructions)

Set the agent's role and expertise:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const agent = new ToolLoopAgent({



2

model: "anthropic/claude-sonnet-4.5",



3

instructions:



4

'You are an expert data analyst. You provide clear insights from complex data.',



5

});
```

### [Detailed Behavioral Instructions](#detailed-behavioral-instructions)

Provide specific guidelines for agent behavior:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const codeReviewAgent = new ToolLoopAgent({



2

model: "anthropic/claude-sonnet-4.5",



3

instructions: `You are a senior software engineer conducting code reviews.



4



5

Your approach:



6

- Focus on security vulnerabilities first



7

- Identify performance bottlenecks



8

- Suggest improvements for readability and maintainability



9

- Be constructive and educational in your feedback



10

- Always explain why something is an issue and how to fix it`,



11

});
```

### [Constrain Agent Behavior](#constrain-agent-behavior)

Set boundaries and ensure consistent behavior:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const customerSupportAgent = new ToolLoopAgent({



2

model: "anthropic/claude-sonnet-4.5",



3

instructions: `You are a customer support specialist for an e-commerce platform.



4



5

Rules:



6

- Never make promises about refunds without checking the policy



7

- Always be empathetic and professional



8

- If you don't know something, say so and offer to escalate



9

- Keep responses concise and actionable



10

- Never share internal company information`,



11

tools: {



12

checkOrderStatus,



13

lookupPolicy,



14

createTicket,



15

},



16

});
```

### [Tool Usage Instructions](#tool-usage-instructions)

Guide how the agent should use available tools:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const researchAgent = new ToolLoopAgent({



2

model: "anthropic/claude-sonnet-4.5",



3

instructions: `You are a research assistant with access to search and document tools.



4



5

When researching:



6

1. Always start with a broad search to understand the topic



7

2. Use document analysis for detailed information



8

3. Cross-reference multiple sources before drawing conclusions



9

4. Cite your sources when presenting information



10

5. If information conflicts, present both viewpoints`,



11

tools: {



12

webSearch,



13

analyzeDocument,



14

extractQuotes,



15

},



16

});
```

### [Format and Style Instructions](#format-and-style-instructions)

Control the output format and communication style:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const technicalWriterAgent = new ToolLoopAgent({



2

model: "anthropic/claude-sonnet-4.5",



3

instructions: `You are a technical documentation writer.



4



5

Writing style:



6

- Use clear, simple language



7

- Avoid jargon unless necessary



8

- Structure information with headers and bullet points



9

- Include code examples where relevant



10

- Write in second person ("you" instead of "the user")



11



12

Always format responses in Markdown.`,



13

});
```

[Using an Agent](#using-an-agent)
---------------------------------

Once defined, you can use your agent in three ways:

### [Generate Text](#generate-text)

Use `generate()` for one-time text generation:

```
1

const result = await myAgent.generate({



2

prompt: 'What is the weather like?',



3

});



4



5

console.log(result.text);
```

### [Stream Text](#stream-text)

Use `stream()` for streaming responses:

```
1

const stream = myAgent.stream({



2

prompt: 'Tell me a story',



3

});



4



5

for await (const chunk of stream.textStream) {



6

console.log(chunk);



7

}
```

### [Respond to UI Messages](#respond-to-ui-messages)

Use `createAgentUIStreamResponse()` to create API responses for client applications:

```
1

// In your API route (e.g., app/api/chat/route.ts)



2

import { createAgentUIStreamResponse } from 'ai';



3



4

export async function POST(request: Request) {



5

const { messages } = await request.json();



6



7

return createAgentUIStreamResponse({



8

agent: myAgent,



9

messages,



10

});



11

}
```

[End-to-end Type Safety](#end-to-end-type-safety)
-------------------------------------------------

You can infer types for your agent's `UIMessage`s:

```
1

import { ToolLoopAgent, InferAgentUIMessage } from 'ai';



2



3

const myAgent = new ToolLoopAgent({



4

// ... configuration



5

});



6



7

// Infer the UIMessage type for UI components or persistence



8

export type MyAgentUIMessage = InferAgentUIMessage<typeof myAgent>;
```

Use this type in your client components with `useChat`:

components/chat.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import type { MyAgentUIMessage } from '@/agent/my-agent';



5



6

export function Chat() {



7

const { messages } = useChat<MyAgentUIMessage>();



8

// Full type safety for your messages and tools



9

}
```

[Next Steps](#next-steps)
-------------------------

Now that you understand building agents, you can:

* Explore [workflow patterns](/docs/agents/workflows) for structured patterns using core functions
* Learn about [loop control](/docs/agents/loop-control) for advanced execution control
* See [manual loop examples](/cookbook/node/manual-agent-loop) for custom workflow implementations