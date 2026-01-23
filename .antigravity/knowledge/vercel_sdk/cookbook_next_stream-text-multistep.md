# https://sdk.vercel.ai/cookbook/next/stream-text-multistep

Copy markdown

[streamText Multi-Step Agent](#streamtext-multi-step-agent)
===========================================================

You may want to have different steps in your stream where each step has different settings,
e.g. models, tools, or system prompts.

With `createUIMessageStream` and `sendFinish` / `sendStart` options when merging
into the `UIMessageStream`, you can control when the finish and start events are sent to the client,
allowing you to have different steps in a single assistant UI message.

[Server](#server)
-----------------

app/api/chat/route.ts

```
1

import {



2

convertToModelMessages,



3

createUIMessageStream,



4

createUIMessageStreamResponse,



5

streamText,



6

tool,



7

} from 'ai';



8

import { z } from 'zod';



9



10

export async function POST(req: Request) {



11

const { messages } = await req.json();



12



13

const stream = createUIMessageStream({



14

execute: async ({ writer }) => {



15

// step 1 example: forced tool call



16

const result1 = streamText({



17

model: 'openai/gpt-4o-mini',



18

system: 'Extract the user goal from the conversation.',



19

messages,



20

toolChoice: 'required', // force the model to call a tool



21

tools: {



22

extractGoal: tool({



23

inputSchema: z.object({ goal: z.string() }),



24

execute: async ({ goal }) => goal, // no-op extract tool



25

}),



26

},



27

});



28



29

// forward the initial result to the client without the finish event:



30

writer.merge(result1.toUIMessageStream({ sendFinish: false }));



31



32

// note: you can use any programming construct here, e.g. if-else, loops, etc.



33

// workflow programming is normal programming with this approach.



34



35

// example: continue stream with forced tool call from previous step



36

const result2 = streamText({



37

// different system prompt, different model, no tools:



38

model: 'openai/gpt-4o',



39

system:



40

'You are a helpful assistant with a different system prompt. Repeat the extract user goal in your answer.',



41

// continue the workflow stream with the messages from the previous step:



42

messages: [



43

...convertToModelMessages(messages),



44

...(await result1.response).messages,



45

],



46

});



47



48

// forward the 2nd result to the client (incl. the finish event):



49

writer.merge(result2.toUIMessageStream({ sendStart: false }));



50

},



51

});



52



53

return createUIMessageStreamResponse({ stream });



54

}
```

[Client](#client)
-----------------

app/page.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4

import { useState } from 'react';



5



6

export default function Chat() {



7

const [input, setInput] = useState('');



8

const { messages, sendMessage } = useChat();



9



10

return (



11

<div>



12

{messages?.map(message => (



13

<div key={message.id}>



14

<strong>{`${message.role}: `}</strong>



15

{message.parts.map((part, index) => {



16

switch (part.type) {



17

case 'text':



18

return <span key={index}>{part.text}</span>;



19

case 'tool-extractGoal': {



20

return <pre key={index}>{JSON.stringify(part, null, 2)}</pre>;



21

}



22

}



23

})}



24

</div>



25

))}



26

<form



27

onSubmit={e => {



28

e.preventDefault();



29

sendMessage({ text: input });



30

setInput('');



31

}}



32

>



33

<input value={input} onChange={e => setInput(e.currentTarget.value)} />



34

</form>



35

</div>



36

);



37

}
```