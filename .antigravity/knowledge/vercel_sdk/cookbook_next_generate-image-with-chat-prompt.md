# https://sdk.vercel.ai/cookbook/next/generate-image-with-chat-prompt

Copy markdown

[Generate Image with Chat Prompt](#generate-image-with-chat-prompt)
===================================================================

When building a chatbot, you may want to allow the user to generate an image. This can be done by creating a tool that generates an image using the [`generateImage`](/docs/reference/ai-sdk-core/generate-image) function from the AI SDK.

[Server](#server)
-----------------

Let's create an endpoint at `/api/chat` that generates the assistant's response based on the conversation history. You will also define a tool called `generateImage` that will generate an image based on the assistant's response.

tools/generate-image.ts

```
1

import { generateImage, tool } from 'ai';



2

import z from 'zod';



3



4

export const generateImageTool = tool({



5

description: 'Generate an image',



6

inputSchema: z.object({



7

prompt: z.string().describe('The prompt to generate the image from'),



8

}),



9

execute: async ({ prompt }) => {



10

const { image } = await generateImage({



11

model: openai.imageModel('dall-e-3'),



12

prompt,



13

});



14

// in production, save this image to blob storage and return a URL



15

return { image: image.base64, prompt };



16

},



17

});
```

app/api/chat/route.ts

```
1

import {



2

convertToModelMessages,



3

type InferUITools,



4

stepCountIs,



5

streamText,



6

type UIMessage,



7

} from 'ai';



8



9

import { generateImageTool } from '@/tools/generate-image';



10



11

const tools = {



12

generateImage: generateImageTool,



13

};



14



15

export type ChatTools = InferUITools<typeof tools>;



16



17

export async function POST(request: Request) {



18

const { messages }: { messages: UIMessage[] } = await request.json();



19



20

const result = streamText({



21

model: 'openai/gpt-4o',



22

messages: await convertToModelMessages(messages),



23

stopWhen: stepCountIs(5),



24

tools,



25

});



26



27

return result.toUIMessageStreamResponse();



28

}
```

In production, you should save the generated image to a blob storage and
return a URL instead of the base64 image data. If you don't, the base64 image
data will be sent to the model which may cause the generation to fail.

[Client](#client)
-----------------

Let's create a simple chat interface with `useChat`. You will call the `/api/chat` endpoint to generate the assistant's response. If the assistant's response contains a `generateImage` tool invocation, you will display the tool result (the image in base64 format and the prompt) using the Next `Image` component.

app/page.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import { DefaultChatTransport, type UIMessage } from 'ai';



5

import Image from 'next/image';



6

import { type FormEvent, useState } from 'react';



7

import type { ChatTools } from './api/chat/route';



8



9

type ChatMessage = UIMessage<never, never, ChatTools>;



10



11

export default function Chat() {



12

const [input, setInput] = useState('');



13



14

const { messages, sendMessage } = useChat<ChatMessage>({



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

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {



21

setInput(event.target.value);



22

};



23



24

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {



25

event.preventDefault();



26



27

sendMessage({



28

parts: [{ type: 'text', text: input }],



29

});



30



31

setInput('');



32

};



33



34

return (



35

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



36

<div className="space-y-4">



37

{messages.map(message => (



38

<div key={message.id} className="whitespace-pre-wrap">



39

<div key={message.id}>



40

<div className="font-bold">{message.role}</div>



41

{message.parts.map((part, partIndex) => {



42

const { type } = part;



43



44

if (type === 'text') {



45

return (



46

<div key={`${message.id}-part-${partIndex}`}>



47

{part.text}



48

</div>



49

);



50

}



51



52

if (type === 'tool-generateImage') {



53

const { state, toolCallId } = part;



54



55

if (state === 'input-available') {



56

return (



57

<div key={`${message.id}-part-${partIndex}`}>



58

Generating image...



59

</div>



60

);



61

}



62



63

if (state === 'output-available') {



64

const { input, output } = part;



65



66

return (



67

<Image



68

key={toolCallId}



69

src={`data:image/png;base64,${output.image}`}



70

alt={input.prompt}



71

height={400}



72

width={400}



73

/>



74

);



75

}



76

}



77

})}



78

</div>



79

</div>



80

))}



81

</div>



82



83

<form onSubmit={handleSubmit}>



84

<input



85

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"



86

value={input}



87

placeholder="Say something..."



88

onChange={handleInputChange}



89

/>



90

</form>



91

</div>



92

);



93

}
```