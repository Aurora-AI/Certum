# https://vercel.com/botid

[Learn more](/docs/botid)npm i botid

Get started with BotIDAllow verified bots

app/api/signup/route.ts

```
1

import { checkBotId } from 'botid/server'



2



3

export async function POST(req: Request) {



4

const { isBot } = await checkBotId();



5



6

if (isBot) {



7

return new Response("Access Denied", { status: 403 });



8

}



9

return new Response("Success!", { status: 200 });



10

}
```

Bot Defense for Critical Routes.

![](/vc-ap-vercel-marketing/_next/static/media/shield.c7dd784a.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Guard your AI endpoints

Keep AI usage secure to reduce prompt costs and preserve performance.

![](/vc-ap-vercel-marketing/_next/static/media/settings-gear.5f9c1d07.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Prevent content scraping

Stop unwanted tools from copying product listings, pricing, or IP.

![](/vc-ap-vercel-marketing/_next/static/media/cart.53f56762.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Keep checkout flows clean

Block unwanted targeting discounts, inventory, or payment flows.

![](/vc-ap-vercel-marketing/_next/static/media/analytics.1980978e.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Filter analytics

Keep insights clean by automatically excluding known and unknown bots.

![](/vc-ap-vercel-marketing/_next/static/media/user-check.e960863f.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Increase account protection

Stop bots from creating new accounts for free-tier fraud, spam, or fake email loops.

![](/vc-ap-vercel-marketing/_next/static/media/dollar.c7b27b67.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Protect every transaction

Shield wallets and high value APIs from credential stuffing and automation.

![](/vc-ap-vercel-marketing/_next/static/media/botid.9452dc8d.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

Why BotID
---------

### Effortless bot protection, built for scale.

From revenue to reputation, keep your business safe from automated abuse.

### Zero friction verification.

Seamlessly distinguish real users from bots with thousands of signals per request. No friction, no captchas required.

### Evasive bot defense.

Stay ahead of attackers with rotating detection methods that block replay, spoofing, and automation frameworks.

### AI-powered deep analysis.

BotID uses advanced machine learning models to detect the most sophisticated, stealthy bots in real time.

“

Vercel BotID ensures feedback on Yupp is based on human preferences, not bots, providing high quality evaluation data critical to AI development. Our launch drew global users, including sophisticated bots. No other provider had this at-scale bot detection with easy developer experience. We now protect key product usage actions on Yupp with Vercel BotID.

”

### Frequently Asked Questions

Is BotID always on?

You choose the routes. BotID only runs where you configure protected paths and components.

Does it replace CAPTCHA?

Yes. BotID verifies sessions invisibly. There is no user interaction.

How is it different from basic bot detection?

BotID runs detection scripts inside the session. It is resistant to spoofing, replay, and inspection.

Is BotID available to everyone?

BotID is available for all teams, with Deep Analysis checks available for Pro and Enterprise teams.

Can I enable BotID selectively?

Yes. BotID supports per-component protection. You can apply it only where needed, like checkout, signup, or AI endpoints.

Will it impact performance or latency?

No. Detection runs asynchronously inside the client session and integrates into your existing routing logic.

Does BotID store user data?

No. It evaluates session validity without storing user behavior or PII.

How does it differ from scoring systems?

Scoring models estimate bot likelihood using heuristics. BotID deterministically validates session authenticity. It returns a simple pass or fail, rather than an ambiguous score.

What frameworks does it support?

BotID works natively with all frameworks. It can be used with any frontend served with Vercel.

Do I need to tune or configure bots?

No. There are no bots to manage or IP blocks, rate limits, or thresholds to tune.

How is BotID priced?

BotID includes a free Basic mode and a paid Deep Analysis mode. See the [docs for pricing](https://vercel.com/docs/botid#pricing).

### Vercel Bot Management.

Monitor bot traffic, stop volumetric attacks, logic abuse, automation, and targeted bots with a multi-layered Bot Management system.

[Learn more](https://vercel.com/security/bot-management)

![Bots attack dark mode](/vc-ap-vercel-marketing/_next/static/media/attack-dark-mode.7968a760.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)![Bots attack light mode](/vc-ap-vercel-marketing/_next/static/media/attack-light-mode.fe23812a.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)