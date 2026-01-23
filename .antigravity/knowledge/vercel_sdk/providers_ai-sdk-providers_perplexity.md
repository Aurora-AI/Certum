# https://sdk.vercel.ai/providers/ai-sdk-providers/perplexity

Copy markdown

[Perplexity Provider](#perplexity-provider)
===========================================

The [Perplexity](https://sonar.perplexity.ai) provider offers access to Sonar API - a language model that uniquely combines real-time web search with natural language processing. Each response is grounded in current web data and includes detailed citations, making it ideal for research, fact-checking, and obtaining up-to-date information.

API keys can be obtained from the [Perplexity Platform](https://docs.perplexity.ai).

[Setup](#setup)
---------------

The Perplexity provider is available via the `@ai-sdk/perplexity` module. You can install it with:

pnpmnpmyarnbun

```
pnpm add @ai-sdk/perplexity
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `perplexity` from `@ai-sdk/perplexity`:

```
1

import { perplexity } from '@ai-sdk/perplexity';
```

For custom configuration, you can import `createPerplexity` and create a provider instance with your settings:

```
1

import { createPerplexity } from '@ai-sdk/perplexity';



2



3

const perplexity = createPerplexity({



4

apiKey: process.env.PERPLEXITY_API_KEY ?? '',



5

});
```

You can use the following optional settings to customize the Perplexity provider instance:

* **baseURL** *string*

  Use a different URL prefix for API calls.
  The default prefix is `https://api.perplexity.ai`.
* **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `PERPLEXITY_API_KEY` environment variable.
* **headers** *Record<string,string>*

  Custom headers to include in the requests.
* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.

[Language Models](#language-models)
-----------------------------------

You can create Perplexity models using a provider instance:

```
1

import { perplexity } from '@ai-sdk/perplexity';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: perplexity('sonar-pro'),



6

prompt: 'What are the latest developments in quantum computing?',



7

});
```

### [Sources](#sources)

Websites that have been used to generate the response are included in the `sources` property of the result:

```
1

import { perplexity } from '@ai-sdk/perplexity';



2

import { generateText } from 'ai';



3



4

const { text, sources } = await generateText({



5

model: perplexity('sonar-pro'),



6

prompt: 'What are the latest developments in quantum computing?',



7

});



8



9

console.log(sources);
```

### [Provider Options & Metadata](#provider-options--metadata)

The Perplexity provider includes additional metadata in the response through `providerMetadata`.
Additional configuration options are available through `providerOptions`.

```
1

const result = await generateText({



2

model: perplexity('sonar-pro'),



3

prompt: 'What are the latest developments in quantum computing?',



4

providerOptions: {



5

perplexity: {



6

return_images: true, // Enable image responses (Tier-2 Perplexity users only)



7

},



8

},



9

});



10



11

console.log(result.providerMetadata);



12

// Example output:



13

// {



14

//   perplexity: {



15

//     usage: { citationTokens: 5286, numSearchQueries: 1 },



16

//     images: [



17

//       { imageUrl: "https://example.com/image1.jpg", originUrl: "https://elsewhere.com/page1", height: 1280, width: 720 },



18

//       { imageUrl: "https://example.com/image2.jpg", originUrl: "https://elsewhere.com/page2", height: 1280, width: 720 }



19

//     ]



20

//   },



21

// }
```

The metadata includes:

* `usage`: Object containing `citationTokens` and `numSearchQueries` metrics
* `images`: Array of image URLs when `return_images` is enabled (Tier-2 users only)

You can enable image responses by setting `return_images: true` in the provider options. This feature is only available to Perplexity Tier-2 users and above.

### [PDF Support](#pdf-support)

The Perplexity provider supports reading PDF files.
You can pass PDF files as part of the message content using the `file` type:

```
1

const result = await generateText({



2

model: perplexity('sonar-pro'),



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

text: 'What is this document about?',



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

You can also pass the URL of a PDF:

```
1

{



2

type: 'file',



3

data: new URL('https://example.com/document.pdf'),



4

mediaType: 'application/pdf',



5

filename: 'document.pdf', // optional



6

}
```

The model will have access to the contents of the PDF file and
respond to questions about it.

For more details about Perplexity's capabilities, see the [Perplexity chat
completion docs](https://docs.perplexity.ai/api-reference/chat-completions).

[Model Capabilities](#model-capabilities)
-----------------------------------------

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `sonar-deep-research` |  |  |  |  |
| `sonar-reasoning-pro` |  |  |  |  |
| `sonar-reasoning` |  |  |  |  |
| `sonar-pro` |  |  |  |  |
| `sonar` |  |  |  |  |

Please see the [Perplexity docs](https://docs.perplexity.ai) for detailed API
documentation and the latest updates.