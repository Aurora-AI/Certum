# https://sdk.vercel.ai/providers/ai-sdk-providers/cerebras

Copy markdown

[Cerebras Provider](#cerebras-provider)
=======================================

The [Cerebras](https://cerebras.ai) provider offers access to powerful language models through the Cerebras API, including their high-speed inference capabilities powered by Wafer-Scale Engines and CS-3 systems.

API keys can be obtained from the [Cerebras Platform](https://cloud.cerebras.ai).

[Setup](#setup)
---------------

The Cerebras provider is available via the `@ai-sdk/cerebras` module. You can install it with:

pnpmnpmyarnbun

```
pnpm add @ai-sdk/cerebras
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `cerebras` from `@ai-sdk/cerebras`:

```
1

import { cerebras } from '@ai-sdk/cerebras';
```

For custom configuration, you can import `createCerebras` and create a provider instance with your settings:

```
1

import { createCerebras } from '@ai-sdk/cerebras';



2



3

const cerebras = createCerebras({



4

apiKey: process.env.CEREBRAS_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the Cerebras provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls.
  The default prefix is `https://api.cerebras.ai/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `CEREBRAS_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.

[Language Models](#language-models)
-----------------------------------

You can create language models using a provider instance:

```
1

import { cerebras } from '@ai-sdk/cerebras';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: cerebras('llama3.1-8b'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Cerebras language models can be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

You can create Cerebras language models using a provider instance. The first argument is the model ID, e.g. `llama-3.3-70b`:

```
1

const model = cerebras('llama-3.3-70b');
```

You can also use the `.languageModel()` and `.chat()` methods:

```
1

const model = cerebras.languageModel('llama-3.3-70b');



2

const model = cerebras.chat('llama-3.3-70b');
```

[Model Capabilities](#model-capabilities)
-----------------------------------------

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `llama3.1-8b` |  |  |  |  |
| `llama-3.3-70b` |  |  |  |  |
| `gpt-oss-120b` |  |  |  |  |
| `qwen-3-32b` |  |  |  |  |
| `qwen-3-235b-a22b-instruct-2507` |  |  |  |  |
| `qwen-3-235b-a22b-thinking-2507` |  |  |  |  |
| `zai-glm-4.6` |  |  |  |  |
| `zai-glm-4.7` |  |  |  |  |

Please see the [Cerebras
docs](https://inference-docs.cerebras.ai/introduction) for more details about
the available models. Note that context windows are temporarily limited to
8192 tokens in the Free Tier. You can also pass any available provider model
ID as a string if needed.