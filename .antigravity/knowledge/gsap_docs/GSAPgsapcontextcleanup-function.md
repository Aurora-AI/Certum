gsap.context() | GSAP | Docs & Learning
GSAP
GSAP
Menu
Tools
Core
Scroll
SVG
UI
Text
Installation
GSAP & React
Video Lessons
Professional-grade JavaScript animation for the modern web
Showcase
Community
Learn GSAP
Docs
Demos
Notifications
Notifications
Notification Settings
View All
Messages
Messages
Compose new
Go to Inbox
Login/Create Account
Sign In
Login
Forgot your password?
Why create an account?
It's free
Learn & share in the forums
Keep up to date with GSAP
Create an Account
My Account
Dashboard
Account Settings
Get GSAP
Tools
Core
Scroll
SVG
UI
Text
About
Showcase
Community
Learn GSAP
Docs
Login/Create Account
Dashboard
Account Settings
Messages
Notifications
Sign In
Login
Forgot your password?
Not got an account?
Create an Account
CodePen
GitHub
Facebook
LinkedIn
x
Skip to main content
Docs
Learning
v3.14.1
v3.14.1
v2 - archived
Search
docsHome
Quick Start
Installation
YouTube Channel
Demos
Cheatsheet
Fundamentals
GSAP
properties
gsap.effects
gsap.globalTimeline
gsap.ticker
gsap.utils
gsap.version
methods
gsap.config()
gsap.context()
gsap.defaults()
gsap.delayedCall()
gsap.exportRoot()
gsap.from()
gsap.fromTo()
gsap.getById()
gsap.getProperty()
gsap.getTweensOf()
gsap.isTweening()
gsap.killTweensOf()
gsap.matchMedia()
gsap.matchMediaRefresh()
gsap.parseEase()
gsap.quickSetter()
gsap.quickTo()
gsap.registerEase()
gsap.registerEffect()
gsap.registerPlugin()
gsap.set()
gsap.timeline()
gsap.to()
gsap.updateRoot()
Internal Plugins
Tween
Timeline
CSS
Easing
Plugins
What's a plugin?
ScrollTrigger
ScrollSmoother
SplitText
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
GSAP
methods
gsap.context()
On this page
added in v
3.11.0
gsap.context()
Quick Start
Minimal usage
let
ctx
=
gsap
.
context
(
(
)
=>
{
gsap
.
to
(
...
)
;
gsap
.
from
(
...
)
;
gsap
.
timeline
(
)
.
to
(
...
)
.
to
(
...
)
;
...
}
)
;
// then later...
ctx
.
revert
(
)
;
// BOOM! Every GSAP animation created in that function gets reverted!
useGSAP() hook for React
If you're using React, we've brought out a hook that abstracts away
gsap.context()
and handles animation cleanup for you!
Head over to the React guide
A
gsap.context()
offers two key benefits:
Collects all GSAP animations and ScrollTriggers
that are created within the supplied function so that you can easily
revert()
or
kill()
ALL
of them at once. No need to keep track of a bunch of variables, Arrays, etc. This is particularly useful in React modules or anywhere you need to be able to "clean up" by reverting elements to their original state.
[optionally]
Scopes all selector text to a particular Element or Ref
. This can help simplify your code quite a bit and avoid needing to create lots of
Refs
in React/Angular. Any GSAP-related selector text inside the supplied function will only apply to descendants of the Element/Ref.
Let's say you've got a
big
block of GSAP code that's creating a bunch of different animations and you need to be able to
revert()
them all...
let
ctx
=
gsap
.
context
(
(
)
=>
{
gsap
.
to
(
...
)
;
gsap
.
from
(
...
)
;
gsap
.
timeline
(
)
.
to
(
...
)
.
to
(
...
)
;
...
}
)
;
// then later...
ctx
.
revert
(
)
;
// BOOM! Every GSAP animation created in that function gets reverted!
Scoping selector text
â
You can optionally pass in an Element or
React Ref
or
Angular ElementRef
and then
all
the selector text in the supplied function will be scoped to that particular Element/Ref which can greatly simplify your code. No more creating a Ref for every element you want to animate!
let
ctx
=
gsap
.
context
(
(
)
=>
{
gsap
.
to
(
".box"
,
{
...
}
)
// <- normal selector text, automatically scoped to myRefOrElement
gsap
.
from
(
".circle"
,
{
...
}
)
;
}
,
myRefOrElement
)
;
// <- scope!!!
The
scope
can be selector text itself like ".myClass", or an Element, React Ref or Angular ElementRef.
Adding to a Context
â
Perhaps you need to set up event handlers (like mouse clicks) that create new animations that should also be collected in the Context, but obviously those events will occur AFTER the Context's function already executed. No problem! You can
add
your own methods
to a Context object so that when they run, they'll automatically add any resulting GSAP animations/ScrollTriggers to the Context:
let
ctx
=
gsap
.
context
(
(
self
)
=>
{
// use any arbitrary string as a name; it'll be added to the Context object, so in this case you can call ctx.onClick() later...
self
.
add
(
"onClick"
,
(
e
)
=>
{
gsap
.
to
(
...
)
;
// <-- gets added to the Context!
}
)
;
}
,
myRefOrElement
)
;
// now the Context has an onClick() method we can tap into and any animations in that function will get added to the Context
myButton
.
addEventListener
(
"click"
,
(
e
)
=>
ctx
.
onClick
(
e
)
)
;
Or you can directly add things to the Context
immediately
like this (function as the first parameter):
// create context
let
ctx
=
gsap
.
context
(
(
)
=>
{
...
}
)
;
// then later, add to it:
ctx
.
add
(
(
)
=>
{
gsap
.
to
(
...
)
;
// now all these get added to the Context.
gsap
.
from
(
...
)
;
}
)
;
Cleanup function
â
You can optionally return a "cleanup function" that should be called if/when the context gets reverted. This can contain your own custom cleanup code:
let
ctx
=
gsap
.
context
(
(
)
=>
{
...
return
(
)
=>
{
// my custom cleanup code. Called when ctx.revert() is triggered.
}
;
}
)
;
You can return a clean up function in any
.add()
function too; They'll all get called when the Context's
revert()
is invoked.
Ignoring certain animations/ScrollTriggers
â
In very uncommon situations, you may want to create certain GSAP animations and/or ScrollTriggers inside the function that should be
excluded from the Context
(not reverted/killed when the Context gets reverted/killed) in which case you can use an
ignore()
like this:
let
ctx
=
gsap
.
context
(
(
self
)
=>
{
gsap
.
to
(
...
)
;
// <- will get reverted when ctx.revert() is called
self
.
ignore
(
(
)
=>
{
gsap
.
to
(
...
)
;
// <- will NOT get reverted when ctx.revert() is called. Ignored, not recorded in the Context.
}
)
;
}
)
;
Tips & Caveats
â
When
revert()
is called on a Context, it is
permanent
for the animations/ScrollTriggers it contained. They get reverted and killed and the Context clears itself out, making things eligible for garbage collection. But more animations could still be added after that and revert() could be called on the same Context
again
to revert/kill those.
A Context is not meant to serve as a way of controlling animations. That's what
Timelines
are for. A Context is simply for reverting/killing and for [optionally] defining a scope for selector text.
The Context object itself is passed to the function, so you can reference it easily, like
gsap.context((self) => { ... self.add(...); });
gsap.context()
was added in version
3.11.0
Previous
gsap.config()
Next
gsap.defaults()
Contents
Scoping selector text
Adding to a Context
Cleanup function
Ignoring certain animations/ScrollTriggers
Tips & Caveats
GSAP
Core
Docs
All Plugins
Scroll
ScrollTrigger
ScrollSmoother
ScrollTo
SVG
DrawSVG
MorphSVG
MotionPath
MotionPathHelper
UI
Flip
Draggable
Inertia
Observer
Text
SplitText
ScrambleText
Text Replace
Other
Physics2D
PhysicsProps
GSDevTools
Keep in the loop with the GSAPÂ® newsletter.
Email
\*
GSAP
Blog
Showcase
Learn GSAP
GSAP & Webflow
Contact Us
Connect
Forums
Codepen
LinkedIn
Bluesky
GitHub
X
Â©
2026
GSAP - A Webflow Product. All rights reserved.
Â Privacy Policy.
Â Terms of Use.