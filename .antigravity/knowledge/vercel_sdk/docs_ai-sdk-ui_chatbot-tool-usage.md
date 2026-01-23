# https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage

Copy markdown

[Chatbot Tool Usage](#chatbot-tool-usage)
=========================================

With [`useChat`](/docs/reference/ai-sdk-ui/use-chat) and [`streamText`](/docs/reference/ai-sdk-core/stream-text), you can use tools in your chatbot application.
The AI SDK supports three types of tools in this context:

1. Automatically executed server-side tools
2. Automatically executed client-side tools
3. Tools that require user interaction, such as confirmation dialogs

The flow is as follows:

1. The user enters a message in the chat UI.
2. The message is sent to the API route.
3. In your server side route, the language model generates tool calls during the `streamText` call.
4. All tool calls are forwarded to the client.
5. Server-side tools are executed using their `execute` method and their results are forwarded to the client.
6. Client-side tools that should be automatically executed are handled with the `onToolCall` callback.
   You must call `addToolOutput` to provide the tool result.
7. Client-side tool that require user interactions can be displayed in the UI.
   The tool calls and results are available as tool invocation parts in the `parts` property of the last assistant message.
8. When the user interaction is done, `addToolOutput` can be used to add the tool result to the chat.
9. The chat can be configured to automatically submit when all tool results are available using `sendAutomaticallyWhen`.
   This triggers another iteration of this flow.

The tool calls and tool executions are integrated into the assistant message as typed tool parts.
A tool part is at first a tool call, and then it becomes a tool result when the tool is executed.
The tool result contains all information about the tool call as well as the result of the tool execution.

Tool result submission can be configured using the `sendAutomaticallyWhen`
option. You can use the `lastAssistantMessageIsCompleteWithToolCalls` helper
to automatically submit when all tool results are available. This simplifies
the client-side code while still allowing full control when needed.

[Example](#example)
-------------------

In this example, we'll use three tools:

* `getWeatherInformation`: An automatically executed server-side tool that returns the weather in a given city.
* `askForConfirmation`: A user-interaction client-side tool that asks the user for confirmation.
* `getLocation`: An automatically executed client-side tool that returns a random city.

### [API route](#api-route)

GatewayProviderCustom

Claude Sonnet 4.5

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, UIMessage } from 'ai';



2

import { z } from 'zod';



3



4

// Allow streaming responses up to 30 seconds



5

export const maxDuration = 30;



6



7

export async function POST(req: Request) {



8

const { messages }: { messages: UIMessage[] } = await req.json();



9



10

const result = streamText({



11

model: "anthropic/claude-sonnet-4.5",



12

messages: await convertToModelMessages(messages),



13

tools: {



14

// server-side tool with execute function:



15

getWeatherInformation: {



16

description: 'show the weather in a given city to the user',



17

inputSchema: z.object({ city: z.string() }),



18

execute: async ({}: { city: string }) => {



19

const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];



20

return weatherOptions[



21

Math.floor(Math.random() * weatherOptions.length)



22

];



23

},



24

},



25

// client-side tool that starts user interaction:



26

askForConfirmation: {



27

description: 'Ask the user for confirmation.',



28

inputSchema: z.object({



29

message: z.string().describe('The message to ask for confirmation.'),



30

}),



31

},



32

// client-side tool that is automatically executed on the client:



33

getLocation: {



34

description:



35

'Get the user location. Always ask for confirmation before using this tool.',



36

inputSchema: z.object({}),



37

},



38

},



39

});



40



41

return result.toUIMessageStreamResponse();



42

}
```

### [Client-side page](#client-side-page)

The client-side page uses the `useChat` hook to create a chatbot application with real-time message streaming.
Tool calls are displayed in the chat UI as typed tool parts.
Please make sure to render the messages using the `parts` property of the message.

There are three things worth mentioning:

1. The [`onToolCall`](/docs/reference/ai-sdk-ui/use-chat#on-tool-call) callback is used to handle client-side tools that should be automatically executed.
   In this example, the `getLocation` tool is a client-side tool that returns a random city.
   You call `addToolOutput` to provide the result (without `await` to avoid potential deadlocks).

   Always check `if (toolCall.dynamic)` first in your `onToolCall` handler.
   Without this check, TypeScript will throw an error like: `Type 'string' is not assignable to type '"toolName1" | "toolName2"'` when you try to use
   `toolCall.toolName` in `addToolOutput`.
2. The [`sendAutomaticallyWhen`](/docs/reference/ai-sdk-ui/use-chat#send-automatically-when) option with `lastAssistantMessageIsCompleteWithToolCalls` helper automatically submits when all tool results are available.
3. The `parts` array of assistant messages contains tool parts with typed names like `tool-askForConfirmation`.
   The client-side tool `askForConfirmation` is displayed in the UI.
   It asks the user for confirmation and displays the result once the user confirms or denies the execution.
   The result is added to the chat using `addToolOutput` with the `tool` parameter for type safety.

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



10

export default function Chat() {



11

const { messages, sendMessage, addToolOutput } = useChat({



12

transport: new DefaultChatTransport({



13

api: '/api/chat',



14

}),



15



16

sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,



17



18

// run client-side tools that are automatically executed:



19

async onToolCall({ toolCall }) {



20

// Check if it's a dynamic tool first for proper type narrowing



21

if (toolCall.dynamic) {



22

return;



23

}



24



25

if (toolCall.toolName === 'getLocation') {



26

const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];



27



28

// No await - avoids potential deadlocks



29

addToolOutput({



30

tool: 'getLocation',



31

toolCallId: toolCall.toolCallId,



32

output: cities[Math.floor(Math.random() * cities.length)],



33

});



34

}



35

},



36

});



37

const [input, setInput] = useState('');



38



39

return (



40

<>



41

{messages?.map(message => (



42

<div key={message.id}>



43

<strong>{`${message.role}: `}</strong>



44

{message.parts.map(part => {



45

switch (part.type) {



46

// render text parts as simple text:



47

case 'text':



48

return part.text;



49



50

// for tool parts, use the typed tool part names:



51

case 'tool-askForConfirmation': {



52

const callId = part.toolCallId;



53



54

switch (part.state) {



55

case 'input-streaming':



56

return (



57

<div key={callId}>Loading confirmation request...</div>



58

);



59

case 'input-available':



60

return (



61

<div key={callId}>



62

{part.input.message}



63

<div>



64

<button



65

onClick={() =>



66

addToolOutput({



67

tool: 'askForConfirmation',



68

toolCallId: callId,



69

output: 'Yes, confirmed.',



70

})



71

}



72

>



73

Yes



74

</button>



75

<button



76

onClick={() =>



77

addToolOutput({



78

tool: 'askForConfirmation',



79

toolCallId: callId,



80

output: 'No, denied',



81

})



82

}



83

>



84

No



85

</button>



86

</div>



87

</div>



88

);



89

case 'output-available':



90

return (



91

<div key={callId}>



92

Location access allowed: {part.output}



93

</div>



94

);



95

case 'output-error':



96

return <div key={callId}>Error: {part.errorText}</div>;



97

}



98

break;



99

}



100



101

case 'tool-getLocation': {



102

const callId = part.toolCallId;



103



104

switch (part.state) {



105

case 'input-streaming':



106

return (



107

<div key={callId}>Preparing location request...</div>



108

);



109

case 'input-available':



110

return <div key={callId}>Getting location...</div>;



111

case 'output-available':



112

return <div key={callId}>Location: {part.output}</div>;



113

case 'output-error':



114

return (



115

<div key={callId}>



116

Error getting location: {part.errorText}



117

</div>



118

);



119

}



120

break;



121

}



122



123

case 'tool-getWeatherInformation': {



124

const callId = part.toolCallId;



125



126

switch (part.state) {



127

// example of pre-rendering streaming tool inputs:



128

case 'input-streaming':



129

return (



130

<pre key={callId}>{JSON.stringify(part, null, 2)}</pre>



131

);



132

case 'input-available':



133

return (



134

<div key={callId}>



135

Getting weather information for {part.input.city}...



136

</div>



137

);



138

case 'output-available':



139

return (



140

<div key={callId}>



141

Weather in {part.input.city}: {part.output}



142

</div>



143

);



144

case 'output-error':



145

return (



146

<div key={callId}>



147

Error getting weather for {part.input.city}:{' '}



148

{part.errorText}



149

</div>



150

);



151

}



152

break;



153

}



154

}



155

})}



156

<br />



157

</div>



158

))}



159



160

<form



161

onSubmit={e => {



162

e.preventDefault();



163

if (input.trim()) {



164

sendMessage({ text: input });



165

setInput('');



166

}



167

}}



168

>



169

<input value={input} onChange={e => setInput(e.target.value)} />



170

</form>



171

</>



172

);



173

}
```

