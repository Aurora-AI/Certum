bgSize | GSAP | Docs & Learning
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
bgSize
On this page
Animating backgroundSize:"cover" or "contain"
I was asked about animating to or from a
backgroundSize
of
"cover"
or
"contain"
with GSAP. ï»¿
The problem:
GSAP interpolates between numbers, but how is it supposed to interpolate between something like "300px 250px" and "contain" (not a number)? So I whipped together a function that basically translates "contain" or "cover" into their px-based equivalents for that particular element at whatever size it is then. Once we've got it converted, it's easy tï»¿o animate.
/\*
config is optional and can have any of the following properties:
- size [string] - the size to set and convert into px before it gets returned, like "cover" or "150% auto".
- nativeWidth [number] - native width of the image (in pixels)
- nativeHeight [number] - native height of the image (in pixels)
Simple example:
// returns current backgroundSize in px
bgSize(".class");
Advanced example:
// sets the backgroundSize to "cover" and returns it in the equivalent px-based amount assuming the image's native width is 600px and height is 400px.
bgSize(".class", {size: "cover", nativeWidth: 600, nativeHeight: 400});
Note: if you can define the nativeWidth and nativeHeight, it helps becaues it can skip tasks like creating
an Image and loading the URL to detect the native size automatically. Sometimes images don't load fast enough,
so skipping that step avoids the whole issue.
\*/
function
bgSize
(
element
,
config
)
{
config
=
config
||
{
}
;
let
e
=
gsap
.
utils
.
toArray
(
element
)
[
0
]
,
cs
=
window
.
getComputedStyle
(
e
)
,
imageUrl
=
cs
.
backgroundImage
,
{
nativeWidth
,
nativeHeight
}
=
config
,
size
=
config
.
size
||
cs
.
backgroundSize
,
image
,
w
,
h
,
ew
,
eh
,
ratio
;
if
(
imageUrl
&&
(
!
/
\d
/
g
.
test
(
size
)
||
size
.
indexOf
(
"%"
)
>
-
1
)
)
{
if
(
!
nativeWidth
||
!
nativeHeight
)
{
image
=
new
Image
(
)
;
image
.
setAttribute
(
"src"
,
imageUrl
.
replace
(
/
(
^
url
\(
"
|
^
url
\(
'
|
^
url
\(
|
"
\)
$
|
'
\)
$
|
\)
$
)
/
gi
,
""
)
)
;
nativeWidth
=
image
.
naturalWidth
;
nativeHeight
=
image
.
naturalHeight
;
}
ew
=
e
.
offsetWidth
;
eh
=
e
.
offsetHeight
;
if
(
!
nativeWidth
||
!
nativeHeight
)
{
console
.
log
(
"bgSize() failed;"
,
imageUrl
,
"hasn't loaded yet."
)
;
nativeWidth
=
ew
;
nativeHeight
=
eh
;
}
ratio
=
nativeWidth
/
nativeHeight
;
if
(
size
===
"cover"
||
size
===
"contain"
)
{
if
(
(
size
===
"cover"
)
===
nativeWidth
/
ew
>
nativeHeight
/
eh
)
{
h
=
eh
;
w
=
eh
\*
ratio
;
}
else
{
w
=
ew
;
h
=
ew
/
ratio
;
}
}
else
{
// "auto" or %
size
=
size
.
split
(
" "
)
;
size
.
push
(
""
)
;
w
=
~
size
[
0
]
.
indexOf
(
"%"
)
?
(
ew
\*
parseFloat
(
size
[
0
]
)
)
/
100
:
nativeWidth
;
h
=
~
size
[
1
]
.
indexOf
(
"%"
)
?
(
eh
\*
parseFloat
(
size
[
1
]
)
)
/
100
:
nativeHeight
;
}
size
=
Math
.
ceil
(
w
)
+
"px "
+
Math
.
ceil
(
h
)
+
"px"
;
config
.
size
&&
(
e
.
style
.
backgroundSize
=
size
)
;
}
return
size
;
}
Demo
â
loading...
BackgroundSizePlugin
â
For even more flexibility, you can use this unofficial plugin for animating the backgroundSize to/from "cover" or "contain" and it'll even let you apply a scale to the value. Plus if you animate to "cover" or "contain", it will actually set it to that value (instead of the pixel-based equivalent) so that it's responsive after the tween:
loading...
Previous
anchorsToProgress
Next
blendEases
Contents
Demo
BackgroundSizePlugin
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