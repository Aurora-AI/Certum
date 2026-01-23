static-getAlignMatrix | GSAP | Docs & Learning
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
MotionPathPlugin.getAlignMatrix()
On this page
MotionPathPlugin
.getAlignMatrix
MotionPathPlugin
.getAlignMatrix
( fromElement:Element | window, toElement:Element | window, fromOrigin:Array, toOrigin:Array | String ) : Matrix2D
Gets a Matrix2D for translating between coordinate spaces, typically so that you can move the
fromElement
to align it with the
toElement
while factoring in all transforms (even nested ones). The matrix allows you to convert any point/coordinate using its apply() method.
Parameters
fromElement
: Element | window
The element that serves as the basis for the alignment matrix. Typically this is the element that will be moved to the
toElement
using the resulting matrix.
toElement
: Element | window
The element that the
fromElement
should be aligned with
fromOrigin
: Array
[optional] Determines the point on the
fromElement
that gets aligned. It can be either an Array with progress values along the x and y axis like
[0.5, 0.5]
(center),
[1, 0]
(top right corner), etc. OR a point Object with pixel-based local coordinates like
{x: 100, y: 0}
toOrigin
: Array | String
[optional] Determines the point on the
toElement
that gets aligned. It can be either an Array with progress values along the x and y axis like
[0.5, 0.5]
(center),
[1, 0]
(top right corner), etc. OR a point Object with pixel-based local coordinates like
{x: 100, y: 0}
OR for If the toElement is a  you can use
"auto"
to align with the beginning of the path itself rather than using the bounding box.
Returns : Matrix2D
â
An object with a, b, c, d, e, and f properties just like an
SVGMatrix
.
Details
â
Gets a Matrix2D for translating between coordinate spaces, typically so that you can move the
fromElement
to align it with the
toElement
while factoring in all transforms (even nested ones). The matrix allows you to convert any point/coordinate using its
apply()
method. For example, you can get a matrix that aligns the top left corner of #div1 with the top left corner of #div2 (regardless of nested transforms) and then to plot where 200px over and 100px down (in #div2's coordinate space) corresponds to #div1's coordinates, you could
matrix.apply({x:200, y:100})
.
What's a Matrix2D?
â
A Matrix2D is just an object with
a
,
b
,
c
,
d
,
e
, and
f
properties representing a 2D transformation matrix (very similar to an
SVGMatrix
). It contains all rotation, scale, skew, and x/y translation data and it's useful for converting between coordinate spaces. It has an
apply()
method that accepts a point (like
matrix.apply({x:0, y:100})
) and returns a new point with the matrix transforms applied.
Sample code
â
// get a matrix for aligning the center of the dot element with the top left corner of the dragme element (which will be treated as 0,0)
let
matrix
=
MotionPathPlugin
.
getAlignMatrix
(
dot
,
dragme
,
[
0.5
,
0.5
]
,
[
0
,
0
]
)
,
// 0,0 is the origin of the alignment (the top left corner in this case), but try any local coordinates.
dragmePoint
=
{
x
:
0
,
y
:
0
}
,
// convert into the dot's coordinate space (technically its parentNode's)
dotPoint
=
matrix
.
apply
(
dragmePoint
)
;
gsap
.
to
(
dot
,
{
// if there were already transforms applied, those would affect the matrix, so we should treat them as relative.
x
:
"+="
+
dotPoint
.
x
,
y
:
"+="
+
dotPoint
.
y
,
ease
:
"power1.inOut"
,
}
)
;
Demo
â
loading...
getAlignMatrix()
was added in GSAP 3.2.0
Previous
MotionPathPlugin.convertToPath()
Next
MotionPathPlugin.getGlobalMatrix()
Contents
Returns : Matrix2D
Details
What's a Matrix2D?
Sample code
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