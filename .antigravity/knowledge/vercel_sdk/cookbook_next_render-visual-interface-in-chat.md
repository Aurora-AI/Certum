# https://sdk.vercel.ai/cookbook/next/render-visual-interface-in-chat

Copy markdown

[Render Visual Interface in Chat](#render-visual-interface-in-chat)
===================================================================

An interesting consequence of language models that can call [tools](/docs/ai-sdk-core/tools-and-tool-calling) is that this ability can be used to render visual interfaces by streaming React components to the client.

http://localhost:3000

User: How is it going?

Assistant: All good, how may I help you?

What is the weather in San Francisco?

Send Message

[Client](#client)
-----------------

Let's build an assistant that gets the weather for any city by calling the `getWeatherInformation` tool. Instead of returning text during the tool call, you will render a React component that displays the weather information on the client.

app/page.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import {



5

DefaultChatTransport,



6

lastAssistantMessageIsCompleteWithToolCalls,



7

} from 'ai';



8

import { useState } from 'react';



9

import { ChatMessage } from './api/chat/route';



10



11

export default function Chat() {



12

const [input, setInput] = useState('');



13

const { messages, sendMessage, addToolOutput } = useChat<ChatMessage>({



14

transport: new DefaultChatTransport({



15

api: '/api/chat',



16

}),



17



18

sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,



19



20

// run client-side tools that are automatically executed:



21

async onToolCall({ toolCall }) {



22

if (toolCall.toolName === 'getLocation') {



23

const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];



24



25

// No await - avoids potential deadlocks



26

addToolOutput({



27

tool: 'getLocation',



28

toolCallId: toolCall.toolCallId,



29

output: cities[Math.floor(Math.random() * cities.length)],



30

});



31

}



32

},



33

});



34



35

return (



36

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch gap-4">



37

{messages?.map(m => (



38

<div key={m.id} className="whitespace-pre-wrap flex flex-col gap-1">



39

<strong>{`${m.role}: `}</strong>



40

{m.parts?.map((part, i) => {



41

switch (part.type) {



42

case 'text':



43

return <div key={m.id + i}>{part.text}</div>;



44

// render confirmation tool (client-side tool with user interaction)



45

case 'tool-askForConfirmation':



46

return (



47

<div



48

key={part.toolCallId}



49

className="text-gray-500 flex flex-col gap-2"



50

>



51

<div className="flex gap-2">



52

{part.state === 'output-available' ? (



53

<b>{part.output}</b>



54

) : (



55

<>



56

<button



57

className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"



58

onClick={() =>



59

addToolOutput({



60

tool: 'askForConfirmation',



61

toolCallId: part.toolCallId,



62

output: 'Yes, confirmed.',



63

})



64

}



65

>



66

Yes



67

</button>



68

<button



69

className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"



70

onClick={() =>



71

addToolOutput({



72

tool: 'askForConfirmation',



73

toolCallId: part.toolCallId,



74

output: 'No, denied',



75

})



76

}



77

>



78

No



79

</button>



80

</>



81

)}



82

</div>



83

</div>



84

);



85



86

// other tools:



87

case 'tool-getWeatherInformation':



88

if (part.state === 'output-available') {



89

return (



90

<div



91

key={part.toolCallId}



92

className="flex flex-col gap-2 p-4 bg-blue-400 rounded-lg"



93

>



94

<div className="flex flex-row justify-between items-center">



95

<div className="text-4xl text-blue-50 font-medium">



96

{part.output.value}°



97

{part.output.unit === 'celsius' ? 'C' : 'F'}



98

</div>



99



100

<div className="h-9 w-9 bg-amber-400 rounded-full flex-shrink-0" />



101

</div>



102

<div className="flex flex-row gap-2 text-blue-50 justify-between">



103

{part.output.weeklyForecast.map(forecast => (



104

<div



105

key={forecast.day}



106

className="flex flex-col items-center"



107

>



108

<div className="text-xs">{forecast.day}</div>



109

<div>{forecast.value}°</div>



110

</div>



111

))}



112

</div>



113

</div>



114

);



115

}



116

break;



117

case 'tool-getLocation':



118

if (part.state === 'output-available') {



119

return (



120

<div



121

key={part.toolCallId}



122

className="text-gray-500 bg-gray-100 rounded-lg p-4"



123

>



124

User is in {part.output}.



125

</div>



126

);



127

} else {



128

return (



129

<div key={part.toolCallId} className="text-gray-500">



130

Calling getLocation...



131

</div>



132

);



133

}



134



135

default:



136

break;



137

}



138

})}



139

</div>



140

))}



141



142

<form



143

onSubmit={e => {



144

e.preventDefault();



145

sendMessage({ text: input });



146

setInput('');



147

}}



148

>



149

<input



150

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"



151

value={input}



152

placeholder="Say something..."



153

onChange={e => setInput(e.currentTarget.value)}



154

/>



155

</form>



156

</div>



157

);



158

}
```

[Server](#server)
-----------------

api/chat.ts

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

getWeatherInformation: tool({



15

description: 'show the weather in a given city to the user',



16

inputSchema: z.object({ city: z.string() }),



17

execute: async ({}: { city: string }) => {



18

return {



19

value: 24,



20

unit: 'celsius',



21

weeklyForecast: [



22

{ day: 'Monday', value: 24 },



23

{ day: 'Tuesday', value: 25 },



24

{ day: 'Wednesday', value: 26 },



25

{ day: 'Thursday', value: 27 },



26

{ day: 'Friday', value: 28 },



27

{ day: 'Saturday', value: 29 },



28

{ day: 'Sunday', value: 30 },



29

],



30

};



31

},



32

}),



33

// client-side tool that starts user interaction:



34

askForConfirmation: tool({



35

description: 'Ask the user for confirmation.',



36

inputSchema: z.object({



37

message: z.string().describe('The message to ask for confirmation.'),



38

}),



39

}),



40

// client-side tool that is automatically executed on the client:



41

getLocation: tool({



42

description:



43

'Get the user location. Always ask for confirmation before using this tool.',



44

inputSchema: z.object({}),



45

}),



46

} satisfies ToolSet;



47



48

export type ChatTools = InferUITools<typeof tools>;



49



50

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;



51



52

export async function POST(request: Request) {



53

const { messages }: { messages: ChatMessage[] } = await request.json();



54



55

const result = streamText({



56

model: 'openai/gpt-4.1',



57

messages: await convertToModelMessages(messages),



58

tools,



59

stopWhen: stepCountIs(5),



60

});



61



62

return result.toUIMessageStreamResponse();



63

}
```