# https://sdk.vercel.ai/providers/ai-sdk-providers/luma

Copy markdown

[Luma Provider](#luma-provider)
===============================

[Luma AI](https://lumalabs.ai/) provides state-of-the-art image generation models through their Dream Machine platform. Their models offer ultra-high quality image generation with superior prompt understanding and unique capabilities like character consistency and multi-image reference support.

[Setup](#setup)
---------------

The Luma provider is available via the `@ai-sdk/luma` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/luma
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `luma` from `@ai-sdk/luma`:

```
1

import { luma } from '@ai-sdk/luma';
```

If you need a customized setup, you can import `createLuma` and create a provider instance with your settings:

```
1

import { createLuma } from '@ai-sdk/luma';



2



3

const luma = createLuma({



4

apiKey: 'your-api-key', // optional, defaults to LUMA_API_KEY environment variable



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

You can use the following optional settings to customize the Luma provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.lumalabs.ai`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `LUMA_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Image Models](#image-models)
-----------------------------

You can create Luma image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

### [Basic Usage](#basic-usage)

```
1

import { luma, type LumaImageProviderOptions } from '@ai-sdk/luma';



2

import { generateImage } from 'ai';



3

import fs from 'fs';



4



5

const { image } = await generateImage({



6

model: luma.image('photon-1'),



7

prompt: 'A serene mountain landscape at sunset',



8

aspectRatio: '16:9',



9

});



10



11

const filename = `image-${Date.now()}.png`;



12

fs.writeFileSync(filename, image.uint8Array);



13

console.log(`Image saved to ${filename}`);
```

### [Image Model Settings](#image-model-settings)

You can customize the generation behavior with optional settings:

```
1

const { image } = await generateImage({



2

model: luma.image('photon-1'),



3

prompt: 'A serene mountain landscape at sunset',



4

aspectRatio: '16:9',



5

maxImagesPerCall: 1, // Maximum number of images to generate per API call



6

providerOptions: {



7

luma: {



8

pollIntervalMillis: 5000, // How often to check for completed images (in ms)



9

maxPollAttempts: 10, // Maximum number of polling attempts before timeout



10

},



11

} satisfies LumaImageProviderOptions,



12

});
```

Since Luma processes images through an asynchronous queue system, these settings allow you to tune the polling behavior:

* **maxImagesPerCall** *number*

  Override the maximum number of images generated per API call. Defaults to 1.
* **pollIntervalMillis** *number*

  Control how frequently the API is checked for completed images while they are
  being processed. Defaults to 500ms.
* **maxPollAttempts** *number*

  Limit how long to wait for results before timing out, since image generation
  is queued asynchronously. Defaults to 120 attempts.

### [Model Capabilities](#model-capabilities)

Luma offers two main models:

| Model | Description |
| --- | --- |
| `photon-1` | High-quality image generation with superior prompt understanding |
| `photon-flash-1` | Faster generation optimized for speed while maintaining quality |

Both models support the following aspect ratios:

* 1:1
* 3:4
* 4:3
* 9:16
* 16:9 (default)
* 9:21
* 21:9

For more details about supported aspect ratios, see the [Luma Image Generation documentation](https://docs.lumalabs.ai/docs/image-generation).

Key features of Luma models include:

* Ultra-high quality image generation
* 10x higher cost efficiency compared to similar models
* Superior prompt understanding and adherence
* Unique character consistency capabilities from single reference images
* Multi-image reference support for precise style matching

### [Image editing](#image-editing)

Luma supports different modes of generating images that reference other images.

#### [Modify an image](#modify-an-image)

Images have to be passed as URLs. `weight` can be configured for each image in the `providerOPtions.luma.images` array.

```
1

await generateImage({



2

model: luma.image('photon-flash-1'),



3

prompt: {



4

text: 'transform the bike to a boat',



5

images: [



6

'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future-me-8hcBWcZOkbE53q3gshhEm16S87qDpF.jpeg',



7

],



8

},



9

providerOptions: {



10

luma: {



11

images: [{ weight: 1.0 }],



12

} satisfies LumaImageProviderOptions,



13

},



14

});
```

Learn more at <https://docs.lumalabs.ai/docs/image-generation#modify-image>.

#### [Referen an image](#referen-an-image)

Use up to 4 reference images to guide your generation. Useful for creating variations or visualizing complex concepts. Adjust the `weight` for each image (0-1) to control the influence of reference images.

```
1

await generateImage({



2

model: luma.image('photon-flash-1'),



3

prompt: {



4

text: 'A salamander at dusk in a forest pond, in the style of ukiyo-e',



5

images: [



6

'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future-me-8hcBWcZOkbE53q3gshhEm16S87qDpF.jpeg',



7

],



8

},



9

aspectRatio: '1:1',



10

providerOptions: {



11

luma: {



12

referenceType: 'image',



13

images: [{ weight: 0.8 }],



14

} satisfies LumaImageProviderOptions,



15

},



16

});
```

Learn more at <https://docs.lumalabs.ai/docs/image-generation#image-reference>

#### [Style Reference](#style-reference)

Apply specific visual styles to your generations using reference images. Control the style influence using the `weight` parameter.

```
1

await generateImage({



2

model: luma.image('photon-flash-1'),



3

prompt: 'A blue cream Persian cat launching its website on Vercel',



4

aspectRatio: '1:1',



5

providerOptions: {



6

luma: {



7

referenceType: 'style',



8

images: [{ weight: 0.8 }],



9

} satisfies LumaImageProviderOptions,



10

},



11

});
```

Learn more at <https://docs.lumalabs.ai/docs/image-generation#style-reference>

#### [Character Reference](#character-reference)

Create consistent and personalized characters using up to 4 reference images of the same subject. More reference images improve character representation.

```
1

await generateImage({



2

model: luma.image('photon-flash-1'),



3

prompt: {



4

text: 'A woman with a cat riding a broomstick in a forest',



5

images: [



6

'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future-me-8hcBWcZOkbE53q3gshhEm16S87qDpF.jpeg',



7

],



8

},



9

aspectRatio: '1:1',



10

providerOptions: {



11

luma: {



12

referenceType: 'character',



13

images: [



14

{



15

id: 'identity0',



16

},



17

],



18

} satisfies LumaImageProviderOptions,



19

},



20

});
```

Learn more at <https://docs.lumalabs.ai/docs/image-generation#character-reference>