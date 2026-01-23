# https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic

Copy markdown

[Anthropic Provider](#anthropic-provider)
=========================================

The [Anthropic](https://www.anthropic.com/) provider contains language model support for the [Anthropic Messages API](https://docs.anthropic.com/claude/reference/messages_post).

[Setup](#setup)
---------------

The Anthropic provider is available in the `@ai-sdk/anthropic` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/anthropic
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `anthropic` from `@ai-sdk/anthropic`:

```
1

import { anthropic } from '@ai-sdk/anthropic';
```

If you need a customized setup, you can import `createAnthropic` from `@ai-sdk/anthropic` and create a provider instance with your settings:

```
1

import { createAnthropic } from '@ai-sdk/anthropic';



2



3

const anthropic = createAnthropic({



4

// custom settings



5

});
```

You can use the following optional settings to customize the Anthropic provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.anthropic.com/v1`.
* **apiKey** *string*

  API key that is being sent using the `x-api-key` header.
  It defaults to the `ANTHROPIC_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

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

import { anthropic } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: anthropic('claude-3-haiku-20240307'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Anthropic language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

The following optional provider options are available for Anthropic models:

* `disableParallelToolUse` *boolean*

  Optional. Disables the use of parallel tool calls. Defaults to `false`.

  When set to `true`, the model will only call one tool at a time instead of potentially calling multiple tools in parallel.
* `sendReasoning` *boolean*

  Optional. Include reasoning content in requests sent to the model. Defaults to `true`.

  If you are experiencing issues with the model handling requests involving
  reasoning content, you can set this to `false` to omit them from the request.
* `effort` *"high" | "medium" | "low"*

  Optional. See [Effort section](#effort) for more details.
* `thinking` *object*

  Optional. See [Reasoning section](#reasoning) for more details.
* `toolStreaming` *boolean*

  Whether to enable tool streaming (and structured output streaming). Default to `true`.
* `structuredOutputMode` *"outputFormat" | "jsonTool" | "auto"*

  Determines how structured outputs are generated. Optional.

  + `"outputFormat"`: Use the `output_format` parameter to specify the structured output format.
  + `"jsonTool"`: Use a special `"json"` tool to specify the structured output format.
  + `"auto"`: Use `"outputFormat"` when supported, otherwise fall back to `"jsonTool"` (default).

### [Structured Outputs and Tool Input Streaming](#structured-outputs-and-tool-input-streaming)

Tool call streaming is enabled by default. You can opt out by setting the
`toolStreaming` provider option to `false`.

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { streamText, tool } from 'ai';



3

import { z } from 'zod';



4



5

const result = streamText({



6

model: anthropic('claude-sonnet-4-20250514'),



7

tools: {



8

writeFile: tool({



9

description: 'Write content to a file',



10

inputSchema: z.object({



11

path: z.string(),



12

content: z.string(),



13

}),



14

execute: async ({ path, content }) => {



15

// Implementation



16

return { success: true };



17

},



18

}),



19

},



20

prompt: 'Write a short story to story.txt',



21

});
```

### [Effort](#effort)

Anthropic introduced an `effort` option with `claude-opus-4-5` that affects thinking, text responses, and function calls. Effort defaults to `high` and you can set it to `medium` or `low` to save tokens and to lower time-to-last-token latency (TTLT).

```
1

import { anthropic, AnthropicProviderOptions } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const { text, usage } = await generateText({



5

model: anthropic('claude-opus-4-20250514'),



6

prompt: 'How many people will live in the world in 2040?',



7

providerOptions: {



8

anthropic: {



9

effort: 'low',



10

} satisfies AnthropicProviderOptions,



11

},



12

});



13



14

console.log(text); // resulting text



15

console.log(usage); // token usage
```

### [Reasoning](#reasoning)

Anthropic has reasoning support for `claude-opus-4-20250514`, `claude-sonnet-4-20250514`, and `claude-3-7-sonnet-20250219` models.

You can enable it using the `thinking` provider option
and specifying a thinking budget in tokens.

```
1

import { anthropic, AnthropicProviderOptions } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const { text, reasoningText, reasoning } = await generateText({



5

model: anthropic('claude-opus-4-20250514'),



6

prompt: 'How many people will live in the world in 2040?',



7

providerOptions: {



8

anthropic: {



9

thinking: { type: 'enabled', budgetTokens: 12000 },



10

} satisfies AnthropicProviderOptions,



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

### [Context Management](#context-management)

Anthropic's Context Management feature allows you to automatically manage conversation context by clearing tool uses or thinking content when certain conditions are met. This helps optimize token usage and manage long conversations more efficiently.

You can configure context management using the `contextManagement` provider option:

```
1

import { anthropic, AnthropicProviderOptions } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: anthropic('claude-3-7-sonnet-20250219'),



6

prompt: 'Continue our conversation...',



7

providerOptions: {



8

anthropic: {



9

contextManagement: {



10

edits: [



11

{



12

type: 'clear_tool_uses_20250919',



13

trigger: { type: 'input_tokens', value: 10000 },



14

keep: { type: 'tool_uses', value: 5 },



15

clearAtLeast: { type: 'input_tokens', value: 1000 },



16

clearToolInputs: true,



17

excludeTools: ['important_tool'],



18

},



19

],



20

},



21

} satisfies AnthropicProviderOptions,



22

},



23

});



24



25

// Check what was cleared



26

console.log(result.providerMetadata?.anthropic?.contextManagement);
```

#### [Clear Tool Uses](#clear-tool-uses)

The `clear_tool_uses_20250919` edit type removes old tool calls from the conversation history:

* **trigger** - Condition that triggers the clearing (e.g., `{ type: 'input_tokens', value: 10000 }`)
* **keep** - How many recent tool uses to preserve (e.g., `{ type: 'tool_uses', value: 5 }`)
* **clearAtLeast** - Minimum amount to clear (e.g., `{ type: 'input_tokens', value: 1000 }`)
* **clearToolInputs** - Whether to clear tool input parameters (boolean)
* **excludeTools** - Array of tool names to never clear

#### [Clear Thinking](#clear-thinking)

The `clear_thinking_20251015` edit type removes thinking/reasoning content:

```
1

const result = await generateText({



2

model: anthropic('claude-opus-4-20250514'),



3

prompt: 'Continue reasoning...',



4

providerOptions: {



5

anthropic: {



6

thinking: { type: 'enabled', budgetTokens: 12000 },



7

contextManagement: {



8

edits: [



9

{



10

type: 'clear_thinking_20251015',



11

keep: { type: 'thinking_turns', value: 2 },



12

},



13

],



14

},



15

} satisfies AnthropicProviderOptions,



16

},



17

});
```

#### [Applied Edits Metadata](#applied-edits-metadata)

After generation, you can check which edits were applied in the provider metadata:

```
1

const metadata = result.providerMetadata?.anthropic?.contextManagement;



2



3

if (metadata?.appliedEdits) {



4

metadata.appliedEdits.forEach(edit => {



5

if (edit.type === 'clear_tool_uses_20250919') {



6

console.log(`Cleared ${edit.clearedToolUses} tool uses`);



7

console.log(`Freed ${edit.clearedInputTokens} tokens`);



8

} else if (edit.type === 'clear_thinking_20251015') {



9

console.log(`Cleared ${edit.clearedThinkingTurns} thinking turns`);



10

console.log(`Freed ${edit.clearedInputTokens} tokens`);



11

}



12

});



13

}
```

For more details, see [Anthropic's Context Management documentation](https://docs.anthropic.com/en/docs/build-with-claude/context-management).

### [Cache Control](#cache-control)

In the messages and message parts, you can use the `providerOptions` property to set cache control breakpoints.
You need to set the `anthropic` property in the `providerOptions` object to `{ cacheControl: { type: 'ephemeral' } }` to set a cache control breakpoint.

The cache creation input tokens are then returned in the `providerMetadata` object
for `generateText` and `generateObject`, again under the `anthropic` property.
When you use `streamText` or `streamObject`, the response contains a promise
that resolves to the metadata. Alternatively you can receive it in the
`onFinish` callback.

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const errorMessage = '... long error message ...';



5



6

const result = await generateText({



7

model: anthropic('claude-3-5-sonnet-20240620'),



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

// e.g. { cacheCreationInputTokens: 2118 }
```

You can also use cache control on system messages by providing multiple system messages at the head of your messages array:

```
1

const result = await generateText({



2

model: anthropic('claude-3-5-sonnet-20240620'),



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

Cache control for tools:

```
1

const result = await generateText({



2

model: anthropic('claude-3-5-haiku-latest'),



3

tools: {



4

cityAttractions: tool({



5

inputSchema: z.object({ city: z.string() }),



6

providerOptions: {



7

anthropic: {



8

cacheControl: { type: 'ephemeral' },



9

},



10

},



11

}),



12

},



13

messages: [



14

{



15

role: 'user',



16

content: 'User prompt',



17

},



18

],



19

});
```

#### [Longer cache TTL](#longer-cache-ttl)

Anthropic also supports a longer 1-hour cache duration.

Here's an example:

```
1

const result = await generateText({



2

model: anthropic('claude-3-5-haiku-latest'),



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

text: 'Long cached message',



10

providerOptions: {



11

anthropic: {



12

cacheControl: { type: 'ephemeral', ttl: '1h' },



13

},



14

},



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

#### [Limitations](#limitations)

The minimum cacheable prompt length is:

* 4096 tokens for Claude Opus 4.5
* 1024 tokens for Claude Opus 4.1, Claude Opus 4, Claude Sonnet 4.5, Claude Sonnet 4, Claude Sonnet 3.7, and Claude Opus 3
* 4096 tokens for Claude Haiku 4.5
* 2048 tokens for Claude Haiku 3.5 and Claude Haiku 3

Shorter prompts cannot be cached, even if marked with `cacheControl`. Any requests to cache fewer than this number of tokens will be processed without caching.

For more on prompt caching with Anthropic, see [Anthropic's Cache Control documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching).

Because the `UIMessage` type (used by AI SDK UI hooks like `useChat`) does not
support the `providerOptions` property, you can use `convertToModelMessages`
first before passing the messages to functions like `generateText` or
`streamText`. For more details on `providerOptions` usage, see
[here](/docs/foundations/prompts#provider-options).

### [Bash Tool](#bash-tool)

The Bash Tool allows running bash commands. Here's how to create and use it:

```
1

const bashTool = anthropic.tools.bash_20241022({



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

Only certain Claude versions are supported.

### [Memory Tool](#memory-tool)

The [Memory Tool](https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool) allows Claude to use a local memory, e.g. in the filesystem.
Here's how to create it:

```
1

const memory = anthropic.tools.memory_20250818({



2

execute: async action => {



3

// Implement your memory command execution logic here



4

// Return the result of the command execution



5

},



6

});
```

Only certain Claude versions are supported.

### [Text Editor Tool](#text-editor-tool)

The Text Editor Tool provides functionality for viewing and editing text files.

```
1

const tools = {



2

str_replace_based_edit_tool: anthropic.tools.textEditor_20250728({



3

maxCharacters: 10000, // optional



4

async execute({ command, path, old_str, new_str }) {



5

// ...



6

},



7

}),



8

} satisfies ToolSet;
```

Different models support different versions of the tool. For Claude Sonnet 3.5
and 3.7 you need to use older tool versions.

Parameters:

* `command` ('view' | 'create' | 'str\_replace' | 'insert' | 'undo\_edit'): The command to run. Note: `undo_edit` is only available in Claude 3.5 Sonnet and earlier models.
* `path` (string): Absolute path to file or directory, e.g. `/repo/file.py` or `/repo`.
* `file_text` (string, optional): Required for `create` command, with the content of the file to be created.
* `insert_line` (number, optional): Required for `insert` command. The line number after which to insert the new string.
* `new_str` (string, optional): New string for `str_replace` or `insert` commands.
* `old_str` (string, optional): Required for `str_replace` command, containing the string to replace.
* `view_range` (number[], optional): Optional for `view` command to specify line range to show.

### [Computer Tool](#computer-tool)

The Computer Tool enables control of keyboard and mouse actions on a computer:

```
1

const computerTool = anthropic.tools.computer_20241022({



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

These tools can be used in conjunction with the `sonnet-3-5-sonnet-20240620` model to enable more complex interactions and tasks.

### [Web Search Tool](#web-search-tool)

Anthropic provides a provider-defined web search tool that gives Claude direct access to real-time web content, allowing it to answer questions with up-to-date information beyond its knowledge cutoff.

You can enable web search using the provider-defined web search tool:

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const webSearchTool = anthropic.tools.webSearch_20250305({



5

maxUses: 5,



6

});



7



8

const result = await generateText({



9

model: anthropic('claude-opus-4-20250514'),



10

prompt: 'What are the latest developments in AI?',



11

tools: {



12

web_search: webSearchTool,



13

},



14

});
```

Web search must be enabled in your organization's [Console
settings](https://console.anthropic.com/settings/privacy).

#### [Configuration Options](#configuration-options)

The web search tool supports several configuration options:

* **maxUses** *number*

  Maximum number of web searches Claude can perform during the conversation.
* **allowedDomains** *string[]*

  Optional list of domains that Claude is allowed to search. If provided, searches will be restricted to these domains.
* **blockedDomains** *string[]*

  Optional list of domains that Claude should avoid when searching.
* **userLocation** *object*

  Optional user location information to provide geographically relevant search results.

```
1

const webSearchTool = anthropic.tools.webSearch_20250305({



2

maxUses: 3,



3

allowedDomains: ['techcrunch.com', 'wired.com'],



4

blockedDomains: ['example-spam-site.com'],



5

userLocation: {



6

type: 'approximate',



7

country: 'US',



8

region: 'California',



9

city: 'San Francisco',



10

timezone: 'America/Los_Angeles',



11

},



12

});



13



14

const result = await generateText({



15

model: anthropic('claude-opus-4-20250514'),



16

prompt: 'Find local news about technology',



17

tools: {



18

web_search: webSearchTool,



19

},



20

});
```

### [Web Fetch Tool](#web-fetch-tool)

Anthropic provides a provider-defined web fetch tool that allows Claude to retrieve content from specific URLs. This is useful when you want Claude to analyze or reference content from a particular webpage or document.

You can enable web fetch using the provider-defined web fetch tool:

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: anthropic('claude-sonnet-4-0'),



6

prompt:



7

'What is this page about? https://en.wikipedia.org/wiki/Maglemosian_culture',



8

tools: {



9

web_fetch: anthropic.tools.webFetch_20250910({ maxUses: 1 }),



10

},



11

});
```

### [Tool Search](#tool-search)

Anthropic provides provider-defined tool search tools that enable Claude to work with hundreds or thousands of tools by dynamically discovering and loading them on-demand. Instead of loading all tool definitions into the context window upfront, Claude searches your tool catalog and loads only the tools it needs.

There are two variants:

* **BM25 Search** - Uses natural language queries to find tools
* **Regex Search** - Uses regex patterns (Python `re.search()` syntax) to find tools

#### [Basic Usage](#basic-usage)

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { generateText, tool } from 'ai';



3

import { z } from 'zod';



4



5

const result = await generateText({



6

model: anthropic('claude-sonnet-4-5'),



7

prompt: 'What is the weather in San Francisco?',



8

tools: {



9

toolSearch: anthropic.tools.toolSearchBm25_20251119(),



10



11

get_weather: tool({



12

description: 'Get the current weather at a specific location',



13

inputSchema: z.object({



14

location: z.string().describe('The city and state'),



15

}),



16

execute: async ({ location }) => ({



17

location,



18

temperature: 72,



19

condition: 'Sunny',



20

}),



21

// Defer tool here - Claude discovers these via the tool search tool



22

providerOptions: {



23

anthropic: { deferLoading: true },



24

},



25

}),



26

},



27

});
```

#### [Using Regex Search](#using-regex-search)

For more precise tool matching, you can use the regex variant:

```
1

const result = await generateText({



2

model: anthropic('claude-sonnet-4-5'),



3

prompt: 'Get the weather data',



4

tools: {



5

toolSearch: anthropic.tools.toolSearchRegex_20251119(),



6

// ... deferred tools



7

},



8

});
```

Claude will construct regex patterns like `weather|temperature|forecast` to find matching tools.

### [MCP Connectors](#mcp-connectors)

Anthropic supports connecting to [MCP servers](https://docs.claude.com/en/docs/agents-and-tools/mcp-connector) as part of their execution.

You can enable this feature with the `mcpServers` provider option:

```
1

import { anthropic, AnthropicProviderOptions } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: anthropic('claude-sonnet-4-5'),



6

prompt: `Call the echo tool with "hello world". what does it respond with back?`,



7

providerOptions: {



8

anthropic: {



9

mcpServers: [



10

{



11

type: 'url',



12

name: 'echo',



13

url: 'https://echo.mcp.inevitable.fyi/mcp',



14

// optional: authorization token



15

authorizationToken: mcpAuthToken,



16

// optional: tool configuration



17

toolConfiguration: {



18

enabled: true,



19

allowedTools: ['echo'],



20

},



21

},



22

],



23

} satisfies AnthropicProviderOptions,



24

},



25

});
```

The tool calls and results are dynamic, i.e. the input and output schemas are not known.

#### [Configuration Options](#configuration-options-1)

The web fetch tool supports several configuration options:

* **maxUses** *number*

  The maxUses parameter limits the number of web fetches performed.
* **allowedDomains** *string[]*

  Only fetch from these domains.
* **blockedDomains** *string[]*

  Never fetch from these domains.
* **citations** *object*

  Unlike web search where citations are always enabled, citations are optional for web fetch. Set `"citations": {"enabled": true}` to enable Claude to cite specific passages from fetched documents.
* **maxContentTokens** *number*

  The maxContentTokens parameter limits the amount of content that will be included in the context.

#### [Error Handling](#error-handling)

Web search errors are handled differently depending on whether you're using streaming or non-streaming:

**Non-streaming (`generateText`, `generateObject`):**
Web search errors throw exceptions that you can catch:

```
1

try {



2

const result = await generateText({



3

model: anthropic('claude-opus-4-20250514'),



4

prompt: 'Search for something',



5

tools: {



6

web_search: webSearchTool,



7

},



8

});



9

} catch (error) {



10

if (error.message.includes('Web search failed')) {



11

console.log('Search error:', error.message);



12

// Handle search error appropriately



13

}



14

}
```

**Streaming (`streamText`, `streamObject`):**
Web search errors are delivered as error parts in the stream:

```
1

const result = await streamText({



2

model: anthropic('claude-opus-4-20250514'),



3

prompt: 'Search for something',



4

tools: {



5

web_search: webSearchTool,



6

},



7

});



8



9

for await (const part of result.textStream) {



10

if (part.type === 'error') {



11

console.log('Search error:', part.error);



12

// Handle search error appropriately



13

}



14

}
```

[Code Execution](#code-execution)
---------------------------------

Anthropic provides a provider-defined code execution tool that gives Claude direct access to a real Python environment allowing it to execute code to inform its responses.

You can enable code execution using the provider-defined code execution tool:

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const codeExecutionTool = anthropic.tools.codeExecution_20250825();



5



6

const result = await generateText({



7

model: anthropic('claude-opus-4-20250514'),



8

prompt:



9

'Calculate the mean and standard deviation of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',



10

tools: {



11

code_execution: codeExecutionTool,



12

},



13

});
```

#### [Error Handling](#error-handling-1)

Code execution errors are handled differently depending on whether you're using streaming or non-streaming:

**Non-streaming (`generateText`, `generateObject`):**
Code execution errors are delivered as tool result parts in the response:

```
1

const result = await generateText({



2

model: anthropic('claude-opus-4-20250514'),



3

prompt: 'Execute some Python script',



4

tools: {



5

code_execution: codeExecutionTool,



6

},



7

});



8



9

const toolErrors = result.content?.filter(



10

content => content.type === 'tool-error',



11

);



12



13

toolErrors?.forEach(error => {



14

console.error('Tool execution error:', {



15

toolName: error.toolName,



16

toolCallId: error.toolCallId,



17

error: error.error,



18

});



19

});
```

**Streaming (`streamText`, `streamObject`):**
Code execution errors are delivered as error parts in the stream:

```
1

const result = await streamText({



2

model: anthropic('claude-opus-4-20250514'),



3

prompt: 'Execute some Python script',



4

tools: {



5

code_execution: codeExecutionTool,



6

},



7

});



8

for await (const part of result.textStream) {



9

if (part.type === 'error') {



10

console.log('Code execution error:', part.error);



11

// Handle code execution error appropriately



12

}



13

}
```

### [Programmatic Tool Calling](#programmatic-tool-calling)

[Programmatic Tool Calling](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/programmatic-tool-calling) allows Claude to write code that calls your tools programmatically within a code execution container, rather than requiring round trips through the model for each tool invocation. This reduces latency for multi-tool workflows and decreases token consumption.

To enable programmatic tool calling, use the `allowedCallers` provider option on tools that you want to be callable from within code execution:

```
1

import {



2

anthropic,



3

forwardAnthropicContainerIdFromLastStep,



4

} from '@ai-sdk/anthropic';



5

import { generateText, tool, stepCountIs } from 'ai';



6

import { z } from 'zod';



7



8

const result = await generateText({



9

model: anthropic('claude-sonnet-4-5'),



10

stopWhen: stepCountIs(10),



11

prompt:



12

'Get the weather for Tokyo, Sydney, and London, then calculate the average temperature.',



13

tools: {



14

code_execution: anthropic.tools.codeExecution_20250825(),



15



16

getWeather: tool({



17

description: 'Get current weather data for a city.',



18

inputSchema: z.object({



19

city: z.string().describe('Name of the city'),



20

}),



21

execute: async ({ city }) => {



22

// Your weather API implementation



23

return { temp: 22, condition: 'Sunny' };



24

},



25

// Enable this tool to be called from within code execution



26

providerOptions: {



27

anthropic: {



28

allowedCallers: ['code_execution_20250825'],



29

},



30

},



31

}),



32

},



33



34

// Propagate container ID between steps for code execution continuity



35

prepareStep: forwardAnthropicContainerIdFromLastStep,



36

});
```

In this flow:

1. Claude writes Python code that calls your `getWeather` tool multiple times in parallel
2. The SDK automatically executes your tool and returns results to the code execution container
3. Claude processes the results in code and generates the final response

Programmatic tool calling requires `claude-sonnet-4-5` or `claude-opus-4-5`
models and uses the `code_execution_20250825` tool.

#### [Container Persistence](#container-persistence)

When using programmatic tool calling across multiple steps, you need to preserve the container ID between steps using `prepareStep`. You can use the `forwardAnthropicContainerIdFromLastStep` helper function to do this automatically. The container ID is available in `providerMetadata.anthropic.container.id` after each step completes.

[Agent Skills](#agent-skills)
-----------------------------

[Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) enable Claude to perform specialized tasks like document processing (PPTX, DOCX, PDF, XLSX) and data analysis. Skills run in a sandboxed container and require the code execution tool to be enabled.

### [Using Built-in Skills](#using-built-in-skills)

Anthropic provides several built-in skills:

* **pptx** - Create and edit PowerPoint presentations
* **docx** - Create and edit Word documents
* **pdf** - Process and analyze PDF files
* **xlsx** - Work with Excel spreadsheets

To use skills, you need to:

1. Enable the code execution tool
2. Specify the container with skills in `providerOptions`

```
1

import { anthropic, AnthropicProviderOptions } from '@ai-sdk/anthropic';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: anthropic('claude-sonnet-4-5'),



6

tools: {



7

code_execution: anthropic.tools.codeExecution_20250825(),



8

},



9

prompt: 'Create a presentation about renewable energy with 5 slides',



10

providerOptions: {



11

anthropic: {



12

container: {



13

skills: [



14

{



15

type: 'anthropic',



16

skillId: 'pptx',



17

version: 'latest', // optional



18

},



19

],



20

},



21

} satisfies AnthropicProviderOptions,



22

},



23

});
```

### [Custom Skills](#custom-skills)

You can also use custom skills by specifying `type: 'custom'`:

```
1

const result = await generateText({



2

model: anthropic('claude-sonnet-4-5'),



3

tools: {



4

code_execution: anthropic.tools.codeExecution_20250825(),



5

},



6

prompt: 'Use my custom skill to process this data',



7

providerOptions: {



8

anthropic: {



9

container: {



10

skills: [



11

{



12

type: 'custom',



13

skillId: 'my-custom-skill-id',



14

version: '1.0', // optional



15

},



16

],



17

},



18

} satisfies AnthropicProviderOptions,



19

},



20

});
```

Skills use progressive context loading and execute within a sandboxed
container with code execution capabilities.

### [PDF support](#pdf-support)

Anthropic Sonnet `claude-3-5-sonnet-20241022` supports reading PDF files.
You can pass PDF files as part of the message content using the `file` type:

Option 1: URL-based PDF document

```
1

const result = await generateText({



2

model: anthropic('claude-3-5-sonnet-20241022'),



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

text: 'What is an embedding model according to this document?',



10

},



11

{



12

type: 'file',



13

data: new URL(



14

'https://github.com/vercel/ai/blob/main/examples/ai-functions/data/ai.pdf?raw=true',



15

),



16

mimeType: 'application/pdf',



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

Option 2: Base64-encoded PDF document

```
1

const result = await generateText({



2

model: anthropic('claude-3-5-sonnet-20241022'),



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

text: 'What is an embedding model according to this document?',



10

},



11

{



12

type: 'file',



13

data: fs.readFileSync('./data/ai.pdf'),



14

mediaType: 'application/pdf',



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

The model will have access to the contents of the PDF file and
respond to questions about it.
The PDF file should be passed using the `data` field,
and the `mediaType` should be set to `'application/pdf'`.

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Computer Use | Web Search | Tool Search |
| --- | --- | --- | --- | --- | --- | --- |
| `claude-opus-4-5` |  |  |  |  |  |  |
| `claude-haiku-4-5` |  |  |  |  |  |  |
| `claude-sonnet-4-5` |  |  |  |  |  |  |
| `claude-opus-4-1` |  |  |  |  |  |  |
| `claude-opus-4-0` |  |  |  |  |  |  |
| `claude-sonnet-4-0` |  |  |  |  |  |  |
| `claude-3-7-sonnet-latest` |  |  |  |  |  |  |
| `claude-3-5-haiku-latest` |  |  |  |  |  |  |

The table above lists popular models. Please see the [Anthropic
docs](https://docs.anthropic.com/en/docs/about-claude/models) for a full list
of available models. The table above lists popular models. You can also pass
any available provider model ID as a string if needed.