# https://sdk.vercel.ai/cookbook/next/call-tools

Copy markdown

[Call Tools](#call-tools)
=========================

Some models allow developers to provide a list of tools that can be called at any time during a generation. This is useful for extending the capabilities of a language model to either use logic or data to interact with systems external to the model.

http://localhost:3000

User: How is it going?

Assistant: All good, how may I help you?

What is the weather in Paris and New York?

Send Message

[Client](#client)
-----------------

Let's create a React component that imports the `useChat` hook from the `@ai-sdk/react` module. The `useChat` hook will call the `/api/chat` endpoint when the user sends a message. The endpoint will generate the assistant's response based on the conversation history and stream it to the client. If the assistant responds with a tool call, the hook will automatically display them as well.

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

import type { ChatMessage } from './api/chat/route';



7



8

export default function Page() {



9

const [input, setInput] = useState('');



10



11

const { messages, sendMessage } = useChat<ChatMessage>({



12

transport: new DefaultChatTransport({



13

api: '/api/chat',



14

}),



15

});



16



17

return (



18

<div>



19

<input



20

className="border"



21

value={input}



22

onChange={event => {



23

setInput(event.target.value);



24

}}



25

onKeyDown={async event => {



26

if (event.key === 'Enter') {



27

sendMessage({



28

text: input,



29

});



30

setInput('');



31

}



32

}}



33

/>



34



35

{messages.map((message, index) => (



36

<div key={index}>



37

{message.parts.map(part => {



38

switch (part.type) {



39

case 'text':



40

return <div key={`${message.id}-text`}>{part.text}</div>;



41

case 'tool-getWeather':



42

return (



43

<div key={`${message.id}-weather`}>



44

{JSON.stringify(part, null, 2)}



45

</div>



46

);



47

}



48

})}



49

</div>



50

))}



51

</div>



52

);



53

}
```

[Server](#server)
-----------------

You will create a new route at `/api/chat` that will use the `streamText` function from the `ai` module to generate the assistant's response based on the conversation history.

You will use the [`tools`](/docs/reference/ai-sdk-core/generate-text#tools) parameter to specify a tool called `celsiusToFahrenheit` that will convert a user given value in celsius to fahrenheit.

You will also use zod to specify the schema for the `celsiusToFahrenheit` function's parameters.

app/api/chat/route.ts

```
1

import {



2

type InferUITools,



3

type ToolSet,



4

type UIDataTypes,



5

type UIMessage,



6

convertToModelMessages,



7

stepCountIs,



8

streamText,



9

tool,



10

} from 'ai';



11

import { z } from 'zod';



12



13

const tools = {



14

getWeather: tool({



15

description: 'Get the weather for a location',



16

inputSchema: z.object({



17

city: z.string().describe('The city to get the weather for'),



18

unit: z



19

.enum(['C', 'F'])



20

.describe('The unit to display the temperature in'),



21

}),



22

execute: async ({ city, unit }) => {



23

const weather = {



24

value: 24,



25

description: 'Sunny',



26

};



27



28

return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;



29

},



30

}),



31

} satisfies ToolSet;



32



33

export type ChatTools = InferUITools<typeof tools>;



34



35

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;



36



37

export async function POST(req: Request) {



38

const { messages }: { messages: ChatMessage[] } = await req.json();



39



40

const result = streamText({



41

model: 'openai/gpt-4o',



42

system: 'You are a helpful assistant.',



43

messages: await convertToModelMessages(messages),



44

stopWhen: stepCountIs(5),



45

tools,



46

});



47



48

return result.toUIMessageStreamResponse();



49

}
```

---

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/tools/call-tool/index.tsx)