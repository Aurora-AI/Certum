# https://sdk.vercel.ai/providers/ai-sdk-providers/cohere

Copy markdown

[Cohere Provider](#cohere-provider)
===================================

The [Cohere](https://cohere.com/) provider contains language and embedding model support for the Cohere chat API.

[Setup](#setup)
---------------

The Cohere provider is available in the `@ai-sdk/cohere` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/cohere
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `cohere` from `@ai-sdk/cohere`:

```
1

import { cohere } from '@ai-sdk/cohere';
```

If you need a customized setup, you can import `createCohere` from `@ai-sdk/cohere`
and create a provider instance with your settings:

```
1

import { createCohere } from '@ai-sdk/cohere';



2



3

const cohere = createCohere({



4

// custom settings



5

});
```

You can use the following optional settings to customize the Cohere provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.cohere.com/v2`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `COHERE_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

[Language Models](#language-models)
-----------------------------------

You can create models that call the [Cohere chat API](https://docs.cohere.com/v2/docs/chat-api) using a provider instance.
The first argument is the model id, e.g. `command-r-plus`.
Some Cohere chat models support tool calls.

```
1

const model = cohere('command-r-plus');
```

### [Example](#example)

You can use Cohere language models to generate text with the `generateText` function:

```
1

import { cohere } from '@ai-sdk/cohere';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: cohere('command-r-plus'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Cohere language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core).

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `command-a-03-2025` |  |  |  |  |
| `command-a-reasoning-08-2025` |  |  |  |  |
| `command-r7b-12-2024` |  |  |  |  |
| `command-r-plus-04-2024` |  |  |  |  |
| `command-r-plus` |  |  |  |  |
| `command-r-08-2024` |  |  |  |  |
| `command-r-03-2024` |  |  |  |  |
| `command-r` |  |  |  |  |
| `command` |  |  |  |  |
| `command-nightly` |  |  |  |  |
| `command-light` |  |  |  |  |
| `command-light-nightly` |  |  |  |  |

The table above lists popular models. Please see the [Cohere
docs](https://docs.cohere.com/v2/docs/models#command) for a full list of
available models. You can also pass any available provider model ID as a
string if needed.

#### [Reasoning](#reasoning)

Cohere has introduced reasoning with the `command-a-reasoning-08-2025` model. You can learn more at <https://docs.cohere.com/docs/reasoning>.

```
1

import { cohere } from '@ai-sdk/cohere';



2

import { generateText } from 'ai';



3



4

async function main() {



5

const { text, reasoning } = await generateText({



6

model: cohere('command-a-reasoning-08-2025'),



7

prompt:



8

"Alice has 3 brothers and she also has 2 sisters. How many sisters does Alice's brother have?",



9

// optional: reasoning options



10

providerOptions: {



11

cohere: {



12

thinking: {



13

type: 'enabled',



14

tokenBudget: 100,



15

},



16

},



17

},



18

});



19



20

console.log(reasoning);



21

console.log(text);



22

}



23



24

main().catch(console.error);
```

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the [Cohere embed API](https://docs.cohere.com/v2/reference/embed)
using the `.embedding()` factory method.

```
1

const model = cohere.embedding('embed-english-v3.0');
```

You can use Cohere embedding models to generate embeddings with the `embed` function:

```
1

import { cohere } from '@ai-sdk/cohere';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: cohere.embedding('embed-english-v3.0'),



6

value: 'sunny day at the beach',



7

providerOptions: {



8

cohere: {



9

inputType: 'search_document',



10

},



11

},



12

});
```

Cohere embedding models support additional provider options that can be passed via `providerOptions.cohere`:

```
1

import { cohere } from '@ai-sdk/cohere';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: cohere.embedding('embed-english-v3.0'),



6

value: 'sunny day at the beach',



7

providerOptions: {



8

cohere: {



9

inputType: 'search_document',



10

truncate: 'END',



11

},



12

},



13

});
```

The following provider options are available:

* **inputType** *'search\_document' | 'search\_query' | 'classification' | 'clustering'*

  Specifies the type of input passed to the model. Default is `search_query`.

  + `search_document`: Used for embeddings stored in a vector database for search use-cases.
  + `search_query`: Used for embeddings of search queries run against a vector DB to find relevant documents.
  + `classification`: Used for embeddings passed through a text classifier.
  + `clustering`: Used for embeddings run through a clustering algorithm.
* **truncate** *'NONE' | 'START' | 'END'*

  Specifies how the API will handle inputs longer than the maximum token length.
  Default is `END`.

  + `NONE`: If selected, when the input exceeds the maximum input token length will return an error.
  + `START`: Will discard the start of the input until the remaining input is exactly the maximum input token length for the model.
  + `END`: Will discard the end of the input until the remaining input is exactly the maximum input token length for the model.

### [Model Capabilities](#model-capabilities-1)

| Model | Embedding Dimensions |
| --- | --- |
| `embed-english-v3.0` | 1024 |
| `embed-multilingual-v3.0` | 1024 |
| `embed-english-light-v3.0` | 384 |
| `embed-multilingual-light-v3.0` | 384 |
| `embed-english-v2.0` | 4096 |
| `embed-english-light-v2.0` | 1024 |
| `embed-multilingual-v2.0` | 768 |

[Reranking Models](#reranking-models)
-------------------------------------

You can create models that call the [Cohere rerank API](https://docs.cohere.com/v2/reference/rerank)
using the `.reranking()` factory method.

```
1

const model = cohere.reranking('rerank-v3.5');
```

You can use Cohere reranking models to rerank documents with the `rerank` function:

```
1

import { cohere } from '@ai-sdk/cohere';



2

import { rerank } from 'ai';



3



4

const documents = [



5

'sunny day at the beach',



6

'rainy afternoon in the city',



7

'snowy night in the mountains',



8

];



9



10

const { ranking } = await rerank({



11

model: cohere.reranking('rerank-v3.5'),



12

documents,



13

query: 'talk about rain',



14

topN: 2,



15

});



16



17

console.log(ranking);



18

// [



19

//   { originalIndex: 1, score: 0.9, document: 'rainy afternoon in the city' },



20

//   { originalIndex: 0, score: 0.3, document: 'sunny day at the beach' }



21

// ]
```

Cohere reranking models support additional provider options that can be passed via `providerOptions.cohere`:

```
1

import { cohere } from '@ai-sdk/cohere';



2

import { rerank } from 'ai';



3



4

const { ranking } = await rerank({



5

model: cohere.reranking('rerank-v3.5'),



6

documents: ['sunny day at the beach', 'rainy afternoon in the city'],



7

query: 'talk about rain',



8

providerOptions: {



9

cohere: {



10

maxTokensPerDoc: 1000,



11

priority: 1,



12

},



13

},



14

});
```

The following provider options are available:

* **maxTokensPerDoc** *number*

  Maximum number of tokens per document. Default is `4096`.
* **priority** *number*

  Priority of the request. Default is `0`.

### [Model Capabilities](#model-capabilities-2)

| Model |
| --- |
| `rerank-v3.5` |
| `rerank-english-v3.0` |
| `rerank-multilingual-v3.0` |