track | GSAP | Docs & Learning
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
methods
.track
On this page
track
Returns : VelocityTracker
â
A VelocityTracker object that's responsible for doing the tracking.
Details
â
Allows you to have the velocity of particular properties automatically tracked for you so that InertiaPlugin tweens can access that data internally instead of manually calculating it and feeding it into each tween. For example, let's say there's an object that the user interacts with by dragging it or maybe it is being tweened and then at some point you want to create a
throwProps
tween that smoothly continues that motion and glides to a rest. Normally, you'd need to write your own tracking code that records that object's
x
and
y
properties and the time stamps so that when it comes time to feed the
velocity
into the
throwProps
tween, you'd have the necessary data to calculate it. But let's face it: that can be cumbersome to do manually, and that's precisely why the
track()
method exists.
Just feed in the target and a comma-delimited list of its properties that you want tracked like this:
InertiaPlugin
.
track
(
obj
,
"x,y"
)
;
Then every time the core tweening engine updates (at whatever frame rate you're running), the
x
and
y
values (or whichever properties you define) will be recorded along with time stamps (it keeps a maximum of 2 of these values and continually writes over the previous ones, so don't worry about memory buildup). This even works with function-based properties like getters and setters.
Then, after at least 100ms and 2 "ticks" of the core engine have elapsed (so that some data has been recorded), you can create
throwProps
tweens for those properties and omit the
velocity
values and it will automatically populate them for you internally. For example:
//first, start tracking "x" and "y":
InertiaPlugin
.
track
(
obj
,
"x,y"
)
;
//then, after at least 100ms, let's smoothly tween to EXACTLY x:200, y:300
gsap
.
to
(
obj
,
{
duration
:
2
,
throwProps
:
{
x
:
{
end
:
200
}
,
y
:
{
end
:
300
}
}
,
ease
:
"Strong.easeOut"
}
)
;
//and if you want things to use the defaults and have obj.x and obj.y glide to a stop based on the velocity rather than setting any destination values, just use "auto":
gsap
.
to
(
obj
,
{
duration
:
2
,
throwProps
:
{
x
:
"auto"
,
y
:
"auto"
}
,
ease
:
"Strong.easeOut"
}
)
;
Notice that
"auto"
is a valid option when you're tracking the properties too, but only for tracked properties.
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
), it will automatically find the matching counterpart method and use the getter appropriately, so you can track the getter or setter and it'll work. You cannot, however, track custom plugin-related values like
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
Important
You should
untrack()
properties when you no longer need them tracked in order to maximize performance and ensure things are released for garbage collection. To untrack, simply use the
untrack()
method.
Previous
.removeProp
Next
.untrack
Contents
Returns : VelocityTracker
Details
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