static-getGlobalMatrix | GSAP | Docs & Learning
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
MotionPathPlugin.getGlobalMatrix()
On this page
MotionPathPlugin
.getGlobalMatrix
MotionPathPlugin
.getGlobalMatrix
( element:Element, inverse:Boolean, adjustGOffset:Boolean ) : Matrix2D
Gets the Matrix2D that would be used to convert the element's local coordinate space into the global coordinate space. So, for example, if you take a point
{x:0, y:0}
and
apply()
the matrix to it, the resulting point would be the viewport coordinates of that element's top left corner.
Parameters
element
: Element
The element whose global matrix should be returned. This should be an element reference (like myElem), not a selector string (like "#myElem").
inverse
: Boolean
[optional] if
true
, the inverse of the matrix will be returned, meaning that it'll produce the exact opposite transformation (like calling inverse() on the matrix)
adjustGOffset
: Boolean
[optional] if
true
, the x/y offsets of
elements will be ignored (they behave differently than most other elements).
Returns : Matrix2D
â
An object with a, b, c, d, e, and f properties just like an
SVGMatrix
.
Details
â
Gets the Matrix2D that would be used to convert the element's local coordinate space into the global coordinate space. So, for example, if you take a point
{x:0, y:0}
and apply the matrix to it, the resulting point would be the window/viewport coordinates of that element's top left corner.
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
let
matrix
=
MotionPathPlugin
.
getGlobalMatrix
(
element
)
,
// 0,0 is the top left corner, but you can use any local coordinates.
localPoint
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
// get a new point with the matrix transformations applied.
globalPoint
=
matrix
.
apply
(
localPoint
)
;
gsap
.
to
(
"#dot"
,
{
x
:
globalPoint
.
x
,
y
:
globalPoint
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
Previous
MotionPathPlugin.getAlignMatrix()
Next
MotionPathPlugin.getLength()
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