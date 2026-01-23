formatNumber | GSAP | Docs & Learning
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
formatNumber
Format number with commas and limited decimal places
Take a number like 1000.254145 and format it into a string like "1,000.25".
// adds commas and forces 2 decimal places.
function
formatNumber
(
value
,
decimals
)
{
let
s
=
(
+
value
)
.
toLocaleString
(
"en-US"
)
.
split
(
"."
)
;
return
decimals
?
s
[
0
]
+
"."
+
(
(
s
[
1
]
||
""
)
+
"00000000"
)
.
substr
(
0
,
decimals
)
:
s
[
0
]
;
}
Then you can use it in an onUpdate:
let
obj
=
{
num
:
100
}
;
gsap
.
to
(
obj
,
{
num
:
10500
,
onUpdate
:
(
)
=>
(
myElement
.
innerText
=
"$"
+
formatNumber
(
obj
.
num
,
2
)
)
,
}
)
;
getFormatter
I wasn't sure if you wanted to replace this file or create a new helper Jack? Thought as it's not urgent I would just partially do this so that you can give updating the docs a go?
function
getFormatter
(
increment
,
pad
)
{
let
snap
=
gsap
.
utils
.
snap
(
increment
)
,
exp
=
/
\B
(?=
(
\d
{3}
)
+
(?!
\d
)
)
/
g
,
snapWithCommas
=
value
=>
(
snap
(
+
value
)
+
""
)
.
replace
(
exp
,
","
)
,
whole
=
increment
%
1
===
0
,
decimals
=
whole
?
0
:
(
(
increment
+
""
)
.
split
(
"."
)
[
1
]
||
"0"
)
.
length
;
return
!
pad
||
whole
?
snapWithCommas
:
value
=>
{
let
s
=
snapWithCommas
(
value
)
,
i
=
s
.
indexOf
(
"."
)
;
~
i
||
(
i
=
s
.
length
)
;
return
s
.
substr
(
0
,
i
)
+
"."
+
(
s
.
substr
(
i
+
1
,
s
.
length
-
i
-
1
)
+
"00000000"
)
.
substr
(
0
,
decimals
)
;
}
;
}
let
formatter
=
getFormatter
(
0.01
,
true
)
;
// increment by 0.01, always pad so that there are 2 decimal places
console
.
log
(
formatter
(
5000.1
)
)
;
// 5,000.10
Previous
Flip
Next
getNestedLabelTime
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