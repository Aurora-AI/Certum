# https://sdk.vercel.ai/providers/ai-sdk-providers/mistral

Copy markdown

[Mistral AI Provider](#mistral-ai-provider)
===========================================

The [Mistral AI](https://mistral.ai/) provider contains language model support for the Mistral chat API.

[Setup](#setup)
---------------

The Mistral provider is available in the `@ai-sdk/mistral` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/mistral
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `mistral` from `@ai-sdk/mistral`:

```
1

import { mistral } from '@ai-sdk/mistral';
```

If you need a customized setup, you can import `createMistral` from `@ai-sdk/mistral`
and create a provider instance with your settings:

```
1

import { createMistral } from '@ai-sdk/mistral';



2



3

const mistral = createMistral({



4

// custom settings



5

});
```

You can use the following optional settings to customize the Mistral provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.mistral.ai/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `MISTRAL_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create models that call the [Mistral chat API](https://docs.mistral.ai/api/#operation/createChatCompletion) using a provider instance.
The first argument is the model id, e.g. `mistral-large-latest`.
Some Mistral chat models support tool calls.

```
1

const model = mistral('mistral-large-latest');
```

Mistral chat models also support additional model settings that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them as an options argument and utilize `MistralLanguageModelOptions` for typing:

```
1

import { mistral, type MistralLanguageModelOptions } from '@ai-sdk/mistral';



2

const model = mistral('mistral-large-latest');



3



4

await generateText({



5

model,



6

providerOptions: {



7

mistral: {



8

safePrompt: true, // optional safety prompt injection



9

parallelToolCalls: false, // disable parallel tool calls (one tool per response)



10

} satisfies MistralLanguageModelOptions,



11

},



12

});
```

The following optional provider options are available for Mistral models:

* **safePrompt** *boolean*

  Whether to inject a safety prompt before all conversations.

  Defaults to `false`.
* **documentImageLimit** *number*

  Maximum number of images to process in a document.
* **documentPageLimit** *number*

  Maximum number of pages to process in a document.
* **strictJsonSchema** *boolean*

  Whether to use strict JSON schema validation for structured outputs. Only applies when a schema is provided and only sets the [`strict` flag](https://docs.mistral.ai/api/#tag/chat/operation/chat_completion_v1_chat_completions_post) in addition to using [Custom Structured Outputs](https://docs.mistral.ai/capabilities/structured-output/custom_structured_output/), which is used by default if a schema is provided.

  Defaults to `false`.
* **structuredOutputs** *boolean*

  Whether to use [structured outputs](#structured-outputs). When enabled, tool calls and object generation will be strict and follow the provided schema.

  Defaults to `true`.
* **parallelToolCalls** *boolean*

  Whether to enable parallel function calling during tool use. When set to false, the model will use at most one tool per response.

  Defaults to `true`.

### [Document OCR](#document-ocr)

Mistral chat models support document OCR for PDF files.
You can optionally set image and page limits using the provider options.

```
1

const result = await generateText({



2

model: mistral('mistral-small-latest'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{



8

type: 'text',



9

text: 'What is an embedding model according to this document?',



10

},



11

{



12

type: 'file',



13

data: new URL(



14

'https://github.com/vercel/ai/blob/main/examples/ai-functions/data/ai.pdf?raw=true',



15

),



16

mediaType: 'application/pdf',



17

},



18

],



19

},



20

],



21

// optional settings:



22

providerOptions: {



23

mistral: {



24

documentImageLimit: 8,



25

documentPageLimit: 64,



26

},



27

},



28

});
```

### [Reasoning Models](#reasoning-models)

Mistral offers reasoning models that provide step-by-step thinking capabilities:

* **magistral-small-2506**: Smaller reasoning model for efficient step-by-step thinking
* **magistral-medium-2506**: More powerful reasoning model balancing performance and cost

These models return content that includes `<think>...</think>` tags containing the reasoning process. To properly extract and separate the reasoning from the final answer, use the [extract reasoning middleware](/docs/reference/ai-sdk-core/extract-reasoning-middleware):

```
1

import { mistral } from '@ai-sdk/mistral';



2

import {



3

extractReasoningMiddleware,



4

generateText,



5

wrapLanguageModel,



6

} from 'ai';



7



8

const result = await generateText({



9

model: wrapLanguageModel({



10

model: mistral('magistral-small-2506'),



11

middleware: extractReasoningMiddleware({



12

tagName: 'think',



13

}),



14

}),



15

prompt: 'What is 15 * 24?',



16

});



17



18

console.log('REASONING:', result.reasoningText);



19

// Output: "Let me calculate this step by step..."



20



21

console.log('ANSWER:', result.text);



22

// Output: "360"
```

The middleware automatically parses the `<think>` tags and provides separate `reasoningText` and `text` properties in the result.

### [Example](#example)

You can use Mistral language models to generate text with the `generateText` function:

```
1

import { mistral } from '@ai-sdk/mistral';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: mistral('mistral-large-latest'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Mistral language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

#### [Structured Outputs](#structured-outputs)

Mistral chat models support structured outputs using JSON Schema. You can use `generateObject` or `streamObject`
with Zod, Valibot, or raw JSON Schema. The SDK sends your schema via Mistral's `response_format: { type: 'json_schema' }`.

```
1

import { mistral } from '@ai-sdk/mistral';



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4



5

const result = await generateObject({



6

model: mistral('mistral-large-latest'),



7

schema: z.object({



8

recipe: z.object({



9

name: z.string(),



10

ingredients: z.array(z.string()),



11

instructions: z.array(z.string()),



12

}),



13

}),



14

prompt: 'Generate a simple pasta recipe.',



15

});



16



17

console.log(JSON.stringify(result.object, null, 2));
```

You can enable strict JSON Schema validation using a provider option:

```
1

import { mistral } from '@ai-sdk/mistral';



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4



5

const result = await generateObject({



6

model: mistral('mistral-large-latest'),



7

providerOptions: {



8

mistral: {



9

strictJsonSchema: true, // reject outputs that don't strictly match the schema



10

},



11

},



12

schema: z.object({



13

title: z.string(),



14

items: z.array(z.object({ id: z.string(), qty: z.number().int().min(1) })),



15

}),



16

prompt: 'Generate a small shopping list.',



17

});
```

When using structured outputs, the SDK no longer injects an extra "answer with
JSON" instruction. It relies on Mistral's native `json_schema`/`json_object`
response formats instead. You can customize the schema name/description via
the standard structured-output APIs.

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `pixtral-large-latest` |  |  |  |  |
| `mistral-large-latest` |  |  |  |  |
| `mistral-medium-latest` |  |  |  |  |
| `mistral-medium-2505` |  |  |  |  |
| `mistral-small-latest` |  |  |  |  |
| `magistral-small-2506` |  |  |  |  |
| `magistral-medium-2506` |  |  |  |  |
| `ministral-3b-latest` |  |  |  |  |
| `ministral-8b-latest` |  |  |  |  |
| `pixtral-12b-2409` |  |  |  |  |
| `open-mistral-7b` |  |  |  |  |
| `open-mixtral-8x7b` |  |  |  |  |
| `open-mixtral-8x22b` |  |  |  |  |

The table above lists popular models. Please see the [Mistral
docs](https://docs.mistral.ai/getting-started/models/models_overview/) for a
full list of available models. The table above lists popular models. You can
also pass any available provider model ID as a string if needed.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the [Mistral embeddings API](https://docs.mistral.ai/api/#operation/createEmbedding)
using the `.embedding()` factory method.

```
1

const model = mistral.embedding('mistral-embed');
```

You can use Mistral embedding models to generate embeddings with the `embed` function:

```
1

import { mistral } from '@ai-sdk/mistral';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: mistral.embedding('mistral-embed'),



6

value: 'sunny day at the beach',



7

});
```

### [Model Capabilities](#model-capabilities-1)

| Model | Default Dimensions |
| --- | --- |
| `mistral-embed` | 1024 |