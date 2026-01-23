# https://vercel.com/security/web-application-firewall

Web Application Firewall
========================

Customizable, global, and application-aware traffic protection.

[Watch a Demo](https://www.youtube.com/watch?v=t-U6vTrx_9Y)[Read the docs](https://vercel.com/docs/security/vercel-waf)

![](/vc-ap-vercel-marketing/_next/static/media/code-block.ae0e0c60.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

Enterprise-grade security at the edge.
--------------------------------------

### Security designed for a serverless web.

Vercel Web Application Firewall instantly propagates globally and scales on-demand to keep your application serving only desired traffic.

### Instant propagation

Global propagation of firewall changes in 300ms ensures immediate enforcement of new and updated rules.

### Protection at the edge

Secure your compute and backends from undesired traffic, at the edge.

### Framework-aware rules

Access framework-level target paths, like /blog/[slug] for more dynamic rule creation.

**DDoS Mitigation.**

Automatically mitigate Layer 3, DDoS, and other high-volume attacks before they reach your applications.

**Custom rules.**

Use the WAF's UI or API to define custom business logic and precisely control traffic.

**Managed rulesets.**

Mitigate the most critical risks, like OWASP Top 10, using predefined advanced rulesets.

**Attack Challenge Mode.**

Browser checks help ensure that only legitimate users can access your application during an attack.

Custom protection for your web applications.

![](/vc-ap-vercel-marketing/_next/static/media/firewall-globe.5b456ae7.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Granular visibility

Get insights into what's blocked by Vercel Firewall.

![](/vc-ap-vercel-marketing/_next/static/media/shield-globe.afe39491.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Instant, global propagation

Custom rule changes propagate globally in under 300ms, removing the delay between rule creation and enforcement.

![](/vc-ap-vercel-marketing/_next/static/media/code-wrap.6d143d4f.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Framework-aware control

Leverage Vercel's framework awareness of your application to make granular custom rules.

![](/vc-ap-vercel-marketing/_next/static/media/firewall-check.642159a4.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Targeted control

15+ parameters give you flexibility to determine what criteria should be met before taking an action.

![](/vc-ap-vercel-marketing/_next/static/media/arrow-left.e1722fdf.svg?dpl=dpl_DAmfQ7ShxgPNUreS74eoRtAwLkga)

### Instant rollback

Instant rollback of custom rules ensure accidental rule creations don't cause harm to your traffic.

### Your app, your rules.

Take action based on 15+ parameters, like: target path, location, IP, User Agent, JA4 and more.

**Log.**

Test rules by activate passively to see what would happen before you take action.

**Challenge.**

Run an automated browser check to verify a user's legitimacy before they access your application.

**Deny.**

Block traffic that violates custom rules and make the blocks persistent for a specified time period.

**Rate limit.**

Implement granular traffic frequency control to prevent app access abuse.

Customize and deploy Firewall rules
-----------------------------------

Start from pre-built templates.
-------------------------------

You're in control of your Vercel Web Application Firewall.

Customize and deploy Firewall rules
-----------------------------------

Start from pre-built templates.
-------------------------------

You're in control of your Vercel Web Application Firewall.

[Add Firewall Rules Now](https://vercel.com/templates/vercel-firewall)

Global Security
---------------

Vercel WAF builds on top of platform-wide, global security protecting all customers.

Application Security
--------------------

Monitor and manage the traffic that comes to your web applications.

Infrastructure Security
-----------------------

Protects compute resources against malicious actors and threats like DDoS.

### Vercel Web Application Firewall FAQs

What is Vercel Web Application Firewall?

Vercel’s WAF is a customizable security tool that protects each customer’s web applications from various online threats and attacks, it’s part of the larger Vercel Firewall that acts as a system-wide defense for all Vercel customers.

Is the WAF available for all Vercel plans?

Yes, the WAF is available for use on all plans.

How does Vercel’s WAF work?

Vercel’s WAF sits at the edge and applies its logic to all incoming requests. Due to how the Vercel infrastructure is configured, a request cannot bypass the Vercel Firewall or WAF once enabled. Rules are evaluated against the incoming request in the order they are configured and act according to any actions met.

What types of attacks does Vercel’s WAF protect against?

The Vercel WAF can be customized to a business’s own priorities to stop Layer 7/application layer attacks based on 15+ parameters like target path, request path, headers, cookies, user agents, JA3/JA4 digests, and more.

The system Vercel Firewall protects against Layer 3 attacks like DDoS and SYN flood attacks, while managed rulesets help protect against OWASP Top 10 risks like SQL injection and cross-site scripting (XSS).

Can the WAF be customized?

Yes, you can customize rules and policies to fit your specific security needs.

Does the WAF provide logging and reporting?

Yes, it offers detailed logs and reports on security events and blocked threats by visiting the Firewall tab within the dashboard. The Firewall visibility is performed on a per-project basis and can link directly to Monitoring queries that can be used to conduct deeper investigations.

Is the WAF compatible with all types of web applications?

The WAF is embedded within the Vercel Edge Network and is therefore designed to work with all web applications hosted on Vercel. Prior to fulfilling any request, the WAF rules will be evaluated.

How do I enable the WAF for my Vercel project?

Go to your dashboard > Project > Firewall tab. For more information, [read the documentation](https://vercel.com/docs/security/vercel-waf/custom-rules#get-started).

Can I configure different rules for different projects?

Yes, you can set up different WAF configurations for each project.

Is it possible to block based on IP addresses?

Yes, you can configure WAF to block IP addresses in two ways: either via the business logic of a custom firewall rule or by leveraging [WAF IP Blocks](https://vercel.com/docs/security/vercel-waf/ip-blocking) which performs IP denies even earlier in the request lifecycle.

How often should I update my WAF rules?

It’s recommended to review and update your rules regularly, especially after significant changes to your application.

Does the WAF impact my application’s performance?

The WAF is embedded into the same request lifecycle flow of the Vercel Edge Network and is designed to have minimal impact on performance while providing robust security.

Can the WAF handle high-traffic websites?

Yes, it’s built to scale and can handle high-traffic websites efficiently.

How can I test if my WAF rules are working correctly?

Prior to publishing a WAF rule with an action that would affect users, you can publish an active firewall rule with a “log” action which will enable you to passively observe how the rule would affect traffic. Upon evaluating the behavior of the rule, you can either further customize them or update the rule with the intended action.

What happens if there’s a false positive with my WAF rules?

You can adjust your WAF rules to reduce false positives, you are in full control of your WAF and changes propagate globally in around 300ms, meaning any changes you publish will immediately reflect globally.

Is the WAF compatible with my custom domains?

Yes, it works with custom domains configured in your Vercel project.

**Ready to deploy?** Start building with a free account. Speak to an expert for your *Pro* or Enterprise needs.

[Start Deploying](/new)[Talk to an Expert](/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](/try-enterprise)