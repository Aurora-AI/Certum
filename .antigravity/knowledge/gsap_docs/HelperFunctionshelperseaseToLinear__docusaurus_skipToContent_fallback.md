easeToLinear | GSAP | Docs & Learning
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
easeToLinear
Estimate where an ease will hit a certain value
An ease accepts a normalized progress value (0-1) and returns the corresponding eased value, but what if you want to know when that eased value will hit a specific ratio like 0.7? For example, a
"power2.out"
ease may hit 0.7 when the linear progress is only around 0.33. This function lets you feed in that 0.7 and get the linear progress value (0.33 in this example):
function
easeToLinear
(
ease
,
ratio
,
precision
=
0.0001
)
{
ease
=
gsap
.
parseEase
(
ease
)
;
let
t
=
0
,
dif
=
ratio
-
ease
(
t
)
,
inc
=
dif
/
2
,
newDif
;
while
(
Math
.
abs
(
dif
)
>
precision
)
{
newDif
=
ratio
-
ease
(
(
t
+=
inc
)
)
;
newDif
<
0
!==
inc
<
0
&&
(
inc
\*=
Math
.
max
(
-
0.5
,
newDif
/
dif
)
)
;
dif
=
newDif
;
}
return
t
+
(
(
ratio
-
ease
(
t
+
inc
)
)
/
dif
)
\*
-
inc
;
}
More practical use: let's say you're animating a value from 100 to 500 with a
"power2.out"
ease and you want to estimate the linear progress value (between 0 and 1) where it'll hit 250 according to that ease - you could leverage this function like:
let
from
=
100
,
to
=
500
,
targetValue
=
250
,
progress
=
easeToLinear
(
"power2"
,
(
targetValue
-
from
)
/
(
to
-
from
)
,
0.00001
)
;
Previous
getDirectionalSnapFunc
Next
Flip
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