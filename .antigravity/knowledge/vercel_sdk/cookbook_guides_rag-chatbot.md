# https://sdk.vercel.ai/cookbook/guides/rag-chatbot

Copy markdown

[RAG Agent Guide](#rag-agent-guide)
===================================

In this guide, you will learn how to build a retrieval-augmented generation (RAG) agent.

[](/images/rag-guide-demo.mp4)

Before we dive in, let's look at what RAG is, and why we would want to use it.

### [What is RAG?](#what-is-rag)

RAG stands for retrieval augmented generation. In simple terms, RAG is the process of providing a Large Language Model (LLM) with specific information relevant to the prompt.

### [Why is RAG important?](#why-is-rag-important)

While LLMs are powerful, the information they can reason on is restricted to the data they were trained on. This problem becomes apparent when asking an LLM for information outside of their training data, like proprietary data or common knowledge that has occurred after the model’s training cutoff. RAG solves this problem by fetching information relevant to the prompt and then passing that to the model as context.

To illustrate with a basic example, imagine asking the model for your favorite food:

```
1

**input**



2

What is my favorite food?



3



4

**generation**



5

I don't have access to personal information about individuals, including their



6

favorite foods.
```

Not surprisingly, the model doesn’t know. But imagine, alongside your prompt, the model received some extra context:

```
1

**input**



2

Respond to the user's prompt using only the provided context.



3

user prompt: 'What is my favorite food?'



4

context: user loves chicken nuggets



5



6

**generation**



7

Your favorite food is chicken nuggets!
```

Just like that, you have augmented the model’s generation by providing relevant information to the query. Assuming the model has the appropriate information, it is now highly likely to return an accurate response to the users query. But how does it retrieve the relevant information? The answer relies on a concept called embedding.

You could fetch any context for your RAG application (eg. Google search).
Embeddings and Vector Databases are just a specific retrieval approach to
achieve semantic search.

### [Embedding](#embedding)

[Embeddings](/docs/ai-sdk-core/embeddings) are a way to represent words, phrases, or images as vectors in a high-dimensional space. In this space, similar words are close to each other, and the distance between words can be used to measure their similarity.

In practice, this means that if you embedded the words `cat` and `dog`, you would expect them to be plotted close to each other in vector space. The process of calculating the similarity between two vectors is called ‘cosine similarity’ where a value of 1 would indicate high similarity and a value of -1 would indicate high opposition.

Don’t worry if this seems complicated. a high level understanding is all you
need to get started! For a more in-depth introduction to embeddings, check out
[this guide](https://jalammar.github.io/illustrated-word2vec/).

As mentioned above, embeddings are a way to represent the semantic meaning of **words and phrases**. The implication here is that the larger the input to your embedding, the lower quality the embedding will be. So how would you approach embedding content longer than a simple phrase?

### [Chunking](#chunking)

Chunking refers to the process of breaking down a particular source material into smaller pieces. There are many different approaches to chunking and it’s worth experimenting as the most effective approach can differ by use case. A simple and common approach to chunking (and what you will be using in this guide) is separating written content by sentences.

Once your source material is appropriately chunked, you can embed each one and then store the embedding and the chunk together in a database. Embeddings can be stored in any database that supports vectors. For this tutorial, you will be using [Postgres](https://www.postgresql.org/) alongside the [pgvector](https://github.com/pgvector/pgvector) plugin.

![](/_next/image?url=%2Fimages%2Frag-guide-1.png&w=1920&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)![](/_next/image?url=%2Fimages%2Frag-guide-1-dark.png&w=1920&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

### [All Together Now](#all-together-now)

Combining all of this together, RAG is the process of enabling the model to respond with information outside of it’s training data by embedding a users query, retrieving the relevant source material (chunks) with the highest semantic similarity, and then passing them alongside the initial query as context. Going back to the example where you ask the model for your favorite food, the prompt preparation process would look like this.

![](/_next/image?url=%2Fimages%2Frag-guide-2.png&w=1920&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)![](/_next/image?url=%2Fimages%2Frag-guide-2-dark.png&w=1920&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

By passing the appropriate context and refining the model’s objective, you are able to fully leverage its strengths as a reasoning machine.

Onto the project!

[Project Setup](#project-setup)
-------------------------------

In this project, you will build a agent that will only respond with information that it has within its knowledge base. The agent will be able to both store and retrieve information. This project has many interesting use cases from customer support through to building your own second brain!

This project will use the following stack:

* [Next.js](https://nextjs.org) 14 (App Router)
* [AI SDK](/docs)
* [Vercel AI Gateway](/providers/ai-sdk-providers/ai-gateway)
* [Drizzle ORM](https://orm.drizzle.team)
* [Postgres](https://www.postgresql.org/)  with  [pgvector](https://github.com/pgvector/pgvector)
* [shadcn-ui](https://ui.shadcn.com)  and  [TailwindCSS](https://tailwindcss.com)  for styling

### [Clone Repo](#clone-repo)

To reduce the scope of this guide, you will be starting with a [repository](https://github.com/vercel/ai-sdk-rag-starter) that already has a few things set up for you:

* Drizzle ORM (`lib/db`) including an initial migration and a script to migrate (`db:migrate`)
* a basic schema for the `resources` table (this will be for source material)
* a Server Action for creating a `resource`

To get started, clone the starter repository with the following command:

```
git clone https://github.com/vercel/ai-sdk-rag-starter
```

```
cd ai-sdk-rag-starter
```

First things first, run the following command to install the project’s dependencies:

```
pnpm install
```

### [Create Database](#create-database)

You will need a Postgres database to complete this tutorial. If you don't have Postgres setup on your local machine you can:

* Create a free Postgres database with Vercel (recommended - see instructions below); or
* Follow [this guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) to set it up locally

#### [Setting up Postgres with Vercel](#setting-up-postgres-with-vercel)

To set up a Postgres instance on your Vercel account:

1. Go to [Vercel.com](https://vercel.com) and make sure you're logged in
2. Navigate to your team homepage
3. Click on the **Integrations** tab
4. Click **Browse Marketplace**
5. Look for the **Storage** option in the sidebar
6. Select the **Neon** option (recommended, but any other PostgreSQL database provider should work)
7. Click **Install**, then click **Install** again in the top right corner
8. On the "Get Started with Neon" page, click **Create Database** on the right
9. Select your region (e.g., Washington, D.C., U.S. East)
10. Turn off **Auth**
11. Click **Continue**
12. Name your database (you can use the default name or rename it to something like "RagTutorial")
13. Click **Create** in the bottom right corner
14. After seeing "Database created successfully", click **Done**
15. You'll be redirected to your database instance
16. In the Quick Start section, click **Show secrets**
17. Copy the full `DATABASE_URL` environment variable

### [Migrate Database](#migrate-database)

Once you have a Postgres database, you need to add the connection string as an environment secret.

Make a copy of the `.env.example` file and rename it to `.env`.

```
cp .env.example .env
```

Open the new `.env` file. You should see an item called `DATABASE_URL`. Copy in your database connection string after the equals sign.

With that set up, you can now run your first database migration. Run the following command:

```
pnpm db:migrate
```

This will first add the `pgvector` extension to your database. Then it will create a new table for your `resources` schema that is defined in `lib/db/schema/resources.ts`. This schema has four columns: `id`, `content`, `createdAt`, and `updatedAt`.

If you experience an error with the migration, see the [troubleshooting
section](#troubleshooting-migration-error) below.

### [Vercel AI Gateway Key](#vercel-ai-gateway-key)

For this guide, you will need a Vercel AI Gateway API key, which gives you access to hundreds of models from different providers with one API key. If you haven't obtained your Vercel AI Gateway API key, you can do so by [signing up](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai&title=Go+to+AI+Gateway) on the Vercel website.

The AI SDK's Vercel AI Gateway Provider is the default global provider, so you
can access models using a simple string in the model configuration. If you
prefer to use a specific provider like OpenAI directly, see the [provider
management](/docs/ai-sdk-core/provider-management) documentation.

Now, open your `.env` file and add your API Gateway key:

.env

```
1

AI_GATEWAY_API_KEY=your-api-key
```

Replace `your-api-key` with your actual Vercel AI Gateway API key.

[Build](#build)
---------------

Let’s build a quick task list of what needs to be done:

1. Create a table in your database to store embeddings
2. Add logic to chunk and create embeddings when creating resources
3. Create an agent
4. Give the agent tools to query / create resources for it’s knowledge base

### [Create Embeddings Table](#create-embeddings-table)

Currently, your application has one table (`resources`) which has a column (`content`) for storing content. Remember, each `resource` (source material) will have to be chunked, embedded, and then stored. Let’s create a table called `embeddings` to store these chunks.

Create a new file (`lib/db/schema/embeddings.ts`) and add the following code:

lib/db/schema/embeddings.ts

```
1

import { nanoid } from '@/lib/utils';



2

import { index, pgTable, text, varchar, vector } from 'drizzle-orm/pg-core';



3

import { resources } from './resources';



4



5

export const embeddings = pgTable(



6

'embeddings',



7

{



8

id: varchar('id', { length: 191 })



9

.primaryKey()



10

.$defaultFn(() => nanoid()),



11

resourceId: varchar('resource_id', { length: 191 }).references(



12

() => resources.id,



13

{ onDelete: 'cascade' },



14

),



15

content: text('content').notNull(),



16

embedding: vector('embedding', { dimensions: 1536 }).notNull(),



17

},



18

table => ({



19

embeddingIndex: index('embeddingIndex').using(



20

'hnsw',



21

table.embedding.op('vector_cosine_ops'),



22

),



23

}),



24

);
```

This table has four columns:

* `id` - unique identifier
* `resourceId` - a foreign key relation to the full source material
* `content` - the plain text chunk
* `embedding` - the vector representation of the plain text chunk

To perform similarity search, you also need to include an index ([HNSW](https://github.com/pgvector/pgvector?tab=readme-ov-file#hnsw) or [IVFFlat](https://github.com/pgvector/pgvector?tab=readme-ov-file#ivfflat)) on this column for better performance.

To push this change to the database, run the following command:

```
pnpm db:push
```

### [Add Embedding Logic](#add-embedding-logic)

Now that you have a table to store embeddings, it’s time to write the logic to create the embeddings.

Create a file with the following command:

```
mkdir lib/ai && touch lib/ai/embedding.ts
```

### [Generate Chunks](#generate-chunks)

Remember, to create an embedding, you will start with a piece of source material (unknown length), break it down into smaller chunks, embed each chunk, and then save the chunk to the database. Let’s start by creating a function to break the source material into small chunks.

lib/ai/embedding.ts

```
1

const generateChunks = (input: string): string[] => {



2

return input



3

.trim()



4

.split('.')



5

.filter(i => i !== '');



6

};
```

This function will take an input string and split it by periods, filtering out any empty items. This will return an array of strings. It is worth experimenting with different chunking techniques in your projects as the best technique will vary.

### [Install AI SDK](#install-ai-sdk)

You will use the AI SDK to create embeddings. This will require two more dependencies, which you can install by running the following command:

```
pnpm add ai @ai-sdk/react
```

This will install the [AI SDK](/docs) and the AI SDK's React hooks.

The AI SDK is designed to be a unified interface to interact with any large
language model. This means that you can change model and providers with just
one line of code! Learn more about [available providers](/providers) and
[building custom providers](/providers/community-providers/custom-providers)
in the [providers](/providers) section.

### [Generate Embeddings](#generate-embeddings)

Let’s add a function to generate embeddings. Copy the following code into your `lib/ai/embedding.ts` file.

lib/ai/embedding.ts

```
1

import { embedMany } from 'ai';



2



3

const embeddingModel = 'openai/text-embedding-ada-002';



4



5

const generateChunks = (input: string): string[] => {



6

return input



7

.trim()



8

.split('.')



9

.filter(i => i !== '');



10

};



11



12

export const generateEmbeddings = async (



13

value: string,



14

): Promise<Array<{ embedding: number[]; content: string }>> => {



15

const chunks = generateChunks(value);



16

const { embeddings } = await embedMany({



17

model: embeddingModel,



18

values: chunks,



19

});



20

return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));



21

};
```

In this code, you first define the model you want to use for the embeddings. In this example, you are using OpenAI’s `text-embedding-ada-002` embedding model.

Next, you create an asynchronous function called `generateEmbeddings`. This function will take in the source material (`value`) as an input and return a promise of an array of objects, each containing an embedding and content. Within the function, you first generate chunks for the input. Then, you pass those chunks to the [`embedMany`](/docs/reference/ai-sdk-core/embed-many) function imported from the AI SDK which will return embeddings of the chunks you passed in. Finally, you map over and return the embeddings in a format that is ready to save in the database.

### [Update Server Action](#update-server-action)

Open the file at `lib/actions/resources.ts`. This file has one function, `createResource`, which, as the name implies, allows you to create a resource.

lib/actions/resources.ts

```
1

'use server';



2



3

import {



4

NewResourceParams,



5

insertResourceSchema,



6

resources,



7

} from '@/lib/db/schema/resources';



8

import { db } from '../db';



9



10

export const createResource = async (input: NewResourceParams) => {



11

try {



12

const { content } = insertResourceSchema.parse(input);



13



14

const [resource] = await db



15

.insert(resources)



16

.values({ content })



17

.returning();



18



19

return 'Resource successfully created.';



20

} catch (e) {



21

if (e instanceof Error)



22

return e.message.length > 0 ? e.message : 'Error, please try again.';



23

}



24

};
```

This function is a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#with-client-components), as denoted by the `“use server”;` directive at the top of the file. This means that it can be called anywhere in your Next.js application. This function will take an input, run it through a [Zod](https://zod.dev) schema to ensure it adheres to the correct schema, and then creates a new resource in the database. This is the ideal location to generate and store embeddings of the newly created resources.

Update the file with the following code:

lib/actions/resources.ts

```
1

'use server';



2



3

import {



4

NewResourceParams,



5

insertResourceSchema,



6

resources,



7

} from '@/lib/db/schema/resources';



8

import { db } from '../db';



9

import { generateEmbeddings } from '../ai/embedding';



10

import { embeddings as embeddingsTable } from '../db/schema/embeddings';



11



12

export const createResource = async (input: NewResourceParams) => {



13

try {



14

const { content } = insertResourceSchema.parse(input);



15



16

const [resource] = await db



17

.insert(resources)



18

.values({ content })



19

.returning();



20



21

const embeddings = await generateEmbeddings(content);



22

await db.insert(embeddingsTable).values(



23

embeddings.map(embedding => ({



24

resourceId: resource.id,



25

...embedding,



26

})),



27

);



28



29

return 'Resource successfully created and embedded.';



30

} catch (error) {



31

return error instanceof Error && error.message.length > 0



32

? error.message



33

: 'Error, please try again.';



34

}



35

};
```

First, you call the `generateEmbeddings` function created in the previous step, passing in the source material (`content`). Once you have your embeddings (`e`) of the source material, you can save them to the database, passing the `resourceId` alongside each embedding.

### [Create Root Page](#create-root-page)

Great! Let's build the frontend. The AI SDK’s [`useChat`](/docs/reference/ai-sdk-ui/use-chat) hook allows you to easily create a conversational user interface for your agent.

Replace your root page (`app/page.tsx`) with the following code.

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

return (



10

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



11

<div className="space-y-4">



12

{messages.map(m => (



13

<div key={m.id} className="whitespace-pre-wrap">



14

<div>



15

<div className="font-bold">{m.role}</div>



16

{m.parts.map(part => {



17

switch (part.type) {



18

case 'text':



19

return <p>{part.text}</p>;



20

}



21

})}



22

</div>



23

</div>



24

))}



25

</div>



26



27

<form



28

onSubmit={e => {



29

e.preventDefault();



30

sendMessage({ text: input });



31

setInput('');



32

}}



33

>



34

<input



35

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"



36

value={input}



37

placeholder="Say something..."



38

onChange={e => setInput(e.currentTarget.value)}



39

/>



40

</form>



41

</div>



42

);



43

}
```

The `useChat` hook enables the streaming of chat messages from your AI provider (you will be using OpenAI via the Vercel AI Gateway), manages the state for chat input, and updates the UI automatically as new messages are received.

Run the following command to start the Next.js dev server:

```
pnpm run dev
```

Head to [http://localhost:3000](http://localhost:3000/). You should see an empty screen with an input bar floating at the bottom. Try to send a message. The message shows up in the UI for a fraction of a second and then disappears. This is because you haven’t set up the corresponding API route to call the model! By default, `useChat` will send a POST request to the `/api/chat` endpoint with the `messages` as the request body.

You can customize the endpoint in the useChat configuration object

### [Create API Route](#create-api-route)

In Next.js, you can create custom request handlers for a given route using [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers). Route Handlers are defined in a `route.ts` file and can export HTTP methods like `GET`, `POST`, `PUT`, `PATCH` etc.

Create a file at `app/api/chat/route.ts` by running the following command:

```
mkdir -p app/api/chat && touch app/api/chat/route.ts
```

Open the file and add the following code:

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, UIMessage } from 'ai';



2



3

// Allow streaming responses up to 30 seconds



4

export const maxDuration = 30;



5



6

export async function POST(req: Request) {



7

const { messages }: { messages: UIMessage[] } = await req.json();



8



9

const result = streamText({



10

model: 'openai/gpt-4o',



11

messages: await convertToModelMessages(messages),



12

});



13



14

return result.toUIMessageStreamResponse();



15

}
```

In this code, you declare and export an asynchronous function called POST. You retrieve the `messages` from the request body and then pass them to the [`streamText`](/docs/reference/ai-sdk-core/stream-text) function imported from the AI SDK, alongside the model you would like to use. Finally, you return the model’s response in `UIMessageStreamResponse` format.

Head back to the browser and try to send a message again. You should see a response from the model streamed directly in!

### [Refining your prompt](#refining-your-prompt)

While you now have a working agent, it isn't doing anything special.

Let’s add system instructions to refine and restrict the model’s behavior. In this case, you want the model to only use information it has retrieved to generate responses. Update your route handler with the following code:

app/api/chat/route.ts

```
1

import { convertToModelMessages, streamText, UIMessage } from 'ai';



2



3

// Allow streaming responses up to 30 seconds



4

export const maxDuration = 30;



5



6

export async function POST(req: Request) {



7

const { messages }: { messages: UIMessage[] } = await req.json();



8



9

const result = streamText({



10

model: 'openai/gpt-4o',



11

system: `You are a helpful assistant. Check your knowledge base before answering any questions.



12

Only respond to questions using information from tool calls.



13

if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,



14

messages: await convertToModelMessages(messages),



15

});



16



17

return result.toUIMessageStreamResponse();



18

}
```

Head back to the browser and try to ask the model what your favorite food is. The model should now respond exactly as you instructed above (“Sorry, I don’t know”) given it doesn’t have any relevant information.

In its current form, your agent is now, well, useless. How do you give the model the ability to add and query information?

### [Using Tools](#using-tools)

A [tool](/docs/foundations/tools) is a function that can be called by the model to perform a specific task. You can think of a tool like a program you give to the model that it can run as and when it deems necessary.

Let’s see how you can create a tool to give the model the ability to create, embed and save a resource to your agents’ knowledge base.

### [Add Resource Tool](#add-resource-tool)

Update your route handler with the following code:

app/api/chat/route.ts

```
1

import { createResource } from '@/lib/actions/resources';



2

import { convertToModelMessages, streamText, tool, UIMessage } from 'ai';



3

import { z } from 'zod';



4



5

// Allow streaming responses up to 30 seconds



6

export const maxDuration = 30;



7



8

export async function POST(req: Request) {



9

const { messages }: { messages: UIMessage[] } = await req.json();



10



11

const result = streamText({



12

model: 'openai/gpt-4o',



13

system: `You are a helpful assistant. Check your knowledge base before answering any questions.



14

Only respond to questions using information from tool calls.



15

if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,



16

messages: await convertToModelMessages(messages),



17

tools: {



18

addResource: tool({



19

description: `add a resource to your knowledge base.



20

If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,



21

inputSchema: z.object({



22

content: z



23

.string()



24

.describe('the content or resource to add to the knowledge base'),



25

}),



26

execute: async ({ content }) => createResource({ content }),



27

}),



28

},



29

});



30



31

return result.toUIMessageStreamResponse();



32

}
```

In this code, you define a tool called `addResource`. This tool has three elements:

* **description**: description of the tool that will influence when the tool is picked.
* **inputSchema**: [Zod schema](/docs/foundations/tools#schema-specification-and-validation-with-zod) that defines the input necessary for the tool to run.
* **execute**: An asynchronous function that is called with the arguments from the tool call.

In simple terms, on each generation, the model will decide whether it should call the tool. If it deems it should call the tool, it will extract the input and then append a new `message` to the `messages` array of type `tool-call`. The AI SDK will then run the `execute` function with the parameters provided by the `tool-call` message.

Head back to the browser and tell the model your favorite food. You should see an empty response in the UI. Did anything happen? Let’s see. Run the following command in a new terminal window.

```
pnpm db:studio
```

This will start Drizzle Studio where we can view the rows in our database. You should see a new row in both the `embeddings` and `resources` table with your favorite food!

Let’s make a few changes in the UI to communicate to the user when a tool has been called. Head back to your root page (`app/page.tsx`) and add the following code:

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

return (



10

<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">



11

<div className="space-y-4">



12

{messages.map(m => (



13

<div key={m.id} className="whitespace-pre-wrap">



14

<div>



15

<div className="font-bold">{m.role}</div>



16

{m.parts.map(part => {



17

switch (part.type) {



18

case 'text':



19

return <p>{part.text}</p>;



20

case 'tool-addResource':



21

case 'tool-getInformation':



22

return (



23

<p>



24

call{part.state === 'output-available' ? 'ed' : 'ing'}{' '}



25

tool: {part.type}



26

<pre className="my-4 bg-zinc-100 p-2 rounded-sm">



27

{JSON.stringify(part.input, null, 2)}



28

</pre>



29

</p>



30

);



31

}



32

})}



33

</div>



34

</div>



35

))}



36

</div>



37



38

<form



39

onSubmit={e => {



40

e.preventDefault();



41

sendMessage({ text: input });



42

setInput('');



43

}}



44

>



45

<input



46

className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"



47

value={input}



48

placeholder="Say something..."



49

onChange={e => setInput(e.currentTarget.value)}



50

/>



51

</form>



52

</div>



53

);



54

}
```

With this change, you now conditionally render the tool that has been called directly in the UI. Save the file and head back to browser. Tell the model your favorite movie. You should see which tool is called in place of the model’s typical text response.

Don't worry about the `tool-getInformation` tool case in the switch statement

* we'll add that tool in a later section.

### [Improving UX with Multi-Step Calls](#improving-ux-with-multi-step-calls)

It would be nice if the model could summarize the action too. However, technically, once the model calls a tool, it has completed its generation as it ‘generated’ a tool call. How could you achieve this desired behavior?

The AI SDK has a feature called [`stopWhen`](/docs/ai-sdk-core/tools-and-tool-calling#multi-step-calls) which allows stopping conditions when the model generates a tool call. If those stopping conditions haven't been hit, the AI SDK will automatically send tool call results back to the model!

Open your root page (`api/chat/route.ts`) and add the following key to the `streamText` configuration object:

api/chat/route.ts

```
1

import { createResource } from '@/lib/actions/resources';



2

import {



3

convertToModelMessages,



4

streamText,



5

tool,



6

UIMessage,



7

stepCountIs,



8

} from 'ai';



9

import { z } from 'zod';



10



11

// Allow streaming responses up to 30 seconds



12

export const maxDuration = 30;



13



14

export async function POST(req: Request) {



15

const { messages }: { messages: UIMessage[] } = await req.json();



16



17

const result = streamText({



18

model: 'openai/gpt-4o',



19

system: `You are a helpful assistant. Check your knowledge base before answering any questions.



20

Only respond to questions using information from tool calls.



21

if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,



22

messages: await convertToModelMessages(messages),



23

stopWhen: stepCountIs(5),



24

tools: {



25

addResource: tool({



26

description: `add a resource to your knowledge base.



27

If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,



28

inputSchema: z.object({



29

content: z



30

.string()



31

.describe('the content or resource to add to the knowledge base'),



32

}),



33

execute: async ({ content }) => createResource({ content }),



34

}),



35

},



36

});



37



38

return result.toUIMessageStreamResponse();



39

}
```

Head back to the browser and tell the model your favorite pizza topping (note: pineapple is not an option). You should see a follow-up response from the model confirming the action.

### [Retrieve Resource Tool](#retrieve-resource-tool)

The model can now add and embed arbitrary information to your knowledge base. However, it still isn’t able to query it. Let’s create a new tool to allow the model to answer questions by finding relevant information in your knowledge base.

To find similar content, you will need to embed the users query, search the database for semantic similarities, then pass those items to the model as context alongside the query. To achieve this, let’s update your embedding logic file (`lib/ai/embedding.ts`):

lib/ai/embedding.ts

```
1

import { embed, embedMany } from 'ai';



2

import { db } from '../db';



3

import { cosineDistance, desc, gt, sql } from 'drizzle-orm';



4

import { embeddings } from '../db/schema/embeddings';



5



6

const embeddingModel = 'openai/text-embedding-ada-002';



7



8

const generateChunks = (input: string): string[] => {



9

return input



10

.trim()



11

.split('.')



12

.filter(i => i !== '');



13

};



14



15

export const generateEmbeddings = async (



16

value: string,



17

): Promise<Array<{ embedding: number[]; content: string }>> => {



18

const chunks = generateChunks(value);



19

const { embeddings } = await embedMany({



20

model: embeddingModel,



21

values: chunks,



22

});



23

return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));



24

};



25



26

export const generateEmbedding = async (value: string): Promise<number[]> => {



27

const input = value.replaceAll('\\n', ' ');



28

const { embedding } = await embed({



29

model: embeddingModel,



30

value: input,



31

});



32

return embedding;



33

};



34



35

export const findRelevantContent = async (userQuery: string) => {



36

const userQueryEmbedded = await generateEmbedding(userQuery);



37

const similarity = sql<number>`1 - (${cosineDistance(



38

embeddings.embedding,



39

userQueryEmbedded,



40

)})`;



41

const similarGuides = await db



42

.select({ name: embeddings.content, similarity })



43

.from(embeddings)



44

.where(gt(similarity, 0.5))



45

.orderBy(t => desc(t.similarity))



46

.limit(4);



47

return similarGuides;



48

};
```

In this code, you add two functions:

* `generateEmbedding`: generate a single embedding from an input string
* `findRelevantContent`: embeds the user’s query, searches the database for similar items, then returns relevant items

With that done, it’s onto the final step: creating the tool.

Go back to your route handler (`api/chat/route.ts`) and add a new tool called `getInformation`:

api/chat/route.ts

```
1

import { createResource } from '@/lib/actions/resources';



2

import {



3

convertToModelMessages,



4

streamText,



5

tool,



6

UIMessage,



7

stepCountIs,



8

} from 'ai';



9

import { z } from 'zod';



10

import { findRelevantContent } from '@/lib/ai/embedding';



11



12

// Allow streaming responses up to 30 seconds



13

export const maxDuration = 30;



14



15

export async function POST(req: Request) {



16

const { messages }: { messages: UIMessage[] } = await req.json();



17



18

const result = streamText({



19

model: 'openai/gpt-4o',



20

messages: await convertToModelMessages(messages),



21

stopWhen: stepCountIs(5),



22

system: `You are a helpful assistant. Check your knowledge base before answering any questions.



23

Only respond to questions using information from tool calls.



24

if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,



25

tools: {



26

addResource: tool({



27

description: `add a resource to your knowledge base.



28

If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,



29

inputSchema: z.object({



30

content: z



31

.string()



32

.describe('the content or resource to add to the knowledge base'),



33

}),



34

execute: async ({ content }) => createResource({ content }),



35

}),



36

getInformation: tool({



37

description: `get information from your knowledge base to answer questions.`,



38

inputSchema: z.object({



39

question: z.string().describe('the users question'),



40

}),



41

execute: async ({ question }) => findRelevantContent(question),



42

}),



43

},



44

});



45



46

return result.toUIMessageStreamResponse();



47

}
```

Head back to the browser, refresh the page, and ask for your favorite food. You should see the model call the `getInformation` tool, and then use the relevant information to formulate a response!

[Conclusion](#conclusion)
-------------------------

Congratulations, you have successfully built an AI agent that can dynamically add and retrieve information to and from a knowledge base. Throughout this guide, you learned how to create and store embeddings, set up server actions to manage resources, and use tools to extend the capabilities of your agent.

[Troubleshooting Migration Error](#troubleshooting-migration-error)
-------------------------------------------------------------------

If you experience an error with the migration, open your migration file (`lib/db/migrations/0000_yielding_bloodaxe.sql`), cut (copy and remove) the first line, and run it directly on your postgres instance. You should now be able to run the updated migration.

If you're using the Vercel setup above, you can run the command directly by either:

* Going to the Neon console and entering the command there, or
* Going back to the Vercel platform, navigating to the Quick Start section of your database, and finding the PSQL connection command (second tab). This will connect to your instance in the terminal where you can run the command directly.

[More info](https://github.com/vercel/ai-sdk-rag-starter/issues/1).