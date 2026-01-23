static-stringToRawPath | GSAP | Docs & Learning
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
properties
MorphSVGPlugin.defaultRender
MorphSVGPlugin.defaultType
MorphSVGPlugin.defaultUpdateTarget
methods
MorphSVGPlugin.convertToPath()
MorphSVGPlugin.rawPathToString()
MorphSVGPlugin.stringToRawPath()
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
MorphSVG
methods
MorphSVGPlugin.stringToRawPath()
On this page
MorphSVGPlugin
.stringToRawPath
MorphSVGPlugin
.stringToRawPath
( data:String ) : RawPath
Takes a string of path data (like
"M0,0 C100,20 300,50 400,0..."
, what's typically found in the
d
attribute of a
), parses it, converts it into cubic beziers, and returns it as a RawPath which is just an array containing an array for each segment (each
M
command starts a new segment).
Parameters
data
: String
A path data string which is what is typically found in the
d
attribute of a
element. Like
"M0,0 C10,20,15,30,5,18 M0,100 C50,120,80,110,100,100"
.
Returns : RawPath
â
The RawPath of a given string, like
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
Details
â
Converts a string of path data, like
"M0,0 C100,20 300,50 400,0..."
(which is what's typically found in the
d
attribute of a
) into a
RawPath
.
A
RawPath
is essentially an array containing an array for each contiguous segment with alternating x, y, x, y cubic bezier data. It's like an SVG
where there's one segment (array) for each
M
command. That segment (array) contains all of the cubic bezier coordinates in alternating x/y format (just like SVG path data) in raw numeric form which is nice because that way you don't have to parse a long string and convert things.
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
There is also a corresponding
MorphSVGPlugin.rawPathToString()
method so that you can convert back and forth.
Previous
MorphSVGPlugin.rawPathToString()
Next
MotionPath
Contents
Returns : RawPath
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