### [Error handling](#error-handling)

Sometimes an error may occur during client-side tool execution. Use the `addToolOutput` method with a `state` of `output-error` and `errorText` value instead of `output` record the error.

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



10

export default function Chat() {



11

const { messages, sendMessage, addToolOutput } = useChat({



12

transport: new DefaultChatTransport({



13

api: '/api/chat',



14

}),



15



16

sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,



17



18

// run client-side tools that are automatically executed:



19

async onToolCall({ toolCall }) {



20

// Check if it's a dynamic tool first for proper type narrowing



21

if (toolCall.dynamic) {



22

return;



23

}



24



25

if (toolCall.toolName === 'getWeatherInformation') {



26

try {



27

const weather = await getWeatherInformation(toolCall.input);



28



29

// No await - avoids potential deadlocks



30

addToolOutput({



31

tool: 'getWeatherInformation',



32

toolCallId: toolCall.toolCallId,



33

output: weather,



34

});



35

} catch (err) {



36

addToolOutput({



37

tool: 'getWeatherInformation',



38

toolCallId: toolCall.toolCallId,



39

state: 'output-error',



40

errorText: 'Unable to get the weather information',



41

});



42

}



43

}



44

},



45

});



46

}
```

[Tool Execution Approval](#tool-execution-approval)
---------------------------------------------------

Tool execution approval lets you require user confirmation before a server-side tool runs. Unlike [client-side tools](#example) that execute in the browser, tools with approval still execute on the server—but only after the user approves.

Use tool execution approval when you want to:

* Confirm sensitive operations (payments, deletions, external API calls)
* Let users review tool inputs before execution
* Add human oversight to automated workflows

For tools that need to run in the browser (updating UI state, accessing browser APIs), use client-side tools instead.

### [Server Setup](#server-setup)

Enable approval by setting `needsApproval` on your tool. See [Tool Execution Approval](/docs/ai-sdk-core/tools-and-tool-calling#tool-execution-approval) for configuration options including dynamic approval based on input.

GatewayProviderCustom

Claude Sonnet 4.5

app/api/chat/route.ts

```
1

