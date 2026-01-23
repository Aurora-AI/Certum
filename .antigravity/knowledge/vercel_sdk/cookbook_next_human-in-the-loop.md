# https://sdk.vercel.ai/cookbook/next/human-in-the-loop

Copy markdown

[Human-in-the-Loop with Next.js](#human-in-the-loop-with-nextjs)
================================================================

When building agentic systems, it's important to add human-in-the-loop (HITL) functionality to ensure that users can approve actions before the system executes them. This recipe will describe how to [build a low-level solution](#adding-a-confirmation-step) and then provide an [example abstraction](#building-your-own-abstraction) you could implement and customize based on your needs.

[Background](#background)
-------------------------

To understand how to implement this functionality, let's look at how tool calling works in a simple Next.js chatbot application with the AI SDK.

On the frontend, use the `useChat` hook to manage the message state and user interaction.

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

const { messages, sendMessage } = useChat({



9

transport: new DefaultChatTransport({



10

api: '/api/chat',



11

}),



12

});



13

const [input, setInput] = useState('');



14



15

return (



16

<div>



17

<div>



18

{messages?.map(m => (



19

<div key={m.id}>



20

<strong>{`${m.role}: `}</strong>



21

{m.parts?.map((part, i) => {



22

switch (part.type) {



23

case 'text':



24

return <div key={i}>{part.text}</div>;



25

}



26

})}



27

<br />



28

</div>



29

))}



30

</div>



31



32

<form



33

onSubmit={e => {



34

e.preventDefault();



35

if (input.trim()) {



36

sendMessage({ text: input });



37

setInput('');



38

}



39

}}



40

>



41

<input



42

value={input}



43

placeholder="Say something..."



44

onChange={e => setInput(e.target.value)}



45

/>



46

</form>



47

</div>



48

);



49

}
```

On the backend, create a route handler (API Route) that returns a `UIMessageStreamResponse`. Within the execute function of `createUIMessageStream`, call `streamText` and pass in the converted `messages` (sent from the client). Finally, merge the resulting generation into the `UIMessageStream`.

api/chat/route.ts

```
1

import {



2

createUIMessageStreamResponse,



3

createUIMessageStream,



4

streamText,



5

tool,



6

convertToModelMessages,



7

stepCountIs,



8

UIMessage,



9

} from 'ai';



10

import { z } from 'zod';



11



12

export async function POST(req: Request) {



13

const { messages }: { messages: UIMessage[] } = await req.json();



14



15

const stream = createUIMessageStream({



16

originalMessages: messages,



17

execute: async ({ writer }) => {



18

const result = streamText({



19

model: 'openai/gpt-4o',



20

messages: await convertToModelMessages(messages),



21

tools: {



22

getWeatherInformation: tool({



23

description: 'show the weather in a given city to the user',



24

inputSchema: z.object({ city: z.string() }),



25

outputSchema: z.string(),



26

execute: async ({ city }) => {



27

const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy'];



28

return weatherOptions[



29

Math.floor(Math.random() * weatherOptions.length)



30

];



31

},



32

}),



33

},



34

stopWhen: stepCountIs(5),



35

});



36



37

writer.merge(result.toUIMessageStream({ originalMessages: messages }));



38

},



39

});



40



41

return createUIMessageStreamResponse({ stream });



42

}
```

What happens if you ask the LLM for the weather in New York?

The LLM has one tool available, `weather`, which requires a `location` to run. This tool will, as stated in the tool's `description`, "show the weather in a given city to the user". If the LLM decides that the `weather` tool could answer the user's query, it would generate a `ToolCall`, extracting the `location` from the context. The AI SDK would then run the associated `execute` function, passing in the `location` parameter, and finally returning a tool result.

To introduce a HITL step you will add a confirmation step to this process in between the tool call and the tool result.

[Adding a Confirmation Step](#adding-a-confirmation-step)
---------------------------------------------------------

At a high level, you will:

1. Intercept tool calls before they are executed
2. Render a confirmation UI with Yes/No buttons
3. Send a temporary tool result indicating whether the user confirmed or declined
4. On the server, check for the confirmation state in the tool result:
   * If confirmed, execute the tool and update the result
   * If declined, update the result with an error message
5. Send the updated tool result back to the client to maintain state consistency

### [Forward Tool Call To The Client](#forward-tool-call-to-the-client)

To implement HITL functionality, you start by omitting the `execute` function from the tool definition. This allows the frontend to intercept the tool call and handle the responsibility of adding the final tool result to the tool call.

api/chat/route.ts

```
1

import {



2

createUIMessageStreamResponse,



3

createUIMessageStream,



4

streamText,



5

tool,



6

convertToModelMessages,



7

stepCountIs,



8

} from 'ai';



9

import { z } from 'zod';



10



11

export async function POST(req: Request) {



12

const { messages } = await req.json();



13



14

const stream = createUIMessageStream({



15

originalMessages: messages,



16

execute: async ({ writer }) => {



17

const result = streamText({



18

model: 'openai/gpt-4o',



19

messages: await convertToModelMessages(messages),



20

tools: {



21

getWeatherInformation: tool({



22

description: 'show the weather in a given city to the user',



23

inputSchema: z.object({ city: z.string() }),



24

outputSchema: z.string(),



25

// execute function removed to stop automatic execution



26

}),



27

},



28

stopWhen: stepCountIs(5),



29

});



30



31

writer.merge(result.toUIMessageStream({ originalMessages: messages })); // pass in original messages to avoid duplicate assistant messages



32

},



33

});



34



35

return createUIMessageStreamResponse({ stream });



36

}
```

Each tool call must have a corresponding tool result. If you do not add a tool
result, all subsequent generations will fail.

### [Intercept Tool Call](#intercept-tool-call)

On the frontend, you map through the messages, either rendering the message content or checking for tool invocations and rendering custom UI.

You can check if the tool requiring confirmation has been called and, if so, present options to either confirm or deny the proposed tool call. This confirmation is done using the `addToolOutput` function to create a tool result and append it to the associated tool call.

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

isStaticToolUIPart,



7

getStaticToolName,



8

} from 'ai';



9

import { useState } from 'react';



10



11

export default function Chat() {



12

const { messages, addToolOutput, sendMessage } = useChat({



13

transport: new DefaultChatTransport({



14

api: '/api/chat',



15

}),



16

});



17

const [input, setInput] = useState('');



18



19

return (



20

<div>



21

<div>



22

{messages?.map(m => (



23

<div key={m.id}>



24

<strong>{`${m.role}: `}</strong>



25

{m.parts?.map((part, i) => {



26

if (part.type === 'text') {



27

return <div key={i}>{part.text}</div>;



28

}



29

if (isStaticToolUIPart(part)) {



30

const toolName = getStaticToolName(part);



31

const toolCallId = part.toolCallId;



32



33

// render confirmation tool (client-side tool with user interaction)



34

if (



35

toolName === 'getWeatherInformation' &&



36

part.state === 'input-available'



37

) {



38

return (



39

<div key={toolCallId}>



40

Get weather information for {part.input.city}?



41

<div>



42

<button



43

onClick={async () => {



44

await addToolOutput({



45

toolCallId,



46

tool: toolName,



47

output: 'Yes, confirmed.',



48

});



49

sendMessage();



50

}}



51

>



52

Yes



53

</button>



54

<button



55

onClick={async () => {



56

await addToolOutput({



57

toolCallId,



58

tool: toolName,



59

output: 'No, denied.',



60

});



61

sendMessage();



62

}}



63

>



64

No



65

</button>



66

</div>



67

</div>



68

);



69

}



70

}



71

})}



72

<br />



73

</div>



74

))}



75

</div>



76



77

<form



78

onSubmit={e => {



79

e.preventDefault();



80

if (input.trim()) {



81

sendMessage({ text: input });



82

setInput('');



83

}



84

}}



85

>



86

<input



87

value={input}



88

placeholder="Say something..."



89

onChange={e => setInput(e.target.value)}



90

/>



91

</form>



92

</div>



93

);



94

}
```

The `sendMessage()` function after `addToolOutput` will trigger a call to your
route handler.

### [Handle Confirmation Response](#handle-confirmation-response)

Adding a tool result and sending the message will trigger another call to your route handler. Before sending the new messages to the language model, you pull out the last message and map through the message parts to see if the tool requiring confirmation was called and whether it's in a "result" state. If those conditions are met, you check the confirmation state (the tool result state that you set on the frontend with the `addToolOutput` function).

api/chat/route.ts

```
1

import {



2

createUIMessageStreamResponse,



3

createUIMessageStream,



4

streamText,



5

tool,



6

convertToModelMessages,



7

stepCountIs,



8

isStaticToolUIPart,



9

getStaticToolName,



10

UIMessage,



11

} from 'ai';



12

import { z } from 'zod';



13



14

export async function POST(req: Request) {



15

const { messages }: { messages: UIMessage[] } = await req.json();



16



17

const stream = createUIMessageStream({



18

originalMessages: messages,



19

execute: async ({ writer }) => {



20

// pull out last message



21

const lastMessage = messages[messages.length - 1];



22



23

lastMessage.parts = await Promise.all(



24

// map through all message parts



25

lastMessage.parts?.map(async part => {



26

if (!isStaticToolUIPart(part)) {



27

return part;



28

}



29

const toolName = getStaticToolName(part);



30

// return if tool isn't weather tool or in a output-available state



31

if (



32

toolName !== 'getWeatherInformation' ||



33

part.state !== 'output-available'



34

) {



35

return part;



36

}



37



38

// switch through tool output states (set on the frontend)



39

switch (part.output) {



40

case 'Yes, confirmed.': {



41

const result = await executeWeatherTool(part.input);



42



43

// forward updated tool result to the client:



44

writer.write({



45

type: 'tool-output-available',



46

toolCallId: part.toolCallId,



47

output: result,



48

});



49



50

// update the message part:



51

return { ...part, output: result };



52

}



53

case 'No, denied.': {



54

const result = 'Error: User denied access to weather information';



55



56

// forward updated tool result to the client:



57

writer.write({



58

type: 'tool-output-available',



59

toolCallId: part.toolCallId,



60

output: result,



61

});



62



63

// update the message part:



64

return { ...part, output: result };



65

}



66

default:



67

return part;



68

}



69

}) ?? [],



70

);



71



72

const result = streamText({



73

model: 'openai/gpt-4o',



74

messages: await convertToModelMessages(messages),



75

tools: {



76

getWeatherInformation: tool({



77

description: 'show the weather in a given city to the user',



78

inputSchema: z.object({ city: z.string() }),



79

outputSchema: z.string(),



80

}),



81

},



82

stopWhen: stepCountIs(5),



83

});



84



85

writer.merge(result.toUIMessageStream({ originalMessages: messages }));



86

},



87

});



88



89

return createUIMessageStreamResponse({ stream });



90

}



91



92

async function executeWeatherTool({ city }: { city: string }) {



93

const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy'];



94

return weatherOptions[Math.floor(Math.random() * weatherOptions.length)];



95

}
```

In this implementation, you use simple strings like "Yes, the user confirmed" or "No, the user declined" as states. If confirmed, you execute the tool. If declined, you do not execute the tool. In both cases, you update the tool result from the arbitrary data you sent with the `addToolOutput` function to either the result of the execute function or an "Execution declined" statement. You send the updated tool result back to the frontend to maintain state synchronization.

After handling the tool result, your API route continues. This triggers another generation with the updated tool result, allowing the LLM to continue attempting to solve the query.

[Building your own abstraction](#building-your-own-abstraction)
---------------------------------------------------------------

The solution above is low-level and not very friendly to use in a production environment. You can build your own abstraction using these concepts

[Move tool declarations to their own file](#move-tool-declarations-to-their-own-file)
-------------------------------------------------------------------------------------

First, you will need to move tool declarations to their own file:

tools.ts

```
1

import { tool, ToolSet } from 'ai';



2

import { z } from 'zod';



3



4

const getWeatherInformation = tool({



5

description: 'show the weather in a given city to the user',



6

inputSchema: z.object({ city: z.string() }),



7

outputSchema: z.string(), // must define outputSchema



8

// no execute function, we want human in the loop



9

});



10



11

const getLocalTime = tool({



12

description: 'get the local time for a specified location',



13

inputSchema: z.object({ location: z.string() }),



14

outputSchema: z.string(),



15

// including execute function -> no confirmation required



16

execute: async ({ location }) => {



17

console.log(`Getting local time for ${location}`);



18

return '10am';



19

},



20

});



21



22

export const tools = {



23

getWeatherInformation,



24

getLocalTime,



25

} satisfies ToolSet;
```

In this file, you have two tools, `getWeatherInformation` (requires confirmation to run) and `getLocalTime`.

### [Create Type Definitions](#create-type-definitions)

Create a types file to define a custom message type:

types.ts

```
1

import { InferUITools, UIDataTypes, UIMessage } from 'ai';



2

import { tools } from './tools';



3



4

export type MyTools = InferUITools<typeof tools>;



5



6

// Define custom message type



7

export type HumanInTheLoopUIMessage = UIMessage<



8

never, // metadata type



9

UIDataTypes, // data parts type



10

MyTools // tools type



11

>;
```

### [Create Utility Functions](#create-utility-functions)

utils.ts

```
1

import {



2

convertToModelMessages,



3

Tool,



4

ToolExecutionOptions,



5

ToolSet,



6

UIMessageStreamWriter,



7

getStaticToolName,



8

isStaticToolUIPart,



9

} from 'ai';



10

import { HumanInTheLoopUIMessage } from './types';



11



12

// Approval string to be shared across frontend and backend



13

export const APPROVAL = {



14

YES: 'Yes, confirmed.',



15

NO: 'No, denied.',



16

} as const;



17



18

function isValidToolName<K extends PropertyKey, T extends object>(



19

key: K,



20

obj: T,



21

): key is K & keyof T {



22

return key in obj;



23

}



24



25

/**



26

* Processes tool invocations where human input is required, executing tools when authorized.



27

*



28

* @param options - The function options



29

* @param options.tools - Map of tool names to Tool instances that may expose execute functions



30

* @param options.writer - UIMessageStream writer for sending results back to the client



31

* @param options.messages - Array of messages to process



32

* @param executionFunctions - Map of tool names to execute functions



33

* @returns Promise resolving to the processed messages



34

*/



35

export async function processToolCalls<



36

Tools extends ToolSet,



37

ExecutableTools extends {



38

[Tool in keyof Tools as Tools[Tool] extends { execute: Function }



39

? never



40

: Tool]: Tools[Tool];



41

},



42

>(



43

{



44

writer,



45

messages,



46

}: {



47

tools: Tools; // used for type inference



48

writer: UIMessageStreamWriter;



49

messages: HumanInTheLoopUIMessage[]; // IMPORTANT: replace with your message type



50

},



51

executeFunctions: {



52

[K in keyof Tools & keyof ExecutableTools]?: (



53

args: ExecutableTools[K] extends Tool<infer P> ? P : never,



54

context: ToolExecutionOptions,



55

) => Promise<any>;



56

},



57

): Promise<HumanInTheLoopUIMessage[]> {



58

const lastMessage = messages[messages.length - 1];



59

const parts = lastMessage.parts;



60

if (!parts) return messages;



61



62

const processedParts = await Promise.all(



63

parts.map(async part => {



64

// Only process tool invocations parts



65

if (!isStaticToolUIPart(part)) return part;



66



67

const toolName = getStaticToolName(part);



68



69

// Only continue if we have an execute function for the tool (meaning it requires confirmation) and it's in a 'output-available' state



70

if (!(toolName in executeFunctions) || part.state !== 'output-available')



71

return part;



72



73

let result;



74



75

if (part.output === APPROVAL.YES) {



76

// Get the tool and check if the tool has an execute function.



77

if (



78

!isValidToolName(toolName, executeFunctions) ||



79

part.state !== 'output-available'



80

) {



81

return part;



82

}



83



84

const toolInstance = executeFunctions[toolName] as Tool['execute'];



85

if (toolInstance) {



86

result = await toolInstance(part.input, {



87

messages: await convertToModelMessages(messages),



88

toolCallId: part.toolCallId,



89

});



90

} else {



91

result = 'Error: No execute function found on tool';



92

}



93

} else if (part.output === APPROVAL.NO) {



94

result = 'Error: User denied access to tool execution';



95

} else {



96

// For any unhandled responses, return the original part.



97

return part;



98

}



99



100

// Forward updated tool result to the client.



101

writer.write({



102

type: 'tool-output-available',



103

toolCallId: part.toolCallId,



104

output: result,



105

});



106



107

// Return updated toolInvocation with the actual result.



108

return {



109

...part,



110

output: result,



111

};



112

}),



113

);



114



115

// Finally return the processed messages



116

return [...messages.slice(0, -1), { ...lastMessage, parts: processedParts }];



117

}



118



119

export function getToolsRequiringConfirmation<T extends ToolSet>(



120

tools: T,



121

): string[] {



122

return (Object.keys(tools) as (keyof T)[]).filter(key => {



123

const maybeTool = tools[key];



124

return typeof maybeTool.execute !== 'function';



125

}) as string[];



126

}
```

In this file, you first declare the confirmation strings as constants so we can share them across the frontend and backend (reducing possible errors). Next, we create function called `processToolCalls` which takes in the `messages`, `tools`, and the `writer`. It also takes in a second parameter, `executeFunction`, which is an object that maps `toolName` to the functions that will be run upon human confirmation. This function is strongly typed so:

* it autocompletes `executableTools` - these are tools without an execute function
* provides full type-safety for arguments and options available within the `execute` function

Unlike the low-level example, this will return a modified array of `messages` that can be passed directly to the LLM.

Finally, you declare a function called `getToolsRequiringConfirmation` that takes your tools as an argument and then will return the names of your tools without execute functions (in an array of strings). This avoids the need to manually write out and check for `toolName`'s on the frontend.

### [Update Route Handler](#update-route-handler)

Update your route handler to use the `processToolCalls` utility function.

app/api/chat/route.ts

```
1

import {



2

createUIMessageStreamResponse,



3

createUIMessageStream,



4

streamText,



5

convertToModelMessages,



6

stepCountIs,



7

} from 'ai';



8

import { processToolCalls } from './utils';



9

import { tools } from './tools';



10

import { HumanInTheLoopUIMessage } from './types';



11



12

// Allow streaming responses up to 30 seconds



13

export const maxDuration = 30;



14



15

export async function POST(req: Request) {



16

const { messages }: { messages: HumanInTheLoopUIMessage[] } =



17

await req.json();



18



19

const stream = createUIMessageStream({



20

originalMessages: messages,



21

execute: async ({ writer }) => {



22

// Utility function to handle tools that require human confirmation



23

// Checks for confirmation in last message and then runs associated tool



24

const processedMessages = await processToolCalls(



25

{



26

messages,



27

writer,



28

tools,



29

},



30

{



31

// type-safe object for tools without an execute function



32

getWeatherInformation: async ({ city }) => {



33

const conditions = ['sunny', 'cloudy', 'rainy', 'snowy'];



34

return `The weather in ${city} is ${



35

conditions[Math.floor(Math.random() * conditions.length)]



36

}.`;



37

},



38

},



39

);



40



41

const result = streamText({



42

model: 'openai/gpt-4o',



43

messages: convertToModelMessages(processedMessages),



44

tools,



45

stopWhen: stepCountIs(5),



46

});



47



48

writer.merge(



49

result.toUIMessageStream({ originalMessages: processedMessages }),



50

);



51

},



52

});



53



54

return createUIMessageStreamResponse({ stream });



55

}
```

### [Update Frontend](#update-frontend)

Finally, update the frontend to use the new `getToolsRequiringConfirmation` function and the `APPROVAL` values:

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

getStaticToolName,



7

isStaticToolUIPart,



8

} from 'ai';



9

import { tools } from '../api/chat/tools';



10

import { APPROVAL, getToolsRequiringConfirmation } from '../api/chat/utils';



11

import { useState } from 'react';



12

import { HumanInTheLoopUIMessage, MyTools } from '../api/chat/types';



13



14

export default function Chat() {



15

const { messages, addToolOutput, sendMessage } =



16

useChat<HumanInTheLoopUIMessage>({



17

transport: new DefaultChatTransport({



18

api: '/api/chat',



19

}),



20

});



21

const [input, setInput] = useState('');



22



23

const toolsRequiringConfirmation = getToolsRequiringConfirmation(tools);



24



25

// used to disable input while confirmation is pending



26

const pendingToolCallConfirmation = messages.some(m =>



27

m.parts?.some(



28

part =>



29

isStaticToolUIPart(part) &&



30

part.state === 'input-available' &&



31

toolsRequiringConfirmation.includes(getStaticToolName(part)),



32

),



33

);



34



35

return (



36

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



37

{messages?.map(m => (



38

<div key={m.id} className="whitespace-pre-wrap">



39

<strong>{`${m.role}: `}</strong>



40

{m.parts?.map((part, i) => {



41

if (part.type === 'text') {



42

return <div key={i}>{part.text}</div>;



43

}



44

if (isStaticToolUIPart<MyTools>(part)) {



45

const toolName = getStaticToolName(part);



46

const toolCallId = part.toolCallId;



47

const dynamicInfoStyles = 'font-mono bg-zinc-100 p-1 text-sm';



48



49

// render confirmation tool (client-side tool with user interaction)



50

if (



51

toolsRequiringConfirmation.includes(toolName) &&



52

part.state === 'input-available'



53

) {



54

return (



55

<div key={toolCallId}>



56

Run <span className={dynamicInfoStyles}>{toolName}</span>{' '}



57

with args: <br />



58

<span className={dynamicInfoStyles}>



59

{JSON.stringify(part.input, null, 2)}



60

</span>



61

<div className="flex gap-2 pt-2">



62

<button



63

className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"



64

onClick={async () => {



65

await addToolOutput({



66

toolCallId,



67

tool: toolName,



68

output: APPROVAL.YES,



69

});



70

sendMessage();



71

}}



72

>



73

Yes



74

</button>



75

<button



76

className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"



77

onClick={async () => {



78

await addToolOutput({



79

toolCallId,



80

tool: toolName,



81

output: APPROVAL.NO,



82

});



83

sendMessage();



84

}}



85

>



86

No



87

</button>



88

</div>



89

</div>



90

);



91

}



92

}



93

})}



94

<br />



95

</div>



96

))}



97



98

<form



99

onSubmit={e => {



100

e.preventDefault();



101

if (input.trim()) {



102

sendMessage({ text: input });



103

setInput('');



104

}



105

}}



106

>



107

<input



108

disabled={pendingToolCallConfirmation}



109

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 rounded shadow-xl"



110

value={input}



111

placeholder="Say something..."



112

onChange={e => setInput(e.target.value)}



113

/>



114

</form>



115

</div>



116

);



117

}
```

[Full Example](#full-example)
-----------------------------

To see this code in action, check out the [`next-openai` example](https://github.com/vercel/ai/tree/main/examples/next-openai) in the AI SDK repository. Navigate to the `/use-chat-human-in-the-loop` page and associated route handler.