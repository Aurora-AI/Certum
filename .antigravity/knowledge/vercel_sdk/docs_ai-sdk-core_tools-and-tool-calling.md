# https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling

Copy markdown

[Tool Calling](#tool-calling)
=============================

As covered under Foundations, [tools](/docs/foundations/tools) are objects that can be called by the model to perform a specific task.
AI SDK Core tools contain several core elements:

* **`description`**: An optional description of the tool that can influence when the tool is picked.
* **`inputSchema`**: A [Zod schema](/docs/foundations/tools#schemas) or a [JSON schema](/docs/reference/ai-sdk-core/json-schema) that defines the input parameters. The schema is consumed by the LLM, and also used to validate the LLM tool calls.
* **`execute`**: An optional async function that is called with the inputs from the tool call. It produces a value of type `RESULT` (generic type). It is optional because you might want to forward tool calls to the client or to a queue instead of executing them in the same process.
* **`strict`**: *(optional, boolean)* Enables strict tool calling when supported by the provider

You can use the [`tool`](/docs/reference/ai-sdk-core/tool) helper function to
infer the types of the `execute` parameters.

The `tools` parameter of `generateText` and `streamText` is an object that has the tool names as keys and the tools as values:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { z } from 'zod';



2

import { generateText, tool, stepCountIs } from 'ai';



3



4

const result = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: {



7

weather: tool({



8

description: 'Get the weather in a location',



9

inputSchema: z.object({



10

location: z.string().describe('The location to get the weather for'),



11

}),



12

execute: async ({ location }) => ({



13

location,



14

temperature: 72 + Math.floor(Math.random() * 21) - 10,



15

}),



16

}),



17

},



18

stopWhen: stepCountIs(5),



19

prompt: 'What is the weather in San Francisco?',



20

});
```

When a model uses a tool, it is called a "tool call" and the output of the
tool is called a "tool result".

Tool calling is not restricted to only text generation.
You can also use it to render user interfaces (Generative UI).

[Strict Mode](#strict-mode)
---------------------------

When enabled, language model providers that support strict tool calling will only generate tool calls that are valid according to your defined `inputSchema`.
This increases the reliability of tool calling.
However, not all schemas may be supported in strict mode, and what is supported depends on the specific provider.

By default, strict mode is disabled. You can enable it per-tool by setting `strict: true`:

```
1

tool({



2

description: 'Get the weather in a location',



3

inputSchema: z.object({



4

location: z.string(),



5

}),



6

strict: true, // Enable strict validation for this tool



7

execute: async ({ location }) => ({



8

// ...



9

}),



10

});
```

Not all providers or models support strict mode. For those that do not, this
option is ignored.

[Input Examples](#input-examples)
---------------------------------

You can specify example inputs for your tools to help guide the model on how input data should be structured.
When supported by providers, input examples can help when JSON schema itself does not fully specify the intended
usage or when there are optional values.

```
1

tool({



2

description: 'Get the weather in a location',



3

inputSchema: z.object({



4

location: z.string().describe('The location to get the weather for'),



5

}),



6

inputExamples: [



7

{ input: { location: 'San Francisco' } },



8

{ input: { location: 'London' } },



9

],



10

execute: async ({ location }) => {



11

// ...



12

},



13

});
```

Only the Anthropic providers supports tool input examples natively. Other
providers ignore the setting.

[Tool Execution Approval](#tool-execution-approval)
---------------------------------------------------

By default, tools with an `execute` function run automatically as the model calls them. You can require approval before execution by setting `needsApproval`:

```
1

import { tool } from 'ai';



2

import { z } from 'zod';



3



4

