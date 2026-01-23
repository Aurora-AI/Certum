# https://sdk.vercel.ai/cookbook/next/use-shared-chat-context

Copy markdown

[Share useChat State Across Components](#share-usechat-state-across-components)
===============================================================================

When building chat applications, you may want to access the same chat instance across multiple components. This allows you to display messages in one component, handle input in another, and control the chat state from anywhere in your application.

[Create a Chat Context](#create-a-chat-context)
-----------------------------------------------

First, create a context that will hold your chat instance and provide methods to interact with it.

app/chat-context.tsx

```
1

'use client';



2



3

import React, { createContext, useContext, ReactNode, useState } from 'react';



4

import { Chat } from '@ai-sdk/react';



5

import { DefaultChatTransport, UIMessage } from 'ai';



6



7

interface ChatContextValue {



8

// replace with your custom message type



9

chat: Chat<UIMessage>;



10

clearChat: () => void;



11

}



12



13

const ChatContext = createContext<ChatContextValue | undefined>(undefined);



14



15

function createChat() {



16

return new Chat<UIMessage>({



17

transport: new DefaultChatTransport({



18

api: '/api/chat',



19

}),



20

});



21

}



22



23

export function ChatProvider({ children }: { children: ReactNode }) {



24

const [chat, setChat] = useState(() => createChat());



25



26

const clearChat = () => {



27

setChat(createChat());



28

};



29



30

return (



31

<ChatContext.Provider



32

value={{



33

chat,



34

clearChat,



35

}}



36

>



37

{children}



38

</ChatContext.Provider>



39

);



40

}



41



42

export function useSharedChatContext() {



43

const context = useContext(ChatContext);



44

if (!context) {



45

throw new Error('useSharedChatContext must be used within a ChatProvider');



46

}



47

return context;



48

}
```

[Wrap Your App with the Provider](#wrap-your-app-with-the-provider)
-------------------------------------------------------------------

Add the ChatProvider to your layout to make the chat context available to all child components.

app/layout.tsx

```
1

import { ChatProvider } from './chat-context';



2



3

export default function Layout({ children }: { children: React.ReactNode }) {



4

return <ChatProvider>{children}</ChatProvider>;



5

}
```

[Display Messages and Clear Chat](#display-messages-and-clear-chat)
-------------------------------------------------------------------

Create a component that displays messages and provides a button to clear the chat.

app/page.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import { useSharedChatContext } from './chat-context';



5

import ChatInput from './chat-input';



6



7

export default function Chat() {



8

const { chat, clearChat } = useSharedChatContext();



9

const { messages } = useChat({



10

chat,



11

});



12



13

return (



14

<div>



15

<button onClick={clearChat} disabled={messages.length === 0}>



16

Clear Chat



17

</button>



18



19

{messages?.map(message => (



20

<div key={message.id}>



21

<strong>{`${message.role}: `}</strong>



22

{message.parts.map((part, index) => {



23

if (part.type === 'text') {



24

return <div key={index}>{part.text}</div>;



25

}



26

})}



27

</div>



28

))}



29



30

<ChatInput />



31

</div>



32

);



33

}
```

[Handle Input in a Separate Component](#handle-input-in-a-separate-component)
-----------------------------------------------------------------------------

Create an input component that uses the shared chat context to send messages.

app/chat-input.tsx

```
1

import { useChat } from '@ai-sdk/react';



2

import { useState } from 'react';



3

import { useSharedChatContext } from './chat-context';



4



5

export default function ChatInput() {



6

const { chat } = useSharedChatContext();



7

const [text, setText] = useState('');



8

const { status, stop, sendMessage } = useChat({ chat });



9



10

return (



11

<form



12

onSubmit={e => {



13

e.preventDefault();



14

if (text.trim() === '') return;



15

sendMessage({ text });



16

setText('');



17

}}



18

>



19

<input



20

placeholder="Say something..."



21

disabled={status !== 'ready'}



22

value={text}



23

onChange={e => setText(e.target.value)}



24

/>



25

{stop && (status === 'streaming' || status === 'submitted') && (



26

<button type="submit" onClick={stop}>



27

Stop



28

</button>



29

)}



30

</form>



31

);



32

}
```

[Server](#server)
-----------------

Create an API route to handle the chat messages using the AI SDK.

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, UIMessage } from 'ai';



2



3

export const maxDuration = 30;



4



5

export async function POST(req: Request) {



6

const { messages }: { messages: UIMessage[] } = await req.json();



7



8

const result = streamText({



9

model: 'openai/gpt-4o-mini',



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

[View Example on GitHub](https://github.com/vercel/ai/tree/main/examples/next-openai/app/use-chat-shared-context)