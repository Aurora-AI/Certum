effects | GSAP | Docs & Learning
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
properties
.progress
.scrollTrigger
.vars
methods
.content()
.effects()
.getVelocity()
.kill()
.offset()
.paused()
.scrollTo()
.scrollTop()
.smooth()
ScrollSmoother.create()
ScrollSmoother.get()
.wrapper()
SplitText
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
ScrollSmoother
methods
.effects()
On this page
.effects
.effects
( targets:String | Element | Array, config:Object | null ) : Array
Adds parallax elements that should be managed by the ScrollSmoother
Parameters
targets
: String | Element | Array
The target elements that should have the effects applied. You can use selector text like
".box"
or use an element reference or an Array of elements.
config
: Object | null
A config object that can contain
speed
and/or
lag
properties like
{speed: 1, lag: 0.3}
. If omitted, ScrollSmoother will just use each element's
data-speed
or
data-lag
attribute value. Function-based values are accepted as well just like most places in GSAP.
Returns : Array
â
An Array of ScrollTrigger instances that were created to handle the effects
Details
â
Adds
speed
or
lag
effects to the supplied targets. Use "speed" to get parallax effects. Think of a "lag" like making the element lazy, allowing it to drift from its normal scroll position, taking a certain amount of time to "catch up". You can assign slightly different lags to elements in close proximity to give them a staggered effect when scrolling that's quite pleasing to the eye. If you set
effects: true
on the
ScrollSmoother.create()
config, it'll automatically find any elements with the
data-lag
attribute and apply that effect, or you can use this function to apply them via JavaScript:
let
smoother
=
ScrollSmoother
.
create
(
...
)
;
// use the data-speed and data-lag attributes found on each .box element
smoother
.
effects
(
".box"
)
;
// or specify values:
smoother
.
effects
(
".circle"
,
{
speed
:
0.9
,
lag
:
0.3
}
)
;
You can remove effects by setting them to the defaults like:
// remove effects by setting back to defaults
smoother
.
effects
(
".box"
,
{
speed
:
1
,
lag
:
0
}
)
;
When an effect is applied to an element, ScrollSmoother just creates a
ScrollTrigger
instance to manage the effect, and it returns an Array of those ScrollTrigger instances. So if you apply a "speed" effect to 5 elements, the returned Array will contain 5 ScrollTrigger instances. You can also get an Array of ALL effects by using the method as a getter:
// returns an Array of all the ScrollTrigger instances that are managing the effects
let
effects
=
smoother
.
effects
(
)
;
// getter
// kill all the effects:
smoother
.
effects
(
)
.
forEach
(
(
t
)
=>
t
.
kill
(
)
)
;
"auto" speed
â
When you set the speed to
"auto"
, it will calculate how far it can move inside its
parent container
in the direction of the largest gap (up or down). So it's perfect for parallax effects - just make the child larger than its parent, align it where you want it (typically its top edge at the top of the container, or the bottom edge at the bottom of the container) and let ScrollSmoother do its magic. Obviously set
overflow: hidden
on the parent so it clips the child.
You can even use
function-based values
to make things even more dynamic:
smoother
.
effects
(
".box"
,
{
speed
:
(
index
,
element
)
=>
0.5
+
index
\*
0.1
,
lag
:
(
index
,
element
)
=>
0.3
+
index
\*
0.05
,
}
)
;
These function-based values will get refreshed whenever
ScrollTrigger.refresh()
is called.
data-speed alignment
â
Keep in mind that the elements will hit their "natural" position in the
CENTER
of the viewport. Here's a visual demo from
@snorkltv
:
loading...
Previous
.content()
Next
.getVelocity()
Contents
Returns : Array
Details
"auto" speed
data-speed alignment
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