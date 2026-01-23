tickGSAPWhileHidden | GSAP | Docs & Learning
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
tickGSAPWhileHidden
Force GSAP to update while in hidden tab
Most browsers pause requestAnimationFrame() calls while a browser tab is hidden in order to reduce CPU/battery drain, but if you'd like GSAP to continue to update (at a reduced rate, typically about 2fps due to browsers throttling setInterval()/setTimeout()), you can use this function:
function
tickGSAPWhileHidden
(
value
)
{
if
(
value
===
false
)
{
document
.
removeEventListener
(
"visibilitychange"
,
tickGSAPWhileHidden
.
fn
)
;
return
clearInterval
(
tickGSAPWhileHidden
.
id
)
;
}
const
onChange
=
(
)
=>
{
clearInterval
(
tickGSAPWhileHidden
.
id
)
;
if
(
document
.
hidden
)
{
gsap
.
ticker
.
lagSmoothing
(
0
)
;
// keep the time moving forward (don't adjust for lag)
tickGSAPWhileHidden
.
id
=
setInterval
(
gsap
.
ticker
.
tick
,
500
)
;
}
else
{
gsap
.
ticker
.
lagSmoothing
(
500
,
33
)
;
// restore lag smoothing
}
}
;
document
.
addEventListener
(
"visibilitychange"
,
onChange
)
;
tickGSAPWhileHidden
.
fn
=
onChange
;
onChange
(
)
;
// in case the document is currently hidden.
}
tickGSAPWhileHidden
(
true
)
;
Previous
smoothOriginChange
Next
trackDirection
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