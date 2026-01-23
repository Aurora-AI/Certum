interpolate | GSAP | Docs & Learning
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
interpolate
On this page
interpolate
A super-flexible method that interpolates linearly between any two values of a similar type (numbers, colors, strings, arrays, complex strings with multiple sets of embedded numbers, objects with multiple properties...almost anything!). You provide a
progress
value between 0 and 1 where 0.5 is halfway between, and it will return the interpolated value accordingly.
Choose one of the following method signatures - either get an interpolated value immediately or omit the
progress
parameter to get a
reusable function
that interpolates according to any progress values you feed in later:
1) interpolate(startValue, endValue, progress)
â
startValue
: \* - The starting value. This can be almost any data type (Number, String, Array, complex String, color, Object)
endValue
: \* - The ending value. This can be almost any data type, as long as it matches the
startValue
progress
: Number - A value between 0 and 1 where 0 is the start, 0.5 is halfway between, and 1 is the end.
Returns
: the interpolated value. Colors are in rgba() format (or hsla() if that's detected in the end value)
Example
â
//interpolate halfway between 0 and 500 (number)
gsap
.
utils
.
interpolate
(
0
,
500
,
0.5
)
;
// 250
// strings
gsap
.
utils
.
interpolate
(
"20px"
,
"40px"
,
0.5
)
;
// "30px"
//colors
gsap
.
utils
.
interpolate
(
"red"
,
"blue"
,
0.5
)
;
// "rgba(128,0,128,1)"
//objects
gsap
.
utils
.
interpolate
(
{
a
:
0
,
b
:
10
,
c
:
"red"
}
,
{
a
:
100
,
b
:
20
,
c
:
"blue"
}
,
0.5
)
;
// {a: 50, b: 15, c: "rgba(128,0,128,1)"}
2) interpolate(array, progress)
â
array
: Array - An array of values to linearly interpolate between (numbers, colors, strings, whatever...they just need to be of a similar data type)
progress
: Number - A value between 0 and 1 where 0 is the start, 0.5 is halfway between, and 1 is the end.
Returns
: the interpolated value
Example
â
// an array of numbers
gsap
.
utils
.
interpolate
(
[
100
,
50
,
500
]
,
0.5
)
;
// 50
gsap
.
utils
.
interpolate
(
[
100
,
50
,
500
]
,
0.75
)
;
// 275
// colors
gsap
.
utils
.
interpolate
(
[
"red"
,
"green"
,
"blue"
]
,
0.5
)
;
// "green"
gsap
.
utils
.
interpolate
(
[
"red"
,
"green"
,
"blue"
]
,
0.25
)
;
// "rgba(128,64,0,1)"
3) interpolate(startValue, endValue)
â
startValue
: \* - The starting value. This can be almost any data type (Number, String, Array, complex String, color, Object)
endValue
: \* - The ending value. This can be almost any data type, as long as it matches the
startValue
Returns
: a reusable function that accepts one parameter - a progress value (between 0 and 1)
If you omit the
progress
(3rd) parameter, the utility method will return a
reusable function
that's ready to interpolate based on any progress value you provide later. In other words, the returned function remembers the
startValue
and
endValue
so that it can very quickly and efficiently do the interpolating later.
Example
â
// get a function that will always interpolate between 0 and 100
var
interp
=
gsap
.
utils
.
interpolate
(
0
,
100
)
;
//notice we didn't provide a progress value
// now we can reuse the function to interpolate any values:
console
.
log
(
interp
(
0.5
)
)
;
// 50
console
.
log
(
interp
(
0.25
)
)
;
// 25
console
.
log
(
interp
(
1
)
)
;
// 100
// even works for an object with multiple properties!
var
interp
=
gsap
.
utils
.
interpolate
(
{
a
:
0
,
b
:
10
,
c
:
"red"
}
,
{
a
:
100
,
b
:
20
,
c
:
"blue"
}
)
;
interp
(
0.5
)
;
// {a: 50, b: 15, c: "rgba(128,0,128,1)"}
When animating objects, if you want it to mutate the original startValue (instead of creating a separate object internally), you can pass in
true
as the 3rd parameter.
4) interpolate(array)
â
array
: Array - An array of values to linearly interpolate between (numbers, colors, strings, whatever...they just need to be of a similar data type)
Returns
: a reusable function that accepts one parameter - a progress value (between 0 and 1)
If you omit the
progress
(2nd) parameter, the utility method will return a
reusable function
that's ready to interpolate the array based on any progress value you provide later. In other words, the returned function remembers the
array
so that it can very quickly and efficiently do the interpolating later.
Example
â
// get a function that will interpolate the Array
var
interp
=
gsap
.
utils
.
interpolate
(
[
100
,
50
,
500
]
)
;
//notice we didn't provide a progress value
// now we can reuse the function to interpolate any values:
console
.
log
(
interp
(
0.5
)
)
;
// 50
console
.
log
(
interp
(
0.75
)
)
;
// 275
// even works for colors!
var
interp
=
gsap
.
utils
.
interpolate
(
[
"red"
,
"green"
,
"blue"
]
)
;
interp
(
0.25
)
;
// "rgba(128,64,0,1)"
Tip: combine reusable functions for powerful data transformations!
â
You can
pipe()
several reusable functions together to perform multiple tasks on an incoming value, like
clamping
,
mapping
to another range,
snapping
,
interpolating
, and
more
. For example:
// get a clamping function that will always clamp to a range between 0 and 100
var
colorizer
=
gsap
.
utils
.
pipe
(
// clamp between 0 and 100
gsap
.
utils
.
clamp
(
0
,
100
)
,
// normalize to a value between 0 and 1
gsap
.
utils
.
normalize
(
0
,
100
)
,
// then interpolate between red and blue
gsap
.
utils
.
interpolate
(
"red"
,
"blue"
)
)
;
// now we feed one value in and it gets run through ALL those transformations!:
colorizer
(
25.874
)
;
Video demo: combining utility methods
â
Combining utility Methods
Previous
getUnit
Next
mapRange
Contents
1) interpolate(startValue, endValue, progress)
2) interpolate(array, progress)
3) interpolate(startValue, endValue)
4) interpolate(array)
Tip: combine reusable functions for powerful data transformations!
Video demo: combining utility methods
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