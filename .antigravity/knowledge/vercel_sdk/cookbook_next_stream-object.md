# https://sdk.vercel.ai/cookbook/next/stream-object

Copy markdown

[Stream Object](#stream-object)
===============================

Object generation can sometimes take a long time to complete, especially when you're generating a large schema.
In such cases, it is useful to stream the object generation process to the client in real-time.
This allows the client to display the generated object as it is being generated,
rather than have users wait for it to complete before displaying the result.

http://localhost:3000

View Notifications

[Object Mode](#object-mode)
---------------------------

The `streamObject` function allows you to specify different output strategies using the `output` parameter. By default, the output mode is set to `object`, which will generate exactly the structured object that you specify in the schema option.

### [Schema](#schema)

It is helpful to set up the schema in a separate file that is imported on both the client and server.

app/api/use-object/schema.ts

```
1

import { z } from 'zod';



2



3

// define a schema for the notifications



4

export const notificationSchema = z.object({



5

notifications: z.array(



6

z.object({



7

name: z.string().describe('Name of a fictional person.'),



8

message: z.string().describe('Message. Do not use emojis or links.'),



9

}),



10

),



11

});
```

### [Client](#client)

The client uses [`useObject`](/docs/reference/ai-sdk-ui/use-object) to stream the object generation process.

The results are partial and are displayed as they are received.
Please note the code for handling `undefined` values in the JSX.

app/page.tsx

```
1

'use client';



2



3

import { experimental_useObject as useObject } from '@ai-sdk/react';



4

import { notificationSchema } from './api/use-object/schema';



5



6

export default function Page() {



7

const { object, submit } = useObject({



8

api: '/api/use-object',



9

schema: notificationSchema,



10

});



11



12

return (



13

<div>



14

<button onClick={() => submit('Messages during finals week.')}>



15

Generate notifications



16

</button>



17



18

{object?.notifications?.map((notification, index) => (



19

<div key={index}>



20

<p>{notification?.name}</p>



21

<p>{notification?.message}</p>



22

</div>



23

))}



24

</div>



25

);



26

}
```

### [Server](#server)

On the server, we use [`streamObject`](/docs/reference/ai-sdk-core/stream-object) to stream the object generation process.

app/api/use-object/route.ts

```
1

import { streamObject } from 'ai';



2

import { notificationSchema } from './schema';



3



4

// Allow streaming responses up to 30 seconds



5

export const maxDuration = 30;



6



7

export async function POST(req: Request) {



8

const context = await req.json();



9



10

const result = streamObject({



11

model: 'openai/gpt-4.1',



12

schema: notificationSchema,



13

prompt:



14

`Generate 3 notifications for a messages app in this context:` + context,



15

});



16



17

return result.toTextStreamResponse();



18

}
```

[Loading State and Stopping the Stream](#loading-state-and-stopping-the-stream)
-------------------------------------------------------------------------------

You can use the `loading` state to display a loading indicator while the object is being generated.
You can also use the `stop` function to stop the object generation process.

app/page.tsx

```
1

'use client';



2



3

import { experimental_useObject as useObject } from '@ai-sdk/react';



4

import { notificationSchema } from './api/use-object/schema';



5



6

export default function Page() {



7

const { object, submit, isLoading, stop } = useObject({



8

api: '/api/use-object',



9

schema: notificationSchema,



10

});



11



12

return (



13

<div>



14

<button



15

onClick={() => submit('Messages during finals week.')}



16

disabled={isLoading}



17

>



18

Generate notifications



19

</button>



20



21

{isLoading && (



22

<div>



23

<div>Loading...</div>



24

<button type="button" onClick={() => stop()}>



25

Stop



26

</button>



27

</div>



28

)}



29



30

{object?.notifications?.map((notification, index) => (



31

<div key={index}>



32

<p>{notification?.name}</p>



33

<p>{notification?.message}</p>



34

</div>



35

))}



36

</div>



37

);



38

}
```

[Array Mode](#array-mode)
-------------------------

The "array" output mode allows you to stream an array of objects one element at a time. This is particularly useful when generating lists of items.

### [Schema](#schema-1)

First, update the schema to generate a single object (remove the `z.array()`).

app/api/use-object/schema.ts

```
1

import { z } from 'zod';



2



3

// define a schema for a single notification



4

export const notificationSchema = z.object({



5

name: z.string().describe('Name of a fictional person.'),



6

message: z.string().describe('Message. Do not use emojis or links.'),



7

});
```

### [Client](#client-1)

On the client, you wrap the schema in `z.array()` to generate an array of objects.

app/page.tsx

```
1

'use client';



2



3

import { experimental_useObject as useObject } from '@ai-sdk/react';



4

import { notificationSchema } from '../api/use-object/schema';



5

import z from 'zod';



6



7

export default function Page() {



8

const { object, submit, isLoading, stop } = useObject({



9

api: '/api/use-object',



10

schema: z.array(notificationSchema),



11

});



12



13

return (



14

<div>



15

<button



16

onClick={() => submit('Messages during finals week.')}



17

disabled={isLoading}



18

>



19

Generate notifications



20

</button>



21



22

{isLoading && (



23

<div>



24

<div>Loading...</div>



25

<button type="button" onClick={() => stop()}>



26

Stop



27

</button>



28

</div>



29

)}



30



31

{object?.map((notification, index) => (



32

<div key={index}>



33

<p>{notification?.name}</p>



34

<p>{notification?.message}</p>



35

</div>



36

))}



37

</div>



38

);



39

}
```

### [Server](#server-1)

On the server, specify `output: 'array'` to generate an array of objects.

app/api/use-object/route.ts

```
1

import { streamObject } from 'ai';



2

import { notificationSchema } from './schema';



3



4

export const maxDuration = 30;



5



6

export async function POST(req: Request) {



7

const context = await req.json();



8



9

const result = streamObject({



10

model: 'openai/gpt-4.1',



11

output: 'array',



12

schema: notificationSchema,



13

prompt:



14

`Generate 3 notifications for a messages app in this context:` + context,



15

});



16



17

return result.toTextStreamResponse();



18

}
```

[No Schema Mode](#no-schema-mode)
---------------------------------

The "no-schema" output mode can be used when you don't want to specify a schema, for example when the data structure is defined by a dynamic user request. When using this mode, omit the schema parameter and set `output: 'no-schema'`. The model will still attempt to generate JSON data based on the prompt.

### [Client](#client-2)

On the client, you wrap the schema in `z.array()` to generate an array of objects.

app/page.tsx

```
1

'use client';



2



3

import { experimental_useObject as useObject } from '@ai-sdk/react';



4

import { z } from 'zod';



5



6

export default function Page() {



7

const { object, submit, isLoading, stop } = useObject({



8

api: '/api/use-object',



9

schema: z.unknown(),



10

});



11



12

return (



13

<div>



14

<button



15

onClick={() => submit('Messages during finals week.')}



16

disabled={isLoading}



17

>



18

Generate notifications



19

</button>



20



21

{isLoading && (



22

<div>



23

<div>Loading...</div>



24

<button type="button" onClick={() => stop()}>



25

Stop



26

</button>



27

</div>



28

)}



29



30

{JSON.stringify(object, null, 2)}



31

</div>



32

);



33

}
```

### [Server](#server-2)

On the server, specify `output: 'no-schema'`.

app/api/use-object/route.ts

```
1

import { streamObject } from 'ai';



2



3

export const maxDuration = 30;



4



5

export async function POST(req: Request) {



6

const context = await req.json();



7



8

const result = streamObject({



9

model: 'openai/gpt-4o',



10

output: 'no-schema',



11

prompt:



12

`Generate 3 notifications (in JSON) for a messages app in this context:` +



13

context,



14

});



15



16

return result.toTextStreamResponse();



17

}
```