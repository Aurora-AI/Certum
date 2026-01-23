gsap.quickTo() | GSAP | Docs & Learning
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
gsap.quickTo()
On this page
gsap.quickTo()
Returns : Function
â
Details
â
If you find yourself calling
gsap.to()
many times on the same numeric property of the same target, like in a "mousemove" event, you can
boost performance
by creating a quickTo() function instead. Think of a
quickTo()
like an optimized function tied to one particular numeric property, where it directly pipes a new number to it and
skips
convenience tasks in a normal
gsap.to()
call such as:
Unit conversion and auto-appending of units
Relative values
Function-based values
"random()"
parsing
Plugin parsing - this is only for direct properties or CSS-related properties of the target. You cannot, for example, use an attr:
value or morphSVG, etc.
Property name alias conversion ("x" will work for transforms, but "translateX" won't)
Each time you pass in a new number to the function, it basically
restarts
the animation, redirecting it to that new value. It returns the (reused) Tween instance.
The optional 3rd parameter is for the tween
vars
object where you can specify tween-related settings like
duration
,
ease
, etc.
Example
let
xTo
=
gsap
.
quickTo
(
"#id"
,
"x"
,
{
duration
:
0.4
,
ease
:
"power3"
}
)
,
yTo
=
gsap
.
quickTo
(
"#id"
,
"y"
,
{
duration
:
0.4
,
ease
:
"power3"
}
)
;
document
.
querySelector
(
"#container"
)
.
addEventListener
(
"mousemove"
,
(
e
)
=>
{
xTo
(
e
.
pageX
)
;
yTo
(
e
.
pageY
)
;
}
)
;
Combine with utility methods for super-powerful functions!
â
Since it accepts a single value, you can slap a quickTo at the end of a
pipe()
, after other utility functions that do useful things to the numbers you feed in, like
clamping
or
snapping
or somehow sanitizing the values. For example:
let
xTo
=
gsap
.
utils
.
pipe
(
gsap
.
utils
.
clamp
(
0
,
100
)
,
// make sure the number is between 0 and 100
gsap
.
utils
.
snap
(
5
)
,
// snap to the closest increment of 5
gsap
.
quickTo
(
"#id"
,
"x"
,
{
duration
:
0.8
,
ease
:
"power3"
}
)
// apply it to the #id element's x property, have it take 0.8 seconds each time it's updated, and use a "power3" ease
)
;
//then later...
xTo
(
150
)
// animates the #el's transform to translateX(100px) (clamped to 100)
xTo
(
3
)
// animates it to 5px (snapped)
...
Mouse Follower Demo
â
loading...
Optionally define a start value
â
By default, it will start from whatever the CURRENT value is
inside the tween
at its current progress (it doesn't actually check the target for the current value...the idea here is to maximize performance). But you can override that by passing in a numeric start value as the 2nd parameter:
let
xTo
=
gsap
.
quickTo
(
"#id"
,
"x"
,
{
duration
:
0.8
}
)
;
xTo
(
100
)
;
// animates to 100 from current value inside the tween at its current progress
xTo
(
100
,
500
)
;
// animates to 100 from 500
Access the tween
â
If you need to access the tween, like to
pause()
it for example, the resulting function has a
.tween
property:
let
xTo
=
gsap
.
quickTo
(
"#id"
,
"x"
,
{
duration
:
0.8
}
)
;
xTo
(
100
)
;
// animate to 100
xTo
.
tween
.
pause
(
)
;
// pause the tween!
It's a regular
Tween
instance, so you can leverage any of its methods and properties except
delay()
.
Previous
gsap.quickSetter()
Next
gsap.registerEase()
Contents
Returns : Function
Details
Combine with utility methods for super-powerful functions!
Mouse Follower Demo
Optionally define a start value
Access the tween
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