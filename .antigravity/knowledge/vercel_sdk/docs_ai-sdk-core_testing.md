# https://sdk.vercel.ai/docs/ai-sdk-core/testing

Copy markdown

[Testing](#testing)
===================

Testing language models can be challenging, because they are non-deterministic
and calling them is slow and expensive.

To enable you to unit test your code that uses the AI SDK, the AI SDK Core
includes mock providers and test helpers. You can import the following helpers from `ai/test`:

* `MockEmbeddingModelV3`: A mock embedding model using the [embedding model v3 specification](https://github.com/vercel/ai/blob/main/packages/provider/src/embedding-model/v3/embedding-model-v3.ts).
* `MockLanguageModelV3`: A mock language model using the [language model v3 specification](https://github.com/vercel/ai/blob/main/packages/provider/src/language-model/v3/language-model-v3.ts).
* `mockId`: Provides an incrementing integer ID.
* `mockValues`: Iterates over an array of values with each call. Returns the last value when the array is exhausted.
* [`simulateReadableStream`](/docs/reference/ai-sdk-core/simulate-readable-stream): Simulates a readable stream with delays.

With mock providers and test helpers, you can control the output of the AI SDK
and test your code in a repeatable and deterministic way without actually calling
a language model provider.

[Examples](#examples)
---------------------

You can use the test helpers with the AI Core functions in your unit tests:

### [generateText](#generatetext)

```
1

import { generateText } from 'ai';



2

import { MockLanguageModelV3 } from 'ai/test';



3



4

const result = await generateText({



5

model: new MockLanguageModelV3({



6

doGenerate: async () => ({



7

content: [{ type: 'text', text: `Hello, world!` }],



8

finishReason: { unified: 'stop', raw: undefined },



9

usage: {



10

inputTokens: {



11

total: 10,



12

noCache: 10,



13

cacheRead: undefined,



14

cacheWrite: undefined,



15

},



16

outputTokens: {



17

total: 20,



18

text: 20,



19

reasoning: undefined,



20

},



21

},



22

warnings: [],



23

}),



24

}),



25

prompt: 'Hello, test!',



26

});
```

### [streamText](#streamtext)

```
1

import { streamText, simulateReadableStream } from 'ai';



2

import { MockLanguageModelV3 } from 'ai/test';



3



4

const result = streamText({



5

model: new MockLanguageModelV3({



6

doStream: async () => ({



7

stream: simulateReadableStream({



8

chunks: [



9

{ type: 'text-start', id: 'text-1' },



10

{ type: 'text-delta', id: 'text-1', delta: 'Hello' },



11

{ type: 'text-delta', id: 'text-1', delta: ', ' },



12

{ type: 'text-delta', id: 'text-1', delta: 'world!' },



13

{ type: 'text-end', id: 'text-1' },



14

{



15

type: 'finish',



16

finishReason: { unified: 'stop', raw: undefined },



17

logprobs: undefined,



18

usage: {



19

inputTokens: {



20

total: 3,



21

noCache: 3,



22

cacheRead: undefined,



23

cacheWrite: undefined,



24

},



25

outputTokens: {



26

total: 10,



27

text: 10,



28

reasoning: undefined,



29

},



30

},



31

},



32

],



33

}),



34

}),



35

}),



36

prompt: 'Hello, test!',



37

});
```

### [generateObject](#generateobject)

```
1

import { generateObject } from 'ai';



2

import { MockLanguageModelV3 } from 'ai/test';



3

import { z } from 'zod';



4



5

const result = await generateObject({



6

model: new MockLanguageModelV3({



7

doGenerate: async () => ({



8

content: [{ type: 'text', text: `{"content":"Hello, world!"}` }],



9

finishReason: { unified: 'stop', raw: undefined },



10

usage: {



11

inputTokens: {



12

total: 10,



13

noCache: 10,



14

cacheRead: undefined,



15

cacheWrite: undefined,



16

},



17

outputTokens: {



18

total: 20,



19

text: 20,



20

reasoning: undefined,



21

},



22

},



23

warnings: [],



24

}),



25

}),



26

schema: z.object({ content: z.string() }),



27

prompt: 'Hello, test!',



28

});
```

### [streamObject](#streamobject)

```
1

import { streamObject, simulateReadableStream } from 'ai';



2

import { MockLanguageModelV3 } from 'ai/test';



3

import { z } from 'zod';



4



5

const result = streamObject({



6

model: new MockLanguageModelV3({



7

doStream: async () => ({



8

stream: simulateReadableStream({



9

chunks: [



10

{ type: 'text-start', id: 'text-1' },



11

{ type: 'text-delta', id: 'text-1', delta: '{ ' },



12

{ type: 'text-delta', id: 'text-1', delta: '"content": ' },



13

{ type: 'text-delta', id: 'text-1', delta: `"Hello, ` },



14

{ type: 'text-delta', id: 'text-1', delta: `world` },



15

{ type: 'text-delta', id: 'text-1', delta: `!"` },



16

{ type: 'text-delta', id: 'text-1', delta: ' }' },



17

{ type: 'text-end', id: 'text-1' },



18

{



19

type: 'finish',



20

finishReason: { unified: 'stop', raw: undefined },



21

logprobs: undefined,



22

usage: {



23

inputTokens: {



24

total: 3,



25

noCache: 3,



26

cacheRead: undefined,



27

cacheWrite: undefined,



28

},



29

outputTokens: {



30

total: 10,



31

text: 10,



32

reasoning: undefined,



33

},



34

},



35

},



36

],



37

}),



38

}),



39

}),



40

schema: z.object({ content: z.string() }),



41

prompt: 'Hello, test!',



42

});
```

### [Simulate UI Message Stream Responses](#simulate-ui-message-stream-responses)

You can also simulate [UI Message Stream](/docs/ai-sdk-ui/stream-protocol#ui-message-stream) responses for testing,
debugging, or demonstration purposes.

Here is a Next example:

route.ts

```
1

import { simulateReadableStream } from 'ai';



2



3

export async function POST(req: Request) {



4

return new Response(



5

simulateReadableStream({



6

initialDelayInMs: 1000, // Delay before the first chunk



7

chunkDelayInMs: 300, // Delay between chunks



8

chunks: [



9

`data: {"type":"start","messageId":"msg-123"}\n\n`,



10

`data: {"type":"text-start","id":"text-1"}\n\n`,



11

`data: {"type":"text-delta","id":"text-1","delta":"This"}\n\n`,



12

`data: {"type":"text-delta","id":"text-1","delta":" is an"}\n\n`,



13

`data: {"type":"text-delta","id":"text-1","delta":" example."}\n\n`,



14

`data: {"type":"text-end","id":"text-1"}\n\n`,



15

`data: {"type":"finish"}\n\n`,



16

`data: [DONE]\n\n`,



17

],



18

}).pipeThrough(new TextEncoderStream()),



19

{



20

status: 200,



21

headers: {



22

'Content-Type': 'text/event-stream',



23

'Cache-Control': 'no-cache',



24

Connection: 'keep-alive',



25

'x-vercel-ai-ui-message-stream': 'v1',



26

},



27

},



28

);



29

}
```