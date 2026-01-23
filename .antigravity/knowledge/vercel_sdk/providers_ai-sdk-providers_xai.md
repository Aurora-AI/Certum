# https://sdk.vercel.ai/providers/ai-sdk-providers/xai

Copy markdown

[xAI Grok Provider](#xai-grok-provider)
=======================================

The [xAI Grok](https://x.ai) provider contains language model support for the [xAI API](https://x.ai/api).

[Setup](#setup)
---------------

The xAI Grok provider is available via the `@ai-sdk/xai` module. You can
install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/xai
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `xai` from `@ai-sdk/xai`:

```
1

import { xai } from '@ai-sdk/xai';
```

If you need a customized setup, you can import `createXai` from `@ai-sdk/xai`
and create a provider instance with your settings:

```
1

import { createXai } from '@ai-sdk/xai';



2



3

const xai = createXai({



4

apiKey: 'your-api-key',



5

});
```

You can use the following optional settings to customize the xAI provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.x.ai/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `XAI_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create [xAI models](https://console.x.ai) using a provider instance. The
first argument is the model id, e.g. `grok-3`.

```
1

const model = xai('grok-3');
```

By default, `xai(modelId)` uses the Chat API. To use the Responses API with server-side agentic tools, explicitly use `xai.responses(modelId)`.

### [Example](#example)

You can use xAI language models to generate text with the `generateText` function:

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: xai('grok-3'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

xAI language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

### [Provider Options](#provider-options)

xAI chat models support additional provider options that are not part of
the [standard call settings](/docs/ai-sdk-core/settings). You can pass them in the `providerOptions` argument:

```
1

const model = xai('grok-3-mini');



2



3

await generateText({



4

model,



5

providerOptions: {



6

xai: {



7

reasoningEffort: 'high',



8

},



9

},



10

});
```

The following optional provider options are available for xAI chat models:

* **reasoningEffort** *'low' | 'medium' | 'high'*

  Reasoning effort for reasoning models.
* **store** *boolean*

  Whether to store the generation. Defaults to `true`.
* **previousResponseId** *string*

  The ID of the previous response. You can use it to continue a conversation. Defaults to `undefined`.

[Responses API (Agentic Tools)](#responses-api-agentic-tools)
-------------------------------------------------------------

You can use the xAI Responses API with the `xai.responses(modelId)` factory method for server-side agentic tool calling. This enables the model to autonomously orchestrate tool calls and research on xAI's servers.

```
1

const model = xai.responses('grok-4-fast');
```

The Responses API provides server-side tools that the model can autonomously execute during its reasoning process:

* **web\_search**: Real-time web search and page browsing
* **x\_search**: Search X (Twitter) posts, users, and threads
* **code\_execution**: Execute Python code for calculations and data analysis

### [Vision](#vision)

The Responses API supports image input with vision models:

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: xai.responses('grok-2-vision-1212'),



6

messages: [



7

{



8

role: 'user',



9

content: [



10

{ type: 'text', text: 'What do you see in this image?' },



11

{ type: 'image', image: fs.readFileSync('./image.png') },



12

],



13

},



14

],



15

});
```

### [Web Search Tool](#web-search-tool)

The web search tool enables autonomous web research with optional domain filtering and image understanding:

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateText } from 'ai';



3



4

const { text, sources } = await generateText({



5

model: xai.responses('grok-4-fast'),



6

prompt: 'What are the latest developments in AI?',



7

tools: {



8

web_search: xai.tools.webSearch({



9

allowedDomains: ['arxiv.org', 'openai.com'],



10

enableImageUnderstanding: true,



11

}),



12

},



13

});



14



15

console.log(text);



16

console.log('Citations:', sources);
```

#### [Web Search Parameters](#web-search-parameters)

* **allowedDomains** *string[]*

  Only search within specified domains (max 5). Cannot be used with `excludedDomains`.
* **excludedDomains** *string[]*

  Exclude specified domains from search (max 5). Cannot be used with `allowedDomains`.
* **enableImageUnderstanding** *boolean*

  Enable the model to view and analyze images found during search. Increases token usage.

### [X Search Tool](#x-search-tool)

The X search tool enables searching X (Twitter) for posts, with filtering by handles and date ranges:

```
1

const { text, sources } = await generateText({



2

model: xai.responses('grok-4-fast'),



3

prompt: 'What are people saying about AI on X this week?',



4

tools: {



5

x_search: xai.tools.xSearch({



6

allowedXHandles: ['elonmusk', 'xai'],



7

fromDate: '2025-10-23',



8

toDate: '2025-10-30',



9

enableImageUnderstanding: true,



10

enableVideoUnderstanding: true,



11

}),



12

},



13

});
```

#### [X Search Parameters](#x-search-parameters)

* **allowedXHandles** *string[]*

  Only search posts from specified X handles (max 10). Cannot be used with `excludedXHandles`.
* **excludedXHandles** *string[]*

  Exclude posts from specified X handles (max 10). Cannot be used with `allowedXHandles`.
* **fromDate** *string*

  Start date for posts in ISO8601 format (`YYYY-MM-DD`).
* **toDate** *string*

  End date for posts in ISO8601 format (`YYYY-MM-DD`).
* **enableImageUnderstanding** *boolean*

  Enable the model to view and analyze images in X posts.
* **enableVideoUnderstanding** *boolean*

  Enable the model to view and analyze videos in X posts.

### [Code Execution Tool](#code-execution-tool)

The code execution tool enables the model to write and execute Python code for calculations and data analysis:

```
1

const { text } = await generateText({



2

model: xai.responses('grok-4-fast'),



3

prompt:



4

'Calculate the compound interest for $10,000 at 5% annually for 10 years',



5

tools: {



6

code_execution: xai.tools.codeExecution(),



7

},



8

});
```

### [File Search Tool](#file-search-tool)

xAI supports file search through OpenAI compatibility. You can use the OpenAI provider with xAI's base URL to search vector stores:

```
1

import { createOpenAI } from '@ai-sdk/openai';



2

import { streamText } from 'ai';



3



4

const openai = createOpenAI({



5

baseURL: 'https://api.x.ai/v1',



6

apiKey: process.env.XAI_API_KEY,



7

});



8



9

const result = streamText({



10

model: openai('grok-4'),



11

prompt: 'What documents do you have access to?',



12

tools: {



13

file_search: openai.tools.fileSearch({



14

vectorStoreIds: ['your-vector-store-id'],



15

maxNumResults: 5,



16

}),



17

},



18

});
```

File search requires grok-4 family models. See the [OpenAI
provider](/providers/ai-sdk-providers/openai) documentation for additional
file search options like filters and ranking.

### [Multiple Tools](#multiple-tools)

You can combine multiple server-side tools for comprehensive research:

```
1

import { xai } from '@ai-sdk/xai';



2

import { streamText } from 'ai';



3



4

const { fullStream } = streamText({



5

model: xai.responses('grok-4-fast'),



6

prompt: 'Research AI safety developments and calculate risk metrics',



7

tools: {



8

web_search: xai.tools.webSearch(),



9

x_search: xai.tools.xSearch(),



10

code_execution: xai.tools.codeExecution(),



11

},



12

});



13



14

for await (const part of fullStream) {



15

if (part.type === 'text-delta') {



16

process.stdout.write(part.text);



17

} else if (part.type === 'source' && part.sourceType === 'url') {



18

console.log('\nSource:', part.url);



19

}



20

}
```

### [Provider Options](#provider-options-1)

The Responses API supports the following provider options:

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: xai.responses('grok-4-fast'),



6

providerOptions: {



7

xai: {



8

reasoningEffort: 'high',



9

},



10

},



11

// ...



12

});
```

The following provider options are available:

* **reasoningEffort** *'low' | 'high'*

  Control the reasoning effort for the model. Higher effort may produce more thorough results at the cost of increased latency and token usage.

The Responses API only supports server-side tools. You cannot mix server-side
tools with client-side function tools in the same request.

[Live Search](#live-search)
---------------------------

xAI models support Live Search functionality, allowing them to query real-time data from various sources and include it in responses with citations.

### [Basic Search](#basic-search)

To enable search, specify `searchParameters` with a search mode:

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateText } from 'ai';



3



4

const { text, sources } = await generateText({



5

model: xai('grok-3-latest'),



6

prompt: 'What are the latest developments in AI?',



7

providerOptions: {



8

xai: {



9

searchParameters: {



10

mode: 'auto', // 'auto', 'on', or 'off'



11

returnCitations: true,



12

maxSearchResults: 5,



13

},



14

},



15

},



16

});



17



18

console.log(text);



19

console.log('Sources:', sources);
```

### [Search Parameters](#search-parameters)

The following search parameters are available:

* **mode** *'auto' | 'on' | 'off'*

  Search mode preference:

  + `'auto'` (default): Model decides whether to search
  + `'on'`: Always enables search
  + `'off'`: Disables search completely
* **returnCitations** *boolean*

  Whether to return citations in the response. Defaults to `true`.
* **fromDate** *string*

  Start date for search data in ISO8601 format (`YYYY-MM-DD`).
* **toDate** *string*

  End date for search data in ISO8601 format (`YYYY-MM-DD`).
* **maxSearchResults** *number*

  Maximum number of search results to consider. Defaults to 20, max 50.
* **sources** *Array<SearchSource>*

  Data sources to search from. Defaults to `["web", "x"]` if not specified.

### [Search Sources](#search-sources)

You can specify different types of data sources for search:

#### [Web Search](#web-search)

```
1

const result = await generateText({



2

model: xai('grok-3-latest'),



3

prompt: 'Best ski resorts in Switzerland',



4

providerOptions: {



5

xai: {



6

searchParameters: {



7

mode: 'on',



8

sources: [



9

{



10

type: 'web',



11

country: 'CH', // ISO alpha-2 country code



12

allowedWebsites: ['ski.com', 'snow-forecast.com'],



13

safeSearch: true,



14

},



15

],



16

},



17

},



18

},



19

});
```

#### [Web source parameters](#web-source-parameters)

* **country** *string*: ISO alpha-2 country code
* **allowedWebsites** *string[]*: Max 5 allowed websites
* **excludedWebsites** *string[]*: Max 5 excluded websites
* **safeSearch** *boolean*: Enable safe search (default: true)

#### [X (Twitter) Search](#x-twitter-search)

```
1

const result = await generateText({



2

model: xai('grok-3-latest'),



3

prompt: 'Latest updates on Grok AI',



4

providerOptions: {



5

xai: {



6

searchParameters: {



7

mode: 'on',



8

sources: [



9

{



10

type: 'x',



11

includedXHandles: ['grok', 'xai'],



12

excludedXHandles: ['openai'],



13

postFavoriteCount: 10,



14

postViewCount: 100,



15

},



16

],



17

},



18

},



19

},



20

});
```

#### [X source parameters](#x-source-parameters)

* **includedXHandles** *string[]*: Array of X handles to search (without @ symbol)
* **excludedXHandles** *string[]*: Array of X handles to exclude from search (without @ symbol)
* **postFavoriteCount** *number*: Minimum favorite count of the X posts to consider.
* **postViewCount** *number*: Minimum view count of the X posts to consider.

#### [News Search](#news-search)

```
1

const result = await generateText({



2

model: xai('grok-3-latest'),



3

prompt: 'Recent tech industry news',



4

providerOptions: {



5

xai: {



6

searchParameters: {



7

mode: 'on',



8

sources: [



9

{



10

type: 'news',



11

country: 'US',



12

excludedWebsites: ['tabloid.com'],



13

safeSearch: true,



14

},



15

],



16

},



17

},



18

},



19

});
```

#### [News source parameters](#news-source-parameters)

* **country** *string*: ISO alpha-2 country code
* **excludedWebsites** *string[]*: Max 5 excluded websites
* **safeSearch** *boolean*: Enable safe search (default: true)

#### [RSS Feed Search](#rss-feed-search)

```
1

const result = await generateText({



2

model: xai('grok-3-latest'),



3

prompt: 'Latest status updates',



4

providerOptions: {



5

xai: {



6

searchParameters: {



7

mode: 'on',



8

sources: [



9

{



10

type: 'rss',



11

links: ['https://status.x.ai/feed.xml'],



12

},



13

],



14

},



15

},



16

},



17

});
```

#### [RSS source parameters](#rss-source-parameters)

* **links** *string[]*: Array of RSS feed URLs (max 1 currently supported)

### [Multiple Sources](#multiple-sources)

You can combine multiple data sources in a single search:

```
1

const result = await generateText({



2

model: xai('grok-3-latest'),



3

prompt: 'Comprehensive overview of recent AI breakthroughs',



4

providerOptions: {



5

xai: {



6

searchParameters: {



7

mode: 'on',



8

returnCitations: true,



9

maxSearchResults: 15,



10

sources: [



11

{



12

type: 'web',



13

allowedWebsites: ['arxiv.org', 'openai.com'],



14

},



15

{



16

type: 'news',



17

country: 'US',



18

},



19

{



20

type: 'x',



21

includedXHandles: ['openai', 'deepmind'],



22

},



23

],



24

},



25

},



26

},



27

});
```

### [Sources and Citations](#sources-and-citations)

When search is enabled with `returnCitations: true`, the response includes sources that were used to generate the answer:

```
1

const { text, sources } = await generateText({



2

model: xai('grok-3-latest'),



3

prompt: 'What are the latest developments in AI?',



4

providerOptions: {



5

xai: {



6

searchParameters: {



7

mode: 'auto',



8

returnCitations: true,



9

},



10

},



11

},



12

});



13



14

// Access the sources used



15

for (const source of sources) {



16

if (source.sourceType === 'url') {



17

console.log('Source:', source.url);



18

}



19

}
```

### [Streaming with Search](#streaming-with-search)

Live Search works with streaming responses. Citations are included when the stream completes:

```
1

import { streamText } from 'ai';



2



3

const result = streamText({



4

model: xai('grok-3-latest'),



5

prompt: 'What has happened in tech recently?',



6

providerOptions: {



7

xai: {



8

searchParameters: {



9

mode: 'auto',



10

returnCitations: true,



11

},



12

},



13

},



14

});



15



16

for await (const textPart of result.textStream) {



17

process.stdout.write(textPart);



18

}



19



20

console.log('Sources:', await result.sources);
```

[Model Capabilities](#model-capabilities)
-----------------------------------------

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming | Reasoning |
| --- | --- | --- | --- | --- | --- |
| `grok-4-fast-non-reasoning` |  |  |  |  |  |
| `grok-4-fast-reasoning` |  |  |  |  |  |
| `grok-code-fast-1` |  |  |  |  |  |
| `grok-4` |  |  |  |  |  |
| `grok-3` |  |  |  |  |  |
| `grok-3-latest` |  |  |  |  |  |
| `grok-3-fast` |  |  |  |  |  |
| `grok-3-fast-latest` |  |  |  |  |  |
| `grok-3-mini` |  |  |  |  |  |
| `grok-3-mini-latest` |  |  |  |  |  |
| `grok-3-mini-fast` |  |  |  |  |  |
| `grok-3-mini-fast-latest` |  |  |  |  |  |
| `grok-2` |  |  |  |  |  |
| `grok-2-latest` |  |  |  |  |  |
| `grok-2-1212` |  |  |  |  |  |
| `grok-2-vision` |  |  |  |  |  |
| `grok-2-vision-latest` |  |  |  |  |  |
| `grok-2-vision-1212` |  |  |  |  |  |
| `grok-beta` |  |  |  |  |  |
| `grok-vision-beta` |  |  |  |  |  |

The table above lists popular models. Please see the [xAI
docs](https://docs.x.ai/docs#models) for a full list of available models. You
can also pass any available provider model ID as a string if needed.

[Image Models](#image-models)
-----------------------------

You can create xAI image models using the `.image()` factory method. For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: xai.image('grok-2-image'),



6

prompt: 'A futuristic cityscape at sunset',



7

});
```

The xAI image model does not currently support the `aspectRatio` or `size`
parameters. Image size defaults to 1024x768.

### [Model-specific options](#model-specific-options)

You can customize the image generation behavior with model-specific settings:

```
1

import { xai } from '@ai-sdk/xai';



2

import { generateImage } from 'ai';



3



4

const { images } = await generateImage({



5

model: xai.image('grok-2-image'),



6

prompt: 'A futuristic cityscape at sunset',



7

maxImagesPerCall: 5, // Default is 10



8

n: 2, // Generate 2 images



9

});
```

### [Model Capabilities](#model-capabilities-1)

| Model | Sizes | Notes |
| --- | --- | --- |
| `grok-2-image` | 1024x768 (default) | xAI's text-to-image generation model, designed to create high-quality images from text prompts. It's trained on a diverse dataset and can generate images across various styles, subjects, and settings. |