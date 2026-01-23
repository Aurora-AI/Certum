# https://sdk.vercel.ai/providers/ai-sdk-providers/azure

Copy markdown

[Azure OpenAI Provider](#azure-openai-provider)
===============================================

The [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) provider contains language model support for the Azure OpenAI chat API.

[Setup](#setup)
---------------

The Azure OpenAI provider is available in the `@ai-sdk/azure` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/azure
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `azure` from `@ai-sdk/azure`:

```
1

import { azure } from '@ai-sdk/azure';
```

If you need a customized setup, you can import `createAzure` from `@ai-sdk/azure` and create a provider instance with your settings:

```
1

import { createAzure } from '@ai-sdk/azure';



2



3

const azure = createAzure({



4

resourceName: 'your-resource-name', // Azure resource name



5

apiKey: 'your-api-key',



6

});
```

You can use the following optional settings to customize the OpenAI provider instance:

* **resourceName** *string*

  Azure resource name.
  It defaults to the `AZURE_RESOURCE_NAME` environment variable.

  The resource name is used in the assembled URL: `https://{resourceName}.openai.azure.com/openai/v1{path}`.
  You can use `baseURL` instead to specify the URL prefix.
* **apiKey** *string*

  API key that is being sent using the `api-key` header.
  It defaults to the `AZURE_API_KEY` environment variable.
* **apiVersion** *string*

  Sets a custom [api version](https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation).
  Defaults to `v1`.
* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.

  Either this or `resourceName` can be used.
  When a baseURL is provided, the resourceName is ignored.

  With a baseURL, the resolved URL is `{baseURL}/v1{path}`.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.
* **useDeploymentBasedUrls** *boolean*

  Use deployment-based URLs for API calls. Set to `true` to use the legacy deployment format:
  `{baseURL}/deployments/{deploymentId}{path}?api-version={apiVersion}` instead of
  `{baseURL}/v1{path}?api-version={apiVersion}`.
  Defaults to `false`.

  This option is useful for compatibility with certain Azure OpenAI models or deployments
  that require the legacy endpoint format.

[Language Models](#language-models)
-----------------------------------

The Azure OpenAI provider instance is a function that you can invoke to create a language model:

```
1

const model = azure('your-deployment-name');
```

You need to pass your deployment name as the first argument.

### [Reasoning Models](#reasoning-models)

Azure exposes the thinking of `DeepSeek-R1` in the generated text using the `<think>` tag.
You can use the `extractReasoningMiddleware` to extract this reasoning and expose it as a `reasoning` property on the result:

```
1

import { azure } from '@ai-sdk/azure';



2

import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';



3



4

const enhancedModel = wrapLanguageModel({



5

model: azure('your-deepseek-r1-deployment-name'),



6

middleware: extractReasoningMiddleware({ tagName: 'think' }),



7

});
```

You can then use that enhanced model in functions like `generateText` and `streamText`.

The Azure provider calls the Responses API by default (unless you specify e.g.
`azure.chat`).

### [Example](#example)

You can use OpenAI language models to generate text with the `generateText` function:

```
1

import { azure } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: azure('your-deployment-name'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

OpenAI language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

Azure OpenAI sends larger chunks than OpenAI. This can lead to the perception
that the response is slower. See [Troubleshooting: Azure OpenAI Slow To
Stream](/docs/troubleshooting/common-issues/azure-stream-slow)

### [Provider Options](#provider-options)

When using OpenAI language models on Azure, you can configure provider-specific options using `providerOptions.openai`. More information on available configuration options are on [the OpenAI provider page](/providers/ai-sdk-providers/openai#language-models).

```
1

const messages = [



2

{



3

role: 'user',



4

content: [



5

{



6

type: 'text',



7

text: 'What is the capital of the moon?',



8

},



9

{



10

type: 'image',



11

image: 'https://example.com/image.png',



12

providerOptions: {



13

openai: { imageDetail: 'low' },



14

},



15

},



16

],



17

},



18

];



19



20

const { text } = await generateText({



21

model: azure('your-deployment-name'),



22

providerOptions: {



23

openai: {



24

reasoningEffort: 'low',



25

},



26

},



27

});
```

### [Chat Models](#chat-models)

The URL for calling Azure chat models will be constructed as follows:
`https://RESOURCE_NAME.openai.azure.com/openai/v1/chat/completions?api-version=v1`

You can create models that call the Azure OpenAI chat completions API using the `.chat()` factory method:

```
1

const model = azure.chat('your-deployment-name');
```

Azure OpenAI chat models support also some model specific settings that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them as an options argument:

```
1

import { azure } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: azure.chat('your-deployment-name'),



6

prompt: 'Write a short story about a robot.',



7

providerOptions: {



8

openai: {



9

logitBias: {



10

// optional likelihood for specific tokens



11

'50256': -100,



12

},



13

user: 'test-user', // optional unique user identifier



14

},



15

},



16

});
```

The following optional provider options are available for OpenAI chat models:

* **logitBias** *Record<number, number>*

  Modifies the likelihood of specified tokens appearing in the completion.

  Accepts a JSON object that maps tokens (specified by their token ID in
  the GPT tokenizer) to an associated bias value from -100 to 100. You
  can use this tokenizer tool to convert text to token IDs. Mathematically,
  the bias is added to the logits generated by the model prior to sampling.
  The exact effect will vary per model, but values between -1 and 1 should
  decrease or increase likelihood of selection; values like -100 or 100
  should result in a ban or exclusive selection of the relevant token.

  As an example, you can pass `{"50256": -100}` to prevent the token from being generated.
* **logprobs** *boolean | number*

  Return the log probabilities of the tokens. Including logprobs will increase
  the response size and can slow down response times. However, it can
  be useful to better understand how the model is behaving.

  Setting to true will return the log probabilities of the tokens that
  were generated.

  Setting to a number will return the log probabilities of the top n
  tokens that were generated.
* **parallelToolCalls** *boolean*

  Whether to enable parallel function calling during tool use. Default to true.
* **user** *string*

  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. Learn more.

### [Responses Models](#responses-models)

Azure OpenAI uses responses API as default with the `azure(deploymentName)` factory method.

```
1

const model = azure('your-deployment-name');
```

Further configuration can be done using OpenAI provider options.
You can validate the provider options using the `OpenAIResponsesProviderOptions` type.

In the Responses API, use `azure` as the provider name in `providerOptions`
instead of `openai`. The `openai` key is still supported for `providerOptions`
input.

```
1

import { azure, OpenAIResponsesProviderOptions } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: azure('your-deployment-name'),



6

providerOptions: {



7

azure: {



8

parallelToolCalls: false,



9

store: false,



10

user: 'user_123',



11

// ...



12

} satisfies OpenAIResponsesProviderOptions,



13

},



14

// ...



15

});
```

The following provider options are available:

* **parallelToolCalls** *boolean*
  Whether to use parallel tool calls. Defaults to `true`.
* **store** *boolean*
  Whether to store the generation. Defaults to `true`.
* **metadata** *Record<string, string>*
  Additional metadata to store with the generation.
* **previousResponseId** *string*
  The ID of the previous response. You can use it to continue a conversation. Defaults to `undefined`.
* **instructions** *string*
  Instructions for the model.
  They can be used to change the system or developer message when continuing a conversation using the `previousResponseId` option.
  Defaults to `undefined`.
* **user** *string*
  A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Defaults to `undefined`.
* **reasoningEffort** *'low' | 'medium' | 'high'*
  Reasoning effort for reasoning models. Defaults to `medium`. If you use `providerOptions` to set the `reasoningEffort` option, this model setting will be ignored.
* **strictJsonSchema** *boolean*
  Whether to use strict JSON schema validation. Defaults to `false`.

The Azure OpenAI provider also returns provider-specific metadata:

```
1

const { providerMetadata } = await generateText({



2

model: azure('your-deployment-name'),



3

});



4



5

const openaiMetadata = providerMetadata?.openai;
```

The following OpenAI-specific metadata is returned:

* **responseId** *string*
  The ID of the response. Can be used to continue a conversation.
* **cachedPromptTokens** *number*
  The number of prompt tokens that were a cache hit.
* **reasoningTokens** *number*
  The number of reasoning tokens that the model generated.

The providerMetadata is only returned with the default responses API, and is
not supported when using 'azure.chat' or 'azure.completion'

#### [Web Search Tool](#web-search-tool)

The Azure OpenAI responses API supports web search(preview) through the `azure.tools.webSearchPreview` tool.

```
1

const result = await generateText({



2

model: azure('gpt-4.1-mini'),



3

prompt: 'What happened in San Francisco last week?',



4

tools: {



5

web_search_preview: azure.tools.webSearchPreview({



6

// optional configuration:



7

searchContextSize: 'low',



8

userLocation: {



9

type: 'approximate',



10

city: 'San Francisco',



11

region: 'California',



12

},



13

}),



14

},



15

// Force web search tool (optional):



16

toolChoice: { type: 'tool', toolName: 'web_search_preview' },



17

});



18



19

console.log(result.text);



20



21

// URL sources directly from `results`



22

const sources = result.sources;



23

for (const source of sources) {



24

console.log('source:', source);



25

}
```

The tool must be named `web_search_preview` when using Azure OpenAI's web
search(preview) functionality. This name is required by Azure OpenAI's API
specification and cannot be customized.

The 'web\_search\_preview' tool is only supported with the default responses
API, and is not supported when using 'azure.chat' or 'azure.completion'

#### [File Search Tool](#file-search-tool)

The Azure OpenAI provider supports file search through the `azure.tools.fileSearch` tool.

You can force the use of the file search tool by setting the `toolChoice` parameter to `{ type: 'tool', toolName: 'file_search' }`.

```
1

const result = await generateText({



2

model: azure('gpt-5'),



3

prompt: 'What does the document say about user authentication?',



4

tools: {



5

file_search: azure.tools.fileSearch({



6

// optional configuration:



7

vectorStoreIds: ['vs_123', 'vs_456'],



8

maxNumResults: 10,



9

ranking: {



10

ranker: 'auto',



11

},



12

}),



13

},



14

// Force file search tool:



15

toolChoice: { type: 'tool', toolName: 'file_search' },



16

});
```

The tool must be named `file_search` when using Azure OpenAI's file search
functionality. This name is required by Azure OpenAI's API specification and
cannot be customized.

The 'file\_search' tool is only supported with the default responses API, and
is not supported when using 'azure.chat' or 'azure.completion'

#### [Image Generation Tool](#image-generation-tool)

Azure OpenAI's Responses API supports multi-modal image generation as a provider-defined tool.
Availability is restricted to specific models (for example, `gpt-5` variants).

```
1

import { createAzure } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const azure = createAzure({



5

headers: {



6

'x-ms-oai-image-generation-deployment': 'gpt-image-1', // use your own image model deployment



7

},



8

});



9



10

const result = await generateText({



11

model: azure('gpt-5'),



12

prompt:



13

'Generate an image of an echidna swimming across the Mozambique channel.',



14

tools: {



15

image_generation: azure.tools.imageGeneration({ outputFormat: 'png' }),



16

},



17

});



18



19

for (const toolResult of result.staticToolResults) {



20

if (toolResult.toolName === 'image_generation') {



21

const base64Image = toolResult.output.result;



22

}



23

}
```

The tool must be named `image_generation` when using Azure OpenAI's image
generation functionality. This name is required by Azure OpenAI's API
specification and cannot be customized.

The 'image\_generation' tool is only supported with the default responses API,
and is not supported when using 'azure.chat' or 'azure.completion'

To use image\_generation, you must first create an image generation model. You
must add a deployment specification to the header
`x-ms-oai-image-generation-deployment`. Please note that the Responses API
model and the image generation model must be in the same resource.

When you set `store: false`, then previously generated images will not be
accessible by the model. We recommend using the image generation tool without
setting `store: false`.

#### [Code Interpreter Tool](#code-interpreter-tool)

The Azure OpenAI provider supports the code interpreter tool through the `azure.tools.codeInterpreter` tool. This allows models to write and execute Python code.

```
1

import { azure } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: azure('gpt-5'),



6

prompt: 'Write and run Python code to calculate the factorial of 10',



7

tools: {



8

code_interpreter: azure.tools.codeInterpreter({



9

// optional configuration:



10

container: {



11

fileIds: ['assistant-123', 'assistant-456'], // optional file IDs to make available



12

},



13

}),



14

},



15

});
```

The code interpreter tool can be configured with:

* **container**: Either a container ID string or an object with `fileIds` to specify uploaded files that should be available to the code interpreter

The tool must be named `code_interpreter` when using Azure OpenAI's code
interpreter functionality. This name is required by Azure OpenAI's API
specification and cannot be customized.

The 'code\_interpreter' tool is only supported with the default responses API,
and is not supported when using 'azure.chat' or 'azure.completion'

When working with files generated by the Code Interpreter, reference
information can be obtained from both [annotations in Text
Parts](#typed-providermetadata-in-text-parts) and [`providerMetadata` in
Source Document Parts](#typed-providermetadata-in-source-document-parts).

#### [PDF support](#pdf-support)

The Azure OpenAI provider supports reading PDF files.
You can pass PDF files as part of the message content using the `file` type:

```
1

const result = await generateText({



2

model: azure('your-deployment-name'),



3

messages: [



4

{



5

role: 'user',



6

content: [



7

{



8

type: 'text',



9

text: 'What is an embedding model?',



10

},



11

{



12

type: 'file',



13

data: fs.readFileSync('./data/ai.pdf'),



14

mediaType: 'application/pdf',



15

filename: 'ai.pdf', // optional



16

},



17

],



18

},



19

],



20

});
```

The model will have access to the contents of the PDF file and
respond to questions about it.
The PDF file should be passed using the `data` field,
and the `mediaType` should be set to `'application/pdf'`.

Reading PDF files are only supported with the default responses API, and is
not supported when using 'azure.chat' or 'azure.completion'

#### [Typed providerMetadata in Text Parts](#typed-providermetadata-in-text-parts)

When using the Azure OpenAI Responses API, the SDK attaches Azure OpenAI-specific metadata to output parts via `providerMetadata`.

This metadata can be used on the client side for tasks such as rendering citations or downloading files generated by the Code Interpreter.
To enable type-safe handling of this metadata, the AI SDK exports dedicated TypeScript types.

For text parts, when `part.type === 'text'`, the `providerMetadata` is provided in the form of `AzureResponsesTextProviderMetadata`.

This metadata includes the following fields:

* `itemId`  
  The ID of the output item in the Responses API.
* `annotations` (optional)
  An array of annotation objects generated by the model.
  If no annotations are present, this property itself may be omitted (`undefined`).

  Each element in `annotations` is a discriminated union with a required `type` field. Supported types include, for example:

  + `url_citation`
  + `file_citation`
  + `container_file_citation`
  + `file_path`

  These annotations directly correspond to the annotation objects defined by the Responses API and can be used for inline reference rendering or output analysis.
  For details, see the official OpenAI documentation:
  [Responses API – output text annotations](https://platform.openai.com/docs/api-reference/responses/object?lang=javascript#responses-object-output-output_message-content-output_text-annotations).

```
1

import { azure, type AzureResponsesTextProviderMetadata } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: azure('gpt-4.1-mini'),



6

prompt:



7

'Create a program that generates five random numbers between 1 and 100 with two decimal places, and show me the execution results. Also save the result to a file.',



8

tools: {



9

code_interpreter: azure.tools.codeInterpreter(),



10

web_search_preview: azure.tools.webSearchPreview({}),



11

file_search: azure.tools.fileSearch({ vectorStoreIds: ['vs_1234'] }), // requires a configured vector store



12

},



13

});



14



15

for (const part of result.content) {



16

if (part.type === 'text') {



17

const providerMetadata = part.providerMetadata as



18

| AzureResponsesTextProviderMetadata



19

| undefined;



20

if (!providerMetadata) continue;



21

const { itemId: _itemId, annotations } = providerMetadata.azure;



22



23

if (!annotations) continue;



24

for (const annotation of annotations) {



25

switch (annotation.type) {



26

case 'url_citation':



27

// url_citation is returned from web_search and provides:



28

// properties: type, url, title, start_index and end_index



29

break;



30

case 'file_citation':



31

// file_citation is returned from file_search and provides:



32

// properties: type, file_id, filename and index



33

break;



34

case 'container_file_citation':



35

// container_file_citation is returned from code_interpreter and provides:



36

// properties: type, container_id, file_id, filename, start_index and end_index



37

break;



38

case 'file_path':



39

// file_path provides:



40

// properties: type, file_id and index



41

break;



42

default: {



43

const _exhaustiveCheck: never = annotation;



44

throw new Error(



45

`Unhandled annotation: ${JSON.stringify(_exhaustiveCheck)}`,



46

);



47

}



48

}



49

}



50

}



51

}
```

When implementing file downloads for files generated by the Code Interpreter,
the `container_id` and `file_id` available in `providerMetadata` can be used
to retrieve the file content. For details, see the [Retrieve container file
content](https://platform.openai.com/docs/api-reference/container-files/retrieveContainerFileContent)
API.

#### [Typed providerMetadata in Source Document Parts](#typed-providermetadata-in-source-document-parts)

For source document parts, when `part.type === 'source'` and `sourceType === 'document'`, the `providerMetadata` is provided as `AzureResponsesSourceDocumentProviderMetadata`.

This metadata is also a discriminated union with a required `type` field. Supported types include:

* `file_citation`
* `container_file_citation`
* `file_path`

Each type includes the identifiers required to work with the referenced resource, such as `fileId` and `containerId`.

```
1

import {



2

azure,



3

type AzureResponsesSourceDocumentProviderMetadata,



4

} from '@ai-sdk/azure';



5

import { generateText } from 'ai';



6



7

const result = await generateText({



8

model: azure('gpt-4.1-mini'),



9

prompt:



10

'Create a program that generates five random numbers between 1 and 100 with two decimal places, and show me the execution results. Also save the result to a file.',



11

tools: {



12

code_interpreter: azure.tools.codeInterpreter(),



13

web_search_preview: azure.tools.webSearchPreview({}),



14

file_search: azure.tools.fileSearch({ vectorStoreIds: ['vs_1234'] }), // requires a configured vector store



15

},



16

});



17



18

for (const part of result.content) {



19

if (part.type === 'source') {



20

if (part.sourceType === 'document') {



21

const providerMetadata = part.providerMetadata as



22

| AzureResponsesSourceDocumentProviderMetadata



23

| undefined;



24

if (!providerMetadata) continue;



25

const annotation = providerMetadata.azure;



26

switch (annotation.type) {



27

case 'file_citation':



28

// file_citation is returned from file_search and provides:



29

// properties: type, fileId and index



30

// The filename can be accessed via part.filename.



31

break;



32

case 'container_file_citation':



33

// container_file_citation is returned from code_interpreter and provides:



34

// properties: type, containerId and fileId



35

// The filename can be accessed via part.filename.



36

break;



37

case 'file_path':



38

// file_path provides:



39

// properties: type, fileId and index



40

break;



41

default: {



42

const _exhaustiveCheck: never = annotation;



43

throw new Error(



44

`Unhandled annotation: ${JSON.stringify(_exhaustiveCheck)}`,



45

);



46

}



47

}



48

}



49

}



50

}
```

Annotations in text parts follow the OpenAI Responses API specification and
therefore use snake\_case properties (e.g. `file_id`, `container_id`). In
contrast, `providerMetadata` for source document parts is normalized by the
SDK to camelCase (e.g. `fileId`, `containerId`). Fields that depend on the
original text content, such as `start_index` and `end_index`, are omitted, as
are fields like `filename` that are directly available on the source object.

### [Completion Models](#completion-models)

You can create models that call the completions API using the `.completion()` factory method.
The first argument is the model id.
Currently only `gpt-35-turbo-instruct` is supported.

```
1

const model = azure.completion('your-gpt-35-turbo-instruct-deployment');
```

OpenAI completion models support also some model specific settings that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them as an options argument:

```
1

import { azure } from '@ai-sdk/azure';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: azure.completion('your-gpt-35-turbo-instruct-deployment'),



6

prompt: 'Write a haiku about coding.',



7

providerOptions: {



8

openai: {



9

echo: true, // optional, echo the prompt in addition to the completion



10

logitBias: {



11

// optional likelihood for specific tokens



12

'50256': -100,



13

},



14

suffix: 'some text', // optional suffix that comes after a completion of inserted text



15

user: 'test-user', // optional unique user identifier



16

},



17

},



18

});
```

The following optional provider options are available for Azure OpenAI completion models:

* **echo**: *boolean*

  Echo back the prompt in addition to the completion.
* **logitBias** *Record<number, number>*

  Modifies the likelihood of specified tokens appearing in the completion.

  Accepts a JSON object that maps tokens (specified by their token ID in
  the GPT tokenizer) to an associated bias value from -100 to 100. You
  can use this tokenizer tool to convert text to token IDs. Mathematically,
  the bias is added to the logits generated by the model prior to sampling.
  The exact effect will vary per model, but values between -1 and 1 should
  decrease or increase likelihood of selection; values like -100 or 100
  should result in a ban or exclusive selection of the relevant token.

  As an example, you can pass `{"50256": -100}` to prevent the <|endoftext|>
  token from being generated.
* **logprobs** *boolean | number*

  Return the log probabilities of the tokens. Including logprobs will increase
  the response size and can slow down response times. However, it can
  be useful to better understand how the model is behaving.

  Setting to true will return the log probabilities of the tokens that
  were generated.

  Setting to a number will return the log probabilities of the top n
  tokens that were generated.
* **suffix** *string*

  The suffix that comes after a completion of inserted text.
* **user** *string*

  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. Learn more.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the Azure OpenAI embeddings API
using the `.embedding()` factory method.

```
1

const model = azure.embedding('your-embedding-deployment');
```

Azure OpenAI embedding models support several additional settings.
You can pass them as an options argument:

```
1

import { azure } from '@ai-sdk/azure';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: azure.embedding('your-embedding-deployment'),



6

value: 'sunny day at the beach',



7

providerOptions: {



8

openai: {



9

dimensions: 512, // optional, number of dimensions for the embedding



10

user: 'test-user', // optional unique user identifier



11

},



12

},



13

});
```

The following optional provider options are available for Azure OpenAI embedding models:

* **dimensions**: *number*

  The number of dimensions the resulting output embeddings should have.
  Only supported in text-embedding-3 and later models.
* **user** *string*

  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. Learn more.

[Image Models](#image-models)
-----------------------------

You can create models that call the Azure OpenAI image generation API (DALL-E) using the `.image()` factory method. The first argument is your deployment name for the DALL-E model.

```
1

const model = azure.image('your-dalle-deployment-name');
```

Azure OpenAI image models support several additional settings. You can pass them as `providerOptions.openai` when generating the image:

```
1

await generateImage({



2

model: azure.image('your-dalle-deployment-name'),



3

prompt: 'A photorealistic image of a cat astronaut floating in space',



4

size: '1024x1024', // '1024x1024', '1792x1024', or '1024x1792' for DALL-E 3



5

providerOptions: {



6

openai: {



7

user: 'test-user', // optional unique user identifier



8

responseFormat: 'url', // 'url' or 'b64_json', defaults to 'url'



9

},



10

},



11

});
```

### [Example](#example-1)

You can use Azure OpenAI image models to generate images with the `generateImage` function:

```
1

import { azure } from '@ai-sdk/azure';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: azure.image('your-dalle-deployment-name'),



6

prompt: 'A photorealistic image of a cat astronaut floating in space',



7

size: '1024x1024', // '1024x1024', '1792x1024', or '1024x1792' for DALL-E 3



8

});



9



10

// image contains the URL or base64 data of the generated image



11

console.log(image);
```

### [Model Capabilities](#model-capabilities)

Azure OpenAI supports DALL-E 2 and DALL-E 3 models through deployments. The capabilities depend on which model version your deployment is using:

| Model Version | Sizes |
| --- | --- |
| DALL-E 3 | 1024x1024, 1792x1024, 1024x1792 |
| DALL-E 2 | 256x256, 512x512, 1024x1024 |

DALL-E models do not support the `aspectRatio` parameter. Use the `size`
parameter instead.

When creating your Azure OpenAI deployment, make sure to set the DALL-E model
version you want to use.

[Transcription Models](#transcription-models)
---------------------------------------------

You can create models that call the Azure OpenAI transcription API using the `.transcription()` factory method.

The first argument is the model id e.g. `whisper-1`.

```
1

const model = azure.transcription('whisper-1');
```

If you encounter a "DeploymentNotFound" error with transcription models,
try enabling deployment-based URLs:

```
1

const azure = createAzure({



2

useDeploymentBasedUrls: true,



3

apiVersion: '2025-04-01-preview',



4

});
```

This uses the legacy endpoint format which may be required for certain Azure OpenAI deployments.
When using useDeploymentBasedUrls, the default api-version is not valid. You must set it to `2025-04-01-preview` or an earlier value.

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the input language in ISO-639-1 (e.g. `en`) format will improve accuracy and latency.

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { azure } from '@ai-sdk/azure';



3

import { readFile } from 'fs/promises';



4



5

const result = await transcribe({



6

model: azure.transcription('whisper-1'),



7

audio: await readFile('audio.mp3'),



8

providerOptions: { openai: { language: 'en' } },



9

});
```

The following provider options are available:

* **timestampGranularities** *string[]*
  The granularity of the timestamps in the transcription.
  Defaults to `['segment']`.
  Possible values are `['word']`, `['segment']`, and `['word', 'segment']`.
  Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
* **language** *string*
  The language of the input audio. Supplying the input language in ISO-639-1 format (e.g. 'en') will improve accuracy and latency.
  Optional.
* **prompt** *string*
  An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.
  Optional.
* **temperature** *number*
  The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
  Defaults to 0.
  Optional.
* **include** *string[]*
  Additional information to include in the transcription response.

### [Model Capabilities](#model-capabilities-1)

| Model | Transcription | Duration | Segments | Language |
| --- | --- | --- | --- | --- |
| `whisper-1` |  |  |  |  |
| `gpt-4o-mini-transcribe` |  |  |  |  |
| `gpt-4o-transcribe` |  |  |  |  |