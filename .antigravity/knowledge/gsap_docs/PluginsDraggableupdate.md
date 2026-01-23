update | GSAP | Docs & Learning
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
.update()
On this page
update
update
( applyBounds:Boolean, sticky:Boolean ) : Draggable
Updates the Draggable's x/y properties to reflect the target element's current position.
Parameters
applyBounds
: Boolean
(default =
false
)
- if
true
, the Draggable's
applyBounds()
method will be called as well so that bounds are enforced (this takes more processing, though).
sticky
: Boolean
If
true
, the coordinates will be updated so that the Draggable "sticks" to the pointer which can be very helpful when reparenting an element. Otherwise, the element's positioning would naturally change when being nested into a different element.
Returns : Draggable
â
The Draggable instance itself (to make chaining possible).
Details
â
Updates the Draggable's
x
and
y
properties to reflect the target element's current position. This can be useful if, for example, you manually change or tween the element's position, but then you want to make sure the Draggable's
x
and
y
reflect those changes. You could even point a tween's
onUpdate
to the Draggable's update method to ensure things are synchronized throughout a tween. Setting sticky to true can be helpful if you're re-parenting the target because it acts like it "sticks" to the pointer (otherwise, reparenting would naturally cause the position to change).
Previous
Draggable.timeSinceDrag()
Next
DrawSVG
Contents
Returns : Draggable
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