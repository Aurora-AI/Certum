compensatedSkew | GSAP | Docs & Learning
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
compensatedSkew
"Compensated" skews
This is a special method that you can apply via an onUpdate to make a tween render skews in the old
skewType: "compensated"
way from GSAP 2. Note that it affects an element's scaleX/scaleY (hence "compensated")! This assumes skews are degree-based, and only works in GSAP 3. This is not an "officially supported" method.:
function
compensatedSkew
(
)
{
var
targets
=
this
.
targets
(
)
,
i
=
targets
.
length
,
DEG2RAD
=
Math
.
PI
/
180
,
target
,
scaleY
,
scaleX
,
cache
;
while
(
i
--
)
{
target
=
targets
[
i
]
;
cache
=
target
.
\_gsap
;
scaleY
=
cache
.
scaleY
;
scaleX
=
cache
.
scaleX
;
cache
.
scaleY
\*=
Math
.
cos
(
parseFloat
(
cache
.
skewX
)
\*
DEG2RAD
)
;
cache
.
scaleX
\*=
Math
.
cos
(
parseFloat
(
cache
.
skewY
)
\*
DEG2RAD
)
;
cache
.
renderTransform
(
1
,
cache
)
;
cache
.
scaleY
=
scaleY
;
cache
.
scaleX
=
scaleX
;
}
}
// usage:
gsap
.
set
(
target
,
{
skewX
:
-
30
,
onUpdate
:
compensatedSkew
}
)
;
Previous
callAfterResize
Next
getDirectionalSnapFunc
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