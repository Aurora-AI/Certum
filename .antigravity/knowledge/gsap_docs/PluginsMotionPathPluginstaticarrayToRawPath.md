static-arrayToRawPath | GSAP | Docs & Learning
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
MotionPathPlugin.arrayToRawPath()
On this page
MotionPathPlugin
.arrayToRawPath
MotionPathPlugin
.arrayToRawPath
( values:Array, vars:Object ) : RawPath Array
Takes an Array of coordinates and plots a curve through them, returning a corresponding RawPath Array. If
type: "cubic"
is declared in the
vars
parameter object, they will be interpreted as cubic bezier points like anchor, two control points, anchor, two control points, anchor, etc.)
Parameters
values
: Array
An Array of points through which to plot a curve (or if
type: "cubic"
is declared in the
vars
parameter object, they will be interpreted as cubic bezier points like anchor, two control points, anchor, two control points, etc.)
vars
: Object
[optional] Configuration object that can contain properties like "curviness", "relative", "type", "x", or "y"
Details
â
Takes an Array of coordinates and plots a curve through them, returning a corresponding RawPath Array. If
type: "cubic"
is declared in the
vars
parameter object, they will be interpreted as cubic bezier points like anchor, two control points, anchor, two control points, anchor, etc.)
Configuration
â
The
vars
parameter is optional and can contain any of the following:
Property
Description
curviness
Number - A number that sets the curviness of a path generated. 1 is the default, 2 would be more curvy. Default is 1.
type
String - There are two options for the type: "thru" and "cubic". When "thru" is used, all points are considered to be anchor points and a curve will be plotted through them. When "cubic" is used, the points are interpreted as cubic bezier points in the following order: anchor, two control points, anchor, two control points, etc. for as many iterations as you want but obviously make sure that it starts and ends with anchors.
relative
Boolean - If true, each successive value is interpreted as relative to the previous one. For example, if the Array is
[{x:5}, {x:10}, {x:-2}]
, it would first move to 105, then 115, and finally end at 113.
x
String - By default, "x" is used as the horizontal property value but you can set it to something else like "left" if you prefer, like
{x: "left"}
.
y
String - By default, "y" is used as the vertical property value but you can set it to something else like "top" if you prefer, like
{y: "top"}
.
What's a RawPath?
â
A
RawPath
is essentially an Array containing an Array for each contiguous segment with alternating x, y, x, y cubic bezier data. It's like an SVG
where there's one segment (Array) for each "M" command. That segment (Array) contains all of the cubic bezier coordinates in alternating x/y format (just like SVG path data) in raw numeric form which is nice because that way you don't have to parse a long string and convert things.
For example, this SVG
has two separate segments because there are two "M" commands:
<
path d
=
"M0,0 C10,20,15,30,5,18 M0,100 C50,120,80,110,100,100"
/
>
The resulting RawPath would be:
[
[
0
,
0
,
10
,
20
,
15
,
30
,
5
,
18
]
,
[
0
,
100
,
50
,
120
,
80
,
110
,
100
,
100
]
,
]
;
For simplicity, the example above only has one cubic bezier in each segment, but there could be an unlimited quantity inside each segment. No matter what path commands are in the original
data string (cubic, quadratic, arc, lines, whatever), the resulting RawPath will
ALWAYS
be cubic beziers.
Sample code
â
let
anchors
=
[
{
x
:
50
,
y
:
130
}
,
{
x
:
300
,
y
:
10
}
,
{
x
:
510
,
y
:
100
}
,
{
x
:
700
,
y
:
190
}
,
{
x
:
850
,
y
:
100
}
,
]
,
rawPath
=
MotionPathPlugin
.
arrayToRawPath
(
anchors
,
{
curviness
:
0.5
}
)
,
path
=
document
.
querySelector
(
"#path"
)
;
path
.
setAttribute
(
"d"
,
MotionPathPlugin
.
rawPathToString
(
rawPath
)
)
;
Demo
â
loading...
Previous
MotionPath
Next
MotionPathPlugin.convertCoordinates()
Contents
Details
Configuration
What's a RawPath?
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