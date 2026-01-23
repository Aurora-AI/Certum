# https://sdk.vercel.ai/providers/ai-sdk-providers/fireworks

Copy markdown

[Fireworks Provider](#fireworks-provider)
=========================================

[Fireworks](https://fireworks.ai/) is a platform for running and testing LLMs through their [API](https://readme.fireworks.ai/).

[Setup](#setup)
---------------

The Fireworks provider is available via the `@ai-sdk/fireworks` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/fireworks
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `fireworks` from `@ai-sdk/fireworks`:

```
1

import { fireworks } from '@ai-sdk/fireworks';
```

If you need a customized setup, you can import `createFireworks` from `@ai-sdk/fireworks`
and create a provider instance with your settings:

```
1

import { createFireworks } from '@ai-sdk/fireworks';



2



3

const fireworks = createFireworks({



4

apiKey: process.env.FIREWORKS_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the Fireworks provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.fireworks.ai/inference/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `FIREWORKS_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.

[Language Models](#language-models)
-----------------------------------

You can create [Fireworks models](https://fireworks.ai/models) using a provider instance.
The first argument is the model id, e.g. `accounts/fireworks/models/firefunction-v1`:

```
1

const model = fireworks('accounts/fireworks/models/firefunction-v1');
```

### [Reasoning Models](#reasoning-models)

Fireworks exposes the thinking of `deepseek-r1` in the generated text using the `<think>` tag.
You can use the `extractReasoningMiddleware` to extract this reasoning and expose it as a `reasoning` property on the result:

```
1

import { fireworks } from '@ai-sdk/fireworks';



2

import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';



3



4

const enhancedModel = wrapLanguageModel({



5

model: fireworks('accounts/fireworks/models/deepseek-r1'),



6

middleware: extractReasoningMiddleware({ tagName: 'think' }),



7

});
```

You can then use that enhanced model in functions like `generateText` and `streamText`.

### [Example](#example)

You can use Fireworks language models to generate text with the `generateText` function:

```
1

import { fireworks } from '@ai-sdk/fireworks';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: fireworks('accounts/fireworks/models/firefunction-v1'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Fireworks language models can also be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

### [Completion Models](#completion-models)

You can create models that call the Fireworks completions API using the `.completion()` factory method:

```
1

const model = fireworks.completion('accounts/fireworks/models/firefunction-v1');
```

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `accounts/fireworks/models/firefunction-v1` |  |  |  |  |
| `accounts/fireworks/models/deepseek-r1` |  |  |  |  |
| `accounts/fireworks/models/deepseek-v3` |  |  |  |  |
| `accounts/fireworks/models/llama-v3p1-405b-instruct` |  |  |  |  |
| `accounts/fireworks/models/llama-v3p1-8b-instruct` |  |  |  |  |
| `accounts/fireworks/models/llama-v3p2-3b-instruct` |  |  |  |  |
| `accounts/fireworks/models/llama-v3p3-70b-instruct` |  |  |  |  |
| `accounts/fireworks/models/mixtral-8x7b-instruct` |  |  |  |  |
| `accounts/fireworks/models/mixtral-8x7b-instruct-hf` |  |  |  |  |
| `accounts/fireworks/models/mixtral-8x22b-instruct` |  |  |  |  |
| `accounts/fireworks/models/qwen2p5-coder-32b-instruct` |  |  |  |  |
| `accounts/fireworks/models/qwen2p5-72b-instruct` |  |  |  |  |
| `accounts/fireworks/models/qwen-qwq-32b-preview` |  |  |  |  |
| `accounts/fireworks/models/qwen2-vl-72b-instruct` |  |  |  |  |
| `accounts/fireworks/models/llama-v3p2-11b-vision-instruct` |  |  |  |  |
| `accounts/fireworks/models/qwq-32b` |  |  |  |  |
| `accounts/fireworks/models/yi-large` |  |  |  |  |
| `accounts/fireworks/models/kimi-k2-instruct` |  |  |  |  |

The table above lists popular models. Please see the [Fireworks models
page](https://fireworks.ai/models) for a full list of available models.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the Fireworks embeddings API using the `.embedding()` factory method:

```
1

const model = fireworks.embedding('nomic-ai/nomic-embed-text-v1.5');
```

You can use Fireworks embedding models to generate embeddings with the `embed` function:

```
1

import { fireworks } from '@ai-sdk/fireworks';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: fireworks.embedding('nomic-ai/nomic-embed-text-v1.5'),



6

value: 'sunny day at the beach',



7

});
```

### [Model Capabilities](#model-capabilities-1)

| Model | Dimensions | Max Tokens |
| --- | --- | --- |
| `nomic-ai/nomic-embed-text-v1.5` | 768 | 8192 |

For more embedding models, see the [Fireworks models
page](https://fireworks.ai/models) for a full list of available models.

[Image Models](#image-models)
-----------------------------

You can create Fireworks image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```
1

import { fireworks } from '@ai-sdk/fireworks';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: fireworks.image('accounts/fireworks/models/flux-1-dev-fp8'),



6

prompt: 'A futuristic cityscape at sunset',



7

aspectRatio: '16:9',



8

});
```

Model support for `size` and `aspectRatio` parameters varies. See the [Model
Capabilities](#model-capabilities-1) section below for supported dimensions,
or check the model's documentation on [Fireworks models
page](https://fireworks.ai/models) for more details.

### [Image Editing](#image-editing)

Fireworks supports image editing through FLUX Kontext models (`flux-kontext-pro` and `flux-kontext-max`). Pass input images via `prompt.images` to transform or edit existing images.

Fireworks Kontext models do not support explicit masks. Editing is
prompt-driven — describe what you want to change in the text prompt.

#### [Basic Image Editing](#basic-image-editing)

Transform an existing image using text prompts:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: fireworks.image('accounts/fireworks/models/flux-kontext-pro'),



5

prompt: {



6

text: 'Turn the cat into a golden retriever dog',



7

images: [imageBuffer],



8

},



9

providerOptions: {



10

fireworks: {



11

output_format: 'jpeg',



12

},



13

},



14

});
```

#### [Style Transfer](#style-transfer)

Apply artistic styles to an image:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: fireworks.image('accounts/fireworks/models/flux-kontext-pro'),



5

prompt: {



6

text: 'Transform this into a watercolor painting style',



7

images: [imageBuffer],



8

},



9

aspectRatio: '1:1',



10

});
```

Input images can be provided as `Buffer`, `ArrayBuffer`, `Uint8Array`, or
base64-encoded strings. Fireworks only supports a single input image per
request.

### [Model Capabilities](#model-capabilities-2)

For all models supporting aspect ratios, the following aspect ratios are supported:

`1:1 (default), 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9`

For all models supporting size, the following sizes are supported:

`640 x 1536, 768 x 1344, 832 x 1216, 896 x 1152, 1024x1024 (default), 1152 x 896, 1216 x 832, 1344 x 768, 1536 x 640`

| Model | Dimensions Specification | Image Editing |
| --- | --- | --- |
| `accounts/fireworks/models/flux-kontext-pro` | Aspect Ratio |  |
| `accounts/fireworks/models/flux-kontext-max` | Aspect Ratio |  |
| `accounts/fireworks/models/flux-1-dev-fp8` | Aspect Ratio |  |
| `accounts/fireworks/models/flux-1-schnell-fp8` | Aspect Ratio |  |
| `accounts/fireworks/models/playground-v2-5-1024px-aesthetic` | Size |  |
| `accounts/fireworks/models/japanese-stable-diffusion-xl` | Size |  |
| `accounts/fireworks/models/playground-v2-1024px-aesthetic` | Size |  |
| `accounts/fireworks/models/SSD-1B` | Size |  |
| `accounts/fireworks/models/stable-diffusion-xl-1024-v1-0` | Size |  |

For more details, see the [Fireworks models page](https://fireworks.ai/models).

#### [Stability AI Models](#stability-ai-models)

Fireworks also presents several Stability AI models backed by Stability AI API
keys and endpoint. The AI SDK Fireworks provider does not currently include
support for these models:

| Model ID |
| --- |
| `accounts/stability/models/sd3-turbo` |
| `accounts/stability/models/sd3-medium` |
| `accounts/stability/models/sd3` |