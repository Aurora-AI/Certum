# https://vercel.com/docs/ai/openai

Menu

Vercel & OpenAI Integration
===========================

Copy pageAsk AI about this page

Last updated September 24, 2025

Vercel integrates with [OpenAI](https://platform.openai.com/overview) to enable developers to build fast, scalable, and secure [AI applications](https://vercel.com/ai).

You can integrate with [any OpenAI model](https://platform.openai.com/docs/models/overview) using the [AI SDK](https://sdk.vercel.ai), including the following OpenAI models:

* GPT-4o: Understand and generate natural language or code
* GPT-4.5: Latest language model with enhanced emotional intelligence
* o3-mini: Reasoning model specialized in code generation and complex tasks
* DALL·E 3: Generate and edit images from natural language
* Embeddings: Convert term into vectors

[Getting started](#getting-started)
-----------------------------------

To help you get started, we have built a [variety of AI templates](https://vercel.com/templates/ai) integrating OpenAI with Vercel.

[![Vercel Postgres pgvector Starter](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1yuRwhtxdfJgayc35vX7u3%2F12abd3b9785537eb15324ab2c5b99636%2Fopengraph-image.png&w=3840&q=75)

Vercel Postgres pgvector Starter

A Next.js template that uses Vercel Postgres as the database, pgvector for vector similarity search + OpenAI's text embedding models.](https://vercel.com/templates/next.js/postgres-pgvector)[![Next.js AI Chatbot](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4cmiDM859wtut7XeG0iFYq%2F953f071e4556b8a07bcab042f3a08db3%2FUntitled_design__17_.png&w=3840&q=75)

Next.js AI Chatbot

A full-featured, hackable Next.js AI chatbot built by Vercel](https://vercel.com/templates/next.js/nextjs-ai-chatbot)

[Getting Your OpenAI API Key](#getting-your-openai-api-key)
-----------------------------------------------------------

Before you begin, ensure you have an [OpenAI account](https://platform.openai.com/signup). Once registered:

1. ### [Navigate to API Keys](#navigate-to-api-keys)

   Log into your [OpenAI Dashboard](https://platform.openai.com/) and [view API keys](https://platform.openai.com/account/api-keys).
2. ### [Generate API Key](#generate-api-key)

   Click on Create new secret key. Copy the generated API key securely.

   ![](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2F7nyt0uhk7sse4zvn.public.blob.vercel-storage.com%2Fdocs-assets%2Fstatic%2Fdocs%2Fopenai%2Fenv-vars.png&w=3840&q=75)

   Always keep your API keys confidential. Do not expose them in client-side code. Use [Vercel Environment Variables](/docs/environment-variables) for safe storage and do not commit these values to git.
3. ### [Set Environment Variable](#set-environment-variable)

   Finally, add the `OPENAI_API_KEY` environment variable in your project:

   .env.local

   ```
   OPENAI_API_KEY='sk-...3Yu5'
   ```

[Building chat interfaces with the AI SDK](#building-chat-interfaces-with-the-ai-sdk)
-------------------------------------------------------------------------------------

Integrating OpenAI into your Vercel project is seamless with the [AI SDK](https://sdk.vercel.ai/docs).

Install the AI SDK in your project with your favorite package manager:

Terminal

```
pnpm i ai
```

You can use the SDK to build AI applications with [React (Next.js)](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router), [Vue (Nuxt)](https://sdk.vercel.ai/docs/getting-started/nuxt), [Svelte (SvelteKit)](https://sdk.vercel.ai/docs/getting-started/svelte), and [Node.js](https://sdk.vercel.ai/docs/getting-started/nodejs).

[Using OpenAI Functions with Vercel](#using-openai-functions-with-vercel)
-------------------------------------------------------------------------

The AI SDK also has full support for [OpenAI Functions (tool calling)](https://openai.com/blog/function-calling-and-other-api-updates).

Learn more about using [tools with the AI SDK](https://sdk.vercel.ai/docs/foundations/tools).

---

Was this helpful?

supported.

Send