wrapYoyo | GSAP | Docs & Learning
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
wrapYoyo
On this page
wrapYoyo
Returns : \*
â
Returns the element in an Array associated with the provided index or a number in a provided range, going backwards once the last index is reached (yoyo-ing). Or if no value to wrap is provided, it returns a reusable
function
that will do the wrapping accordingly when it's fed a value.
Places a number into a specified range such that when it exceeds the maximum, it yoyos back toward the start and if it is less than the minimum, it yoyo's forward to the end. In the context of tweening this has the effect of cycling back and forth through the values.
For example, if you have 10 elements with the
"box"
class applied, and you've got a
["red", "green", "yellow"]
array of colors that you'd like to have those elements animate to so that the first box animates to
"red"
, then next to
"green"
, then next to
"yellow"
and then go backwards so that the 4th would go to
"green"
, 5th to
"red"
, then forwards again to
"green"
, etc.,
wrapYoyo()
is perfect for that. If we don't provide an
index
value, we'll get a
function
instead that's ready to do the wrap yoyo-ing accordingly.
//returns the corresponding value in the array (wrapping back to the beginning when necessary)
let
color
=
gsap
.
utils
.
wrapYoyo
(
[
"red"
,
"green"
,
"yellow"
]
,
5
)
;
// "red" (index 5 maps to index 0 in a 3-element Array)
//or use a range
let
num
=
gsap
.
utils
.
wrapYoyo
(
5
,
10
,
12
)
;
// 8 (12 is two past the max of 10, thus the yoyo would go backward to 8)
//if we don't provide an index, we get a function that's ready to do wrapping accordingly
let
wrap
=
gsap
.
utils
.
wrapYoyo
(
[
"red"
,
"green"
,
"yellow"
]
)
;
//now we just feed an index number into the function we got back from the line above and we'll get the corresponding value from the wrapped Array
let
color
=
wrap
(
5
)
// "green"
loading...
Parameters
â
value 1
: [
Array
|
Number
] - The Array of values
or
the
minimum
number of a range. If an Array is provided, the index becomes the second parameter.
value 2
:
Number
- The
maximum
number of the range
or
if an Array is provided as the first argument, this parameter should be the index to wrap.
index
:
Number
- (optional) the number to wrap into the
range
provided.
Previous
wrap
Next
Helper Functions
Contents
Returns : \*
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