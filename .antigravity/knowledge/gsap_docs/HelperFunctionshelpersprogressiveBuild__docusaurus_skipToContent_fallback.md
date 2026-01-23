progressiveBuild | GSAP | Docs & Learning
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
progressiveBuild
On this page
Step-by-step function calls progressively build timeline
Maybe you can't pre-build your entire timeline because you need to call individual functions in a sequenced fashion. Perhaps they each change the state of elements, creating an animation that must finish before the next step (function) is called. This helper function lets you organize your code quite easily into a simple sequence of arguments you pass, and you can even have a delay between each step:
function
progressiveBuild
(
)
{
let
data
=
Array
.
from
(
arguments
)
,
i
=
0
,
tl
=
gsap
.
timeline
(
{
onComplete
:
function
(
)
{
let
isNum
=
typeof
data
[
i
]
===
"number"
,
delay
=
isNum
?
data
[
i
++
]
:
0
,
func
=
data
[
i
++
]
;
typeof
func
===
"function"
&&
tl
.
add
(
func
(
)
,
"+="
+
delay
)
;
}
,
}
)
;
tl
.
vars
.
onComplete
(
)
;
return
tl
;
}
Usage
â
progressiveBuild
(
step1
,
step2
,
1.5
,
// 1.5-second delay (sprinkle between any two functions)
step3
)
;
Previous
pluckRandomFrom
Next
smoothOriginChange
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