random | GSAP | Docs & Learning
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
random
On this page
random
Get a random number within a range (optionally rounding to an increment you provide), or a random element in an array.
Choose one of the following method signatures - either get a random value immediately or set the the
returnFunction
parameter to
true
to get a
reusable function
that returns a random value according to the range (or array) originally provided each time you call it:
1) random(minimum, maximum\*[, snapIncrement, returnFunction]\*)
â
minimum
: Number - The minimum value
maximum
: Number - The maximum value
snapIncrement
: Number (optional) - A snapping increment. For example, a value of 5 means the random number would snap to the closest increment of 5
returnFunction
: Boolean (optional) - If
true
, a reusable function will be returned instead of a random value. This function can be called anytime to randomly choose a value from the range originally provided.
Returns
: a random value between
minimum
and
maximum
, or if
returnFunction
is
true
, a reusable function that can be called anytime to get a value randomly chosen from the range originally provided
Example
â
// get a random number between -100 and 100 (no snapping)
gsap
.
utils
.
random
(
-
100
,
100
)
;
// a random number between 0 and 500 that's snapped to the closest increment of 5
gsap
.
utils
.
random
(
0
,
500
,
5
)
;
// get a reusable function that will randomly choose a value between -200 and 500, snapping to an increment of 10
var
random
=
gsap
.
utils
.
random
(
-
200
,
500
,
10
,
true
)
;
// now we can call it anytime:
console
.
log
(
random
(
)
)
;
// random value between -200 and 500, snapping to the closest 10
console
.
log
(
random
(
)
)
;
// another random value between -200 and 500, snapping to the closest 10
2) random(array\*[, returnFunction]\*)
â
array
: Array - An array of values to randomly choose from
returnFunction
: Boolean (optional) - If
true
, a reusable function will be returned instead of a random value. This function can be called anytime to randomly choose a value from the array originally provided.
Returns
: a value randomly chosen from the
array
, or if
returnFunction
is
true
, a reusable function that can be called anytime to get a value randomly chosen from the
array
Example
â
// get a random value from an array of colors
gsap
.
utils
.
random
(
[
"red"
,
"blue"
,
"green"
]
)
;
//"red", "blue", or "green"
// get a reusable function that will randomly choose a value from the array of colors
var
random
=
gsap
.
utils
.
random
(
[
0
,
100
,
200
]
,
true
)
;
// now we can call it anytime:
console
.
log
(
random
(
)
)
;
// 0, 100, or 200 (randomly selected)
console
.
log
(
random
(
)
)
;
// 0, 100, or 200 (randomly selected again)
3) random(minimum, maximum\*[, returnFunction]\*)
â
minimum
: Number - The minimum value
maximum
: Number - The maximum value
returnFunction
: Boolean (optional) - If
true
, a reusable function will be returned instead of a random value. This function can be called anytime to randomly choose a value from the range originally provided.
Returns
: a random value between
minimum
and
maximum
, or if
returnFunction
is
true
, a reusable function that can be called anytime to get a value randomly chosen from the range originally provided
This is identical it method signature 1 except that it omits the
snapIncrement
for convenience.
Example
â
// get a random number between 0 and 100 (no snapping)
gsap
.
utils
.
random
(
0
,
100
)
;
// get a reusable function that will randomly choose a value between -10 and 50
var
random
=
gsap
.
utils
.
random
(
-
10
,
50
,
true
)
;
// now we can call it anytime:
console
.
log
(
random
(
)
)
;
// random value between -10 and 50
console
.
log
(
random
(
)
)
;
// another random value between -10 and 50
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
String form
â
Note that inside of tween vars you can also use a string form like
"random(-100, 100)"
for a range or like
"random([red, blue, green])"
. For example:
gsap
.
to
(
".class"
,
{
x
:
"random([0, 100, 200, 500])"
,
//randomly selects one of the values (0, 100, 200, or 500)
}
)
;
You can even have the random number rounded to the closest increment of any number! For example:
gsap
.
to
(
".class"
,
{
x
:
"random(-100, 100, 5)"
,
//chooses a random number between -100 and 100 for each target, rounding to the closest 5!
}
)
;
Previous
pipe
Next
selector
Contents
1) random(minimum, maximum\*[, snapIncrement, returnFunction]\*)
2) random(array\*[, returnFunction]\*)
3) random(minimum, maximum\*[, returnFunction]\*)
Tip: combine reusable functions for powerful data transformations!
Video demo: combining utility methods
String form
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