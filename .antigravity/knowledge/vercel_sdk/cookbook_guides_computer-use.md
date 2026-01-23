# https://sdk.vercel.ai/cookbook/guides/computer-use

Copy markdown

[Get started with Computer Use](#get-started-with-computer-use)
===============================================================

With the [release of Computer Use in Claude 3.5 Sonnet](https://www.anthropic.com/news/3-5-models-and-computer-use), you can now direct AI models to interact with computers like humans do - moving cursors, clicking buttons, and typing text. This capability enables automation of complex tasks while leveraging Claude's advanced reasoning abilities.

The AI SDK is a powerful TypeScript toolkit for building AI applications with large language models (LLMs) like Anthropic's Claude alongside popular frameworks like React, Next.js, Vue, Svelte, Node.js, and more. In this guide, you will learn how to integrate Computer Use into your AI SDK applications.

Computer Use is currently in beta with some  [limitations](https://docs.anthropic.com/en/docs/build-with-claude/computer-use#understand-computer-use-limitations).
The feature may be error-prone at times. Anthropic recommends starting with
low-risk tasks and implementing appropriate safety measures.

[Computer Use](#computer-use)
-----------------------------

Anthropic recently released a new version of the Claude 3.5 Sonnet model which is capable of 'Computer Use'. This allows the model to interact with computer interfaces through basic actions like:

* Moving the cursor
* Clicking buttons
* Typing text
* Taking screenshots
* Reading screen content

[How It Works](#how-it-works)
-----------------------------

Computer Use enables the model to read and interact with on-screen content through a series of coordinated steps. Here's how the process works:

1. **Start with a prompt and tools**

   Add Anthropic-defined Computer Use tools to your request and provide a task (prompt) for the model. For example: "save an image to your downloads folder."
2. **Select the right tool**

   The model evaluates which computer tools can help accomplish the task. It then sends a formatted `tool_call` to use the appropriate tool.
3. **Execute the action and return results**

   The AI SDK processes Claude's request by running the selected tool. The results can then be sent back to Claude through a `tool_result` message.
4. **Complete the task through iterations**

   Claude analyzes each result to determine if more actions are needed. It continues requesting tool use and processing results until it completes your task or requires additional input.

### [Available Tools](#available-tools)

There are three main tools available in the Computer Use API:

1. **Computer Tool**: Enables basic computer control like mouse movement, clicking, and keyboard input
2. **Text Editor Tool**: Provides functionality for viewing and editing text files
3. **Bash Tool**: Allows execution of bash commands

### [Implementation Considerations](#implementation-considerations)

Computer Use tools in the AI SDK are predefined interfaces that require your own implementation of the execution layer. While the SDK provides the type definitions and structure for these tools, you need to:

1. Set up a controlled environment for Computer Use execution
2. Implement core functionality like mouse control and keyboard input
3. Handle screenshot capture and processing
4. Set up rules and limits for how Claude can interact with your system

The recommended approach is to start with  [Anthropic's reference implementation](https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo) , which provides:

* A containerized environment configured for safe Computer Use
* Ready-to-use (Python) implementations of Computer Use tools
* An agent loop for API interaction and tool execution
* A web interface for monitoring and control

This reference implementation serves as a foundation to understand the requirements before building your own custom solution.

[Getting Started with the AI SDK](#getting-started-with-the-ai-sdk)
-------------------------------------------------------------------

If you have never used the AI SDK before, start by following the [Getting
Started guide](/docs/getting-started).

For a working example of Computer Use implementation with Next.js and the AI
SDK, check out our [AI SDK Computer Use
Template](https://github.com/vercel-labs/ai-sdk-computer-use).

First, ensure you have the AI SDK and [Anthropic AI SDK provider](/providers/ai-sdk-providers/anthropic) installed:

```
pnpm add ai @ai-sdk/anthropic
```

You can add Computer Use to your AI SDK applications using provider-defined-client tools. These tools accept various input parameters (like display height and width in the case of the computer tool) and then require that you define an execute function.

Here's how you could set up the Computer Tool with the AI SDK:

```
1

import { anthropic } from '@ai-sdk/anthropic';



2

import { getScreenshot, executeComputerAction } from '@/utils/computer-use';



3



4

const computerTool = anthropic.tools.computer_20250124({



5

displayWidthPx: 1920,



6

displayHeightPx: 1080,



7

execute: async ({ action, coordinate, text }) => {



8

switch (action) {



9

case 'screenshot': {



10

return {



11

type: 'image',



12

data: getScreenshot(),



13

};



14

}



15

default: {



16

return executeComputerAction(action, coordinate, text);



17

}



18

}



19

},



20

toModelOutput({ output }) {



21

return typeof output === 'string'



22

? [{ type: 'text', text: output }]



23

: [{ type: 'image', data: output.data, mediaType: 'image/png' }];



24

},



25

});
```

The `computerTool` handles two main actions: taking screenshots via `getScreenshot()` and executing computer actions like mouse movements and clicks through `executeComputerAction()`. Remember, you have to implement this execution logic (eg. the `getScreenshot` and `executeComputerAction` functions) to handle the actual computer interactions. The `execute` function should handle all low-level interactions with the operating system.

Finally, to send tool results back to the model, use the [`toModelOutput()`](/docs/foundations/prompts#multi-modal-tool-results) function to convert text and image responses into a format the model can process. The AI SDK includes experimental support for these multi-modal tool results when using Anthropic's models.

Computer Use requires appropriate safety measures like using virtual machines,
limiting access to sensitive data, and implementing human oversight for
critical actions.

### [Using Computer Tools with Text Generation](#using-computer-tools-with-text-generation)

Once your tool is defined, you can use it with both the [`generateText`](/docs/reference/ai-sdk-core/generate-text) and [`streamText`](/docs/reference/ai-sdk-core/stream-text) functions.

For one-shot text generation, use `generateText`:

```
1

const result = await generateText({



2

model: 'anthropic/claude-sonnet-4-20250514',



3

prompt: 'Move the cursor to the center of the screen and take a screenshot',



4

tools: { computer: computerTool },



5

});



6



7

console.log(result.text);
```

For streaming responses, use `streamText` to receive updates in real-time:

```
1

const result = streamText({



2

model: 'anthropic/claude-sonnet-4-20250514',



3

prompt: 'Open the browser and navigate to vercel.com',



4

tools: { computer: computerTool },



5

});



6



7

for await (const chunk of result.textStream) {



8

console.log(chunk);



9

}
```

### [Configure Multi-Step (Agentic) Generations](#configure-multi-step-agentic-generations)

To allow the model to perform multiple steps without user intervention, use the `stopWhen` parameter. This will automatically send any tool results back to the model to trigger a subsequent generation:

```
1

import { stepCountIs } from 'ai';



2



3

const stream = streamText({



4

model: 'anthropic/claude-sonnet-4-20250514',



5

prompt: 'Open the browser and navigate to vercel.com',



6

tools: { computer: computerTool },



7

stopWhen: stepCountIs(10), // experiment with this value based on your use case



8

});
```

### [Combine Multiple Tools](#combine-multiple-tools)

You can combine multiple tools in a single request to enable more complex workflows. The AI SDK supports all three of Claude's Computer Use tools:

```
1

const computerTool = anthropic.tools.computer_20250124({



2

...



3

});



4



5

const bashTool = anthropic.tools.bash_20250124({



6

execute: async ({ command, restart }) => execSync(command).toString()



7

});



8



9

const textEditorTool = anthropic.tools.textEditor_20250124({



10

execute: async ({



11

command,



12

path,



13

file_text,



14

insert_line,



15

new_str,



16

old_str,



17

view_range



18

}) => {



19

// Handle file operations based on command



20

switch(command) {



21

return executeTextEditorFunction({



22

command,



23

path,



24

fileText: file_text,



25

insertLine: insert_line,



26

newStr: new_str,



27

oldStr: old_str,



28

viewRange: view_range



29

});



30

}



31

}



32

});



33



34



35

const response = await generateText({



36

model: 'anthropic/claude-sonnet-4-20250514',



37

prompt: "Create a new file called example.txt, write 'Hello World' to it, and run 'cat example.txt' in the terminal",



38

tools: {



39

computer: computerTool,



40

bash: bashTool,



41

str_replace_editor: textEditorTool,



42

},



43

});
```

Always implement appropriate [security measures](#security-measures) and
obtain user consent before enabling Computer Use in production applications.

### [Best Practices for Computer Use](#best-practices-for-computer-use)

To get the best results when using Computer Use:

1. Specify simple, well-defined tasks with explicit instructions for each step
2. Prompt Claude to verify outcomes through screenshots
3. Use keyboard shortcuts when UI elements are difficult to manipulate
4. Include example screenshots for repeatable tasks
5. Provide explicit tips in system prompts for known tasks

[Security Measures](#security-measures)
---------------------------------------

Remember, Computer Use is a beta feature. Please be aware that it poses unique risks that are distinct from standard API features or chat interfaces. These risks are heightened when using Computer Use to interact with the internet. To minimize risks, consider taking precautions such as:

1. Use a dedicated virtual machine or container with minimal privileges to prevent direct system attacks or accidents.
2. Avoid giving the model access to sensitive data, such as account login information, to prevent information theft.
3. Limit internet access to an allowlist of domains to reduce exposure to malicious content.
4. Ask a human to confirm decisions that may result in meaningful real-world consequences as well as any tasks requiring affirmative consent, such as accepting cookies, executing financial transactions, or agreeing to terms of service.