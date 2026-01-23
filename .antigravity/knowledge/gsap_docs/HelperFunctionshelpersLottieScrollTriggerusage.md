LottieScrollTrigger | GSAP | Docs & Learning
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
LottieScrollTrigger
On this page
Hook a Lottie animation up to ScrollTrigger
If you create an animation in After Effects and export it using
Lottie
, you can hook it up to the scroll position with this handy function so that as the user scrolls, the animation progresses:
function
LottieScrollTrigger
(
vars
)
{
let
playhead
=
{
frame
:
0
}
,
target
=
gsap
.
utils
.
toArray
(
vars
.
target
)
[
0
]
,
speeds
=
{
slow
:
"+=2000"
,
medium
:
"+=1000"
,
fast
:
"+=500"
}
,
st
=
{
trigger
:
target
,
pin
:
true
,
start
:
"top top"
,
end
:
speeds
[
vars
.
speed
]
||
"+=1000"
,
scrub
:
1
,
}
,
ctx
=
gsap
.
context
&&
gsap
.
context
(
)
,
animation
=
lottie
.
loadAnimation
(
{
container
:
target
,
renderer
:
vars
.
renderer
||
"svg"
,
loop
:
false
,
autoplay
:
false
,
path
:
vars
.
path
,
rendererSettings
:
vars
.
rendererSettings
||
{
preserveAspectRatio
:
"xMidYMid slice"
,
}
,
}
)
;
for
(
let
p
in
vars
)
{
// let users override the ScrollTrigger defaults
st
[
p
]
=
vars
[
p
]
;
}
animation
.
addEventListener
(
"DOMLoaded"
,
function
(
)
{
let
createTween
=
function
(
)
{
animation
.
frameTween
=
gsap
.
to
(
playhead
,
{
frame
:
animation
.
totalFrames
-
1
,
ease
:
"none"
,
onUpdate
:
(
)
=>
animation
.
goToAndStop
(
playhead
.
frame
,
true
)
,
scrollTrigger
:
st
,
}
)
;
return
(
)
=>
animation
.
destroy
&&
animation
.
destroy
(
)
;
}
;
ctx
&&
ctx
.
add
?
ctx
.
add
(
createTween
)
:
createTween
(
)
;
// in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
ScrollTrigger
.
sort
(
)
;
ScrollTrigger
.
refresh
(
)
;
}
)
;
return
animation
;
}
Usage
â
LottieScrollTrigger
(
{
target
:
"#animationWindow"
,
path
:
"https://assets.codepen.io/35984/tapered\_hello.json"
,
speed
:
"medium"
,
scrub
:
2
,
// seconds it takes for the playhead to "catch up"
// you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See /docs/v3/Plugins/ScrollTrigger
}
)
;
DEMO
loading...
Special thanks to Chris Gannon for his work on a
tool
that inspired this.
Previous
stopOverscroll
Next
addWeightedEases
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