addWeightedEases | GSAP | Docs & Learning
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
addWeightedEases
Weighted eases
Here's a useful function that'll let you feed in a ratio between -1 and 1 to any of the standard (non-configurable) eases to make them "weighted" in one direction or the other, as if it's pulling the ease curve toward the start or the end. A ratio of "0" won't be weighted either way, -1 would be weighted toward the "in" portion of the ease, and 1 is weighted toward the "out" portion.
function
addWeightedEases
(
)
{
let
eases
=
gsap
.
parseEase
(
)
,
createConfig
=
(
ease
)
=>
(
ratio
)
=>
{
let
y
=
0.5
+
ratio
/
2
;
return
(
p
)
=>
ease
(
2
\*
(
1
-
p
)
\*
p
\*
y
+
p
\*
p
)
;
}
;
for
(
let
p
in
eases
)
{
if
(
!
eases
[
p
]
.
config
)
{
eases
[
p
]
.
config
=
createConfig
(
eases
[
p
]
)
;
}
}
}
//example usage:
ease
:
"power2.inOut(0.5)"
;
// weighted halfway to the "out" portion
ease
:
"power2.inOut(-0.2)"
;
// weighted slightly to the "in" portion
ease
:
"power2.inOut(-1)"
;
// weighted ALL THE WAY to the "in" portion
ease
:
"power2.inOut(1)"
;
// weighted ALL THE WAY to the "out" portion
After you run that function once, you can basically configure any of the standard eases like
power2.inOut
or
power1.in
(or whatever) by adding parenthesis with a number indicating how you'd like to weight the ease in one direction or the other. And again, it works with any standard ease that doesn't already have a configuration option (like "steps()", "slow()", etc.)
Previous
LottieScrollTrigger
Next
alignOrigins
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