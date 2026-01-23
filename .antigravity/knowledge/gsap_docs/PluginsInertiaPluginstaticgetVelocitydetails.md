static-getVelocity | GSAP | Docs & Learning
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
methods
InertiaPlugin.getVelocity()
InertiaPlugin.isTracking()
InertiaPlugin.track()
InertiaPlugin.untrack()
VelocityTracker
MorphSVG
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
Inertia
methods
InertiaPlugin.getVelocity()
On this page
InertiaPlugin
.getVelocity
InertiaPlugin
.getVelocity
( target:Element | String, property:String ) ;
Returns the current velocity of the given property and target object (only works if you started tracking the property using the
InertiaPlugin.track()
method).
Parameters
target
: Element | String
The target element (can be selector text)
property
: String
The name of the property, like "x", "rotation", "left", etc.
Details
â
Returns the current velocity of the given property and target object (only works if you started tracking the property using the
InertiaPlugin.track()
method).
Example
â
// track the x and y properties:
InertiaPlugin
.
track
(
"#box"
,
"x,y"
)
;
// then later, get the velocity:
let
velocityX
=
InertiaPlugin
.
getVelocity
(
"#box"
,
"x"
)
;
For maximum performance, you can just keep the VelocityTracker object that gets returned by the .track() call and get the velocity directly through that:
// track the x and y properties, but this time keep a reference to the VelocityTracker instance:
const
tracker
=
InertiaPlugin
.
track
(
"#box"
,
"x,y"
)
[
0
]
;
// then later, get the velocity:
let
velocityX
=
tracker
.
get
(
"x"
)
,
velocityY
=
tracker
.
get
(
"y"
)
;
Previous
Inertia
Next
InertiaPlugin.isTracking()
Contents
Details
Example
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