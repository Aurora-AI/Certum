# https://sdk.vercel.ai/cookbook/next/call-tools-multiple-steps

Copy markdown

[Call Tools in Multiple Steps](#call-tools-in-multiple-steps)
=============================================================

Some language models are great at calling tools in multiple steps to achieve a more complex task. This is particularly useful when the tools are dependent on each other and need to be executed in sequence during the same generation step.

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

{message.parts.map((part, i) => {



38

switch (part.type) {



39

case 'text':



40

return <div key={`${message.id}-text`}>{part.text}</div>;



41

case 'tool-getLocation':



42

case 'tool-getWeather':



43

return (



44

<div key={`${message.id}-weather-${i}`}>



45

{JSON.stringify(part, null, 2)}



46

</div>



47

);



48

}



49

})}



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

You will create a new route at `/api/chat` that will use the `streamText` function from the `ai` module to generate the assistant's response based on the conversation history.

You will use the [`tools`](/docs/reference/ai-sdk-core/generate-text#tools) parameter to specify two tools called `getLocation` and `getWeather` that will first get the user's location and then use it to get the weather.

You will add the two functions mentioned earlier and use zod to specify the schema for its parameters.

To call tools in multiple steps, you can use the `stopWhen` option to specify the stopping conditions for when the model generates a tool call. In this example, you will set it to `stepCountIs(5)` to allow for multiple consecutive tool calls (steps).

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

getLocation: tool({



15

description: 'Get the location of the user',



16

inputSchema: z.object({}),



17

execute: async () => {



18

const location = { lat: 37.7749, lon: -122.4194 };



19

return `Your location is at latitude ${location.lat} and longitude ${location.lon}`;



20

},



21

}),



22

getWeather: tool({



23

description: 'Get the weather for a location',



24

inputSchema: z.object({



25

city: z.string().describe('The city to get the weather for'),



26

unit: z



27

.enum(['C', 'F'])



28

.describe('The unit to display the temperature in'),



29

}),



30

execute: async ({ city, unit }) => {



31

const weather = {



32

value: 24,



33

description: 'Sunny',



34

};



35



36

return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;



37

},



38

}),



39

} satisfies ToolSet;



40



41

export type ChatTools = InferUITools<typeof tools>;



42



43

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;



44



45

export async function POST(req: Request) {



46

const { messages }: { messages: ChatMessage[] } = await req.json();



47



48

const result = streamText({



49

model: 'openai/gpt-4o',



50

system: 'You are a helpful assistant.',



51

messages: await convertToModelMessages(messages),



52

stopWhen: stepCountIs(5),



53

tools,



54

});



55



56

return result.toUIMessageStreamResponse();



57

}
```