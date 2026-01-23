blendEases | GSAP | Docs & Learning
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
blendEases
Blend two eases
If you need one ease at the start of your animation, and a different one at the end, you can use this function to blend them!
//just feed in the starting ease and the ending ease (and optionally an ease to do ﻿the blending), and it'll return a new Ease that's...blended!
function
blendEases
(
startEase
,
endEase
,
blender
)
{
var
parse
=
function
(
ease
)
{
return
typeof
ease
===
"function"
?
ease
:
gsap
.
parseEase
(
"power4.inOut"
)
;
}
,
s
=
gsap
.
parseEase
(
startEase
)
,
e
=
gsap
.
parseEase
(
endEase
)
,
blender
=
parse
(
blender
)
;
return
function
(
v
)
{
var
b
=
blender
(
v
)
;
return
s
(
v
)
\*
(
1
-
b
)
+
e
(
v
)
\*
b
;
}
;
}
//example usage:
gsap
.
to
(
"#target"
,
{
duration
:
2
,
x
:
100
,
ease
:
blendEases
(
"back.in(1.2)"
,
"bounce"
)
,
}
)
;
DEMO
loading...
If you need to
invert
an ease instead, see
this demo
for a different helper function.
Previous
bgSize
Next
callAfterResize
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