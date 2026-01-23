# https://sdk.vercel.ai/providers/ai-sdk-providers/groq

Copy markdown

[Groq Provider](#groq-provider)
===============================

The [Groq](https://groq.com/) provider contains language model support for the Groq API.

[Setup](#setup)
---------------

The Groq provider is available via the `@ai-sdk/groq` module.
You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/groq
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `groq` from `@ai-sdk/groq`:

```
1

import { groq } from '@ai-sdk/groq';
```

If you need a customized setup, you can import `createGroq` from `@ai-sdk/groq`
and create a provider instance with your settings:

```
1

import { createGroq } from '@ai-sdk/groq';



2



3

const groq = createGroq({



4

// custom settings



5

});
```

You can use the following optional settings to customize the Groq provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.groq.com/openai/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `GROQ_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create [Groq models](https://console.groq.com/docs/models) using a provider instance.
The first argument is the model id, e.g. `gemma2-9b-it`.

```
1

const model = groq('gemma2-9b-it');
```

### [Reasoning Models](#reasoning-models)

Groq offers several reasoning models such as `qwen-qwq-32b` and `deepseek-r1-distill-llama-70b`.
You can configure how the reasoning is exposed in the generated text by using the `reasoningFormat` option.
It supports the options `parsed`, `hidden`, and `raw`.

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: groq('qwen/qwen3-32b'),



6

providerOptions: {



7

groq: {



8

reasoningFormat: 'parsed',



9

reasoningEffort: 'default',



10

parallelToolCalls: true, // Enable parallel function calling (default: true)



11

user: 'user-123', // Unique identifier for end-user (optional)



12

serviceTier: 'flex', // Use flex tier for higher throughput (optional)



13

},



14

},



15

prompt: 'How many "r"s are in the word "strawberry"?',



16

});
```

The following optional provider options are available for Groq language models:

* **reasoningFormat** *'parsed' | 'raw' | 'hidden'*

  Controls how reasoning is exposed in the generated text. Only supported by reasoning models like `qwen-qwq-32b` and `deepseek-r1-distill-*` models.

  For a complete list of reasoning models and their capabilities, see [Groq's reasoning models documentation](https://console.groq.com/docs/reasoning).
* **reasoningEffort** *'low' | 'meduim' | 'high' | 'none' | 'default'*

  Controls the level of effort the model will put into reasoning.

  + `qwen/qwen3-32b`
    - Supported values:
      * `none`: Disable reasoning. The model will not use any reasoning tokens.
      * `default`: Enable reasoning.
  + `gpt-oss20b/gpt-oss120b`
    - Supported values:
      * `low`: Use a low level of reasoning effort.
      * `medium`: Use a medium level of reasoning effort.
      * `high`: Use a high level of reasoning effort.

  Defaults to `default` for `qwen/qwen3-32b.`
* **structuredOutputs** *boolean*

  Whether to use structured outputs.

  Defaults to `true`.

  When enabled, object generation will use the `json_schema` format instead of `json_object` format, providing more reliable structured outputs.
* **strictJsonSchema** *boolean*

  Whether to use strict JSON schema validation. When `true`, the model uses constrained decoding to guarantee schema compliance.

  Defaults to `true`.

  Only used when `structuredOutputs` is enabled and a schema is provided. See [Groq's Structured Outputs documentation](https://console.groq.com/docs/structured-outputs) for details on strict mode limitations.
* **parallelToolCalls** *boolean*

  Whether to enable parallel function calling during tool use. Defaults to `true`.
* **user** *string*

  A unique identifier representing your end-user, which can help with monitoring and abuse detection.
* **serviceTier** *'on\_demand' | 'flex' | 'auto'*

  Service tier for the request. Defaults to `'on_demand'`.

  + `'on_demand'`: Default tier with consistent performance and fairness
  + `'flex'`: Higher throughput tier (10x rate limits) optimized for workloads that can handle occasional request failures
  + `'auto'`: Uses on\_demand rate limits first, then falls back to flex tier if exceeded

  For more details about service tiers and their benefits, see [Groq's Flex Processing documentation](https://console.groq.com/docs/flex-processing).

Only Groq reasoning models support the `reasoningFormat` option.

#### [Structured Outputs](#structured-outputs)

Structured outputs are enabled by default for Groq models.
You can disable them by setting the `structuredOutputs` option to `false`.

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4



5

const result = await generateObject({



6

model: groq('moonshotai/kimi-k2-instruct-0905'),



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

You can disable structured outputs for models that don't support them:

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4



5

const result = await generateObject({



6

model: groq('gemma2-9b-it'),



7

providerOptions: {



8

groq: {



9

structuredOutputs: false,



10

},



11

},



12

schema: z.object({



13

recipe: z.object({



14

name: z.string(),



15

ingredients: z.array(z.string()),



16

instructions: z.array(z.string()),



17

}),



18

}),



19

prompt: 'Generate a simple pasta recipe in JSON format.',



20

});



21



22

console.log(JSON.stringify(result.object, null, 2));
```

Structured outputs are only supported by newer Groq models like
`moonshotai/kimi-k2-instruct-0905`. For unsupported models, you can disable
structured outputs by setting `structuredOutputs: false`. When disabled, Groq
uses the `json_object` format which requires the word "JSON" to be included in
your messages.

### [Example](#example)

You can use Groq language models to generate text with the `generateText` function:

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: groq('gemma2-9b-it'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

### [Image Input](#image-input)

Groq's multi-modal models like `meta-llama/llama-4-scout-17b-16e-instruct` support image inputs. You can include images in your messages using either URLs or base64-encoded data:

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),



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

{



12

type: 'image',



13

image: 'https://example.com/image.jpg',



14

},



15

],



16

},



17

],



18

});
```

You can also use base64-encoded images:

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateText } from 'ai';



3

import { readFileSync } from 'fs';



4



5

const imageData = readFileSync('path/to/image.jpg', 'base64');



6



7

const { text } = await generateText({



8

model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),



9

messages: [



10

{



11

role: 'user',



12

content: [



13

{ type: 'text', text: 'Describe this image in detail.' },



14

{



15

type: 'image',



16

image: `data:image/jpeg;base64,${imageData}`,



17

},



18

],



19

},



20

],



21

});
```

[Model Capabilities](#model-capabilities)
-----------------------------------------

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `gemma2-9b-it` |  |  |  |  |
| `llama-3.1-8b-instant` |  |  |  |  |
| `llama-3.3-70b-versatile` |  |  |  |  |
| `meta-llama/llama-guard-4-12b` |  |  |  |  |
| `deepseek-r1-distill-llama-70b` |  |  |  |  |
| `meta-llama/llama-4-maverick-17b-128e-instruct` |  |  |  |  |
| `meta-llama/llama-4-scout-17b-16e-instruct` |  |  |  |  |
| `meta-llama/llama-prompt-guard-2-22m` |  |  |  |  |
| `meta-llama/llama-prompt-guard-2-86m` |  |  |  |  |
| `moonshotai/kimi-k2-instruct-0905` |  |  |  |  |
| `qwen/qwen3-32b` |  |  |  |  |
| `llama-guard-3-8b` |  |  |  |  |
| `llama3-70b-8192` |  |  |  |  |
| `llama3-8b-8192` |  |  |  |  |
| `mixtral-8x7b-32768` |  |  |  |  |
| `qwen-qwq-32b` |  |  |  |  |
| `qwen-2.5-32b` |  |  |  |  |
| `deepseek-r1-distill-qwen-32b` |  |  |  |  |
| `openai/gpt-oss-20b` |  |  |  |  |
| `openai/gpt-oss-120b` |  |  |  |  |

The tables above list the most commonly used models. Please see the [Groq
docs](https://console.groq.com/docs/models) for a complete list of available
models. You can also pass any available provider model ID as a string if
needed.

[Browser Search Tool](#browser-search-tool)
-------------------------------------------

Groq provides a browser search tool that offers interactive web browsing capabilities. Unlike traditional web search, browser search navigates websites interactively, providing more detailed and comprehensive results.

### [Supported Models](#supported-models)

Browser search is only available for these specific models:

* `openai/gpt-oss-20b`
* `openai/gpt-oss-120b`

Browser search will only work with the supported models listed above. Using it
with other models will generate a warning and the tool will be ignored.

### [Basic Usage](#basic-usage)

```
1

import { groq } from '@ai-sdk/groq';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: groq('openai/gpt-oss-120b'), // Must use supported model



6

prompt:



7

'What are the latest developments in AI? Please search for recent news.',



8

tools: {



9

browser_search: groq.tools.browserSearch({}),



10

},



11

toolChoice: 'required', // Ensure the tool is used



12

});



13



14

console.log(result.text);
```

### [Streaming Example](#streaming-example)

```
1

import { groq } from '@ai-sdk/groq';



2

import { streamText } from 'ai';



3



4

const result = streamText({



5

model: groq('openai/gpt-oss-120b'),



6

prompt: 'Search for the latest tech news and summarize it.',



7

tools: {



8

browser_search: groq.tools.browserSearch({}),



9

},



10

toolChoice: 'required',



11

});



12



13

for await (const delta of result.fullStream) {



14

if (delta.type === 'text-delta') {



15

process.stdout.write(delta.text);



16

}



17

}
```

### [Key Features](#key-features)

* **Interactive Browsing**: Navigates websites like a human user
* **Comprehensive Results**: More detailed than traditional search snippets
* **Server-side Execution**: Runs on Groq's infrastructure, no setup required
* **Powered by Exa**: Uses Exa search engine for optimal results
* **Currently Free**: Available at no additional charge during beta

### [Best Practices](#best-practices)

* Use `toolChoice: 'required'` to ensure the browser search is activated
* Only supported on `openai/gpt-oss-20b` and `openai/gpt-oss-120b` models
* The tool works automatically - no configuration parameters needed
* Server-side execution means no additional API keys or setup required

### [Model Validation](#model-validation)

The provider automatically validates model compatibility:

```
1

// ✅ Supported - will work



2

const result = await generateText({



3

model: groq('openai/gpt-oss-120b'),



4

tools: { browser_search: groq.tools.browserSearch({}) },



5

});



6



7

// ❌ Unsupported - will show warning and ignore tool



8

const result = await generateText({



9

model: groq('gemma2-9b-it'),



10

tools: { browser_search: groq.tools.browserSearch({}) },



11

});



12

// Warning: "Browser search is only supported on models: openai/gpt-oss-20b, openai/gpt-oss-120b"
```

For more details about browser search capabilities and limitations, see the
[Groq Browser Search
Documentation](https://console.groq.com/docs/browser-search).

[Transcription Models](#transcription-models)
---------------------------------------------

You can create models that call the [Groq transcription API](https://console.groq.com/docs/speech-to-text)
using the `.transcription()` factory method.

The first argument is the model id e.g. `whisper-large-v3`.

```
1

const model = groq.transcription('whisper-large-v3');
```

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the input language in ISO-639-1 (e.g. `en`) format will improve accuracy and latency.

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { groq } from '@ai-sdk/groq';



3

import { readFile } from 'fs/promises';



4



5

const result = await transcribe({



6

model: groq.transcription('whisper-large-v3'),



7

audio: await readFile('audio.mp3'),



8

providerOptions: { groq: { language: 'en' } },



9

});
```

The following provider options are available:

* **timestampGranularities** *string[]*
  The granularity of the timestamps in the transcription.
  Defaults to `['segment']`.
  Possible values are `['word']`, `['segment']`, and `['word', 'segment']`.
  Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
  **Important:** Requires `responseFormat` to be set to `'verbose_json'`.
* **responseFormat** *string*
  The format of the response. Set to `'verbose_json'` to receive timestamps for audio segments and enable `timestampGranularities`.
  Set to `'text'` to return only the transcribed text.
  Optional.
* **language** *string*
  The language of the input audio. Supplying the input language in ISO-639-1 format (e.g. 'en') will improve accuracy and latency.
  Optional.
* **prompt** *string*
  An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.
  Optional.
* **temperature** *number*
  The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
  Defaults to 0.
  Optional.

### [Model Capabilities](#model-capabilities-1)

| Model | Transcription | Duration | Segments | Language |
| --- | --- | --- | --- | --- |
| `whisper-large-v3` |  |  |  |  |
| `whisper-large-v3-turbo` |  |  |  |  |