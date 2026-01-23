# https://sdk.vercel.ai/docs/ai-sdk-core/devtools

Copy markdown

[DevTools](#devtools)
=====================

AI SDK DevTools is experimental and intended for local development only. Do
not use in production environments.

AI SDK DevTools gives you full visibility over your AI SDK calls with [`generateText`](/docs/reference/ai-sdk-core/generate-text), [`streamText`](/docs/reference/ai-sdk-core/stream-text), and [`ToolLoopAgent`](/docs/reference/ai-sdk-core/tool-loop-agent). It helps you debug and inspect LLM requests, responses, tool calls, and multi-step interactions through a web-based UI.

DevTools is composed of two parts:

1. **Middleware**: Captures runs and steps from your AI SDK calls
2. **Viewer**: A web UI to inspect the captured data

[Installation](#installation)
-----------------------------

Install the DevTools package:

```
1

pnpm add @ai-sdk/devtools
```

[Requirements](#requirements)
-----------------------------

* AI SDK v6 beta (`ai@^6.0.0-beta.0`)
* Node.js compatible runtime

[Using DevTools](#using-devtools)
---------------------------------

### [Add the middleware](#add-the-middleware)

Wrap your language model with the DevTools middleware using [`wrapLanguageModel`](/docs/ai-sdk-core/middleware):

```
1

import { wrapLanguageModel, gateway } from 'ai';



2

import { devToolsMiddleware } from '@ai-sdk/devtools';



3



4

const model = wrapLanguageModel({



5

model: gateway('anthropic/claude-sonnet-4.5'),



6

middleware: devToolsMiddleware(),



7

});
```

The wrapped model can be used with any AI SDK Core function:

```
1

import { generateText } from 'ai';



2



3

const result = await generateText({



4

model, // wrapped model with DevTools



5

prompt: 'What cities are in the United States?',



6

});
```

### [Launch the viewer](#launch-the-viewer)

Start the DevTools viewer:

```
1

npx @ai-sdk/devtools
```

Open <http://localhost:4983> to view your AI SDK interactions.

[Captured data](#captured-data)
-------------------------------

The DevTools middleware captures the following information from your AI SDK calls:

* **Input parameters and prompts**: View the complete input sent to your LLM
* **Output content and tool calls**: Inspect generated text and tool invocations
* **Token usage and timing**: Monitor resource consumption and performance
* **Raw provider data**: Access complete request and response payloads

### [Runs and steps](#runs-and-steps)

DevTools organizes captured data into runs and steps:

* **Run**: A complete multi-step AI interaction, grouped by the initial prompt
* **Step**: A single LLM call within a run (e.g., one `generateText` or `streamText` call)

Multi-step interactions, such as those created by tool calling or agent loops, are grouped together as a single run with multiple steps.

[How it works](#how-it-works)
-----------------------------

The DevTools middleware intercepts all `generateText` and `streamText` calls through the [language model middleware](/docs/ai-sdk-core/middleware) system. Captured data is stored locally in a JSON file (`.devtools/generations.json`) and served through a web UI built with Hono and React.

The middleware automatically adds `.devtools` to your `.gitignore` file.
Verify that `.devtools` is in your `.gitignore` to ensure you don't commit
sensitive AI interaction data to your repository.

[Security considerations](#security-considerations)
---------------------------------------------------

DevTools stores all AI interactions locally in plain text files, including:

* User prompts and messages
* LLM responses
* Tool call arguments and results
* API request and response data

**Only use DevTools in local development environments.** Do not enable DevTools in production or when handling sensitive data.