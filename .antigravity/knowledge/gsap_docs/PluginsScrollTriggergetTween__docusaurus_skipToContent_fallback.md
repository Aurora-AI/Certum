getTween | GSAP | Docs & Learning
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
properties
.animation
.direction
.end
.isActive
ScrollTrigger.isTouch
.pin
.progress
.scroller
.start
.trigger
.vars
methods
.disable()
.enable()
.getTween()
.getVelocity()
.kill()
.labelToScroll()
.next()
.previous()
.refresh()
.scroll()
ScrollTrigger.addEventListener()
ScrollTrigger.batch()
ScrollTrigger.clearMatchMedia()
ScrollTrigger.clearScrollMemory()
ScrollTrigger.config()
ScrollTrigger.create()
ScrollTrigger.defaults()
ScrollTrigger.getAll()
ScrollTrigger.getById()
ScrollTrigger.isInViewport()
ScrollTrigger.isScrolling()
ScrollTrigger.killAll()
ScrollTrigger.matchMedia()
ScrollTrigger.maxScroll()
ScrollTrigger.normalizeScroll()
ScrollTrigger.observe()
ScrollTrigger.positionInViewport()
ScrollTrigger.refresh()
ScrollTrigger.removeEventListener()
ScrollTrigger.saveStyles()
ScrollTrigger.scrollerProxy()
ScrollTrigger.snapDirectional()
ScrollTrigger.sort()
ScrollTrigger.update()
ScrollSmoother
SplitText
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
ScrollTrigger
methods
.getTween()
On this page
.getTween
.getTween
( snap:Boolean ) : Tween
Returns the
scrub
tween (default) or the snapping tween (
getTween(true)
)
Parameters
snap
: Boolean
If
true
, the current snap tween will be returned (if snapping is in-progress) instead of the scrub tween.
Returns : Tween
â
The scrub (or snap) Tween instance
Details
â
Returns the
\*\*scrub\*\*
tween (default) which is what gradually makes the animation catch up with the scrollbar position. Or if you call
getTween(true)
, the
\*\*snap\*\*
Tween will be returned instead (if there's a snap in-progress). This allows you to, for example, force the
scrub
or
snap
to its end or kill it, like:
let
st
=
ScrollTrigger
.
create
(
{
animation
:
myTween
,
scrub
:
1
,
trigger
:
".panel-1"
,
}
)
;
// then later...
st
.
getTween
(
)
.
progress
(
1
)
;
// force the scrub to its end to make it catch up with the current scroll position immediately
Or to interrupt a snap...
let
anim
=
gsap
.
to
(
panels
,
{
x
:
(
)
=>
(
panels
.
length
-
1
)
\*
window
.
innerWidth
,
scrollTrigger
:
{
trigger
:
".container"
,
snap
:
1
/
(
panels
.
length
-
1
)
,
pin
:
true
,
end
:
"+=3000"
,
}
,
}
)
;
// then later...
let
snap
=
anim
.
scrollTrigger
.
getTween
(
true
)
;
if
(
snap
)
{
snap
.
progress
(
1
)
.
kill
(
)
;
// force the snap to its end and kill it
}
Obviously this is only helpful if a
scrub
or
snap
value is defined when you set up your ScrollTrigger.
Previous
.enable()
Next
.getVelocity()
Contents
Returns : Tween
Details
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