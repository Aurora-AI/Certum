# https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data

Copy markdown

[Generating Structured Data](#generating-structured-data)
=========================================================

While text generation can be useful, your use case will likely call for generating structured data.
For example, you might want to extract information from text, classify data, or generate synthetic data.

Many language models are capable of generating structured data, often defined as using "JSON modes" or "tools".
However, you need to manually provide schemas and then validate the generated data as LLMs can produce incorrect or incomplete structured data.

The AI SDK standardises structured object generation across model providers
using the `output` property on [`generateText`](/docs/reference/ai-sdk-core/generate-text)
and [`streamText`](/docs/reference/ai-sdk-core/stream-text).
You can use [Zod schemas](/docs/reference/ai-sdk-core/zod-schema), [Valibot](/docs/reference/ai-sdk-core/valibot-schema), or [JSON schemas](/docs/reference/ai-sdk-core/json-schema) to specify the shape of the data that you want,
and the AI model will generate data that conforms to that structure.

Structured output generation is part of the `generateText` and `streamText`
flow. This means you can combine it with tool calling in the same request.

[Generating Structured Outputs](#generating-structured-outputs)
---------------------------------------------------------------

Use `generateText` with `Output.object()` to generate structured data from a prompt.
The schema is also used to validate the generated data, ensuring type safety and correctness.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { output } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

output: Output.object({



7

schema: z.object({



8

recipe: z.object({



9

name: z.string(),



10

ingredients: z.array(



11

z.object({ name: z.string(), amount: z.string() }),



12

),



13

steps: z.array(z.string()),



14

}),



15

}),



16

}),



17

prompt: 'Generate a lasagna recipe.',



18

});
```

Structured output generation counts as a step in the AI SDK's multi-turn
execution model (where each model call or tool execution is one step). When
combining with tools, account for this in your `stopWhen` configuration.

### [Accessing response headers & body](#accessing-response-headers--body)

Sometimes you need access to the full response from the model provider,
e.g. to access some provider-specific headers or body content.

You can access the raw response headers and body using the `response` property:

```
1

import { generateText, Output } from 'ai';



2



3

const result = await generateText({



4

// ...



5

output: Output.object({ schema }),



6

});



7



8

console.log(JSON.stringify(result.response.headers, null, 2));



9

console.log(JSON.stringify(result.response.body, null, 2));
```

[Stream Structured Outputs](#stream-structured-outputs)
-------------------------------------------------------

Given the added complexity of returning structured data, model response time can be unacceptable for your interactive use case.
With `streamText` and `output`, you can stream the model's structured response as it is generated.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { partialOutputStream } = streamText({



5

model: "anthropic/claude-sonnet-4.5",



6

output: Output.object({



7

schema: z.object({



8

recipe: z.object({



9

name: z.string(),



10

ingredients: z.array(



11

z.object({ name: z.string(), amount: z.string() }),



12

),



13

steps: z.array(z.string()),



14

}),



15

}),



16

}),



17

prompt: 'Generate a lasagna recipe.',



18

});



19



20

// use partialOutputStream as an async iterable



21

for await (const partialObject of partialOutputStream) {



22

console.log(partialObject);



23

}
```

You can consume the structured output on the client with the [`useObject`](/docs/reference/ai-sdk-ui/use-object) hook.

### [Error Handling in Streams](#error-handling-in-streams)

`streamText` starts streaming immediately. When errors occur during streaming, they become part of the stream rather than thrown exceptions (to prevent stream crashes).

To handle errors, provide an `onError` callback:

```
1

import { streamText, Output } from 'ai';



2



3

const result = streamText({



4

// ...



5

output: Output.object({ schema }),



6

onError({ error }) {



7

console.error(error); // log to your error tracking service



8

},



9

});
```

