# https://sdk.vercel.ai/providers/ai-sdk-providers/openai

Copy markdown

[OpenAI Provider](#openai-provider)
===================================

The [OpenAI](https://openai.com/) provider contains language model support for the OpenAI responses, chat, and completion APIs, as well as embedding model support for the OpenAI embeddings API.

[Setup](#setup)
---------------

The OpenAI provider is available in the `@ai-sdk/openai` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/openai
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `openai` from `@ai-sdk/openai`:

```
1

import { openai } from '@ai-sdk/openai';
```

If you need a customized setup, you can import `createOpenAI` from `@ai-sdk/openai` and create a provider instance with your settings:

```
1

import { createOpenAI } from '@ai-sdk/openai';



2



3

const openai = createOpenAI({



4

// custom settings, e.g.



5

headers: {



6

'header-name': 'header-value',



7

},



8

});
```

You can use the following optional settings to customize the OpenAI provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.openai.com/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `OPENAI_API_KEY` environment variable.
* **name** *string*

  The provider name. You can set this when using OpenAI compatible providers
  to change the model provider property. Defaults to `openai`.
* **organization** *string*

  OpenAI Organization.
* **project** *string*

  OpenAI project.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

The OpenAI provider instance is a function that you can invoke to create a language model:

```
1

const model = openai('gpt-5');
```

It automatically selects the correct API based on the model id.
You can also pass additional settings in the second argument:

```
1

const model = openai('gpt-5', {



2

// additional settings



3

});
```

The available options depend on the API that's automatically chosen for the model (see below).
If you want to explicitly select a specific model API, you can use `.responses`, `.chat`, or `.completion`.

Since AI SDK 5, the OpenAI responses API is called by default (unless you
specify e.g. 'openai.chat')

### [Example](#example)

You can use OpenAI language models to generate text with the `generateText` function:

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: openai('gpt-5'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

OpenAI language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

### [Responses Models](#responses-models)

You can use the OpenAI responses API with the `openai(modelId)` or `openai.responses(modelId)` factory methods. It is the default API that is used by the OpenAI provider (since AI SDK 5).

```
1

const model = openai('gpt-5');
```

Further configuration can be done using OpenAI provider options.
You can validate the provider options using the `OpenAIResponsesProviderOptions` type.

```
1

import { openai, OpenAIResponsesProviderOptions } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5'), // or openai.responses('gpt-5')



6

providerOptions: {



7

openai: {



8

parallelToolCalls: false,



9

store: false,



10

user: 'user_123',



11

// ...



12

} satisfies OpenAIResponsesProviderOptions,



13

},



14

// ...



15

});
```

The following provider options are available:

* **parallelToolCalls** *boolean*
  Whether to use parallel tool calls. Defaults to `true`.
* **store** *boolean*

  Whether to store the generation. Defaults to `true`.
* **maxToolCalls** *integer*
  The maximum number of total calls to built-in tools that can be processed in a response.
  This maximum number applies across all built-in tool calls, not per individual tool.
  Any further attempts to call a tool by the model will be ignored.
* **metadata** *Record<string, string>*
  Additional metadata to store with the generation.
* **conversation** *string*
  The ID of the OpenAI Conversation to continue.
  You must create a conversation first via the [OpenAI API](https://platform.openai.com/docs/api-reference/conversations/create).
  Cannot be used in conjunction with `previousResponseId`.
  Defaults to `undefined`.
* **previousResponseId** *string*
  The ID of the previous response. You can use it to continue a conversation. Defaults to `undefined`.
* **instructions** *string*
  Instructions for the model.
  They can be used to change the system or developer message when continuing a conversation using the `previousResponseId` option.
  Defaults to `undefined`.
* **user** *string*
  A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Defaults to `undefined`.
* **reasoningEffort** *'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh'*
  Reasoning effort for reasoning models. Defaults to `medium`. If you use `providerOptions` to set the `reasoningEffort` option, this model setting will be ignored.

The 'none' type for `reasoningEffort` is only available for OpenAI's GPT-5.1
models. Also, the 'xhigh' type for `reasoningEffort` is only available for
OpenAI's GPT-5.1-Codex-Max model. Setting `reasoningEffort` to 'none' or
'xhigh' with unsupported models will result in an error.

* **reasoningSummary** *'auto' | 'detailed'*
  Controls whether the model returns its reasoning process. Set to `'auto'` for a condensed summary, `'detailed'` for more comprehensive reasoning. Defaults to `undefined` (no reasoning summaries). When enabled, reasoning summaries appear in the stream as events with type `'reasoning'` and in non-streaming responses within the `reasoning` field.
* **strictJsonSchema** *boolean*
  Whether to use strict JSON schema validation. Defaults to `true`.

OpenAI structured outputs have several
[limitations](https://openai.com/index/introducing-structured-outputs-in-the-api),
in particular around the [supported
schemas](https://platform.openai.com/docs/guides/structured-outputs/supported-schemas),
and are therefore opt-in. For example, optional schema properties are not
supported. You need to change Zod `.nullish()` and `.optional()` to
`.nullable()`.

* **serviceTier** *'auto' | 'flex' | 'priority' | 'default'*
  Service tier for the request. Set to 'flex' for 50% cheaper processing
  at the cost of increased latency (available for o3, o4-mini, and gpt-5 models).
  Set to 'priority' for faster processing with Enterprise access (available for gpt-4, gpt-5, gpt-5-mini, o3, o4-mini; gpt-5-nano is not supported).

  Defaults to 'auto'.
* **textVerbosity** *'low' | 'medium' | 'high'*
  Controls the verbosity of the model's response. Lower values result in more concise responses,
  while higher values result in more verbose responses. Defaults to `'medium'`.
* **include** *Array<string>*
  Specifies additional content to include in the response. Supported values:
  `['file_search_call.results']` for including file search results in responses.
  `['message.output_text.logprobs']` for logprobs.
  Defaults to `undefined`.
* **truncation** *string*
  The truncation strategy to use for the model response.

  + Auto: If the input to this Response exceeds the model's context window size, the model will truncate the response to fit the context window by dropping items from the beginning of the conversation.
  + disabled (default): If the input size will exceed the context window size for a model, the request will fail with a 400 error.
* **promptCacheKey** *string*
  A cache key for manual prompt caching control. Used by OpenAI to cache responses for similar requests to optimize your cache hit rates.
* **promptCacheRetention** *'in\_memory' | '24h'*
  The retention policy for the prompt cache. Set to `'24h'` to enable extended prompt caching, which keeps cached prefixes active for up to 24 hours. Defaults to `'in_memory'` for standard prompt caching. Note: `'24h'` is currently only available for the 5.1 series of models.
* **safetyIdentifier** *string*
  A stable identifier used to help detect users of your application that may be violating OpenAI's usage policies. The IDs should be a string that uniquely identifies each user.
* **systemMessageMode** *'system' | 'developer' | 'remove'*
  Controls the role of the system message when making requests. By default (when omitted), for models that support reasoning the `system` message is automatically converted to a `developer` message. Setting `systemMessageMode` to `system` passes the system message as a system-level instruction; `developer` passes it as a developer message; `remove` omits the system message from the request.
* **forceReasoning** *boolean*
  Force treating this model as a reasoning model. This is useful for "stealth" reasoning models (e.g. via a custom baseURL) where the model ID is not recognized by the SDK's allowlist. When enabled, the SDK applies reasoning-model parameter compatibility rules and defaults `systemMessageMode` to `developer` unless overridden.

The OpenAI responses provider also returns provider-specific metadata:

```
1

const { providerMetadata } = await generateText({



2

model: openai.responses('gpt-5'),



3

});



4



5

const openaiMetadata = providerMetadata?.openai;
```

The following OpenAI-specific metadata is returned:

* **responseId** *string*
  The ID of the response. Can be used to continue a conversation.
* **cachedPromptTokens** *number*
  The number of prompt tokens that were a cache hit.
* **reasoningTokens** *number*
  The number of reasoning tokens that the model generated.

#### [Reasoning Output](#reasoning-output)

For reasoning models like `gpt-5`, you can enable reasoning summaries to see the model's thought process. Different models support different summarizers—for example, `o4-mini` supports detailed summaries. Set `reasoningSummary: "auto"` to automatically receive the richest level available.

```
1

import { openai } from '@ai-sdk/openai';



2

import { streamText } from 'ai';



3



4

const result = streamText({



5

model: openai('gpt-5'),



6

prompt: 'Tell me about the Mission burrito debate in San Francisco.',



7

providerOptions: {



8

openai: {



9

reasoningSummary: 'detailed', // 'auto' for condensed or 'detailed' for comprehensive



10

},



11

},



12

});



13



14

for await (const part of result.fullStream) {



15

if (part.type === 'reasoning') {



16

console.log(`Reasoning: ${part.textDelta}`);



17

} else if (part.type === 'text-delta') {



18

process.stdout.write(part.textDelta);



19

}



20

}
```

For non-streaming calls with `generateText`, the reasoning summaries are available in the `reasoning` field of the response:

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5'),



6

prompt: 'Tell me about the Mission burrito debate in San Francisco.',



7

providerOptions: {



8

openai: {



9

reasoningSummary: 'auto',



10

},



11

},



12

});



13

console.log('Reasoning:', result.reasoning);
```

Learn more about reasoning summaries in the [OpenAI documentation](https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries).

#### [Verbosity Control](#verbosity-control)

You can control the length and detail of model responses using the `textVerbosity` parameter:

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5-mini'),



6

prompt: 'Write a poem about a boy and his first pet dog.',



7

providerOptions: {



8

openai: {



9

textVerbosity: 'low', // 'low' for concise, 'medium' (default), or 'high' for verbose



10

},



11

},



12

});
```

The `textVerbosity` parameter scales output length without changing the underlying prompt:

* `'low'`: Produces terse, minimal responses
* `'medium'`: Balanced detail (default)
* `'high'`: Verbose responses with comprehensive detail

#### [Web Search Tool](#web-search-tool)

The OpenAI responses API supports web search through the `openai.tools.webSearch` tool.

```
1

const result = await generateText({



2

model: openai('gpt-5'),



3

prompt: 'What happened in San Francisco last week?',



4

tools: {



5

web_search: openai.tools.webSearch({



6

// optional configuration:



7

externalWebAccess: true,



8

searchContextSize: 'high',



9

userLocation: {



10

type: 'approximate',



11

city: 'San Francisco',



12

region: 'California',



13

},



14

}),



15

},



16

// Force web search tool (optional):



17

toolChoice: { type: 'tool', toolName: 'web_search' },



18

});



19



20

// URL sources directly from `results`



21

const sources = result.sources;



22



23

// Or access sources from tool results



24

for (const toolResult of result.toolResults) {



25

if (toolResult.toolName === 'web_search') {



26

console.log('Query:', toolResult.output.action.query);



27

console.log('Sources:', toolResult.output.sources);



28

// `sources` is an array of object: { type: 'url', url: string }



29

}



30

}
```

For detailed information on configuration options see the [OpenAI Web Search Tool documentation](https://platform.openai.com/docs/guides/tools-web-search?api-mode=responses).

#### [File Search Tool](#file-search-tool)

The OpenAI responses API supports file search through the `openai.tools.fileSearch` tool.

You can force the use of the file search tool by setting the `toolChoice` parameter to `{ type: 'tool', toolName: 'file_search' }`.

```
1

const result = await generateText({



2

model: openai('gpt-5'),



3

prompt: 'What does the document say about user authentication?',



4

tools: {



5

file_search: openai.tools.fileSearch({



6

vectorStoreIds: ['vs_123'],



7

// configuration below is optional:



8

maxNumResults: 5,



9

filters: {



10

key: 'author',



11

type: 'eq',



12

value: 'Jane Smith',



13

},



14

ranking: {



15

ranker: 'auto',



16

scoreThreshold: 0.5,



17

},



18

}),



19

},



20

providerOptions: {



21

openai: {



22

// optional: include results



23

include: ['file_search_call.results'],



24

} satisfies OpenAIResponsesProviderOptions,



25

},



26

});
```

#### [Image Generation Tool](#image-generation-tool)

OpenAI's Responses API supports multi-modal image generation as a provider-defined tool.
Availability is restricted to specific models (for example, `gpt-5` variants).

You can use the image tool with either `generateText` or `streamText`:

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5'),



6

prompt:



7

'Generate an image of an echidna swimming across the Mozambique channel.',



8

tools: {



9

image_generation: openai.tools.imageGeneration({ outputFormat: 'webp' }),



10

},



11

});



12



13

for (const toolResult of result.staticToolResults) {



14

if (toolResult.toolName === 'image_generation') {



15

const base64Image = toolResult.output.result;



16

}



17

}
```

```
1

import { openai } from '@ai-sdk/openai';



2

import { streamText } from 'ai';



3



4

const result = streamText({



5

model: openai('gpt-5'),



6

prompt:



7

'Generate an image of an echidna swimming across the Mozambique channel.',



8

tools: {



9

image_generation: openai.tools.imageGeneration({



10

outputFormat: 'webp',



11

quality: 'low',



12

}),



13

},



14

});



15



16

for await (const part of result.fullStream) {



17

if (part.type == 'tool-result' && !part.dynamic) {



18

const base64Image = part.output.result;



19

}



20

}
```

When you set `store: false`, then previously generated images will not be
accessible by the model. We recommend using the image generation tool without
setting `store: false`.

For complete details on model availability, image quality controls, supported sizes, and tool-specific parameters,
refer to the OpenAI documentation:

* Image generation overview and models: [OpenAI Image Generation](https://platform.openai.com/docs/guides/image-generation)
* Image generation tool parameters (background, size, quality, format, etc.): [Image Generation Tool Options](https://platform.openai.com/docs/guides/tools-image-generation#tool-options)

#### [Code Interpreter Tool](#code-interpreter-tool)

The OpenAI responses API supports the code interpreter tool through the `openai.tools.codeInterpreter` tool.
This allows models to write and execute Python code.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5'),



6

prompt: 'Write and run Python code to calculate the factorial of 10',



7

tools: {



8

code_interpreter: openai.tools.codeInterpreter({



9

// optional configuration:



10

container: {



11

fileIds: ['file-123', 'file-456'], // optional file IDs to make available



12

},



13

}),



14

},



15

});
```

The code interpreter tool can be configured with:

* **container**: Either a container ID string or an object with `fileIds` to specify uploaded files that should be available to the code interpreter

When working with files generated by the Code Interpreter, reference
information can be obtained from both [annotations in Text
Parts](#typed-providermetadata-in-text-parts) and [`providerMetadata` in
Source Document Parts](#typed-providermetadata-in-source-document-parts).

#### [MCP Tool](#mcp-tool)

The OpenAI responses API supports connecting to [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers through the `openai.tools.mcp` tool. This allows models to call tools exposed by remote MCP servers or service connectors.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5'),



6

prompt: 'Search the web for the latest news about AI developments',



7

tools: {



8

mcp: openai.tools.mcp({



9

serverLabel: 'web-search',



10

serverUrl: 'https://mcp.exa.ai/mcp',



11

serverDescription: 'A web-search API for AI agents',



12

}),



13

},



14

});
```

The MCP tool can be configured with:

* **serverLabel** *string* (required)

  A label to identify the MCP server. This label is used in tool calls to distinguish between multiple MCP servers.
* **serverUrl** *string* (required if `connectorId` is not provided)

  The URL for the MCP server. Either `serverUrl` or `connectorId` must be provided.
* **connectorId** *string* (required if `serverUrl` is not provided)

  Identifier for a service connector. Either `serverUrl` or `connectorId` must be provided.
* **serverDescription** *string* (optional)

  Optional description of the MCP server that helps the model understand its purpose.
* **allowedTools** *string[] | object* (optional)

  Controls which tools from the MCP server are available. Can be:

  + An array of tool names: `['tool1', 'tool2']`
  + An object with filters:

    ```
    1

    {



    2

    readOnly: true, // Only allow read-only tools



    3

    toolNames: ['tool1', 'tool2'] // Specific tool names



    4

    }
    ```
* **authorization** *string* (optional)

  OAuth access token for authenticating with the MCP server or connector.
* **headers** *Record<string, string>* (optional)

  Optional HTTP headers to include in requests to the MCP server.
* **requireApproval** *'always' | 'never' | object* (optional)

  Controls which MCP tool calls require user approval before execution. Can be:

  + `'always'`: All MCP tool calls require approval
  + `'never'`: No MCP tool calls require approval (default)
  + An object with filters:

    ```
    1

    {



    2

    never: {



    3

    toolNames: ['safe_tool', 'another_safe_tool']; // Skip approval for these tools



    4

    }



    5

    }
    ```

  When approval is required, the model will return a `tool-approval-request` content part that you can use to prompt the user for approval. See [Human in the Loop](/cookbook/next/human-in-the-loop) for more details on implementing approval workflows.

When `requireApproval` is not set, tool calls are approved by default. Be sure
to connect to only trusted MCP servers, who you trust to share your data with.

The OpenAI MCP tool is different from the general MCP client approach
documented in [MCP Tools](/docs/ai-sdk-core/mcp-tools). The OpenAI MCP tool is
a built-in provider-defined tool that allows OpenAI models to directly connect
to MCP servers, while the general MCP client requires you to convert MCP tools
to AI SDK tools first.

#### [Local Shell Tool](#local-shell-tool)

The OpenAI responses API support the local shell tool for Codex models through the `openai.tools.localShell` tool.
Local shell is a tool that allows agents to run shell commands locally on a machine you or the user provides.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai.responses('gpt-5-codex'),



6

tools: {



7

local_shell: openai.tools.localShell({



8

execute: async ({ action }) => {



9

// ... your implementation, e.g. sandbox access ...



10

return { output: stdout };



11

},



12

}),



13

},



14

prompt: 'List the files in my home directory.',



15

stopWhen: stepCountIs(2),



16

});
```

#### [Shell Tool](#shell-tool)

The OpenAI Responses API supports the shell tool for GPT-5.1 models through the `openai.tools.shell` tool.
The shell tool allows allows running bash commands and interacting with a command line.
The model proposes shell commands; your integration executes them and returns the outputs.

Running arbitrary shell commands can be dangerous. Always sandbox execution or
add strict allow-/deny-lists before forwarding a command to the system shell.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3

import { exec } from 'child_process';



4

import { promisify } from 'util';



5



6

const execAsync = promisify(exec);



7



8

const result = await generateText({



9

model: openai('gpt-5.1'),



10

tools: {



11

shell: openai.tools.shell({



12

execute: async ({ action }) => {



13

// ... your implementation, e.g. sandbox access ...



14

return { output: results };



15

},



16

}),



17

},



18

prompt: 'List the files in the current directory and show disk usage.',



19

});
```

Your execute function must return an output array with results for each command:

* **stdout** *string* - Standard output from the command
* **stderr** *string* - Standard error from the command
* **outcome** - Either `{ type: 'timeout' }` or `{ type: 'exit', exitCode: number }`

#### [Apply Patch Tool](#apply-patch-tool)

The OpenAI Responses API supports the apply patch tool for GPT-5.1 models through the `openai.tools.applyPatch` tool.
The apply patch tool lets the model create, update, and delete files in your codebase using structured diffs.
Instead of just suggesting edits, the model emits patch operations that your application applies and reports back on,
enabling iterative, multi-step code editing workflows.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText, stepCountIs } from 'ai';



3



4

const result = await generateText({



5

model: openai('gpt-5.1'),



6

tools: {



7

apply_patch: openai.tools.applyPatch({



8

execute: async ({ callId, operation }) => {



9

// ... your implementation for applying the diffs.



10

},



11

}),



12

},



13

prompt: 'Create a python file that calculates the factorial of a number',



14

stopWhen: stepCountIs(5),



15

});
```

Your execute function must return:

* **status** *'completed' | 'failed'* - Whether the patch was applied successfully
* **output** *string* (optional) - Human-readable log text (e.g., results or error messages)

#### [Image Inputs](#image-inputs)

The OpenAI Responses API supports Image inputs for appropriate models.
You can pass Image files as part of the message content using the 'image' type:

```
1

const result = await generateText({



2

model: openai('gpt-5'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{



8

type: 'text',



9

text: 'Please describe the image.',



10

},



11

{



12

type: 'image',



13

image: readFileSync('./data/image.png'),



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

The model will have access to the image and will respond to questions about it.
The image should be passed using the `image` field.

You can also pass a file-id from the OpenAI Files API.

```
1

{



2

type: 'image',



3

image: 'file-8EFBcWHsQxZV7YGezBC1fq'



4

}
```

You can also pass the URL of an image.

```
1

{



2

type: 'image',



3

image: 'https://sample.edu/image.png',



4

}
```

#### [PDF Inputs](#pdf-inputs)

The OpenAI Responses API supports reading PDF files.
You can pass PDF files as part of the message content using the `file` type:

```
1

const result = await generateText({



2

model: openai('gpt-5'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{



8

type: 'text',



9

text: 'What is an embedding model?',



10

},



11

{



12

type: 'file',



13

data: readFileSync('./data/ai.pdf'),



14

mediaType: 'application/pdf',



15

filename: 'ai.pdf', // optional



16

},



17

],



18

},



19

],



20

});
```

You can also pass a file-id from the OpenAI Files API.

```
1

{



2

type: 'file',



3

data: 'file-8EFBcWHsQxZV7YGezBC1fq',



4

mediaType: 'application/pdf',



5

}
```

You can also pass the URL of a pdf.

```
1

{



2

type: 'file',



3

data: 'https://sample.edu/example.pdf',



4

mediaType: 'application/pdf',



5

filename: 'ai.pdf', // optional



6

}
```

The model will have access to the contents of the PDF file and
respond to questions about it.
The PDF file should be passed using the `data` field,
and the `mediaType` should be set to `'application/pdf'`.

#### [Structured Outputs](#structured-outputs)

The OpenAI Responses API supports structured outputs. You can enforce structured outputs using `generateObject` or `streamObject`, which expose a `schema` option. Additionally, you can pass a Zod or JSON Schema object to the `output` option when using `generateText` or `streamText`.

```
1

// Using generateObject



2

const result = await generateObject({



3

model: openai('gpt-4.1'),



4

schema: z.object({



5

recipe: z.object({



6

name: z.string(),



7

ingredients: z.array(



8

z.object({



9

name: z.string(),



10

amount: z.string(),



11

}),



12

),



13

steps: z.array(z.string()),



14

}),



15

}),



16

prompt: 'Generate a lasagna recipe.',



17

});



18



19

// Using generateText



20

const result = await generateText({



21

model: openai('gpt-4.1'),



22

prompt: 'How do I make a pizza?',



23

output: Output.object({



24

schema: z.object({



25

ingredients: z.array(z.string()),



26

steps: z.array(z.string()),



27

}),



28

}),



29

});
```

#### [Typed providerMetadata in Text Parts](#typed-providermetadata-in-text-parts)

When using the OpenAI Responses API, the SDK attaches OpenAI-specific metadata to output parts via `providerMetadata`.

This metadata can be used on the client side for tasks such as rendering citations or downloading files generated by the Code Interpreter.
To enable type-safe handling of this metadata, the AI SDK exports dedicated TypeScript types.

For text parts, when `part.type === 'text'`, the `providerMetadata` is provided in the form of `OpenaiResponsesTextProviderMetadata`.

This metadata includes the following fields:

* `itemId`
  The ID of the output item in the Responses API.
* `annotations` (optional)
  An array of annotation objects generated by the model.
  If no annotations are present, this property itself may be omitted (`undefined`).

  Each element in `annotations` is a discriminated union with a required `type` field. Supported types include, for example:

  + `url_citation`
  + `file_citation`
  + `container_file_citation`
  + `file_path`

  These annotations directly correspond to the annotation objects defined by the Responses API and can be used for inline reference rendering or output analysis.
  For details, see the official OpenAI documentation:
  [Responses API – output text annotations](https://platform.openai.com/docs/api-reference/responses/object?lang=javascript#responses-object-output-output_message-content-output_text-annotations).

```
1

import {



2

openai,



3

type OpenaiResponsesTextProviderMetadata,



4

} from '@ai-sdk/openai';



5

import { generateText } from 'ai';



6



7

const result = await generateText({



8

model: openai('gpt-4.1-mini'),



9

prompt:



10

'Create a program that generates five random numbers between 1 and 100 with two decimal places, and show me the execution results. Also save the result to a file.',



11

tools: {



12

code_interpreter: openai.tools.codeInterpreter(),



13

web_search: openai.tools.webSearch(),



14

file_search: openai.tools.fileSearch({ vectorStoreIds: ['vs_1234'] }), // requires a configured vector store



15

},



16

});



17



18

for (const part of result.content) {



19

if (part.type === 'text') {



20

const providerMetadata = part.providerMetadata as



21

| OpenaiResponsesTextProviderMetadata



22

| undefined;



23

if (!providerMetadata) continue;



24

const { itemId: _itemId, annotations } = providerMetadata.openai;



25



26

if (!annotations) continue;



27

for (const annotation of annotations) {



28

switch (annotation.type) {



29

case 'url_citation':



30

// url_citation is returned from web_search and provides:



31

// properties: type, url, title, start_index and end_index



32

break;



33

case 'file_citation':



34

// file_citation is returned from file_search and provides:



35

// properties: type, file_id, filename and index



36

break;



37

case 'container_file_citation':



38

// container_file_citation is returned from code_interpreter and provides:



39

// properties: type, container_id, file_id, filename, start_index and end_index



40

break;



41

case 'file_path':



42

// file_path provides:



43

// properties: type, file_id and index



44

break;



45

default: {



46

const _exhaustiveCheck: never = annotation;



47

throw new Error(



48

`Unhandled annotation: ${JSON.stringify(_exhaustiveCheck)}`,



49

);



50

}



51

}



52

}



53

}



54

}
```

When implementing file downloads for files generated by the Code Interpreter,
the `container_id` and `file_id` available in `providerMetadata` can be used
to retrieve the file content. For details, see the [Retrieve container file
content](https://platform.openai.com/docs/api-reference/container-files/retrieveContainerFileContent)
API.

#### [Typed providerMetadata in Source Document Parts](#typed-providermetadata-in-source-document-parts)

For source document parts, when `part.type === 'source'` and `sourceType === 'document'`, the `providerMetadata` is provided as `OpenaiResponsesSourceDocumentProviderMetadata`.

This metadata is also a discriminated union with a required `type` field. Supported types include:

* `file_citation`
* `container_file_citation`
* `file_path`

Each type includes the identifiers required to work with the referenced resource, such as `fileId` and `containerId`.

```
1

import {



2

openai,



3

type OpenaiResponsesSourceDocumentProviderMetadata,



4

} from '@ai-sdk/openai';



5

import { generateText } from 'ai';



6



7

const result = await generateText({



8

model: openai('gpt-4.1-mini'),



9

prompt:



10

'Create a program that generates five random numbers between 1 and 100 with two decimal places, and show me the execution results. Also save the result to a file.',



11

tools: {



12

code_interpreter: openai.tools.codeInterpreter(),



13

web_search: openai.tools.webSearch(),



14

file_search: openai.tools.fileSearch({ vectorStoreIds: ['vs_1234'] }), // requires a configured vector store



15

},



16

});



17



18

for (const part of result.content) {



19

if (part.type === 'source') {



20

if (part.sourceType === 'document') {



21

const providerMetadata = part.providerMetadata as



22

| OpenaiResponsesSourceDocumentProviderMetadata



23

| undefined;



24

if (!providerMetadata) continue;



25

const annotation = providerMetadata.openai;



26

switch (annotation.type) {



27

case 'file_citation':



28

// file_citation is returned from file_search and provides:



29

// properties: type, fileId and index



30

// The filename can be accessed via part.filename.



31

break;



32

case 'container_file_citation':



33

// container_file_citation is returned from code_interpreter and provides:



34

// properties: type, containerId and fileId



35

// The filename can be accessed via part.filename.



36

break;



37

case 'file_path':



38

// file_path provides:



39

// properties: type, fileId and index



40

break;



41

default: {



42

const _exhaustiveCheck: never = annotation;



43

throw new Error(



44

`Unhandled annotation: ${JSON.stringify(_exhaustiveCheck)}`,



45

);



46

}



47

}



48

}



49

}



50

}
```

Annotations in text parts follow the OpenAI Responses API specification and
therefore use snake\_case properties (e.g. `file_id`, `container_id`). In
contrast, `providerMetadata` for source document parts is normalized by the
SDK to camelCase (e.g. `fileId`, `containerId`). Fields that depend on the
original text content, such as `start_index` and `end_index`, are omitted, as
are fields like `filename` that are directly available on the source object.

### [Chat Models](#chat-models)

You can create models that call the [OpenAI chat API](https://platform.openai.com/docs/api-reference/chat) using the `.chat()` factory method.
The first argument is the model id, e.g. `gpt-4`.
The OpenAI chat models support tool calls and some have multi-modal capabilities.

```
1

const model = openai.chat('gpt-5');
```

OpenAI chat models support also some model specific provider options that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them in the `providerOptions` argument:

```
1

import { openai, type OpenAIChatLanguageModelOptions } from '@ai-sdk/openai';



2



3

const model = openai.chat('gpt-5');



4



5

await generateText({



6

model,



7

providerOptions: {



8

openai: {



9

logitBias: {



10

// optional likelihood for specific tokens



11

'50256': -100,



12

},



13

user: 'test-user', // optional unique user identifier



14

} satisfies OpenAIChatLanguageModelOptions,



15

},



16

});
```

The following optional provider options are available for OpenAI chat models:

* **logitBias** *Record<number, number>*

  Modifies the likelihood of specified tokens appearing in the completion.

  Accepts a JSON object that maps tokens (specified by their token ID in
  the GPT tokenizer) to an associated bias value from -100 to 100. You
  can use this tokenizer tool to convert text to token IDs. Mathematically,
  the bias is added to the logits generated by the model prior to sampling.
  The exact effect will vary per model, but values between -1 and 1 should
  decrease or increase likelihood of selection; values like -100 or 100
  should result in a ban or exclusive selection of the relevant token.

  As an example, you can pass `{"50256": -100}` to prevent the token from being generated.
* **logprobs** *boolean | number*

  Return the log probabilities of the tokens. Including logprobs will increase
  the response size and can slow down response times. However, it can
  be useful to better understand how the model is behaving.

  Setting to true will return the log probabilities of the tokens that
  were generated.

  Setting to a number will return the log probabilities of the top n
  tokens that were generated.
* **parallelToolCalls** *boolean*

  Whether to enable parallel function calling during tool use. Defaults to `true`.
* **user** *string*

  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
* **reasoningEffort** *'minimal' | 'low' | 'medium' | 'high' | 'xhigh'*

  Reasoning effort for reasoning models. Defaults to `medium`. If you use
  `providerOptions` to set the `reasoningEffort` option, this
  model setting will be ignored.
* **maxCompletionTokens** *number*

  Maximum number of completion tokens to generate. Useful for reasoning models.
* **store** *boolean*

  Whether to enable persistence in Responses API.
* **metadata** *Record<string, string>*

  Metadata to associate with the request.
* **prediction** *Record<string, any>*

  Parameters for prediction mode.
* **serviceTier** *'auto' | 'flex' | 'priority' | 'default'*

  Service tier for the request. Set to 'flex' for 50% cheaper processing
  at the cost of increased latency (available for o3, o4-mini, and gpt-5 models).
  Set to 'priority' for faster processing with Enterprise access (available for gpt-4, gpt-5, gpt-5-mini, o3, o4-mini; gpt-5-nano is not supported).

  Defaults to 'auto'.
* **strictJsonSchema** *boolean*

  Whether to use strict JSON schema validation.
  Defaults to `true`.
* **textVerbosity** *'low' | 'medium' | 'high'*

  Controls the verbosity of the model's responses. Lower values will result in more concise responses, while higher values will result in more verbose responses.
* **promptCacheKey** *string*

  A cache key for manual prompt caching control. Used by OpenAI to cache responses for similar requests to optimize your cache hit rates.
* **promptCacheRetention** *'in\_memory' | '24h'*

  The retention policy for the prompt cache. Set to `'24h'` to enable extended prompt caching, which keeps cached prefixes active for up to 24 hours. Defaults to `'in_memory'` for standard prompt caching. Note: `'24h'` is currently only available for the 5.1 series of models.
* **safetyIdentifier** *string*

  A stable identifier used to help detect users of your application that may be violating OpenAI's usage policies. The IDs should be a string that uniquely identifies each user.

#### [Reasoning](#reasoning)

OpenAI has introduced the `o1`,`o3`, and `o4` series of [reasoning models](https://platform.openai.com/docs/guides/reasoning).
Currently, `o4-mini`, `o3`, `o3-mini`, and `o1` are available via both the chat and responses APIs. The
models `codex-mini-latest` and `computer-use-preview` are available only via the [responses API](#responses-models).

Reasoning models currently only generate text, have several limitations, and are only supported using `generateText` and `streamText`.

They support additional settings and response metadata:

* You can use `providerOptions` to set

  + the `reasoningEffort` option (or alternatively the `reasoningEffort` model setting), which determines the amount of reasoning the model performs.
* You can use response `providerMetadata` to access the number of reasoning tokens that the model generated.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const { text, usage, providerMetadata } = await generateText({



5

model: openai.chat('gpt-5'),



6

prompt: 'Invent a new holiday and describe its traditions.',



7

providerOptions: {



8

openai: {



9

reasoningEffort: 'low',



10

},



11

},



12

});



13



14

console.log(text);



15

console.log('Usage:', {



16

...usage,



17

reasoningTokens: providerMetadata?.openai?.reasoningTokens,



18

});
```

System messages are automatically converted to OpenAI developer messages for
reasoning models when supported.

* You can control how system messages are handled by providerOptions `systemMessageMode`:

  + `developer`: treat the prompt as a developer message (default for reasoning models).
  + `system`: keep the system message as a system-level instruction.
  + `remove`: remove the system message from the messages.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai.chat('gpt-5'),



6

messages: [



7

{ role: 'system', content: 'You are a helpful assistant.' },



8

{ role: 'user', content: 'Tell me a joke.' },



9

],



10

providerOptions: {



11

openai: {



12

systemMessageMode: 'system',



13

},



14

},



15

});
```

Reasoning models require additional runtime inference to complete their
reasoning phase before generating a response. This introduces longer latency
compared to other models.

`maxOutputTokens` is automatically mapped to `max_completion_tokens` for
reasoning models.

#### [Strict Structured Outputs](#strict-structured-outputs)

Strict structured outputs are enabled by default.
You can disable them by setting the `strictJsonSchema` option to `false`.

```
1

