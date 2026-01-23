gsap.quickSetter() | GSAP | Docs & Learning
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
gsap.quickSetter()
On this page
gsap.quickSetter()
Returns : Function
â
Details
â
If you find yourself calling
gsap.set()
many times on the same object (or set of objects), like in a "mousemove" event, you can
boost performance 50% - 250%
by creating a quickSetter function and using that instead of
gsap.set()
. Think of a quickSetter like an optimized function tied to a particular target's (or set of targets') property, where it directly pipes data to it and
skips
convenience tasks in a normal
gsap.set()
call such as:
Unit conversion and auto-appending of units (though you can specify a unit for the quickSetter that'll always get appended to the number you feed in)
Relative values
Function-based values
"random()"
parsing
Special workarounds for property-specific browser inconsistencies like transformOrigin on SVG elements (so it isn't advisable to create a quickSetter for transformOrigin).
Property name alias conversion ("x" will work for transforms, but "translateX" won't)
note
Don't be afraid to use
gsap.set()
because in most cases you'd never notice a real-world performance difference by switching to a quickSetter and
gsap.set()
provides a lot of worthwhile conveniences. But at GreenSock we're performance nuts, so we wanted to provide a tool for hyper-optimized property setting in performance-critical cases where you've got a
LOT
updates going on.
Combine with utility methods for super-powerful functions!
â
Since it accepts a single value, you can slap a quickSetter at the end of a
pipe()
, after other utility functions that do useful things to the numbers you feed in, like
clamping
or
snapping
or somehow sanitizing the values. For example:
let
xSetter
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
//make sure the number is between 0 and 100
gsap
.
utils
.
snap
(
5
)
,
//snap to the closest increment of 5
gsap
.
quickSetter
(
"#id"
,
"x"
,
"px"
)
//apply it to the #id element's x property and append a "px" unit
)
;
//then later...
xSetter
(
150
)
//sets the #el's transform to translateX(100px) (clamped to 100)
xSetter
(
3
)
//sets it to 5px (snapped)
...
Mouse Follower Demo
â
loading...
If you're animating, use gsap.quickTo()
â
gsap.quickSetter() is aimed at immediately setting values, but if you'd prefer to
animate
to new values instead, check out the
gsap.quickTo()
method instead. Here's a mouse follower demo using that:
loading...
Trick for multiple values
â
You can get the benefits of CSSPlugin (like relative values,
"random()"
parsing, etc.) and the ability to apply
multiple
properties to DOM elements by setting the
property
of the quickSetter to
"css"
and then passing in the value as an
object
, like:
var
boxSet
=
gsap
.
quickSetter
(
"#box"
,
"css"
)
;
boxSet
(
{
x
:
"+=100"
,
y
:
"random(-100, 100)"
}
)
;
//works!
This technique also works for attributes (using "attr" instead):
var
circleSet
=
gsap
.
quickSetter
(
"#circle"
,
"attr"
)
;
circleSet
(
{
cx
:
"+=100"
,
cy
:
"random(-100, 100)"
}
)
;
//works!
But this won't deliver as much of a performance boost as you'd get by using a specific property like
gsap.quickSetter("#box", "x", "px")
. It's still faster than a standard gsap.set(), though.
Previous
gsap.parseEase()
Next
gsap.quickTo()
Contents
Returns : Function
Details
Combine with utility methods for super-powerful functions!
Mouse Follower Demo
If you're animating, use gsap.quickTo()
Trick for multiple values
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