# https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex

Copy markdown

[Google Vertex Provider](#google-vertex-provider)
=================================================

The Google Vertex provider for the [AI SDK](/docs) contains language model support for the [Google Vertex AI](https://cloud.google.com/vertex-ai) APIs. This includes support for [Google's Gemini models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) and [Anthropic's Claude partner models](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude).

The Google Vertex provider is compatible with both Node.js and Edge runtimes.
The Edge runtime is supported through the `@ai-sdk/google-vertex/edge`
sub-module. More details can be found in the [Google Vertex Edge
Runtime](#google-vertex-edge-runtime) and [Google Vertex Anthropic Edge
Runtime](#google-vertex-anthropic-edge-runtime) sections below.

[Setup](#setup)
---------------

The Google Vertex and Google Vertex Anthropic providers are both available in the `@ai-sdk/google-vertex` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/google-vertex
```

[Google Vertex Provider Usage](#google-vertex-provider-usage)
-------------------------------------------------------------

The Google Vertex provider instance is used to create model instances that call the Vertex AI API. The models available with this provider include [Google's Gemini models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models). If you're looking to use [Anthropic's Claude models](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude), see the [Google Vertex Anthropic Provider](#google-vertex-anthropic-provider-usage) section below.

### [Provider Instance](#provider-instance)

You can import the default provider instance `vertex` from `@ai-sdk/google-vertex`:

```
1

import { vertex } from '@ai-sdk/google-vertex';
```

If you need a customized setup, you can import `createVertex` from `@ai-sdk/google-vertex` and create a provider instance with your settings:

```
1

import { createVertex } from '@ai-sdk/google-vertex';



2



3

const vertex = createVertex({



4

project: 'my-project', // optional



5

location: 'us-central1', // optional



6

});
```

Google Vertex supports multiple authentication methods depending on your runtime environment and requirements.

#### [Node.js Runtime](#nodejs-runtime)

The Node.js runtime is the default runtime supported by the AI SDK. It supports all standard Google Cloud authentication options through the [`google-auth-library`](https://github.com/googleapis/google-auth-library-nodejs?tab=readme-ov-file#ways-to-authenticate). Typical use involves setting a path to a json credentials file in the `GOOGLE_APPLICATION_CREDENTIALS` environment variable. The credentials file can be obtained from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

If you want to customize the Google authentication options you can pass them as options to the `createVertex` function, for example:

```
1

import { createVertex } from '@ai-sdk/google-vertex';



2



3

const vertex = createVertex({



4

googleAuthOptions: {



5

credentials: {



6

client_email: 'my-email',



7

private_key: 'my-private-key',



8

},



9

},



10

});
```

##### [Optional Provider Settings](#optional-provider-settings)

You can use the following optional settings to customize the provider instance:

* **project** *string*

  The Google Cloud project ID that you want to use for the API calls.
  It uses the `GOOGLE_VERTEX_PROJECT` environment variable by default.
* **location** *string*

  The Google Cloud location that you want to use for the API calls, e.g. `us-central1`.
  It uses the `GOOGLE_VERTEX_LOCATION` environment variable by default.
* **googleAuthOptions** *object*

  Optional. The Authentication options used by the [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs/). See also the [GoogleAuthOptions](https://github.com/googleapis/google-auth-library-nodejs/blob/08978822e1b7b5961f0e355df51d738e012be392/src/auth/googleauth.ts#L87C18-L87C35) interface.

  + **authClient** *object*
    An `AuthClient` to use.
  + **keyFilename** *string*
    Path to a .json, .pem, or .p12 key file.
  + **keyFile** *string*
    Path to a .json, .pem, or .p12 key file.
  + **credentials** *object*
    Object containing client\_email and private\_key properties, or the external account client options.
  + **clientOptions** *object*
    Options object passed to the constructor of the client.
  + **scopes** *string | string[]*
    Required scopes for the desired API request.
  + **projectId** *string*
    Your project ID.
  + **universeDomain** *string*
    The default service domain for a given Cloud universe.
* **headers** *Resolvable<Record<string, string | undefined>>*

  Headers to include in the requests. Can be provided in multiple formats:

  + A record of header key-value pairs: `Record<string, string | undefined>`
  + A function that returns headers: `() => Record<string, string | undefined>`
  + An async function that returns headers: `async () => Record<string, string | undefined>`
  + A promise that resolves to headers: `Promise<Record<string, string | undefined>>`
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.
* **baseURL** *string*

  Optional. Base URL for the Google Vertex API calls e.g. to use proxy servers. By default, it is constructed using the location and project:
  `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google`

#### [Edge Runtime](#edge-runtime)

Edge runtimes (like Vercel Edge Functions and Cloudflare Workers) are lightweight JavaScript environments that run closer to users at the network edge.
They only provide a subset of the standard Node.js APIs.
For example, direct file system access is not available, and many Node.js-specific libraries
(including the standard Google Auth library) are not compatible.

The Edge runtime version of the Google Vertex provider supports Google's [Application Default Credentials](https://github.com/googleapis/google-auth-library-nodejs?tab=readme-ov-file#application-default-credentials) through environment variables. The values can be obtained from a json credentials file from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

You can import the default provider instance `vertex` from `@ai-sdk/google-vertex/edge`:

```
1

import { vertex } from '@ai-sdk/google-vertex/edge';
```

The `/edge` sub-module is included in the `@ai-sdk/google-vertex` package, so
you don't need to install it separately. You must import from
`@ai-sdk/google-vertex/edge` to differentiate it from the Node.js provider.

If you need a customized setup, you can import `createVertex` from `@ai-sdk/google-vertex/edge` and create a provider instance with your settings:

```
1

import { createVertex } from '@ai-sdk/google-vertex/edge';



2



3

const vertex = createVertex({



4

project: 'my-project', // optional



5

location: 'us-central1', // optional



6

});
```

For Edge runtime authentication, you'll need to set these environment variables from your Google Default Application Credentials JSON file:

* `GOOGLE_CLIENT_EMAIL`
* `GOOGLE_PRIVATE_KEY`
* `GOOGLE_PRIVATE_KEY_ID` (optional)

These values can be obtained from a service account JSON file from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

##### [Optional Provider Settings](#optional-provider-settings-1)

You can use the following optional settings to customize the provider instance:

* **project** *string*

  The Google Cloud project ID that you want to use for the API calls.
  It uses the `GOOGLE_VERTEX_PROJECT` environment variable by default.
* **location** *string*

  The Google Cloud location that you want to use for the API calls, e.g. `us-central1`.
  It uses the `GOOGLE_VERTEX_LOCATION` environment variable by default.
* **googleCredentials** *object*

  Optional. The credentials used by the Edge provider for authentication. These credentials are typically set through environment variables and are derived from a service account JSON file.

  + **clientEmail** *string*
    The client email from the service account JSON file. Defaults to the contents of the `GOOGLE_CLIENT_EMAIL` environment variable.
  + **privateKey** *string*
    The private key from the service account JSON file. Defaults to the contents of the `GOOGLE_PRIVATE_KEY` environment variable.
  + **privateKeyId** *string*
    The private key ID from the service account JSON file (optional). Defaults to the contents of the `GOOGLE_PRIVATE_KEY_ID` environment variable.
* **headers** *Resolvable<Record<string, string | undefined>>*

  Headers to include in the requests. Can be provided in multiple formats:

  + A record of header key-value pairs: `Record<string, string | undefined>`
  + A function that returns headers: `() => Record<string, string | undefined>`
  + An async function that returns headers: `async () => Record<string, string | undefined>`
  + A promise that resolves to headers: `Promise<Record<string, string | undefined>>`
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

#### [Express Mode](#express-mode)

Express mode provides a simplified authentication method using an API key instead of OAuth or service account credentials. When using express mode, the `project` and `location` settings are not required.

```
1

import { createVertex } from '@ai-sdk/google-vertex';



2



3

const vertex = createVertex({



4

apiKey: process.env.GOOGLE_VERTEX_API_KEY,



5

});
```

##### [Optional Provider Settings](#optional-provider-settings-2)

* **apiKey** *string*

  The API key for Google Vertex AI. When provided, the provider uses express mode with API key authentication instead of OAuth.
  It uses the `GOOGLE_VERTEX_API_KEY` environment variable by default.

### [Language Models](#language-models)

You can create models that call the Vertex API using the provider instance.
The first argument is the model id, e.g. `gemini-1.5-pro`.

```
1

const model = vertex('gemini-1.5-pro');
```

If you are using [your own
models](https://cloud.google.com/vertex-ai/docs/training-overview), the name
of your model needs to start with `projects/`.

Google Vertex models support also some model specific settings that are not part
of the [standard call settings](/docs/ai-sdk-core/settings). You can pass them as
an options argument:

```
1

const model = vertex('gemini-1.5-pro');



2



3

await generateText({



4

model,



5

providerOptions: {



6

google: {



7

safetySettings: [



8

{



9

category: 'HARM_CATEGORY_UNSPECIFIED',



10

threshold: 'BLOCK_LOW_AND_ABOVE',



11

},



12

],



13

},



14

},



15

});
```

The following optional provider options are available for Google Vertex models:

* **structuredOutputs** *boolean*

  Optional. Enable structured output. Default is true.

  This is useful when the JSON Schema contains elements that are
  not supported by the OpenAPI schema version that
  Google Vertex uses. You can use this to disable
  structured outputs if you need to.

  See [Troubleshooting: Schema Limitations](#schema-limitations) for more details.
* **safetySettings** *Array<{ category: string; threshold: string }>*

  Optional. Safety settings for the model.

  + **category** *string*

    The category of the safety setting. Can be one of the following:

    - `HARM_CATEGORY_UNSPECIFIED`
    - `HARM_CATEGORY_HATE_SPEECH`
    - `HARM_CATEGORY_DANGEROUS_CONTENT`
    - `HARM_CATEGORY_HARASSMENT`
    - `HARM_CATEGORY_SEXUALLY_EXPLICIT`
    - `HARM_CATEGORY_CIVIC_INTEGRITY`
  + **threshold** *string*

    The threshold of the safety setting. Can be one of the following:

    - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`
    - `BLOCK_LOW_AND_ABOVE`
    - `BLOCK_MEDIUM_AND_ABOVE`
    - `BLOCK_ONLY_HIGH`
    - `BLOCK_NONE`
* **audioTimestamp** *boolean*

  Optional. Enables timestamp understanding for audio files. Defaults to false.

  This is useful for generating transcripts with accurate timestamps.
  Consult [Google's Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/audio-understanding) for usage details.
* **labels** *object*

  Optional. Defines labels used in billing reports.

  Consult [Google's Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/add-labels-to-api-calls) for usage details.

You can use Google Vertex language models to generate text with the `generateText` function:

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: vertex('gemini-1.5-pro'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Google Vertex language models can also be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

#### [Code Execution](#code-execution)

With [Code Execution](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/code-execution), certain Gemini models on Vertex AI can generate and execute Python code. This allows the model to perform calculations, data manipulation, and other programmatic tasks to enhance its responses.

You can enable code execution by adding the `code_execution` tool to your request.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: vertex('gemini-2.5-pro'),



6

tools: { code_execution: vertex.tools.codeExecution({}) },



7

prompt:



8

'Use python to calculate 20th fibonacci number. Then find the nearest palindrome to it.',



9

});
```

The response will contain `tool-call` and `tool-result` parts for the executed code.

#### [URL Context](#url-context)

URL Context allows Gemini models to retrieve and analyze content from URLs. Supported models: Gemini 2.5 Flash-Lite, 2.5 Pro, 2.5 Flash, 2.0 Flash.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: vertex('gemini-2.5-pro'),



6

tools: { url_context: vertex.tools.urlContext({}) },



7

prompt: 'What are the key points from https://example.com/article?',



8

});
```

#### [Google Search](#google-search)

Google Search enables Gemini models to access real-time web information. Supported models: Gemini 2.5 Flash-Lite, 2.5 Flash, 2.0 Flash, 2.5 Pro.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: vertex('gemini-2.5-pro'),



6

tools: { google_search: vertex.tools.googleSearch({}) },



7

prompt: 'What are the latest developments in AI?',



8

});
```

#### [Enterprise Web Search](#enterprise-web-search)

[Enterprise Web Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/web-grounding-enterprise) provides grounding using a compliance-focused web index designed for highly-regulated industries such as finance, healthcare, and the public sector. Unlike standard Google Search grounding, Enterprise Web Search does not log customer data and supports VPC service controls. Supported models: Gemini 2.0 and newer.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: vertex('gemini-2.5-flash'),



6

tools: {



7

enterprise_web_search: vertex.tools.enterpriseWebSearch({}),



8

},



9

prompt: 'What are the latest FDA regulations for clinical trials?',



10

});
```

#### [Google Maps](#google-maps)

Google Maps grounding enables Gemini models to access Google Maps data for location-aware responses. Supported models: Gemini 2.5 Flash-Lite, 2.5 Flash, 2.0 Flash, 2.5 Pro, 3.0 Pro.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: vertex('gemini-2.5-flash'),



6

tools: {



7

google_maps: vertex.tools.googleMaps({}),



8

},



9

providerOptions: {



10

google: {



11

retrievalConfig: {



12

latLng: { latitude: 34.090199, longitude: -117.881081 },



13

},



14

},



15

},



16

prompt: 'What are the best Italian restaurants nearby?',



17

});
```

The optional `retrievalConfig.latLng` provider option provides location context for queries about nearby places. This configuration applies to any grounding tools that support location context.

#### [Reasoning (Thinking Tokens)](#reasoning-thinking-tokens)

Google Vertex AI, through its support for Gemini models, can also emit "thinking" tokens, representing the model's reasoning process. The AI SDK exposes these as reasoning information.

To enable thinking tokens for compatible Gemini models via Vertex, set `includeThoughts: true` in the `thinkingConfig` provider option. Since the Vertex provider uses the Google provider's underlying language model, these options are passed through `providerOptions.google`:

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { GoogleGenerativeAIProviderOptions } from '@ai-sdk/google'; // Note: importing from @ai-sdk/google



3

import { generateText, streamText } from 'ai';



4



5

// For generateText:



6

const { text, reasoningText, reasoning } = await generateText({



7

model: vertex('gemini-2.0-flash-001'), // Or other supported model via Vertex



8

providerOptions: {



9

google: {



10

// Options are nested under 'google' for Vertex provider



11

thinkingConfig: {



12

includeThoughts: true,



13

// thinkingBudget: 2048, // Optional



14

},



15

} satisfies GoogleGenerativeAIProviderOptions,



16

},



17

prompt: 'Explain quantum computing in simple terms.',



18

});



19



20

console.log('Reasoning:', reasoningText);



21

console.log('Reasoning Details:', reasoning);



22

console.log('Final Text:', text);



23



24

// For streamText:



25

const result = streamText({



26

model: vertex('gemini-2.0-flash-001'), // Or other supported model via Vertex



27

providerOptions: {



28

google: {



29

// Options are nested under 'google' for Vertex provider



30

thinkingConfig: {



31

includeThoughts: true,



32

// thinkingBudget: 2048, // Optional



33

},



34

} satisfies GoogleGenerativeAIProviderOptions,



35

},



36

prompt: 'Explain quantum computing in simple terms.',



37

});



38



39

for await (const part of result.fullStream) {



40

if (part.type === 'reasoning') {



41

process.stdout.write(`THOUGHT: ${part.textDelta}\n`);



42

} else if (part.type === 'text-delta') {



43

process.stdout.write(part.textDelta);



44

}



45

}
```

When `includeThoughts` is true, parts of the API response marked with `thought: true` will be processed as reasoning.

* In `generateText`, these contribute to the `reasoningText` (string) and `reasoning` (array) fields.
* In `streamText`, these are emitted as `reasoning` stream parts.

Refer to the [Google Vertex AI documentation on
"thinking"](https://cloud.google.com/vertex-ai/generative-ai/docs/thinking)
for model compatibility and further details.

#### [File Inputs](#file-inputs)

The Google Vertex provider supports file inputs, e.g. PDF files.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: vertex('gemini-1.5-pro'),



6

messages: [



7

{



8

role: 'user',



9

content: [



10

{



11

type: 'text',



12

text: 'What is an embedding model according to this document?',



13

},



14

{



15

type: 'file',



16

data: fs.readFileSync('./data/ai.pdf'),



17

mediaType: 'application/pdf',



18

},



19

],



20

},



21

],



22

});
```

The AI SDK will automatically download URLs if you pass them as data, except
for `gs://` URLs. You can use the Google Cloud Storage API to upload larger
files to that location.