import { streamText, tool } from 'ai';



2

import { z } from 'zod';



3



4

export async function POST(req: Request) {



5

const { messages } = await req.json();



6



7

const result = streamText({



8

model: "anthropic/claude-sonnet-4.5",



9

messages,



10

tools: {



11

getWeather: tool({



12

description: 'Get the weather in a location',



13

inputSchema: z.object({



14

city: z.string(),



15

}),



16

needsApproval: true,



17

execute: async ({ city }) => {



18

const weather = await fetchWeather(city);



19

return weather;



20

},



21

}),



22

},



23

});



24



25

return result.toUIMessageStreamResponse();



26

}
```

### [Client-Side Approval UI](#client-side-approval-ui)

When a tool requires approval, the tool part state is `approval-requested`. Use `addToolApprovalResponse` to approve or deny:

app/page.tsx

```
1

'use client';



2



3

import { useChat } from '@ai-sdk/react';



4



5

export default function Chat() {



6

const { messages, addToolApprovalResponse } = useChat();



7



8

return (



9

<>



10

{messages.map(message => (



11

<div key={message.id}>



12

{message.parts.map(part => {



13

if (part.type === 'tool-getWeather') {



14

switch (part.state) {



15

case 'approval-requested':



16

return (



17

<div key={part.toolCallId}>



18

<p>Get weather for {part.input.city}?</p>



19

<button



20

onClick={() =>



21

addToolApprovalResponse({



22

id: part.approval.id,



23

approved: true,



24

})



25

}



26

>



27

Approve



28

</button>



29

<button



30

onClick={() =>



31

addToolApprovalResponse({



32

id: part.approval.id,



33

approved: false,



34

})



35

}



36

>



37

Deny



38

</button>



39

</div>



40

);



41

case 'output-available':



42

return (



43

<div key={part.toolCallId}>



44

Weather in {part.input.city}: {part.output}



45

</div>



46

);



47

}



48

}



49

// Handle other part types...



50

})}



51

</div>



52

))}



53

</>



54

);



55

}
```

### [Auto-Submit After Approval](#auto-submit-after-approval)

If nothing happens after you approve a tool execution, make sure you either
call `sendMessage` manually or configure `sendAutomaticallyWhen` on the
`useChat` hook.

Use `lastAssistantMessageIsCompleteWithApprovalResponses` to automatically continue the conversation after approvals:

```
1

