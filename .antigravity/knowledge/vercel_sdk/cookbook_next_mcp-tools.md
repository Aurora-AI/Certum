# https://sdk.vercel.ai/cookbook/next/mcp-tools

Copy markdown

[MCP Tools](#mcp-tools)
=======================

The AI SDK supports Model Context Protocol (MCP) tools by offering a lightweight client that exposes a `tools` method for retrieving tools from a MCP server. After use, the client should always be closed to release resources.

[Server](#server)
-----------------

Let's create a route handler for `/api/completion` that will generate text based on the input prompt and MCP tools that can be called at any time during a generation. The route will call the `streamText` function from the `ai` module, which will then generate text based on the input prompt and stream it to the client.

If you prefer to use the official transports (optional), install the official TypeScript SDK for Model Context Protocol:

```
pnpm install @modelcontextprotocol/sdk
```

app/api/completion/route.ts

```
1

import { createMCPClient } from '@ai-sdk/mcp';



2

import { streamText } from 'ai';



3

import { Experimental_StdioMCPTransport } from '@ai-sdk/mcp/mcp-stdio';



4

import { openai } from '@ai-sdk/openai';



5

// Optional: Official transports if you prefer them



6

// import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio';



7

// import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse';



8

// import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';



9



10

export async function POST(req: Request) {



11

const { prompt }: { prompt: string } = await req.json();



12



13

try {



14

// Initialize an MCP client to connect to a `stdio` MCP server (local only):



15

const transport = new Experimental_StdioMCPTransport({



16

command: 'node',



17

args: ['src/stdio/dist/server.js'],



18

});



19



20

const stdioClient = await createMCPClient({



21

transport,



22

});



23



24

// Connect to an HTTP MCP server directly via the client transport config



25

const httpClient = await createMCPClient({



26

transport: {



27

type: 'http',



28

url: 'http://localhost:3000/mcp',



29



30

// optional: configure headers



31

// headers: { Authorization: 'Bearer my-api-key' },



32



33

// optional: provide an OAuth client provider for automatic authorization



34

// authProvider: myOAuthClientProvider,



35

},



36

});



37



38

// Connect to a Server-Sent Events (SSE) MCP server directly via the client transport config



39

const sseClient = await createMCPClient({



40

transport: {



41

type: 'sse',



42

url: 'http://localhost:3000/sse',



43



44

// optional: configure headers



45

// headers: { Authorization: 'Bearer my-api-key' },



46



47

// optional: provide an OAuth client provider for automatic authorization



48

// authProvider: myOAuthClientProvider,



49

},



50

});



51



52

// Alternatively, you can create transports with the official SDKs instead of direct config:



53

// const httpTransport = new StreamableHTTPClientTransport(new URL('http://localhost:3000/mcp'));



54

// const httpClient = await createMCPClient({ transport: httpTransport });



55

// const sseTransport = new SSEClientTransport(new URL('http://localhost:3000/sse'));



56

// const sseClient = await createMCPClient({ transport: sseTransport });



57



58

const toolSetOne = await stdioClient.tools();



59

const toolSetTwo = await httpClient.tools();



60

const toolSetThree = await sseClient.tools();



61

const tools = {



62

...toolSetOne,



63

...toolSetTwo,



64

...toolSetThree, // note: this approach causes subsequent tool sets to override tools with the same name



65

};



66



67

const response = await streamText({



68

model: 'openai/gpt-4o',



69

tools,



70

prompt,



71

// When streaming, the client should be closed after the response is finished:



72

onFinish: async () => {



73

await stdioClient.close();



74

await httpClient.close();



75

await sseClient.close();



76

},



77

// Closing clients onError is optional



78

// - Closing: Immediately frees resources, prevents hanging connections



79

// - Not closing: Keeps connection open for retries



80

onError: async error => {



81

await stdioClient.close();



82

await httpClient.close();



83

await sseClient.close();



84

},



85

});



86



87

return response.toDataStreamResponse();



88

} catch (error) {



89

return new Response('Internal Server Error', { status: 500 });



90

}



91

}
```

[Client](#client)
-----------------

Let's create a simple React component that imports the `useCompletion` hook from the `@ai-sdk/react` module. The `useCompletion` hook will call the `/api/completion` endpoint when a button is clicked. The endpoint will generate text based on the input prompt and stream it to the client.

app/page.tsx

```
1

'use client';



2



3

import { useCompletion } from '@ai-sdk/react';



4



5

export default function Page() {



6

const { completion, complete } = useCompletion({



7

api: '/api/completion',



8

});



9



10

return (



11

<div>



12

<div



13

onClick={async () => {



14

await complete(



15

'Please schedule a call with Sonny and Robby for tomorrow at 10am ET for me!',



16

);



17

}}



18

>



19

Schedule a call



20

</div>



21



22

{completion}



23

</div>



24

);



25

}
```