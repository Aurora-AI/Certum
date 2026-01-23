pipe | GSAP | Docs & Learning
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
pipe
On this page
pipe
Returns : Function
â
pipe()
basically strings together multiple function calls, passing the result from one to the next. Instead of having to manually chain and pass one's return value to the next's parameter,
pipe()
can do it for you. For example:
// without pipe()
var
value1
=
func1
(
input
)
;
var
value2
=
func2
(
value1
)
;
var
output
=
func3
(
value2
)
;
// or multi-level wrapping (awkward)
var
output
=
func1
(
func2
(
func3
(
input
)
)
)
;
// cleaner with pipe()
var
transfrom
=
gsap
.
utils
.
pipe
(
func1
,
func2
,
func3
)
;
var
output
=
transform
(
input
)
;
Parameters
â
Pass as many
functions
as you want to
pipe()
and they'll be called in that order, with the return value of each being passed to the next.
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
Video demo: combining utility methods
â
Combining utility Methods
Previous
normalize
Next
random
Contents
Returns : Function
Parameters
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