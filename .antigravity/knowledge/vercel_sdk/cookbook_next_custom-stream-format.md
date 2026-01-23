# https://sdk.vercel.ai/cookbook/next/custom-stream-format

Copy markdown

[Streaming with Custom Format](#streaming-with-custom-format)
=============================================================

Create a custom stream to control the streaming format and structure of tool calls instead of using the built-in AI SDK data stream format (`toUIMessageStream()`).

`fullStream` (on `StreamTextResult`) gives you direct access to all model events. You can transform, filter, and structure these events into your own streaming format. This gives you the benefits of the AI SDK's unified provider interface without prescribing how you consume the stream.

You can:

* Define your own stream chunk format
* Control how steps and tool calls are structured
* Parse the stream manually on the client
* Build custom UI from your stream data

For complete control over both the streaming format and the execution loop, combine this pattern with a [manual agent loop](/docs/cookbook/node/manual-agent-loop).

[Implementation](#implementation)
---------------------------------

### [Server](#server)

Create a route handler that calls a model and then streams the responses in a custom format:

GatewayProviderCustom

Claude Sonnet 4.5

app/api/stream/route.ts

```
1

import { tools } from '@/ai/tools'; // your tools



2

import { stepCountIs, streamText } from 'ai';



3



4

export type StreamEvent =



5

| { type: 'text'; text: string }



6

| { type: 'tool-call'; toolName: string; input: unknown }



7

| { type: 'tool-result'; toolName: string; result: unknown };



8



9

const encoder = new TextEncoder();



10



11

function formatEvent(event: StreamEvent): Uint8Array {



12

return encoder.encode('data: ' + JSON.stringify(event) + '\n\n');



13

}



14



15

export async function POST(request: Request) {



16

const { prompt } = await request.json();



17



18

const result = streamText({



19

prompt,



20

model: "anthropic/claude-sonnet-4.5",



21

tools,



22

stopWhen: stepCountIs(5),



23

});



24



25

const transformStream = new TransformStream({



26

transform(chunk, controller) {



27

switch (chunk.type) {



28

case 'text-delta':



29

controller.enqueue(formatEvent({ type: 'text', text: chunk.text }));



30

break;



31

case 'tool-call':



32

controller.enqueue(



33

formatEvent({



34

type: 'tool-call',



35

toolName: chunk.toolName,



36

input: chunk.input,



37

}),



38

);



39

break;



40

case 'tool-result':



41

controller.enqueue(



42

formatEvent({



43

type: 'tool-result',



44

toolName: chunk.toolName,



45

result: chunk.output,



46

}),



47

);



48

break;



49

}



50

},



51

});



52



53

return new Response(result.fullStream.pipeThrough(transformStream), {



54

headers: { 'Content-Type': 'text/event-stream' },



55

});



56

}
```

The route uses `streamText` to process the prompt with tools. Each event (text, tool calls, tool results) is encoded as a Server-Sent Event with a `data:`  prefix and sent to the client.

### [Client](#client)

Create a simple interface that parses and displays the stream:

app/page.tsx

```
1

'use client';



2



3

import { useState } from 'react';



4

import { StreamEvent } from './api/stream/route';



5



6

export default function Home() {



7

const [prompt, setPrompt] = useState('');



8

const [events, setEvents] = useState<StreamEvent[]>([]);



9

const [isStreaming, setIsStreaming] = useState(false);



10



11

const handleSubmit = async () => {



12

setEvents([]);



13

setIsStreaming(true);



14

setPrompt('');



15



16

const response = await fetch('/api/stream', {



17

method: 'POST',



18

headers: { 'Content-Type': 'application/json' },



19

body: JSON.stringify({ prompt }),



20

});



21



22

const reader = response.body?.getReader();



23

const decoder = new TextDecoder();



24



25

if (reader) {



26

let buffer = '';



27

while (true) {



28

const { done, value } = await reader.read();



29

if (done) break;



30



31

buffer += decoder.decode(value, { stream: true });



32

const lines = buffer.split('\n');



33

buffer = lines.pop() || '';



34



35

for (const line of lines) {



36

if (line.trim()) {



37

const dataStr = line.replace(/^data: /, '');



38

const event = JSON.parse(dataStr) as StreamEvent;



39

setEvents(prev => [...prev, event]);



40

}



41

}



42

}



43

}



44



45

setIsStreaming(false);



46

};



47



48

return (



49

<div>



50

<input



51

value={prompt}



52

onChange={e => setPrompt(e.target.value)}



53

placeholder="Enter a prompt..."



54

/>



55

<button onClick={handleSubmit} disabled={isStreaming}>



56

{isStreaming ? 'Streaming...' : 'Send'}



57

</button>



58



59

<pre>{JSON.stringify(events, null, 2)}</pre>



60

</div>



61

);



62

}
```

[How it works](#how-it-works)
-----------------------------

The client uses the Fetch API to stream responses from the server. Since the server sends Server-Sent Events (newline-delimited with `data:`  prefix), the client:

1. Reads chunks from the stream using `getReader()`
2. Decodes the binary chunks to text
3. Splits by newlines to identify complete events
4. Removes the `data:`  prefix and parses the JSON, then appends it to the events list

Events are rendered in order as they arrive, giving you a linear representation of the AI's response.