# https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-resume-streams

Copy markdown

[Chatbot Resume Streams](#chatbot-resume-streams)
=================================================

`useChat` supports resuming ongoing streams after page reloads. Use this feature to build applications with long-running generations.

Stream resumption is not compatible with abort functionality. Closing a tab or
refreshing the page triggers an abort signal that will break the resumption
mechanism. Do not use `resume: true` if you need abort functionality in your
application. See
[troubleshooting](/docs/troubleshooting/abort-breaks-resumable-streams) for
more details.

[How stream resumption works](#how-stream-resumption-works)
-----------------------------------------------------------

Stream resumption requires persistence for messages and active streams in your application. The AI SDK provides tools to connect to storage, but you need to set up the storage yourself.

**The AI SDK provides:**

* A `resume` option in `useChat` that automatically reconnects to active streams
* Access to the outgoing stream through the `consumeSseStream` callback
* Automatic HTTP requests to your resume endpoints

**You build:**

* Storage to track which stream belongs to each chat
* Redis to store the UIMessage stream
* Two API endpoints: POST to create streams, GET to resume them
* Integration with [`resumable-stream`](https://www.npmjs.com/package/resumable-stream) to manage Redis storage

[Prerequisites](#prerequisites)
-------------------------------

To implement resumable streams in your chat application, you need:

1. **The `resumable-stream` package** - Handles the publisher/subscriber mechanism for streams
2. **A Redis instance** - Stores stream data (e.g. [Redis through Vercel](https://vercel.com/marketplace/redis))
3. **A persistence layer** - Tracks which stream ID is active for each chat (e.g. database)

[Implementation](#implementation)
---------------------------------

### [1. Client-side: Enable stream resumption](#1-client-side-enable-stream-resumption)

Use the `resume` option in the `useChat` hook to enable stream resumption. When `resume` is true, the hook automatically attempts to reconnect to any active stream for the chat on mount:

app/chat/[chatId]/chat.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import { DefaultChatTransport, type UIMessage } from 'ai';



5



6

export function Chat({



7

chatData,



8

resume = false,



9

}: {



10

chatData: { id: string; messages: UIMessage[] };



11

resume?: boolean;



12

}) {



13

const { messages, sendMessage, status } = useChat({



14

id: chatData.id,



15

messages: chatData.messages,



16

resume, // Enable automatic stream resumption



17

transport: new DefaultChatTransport({



18

// You must send the id of the chat



19

prepareSendMessagesRequest: ({ id, messages }) => {



20

return {



21

body: {



22

id,



23

message: messages[messages.length - 1],



24

},



25

};



26

},



27

}),



28

});



29



30

return <div>{/* Your chat UI */}</div>;



31

}
```

You must send the chat ID with each request (see
`prepareSendMessagesRequest`).

When you enable `resume`, the `useChat` hook makes a `GET` request to `/api/chat/[id]/stream` on mount to check for and resume any active streams.

Let's start by creating the POST handler to create the resumable stream.

### [2. Create the POST handler](#2-create-the-post-handler)

The POST handler creates resumable streams using the `consumeSseStream` callback:

app/api/chat/route.ts

```
1

import { openai } from '@ai-sdk/openai';



2

import { readChat, saveChat } from '@util/chat-store';



3

import {



4

convertToModelMessages,



5

generateId,



6

streamText,



7

type UIMessage,



8

} from 'ai';



9

import { after } from 'next/server';



10

import { createResumableStreamContext } from 'resumable-stream';



11



12

export async function POST(req: Request) {



13

const {



14

message,



15

id,



16

}: {



17

message: UIMessage | undefined;



18

id: string;



19

} = await req.json();



20



21

const chat = await readChat(id);



22

let messages = chat.messages;



23



24

messages = [...messages, message!];



25



26

// Clear any previous active stream and save the user message



27

saveChat({ id, messages, activeStreamId: null });



28



29

const result = streamText({



30

model: 'openai/gpt-5-mini',



31

messages: await convertToModelMessages(messages),



32

});



33



34

return result.toUIMessageStreamResponse({



35

originalMessages: messages,



36

generateMessageId: generateId,



37

onFinish: ({ messages }) => {



38

// Clear the active stream when finished



39

saveChat({ id, messages, activeStreamId: null });



40

},



41

async consumeSseStream({ stream }) {



42

const streamId = generateId();



43



44

// Create a resumable stream from the SSE stream



45

const streamContext = createResumableStreamContext({ waitUntil: after });



46

await streamContext.createNewResumableStream(streamId, () => stream);



47



48

// Update the chat with the active stream ID



49

saveChat({ id, activeStreamId: streamId });



50

},



51

});



52

}
```

### [3. Implement the GET handler](#3-implement-the-get-handler)

Create a GET handler at `/api/chat/[id]/stream` that:

1. Reads the chat ID from the route params
2. Loads the chat data to check for an active stream
3. Returns 204 (No Content) if no stream is active
4. Resumes the existing stream if one is found

app/api/chat/[id]/stream/route.ts

```
1

import { readChat } from '@util/chat-store';



2

import { UI_MESSAGE_STREAM_HEADERS } from 'ai';



3

import { after } from 'next/server';



4

import { createResumableStreamContext } from 'resumable-stream';



5



6

export async function GET(



7

_: Request,



8

{ params }: { params: Promise<{ id: string }> },



9

) {



10

const { id } = await params;



11



12

const chat = await readChat(id);



13



14

if (chat.activeStreamId == null) {



15

// no content response when there is no active stream



16

return new Response(null, { status: 204 });



17

}



18



19

const streamContext = createResumableStreamContext({



20

waitUntil: after,



21

});



22



23

return new Response(



24

await streamContext.resumeExistingStream(chat.activeStreamId),



25

{ headers: UI_MESSAGE_STREAM_HEADERS },



26

);



27

}
```

The `after` function from Next.js allows work to continue after the response
has been sent. This ensures that the resumable stream persists in Redis even
after the initial response is returned to the client, enabling reconnection
later.

[How it works](#how-it-works)
-----------------------------

### [Request lifecycle](#request-lifecycle)

![Diagram showing the architecture and lifecycle of resumable stream requests](https://e742qlubrjnjqpp0.public.blob.vercel-storage.com/resume-stream-diagram.png)

The diagram above shows the complete lifecycle of a resumable stream:

1. **Stream creation**: When you send a new message, the POST handler uses `streamText` to generate the response. The `consumeSseStream` callback creates a resumable stream with a unique ID and stores it in Redis through the `resumable-stream` package
2. **Stream tracking**: Your persistence layer saves the `activeStreamId` in the chat data
3. **Client reconnection**: When the client reconnects (page reload), the `resume` option triggers a GET request to `/api/chat/[id]/stream`
4. **Stream recovery**: The GET handler checks for an `activeStreamId` and uses `resumeExistingStream` to reconnect. If no active stream exists, it returns a 204 (No Content) response
5. **Completion cleanup**: When the stream finishes, the `onFinish` callback clears the `activeStreamId` by setting it to `null`

[Customize the resume endpoint](#customize-the-resume-endpoint)
---------------------------------------------------------------

By default, the `useChat` hook makes a GET request to `/api/chat/[id]/stream` when resuming. Customize this endpoint, credentials, and headers, using the `prepareReconnectToStreamRequest` option in `DefaultChatTransport`:

app/chat/[chatId]/chat.tsx

```
1

import { useChat } from '@ai-sdk/react';



2

import { DefaultChatTransport } from 'ai';



3



4

export function Chat({ chatData, resume }) {



5

const { messages, sendMessage } = useChat({



6

id: chatData.id,



7

messages: chatData.messages,



8

resume,



9

transport: new DefaultChatTransport({



10

// Customize reconnect settings (optional)



11

prepareReconnectToStreamRequest: ({ id }) => {



12

return {



13

api: `/api/chat/${id}/stream`, // Default pattern



14

// Or use a different pattern:



15

// api: `/api/streams/${id}/resume`,



16

// api: `/api/resume-chat?id=${id}`,



17

credentials: 'include', // Include cookies/auth



18

headers: {



19

Authorization: 'Bearer token',



20

'X-Custom-Header': 'value',



21

},



22

};



23

},



24

}),



25

});



26



27

return <div>{/* Your chat UI */}</div>;



28

}
```

This lets you:

* Match your existing API route structure
* Add query parameters or custom paths
* Integrate with different backend architectures

[Important considerations](#important-considerations)
-----------------------------------------------------

* **Incompatibility with abort**: Stream resumption is not compatible with abort functionality. Closing a tab or refreshing the page triggers an abort signal that will break the resumption mechanism. Do not use `resume: true` if you need abort functionality in your application
* **Stream expiration**: Streams in Redis expire after a set time (configurable in the `resumable-stream` package)
* **Multiple clients**: Multiple clients can connect to the same stream simultaneously
* **Error handling**: When no active stream exists, the GET handler returns a 204 (No Content) status code
* **Security**: Ensure proper authentication and authorization for both creating and resuming streams
* **Race conditions**: Clear the `activeStreamId` when starting a new stream to prevent resuming outdated streams

  
[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next)