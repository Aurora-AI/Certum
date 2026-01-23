# https://sdk.vercel.ai/docs/ai-sdk-core/generating-text

Copy markdown

[Generating and Streaming Text](#generating-and-streaming-text)
===============================================================

Large language models (LLMs) can generate text in response to a prompt, which can contain instructions and information to process.
For example, you can ask a model to come up with a recipe, draft an email, or summarize a document.

The AI SDK Core provides two functions to generate text and stream it from LLMs:

* [`generateText`](#generatetext): Generates text for a given prompt and model.
* [`streamText`](#streamtext): Streams text from a given prompt and model.

Advanced LLM features such as [tool calling](./tools-and-tool-calling) and [structured data generation](./generating-structured-data) are built on top of text generation.

[`generateText`](#generatetext)
-------------------------------

You can generate text using the [`generateText`](/docs/reference/ai-sdk-core/generate-text) function. This function is ideal for non-interactive use cases where you need to write text (e.g. drafting email or summarizing web pages) and for agents that use tools.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText } from 'ai';



2



3

const { text } = await generateText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



6

});
```

You can use more [advanced prompts](./prompts) to generate text with more complex instructions and content:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText } from 'ai';



2



3

const { text } = await generateText({



4

model: "anthropic/claude-sonnet-4.5",



5

system:



6

'You are a professional writer. ' +



7

'You write simple, clear, and concise content.',



8

prompt: `Summarize the following article in 3-5 sentences: ${article}`,



9

});
```

The result object of `generateText` contains several promises that resolve when all required data is available:

* `result.content`: The content that was generated in the last step.
* `result.text`: The generated text.
* `result.reasoning`: The full reasoning that the model has generated in the last step.
* `result.reasoningText`: The reasoning text of the model (only available for some models).
* `result.files`: The files that were generated in the last step.
* `result.sources`: Sources that have been used as references in the last step (only available for some models).
* `result.toolCalls`: The tool calls that were made in the last step.
* `result.toolResults`: The results of the tool calls from the last step.
* `result.finishReason`: The reason the model finished generating text.
* `result.rawFinishReason`: The raw reason why the generation finished (from the provider).
* `result.usage`: The usage of the model during the final step of text generation.
* `result.totalUsage`: The total usage across all steps (for multi-step generations).
* `result.warnings`: Warnings from the model provider (e.g. unsupported settings).
* `result.request`: Additional request information.
* `result.response`: Additional response information, including response messages and body.
* `result.providerMetadata`: Additional provider-specific metadata.
* `result.steps`: Details for all steps, useful for getting information about intermediate steps.
* `result.output`: The generated structured output using the `output` specification.

### [Accessing response headers & body](#accessing-response-headers--body)

Sometimes you need access to the full response from the model provider,
e.g. to access some provider-specific headers or body content.

You can access the raw response headers and body using the `response` property:

```
1

import { generateText } from 'ai';



2



3

const result = await generateText({



4

// ...



5

});



6



7

console.log(JSON.stringify(result.response.headers, null, 2));



8

console.log(JSON.stringify(result.response.body, null, 2));
```

### [`onFinish` callback](#onfinish-callback)

When using `generateText`, you can provide an `onFinish` callback that is triggered after the last step is finished (
[API Reference](/docs/reference/ai-sdk-core/generate-text#on-finish)
).
It contains the text, usage information, finish reason, messages, steps, total usage, and more:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText } from 'ai';



2



3

const result = await generateText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Invent a new holiday and describe its traditions.',



6

onFinish({ text, finishReason, usage, response, steps, totalUsage }) {



7

// your own logic, e.g. for saving the chat history or recording usage



8



9

const messages = response.messages; // messages that were generated



10

},



11

});
```

[`streamText`](#streamtext)
---------------------------

Depending on your model and prompt, it can take a large language model (LLM) up to a minute to finish generating its response. This delay can be unacceptable for interactive use cases such as chatbots or real-time applications, where users expect immediate responses.

AI SDK Core provides the [`streamText`](/docs/reference/ai-sdk-core/stream-text) function which simplifies streaming text from LLMs:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

const result = streamText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Invent a new holiday and describe its traditions.',



6

});



7



8

// example: use textStream as an async iterable



9

for await (const textPart of result.textStream) {



10

console.log(textPart);



11

}
```

