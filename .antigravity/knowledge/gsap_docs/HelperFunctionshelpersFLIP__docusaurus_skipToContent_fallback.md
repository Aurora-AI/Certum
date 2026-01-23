Flip | GSAP | Docs & Learning
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
Flip
Flip
If you're shifting things around in the DOM and then you want elements to animate to their new positions, the most full-featured way to handle it is with the
Flip Plugin
, but if you're only doing basic things you can use this helper function (see the comments at the top to learn how to use it):
/\*
Copy this to your project. Pass in the elements (selector text or NodeList or Array), then a
function/callback that actually performs your DOM changes, and optionally a vars
object that contains any of the following properties to customize the transition:
- duration [Number] - duration (in seconds) of each animation
- stagger [Number | Object | Function] - amount to stagger the starting time of each animation. You may use advanced staggers too (see https://codepen.io/GreenSock/pen/jdawKx)
- ease [Ease] - controls the easing of the animation. Like "power2.inOut", or "elastic", etc.
- onComplete [Function] - a callback function that should be called when all the animation has completed.
- delay [Number] - time (in seconds) that should elapse before any of the animations begin.
This function will return a Timeline containing all the animations.
\*/
function
flip
(
elements
,
changeFunc
,
vars
)
{
elements
=
gsap
.
utils
.
toArray
(
elements
)
;
vars
=
vars
||
{
}
;
let
tl
=
gsap
.
timeline
(
{
onComplete
:
vars
.
onComplete
,
delay
:
vars
.
delay
||
0
,
}
)
,
bounds
=
elements
.
map
(
(
el
)
=>
el
.
getBoundingClientRect
(
)
)
,
copy
=
{
}
,
p
;
elements
.
forEach
(
(
el
)
=>
{
el
.
\_flip
&&
el
.
\_flip
.
progress
(
1
)
;
el
.
\_flip
=
tl
;
}
)
;
changeFunc
(
)
;
for
(
p
in
vars
)
{
p
!==
"onComplete"
&&
p
!==
"delay"
&&
(
copy
[
p
]
=
vars
[
p
]
)
;
}
copy
.
x
=
(
i
,
element
)
=>
"+="
+
(
bounds
[
i
]
.
left
-
element
.
getBoundingClientRect
(
)
.
left
)
;
copy
.
y
=
(
i
,
element
)
=>
"+="
+
(
bounds
[
i
]
.
top
-
element
.
getBoundingClientRect
(
)
.
top
)
;
return
tl
.
from
(
elements
,
copy
)
;
}
DEMO
loading...
Previous
easeToLinear
Next
formatNumber
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