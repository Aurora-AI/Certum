# https://sdk.vercel.ai/providers/ai-sdk-providers/ai-gateway

Copy markdown

[AI Gateway Provider](#ai-gateway-provider)
===========================================

The [AI Gateway](https://vercel.com/docs/ai-gateway) provider connects you to models from multiple AI providers through a single interface. Instead of integrating with each provider separately, you can access OpenAI, Anthropic, Google, Meta, xAI, and other providers and their models.

[Features](#features)
---------------------

* Access models from multiple providers without having to install additional provider modules/dependencies
* Use the same code structure across different AI providers
* Switch between models and providers easily
* Automatic authentication when deployed on Vercel
* View pricing information across providers
* Observability for AI model usage through the Vercel dashboard

[Setup](#setup)
---------------

The Vercel AI Gateway provider is part of the AI SDK.

[Basic Usage](#basic-usage)
---------------------------

For most use cases, you can use the AI Gateway directly with a model string:

```
1

// use plain model string with global provider



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: 'openai/gpt-5',



6

prompt: 'Hello world',



7

});
```

```
1

// use provider instance (requires version 5.0.36 or later)



2

import { generateText, gateway } from 'ai';



3



4

const { text } = await generateText({



5

model: gateway('openai/gpt-5'),



6

prompt: 'Hello world',



7

});
```

The AI SDK automatically uses the AI Gateway when you pass a model string in the `creator/model-name` format.

[Provider Instance](#provider-instance)
---------------------------------------

The `gateway` provider instance is available from the `ai` package in version
5.0.36 and later.

You can also import the default provider instance `gateway` from `ai`:

```
1

import { gateway } from 'ai';
```

You may want to create a custom provider instance when you need to:

* Set custom configuration options (API key, base URL, headers)
* Use the provider in a [provider registry](/docs/ai-sdk-core/provider-management)
* Wrap the provider with [middleware](/docs/ai-sdk-core/middleware)
* Use different settings for different parts of your application

To create a custom provider instance, import `createGateway` from `ai`:

```
1

import { createGateway } from 'ai';



2



3

const gateway = createGateway({



4

apiKey: process.env.AI_GATEWAY_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the AI Gateway provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls. The default prefix is `https://ai-gateway.vercel.sh/v3/ai`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `AI_GATEWAY_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.
* **metadataCacheRefreshMillis** *number*

  How frequently to refresh the metadata cache in milliseconds. Defaults to 5 minutes (300,000ms).

[Authentication](#authentication)
---------------------------------

The Gateway provider supports two authentication methods:

### [API Key Authentication](#api-key-authentication)

Set your API key via environment variable:

```
1

AI_GATEWAY_API_KEY=your_api_key_here
```

Or pass it directly to the provider:

```
1

import { createGateway } from 'ai';



2



3

const gateway = createGateway({



4

apiKey: 'your_api_key_here',



5

});
```

### [OIDC Authentication (Vercel Deployments)](#oidc-authentication-vercel-deployments)

When deployed to Vercel, the AI Gateway provider supports authenticating using [OIDC (OpenID Connect)
tokens](https://vercel.com/docs/oidc) without API Keys.

#### [How OIDC Authentication Works](#how-oidc-authentication-works)

1. **In Production/Preview Deployments**:

   * OIDC authentication is automatically handled
   * No manual configuration needed
   * Tokens are automatically obtained and refreshed
2. **In Local Development**:

   * First, install and authenticate with the [Vercel CLI](https://vercel.com/docs/cli)
   * Run `vercel env pull` to download your project's OIDC token locally
   * For automatic token management:
     + Use `vercel dev` to start your development server - this will handle token refreshing automatically
   * For manual token management:
     + If not using `vercel dev`, note that OIDC tokens expire after 12 hours
     + You'll need to run `vercel env pull` again to refresh the token before it expires

If an API Key is present (either passed directly or via environment), it will
always be used, even if invalid.

Read more about using OIDC tokens in the [Vercel AI Gateway docs](https://vercel.com/docs/ai-gateway#using-the-ai-gateway-with-a-vercel-oidc-token).

[Bring Your Own Key (BYOK)](#bring-your-own-key-byok)
-----------------------------------------------------

You can connect your own provider credentials to use with Vercel AI Gateway. This lets you use your existing provider accounts and access private resources.

To set up BYOK, add your provider credentials in your Vercel team's AI Gateway settings. Once configured, AI Gateway automatically uses your credentials. No code changes are needed.

Learn more in the [BYOK documentation](https://vercel.com/docs/ai-gateway/byok).

[Language Models](#language-models)
-----------------------------------

You can create language models using a provider instance. The first argument is the model ID in the format `creator/model-name`:

```
1

import { generateText } from 'ai';



2



3

const { text } = await generateText({



4

model: 'openai/gpt-5',



5

prompt: 'Explain quantum computing in simple terms',



6

});
```

AI Gateway language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions (see [AI SDK Core](/docs/ai-sdk-core)).

[Available Models](#available-models)
-------------------------------------

The AI Gateway supports models from OpenAI, Anthropic, Google, Meta, xAI, Mistral, DeepSeek, Amazon Bedrock, Cohere, Perplexity, Alibaba, and other providers.

For the complete list of available models, see the [AI Gateway documentation](https://vercel.com/docs/ai-gateway).

[Dynamic Model Discovery](#dynamic-model-discovery)
---------------------------------------------------

You can discover available models programmatically:

```
1

import { gateway, generateText } from 'ai';



2



3

const availableModels = await gateway.getAvailableModels();



4



5

// List all available models



6

availableModels.models.forEach(model => {



7

console.log(`${model.id}: ${model.name}`);



8

if (model.description) {



9

console.log(`  Description: ${model.description}`);



10

}



11

if (model.pricing) {



12

console.log(`  Input: $${model.pricing.input}/token`);



13

console.log(`  Output: $${model.pricing.output}/token`);



14

if (model.pricing.cachedInputTokens) {



15

console.log(



16

`  Cached input (read): $${model.pricing.cachedInputTokens}/token`,



17

);



18

}



19

if (model.pricing.cacheCreationInputTokens) {



20

console.log(



21

`  Cache creation (write): $${model.pricing.cacheCreationInputTokens}/token`,



22

);



23

}



24

}



25

});



26



27

// Use any discovered model with plain string



28

const { text } = await generateText({



29

model: availableModels.models[0].id, // e.g., 'openai/gpt-4o'



30

prompt: 'Hello world',



31

});
```

[Credit Usage](#credit-usage)
-----------------------------

You can check your team's current credit balance and usage:

```
1

import { gateway } from 'ai';



2



3

const credits = await gateway.getCredits();



4



5

console.log(`Team balance: ${credits.balance} credits`);



6

console.log(`Team total used: ${credits.total_used} credits`);
```

The `getCredits()` method returns your team's credit information based on the authenticated API key or OIDC token:

* **balance** *number* - Your team's current available credit balance
* **total\_used** *number* - Total credits consumed by your team

[Examples](#examples)
---------------------

### [Basic Text Generation](#basic-text-generation)

```
1

import { generateText } from 'ai';



2



3

const { text } = await generateText({



4

model: 'anthropic/claude-sonnet-4',



5

prompt: 'Write a haiku about programming',



6

});



7



8

console.log(text);
```

### [Streaming](#streaming)

```
1

import { streamText } from 'ai';



2



3

const { textStream } = await streamText({



4

model: 'openai/gpt-5',



5

prompt: 'Explain the benefits of serverless architecture',



6

});



7



8

for await (const textPart of textStream) {



9

process.stdout.write(textPart);



10

}
```

### [Tool Usage](#tool-usage)

```
1

import { generateText, tool } from 'ai';



2

import { z } from 'zod';



3



4

const { text } = await generateText({



5

model: 'xai/grok-4',



6

prompt: 'What is the weather like in San Francisco?',



7

tools: {



8

getWeather: tool({



9

description: 'Get the current weather for a location',



10

parameters: z.object({



11

location: z.string().describe('The location to get weather for'),



12

}),



13

execute: async ({ location }) => {



14

// Your weather API call here



15

return `It's sunny in ${location}`;



16

},



17

}),



18

},



19

});
```

### [Provider-Executed Tools](#provider-executed-tools)

Some providers offer tools that are executed by the provider itself, such as [OpenAI's web search tool](/providers/ai-sdk-providers/openai#web-search-tool). To use these tools through AI Gateway, import the provider to access the tool definitions:

```
1

import { generateText, stepCountIs } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const result = await generateText({



5

model: 'openai/gpt-5-mini',



6

prompt: 'What is the Vercel AI Gateway?',



7

stopWhen: stepCountIs(10),



8

tools: {



9

web_search: openai.tools.webSearch({}),



10

},



11

});



12



13

console.dir(result.text);
```

Some provider-executed tools require account-specific configuration (such as
Claude Agent Skills) and may not work through AI Gateway. To use these tools,
you must bring your own key (BYOK) directly to the provider.

### [Gateway Tools](#gateway-tools)

The AI Gateway provider includes built-in tools that are executed by the gateway itself. These tools can be used with any model through the gateway.

#### [Perplexity Search](#perplexity-search)

The Perplexity Search tool enables models to search the web using [Perplexity's search API](https://docs.perplexity.ai/guides/search-quickstart). This tool is executed by the AI Gateway and returns web search results that the model can use to provide up-to-date information.

```
1

import { gateway, generateText } from 'ai';



2



3

const result = await generateText({



4

model: 'openai/gpt-5-nano',



5

prompt: 'Search for news about AI regulations in January 2025.',



6

tools: {



7

perplexity_search: gateway.tools.perplexitySearch(),



8

},



9

});



10



11

console.log(result.text);



12

console.log('Tool calls:', JSON.stringify(result.toolCalls, null, 2));



13

console.log('Tool results:', JSON.stringify(result.toolResults, null, 2));
```

You can also configure the search with optional parameters:

```
1

import { gateway, generateText } from 'ai';



2



3

const result = await generateText({



4

model: 'openai/gpt-5-nano',



5

prompt:



6

'Search for news about AI regulations from the first week of January 2025.',



7

tools: {



8

perplexity_search: gateway.tools.perplexitySearch({



9

maxResults: 5,



10

searchLanguageFilter: ['en'],



11

country: 'US',



12

searchDomainFilter: ['reuters.com', 'bbc.com', 'nytimes.com'],



13

}),



14

},



15

});



16



17

console.log(result.text);



18

console.log('Tool calls:', JSON.stringify(result.toolCalls, null, 2));



19

console.log('Tool results:', JSON.stringify(result.toolResults, null, 2));
```

The Perplexity Search tool supports the following optional configuration options:

* **maxResults** *number*

  The maximum number of search results to return (1-20, default: 10).
* **maxTokensPerPage** *number*

  The maximum number of tokens to extract per search result page (256-2048, default: 2048).
* **maxTokens** *number*

  The maximum total tokens across all search results (default: 25000, max: 1000000).
* **searchLanguageFilter** *string[]*

  Filter search results by language using ISO 639-1 language codes (e.g., `['en']` for English, `['en', 'es']` for English and Spanish).
* **country** *string*

  Filter search results by country using ISO 3166-1 alpha-2 country codes (e.g., `'US'` for United States, `'GB'` for United Kingdom).
* **searchDomainFilter** *string[]*

  Limit search results to specific domains (e.g., `['reuters.com', 'bbc.com']`). This is useful for restricting results to trusted sources.
* **searchRecencyFilter** *'day' | 'week' | 'month' | 'year'*

  Filter search results by relative time period. Useful for always getting recent results (e.g., 'week' for results from the last week).

The tool works with both `generateText` and `streamText`:

```
1

import { gateway, streamText } from 'ai';



2



3

const result = streamText({



4

model: 'openai/gpt-5-nano',



5

prompt: 'Search for the latest news about AI regulations.',



6

tools: {



7

perplexity_search: gateway.tools.perplexitySearch(),



8

},



9

});



10



11

for await (const part of result.fullStream) {



12

switch (part.type) {



13

case 'text-delta':



14

process.stdout.write(part.text);



15

break;



16

case 'tool-call':



17

console.log('\nTool call:', JSON.stringify(part, null, 2));



18

break;



19

case 'tool-result':



20

console.log('\nTool result:', JSON.stringify(part, null, 2));



21

break;



22

}



23

}
```

### [Usage Tracking with User and Tags](#usage-tracking-with-user-and-tags)

Track usage per end-user and categorize requests with tags:

```
1

import type { GatewayProviderOptions } from '@ai-sdk/gateway';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: 'openai/gpt-5',



6

prompt: 'Summarize this document...',



7

providerOptions: {



8

gateway: {



9

user: 'user-abc-123', // Track usage for this specific end-user



10

tags: ['document-summary', 'premium-feature'], // Categorize for reporting



11

} satisfies GatewayProviderOptions,



12

},



13

});
```

This allows you to:

* View usage and costs broken down by end-user in your analytics
* Filter and analyze spending by feature or use case using tags
* Track which users or features are driving the most AI usage

[Provider Options](#provider-options)
-------------------------------------

The AI Gateway provider accepts provider options that control routing behavior and provider-specific configurations.

### [Gateway Provider Options](#gateway-provider-options)

You can use the `gateway` key in `providerOptions` to control how AI Gateway routes requests:

```
1

import type { GatewayProviderOptions } from '@ai-sdk/gateway';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: 'anthropic/claude-sonnet-4',



6

prompt: 'Explain quantum computing',



7

providerOptions: {



8

gateway: {



9

order: ['vertex', 'anthropic'], // Try Vertex AI first, then Anthropic



10

only: ['vertex', 'anthropic'], // Only use these providers



11

} satisfies GatewayProviderOptions,



12

},



13

});
```

The following gateway provider options are available:

* **order** *string[]*

  Specifies the sequence of providers to attempt when routing requests. The gateway will try providers in the order specified. If a provider fails or is unavailable, it will move to the next provider in the list.

  Example: `order: ['bedrock', 'anthropic']` will attempt Amazon Bedrock first, then fall back to Anthropic.
* **only** *string[]*

  Restricts routing to only the specified providers. When set, the gateway will never route to providers not in this list, even if they would otherwise be available.

  Example: `only: ['anthropic', 'vertex']` will only allow routing to Anthropic or Vertex AI.
* **models** *string[]*

  Specifies fallback models to use when the primary model fails or is unavailable. The gateway will try the primary model first (specified in the `model` parameter), then try each model in this array in order until one succeeds.

  Example: `models: ['openai/gpt-5-nano', 'gemini-2.0-flash']` will try the fallback models in order if the primary model fails.
* **user** *string*

  Optional identifier for the end user on whose behalf the request is being made. This is used for spend tracking and attribution purposes, allowing you to track usage per end-user in your application.

  Example: `user: 'user-123'` will associate this request with end-user ID "user-123" in usage reports.
* **tags** *string[]*

  Optional array of tags for categorizing and filtering usage in reports. Useful for tracking spend by feature, prompt version, or any other dimension relevant to your application.

  Example: `tags: ['chat', 'v2']` will tag this request with "chat" and "v2" for filtering in usage analytics.
* **byok** *Record<string, Array<Record<string, unknown>>>*

  Request-scoped BYOK (Bring Your Own Key) credentials to use for this request. When provided, any cached BYOK credentials configured in the gateway system are not considered. Requests may still fall back to use system credentials if the provided credentials fail.

  Each provider can have multiple credentials (tried in order). The structure is a record where keys are provider slugs and values are arrays of credential objects.

  Examples:

  + Single provider: `byok: { 'anthropic': [{ apiKey: 'sk-ant-...' }] }`
  + Multiple credentials: `byok: { 'vertex': [{ project: 'proj-1', googleCredentials: { privateKey: '...', clientEmail: '...' } }, { project: 'proj-2', googleCredentials: { privateKey: '...', clientEmail: '...' } }] }`
  + Multiple providers: `byok: { 'anthropic': [{ apiKey: '...' }], 'bedrock': [{ accessKeyId: '...', secretAccessKey: '...' }] }`
* **zeroDataRetention** *boolean*

  Restricts routing requests to providers that have zero data retention policies.

You can combine these options to have fine-grained control over routing and tracking:

```
1

import type { GatewayProviderOptions } from '@ai-sdk/gateway';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: 'anthropic/claude-sonnet-4',



6

prompt: 'Write a haiku about programming',



7

providerOptions: {



8

gateway: {



9

order: ['vertex'], // Prefer Vertex AI



10

only: ['anthropic', 'vertex'], // Only allow these providers



11

} satisfies GatewayProviderOptions,



12

},



13

});
```

#### [Model Fallbacks Example](#model-fallbacks-example)

The `models` option enables automatic fallback to alternative models when the primary model fails:

```
1

import type { GatewayProviderOptions } from '@ai-sdk/gateway';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: 'openai/gpt-4o', // Primary model



6

prompt: 'Write a TypeScript haiku',



7

providerOptions: {



8

gateway: {



9

models: ['openai/gpt-5-nano', 'gemini-2.0-flash'], // Fallback models



10

} satisfies GatewayProviderOptions,



11

},



12

});



13



14

// This will:



15

// 1. Try openai/gpt-4o first



16

// 2. If it fails, try openai/gpt-5-nano



17

// 3. If that fails, try gemini-2.0-flash



18

// 4. Return the result from the first model that succeeds
```

#### [Zero Data Retention Example](#zero-data-retention-example)

Set `zeroDataRetention` to true to ensure requests are only routed to providers
that have zero data retention policies. When `zeroDataRetention` is `false` or not
specified, there is no enforcement of restricting routing.

```
1

import type { GatewayProviderOptions } from '@ai-sdk/gateway';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: 'anthropic/claude-sonnet-4.5',



6

prompt: 'Analyze this sensitive document...',



7

providerOptions: {



8

gateway: {



9

zeroDataRetention: true,



10

} satisfies GatewayProviderOptions,



11

},



12

});
```

### [Provider-Specific Options](#provider-specific-options)

When using provider-specific options through AI Gateway, use the actual provider name (e.g. `anthropic`, `openai`, not `gateway`) as the key:

```
1

import type { AnthropicProviderOptions } from '@ai-sdk/anthropic';



2

import type { GatewayProviderOptions } from '@ai-sdk/gateway';



3

import { generateText } from 'ai';



4



5

const { text } = await generateText({



6

model: 'anthropic/claude-sonnet-4',



7

prompt: 'Explain quantum computing',



8

providerOptions: {



9

gateway: {



10

order: ['vertex', 'anthropic'],



11

} satisfies GatewayProviderOptions,



12

anthropic: {



13

thinking: { type: 'enabled', budgetTokens: 12000 },



14

} satisfies AnthropicProviderOptions,



15

},



16

});
```

This works with any provider supported by AI Gateway. Each provider has its own set of options - see the individual [provider documentation pages](/providers/ai-sdk-providers) for details on provider-specific options.

### [Available Providers](#available-providers)

AI Gateway supports routing to 20+ providers.

For a complete list of available providers and their slugs, see the [AI Gateway documentation](https://vercel.com/docs/ai-gateway/provider-options#available-providers).

[Model Capabilities](#model-capabilities)
-----------------------------------------

Model capabilities depend on the specific provider and model you're using. For detailed capability information, see:

* [AI Gateway provider options](https://vercel.com/docs/ai-gateway/provider-options#available-providers) for an overview of available providers
* Individual [AI SDK provider pages](/providers/ai-sdk-providers) for specific model capabilities and features