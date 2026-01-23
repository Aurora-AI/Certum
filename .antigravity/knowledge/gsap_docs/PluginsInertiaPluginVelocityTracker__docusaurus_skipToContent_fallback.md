VelocityTracker | GSAP | Docs & Learning
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
properties
.target
methods
.addProp
.get
.getByTarget
.isTracking
.isTrackingProp
.removeProp
.track
.untrack
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
VelocityTracker
On this page
VelocityTracker
Description
â
Allows you to have the velocity of particular properties automatically tracked for you so that you can access them anytime using the VelocityTracker's
getVelocity()
method, like
myTracker.getVelocity("y")
.
For example, let's say there's an object that the user interacts with by dragging it or maybe it is being tweened and then at some point you want to create a tween based on that velocity. Normally, you'd need to write your own tracking code that records that object's
x
and
y
properties (as well as time stamps) so that when it comes time to feed the
velocity
into whatever other code you need to run, you'd have the necessary data to calculate it. But let's face it: that can be cumbersome to do manually, and that's precisely why VelocityTracker exists.
VelocityTracker is in the InertiaPlugin JavaScript file. You can access the important methods directly through InertiaPlugin, like
InertiaPlugin.track()
.
Use the static
VelocityTracker.track()
method to start tracking properties.
You generally should
not
use the VelocityTracker's constructor because there needs to only be one VelocityTracker instance associated with any particular object.
The
track()
method will return the instance that you can then use to
getVelocity()
like:
// first, start tracking "x" and "y":
var
tracker
=
VelocityTracker
.
track
(
obj
,
"x,y"
)
[
0
]
;
//then, after at least 100ms and 2 "ticks", we can get the velocity of each property:
var
vx
=
tracker
.
get
(
"x"
)
;
var
vy
=
tracker
.
get
(
"y"
)
;
What kinds of properties can be tracked?
â
Pretty much any numeric property of any object can be tracked, including function-based ones. For example,
obj.x
or
obj.rotation
or even
obj.myCustomProp()
. In fact, for getters and setters that start with the word "get" or "set" (like
getCustomProp()
and
setCustomProp()
), it will automatically find the matching counterpart method and use the getter appropriately, so you can track the getter or setter and it'll work. You
cannot
, however, track custom plugin-related values like
directionalRotation
,
autoAlpha
, or
physics2D
because those aren't real properties of the object. You should instead track the real properties that those plugins affect, like
rotation
,
alpha
,
x
, or
y
.
This class is used in InertiaPlugin to make it easy to create velocity-based tweens that smoothly transition an object's movement (or rotation or whatever) and glide to a stop.
warning
In order to report accurately, at least 100ms and 2 ticks of the core tweening engine must have been elapsed before you check velocity.
Previous
InertiaPlugin.untrack()
Next
.target
Contents
Description
What kinds of properties can be tracked?
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