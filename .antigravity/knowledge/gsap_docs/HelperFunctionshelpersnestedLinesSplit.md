nestedLinesSplit | GSAP | Docs & Learning
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
nestedLinesSplit
On this page
SplitText lines in nested elements
SplitText doesn't natively support splitting nested elements by "lines", but if you really need that we've put together a helper function for it.
function
nestedLinesSplit
(
target
,
vars
)
{
var
split
=
SplitText
.
create
(
target
,
vars
)
,
words
=
vars
.
type
.
indexOf
(
"words"
)
!==
-
1
,
chars
=
vars
.
type
.
indexOf
(
"chars"
)
!==
-
1
,
insertAt
=
function
(
a
,
b
,
i
)
{
//insert the elements of array "b" into array "a" at index "i"
var
l
=
b
.
length
,
j
;
for
(
j
=
0
;
j
<
l
;
j
++
)
{
a
.
splice
(
i
++
,
0
,
b
[
j
]
)
;
}
return
l
;
}
,
children
,
child
,
i
;
if
(
typeof
target
===
"string"
)
{
target
=
document
.
querySelectorAll
(
target
)
;
}
if
(
target
.
length
>
1
)
{
for
(
i
=
0
;
i
<
target
.
length
;
i
++
)
{
split
.
lines
=
split
.
lines
.
concat
(
nestedLinesSplit
(
target
[
i
]
,
vars
)
.
lines
)
;
}
return
split
;
}
//mark all the words and character elements as \_protected so that we can identify the non-split stuff.
children
=
(
words
?
split
.
words
:
[
]
)
.
concat
(
chars
?
split
.
chars
:
[
]
)
;
for
(
i
=
0
;
i
<
children
.
length
;
i
++
)
{
children
[
i
]
.
\_protect
=
true
;
}
children
=
split
.
lines
;
for
(
i
=
0
;
i
<
children
.
length
;
i
++
)
{
child
=
children
[
i
]
.
firstChild
;
//if the first child isn't protected and it's not a text node, we found a nested element that we must bust up into lines.
if
(
!
child
.
\_protect
&&
child
.
nodeType
!==
3
)
{
children
[
i
]
.
parentNode
.
insertBefore
(
child
,
children
[
i
]
)
;
children
[
i
]
.
parentNode
.
removeChild
(
children
[
i
]
)
;
children
.
splice
(
i
,
1
)
;
i
+=
insertAt
(
children
,
nestedLinesSplit
(
child
,
vars
)
.
lines
,
i
)
-
1
;
}
}
return
split
;
}
//used like
var
mySplitText
=
nestedLinesSplit
(
assetTexts
,
{
type
:
"lines"
}
)
;
Demo
â
loading...
Previous
killChildTweensOf
Next
pluckRandomFrom
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