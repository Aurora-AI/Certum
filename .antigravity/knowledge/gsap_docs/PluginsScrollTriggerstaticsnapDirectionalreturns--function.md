static-snapDirectional | GSAP | Docs & Learning
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
Tween
Timeline
CSS
Easing
Plugins
What's a plugin?
ScrollTrigger
properties
.animation
.direction
.end
.isActive
ScrollTrigger.isTouch
.pin
.progress
.scroller
.start
.trigger
.vars
methods
.disable()
.enable()
.getTween()
.getVelocity()
.kill()
.labelToScroll()
.next()
.previous()
.refresh()
.scroll()
ScrollTrigger.addEventListener()
ScrollTrigger.batch()
ScrollTrigger.clearMatchMedia()
ScrollTrigger.clearScrollMemory()
ScrollTrigger.config()
ScrollTrigger.create()
ScrollTrigger.defaults()
ScrollTrigger.getAll()
ScrollTrigger.getById()
ScrollTrigger.isInViewport()
ScrollTrigger.isScrolling()
ScrollTrigger.killAll()
ScrollTrigger.matchMedia()
ScrollTrigger.maxScroll()
ScrollTrigger.normalizeScroll()
ScrollTrigger.observe()
ScrollTrigger.positionInViewport()
ScrollTrigger.refresh()
ScrollTrigger.removeEventListener()
ScrollTrigger.saveStyles()
ScrollTrigger.scrollerProxy()
ScrollTrigger.snapDirectional()
ScrollTrigger.sort()
ScrollTrigger.update()
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
ScrollTrigger
methods
ScrollTrigger.snapDirectional()
On this page
ScrollTrigger
.snapDirectional
ScrollTrigger
.snapDirectional
( incrementOrArray:Number | Array ) : Function
Returns a snapping function to which you can feed any value to snap, along with a direction where
1
is forward (greater than) and
-1
is backward (less than).
Parameters
incrementOrArray
: Number | Array
A numeric increment to snap to, or an Array of values
Returns : Function
â
A function that accepts two parameters - 1) a value to snap, 2) the direction where 1 is forward (greater than) and -1 is backward (less than)
Details
â
Returns a snapping function to which you can feed any value to snap, along with a direction where
1
is forward (greater than) and
-1
is backward (less than). For example:
// returns a function that snaps to the closest increment of 5
let
snap
=
ScrollTrigger
.
snapDirectional
(
5
)
;
snap
(
11
)
;
// 10 (closest, not directional)
snap
(
11
,
1
)
;
// 15 (closest greater than)
snap
(
11
,
-
1
)
;
// 10 (closest less than)
You can even use an
Array
of values!
let
values
=
[
0
,
5
,
20
,
100
]
;
// returns a function that'll snap to the closest value in the Array
let
snap
=
ScrollTrigger
.
snapDirectional
(
values
)
;
snap
(
8
)
;
// 5 (closest, non-directional)
snap
(
8
,
1
)
;
// 20 (closest greater than)
snap
(
99
,
-
1
)
;
// 20 (closest less than)
Previous
ScrollTrigger.scrollerProxy()
Next
ScrollTrigger.sort()
Contents
Returns : Function
Details
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