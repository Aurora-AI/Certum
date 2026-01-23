# https://sdk.vercel.ai/cookbook/next/stream-text-with-image-prompt

Copy markdown

[Stream Text with Image Prompt](#stream-text-with-image-prompt)
===============================================================

Vision models such as GPT-4o can process both text and images. In this example, we will show you how to send an image URL along with the user's message to the model with `useChat`.

[Using Image URLs](#using-image-urls)
-------------------------------------

### [Server](#server)

The server route uses `convertToModelMessages` to handle the conversion from `UIMessage`s to model messages, which automatically handles multimodal content including images.

app/api/chat/route.ts

```
1

import { streamText } from 'ai';



2



3

export const maxDuration = 60;



4



5

export async function POST(req: Request) {



6

const { messages } = await req.json();



7



8

// Call the language model



9

const result = streamText({



10

model: 'openai/gpt-4.1',



11

messages: await convertToModelMessages(messages),



12

});



13



14

// Respond with the stream



15

return result.toUIMessageStreamResponse();



16

}
```

### [Client](#client)

On the client side, we use the new `useChat` hook and send multimodal messages using the `parts` array.

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

// Allow streaming responses up to 30 seconds



8

export const maxDuration = 30;



9



10

export default function Chat() {



11

const [input, setInput] = useState('');



12

const [imageUrl, setImageUrl] = useState(



13

'https://science.nasa.gov/wp-content/uploads/2023/09/web-first-images-release.png',



14

);



15



16

const { messages, sendMessage } = useChat();



17



18

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {



19

event.preventDefault();



20

sendMessage({



21

role: 'user',



22

parts: [



23

// check if imageUrl is defined, if so, add it to the message



24

...(imageUrl.trim().length > 0



25

? [



26

{



27

type: 'file' as const,



28

mediaType: 'image/png',



29

url: imageUrl,



30

},



31

]



32

: []),



33

{ type: 'text' as const, text: input },



34

],



35

});



36

setInput('');



37

setImageUrl('');



38

};



39



40

return (



41

<div>



42

<div>



43

{messages.map(m => (



44

<div key={m.id}>



45

<span>{m.role === 'user' ? 'User: ' : 'AI: '}</span>



46

<div>



47

{m.parts.map((part, i) => {



48

switch (part.type) {



49

case 'text':



50

return part.text;



51

case 'file':



52

return (



53

<img



54

key={(part.filename || 'image') + i}



55

src={part.url}



56

alt={part.filename ?? 'image'}



57

/>



58

);



59

default:



60

return null;



61

}



62

})}



63

</div>



64

</div>



65

))}



66

</div>



67

<form onSubmit={handleSubmit}>



68

<div>



69

<label htmlFor="image-url">Image URL:</label>



70

<input



71

id="image-url"



72

value={imageUrl}



73

placeholder="Enter image URL..."



74

onChange={e => setImageUrl(e.currentTarget.value)}



75

/>



76

</div>



77

<div>



78

<label htmlFor="image-description">Prompt:</label>



79

<input



80

id="image-description"



81

value={input}



82

placeholder="What does the image show..."



83

onChange={e => setInput(e.currentTarget.value)}



84

/>



85

</div>



86

<button type="submit">Send Message</button>



87

</form>



88

</div>



89

);



90

}
```