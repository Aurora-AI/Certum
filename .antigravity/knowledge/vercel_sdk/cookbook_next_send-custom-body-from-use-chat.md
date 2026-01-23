# https://sdk.vercel.ai/cookbook/next/send-custom-body-from-use-chat

Copy markdown

[Send Custom Body from useChat](#send-custom-body-from-usechat)
===============================================================

If you are looking to send custom values alongside each message, check out the
[chatbot request configuration
documentation](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#request-configuration).

By default, `useChat` sends all messages as well as information from the request to the server.
However, it is often desirable to control the entire body content that is sent to the server, e.g. to:

* only send the last message
* send additional data along with the message
* change the structure of the request body

The `prepareSendMessagesRequest` option allows you to customize the entire body content that is sent to the server.
The function receives the message list, the request data, and the request body from the append call.
It should return the body content that will be sent to the server.

[Example](#example)
-------------------

This example shows how to only send the text of the last message to the server.
This can be useful if you want to reduce the amount of data sent to the server.

### [Client](#client)

app/page.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import { DefaultChatTransport } from 'ai';



5

import { useState } from 'react';



6



7

export default function Chat() {



8

const [input, setInput] = useState('');



9

const { messages, sendMessage } = useChat({



10

transport: new DefaultChatTransport({



11

prepareSendMessagesRequest: ({ id, messages }) => {



12

return {



13

body: {



14

id,



15

message: messages[messages.length - 1],



16

},



17

};



18

},



19

}),



20

});



21



22

return (



23

<div>



24

{messages.map((message, index) => (



25

<div key={index}>



26

{message.role === 'user' ? 'User: ' : 'AI: '}



27

{message.parts.map((part) => {



28

switch (part.type) {



29

case "text":



30

return <div key={`${message.id}-text`}>{part.text}</div>;



31

}



32

})}



33

</div>



34

))}



35



36

<form onSubmit={(e) => {



37

e.preventDefault();



38

sendMessage({text: input});



39

setInput('');



40

}}>



41

<input value={input} onChange={(e) => setInput(e.currentTarget.value)} />



42

</form>



43

</div>



44

);



45

}
```

### [Server](#server)

We need to adjust the server to receive the custom request format with the chat ID and last message.
The rest of the message history can be loaded from storage.

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText } from 'ai';



2



3

// Allow streaming responses up to 30 seconds



4

export const maxDuration = 30;



5



6

export async function POST(req: Request) {



7

const { id, message } = await req.json();



8



9

// Load existing messages and add the new one



10

const messages = await loadMessages(id);



11

messages.push(message);



12



13

// Call the language model



14

const result = streamText({



15

model: 'openai/gpt-4.1',



16

messages: await convertToModelMessages(messages),



17

});



18



19

// Respond with the stream



20

return result.toUIMessageStreamResponse({



21

originalMessages: messages,



22

onFinish: ({ messages: newMessages }) => {



23

saveMessages(id, newMessages);



24

},



25

});



26

}
```