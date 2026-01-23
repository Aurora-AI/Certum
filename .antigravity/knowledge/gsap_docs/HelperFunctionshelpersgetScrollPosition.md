getScrollPosition | GSAP | Docs & Learning
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
getScrollPosition
Get the scroll position associated with a particular ScrollTriggered animation
Perhaps you want to scroll the page to the exact spot where a particular scroll-triggered animation starts (or ends or any progress value) - just feed this helper function your animation (it must have a ScrollTrigger of course) and optionally a progress value (0 is when the animation starts, 0.5 is halfway through, 1 is the end) and it'll return the scroll position which you could feed into a scrollTo tween, for example:
function
getScrollPosition
(
animation
,
progress
)
{
let
p
=
gsap
.
utils
.
clamp
(
0
,
1
,
progress
||
0
)
,
st
=
animation
.
scrollTrigger
,
containerAnimation
=
st
.
vars
.
containerAnimation
;
if
(
containerAnimation
)
{
let
time
=
st
.
start
+
(
st
.
end
-
st
.
start
)
\*
p
;
st
=
containerAnimation
.
scrollTrigger
;
return
(
st
.
start
+
(
st
.
end
-
st
.
start
)
\*
(
time
/
containerAnimation
.
duration
(
)
)
)
;
}
return
st
.
start
+
(
st
.
end
-
st
.
start
)
\*
p
;
}
It even works with the "containerAnimation" feature:
loading...
Previous
getScrollLookup
Next
imageSequenceScrub
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