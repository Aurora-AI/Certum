static-sliceRawPath | GSAP | Docs & Learning
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
MotionPathPlugin.sliceRawPath()
On this page
MotionPathPlugin
.sliceRawPath
MotionPathPlugin
.sliceRawPath
( rawPath:Array, start:Number, end:Number ) : RawPath
Slices the provided RawPath Array at the designated start/end positions and returns the resulting (new, sliced) RawPath
Parameters
rawPath
: Array
The RawPath Array to slice
start
: Number
The position along the path at which to start, where 0 is the beginning and 1 is the end and 0.5 is the middle. It can be any positive or negative decimal number. For example, 0.3 would start the element at the 30% point along the curve. Default is 0.
end
: Number
The position along the path at which to end, where 0 is the beginning, 1 is the end, and 0.5 is in the middle. It can be any positive or negative decimal number, including a value that's less than the start (which would make the object travel backwards). For example, 0.6 would have the element end at the 60% point along the curve. 1.5 would make it loop around back to the beginning and stop at the halfway point. Default is 1.
Details
â
Slices the provided RawPath Array at the designated start/end positions and returns the resulting (new, sliced) RawPath
What's a RawPath?
â
A RawPath is essentially an Array containing one Array for each contiguous segment with alternating x, y, x, y cubic bezier data. It's like an SVG
where there's one segment (Array) for each "M" command. That segment (Array) contains all of the cubic bezier coordinates in alternating x/y format (just like SVG path data) in raw numeric form which is nice because that way you don't have to parse a long string and convert things.
For example, this SVG
has two separate segments because there are two "M" commands and below is the resulting RawPath Array:
// original path (notice there are two "M" commands):
(
<
path d
=
"M0,0 C10,20,15,30,5,18 M0,100 C50,120,80,110,100,100"
/
)
[
// resulting RawPath Array:
(
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
)
]
;
For simplicity, the example above only has one cubic bezier in each segment, but there could be an unlimited quantity inside each segment. No matter what path commands are in the original
data string (cubic, quadratic, arc, lines, whatever), the resulting RawPath will
ALWAYS
be cubic beziers.
Previous
MotionPathPlugin.rawPathToString()
Next
MotionPathPlugin.stringToRawPath()
Contents
Details
What's a RawPath?
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