import { openai, OpenAIChatLanguageModelOptions } from '@ai-sdk/openai';



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4



5

const result = await generateObject({



6

model: openai.chat('gpt-4o-2024-08-06'),



7

providerOptions: {



8

openai: {



9

strictJsonSchema: false,



10

} satisfies OpenAIChatLanguageModelOptions,



11

},



12

schemaName: 'recipe',



13

schemaDescription: 'A recipe for lasagna.',



14

schema: z.object({



15

name: z.string(),



16

ingredients: z.array(



17

z.object({



18

name: z.string(),



19

amount: z.string(),



20

}),



21

),



22

steps: z.array(z.string()),



23

}),



24

prompt: 'Generate a lasagna recipe.',



25

});



26



27

console.log(JSON.stringify(result.object, null, 2));
```

OpenAI structured outputs have several
[limitations](https://openai.com/index/introducing-structured-outputs-in-the-api),
in particular around the [supported schemas](https://platform.openai.com/docs/guides/structured-outputs/supported-schemas),
and are therefore opt-in.

For example, optional schema properties are not supported.
You need to change Zod `.nullish()` and `.optional()` to `.nullable()`.

#### [Logprobs](#logprobs)

OpenAI provides logprobs information for completion/chat models.
You can access it in the `providerMetadata` object.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai.chat('gpt-5'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

providerOptions: {



8

openai: {



9

// this can also be a number,



10

// refer to logprobs provider options section for more



11

logprobs: true,



12

},



13

},



14

});



15



16

const openaiMetadata = (await result.providerMetadata)?.openai;



17



18

const logprobs = openaiMetadata?.logprobs;
```

