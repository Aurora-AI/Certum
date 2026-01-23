trackDirection | GSAP | Docs & Learning
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
trackDirection
On this page
trackDirection
Need an onReverse()? Track the playhead direction of any animation
â
If you find yourself needing an onReverse() callback (which doesn't exist) or a way to get notified when the playhead changes direction, this is a very useful helper function. What makes it special is that it works no matter how deeply-nested the animation is. Remember, the parent or parent's parent could get reversed or a negative timeScale which directly affects how the playhead sweeps across the descendants.
function
trackDirection
(
value
)
{
typeof
value
!==
"object"
&&
(
value
=
{
onUpdate
:
value
}
)
;
let
prevTime
=
0
,
prevReversed
=
false
,
anim
=
value
.
eventCallback
?
value
:
value
.
animation
,
onUpdate
=
value
.
onUpdate
,
onToggle
=
value
.
onToggle
;
return
anim
?
anim
.
eventCallback
(
"onUpdate"
,
trackDirection
(
{
onUpdate
:
onUpdate
,
onToggle
:
onToggle
}
)
)
:
function
(
)
{
let
time
=
this
.
totalTime
(
)
,
reversed
=
time
<
prevTime
;
this
.
direction
=
reversed
?
-
1
:
1
;
if
(
reversed
!==
prevReversed
)
{
onToggle
&&
onToggle
.
call
(
this
,
this
.
direction
)
;
prevReversed
=
reversed
;
}
prevTime
=
time
;
onUpdate
&&
onUpdate
.
call
(
this
,
this
.
direction
)
;
}
;
}
Usage
â
Choose from any of the following:
Directly as a callback (it returns a function):
gsap
.
to
(
...
{
onUpdate
:
trackDirection
(
)
,
...
}
)
Assigned to the animation:
let
tl
=
gsap
.
timeline
(
)
;
trackDirection
(
tl
)
;
You can add configuration options (onToggle and/or onUpdate):
gsap
.
to
(
...
{
x
:
100
,
onUpdate
:
trackDirection
(
{
onToggle
:
(
direction
)
=>
console
.
log
(
"toggled direction to"
,
direction
)
,
onUpdate
:
(
direction
)
=>
console
.
log
(
"updated animation"
)
,
}
)
,
}
)
;
Or when assigned to the animation:
trackDirection
(
{
animation
:
tl
,
onToggle
:
(
direction
)
=>
console
.
log
(
"toggled direction to"
,
direction
)
,
onUpdate
:
(
direction
)
=>
console
.
log
(
"updated animation"
)
,
}
)
;
warning
since "direction" is set whenever the playhead changes position, it won't update immediately. For example, if you call tween.reverse() and then immediately check (before the next tick), tween.direction will still report as 1 because the playhead hasn't moved yet.
Demo
â
loading...
Previous
tickGSAPWhileHidden
Next
weightedRandom
Contents
Need an onReverse()? Track the playhead direction of any animation
Usage
Demo
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