See [File Parts](/docs/foundations/prompts#file-parts) for details on how to use files in prompts.

### [Safety Ratings](#safety-ratings)

The safety ratings provide insight into the safety of the model's response.
See [Google Vertex AI documentation on configuring safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters).

Example response excerpt:

```
1

{



2

"safetyRatings": [



3

{



4

"category": "HARM_CATEGORY_HATE_SPEECH",



5

"probability": "NEGLIGIBLE",



6

"probabilityScore": 0.11027937,



7

"severity": "HARM_SEVERITY_LOW",



8

"severityScore": 0.28487435



9

},



10

{



11

"category": "HARM_CATEGORY_DANGEROUS_CONTENT",



12

"probability": "HIGH",



13

"blocked": true,



14

"probabilityScore": 0.95422274,



15

"severity": "HARM_SEVERITY_MEDIUM",



16

"severityScore": 0.43398145



17

},



18

{



19

"category": "HARM_CATEGORY_HARASSMENT",



20

"probability": "NEGLIGIBLE",



21

"probabilityScore": 0.11085559,



22

"severity": "HARM_SEVERITY_NEGLIGIBLE",



23

"severityScore": 0.19027223



24

},



25

{



26

"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",



27

"probability": "NEGLIGIBLE",



28

"probabilityScore": 0.22901751,



29

"severity": "HARM_SEVERITY_NEGLIGIBLE",



30

"severityScore": 0.09089675



31

}



32

]



33

}
```

For more details, see the [Google Vertex AI documentation on grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/ground-gemini#ground-to-search).

### [Troubleshooting](#troubleshooting)

#### [Schema Limitations](#schema-limitations)

The Google Vertex API uses a subset of the OpenAPI 3.0 schema,
which does not support features such as unions.
The errors that you get in this case look like this:

`GenerateContentRequest.generation_config.response_schema.properties[occupation].type: must be specified`

By default, structured outputs are enabled (and for tool calling they are required).
You can disable structured outputs for object generation as a workaround:

```
1

const result = await generateObject({



2

model: vertex('gemini-1.5-pro'),



3

providerOptions: {



4

google: {



5

structuredOutputs: false,



6

},



7

},



8

schema: z.object({



9

name: z.string(),



10

age: z.number(),



11

contact: z.union([



12

z.object({



13

type: z.literal('email'),



14

value: z.string(),



15

}),



16

z.object({



17

type: z.literal('phone'),



18

value: z.string(),



19

}),



20

]),



21

}),



22

prompt: 'Generate an example person for testing.',



23

});
```

The following Zod features are known to not work with Google Vertex:

* `z.union`
* `z.record`

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `gemini-3-pro-preview` |  |  |  |  |
| `gemini-2.5-pro` |  |  |  |  |
| `gemini-2.5-flash` |  |  |  |  |
| `gemini-2.0-flash-001` |  |  |  |  |
| `gemini-1.5-flash` |  |  |  |  |
| `gemini-1.5-pro` |  |  |  |  |

The table above lists popular models. Please see the [Google Vertex AI
docs](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#supported-models)
for a full list of available models. The table above lists popular models. You
can also pass any available provider model ID as a string if needed.

### [Embedding Models](#embedding-models)

You can create models that call the Google Vertex AI embeddings API using the `.embeddingModel()` factory method:

```
1

const model = vertex.embeddingModel('text-embedding-004');
```

Google Vertex AI embedding models support additional settings. You can pass them as an options argument:

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { embed } from 'ai';



3



4

const model = vertex.embeddingModel('text-embedding-004');



5



6

const { embedding } = await embed({



7

model,



8

value: 'sunny day at the beach',



9

providerOptions: {



10

google: {



11

outputDimensionality: 512, // optional, number of dimensions for the embedding



12

taskType: 'SEMANTIC_SIMILARITY', // optional, specifies the task type for generating embeddings



13

autoTruncate: false, // optional



14

},



15

},



16

});
```

The following optional provider options are available for Google Vertex AI embedding models:

* **outputDimensionality**: *number*

  Optional reduced dimension for the output embedding. If set, excessive values in the output embedding are truncated from the end.
* **taskType**: *string*

  Optional. Specifies the task type for generating embeddings. Supported task types include:

  + `SEMANTIC_SIMILARITY`: Optimized for text similarity.
  + `CLASSIFICATION`: Optimized for text classification.
  + `CLUSTERING`: Optimized for clustering texts based on similarity.
  + `RETRIEVAL_DOCUMENT`: Optimized for document retrieval.
  + `RETRIEVAL_QUERY`: Optimized for query-based retrieval.
  + `QUESTION_ANSWERING`: Optimized for answering questions.
  + `FACT_VERIFICATION`: Optimized for verifying factual information.
  + `CODE_RETRIEVAL_QUERY`: Optimized for retrieving code blocks based on natural language queries.
* **title**: *string*

  Optional. The title of the document being embedded. This helps the model produce better embeddings by providing additional context. Only valid when `taskType` is set to `'RETRIEVAL_DOCUMENT'`.
* **autoTruncate**: *boolean*

  Optional. When set to `true`, input text will be truncated if it exceeds the maximum length. When set to `false`, an error is returned if the input text is too long. Defaults to `true`.

#### [Model Capabilities](#model-capabilities-1)

| Model | Max Values Per Call | Parallel Calls |
| --- | --- | --- |
| `text-embedding-004` | 2048 |  |

The table above lists popular models. You can also pass any available provider
model ID as a string if needed.

### [Image Models](#image-models)

You can create [Imagen](https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview) models that call the [Imagen on Vertex AI API](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)
using the `.image()` factory method. For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: vertex.image('imagen-4.0-generate-001'),



6

prompt: 'A futuristic cityscape at sunset',



7

aspectRatio: '16:9',



8

});
```

Further configuration can be done using Google Vertex provider options. You can validate the provider options using the `GoogleVertexImageProviderOptions` type.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { GoogleVertexImageProviderOptions } from '@ai-sdk/google-vertex';



3

import { generateImage } from 'ai';



4



5

const { image } = await generateImage({



6

model: vertex.image('imagen-4.0-generate-001'),



7

providerOptions: {



8

vertex: {



9

negativePrompt: 'pixelated, blurry, low-quality',



10

} satisfies GoogleVertexImageProviderOptions,



11

},



12

// ...



13

});
```

The following provider options are available:

* **negativePrompt** *string*
  A description of what to discourage in the generated images.
* **personGeneration** `allow_adult` | `allow_all` | `dont_allow`
  Whether to allow person generation. Defaults to `allow_adult`.
* **safetySetting** `block_low_and_above` | `block_medium_and_above` | `block_only_high` | `block_none`
  Whether to block unsafe content. Defaults to `block_medium_and_above`.
* **addWatermark** *boolean*
  Whether to add an invisible watermark to the generated images. Defaults to `true`.
* **storageUri** *string*
  Cloud Storage URI to store the generated images.

Imagen models do not support the `size` parameter. Use the `aspectRatio`
parameter instead.

Additional information about the images can be retrieved using Google Vertex meta data.

```
1

import { vertex } from '@ai-sdk/google-vertex';



2

import { GoogleVertexImageProviderOptions } from '@ai-sdk/google-vertex';



3

import { generateImage } from 'ai';



4



5

const { image, providerMetadata } = await generateImage({



6

model: vertex.image('imagen-4.0-generate-001'),



7

prompt: 'A futuristic cityscape at sunset',



8

aspectRatio: '16:9',



9

});



10



11

console.log(



12

`Revised prompt: ${providerMetadata.vertex.images[0].revisedPrompt}`,



13

);
```

#### [Image Editing](#image-editing)

Google Vertex Imagen models support image editing through inpainting, outpainting, and other edit modes. Pass input images via `prompt.images` and optionally a mask via `prompt.mask`.

Image editing is supported by `imagen-3.0-capability-001`. The
`imagen-4.0-generate-001` model does not currently support editing operations.

##### [Inpainting (Insert Objects)](#inpainting-insert-objects)

Insert or replace objects in specific areas using a mask:

```
1

import {



2

vertex,



3

GoogleVertexImageProviderOptions,



4

} from '@ai-sdk/google-vertex';



5

import { generateImage } from 'ai';



6

import fs from 'fs';



7



8

const image = fs.readFileSync('./input-image.png');



9

const mask = fs.readFileSync('./mask.png'); // White = edit area



10



11

const { images } = await generateImage({



12

model: vertex.image('imagen-3.0-capability-001'),



13

prompt: {



14

text: 'A sunlit indoor lounge area with a pool containing a flamingo',



15

images: [image],



16

mask,



17

},



18

providerOptions: {



19

vertex: {



20

edit: {



21

baseSteps: 50,



22

mode: 'EDIT_MODE_INPAINT_INSERTION',



23

maskMode: 'MASK_MODE_USER_PROVIDED',



24

maskDilation: 0.01,



25

},



26

} satisfies GoogleVertexImageProviderOptions,



27

},



28

});
```

##### [Outpainting (Extend Image)](#outpainting-extend-image)

Extend an image beyond its original boundaries:

```
1

import {



2

vertex,



3

GoogleVertexImageProviderOptions,



4

} from '@ai-sdk/google-vertex';



5

import { generateImage } from 'ai';



6

import fs from 'fs';



7



8

const image = fs.readFileSync('./input-image.png');



9

const mask = fs.readFileSync('./outpaint-mask.png'); // White = extend area



10



11

const { images } = await generateImage({



12

model: vertex.image('imagen-3.0-capability-001'),



13

prompt: {



14

text: 'Extend the scene with more of the forest background',



15

images: [image],



16

mask,



17

},



18

providerOptions: {



19

vertex: {



20

edit: {



21

baseSteps: 50,



22

mode: 'EDIT_MODE_OUTPAINT',



23

maskMode: 'MASK_MODE_USER_PROVIDED',



24

},



25

} satisfies GoogleVertexImageProviderOptions,



26

},



27

});
```

##### [Edit Provider Options](#edit-provider-options)

The following options are available under `providerOptions.vertex.edit`:

* **mode** - The edit mode to use:

  + `EDIT_MODE_INPAINT_INSERTION` - Insert objects into masked areas
  + `EDIT_MODE_INPAINT_REMOVAL` - Remove objects from masked areas
  + `EDIT_MODE_OUTPAINT` - Extend image beyond boundaries
  + `EDIT_MODE_CONTROLLED_EDITING` - Controlled editing
  + `EDIT_MODE_PRODUCT_IMAGE` - Product image editing
  + `EDIT_MODE_BGSWAP` - Background swap
* **baseSteps** *number* - Number of sampling steps (35-75). Higher values = better quality but slower.
* **maskMode** - How to interpret the mask:

  + `MASK_MODE_USER_PROVIDED` - Use the provided mask directly
  + `MASK_MODE_DEFAULT` - Default mask mode
  + `MASK_MODE_DETECTION_BOX` - Mask from detected bounding boxes
  + `MASK_MODE_CLOTHING_AREA` - Mask from clothing segmentation
  + `MASK_MODE_PARSED_PERSON` - Mask from person parsing
* **maskDilation** *number* - Percentage (0-1) to grow the mask. Recommended: 0.01.

Input images must be provided as `Buffer`, `ArrayBuffer`, `Uint8Array`, or
base64-encoded strings. URL-based images are not supported for Google Vertex
image editing.

#### [Model Capabilities](#model-capabilities-2)

| Model | Aspect Ratios |
| --- | --- |
| `imagen-3.0-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| `imagen-3.0-generate-002` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| `imagen-3.0-fast-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| `imagen-4.0-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| `imagen-4.0-fast-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |
| `imagen-4.0-ultra-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |

[Google Vertex Anthropic Provider Usage](#google-vertex-anthropic-provider-usage)
---------------------------------------------------------------------------------

The Google Vertex Anthropic provider for the [AI SDK](/docs) offers support for Anthropic's Claude models through the Google Vertex AI APIs. This section provides details on how to set up and use the Google Vertex Anthropic provider.

### [Provider Instance](#provider-instance-1)

You can import the default provider instance `vertexAnthropic` from `@ai-sdk/google-vertex/anthropic`:

```
1

import { vertexAnthropic } from '@ai-sdk/google-vertex/anthropic';
```

If you need a customized setup, you can import `createVertexAnthropic` from `@ai-sdk/google-vertex/anthropic` and create a provider instance with your settings:

```
1

import { createVertexAnthropic } from '@ai-sdk/google-vertex/anthropic';



2



3

const vertexAnthropic = createVertexAnthropic({



4

project: 'my-project', // optional



5

location: 'us-central1', // optional



6

});
```

#### [Node.js Runtime](#nodejs-runtime-1)

For Node.js environments, the Google Vertex Anthropic provider supports all standard Google Cloud authentication options through the `google-auth-library`. You can customize the authentication options by passing them to the `createVertexAnthropic` function:

```
1

import { createVertexAnthropic } from '@ai-sdk/google-vertex/anthropic';



2



3

const vertexAnthropic = createVertexAnthropic({



4

googleAuthOptions: {



5

credentials: {



6

client_email: 'my-email',



7

private_key: 'my-private-key',



8

},



9

},



10

});
```

##### [Optional Provider Settings](#optional-provider-settings-3)

You can use the following optional settings to customize the Google Vertex Anthropic provider instance:

* **project** *string*

  The Google Cloud project ID that you want to use for the API calls.
  It uses the `GOOGLE_VERTEX_PROJECT` environment variable by default.
* **location** *string*

  The Google Cloud location that you want to use for the API calls, e.g. `us-central1`.
  It uses the `GOOGLE_VERTEX_LOCATION` environment variable by default.
* **googleAuthOptions** *object*

  Optional. The Authentication options used by the [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs/). See also the [GoogleAuthOptions](https://github.com/googleapis/google-auth-library-nodejs/blob/08978822e1b7b5961f0e355df51d738e012be392/src/auth/googleauth.ts#L87C18-L87C35) interface.

  + **authClient** *object*
    An `AuthClient` to use.
  + **keyFilename** *string*
    Path to a .json, .pem, or .p12 key file.
  + **keyFile** *string*
    Path to a .json, .pem, or .p12 key file.
  + **credentials** *object*
    Object containing client\_email and private\_key properties, or the external account client options.
  + **clientOptions** *object*
    Options object passed to the constructor of the client.
  + **scopes** *string | string[]*
    Required scopes for the desired API request.
  + **projectId** *string*
    Your project ID.
  + **universeDomain** *string*
    The default service domain for a given Cloud universe.
* **headers** *Resolvable<Record<string, string | undefined>>*

  Headers to include in the requests. Can be provided in multiple formats:

  + A record of header key-value pairs: `Record<string, string | undefined>`
  + A function that returns headers: `() => Record<string, string | undefined>`
  + An async function that returns headers: `async () => Record<string, string | undefined>`
  + A promise that resolves to headers: `Promise<Record<string, string | undefined>>`
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

#### [Edge Runtime](#edge-runtime-1)

Edge runtimes (like Vercel Edge Functions and Cloudflare Workers) are lightweight JavaScript environments that run closer to users at the network edge.
They only provide a subset of the standard Node.js APIs.
For example, direct file system access is not available, and many Node.js-specific libraries
(including the standard Google Auth library) are not compatible.

The Edge runtime version of the Google Vertex Anthropic provider supports Google's [Application Default Credentials](https://github.com/googleapis/google-auth-library-nodejs?tab=readme-ov-file#application-default-credentials) through environment variables. The values can be obtained from a json credentials file from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

For Edge runtimes, you can import the provider instance from `@ai-sdk/google-vertex/anthropic/edge`:

```
1

import { vertexAnthropic } from '@ai-sdk/google-vertex/anthropic/edge';
```

To customize the setup, use `createVertexAnthropic` from the same module:

```
1

import { createVertexAnthropic } from '@ai-sdk/google-vertex/anthropic/edge';



2



3

const vertexAnthropic = createVertexAnthropic({



4

project: 'my-project', // optional



5

location: 'us-central1', // optional



6

});
```

For Edge runtime authentication, set these environment variables from your Google Default Application Credentials JSON file:

* `GOOGLE_CLIENT_EMAIL`
* `GOOGLE_PRIVATE_KEY`
* `GOOGLE_PRIVATE_KEY_ID` (optional)

##### [Optional Provider Settings](#optional-provider-settings-4)

You can use the following optional settings to customize the provider instance:

* **project** *string*

  The Google Cloud project ID that you want to use for the API calls.
  It uses the `GOOGLE_VERTEX_PROJECT` environment variable by default.
* **location** *string*

  The Google Cloud location that you want to use for the API calls, e.g. `us-central1`.
  It uses the `GOOGLE_VERTEX_LOCATION` environment variable by default.
* **googleCredentials** *object*

  Optional. The credentials used by the Edge provider for authentication. These credentials are typically set through environment variables and are derived from a service account JSON file.

  + **clientEmail** *string*
    The client email from the service account JSON file. Defaults to the contents of the `GOOGLE_CLIENT_EMAIL` environment variable.
  + **privateKey** *string*
    The private key from the service account JSON file. Defaults to the contents of the `GOOGLE_PRIVATE_KEY` environment variable.
  + **privateKeyId** *string*
    The private key ID from the service account JSON file (optional). Defaults to the contents of the `GOOGLE_PRIVATE_KEY_ID` environment variable.
* **headers** *Resolvable<Record<string, string | undefined>>*

  Headers to include in the requests. Can be provided in multiple formats:

  + A record of header key-value pairs: `Record<string, string | undefined>`
  + A function that returns headers: `() => Record<string, string | undefined>`
  + An async function that returns headers: `async () => Record<string, string | undefined>`
  + A promise that resolves to headers: `Promise<Record<string, string | undefined>>`
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

### [Language Models](#language-models-1)

You can create models that call the [Anthropic Messages API](https://docs.anthropic.com/claude/reference/messages_post) using the provider instance.
The first argument is the model id, e.g. `claude-3-haiku-20240307`.
Some models have multi-modal capabilities.

```
1

const model = anthropic('claude-3-haiku-20240307');
```

You can use Anthropic language models to generate text with the `generateText` function:

```
1

import { vertexAnthropic } from '@ai-sdk/google-vertex/anthropic';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: vertexAnthropic('claude-3-haiku-20240307'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Anthropic language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

The Anthropic API returns streaming tool calls all at once after a delay. This
causes the `streamObject` function to generate the object fully after a delay
instead of streaming it incrementally.

The following optional provider options are available for Anthropic models:

* `sendReasoning` *boolean*

  Optional. Include reasoning content in requests sent to the model. Defaults to `true`.

  If you are experiencing issues with the model handling requests involving
  reasoning content, you can set this to `false` to omit them from the request.
* `thinking` *object*

  Optional. See [Reasoning section](#reasoning) for more details.

### [Reasoning](#reasoning)

Anthropic has reasoning support for the `claude-3-7-sonnet@20250219` model.

You can enable it using the `thinking` provider option
and specifying a thinking budget in tokens.

```
1

import { vertexAnthropic } from '@ai-sdk/google-vertex/anthropic';



2

import { generateText } from 'ai';



3



4

const { text, reasoningText, reasoning } = await generateText({



5

model: vertexAnthropic('claude-3-7-sonnet@20250219'),



6

prompt: 'How many people will live in the world in 2040?',



7

providerOptions: {



8

anthropic: {



9

thinking: { type: 'enabled', budgetTokens: 12000 },



10

},



11

},



12

});



13



14

console.log(reasoningText); // reasoning text



15

console.log(reasoning); // reasoning details including redacted reasoning



16

console.log(text); // text response
```

See [AI SDK UI: Chatbot](/docs/ai-sdk-ui/chatbot#reasoning) for more details
on how to integrate reasoning into your chatbot.

#### [Cache Control](#cache-control)

Anthropic cache control is in a Pre-Generally Available (GA) state on Google
Vertex. For more see [Google Vertex Anthropic cache control
documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude-prompt-caching).

In the messages and message parts, you can use the `providerOptions` property to set cache control breakpoints.
You need to set the `anthropic` property in the `providerOptions` object to `{ cacheControl: { type: 'ephemeral' } }` to set a cache control breakpoint.

The cache creation input tokens are then returned in the `providerMetadata` object
for `generateText` and `generateObject`, again under the `anthropic` property.
When you use `streamText` or `streamObject`, the response contains a promise
that resolves to the metadata. Alternatively you can receive it in the
`onFinish` callback.

```
1

import { vertexAnthropic } from '@ai-sdk/google-vertex/anthropic';



2

import { generateText } from 'ai';



3



4

const errorMessage = '... long error message ...';



5



6

const result = await generateText({



7

model: vertexAnthropic('claude-3-5-sonnet-20240620'),



8

messages: [



9

{



10

role: 'user',



11

content: [



12

{ type: 'text', text: 'You are a JavaScript expert.' },



13

{



14

type: 'text',



15

text: `Error message: ${errorMessage}`,



16

providerOptions: {



17

anthropic: { cacheControl: { type: 'ephemeral' } },



18

},



19

},



20

{ type: 'text', text: 'Explain the error message.' },



21

],



22

},



23

],



24

});



25



26

console.log(result.text);



27

console.log(result.providerMetadata?.anthropic);



28

// e.g. { cacheCreationInputTokens: 2118, cacheReadInputTokens: 0 }
```

You can also use cache control on system messages by providing multiple system messages at the head of your messages array:

```
1

const result = await generateText({



2

model: vertexAnthropic('claude-3-5-sonnet-20240620'),



3

messages: [



4

{



5

role: 'system',



6

content: 'Cached system message part',



7

providerOptions: {



8

anthropic: { cacheControl: { type: 'ephemeral' } },



9

},



10

},



11

{



12

role: 'system',



13

content: 'Uncached system message part',



14

},



15

{



16

role: 'user',



17

content: 'User prompt',



18

},



19

],



20

});
```

For more on prompt caching with Anthropic, see [Google Vertex AI's Claude prompt caching documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude-prompt-caching) and [Anthropic's Cache Control documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching).

### [Tools](#tools)

Google Vertex Anthropic supports a subset of Anthropic's built-in tools. The following tools are available via the `tools` property of the provider instance:

1. **Bash Tool**: Allows running bash commands.
2. **Text Editor Tool**: Provides functionality for viewing and editing text files.
3. **Computer Tool**: Enables control of keyboard and mouse actions on a computer.
4. **Web Search Tool**: Provides access to real-time web content.

Only a subset of Anthropic tools are supported on Google Vertex. Tools like
Code Execution, Memory, and Web Fetch are not available. Use the regular
`@ai-sdk/anthropic` provider if you need access to all Anthropic tools.

For more background on Anthropic tools, see [Anthropic's documentation](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview).

#### [Bash Tool](#bash-tool)

The Bash Tool allows running bash commands. Here's how to create and use it:

```
1

const bashTool = vertexAnthropic.tools.bash_20250124({



2

execute: async ({ command, restart }) => {



3

// Implement your bash command execution logic here



4

// Return the result of the command execution



5

},



6

});
```

Parameters:

* `command` (string): The bash command to run. Required unless the tool is being restarted.
* `restart` (boolean, optional): Specifying true will restart this tool.

#### [Text Editor Tool](#text-editor-tool)

The Text Editor Tool provides functionality for viewing and editing text files:

```
1

const textEditorTool = vertexAnthropic.tools.textEditor_20250124({



2

execute: async ({



3

command,



4

path,



5

file_text,



6

insert_line,



7

new_str,



8

old_str,



9

view_range,



10

}) => {



11

// Implement your text editing logic here



12

// Return the result of the text editing operation



13

},



14

});
```

Parameters:

* `command` ('view' | 'create' | 'str\_replace' | 'insert' | 'undo\_edit'): The command to run. Note: `undo_edit` is not supported in `textEditor_20250429` and `textEditor_20250728`.
* `path` (string): Absolute path to file or directory, e.g. `/repo/file.py` or `/repo`.
* `file_text` (string, optional): Required for `create` command, with the content of the file to be created.
* `insert_line` (number, optional): Required for `insert` command. The line number after which to insert the new string.
* `new_str` (string, optional): New string for `str_replace` or `insert` commands.
* `old_str` (string, optional): Required for `str_replace` command, containing the string to replace.
* `view_range` (number[], optional): Optional for `view` command to specify line range to show.
* `max_characters` (number, optional): Optional maximum number of characters to view in the file (only available in `textEditor_20250728`).

#### [Computer Tool](#computer-tool)

The Computer Tool enables control of keyboard and mouse actions on a computer:

```
1

const computerTool = vertexAnthropic.tools.computer_20241022({



2

displayWidthPx: 1920,



3

displayHeightPx: 1080,



4

displayNumber: 0, // Optional, for X11 environments



5



6

execute: async ({ action, coordinate, text }) => {



7

// Implement your computer control logic here



8

// Return the result of the action



9



10

// Example code:



11

switch (action) {



12

case 'screenshot': {



13

// multipart result:



14

return {



15

type: 'image',



16

data: fs



17

.readFileSync('./data/screenshot-editor.png')



18

.toString('base64'),



19

};



20

}



21

default: {



22

console.log('Action:', action);



23

console.log('Coordinate:', coordinate);



24

console.log('Text:', text);



25

return `executed ${action}`;



26

}



27

}



28

},



29



30

// map to tool result content for LLM consumption:



31

toModelOutput({ output }) {



32

return typeof output === 'string'



33

? [{ type: 'text', text: output }]



34

: [{ type: 'image', data: output.data, mediaType: 'image/png' }];



35

},



36

});
```

Parameters:

* `action` ('key' | 'type' | 'mouse\_move' | 'left\_click' | 'left\_click\_drag' | 'right\_click' | 'middle\_click' | 'double\_click' | 'screenshot' | 'cursor\_position'): The action to perform.
* `coordinate` (number[], optional): Required for `mouse_move` and `left_click_drag` actions. Specifies the (x, y) coordinates.
* `text` (string, optional): Required for `type` and `key` actions.

#### [Web Search Tool](#web-search-tool)

The Web Search Tool provides Claude with direct access to real-time web content:

```
1

const webSearchTool = vertexAnthropic.tools.webSearch_20250305({



2

maxUses: 5, // Optional: Maximum number of web searches Claude can perform



3

allowedDomains: ['example.com'], // Optional: Only search these domains



4

blockedDomains: ['spam.com'], // Optional: Never search these domains



5

userLocation: {



6

// Optional: Provide location for geographically relevant results



7

type: 'approximate',



8

city: 'San Francisco',



9

region: 'CA',



10

country: 'US',



11

timezone: 'America/Los_Angeles',



12

},



13

});
```

Parameters:

* `maxUses` (number, optional): Maximum number of web searches Claude can perform during the conversation.
* `allowedDomains` (string[], optional): Optional list of domains that Claude is allowed to search.
* `blockedDomains` (string[], optional): Optional list of domains that Claude should avoid when searching.
* `userLocation` (object, optional): Optional user location information to provide geographically relevant search results.
  + `type` ('approximate'): The type of location (must be approximate).
  + `city` (string, optional): The city name.
  + `region` (string, optional): The region or state.
  + `country` (string, optional): The country.
  + `timezone` (string, optional): The IANA timezone ID.

These tools can be used in conjunction with supported Claude models to enable more complex interactions and tasks.

### [Model Capabilities](#model-capabilities-3)

The latest Anthropic model list on Vertex AI is available [here](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude#model-list).
See also [Anthropic Model Comparison](https://docs.anthropic.com/en/docs/about-claude/models#model-comparison).

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming | Computer Use |
| --- | --- | --- | --- | --- | --- |
| `claude-3-7-sonnet@20250219` |  |  |  |  |  |
| `claude-3-5-sonnet-v2@20241022` |  |  |  |  |  |
| `claude-3-5-sonnet@20240620` |  |  |  |  |  |
| `claude-3-5-haiku@20241022` |  |  |  |  |  |
| `claude-3-sonnet@20240229` |  |  |  |  |  |
| `claude-3-haiku@20240307` |  |  |  |  |  |
| `claude-3-opus@20240229` |  |  |  |  |  |

The table above lists popular models. You can also pass any available provider
model ID as a string if needed.