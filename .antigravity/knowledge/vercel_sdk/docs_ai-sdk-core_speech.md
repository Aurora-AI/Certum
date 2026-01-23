# https://sdk.vercel.ai/docs/ai-sdk-core/speech

Copy markdown

[Speech](#speech)
=================

Speech is an experimental feature.

The AI SDK provides the [`generateSpeech`](/docs/reference/ai-sdk-core/generate-speech)
function to generate speech from text using a speech model.

```
1

import { experimental_generateSpeech as generateSpeech } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const audio = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

voice: 'alloy',



8

});
```

### [Language Setting](#language-setting)

You can specify the language for speech generation (provider support varies):

```
1

import { experimental_generateSpeech as generateSpeech } from 'ai';



2

import { lmnt } from '@ai-sdk/lmnt';



3



4

const audio = await generateSpeech({



5

model: lmnt.speech('aurora'),



6

text: 'Hola, mundo!',



7

language: 'es', // Spanish



8

});
```

To access the generated audio:

```
1

const audio = audio.audioData; // audio data e.g. Uint8Array
```

[Settings](#settings)
---------------------

### [Provider-Specific settings](#provider-specific-settings)

You can set model-specific settings with the `providerOptions` parameter.

```
1

import { experimental_generateSpeech as generateSpeech } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3



4

const audio = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

providerOptions: {



8

openai: {



9

// ...



10

},



11

},



12

});
```

### [Abort Signals and Timeouts](#abort-signals-and-timeouts)

`generateSpeech` accepts an optional `abortSignal` parameter of
type [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
that you can use to abort the speech generation process or set a timeout.

```
1

import { openai } from '@ai-sdk/openai';



2

import { experimental_generateSpeech as generateSpeech } from 'ai';



3



4

const audio = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

abortSignal: AbortSignal.timeout(1000), // Abort after 1 second



8

});
```

### [Custom Headers](#custom-headers)

`generateSpeech` accepts an optional `headers` parameter of type `Record<string, string>`
that you can use to add custom headers to the speech generation request.

```
1

import { openai } from '@ai-sdk/openai';



2

import { experimental_generateSpeech as generateSpeech } from 'ai';



3



4

const audio = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

headers: { 'X-Custom-Header': 'custom-value' },



8

});
```

### [Warnings](#warnings)

Warnings (e.g. unsupported parameters) are available on the `warnings` property.

```
1

import { openai } from '@ai-sdk/openai';



2

import { experimental_generateSpeech as generateSpeech } from 'ai';



3



4

const audio = await generateSpeech({



5

model: openai.speech('tts-1'),



6

text: 'Hello, world!',



7

});



8



9

const warnings = audio.warnings;
```

### [Error Handling](#error-handling)

When `generateSpeech` cannot generate a valid audio, it throws a [`AI_NoSpeechGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-speech-generated-error).

This error can arise for any the following reasons:

* The model failed to generate a response
* The model generated a response that could not be parsed

The error preserves the following information to help you log the issue:

* `responses`: Metadata about the speech model responses, including timestamp, model, and headers.
* `cause`: The cause of the error. You can use this for more detailed error handling.

```
1

import {



2

experimental_generateSpeech as generateSpeech,



3

NoSpeechGeneratedError,



4

} from 'ai';



5

import { openai } from '@ai-sdk/openai';



6



7

try {



8

await generateSpeech({



9

model: openai.speech('tts-1'),



10

text: 'Hello, world!',



11

});



12

} catch (error) {



13

if (NoSpeechGeneratedError.isInstance(error)) {



14

console.log('AI_NoSpeechGeneratedError');



15

console.log('Cause:', error.cause);



16

console.log('Responses:', error.responses);



17

}



18

}
```

[Speech Models](#speech-models)
-------------------------------

| Provider | Model |
| --- | --- |
| [OpenAI](/providers/ai-sdk-providers/openai#speech-models) | `tts-1` |
| [OpenAI](/providers/ai-sdk-providers/openai#speech-models) | `tts-1-hd` |
| [OpenAI](/providers/ai-sdk-providers/openai#speech-models) | `gpt-4o-mini-tts` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models) | `eleven_v3` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models) | `eleven_multilingual_v2` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models) | `eleven_flash_v2_5` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models) | `eleven_flash_v2` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models) | `eleven_turbo_v2_5` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models) | `eleven_turbo_v2` |
| [LMNT](/providers/ai-sdk-providers/lmnt#speech-models) | `aurora` |
| [LMNT](/providers/ai-sdk-providers/lmnt#speech-models) | `blizzard` |
| [Hume](/providers/ai-sdk-providers/hume#speech-models) | `default` |

Above are a small subset of the speech models supported by the AI SDK providers. For more, see the respective provider documentation.