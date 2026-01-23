# https://sdk.vercel.ai/docs/ai-sdk-ui/reading-ui-message-streams

Copy markdown

[Reading UI Message Streams](#reading-ui-message-streams)
=========================================================

`UIMessage` streams are useful outside of traditional chat use cases. You can consume them for terminal UIs, custom stream processing on the client, or React Server Components (RSC).

The `readUIMessageStream` helper transforms a stream of `UIMessageChunk` objects into an `AsyncIterableStream` of `UIMessage` objects, allowing you to process messages as they're being constructed.

[Basic Usage](#basic-usage)
---------------------------

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { readUIMessageStream, streamText } from 'ai';



2



3

async function main() {



4

const result = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

prompt: 'Write a short story about a robot.',



7

});



8



9

for await (const uiMessage of readUIMessageStream({



10

stream: result.toUIMessageStream(),



11

})) {



12

console.log('Current message state:', uiMessage);



13

}



14

}
```

[Tool Calls Integration](#tool-calls-integration)
-------------------------------------------------

Handle streaming responses that include tool calls:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { readUIMessageStream, streamText, tool } from 'ai';



2

import { z } from 'zod';



3



4

async function handleToolCalls() {



5

const result = streamText({



6

model: "anthropic/claude-sonnet-4.5",



7

tools: {



8

weather: tool({



9

description: 'Get the weather in a location',



10

inputSchema: z.object({



11

location: z.string().describe('The location to get the weather for'),



12

}),



13

execute: ({ location }) => ({



14

location,



15

temperature: 72 + Math.floor(Math.random() * 21) - 10,



16

}),



17

}),



18

},



19

prompt: 'What is the weather in Tokyo?',



20

});



21



22

for await (const uiMessage of readUIMessageStream({



23

stream: result.toUIMessageStream(),



24

})) {



25

// Handle different part types



26

uiMessage.parts.forEach(part => {



27

switch (part.type) {



28

case 'text':



29

console.log('Text:', part.text);



30

break;



31

case 'tool-call':



32

console.log('Tool called:', part.toolName, 'with args:', part.args);



33

break;



34

case 'tool-result':



35

console.log('Tool result:', part.result);



36

break;



37

}



38

});



39

}



40

}
```

[Resuming Conversations](#resuming-conversations)
-------------------------------------------------

Resume streaming from a previous message state:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { readUIMessageStream, streamText } from 'ai';



2



3

async function resumeConversation(lastMessage: UIMessage) {



4

const result = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

messages: [



7

{ role: 'user', content: 'Continue our previous conversation.' },



8

],



9

});



10



11

// Resume from the last message



12

for await (const uiMessage of readUIMessageStream({



13

stream: result.toUIMessageStream(),



14

message: lastMessage, // Resume from this message



15

})) {



16

console.log('Resumed message:', uiMessage);



17

}



18

}
```