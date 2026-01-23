weightedRandom | GSAP | Docs & Learning
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
weightedRandom
Weighted Random
Have more control over the numbers you pick by providing this function an ease curve of your choice!
// reusable function. Feed in an array and an ease and it'll return
// a function that pulls a random element from that array, weighted
// according to the ease you provide.
function
weightedRandom
(
collection
,
ease
)
{
return
gsap
.
utils
.
pipe
(
Math
.
random
,
//random number between 0 and 1
gsap
.
parseEase
(
ease
)
,
//apply the ease
gsap
.
utils
.
mapRange
(
0
,
1
,
-
0.5
,
collection
.
length
-
0.5
)
,
//map to the index range of the array, stretched by 0.5 each direction because we'll round and want to keep distribution (otherwise linear distribution would be center-weighted slightly)
gsap
.
utils
.
snap
(
1
)
,
//snap to the closest integer
i
=>
collection
[
i
]
//return that element from the array
)
;
}
// usage:
var
myArray
=
[
0
,
1
,
2
,
3
]
,
getRandom
=
weightedRandom
(
myArray
,
"power4"
)
;
// now you can call it anytime and it'll pull a random element from myArray, weighted toward the end.
getRandom
(
)
;
getRandom
(
)
;
...
info
For a deeper look at how to use the weightedRandom function, check out this video from the
"GSAP 3: Beyond the Basics" course
by Snorkl.tv - one of the best ways to learn more about GSAP.
Previous
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