`result.textStream` is both a `ReadableStream` and an `AsyncIterable`.

`streamText` immediately starts streaming and suppresses errors to prevent
server crashes. Use the `onError` callback to log errors.

You can use `streamText` on its own or in combination with [AI SDK
UI](/examples/next-pages/basics/streaming-text-generation) and [AI SDK
RSC](/examples/next-app/basics/streaming-text-generation).
The result object contains several helper functions to make the integration into [AI SDK UI](/docs/ai-sdk-ui) easier:

* `result.toUIMessageStreamResponse()`: Creates a UI Message stream HTTP response (with tool calls etc.) that can be used in a Next.js App Router API route.
* `result.pipeUIMessageStreamToResponse()`: Writes UI Message stream delta output to a Node.js response-like object.
* `result.toTextStreamResponse()`: Creates a simple text stream HTTP response.
* `result.pipeTextStreamToResponse()`: Writes text delta output to a Node.js response-like object.

`streamText` is using backpressure and only generates tokens as they are
requested. You need to consume the stream in order for it to finish.

It also provides several promises that resolve when the stream is finished:

* `result.content`: The content that was generated in the last step.
* `result.text`: The generated text.
* `result.reasoning`: The full reasoning that the model has generated.
* `result.reasoningText`: The reasoning text of the model (only available for some models).
* `result.files`: Files that have been generated by the model in the last step.
* `result.sources`: Sources that have been used as references in the last step (only available for some models).
* `result.toolCalls`: The tool calls that have been executed in the last step.
* `result.toolResults`: The tool results that have been generated in the last step.
* `result.finishReason`: The reason the model finished generating text.
* `result.rawFinishReason`: The raw reason why the generation finished (from the provider).
* `result.usage`: The usage of the model during the final step of text generation.
* `result.totalUsage`: The total usage across all steps (for multi-step generations).
* `result.warnings`: Warnings from the model provider (e.g. unsupported settings).
* `result.steps`: Details for all steps, useful for getting information about intermediate steps.
* `result.request`: Additional request information from the last step.
* `result.response`: Additional response information from the last step.
* `result.providerMetadata`: Additional provider-specific metadata from the last step.

### [`onError` callback](#onerror-callback)

`streamText` immediately starts streaming to enable sending data without waiting for the model.
Errors become part of the stream and are not thrown to prevent e.g. servers from crashing.

To log errors, you can provide an `onError` callback that is triggered when an error occurs.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

const result = streamText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Invent a new holiday and describe its traditions.',



6

onError({ error }) {



7

console.error(error); // your error logging logic here



8

},



9

});
```

### [`onChunk` callback](#onchunk-callback)

When using `streamText`, you can provide an `onChunk` callback that is triggered for each chunk of the stream.

It receives the following chunk types:

* `text`
* `reasoning`
* `source`
* `tool-call`
* `tool-input-start`
* `tool-input-delta`
* `tool-result`
* `raw`

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

const result = streamText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Invent a new holiday and describe its traditions.',



6

onChunk({ chunk }) {



7

// implement your own logic here, e.g.:



8

if (chunk.type === 'text') {



9

console.log(chunk.text);



10

}



11

},



12

});
```

### [`onFinish` callback](#onfinish-callback-1)