import { useChat } from '@ai-sdk/react';



2

import { lastAssistantMessageIsCompleteWithApprovalResponses } from 'ai';



3



4

const { messages, addToolApprovalResponse } = useChat({



5

sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,



6

});
```

[Dynamic Tools](#dynamic-tools)
-------------------------------

When using dynamic tools (tools with unknown types at compile time), the UI parts use a generic `dynamic-tool` type instead of specific tool types:

app/page.tsx

```
1

{



2

message.parts.map((part, index) => {



3

switch (part.type) {



4

// Static tools with specific (`tool-${toolName}`) types



5

case 'tool-getWeatherInformation':



6

return <WeatherDisplay part={part} />;



7



8

// Dynamic tools use generic `dynamic-tool` type



9

case 'dynamic-tool':



10

return (



11

<div key={index}>



12

<h4>Tool: {part.toolName}</h4>



13

{part.state === 'input-streaming' && (



14

<pre>{JSON.stringify(part.input, null, 2)}</pre>



15

)}



16

{part.state === 'output-available' && (



17

<pre>{JSON.stringify(part.output, null, 2)}</pre>



18

)}



19

{part.state === 'output-error' && (



20

<div>Error: {part.errorText}</div>



21

)}



22

</div>



23

);



24

}



25

});



26

}
```

Dynamic tools are useful when integrating with:

* MCP (Model Context Protocol) tools without schemas
* User-defined functions loaded at runtime
* External tool providers

[Tool call streaming](#tool-call-streaming)
-------------------------------------------

Tool call streaming is **enabled by default** in AI SDK 5.0, allowing you to stream tool calls while they are being generated. This provides a better user experience by showing tool inputs as they are generated in real-time.

GatewayProviderCustom

Claude Sonnet 4.5

app/api/chat/route.ts

```
1

export async function POST(req: Request) {



2

const { messages }: { messages: UIMessage[] } = await req.json();



3



4

const result = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

messages: await convertToModelMessages(messages),



7

// toolCallStreaming is enabled by default in v5



8

// ...



9

});



10



11

return result.toUIMessageStreamResponse();



