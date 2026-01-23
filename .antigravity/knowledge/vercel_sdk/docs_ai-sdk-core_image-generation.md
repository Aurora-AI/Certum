# https://sdk.vercel.ai/docs/ai-sdk-core/image-generation

Copy markdown

[Image Generation](#image-generation)
=====================================

The AI SDK provides the [`generateImage`](/docs/reference/ai-sdk-core/generate-image)
function to generate images based on a given prompt using an image model.

```
1

import { generateImage } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const { image } = await generateImage({



5

model: openai.image('dall-e-3'),



6

prompt: 'Santa Claus driving a Cadillac',



7

});
```

You can access the image data using the `base64` or `uint8Array` properties:

```
1

const base64 = image.base64; // base64 image data



2

const uint8Array = image.uint8Array; // Uint8Array image data
```

[Settings](#settings)
---------------------

### [Size and Aspect Ratio](#size-and-aspect-ratio)

Depending on the model, you can either specify the size or the aspect ratio.

##### [Size](#size)

The size is specified as a string in the format `{width}x{height}`.
Models only support a few sizes, and the supported sizes are different for each model and provider.

```
1

import { generateImage } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const { image } = await generateImage({



5

model: openai.image('dall-e-3'),



6

prompt: 'Santa Claus driving a Cadillac',



7

size: '1024x1024',



8

});
```

##### [Aspect Ratio](#aspect-ratio)

The aspect ratio is specified as a string in the format `{width}:{height}`.
Models only support a few aspect ratios, and the supported aspect ratios are different for each model and provider.

```
1

import { generateImage } from 'ai';



2

import { vertex } from '@ai-sdk/google-vertex';



3



4

const { image } = await generateImage({



5

model: vertex.image('imagen-4.0-generate-001'),



6

prompt: 'Santa Claus driving a Cadillac',



7

aspectRatio: '16:9',



8

});
```

### [Generating Multiple Images](#generating-multiple-images)

`generateImage` also supports generating multiple images at once:

```
1

import { generateImage } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const { images } = await generateImage({



5

model: openai.image('dall-e-2'),



6

prompt: 'Santa Claus driving a Cadillac',



7

n: 4, // number of images to generate



8

});
```

`generateImage` will automatically call the model as often as needed (in
parallel) to generate the requested number of images.

Each image model has an internal limit on how many images it can generate in a single API call. The AI SDK manages this automatically by batching requests appropriately when you request multiple images using the `n` parameter. By default, the SDK uses provider-documented limits (for example, DALL-E 3 can only generate 1 image per call, while DALL-E 2 supports up to 10).

If needed, you can override this behavior using the `maxImagesPerCall` setting when generating your image. This is particularly useful when working with new or custom models where the default batch size might not be optimal:

```
1

const { images } = await generateImage({



2

model: openai.image('dall-e-2'),



3

prompt: 'Santa Claus driving a Cadillac',



4

maxImagesPerCall: 5, // Override the default batch size



5

n: 10, // Will make 2 calls of 5 images each



6

});
```

### [Providing a Seed](#providing-a-seed)

You can provide a seed to the `generateImage` function to control the output of the image generation process.
If supported by the model, the same seed will always produce the same image.

```
1

import { generateImage } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const { image } = await generateImage({



5

model: openai.image('dall-e-3'),



6

prompt: 'Santa Claus driving a Cadillac',



7

seed: 1234567890,



8

});
```

### [Provider-specific Settings](#provider-specific-settings)

Image models often have provider- or even model-specific settings.
You can pass such settings to the `generateImage` function
using the `providerOptions` parameter. The options for the provider
(`openai` in the example below) become request body properties.

```
1

import { generateImage } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const { image } = await generateImage({



5

model: openai.image('dall-e-3'),



6

prompt: 'Santa Claus driving a Cadillac',



7

size: '1024x1024',



8

providerOptions: {



9

openai: { style: 'vivid', quality: 'hd' },



10

},



11

});
```

### [Abort Signals and Timeouts](#abort-signals-and-timeouts)

`generateImage` accepts an optional `abortSignal` parameter of
type [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
that you can use to abort the image generation process or set a timeout.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: openai.image('dall-e-3'),



6

prompt: 'Santa Claus driving a Cadillac',



7

abortSignal: AbortSignal.timeout(1000), // Abort after 1 second



8

});
```

### [Custom Headers](#custom-headers)

`generateImage` accepts an optional `headers` parameter of type `Record<string, string>`
that you can use to add custom headers to the image generation request.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: openai.image('dall-e-3'),



6

prompt: 'Santa Claus driving a Cadillac',



7

headers: { 'X-Custom-Header': 'custom-value' },



8

});
```

### [Warnings](#warnings)

If the model returns warnings, e.g. for unsupported parameters, they will be available in the `warnings` property of the response.

```
1

const { image, warnings } = await generateImage({



2

model: openai.image('dall-e-3'),



3

prompt: 'Santa Claus driving a Cadillac',



4

});
```

### [Additional provider-specific meta data](#additional-provider-specific-meta-data)

Some providers expose additional meta data for the result overall or per image.

```
1

const prompt = 'Santa Claus driving a Cadillac';



2



3

const { image, providerMetadata } = await generateImage({



4

model: openai.image('dall-e-3'),



5

prompt,



6

});



7



8

const revisedPrompt = providerMetadata.openai.images[0]?.revisedPrompt;



9



10

console.log({



11

prompt,



12

revisedPrompt,



13

});
```

The outer key of the returned `providerMetadata` is the provider name. The inner values are the metadata. An `images` key is always present in the metadata and is an array with the same length as the top level `images` key.

### [Error Handling](#error-handling)

When `generateImage` cannot generate a valid image, it throws a [`AI_NoImageGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-image-generated-error).

This error occurs when the AI provider fails to generate an image. It can arise due to the following reasons:

* The model failed to generate a response
* The model generated a response that could not be parsed

The error preserves the following information to help you log the issue:

* `responses`: Metadata about the image model responses, including timestamp, model, and headers.
* `cause`: The cause of the error. You can use this for more detailed error handling

```
1

import { generateImage, NoImageGeneratedError } from 'ai';



2



3

try {



4

await generateImage({ model, prompt });



5

} catch (error) {



6

if (NoImageGeneratedError.isInstance(error)) {



7

console.log('NoImageGeneratedError');



8

console.log('Cause:', error.cause);



9

console.log('Responses:', error.responses);



10

}



11

}
```

[Image Middleware](#image-middleware)
-------------------------------------

You can enhance image models, e.g. to set default values or implement logging, using
`wrapImageModel` and `ImageModelV3Middleware`.

Here is an example that sets a default size when none is provided:

```
1

import { generateImage, wrapImageModel } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const model = wrapImageModel({



5

model: openai.image('gpt-image-1'),



6

middleware: {



7

specificationVersion: 'v3',



8

transformParams: async ({ params }) => ({



9

...params,



10

size: params.size ?? '1024x1024',



11

}),



12

},



13

});



14



15

const { image } = await generateImage({



16

model,



17

prompt: 'Santa Claus driving a Cadillac',



18

});
```

[Generating Images with Language Models](#generating-images-with-language-models)
---------------------------------------------------------------------------------

Some language models such as Google `gemini-2.5-flash-image-preview` support multi-modal outputs including images.
With such models, you can access the generated images using the `files` property of the response.

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: google('gemini-2.5-flash-image-preview'),



6

prompt: 'Generate an image of a comic cat',



7

});



8



9

for (const file of result.files) {



10

if (file.mediaType.startsWith('image/')) {



11

// The file object provides multiple data formats:



12

// Access images as base64 string, Uint8Array binary data, or check type



13

// - file.base64: string (data URL format)



14

// - file.uint8Array: Uint8Array (binary data)



15

// - file.mediaType: string (e.g. "image/png")



16

}



17

}
```

[Image Models](#image-models)
-----------------------------

| Provider | Model | Support sizes (`width x height`) or aspect ratios (`width : height`) |
| --- | --- | --- |
| [xAI Grok](/providers/ai-sdk-providers/xai#image-models) | `grok-2-image` | 1024x768 (default) |
| [OpenAI](/providers/ai-sdk-providers/openai#image-models) | `gpt-image-1` | 1024x1024, 1536x1024, 1024x1536 |
| [OpenAI](/providers/ai-sdk-providers/openai#image-models) | `dall-e-3` | 1024x1024, 1792x1024, 1024x1792 |
| [OpenAI](/providers/ai-sdk-providers/openai#image-models) | `dall-e-2` | 256x256, 512x512, 1024x1024 |
| [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock#image-models) | `amazon.nova-canvas-v1:0` | 320-4096 (multiples of 16), 1:4 to 4:1, max 4.2M pixels |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/flux/dev` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/flux-lora` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/fast-sdxl` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/flux-pro/v1.1-ultra` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/ideogram/v2` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/recraft-v3` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/stable-diffusion-3.5-large` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Fal](/providers/ai-sdk-providers/fal#image-models) | `fal-ai/hyper-sdxl` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `stabilityai/sd3.5` | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `black-forest-labs/FLUX-1.1-pro` | 256-1440 (multiples of 32) |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `black-forest-labs/FLUX-1-schnell` | 256-1440 (multiples of 32) |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `black-forest-labs/FLUX-1-dev` | 256-1440 (multiples of 32) |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `black-forest-labs/FLUX-pro` | 256-1440 (multiples of 32) |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `stabilityai/sd3.5-medium` | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra#image-models) | `stabilityai/sdxl-turbo` | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| [Replicate](/providers/ai-sdk-providers/replicate) | `black-forest-labs/flux-schnell` | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| [Replicate](/providers/ai-sdk-providers/replicate) | `recraft-ai/recraft-v3` | 1024x1024, 1365x1024, 1024x1365, 1536x1024, 1024x1536, 1820x1024, 1024x1820, 1024x2048, 2048x1024, 1434x1024, 1024x1434, 1024x1280, 1280x1024, 1024x1707, 1707x1024 |
| [Google](/providers/ai-sdk-providers/google#image-models) | `imagen-4.0-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Google](/providers/ai-sdk-providers/google#image-models) | `imagen-4.0-fast-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Google](/providers/ai-sdk-providers/google#image-models) | `imagen-4.0-ultra-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#image-models) | `imagen-4.0-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#image-models) | `imagen-4.0-fast-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#image-models) | `imagen-4.0-ultra-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#image-models) | `imagen-3.0-fast-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/flux-1-dev-fp8` | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/flux-1-schnell-fp8` | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/playground-v2-5-1024px-aesthetic` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/japanese-stable-diffusion-xl` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/playground-v2-1024px-aesthetic` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/SSD-1B` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| [Fireworks](/providers/ai-sdk-providers/fireworks#image-models) | `accounts/fireworks/models/stable-diffusion-xl-1024-v1-0` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| [Luma](/providers/ai-sdk-providers/luma#image-models) | `photon-1` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Luma](/providers/ai-sdk-providers/luma#image-models) | `photon-flash-1` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `stabilityai/stable-diffusion-xl-base-1.0` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-dev` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-dev-lora` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-schnell` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-canny` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-depth` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-redux` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1.1-pro` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-pro` | 512x512, 768x768, 1024x1024 |
| [Together.ai](/providers/ai-sdk-providers/togetherai#image-models) | `black-forest-labs/FLUX.1-schnell-Free` | 512x512, 768x768, 1024x1024 |
| [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs#image-models) | `flux-kontext-pro` | From 3:7 (portrait) to 7:3 (landscape) |
| [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs#image-models) | `flux-kontext-max` | From 3:7 (portrait) to 7:3 (landscape) |
| [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs#image-models) | `flux-pro-1.1-ultra` | From 3:7 (portrait) to 7:3 (landscape) |
| [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs#image-models) | `flux-pro-1.1` | From 3:7 (portrait) to 7:3 (landscape) |
| [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs#image-models) | `flux-pro-1.0-fill` | From 3:7 (portrait) to 7:3 (landscape) |

Above are a small subset of the image models supported by the AI SDK providers. For more, see the respective provider documentation.