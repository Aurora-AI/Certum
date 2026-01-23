clamp | GSAP | Docs & Learning
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
clamp
On this page
clamp
Clamps a number between a given minimum and maximum. If the number you provide is less than the minimum, it will return the minimum. If it's greater than the maximum, it returns the maximum. If it's between the minimum and maximum, it returns the number unchanged.
loading...
Choose one of the following method signatures - either get a clamped value immediately or omit the
valueToClamp
parameter to get a
reusable function
that remembers the minimum/maximum so that you can feed in values to clamp later as many times as you want:
1) clamp(minimum, maximum, valueToClamp)
â
minimum
: Number - The minimum value
maximum
: Number - The maximum value
valueToClamp
: Number - The value that should be clamped between the first two values.
Returns
: the clamped number
Example
â
// set the clamping range to between 0 and 100, and clamp 105
gsap
.
utils
.
clamp
(
0
,
100
,
105
)
;
// returns 100
// in the same range, clamp -50
gsap
.
utils
.
clamp
(
0
,
100
,
-
50
)
;
// returns 0
// and clamp 20
gsap
.
utils
.
clamp
(
0
,
100
,
20
)
;
// returns 20
2) clamp(minimum, maximum)
â
minimum
: Number - The minimum value
maximum
: Number - The maximum value
Returns
: a reusable function that accepts 1 parameter - a value to clamp
If you omit the
valueToClamp
(3rd) parameter, the utility method will return a
reusable function
that's ready to clamp any value according to the minimum/maximum values provided initially. In other words, the returned function remembers the minimum and maximum values so that it can very quickly and efficiently do the clamping later as many times as you want.
Example
â
// get a clamping function that will always clamp to a range between 0 and 100
var
clamper
=
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
;
// notice we didn't provide a valueToClamp
// now we can reuse the function to clamp any values:
console
.
log
(
clamper
(
105
)
)
;
// 100
console
.
log
(
clamper
(
-
50
)
)
;
// 0
console
.
log
(
clamper
(
20
)
)
;
// 20
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
transformer
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
// then map to the corresponding position on the width of the screen
gsap
.
utils
.
mapRange
(
0
,
100
,
0
,
window
.
innerWidth
)
,
// then snap to the closest increment of 20
gsap
.
utils
.
snap
(
20
)
)
;
// now we feed one value in and it gets run through ALL those transformations!:
transformer
(
25.874
)
;
Previous
checkPrefix
Next
distribute
Contents
1) clamp(minimum, maximum, valueToClamp)
2) clamp(minimum, maximum)
Tip: combine reusable functions for powerful data transformations!
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