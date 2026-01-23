# https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock

Copy markdown

[Amazon Bedrock Provider](#amazon-bedrock-provider)
===================================================

The Amazon Bedrock provider for the [AI SDK](/docs) contains language model support for the [Amazon Bedrock](https://aws.amazon.com/bedrock) APIs.

[Setup](#setup)
---------------

The Bedrock provider is available in the `@ai-sdk/amazon-bedrock` module. You can install it with

pnpmnpmyarnbun

```
pnpm add @ai-sdk/amazon-bedrock
```

### [Prerequisites](#prerequisites)

Access to Amazon Bedrock foundation models isn't granted by default. In order to gain access to a foundation model, an IAM user with sufficient permissions needs to request access to it through the console. Once access is provided to a model, it is available for all users in the account.

See the [Model Access Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for more information.

### [Authentication](#authentication)

#### [Using IAM Access Key and Secret Key](#using-iam-access-key-and-secret-key)

**Step 1: Creating AWS Access Key and Secret Key**

To get started, you'll need to create an AWS access key and secret key. Here's how:

**Login to AWS Management Console**

* Go to the [AWS Management Console](https://console.aws.amazon.com/) and log in with your AWS account credentials.

**Create an IAM User**

* Navigate to the [IAM dashboard](https://console.aws.amazon.com/iam/home) and click on "Users" in the left-hand navigation menu.
* Click on "Create user" and fill in the required details to create a new IAM user.
* Make sure to select "Programmatic access" as the access type.
* The user account needs the `AmazonBedrockFullAccess` policy attached to it.

**Create Access Key**

* Click on the "Security credentials" tab and then click on "Create access key".
* Click "Create access key" to generate a new access key pair.
* Download the `.csv` file containing the access key ID and secret access key.

**Step 2: Configuring the Access Key and Secret Key**

Within your project add a `.env` file if you don't already have one. This file will be used to set the access key and secret key as environment variables. Add the following lines to the `.env` file:

```
1

AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID



2

AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY



3

AWS_REGION=YOUR_REGION
```

Many frameworks such as [Next.js](https://nextjs.org/) load the `.env` file
automatically. If you're using a different framework, you may need to load the
`.env` file manually using a package like
[`dotenv`](https://github.com/motdotla/dotenv).

Remember to replace `YOUR_ACCESS_KEY_ID`, `YOUR_SECRET_ACCESS_KEY`, and `YOUR_REGION` with the actual values from your AWS account.

#### [Using AWS SDK Credentials Chain (instance profiles, instance roles, ECS roles, EKS Service Accounts, etc.)](#using-aws-sdk-credentials-chain-instance-profiles-instance-roles-ecs-roles-eks-service-accounts-etc)

When using AWS SDK, the SDK will automatically use the credentials chain to determine the credentials to use. This includes instance profiles, instance roles, ECS roles, EKS Service Accounts, etc. A similar behavior is possible using the AI SDK by not specifying the `accessKeyId` and `secretAccessKey`, `sessionToken` properties in the provider settings and instead passing a `credentialProvider` property.

*Usage:*

`@aws-sdk/credential-providers` package provides a set of credential providers that can be used to create a credential provider chain.

pnpmnpmyarnbun

```
pnpm add @aws-sdk/credential-providers
```

```
1

import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';



2

import { fromNodeProviderChain } from '@aws-sdk/credential-providers';



3



4

const bedrock = createAmazonBedrock({



5

region: 'us-east-1',



6

credentialProvider: fromNodeProviderChain(),



7

});
```

[Provider Instance](#provider-instance)
---------------------------------------

You can import the default provider instance `bedrock` from `@ai-sdk/amazon-bedrock`:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';
```

If you need a customized setup, you can import `createAmazonBedrock` from `@ai-sdk/amazon-bedrock` and create a provider instance with your settings:

```
1

import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';



2



3

const bedrock = createAmazonBedrock({



4

region: 'us-east-1',



5

accessKeyId: 'xxxxxxxxx',



6

secretAccessKey: 'xxxxxxxxx',



7

sessionToken: 'xxxxxxxxx',



8

});
```

The credentials settings fall back to environment variable defaults described
below. These may be set by your serverless environment without your awareness,
which can lead to merged/conflicting credential values and provider errors
around failed authentication. If you're experiencing issues be sure you are
explicitly specifying all settings (even if `undefined`) to avoid any
defaults.

You can use the following optional settings to customize the Amazon Bedrock provider instance:

* **region** *string*

  The AWS region that you want to use for the API calls.
  It uses the `AWS_REGION` environment variable by default.
* **accessKeyId** *string*

  The AWS access key ID that you want to use for the API calls.
  It uses the `AWS_ACCESS_KEY_ID` environment variable by default.
* **secretAccessKey** *string*

  The AWS secret access key that you want to use for the API calls.
  It uses the `AWS_SECRET_ACCESS_KEY` environment variable by default.
* **sessionToken** *string*

  Optional. The AWS session token that you want to use for the API calls.
  It uses the `AWS_SESSION_TOKEN` environment variable by default.
* **credentialProvider** *() => Promise<{ accessKeyId: string; secretAccessKey: string; sessionToken?: string; }>*

  Optional. The AWS credential provider chain that you want to use for the API calls.
  It uses the specified credentials by default.

[Language Models](#language-models)
-----------------------------------

You can create models that call the Bedrock API using the provider instance.
The first argument is the model id, e.g. `meta.llama3-70b-instruct-v1:0`.

```
1

const model = bedrock('meta.llama3-70b-instruct-v1:0');
```

Amazon Bedrock models also support some model specific provider options that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them in the `providerOptions` argument:

```
1

const model = bedrock('anthropic.claude-3-sonnet-20240229-v1:0');



2



3

await generateText({



4

model,



5

providerOptions: {



6

anthropic: {



7

additionalModelRequestFields: { top_k: 350 },



8

},



9

},



10

});
```

Documentation for additional settings based on the selected model can be found within the [Amazon Bedrock Inference Parameter Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html).

You can use Amazon Bedrock language models to generate text with the `generateText` function:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: bedrock('meta.llama3-70b-instruct-v1:0'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});
```

Amazon Bedrock language models can also be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

### [File Inputs](#file-inputs)

Amazon Bedrock supports file inputs in combination with specific models, e.g.
`anthropic.claude-3-haiku-20240307-v1:0`.

The Amazon Bedrock provider supports file inputs, e.g. PDF files.

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: bedrock('anthropic.claude-3-haiku-20240307-v1:0'),



6

messages: [



7

{



8

role: 'user',



9

content: [



10

{ type: 'text', text: 'Describe the pdf in detail.' },



11

{



12

type: 'file',



13

data: readFileSync('./data/ai.pdf'),



14

mediaType: 'application/pdf',



15

},



16

],



17

},



18

],



19

});
```

### [Guardrails](#guardrails)

You can use the `bedrock` provider options to utilize [Amazon Bedrock Guardrails](https://aws.amazon.com/bedrock/guardrails/):

```
1

const result = await generateText({



2

model: bedrock('anthropic.claude-3-sonnet-20240229-v1:0'),



3

prompt: 'Write a story about space exploration.',



4

providerOptions: {



5

bedrock: {



6

guardrailConfig: {



7

guardrailIdentifier: '1abcd2ef34gh',



8

guardrailVersion: '1',



9

trace: 'enabled' as const,



10

streamProcessingMode: 'async',



11

},



12

},



13

},



14

});
```

Tracing information will be returned in the provider metadata if you have tracing enabled.

```
1

if (result.providerMetadata?.bedrock.trace) {



2

// ...



3

}
```

See the [Amazon Bedrock Guardrails documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) for more information.

### [Citations](#citations)

Amazon Bedrock supports citations for document-based inputs across compatible models. When enabled:

* Some models can read documents with visual understanding, not just extracting text
* Models can cite specific parts of documents you provide, making it easier to trace information back to its source (Not Supported Yet)

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4

import fs from 'fs';



5



6

const result = await generateObject({



7

model: bedrock('apac.anthropic.claude-sonnet-4-20250514-v1:0'),



8

schema: z.object({



9

summary: z.string().describe('Summary of the PDF document'),



10

keyPoints: z.array(z.string()).describe('Key points from the PDF'),



11

}),



12

messages: [



13

{



14

role: 'user',



15

content: [



16

{



17

type: 'text',



18

text: 'Summarize this PDF and provide key points.',



19

},



20

{



21

type: 'file',



22

data: readFileSync('./document.pdf'),



23

mediaType: 'application/pdf',



24

providerOptions: {



25

bedrock: {



26

citations: { enabled: true },



27

},



28

},



29

},



30

],



31

},



32

],



33

});



34



35

console.log('Response:', result.object);
```

### [Cache Points](#cache-points)

Amazon Bedrock prompt caching is currently in preview release. To request
access, visit the [Amazon Bedrock prompt caching
page](https://aws.amazon.com/bedrock/prompt-caching/).

In messages, you can use the `providerOptions` property to set cache points. Set the `bedrock` property in the `providerOptions` object to `{ cachePoint: { type: 'default' } }` to create a cache point.

Cache usage information is returned in the `providerMetadata` object`. See examples below.

Cache points have model-specific token minimums and limits. For example,
Claude 3.5 Sonnet v2 requires at least 1,024 tokens for a cache point and
allows up to 4 cache points. See the [Amazon Bedrock prompt caching
documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html)
for details on supported models, regions, and limits.

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateText } from 'ai';



3



4

const cyberpunkAnalysis =



5

'... literary analysis of cyberpunk themes and concepts ...';



6



7

const result = await generateText({



8

model: bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),



9

messages: [



10

{



11

role: 'system',



12

content: `You are an expert on William Gibson's cyberpunk literature and themes. You have access to the following academic analysis: ${cyberpunkAnalysis}`,



13

providerOptions: {



14

bedrock: { cachePoint: { type: 'default' } },



15

},



16

},



17

{



18

role: 'user',



19

content:



20

'What are the key cyberpunk themes that Gibson explores in Neuromancer?',



21

},



22

],



23

});



24



25

console.log(result.text);



26

console.log(result.providerMetadata?.bedrock?.usage);



27

// Shows cache read/write token usage, e.g.:



28

// {



29

//   cacheReadInputTokens: 1337,



30

//   cacheWriteInputTokens: 42,



31

// }
```

Cache points also work with streaming responses:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { streamText } from 'ai';



3



4

const cyberpunkAnalysis =



5

'... literary analysis of cyberpunk themes and concepts ...';



6



7

const result = streamText({



8

model: bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),



9

messages: [



10

{



11

role: 'assistant',



12

content: [



13

{ type: 'text', text: 'You are an expert on cyberpunk literature.' },



14

{ type: 'text', text: `Academic analysis: ${cyberpunkAnalysis}` },



15

],



16

providerOptions: { bedrock: { cachePoint: { type: 'default' } } },



17

},



18

{



19

role: 'user',



20

content:



21

'How does Gibson explore the relationship between humanity and technology?',



22

},



23

],



24

});



25



26

for await (const textPart of result.textStream) {



27

process.stdout.write(textPart);



28

}



29



30

console.log(



31

'Cache token usage:',



32

(await result.providerMetadata)?.bedrock?.usage,



33

);



34

// Shows cache read/write token usage, e.g.:



35

// {



36

//   cacheReadInputTokens: 1337,



37

//   cacheWriteInputTokens: 42,



38

// }
```

[Reasoning](#reasoning)
-----------------------

Amazon Bedrock supports model creator-specific reasoning features:

* Anthropic (e.g. `claude-3-7-sonnet-20250219`): enable via the `reasoningConfig` provider option and specifying a thinking budget in tokens (minimum: `1024`, maximum: `64000`).
* Amazon (e.g. `us.amazon.nova-2-lite-v1:0`): enable via the `reasoningConfig` provider option and specifying a maximum reasoning effort level (`'low' | 'medium' | 'high'`).

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateText } from 'ai';



3



4

// Anthropic example



5

const anthropicResult = await generateText({



6

model: bedrock('us.anthropclaude-3-7-sonnet-20250219-v1:0'),



7

prompt: 'How many people will live in the world in 2040?',



8

providerOptions: {



9

bedrock: {



10

reasoningConfig: { type: 'enabled', budgetTokens: 1024 },



11

},



12

},



13

});



14



15

console.log(anthropicResult.reasoningText); // reasoning text



16

console.log(anthropicResult.text); // text response



17



18

// Nova 2 example



19

const amazonResult = await generateText({



20

model: bedrock('us.amazon.nova-2-lite-v1:0'),



21

prompt: 'How many people will live in the world in 2040?',



22

providerOptions: {



23

bedrock: {



24

reasoningConfig: { type: 'enabled', maxReasoningEffort: 'medium' },



25

},



26

},



27

});



28



29

console.log(amazonResult.reasoningText); // reasoning text



30

console.log(amazonResult.text); // text response
```

See [AI SDK UI: Chatbot](/docs/ai-sdk-ui/chatbot#reasoning) for more details
on how to integrate reasoning into your chatbot.

[Extended Context Window](#extended-context-window)
---------------------------------------------------

Claude Sonnet 4 models on Amazon Bedrock support an extended context window of up to 1 million tokens when using the `context-1m-2025-08-07` beta feature.

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateText } from 'ai';



3



4

const result = await generateText({



5

model: bedrock('us.anthropic.claude-sonnet-4-20250514-v1:0'),



6

prompt: 'analyze this large document...',



7

providerOptions: {



8

bedrock: {



9

anthropicBeta: ['context-1m-2025-08-07'],



10

},



11

},



12

});
```

[Computer Use](#computer-use)
-----------------------------

Via Anthropic, Amazon Bedrock provides three provider-defined tools that can be used to interact with external systems:

1. **Bash Tool**: Allows running bash commands.
2. **Text Editor Tool**: Provides functionality for viewing and editing text files.
3. **Computer Tool**: Enables control of keyboard and mouse actions on a computer.

They are available via the `tools` property of the provider instance.

### [Bash Tool](#bash-tool)

The Bash Tool allows running bash commands. Here's how to create and use it:

```
1

const bashTool = anthropic.tools.bash_20241022({



2

execute: async ({ command, restart }) => {



3

// Implement your bash command execution logic here



4

// Return the result of the command execution



5

},



6

});
```

Parameters:

* `command` (string): The bash command to run. Required unless the tool is being restarted.
* `restart` (boolean, optional): Specifying true will restart this tool.

### [Text Editor Tool](#text-editor-tool)

The Text Editor Tool provides functionality for viewing and editing text files.

**For Claude 4 models (Opus & Sonnet):**

```
1

const textEditorTool = anthropic.tools.textEditor_20250429({



2

execute: async ({



3

command,



4

path,



5

file_text,



6

insert_line,



7

new_str,



8

old_str,



9

view_range,



10

}) => {



11

// Implement your text editing logic here



12

// Return the result of the text editing operation



13

},



14

});
```

**For Claude 3.5 Sonnet and earlier models:**

```
1

const textEditorTool = anthropic.tools.textEditor_20241022({



2

execute: async ({



3

command,



4

path,



5

file_text,



6

insert_line,



7

new_str,



8

old_str,



9

view_range,



10

}) => {



11

// Implement your text editing logic here



12

// Return the result of the text editing operation



13

},



14

});
```

Parameters:

* `command` ('view' | 'create' | 'str\_replace' | 'insert' | 'undo\_edit'): The command to run. Note: `undo_edit` is only available in Claude 3.5 Sonnet and earlier models.
* `path` (string): Absolute path to file or directory, e.g. `/repo/file.py` or `/repo`.
* `file_text` (string, optional): Required for `create` command, with the content of the file to be created.
* `insert_line` (number, optional): Required for `insert` command. The line number after which to insert the new string.
* `new_str` (string, optional): New string for `str_replace` or `insert` commands.
* `old_str` (string, optional): Required for `str_replace` command, containing the string to replace.
* `view_range` (number[], optional): Optional for `view` command to specify line range to show.

When using the Text Editor Tool, make sure to name the key in the tools object correctly:

* **Claude 4 models**: Use `str_replace_based_edit_tool`
* **Claude 3.5 Sonnet and earlier**: Use `str_replace_editor`

```
1

// For Claude 4 models



2

const response = await generateText({



3

model: bedrock('us.anthropic.claude-sonnet-4-20250514-v1:0'),



4

prompt:



5

"Create a new file called example.txt, write 'Hello World' to it, and run 'cat example.txt' in the terminal",



6

tools: {



7

str_replace_based_edit_tool: textEditorTool, // Claude 4 tool name



8

},



9

});



10



11

// For Claude 3.5 Sonnet and earlier



12

const response = await generateText({



13

model: bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),



14

prompt:



15

"Create a new file called example.txt, write 'Hello World' to it, and run 'cat example.txt' in the terminal",



16

tools: {



17

str_replace_editor: textEditorTool, // Earlier models tool name



18

},



19

});
```

### [Computer Tool](#computer-tool)

The Computer Tool enables control of keyboard and mouse actions on a computer:

```
1

const computerTool = anthropic.tools.computer_20241022({



2

displayWidthPx: 1920,



3

displayHeightPx: 1080,



4

displayNumber: 0, // Optional, for X11 environments



5



6

execute: async ({ action, coordinate, text }) => {



7

// Implement your computer control logic here



8

// Return the result of the action



9



10

// Example code:



11

switch (action) {



12

case 'screenshot': {



13

// multipart result:



14

return {



15

type: 'image',



16

data: fs



17

.readFileSync('./data/screenshot-editor.png')



18

.toString('base64'),



19

};



20

}



21

default: {



22

console.log('Action:', action);



23

console.log('Coordinate:', coordinate);



24

console.log('Text:', text);



25

return `executed ${action}`;



26

}



27

}



28

},



29



30

// map to tool result content for LLM consumption:



31

toModelOutput({ output }) {



32

return typeof output === 'string'



33

? [{ type: 'text', text: output }]



34

: [{ type: 'image', data: output.data, mediaType: 'image/png' }];



35

},



36

});
```

Parameters:

* `action` ('key' | 'type' | 'mouse\_move' | 'left\_click' | 'left\_click\_drag' | 'right\_click' | 'middle\_click' | 'double\_click' | 'screenshot' | 'cursor\_position'): The action to perform.
* `coordinate` (number[], optional): Required for `mouse_move` and `left_click_drag` actions. Specifies the (x, y) coordinates.
* `text` (string, optional): Required for `type` and `key` actions.

These tools can be used in conjunction with the `anthropic.claude-3-5-sonnet-20240620-v1:0` model to enable more complex interactions and tasks.

### [Model Capabilities](#model-capabilities)

| Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- |
| `amazon.titan-tg1-large` |  |  |  |  |
| `amazon.titan-text-express-v1` |  |  |  |  |
| `amazon.titan-text-lite-v1` |  |  |  |  |
| `us.amazon.nova-premier-v1:0` |  |  |  |  |
| `us.amazon.nova-pro-v1:0` |  |  |  |  |
| `us.amazon.nova-lite-v1:0` |  |  |  |  |
| `us.amazon.nova-micro-v1:0` |  |  |  |  |
| `anthropic.claude-haiku-4-5-20251001-v1:0` |  |  |  |  |
| `anthropic.claude-sonnet-4-20250514-v1:0` |  |  |  |  |
| `anthropic.claude-sonnet-4-5-20250929-v1:0` |  |  |  |  |
| `anthropic.claude-opus-4-20250514-v1:0` |  |  |  |  |
| `anthropic.claude-opus-4-1-20250805-v1:0` |  |  |  |  |
| `anthropic.claude-3-7-sonnet-20250219-v1:0` |  |  |  |  |
| `anthropic.claude-3-5-sonnet-20241022-v2:0` |  |  |  |  |
| `anthropic.claude-3-5-sonnet-20240620-v1:0` |  |  |  |  |
| `anthropic.claude-3-5-haiku-20241022-v1:0` |  |  |  |  |
| `anthropic.claude-3-opus-20240229-v1:0` |  |  |  |  |
| `anthropic.claude-3-sonnet-20240229-v1:0` |  |  |  |  |
| `anthropic.claude-3-haiku-20240307-v1:0` |  |  |  |  |
| `us.anthropic.claude-sonnet-4-20250514-v1:0` |  |  |  |  |
| `us.anthropic.claude-sonnet-4-5-20250929-v1:0` |  |  |  |  |
| `us.anthropic.claude-opus-4-20250514-v1:0` |  |  |  |  |
| `us.anthropic.claude-opus-4-1-20250805-v1:0` |  |  |  |  |
| `us.anthropic.claude-3-7-sonnet-20250219-v1:0` |  |  |  |  |
| `us.anthropic.claude-3-5-sonnet-20241022-v2:0` |  |  |  |  |
| `us.anthropic.claude-3-5-sonnet-20240620-v1:0` |  |  |  |  |
| `us.anthropic.claude-3-5-haiku-20241022-v1:0` |  |  |  |  |
| `us.anthropic.claude-3-sonnet-20240229-v1:0` |  |  |  |  |
| `us.anthropic.claude-3-opus-20240229-v1:0` |  |  |  |  |
| `us.anthropic.claude-3-haiku-20240307-v1:0` |  |  |  |  |
| `anthropic.claude-v2` |  |  |  |  |
| `anthropic.claude-v2:1` |  |  |  |  |
| `anthropic.claude-instant-v1` |  |  |  |  |
| `cohere.command-text-v14` |  |  |  |  |
| `cohere.command-light-text-v14` |  |  |  |  |
| `cohere.command-r-v1:0` |  |  |  |  |
| `cohere.command-r-plus-v1:0` |  |  |  |  |
| `us.deepseek.r1-v1:0` |  |  |  |  |
| `meta.llama3-8b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-70b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-1-8b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-1-70b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-1-405b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-2-1b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-2-3b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-2-11b-instruct-v1:0` |  |  |  |  |
| `meta.llama3-2-90b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-2-1b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-2-3b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-2-11b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-2-90b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-1-8b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-1-70b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama3-3-70b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama4-scout-17b-instruct-v1:0` |  |  |  |  |
| `us.meta.llama4-maverick-17b-instruct-v1:0` |  |  |  |  |
| `mistral.mistral-7b-instruct-v0:2` |  |  |  |  |
| `mistral.mixtral-8x7b-instruct-v0:1` |  |  |  |  |
| `mistral.mistral-large-2402-v1:0` |  |  |  |  |
| `mistral.mistral-small-2402-v1:0` |  |  |  |  |
| `us.mistral.pixtral-large-2502-v1:0` |  |  |  |  |
| `openai.gpt-oss-120b-1:0` |  |  |  |  |
| `openai.gpt-oss-20b-1:0` |  |  |  |  |

The table above lists popular models. Please see the [Amazon Bedrock
docs](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-supported-models-features.html)
for a full list of available models. You can also pass any available provider
model ID as a string if needed.

[Embedding Models](#embedding-models)
-------------------------------------

You can create models that call the Bedrock API [Bedrock API](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html)
using the `.embedding()` factory method.

```
1

const model = bedrock.embedding('amazon.titan-embed-text-v1');
```

Bedrock Titan embedding model amazon.titan-embed-text-v2:0 supports several additional settings.
You can pass them as an options argument:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { embed } from 'ai';



3



4

const model = bedrock.embedding('amazon.titan-embed-text-v2:0');



5



6

const { embedding } = await embed({



7

model,



8

value: 'sunny day at the beach',



9

providerOptions: {



10

bedrock: {



11

dimensions: 512, // optional, number of dimensions for the embedding



12

normalize: true, // optional, normalize the output embeddings



13

},



14

},



15

});
```

The following optional provider options are available for Bedrock Titan embedding models:

* **dimensions**: *number*

  The number of dimensions the output embeddings should have. The following values are accepted: 1024 (default), 512, 256.
* **normalize** *boolean*

  Flag indicating whether or not to normalize the output embeddings. Defaults to true.

### [Model Capabilities](#model-capabilities-1)

| Model | Default Dimensions | Custom Dimensions |
| --- | --- | --- |
| `amazon.titan-embed-text-v1` | 1536 |  |
| `amazon.titan-embed-text-v2:0` | 1024 |  |
| `cohere.embed-english-v3` | 1024 |  |
| `cohere.embed-multilingual-v3` | 1024 |  |

[Reranking Models](#reranking-models)
-------------------------------------

You can create models that call the [Bedrock Rerank API](https://docs.aws.amazon.com/bedrock/latest/userguide/rerank-api.html)
using the `.reranking()` factory method.

```
1

const model = bedrock.reranking('cohere.rerank-v3-5:0');
```

You can use Amazon Bedrock reranking models to rerank documents with the `rerank` function:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



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

model: bedrock.reranking('cohere.rerank-v3-5:0'),



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

Amazon Bedrock reranking models support additional provider options that can be passed via `providerOptions.bedrock`:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { rerank } from 'ai';



3



4

const { ranking } = await rerank({



5

model: bedrock.reranking('cohere.rerank-v3-5:0'),



6

documents: ['sunny day at the beach', 'rainy afternoon in the city'],



7

query: 'talk about rain',



8

providerOptions: {



9

bedrock: {



10

nextToken: 'pagination_token_here',



11

},



12

},



13

});
```

The following provider options are available:

* **nextToken** *string*

  Token for pagination of results.
* **additionalModelRequestFields** *Record<string, unknown>*

  Additional model-specific request fields.

### [Model Capabilities](#model-capabilities-2)

| Model |
| --- |
| `amazon.rerank-v1:0` |
| `cohere.rerank-v3-5:0` |

[Image Models](#image-models)
-----------------------------

You can create models that call the Bedrock API [Bedrock API](https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html)
using the `.image()` factory method.

For more on the Amazon Nova Canvas image model, see the [Nova Canvas
Overview](https://docs.aws.amazon.com/ai/responsible-ai/nova-canvas/overview.html).

The `amazon.nova-canvas-v1:0` model is available in the `us-east-1`,
`eu-west-1`, and `ap-northeast-1` regions.

```
1

const model = bedrock.image('amazon.nova-canvas-v1:0');
```

You can then generate images with the `generateImage` function:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: bedrock.image('amazon.nova-canvas-v1:0'),



6

prompt: 'A beautiful sunset over a calm ocean',



7

size: '512x512',



8

seed: 42,



9

});
```

You can also pass the `providerOptions` object to the `generateImage` function to customize the generation behavior:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateImage } from 'ai';



3



4

const { image } = await generateImage({



5

model: bedrock.image('amazon.nova-canvas-v1:0'),



6

prompt: 'A beautiful sunset over a calm ocean',



7

size: '512x512',



8

seed: 42,



9

providerOptions: {



10

bedrock: {



11

quality: 'premium',



12

negativeText: 'blurry, low quality',



13

cfgScale: 7.5,



14

style: 'PHOTOREALISM',



15

},



16

},



17

});
```

The following optional provider options are available for Amazon Nova Canvas:

* **quality** *string*

  The quality level for image generation. Accepts `'standard'` or `'premium'`.
* **negativeText** *string*

  Text describing what you don't want in the generated image.
* **cfgScale** *number*

  Controls how closely the generated image adheres to the prompt. Higher values result in images that are more closely aligned to the prompt.
* **style** *string*

  Predefined visual style for image generation.
  Accepts one of:
  `3D_ANIMATED_FAMILY_FILM` · `DESIGN_SKETCH` · `FLAT_VECTOR_ILLUSTRATION` ·
  `GRAPHIC_NOVEL_ILLUSTRATION` · `MAXIMALISM` · `MIDCENTURY_RETRO` ·
  `PHOTOREALISM` · `SOFT_DIGITAL_PAINTING`.

Documentation for additional settings can be found within the [Amazon Bedrock
User Guide for Amazon Nova
Documentation](https://docs.aws.amazon.com/nova/latest/userguide/image-gen-req-resp-structure.html).

### [Image Editing](#image-editing)

Amazon Nova Canvas supports several image editing task types. When you provide input images via `prompt.images`, the model automatically detects the appropriate editing mode, or you can explicitly specify the `taskType` in provider options.

#### [Image Variation](#image-variation)

Create variations of an existing image while maintaining its core characteristics:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: bedrock.image('amazon.nova-canvas-v1:0'),



5

prompt: {



6

text: 'Modernize the style, photo-realistic, 8k, hdr',



7

images: [imageBuffer],



8

},



9

providerOptions: {



10

bedrock: {



11

taskType: 'IMAGE_VARIATION',



12

similarityStrength: 0.7, // 0-1, higher = closer to original



13

negativeText: 'bad quality, low resolution',



14

},



15

},



16

});
```

* **similarityStrength** *number*

  Controls how similar the output is to the input image. Values range from 0 to 1, where higher values produce results closer to the original.

#### [Inpainting](#inpainting)

Edit specific parts of an image. You can define the area to modify using either a mask image or a text prompt:

**Using a mask prompt (text-based selection):**

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: bedrock.image('amazon.nova-canvas-v1:0'),



5

prompt: {



6

text: 'a cute corgi dog in the same style',



7

images: [imageBuffer],



8

},



9

providerOptions: {



10

bedrock: {



11

maskPrompt: 'cat', // Describe what to replace



12

},



13

},



14

seed: 42,



15

});
```

**Using a mask image:**

```
1

const image = readFileSync('./input-image.png');



2

const mask = readFileSync('./mask.png'); // White pixels = area to change



3



4

const { images } = await generateImage({



5

model: bedrock.image('amazon.nova-canvas-v1:0'),



6

prompt: {



7

text: 'A sunlit indoor lounge area with a pool containing a flamingo',



8

images: [image],



9

mask: mask,



10

},



11

});
```

* **maskPrompt** *string*

  A text description of the area to modify. The model will automatically identify and mask the described region.

#### [Outpainting](#outpainting)

Extend an image beyond its original boundaries:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: bedrock.image('amazon.nova-canvas-v1:0'),



5

prompt: {



6

text: 'A beautiful sunset landscape with mountains',



7

images: [imageBuffer],



8

},



9

providerOptions: {



10

bedrock: {



11

taskType: 'OUTPAINTING',



12

maskPrompt: 'background',



13

outPaintingMode: 'DEFAULT', // or 'PRECISE'



14

},



15

},



16

});
```

* **outPaintingMode** *string*

  Controls how the outpainting is performed. Accepts `'DEFAULT'` or `'PRECISE'`.

#### [Background Removal](#background-removal)

Remove the background from an image:

```
1

const imageBuffer = readFileSync('./input-image.png');



2



3

const { images } = await generateImage({



4

model: bedrock.image('amazon.nova-canvas-v1:0'),



5

prompt: {



6

images: [imageBuffer],



7

},



8

providerOptions: {



9

bedrock: {



10

taskType: 'BACKGROUND_REMOVAL',



11

},



12

},



13

});
```

Background removal does not require a text prompt - only the input image is
needed.

#### [Image Editing Provider Options](#image-editing-provider-options)

The following additional provider options are available for image editing:

* **taskType** *string*

  Explicitly set the editing task type. Accepts `'TEXT_IMAGE'` (default for text-only), `'IMAGE_VARIATION'`, `'INPAINTING'`, `'OUTPAINTING'`, or `'BACKGROUND_REMOVAL'`. When images are provided without an explicit taskType, the model defaults to `'IMAGE_VARIATION'` (or `'INPAINTING'` if a mask is provided).
* **maskPrompt** *string*

  Text description of the area to modify (for inpainting/outpainting). Alternative to providing a mask image.
* **similarityStrength** *number*

  For `IMAGE_VARIATION`: Controls similarity to the original (0-1).
* **outPaintingMode** *string*

  For `OUTPAINTING`: Controls the outpainting behavior (`'DEFAULT'` or `'PRECISE'`).

### [Image Model Settings](#image-model-settings)

You can customize the generation behavior with optional options:

```
1

await generateImage({



2

model: bedrock.image('amazon.nova-canvas-v1:0'),



3

prompt: 'A beautiful sunset over a calm ocean',



4

size: '512x512',



5

seed: 42,



6

maxImagesPerCall: 1, // Maximum number of images to generate per API call



7

});
```

* **maxImagesPerCall** *number*

  Override the maximum number of images generated per API call. Default can vary
  by model, with 5 as a common default.

### [Model Capabilities](#model-capabilities-3)

The Amazon Nova Canvas model supports custom sizes with constraints as follows:

* Each side must be between 320-4096 pixels, inclusive.
* Each side must be evenly divisible by 16.
* The aspect ratio must be between 1:4 and 4:1. That is, one side can't be more than 4 times longer than the other side.
* The total pixel count must be less than 4,194,304.

For more, see [Image generation access and
usage](https://docs.aws.amazon.com/nova/latest/userguide/image-gen-access.html).

| Model | Sizes |
| --- | --- |
| `amazon.nova-canvas-v1:0` | Custom sizes: 320-4096px per side (must be divisible by 16), aspect ratio 1:4 to 4:1, max 4.2M pixels |

[Response Headers](#response-headers)
-------------------------------------

The Amazon Bedrock provider will return the response headers associated with
network requests made of the Bedrock servers.

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { generateText } from 'ai';



3



4

const { text } = await generateText({



5

model: bedrock('meta.llama3-70b-instruct-v1:0'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});



8



9

console.log(result.response.headers);
```

Below is sample output where you can see the `x-amzn-requestid` header. This can
be useful for correlating Bedrock API calls with requests made by the AI SDK:

```
1

{



2

connection: 'keep-alive',



3

'content-length': '2399',



4

'content-type': 'application/json',



5

date: 'Fri, 07 Feb 2025 04:28:30 GMT',



6

'x-amzn-requestid': 'c9f3ace4-dd5d-49e5-9807-39aedfa47c8e'



7

}
```

This information is also available with `streamText`:

```
1

import { bedrock } from '@ai-sdk/amazon-bedrock';



2

import { streamText } from 'ai';



3



4

const result = streamText({



5

model: bedrock('meta.llama3-70b-instruct-v1:0'),



6

prompt: 'Write a vegetarian lasagna recipe for 4 people.',



7

});



8

for await (const textPart of result.textStream) {



9

process.stdout.write(textPart);



10

}



11

console.log('Response headers:', (await result.response).headers);
```

With sample output as:

```
1

{



2

connection: 'keep-alive',



3

'content-type': 'application/vnd.amazon.eventstream',



4

date: 'Fri, 07 Feb 2025 04:33:37 GMT',



5

'transfer-encoding': 'chunked',



6

'x-amzn-requestid': 'a976e3fc-0e45-4241-9954-b9bdd80ab407'



7

}
```

[Migrating to `@ai-sdk/amazon-bedrock` 2.x](#migrating-to-ai-sdkamazon-bedrock-2x)
----------------------------------------------------------------------------------

The Amazon Bedrock provider was rewritten in version 2.x to remove the
dependency on the `@aws-sdk/client-bedrock-runtime` package.

The `bedrockOptions` provider setting previously available has been removed. If
you were using the `bedrockOptions` object, you should now use the `region`,
`accessKeyId`, `secretAccessKey`, and `sessionToken` settings directly instead.

Note that you may need to set all of these explicitly, e.g. even if you're not
using `sessionToken`, set it to `undefined`. If you're running in a serverless
environment, there may be default environment variables set by your containing
environment that the Amazon Bedrock provider will then pick up and could
conflict with the ones you're intending to use.