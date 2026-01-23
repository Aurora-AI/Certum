# https://sdk.vercel.ai/docs/ai-sdk-core/transcription

Copy markdown

[Transcription](#transcription)
===============================

Transcription is an experimental feature.

The AI SDK provides the [`transcribe`](/docs/reference/ai-sdk-core/transcribe)
function to transcribe audio using a transcription model.

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3

import { readFile } from 'fs/promises';



4



5

const transcript = await transcribe({



6

model: openai.transcription('whisper-1'),



7

audio: await readFile('audio.mp3'),



8

});
```

The `audio` property can be a `Uint8Array`, `ArrayBuffer`, `Buffer`, `string` (base64 encoded audio data), or a `URL`.

To access the generated transcript:

```
1

const text = transcript.text; // transcript text e.g. "Hello, world!"



2

const segments = transcript.segments; // array of segments with start and end times, if available



3

const language = transcript.language; // language of the transcript e.g. "en", if available



4

const durationInSeconds = transcript.durationInSeconds; // duration of the transcript in seconds, if available
```

[Settings](#settings)
---------------------

### [Provider-Specific settings](#provider-specific-settings)

Transcription models often have provider or model-specific settings which you can set using the `providerOptions` parameter.

```
1

import { experimental_transcribe as transcribe } from 'ai';



2

import { openai } from '@ai-sdk/openai';



3

import { readFile } from 'fs/promises';



4



5

const transcript = await transcribe({



6

model: openai.transcription('whisper-1'),



7

audio: await readFile('audio.mp3'),



8

providerOptions: {



9

openai: {



10

timestampGranularities: ['word'],



11

},



12

},



13

});
```

### [Abort Signals and Timeouts](#abort-signals-and-timeouts)

`transcribe` accepts an optional `abortSignal` parameter of
type [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
that you can use to abort the transcription process or set a timeout.

```
1

import { openai } from '@ai-sdk/openai';



2

import { experimental_transcribe as transcribe } from 'ai';



3

import { readFile } from 'fs/promises';



4



5

const transcript = await transcribe({



6

model: openai.transcription('whisper-1'),



7

audio: await readFile('audio.mp3'),



8

abortSignal: AbortSignal.timeout(1000), // Abort after 1 second



9

});
```

### [Custom Headers](#custom-headers)

`transcribe` accepts an optional `headers` parameter of type `Record<string, string>`
that you can use to add custom headers to the transcription request.

```
1

import { openai } from '@ai-sdk/openai';



2

import { experimental_transcribe as transcribe } from 'ai';



3

import { readFile } from 'fs/promises';



4



5

const transcript = await transcribe({



6

model: openai.transcription('whisper-1'),



7

audio: await readFile('audio.mp3'),



8

headers: { 'X-Custom-Header': 'custom-value' },



9

});
```

### [Warnings](#warnings)

Warnings (e.g. unsupported parameters) are available on the `warnings` property.

```
1

import { openai } from '@ai-sdk/openai';



2

import { experimental_transcribe as transcribe } from 'ai';



3

import { readFile } from 'fs/promises';



4



5

const transcript = await transcribe({



6

model: openai.transcription('whisper-1'),



7

audio: await readFile('audio.mp3'),



8

});



9



10

const warnings = transcript.warnings;
```

### [Error Handling](#error-handling)

When `transcribe` cannot generate a valid transcript, it throws a [`AI_NoTranscriptGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-transcript-generated-error).

This error can arise for any the following reasons:

* The model failed to generate a response
* The model generated a response that could not be parsed

The error preserves the following information to help you log the issue:

* `responses`: Metadata about the transcription model responses, including timestamp, model, and headers.
* `cause`: The cause of the error. You can use this for more detailed error handling.

```
1

import {



2

experimental_transcribe as transcribe,



3

NoTranscriptGeneratedError,



4

} from 'ai';



5

import { openai } from '@ai-sdk/openai';



6

import { readFile } from 'fs/promises';



7



8

try {



9

await transcribe({



10

model: openai.transcription('whisper-1'),



11

audio: await readFile('audio.mp3'),



12

});



13

} catch (error) {



14

if (NoTranscriptGeneratedError.isInstance(error)) {



15

console.log('NoTranscriptGeneratedError');



16

console.log('Cause:', error.cause);



17

console.log('Responses:', error.responses);



18

}



19

}
```

[Transcription Models](#transcription-models)
---------------------------------------------

| Provider | Model |
| --- | --- |
| [OpenAI](/providers/ai-sdk-providers/openai#transcription-models) | `whisper-1` |
| [OpenAI](/providers/ai-sdk-providers/openai#transcription-models) | `gpt-4o-transcribe` |
| [OpenAI](/providers/ai-sdk-providers/openai#transcription-models) | `gpt-4o-mini-transcribe` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#transcription-models) | `scribe_v1` |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#transcription-models) | `scribe_v1_experimental` |
| [Groq](/providers/ai-sdk-providers/groq#transcription-models) | `whisper-large-v3-turbo` |
| [Groq](/providers/ai-sdk-providers/groq#transcription-models) | `whisper-large-v3` |
| [Azure OpenAI](/providers/ai-sdk-providers/azure#transcription-models) | `whisper-1` |
| [Azure OpenAI](/providers/ai-sdk-providers/azure#transcription-models) | `gpt-4o-transcribe` |
| [Azure OpenAI](/providers/ai-sdk-providers/azure#transcription-models) | `gpt-4o-mini-transcribe` |
| [Rev.ai](/providers/ai-sdk-providers/revai#transcription-models) | `machine` |
| [Rev.ai](/providers/ai-sdk-providers/revai#transcription-models) | `low_cost` |
| [Rev.ai](/providers/ai-sdk-providers/revai#transcription-models) | `fusion` |
| [Deepgram](/providers/ai-sdk-providers/deepgram#transcription-models) | `base` (+ variants) |
| [Deepgram](/providers/ai-sdk-providers/deepgram#transcription-models) | `enhanced` (+ variants) |
| [Deepgram](/providers/ai-sdk-providers/deepgram#transcription-models) | `nova` (+ variants) |
| [Deepgram](/providers/ai-sdk-providers/deepgram#transcription-models) | `nova-2` (+ variants) |
| [Deepgram](/providers/ai-sdk-providers/deepgram#transcription-models) | `nova-3` (+ variants) |
| [Gladia](/providers/ai-sdk-providers/gladia#transcription-models) | `default` |
| [AssemblyAI](/providers/ai-sdk-providers/assemblyai#transcription-models) | `best` |
| [AssemblyAI](/providers/ai-sdk-providers/assemblyai#transcription-models) | `nano` |
| [Fal](/providers/ai-sdk-providers/fal#transcription-models) | `whisper` |
| [Fal](/providers/ai-sdk-providers/fal#transcription-models) | `wizper` |

Above are a small subset of the transcription models supported by the AI SDK providers. For more, see the respective provider documentation.