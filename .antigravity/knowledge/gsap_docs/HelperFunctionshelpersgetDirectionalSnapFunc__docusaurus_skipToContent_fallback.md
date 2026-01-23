getDirectionalSnapFunc | GSAP | Docs & Learning
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
ScrollSmoother
SplitText
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
seamlessLoop
stopOverscroll
LottieScrollTrigger
addWeightedEases
alignOrigins
anchorsToProgress
bgSize
blendEases
callAfterResize
compensatedSkew
getDirectionalSnapFunc
easeToLinear
Flip
formatNumber
getNestedLabelTime
getScrollLookup
getScrollPosition
imageSequenceScrub
killChildTweensOf
nestedLinesSplit
pluckRandomFrom
progressiveBuild
smoothOriginChange
tickGSAPWhileHidden
trackDirection
weightedRandom
React - useGSAP()
llms.txt
Helper functions
getDirectionalSnapFunc
On this page
Directional snapping
Normally when you snap a value, it goes to the
CLOSEST
one (either an increment or the value in an Array), like:
let
snap
=
gsap
.
utils
.
snap
(
5
)
;
// returns a function that snaps any value to the closest increment of 5
console
.
log
(
snap
(
2
)
)
;
// 0
console
.
log
(
snap
(
3.5
)
)
;
// 5
console
.
log
(
snap
(
19
)
)
;
// 20
But what if you want to apply
directional
snapping so that, for example, you want to snap to the closest increment of 5 that's GREATER than the value? You need a function that'll accept a value and a direction where
1
means "greater" and
-1
means "lesser". Here's the helper function:
function
getDirectionalSnapFunc
(
snapIncrementOrArray
)
{
let
snap
=
gsap
.
utils
.
snap
(
snapIncrementOrArray
)
,
a
=
Array
.
isArray
(
snapIncrementOrArray
)
&&
snapIncrementOrArray
.
slice
(
0
)
.
sort
(
(
a
,
b
)
=>
a
-
b
)
;
return
a
?
(
value
,
direction
)
=>
{
let
i
;
if
(
!
direction
)
{
return
snap
(
value
)
;
}
if
(
direction
>
0
)
{
value
-=
1e-4
;
// to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.
for
(
i
=
0
;
i
<
a
.
length
;
i
++
)
{
if
(
a
[
i
]
>=
value
)
{
return
a
[
i
]
;
}
}
return
a
[
i
-
1
]
;
}
else
{
i
=
a
.
length
;
value
+=
1e-4
;
while
(
i
--
)
{
if
(
a
[
i
]
<=
value
)
{
return
a
[
i
]
;
}
}
}
return
a
[
0
]
;
}
:
(
value
,
direction
)
=>
{
let
snapped
=
snap
(
value
)
;
return
!
direction
||
Math
.
abs
(
snapped
-
value
)
<
0.001
||
snapped
-
value
<
0
===
direction
<
0
?
snapped
:
snap
(
direction
<
0
?
value
-
snapIncrementOrArray
:
value
+
snapIncrementOrArray
)
;
}
;
}
Usage
â
let
snap
=
getDirectionalSnapFunc
(
5
)
;
// returns a function that snaps any value to the closest increment of 5 in a particular direction
console
.
log
(
snap
(
2
,
1
)
)
;
// 5
console
.
log
(
snap
(
3.5
,
-
1
)
)
;
// 0
console
.
log
(
snap
(
19
,
-
1
)
)
;
// 15
Note that you can use an Array of values instead of an increment. Super convenient!
Previous
compensatedSkew
Next
easeToLinear
Contents
Usage
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