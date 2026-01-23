static-editPath | GSAP | Docs & Learning
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
MotionPath
MotionPathHelper
methods
.kill()
MotionPathHelper.editPath()
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
MotionPathHelper
methods
MotionPathHelper.editPath()
On this page
MotionPathHelper
.editPath
MotionPathHelper
.editPath
( path:Element | String, config:Object ) : PathEditor
Makes an SVG
editable in the browser.
Parameters
path
: Element | String
The  element to be edited. This can be a reference to the element or selector text.
config
: Object
An optional configuration object for defining things like onPress, onRelease, handleSize, selected, draggable, etc.
Returns : PathEditor
â
A PathEditor object
Details
â
Makes an SVG
editable in the browser.
Simple example
â
MotionPathHelper
.
editPath
(
"#my-path"
)
;
Advanced example
â
MotionPathHelper
.
editPath
(
"#my-path"
,
{
handleSize
:
7
,
selected
:
true
,
draggable
:
true
,
onPress
:
(
)
=>
console
.
log
(
"pressed"
)
,
onRelease
:
(
)
=>
console
.
log
(
"released"
)
,
onUpdate
:
(
)
=>
console
.
log
(
"updated"
)
,
onDeleteAnchor
:
(
)
=>
console
.
log
(
"deleted anchor"
)
,
}
)
;
Demo
â
loading...
Configuration
â
You can optionally pass in a
vars
parameter to further configure the path editor. It's an object and can include any of the following properties:
Property
Description
draggable
Boolean - determines if the path should be selected initially.
handleSize
Number - The radius of the anchor points/handles
onDeleteAnchor
Function - A callback function that should be called when an anchor point is deleted.
onPress
Function - A callback function that should be called when an anchor or the path is pressed (mousedown/pointerdown/touchstart)
onRelease
Function - A callback function that should be called when the mouse/pointer is released (mouseup/pointerup/touchend/touchcancel)
onUpdate
Function - A callback function that should be called when the path is updated in any way
selected
Boolean - Whether or not the path will be selected initially.
tip
Editing tips
â
Add point
: ALT-Click somewhere on the path
Toggle smooth/corner anchor
: ALT-Click the anchor
Get handle from corner anchor
: ALT-Drag
Select multiple anchors
: SHIFT-Click (and again to deselect)
Delete anchor
: select it, then press DELETE key.
Undo
: CTRL-Z
Click and drag on handles to change how the path curves.
Drag entire path
: Click and drag on a part of the path that doesn't have an anchor
Previous
.kill()
Next
Observer
Contents
Returns : PathEditor
Details
Simple example
Advanced example
Demo
Configuration
Editing tips
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