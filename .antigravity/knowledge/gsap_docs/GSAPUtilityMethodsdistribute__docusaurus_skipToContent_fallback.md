distribute | GSAP | Docs & Learning
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
Useful features & tools
Utility Methods
checkPrefix
clamp
distribute
getUnit
interpolate
mapRange
normalize
pipe
random
selector
shuffle
snap
splitColor
toArray
unitize
wrap
wrapYoyo
Staggers
Helper functions
React - useGSAP()
llms.txt
Utility Methods
distribute
On this page
distribute
Returns : Function
â
Returns a function to distribute an array of values based on the inputs that you give it.
Distributes an amount across the elements in an array according to various configuration options. Internally, it's what
advanced staggers
use, but you can apply it for any value. It essentially assigns values based on the element's position in the array (or in a grid):
// get a function that, when fed an index value, will return a value according to the configuration options
let
distributor
=
gsap
.
utils
.
distribute
(
{
// the base value to start from (default:0)
base
:
50
,
// total amount to distribute across the targets (this amount gets added to the "base" when returned)
amount
:
100
,
// position in the targets array to begin from (can be an index number, a keyword like "start", "center",
// "edges", "random", or "end", or an array of ratios along the x-axis and y-axis like [0.25, 0.75]) (default: 0)
from
:
"center"
,
// bases distribution on the element's position in a grid [rows, columns] instead of a flat array.
// You can also define the rows and columns in array format like [5, 10]
grid
:
"auto"
,
// for grid-based distributing, you can limit measurements to one axis ("x" or "y")
axis
:
"y"
,
// distributes based on an ease curve!
ease
:
"power1.inOut"
,
}
)
;
// get an array of all the elements with the class ".box" applied
let
targets
=
gsap
.
utils
.
toArray
(
".box"
)
;
// Now for any target element, we can just feed in its index from the targets array (along with the target
// and array) and it'll do all the calculations and return the appropriate amount:
let
distributedValue
=
distributor
(
2
,
targets
[
2
]
,
targets
)
;
This can be used directly in a tween:
// animate the scale of all ".class" elements so that the ones in the middle are 0.5 and the ones on
// the outer edges are 3
gsap
.
to
(
".class"
,
{
scale
:
gsap
.
utils
.
distribute
(
{
base
:
0.5
,
amount
:
2.5
,
from
:
"center"
,
}
)
,
}
)
;
Parameters
â
config
:
Object
- The config object to declare how you want inputs to be distributed. All properties inside of this object are optional. These properties can be used:
base
:
Number
- The base value to start from. The default is 0.
amount
:
Number
- The total amount to distribute across the targets (this amount gets added to the "base" when returned). So if
amount
is
1
and there 100 targets, there would be a 0.01 difference between every return value. If you prefer to specify a certain amount between each target, use the
each
property
instead
.
each
: Number - The amount to add between each target (this amount gets added to the "base" when returned). So if
each
is
1
and the there are 4 targets, it would return 0, 1, 2, and 3. If you prefer to specify a
total
amount to split up among the targets, use the
amount
property
instead
.
from
: [
Number
|
String
|
Array
] - The position in the targets array to begin from (can be an index number, a keyword like
"start"
,
"center"
,
"edges"
,
"random"
, or
"end"
, or an array of ratios along the x-axis and y-axis like
[0.25, 0.75]
). The default is
0
.
grid
: [
String
|
Array
] - Bases distribution on the element's position in a grid [rows, columns], like
[5, 10]
, instead of a flat array. You can use
"auto"
to have GSAP try to automatically detect the column and row count for DOM elements.
axis
:
String
- For grid-based distributing, you can limit measurements to one axis (
"x"
or
"y"
).
ease
:
Ease
- Distributes based on an ease curve! The default is
"none"
.
This video on distribute that's part of SnorklTV's
GSAP 3: Beyond the Basics course
may help your understand.
And the companion pen used in the video.
loading...
Previous
clamp
Next
getUnit
Contents
Returns : Function
Parameters
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