When using `streamText`, you can provide an `onFinish` callback that is triggered when the stream is finished (
[API Reference](/docs/reference/ai-sdk-core/stream-text#on-finish)
).
It contains the text, usage information, finish reason, messages, steps, total usage, and more:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

const result = streamText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Invent a new holiday and describe its traditions.',



6

onFinish({ text, finishReason, usage, response, steps, totalUsage }) {



7

// your own logic, e.g. for saving the chat history or recording usage



8



9

const messages = response.messages; // messages that were generated



10

},



11

});
```

### [`fullStream` property](#fullstream-property)

You can read a stream with all events using the `fullStream` property.
This can be useful if you want to implement your own UI or handle the stream in a different way.
Here is an example of how to use the `fullStream` property:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



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

cityAttractions: {



8

inputSchema: z.object({ city: z.string() }),



9

execute: async ({ city }) => ({



10

attractions: ['attraction1', 'attraction2', 'attraction3'],



11

}),



12

},



13

},



14

prompt: 'What are some San Francisco tourist attractions?',



15

});



16



17

for await (const part of result.fullStream) {



18

switch (part.type) {



19

case 'start': {



20

// handle start of stream



21

break;



22

}



23

case 'start-step': {



24

// handle start of step



25

break;



26

}



27

case 'text-start': {



28

// handle text start



29

break;



30

}



31

case 'text-delta': {



32

// handle text delta here



33

break;



34

}



35

case 'text-end': {



36

// handle text end



37

break;



38

}



39

case 'reasoning-start': {



40

// handle reasoning start



41

break;



42

}



43

case 'reasoning-delta': {



44

// handle reasoning delta here



45

break;



46

}



47

case 'reasoning-end': {



48

// handle reasoning end



49

break;



50

}



51

case 'source': {



52

// handle source here



53

break;



54

}



55

case 'file': {



56

// handle file here



57

break;



58

}



59

case 'tool-call': {



60

switch (part.toolName) {



61

case 'cityAttractions': {



62

// handle tool call here



63

break;



64

}



65

}



66

break;



67

}



68

case 'tool-input-start': {



69

// handle tool input start



70

break;



71

}



72

case 'tool-input-delta': {



73

// handle tool input delta



74

break;



75

}



76

case 'tool-input-end': {



77

// handle tool input end



78

break;



79

}



80

case 'tool-result': {



81

switch (part.toolName) {



82

case 'cityAttractions': {



83

// handle tool result here



84

break;



85

}



86

}



87

break;



88

}



89

case 'tool-error': {



90

// handle tool error



91

break;



92

}



93

case 'finish-step': {



94

// handle finish step



95

break;



96

}



97

case 'finish': {



98

// handle finish here



99

break;



100

}



101

case 'error': {



102

// handle error here



103

break;



104

}



105

case 'raw': {



106

// handle raw value



107

break;



108

}



109

}



110

}
```

### [Stream transformation](#stream-transformation)

You can use the `experimental_transform` option to transform the stream.
This is useful for e.g. filtering, changing, or smoothing the text stream.

The transformations are applied before the callbacks are invoked and the promises are resolved.
If you e.g. have a transformation that changes all text to uppercase, the `onFinish` callback will receive the transformed text.

#### [Smoothing streams](#smoothing-streams)

The AI SDK Core provides a [`smoothStream` function](/docs/reference/ai-sdk-core/smooth-stream) that
can be used to smooth out text and reasoning streaming.

```
1

import { smoothStream, streamText } from 'ai';



2



3

const result = streamText({



4

model,



5

prompt,



6

experimental_transform: smoothStream(),



7

});
```

#### [Custom transformations](#custom-transformations)

You can also implement your own custom transformations.
The transformation function receives the tools that are available to the model,
and returns a function that is used to transform the stream.
Tools can either be generic or limited to the tools that you are using.

Here is an example of how to implement a custom transformation that converts
all text to uppercase:

```
1

const upperCaseTransform =



2

<TOOLS extends ToolSet>() =>



3

(options: { tools: TOOLS; stopStream: () => void }) =>



4

new TransformStream<TextStreamPart<TOOLS>, TextStreamPart<TOOLS>>({



5

transform(chunk, controller) {



6

controller.enqueue(



7

// for text chunks, convert the text to uppercase:



8

chunk.type === 'text'



9

? { ...chunk, text: chunk.text.toUpperCase() }



10

: chunk,



11

);



12

},



13

});
```

You can also stop the stream using the `stopStream` function.
This is e.g. useful if you want to stop the stream when model guardrails are violated, e.g. by generating inappropriate content.

When you invoke `stopStream`, it is important to simulate the `step-finish` and `finish` events to guarantee that a well-formed stream is returned
and all callbacks are invoked.

