# https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai

Copy markdown

[Google Generative AI Provider](#google-generative-ai-provider)
===============================================================

The [Google Generative AI](https://ai.google.dev) provider contains language and embedding model support for
the [Google Generative AI](https://ai.google.dev/api/rest) APIs.

[Setup](#setup)
---------------

The Google provider is available in the `@ai-sdk/google` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/google
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `google` from `@ai-sdk/google`:

```
1

import { google } from '@ai-sdk/google';
```

If you need a customized setup, you can import `createGoogleGenerativeAI` from `@ai-sdk/google` and create a provider instance with your settings:

```
1

import { createGoogleGenerativeAI } from '@ai-sdk/google';



2



3

const google = createGoogleGenerativeAI({



4

// custom settings



5

});
```

You can use the following optional settings to customize the Google Generative AI provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://generativelanguage.googleapis.com/v1beta`.
* **apiKey** *string*

  API key that is being sent using the `x-goog-api-key` header.
  It defaults to the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create models that call the [Google Generative AI API](https://ai.google.dev/api/rest) using the provider instance.
The first argument is the model id, e.g. `gemini-2.5-flash`.
The models support tool calls and some have multi-modal capabilities.

```
1

const model = google('gemini-2.5-flash');
```

You can use Google Generative AI language models to generate text with the `generateText` function:

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: google('gemini-2.5-flash'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Google Generative AI language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

Google Generative AI also supports some model specific settings that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them as an options argument:

```
1

const model = google('gemini-2.5-flash');



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

The following optional provider options are available for Google Generative AI models:

* **cachedContent** *string*

  Optional. The name of the cached content used as context to serve the prediction.
  Format: cachedContents/{cachedContent}
* **structuredOutputs** *boolean*

  Optional. Enable structured output. Default is true.

  This is useful when the JSON Schema contains elements that are
  not supported by the OpenAPI schema version that
  Google Generative AI uses. You can use this to disable
  structured outputs if you need to.

  See [Troubleshooting: Schema Limitations](#schema-limitations) for more details.
* **safetySettings** *Array<{ category: string; threshold: string }>*

  Optional. Safety settings for the model.

  + **category** *string*

    The category of the safety setting. Can be one of the following:

    - `HARM_CATEGORY_HATE_SPEECH`
    - `HARM_CATEGORY_DANGEROUS_CONTENT`
    - `HARM_CATEGORY_HARASSMENT`
    - `HARM_CATEGORY_SEXUALLY_EXPLICIT`
  + **threshold** *string*

    The threshold of the safety setting. Can be one of the following:

    - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`
    - `BLOCK_LOW_AND_ABOVE`
    - `BLOCK_MEDIUM_AND_ABOVE`
    - `BLOCK_ONLY_HIGH`
    - `BLOCK_NONE`
* **responseModalities** *string[]*
  The modalities to use for the response. The following modalities are supported: `TEXT`, `IMAGE`. When not defined or empty, the model defaults to returning only text.
* **thinkingConfig** *{ thinkingLevel?: 'minimal' | 'low' | 'medium' | 'high'; thinkingBudget?: number; includeThoughts?: boolean }*

  Optional. Configuration for the model's thinking process. Only supported by specific [Google Generative AI models](https://ai.google.dev/gemini-api/docs/thinking).

  + **thinkingLevel** *'minimal' | 'low' | 'medium' | 'high'*

    Optional. Controls the thinking depth for Gemini 3 models. Gemini 3 Pro supports 'low' and 'high', while Gemini 3 Flash supports all four levels: 'minimal', 'low', 'medium', and 'high'. Only supported by Gemini 3 models (`gemini-3-pro-preview` and later).
  + **thinkingBudget** *number*

    Optional. Gives the model guidance on the number of thinking tokens it can use when generating a response. Setting it to 0 disables thinking, if the model supports it.
    For more information about the possible value ranges for each model see [Google Generative AI thinking documentation](https://ai.google.dev/gemini-api/docs/thinking#set-budget).

    This option is for Gemini 2.5 models. Gemini 3 models should use
    `thinkingLevel` instead.
  + **includeThoughts** *boolean*

    Optional. If set to true, thought summaries are returned, which are synthisized versions of the model's raw thoughts and offer insights into the model's internal reasoning process.
* **imageConfig** *{ aspectRatio: string }*

  Optional. Configuration for the models image generation. Only supported by specific [Google Generative AI models](https://ai.google.dev/gemini-api/docs/image-generation).

  + **aspectRatio** *string*

  Model defaults to generate 1:1 squares, or to matching the output image size to that of your input image. Can be one of the following:

  + 1:1
  + 2:3
  + 3:2
  + 3:4
  + 4:3
  + 4:5
  + 5:4
  + 9:16
  + 16:9
  + 21:9

### [Thinking](#thinking)

The Gemini 2.5 and Gemini 3 series models use an internal "thinking process" that significantly improves their reasoning and multi-step planning abilities, making them highly effective for complex tasks such as coding, advanced mathematics, and data analysis. For more information see [Google Generative AI thinking documentation](https://ai.google.dev/gemini-api/docs/thinking).

#### [Gemini 3 Models](#gemini-3-models)

For Gemini 3 models, use the `thinkingLevel` parameter to control the depth of reasoning:

```
1

import { google, GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const model = google('gemini-3-pro-preview');



5



6

const { text, reasoning } = await generateText({



7

model: model,



8

prompt: 'What is the sum of the first 10 prime numbers?',



9

providerOptions: {



10

google: {



11

thinkingConfig: {



12

thinkingLevel: 'high',



13

includeThoughts: true,



14

},



15

} satisfies GoogleGenerativeAIProviderOptions,



16

},



17

});



18



19

console.log(text);



20



21

console.log(reasoning); // Reasoning summary
```

#### [Gemini 2.5 Models](#gemini-25-models)

For Gemini 2.5 models, use the `thinkingBudget` parameter to control the number of thinking tokens:

```
1

import { google, GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const model = google('gemini-2.5-flash');



5



6

const { text, reasoning } = await generateText({



7

model: model,



8

prompt: 'What is the sum of the first 10 prime numbers?',



9

providerOptions: {



10

google: {



11

thinkingConfig: {



12

thinkingBudget: 8192,



13

includeThoughts: true,



14

},



15

} satisfies GoogleGenerativeAIProviderOptions,



16

},



17

});



18



19

console.log(text);



20



21

console.log(reasoning); // Reasoning summary
```

### [File Inputs](#file-inputs)

The Google Generative AI provider supports file inputs, e.g. PDF files.

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: google('gemini-2.5-flash'),



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

You can also use YouTube URLs directly:

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: google('gemini-2.5-flash'),



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

text: 'Summarize this video',



13

},



14

{



15

type: 'file',



16

data: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',



17

mediaType: 'video/mp4',



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
for `https://generativelanguage.googleapis.com/v1beta/files/` and YouTube
URLs. You can use the Google Generative AI Files API to upload larger files to
that location. YouTube URLs (public or unlisted videos) are supported directly

* you can specify one YouTube video URL per request.

See [File Parts](/docs/foundations/prompts#file-parts) for details on how to use files in prompts.

### [Cached Content](#cached-content)

Google Generative AI supports both explicit and implicit caching to help reduce costs on repetitive content.

#### [Implicit Caching](#implicit-caching)

Gemini 2.5 models automatically provide cache cost savings without needing to create an explicit cache. When you send requests that share common prefixes with previous requests, you'll receive a 75% token discount on cached content.

To maximize cache hits with implicit caching:

* Keep content at the beginning of requests consistent
* Add variable content (like user questions) at the end of prompts
* Ensure requests meet minimum token requirements:
  + Gemini 2.5 Flash: 1024 tokens minimum
  + Gemini 2.5 Pro: 2048 tokens minimum

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

// Structure prompts with consistent content at the beginning



5

const baseContext =



6

'You are a cooking assistant with expertise in Italian cuisine. Here are 1000 lasagna recipes for reference...';



7



8

const { text: veggieLasagna } = await generateText({



9

model: google('gemini-2.5-pro'),



10

prompt: `${baseContext}\n\nWrite a vegetarian lasagna recipe for 4 people.`,



11

});



12



13

// Second request with same prefix - eligible for cache hit



14

const { text: meatLasagna, providerMetadata } = await generateText({



15

model: google('gemini-2.5-pro'),



16

prompt: `${baseContext}\n\nWrite a meat lasagna recipe for 12 people.`,



17

});



18



19

// Check cached token count in usage metadata



20

console.log('Cached tokens:', providerMetadata.google?.usageMetadata);



21

// e.g.



22

// {



23

//   groundingMetadata: null,



24

//   safetyRatings: null,



25

//   usageMetadata: {



26

//     cachedContentTokenCount: 2027,



27

//     thoughtsTokenCount: 702,



28

//     promptTokenCount: 2152,



29

//     candidatesTokenCount: 710,



30

//     totalTokenCount: 3564



31

//   }



32

// }
```

Usage metadata was added to `providerMetadata` in `@ai-sdk/google@1.2.23`. If
you are using an older version, usage metadata is available in the raw HTTP
`response` body returned as part of the return value from `generateText`.

#### [Explicit Caching](#explicit-caching)

For guaranteed cost savings, you can still use explicit caching with Gemini 2.5 and 2.0 models. See the [models page](https://ai.google.dev/gemini-api/docs/models) to check if caching is supported for the used model:

```
1

import { google } from '@ai-sdk/google';



2

import { GoogleAICacheManager } from '@google/generative-ai/server';



3

import { generateText } from 'ai';



4



5

const cacheManager = new GoogleAICacheManager(



6

process.env.GOOGLE_GENERATIVE_AI_API_KEY,



7

);



8



9

const model = 'gemini-2.5-pro';



10



11

const { name: cachedContent } = await cacheManager.create({



12

model,



13

contents: [



14

{



15

role: 'user',



16

parts: [{ text: '1000 Lasagna Recipes...' }],



17

},



18

],



19

ttlSeconds: 60 * 5,



20

});



21



22

const { text: veggieLasangaRecipe } = await generateText({



23

model: google(model),



24

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



25

providerOptions: {



26

google: {



27

cachedContent,



28

},



29

},



30

});



31



32

const { text: meatLasangaRecipe } = await generateText({



33

model: google(model),



34

prompt: 'Write a meat lasagna recipe for 12 people.',



35

providerOptions: {



36

google: {



37

cachedContent,



38

},



39

},



40

});
```

### [Code Execution](#code-execution)

With [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution), certain models can generate and execute Python code to perform calculations, solve problems, or provide more accurate information.

You can enable code execution by adding the `code_execution` tool to your request.

```
1

import { google } from '@ai-sdk/google';



2

import { googleTools } from '@ai-sdk/google/internal';



3

import { generateText } from 'ai';



4



5

const { text, toolCalls, toolResults } = await generateText({



6

model: google('gemini-2.5-pro'),



7

tools: { code_execution: google.tools.codeExecution({}) },



8

prompt: 'Use python to calculate the 20th fibonacci number.',



9

});
```

The response will contain the tool calls and results from the code execution.

### [Google Search](#google-search)

With [search grounding](https://ai.google.dev/gemini-api/docs/google-search),
the model has access to the latest information using Google search.
Google search can be used to provide answers around current events:

```
1

import { google } from '@ai-sdk/google';



2

import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google';



3

import { generateText } from 'ai';



4



5

const { text, sources, providerMetadata } = await generateText({



6

model: google('gemini-2.5-flash'),



7

tools: {



8

google_search: google.tools.googleSearch({}),



9

},



10

prompt:



11

'List the top 5 San Francisco news from the past week.' +



12

'You must include the date of each article.',



13

});



14



15

// access the grounding metadata. Casting to the provider metadata type



16

// is optional but provides autocomplete and type safety.



17

const metadata = providerMetadata?.google as



18

| GoogleGenerativeAIProviderMetadata



19

| undefined;



20

const groundingMetadata = metadata?.groundingMetadata;



21

const safetyRatings = metadata?.safetyRatings;
```

When Search Grounding is enabled, the model will include sources in the response.

Additionally, the grounding metadata includes detailed information about how search results were used to ground the model's response. Here are the available fields:

* **`webSearchQueries`** (`string[] | null`)

  + Array of search queries used to retrieve information
  + Example: `["What's the weather in Chicago this weekend?"]`
* **`searchEntryPoint`** (`{ renderedContent: string } | null`)

  + Contains the main search result content used as an entry point
  + The `renderedContent` field contains the formatted content
* **`groundingSupports`** (Array of support objects | null)

  + Contains details about how specific response parts are supported by search results
  + Each support object includes:
    - **`segment`**: Information about the grounded text segment
      * `text`: The actual text segment
      * `startIndex`: Starting position in the response
      * `endIndex`: Ending position in the response
    - **`groundingChunkIndices`**: References to supporting search result chunks
    - **`confidenceScores`**: Confidence scores (0-1) for each supporting chunk

Example response:

```
1

{



2

"groundingMetadata": {



3

"webSearchQueries": ["What's the weather in Chicago this weekend?"],



4

"searchEntryPoint": {



5

"renderedContent": "..."



6

},



7

"groundingSupports": [



8

{



9

"segment": {



10

"startIndex": 0,



11

"endIndex": 65,



12

"text": "Chicago weather changes rapidly, so layers let you adjust easily."



13

},



14

"groundingChunkIndices": [0],



15

"confidenceScores": [0.99]



16

}



17

]



18

}



19

}
```

### [File Search](#file-search)

The [File Search tool](https://ai.google.dev/gemini-api/docs/file-search) lets Gemini retrieve context from your own documents that you have indexed in File Search stores. Only Gemini 2.5 and Gemini 3 models support this feature.

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const { text, sources } = await generateText({



5

model: google('gemini-2.5-pro'),



6

tools: {



7

file_search: google.tools.fileSearch({



8

fileSearchStoreNames: [



9

'projects/my-project/locations/us/fileSearchStores/my-store',



10

],



11

metadataFilter: 'author = "Robert Graves"',



12

topK: 8,



13

}),



14

},



15

prompt: "Summarise the key themes of 'I, Claudius'.",



16

});
```

File Search responses include citations via the normal `sources` field and expose raw [grounding metadata](#google-search) in `providerMetadata.google.groundingMetadata`.

### [URL Context](#url-context)

Google provides a provider-defined URL context tool.

The URL context tool allows you to provide specific URLs that you want the model to analyze directly in from the prompt.

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const { text, sources, providerMetadata } = await generateText({



5

model: google('gemini-2.5-flash'),



6

prompt: `Based on the document: https://ai.google.dev/gemini-api/docs/url-context.



7

Answer this question: How many links we can consume in one request?`,



8

tools: {



9

url_context: google.tools.urlContext({}),



10

},



11

});



12



13

const metadata = providerMetadata?.google as



14

| GoogleGenerativeAIProviderMetadata



15

| undefined;



16

const groundingMetadata = metadata?.groundingMetadata;



17

const urlContextMetadata = metadata?.urlContextMetadata;
```

The URL context metadata includes detailed information about how the model used the URL context to generate the response. Here are the available fields:

* **`urlMetadata`** (`{ retrievedUrl: string; urlRetrievalStatus: string; }[] | null`)

  + Array of URL context metadata
  + Each object includes:
    - **`retrievedUrl`**: The URL of the context
    - **`urlRetrievalStatus`**: The status of the URL retrieval

Example response:

```
1

{



2

"urlMetadata": [



3

{



4

"retrievedUrl": "https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai",



5

"urlRetrievalStatus": "URL_RETRIEVAL_STATUS_SUCCESS"



6

}



7

]



8

}
```

With the URL context tool, you will also get the `groundingMetadata`.

```
1

"groundingMetadata": {



2

"groundingChunks": [



3

{



4

"web": {



5

"uri": "https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai",



6

"title": "Google Generative AI - AI SDK Providers"



7

}



8

}



9

],



10

"groundingSupports": [



11

{



12

"segment": {



13

"startIndex": 67,



14

"endIndex": 157,



15

"text": "**Installation**: Install the `@ai-sdk/google` module using your preferred package manager"



16

},



17

"groundingChunkIndices": [



18

0



19

]



20

},



21

]



22

}
```

You can add up to 20 URLs per request.

The URL context tool is only supported for Gemini 2.0 Flash models and above.
Check the [supported models for URL context
tool](https://ai.google.dev/gemini-api/docs/url-context#supported-models).

#### [Combine URL Context with Search Grounding](#combine-url-context-with-search-grounding)

You can combine the URL context tool with search grounding to provide the model with the latest information from the web.

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const { text, sources, providerMetadata } = await generateText({



5

model: google('gemini-2.5-flash'),



6

prompt: `Based on this context: https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai, tell me how to use Gemini with AI SDK.



7

Also, provide the latest news about AI SDK V5.`,



8

tools: {



9

google_search: google.tools.googleSearch({}),



10

url_context: google.tools.urlContext({}),



11

},



12

});



13



14

const metadata = providerMetadata?.google as



15

| GoogleGenerativeAIProviderMetadata



16

| undefined;



17

const groundingMetadata = metadata?.groundingMetadata;



18

const urlContextMetadata = metadata?.urlContextMetadata;
```

### [Google Maps Grounding](#google-maps-grounding)

With [Google Maps grounding](https://ai.google.dev/gemini-api/docs/maps-grounding),
the model has access to Google Maps data for location-aware responses. This enables providing local data and geospatial context, such as finding nearby restaurants.

```
1

import { google } from '@ai-sdk/google';



2

import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google';



3

import { generateText } from 'ai';



4



5

const { text, sources, providerMetadata } = await generateText({



6

model: google('gemini-2.5-flash'),



7

tools: {



8

google_maps: google.tools.googleMaps({}),



9

},



10

providerOptions: {



11

google: {



12

retrievalConfig: {



13

latLng: { latitude: 34.090199, longitude: -117.881081 },



14

},



15

},



16

},



17

prompt:



18

'What are the best Italian restaurants within a 15-minute walk from here?',



19

});



20



21

const metadata = providerMetadata?.google as



22

| GoogleGenerativeAIProviderMetadata



23

| undefined;



24

const groundingMetadata = metadata?.groundingMetadata;
```

The optional `retrievalConfig.latLng` provider option provides location context for queries about nearby places. This configuration applies to any grounding tools that support location context, including Google Maps and Google Search.

When Google Maps grounding is enabled, the model's response will include sources pointing to Google Maps URLs. The grounding metadata includes `maps` chunks with place information:

```
1

{



2

"groundingMetadata": {



3

"groundingChunks": [



4

{



5

"maps": {



6

"uri": "https://maps.google.com/?cid=12345",



7

"title": "Restaurant Name",



8

"placeId": "places/ChIJ..."



9

}



10

}



11

]



12

}



13

}
```

Google Maps grounding is supported on Gemini 2.0 and newer models.

### [RAG Engine Grounding](#rag-engine-grounding)

With [RAG Engine Grounding](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/use-vertexai-search#generate-content-using-gemini-api),
the model has access to your custom knowledge base using the Vertex RAG Engine.
This enables the model to provide answers based on your specific data sources and documents.

RAG Engine Grounding is only supported with Vertex Gemini models. You must use
the Google Vertex provider (`@ai-sdk/google-vertex`) instead of the standard
Google provider (`@ai-sdk/google`) to use this feature.

```
1

import { createVertex } from '@ai-sdk/google-vertex';



2

import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google';



3

import { generateText } from 'ai';



4



5

const vertex = createVertex({



6

project: 'my-project',



7

location: 'us-central1',



8

});



9



10

const { text, sources, providerMetadata } = await generateText({



11

model: vertex('gemini-2.5-flash'),



12

tools: {



13

vertex_rag_store: vertex.tools.vertexRagStore({



14

ragCorpus:



15

'projects/my-project/locations/us-central1/ragCorpora/my-rag-corpus',



16

topK: 5,



17

}),



18

},



19

prompt:



20

'What are the key features of our product according to our documentation?',



21

});



22



23

// access the grounding metadata. Casting to the provider metadata type



24

// is optional but provides autocomplete and type safety.



25

const metadata = providerMetadata?.google as



26

| GoogleGenerativeAIProviderMetadata



27

| undefined;



28

const groundingMetadata = metadata?.groundingMetadata;



29

const safetyRatings = metadata?.safetyRatings;
```

When RAG Engine Grounding is enabled, the model will include sources from your RAG corpus in the response.

Additionally, the grounding metadata includes detailed information about how RAG results were used to ground the model's response. Here are the available fields:

* **`groundingChunks`** (Array of chunk objects | null)

  + Contains the retrieved context chunks from your RAG corpus
  + Each chunk includes:
    - **`retrievedContext`**: Information about the retrieved context
      * `uri`: The URI or identifier of the source document
      * `title`: The title of the source document (optional)
      * `text`: The actual text content of the chunk
* **`groundingSupports`** (Array of support objects | null)

  + Contains details about how specific response parts are supported by RAG results
  + Each support object includes:
    - **`segment`**: Information about the grounded text segment
      * `text`: The actual text segment
      * `startIndex`: Starting position in the response
      * `endIndex`: Ending position in the response
    - **`groundingChunkIndices`**: References to supporting RAG result chunks
    - **`confidenceScores`**: Confidence scores (0-1) for each supporting chunk

Example response:

```
1

{



2

"groundingMetadata": {



3

"groundingChunks": [



4

{



5

"retrievedContext": {



6

"uri": "gs://my-bucket/docs/product-guide.pdf",



7

"title": "Product User Guide",



8

"text": "Our product includes advanced AI capabilities, real-time processing, and enterprise-grade security features."



9

}



10

}



11

],



12

"groundingSupports": [



13

{



14

"segment": {



15

"startIndex": 0,



16

"endIndex": 45,



17

"text": "Our product includes advanced AI capabilities and real-time processing."



18

},



19

"groundingChunkIndices": [0],



20

"confidenceScores": [0.95]



21

}



22

]



23

}



24

}
```

#### [Configuration Options](#configuration-options)

The `vertexRagStore` tool accepts the following configuration options:

* **`ragCorpus`** (`string`, required)

  + The RagCorpus resource name in the format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`
  + This identifies your specific RAG corpus to search against
* **`topK`** (`number`, optional)

  + The number of top contexts to retrieve from your RAG corpus
  + Defaults to the corpus configuration if not specified

### [Image Outputs](#image-outputs)

Gemini models with image generation capabilities (`gemini-2.5-flash-image-preview`) support image generation. Images are exposed as files in the response.

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

prompt:



7

'Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme',



8

});



9



10

for (const file of result.files) {



11

if (file.mediaType.startsWith('image/')) {



12

console.log('Generated image:', file);



13

}



14

}
```

### [Safety Ratings](#safety-ratings)

The safety ratings provide insight into the safety of the model's response.
See [Google AI documentation on safety settings](https://ai.google.dev/gemini-api/docs/safety-settings).

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

### [Troubleshooting](#troubleshooting)

#### [Schema Limitations](#schema-limitations)

The Google Generative AI API uses a subset of the OpenAPI 3.0 schema,
which does not support features such as unions.
The errors that you get in this case look like this:

`GenerateContentRequest.generation_config.response_schema.properties[occupation].type: must be specified`

By default, structured outputs are enabled (and for tool calling they are required).
You can disable structured outputs for object generation as a workaround:

```
1

const { object } = await generateObject({



2

model: google('gemini-2.5-flash'),



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

The following Zod features are known to not work with Google Generative AI:

* `z.union`
* `z.record`

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming | Google Search | URL Context |
| --- | --- | --- | --- | --- | --- | --- |
| `gemini-3-pro-preview` |  |  |  |  |  |  |
| `gemini-2.5-pro` |  |  |  |  |  |  |
| `gemini-2.5-flash` |  |  |  |  |  |  |
| `gemini-2.5-flash-lite` |  |  |  |  |  |  |
| `gemini-2.5-flash-lite-preview-06-17` |  |  |  |  |  |  |
| `gemini-2.0-flash` |  |  |  |  |  |  |
| `gemini-1.5-pro` |  |  |  |  |  |  |
| `gemini-1.5-pro-latest` |  |  |  |  |  |  |
| `gemini-1.5-flash` |  |  |  |  |  |  |
| `gemini-1.5-flash-latest` |  |  |  |  |  |  |
| `gemini-1.5-flash-8b` |  |  |  |  |  |  |
| `gemini-1.5-flash-8b-latest` |  |  |  |  |  |  |

The table above lists popular models. Please see the [Google Generative AI
docs](https://ai.google.dev/gemini-api/docs/models/) for a full list of
available models. The table above lists popular models. You can also pass any
available provider model ID as a string if needed.

[Gemma Models](#gemma-models)
-----------------------------

You can use [Gemma models](https://deepmind.google/models/gemma/) with the Google Generative AI API.

Gemma models don't natively support the `systemInstruction` parameter, but the provider automatically handles system instructions by prepending them to the first user message. This allows you to use system instructions with Gemma models seamlessly:

```
1

import { google } from '@ai-sdk/google';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: google('gemma-3-27b-it'),



6

system: 'You are a helpful assistant that responds concisely.',



7

prompt: 'What is machine learning?',



8

});
```

The system instruction is automatically formatted and included in the conversation, so Gemma models can follow the guidance without any additional configuration.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the [Google Generative AI embeddings API](https://ai.google.dev/gemini-api/docs/embeddings)
using the `.embedding()` factory method.

```
1

const model = google.embedding('gemini-embedding-001');
```

The Google Generative AI provider sends API calls to the right endpoint based on the type of embedding:

* **Single embeddings**: When embedding a single value with `embed()`, the provider uses the single `:embedContent` endpoint, which typically has higher rate limits compared to the batch endpoint.
* **Batch embeddings**: When embedding multiple values with `embedMany()` or multiple values in `embed()`, the provider uses the `:batchEmbedContents` endpoint.

Google Generative AI embedding models support aditional settings. You can pass them as an options argument:

```
1

import { google } from '@ai-sdk/google';



2

import { embed } from 'ai';



3



4

const model = google.embedding('gemini-embedding-001');



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

},



14

},



15

});
```

The following optional provider options are available for Google Generative AI embedding models:

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

### [Model Capabilities](#model-capabilities-1)

| Model | Default Dimensions | Custom Dimensions |
| --- | --- | --- |
| `gemini-embedding-001` | 3072 |  |
| `text-embedding-004` | 768 |  |

[Image Models](#image-models)
-----------------------------

You can create [Imagen](https://ai.google.dev/gemini-api/docs/imagen) models that call the Google Generative AI API using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```
1

import { google } from '@ai-sdk/google';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: google.image('imagen-4.0-generate-001'),



6

prompt: 'A futuristic cityscape at sunset',



7

aspectRatio: '16:9',



8

});
```

Further configuration can be done using Google provider options. You can validate the provider options using the `GoogleGenerativeAIImageProviderOptions` type.

```
1

import { google } from '@ai-sdk/google';



2

import { GoogleGenerativeAIImageProviderOptions } from '@ai-sdk/google';



3

import { generateImage } from 'ai';



4



5

const { image } = await generateImage({



6

model: google.image('imagen-4.0-generate-001'),



7

providerOptions: {



8

google: {



9

personGeneration: 'dont_allow',



10

} satisfies GoogleGenerativeAIImageProviderOptions,



11

},



12

// ...



13

});
```

The following provider options are available:

* **personGeneration** `allow_adult` | `allow_all` | `dont_allow`
  Whether to allow person generation. Defaults to `allow_adult`.

Imagen models do not support the `size` parameter. Use the `aspectRatio`
parameter instead.

#### [Model Capabilities](#model-capabilities-2)

| Model | Aspect Ratios |
| --- | --- |
| `imagen-4.0-generate-001` | 1:1, 3:4, 4:3, 9:16, 16:9 |