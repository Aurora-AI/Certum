imageSequenceScrub | GSAP | Docs & Learning
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
imageSequenceScrub
Scrub through a
image sequence
Create an Array of image URLs, feed it to this helper function along with a reference to your
object and a ScrollTrigger config object to have it scrub through those, drawing the appropriate one to the canvas.
DEMO
loading...
/\*
Helper function that handles scrubbing through a sequence of images, drawing the appropriate one to the provided canvas.
Config object properties:
- urls [Array]: an Array of image URLs
- canvas [Canvas]: the  object to draw to
- scrollTrigger [Object]: an optional ScrollTrigger configuration object like {trigger: "#trigger", start: "top top", end: "+=1000", scrub: true, pin: true}
- onUpdate [Function]: optional callback for when the Tween updates (probably not used very often)
Returns a Tween instance
\*/
function
imageSequence
(
config
)
{
let
playhead
=
{
frame
:
0
}
,
ctx
=
gsap
.
utils
.
toArray
(
config
.
canvas
)
[
0
]
.
getContext
(
"2d"
)
,
onUpdate
=
config
.
onUpdate
,
images
,
updateImage
=
function
(
)
{
ctx
.
drawImage
(
images
[
Math
.
round
(
playhead
.
frame
)
]
,
0
,
0
)
;
onUpdate
&&
onUpdate
.
call
(
this
)
;
}
;
images
=
config
.
urls
.
map
(
(
url
,
i
)
=>
{
let
img
=
new
Image
(
)
;
img
.
src
=
url
;
i
||
(
img
.
onload
=
updateImage
)
;
return
img
;
}
)
;
return
gsap
.
to
(
playhead
,
{
frame
:
images
.
length
-
1
,
ease
:
"none"
,
onUpdate
:
updateImage
,
scrollTrigger
:
config
.
scrollTrigger
}
)
;
}
Usage:
imageSequence
(
{
urls
,
// Array of image URLs
canvas
:
"#image-sequence"
,
//  object to draw images to
scrollTrigger
:
{
start
:
0
,
// start at the very top
end
:
"max"
,
// entire page
scrub
:
true
// important!
}
}
)
;
Previous
getScrollPosition
Next
killChildTweensOf
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