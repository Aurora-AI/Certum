getScrollLookup | GSAP | Docs & Learning
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
getScrollLookup
On this page
Get the scroll position associated with an element (ScrollTrigger-aware)
This function even takes ScrollTrigger pinning into account in most situations. Feed it your target elements and it'll return a function that you can call later, passing it a specific one of those target elements and it'll return the scroll position. It even adjusts when the viewport resizes (responsive).
/\*
Returns a FUNCTION that you can feed an element to get its scroll position.
- targets: selector text, element, or Array of elements
- config: an object with any of the following optional properties:
- start: defaults to "top top" but can be anything like "center center", "100px 80%", etc. Same format as "start" and "end" ScrollTrigger values.
- containerAnimation: the horizontal scrolling tween/timeline. Must have an ease of "none"/"linear".
- pinnedContainer: if you're pinning a container of the element(s), you must define it so that ScrollTrigger can make the proper accommodations.
\*/
function
getScrollLookup
(
targets
,
{
start
,
pinnedContainer
,
containerAnimation
}
)
{
let
triggers
=
gsap
.
utils
.
toArray
(
targets
)
.
map
(
(
el
)
=>
ScrollTrigger
.
create
(
{
trigger
:
el
,
start
:
start
||
"top top"
,
pinnedContainer
:
pinnedContainer
,
refreshPriority
:
-
10
,
containerAnimation
:
containerAnimation
,
}
)
)
,
st
=
containerAnimation
&&
containerAnimation
.
scrollTrigger
;
return
(
target
)
=>
{
let
t
=
gsap
.
utils
.
toArray
(
target
)
[
0
]
,
i
=
triggers
.
length
;
while
(
i
--
&&
triggers
[
i
]
.
trigger
!==
t
)
{
}
if
(
i
<
0
)
{
return
console
.
warn
(
"target not found"
,
target
)
;
}
return
containerAnimation
?
st
.
start
+
(
triggers
[
i
]
.
start
/
containerAnimation
.
duration
(
)
)
\*
(
st
.
end
-
st
.
start
)
:
triggers
[
i
]
.
start
;
}
;
}
Usage
â
let
getPosition
=
getScrollLookup
(
".section"
,
{
containerAnimation
:
horizontalTween
,
start
:
"center center"
,
}
)
;
// then later, use the function as many times as you want to look up any of the scroll position of any ".section" element
gsap
.
to
(
window
,
{
scrollTo
:
getPosition
(
"#your-element"
)
,
duration
:
1
,
}
)
;
loading...
Previous
getNestedLabelTime
Next
getScrollPosition
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