For non-streaming error handling with `generateText`, see the [Error Handling](#error-handling) section below.

[Output Types](#output-types)
-----------------------------

The AI SDK supports multiple ways of specifying the expected structure of generated data via the `Output` object. You can select from various strategies for structured/text generation and validation.

### [`Output.text()`](#outputtext)

Use `Output.text()` to generate plain text from a model. This option doesn't enforce any schema on the result: you simply receive the model's text as a string. This is the default behavior when no `output` is specified.

```
1

import { generateText, Output } from 'ai';



2



3

const { output } = await generateText({



4

// ...



5

output: Output.text(),



6

prompt: 'Tell me a joke.',



7

});



8

// output will be a string (the joke)
```

### [`Output.object()`](#outputobject)

Use `Output.object({ schema })` to generate a structured object based on a schema (for example, a Zod schema). The output is type-validated to ensure the returned result matches the schema.

```
1

import { generateText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { output } = await generateText({



5

// ...



6

output: Output.object({



7

schema: z.object({



8

name: z.string(),



9

age: z.number().nullable(),



10

labels: z.array(z.string()),



11

}),



12

}),



13

prompt: 'Generate information for a test user.',



14

});



15

// output will be an object matching the schema above
```

Partial outputs streamed via `streamText` cannot be validated against your
provided schema, as incomplete data may not yet conform to the expected
structure.

### [`Output.array()`](#outputarray)

Use `Output.array({ element })` to specify that you expect an array of typed objects from the model, where each element should conform to a schema (defined in the `element` property).

```
1

import { generateText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { output } = await generateText({



5

// ...



6

output: Output.array({



7

element: z.object({



8

location: z.string(),



9

temperature: z.number(),



10

condition: z.string(),



11

}),



12

}),



13

prompt: 'List the weather for San Francisco and Paris.',



14

});



15

// output will be an array of objects like:



16

// [



17

//   { location: 'San Francisco', temperature: 70, condition: 'Sunny' },



18

//   { location: 'Paris', temperature: 65, condition: 'Cloudy' },



19

// ]
```

When streaming arrays with `streamText`, you can use `elementStream` to receive each completed element as it is generated:

```
1

import { streamText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { elementStream } = streamText({



5

// ...



6

output: Output.array({



7

element: z.object({



8

name: z.string(),



9

class: z.string(),



10

description: z.string(),



11

}),



12

}),



13

prompt: 'Generate 3 hero descriptions for a fantasy role playing game.',



14

});



15



16

for await (const hero of elementStream) {



17

console.log(hero); // Each hero is complete and validated



18

}
```

Each element emitted by `elementStream` is complete and validated against your
element schema. This differs from `partialOutputStream`, which streams the
entire partial array including incomplete elements.

### [`Output.choice()`](#outputchoice)

Use `Output.choice({ options })` when you expect the model to choose from a specific set of string options, such as for classification or fixed-enum answers.

```
1

import { generateText, Output } from 'ai';



2



3

const { output } = await generateText({



4

// ...



5

output: Output.choice({



6

options: ['sunny', 'rainy', 'snowy'],



7

}),



8

prompt: 'Is the weather sunny, rainy, or snowy today?',



9

});



10

// output will be one of: 'sunny', 'rainy', or 'snowy'
```

You can provide any set of string options, and the output will always be a single string value that matches one of the specified options. The AI SDK validates that the result matches one of your options, and will throw if the model returns something invalid.

This is especially useful for making classification-style generations or forcing valid values for API compatibility.

### [`Output.json()`](#outputjson)

Use `Output.json()` when you want to generate and parse unstructured JSON values from the model, without enforcing a specific schema. This is useful if you want to capture arbitrary objects, flexible structures, or when you want to rely on the model's natural output rather than rigid validation.

```
1

import { generateText, Output } from 'ai';



2



3

const { output } = await generateText({



4

// ...



5

output: Output.json(),



6

prompt:



7

'For each city, return the current temperature and weather condition as a JSON object.',



8

});



9



10

// output could be any valid JSON, for example:



11

// {



12

//   "San Francisco": { "temperature": 70, "condition": "Sunny" },



13

//   "Paris": { "temperature": 65, "condition": "Cloudy" }



14

// }
```

With `Output.json`, the AI SDK only checks that the response is valid JSON; it doesn't validate the structure or types of the values. If you need schema validation, use the `.object` or `.array` outputs instead.

For more advanced validation or different structures, see [the Output API reference](/docs/reference/ai-sdk-core/output).

[Generating Structured Outputs with Tools](#generating-structured-outputs-with-tools)
-------------------------------------------------------------------------------------

One of the key advantages of using structured output with `generateText` and `streamText` is the ability to combine it with tool calling.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText, Output, tool, stepCountIs } from 'ai';



2

import { z } from 'zod';



3



4

const { output } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

tools: {



7

weather: tool({



8

description: 'Get the weather for a location',



9

inputSchema: z.object({ location: z.string() }),



10

execute: async ({ location }) => {



11

// fetch weather data



12

return { temperature: 72, condition: 'sunny' };



13

},



14

}),



15

},



16

output: Output.object({



17

schema: z.object({



18

summary: z.string(),



19

recommendation: z.string(),



20

}),



21

}),



22

stopWhen: stepCountIs(5),



23

prompt: 'What should I wear in San Francisco today?',



24

});
```

When using tools with structured output, remember that generating the
structured output counts as a step. Configure `stopWhen` to allow enough steps
for both tool execution and output generation.

[Property Descriptions](#property-descriptions)
-----------------------------------------------

You can add `.describe("...")` to individual schema properties to give the model hints about what each property is for. This helps improve the quality and accuracy of generated structured data:

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { output } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

output: Output.object({



7

schema: z.object({



8

name: z.string().describe('The name of the recipe'),



9

ingredients: z



10

.array(



11

z.object({



12

name: z.string(),



13

amount: z



14

.string()



15

.describe('The amount of the ingredient (grams or ml)'),



16

}),



17

)



18

.describe('List of ingredients with amounts'),



19

steps: z.array(z.string()).describe('Step-by-step cooking instructions'),



20

}),



21

}),



22

prompt: 'Generate a lasagna recipe.',



23

});
```

