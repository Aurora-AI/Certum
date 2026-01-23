static-getRelativePosition | GSAP | Docs & Learning
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
methods
MotionPathPlugin.arrayToRawPath()
MotionPathPlugin.convertCoordinates()
MotionPathPlugin.convertToPath()
MotionPathPlugin.getAlignMatrix()
MotionPathPlugin.getGlobalMatrix()
MotionPathPlugin.getLength()
MotionPathPlugin.getPositionOnPath()
MotionPathPlugin.getRawPath()
MotionPathPlugin.getRelativePosition()
MotionPathPlugin.pointsToSegment()
MotionPathPlugin.rawPathToString()
MotionPathPlugin.sliceRawPath()
MotionPathPlugin.stringToRawPath()
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
MotionPath
methods
MotionPathPlugin.getRelativePosition()
On this page
MotionPathPlugin
.getRelativePosition
MotionPathPlugin
.getRelativePosition
( fromElement:Element | window, toElement:Element | window, fromOrigin:Array | Object, toOrigin:Array | Object | String ) : Object
Gets the x and y distances between two elements regardless of nested transforms! feed two elements to this method and it'll return the gap between them as a point {x, y} according to the coordinate system of the fromElement's parent.
Parameters
fromElement
: Element | window
The element from which the distance is measured (typically this is the element that will be moved to the
toElement
)
toElement
: Element | window
The destination element. This should be an element reference (like myElem), not a selector string (like "#myElem").
fromOrigin
: Array | Object
[optional] Determines the point on the
fromElement
that serves as the origin of the measurements. It can be either an Array with progress values along the x and y axis like
[0.5, 0.5]
(center),
[1, 0]
(top right corner), etc. OR a point Object with pixel-based local coordinates like
{x: 100, y: 0}
toOrigin
: Array | Object | String
[optional] Determines the point on the
toElement
to which to measure. It can be either an Array with progress values along the x and y axis like
[0.5, 0.5]
(center),
[1, 0]
(top right corner), etc. OR a point Object with pixel-based local coordinates like
{x: 100, y: 0}
OR for If the toElement is a  you can use
"auto"
to align with the beginning of the path itself rather than using the bounding box.
Returns : Object
â
An object with "x" and "y" properties describing the distance along each axis
Details
â
Gets the x and y distances between two elements regardless of nested transforms! feed two elements to this method and it'll return the gap between them as a point
{x, y}
according to the coordinate system of the fromElement's parent. By default, it will align their top left corners (bounding box), but you can define a different origin for each, like
[0.5, 0.5]
would be the center,
[1, 1]
would be the bottom right, etc.
Sample code
â
let
inner
=
document
.
querySelector
(
"#inner"
)
,
dot
=
document
.
querySelector
(
"#dot"
)
,
delta
=
MotionPathPlugin
.
getRelativePosition
(
dot
,
inner
,
[
0.5
,
0.5
]
,
[
0.5
,
0.5
]
)
;
gsap
.
to
(
dot
,
{
x
:
"+="
+
delta
.
x
,
y
:
"+="
+
delta
.
y
,
duration
:
2
,
ease
:
"power2.inOut"
,
}
)
;
Video
â
Demo 1
â
loading...
Demo 2
â
You can also localize the pointer coordinates, like in the below demo (click anywhere)
loading...
getRelativePosition()` was added in GSAP 3.2.0
Previous
MotionPathPlugin.getRawPath()
Next
MotionPathPlugin.pointsToSegment()
Contents
Returns : Object
Details
Sample code
Video
Demo 1
Demo 2
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