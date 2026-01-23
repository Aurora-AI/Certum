# https://sdk.vercel.ai/providers/ai-sdk-providers/deepinfra

Copy markdown

[DeepInfra Provider](#deepinfra-provider)
=========================================

The [DeepInfra](https://deepinfra.com) provider contains support for state-of-the-art models through the DeepInfra API, including Llama 3, Mixtral, Qwen, and many other popular open-source models.

[Setup](#setup)
---------------

The DeepInfra provider is available via the `@ai-sdk/deepinfra` module. You can install it with:

pnpmnpmyarnbun

```
pnpm add @ai-sdk/deepinfra
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `deepinfra` from `@ai-sdk/deepinfra`:

```
1

import { deepinfra } from '@ai-sdk/deepinfra';
```

If you need a customized setup, you can import `createDeepInfra` from `@ai-sdk/deepinfra` and create a provider instance with your settings:

```
1

import { createDeepInfra } from '@ai-sdk/deepinfra';



2



3

const deepinfra = createDeepInfra({



4

apiKey: process.env.DEEPINFRA_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the DeepInfra provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.deepinfra.com/v1`.

  Note: Language models and embeddings use OpenAI-compatible endpoints at `{baseURL}/openai`,
  while image models use `{baseURL}/inference`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `DEEPINFRA_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create language models using a provider instance. The first argument is the model ID, for example:

```
1

import { deepinfra } from '@ai-sdk/deepinfra';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

DeepInfra language models can also be used in the `streamText` function (see [AI SDK Core](/docs/ai-sdk-core)).

[Model Capabilities](#model-capabilities)
-----------------------------------------

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8` |  |  |  |  |
| `meta-llama/Llama-4-Scout-17B-16E-Instruct` |  |  |  |  |
| `meta-llama/Llama-3.3-70B-Instruct-Turbo` |  |  |  |  |
| `meta-llama/Llama-3.3-70B-Instruct` |  |  |  |  |
| `meta-llama/Meta-Llama-3.1-405B-Instruct` |  |  |  |  |
| `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo` |  |  |  |  |
| `meta-llama/Meta-Llama-3.1-70B-Instruct` |  |  |  |  |
| `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo` |  |  |  |  |
| `meta-llama/Meta-Llama-3.1-8B-Instruct` |  |  |  |  |
| `meta-llama/Llama-3.2-11B-Vision-Instruct` |  |  |  |  |
| `meta-llama/Llama-3.2-90B-Vision-Instruct` |  |  |  |  |
| `mistralai/Mixtral-8x7B-Instruct-v0.1` |  |  |  |  |
| `deepseek-ai/DeepSeek-V3` |  |  |  |  |
| `deepseek-ai/DeepSeek-R1` |  |  |  |  |
| `deepseek-ai/DeepSeek-R1-Distill-Llama-70B` |  |  |  |  |
| `deepseek-ai/DeepSeek-R1-Turbo` |  |  |  |  |
| `nvidia/Llama-3.1-Nemotron-70B-Instruct` |  |  |  |  |
| `Qwen/Qwen2-7B-Instruct` |  |  |  |  |
| `Qwen/Qwen2.5-72B-Instruct` |  |  |  |  |
| `Qwen/Qwen2.5-Coder-32B-Instruct` |  |  |  |  |
| `Qwen/QwQ-32B-Preview` |  |  |  |  |
| `google/codegemma-7b-it` |  |  |  |  |
| `google/gemma-2-9b-it` |  |  |  |  |
| `microsoft/WizardLM-2-8x22B` |  |  |  |  |

The table above lists popular models. Please see the [DeepInfra
docs](https://deepinfra.com) for a full list of available models. You can also
pass any available provider model ID as a string if needed.

[Image Models](#image-models)
-----------------------------

You can create DeepInfra image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```
1

import { deepinfra } from '@ai-sdk/deepinfra';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: deepinfra.image('stabilityai/sd3.5'),



6

prompt: 'A futuristic cityscape at sunset',



7

aspectRatio: '16:9',



8

});
```

Model support for `size` and `aspectRatio` parameters varies by model. Please
check the individual model documentation on [DeepInfra's models
page](https://deepinfra.com/models/text-to-image) for supported options and
additional parameters.

### [Model-specific options](#model-specific-options)

You can pass model-specific parameters using the `providerOptions.deepinfra` field:

```
1

import { deepinfra } from '@ai-sdk/deepinfra';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: deepinfra.image('stabilityai/sd3.5'),



6

prompt: 'A futuristic cityscape at sunset',



7

aspectRatio: '16:9',



8

providerOptions: {



9

deepinfra: {



10

num_inference_steps: 30, // Control the number of denoising steps (1-50)



11

},



12

},



13

});
```

### [Image Editing](#image-editing)

DeepInfra supports image editing through models like `Qwen/Qwen-Image-Edit`. Pass input images via `prompt.images` to transform or edit existing images.

#### [Basic Image Editing](#basic-image-editing)

Transform an existing image using text prompts:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: deepinfra.image('Qwen/Qwen-Image-Edit'),



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

});
```

#### [Inpainting with Mask](#inpainting-with-mask)

Edit specific parts of an image using a mask. Transparent areas in the mask indicate where the image should be edited:

```
1

const image = readFileSync('./input-image.png');



2

const mask = readFileSync('./mask.png');



3



4

const { images } = await generateImage({



5

model: deepinfra.image('Qwen/Qwen-Image-Edit'),



6

prompt: {



7

text: 'A sunlit indoor lounge area with a pool containing a flamingo',



8

images: [image],



9

mask: mask,



10

},



11

});
```

#### [Multi-Image Combining](#multi-image-combining)

Combine multiple reference images into a single output:

```
1

const cat = readFileSync('./cat.png');



2

const dog = readFileSync('./dog.png');



3



4

const { images } = await generateImage({



5

model: deepinfra.image('Qwen/Qwen-Image-Edit'),



6

prompt: {



7

text: 'Create a scene with both animals together, playing as friends',



8

images: [cat, dog],



9

},



10

});
```

Input images can be provided as `Buffer`, `ArrayBuffer`, `Uint8Array`, or
base64-encoded strings. DeepInfra uses an OpenAI-compatible image editing API
at `https://api.deepinfra.com/v1/openai/images/edits`.

### [Model Capabilities](#model-capabilities-1)

For models supporting aspect ratios, the following ratios are typically supported:
`1:1 (default), 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21`

For models supporting size parameters, dimensions must typically be:

* Multiples of 32
* Width and height between 256 and 1440 pixels
* Default size is 1024x1024

| Model | Dimensions Specification | Notes |
| --- | --- | --- |
| `stabilityai/sd3.5` | Aspect Ratio | Premium quality base model, 8B parameters |
| `black-forest-labs/FLUX-1.1-pro` | Size | Latest state-of-art model with superior prompt following |
| `black-forest-labs/FLUX-1-schnell` | Size | Fast generation in 1-4 steps |
| `black-forest-labs/FLUX-1-dev` | Size | Optimized for anatomical accuracy |
| `black-forest-labs/FLUX-pro` | Size | Flagship Flux model |
| `stabilityai/sd3.5-medium` | Aspect Ratio | Balanced 2.5B parameter model |
| `stabilityai/sdxl-turbo` | Aspect Ratio | Optimized for fast generation |

For more details and pricing information, see the [DeepInfra text-to-image models page](https://deepinfra.com/models/text-to-image).

[Embedding Models](#embedding-models)
-------------------------------------

You can create DeepInfra embedding models using the `.embedding()` factory method.
For more on embedding models with the AI SDK see [embed()](/docs/reference/ai-sdk-core/embed).

```
1

import { deepinfra } from '@ai-sdk/deepinfra';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: deepinfra.embedding('BAAI/bge-large-en-v1.5'),



6

value: 'sunny day at the beach',



7

});
```

### [Model Capabilities](#model-capabilities-2)

| Model | Dimensions | Max Tokens |
| --- | --- | --- |
| `BAAI/bge-base-en-v1.5` | 768 | 512 |
| `BAAI/bge-large-en-v1.5` | 1024 | 512 |
| `BAAI/bge-m3` | 1024 | 8192 |
| `intfloat/e5-base-v2` | 768 | 512 |
| `intfloat/e5-large-v2` | 1024 | 512 |
| `intfloat/multilingual-e5-large` | 1024 | 512 |
| `sentence-transformers/all-MiniLM-L12-v2` | 384 | 256 |
| `sentence-transformers/all-MiniLM-L6-v2` | 384 | 256 |
| `sentence-transformers/all-mpnet-base-v2` | 768 | 384 |
| `sentence-transformers/clip-ViT-B-32` | 512 | 77 |
| `sentence-transformers/clip-ViT-B-32-multilingual-v1` | 512 | 77 |
| `sentence-transformers/multi-qa-mpnet-base-dot-v1` | 768 | 512 |
| `sentence-transformers/paraphrase-MiniLM-L6-v2` | 384 | 128 |
| `shibing624/text2vec-base-chinese` | 768 | 512 |
| `thenlper/gte-base` | 768 | 512 |
| `thenlper/gte-large` | 1024 | 512 |

For a complete list of available embedding models, see the [DeepInfra
embeddings page](https://deepinfra.com/models/embeddings).