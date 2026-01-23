alignOrigins | GSAP | Docs & Learning
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
alignOrigins
Align transformOrigin of two elements smoothly
Instantly change the
transformOrigin
of one element to align with another element's
transformOrigin
without a jump (requires
MotionPathPlugin
):
// fromElement is the one whose transformOrigin should change to match up with the toElement's transformOrigin.
function
alignOrigins
(
fromElement
,
toElement
)
{
let
[
fromEl
,
toEl
]
=
gsap
.
utils
.
toArray
(
[
fromElement
,
toElement
]
)
,
a
=
window
.
getComputedStyle
(
toEl
)
.
transformOrigin
.
split
(
" "
)
,
newOrigin
=
MotionPathPlugin
.
convertCoordinates
(
toEl
,
fromEl
,
{
x
:
parseFloat
(
a
[
0
]
)
,
y
:
parseFloat
(
a
[
1
]
)
,
}
)
,
bounds1
=
fromEl
.
getBoundingClientRect
(
)
,
bounds2
;
gsap
.
set
(
fromEl
,
{
transformOrigin
:
newOrigin
.
x
+
"px "
+
newOrigin
.
y
+
"px"
,
}
)
;
bounds2
=
fromEl
.
getBoundingClientRect
(
)
;
gsap
.
set
(
fromEl
,
{
x
:
"+="
+
(
bounds1
.
left
-
bounds2
.
left
)
,
y
:
"+="
+
(
bounds1
.
top
-
bounds2
.
top
)
,
}
)
;
}
Previous
addWeightedEases
Next
anchorsToProgress
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