#### [Image Support](#image-support)

The OpenAI Chat API supports Image inputs for appropriate models.
You can pass Image files as part of the message content using the 'image' type:

```
1

const result = await generateText({



2

model: openai.chat('gpt-5'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{



8

type: 'text',



9

text: 'Please describe the image.',



10

},



11

{



12

type: 'image',



13

image: readFileSync('./data/image.png'),



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

The model will have access to the image and will respond to questions about it.
The image should be passed using the `image` field.

You can also pass the URL of an image.

```
1

{



2

type: 'image',



3

image: 'https://sample.edu/image.png',



4

}
```

#### [PDF support](#pdf-support)

The OpenAI Chat API supports reading PDF files.
You can pass PDF files as part of the message content using the `file` type:

```
1

const result = await generateText({



2

model: openai.chat('gpt-5'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{



8

type: 'text',



9

text: 'What is an embedding model?',



10

},



11

{



12

type: 'file',



13

data: readFileSync('./data/ai.pdf'),



14

mediaType: 'application/pdf',



15

filename: 'ai.pdf', // optional



16

},



17

],



18

},



19

],



20

});
```

The model will have access to the contents of the PDF file and
respond to questions about it.
The PDF file should be passed using the `data` field,
and the `mediaType` should be set to `'application/pdf'`.

You can also pass a file-id from the OpenAI Files API.

```
1

