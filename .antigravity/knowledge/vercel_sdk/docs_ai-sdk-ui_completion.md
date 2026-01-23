# https://sdk.vercel.ai/docs/ai-sdk-ui/completion

Copy markdown

[Completion](#completion)
=========================

The `useCompletion` hook allows you to create a user interface to handle text completions in your application. It enables the streaming of text completions from your AI provider, manages the state for chat input, and updates the UI automatically as new messages are received.

The `useCompletion` hook is now part of the `@ai-sdk/react` package.

In this guide, you will learn how to use the `useCompletion` hook in your application to generate text completions and stream them in real-time to your users.

[Example](#example)
-------------------

app/page.tsx

```
1

'use client';



2



3

import { useCompletion } from '@ai-sdk/react';



4



5

export default function Page() {



6

const { completion, input, handleInputChange, handleSubmit } = useCompletion({



7

api: '/api/completion',



8

});



9



10

return (



11

<form onSubmit={handleSubmit}>



12

<input



13

name="prompt"



14

value={input}



15

onChange={handleInputChange}



16

id="input"



17

/>



18

<button type="submit">Submit</button>



19

<div>{completion}</div>



20

</form>



21

);



22

}
```

GatewayProviderCustom

Claude Sonnet 4.5

app/api/completion/route.ts

```
1

import { streamText } from 'ai';



2



3

// Allow streaming responses up to 30 seconds



4

export const maxDuration = 30;



5



6

export async function POST(req: Request) {



7

const { prompt }: { prompt: string } = await req.json();



8



9

const result = streamText({



10

model: "anthropic/claude-sonnet-4.5",



11

prompt,



12

});



13



14

return result.toUIMessageStreamResponse();



15

}
```

In the `Page` component, the `useCompletion` hook will request to your AI provider endpoint whenever the user submits a message. The completion is then streamed back in real-time and displayed in the UI.

This enables a seamless text completion experience where the user can see the AI response as soon as it is available, without having to wait for the entire response to be received.

[Customized UI](#customized-ui)
-------------------------------

`useCompletion` also provides ways to manage the prompt via code, show loading and error states, and update messages without being triggered by user interactions.

### [Loading and error states](#loading-and-error-states)

To show a loading spinner while the chatbot is processing the user's message, you can use the `isLoading` state returned by the `useCompletion` hook:

```
1

const { isLoading, ... } = useCompletion()



2



3

return(



4

<>



5

{isLoading ? <Spinner /> : null}



6

</>



7

)
```

Similarly, the `error` state reflects the error object thrown during the fetch request. It can be used to display an error message, or show a toast notification:

```
1

const { error, ... } = useCompletion()



2



3

useEffect(() => {



4

if (error) {



5

toast.error(error.message)



6

}



7

}, [error])



8



9

// Or display the error message in the UI:



10

return (



11

<>



12

{error ? <div>{error.message}</div> : null}



13

</>



14

)
```

### [Controlled input](#controlled-input)

In the initial example, we have `handleSubmit` and `handleInputChange` callbacks that manage the input changes and form submissions. These are handy for common use cases, but you can also use uncontrolled APIs for more advanced scenarios such as form validation or customized components.

The following example demonstrates how to use more granular APIs like `setInput` with your custom input and submit button components:

```
1

const { input, setInput } = useCompletion();



2



3

return (



4

<>



5

<MyCustomInput value={input} onChange={value => setInput(value)} />



6

</>



7

);
```

### [Cancelation](#cancelation)

It's also a common use case to abort the response message while it's still streaming back from the AI provider. You can do this by calling the `stop` function returned by the `useCompletion` hook.

```
1

const { stop, isLoading, ... } = useCompletion()



2



3

return (



4

<>



5

<button onClick={stop} disabled={!isLoading}>Stop</button>



6

</>



7

)
```

When the user clicks the "Stop" button, the fetch request will be aborted. This avoids consuming unnecessary resources and improves the UX of your application.

### [Throttling UI Updates](#throttling-ui-updates)

This feature is currently only available for React.

By default, the `useCompletion` hook will trigger a render every time a new chunk is received.
You can throttle the UI updates with the `experimental_throttle` option.

page.tsx

```
1

const { completion, ... } = useCompletion({



2

// Throttle the completion and data updates to 50ms:



3

experimental_throttle: 50



4

})
```

[Event Callbacks](#event-callbacks)
-----------------------------------

`useCompletion` also provides optional event callbacks that you can use to handle different stages of the chatbot lifecycle. These callbacks can be used to trigger additional actions, such as logging, analytics, or custom UI updates.

```
1

const { ... } = useCompletion({



2

onResponse: (response: Response) => {



3

console.log('Received response from server:', response)



4

},



5

onFinish: (prompt: string, completion: string) => {



6

console.log('Finished streaming completion:', completion)



7

},



8

onError: (error: Error) => {



9

console.error('An error occurred:', error)



10

},



11

})
```

It's worth noting that you can abort the processing by throwing an error in the `onResponse` callback. This will trigger the `onError` callback and stop the message from being appended to the chat UI. This can be useful for handling unexpected responses from the AI provider.

[Configure Request Options](#configure-request-options)
-------------------------------------------------------

By default, the `useCompletion` hook sends a HTTP POST request to the `/api/completion` endpoint with the prompt as part of the request body. You can customize the request by passing additional options to the `useCompletion` hook:

```
1

const { messages, input, handleInputChange, handleSubmit } = useCompletion({



2

api: '/api/custom-completion',



3

headers: {



4

Authorization: 'your_token',



5

},



6

body: {



7

user_id: '123',



8

},



9

credentials: 'same-origin',



10

});
```

In this example, the `useCompletion` hook sends a POST request to the `/api/completion` endpoint with the specified headers, additional body fields, and credentials for that fetch request. On your server side, you can handle the request with these additional information.