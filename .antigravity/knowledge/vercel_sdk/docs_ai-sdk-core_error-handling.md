# https://sdk.vercel.ai/docs/ai-sdk-core/error-handling

Copy markdown

[Error Handling](#error-handling)
=================================

[Handling regular errors](#handling-regular-errors)
---------------------------------------------------

Regular errors are thrown and can be handled using the `try/catch` block.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText } from 'ai';



2



3

try {



4

const { text } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});



8

} catch (error) {



9

// handle error



10

}
```

See [Error Types](/docs/reference/ai-sdk-errors) for more information on the different types of errors that may be thrown.

[Handling streaming errors (simple streams)](#handling-streaming-errors-simple-streams)
---------------------------------------------------------------------------------------

When errors occur during streams that do not support error chunks,
the error is thrown as a regular error.
You can handle these errors using the `try/catch` block.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

try {



4

const { textStream } = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});



8



9

for await (const textPart of textStream) {



10

process.stdout.write(textPart);



11

}



12

} catch (error) {



13

// handle error



14

}
```

[Handling streaming errors (streaming with `error` support)](#handling-streaming-errors-streaming-with-error-support)
---------------------------------------------------------------------------------------------------------------------

Full streams support error parts.
You can handle those parts similar to other parts.
It is recommended to also add a try-catch block for errors that
happen outside of the streaming.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

try {



4

const { fullStream } = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});



8



9

for await (const part of fullStream) {



10

switch (part.type) {



11

// ... handle other part types



12



13

case 'error': {



14

const error = part.error;



15

// handle error



16

break;



17

}



18



19

case 'abort': {



20

// handle stream abort



21

break;



22

}



23



24

case 'tool-error': {



25

const error = part.error;



26

// handle error



27

break;



28

}



29

}



30

}



31

} catch (error) {



32

// handle error



33

}
```

[Handling stream aborts](#handling-stream-aborts)
-------------------------------------------------

When streams are aborted (e.g., via chat stop button), you may want to perform cleanup operations like updating stored messages in your UI. Use the `onAbort` callback to handle these cases.

The `onAbort` callback is called when a stream is aborted via `AbortSignal`, but `onFinish` is not called. This ensures you can still update your UI state appropriately.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

const { textStream } = streamText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



6

onAbort: ({ steps }) => {



7

// Update stored messages or perform cleanup



8

console.log('Stream aborted after', steps.length, 'steps');



9

},



10

onFinish: ({ steps, totalUsage }) => {



11

// This is called on normal completion



12

console.log('Stream completed normally');



13

},



14

});



15



16

for await (const textPart of textStream) {



17

process.stdout.write(textPart);



18

}
```

The `onAbort` callback receives:

* `steps`: An array of all completed steps before the abort

You can also handle abort events directly in the stream:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText } from 'ai';



2



3

const { fullStream } = streamText({



4

model: "anthropic/claude-sonnet-4.5",



5

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



6

});



7



8

for await (const chunk of fullStream) {



9

switch (chunk.type) {



10

case 'abort': {



11

// Handle abort directly in stream



12

console.log('Stream was aborted');



13

break;



14

}



15

// ... handle other part types



16

}



17

}
```