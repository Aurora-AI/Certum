static-defaultRender | GSAP | Docs & Learning
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
CSSRule
Draggable
DrawSVG
Easel
GSDevTools
Inertia
MorphSVG
properties
MorphSVGPlugin.defaultRender
MorphSVGPlugin.defaultType
MorphSVGPlugin.defaultUpdateTarget
methods
MorphSVGPlugin.convertToPath()
MorphSVGPlugin.rawPathToString()
MorphSVGPlugin.stringToRawPath()
MotionPath
MotionPathHelper
Observer
Physics2D
PhysicsProps
Pixi
ScrambleText
ScrollTo
Text
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
more plugins
MorphSVG
properties
MorphSVGPlugin.defaultRender
On this page
MorphSVGPlugin
.defaultRender
MorphSVGPlugin
.defaultRender
: Function
Sets the default function that should be called whenever a morphSVG tween updates. This is useful if you're rendering to
.
Details
â
Sets the default function that should be called whenever a morphSVG tween updates. This is useful if you're rendering to
.
Video explanation
â
Demo: MorphSVG canvas rendering
â
loading...
Here's an example of a tween and a render function that'd draw the morphing shape to canvas:
var
canvas
=
document
.
querySelector
(
"canvas"
)
,
ctx
=
canvas
.
getContext
(
"2d"
)
,
vw
=
(
canvas
.
width
=
window
.
innerWidth
)
,
vh
=
(
canvas
.
height
=
window
.
innerHeight
)
;
ctx
.
fillStyle
=
"#ccc"
;
MorphSVGPlugin
.
defaultRender
=
draw
;
gsap
.
to
(
"#hippo"
,
{
duration
:
2
,
morphSVG
:
"#circle"
}
)
;
function
draw
(
rawPath
,
target
)
{
var
l
,
segment
,
j
,
i
;
ctx
.
clearRect
(
0
,
0
,
vw
,
vh
)
;
ctx
.
beginPath
(
)
;
for
(
j
=
0
;
j
<
rawPath
.
length
;
j
++
)
{
segment
=
rawPath
[
j
]
;
l
=
segment
.
length
;
ctx
.
moveTo
(
segment
[
0
]
,
segment
[
1
]
)
;
for
(
i
=
2
;
i
<
l
;
i
+=
6
)
{
ctx
.
bezierCurveTo
(
segment
[
i
]
,
segment
[
i
+
1
]
,
segment
[
i
+
2
]
,
segment
[
i
+
3
]
,
segment
[
i
+
4
]
,
segment
[
i
+
5
]
)
;
}
if
(
segment
.
closed
)
{
ctx
.
closePath
(
)
;
}
}
ctx
.
fill
(
"evenodd"
)
;
}
Previous
MorphSVG
Next
MorphSVGPlugin.defaultType
Contents
Details
Video explanation
Demo: MorphSVG canvas rendering
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