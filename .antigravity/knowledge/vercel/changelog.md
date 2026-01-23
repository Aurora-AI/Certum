# https://vercel.com/changelog

[Follow us on

X

to hear about the changes first.](https://x.com/vercel_dev)

* Jan 20, 2026

  [Introducing the Montréal, Canada region (yul1)](/changelog/introducing-the-montreal-canada-vercel-region-yul1)
  ---------------------------------------------------------------------------------------------------------------

  [![vercel-yul1-dark](/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6GeMneCLe05Z0HGEXNWquQ%2Fb1916334a9e4017cdb5cee03e593ef42%2Fvercel-yul1-light.png&w=3840&q=75)![vercel-yul1-dark](/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3pyhryKuc0d7pl7LZZm9Gq%2F86e989b12b8b8a1a7e58c3c63001572d%2Fvercel-yul1-dark.png&w=3840&q=75)](/changelog/introducing-the-montreal-canada-vercel-region-yul1)

  Montréal, Canada (`yul1`) is now part of Vercel’s global delivery network, expanding our footprint to deliver lower latency and improved performance for users in Central Canada.

  The new Montréal region extends our globally distributed CDN’s caching and compute closer to end users, reducing latency without any changes required from developers. Montréal is generally available and handling production traffic.

  Teams can configure Montréal as an execution region for Vercel Functions, powered by [Fluid compute](https://vercel.com/fluid) to enhance resource efficiency, minimize cold starts, and scale automatically with demand.

  Learn more about [Vercel Regions](https://vercel.com/docs/regions) and [Montréal regional pricing](https://vercel.com/docs/pricing/regional-pricing/yul1)

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5DBtWRUL43U0ZRSPnTV6tA/d227803146efedbc45e7df679ea52a83/avatar__2_.png)

  [Matheus Fernandes](https://x.com/matheusfrndes)
* Jan 20, 2026

  [Introducing `skills`, the open agent skills ecosystem](/changelog/introducing-skills-the-open-agent-skills-ecosystem)
  ----------------------------------------------------------------------------------------------------------------------

  We released [`skills`](https://skills.sh), a CLI for installing and managing skill packages for agents.

  Install a skill package with `npx skills add <package>`.

  So far, `skills` has been used to install skills on: amp, antigravity, claude-code, clawdbot, codex, cursor, droid, gemini, gemini-cli, github-copilot, goose, kilo, kiro-cli, opencode, roo, trae, and windsurf.

  Today we’re also introducing [skills.sh](https://skills.sh), a directory and leaderboard for skill packages.

  Use it to:

  + discover new skills to enhance your agents
  + browse skills by category and popularity
  + track usage stats and installs across the ecosystem

  Get started with [`npx skills add vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) and explore [skills.sh](https://skills.sh).

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6qvpRjZDpvV0JLU8mXx2v4/53962a54ad214cde165e18813940354e/806FE12B-9B25-4A8F-AB72-0853E48B1734_1_105_c_2__1_.jpg)

  [Andrew Qu](https://x.com/andrewqu)
* Jan 20, 2026

  [Cron jobs now support 100 per project on every plan](/changelog/cron-jobs-now-support-100-per-project-on-every-plan)
  ---------------------------------------------------------------------------------------------------------------------

  Cron jobs on Vercel no longer have per-team limits, and per-project limits were lifted to 100 on all plans.

  Previously, all plans had a cap of 20 cron jobs per project, with per-team limits of 2 for Hobby, 40 for Pro, and 100 for Enterprise.

  To get started, add cron entries to `vercel.json`:

  vercel.json

  ```
  1

  {



  2

  "crons": [



  3

  {



  4

  "path": "/api/send-slack-notification",



  5

  "schedule": "*/10 * * * *"



  6

  },



  7

  {



  8

  "path": "/api/daily-backup",



  9

  "schedule": "0 2 * * * *"



  10

  },



  11

  {



  12

  "path": "/api/hourly-onboarding-emails",



  13

  "schedule": "0 * * * *"



  14

  }



  15

  ]



  16

  }
  ```

  An example of different Vercel Cron Jobs

  You can also deploy the [Vercel Cron Job template](https://vercel.com/templates/template/vercel-cron).

  Once you deploy, Vercel automatically registers your cron jobs. Learn more in the [Cron Jobs documentation](https://vercel.com/docs/cron-jobs).

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1Kv3c2kwz5y5UisNZTJWUh/278fbdf066ed4652c7c8e532aca3b6fa/T0CAQ00TU-UFA5AC4SC-409fa4f0010d-512.jpg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4iicDbTA4KX4io2f2PPx7q/b11dbc333322bc5a0087056d162cb5cf/malte.ubl.jpg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/30rm0Ep6fMWunt4y1YZaYh/77c64ad72f2b9f228c00bc5142011024/aaa001.jpeg)

  [Andy Schneider](https://x.com/andybitz_)[, Malte Ubl](https://x.com/cramforce)[, Marcos Grappeggia](https://x.com/grappeggia)
* Jan 19, 2026

  [Recraft image models now on AI Gateway](/changelog/recraft-image-models-now-on-ai-gateway)
  -------------------------------------------------------------------------------------------

  Recraft models are now available via Vercel's [AI Gateway](https://vercel.com/ai-gateway) with no other provider accounts required. You can access Recraft's image models, V3 and V2.

  These image models excel at photorealism, accurate text rendering, and complex prompt following. V3 supports long multi-word text generation with precise positioning, anatomical correctness, and native vector output. It includes 20+ specialized styles from realistic portraits to pixel art.

  To use this model, set `model` to `recraft/recraft-v3` in the [AI SDK](https://ai-sdk.dev/). This model supports `generateImage`.

  ```
  1

  import { generateImage } from 'ai';



  2



  3

  const result = await generateImage({



  4

  model: 'recraft/recraft-v3',



  5

  prompt:



  6

  `A misty Japanese forest with ancient cedar trees, painted in the style of



  7

  traditional ukiyo-e woodblock prints with soft indigo and moss green tones.`,



  8

  });
  ```

  AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [observability](https://vercel.com/docs/ai-gateway/observability), [Bring Your Own Key support](https://vercel.com/docs/ai-gateway/byok), and intelligent [provider routing](https://vercel.com/docs/ai-gateway/provider-options) with automatic retries.

  Learn more about [AI Gateway](https://vercel.com/docs/ai-gateway), view the [AI Gateway model leaderboard](https://vercel.com/ai-gateway/leaderboards) or try it in our [model playground](https://vercel.com/ai-gateway/models/recraft-v3).

  [**AI Gateway: Track top AI models by usage**

  The AI Gateway model leaderboard ranks the most used models over time by total token volume across all traffic through the Gateway. Updates regularly.

  View the leaderboard](https://vercel.com/ai-gateway/leaderboards)

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2WWsHaQYfExKGkG705ACaF/a9a304323552786faed15207f65a20c2/shaper.png)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/g5PjMrkqn8ETxSWZ2nrzD/8aa2e6af803fd394c412fa36ed848a91/PFP.png)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/XAYjCtNq5IkV9ff9iEt3U/40cfc85d4ca4143f6af16039df10c870/image.png)

  [Walter Korman](https://x.com/shaper)[, Rohan Taneja](https://x.com/rtaneja_)[, Jerilyn Zheng](https://x.com/jerilynzheng)
* Jan 16, 2026

  [Improved environment variables UI](/changelog/improved-environment-variables-ui)
  ---------------------------------------------------------------------------------

  [![Frame 1400003166](/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5iR2puxeZpj9ROiLnVF8BE%2F7e5966aceac0e6fd896c79c30208dedf%2FFrame_1400003167.png&w=3840&q=75)![Frame 1400003166](/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F59RtRV939Sck4OuEkijnMk%2Fee617812d28b1347b57f32cfcfd06899%2FFrame_1400003166.png&w=3840&q=75)](/changelog/improved-environment-variables-ui)

  The environment variables UI is now easier to manage across shared and project environment variables.

  You can spend less time scrolling, use larger hit targets, and view details only when you need them.

  Learn more in the [environment variables documentation](https://vercel.com/docs/environment-variables).

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1VF5NS2LLTJHg3MhfAfkBL/f1b09064bcc336fa47e591b0a2586ecb/T0CAQ00TU-U038PA4JLBF-22a9dc1177bf-512.png)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2GZi0Wk4AyEfbfl4xcbzSS/a55635b11a4c701d2e4a8ff11795fd28/T0CAQ00TU-U07DFQKLQKB-5d3a059e9ec5-512.jpg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5Lnp5v10zuBlQHowqlDddB/c1f7443e559968151ddf4c3b755d467d/mery_128x128.jpeg)

  [John Phamous](https://x.com/johnphamous)[, Manuel Muñoz Solera](https://x.com/mamuso)[, Mery Kaftar](https://x.com/merycodes)
* Jan 15, 2026

  [SSH into running Vercel Sandboxes with the CLI](/changelog/ssh-into-running-sandboxes-with-the-sandbox-cli)
  ------------------------------------------------------------------------------------------------------------

  You can now open secure, interactive shell sessions to running Sandboxes with the [Vercel Sandbox CLI](https://vercel.com/docs/vercel-sandbox/cli-reference).

  ```
  1

  pnpm i -g sandbox



  2

  sandbox login



  3

  sandbox create # If you don't have a running Sandbox to SSH into



  4

  sandbox ssh <sandbox-id>
  ```

  Note: While you’re connected, the Sandbox timeout is automatically extended in 5-minute increments to help avoid unexpected disconnections, for [up to 5 hours](https://vercel.com/docs/vercel-sandbox/pricing#maximum-runtime-duration).

  Learn more in the [Sandbox CLI docs](https://vercel.com/docs/vercel-sandbox/cli-reference#sandbox-ssh).

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/25Wxik9cHFIyYVc5TEOGsq/5bae178bd83dc05ed6a5f3ffbc0108ab/T0CAQ00TU-U02RWK211M5-d52866e7d526-512.jpg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/GpLvDTBIuqmox4kvhEpBf/b7971243801449edb8e5c12a74a27e1c/quiibz.png)

  [Gal Schlezinger](https://x.com/schniz)[, Tom Lienard](https://x.com/tomlienard)
* Jan 15, 2026

  [Experimental build mode for Hono and Express projects](/changelog/experimental-build-mode-hono-express)
  --------------------------------------------------------------------------------------------------------

  Users can opt in to an experimental build mode for [Hono](https://vercel.com/docs/frameworks/backend/hono) and [Express](https://vercel.com/docs/frameworks/backend/express) projects, which lets you filter logs by route, similar to Next.js.

  It also updates the build pipeline with better module resolution:

  + Relative imports no longer require file extensions
  + TypeScript path aliases are supported
  + Improved ESM and CommonJS interoperability

  To enable it, set `VERCEL_EXPERIMENTAL_BACKENDS=1` in your project's [environment variables](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables&title=Open+environment+variables).

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4XhXz5foD0b56fIJkDxXTd/553192d2c35afc8c5f34ab2fae9e9735/T0CAQ00TU-U06NH7M769H-9074d26692f5-512.jpg)

  Jeff See
* Jan 15, 2026

  [OpenResponses API now supported on Vercel AI Gateway](/changelog/openresponses-api-now-supported-on-vercel-ai-gateway)
  -----------------------------------------------------------------------------------------------------------------------

  Vercel AI Gateway is a day 0 launch partner for the OpenResponses API, an open-source specification from OpenAI for multi-provider AI interactions.

  OpenResponses provides a unified interface for text generation, streaming, tool calling, image input, and reasoning across providers.

  **AI Gateway supports OpenResponses for:**

  + **Text generation:** Send messages and receive responses from any supported model.
  + **Streaming:** Receive tokens as they're generated via server-sent events.
  + **Tool calling:** Define functions that models can invoke with structured arguments.
  + **Image input:** Send images alongside text for vision-capable models.
  + **Reasoning:** Enable extended thinking with configurable effort levels.
  + **Provider fallbacks:** Configure automatic fallback chains across models and providers.

  Use OpenResponses with your AI Gateway key, and switch models across providers by changing the model string.

  ```
  1

  const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {



  2

  method: 'POST',



  3

  headers: {



  4

  'Content-Type': 'application/json',



  5

  Authorization: `Bearer ${process.env.VERCEL_AI_GATEWAY_KEY}`,



  6

  },



  7

  body: JSON.stringify({



  8

  model: 'anthropic/claude-sonnet-4.5',



  9

  input: [



  10

  {



  11

  type: 'message',



  12

  role: 'user',



  13

  content: 'Explain quantum computing in one sentence.',



  14

  }



  15

  ],



  16

  }),



  17

  });
  ```

  You can also use OpenResponses for more complex cases, like tool calling.

  ```
  1

  const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {



  2

  method: 'POST',



  3

  headers: {



  4

  'Content-Type': 'application/json',



  5

  Authorization: `Bearer ${process.env.VERCEL_AI_GATEWAY_KEY}`,



  6

  },



  7

  body: JSON.stringify({



  8

  model: 'zai/glm-4.7',



  9

  input: [{ type: 'message', role: 'user', content: 'What is the weather in SF?' }],



  10

  tools: [{



  11

  type: 'function',



  12

  name: 'get_weather',



  13

  description: 'Get current weather for a location',



  14

  parameters: {



  15

  type: 'object',



  16

  properties: { location: { type: 'string' } },



  17

  required: ['location'],



  18

  },



  19

  }],



  20

  }),



  21

  });
  ```

  Read the [OpenResponses API documentation](https://vercel.com/docs/ai-gateway/openresponses) or [view the specification](https://www.openresponses.org/specification).

  ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2WWsHaQYfExKGkG705ACaF/a9a304323552786faed15207f65a20c2/shaper.png)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/g5PjMrkqn8ETxSWZ2nrzD/8aa2e6af803fd394c412fa36ed848a91/PFP.png)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/XAYjCtNq5IkV9ff9iEt3U/40cfc85d4ca4143f6af16039df10c870/image.png)

  [Walter Korman](https://x.com/shaper)[, Rohan Taneja](https://x.com/rtaneja_)[, Jerilyn Zheng](https://x.com/jerilynzheng)
Show more

**Ready to deploy?** Start building with a free account. Speak to an expert for your *Pro* or Enterprise needs.

[Start Deploying](/new)[Talk to an Expert](/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](/try-enterprise)