# https://sdk.vercel.ai/cookbook/next/generate-text

Copy markdown

[Generate Text](#generate-text)
===============================

A situation may arise when you need to generate text based on a prompt. For example, you may want to generate a response to a question or summarize a body of text. The `generateText` function can be used to generate text based on the input prompt.

http://localhost:3000

Answer

[Client](#client)
-----------------

Let's create a simple React component that will make a POST request to the `/api/completion` endpoint when a button is clicked. The endpoint will generate text based on the input prompt.

app/page.tsx

```
1

'use client';



2



3

import { useState } from 'react';



4



5

export default function Page() {



6

const [generation, setGeneration] = useState('');



7

const [isLoading, setIsLoading] = useState(false);



8



9

return (



10

<div>



11

<div



12

onClick={async () => {



13

setIsLoading(true);



14



15

await fetch('/api/completion', {



16

method: 'POST',



17

body: JSON.stringify({



18

prompt: 'Why is the sky blue?',



19

}),



20

}).then(response => {



21

response.json().then(json => {



22

setGeneration(json.text);



23

setIsLoading(false);



24

});



25

});



26

}}



27

>



28

Generate



29

</div>



30



31

{isLoading ? 'Loading...' : generation}



32

</div>



33

);



34

}
```

[Server](#server)
-----------------

Let's create a route handler for `/api/completion` that will generate text based on the input prompt. The route will call the `generateText` function from the `ai` module, which will then generate text based on the input prompt and return it.

app/api/completion/route.ts

```
1

import { generateText } from 'ai';



2



3

export async function POST(req: Request) {



4

const { prompt }: { prompt: string } = await req.json();



5



6

const { text } = await generateText({



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

return Response.json({ text });



13

}
```

---

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/generate-text/index.tsx)