{



2

type: 'file',



3

data: 'file-8EFBcWHsQxZV7YGezBC1fq',



4

mediaType: 'application/pdf',



5

}
```

You can also pass the URL of a PDF.

```
1

{



2

type: 'file',



3

data: 'https://sample.edu/example.pdf',



4

mediaType: 'application/pdf',



5

filename: 'ai.pdf', // optional



6

}
```

#### [Predicted Outputs](#predicted-outputs)

OpenAI supports [predicted outputs](https://platform.openai.com/docs/guides/latency-optimization#use-predicted-outputs) for `gpt-4o` and `gpt-4o-mini`.
Predicted outputs help you reduce latency by allowing you to specify a base text that the model should modify.
You can enable predicted outputs by adding the `prediction` option to the `providerOptions.openai` object:

```
1

const result = streamText({



2

model: openai.chat('gpt-5'),



3

messages: [



4

{



5

role: 'user',



6

content: 'Replace the Username property with an Email property.',



7

},



8

{



9

role: 'user',



10

content: existingCode,



11

},



12

],



13

providerOptions: {



14

openai: {



15

prediction: {



16

type: 'content',



17

content: existingCode,



18

},



19

},



20

},



21

});
```

OpenAI provides usage information for predicted outputs (`acceptedPredictionTokens` and `rejectedPredictionTokens`).
You can access it in the `providerMetadata` object.

```
1