const runCommand = tool({



5

description: 'Run a shell command',



6

inputSchema: z.object({



7

command: z.string().describe('The shell command to execute'),



8

}),



9

needsApproval: true,



10

execute: async ({ command }) => {



11

// your command execution logic here



12

},



13

});
```

This is useful for tools that perform sensitive operations like executing commands, processing payments, modifying data, and more potentially dangerous actions.

### [How It Works](#how-it-works)

When a tool requires approval, `generateText` and `streamText` don't pause execution. Instead, they complete and return `tool-approval-request` parts in the result content. This means the approval flow requires two calls to the model: the first returns the approval request, and the second (after receiving the approval response) either executes the tool or informs the model that approval was denied.

Here's the complete flow:

1. Call `generateText` with a tool that has `needsApproval: true`
2. Model generates a tool call
3. `generateText` returns with `tool-approval-request` parts in `result.content`
4. Your app requests an approval and collects the user's decision
5. Add a `tool-approval-response` to the messages array
6. Call `generateText` again with the updated messages
7. If approved, the tool runs and returns a result. If denied, the model sees the denial and responds accordingly.

### [Handling Approval Requests](#handling-approval-requests)

After calling `generateText` or `streamText`, check `result.content` for `tool-approval-request` parts:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { type ModelMessage, generateText } from 'ai';



2



3

const messages: ModelMessage[] = [



4

{ role: 'user', content: 'Remove the most recent file' },



5

];



6

const result = await generateText({



7

model: "anthropic/claude-sonnet-4.5",



8

tools: { runCommand },



9

messages,



10

});



11



12

messages.push(...result.response.messages);



13



14

for (const part of result.content) {



15

if (part.type === 'tool-approval-request') {



16

console.log(part.approvalId); // Unique ID for this approval request



17

console.log(part.toolCall); // Contains toolName, input, etc.



18

}



19

}
```

To respond, create a `tool-approval-response` and add it to your messages:

```
1

import { type ToolApprovalResponse } from 'ai';



2



3

const approvals: ToolApprovalResponse[] = [];



4



5

for (const part of result.content) {



6

if (part.type === 'tool-approval-request') {



7

const response: ToolApprovalResponse = {



8

type: 'tool-approval-response',



9

approvalId: part.approvalId,



10

approved: true, // or false to deny



11

reason: 'User confirmed the command', // Optional context for the model



12

};



13

approvals.push(response);



14

}



15

}



16



17

// add approvals to messages



18

messages.push({ role: 'tool', content: approvals });
```

Then call `generateText` again with the updated messages. If approved, the tool executes. If denied, the model receives the denial and can respond accordingly.

When a tool execution is denied, consider adding a system instruction like
"When a tool execution is not approved, do not retry it" to prevent the model
from attempting the same call again.

### [Dynamic Approval](#dynamic-approval)

You can make approval decisions based on tool input by providing an async function:

```
1

const paymentTool = tool({



2

description: 'Process a payment',



3

inputSchema: z.object({



4

amount: z.number(),



5

recipient: z.string(),



6

}),



7

needsApproval: async ({ amount }) => amount > 1000,



8

execute: async ({ amount, recipient }) => {



9

return await processPayment(amount, recipient);



10

},



11

});
```

In this example, only transactions over $1000 require approval. Smaller transactions execute automatically.

### [Tool Execution Approval with useChat](#tool-execution-approval-with-usechat)

