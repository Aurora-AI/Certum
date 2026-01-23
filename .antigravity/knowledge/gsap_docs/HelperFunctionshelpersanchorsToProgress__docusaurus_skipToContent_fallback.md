anchorsToProgress | GSAP | Docs & Learning
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
anchorsToProgress
On this page
Calculate progress values for anchor points along a path
Calculate all the progress values for the anchor points on a path so that, for example, you could use DrawSVG to animate point-by-point (requires
MotionPathPlugin
):
// returns an array with the progress value (between 0 and 1) for each anchor along the path
function
anchorsToProgress
(
rawPath
,
resolution
)
{
resolution
=
~
~
resolution
||
12
;
if
(
!
Array
.
isArray
(
rawPath
)
)
{
rawPath
=
MotionPathPlugin
.
getRawPath
(
rawPath
)
;
}
MotionPathPlugin
.
cacheRawPathMeasurements
(
rawPath
,
resolution
)
;
let
progress
=
[
0
]
,
length
,
s
,
i
,
e
,
segment
,
samples
;
for
(
s
=
0
;
s
<
rawPath
.
length
;
s
++
)
{
segment
=
rawPath
[
s
]
;
samples
=
segment
.
samples
;
e
=
segment
.
length
-
6
;
for
(
i
=
0
;
i
<
e
;
i
+=
6
)
{
length
=
samples
[
(
i
/
6
+
1
)
\*
resolution
-
1
]
;
progress
.
push
(
length
/
rawPath
.
totalLength
)
;
}
}
return
progress
;
}
Demo
â
loading...
Previous
alignOrigins
Next
bgSize
Contents
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