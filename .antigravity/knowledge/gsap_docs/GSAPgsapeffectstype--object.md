gsap.effects | GSAP | Docs & Learning
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
properties
gsap.effects
On this page
gsap.effects
Type : Object
â
Once an effect has been
registered
, you can access it directly on the
gsap.effects
object like this:
//assumes that an effect named "explode" has already been registered
gsap
.
effects
.
explode
(
".box"
,
{
direction
:
"up"
,
//can reference any properties that the author decides - in this case "direction"
duration
:
3
,
}
)
;
Or, if you set
extendTimeline: true
on the effect when registering it, you'll even be able to call it DIRECTLY on timelines in order to have the results of the effect inserted into that timeline (see below). Effects make it easy for anyone to author custom animation code wrapped in a function (which accepts
targets
and a
config
object) and then associate it with a specific
name
so that it can be called anytime with new targets and configurations. For example, maybe we want to be able to make things fade (which is rather silly because it's so simplistic, but the goal here is to show how it could work):
// register the effect with GSAP:
gsap
.
registerEffect
(
{
name
:
"fade"
,
effect
:
(
targets
,
config
)
=>
{
return
gsap
.
to
(
targets
,
{
duration
:
config
.
duration
,
opacity
:
0
}
)
;
}
,
defaults
:
{
duration
:
2
}
,
//defaults get applied to any "config" object passed to the effect
extendTimeline
:
true
,
//now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
}
)
;
// now we can use it like this:
gsap
.
effects
.
fade
(
".box"
)
;
// or directly on timelines:
let
tl
=
gsap
.
timeline
(
)
;
tl
.
fade
(
".box"
,
{
duration
:
3
}
)
.
fade
(
".box2"
,
{
duration
:
1
}
,
"+=2"
)
.
to
(
".box3"
,
{
x
:
100
}
)
;
loading...
GSAP provides 4 key services here:
It parses the "targets" into an array. So if selector text is passed in, it becomes an array of elements passed to the effect function.
It applies defaults to the config object every time. No need to add a bunch of if statements or apply the defaults yourself.
It provides a centralized way of registering/accessing these "effects".
If you set
extendTimeline: true
, the effect's name will be added as a method to GSAP's Timeline prototype, meaning that you can insert an instance of that effect directly into any timeline like:
//with extendTimeline: true
var
tl
=
gsap
.
timeline
(
)
;
tl
.
yourEffect
(
".class"
,
{
configProp
:
"value"
}
,
"+=position"
)
;
//without extendTimeline: true, you'd have to do this to add an instance to the timeline:
tl
.
add
(
gsap
.
effects
.
yourEffect
(
".class"
,
{
configProp
:
"value"
}
)
,
"+=position"
)
;
So it can save you a lot of typing if you're making heavy use of an effect in your sequences.
warning
important
: any effect with
extendTimeline:true
must
return a GSAP-compatible animation that could be inserted into a timeline (a Tween or Timeline instance)
Register Effects
For a quick overview of how to register effects, check out this video from the Snorkl.tv's
Creative Coding Club
- one of the best ways to learn the basics of how to use GSAP.
Effects are also easily shared between different projects and people. To view effects that have already been created, check out
the CodePen collection
.
Here's an example of multiple pre-made fade effects being generated so that they can be reused later:
loading...
Previous
GSAP
Next
gsap.globalTimeline
Contents
Type : Object
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