When using `useChat`, the approval flow is handled through UI state. See [Chatbot Tool Usage](/docs/ai-sdk-ui/chatbot-tool-usage#tool-execution-approval) for details on handling approvals in your UI with `addToolApprovalResponse`.

[Multi-Step Calls (using stopWhen)](#multi-step-calls-using-stopwhen)
---------------------------------------------------------------------

With the `stopWhen` setting, you can enable multi-step calls in `generateText` and `streamText`. When `stopWhen` is set and the model generates a tool call, the AI SDK will trigger a new generation passing in the tool result until there are no further tool calls or the stopping condition is met.

The `stopWhen` conditions are only evaluated when the last step contains tool
results.

By default, when you use `generateText` or `streamText`, it triggers a single generation. This works well for many use cases where you can rely on the model's training data to generate a response. However, when you provide tools, the model now has the choice to either generate a normal text response, or generate a tool call. If the model generates a tool call, its generation is complete and that step is finished.

You may want the model to generate text after the tool has been executed, either to summarize the tool results in the context of the users query. In many cases, you may also want the model to use multiple tools in a single response. This is where multi-step calls come in.

You can think of multi-step calls in a similar way to a conversation with a human. When you ask a question, if the person does not have the requisite knowledge in their common knowledge (a model's training data), the person may need to look up information (use a tool) before they can provide you with an answer. In the same way, the model may need to call a tool to get the information it needs to answer your question where each generation (tool call or text generation) is a step.

### [Example](#example)

In the following example, there are two steps:

1. **Step 1**
   1. The prompt `'What is the weather in San Francisco?'` is sent to the model.
   2. The model generates a tool call.
   3. The tool call is executed.
2. **Step 2**
   1. The tool result is sent to the model.
   2. The model generates a response considering the tool result.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { z } from 'zod';



2

import { generateText, tool, stepCountIs } from 'ai';



3



4

const { text, steps } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: {



7

weather: tool({



8

description: 'Get the weather in a location',



9

inputSchema: z.object({



10

location: z.string().describe('The location to get the weather for'),



11

}),



12

execute: async ({ location }) => ({



13

location,



14

temperature: 72 + Math.floor(Math.random() * 21) - 10,



15

}),



16

}),



17

},



18

stopWhen: stepCountIs(5), // stop after a maximum of 5 steps if tools were called



19

prompt: 'What is the weather in San Francisco?',



20

});
```

You can use `streamText` in a similar way.

### [Steps](#steps)

To access intermediate tool calls and results, you can use the `steps` property in the result object
or the `streamText` `onFinish` callback.
It contains all the text, tool calls, tool results, and more from each step.

#### [Example: Extract tool results from all steps](#example-extract-tool-results-from-all-steps)

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText } from 'ai';



2



3

const { steps } = await generateText({



4

model: "anthropic/claude-sonnet-4.5",



5

stopWhen: stepCountIs(10),



6

// ...



7

});



8



9

// extract all tool calls from the steps:



10

const allToolCalls = steps.flatMap(step => step.toolCalls);
```

### [`onStepFinish` callback](#onstepfinish-callback)

When using `generateText` or `streamText`, you can provide an `onStepFinish` callback that
is triggered when a step is finished,
i.e. all text deltas, tool calls, and tool results for the step are available.
When you have multiple steps, the callback is triggered for each step.

```
1

import { generateText } from 'ai';



2



3

const result = await generateText({



4

// ...



5

onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {



6

// your own logic, e.g. for saving the chat history or recording usage



7

},



8

});
```

### [`prepareStep` callback](#preparestep-callback)

The `prepareStep` callback is called before a step is started.

It is called with the following parameters:

* `model`: The model that was passed into `generateText`.
* `stopWhen`: The stopping condition that was passed into `generateText`.
* `stepNumber`: The number of the step that is being executed.
* `steps`: The steps that have been executed so far.
* `messages`: The messages that will be sent to the model for the current step.
* `experimental_context`: The context passed via the `experimental_context` setting (experimental).

You can use it to provide different settings for a step, including modifying the input messages.

```
1

import { generateText } from 'ai';



2



3

const result = await generateText({



4

// ...



5

prepareStep: async ({ model, stepNumber, steps, messages }) => {



6

if (stepNumber === 0) {



7

return {



8

// use a different model for this step:



9

model: modelForThisParticularStep,



10

// force a tool choice for this step:



11

toolChoice: { type: 'tool', toolName: 'tool1' },



12

// limit the tools that are available for this step:



13

activeTools: ['tool1'],



14

};



15

}



16



17

// when nothing is returned, the default settings are used



18

},



19

});
```

#### [Message Modification for Longer Agentic Loops](#message-modification-for-longer-agentic-loops)

In longer agentic loops, you can use the `messages` parameter to modify the input messages for each step. This is particularly useful for prompt compression:

```
1

prepareStep: async ({ stepNumber, steps, messages }) => {



2

// Compress conversation history for longer loops



3

if (messages.length > 20) {



4

return {



5

messages: messages.slice(-10),



6

};



7

}



8



9

return {};



10

},
```

#### [Provider Options for Step Configuration](#provider-options-for-step-configuration)

You can use `providerOptions` in `prepareStep` to pass provider-specific configuration for each step. This is useful for features like Anthropic's code execution container persistence:

```
1

import { forwardAnthropicContainerIdFromLastStep } from '@ai-sdk/anthropic';



2



3

// Propagate container ID from previous step for code execution continuity



4

prepareStep: forwardAnthropicContainerIdFromLastStep,
```

[Response Messages](#response-messages)
---------------------------------------

Adding the generated assistant and tool messages to your conversation history is a common task,
especially if you are using multi-step tool calls.

Both `generateText` and `streamText` have a `response.messages` property that you can use to
add the assistant and tool messages to your conversation history.
It is also available in the `onFinish` callback of `streamText`.

The `response.messages` property contains an array of `ModelMessage` objects that you can add to your conversation history:

```
1

import { generateText, ModelMessage } from 'ai';



2



3

const messages: ModelMessage[] = [



4

// ...



5

];



6



7

const { response } = await generateText({



8

// ...



9

messages,



10

});



11



12

// add the response messages to your conversation history:



13

messages.push(...response.messages); // streamText: ...((await response).messages)
```

[Dynamic Tools](#dynamic-tools)
-------------------------------

AI SDK Core supports dynamic tools for scenarios where tool schemas are not known at compile time. This is useful for:

* MCP (Model Context Protocol) tools without schemas
* User-defined functions at runtime
* Tools loaded from external sources

### [Using dynamicTool](#using-dynamictool)

The `dynamicTool` helper creates tools with unknown input/output types:

```
1

import { dynamicTool } from 'ai';



2

import { z } from 'zod';



3



4

const customTool = dynamicTool({



5

description: 'Execute a custom function',



6

inputSchema: z.object({}),



7

execute: async input => {



8

// input is typed as 'unknown'



9

// You need to validate/cast it at runtime



10

const { action, parameters } = input as any;



11



12

// Execute your dynamic logic



13

return { result: `Executed ${action}` };



14

},



15

});
```

### [Type-Safe Handling](#type-safe-handling)

When using both static and dynamic tools, use the `dynamic` flag for type narrowing:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const result = await generateText({



2

model: "anthropic/claude-sonnet-4.5",



3

tools: {



4

// Static tool with known types



5

weather: weatherTool,



6

// Dynamic tool



7

custom: dynamicTool({



8

/* ... */



9

}),



10

},



11

onStepFinish: ({ toolCalls, toolResults }) => {



12

// Type-safe iteration



13

for (const toolCall of toolCalls) {



14

if (toolCall.dynamic) {



15

// Dynamic tool: input is 'unknown'



16

console.log('Dynamic:', toolCall.toolName, toolCall.input);



17

continue;



18

}



19



20

// Static tool: full type inference



21

switch (toolCall.toolName) {



22

case 'weather':



23

console.log(toolCall.input.location); // typed as string



24

break;



25

}



26

}



27

},



28

});
```

[Preliminary Tool Results](#preliminary-tool-results)
-----------------------------------------------------

You can return an `AsyncIterable` over multiple results.
In this case, the last value from the iterable is the final tool result.

This can be used in combination with generator functions to e.g. stream status information
during the tool execution:

```
1

tool({



2

description: 'Get the current weather.',



3

inputSchema: z.object({



4

location: z.string(),



5

}),



6

async *execute({ location }) {



7

yield {



8

status: 'loading' as const,



9

text: `Getting weather for ${location}`,



10

weather: undefined,



11

};



12



13

await new Promise(resolve => setTimeout(resolve, 3000));



14



15

const temperature = 72 + Math.floor(Math.random() * 21) - 10;



16



17

yield {



18

status: 'success' as const,



19

text: `The weather in ${location} is ${temperature}°F`,



20

temperature,



21

};



22

},



23

});
```

[Tool Choice](#tool-choice)
---------------------------

You can use the `toolChoice` setting to influence when a tool is selected.
It supports the following settings:

* `auto` (default): the model can choose whether and which tools to call.
* `required`: the model must call a tool. It can choose which tool to call.
* `none`: the model must not call tools
* `{ type: 'tool', toolName: string (typed) }`: the model must call the specified tool

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { z } from 'zod';



2

import { generateText, tool } from 'ai';



3



4

const result = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: {



7

weather: tool({



8

description: 'Get the weather in a location',



9

inputSchema: z.object({



10

location: z.string().describe('The location to get the weather for'),



11

}),



12

execute: async ({ location }) => ({



13

location,



14

temperature: 72 + Math.floor(Math.random() * 21) - 10,



15

}),



16

}),



17

},



18

toolChoice: 'required', // force the model to call a tool



19

prompt: 'What is the weather in San Francisco?',



20

});
```

[Tool Execution Options](#tool-execution-options)
-------------------------------------------------

When tools are called, they receive additional options as a second parameter.

### [Tool Call ID](#tool-call-id)

The ID of the tool call is forwarded to the tool execution.
You can use it e.g. when sending tool-call related information with stream data.

```
1

import {



2

streamText,



3

tool,



4

createUIMessageStream,



5

createUIMessageStreamResponse,



6

} from 'ai';



7



8

export async function POST(req: Request) {



9

const { messages } = await req.json();



10



11

const stream = createUIMessageStream({



12

execute: ({ writer }) => {



13

const result = streamText({



14

// ...



15

messages,



16

tools: {



17

myTool: tool({



18

// ...



19

execute: async (args, { toolCallId }) => {



20

// return e.g. custom status for tool call



21

writer.write({



22

type: 'data-tool-status',



23

id: toolCallId,



24

data: {



25

name: 'myTool',



26

status: 'in-progress',



27

},



28

});



29

// ...



30

},



31

}),



32

},



33

});



34



35

writer.merge(result.toUIMessageStream());



36

},



37

});



38



39

return createUIMessageStreamResponse({ stream });



40

}
```

### [Messages](#messages)

The messages that were sent to the language model to initiate the response that contained the tool call are forwarded to the tool execution.
You can access them in the second parameter of the `execute` function.
In multi-step calls, the messages contain the text, tool calls, and tool results from all previous steps.

```
1

import { generateText, tool } from 'ai';



2



3

const result = await generateText({



4

// ...



5

tools: {



6

myTool: tool({



7

// ...



8

execute: async (args, { messages }) => {



9

// use the message history in e.g. calls to other language models



10

return { ... };



11

},



12

}),



13

},



14

});
```

### [Abort Signals](#abort-signals)

The abort signals from `generateText` and `streamText` are forwarded to the tool execution.
You can access them in the second parameter of the `execute` function and e.g. abort long-running computations or forward them to fetch calls inside tools.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { z } from 'zod';



2

import { generateText, tool } from 'ai';



3



4

const result = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

abortSignal: myAbortSignal, // signal that will be forwarded to tools



7

tools: {



8

weather: tool({



9

description: 'Get the weather in a location',



10

inputSchema: z.object({ location: z.string() }),



11

execute: async ({ location }, { abortSignal }) => {



12

return fetch(



13

`https://api.weatherapi.com/v1/current.json?q=${location}`,



14

{ signal: abortSignal }, // forward the abort signal to fetch



15

);



16

},



17

}),



18

},



19

prompt: 'What is the weather in San Francisco?',



20

});
```

### [Context (experimental)](#context-experimental)

You can pass in arbitrary context from `generateText` or `streamText` via the `experimental_context` setting.
This context is available in the `experimental_context` tool execution option.

```
1

const result = await generateText({



2

// ...



3

tools: {



4

someTool: tool({



5

// ...



6

execute: async (input, { experimental_context: context }) => {



7

const typedContext = context as { example: string }; // or use type validation library



8

// ...



9

},



10

}),



11

},



12

experimental_context: { example: '123' },



13

});
```

[Tool Input Lifecycle Hooks](#tool-input-lifecycle-hooks)
---------------------------------------------------------

The following tool input lifecycle hooks are available:

* **`onInputStart`**: Called when the model starts generating the input (arguments) for the tool call
* **`onInputDelta`**: Called for each chunk of text as the input is streamed
* **`onInputAvailable`**: Called when the complete input is available and validated

`onInputStart` and `onInputDelta` are only called in streaming contexts (when using `streamText`). They are not called when using `generateText`.

### [Example](#example-1)

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText, tool } from 'ai';



2

import { z } from 'zod';



3



4

const result = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: {



7

getWeather: tool({



8

description: 'Get the weather in a location',



9

inputSchema: z.object({



10

location: z.string().describe('The location to get the weather for'),



11

}),



12

execute: async ({ location }) => ({



13

temperature: 72 + Math.floor(Math.random() * 21) - 10,



14

}),



15

onInputStart: () => {



16

console.log('Tool call starting');



17

},



18

onInputDelta: ({ inputTextDelta }) => {



19

console.log('Received input chunk:', inputTextDelta);



20

},



21

onInputAvailable: ({ input }) => {



22

console.log('Complete input:', input);



23

},



24

}),



25

},



26

prompt: 'What is the weather in San Francisco?',



27

});
```

[Types](#types)
---------------

Modularizing your code often requires defining types to ensure type safety and reusability.
To enable this, the AI SDK provides several helper types for tools, tool calls, and tool results.

You can use them to strongly type your variables, function parameters, and return types
in parts of the code that are not directly related to `streamText` or `generateText`.

Each tool call is typed with `ToolCall<NAME extends string, ARGS>`, depending
on the tool that has been invoked.
Similarly, the tool results are typed with `ToolResult<NAME extends string, ARGS, RESULT>`.

The tools in `streamText` and `generateText` are defined as a `ToolSet`.
The type inference helpers `TypedToolCall<TOOLS extends ToolSet>`
and `TypedToolResult<TOOLS extends ToolSet>` can be used to
extract the tool call and tool result types from the tools.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { TypedToolCall, TypedToolResult, generateText, tool } from 'ai';



2

import { z } from 'zod';



3



4

const myToolSet = {



5

firstTool: tool({



6

description: 'Greets the user',



7

inputSchema: z.object({ name: z.string() }),



8

execute: async ({ name }) => `Hello, ${name}!`,



9

}),



10

secondTool: tool({



11

description: 'Tells the user their age',



12

inputSchema: z.object({ age: z.number() }),



13

execute: async ({ age }) => `You are ${age} years old!`,



14

}),



15

};



16



17

type MyToolCall = TypedToolCall<typeof myToolSet>;



18

type MyToolResult = TypedToolResult<typeof myToolSet>;



19



20

async function generateSomething(prompt: string): Promise<{



21

text: string;



22

toolCalls: Array<MyToolCall>; // typed tool calls



23

toolResults: Array<MyToolResult>; // typed tool results



24

}> {



25

return generateText({



26

model: "anthropic/claude-sonnet-4.5",



27

tools: myToolSet,



28

prompt,



29

});



30

}
```

[Handling Errors](#handling-errors)
-----------------------------------

The AI SDK has three tool-call related errors:

* [`NoSuchToolError`](/docs/reference/ai-sdk-errors/ai-no-such-tool-error): the model tries to call a tool that is not defined in the tools object
* [`InvalidToolInputError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-input-error): the model calls a tool with inputs that do not match the tool's input schema
* [`ToolCallRepairError`](/docs/reference/ai-sdk-errors/ai-tool-call-repair-error): an error that occurred during tool call repair

When tool execution fails (errors thrown by your tool's `execute` function), the AI SDK adds them as `tool-error` content parts to enable automated LLM roundtrips in multi-step scenarios.

### [`generateText`](#generatetext)

`generateText` throws errors for tool schema validation issues and other errors, and can be handled using a `try`/`catch` block. Tool execution errors appear as `tool-error` parts in the result steps:

```
1

try {



2

const result = await generateText({



3

//...



4

});



5

} catch (error) {



6

if (NoSuchToolError.isInstance(error)) {



7

// handle the no such tool error



8

} else if (InvalidToolInputError.isInstance(error)) {



9

// handle the invalid tool inputs error



10

} else {



11

// handle other errors



12

}



13

}
```

Tool execution errors are available in the result steps:

```
1

const { steps } = await generateText({



2

// ...



3

});



4



5

// check for tool errors in the steps



6

const toolErrors = steps.flatMap(step =>



7

step.content.filter(part => part.type === 'tool-error'),



8

);



9



10

toolErrors.forEach(toolError => {



11

console.log('Tool error:', toolError.error);



12

console.log('Tool name:', toolError.toolName);



13

console.log('Tool input:', toolError.input);



14

});
```

### [`streamText`](#streamtext)

`streamText` sends errors as part of the full stream. Tool execution errors appear as `tool-error` parts, while other errors appear as `error` parts.

When using `toUIMessageStreamResponse`, you can pass an `onError` function to extract the error message from the error part and forward it as part of the stream response:

```
1

const result = streamText({



2

// ...



3

});



4



5

return result.toUIMessageStreamResponse({



6

onError: error => {



7

if (NoSuchToolError.isInstance(error)) {



8

return 'The model tried to call a unknown tool.';



9

} else if (InvalidToolInputError.isInstance(error)) {



10

return 'The model called a tool with invalid inputs.';



11

} else {



12

return 'An unknown error occurred.';



13

}



14

},



15

});
```

[Tool Call Repair](#tool-call-repair)
-------------------------------------

The tool call repair feature is experimental and may change in the future.

Language models sometimes fail to generate valid tool calls,
especially when the input schema is complex or the model is smaller.

If you use multiple steps, those failed tool calls will be sent back to the LLM
in the next step to give it an opportunity to fix it.
However, you may want to control how invalid tool calls are repaired without requiring
additional steps that pollute the message history.

You can use the `experimental_repairToolCall` function to attempt to repair the tool call
with a custom function.

You can use different strategies to repair the tool call:

* Use a model with structured outputs to generate the inputs.
* Send the messages, system prompt, and tool schema to a stronger model to generate the inputs.
* Provide more specific repair instructions based on which tool was called.

### [Example: Use a model with structured outputs for repair](#example-use-a-model-with-structured-outputs-for-repair)

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateObject, generateText, NoSuchToolError, tool } from 'ai';



3



4

const result = await generateText({



5

model,



6

tools,



7

prompt,



8



9

experimental_repairToolCall: async ({



10

toolCall,



11

tools,



12

inputSchema,



13

error,



14

}) => {



15

if (NoSuchToolError.isInstance(error)) {



16

return null; // do not attempt to fix invalid tool names



17

}



18



19

const tool = tools[toolCall.toolName as keyof typeof tools];



20



21

const { object: repairedArgs } = await generateObject({



22

model: "anthropic/claude-sonnet-4.5",



23

schema: tool.inputSchema,



24

prompt: [



25

`The model tried to call the tool "${toolCall.toolName}"` +



26

` with the following inputs:`,



27

JSON.stringify(toolCall.input),



28

`The tool accepts the following schema:`,



29

JSON.stringify(inputSchema(toolCall)),



30

'Please fix the inputs.',



31

].join('\n'),



32

});



33



34

return { ...toolCall, input: JSON.stringify(repairedArgs) };



35

},



36

});
```

### [Example: Use the re-ask strategy for repair](#example-use-the-re-ask-strategy-for-repair)

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateObject, generateText, NoSuchToolError, tool } from 'ai';



3



4

const result = await generateText({



5

model,



6

tools,



7

prompt,



8



9

experimental_repairToolCall: async ({



10

toolCall,



11

tools,



12

error,



13

messages,



14

system,



15

}) => {



16

const result = await generateText({



17

model,



18

system,



19

messages: [



20

...messages,



21

{



22

role: 'assistant',



23

content: [



24

{



25

type: 'tool-call',



26

toolCallId: toolCall.toolCallId,



27

toolName: toolCall.toolName,



28

input: toolCall.input,



29

},



30

],



31

},



32

{



33

role: 'tool' as const,



34

content: [



35

{



36

type: 'tool-result',



37

toolCallId: toolCall.toolCallId,



38

toolName: toolCall.toolName,



39

output: error.message,



40

},



41

],



42

},



43

],



44

tools,



45

});



46



47

const newToolCall = result.toolCalls.find(



48

newToolCall => newToolCall.toolName === toolCall.toolName,



49

);



50



51

return newToolCall != null



52

? {



53

toolCallType: 'function' as const,



54

toolCallId: toolCall.toolCallId,



55

toolName: toolCall.toolName,



56

input: JSON.stringify(newToolCall.input),



57

}



58

: null;



59

},



60

});
```

[Active Tools](#active-tools)
-----------------------------

Language models can only handle a limited number of tools at a time, depending on the model.
To allow for static typing using a large number of tools and limiting the available tools to the model at the same time,
the AI SDK provides the `activeTools` property.

It is an array of tool names that are currently active.
By default, the value is `undefined` and all tools are active.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { openai } from '@ai-sdk/openai';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: myToolSet,



7

activeTools: ['firstTool'],



8

});
```

[Multi-modal Tool Results](#multi-modal-tool-results)
-----------------------------------------------------

Multi-modal tool results are experimental and only supported by Anthropic and
OpenAI.

In order to send multi-modal tool results, e.g. screenshots, back to the model,
they need to be converted into a specific format.

AI SDK Core tools have an optional `toModelOutput` function
that converts the tool result into a content part.

Here is an example for converting a screenshot into a content part:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const result = await generateText({



2

model: "anthropic/claude-sonnet-4.5",



3

tools: {



4

computer: anthropic.tools.computer_20241022({



5

// ...



6

async execute({ action, coordinate, text }) {



7

switch (action) {



8

case 'screenshot': {



9

return {



10

type: 'image',



11

data: fs



12

.readFileSync('./data/screenshot-editor.png')



13

.toString('base64'),



14

};



15

}



16

default: {



17

return `executed ${action}`;



18

}



19

}



20

},



21



22

// map to tool result content for LLM consumption:



23

toModelOutput({ output }) {



24

return {



25

type: 'content',



26

value:



27

typeof output === 'string'



28

? [{ type: 'text', text: output }]



29

: [{ type: 'media', data: output.data, mediaType: 'image/png' }],



30

};



31

},



32

}),



33

},



34

// ...



35

});
```

[Extracting Tools](#extracting-tools)
-------------------------------------

Once you start having many tools, you might want to extract them into separate files.
The `tool` helper function is crucial for this, because it ensures correct type inference.

Here is an example of an extracted tool:

tools/weather-tool.ts

```
1

import { tool } from 'ai';



2

import { z } from 'zod';



3



4

// the `tool` helper function ensures correct type inference:



5

export const weatherTool = tool({



6

description: 'Get the weather in a location',



7

inputSchema: z.object({



8

location: z.string().describe('The location to get the weather for'),



9

}),



10

execute: async ({ location }) => ({



11

location,



12

temperature: 72 + Math.floor(Math.random() * 21) - 10,



13

}),



14

});
```

[MCP Tools](#mcp-tools)
-----------------------

The AI SDK supports connecting to Model Context Protocol (MCP) servers to access their tools.
MCP enables your AI applications to discover and use tools across various services through a standardized interface.

For detailed information about MCP tools, including initialization, transport options, and usage patterns, see the [MCP Tools documentation](/docs/ai-sdk-core/mcp-tools).

### [AI SDK Tools vs MCP Tools](#ai-sdk-tools-vs-mcp-tools)

In most cases, you should define your own AI SDK tools for production applications. They provide full control, type safety, and optimal performance. MCP tools are best suited for rapid development iteration and scenarios where users bring their own tools.

| Aspect | AI SDK Tools | MCP Tools |
| --- | --- | --- |
| **Type Safety** | Full static typing end-to-end | Dynamic discovery at runtime |
| **Execution** | Same process as your request (low latency) | Separate server (network overhead) |
| **Prompt Control** | Full control over descriptions and schemas | Controlled by MCP server owner |
| **Schema Control** | You define and optimize for your model | Controlled by MCP server owner |
| **Version Management** | Full visibility over updates | Can update independently (version skew risk) |
| **Authentication** | Same process, no additional auth required | Separate server introduces additional auth complexity |
| **Best For** | Production applications requiring control and performance | Development iteration, user-provided tools |

[Examples](#examples)
---------------------

You can see tools in action using various frameworks in the following examples:

[Learn to use tools in Node.js](/cookbook/node/call-tools)[Learn to use tools in Next.js with Route Handlers](/cookbook/next/call-tools)[Learn to use MCP tools in Node.js](/cookbook/node/mcp-tools)