# https://sdk.vercel.ai/docs/ai-sdk-core/embeddings

Copy markdown

[Embeddings](#embeddings)
=========================

Embeddings are a way to represent words, phrases, or images as vectors in a high-dimensional space.
In this space, similar words are close to each other, and the distance between words can be used to measure their similarity.

[Embedding a Single Value](#embedding-a-single-value)
-----------------------------------------------------

The AI SDK provides the [`embed`](/docs/reference/ai-sdk-core/embed) function to embed single values, which is useful for tasks such as finding similar words
or phrases or clustering text.
You can use it with embeddings models, e.g. `openai.embeddingModel('text-embedding-3-large')` or `mistral.embeddingModel('mistral-embed')`.

```
1

import { embed } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

// 'embedding' is a single embedding object (number[])



5

const { embedding } = await embed({



6

model: 'openai/text-embedding-3-small',



7

value: 'sunny day at the beach',



8

});
```

[Embedding Many Values](#embedding-many-values)
-----------------------------------------------

When loading data, e.g. when preparing a data store for retrieval-augmented generation (RAG),
it is often useful to embed many values at once (batch embedding).

The AI SDK provides the [`embedMany`](/docs/reference/ai-sdk-core/embed-many) function for this purpose.
Similar to `embed`, you can use it with embeddings models,
e.g. `openai.embeddingModel('text-embedding-3-large')` or `mistral.embeddingModel('mistral-embed')`.

```
1

import { openai } from '@ai-sdk/openai';



2

import { embedMany } from 'ai';



3



4

// 'embeddings' is an array of embedding objects (number[][]).



5

// It is sorted in the same order as the input values.



6

const { embeddings } = await embedMany({



7

model: 'openai/text-embedding-3-small',



8

values: [



9

'sunny day at the beach',



10

'rainy afternoon in the city',



11

'snowy night in the mountains',



12

],



13

});
```

[Embedding Similarity](#embedding-similarity)
---------------------------------------------

After embedding values, you can calculate the similarity between them using the [`cosineSimilarity`](/docs/reference/ai-sdk-core/cosine-similarity) function.
This is useful to e.g. find similar words or phrases in a dataset.
You can also rank and filter related items based on their similarity.

```
1

import { openai } from '@ai-sdk/openai';



2

import { cosineSimilarity, embedMany } from 'ai';



3



4

const { embeddings } = await embedMany({



5

model: 'openai/text-embedding-3-small',



6

values: ['sunny day at the beach', 'rainy afternoon in the city'],



7

});



8



9

console.log(



10

`cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`,



11

);
```

[Token Usage](#token-usage)
---------------------------

Many providers charge based on the number of tokens used to generate embeddings.
Both `embed` and `embedMany` provide token usage information in the `usage` property of the result object:

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding, usage } = await embed({



5

model: 'openai/text-embedding-3-small',



6

value: 'sunny day at the beach',



7

});



8



9

console.log(usage); // { tokens: 10 }
```

[Settings](#settings)
---------------------

### [Provider Options](#provider-options)

Embedding model settings can be configured using `providerOptions` for provider-specific parameters:

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: 'openai/text-embedding-3-small',



6

value: 'sunny day at the beach',



7

providerOptions: {



8

openai: {



9

dimensions: 512, // Reduce embedding dimensions



10

},



11

},



12

});
```

### [Parallel Requests](#parallel-requests)

The `embedMany` function now supports parallel processing with configurable `maxParallelCalls` to optimize performance:

```
1

import { openai } from '@ai-sdk/openai';



2

import { embedMany } from 'ai';



3



4

const { embeddings, usage } = await embedMany({



5

maxParallelCalls: 2, // Limit parallel requests



6

model: 'openai/text-embedding-3-small',



7

values: [



8

'sunny day at the beach',



9

'rainy afternoon in the city',



10

'snowy night in the mountains',



11

],



12

});
```

### [Retries](#retries)

Both `embed` and `embedMany` accept an optional `maxRetries` parameter of type `number`
that you can use to set the maximum number of retries for the embedding process.
It defaults to `2` retries (3 attempts in total). You can set it to `0` to disable retries.

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: 'openai/text-embedding-3-small',



6

value: 'sunny day at the beach',



7

maxRetries: 0, // Disable retries



8

});
```

### [Abort Signals and Timeouts](#abort-signals-and-timeouts)

Both `embed` and `embedMany` accept an optional `abortSignal` parameter of
type [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
that you can use to abort the embedding process or set a timeout.

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: 'openai/text-embedding-3-small',



6

value: 'sunny day at the beach',



7

abortSignal: AbortSignal.timeout(1000), // Abort after 1 second



8

});
```

### [Custom Headers](#custom-headers)

Both `embed` and `embedMany` accept an optional `headers` parameter of type `Record<string, string>`
that you can use to add custom headers to the embedding request.

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding } = await embed({



5

model: 'openai/text-embedding-3-small',



6

value: 'sunny day at the beach',



7

headers: { 'X-Custom-Header': 'custom-value' },



8

});
```

[Response Information](#response-information)
---------------------------------------------

Both `embed` and `embedMany` return response information that includes the raw provider response:

```
1

import { openai } from '@ai-sdk/openai';



2

import { embed } from 'ai';



3



4

const { embedding, response } = await embed({



5

model: 'openai/text-embedding-3-small',



6

value: 'sunny day at the beach',



7

});



8



9

console.log(response); // Raw provider response
```

[Embedding Middleware](#embedding-middleware)
---------------------------------------------

You can enhance embedding models, e.g. to set default values, using
`wrapEmbeddingModel` and `EmbeddingModelV3Middleware`.

Here is an example that uses the built-in `defaultEmbeddingSettingsMiddleware`:

```
1

import {



2

customProvider,



3

defaultEmbeddingSettingsMiddleware,



4

embed,



5

wrapEmbeddingModel,



6

gateway,



7

} from 'ai';



8



9

const embeddingModelWithDefaults = wrapEmbeddingModel({



10

model: gateway.embeddingModel('google/gemini-embedding-001'),



11

middleware: defaultEmbeddingSettingsMiddleware({



12

settings: {



13

providerOptions: {



14

google: {



15

outputDimensionality: 256,



16

taskType: 'CLASSIFICATION',



17

},



18

},



19

},



20

}),



21

});
```

[Embedding Providers & Models](#embedding-providers--models)
------------------------------------------------------------

Several providers offer embedding models:

| Provider | Model | Embedding Dimensions |
| --- | --- | --- |
| [OpenAI](/providers/ai-sdk-providers/openai#embedding-models) | `text-embedding-3-large` | 3072 |
| [OpenAI](/providers/ai-sdk-providers/openai#embedding-models) | `text-embedding-3-small` | 1536 |
| [OpenAI](/providers/ai-sdk-providers/openai#embedding-models) | `text-embedding-ada-002` | 1536 |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai#embedding-models) | `gemini-embedding-001` | 3072 |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai#embedding-models) | `text-embedding-004` | 768 |
| [Mistral](/providers/ai-sdk-providers/mistral#embedding-models) | `mistral-embed` | 1024 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-english-v3.0` | 1024 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-multilingual-v3.0` | 1024 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-english-light-v3.0` | 384 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-multilingual-light-v3.0` | 384 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-english-v2.0` | 4096 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-english-light-v2.0` | 1024 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models) | `embed-multilingual-v2.0` | 768 |
| [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock#embedding-models) | `amazon.titan-embed-text-v1` | 1536 |
| [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock#embedding-models) | `amazon.titan-embed-text-v2:0` | 1024 |