```
1

const stopWordTransform =



2

<TOOLS extends ToolSet>() =>



3

({ stopStream }: { stopStream: () => void }) =>



4

new TransformStream<TextStreamPart<TOOLS>, TextStreamPart<TOOLS>>({



5

// note: this is a simplified transformation for testing;



6

// in a real-world version more there would need to be



7

// stream buffering and scanning to correctly emit prior text



8

// and to detect all STOP occurrences.



9

transform(chunk, controller) {



10

if (chunk.type !== 'text') {



11

controller.enqueue(chunk);



12

return;



13

}



14



15

if (chunk.text.includes('STOP')) {



16

// stop the stream



17

stopStream();



18



19

// simulate the finish-step event



20

controller.enqueue({



21

type: 'finish-step',



22

finishReason: 'stop',



23

logprobs: undefined,



24

usage: {



25

completionTokens: NaN,



26

promptTokens: NaN,



27

totalTokens: NaN,



28

},



29

request: {},



30

response: {



31

id: 'response-id',



32

modelId: 'mock-model-id',



33

timestamp: new Date(0),



34

},



35

warnings: [],



36

isContinued: false,



37

});



38



39

// simulate the finish event



40

controller.enqueue({



41

type: 'finish',



42

finishReason: 'stop',



43

logprobs: undefined,



44

usage: {



45

completionTokens: NaN,



46

promptTokens: NaN,



47

totalTokens: NaN,



48

},



49

response: {



50

id: 'response-id',



51

modelId: 'mock-model-id',



52

timestamp: new Date(0),



53

},



54

});



55



56

return;



57

}



58



59

controller.enqueue(chunk);



60

},



61

});
```

#### [Multiple transformations](#multiple-transformations)

You can also provide multiple transformations. They are applied in the order they are provided.

```
1

const result = streamText({



2

model,



3

prompt,



4

experimental_transform: [firstTransform, secondTransform],



5

});
```

[Sources](#sources)
-------------------

Some providers such as [Perplexity](/providers/ai-sdk-providers/perplexity#sources) and
[Google Generative AI](/providers/ai-sdk-providers/google-generative-ai#sources) include sources in the response.

Currently sources are limited to web pages that ground the response.
You can access them using the `sources` property of the result.

Each `url` source contains the following properties:

* `id`: The ID of the source.
* `url`: The URL of the source.
* `title`: The optional title of the source.
* `providerMetadata`: Provider metadata for the source.

When you use `generateText`, you can access the sources using the `sources` property:

```
1

const result = await generateText({



2

model: 'google/gemini-2.5-flash',



3

tools: {



4

google_search: google.tools.googleSearch({}),



5

},



6

prompt: 'List the top 5 San Francisco news from the past week.',



7

});



8



9

for (const source of result.sources) {



10

if (source.sourceType === 'url') {



11

console.log('ID:', source.id);



12

console.log('Title:', source.title);



13

console.log('URL:', source.url);



14

console.log('Provider metadata:', source.providerMetadata);



15

console.log();



16

}



17

}
```

When you use `streamText`, you can access the sources using the `fullStream` property:

```
1

const result = streamText({



2

model: 'google/gemini-2.5-flash',



3

tools: {



4

google_search: google.tools.googleSearch({}),



5

},



6

prompt: 'List the top 5 San Francisco news from the past week.',



7

});



8



9

for await (const part of result.fullStream) {



10

if (part.type === 'source' && part.sourceType === 'url') {



11

console.log('ID:', part.id);



12

console.log('Title:', part.title);



13

console.log('URL:', part.url);



14

console.log('Provider metadata:', part.providerMetadata);



15

console.log();



16

}



17

}
```

The sources are also available in the `result.sources` promise.

[Examples](#examples)
---------------------

You can see `generateText` and `streamText` in action using various frameworks in the following examples:

### [`generateText`](#generatetext-1)

[Learn to generate text in Node.js](/examples/node/generating-text/generate-text)[Learn to generate text in Next.js with Route Handlers (AI SDK UI)](/examples/next-pages/basics/generating-text)[Learn to generate text in Next.js with Server Actions (AI SDK RSC)](/examples/next-app/basics/generating-text)

### [`streamText`](#streamtext-1)

[Learn to stream text in Node.js](/examples/node/generating-text/stream-text)[Learn to stream text in Next.js with Route Handlers (AI SDK UI)](/examples/next-pages/basics/streaming-text-generation)[Learn to stream text in Next.js with Server Actions (AI SDK RSC)](/examples/next-app/basics/streaming-text-generation)