static-track | GSAP | Docs & Learning
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
InertiaPlugin.track()
On this page
InertiaPlugin
.track
InertiaPlugin
.track
( target:Element | String | Array, props:String ) : Array
Parameters
target
: Element | String | Array
The Element(s) that should be tracked. This can be selector text, an Element, or an Array of Elements.
props
: String
A comma-delimited list of property names to track, like
"x"
or
"x,y,rotation"
Returns : Array
â
An Array of VelocityTracker objects (one for each target object). The most useful method is its
get()
method that you feed the property name to like
myTracker.get("y")
to get the target's current
y
velocity
. Normally, however, you don't need to keep track of this VelocityTracker object at all because the work is done internally and InertiaPlugin knows how to find it.
Details
â
Tracks the velocity of any property (or comma-delimited list of properties) of a particular object so that you can do any of the following:
Create an
inertia
tween with
velocity: "auto"
, which tells InertiaPlugin to automatically find the associated tracker and grab the velocity from there without you needing to feed in a certain number/velocity.
If you need the current velocity of a tracked property anytime for some other reason, it's easy.
InertiaPlugin.getVelocity(target, "property");
To start tracking, just feed in the target (which can be selector text or an Array of objects) along with a comma-delimited list of properties that you want tracked like this:
InertiaPlugin
.
track
(
obj
,
"x,y"
)
;
// or selector text which could find multiple targets:
InertiaPlugin
.
track
(
".class"
,
"x,y"
)
;
Then every time the GSAP updates, the tracked properties will be recorded along with time stamps (it keeps a maximum of 2 of these values and continually writes over the previous ones, so don't worry about memory buildup). This even works with function-based properties like getters and setters!
Then, after at least 100ms and 2 âticksâ (frames) have elapsed (so that some data has been recorded), you can create
inertia
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
inertia
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
,
}
,
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
inertia
:
{
x
:
"auto"
,
y
:
"auto"
,
}
,
}
)
;
Here's an example of tracking in use:
loading...
So
"auto"
is a valid option for properties you're tracking.
What kinds of properties can be tracked?
â
Pretty much any numeric property of any object can be tracked, including function-based ones. For example,
obj.x
or
obj.rotation
or even
obj.customProp()
. You cannot, however, track custom plugin-related values like
scrollTo
,
autoAlpha
, or
physics2D
because those aren't real properties of the object. You should instead track the real properties that those plugins affect, like
rotation
,
opacity
,
x
, or
y
.
Important
It is best to
untrack()
properties when you're done tracking them in order to maximize performance and ensure things are released for garbage collection. To untrack, simply use the
untrack()
method.
Previous
InertiaPlugin.isTracking()
Next
InertiaPlugin.untrack()
Contents
Returns : Array
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