# https://sdk.vercel.ai/cookbook/next/chat-with-pdf

Copy markdown

[Chat with PDFs](#chat-with-pdfs)
=================================

Some language models like Anthropic's Claude Sonnet 3.5 and Google's Gemini 2.0 can understand PDFs and respond to questions about their contents. In this example, we'll show you how to build a chat interface that accepts PDF uploads.

This example requires a provider that supports PDFs, such as Anthropic's
Claude 3.7, Google's Gemini 2.5, or OpenAI's GPT-4.1. Check the [provider
documentation](/providers/ai-sdk-providers) for up-to-date support
information.

[Implementation](#implementation)
---------------------------------

### [Server](#server)

Create a route handler that will use Anthropic's Claude model to process messages and PDFs:

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, type UIMessage } from 'ai';



2



3

export async function POST(req: Request) {



4

const { messages }: { messages: UIMessage[] } = await req.json();



5



6

const result = streamText({



7

model: 'anthropic/claude-sonnet-4',



8

messages: await convertToModelMessages(messages),



9

});



10



11

return result.toUIMessageStreamResponse();



12

}
```

### [Client](#client)

Create a chat interface that allows uploading PDFs alongside messages:

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



7

async function convertFilesToDataURLs(



8

files: FileList,



9

): Promise<



10

{ type: 'file'; filename: string; mediaType: string; url: string }[]



11

> {



12

return Promise.all(



13

Array.from(files).map(



14

file =>



15

new Promise<{



16

type: 'file';



17

filename: string;



18

mediaType: string;



19

url: string;



20

}>((resolve, reject) => {



21

const reader = new FileReader();



22

reader.onload = () => {



23

resolve({



24

type: 'file',



25

filename: file.name,



26

mediaType: file.type,



27

url: reader.result as string, // Data URL



28

});



29

};



30

reader.onerror = reject;



31

reader.readAsDataURL(file);



32

}),



33

),



34

);



35

}



36



37

export default function Chat() {



38

const [input, setInput] = useState('');



39



40

const { messages, sendMessage } = useChat({



41

transport: new DefaultChatTransport({



42

api: '/api/chat',



43

}),



44

});



45



46

const [files, setFiles] = useState<FileList | undefined>(undefined);



47

const fileInputRef = useRef<HTMLInputElement>(null);



48



49

return (



50

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



51

{messages.map(message => (



52

<div key={message.id} className="whitespace-pre-wrap">



53

{message.role === 'user' ? 'User: ' : 'AI: '}



54



55

{message.parts.map(part => {



56

if (part.type === 'text') {



57

return <div key={`${message.id}-text`}>{part.text}</div>;



58

}



59

})}



60



61

<div></div>



62

</div>



63

))}



64



65

<form



66

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl space-y-2"



67

onSubmit={async event => {



68

event.preventDefault();



69



70

const fileParts =



71

files && files.length > 0



72

? await convertFilesToDataURLs(files)



73

: [];



74



75

sendMessage({



76

role: 'user',



77

parts: [{ type: 'text', text: input }, ...fileParts],



78

});



79



80

setFiles(undefined);



81

setInput('');



82



83

if (fileInputRef.current) {



84

fileInputRef.current.value = '';



85

}



86

}}



87

>



88

<input



89

type="file"



90

onChange={event => {



91

if (event.target.files) {



92

setFiles(event.target.files);



93

}



94

}}



95

multiple



96

ref={fileInputRef}



97

/>



98



99

<input



100

className="w-full p-2"



101

value={input}



102

placeholder="Say something..."



103

onChange={event => {



104

setInput(event.target.value);



105

}}



106

/>



107

</form>



108

</div>



109

);



110

}
```

The code uses the `useChat` hook which handles the file upload and message streaming. The `experimental_attachments` option allows you to send files alongside messages.

Make sure to set up your environment variables with your Anthropic API key:

.env.local

```
1

ANTHROPIC_API_KEY=xxxxxxxxx
```

Now you can upload PDFs and ask questions about their contents. The LLM will analyze the PDF and provide relevant responses based on the document's content.