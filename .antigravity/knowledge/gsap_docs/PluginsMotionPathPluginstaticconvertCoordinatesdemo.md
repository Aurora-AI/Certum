static-convertCoordinates | GSAP | Docs & Learning
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
MotionPathPlugin.convertCoordinates()
On this page
MotionPathPlugin
.convertCoordinates
MotionPathPlugin
.convertCoordinates
( fromElement:Element | window, toElement:Element | window, point:Object ) : Object (point or Matrix2D)
Converts a point from one element's local coordinates into where that point lines up in a different element's local coordinate system regardless of how many nested transforms are affecting the elements!
Parameters
fromElement
: Element | window
The element whose local coordinates serve as the
input
. The
point
(3rd parameter) is defined according to this element's local coordinates.
toElement
: Element | window
The element whose local coordinates serve as the
output
. In other words, the
point
will be converted into this element's local coordinate system. This should be an element reference (like myElem), not a selector string
point
: Object
[optional] An object with x and y properties like
{x:100, y:200}
that define the local coordinates in the
fromElement
that should be converted into the
toElement
's local coordinates.
Returns : Object (point or Matrix2D)
â
If a
point
parameter is provided, it will be converted and a new point is returned like
{x: 100, y: 200}
representing the converted coordinates in the
toElement
. If no
point
is provided, a
Matrix2D
object is returned so that you can use it to quickly convert ANY coordinates using its
apply()
method.
Details
â
Converts a point from one element's local coordinates into where that point lines up in a different element's local coordinate system regardless of how many nested transforms are affecting the elements! For example, if an element is rotated and scaled inside a transformed container and the user clicks on it, you could convert the event's pageX and pageY coordinates into where that is in that nested element's coordinate system.
Sample code
â
let
fromElement
=
document
.
querySelector
(
"#from"
)
,
toElement
=
document
.
querySelector
(
"#to"
)
,
point
=
{
x
:
100
,
y
:
0
}
,
convertedPoint
=
MotionPathPlugin
.
convertCoordinates
(
fromElement
,
toElement
,
point
)
;
// or if you want to convert multiple points, don't pass one to the function and it'll return a Matrix2D
let
matrix
=
MotionPathPlugin
.
convertCoordinates
(
fromElement
,
toElement
)
,
// no point parameter!
p1
=
matrix
.
apply
(
{
x
:
100
,
y
:
0
}
)
,
p2
=
matrix
.
apply
(
{
x
:
0
,
y
:
200
}
)
,
p3
=
matrix
.
apply
(
{
x
:
50
,
y
:
50
}
)
;
Video
â
Demo
â
loading...
Previous
MotionPathPlugin.arrayToRawPath()
Next
MotionPathPlugin.convertToPath()
Contents
Returns : Object (point or Matrix2D)
Details
Sample code
Video
Demo
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