Property descriptions are particularly useful for:

* Clarifying ambiguous property names
* Specifying expected formats or conventions
* Providing context for complex nested structures

[Output Name and Description](#output-name-and-description)
-----------------------------------------------------------

You can optionally specify a `name` and `description` for the output. These are used by some providers for additional LLM guidance, e.g. via tool or schema name.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const { output } = await generateText({



5

model: "anthropic/claude-sonnet-4.5",



6

output: Output.object({



7

name: 'Recipe',



8

description: 'A recipe for a dish.',



9

schema: z.object({



10

name: z.string(),



11

ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),



12

steps: z.array(z.string()),



13

}),



14

}),



15

prompt: 'Generate a lasagna recipe.',



16

});
```

This works with all output types that support structured generation:

* `Output.object({ name, description, schema })`
* `Output.array({ name, description, element })`
* `Output.choice({ name, description, options })`
* `Output.json({ name, description })`

[Accessing Reasoning](#accessing-reasoning)
-------------------------------------------

You can access the reasoning used by the language model to generate the object via the `reasoning` property on the result. This property contains a string with the model's thought process, if available.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText, Output } from 'ai';



2

import { z } from 'zod';



3



4

const result = await generateText({



5

model: "anthropic/claude-sonnet-4.5", // must be a reasoning model



6

output: Output.object({



7

schema: z.object({



8

recipe: z.object({



9

name: z.string(),



10

ingredients: z.array(



11

z.object({



12

name: z.string(),



13

amount: z.string(),



14

}),



15

),



16

steps: z.array(z.string()),



17

}),



18

}),



19

}),



20

prompt: 'Generate a lasagna recipe.',



21

});



22



23

console.log(result.reasoning);
```

[Error Handling](#error-handling)
---------------------------------

When `generateText` with structured output cannot generate a valid object, it throws a [`AI_NoObjectGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-object-generated-error).

This error occurs when the AI provider fails to generate a parsable object that conforms to the schema.
It can arise due to the following reasons:

* The model failed to generate a response.
* The model generated a response that could not be parsed.
* The model generated a response that could not be validated against the schema.

The error preserves the following information to help you log the issue:

* `text`: The text that was generated by the model. This can be the raw text or the tool call text, depending on the object generation mode.
* `response`: Metadata about the language model response, including response id, timestamp, and model.
* `usage`: Request token usage.
* `cause`: The cause of the error (e.g. a JSON parsing error). You can use this for more detailed error handling.

```
1

import { generateText, Output, NoObjectGeneratedError } from 'ai';



2



3

try {



4

await generateText({



5

model,



6

output: Output.object({ schema }),



7

prompt,



8

});



9

} catch (error) {



10

if (NoObjectGeneratedError.isInstance(error)) {



11

console.log('NoObjectGeneratedError');



12

console.log('Cause:', error.cause);



13

console.log('Text:', error.text);



14

console.log('Response:', error.response);



15

console.log('Usage:', error.usage);



16

}



17

}
```

[generateObject and streamObject (Legacy)](#generateobject-and-streamobject-legacy)
-----------------------------------------------------------------------------------

`generateObject` and `streamObject` are deprecated. Use `generateText` and
`streamText` with the `output` property instead. The legacy functions will be
removed in a future major version.

The `generateObject` and `streamObject` functions are the legacy way to generate structured data. They work similarly to `generateText` and `streamText` with `Output.object()`, but as standalone functions.

### [generateObject](#generateobject)

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateObject } from 'ai';



2

import { z } from 'zod';



3



4

const { object } = await generateObject({



5

model: "anthropic/claude-sonnet-4.5",



6

schema: z.object({



7

recipe: z.object({



8

name: z.string(),



9

ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),



10

steps: z.array(z.string()),



11

}),



12

}),



13

prompt: 'Generate a lasagna recipe.',



14

});
```

### [streamObject](#streamobject)

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamObject } from 'ai';



2

import { z } from 'zod';



3



4

const { partialObjectStream } = streamObject({



5

model: "anthropic/claude-sonnet-4.5",



6

schema: z.object({



7

recipe: z.object({



8

name: z.string(),



9

ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),



10

steps: z.array(z.string()),



11

}),



12

}),



13

prompt: 'Generate a lasagna recipe.',



14

});



