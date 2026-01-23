# https://sdk.vercel.ai/providers/ai-sdk-providers/fal

Copy markdown

[Fal Provider](#fal-provider)
=============================

[Fal AI](https://fal.ai/) provides a generative media platform for developers with lightning-fast inference capabilities. Their platform offers optimized performance for running diffusion models, with speeds up to 4x faster than alternatives.

[Setup](#setup)
---------------

The Fal provider is available via the `@ai-sdk/fal` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/fal
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `fal` from `@ai-sdk/fal`:

```
1

import { fal } from '@ai-sdk/fal';
```

If you need a customized setup, you can import `createFal` and create a provider instance with your settings:

```
1

import { createFal } from '@ai-sdk/fal';



2



3

const fal = createFal({



4

apiKey: 'your-api-key', // optional, defaults to FAL_API_KEY environment variable, falling back to FAL_KEY



5

baseURL: 'custom-url', // optional



6

headers: {



7

/* custom headers */



8

}, // optional



9

});
```

You can use the following optional settings to customize the Fal provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://fal.run`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `FAL_API_KEY` environment variable, falling back to `FAL_KEY`.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Image Models](#image-models)
-----------------------------

You can create Fal image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

### [Basic Usage](#basic-usage)

```
1

import { fal } from '@ai-sdk/fal';



2

import { generateImage } from 'ai';



3

import fs from 'fs';



4



5

const { image, providerMetadata } = await generateImage({



6

model: fal.image('fal-ai/flux/dev'),



7

prompt: 'A serene mountain landscape at sunset',



8

});



9



10

const filename = `image-${Date.now()}.png`;



11

fs.writeFileSync(filename, image.uint8Array);



12

console.log(`Image saved to ${filename}`);
```

Fal image models may return additional information for the images and the request.

Here are some examples of properties that may be set for each image

```
1

providerMetadata.fal.images[0].nsfw; // boolean, image is not safe for work



2

providerMetadata.fal.images[0].width; // number, image width



3

providerMetadata.fal.images[0].height; // number, image height



4

providerMetadata.fal.images[0].content_type; // string, mime type of the image
```

### [Model Capabilities](#model-capabilities)

Fal offers many models optimized for different use cases. Here are a few popular examples. For a full list of models, see the [Fal AI Search Page](https://fal.ai/explore/search).

| Model | Description |
| --- | --- |
| `fal-ai/flux/dev` | FLUX.1 [dev] model for high-quality image generation |
| `fal-ai/flux-pro/kontext` | FLUX.1 Kontext [pro] handles both text and reference images as inputs, enabling targeted edits and complex transformations |
| `fal-ai/flux-pro/kontext/max` | FLUX.1 Kontext [max] with improved prompt adherence and typography generation |
| `fal-ai/flux-lora` | Super fast endpoint for FLUX.1 with LoRA support |
| `fal-ai/ideogram/character` | Generate consistent character appearances across multiple images. Maintain facial features, proportions, and distinctive traits |
| `fal-ai/qwen-image` | Qwen-Image foundation model with significant advances in complex text rendering and precise image editing |
| `fal-ai/omnigen-v2` | Unified image generation model for Image Editing, Personalized Image Generation, Virtual Try-On, Multi Person Generation and more |
| `fal-ai/bytedance/dreamina/v3.1/text-to-image` | Dreamina showcases superior picture effects with improvements in aesthetics, precise and diverse styles, and rich details |
| `fal-ai/recraft/v3/text-to-image` | SOTA in image generation with vector art and brand style capabilities |
| `fal-ai/wan/v2.2-a14b/text-to-image` | High-resolution, photorealistic images with fine-grained detail |

Fal models support the following aspect ratios:

* 1:1 (square HD)
* 16:9 (landscape)
* 9:16 (portrait)
* 4:3 (landscape)
* 3:4 (portrait)
* 16:10 (1280x800)
* 10:16 (800x1280)
* 21:9 (2560x1080)
* 9:21 (1080x2560)

Key features of Fal models include:

* Up to 4x faster inference speeds compared to alternatives
* Optimized by the Fal Inference Engine™
* Support for real-time infrastructure
* Cost-effective scaling with pay-per-use pricing
* LoRA training capabilities for model personalization

#### [Modify Image](#modify-image)

Transform existing images using text prompts.

```
1

await generateImage({



2

model: fal.image('fal-ai/flux-pro/kontext/max'),



3

prompt: {



4

text: 'Put a donut next to the flour.',



5

images: [



6

'https://v3.fal.media/files/rabbit/rmgBxhwGYb2d3pl3x9sKf_output.png',



7

],



8

},



9

});
```

Images can also be passed as base64-encoded string, a `Uint8Array`, an `ArrayBuffer`, or a `Buffer`.
A mask can be passed as well

```
1

await generateImage({



2

model: fal.image('fal-ai/flux-pro/kontext/max'),



3

prompt: {



4

text: 'Put a donut next to the flour.',



5

images: [imageBuffer],



6

mask: maskBuffer,



7

},



8

});
```

### [Provider Options](#provider-options)

Fal image models support flexible provider options through the `providerOptions.fal` object. You can pass any parameters supported by the specific Fal model's API. Common options include:

* **imageUrl** - Reference image URL for image-to-image generation
* **strength** - Controls how much the output differs from the input image
* **guidanceScale** - Controls adherence to the prompt (range: 1-20)
* **numInferenceSteps** - Number of denoising steps (range: 1-50)
* **enableSafetyChecker** - Enable/disable safety filtering
* **outputFormat** - Output format: 'jpeg' or 'png'
* **syncMode** - Wait for completion before returning response
* **acceleration** - Speed of generation: 'none', 'regular', or 'high'
* **safetyTolerance** - Content safety filtering level (1-6, where 1 is strictest)

**Deprecation Notice**: snake\_case parameter names (e.g., `image_url`,
`guidance_scale`) are deprecated and will be removed in `@ai-sdk/fal` v2.0.
Please use camelCase names (e.g., `imageUrl`, `guidanceScale`) instead.

Refer to the [Fal AI model documentation](https://fal.ai/models) for model-specific parameters.

### [Advanced Features](#advanced-features)

Fal's platform offers several advanced capabilities:

* **Private Model Inference**: Run your own diffusion transformer models with up to 50% faster inference
* **LoRA Training**: Train and personalize models in under 5 minutes
* **Real-time Infrastructure**: Enable new user experiences with fast inference times
* **Scalable Architecture**: Scale to thousands of GPUs when needed

For more details about Fal's capabilities and features, visit the [Fal AI documentation](https://fal.ai/docs).

[Transcription Models](#transcription-models)
---------------------------------------------

You can create models that call the [Fal transcription API](https://docs.fal.ai/guides/convert-speech-to-text)
using the `.transcription()` factory method.

The first argument is the model id without the `fal-ai/` prefix e.g. `wizper`.

```
1

const model = fal.transcription('wizper');
```

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the `batchSize` option will increase the number of audio chunks processed in parallel.

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { fal } from '@ai-sdk/fal';



3

import { readFile } from 'fs/promises';



4



5

const result = await transcribe({



6

model: fal.transcription('wizper'),



7

audio: await readFile('audio.mp3'),



8

providerOptions: { fal: { batchSize: 10 } },



9

});
```

The following provider options are available:

* **language** *string*
  Language of the audio file. If set to null, the language will be automatically detected.
  Accepts ISO language codes like 'en', 'fr', 'zh', etc.
  Optional.
* **diarize** *boolean*
  Whether to diarize the audio file (identify different speakers).
  Defaults to true.
  Optional.
* **chunkLevel** *string*
  Level of the chunks to return. Either 'segment' or 'word'.
  Default value: "segment"
  Optional.
* **version** *string*
  Version of the model to use. All models are Whisper large variants.
  Default value: "3"
  Optional.
* **batchSize** *number*
  Batch size for processing.
  Default value: 64
  Optional.
* **numSpeakers** *number*
  Number of speakers in the audio file. If not provided, the number of speakers will be automatically detected.
  Optional.

### [Model Capabilities](#model-capabilities-1)

| Model | Transcription | Duration | Segments | Language |
| --- | --- | --- | --- | --- |
| `whisper` |  |  |  |  |
| `wizper` |  |  |  |  |

[Speech Models](#speech-models)
-------------------------------

You can create models that call Fal text-to-speech endpoints using the `.speech()` factory method.

### [Basic Usage](#basic-usage-1)

```
1

import { experimental_generateSpeech as generateSpeech } from 'ai';



2

import { fal } from '@ai-sdk/fal';



3



4

const result = await generateSpeech({



5

model: fal.speech('fal-ai/minimax/speech-02-hd'),



6

text: 'Hello from the AI SDK!',



7

});
```

### [Model Capabilities](#model-capabilities-2)

| Model | Description |
| --- | --- |
| `fal-ai/minimax/voice-clone` | Clone a voice from a sample audio and generate speech from text prompts |
| `fal-ai/minimax/voice-design` | Design a personalized voice from a text description and generate speech from text prompts |
| `fal-ai/dia-tts/voice-clone` | Clone dialog voices from a sample audio and generate dialogs from text prompts |
| `fal-ai/minimax/speech-02-hd` | Generate speech from text prompts and different voices |
| `fal-ai/minimax/speech-02-turbo` | Generate fast speech from text prompts and different voices |
| `fal-ai/dia-tts` | Directly generates realistic dialogue from transcripts with audio conditioning for emotion control. Produces natural nonverbals like laughter and throat clearing |
| `resemble-ai/chatterboxhd/text-to-speech` | Generate expressive, natural speech with Resemble AI's Chatterbox. Features unique emotion control, instant voice cloning from short audio, and built-in watermarking |

### [Provider Options](#provider-options-1)

Pass provider-specific options via `providerOptions.fal` depending on the model:

* **voice\_setting** *object*

  + `voice_id` (string): predefined voice ID
  + `speed` (number): 0.5–2.0
  + `vol` (number): 0–10
  + `pitch` (number): -12–12
  + `emotion` (enum): happy | sad | angry | fearful | disgusted | surprised | neutral
  + `english_normalization` (boolean)
* **audio\_setting** *object*
  Audio configuration settings specific to the model.
* **language\_boost** *enum*
  Chinese | Chinese,Yue | English | Arabic | Russian | Spanish | French | Portuguese | German | Turkish | Dutch | Ukrainian | Vietnamese | Indonesian | Japanese | Italian | Korean | Thai | Polish | Romanian | Greek | Czech | Finnish | Hindi | auto
* **pronunciation\_dict** *object*
  Custom pronunciation dictionary for specific words.

Model-specific parameters (e.g., `audio_url`, `prompt`, `preview_text`, `ref_audio_url`, `ref_text`) can be passed directly under `providerOptions.fal` and will be forwarded to the Fal API.