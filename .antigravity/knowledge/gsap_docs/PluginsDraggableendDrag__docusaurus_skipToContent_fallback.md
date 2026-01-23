endDrag | GSAP | Docs & Learning
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
.endDrag()
On this page
endDrag
endDrag
( event:Object ) : void
You may force the Draggable to immediately stop interactively dragging by calling
endDrag()
and passing it the original mouse or touch event that initiated the stop - this is necessary because Draggable must inspect that event for various information like
pageX
,
pageY
,
target
, etc.
Parameters
event
: Object
A mouse or touch event.
Details
â
You may force the Draggable to immediately stop interactively dragging by calling
endDrag()
and passing it the original mouse or touch event that initiated the stop - this is necessary because Draggable must inspect that event for various information like
pageX
,
pageY
,
target
, etc. You cannot call
endDrag()
without passing that original event.
endDrag()
is different than
disable()
in that
disable()
completely shuts down the Draggable instance so that the user cannot initiate dragging anymore whereas
endDrag()
simply stops a drag-in-progress, acting like the user released their mouse/touch.
Previous
.enabled()
Next
Draggable.get()
Contents
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