const openaiMetadata = (await result.providerMetadata)?.openai;



2



3

const acceptedPredictionTokens = openaiMetadata?.acceptedPredictionTokens;



4

const rejectedPredictionTokens = openaiMetadata?.rejectedPredictionTokens;
```

OpenAI Predicted Outputs have several
[limitations](https://platform.openai.com/docs/guides/predicted-outputs#limitations),
e.g. unsupported API parameters and no tool calling support.

#### [Image Detail](#image-detail)

You can use the `openai` provider option to set the [image input detail](https://platform.openai.com/docs/guides/images-vision?api-mode=responses#specify-image-input-detail-level) to `high`, `low`, or `auto`:

```
1

const result = await generateText({



2

model: openai.chat('gpt-5'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{ type: 'text', text: 'Describe the image in detail.' },



8

{



9

type: 'image',



10

image:



11

'https://github.com/vercel/ai/blob/main/examples/ai-functions/data/comic-cat.png?raw=true',



12



13

// OpenAI specific options - image detail:



14

providerOptions: {



15

openai: { imageDetail: 'low' },



16

},



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

Because the `UIMessage` type (used by AI SDK UI hooks like `useChat`) does not
support the `providerOptions` property, you can use `convertToModelMessages`
first before passing the messages to functions like `generateText` or
`streamText`. For more details on `providerOptions` usage, see
[here](/docs/foundations/prompts#provider-options).

#### [Distillation](#distillation)

OpenAI supports model distillation for some models.
If you want to store a generation for use in the distillation process, you can add the `store` option to the `providerOptions.openai` object.
This will save the generation to the OpenAI platform for later use in distillation.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3

import 'dotenv/config';



4



5

async function main() {



6

const { text, usage } = await generateText({



7

model: openai.chat('gpt-4o-mini'),



8

prompt: 'Who worked on the original macintosh?',



9

providerOptions: {



10

openai: {



11

store: true,



12

metadata: {



13

custom: 'value',



14

},



15

},



16

},



17

});



18



19

console.log(text);



20

console.log();



21

console.log('Usage:', usage);



22

}



23



24

main().catch(console.error);
```

#### [Prompt Caching](#prompt-caching)

OpenAI has introduced [Prompt Caching](https://platform.openai.com/docs/guides/prompt-caching) for supported models
including `gpt-4o` and `gpt-4o-mini`.

* Prompt caching is automatically enabled for these models, when the prompt is 1024 tokens or longer. It does
  not need to be explicitly enabled.
* You can use response `providerMetadata` to access the number of prompt tokens that were a cache hit.
* Note that caching behavior is dependent on load on OpenAI's infrastructure. Prompt prefixes generally remain in the
  cache following 5-10 minutes of inactivity before they are evicted, but during off-peak periods they may persist for up
  to an hour.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const { text, usage, providerMetadata } = await generateText({



5

model: openai.chat('gpt-4o-mini'),



6

prompt: `A 1024-token or longer prompt...`,



7

});



8



9

console.log(`usage:`, {



10

...usage,



11

cachedPromptTokens: providerMetadata?.openai?.cachedPromptTokens,



12

});
```

To improve cache hit rates, you can manually control caching using the `promptCacheKey` option:

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const { text, usage, providerMetadata } = await generateText({



5

model: openai.chat('gpt-5'),



6

prompt: `A 1024-token or longer prompt...`,



7

providerOptions: {



8

openai: {



9

promptCacheKey: 'my-custom-cache-key-123',



10

},



11

},



12

});



13



14

console.log(`usage:`, {



15

...usage,



16

cachedPromptTokens: providerMetadata?.openai?.cachedPromptTokens,



17

});
```

For GPT-5.1 models, you can enable extended prompt caching that keeps cached prefixes active for up to 24 hours:

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const { text, usage, providerMetadata } = await generateText({



5

model: openai.chat('gpt-5.1'),



6

prompt: `A 1024-token or longer prompt...`,



7

providerOptions: {



8

openai: {



9

promptCacheKey: 'my-custom-cache-key-123',



10

promptCacheRetention: '24h', // Extended caching for GPT-5.1



11

},



12

},



13

});



14



15

console.log(`usage:`, {



16

...usage,



17

cachedPromptTokens: providerMetadata?.openai?.cachedPromptTokens,



18

});
```

#### [Audio Input](#audio-input)

With the `gpt-4o-audio-preview` model, you can pass audio files to the model.

The `gpt-4o-audio-preview` model is currently in preview and requires at least
some audio inputs. It will not work with non-audio data.

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: openai.chat('gpt-4o-audio-preview'),



6

messages: [



7

{



8

role: 'user',



9

content: [



10

{ type: 'text', text: 'What is the audio saying?' },



11

{



12

type: 'file',



13

mediaType: 'audio/mpeg',



14

data: readFileSync('./data/galileo.mp3'),



15

},



16

],



17

},



18

],



19

});
```

### [Completion Models](#completion-models)

You can create models that call the [OpenAI completions API](https://platform.openai.com/docs/api-reference/completions) using the `.completion()` factory method.
The first argument is the model id.
Currently only `gpt-3.5-turbo-instruct` is supported.

```
1

const model = openai.completion('gpt-3.5-turbo-instruct');
```

OpenAI completion models support also some model specific settings that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them as an options argument:

```
1

const model = openai.completion('gpt-3.5-turbo-instruct');



2



3

await model.doGenerate({



4

providerOptions: {



5

openai: {



6

echo: true, // optional, echo the prompt in addition to the completion



7

logitBias: {



8

// optional likelihood for specific tokens



9

'50256': -100,



10

},



11

suffix: 'some text', // optional suffix that comes after a completion of inserted text



12

user: 'test-user', // optional unique user identifier



13

},



14

},



15

});
```

The following optional provider options are available for OpenAI completion models:

* **echo**: *boolean*

  Echo back the prompt in addition to the completion.
* **logitBias** *Record<number, number>*

  Modifies the likelihood of specified tokens appearing in the completion.

  Accepts a JSON object that maps tokens (specified by their token ID in
  the GPT tokenizer) to an associated bias value from -100 to 100. You
  can use this tokenizer tool to convert text to token IDs. Mathematically,
  the bias is added to the logits generated by the model prior to sampling.
  The exact effect will vary per model, but values between -1 and 1 should
  decrease or increase likelihood of selection; values like -100 or 100
  should result in a ban or exclusive selection of the relevant token.

  As an example, you can pass `{"50256": -100}` to prevent the <|endoftext|>
  token from being generated.
* **logprobs** *boolean | number*

  Return the log probabilities of the tokens. Including logprobs will increase
  the response size and can slow down response times. However, it can
  be useful to better understand how the model is behaving.

  Setting to true will return the log probabilities of the tokens that
  were generated.

  Setting to a number will return the log probabilities of the top n
  tokens that were generated.
* **suffix** *string*

  The suffix that comes after a completion of inserted text.
* **user** *string*

  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Audio Input | Object Generation | Tool Usage |
| --- | --- | --- | --- | --- |
| `gpt-5.2-pro` |  |  |  |  |
| `gpt-5.2-chat-latest` |  |  |  |  |
| `gpt-5.2` |  |  |  |  |
| `gpt-5.1-codex-mini` |  |  |  |  |
| `gpt-5.1-codex` |  |  |  |  |
| `gpt-5.1-chat-latest` |  |  |  |  |
| `gpt-5.1` |  |  |  |  |
| `gpt-5-pro` |  |  |  |  |
| `gpt-5` |  |  |  |  |
| `gpt-5-mini` |  |  |  |  |
| `gpt-5-nano` |  |  |  |  |
| `gpt-5-codex` |  |  |  |  |
| `gpt-5-chat-latest` |  |  |  |  |
| `gpt-4.1` |  |  |  |  |
| `gpt-4.1-mini` |  |  |  |  |
| `gpt-4.1-nano` |  |  |  |  |
| `gpt-4o` |  |  |  |  |
| `gpt-4o-mini` |  |  |  |  |

The table above lists popular models. Please see the [OpenAI
docs](https://platform.openai.com/docs/models) for a full list of available
models. The table above lists popular models. You can also pass any available
provider model ID as a string if needed.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the [OpenAI embeddings API](https://platform.openai.com/docs/api-reference/embeddings)
using the `.embedding()` factory method.

```
1

const model = openai.embedding('text-embedding-3-large');
```

OpenAI embedding models support several additional provider options.
You can pass them as an options argument:

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: openai.embedding('text-embedding-3-large'),



6

value: 'sunny day at the beach',



7

providerOptions: {



8

openai: {



9

dimensions: 512, // optional, number of dimensions for the embedding



10

user: 'test-user', // optional unique user identifier



11

},



12

},



13

});
```

The following optional provider options are available for OpenAI embedding models:

* **dimensions**: *number*

  The number of dimensions the resulting output embeddings should have.
  Only supported in text-embedding-3 and later models.
* **user** *string*

  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).

### [Model Capabilities](#model-capabilities-1)

| Model | Default Dimensions | Custom Dimensions |
| --- | --- | --- |
| `text-embedding-3-large` | 3072 |  |
| `text-embedding-3-small` | 1536 |  |
| `text-embedding-ada-002` | 1536 |  |

[Image Models](#image-models)
-----------------------------

You can create models that call the [OpenAI image generation API](https://platform.openai.com/docs/api-reference/images)
using the `.image()` factory method.

```
1

const model = openai.image('dall-e-3');
```

Dall-E models do not support the `aspectRatio` parameter. Use the `size`
parameter instead.

### [Image Editing](#image-editing)

OpenAI's `gpt-image-1` model supports powerful image editing capabilities. Pass input images via `prompt.images` to transform, combine, or edit existing images.

#### [Basic Image Editing](#basic-image-editing)

Transform an existing image using text prompts:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: openai.image('gpt-image-1'),



5

prompt: {



6

text: 'Turn the cat into a dog but retain the style of the original image',



7

images: [imageBuffer],



8

},



9

});
```

#### [Inpainting with Mask](#inpainting-with-mask)

Edit specific parts of an image using a mask. Transparent areas in the mask indicate where the image should be edited:

```
1

const image = readFileSync('./input-image.png');



2

const mask = readFileSync('./mask.png'); // Transparent areas = edit regions



3



4

const { images } = await generateImage({



5

model: openai.image('gpt-image-1'),



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

#### [Background Removal](#background-removal)

Remove the background from an image by setting `background` to `transparent`:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: openai.image('gpt-image-1'),



5

prompt: {



6

text: 'do not change anything',



7

images: [imageBuffer],



8

},



9

providerOptions: {



10

openai: {



11

background: 'transparent',



12

output_format: 'png',



13

},



14

},



15

});
```

#### [Multi-Image Combining](#multi-image-combining)

Combine multiple reference images into a single output. `gpt-image-1` supports up to 16 input images:

```
1

const cat = readFileSync('./cat.png');



2

const dog = readFileSync('./dog.png');



3

const owl = readFileSync('./owl.png');



4

const bear = readFileSync('./bear.png');



5



6

const { images } = await generateImage({



7

model: openai.image('gpt-image-1'),



8

prompt: {



9

text: 'Combine these animals into a group photo, retaining the original style',



10

images: [cat, dog, owl, bear],



11

},



12

});
```

Input images can be provided as `Buffer`, `ArrayBuffer`, `Uint8Array`, or
base64-encoded strings. For `gpt-image-1`, each image should be a `png`,
`webp`, or `jpg` file less than 50MB.

### [Model Capabilities](#model-capabilities-2)

| Model | Sizes |
| --- | --- |
| `gpt-image-1.5` | 1024x1024, 1536x1024, 1024x1536 |
| `gpt-image-1-mini` | 1024x1024, 1536x1024, 1024x1536 |
| `gpt-image-1` | 1024x1024, 1536x1024, 1024x1536 |
| `dall-e-3` | 1024x1024, 1792x1024, 1024x1792 |
| `dall-e-2` | 256x256, 512x512, 1024x1024 |

You can pass optional `providerOptions` to the image model. These are prone to change by OpenAI and are model dependent. For example, the `gpt-image-1` model supports the `quality` option:

```
1

const { image, providerMetadata } = await generateImage({



2

model: openai.image('gpt-image-1.5'),



3

prompt: 'A salamander at sunrise in a forest pond in the Seychelles.',



4

providerOptions: {



5

openai: { quality: 'high' },



6

},



7

});
```

For more on `generateImage()` see [Image Generation](/docs/ai-sdk-core/image-generation).

OpenAI's image models return additional metadata in the response that can be
accessed via `providerMetadata.openai`. The following OpenAI-specific metadata
is available:

* **images** *Array<object>*

  Array of image-specific metadata. Each image object may contain:

  + `revisedPrompt` *string* - The revised prompt that was actually used to generate the image (OpenAI may modify your prompt for safety or clarity)
  + `created` *number* - The Unix timestamp (in seconds) of when the image was created
  + `size` *string* - The size of the generated image. One of `1024x1024`, `1024x1536`, or `1536x1024`
  + `quality` *string* - The quality of the generated image. One of `low`, `medium`, or `high`
  + `background` *string* - The background parameter used for the image generation. Either `transparent` or `opaque`
  + `outputFormat` *string* - The output format of the generated image. One of `png`, `webp`, or `jpeg`

For more information on the available OpenAI image model options, see the [OpenAI API reference](https://platform.openai.com/docs/api-reference/images/create).

[Transcription Models](#transcription-models)
---------------------------------------------

You can create models that call the [OpenAI transcription API](https://platform.openai.com/docs/api-reference/audio/transcribe)
using the `.transcription()` factory method.

The first argument is the model id e.g. `whisper-1`.

```
1

const model = openai.transcription('whisper-1');
```

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the input language in ISO-639-1 (e.g. `en`) format will improve accuracy and latency.

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const result = await transcribe({



5

model: openai.transcription('whisper-1'),



6

audio: new Uint8Array([1, 2, 3, 4]),



7

providerOptions: { openai: { language: 'en' } },



8

});
```

To get word-level timestamps, specify the granularity:

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const result = await transcribe({



5

model: openai.transcription('whisper-1'),



6

audio: new Uint8Array([1, 2, 3, 4]),



7

providerOptions: {



8

openai: {



9

//timestampGranularities: ['word'],



10

timestampGranularities: ['segment'],



11

},



12

},



13

});



14



15

// Access word-level timestamps



16

console.log(result.segments); // Array of segments with startSecond/endSecond
```

The following provider options are available:

* **timestampGranularities** *string[]*
  The granularity of the timestamps in the transcription.
  Defaults to `['segment']`.
  Possible values are `['word']`, `['segment']`, and `['word', 'segment']`.
  Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
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
* **include** *string[]*
  Additional information to include in the transcription response.

### [Model Capabilities](#model-capabilities-3)

| Model | Transcription | Duration | Segments | Language |
| --- | --- | --- | --- | --- |
| `whisper-1` |  |  |  |  |
| `gpt-4o-mini-transcribe` |  |  |  |  |
| `gpt-4o-transcribe` |  |  |  |  |

[Speech Models](#speech-models)
-------------------------------

You can create models that call the [OpenAI speech API](https://platform.openai.com/docs/api-reference/audio/speech)
using the `.speech()` factory method.

The first argument is the model id e.g. `tts-1`.

```
1

const model = openai.speech('tts-1');
```

The `voice` argument can be set to one of OpenAI's available voices: `alloy`, `ash`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, or `shimmer`.

```
1

import { experimental_generateSpeech as generateSpeech } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const result = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

voice: 'alloy', // OpenAI voice ID



8

});
```

You can also pass additional provider-specific options using the `providerOptions` argument:

```
1

import { experimental_generateSpeech as generateSpeech } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const result = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

voice: 'alloy',



8

providerOptions: {



9

openai: {



10

speed: 1.2,



11

},



12

},



13

});
```

* **instructions** *string*
  Control the voice of your generated audio with additional instructions e.g. "Speak in a slow and steady tone".
  Does not work with `tts-1` or `tts-1-hd`.
  Optional.
* **response\_format** *string*
  The format to audio in.
  Supported formats are `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`.
  Defaults to `mp3`.
  Optional.
* **speed** *number*
  The speed of the generated audio.
  Select a value from 0.25 to 4.0.
  Defaults to 1.0.
  Optional.

### [Model Capabilities](#model-capabilities-4)

| Model | Instructions |
| --- | --- |
| `tts-1` |  |
| `tts-1-hd` |  |
| `gpt-4o-mini-tts` |  |