# https://sdk.vercel.ai/cookbook/guides/slackbot

Copy markdown

[Building an AI Agent in Slack with the AI SDK](#building-an-ai-agent-in-slack-with-the-ai-sdk)
===============================================================================================

In this guide, you will learn how to build a Slackbot powered by the AI SDK. The bot will be able to respond to direct messages and mentions in channels using the full context of the thread.

[Slack App Setup](#slack-app-setup)
-----------------------------------

Before we start building, you'll need to create and configure a Slack app:

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click "Create New App" and choose "From scratch"
3. Give your app a name and select your workspace
4. Under "OAuth & Permissions", add the following bot token scopes:
   * `app_mentions:read`
   * `chat:write`
   * `im:history`
   * `im:write`
   * `assistant:write`
5. Install the app to your workspace (button under "OAuth Tokens" subsection)
6. Copy the Bot User OAuth Token and Signing Secret for the next step
7. Under App Home -> Show Tabs -> Chat Tab, check "Allow users to send Slash commands and messages from the chat tab"

[Project Setup](#project-setup)
-------------------------------

This project uses the following stack:

* [AI SDK by Vercel](/docs)
* [Slack Web API](https://api.slack.com/web)
* [Vercel](https://vercel.com)
* [OpenAI](https://openai.com)

[Getting Started](#getting-started)
-----------------------------------

1. Clone [the repository](https://github.com/vercel-labs/ai-sdk-slackbot) and check out the `starter` branch

```
git clone https://github.com/vercel-labs/ai-sdk-slackbot.git
```

```
cd ai-sdk-slackbot
```

```
git checkout starter
```

2. Install dependencies

```
pnpm install
```

[Project Structure](#project-structure)
---------------------------------------

The starter repository already includes:

* Slack utilities (`lib/slack-utils.ts`) including functions for validating incoming requests, converting Slack threads to AI SDK compatible message formats, and getting the Slackbot's user ID
* General utility functions (`lib/utils.ts`) including initial Exa setup
* Files to handle the different types of Slack events (`lib/handle-messages.ts` and `lib/handle-app-mention.ts`)
* An API endpoint (`POST`) for Slack events (`api/events.ts`)

[Event Handler](#event-handler)
-------------------------------

First, let's take a look at our API route (`api/events.ts`):

```
1

import type { SlackEvent } from '@slack/web-api';



2

import {



3

assistantThreadMessage,



4

handleNewAssistantMessage,



5

} from '../lib/handle-messages';



6

import { waitUntil } from '@vercel/functions';



7

import { handleNewAppMention } from '../lib/handle-app-mention';



8

import { verifyRequest, getBotId } from '../lib/slack-utils';



9



10

export async function POST(request: Request) {



11

const rawBody = await request.text();



12

const payload = JSON.parse(rawBody);



13

const requestType = payload.type as 'url_verification' | 'event_callback';



14



15

// See https://api.slack.com/events/url_verification



16

if (requestType === 'url_verification') {



17

return new Response(payload.challenge, { status: 200 });



18

}



19



20

await verifyRequest({ requestType, request, rawBody });



21



22

try {



23

const botUserId = await getBotId();



24



25

const event = payload.event as SlackEvent;



26



27

if (event.type === 'app_mention') {



28

waitUntil(handleNewAppMention(event, botUserId));



29

}



30



31

if (event.type === 'assistant_thread_started') {



32

waitUntil(assistantThreadMessage(event));



33

}



34



35

if (



36

event.type === 'message' &&



37

!event.subtype &&



38

event.channel_type === 'im' &&



39

!event.bot_id &&



40

!event.bot_profile &&



41

event.bot_id !== botUserId



42

) {



43

waitUntil(handleNewAssistantMessage(event, botUserId));



44

}



45



46

return new Response('Success!', { status: 200 });



47

} catch (error) {



48

console.error('Error generating response', error);



49

return new Response('Error generating response', { status: 500 });



50

}



51

}
```

This file defines a `POST` function that handles incoming requests from Slack. First, you check the request type to see if it's a URL verification request. If it is, you respond with the challenge string provided by Slack. If it's an event callback, you verify the request and then have access to the event data. This is where you can implement your event handling logic.

You then handle three types of events: `app_mention`, `assistant_thread_started`, and `message`:

* For `app_mention`, you call `handleNewAppMention` with the event and the bot user ID.
* For `assistant_thread_started`, you call `assistantThreadMessage` with the event.
* For `message`, you call `handleNewAssistantMessage` with the event and the bot user ID.

Finally, you respond with a success message to Slack. Note, each handler function is wrapped in a `waitUntil` function. Let's take a look at what this means and why it's important.

### [The waitUntil Function](#the-waituntil-function)

Slack expects a response within 3 seconds to confirm the request is being handled. However, generating AI responses can take longer. If you don't respond to the Slack request within 3 seconds, Slack will send another request, leading to another invocation of your API route, another call to the LLM, and ultimately another response to the user. To solve this, you can use the `waitUntil` function, which allows you to run your AI logic after the response is sent, without blocking the response itself.

This means, your API endpoint will:

1. Immediately respond to Slack (within 3 seconds)
2. Continue processing the message asynchronously
3. Send the AI response when it's ready

[Event Handlers](#event-handlers)
---------------------------------

Let's look at how each event type is currently handled.

### [App Mentions](#app-mentions)

When a user mentions your bot in a channel, the `app_mention` event is triggered. The `handleNewAppMention` function in `handle-app-mention.ts` processes these mentions:

1. Checks if the message is from a bot to avoid infinite response loops
2. Creates a status updater to show the bot is "thinking"
3. If the mention is in a thread, it retrieves the thread history
4. Calls the LLM with the message content (using the `generateResponse` function which you will implement in the next section)
5. Updates the initial "thinking" message with the AI response

Here's the code for the `handleNewAppMention` function:

lib/handle-app-mention.ts

```
1

import { AppMentionEvent } from '@slack/web-api';



2

import { client, getThread } from './slack-utils';



3

import { generateResponse } from './ai';



4



5

const updateStatusUtil = async (



6

initialStatus: string,



7

event: AppMentionEvent,



8

) => {



9

const initialMessage = await client.chat.postMessage({



10

channel: event.channel,



11

thread_ts: event.thread_ts ?? event.ts,



12

text: initialStatus,



13

});



14



15

if (!initialMessage || !initialMessage.ts)



16

throw new Error('Failed to post initial message');



17



18

const updateMessage = async (status: string) => {



19

await client.chat.update({



20

channel: event.channel,



21

ts: initialMessage.ts as string,



22

text: status,



23

});



24

};



25

return updateMessage;



26

};



27



28

export async function handleNewAppMention(



29

event: AppMentionEvent,



30

botUserId: string,



31

) {



32

console.log('Handling app mention');



33

if (event.bot_id || event.bot_id === botUserId || event.bot_profile) {



34

console.log('Skipping app mention');



35

return;



36

}



37



38

const { thread_ts, channel } = event;



39

const updateMessage = await updateStatusUtil('is thinking...', event);



40



41

if (thread_ts) {



42

const messages = await getThread(channel, thread_ts, botUserId);



43

const result = await generateResponse(messages, updateMessage);



44

updateMessage(result);



45

} else {



46

const result = await generateResponse(



47

[{ role: 'user', content: event.text }],



48

updateMessage,



49

);



50

updateMessage(result);



51

}



52

}
```

Now let's see how new assistant threads and messages are handled.

### [Assistant Thread Messages](#assistant-thread-messages)

When a user starts a thread with your assistant, the `assistant_thread_started` event is triggered. The `assistantThreadMessage` function in `handle-messages.ts` handles this:

1. Posts a welcome message to the thread
2. Sets up suggested prompts to help users get started

Here's the code for the `assistantThreadMessage` function:

lib/handle-messages.ts

```
1

import type { AssistantThreadStartedEvent } from '@slack/web-api';



2

import { client } from './slack-utils';



3



4

export async function assistantThreadMessage(



5

event: AssistantThreadStartedEvent,



6

) {



7

const { channel_id, thread_ts } = event.assistant_thread;



8

console.log(`Thread started: ${channel_id} ${thread_ts}`);



9

console.log(JSON.stringify(event));



10



11

await client.chat.postMessage({



12

channel: channel_id,



13

thread_ts: thread_ts,



14

text: "Hello, I'm an AI assistant built with the AI SDK by Vercel!",



15

});



16



17

await client.assistant.threads.setSuggestedPrompts({



18

channel_id: channel_id,



19

thread_ts: thread_ts,



20

prompts: [



21

{



22

title: 'Get the weather',



23

message: 'What is the current weather in London?',



24

},



25

{



26

title: 'Get the news',



27

message: 'What is the latest Premier League news from the BBC?',



28

},



29

],



30

});



31

}
```

### [Direct Messages](#direct-messages)

For direct messages to your bot, the `message` event is triggered and the event is handled by the `handleNewAssistantMessage` function in `handle-messages.ts`:

1. Verifies the message isn't from a bot
2. Updates the status to show the response is being generated
3. Retrieves the conversation history
4. Calls the LLM with the conversation context
5. Posts the LLM's response to the thread

Here's the code for the `handleNewAssistantMessage` function:

lib/handle-messages.ts

```
1

import type { GenericMessageEvent } from '@slack/web-api';



2

import { client, getThread } from './slack-utils';



3

import { generateResponse } from './ai';



4



5

export async function handleNewAssistantMessage(



6

event: GenericMessageEvent,



7

botUserId: string,



8

) {



9

if (



10

event.bot_id ||



11

event.bot_id === botUserId ||



12

event.bot_profile ||



13

!event.thread_ts



14

)



15

return;



16



17

const { thread_ts, channel } = event;



18

const updateStatus = updateStatusUtil(channel, thread_ts);



19

updateStatus('is thinking...');



20



21

const messages = await getThread(channel, thread_ts, botUserId);



22

const result = await generateResponse(messages, updateStatus);



23



24

await client.chat.postMessage({



25

channel: channel,



26

thread_ts: thread_ts,



27

text: result,



28

unfurl_links: false,



29

blocks: [



30

{



31

type: 'section',



32

text: {



33

type: 'mrkdwn',



34

text: result,



35

},



36

},



37

],



38

});



39



40

updateStatus('');



41

}
```

With the event handlers in place, let's now implement the AI logic.

[Implementing AI Logic](#implementing-ai-logic)
-----------------------------------------------

The core of our application is the `generateResponse` function in `lib/generate-response.ts`, which processes messages and generates responses using the AI SDK.

Here's how to implement it:

GatewayProviderCustom

Claude Sonnet 4.5

lib/generate-response.ts

```
1

import { generateText, ModelMessage } from 'ai';



2



3

export const generateResponse = async (



4

messages: ModelMessage[],



5

updateStatus?: (status: string) => void,



6

) => {



7

const { text } = await generateText({



8

model: "anthropic/claude-sonnet-4.5",



9

system: `You are a Slack bot assistant. Keep your responses concise and to the point.



10

- Do not tag users.



11

- Current date is: ${new Date().toISOString().split('T')[0]}`,



12

messages,



13

});



14



15

// Convert markdown to Slack mrkdwn format



16

return text.replace(/\[(.*?)\]\((.*?)\)/g, '<$2|$1>').replace(/\*\*/g, '*');



17

};
```

This basic implementation:

1. Uses the AI SDK's `generateText` function to call Anthropic's `claude-sonnet-4.5` model
2. Provides a system prompt to guide the model's behavior
3. Formats the response for Slack's markdown format

[Enhancing with Tools](#enhancing-with-tools)
---------------------------------------------

The real power of the AI SDK comes from tools that enable your bot to perform actions. Let's add two useful tools:

GatewayProviderCustom

Claude Sonnet 4.5

lib/generate-response.ts

```
1

import { generateText, tool, ModelMessage, stepCountIs } from 'ai';



2

import { z } from 'zod';



3

import { exa } from './utils';



4



5

export const generateResponse = async (



6

messages: ModelMessage[],



7

updateStatus?: (status: string) => void,



8

) => {



9

const { text } = await generateText({



10

model: "anthropic/claude-sonnet-4.5",



11

system: `You are a Slack bot assistant. Keep your responses concise and to the point.



12

- Do not tag users.



13

- Current date is: ${new Date().toISOString().split('T')[0]}



14

- Always include sources in your final response if you use web search.`,



15

messages,



16

stopWhen: stepCountIs(10),



17

tools: {



18

getWeather: tool({



19

description: 'Get the current weather at a location',



20

inputSchema: z.object({



21

latitude: z.number(),



22

longitude: z.number(),



23

city: z.string(),



24

}),



25

execute: async ({ latitude, longitude, city }) => {



26

updateStatus?.(`is getting weather for ${city}...`);



27



28

const response = await fetch(



29

`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,relativehumidity_2m&timezone=auto`,



30

);



31



32

const weatherData = await response.json();



33

return {



34

temperature: weatherData.current.temperature_2m,



35

weatherCode: weatherData.current.weathercode,



36

humidity: weatherData.current.relativehumidity_2m,



37

city,



38

};



39

},



40

}),



41

searchWeb: tool({



42

description: 'Use this to search the web for information',



43

inputSchema: z.object({



44

query: z.string(),



45

specificDomain: z



46

.string()



47

.nullable()



48

.describe(



49

'a domain to search if the user specifies e.g. bbc.com. Should be only the domain name without the protocol',



50

),



51

}),



52

execute: async ({ query, specificDomain }) => {



53

updateStatus?.(`is searching the web for ${query}...`);



54

const { results } = await exa.searchAndContents(query, {



55

livecrawl: 'always',



56

numResults: 3,



57

includeDomains: specificDomain ? [specificDomain] : undefined,



58

});



59



60

return {



61

results: results.map(result => ({



62

title: result.title,



63

url: result.url,



64

snippet: result.text.slice(0, 1000),



65

})),



66

};



67

},



68

}),



69

},



70

});



71



72

// Convert markdown to Slack mrkdwn format



73

return text.replace(/\[(.*?)\]\((.*?)\)/g, '<$2|$1>').replace(/\*\*/g, '*');



74

};
```

In this updated implementation:

1. You added two tools:

   * `getWeather`: Fetches weather data for a specified location
   * `searchWeb`: Searches the web for information using the Exa API
2. You set `stopWhen: stepCountIs(10)` to enable multi-step conversations. This defines the stopping conditions of your agent, when the model generates a tool call. This will automatically send any tool results back to the LLM to trigger additional tool calls or responses as the LLM deems necessary. This turns your LLM call from a one-off operation into a multi-step agentic flow.

[How It Works](#how-it-works)
-----------------------------

When a user interacts with your bot:

1. The Slack event is received and processed by your API endpoint
2. The user's message and the thread history is passed to the `generateResponse` function
3. The AI SDK processes the message and may invoke tools as needed
4. The response is formatted for Slack and sent back to the user

The tools are automatically invoked based on the user's intent. For example, if a user asks "What's the weather in London?", the AI will:

1. Recognize this as a weather query
2. Call the `getWeather` tool with London's coordinates (inferred by the LLM)
3. Process the weather data
4. Generate a final response, answering the user's question

[Deploying the App](#deploying-the-app)
---------------------------------------

1. Install the Vercel CLI

```
pnpm install -g vercel
```

2. Deploy the app

```
vercel deploy
```

3. Copy the deployment URL and update the Slack app's Event Subscriptions to point to your Vercel URL
4. Go to your project's deployment settings (Your project -> Settings -> Environment Variables) and add your environment variables

```
1

SLACK_BOT_TOKEN=your_slack_bot_token



2

SLACK_SIGNING_SECRET=your_slack_signing_secret



3

OPENAI_API_KEY=your_openai_api_key



4

EXA_API_KEY=your_exa_api_key
```

Make sure to redeploy your app after updating environment variables.

5. Head back to the <https://api.slack.com/> and navigate to the "Event Subscriptions" page. Enable events and add your deployment URL.

```
1

https://your-vercel-url.vercel.app/api/events
```

6. On the Events Subscription page, subscribe to the following events.
   * `app_mention`
   * `assistant_thread_started`
   * `message:im`

Finally, head to Slack and test the app by sending a message to the bot.

[Next Steps](#next-steps)
-------------------------

You've built a Slack chatbot powered by the AI SDK! Here are some ways you could extend it:

1. Add memory for specific users to give the LLM context of previous interactions
2. Implement more tools like database queries or knowledge base searches
3. Add support for rich message formatting with blocks
4. Add analytics to track usage patterns

In a production environment, it is recommended to implement a robust queueing
system to ensure messages are properly handled.