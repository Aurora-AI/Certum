static-sort | GSAP | Docs & Learning
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
ScrollTrigger.sort()
On this page
ScrollTrigger
.sort
ScrollTrigger
.sort
( func:Function ) : Array
Sorts the internal Array of ScrollTrigger instances to control the order in which they
refresh()
(calculate their start/end values).
Parameters
func
: Function
Optional function to use for the sorting, just like JavaScript's native Array.sort() method. If omitted, sorting will be done first by any "refreshPriority" defined in the ScrollTrigger's vars object (default: 0) and then the "start" value for each ScrollTrigger.
Returns : Array
â
The internal Array of ScrollTriggers
Details
â
Sorts the internal Array of ScrollTrigger instances to control the order in which they
refresh()
(calculate their start/end values). It's
VERY
unlikely that you'd need to
sort()
as long as you create your ScrollTriggers in the order they'd happen on the page (top-to-bottom or left-to-right)...which we
strongly
recommend doing. Otherwise, you can either define a
refreshPriority
in any ScrollTriggers that you need to push higher or lower in the list (which forces a
sort()
), or you can manually call the
ScrollTrigger.sort()
method to ensure that the pinning distance gets added to the
start
/
end
values of subsequent ScrollTriggers further down the page (that's why order matters).
For example, if you create a ScrollTrigger that spans the
entire
height of the window, but then
later
you create one that pins an element for 300px, that would technically make the page 300px taller (assuming
pinSpacing
isn't
false
), thus the earlier-calculated
end
position would be incorrect for the whole-page ScrollTrigger. The easiest solution is to just create that ScrollTrigger last but if you can't do that, set its
refreshPriority
to a low value like
-1
and it'll get placed lower in the list of ScrollTriggers in terms of their
refresh()
calculations.
You can either use your own custom sorting method or if none is provided, it'll sort by
refreshPriority
first, then by each ScrollTrigger's
start
value. So, for example, a ScrollTrigger with
refreshPriority: 1
will get refreshed earlier than one with
refreshPriority: 0
(the default). You're welcome to use negative numbers too, and you can assign the same number to multiple ScrollTriggers.
If a
refreshPriority
is defined on
any
ScrollTrigger, it will force a
sort()
. If you choose to pass in a custom function, it'll work just like the native JavaScript
Array.sort()
method.
Example
â
ScrollTrigger
.
create
(
{
refreshPriority
:
-
1
,
// lower priority makes it happen later in the refresh() calculations
...
}
)
;
ScrollTrigger
.
create
(
{
...
// if no refreshPriority is defined, it defaults to 0
}
)
;
gsap
.
to
(
".class"
,
{
// works with tweens/timelines too
opacity
:
1
,
scrollTrigger
:
{
refreshPriority
:
3
,
// a higher number makes it happen earlier in the refresh() calculations
...
}
}
)
;
ScrollTrigger
.
sort
(
)
;
// use the defaults (typically best)
// or use a custom function...
ScrollTrigger
.
sort
(
(
a
,
b
)
=>
a
.
start
-
b
.
start
)
;
Previous
ScrollTrigger.snapDirectional()
Next
ScrollTrigger.update()
Contents
Returns : Array
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