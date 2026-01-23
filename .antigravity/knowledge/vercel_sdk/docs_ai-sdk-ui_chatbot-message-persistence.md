# https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-message-persistence

Copy markdown

[Chatbot Message Persistence](#chatbot-message-persistence)
===========================================================

Being able to store and load chat messages is crucial for most AI chatbots.
In this guide, we'll show how to implement message persistence with `useChat` and `streamText`.

This guide does not cover authorization, error handling, or other real-world
considerations. It is intended to be a simple example of how to implement
message persistence.

[Starting a new chat](#starting-a-new-chat)
-------------------------------------------

When the user navigates to the chat page without providing a chat ID,
we need to create a new chat and redirect to the chat page with the new chat ID.

app/chat/page.tsx

```
1

import { redirect } from 'next/navigation';



2

import { createChat } from '@util/chat-store';



3



4

export default async function Page() {



5

const id = await createChat(); // create a new chat



6

redirect(`/chat/${id}`); // redirect to chat page, see below



7

}
```

Our example chat store implementation uses files to store the chat messages.
In a real-world application, you would use a database or a cloud storage service,
and get the chat ID from the database.
That being said, the function interfaces are designed to be easily replaced with other implementations.

util/chat-store.ts

```
1

import { generateId } from 'ai';



2

import { existsSync, mkdirSync } from 'fs';



3

import { writeFile } from 'fs/promises';



4

import path from 'path';



5



6

export async function createChat(): Promise<string> {



7

const id = generateId(); // generate a unique chat ID



8

await writeFile(getChatFile(id), '[]'); // create an empty chat file



9

return id;



10

}



11



12

function getChatFile(id: string): string {



13

const chatDir = path.join(process.cwd(), '.chats');



14

if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });



15

return path.join(chatDir, `${id}.json`);



16

}
```

[Loading an existing chat](#loading-an-existing-chat)
-----------------------------------------------------

When the user navigates to the chat page with a chat ID, we need to load the chat messages from storage.

The `loadChat` function in our file-based chat store is implemented as follows:

util/chat-store.ts

```
1

import { UIMessage } from 'ai';



2

import { readFile } from 'fs/promises';



3



4

export async function loadChat(id: string): Promise<UIMessage[]> {



5

return JSON.parse(await readFile(getChatFile(id), 'utf8'));



6

}



7



8

// ... rest of the file
```

[Validating messages on the server](#validating-messages-on-the-server)
-----------------------------------------------------------------------

When processing messages on the server that contain tool calls, custom metadata, or data parts, you should validate them using `validateUIMessages` before sending them to the model.

### [Validation with tools](#validation-with-tools)

When your messages include tool calls, validate them against your tool definitions:

app/api/chat/route.ts

```
1

import {



2

convertToModelMessages,



3

streamText,



4

UIMessage,



5

validateUIMessages,



6

tool,



7

} from 'ai';



8

import { z } from 'zod';



9

import { loadChat, saveChat } from '@util/chat-store';



10

import { openai } from '@ai-sdk/openai';



11

import { dataPartsSchema, metadataSchema } from '@util/schemas';



12



13

// Define your tools



14

const tools = {



15

weather: tool({



16

description: 'Get weather information',



17

parameters: z.object({



18

location: z.string(),



19

units: z.enum(['celsius', 'fahrenheit']),



20

}),



21

execute: async ({ location, units }) => {



22

/* tool implementation */



23

},



24

}),



25

// other tools



26

};



27



28

export async function POST(req: Request) {



29

const { message, id } = await req.json();



30



31

// Load previous messages from database



32

const previousMessages = await loadChat(id);



33



34

// Append new message to previousMessages messages



35

const messages = [...previousMessages, message];



36



37

// Validate loaded messages against



38

// tools, data parts schema, and metadata schema



39

const validatedMessages = await validateUIMessages({



40

messages,



41

tools, // Ensures tool calls in messages match current schemas



42

dataPartsSchema,



43

metadataSchema,



44

});



45



46

const result = streamText({



47

model: 'openai/gpt-5-mini',



48

messages: convertToModelMessages(validatedMessages),



49

tools,



50

});



51



52

return result.toUIMessageStreamResponse({



53

originalMessages: messages,



54

onFinish: ({ messages }) => {



55

saveChat({ chatId: id, messages });



56

},



57

});



58

}
```

### [Handling validation errors](#handling-validation-errors)

Handle validation errors gracefully when messages from the database don't match current schemas:

app/api/chat/route.ts

```
1

import {



2

convertToModelMessages,



3

streamText,



4

validateUIMessages,



5

TypeValidationError,



6

} from 'ai';



7

import { type MyUIMessage } from '@/types';



8



9

export async function POST(req: Request) {



10

const { message, id } = await req.json();



11



12

// Load and validate messages from database



13

let validatedMessages: MyUIMessage[];



14



15

try {



16

const previousMessages = await loadMessagesFromDB(id);



17

validatedMessages = await validateUIMessages({



18

// append the new message to the previous messages:



19

messages: [...previousMessages, message],



20

tools,



21

metadataSchema,



22

});



23

} catch (error) {



24

if (error instanceof TypeValidationError) {



25

// Log validation error for monitoring



26

console.error('Database messages validation failed:', error);



27

// Could implement message migration or filtering here



28

// For now, start with empty history



29

validatedMessages = [];



30

} else {



31

throw error;



32

}



33

}



34



35

// Continue with validated messages...



36

}
```

[Displaying the chat](#displaying-the-chat)
-------------------------------------------

Once messages are loaded from storage, you can display them in your chat UI. Here's how to set up the page component and the chat display:

app/chat/[id]/page.tsx

```
1

import { loadChat } from '@util/chat-store';



2

import Chat from '@ui/chat';



3



4

export default async function Page(props: { params: Promise<{ id: string }> }) {



5

const { id } = await props.params;



6

const messages = await loadChat(id);



7

return <Chat id={id} initialMessages={messages} />;



8

}
```

The chat component uses the `useChat` hook to manage the conversation:

ui/chat.tsx

```
1

'use client';



2



3

import { UIMessage, useChat } from '@ai-sdk/react';



4

import { DefaultChatTransport } from 'ai';



5

import { useState } from 'react';



6



7

export default function Chat({



8

id,



9

initialMessages,



10

}: { id?: string | undefined; initialMessages?: UIMessage[] } = {}) {



11

const [input, setInput] = useState('');



12

const { sendMessage, messages } = useChat({



13

id, // use the provided chat ID



14

messages: initialMessages, // load initial messages



15

transport: new DefaultChatTransport({



16

api: '/api/chat',



17

}),



18

});



19



20

const handleSubmit = (e: React.FormEvent) => {



21

e.preventDefault();



22

if (input.trim()) {



23

sendMessage({ text: input });



24

setInput('');



25

}



26

};



27



28

// simplified rendering code, extend as needed:



29

return (



30

<div>



31

{messages.map(m => (



32

<div key={m.id}>



33

{m.role === 'user' ? 'User: ' : 'AI: '}



34

{m.parts



35

.map(part => (part.type === 'text' ? part.text : ''))



36

.join('')}



37

</div>



38

))}



39



40

<form onSubmit={handleSubmit}>



41

<input



42

value={input}



43

onChange={e => setInput(e.target.value)}



44

placeholder="Type a message..."



45

/>



46

<button type="submit">Send</button>



47

</form>



48

</div>



49

);



50

}
```

[Storing messages](#storing-messages)
-------------------------------------

`useChat` sends the chat id and the messages to the backend.

The `useChat` message format is different from the `ModelMessage` format. The
`useChat` message format is designed for frontend display, and contains
additional fields such as `id` and `createdAt`. We recommend storing the
messages in the `useChat` message format.

When loading messages from storage that contain tools, metadata, or custom data
parts, validate them using `validateUIMessages` before processing (see the
[validation section](#validating-messages-from-database) above).

Storing messages is done in the `onFinish` callback of the `toUIMessageStreamResponse` function.
`onFinish` receives the complete messages including the new AI response as `UIMessage[]`.

app/api/chat/route.ts

```
1

import { openai } from '@ai-sdk/openai';



2

import { saveChat } from '@util/chat-store';



3

import { convertToModelMessages, streamText, UIMessage } from 'ai';



4



5

export async function POST(req: Request) {



6

const { messages, chatId }: { messages: UIMessage[]; chatId: string } =



7

await req.json();



8



9

const result = streamText({



10

model: 'openai/gpt-5-mini',



11

messages: await convertToModelMessages(messages),



12

});



13



14

return result.toUIMessageStreamResponse({



15

originalMessages: messages,



16

onFinish: ({ messages }) => {



17

saveChat({ chatId, messages });



18

},



19

});



20

}
```

The actual storage of the messages is done in the `saveChat` function, which in
our file-based chat store is implemented as follows:

util/chat-store.ts

```
1

import { UIMessage } from 'ai';



2

import { writeFile } from 'fs/promises';



3



4

export async function saveChat({



5

chatId,



6

messages,



7

}: {



8

chatId: string;



9

messages: UIMessage[];



10

}): Promise<void> {



11

const content = JSON.stringify(messages, null, 2);



12

await writeFile(getChatFile(chatId), content);



13

}



14



15

// ... rest of the file
```

[Message IDs](#message-ids)
---------------------------

In addition to a chat ID, each message has an ID.
You can use this message ID to e.g. manipulate individual messages.

### [Client-side vs Server-side ID Generation](#client-side-vs-server-side-id-generation)

By default, message IDs are generated client-side:

* User message IDs are generated by the `useChat` hook on the client
* AI response message IDs are generated by `streamText` on the server

For applications without persistence, client-side ID generation works perfectly.
However, **for persistence, you need server-side generated IDs** to ensure consistency across sessions and prevent ID conflicts when messages are stored and retrieved.

### [Setting Up Server-side ID Generation](#setting-up-server-side-id-generation)

When implementing persistence, you have two options for generating server-side IDs:

1. **Using `generateMessageId` in `toUIMessageStreamResponse`**
2. **Setting IDs in your start message part with `createUIMessageStream`**

#### [Option 1: Using `generateMessageId` in `toUIMessageStreamResponse`](#option-1-using-generatemessageid-in-touimessagestreamresponse)

You can control the ID format by providing ID generators using [`createIdGenerator()`](/docs/reference/ai-sdk-core/create-id-generator):

app/api/chat/route.ts

```
1

import { createIdGenerator, streamText } from 'ai';



2



3

export async function POST(req: Request) {



4

// ...



5

const result = streamText({



6

// ...



7

});



8



9

return result.toUIMessageStreamResponse({



10

originalMessages: messages,



11

// Generate consistent server-side IDs for persistence:



12

generateMessageId: createIdGenerator({



13

prefix: 'msg',



14

size: 16,



15

}),



16

onFinish: ({ messages }) => {



17

saveChat({ chatId, messages });



18

},



19

});



20

}
```

#### [Option 2: Setting IDs with `createUIMessageStream`](#option-2-setting-ids-with-createuimessagestream)

Alternatively, you can use `createUIMessageStream` to control the message ID by writing a start message part:

app/api/chat/route.ts

```
1

import {



2

generateId,



3

streamText,



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

const { messages, chatId } = await req.json();



10



11

const stream = createUIMessageStream({



12

execute: ({ writer }) => {



13

// Write start message part with custom ID



14

writer.write({



15

type: 'start',



16

messageId: generateId(), // Generate server-side ID for persistence



17

});



18



19

const result = streamText({



20

model: 'openai/gpt-5-mini',



21

messages: await convertToModelMessages(messages),



22

});



23



24

writer.merge(result.toUIMessageStream({ sendStart: false })); // omit start message part



25

},



26

originalMessages: messages,



27

onFinish: ({ responseMessage }) => {



28

// save your chat here



29

},



30

});



31



32

return createUIMessageStreamResponse({ stream });



33

}
```

For client-side applications that don't require persistence, you can still customize client-side ID generation:

ui/chat.tsx

```
1

import { createIdGenerator } from 'ai';



2

import { useChat } from '@ai-sdk/react';



3



4

const { ... } = useChat({



5

generateId: createIdGenerator({



6

prefix: 'msgc',



7

size: 16,



8

}),



9

// ...



10

});
```

[Sending only the last message](#sending-only-the-last-message)
---------------------------------------------------------------

Once you have implemented message persistence, you might want to send only the last message to the server.
This reduces the amount of data sent to the server on each request and can improve performance.

To achieve this, you can provide a `prepareSendMessagesRequest` function to the transport.
This function receives the messages and the chat ID, and returns the request body to be sent to the server.

ui/chat.tsx

```
1

import { useChat } from '@ai-sdk/react';



2

import { DefaultChatTransport } from 'ai';



3



4

const {



5

// ...



6

} = useChat({



7

// ...



8

transport: new DefaultChatTransport({



9

api: '/api/chat',



10

// only send the last message to the server:



11

prepareSendMessagesRequest({ messages, id }) {



12

return { body: { message: messages[messages.length - 1], id } };



13

},



14

}),



15

});
```

On the server, you can then load the previous messages and append the new message to the previous messages. If your messages contain tools, metadata, or custom data parts, you should validate them:

app/api/chat/route.ts

```
1

import { convertToModelMessages, UIMessage, validateUIMessages } from 'ai';



2

// import your tools and schemas



3



4

export async function POST(req: Request) {



5

// get the last message from the client:



6

const { message, id } = await req.json();



7



8

// load the previous messages from the server:



9

const previousMessages = await loadChat(id);



10



11

// validate messages if they contain tools, metadata, or data parts:



12

const validatedMessages = await validateUIMessages({



13

// append the new message to the previous messages:



14

messages: [...previousMessages, message],



15

tools, // if using tools



16

metadataSchema, // if using custom metadata



17

dataSchemas, // if using custom data parts



18

});



19



20

const result = streamText({



21

// ...



22

messages: convertToModelMessages(validatedMessages),



23

});



24



25

return result.toUIMessageStreamResponse({



26

originalMessages: validatedMessages,



27

onFinish: ({ messages }) => {



28

saveChat({ chatId: id, messages });



29

},



30

});



31

}
```

[Handling client disconnects](#handling-client-disconnects)
-----------------------------------------------------------

By default, the AI SDK `streamText` function uses backpressure to the language model provider to prevent
the consumption of tokens that are not yet requested.

However, this means that when the client disconnects, e.g. by closing the browser tab or because of a network issue,
the stream from the LLM will be aborted and the conversation may end up in a broken state.

Assuming that you have a [storage solution](#storing-messages) in place, you can use the `consumeStream` method to consume the stream on the backend,
and then save the result as usual.
`consumeStream` effectively removes the backpressure,
meaning that the result is stored even when the client has already disconnected.

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, UIMessage } from 'ai';



2

import { saveChat } from '@util/chat-store';



3



4

export async function POST(req: Request) {



5

const { messages, chatId }: { messages: UIMessage[]; chatId: string } =



6

await req.json();



7



8

const result = streamText({



9

model,



10

messages: await convertToModelMessages(messages),



11

});



12



13

// consume the stream to ensure it runs to completion & triggers onFinish



14

// even when the client response is aborted:



15

result.consumeStream(); // no await



16



17

return result.toUIMessageStreamResponse({



18

originalMessages: messages,



19

onFinish: ({ messages }) => {



20

saveChat({ chatId, messages });



21

},



22

});



23

}
```

When the client reloads the page after a disconnect, the chat will be restored from the storage solution.

In production applications, you would also track the state of the request (in
progress, complete) in your stored messages and use it on the client to cover
the case where the client reloads the page after a disconnection, but the
streaming is not yet complete.

For more robust handling of disconnects, you may want to add resumability on disconnects. Check out the [Chatbot Resume Streams](/docs/ai-sdk-ui/chatbot-resume-streams) documentation to learn more.