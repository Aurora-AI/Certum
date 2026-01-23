# https://sdk.vercel.ai/cookbook/next/generate-object

Copy markdown

[Generate Object](#generate-object)
===================================

Earlier functions like `generateText` and `streamText` gave us the ability to generate unstructured text. However, if you want to generate structured data like JSON, you can provide a schema that describes the structure of your desired object to the `generateObject` function.

The function requires you to provide a schema using [zod](https://zod.dev), a library for defining schemas for JavaScript objects. By using zod, you can also use it to validate the generated object and ensure that it conforms to the specified structure.

http://localhost:3000

View Notifications

[Client](#client)
-----------------

Let's create a simple React component that will make a POST request to the `/api/completion` endpoint when a button is clicked. The endpoint will return the generated object based on the input prompt and we'll display it.

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

const [generation, setGeneration] = useState();



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

prompt: 'Messages during finals week.',



19

}),



20

}).then(response => {



21

response.json().then(json => {



22

setGeneration(json.notifications);



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

{isLoading ? (



32

'Loading...'



33

) : (



34

<pre>{JSON.stringify(generation, null, 2)}</pre>



35

)}



36

</div>



37

);



38

}
```

[Server](#server)
-----------------

Let's create a route handler for `/api/completion` that will generate an object based on the input prompt. The route will call the `generateObject` function from the `ai` module, which will then generate an object based on the input prompt and return it.

app/api/completion/route.ts

```
1

import { generateObject } from 'ai';



2

import { z } from 'zod';



3



4

export async function POST(req: Request) {



5

const { prompt }: { prompt: string } = await req.json();



6



7

const result = await generateObject({



8

model: 'openai/gpt-4o',



9

system: 'You generate three notifications for a messages app.',



10

prompt,



11

schema: z.object({



12

notifications: z.array(



13

z.object({



14

name: z.string().describe('Name of a fictional person.'),



15

message: z.string().describe('Do not use emojis or links.'),



16

minutesAgo: z.number(),



17

}),



18

),



19

}),



20

});



21



22

return result.toJsonResponse();



23

}
```

---

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/generate-object/index.tsx)