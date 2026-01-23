# https://sdk.vercel.ai/docs/ai-sdk-core/middleware

Copy markdown

[Language Model Middleware](#language-model-middleware)
=======================================================

Language model middleware is a way to enhance the behavior of language models
by intercepting and modifying the calls to the language model.

It can be used to add features like guardrails, RAG, caching, and logging
in a language model agnostic way. Such middleware can be developed and
distributed independently from the language models that they are applied to.

[Using Language Model Middleware](#using-language-model-middleware)
-------------------------------------------------------------------

You can use language model middleware with the `wrapLanguageModel` function.
It takes a language model and a language model middleware and returns a new
language model that incorporates the middleware.

```
1

import { wrapLanguageModel } from 'ai';



2



3

const wrappedLanguageModel = wrapLanguageModel({



4

model: yourModel,



5

middleware: yourLanguageModelMiddleware,



6

});
```

The wrapped language model can be used just like any other language model, e.g. in `streamText`:

```
1

const result = streamText({



2

model: wrappedLanguageModel,



3

prompt: 'What cities are in the United States?',



4

});
```

[Multiple middlewares](#multiple-middlewares)
---------------------------------------------

You can provide multiple middlewares to the `wrapLanguageModel` function.
The middlewares will be applied in the order they are provided.

```
1

const wrappedLanguageModel = wrapLanguageModel({



2

model: yourModel,



3

middleware: [firstMiddleware, secondMiddleware],



4

});



5



6

// applied as: firstMiddleware(secondMiddleware(yourModel))
```

[Built-in Middleware](#built-in-middleware)
-------------------------------------------

The AI SDK comes with several built-in middlewares that you can use to configure language models:

* `extractReasoningMiddleware`: Extracts reasoning information from the generated text and exposes it as a `reasoning` property on the result.
* `extractJsonMiddleware`: Extracts JSON from text content by stripping markdown code fences. Useful when using `Output.object()` with models that wrap JSON responses in code blocks.
* `simulateStreamingMiddleware`: Simulates streaming behavior with responses from non-streaming language models.
* `defaultSettingsMiddleware`: Applies default settings to a language model.
* `addToolInputExamplesMiddleware`: Adds tool input examples to tool descriptions for providers that don't natively support the `inputExamples` property.

### [Extract Reasoning](#extract-reasoning)

Some providers and models expose reasoning information in the generated text using special tags,
e.g. <think> and </think>.

The `extractReasoningMiddleware` function can be used to extract this reasoning information and expose it as a `reasoning` property on the result.

```
1

import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';



2



3

const model = wrapLanguageModel({



4

model: yourModel,



5

middleware: extractReasoningMiddleware({ tagName: 'think' }),



6

});
```

You can then use that enhanced model in functions like `generateText` and `streamText`.

The `extractReasoningMiddleware` function also includes a `startWithReasoning` option.
When set to `true`, the reasoning tag will be prepended to the generated text.
This is useful for models that do not include the reasoning tag at the beginning of the response.
For more details, see the [DeepSeek R1 guide](/docs/guides/r1#deepseek-r1-middleware).

### [Extract JSON](#extract-json)

Some models wrap JSON responses in markdown code fences (e.g., ```` ```json ... ``` ````) even when you request structured output.

The `extractJsonMiddleware` function strips these code fences from the response, making it compatible with `Output.object()`.

```
1

import { wrapLanguageModel, extractJsonMiddleware, Output } from 'ai';



2

import { z } from 'zod';



3



4

const model = wrapLanguageModel({



5

model: yourModel,



6

middleware: extractJsonMiddleware(),



7

});



8



9

const result = await generateText({



10

model,



11

output: Output.object({



12

schema: z.object({



13

name: z.string(),



14

ingredients: z.array(z.string()),



15

}),



16

}),



17

prompt: 'Generate a recipe.',



18

});
```

You can also provide a custom transform function for models that use different formatting:

```
1

const model = wrapLanguageModel({



2

model: yourModel,



3

middleware: extractJsonMiddleware({



4

transform: text => text.replace(/^PREFIX/, '').replace(/SUFFIX$/, ''),



5

}),



6

});
```

### [Simulate Streaming](#simulate-streaming)

The `simulateStreamingMiddleware` function can be used to simulate streaming behavior with responses from non-streaming language models.
This is useful when you want to maintain a consistent streaming interface even when using models that only provide complete responses.

```
1

import { wrapLanguageModel, simulateStreamingMiddleware } from 'ai';



2



3

const model = wrapLanguageModel({



4

model: yourModel,



5

middleware: simulateStreamingMiddleware(),



6

});
```

### [Default Settings](#default-settings)

The `defaultSettingsMiddleware` function can be used to apply default settings to a language model.

```
1

import { wrapLanguageModel, defaultSettingsMiddleware } from 'ai';



2



3

const model = wrapLanguageModel({



4

model: yourModel,



5

middleware: defaultSettingsMiddleware({



6

settings: {



7

temperature: 0.5,



8

maxOutputTokens: 800,



9

providerOptions: { openai: { store: false } },



10

},



11

}),



12

});
```

### [Add Tool Input Examples](#add-tool-input-examples)

The `addToolInputExamplesMiddleware` function adds tool input examples to tool descriptions.
This is useful for providers that don't natively support the `inputExamples` property on tools.
The middleware serializes the examples into the tool's description text so models can still benefit from seeing example inputs.

```
1

import { wrapLanguageModel, addToolInputExamplesMiddleware } from 'ai';



2



3

const model = wrapLanguageModel({



4

model: yourModel,



5

middleware: addToolInputExamplesMiddleware({



6

examplesPrefix: 'Input Examples:',



7

}),



8

});
```

When you define a tool with `inputExamples`, the middleware will append them to the tool's description:

```
1

import { generateText, tool } from 'ai';



2

import { z } from 'zod';



3



4

const result = await generateText({



5

model, // wrapped model from above



6

tools: {



7

weather: tool({



8

description: 'Get the weather in a location',



9

inputSchema: z.object({



10

location: z.string(),



11

}),



12

inputExamples: [



13

{ input: { location: 'San Francisco' } },



14

{ input: { location: 'London' } },



15

],



16

}),



17

},



18

prompt: 'What is the weather in Tokyo?',



19

});
```

The tool description will be transformed to:

```
1

Get the weather in a location



2



3

Input Examples:



4

{"location":"San Francisco"}



5

{"location":"London"}
```

#### [Options](#options)

* `examplesPrefix` (required): A prefix text to prepend before the examples.
* `formatExample` (optional): A custom formatter function for each example. Receives the example object and its index. Default: `JSON.stringify(example.input)`.
* `removeInputExamples` (optional): Whether to remove the `inputExamples` property from the tool after adding them to the description. Default: `true`.

```
1

const model = wrapLanguageModel({



2

model: yourModel,



3

middleware: addToolInputExamplesMiddleware({



4

examplesPrefix: 'Input Examples:',



5

formatExample: (example, index) =>



6

`${index + 1}. ${JSON.stringify(example.input)}`,



7

removeInputExamples: true,



8

}),



9

});
```

[Community Middleware](#community-middleware)
---------------------------------------------

The AI SDK provides a Language Model Middleware specification. Community members can develop middleware that adheres to this specification, making it compatible with the AI SDK ecosystem.

Here are some community middlewares that you can explore:

### [Custom tool call parser](#custom-tool-call-parser)

The [Custom tool call parser](https://github.com/minpeter/ai-sdk-tool-call-middleware) middleware extends tool call capabilities to models that don't natively support the OpenAI-style `tools` parameter. This includes many self-hosted and third-party models that lack native function calling features.

Using this middleware on models that support native function calls may result
in unintended performance degradation, so check whether your model supports
native function calls before deciding to use it.

This middleware enables function calling capabilities by converting function schemas into prompt instructions and parsing the model's responses into structured function calls. It works by transforming the JSON function definitions into natural language instructions the model can understand, then analyzing the generated text to extract function call attempts. This approach allows developers to use the same function calling API across different model providers, even with models that don't natively support the OpenAI-style function calling format, providing a consistent function calling experience regardless of the underlying model implementation.

The `@ai-sdk-tool/parser` package offers three middleware variants:

* `createToolMiddleware`: A flexible function for creating custom tool call middleware tailored to specific models
* `hermesToolMiddleware`: Ready-to-use middleware for Hermes & Qwen format function calls
* `gemmaToolMiddleware`: Pre-configured middleware for Gemma 3 model series function call format

Here's how you can enable function calls with Gemma models that don't support them natively:

```
1

import { wrapLanguageModel } from 'ai';



2

import { gemmaToolMiddleware } from '@ai-sdk-tool/parser';



3



4

const model = wrapLanguageModel({



5

model: openrouter('google/gemma-3-27b-it'),



6

middleware: gemmaToolMiddleware,



7

});
```

Find more examples at this [link](https://github.com/minpeter/ai-sdk-tool-call-middleware/tree/main/examples/core/src).

[Implementing Language Model Middleware](#implementing-language-model-middleware)
---------------------------------------------------------------------------------

Implementing language model middleware is advanced functionality and requires
a solid understanding of the [language model
specification](https://github.com/vercel/ai/blob/v5/packages/provider/src/language-model/v2/language-model-v2.ts).

You can implement any of the following three function to modify the behavior of the language model:

1. `transformParams`: Transforms the parameters before they are passed to the language model, for both `doGenerate` and `doStream`.
2. `wrapGenerate`: Wraps the `doGenerate` method of the [language model](https://github.com/vercel/ai/blob/v5/packages/provider/src/language-model/v2/language-model-v2.ts).
   You can modify the parameters, call the language model, and modify the result.
3. `wrapStream`: Wraps the `doStream` method of the [language model](https://github.com/vercel/ai/blob/v5/packages/provider/src/language-model/v2/language-model-v2.ts).
   You can modify the parameters, call the language model, and modify the result.

Here are some examples of how to implement language model middleware:

[Examples](#examples)
---------------------

These examples are not meant to be used in production. They are just to show
how you can use middleware to enhance the behavior of language models.

### [Logging](#logging)

This example shows how to log the parameters and generated text of a language model call.

```
1

import type {



2

LanguageModelV3Middleware,



3

LanguageModelV3StreamPart,



4

} from '@ai-sdk/provider';



5



6

export const yourLogMiddleware: LanguageModelV3Middleware = {



7

wrapGenerate: async ({ doGenerate, params }) => {



8

console.log('doGenerate called');



9

console.log(`params: ${JSON.stringify(params, null, 2)}`);



10



11

const result = await doGenerate();



12



13

console.log('doGenerate finished');



14

console.log(`generated text: ${result.text}`);



15



16

return result;



17

},



18



19

wrapStream: async ({ doStream, params }) => {



20

console.log('doStream called');



21

console.log(`params: ${JSON.stringify(params, null, 2)}`);



22



23

const { stream, ...rest } = await doStream();



24



25

let generatedText = '';



26

const textBlocks = new Map<string, string>();



27



28

const transformStream = new TransformStream<



29

LanguageModelV3StreamPart,



30

LanguageModelV3StreamPart



31

>({



32

transform(chunk, controller) {



33

switch (chunk.type) {



34

case 'text-start': {



35

textBlocks.set(chunk.id, '');



36

break;



37

}



38

case 'text-delta': {



39

const existing = textBlocks.get(chunk.id) || '';



40

textBlocks.set(chunk.id, existing + chunk.delta);



41

generatedText += chunk.delta;



42

break;



43

}



44

case 'text-end': {



45

console.log(



46

`Text block ${chunk.id} completed:`,



47

textBlocks.get(chunk.id),



48

);



49

break;



50

}



51

}



52



53

controller.enqueue(chunk);



54

},



55



56

flush() {



57

console.log('doStream finished');



58

console.log(`generated text: ${generatedText}`);



59

},



60

});



61



62

return {



63

stream: stream.pipeThrough(transformStream),



64

...rest,



65

};



66

},



67

};
```

### [Caching](#caching)

This example shows how to build a simple cache for the generated text of a language model call.

```
1

import type { LanguageModelV3Middleware } from '@ai-sdk/provider';



2



3

const cache = new Map<string, any>();



4



5

export const yourCacheMiddleware: LanguageModelV3Middleware = {



6

wrapGenerate: async ({ doGenerate, params }) => {



7

const cacheKey = JSON.stringify(params);



8



9

if (cache.has(cacheKey)) {



10

return cache.get(cacheKey);



11

}



12



13

const result = await doGenerate();



14



15

cache.set(cacheKey, result);



16



17

return result;



18

},



19



20

// here you would implement the caching logic for streaming



21

};
```

### [Retrieval Augmented Generation (RAG)](#retrieval-augmented-generation-rag)

This example shows how to use RAG as middleware.

Helper functions like `getLastUserMessageText` and `findSources` are not part
of the AI SDK. They are just used in this example to illustrate the concept of
RAG.

```
1

import type { LanguageModelV3Middleware } from '@ai-sdk/provider';



2



3

export const yourRagMiddleware: LanguageModelV3Middleware = {



4

transformParams: async ({ params }) => {



5

const lastUserMessageText = getLastUserMessageText({



6

prompt: params.prompt,



7

});



8



9

if (lastUserMessageText == null) {



10

return params; // do not use RAG (send unmodified parameters)



11

}



12



13

const instruction =



14

'Use the following information to answer the question:\n' +



15

findSources({ text: lastUserMessageText })



16

.map(chunk => JSON.stringify(chunk))



17

.join('\n');



18



19

return addToLastUserMessage({ params, text: instruction });



20

},



21

};
```

### [Guardrails](#guardrails)

Guard rails are a way to ensure that the generated text of a language model call
is safe and appropriate. This example shows how to use guardrails as middleware.

```
1

import type { LanguageModelV3Middleware } from '@ai-sdk/provider';



2



3

export const yourGuardrailMiddleware: LanguageModelV3Middleware = {



4

wrapGenerate: async ({ doGenerate }) => {



5

const { text, ...rest } = await doGenerate();



6



7

// filtering approach, e.g. for PII or other sensitive information:



8

const cleanedText = text?.replace(/badword/g, '<REDACTED>');



9



10

return { text: cleanedText, ...rest };



11

},



12



13

// here you would implement the guardrail logic for streaming



14

// Note: streaming guardrails are difficult to implement, because



15

// you do not know the full content of the stream until it's finished.



16

};
```

[Configuring Per Request Custom Metadata](#configuring-per-request-custom-metadata)
-----------------------------------------------------------------------------------

To send and access custom metadata in Middleware, you can use `providerOptions`. This is useful when building logging middleware where you want to pass additional context like user IDs, timestamps, or other contextual data that can help with tracking and debugging.

GatewayProviderCustom

Claude Sonnet 4.5

```
1

import { generateText, wrapLanguageModel } from 'ai';



2

import type { LanguageModelV3Middleware } from '@ai-sdk/provider';



3



4

export const yourLogMiddleware: LanguageModelV3Middleware = {



5

wrapGenerate: async ({ doGenerate, params }) => {



6

console.log('METADATA', params?.providerMetadata?.yourLogMiddleware);



7

const result = await doGenerate();



8

return result;



9

},



10

};



11



12

const { text } = await generateText({



13

model: wrapLanguageModel({



14

model: "anthropic/claude-sonnet-4.5",



15

middleware: yourLogMiddleware,



16

}),



17

prompt: 'Invent a new holiday and describe its traditions.',



18

providerOptions: {



19

yourLogMiddleware: {



20

hello: 'world',



21

},



22

},



23

});



24



25

console.log(text);
```