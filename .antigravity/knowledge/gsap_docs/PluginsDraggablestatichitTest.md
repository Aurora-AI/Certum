static-hitTest | GSAP | Docs & Learning
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
Draggable.hitTest()
On this page
Draggable.hitTest
Draggable.hitTest
( testObject:Object, threshold:[Number | String] ) : Boolean
Provides an easy way to test whether or not the target element overlaps with a particular element (or the mouse position) according to whatever threshold you [optionally] define.
Parameters
testObject
: Object
The object that should be hit tested, which can be any of the following: an element, a mouse/touch event that has
pageX
and
pageY
properties, selector text like
"#element2"
, or a generic object defining a rectangle (it should have
top, left, right,
and
bottom
properties).
threshold
: [Number | String]
(default =
0
) - Either a number defining the minimum number of pixels that must be overlapping for a positive hitTest or a string percentage (like
"50%"
) defining the minimum amount of overlapping surface area percentage for a positive hitTest. Zero (0) will check for any overlap at all.
Returns : Boolean
â
Returns
true
if an overlap is sensed (according to the threshold),
false
otherwise.
loading...
Details
â
Provides an easy way to test whether or not the
target
element overlaps with a particular element (or the mouse position) according to whatever
threshold
you (optionally) define. For example:
Draggable
.
create
(
"#element1"
,
{
type
:
"x,y"
,
onDragEnd
:
function
(
e
)
{
//see if the target overlaps with the element with ID "element2"
if
(
this
.
hitTest
(
"#element2"
)
)
{
//do stuff
}
}
}
)
;
By default,
hitTest()
returns true if there is any overlap whatsoever, but you can optionally define a
threshold
parameter to, for example, only return true if at least 20 pixels are overlapping or if 50% of the surface area of either element is overlapping with the other or whatever amount you define:
Draggable
.
create
(
"#element1"
,
{
type
:
"x,y"
,
onDragEnd
:
function
(
e
)
{
//checks if at least 20 pixels are overlapping:
if
(
this
.
hitTest
(
"#element2"
,
20
)
)
{
//do stuff
}
//checks if at least 50% of the surface area of either element is overlapping:
if
(
this
.
hitTest
(
"#element3"
,
"50%"
)
)
{
//do stuff
}
}
}
)
;
loading...
You can use
hitTest(window)
to detect if an element is visible within the viewport.
There is also a static version of this method that allows you to pass both elements and objects to test, like
Draggable.hitTest(element1, element2, 20)
.
Demo
.
IMPORTANT:
There is no way to get pixel-perfect hit testing for non-rectangular shapes in the DOM.
hitTest()
uses the browser's
getBoundingClientRect()
method to get the rectangular bounding box that surrounds the entire element, thus if you rotate an element or if it's more of a circular shape, the bounding box may extend further than the visual edges.
Previous
.getDirection()
Next
.kill()
Contents
Returns : Boolean
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