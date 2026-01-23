# https://sdk.vercel.ai/cookbook/guides/multi-modal-chatbot

Copy markdown

[Multi-Modal Agent](#multi-modal-agent)
=======================================

In this guide, you will build a multi-modal agent capable of understanding both images and PDFs.

Multi-modal refers to the ability of the agent to understand and generate responses in multiple formats. In this guide, we'll focus on images and PDFs - two common document types that modern language models can process natively.

For a complete list of providers and their multi-modal capabilities, visit the
[providers documentation](/providers/ai-sdk-providers).

We'll build this agent using OpenAI's GPT-4o, but the same code works seamlessly with other providers - you can switch between them by changing just one line of code.

[Prerequisites](#prerequisites)
-------------------------------

To follow this quickstart, you'll need:

* Node.js 18+ and pnpm installed on your local development machine.
* A Vercel AI Gateway API key.

If you haven't obtained your Vercel AI Gateway API key, you can do so by [signing up](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai&title=Go+to+AI+Gateway) on the Vercel website.

[Create Your Application](#create-your-application)
---------------------------------------------------

Start by creating a new Next.js application. This command will create a new directory named `multi-modal-agent` and set up a basic Next.js application inside it.

Be sure to select yes when prompted to use the App Router. If you are
looking for the Next.js Pages Router quickstart guide, you can find it
[here](/docs/getting-started/nextjs-pages-router).

```
pnpm create next-app@latest multi-modal-agent
```

Navigate to the newly created directory:

```
cd multi-modal-agent
```

### [Install dependencies](#install-dependencies)

Install `ai` and `@ai-sdk/react`, the AI SDK package and the AI SDK's React package respectively.

The AI SDK is designed to be a unified interface to interact with any large
language model. This means that you can change model and providers with just
one line of code! Learn more about [available providers](/providers) and
[building custom providers](/providers/community-providers/custom-providers)
in the [providers](/providers) section.

pnpmnpmyarnbun

```
pnpm add ai @ai-sdk/react
```

### [Configure your Vercel AI Gateway API key](#configure-your-vercel-ai-gateway-api-key)

Create a `.env.local` file in your project root and add your Vercel AI Gateway API key. This key authenticates your application with Vercel AI Gateway.

```
touch .env.local
```

Edit the `.env.local` file:

.env.local

```
1

AI_GATEWAY_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Vercel AI Gateway API key.

The AI SDK's Vercel AI Gateway Provider is the default global provider, so you
can access models using a simple string in the model configuration. If you
prefer to use a specific provider like OpenAI directly, see the [provider
management](/docs/ai-sdk-core/provider-management) documentation.

[Implementation Plan](#implementation-plan)
-------------------------------------------

To build a multi-modal agent, you will need to:

* Create a Route Handler to handle incoming chat messages and generate responses.
* Wire up the UI to display chat messages, provide a user input, and handle submitting new messages.
* Add the ability to upload images and PDFs and attach them alongside the chat messages.

[Create a Route Handler](#create-a-route-handler)
-------------------------------------------------

Create a route handler, `app/api/chat/route.ts` and add the following code:

app/api/chat/route.ts

```
1

import { streamText, convertToModelMessages, type UIMessage } from 'ai';



2



3

// Allow streaming responses up to 30 seconds



4

export const maxDuration = 30;



5



6

export async function POST(req: Request) {



7

const { messages }: { messages: UIMessage[] } = await req.json();



8



9

const result = streamText({



10

model: 'openai/gpt-4o',



11

messages: await convertToModelMessages(messages),



12

});



13



14

return result.toUIMessageStreamResponse();



15

}
```

Let's take a look at what is happening in this code:

1. Define an asynchronous `POST` request handler and extract `messages` from the body of the request. The `messages` variable contains a history of the conversation between you and the agent and provides the agent with the necessary context to make the next generation.
2. Convert the UI messages to model messages using `convertToModelMessages`, which transforms the UI-focused message format to the format expected by the language model.
3. Call [`streamText`](/docs/reference/ai-sdk-core/stream-text), which is imported from the `ai` package. This function accepts a configuration object that contains a `model` provider and `messages` (converted in step 2). You can pass additional [settings](/docs/ai-sdk-core/settings) to further customize the model's behavior.
4. The `streamText` function returns a [`StreamTextResult`](/docs/reference/ai-sdk-core/stream-text#result-object). This result object contains the  [`toUIMessageStreamResponse`](/docs/reference/ai-sdk-core/stream-text#to-ui-message-stream-response)  function which converts the result to a streamed response object.
5. Finally, return the result to the client to stream the response.

This Route Handler creates a POST request endpoint at `/api/chat`.

[Wire up the UI](#wire-up-the-ui)
---------------------------------

Now that you have a Route Handler that can query a large language model (LLM), it's time to setup your frontend.  [AI SDK UI](/docs/ai-sdk-ui)  abstracts the complexity of a chat interface into one hook, [`useChat`](/docs/reference/ai-sdk-ui/use-chat).

Update your root page (`app/page.tsx`) with the following code to show a list of chat messages and provide a user message input:

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



10

const { messages, sendMessage } = useChat({



11

transport: new DefaultChatTransport({



12

api: '/api/chat',



13

}),



14

});



15



16

return (



17

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



18

{messages.map(m => (



19

<div key={m.id} className="whitespace-pre-wrap">



20

{m.role === 'user' ? 'User: ' : 'AI: '}



21

{m.parts.map((part, index) => {



22

if (part.type === 'text') {



23

return <span key={`${m.id}-text-${index}`}>{part.text}</span>;



24

}



25

return null;



26

})}



27

</div>



28

))}



29



30

<form



31

onSubmit={async event => {



32

event.preventDefault();



33

sendMessage({



34

role: 'user',



35

parts: [{ type: 'text', text: input }],



36

});



37

setInput('');



38

}}



39

className="fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl"



40

>



41

<input



42

className="w-full p-2"



43

value={input}



44

placeholder="Say something..."



45

onChange={e => setInput(e.target.value)}



46

/>



47

</form>



48

</div>



49

);



50

}
```

Make sure you add the `"use client"` directive to the top of your file. This
allows you to add interactivity with JavaScript.

This page utilizes the `useChat` hook, configured with `DefaultChatTransport` to specify the API endpoint. The `useChat` hook provides multiple utility functions and state variables:

* `messages` - the current chat messages (an array of objects with `id`, `role`, and `parts` properties).
* `sendMessage` - function to send a new message to the AI.
* Each message contains a `parts` array that can include text, images, PDFs, and other content types.
* Files are converted to data URLs before being sent to maintain compatibility across different environments.

[Add File Upload](#add-file-upload)
-----------------------------------

To make your agent multi-modal, let's add the ability to upload and send both images and PDFs to the model. In v5, files are sent as part of the message's `parts` array. Files are converted to data URLs using the FileReader API before being sent to the server.

Update your root page (`app/page.tsx`) with the following code:

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

import { useRef, useState } from 'react';



6

import Image from 'next/image';



7



8

async function convertFilesToDataURLs(files: FileList) {



9

return Promise.all(



10

Array.from(files).map(



11

file =>



12

new Promise<{



13

type: 'file';



14

mediaType: string;



15

url: string;



16

}>((resolve, reject) => {



17

const reader = new FileReader();



18

reader.onload = () => {



19

resolve({



20

type: 'file',



21

mediaType: file.type,



22

url: reader.result as string,



23

});



24

};



25

reader.onerror = reject;



26

reader.readAsDataURL(file);



27

}),



28

),



29

);



30

}



31



32

export default function Chat() {



33

const [input, setInput] = useState('');



34

const [files, setFiles] = useState<FileList | undefined>(undefined);



35

const fileInputRef = useRef<HTMLInputElement>(null);



36



37

const { messages, sendMessage } = useChat({



38

transport: new DefaultChatTransport({



39

api: '/api/chat',



40

}),



41

});



42



43

return (



44

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



45

{messages.map(m => (



46

<div key={m.id} className="whitespace-pre-wrap">



47

{m.role === 'user' ? 'User: ' : 'AI: '}



48

{m.parts.map((part, index) => {



49

if (part.type === 'text') {



50

return <span key={`${m.id}-text-${index}`}>{part.text}</span>;



51

}



52

if (part.type === 'file' && part.mediaType?.startsWith('image/')) {



53

return (



54

<Image



55

key={`${m.id}-image-${index}`}



56

src={part.url}



57

width={500}



58

height={500}



59

alt={`attachment-${index}`}



60

/>



61

);



62

}



63

if (part.type === 'file' && part.mediaType === 'application/pdf') {



64

return (



65

<iframe



66

key={`${m.id}-pdf-${index}`}



67

src={part.url}



68

width={500}



69

height={600}



70

title={`pdf-${index}`}



71

/>



72

);



73

}



74

return null;



75

})}



76

</div>



77

))}



78



79

<form



80

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl space-y-2"



81

onSubmit={async event => {



82

event.preventDefault();



83



84

const fileParts =



85

files && files.length > 0



86

? await convertFilesToDataURLs(files)



87

: [];



88



89

sendMessage({



90

role: 'user',



91

parts: [{ type: 'text', text: input }, ...fileParts],



92

});



93



94

setInput('');



95

setFiles(undefined);



96



97

if (fileInputRef.current) {



98

fileInputRef.current.value = '';



99

}



100

}}



101

>



102

<input



103

type="file"



104

accept="image/*,application/pdf"



105

className=""



106

onChange={event => {



107

if (event.target.files) {



108

setFiles(event.target.files);



109

}



110

}}



111

multiple



112

ref={fileInputRef}



113

/>



114

<input



115

className="w-full p-2"



116

value={input}



117

placeholder="Say something..."



118

onChange={e => setInput(e.target.value)}



119

/>



120

</form>



121

</div>



122

);



123

}
```

In this code, you:

1. Add a helper function `convertFilesToDataURLs` to convert file uploads to data URLs.
2. Create state to hold the input text, files, and a ref to the file input field.
3. Configure `useChat` with `DefaultChatTransport` to specify the API endpoint.
4. Display messages using the `parts` array structure, rendering text, images, and PDFs appropriately.
5. Update the `onSubmit` function to send messages with the `sendMessage` function, including both text and file parts.
6. Add a file input field to the form, including an `onChange` handler to handle updating the files state.

[Running Your Application](#running-your-application)
-----------------------------------------------------

With that, you have built everything you need for your multi-modal agent! To start your application, use the command:

```
pnpm run dev
```

Head to your browser and open <http://localhost:3000>. You should see an input field and a button to upload files.

Try uploading an image or PDF and asking the model questions about it. Watch as the model's response is streamed back to you!

[Using Other Providers](#using-other-providers)
-----------------------------------------------

With the AI SDK's unified provider interface you can easily switch to other providers that support multi-modal capabilities:

app/api/chat/route.ts

```
1

// Using Anthropic



2

const result = streamText({



3

model: 'anthropic/claude-sonnet-4-20250514',



4

messages: await convertToModelMessages(messages),



5

});



6



7

// Using Google



8

const result = streamText({



9

model: 'google/gemini-2.5-flash',



10

messages: await convertToModelMessages(messages),



11

});
```

Install the provider package (`@ai-sdk/anthropic` or `@ai-sdk/google`) and update your API keys in `.env.local`. The rest of your code remains the same.

Different providers may have varying file size limits and performance
characteristics. Check the [provider
documentation](/providers/ai-sdk-providers) for specific details.

[Where to Next?](#where-to-next)
--------------------------------

You've built a multi-modal AI agent using the AI SDK! Experiment and extend the functionality of this application further by exploring [tool calling](/docs/ai-sdk-core/tools-and-tool-calling).