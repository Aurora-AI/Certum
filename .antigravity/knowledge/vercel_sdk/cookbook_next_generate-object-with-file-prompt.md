# https://sdk.vercel.ai/cookbook/next/generate-object-with-file-prompt

Copy markdown

[Generate Object with File Prompt through Form Submission](#generate-object-with-file-prompt-through-form-submission)
=====================================================================================================================

This feature is limited to models/providers that support PDF inputs
([Anthropic](/providers/ai-sdk-providers/anthropic#pdf-support),
[OpenAI](/providers/ai-sdk-providers/openai#pdf-support), [Google
Gemini](/providers/ai-sdk-providers/google-generative-ai#file-inputs), and
[Google Vertex](/providers/ai-sdk-providers/google-vertex#file-inputs)).

With select models, you can send PDFs (files) as part of your prompt. Let's create a simple Next.js application that allows a user to upload a PDF send it to an LLM for summarization.

[Client](#client)
-----------------

On the frontend, create a form that allows the user to upload a PDF. When the form is submitted, send the PDF to the `/api/analyze` route.

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

const [description, setDescription] = useState<string>();



7

const [loading, setLoading] = useState(false);



8



9

return (



10

<div>



11

<form



12

action={async formData => {



13

try {



14

setLoading(true);



15

const response = await fetch('/api/analyze', {



16

method: 'POST',



17

body: formData,



18

});



19

setLoading(false);



20



21

if (response.ok) {



22

setDescription(await response.text());



23

}



24

} catch (error) {



25

console.error('Analysis failed:', error);



26

}



27

}}



28

>



29

<div>



30

<label>Upload Image</label>



31

<input name="pdf" type="file" accept="application/pdf" />



32

</div>



33

<button type="submit" disabled={loading}>



34

Submit{loading && 'ing...'}



35

</button>



36

</form>



37

{description && (



38

<pre>{JSON.stringify(JSON.parse(description), null, 2)}</pre>



39

)}



40

</div>



41

);



42

}
```

[Server](#server)
-----------------

On the server, create an API route that receives the PDF, sends it to the LLM, and returns the result. This example uses the  [`generateObject`](/docs/reference/ai-sdk-core/generate-object)  function to generate the summary as part of a structured output.

```
1

import { generateObject } from 'ai';



2

import { z } from 'zod';



3



4

export async function POST(request: Request) {



5

const formData = await request.formData();



6

const file = formData.get('pdf') as File;



7



8

// Convert the file's arrayBuffer to a Base64 data URL



9

const arrayBuffer = await file.arrayBuffer();



10

const uint8Array = new Uint8Array(arrayBuffer);



11



12

// Convert Uint8Array to an array of characters



13

const charArray = Array.from(uint8Array, byte => String.fromCharCode(byte));



14

const binaryString = charArray.join('');



15

const base64Data = btoa(binaryString);



16

const fileDataUrl = `data:application/pdf;base64,${base64Data}`;



17



18

const result = await generateObject({



19

model: 'openai/gpt-4o',



20

messages: [



21

{



22

role: 'user',



23

content: [



24

{



25

type: 'text',



26

text: 'Analyze the following PDF and generate a summary.',



27

},



28

{



29

type: 'file',



30

data: fileDataUrl,



31

mediaType: 'application/pdf',



32

},



33

],



34

},



35

],



36

schema: z.object({



37

people: z



38

.object({



39

name: z.string().describe('The name of the person.'),



40

age: z.number().min(0).describe('The age of the person.'),



41

})



42

.array()



43

.describe('An array of people.'),



44

}),



45

});



46



47

return Response.json(result.object);



48

}
```