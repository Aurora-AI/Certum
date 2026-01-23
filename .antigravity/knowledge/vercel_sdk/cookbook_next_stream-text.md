# https://sdk.vercel.ai/cookbook/next/stream-text

Copy markdown

[Stream Text](#stream-text)
===========================

Text generation can sometimes take a long time to complete, especially when you're generating a couple of paragraphs. In such cases, it is useful to stream the text generation process to the client in real-time. This allows the client to display the generated text as it is being generated, rather than have users wait for it to complete before displaying the result.

http://localhost:3000

Answer

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

await complete('Why is the sky blue?');



15

}}



16

>



17

Generate



18

</div>



19



20

{completion}



21

</div>



22

);



23

}
```

[Server](#server)
-----------------

Let's create a route handler for `/api/completion` that will generate text based on the input prompt. The route will call the `streamText` function from the `ai` module, which will then generate text based on the input prompt and stream it to the client.

app/api/completion/route.ts

```
1

import { streamText } from 'ai';



2



3

export async function POST(req: Request) {



4

const { prompt }: { prompt: string } = await req.json();



5



6

const result = streamText({



7

model: 'openai/gpt-4o',



8

system: 'You are a helpful assistant.',



9

prompt,



10

});



11



12

return result.toUIMessageStreamResponse();



13

}
```

---

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/stream-text/index.tsx)