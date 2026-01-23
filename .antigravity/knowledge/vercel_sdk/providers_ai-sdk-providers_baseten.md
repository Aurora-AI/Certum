# https://sdk.vercel.ai/providers/ai-sdk-providers/baseten

Copy markdown

[Baseten Provider](#baseten-provider)
=====================================

[Baseten](https://baseten.co/) is an inference platform for serving frontier, enterprise-grade opensource AI models via their [API](https://docs.baseten.co/overview).

[Setup](#setup)
---------------

The Baseten provider is available via the `@ai-sdk/baseten` module. You can install it with

pnpmnpmyarn

```
pnpm add @ai-sdk/baseten
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `baseten` from `@ai-sdk/baseten`:

```
1

import { baseten } from '@ai-sdk/baseten';
```

If you need a customized setup, you can import `createBaseten` from `@ai-sdk/baseten`
and create a provider instance with your settings:

```
1

import { createBaseten } from '@ai-sdk/baseten';



2



3

const baseten = createBaseten({



4

apiKey: process.env.BASETEN_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the Baseten provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://inference.baseten.co/v1`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `BASETEN_API_KEY` environment variable. It is recommended you set the environment variable using `export` so you do not need to include the field everytime.
  You can grab your Baseten API Key [here](https://app.baseten.co/settings/api_keys)
* **modelURL** *string*

  Custom model URL for specific models (chat or embeddings). If not provided,
  the default Model APIs will be used.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.

[Model APIs](#model-apis)
-------------------------

You can select [Baseten models](https://www.baseten.co/products/model-apis/) using a provider instance.
The first argument is the model id, e.g. `'moonshotai/Kimi-K2-Instruct-0905'`: The complete supported models under Model APIs can be found [here](https://docs.baseten.co/development/model-apis/overview#supported-models).

```
1

const model = baseten('moonshotai/Kimi-K2-Instruct-0905');
```

### [Example](#example)

You can use Baseten language models to generate text with the `generateText` function:

```
1

import { baseten } from '@ai-sdk/baseten';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: baseten('moonshotai/Kimi-K2-Instruct-0905'),



6

prompt: 'What is the meaning of life? Answer in one sentence.',



7

});
```

Baseten language models can also be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

[Dedicated Models](#dedicated-models)
-------------------------------------

Baseten supports dedicated model URLs for both chat and embedding models. You have to specify a `modelURL` when creating the provider:

### [OpenAI-Compatible Endpoints (`/sync/v1`)](#openai-compatible-endpoints-syncv1)

For models deployed with Baseten's OpenAI-compatible endpoints:

```
1

import { createBaseten } from '@ai-sdk/baseten';



2



3

const baseten = createBaseten({



4

modelURL: 'https://model-{MODEL_ID}.api.baseten.co/sync/v1',



5

});



6

// No modelId is needed because we specified modelURL



7

const model = baseten();



8

const { text } = await generateText({



9

model: model,



10

prompt: 'Say hello from a Baseten chat model!',



11

});
```

### [`/predict` Endpoints](#predict-endpoints)

`/predict` endpoints are currently NOT supported for chat models. You must use `/sync/v1` endpoints for chat functionality.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the Baseten embeddings API using the `.embeddingModel()` factory method. The Baseten provider uses the high-performance `@basetenlabs/performance-client` for optimal embedding performance.

**Important:** Embedding models require a dedicated deployment with a custom
`modelURL`. Unlike chat models, embeddings cannot use Baseten's default Model
APIs and must specify a dedicated model endpoint.

```
1

import { createBaseten } from '@ai-sdk/baseten';



2

import { embed, embedMany } from 'ai';



3



4

const baseten = createBaseten({



5

modelURL: 'https://model-{MODEL_ID}.api.baseten.co/sync',



6

});



7



8

const embeddingModel = baseten.embeddingModel();



9



10

// Single embedding



11

const { embedding } = await embed({



12

model: embeddingModel,



13

value: 'sunny day at the beach',



14

});



15



16

// Batch embeddings



17

const { embeddings } = await embedMany({



18

model: embeddingModel,



19

values: [



20

'sunny day at the beach',



21

'rainy afternoon in the city',



22

'snowy mountain peak',



23

],



24

});
```

### [Endpoint Support for Embeddings](#endpoint-support-for-embeddings)

**Supported:**

* `/sync` endpoints (Performance Client automatically adds `/v1/embeddings`)
* `/sync/v1` endpoints (automatically strips `/v1` before passing to Performance Client)

**Not Supported:**

* `/predict` endpoints (not compatible with Performance Client)

### [Performance Features](#performance-features)

The embedding implementation includes:

* **High-performance client**: Uses `@basetenlabs/performance-client` for optimal performance
* **Automatic batching**: Efficiently handles multiple texts in a single request
* **Connection reuse**: Performance Client is created once and reused for all requests
* **Built-in retries**: Automatic retry logic for failed requests

[Error Handling](#error-handling)
---------------------------------

The Baseten provider includes built-in error handling for common API errors:

```
1

import { baseten } from '@ai-sdk/baseten';



2

import { generateText } from 'ai';



3



4

try {



5

const { text } = await generateText({



6

model: baseten('moonshotai/Kimi-K2-Instruct-0905'),



7

prompt: 'Hello, world!',



8

});



9

} catch (error) {



10

console.error('Baseten API error:', error.message);



11

}
```

### [Common Error Scenarios](#common-error-scenarios)

```
1

// Embeddings require a modelURL



2

try {



3

baseten.embeddingModel();



4

} catch (error) {



5

// Error: "No model URL provided for embeddings. Please set modelURL option for embeddings."



6

}



7



8

// /predict endpoints are not supported for chat models



9

try {



10

const baseten = createBaseten({



11

modelURL:



12

'https://model-{MODEL_ID}.api.baseten.co/environments/production/predict',



13

});



14

baseten(); // This will throw an error



15

} catch (error) {



16

// Error: "Not supported. You must use a /sync/v1 endpoint for chat models."



17

}



18



19

// /sync/v1 endpoints are now supported for embeddings



20

const baseten = createBaseten({



21

modelURL:



22

'https://model-{MODEL_ID}.api.baseten.co/environments/production/sync/v1',



23

});



24

const embeddingModel = baseten.embeddingModel(); // This works fine!



25



26

// /predict endpoints are not supported for embeddings



27

try {



28

const baseten = createBaseten({



29

modelURL:



30

'https://model-{MODEL_ID}.api.baseten.co/environments/production/predict',



31

});



32

baseten.embeddingModel(); // This will throw an error



33

} catch (error) {



34

// Error: "Not supported. You must use a /sync or /sync/v1 endpoint for embeddings."



35

}



36



37

// Image models are not supported



38

try {



39

baseten.imageModel('test-model');



40

} catch (error) {



41

// Error: NoSuchModelError for imageModel



42

}
```

For more information about Baseten models and deployment options, see the
[Baseten documentation](https://docs.baseten.co/).