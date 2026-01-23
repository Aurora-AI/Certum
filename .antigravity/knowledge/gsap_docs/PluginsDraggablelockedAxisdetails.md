lockedAxis | GSAP | Docs & Learning
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
properties
.autoScroll
.deltaX
.deltaY
.endRotation
.endX
.endY
.isPressed
.isThrowing
.lockAxis
.lockedAxis
.maxRotation
.maxX
.maxY
.minRotation
.minX
.minY
.pointerEvent
.pointerX
.pointerY
.rotation
.startX
.startY
.target
.tween
.vars
.x
.y
.zIndex
methods
.addEventListener()
.applyBounds()
Draggable.create()
.disable()
.enable()
.enabled()
.endDrag()
Draggable.get()
.getDirection()
Draggable.hitTest()
.kill()
.startDrag()
Draggable.timeSinceDrag()
.update()
DrawSVG
Easel
GSDevTools
Inertia
MorphSVG
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
Draggable
properties
.lockedAxis
On this page
lockedAxis
lockedAxis
: String
Returns : String
â
The axis along which movement is locked during that particular drag.
Details
â
Boolean
- The axis along which movement is locked (either
"x"
or
"y"
). For example, if
lockAxis
is
true
on a Draggable of
type: "x,y"
, and the user starts dragging horizontally,
lockedAxis
would be
"y"
because vertical movement won't be allowed during that drag. The
lockedAxis
property isn't set immediately upon press - the Draggable must wait to see which direction the user drags first. You can define a
onLockAxis
callback if you'd like to be notified when the axis gets locked.
lockedAxis
is also populated on touch-enabled devices when you have a Draggable whose type only permits it to drag along one axis (like
type: "x"
,
type: "y"
,
type: "left"
, or
type: "top"
) and the user touch-drags and the Draggable determines the direction, either allowing native touch-scrolling or Draggable-induced dragging.
Draggable
.
create
(
"#yourID"
,
{
type
:
"x,y"
,
lockAxis
:
true
,
onLockAxis
:
function
(
)
{
console
.
log
(
"locked axis: "
+
this
.
lockedAxis
)
;
}
,
}
)
;
Previous
.lockAxis
Next
.maxRotation
Contents
Returns : String
Details
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