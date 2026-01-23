# https://sdk.vercel.ai/docs/ai-sdk-core/mcp-tools

Copy markdown

[Model Context Protocol (MCP)](#model-context-protocol-mcp)
===========================================================

The AI SDK supports connecting to [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers to access their tools, resources, and prompts.
This enables your AI applications to discover and use capabilities across various services through a standardized interface.

If you're using OpenAI's Responses API, you can also use the built-in
`openai.tools.mcp` tool, which provides direct MCP server integration without
needing to convert tools. See the [OpenAI provider
documentation](/providers/ai-sdk-providers/openai#mcp-tool) for details.

[Initializing an MCP Client](#initializing-an-mcp-client)
---------------------------------------------------------

We recommend using HTTP transport (like `StreamableHTTPClientTransport`) for production deployments. The stdio transport should only be used for connecting to local servers as it cannot be deployed to production environments.

Create an MCP client using one of the following transport options:

* **HTTP transport (Recommended)**: Either configure HTTP directly via the client using `transport: { type: 'http', ... }`, or use MCP's official TypeScript SDK `StreamableHTTPClientTransport`
* SSE (Server-Sent Events): An alternative HTTP-based transport
* `stdio`: For local development only. Uses standard input/output streams for local MCP servers

### [HTTP Transport (Recommended)](#http-transport-recommended)

For production deployments, we recommend using the HTTP transport. You can configure it directly on the client:

```
1

import { createMCPClient } from '@ai-sdk/mcp';



2



3

const mcpClient = await createMCPClient({



4

transport: {



5

type: 'http',



6

url: 'https://your-server.com/mcp',



7



8

// optional: configure HTTP headers



9

headers: { Authorization: 'Bearer my-api-key' },



10



11

// optional: provide an OAuth client provider for automatic authorization



12

authProvider: myOAuthClientProvider,



13

},



14

});
```

Alternatively, you can use `StreamableHTTPClientTransport` from MCP's official TypeScript SDK:

```
1

import { createMCPClient } from '@ai-sdk/mcp';



2

import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';



3



4

const url = new URL('https://your-server.com/mcp');



5

const mcpClient = await createMCPClient({



6

transport: new StreamableHTTPClientTransport(url, {



7

sessionId: 'session_123',



8

}),



9

});
```

### [SSE Transport](#sse-transport)

SSE provides an alternative HTTP-based transport option. Configure it with a `type` and `url` property. You can also provide an `authProvider` for OAuth:

```
1

import { createMCPClient } from '@ai-sdk/mcp';



2



3

const mcpClient = await createMCPClient({



4

transport: {



5

type: 'sse',



6

url: 'https://my-server.com/sse',



7



8

// optional: configure HTTP headers



9

headers: { Authorization: 'Bearer my-api-key' },



10



11

// optional: provide an OAuth client provider for automatic authorization



12

authProvider: myOAuthClientProvider,



13

},



14

});
```

### [Stdio Transport (Local Servers)](#stdio-transport-local-servers)

The stdio transport should only be used for local servers.

The Stdio transport can be imported from either the MCP SDK or the AI SDK:

```
1

import { createMCPClient } from '@ai-sdk/mcp';



2

import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';



3

// Or use the AI SDK's stdio transport:



4

// import { Experimental_StdioMCPTransport as StdioClientTransport } from '@ai-sdk/mcp/mcp-stdio';



5



6

const mcpClient = await createMCPClient({



7

transport: new StdioClientTransport({



8

command: 'node',



9

args: ['src/stdio/dist/server.js'],



10

}),



11

});
```

### [Custom Transport](#custom-transport)

You can also bring your own transport by implementing the `MCPTransport` interface for specific requirements not covered by the standard transports.

The client returned by the `createMCPClient` function is a
lightweight client intended for use in tool conversion. It currently does not
support all features of the full MCP client, such as: session
management, resumable streams, and receiving notifications.

Authorization via OAuth is supported when using the AI SDK MCP HTTP or SSE
transports by providing an `authProvider`.

### [Closing the MCP Client](#closing-the-mcp-client)

After initialization, you should close the MCP client based on your usage pattern:

* For short-lived usage (e.g., single requests), close the client when the response is finished
* For long-running clients (e.g., command line apps), keep the client open but ensure it's closed when the application terminates

When streaming responses, you can close the client when the LLM response has finished. For example, when using `streamText`, you should use the `onFinish` callback:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

const mcpClient = await createMCPClient({



2

// ...



3

});



4



5

const tools = await mcpClient.tools();



6



7

const result = await streamText({



8

model: "anthropic/claude-sonnet-4.5",



9

tools,



10

prompt: 'What is the weather in Brooklyn, New York?',



11

onFinish: async () => {



12

await mcpClient.close();



13

},



14

});
```

When generating responses without streaming, you can use try/finally or cleanup functions in your framework:

```
1

let mcpClient: MCPClient | undefined;



2



3

try {



4

mcpClient = await createMCPClient({



5

// ...



6

});



7

} finally {



8

await mcpClient?.close();



9

}
```

[Using MCP Tools](#using-mcp-tools)
-----------------------------------

The client's `tools` method acts as an adapter between MCP tools and AI SDK tools. It supports two approaches for working with tool schemas:

### [Schema Discovery](#schema-discovery)

With schema discovery, all tools offered by the server are automatically listed, and input parameter types are inferred based on the schemas provided by the server:

```
1

const tools = await mcpClient.tools();
```

This approach is simpler to implement and automatically stays in sync with server changes. However, you won't have TypeScript type safety during development, and all tools from the server will be loaded

### [Schema Definition](#schema-definition)

For better type safety and control, you can define the tools and their input schemas explicitly in your client code:

```
1

import { z } from 'zod';



2



3

const tools = await mcpClient.tools({



4

schemas: {



5

'get-data': {



6

inputSchema: z.object({



7

query: z.string().describe('The data query'),



8

format: z.enum(['json', 'text']).optional(),



9

}),



10

},



11

// For tools with zero inputs, you should use an empty object:



12

'tool-with-no-args': {



13

inputSchema: z.object({}),



14

},



15

},



16

});
```

This approach provides full TypeScript type safety and IDE autocompletion, letting you catch parameter mismatches during development. When you define `schemas`, the client only pulls the explicitly defined tools, keeping your application focused on the tools it needs

### [Typed Tool Outputs](#typed-tool-outputs)

When MCP servers return `structuredContent` (per the [MCP specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#structured-content)), you can define an `outputSchema` to get typed tool results:

```
1

import { z } from 'zod';



2



3

const tools = await mcpClient.tools({



4

schemas: {



5

'get-weather': {



6

inputSchema: z.object({



7

location: z.string(),



8

}),



9

// Define outputSchema for typed results



10

outputSchema: z.object({



11

temperature: z.number(),



12

conditions: z.string(),



13

humidity: z.number(),



14

}),



15

},



16

},



17

});



18



19

const result = await tools['get-weather'].execute(



20

{ location: 'New York' },



21

{ messages: [], toolCallId: 'weather-1' },



22

);



23



24

console.log(`Temperature: ${result.temperature}°C`);
```

When `outputSchema` is provided:

* The client extracts `structuredContent` from the tool result
* The output is validated against your schema at runtime
* You get full TypeScript type safety for the result

If the server doesn't return `structuredContent`, the client falls back to parsing JSON from the text content. If neither is available or validation fails, an error is thrown.

Without `outputSchema`, the tool returns the raw `CallToolResult` object
containing `content` and optional `isError` fields.

[Using MCP Resources](#using-mcp-resources)
-------------------------------------------

According to the [MCP specification](https://modelcontextprotocol.io/docs/learn/server-concepts#resources), resources are **application-driven** data sources that provide context to the model. Unlike tools (which are model-controlled), your application decides when to fetch and pass resources as context.

The MCP client provides three methods for working with resources:

### [Listing Resources](#listing-resources)

List all available resources from the MCP server:

```
1

const resources = await mcpClient.listResources();
```

### [Reading Resource Contents](#reading-resource-contents)

Read the contents of a specific resource by its URI:

```
1

const resourceData = await mcpClient.readResource({



2

uri: 'file:///example/document.txt',



3

});
```

### [Listing Resource Templates](#listing-resource-templates)

Resource templates are dynamic URI patterns that allow flexible queries. List all available templates:

```
1

const templates = await mcpClient.listResourceTemplates();
```

[Using MCP Prompts](#using-mcp-prompts)
---------------------------------------

MCP Prompts is an experimental feature and may change in the future.

According to the MCP specification, prompts are user-controlled templates that servers expose for clients to list and retrieve with optional arguments.

### [Listing Prompts](#listing-prompts)

```
1

const prompts = await mcpClient.experimental_listPrompts();
```

### [Getting a Prompt](#getting-a-prompt)

Retrieve prompt messages, optionally passing arguments defined by the server:

```
1

const prompt = await mcpClient.experimental_getPrompt({



2

name: 'code_review',



3

arguments: { code: 'function add(a, b) { return a + b; }' },



4

});
```

[Handling Elicitation Requests](#handling-elicitation-requests)
---------------------------------------------------------------

Elicitation is a mechanism where MCP servers can request additional information from the client during tool execution. For example, a server might need user input to complete a registration form or confirmation for a sensitive operation.

It is up to the client application to handle elicitation requests properly.
The MCP client simply surfaces these requests from the server to your
application code.

### [Enabling Elicitation Support](#enabling-elicitation-support)

To enable elicitation, you need to advertise the capability when creating the MCP client:

```
1

const mcpClient = await createMCPClient({



2

transport: {



3

type: 'sse',



4

url: 'https://your-server.com/sse',



5

},



6

capabilities: {



7

elicitation: {},



8

},



9

});
```

### [Registering an Elicitation Handler](#registering-an-elicitation-handler)

Use the `onElicitationRequest` method to register a handler that will be called when the server requests input:

```
1

import { ElicitationRequestSchema } from '@ai-sdk/mcp';



2



3

mcpClient.onElicitationRequest(ElicitationRequestSchema, async request => {



4

// request.params.message: A message describing what input is needed



5

// request.params.requestedSchema: JSON schema defining the expected input structure



6



7

// Get input from the user (implement according to your application's needs)



8

const userInput = await getInputFromUser(



9

request.params.message,



10

request.params.requestedSchema,



11

);



12



13

// Return the result with one of three actions:



14

return {



15

action: 'accept', // or 'decline' or 'cancel'



16

content: userInput, // only required when action is 'accept'



17

};



18

});
```

### [Elicitation Response Actions](#elicitation-response-actions)

Your handler must return an object with an `action` field that can be one of:

* `'accept'`: User provided the requested information. Must include `content` with the data.
* `'decline'`: User chose not to provide the information.
* `'cancel'`: User cancelled the operation entirely.

[Examples](#examples)
---------------------

You can see MCP in action in the following examples:

[Learn to use MCP tools in Node.js](/cookbook/node/mcp-tools)[Learn to handle MCP elicitation requests in Node.js](/cookbook/node/mcp-elicitation)