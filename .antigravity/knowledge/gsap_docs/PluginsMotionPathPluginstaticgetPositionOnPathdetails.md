static-getPositionOnPath | GSAP | Docs & Learning
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
MotionPathPlugin.getPositionOnPath()
On this page
MotionPathPlugin
.getPositionOnPath
MotionPathPlugin
.getPositionOnPath
( rawPath:Array, progress:Number, includeAngle:Boolean ) : Object
Calculates the x/y position (and optionally the angle) corresponding to a particular progress value along the RawPath
Parameters
rawPath
: Array
The RawPath Array on which you'd like to plot a position
progress
: Number
A number between 0 and 1 representing the progress along the path where 0.5 would be halfway into the path
includeAngle
: Boolean
[optional] If
true
, the angle (in degrees) will also be calculated and attached to the return object as an "angle" property.
Returns : Object
â
An object containing
x
and
y
properties (coordinates) and if the
includeAngle
parameter was
true
, an
angle
property as well (in degrees)
Details
â
Calculates the x/y position (and optionally the angle) corresponding to a particular progress value (0-1 where 0.5 is the middle) along the RawPath. Note that the RawPath must have had its measurements cached FIRST, using the cacheRawPathMeasurements() method.
Sample code
â
// Get the RawPath associated with the``with an ID of "path"
let
rawPath
=
MotionPathPlugin
.
getRawPath
(
"#path"
)
,
point
;
// cache the measurements first (only necessary once, unless the path data changes)
MotionPathPlugin
.
cacheRawPathMeasurements
(
rawPath
)
;
// find the coordinates and angle of the middle of the path
point
=
MotionPathPlugin
.
getPositionOnPath
(
rawPath
,
0.5
,
true
)
;
// move a #dot element there...
gsap
.
to
(
"#dot"
,
{
x
:
point
.
x
,
y
:
point
.
y
,
rotation
:
point
.
angle
}
)
;
`
`
`
Previous
MotionPathPlugin.getLength()
Next
MotionPathPlugin.getRawPath()
Contents
Returns : Object
Details
Sample code
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