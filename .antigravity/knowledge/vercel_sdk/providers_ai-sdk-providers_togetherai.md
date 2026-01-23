# https://sdk.vercel.ai/providers/ai-sdk-providers/togetherai

Copy markdown

[Together.ai Provider](#togetherai-provider)
============================================

The [Together.ai](https://together.ai) provider contains support for 200+ open-source models through the [Together.ai API](https://docs.together.ai/reference).

[Setup](#setup)
---------------

The Together.ai provider is available via the `@ai-sdk/togetherai` module. You can
install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/togetherai
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `togetherai` from `@ai-sdk/togetherai`:

```
1

import { togetherai } from '@ai-sdk/togetherai';
```

If you need a customized setup, you can import `createTogetherAI` from `@ai-sdk/togetherai`
and create a provider instance with your settings:

```
1

import { createTogetherAI } from '@ai-sdk/togetherai';



2



3

const togetherai = createTogetherAI({



4

apiKey: process.env.TOGETHER_AI_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the Together.ai provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.together.xyz/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `TOGETHER_AI_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create [Together.ai models](https://docs.together.ai/docs/serverless-models) using a provider instance. The first argument is the model id, e.g. `google/gemma-2-9b-it`.

```
1

const model = togetherai('google/gemma-2-9b-it');
```

### [Reasoning Models](#reasoning-models)

Together.ai exposes the thinking of `deepseek-ai/DeepSeek-R1` in the generated text using the `<think>` tag.
You can use the `extractReasoningMiddleware` to extract this reasoning and expose it as a `reasoning` property on the result:

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';



3



4

const enhancedModel = wrapLanguageModel({



5

model: togetherai('deepseek-ai/DeepSeek-R1'),



6

middleware: extractReasoningMiddleware({ tagName: 'think' }),



7

});
```

You can then use that enhanced model in functions like `generateText` and `streamText`.

### [Example](#example)

You can use Together.ai language models to generate text with the `generateText` function:

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: togetherai('meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Together.ai language models can also be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

The Together.ai provider also supports [completion models](https://docs.together.ai/docs/serverless-models#language-models) via (following the above example code) `togetherai.completion()` and [embedding models](https://docs.together.ai/docs/serverless-models#embedding-models) via `togetherai.embedding()`.

[Model Capabilities](#model-capabilities)
-----------------------------------------

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `meta-llama/Meta-Llama-3.3-70B-Instruct-Turbo` |  |  |  |  |
| `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo` |  |  |  |  |
| `mistralai/Mixtral-8x22B-Instruct-v0.1` |  |  |  |  |
| `mistralai/Mistral-7B-Instruct-v0.3` |  |  |  |  |
| `deepseek-ai/DeepSeek-V3` |  |  |  |  |
| `google/gemma-2b-it` |  |  |  |  |
| `Qwen/Qwen2.5-72B-Instruct-Turbo` |  |  |  |  |
| `databricks/dbrx-instruct` |  |  |  |  |

The table above lists popular models. Please see the [Together.ai
docs](https://docs.together.ai/docs/serverless-models) for a full list of
available models. You can also pass any available provider model ID as a
string if needed.

[Image Models](#image-models)
-----------------------------

You can create Together.ai image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { generateImage } from 'ai';



3



4

const { images } = await generateImage({



5

model: togetherai.image('black-forest-labs/FLUX.1-dev'),



6

prompt: 'A delighted resplendent quetzal mid flight amidst raindrops',



7

});
```

You can pass optional provider-specific request parameters using the `providerOptions` argument.

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { generateImage } from 'ai';



3



4

const { images } = await generateImage({



5

model: togetherai.image('black-forest-labs/FLUX.1-dev'),



6

prompt: 'A delighted resplendent quetzal mid flight amidst raindrops',



7

size: '512x512',



8

// Optional additional provider-specific request parameters



9

providerOptions: {



10

togetherai: {



11

steps: 40,



12

},



13

},



14

});
```

For a complete list of available provider-specific options, see the [Together.ai Image Generation API Reference](https://docs.together.ai/reference/post_images-generations).

### [Image Editing](#image-editing)

Together AI supports image editing through FLUX Kontext models. Pass input images via `prompt.images` to transform or edit existing images.

Together AI does not support mask-based inpainting. Instead, use descriptive
prompts to specify what you want to change in the image.

#### [Basic Image Editing](#basic-image-editing)

Transform an existing image using text prompts:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: togetherai.image('black-forest-labs/FLUX.1-kontext-pro'),



5

prompt: {



6

text: 'Turn the cat into a golden retriever dog',



7

images: [imageBuffer],



8

},



9

size: '1024x1024',



10

providerOptions: {



11

togetherai: {



12

steps: 28,



13

},



14

},



15

});
```

#### [Editing with URL Reference](#editing-with-url-reference)

You can also pass image URLs directly:

```
1

const { images } = await generateImage({



2

model: togetherai.image('black-forest-labs/FLUX.1-kontext-pro'),



3

prompt: {



4

text: 'Make the background a lush rainforest',



5

images: ['https://example.com/photo.png'],



6

},



7

size: '1024x1024',



8

providerOptions: {



9

togetherai: {



10

steps: 28,



11

},



12

},



13

});
```

Input images can be provided as `Buffer`, `ArrayBuffer`, `Uint8Array`,
base64-encoded strings, or URLs. Together AI only supports a single input
image per request.

#### [Supported Image Editing Models](#supported-image-editing-models)

| Model | Description |
| --- | --- |
| `black-forest-labs/FLUX.1-kontext-pro` | Production quality, balanced speed |
| `black-forest-labs/FLUX.1-kontext-max` | Maximum image fidelity |
| `black-forest-labs/FLUX.1-kontext-dev` | Development and experimentation |

### [Model Capabilities](#model-capabilities-1)

Together.ai image models support various image dimensions that vary by model. Common sizes include 512x512, 768x768, and 1024x1024, with some models supporting up to 1792x1792. The default size is 1024x1024.

| Available Models |
| --- |
| `stabilityai/stable-diffusion-xl-base-1.0` |
| `black-forest-labs/FLUX.1-dev` |
| `black-forest-labs/FLUX.1-dev-lora` |
| `black-forest-labs/FLUX.1-schnell` |
| `black-forest-labs/FLUX.1-canny` |
| `black-forest-labs/FLUX.1-depth` |
| `black-forest-labs/FLUX.1-redux` |
| `black-forest-labs/FLUX.1.1-pro` |
| `black-forest-labs/FLUX.1-pro` |
| `black-forest-labs/FLUX.1-schnell-Free` |

Please see the [Together.ai models
page](https://docs.together.ai/docs/serverless-models#image-models) for a full
list of available image models and their capabilities.

[Embedding Models](#embedding-models)
-------------------------------------

You can create Together.ai embedding models using the `.embedding()` factory method.
For more on embedding models with the AI SDK see [embed()](/docs/reference/ai-sdk-core/embed).

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: togetherai.embedding('togethercomputer/m2-bert-80M-2k-retrieval'),



6

value: 'sunny day at the beach',



7

});
```

### [Model Capabilities](#model-capabilities-2)

| Model | Dimensions | Max Tokens |
| --- | --- | --- |
| `togethercomputer/m2-bert-80M-2k-retrieval` | 768 | 2048 |
| `togethercomputer/m2-bert-80M-8k-retrieval` | 768 | 8192 |
| `togethercomputer/m2-bert-80M-32k-retrieval` | 768 | 32768 |
| `WhereIsAI/UAE-Large-V1` | 1024 | 512 |
| `BAAI/bge-large-en-v1.5` | 1024 | 512 |
| `BAAI/bge-base-en-v1.5` | 768 | 512 |
| `sentence-transformers/msmarco-bert-base-dot-v5` | 768 | 512 |
| `bert-base-uncased` | 768 | 512 |

For a complete list of available embedding models, see the [Together.ai models
page](https://docs.together.ai/docs/serverless-models#embedding-models).

[Reranking Models](#reranking-models)
-------------------------------------

You can create Together.ai reranking models using the `.reranking()` factory method.
For more on reranking with the AI SDK see [rerank()](/docs/reference/ai-sdk-core/rerank).

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { rerank } from 'ai';



3



4

const documents = [



5

'sunny day at the beach',



6

'rainy afternoon in the city',



7

'snowy night in the mountains',



8

];



9



10

const { ranking } = await rerank({



11

model: togetherai.reranking('Salesforce/Llama-Rank-v1'),



12

documents,



13

query: 'talk about rain',



14

topN: 2,



15

});



16



17

console.log(ranking);



18

// [



19

//   { originalIndex: 1, score: 0.9, document: 'rainy afternoon in the city' },



20

//   { originalIndex: 0, score: 0.3, document: 'sunny day at the beach' }



21

// ]
```

Together.ai reranking models support additional provider options for object documents. You can specify which fields to use for ranking:

```
1

import { togetherai } from '@ai-sdk/togetherai';



2

import { rerank } from 'ai';



3



4

const documents = [



5

{



6

from: 'Paul Doe',



7

subject: 'Follow-up',



8

text: 'We are happy to give you a discount of 20%.',



9

},



10

{



11

from: 'John McGill',



12

subject: 'Missing Info',



13

text: 'Here is the pricing from Oracle: $5000/month',



14

},



15

];



16



17

const { ranking } = await rerank({



18

model: togetherai.reranking('Salesforce/Llama-Rank-v1'),



19

documents,



20

query: 'Which pricing did we get from Oracle?',



21

providerOptions: {



22

togetherai: {



23

rankFields: ['from', 'subject', 'text'], // Specify which fields to rank by



24

},



25

},



26

});
```

The following provider options are available:

* **rankFields** *string[]*

  Array of field names to use for ranking when documents are JSON objects. If not specified, all fields are used.

### [Model Capabilities](#model-capabilities-3)

| Model |
| --- |
| `Salesforce/Llama-Rank-v1` |
| `mixedbread-ai/Mxbai-Rerank-Large-V2` |