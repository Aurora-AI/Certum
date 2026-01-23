# https://sdk.vercel.ai/cookbook/next/markdown-chatbot-with-memoization

Copy markdown

[Markdown Chatbot with Memoization](#markdown-chatbot-with-memoization)
=======================================================================

When building a chatbot with Next.js and the AI SDK, you'll likely want to render the model's responses in Markdown format using a library like `react-markdown`. However, this can have negative performance implications as the Markdown is re-rendered on each new token received from the streaming response.

As conversations get longer and more complex, this performance impact becomes exponentially worse since the entire conversation history is re-rendered with each new token.

This recipe uses memoization - a performance optimization technique where the results of expensive function calls are cached and reused to avoid unnecessary re-computation. In this case, parsed Markdown blocks are memoized to prevent them from being re-parsed and re-rendered on each token update, which means that once a block is fully parsed, it's cached and reused rather than being regenerated. This approach significantly improves rendering performance for long conversations by eliminating redundant parsing and rendering operations.

[Installation](#installation)
-----------------------------

First, install the required dependencies for Markdown rendering and parsing:

```
1

npm install react-markdown marked
```

[Server](#server)
-----------------

On the server, you use a simple route handler that streams the response from the language model.

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

system:



8

'You are a helpful assistant. Respond to the user in Markdown format.',



9

model: 'openai/gpt-4o',



10

messages: await convertToModelMessages(messages),



11

});



12



13

return result.toUIMessageStreamResponse();



14

}
```

[Memoized Markdown Component](#memoized-markdown-component)
-----------------------------------------------------------

Next, create a memoized markdown component that will take in raw Markdown text into blocks and only updates when the content actually changes. This component splits Markdown content into blocks using the `marked` library to identify discrete Markdown elements, then uses React's memoization features to optimize re-rendering by only updating blocks that have actually changed.

components/memoized-markdown.tsx

```
1

import { marked } from 'marked';



2

import { memo, useMemo } from 'react';



3

import ReactMarkdown from 'react-markdown';



4



5

function parseMarkdownIntoBlocks(markdown: string): string[] {



6

const tokens = marked.lexer(markdown);



7

return tokens.map(token => token.raw);



8

}



9



10

const MemoizedMarkdownBlock = memo(



11

({ content }: { content: string }) => {



12

return <ReactMarkdown>{content}</ReactMarkdown>;



13

},



14

(prevProps, nextProps) => {



15

if (prevProps.content !== nextProps.content) return false;



16

return true;



17

},



18

);



19



20

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';



21



22

export const MemoizedMarkdown = memo(



23

({ content, id }: { content: string; id: string }) => {



24

const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);



25



26

return blocks.map((block, index) => (



27

<MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />



28

));



29

},



30

);



31



32

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
```

[Client](#client)
-----------------

Finally, on the client, use the `useChat` hook to manage the chat state and render the chat interface. You can use the `MemoizedMarkdown` component to render the message contents in Markdown format without compromising on performance. Additionally, you can render the form in its own component so as to not trigger unnecessary re-renders of the chat messages. You can also use the `experimental_throttle` option that will throttle data updates to a specified interval, helping to manage rendering performance.

app/page.tsx

```
1

"use client";



2



3

import { Chat, useChat } from "@ai-sdk/react";



4

import { DefaultChatTransport } from "ai";



5

import { useState } from "react";



6

import { MemoizedMarkdown } from "@/components/memoized-markdown";



7



8

const chat = new Chat({



9

transport: new DefaultChatTransport({



10

api: "/api/chat",



11

}),



12

});



13



14

export default function Page() {



15

const { messages } = useChat({ chat, experimental_throttle: 50 });



16



17

return (



18

<div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">



19

<div className="space-y-8 mb-4">



20

{messages.map((message) => (



21

<div key={message.id}>



22

<div className="font-bold mb-2">



23

{message.role === "user" ? "You" : "Assistant"}



24

</div>



25

<div className="prose space-y-2">



26

{message.parts.map((part) => {



27

if (part.type === "text") {



28

return (



29

<MemoizedMarkdown



30

key={`${message.id}-text`}



31

id={message.id}



32

content={part.text}



33

/>



34

);



35

}



36

})}



37

</div>



38

</div>



39

))}



40

</div>



41



42

<MessageInput />



43

</div>



44

);



45

}



46



47

const MessageInput = () => {



48

const [input, setInput] = useState("");



49

const { sendMessage } = useChat({ chat });



50



51

return (



52

<form



53

onSubmit={(event) => {



54

event.preventDefault();



55

sendMessage({



56

text: input,



57

});



58

setInput("");



59

}}



60

>



61

<input



62

className="fixed bottom-0 w-full max-w-xl p-2 mb-8 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"



63

placeholder="Say something..."



64

value={input}



65

onChange={(event) => {



66

setInput(event.target.value);



67

}}



68

/>



69

</form>



70

);



71

};
```

The chat state is shared between both components by using the same `Chat`
instance. This allows you to split the form and chat messages into separate
components while maintaining synchronized state.