12

}
```

With tool call streaming enabled, partial tool calls are streamed as part of the data stream.
They are available through the `useChat` hook.
The typed tool parts of assistant messages will also contain partial tool calls.
You can use the `state` property of the tool part to render the correct UI.

app/page.tsx

```
1

export default function Chat() {



2

// ...



3

return (



4

<>



5

{messages?.map(message => (



6

<div key={message.id}>



7

{message.parts.map(part => {



8

switch (part.type) {



9

case 'tool-askForConfirmation':



10

case 'tool-getLocation':



11

case 'tool-getWeatherInformation':



12

switch (part.state) {



13

case 'input-streaming':



14

return <pre>{JSON.stringify(part.input, null, 2)}</pre>;



15

case 'input-available':



16

return <pre>{JSON.stringify(part.input, null, 2)}</pre>;



17

case 'output-available':



18

return <pre>{JSON.stringify(part.output, null, 2)}</pre>;



19

case 'output-error':



20

return <div>Error: {part.errorText}</div>;



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

</>



27

);



28

}
```

[Step start parts](#step-start-parts)
-------------------------------------

When you are using multi-step tool calls, the AI SDK will add step start parts to the assistant messages.
If you want to display boundaries between tool calls, you can use the `step-start` parts as follows:

app/page.tsx

```
1

// ...



2

// where you render the message parts:



3

message.parts.map((part, index) => {



4

switch (part.type) {



5

case 'step-start':



6

// show step boundaries as horizontal lines:



7

return index > 0 ? (



8

<div key={index} className="text-gray-500">



9

<hr className="my-2 border-gray-300" />



10

</div>



11

) : null;



12

case 'text':



13

// ...



14

case 'tool-askForConfirmation':



15

case 'tool-getLocation':



16

case 'tool-getWeatherInformation':



17

// ...



18

}



19

});



20

// ...
```

[Server-side Multi-Step Calls](#server-side-multi-step-calls)
-------------------------------------------------------------

You can also use multi-step calls on the server-side with `streamText`.
This works when all invoked tools have an `execute` function on the server side.

GatewayProviderCustom

Claude Sonnet 4.5

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, UIMessage, stepCountIs } from 'ai';



2

import { z } from 'zod';



3



4

export async function POST(req: Request) {



5

const { messages }: { messages: UIMessage[] } = await req.json();



6



7

const result = streamText({



8

model: "anthropic/claude-sonnet-4.5",



9

messages: await convertToModelMessages(messages),



10

tools: {



11

getWeatherInformation: {



12

description: 'show the weather in a given city to the user',



13

inputSchema: z.object({ city: z.string() }),



14

// tool has execute function:



15

execute: async ({}: { city: string }) => {



16

const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];



17

return weatherOptions[



18

Math.floor(Math.random() * weatherOptions.length)



19

];



20

},



21

},



22

},



23

stopWhen: stepCountIs(5),



24

});



25



26

return result.toUIMessageStreamResponse();



27

}
```

[Errors](#errors)
-----------------

Language models can make errors when calling tools.
By default, these errors are masked for security reasons, and show up as "An error occurred" in the UI.

To surface the errors, you can use the `onError` function when calling `toUIMessageResponse`.

```
1

export function errorHandler(error: unknown) {



2

if (error == null) {



3

return 'unknown error';



4

}



5



6

if (typeof error === 'string') {



7

return error;



8

}



9



10

if (error instanceof Error) {



11

return error.message;



12

}



13



14

return JSON.stringify(error);



15

}
```

```
1

const result = streamText({



2

// ...



3

});



4



5

return result.toUIMessageStreamResponse({



6

onError: errorHandler,



7

});
```

In case you are using `createUIMessageResponse`, you can use the `onError` function when calling `toUIMessageResponse`:

```
1

const response = createUIMessageResponse({



2

// ...



3

async execute(dataStream) {



4

// ...



5

},



6

onError: error => `Custom error: ${error.message}`,



7

});
```