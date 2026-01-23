# https://sdk.vercel.ai/docs/ai-sdk-ui/transport

Copy markdown

[Transport](#transport)
=======================

The `useChat` transport system provides fine-grained control over how messages are sent to your API endpoints and how responses are processed. This is particularly useful for alternative communication protocols like WebSockets, custom authentication patterns, or specialized backend integrations.

[Default Transport](#default-transport)
---------------------------------------

By default, `useChat` uses HTTP POST requests to send messages to `/api/chat`:

```
1

import { useChat } from '@ai-sdk/react';



2



3

// Uses default HTTP transport



4

const { messages, sendMessage } = useChat();
```

This is equivalent to:

```
1

import { useChat } from '@ai-sdk/react';



2

import { DefaultChatTransport } from 'ai';



3



4

const { messages, sendMessage } = useChat({



5

transport: new DefaultChatTransport({



6

api: '/api/chat',



7

}),



8

});
```

[Custom Transport Configuration](#custom-transport-configuration)
-----------------------------------------------------------------

Configure the default transport with custom options:

```
1

import { useChat } from '@ai-sdk/react';



2

import { DefaultChatTransport } from 'ai';



3



4

const { messages, sendMessage } = useChat({



5

transport: new DefaultChatTransport({



6

api: '/api/custom-chat',



7

headers: {



8

Authorization: 'Bearer your-token',



9

'X-API-Version': '2024-01',



10

},



11

credentials: 'include',



12

}),



13

});
```

### [Dynamic Configuration](#dynamic-configuration)

You can also provide functions that return configuration values. This is useful for authentication tokens that need to be refreshed, or for configuration that depends on runtime conditions:

```
1

const { messages, sendMessage } = useChat({



2

transport: new DefaultChatTransport({



3

api: '/api/chat',



4

headers: () => ({



5

Authorization: `Bearer ${getAuthToken()}`,



6

'X-User-ID': getCurrentUserId(),



7

}),



8

body: () => ({



9

sessionId: getCurrentSessionId(),



10

preferences: getUserPreferences(),



11

}),



12

credentials: () => 'include',



13

}),



14

});
```

### [Request Transformation](#request-transformation)

Transform requests before sending to your API:

```
1

const { messages, sendMessage } = useChat({



2

transport: new DefaultChatTransport({



3

api: '/api/chat',



4

prepareSendMessagesRequest: ({ id, messages, trigger, messageId }) => {



5

return {



6

headers: {



7

'X-Session-ID': id,



8

},



9

body: {



10

messages: messages.slice(-10), // Only send last 10 messages



11

trigger,



12

messageId,



13

},



14

};



15

},



16

}),



17

});
```

[Direct Agent Transport](#direct-agent-transport)
-------------------------------------------------

For scenarios where you want to communicate directly with an [Agent](/docs/reference/ai-sdk-core/agent) without going through HTTP, you can use `DirectChatTransport`. This transport invokes the agent's `stream()` method directly in-process.

This is useful for:

* **Server-side rendering**: Run the agent on the server without an API endpoint
* **Testing**: Test chat functionality without network requests
* **Single-process applications**: Desktop or CLI apps where client and agent run together

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { useChat } from '@ai-sdk/react';



2

import { DirectChatTransport, ToolLoopAgent } from 'ai';



3



4

const agent = new ToolLoopAgent({



5

model: "anthropic/claude-sonnet-4.5",



6

instructions: 'You are a helpful assistant.',



7

tools: {



8

weather: weatherTool,



9

},



10

});



11



12

const { messages, sendMessage } = useChat({



13

transport: new DirectChatTransport({ agent }),



14

});
```

### [How It Works](#how-it-works)

Unlike `DefaultChatTransport` which sends HTTP requests:

1. `DirectChatTransport` validates incoming UI messages
2. Converts them to model messages using `convertToModelMessages`
3. Calls the agent's `stream()` method directly
4. Returns the result as a UI message stream via `toUIMessageStream()`

### [Configuration Options](#configuration-options)

You can pass additional options to customize the stream output:

```
1

const transport = new DirectChatTransport({



2

agent,



3

// Pass options to the agent



4

options: { customOption: 'value' },



5

// Configure what's sent to the client



6

sendReasoning: true,



7

sendSources: true,



8

});
```

`DirectChatTransport` does not support stream reconnection since there is no
persistent server-side stream. The `reconnectToStream()` method always returns
`null`.

For complete API details, see the [DirectChatTransport reference](/docs/reference/ai-sdk-ui/direct-chat-transport).

[Building Custom Transports](#building-custom-transports)
---------------------------------------------------------

To understand how to build your own transport, refer to the source code of the default implementation:

* **[DefaultChatTransport](https://github.com/vercel/ai/blob/main/packages/ai/src/ui/default-chat-transport.ts)** - The complete default HTTP transport implementation
* **[HttpChatTransport](https://github.com/vercel/ai/blob/main/packages/ai/src/ui/http-chat-transport.ts)** - Base HTTP transport with request handling
* **[ChatTransport Interface](https://github.com/vercel/ai/blob/main/packages/ai/src/ui/chat-transport.ts)** - The transport interface you need to implement

These implementations show you exactly how to:

* Handle the `sendMessages` method
* Process UI message streams
* Transform requests and responses
* Handle errors and connection management

The transport system gives you complete control over how your chat application communicates, enabling integration with any backend protocol or service.