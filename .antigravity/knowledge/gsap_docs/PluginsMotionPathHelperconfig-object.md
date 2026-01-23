MotionPathHelper | GSAP | Docs & Learning
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
On this page
MotionPathHelper
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
MotionPathHelper
)
Minimal usage
MotionPathHelper
.
create
(
tween
)
;
MotionPathHelper lets you
interactively edit a motion path directly in the browser
by dragging its anchors and control points, adding/deleting them, or dragging the entire path! If you don't have a motion path yet, you can create a new one from scratch. Once you're done editing, simply click the big "COPY MOTION PATH" button at the bottom of the screen to have the path data string copied to your clipboard so that you can then paste it directly into your tween or an SVG
that you'll use for the motion path animation.
Without MotionPathHelper, you'd need to go back and forth between the browser and an SVG editor like Inkscape or Adobe Illustrator which is time-consuming and frustrating.
Video
â
info
The video below explains
MotionPathPlugin
, and shows MotionPathHelper around 3:18:
Usage
â
Call
MotionPathHelper.create()
and pass it either of the following:
A
Tween
instance that has a motionPath defined
. In this case, it will grab the motion path from the Tween and make it editable in the browser. For example:
const
tween
=
gsap
.
to
(
"#id"
,
{
motionPath
:
{
path
:
"#path"
,
align
:
"#path"
,
alignOrigin
:
[
0.5
,
0.5
]
,
}
,
}
)
;
// pass the tween instance in here...
MotionPathHelper
.
create
(
tween
)
;
An element (or selector text)
. In this case, it will create a new very basic motion path curve that you can start editing. For example:
// just pass the element or selector text:
MotionPathHelper
.
create
(
"#id"
)
;
Config Object
â
You can optionally pass in a
vars
parameter to further configure the motion path helper. It's an object and can include any of the following properties:
Property
Description
ease
Number
- The ease to use for the looping preview animation.
duration
Number
- The duration of the looping preview animation (each iteration)
path
String | Element | Array
The motion path along which to animate the target(s). This can be a direct reference to a
or selector text or path data like "M9,100c0,0,18-41,49-65" or an Array of points through which the path should be plotted.
pathColor
String
- The color of the path stroke (only applies if no
path
is defined and MotionPathHelper must create one).
pathWidth
Number
- The stroke-width of the path (only applies if no
path
is defined and MotionPathHelper must create one).
pathOpacity
Number
- The opacity of the path stroke (only applies if no
path
is defined and MotionPathHelper must create one).
selected
Boolean
- Whether or not the path will be selected initially.
start
Number
- The position along the path at which to start, where 0 is the beginning and 1 is the end and 0.5 is the middle. It can be any positive or negative decimal number. For example,
0.3
would start the element at the 30% point along the curve. Default is 0. This only applies if there is no existing animation that the MotionPathHelper is showing.
end
Number
- The position along the path at which to end, where 0 is the beginning, 1 is the end, and 0.5 is in the middle. It can be any positive or negative decimal number, including a value that's less than the start (which would make the object travel backwards). For example,
0.6
would have the element end at the 60% point along the curve. 1.5 would make it loop around back to the beginning and stop at the halfway point. Default is 1. This only applies if there is no existing animation that the MotionPathHelper is showing.
Sample code
â
MotionPathHelper
.
create
(
"#elementID"
,
{
path
:
"#path"
,
pathWidth
:
5
,
pathColor
:
"red"
,
pathOpacity
:
0.6
,
selected
:
true
,
start
:
0.1
,
end
:
1
,
duration
:
5
,
ease
:
"power2.inOut"
,
}
)
;
Demo
â
loading...
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
warning
MotionPathHelper requires
MotionPathPlugin
. Don't forget to load and register both plugins.
Methods
â
kill
( ) ;
Kills the MotionPathHelper instance, removing the path editing elements and "Copy" button from the DOM.
MotionPathHelper
.editPath
( path:Element | String, config:Object ) : PathEditor
Makes an SVG
editable in the browser.
Previous
MotionPathPlugin.stringToRawPath()
Next
.kill()
Contents
Video
Usage
Config Object
Sample code
Demo
Editing tips
Methods
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