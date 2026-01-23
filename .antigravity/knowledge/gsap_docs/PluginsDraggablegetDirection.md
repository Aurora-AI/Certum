getDirection | GSAP | Docs & Learning
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
methods
.getDirection()
On this page
getDirection
getDirection
( from:String | Element ) : String
Returns the
direction
(
"right"
|
"left"
|
"up"
|
"down"
|
"left-up"
|
"left-down"
|
"right-up"
|
"right-down"
) as measured from either where the drag started (the default) or the moment-by-moment velocity, or its proximity to another element that you define.
Parameters
from
: String | Element
Any of the the following can be used:
Returns : String
â
The direction of the Draggable instance.
Details
â
Sometimes it's useful to know which direction an element is dragged (
"left"
|
"right"
|
"up"
|
"down"
|
"left-up"
|
"left-down"
|
"right-up"
|
"right-down"
), or maybe you'd like to know which direction it is compared to another element. That's precisely what
getDirection()
is for. You can pass any of the following as the parameter to control its behavior:
"start"
(the default) - Measures from wherever the drag began.
"velocity"
(
requires
InertiaPlugin
!) - Measures the moment-by-moment direction of the drag. For example, maybe the user dragged really far to the right, but then they start dragging to the left for a brief moment - it's still to the right of the starting position, but it's current velocity is moving to the left. That's what
velocity
measures.
[element]
- If you pass an element, it'll return the direction from that element's center to the Draggable's center.
loading...
Previous
Draggable.get()
Next
Draggable.hitTest()
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