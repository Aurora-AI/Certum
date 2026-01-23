Snap | GSAP | Docs & Learning
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
Attributes
EndArray
Modifiers
Snap
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
Internal Plugins
Snap
On this page
Snap
What are internal plugins?
SnapPlugin is an internal plugin, It is
automatically included in GSAP's core
and
doesn't have to be loaded using gsap.registerPlugin()
.
You can think of internal plugins as just a part of GSAP.
Description
â
The SnapPlugin allows tweens to "snap" to the closest value in a given array or increment. It basically adds a modifier to any property that implements one of the following snapping behaviors to every value DURING the tween (live, not just to the end value).
For example:
// snap all of the properties in the comma-delimited list ("x,y" in this case) to the closest whole number:
gsap
.
to
(
".class"
,
{
x
:
1000
,
y
:
250
,
snap
:
"x,y"
,
}
)
;
// snap to an increment:
gsap
.
to
(
".class"
,
{
x
:
1000
,
snap
:
{
x
:
20
,
// x snaps to the closest increment of 20 (0, 20, 40, 60, etc.)
}
,
}
)
;
// snap to the closest value in an array:
gsap
.
to
(
".class"
,
{
x
:
1000
,
snap
:
{
x
:
[
0
,
50
,
150
,
500
]
,
// x snaps to the closest value in this array
}
,
}
)
;
// snap to a value in an array, but only when it's within a certain distance/radius of one of those values:
gsap
.
to
(
".class"
,
{
x
:
1000
,
snap
:
{
x
:
{
values
:
[
0
,
50
,
150
,
500
]
,
radius
:
20
}
,
// x snaps to the closest value in the array but only when it's within 20 pixels of it.
}
,
}
)
;
You can define as many snap properties as you want.
FAQs
â
How do I include this plugin in my project?
Simply load GSAP's core - SnapPlugin is included automatically!
Do I need to register SnapPlugin?
Nope. SnapPlugin is built into the core and doesn't need to be registered.
Previous
Modifiers
Next
Tween
Contents
Description
FAQs
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