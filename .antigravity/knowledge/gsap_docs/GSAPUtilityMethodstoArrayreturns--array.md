toArray | GSAP | Docs & Learning
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
toArray
On this page
toArray
Returns : Array
â
Converts selector text, an Array of objects or selector text, a NodeList, an object, or almost any Array-like object into a flat
Array
. You can optionally define a scope (added in 3.7.0) for the selector text which limits results to descendants of that scope Element.
// these all return the corresponding elements wrapped in a flat Array:
// selector text (returns the raw elements wrapped in an Array)
let
targets
=
gsap
.
utils
.
toArray
(
".class"
)
;
// raw element/object
let
targets
=
gsap
.
utils
.
toArray
(
myElement
)
;
// Array of selector text (same result as ".class1, .class2")
let
targets
=
gsap
.
utils
.
toArray
(
[
".class1"
,
".class2"
]
)
;
// Only descendant elements of myElement
let
targets
=
gsap
.
utils
.
toArray
(
".class"
,
myElement
)
;
Parameters
â
targets
: [Object | String | NodeList | Array] - The target(s) that you want wrapped in a flattened Array (it can be selector text, objects, NodeList, etc.)
scope
: [Element | Ref] (optional) - The Element (or React ref) to which the selector text scope should be limited, like calling
.querySelectorAll([selector-text])
on this Element rather than the document. In other words, it will only return
descendant
Elements of the scope Element. This is only helpful when
targets
is selector text.
Previous
splitColor
Next
unitize
Contents
Returns : Array
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