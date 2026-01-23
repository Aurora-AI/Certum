unitize | GSAP | Docs & Learning
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
unitize
On this page
unitize
Returns : Function
â
Think of
unitize()
like a wrapper around
another
function, ensuring that the result gets a unit applied, like
"px"
or
"%"
. For example, perhaps you have a function that only deals with raw numbers like
wrap()
, but you need the result to get a
"px"
added to the end. Or maybe the incoming values have units so you need those removed before being fed into your function (
wrap()
in this example), and then that same unit put back onto the end of the result. No problem!
Example
â
// get a function that always applies "px" to the result (and strips off any units from the input)
var
clamp
=
gsap
.
utils
.
unitize
(
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
"px"
)
;
// now the result always gets "px" added:
clamp
(
132
)
;
// "100px"
clamp
(
"-20%"
)
;
// "0px" (notice the unit change)
clamp
(
50
)
;
// "50px"
// or use whatever unit is in the input:
var
wrap
=
gsap
.
utils
.
unitize
(
gsap
.
utils
.
wrap
(
0
,
100
)
)
;
// no specific unit is declared in unitize()
wrap
(
"150px"
)
;
// 50px
wrap
(
"130%"
)
;
// 30%
// another example of forcing a unit like "%":
var
map
=
gsap
.
utils
.
unitize
(
gsap
.
utils
.
mapRange
(
-
10
,
10
,
0
,
100
)
,
"%"
)
;
map
(
0
)
;
// 50%
map
(
"5px"
)
;
// 75%
// useful in modifier functions:
gsap
.
to
(
".class"
,
{
x
:
1000
,
modifiers
:
{
//the value fed into this function will have unit - this strips it off to feed in a raw number to wrap() and then slaps "px" onto the result.
x
:
gsap
.
utils
.
unitize
(
gsap
.
utils
.
wrap
(
0
,
window
.
innerWidth
)
,
"px"
)
,
}
,
}
)
;
Parameters
â
function
: Function - The function whose result should get the unit applied.
unit
: String\*(optional)\* - The unit that should always be added to the end of the result. If you omit this parameter, the original unit from the input is applied dynamically.
Note:
unitize()
strips off any units from the input (using
parseFloat()
) before passing it along to the
function
.
Previous
toArray
Next
wrap
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