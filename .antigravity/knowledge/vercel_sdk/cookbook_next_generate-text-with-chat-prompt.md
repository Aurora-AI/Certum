# https://sdk.vercel.ai/cookbook/next/generate-text-with-chat-prompt

Copy markdown

[Generate Text with Chat Prompt](#generate-text-with-chat-prompt)
=================================================================

Previously, you were able to generate text and objects using either a single message prompt, a system prompt, or a combination of both of them. However, there may be times when you want to generate text based on a series of messages.

A chat completion allows you to generate text based on a series of messages. This series of messages can be any series of interactions between any number of systems, but the most popular and relatable use case has been a series of messages that represent a conversation between a user and a model.

http://localhost:3000

User: How is it going?

Assistant: All good, how may I help you?

Why is the sky blue?

Send Message

[Client](#client)
-----------------

Let's start by creating a simple chat interface with an input field that sends the user's message and displays the conversation history. You will call the `/api/chat` endpoint to generate the assistant's response.

app/page.tsx

```
1

'use client';



2



3

import type { ModelMessage } from 'ai';



4

import { useState } from 'react';



5



6

export default function Page() {



7

const [input, setInput] = useState('');



8

const [messages, setMessages] = useState<ModelMessage[]>([]);



9



10

return (



11

<div>



12

<input



13

value={input}



14

onChange={event => {



15

setInput(event.target.value);



16

}}



17

onKeyDown={async event => {



18

if (event.key === 'Enter') {



19

setMessages(currentMessages => [



20

...currentMessages,



21

{ role: 'user', content: input },



22

]);



23



24

const response = await fetch('/api/chat', {



25

method: 'POST',



26

body: JSON.stringify({



27

messages: [...messages, { role: 'user', content: input }],



28

}),



29

});



30



31

const { messages: newMessages } = await response.json();



32



33

setMessages(currentMessages => [



34

...currentMessages,



35

...newMessages,



36

]);



37

}



38

}}



39

/>



40



41

{messages.map((message, index) => (



42

<div key={`${message.role}-${index}`}>



43

{typeof message.content === 'string'



44

? message.content



45

: message.content



46

.filter(part => part.type === 'text')



47

.map((part, partIndex) => (



48

<div key={partIndex}>{part.text}</div>



49

))}



50

</div>



51

))}



52

</div>



53

);



54

}
```

[Server](#server)
-----------------

Next, let's create the `/api/chat` endpoint that generates the assistant's response based on the conversation history.

app/api/chat/route.ts

```
1

import { generateText, type ModelMessage } from 'ai';



2



3

export async function POST(req: Request) {



4

const { messages }: { messages: ModelMessage[] } = await req.json();



5



6

const { response } = await generateText({



7

model: 'openai/gpt-4o',



8

system: 'You are a helpful assistant.',



9

messages,



10

});



11



12

return Response.json({ messages: response.messages });



13

}
```

---

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/chat/generate-chat/index.tsx)