15



16

for await (const partialObject of partialObjectStream) {



17

console.log(partialObject);



18

}
```

### [Schema Name and Description (Legacy)](#schema-name-and-description-legacy)

You can optionally specify a name and description for the schema. These are used by some providers for additional LLM guidance, e.g. via tool or schema name.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateObject } from 'ai';



2

import { z } from 'zod';



3



4

const { object } = await generateObject({



5

model: "anthropic/claude-sonnet-4.5",



6

schemaName: 'Recipe',



7

schemaDescription: 'A recipe for a dish.',



8

schema: z.object({



9

name: z.string(),



10

ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),



11

steps: z.array(z.string()),



12

}),



13

prompt: 'Generate a lasagna recipe.',



14

});
```

### [Output Strategy (Legacy)](#output-strategy-legacy)

The legacy functions support different output strategies via the `output` parameter:

#### [Array](#array)

Generate an array of objects. The schema specifies the shape of an array element.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { streamObject } from 'ai';



2

import { z } from 'zod';



3



4

const { elementStream } = streamObject({



5

model: "anthropic/claude-sonnet-4.5",



6

output: 'array',



7

schema: z.object({



8

name: z.string(),



9

class: z



10

.string()



11

.describe('Character class, e.g. warrior, mage, or thief.'),



12

description: z.string(),



13

}),



14

prompt: 'Generate 3 hero descriptions for a fantasy role playing game.',



15

});



16



17

for await (const hero of elementStream) {



18

console.log(hero);



19

}
```

#### [Enum](#enum)

Generate a specific enum value for classification tasks.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateObject } from 'ai';



2



3

const { object } = await generateObject({



4

model: "anthropic/claude-sonnet-4.5",



5

output: 'enum',



6

enum: ['action', 'comedy', 'drama', 'horror', 'sci-fi'],



7

prompt:



8

'Classify the genre of this movie plot: ' +



9

'"A group of astronauts travel through a wormhole in search of a ' +



10

'new habitable planet for humanity."',



11

});
```

#### [No Schema](#no-schema)

Generate unstructured JSON without a schema.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateObject } from 'ai';



2



3

const { object } = await generateObject({



4

model: "anthropic/claude-sonnet-4.5",



5

output: 'no-schema',



6

prompt: 'Generate a lasagna recipe.',



7

});
```

### [Repairing Invalid JSON (Legacy)](#repairing-invalid-json-legacy)

The `repairText` function is experimental and may change in the future.

Sometimes the model will generate invalid or malformed JSON.
You can use the `repairText` function to attempt to repair the JSON.

```
1

import { generateObject } from 'ai';



2



3

const { object } = await generateObject({



4

model,



5

schema,



6

prompt,



7

experimental_repairText: async ({ text, error }) => {



8

// example: add a closing brace to the text



9

return text + '}';



10

},



11

});
```

[More Examples](#more-examples)
-------------------------------

You can see `generateObject` and `streamObject` in action using various frameworks in the following examples:

### [`generateObject`](#generateobject-1)

[Learn to generate objects in Node.js](/examples/node/generating-structured-data/generate-object)[Learn to generate objects in Next.js with Route Handlers (AI SDK UI)](/examples/next-pages/basics/generating-object)[Learn to generate objects in Next.js with Server Actions (AI SDK RSC)](/examples/next-app/basics/generating-object)

### [`streamText` with Output](#streamtext-with-output)

[Learn to stream objects in Node.js](/examples/node/streaming-structured-data/stream-object)[Learn to stream objects in Next.js with Route Handlers (AI SDK UI)](/examples/next-pages/basics/streaming-object-generation)[Learn to stream objects in Next.js with Server Actions (AI SDK RSC)](/examples/next-app/basics/streaming-object-generation)