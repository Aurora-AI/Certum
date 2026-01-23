static-refresh | GSAP | Docs & Learning
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
ScrollTrigger.refresh()
On this page
ScrollTrigger
.refresh
ScrollTrigger
.refresh
( safe:Boolean )
Recalculates the positioning of all of the ScrollTriggers on the page; this typically happens automatically when the window/scroller resizes but you can force it by calling
ScrollTrigger.refresh()
Parameters
safe
: Boolean
If
true
, it will wait for at least one requestAnimationFrame tick, and up to roughly 200ms before initiating the refresh. This is useful because sometimes the browser doesn't actually render the DOM-related changes immediately, causing measurements to be inaccurate. For example, if you add a "click" event listener to an element that expands other content on the page and you call ScrollTrigger.refresh() in that callback, the changes may not have been fully rendered by that point, so it's the perfect place to enable
safe
.
Details
â
Recalculates the positioning of all of the ScrollTriggers on the page which typically happens
automatically
when the window/scroller resizes but you can force it by calling
ScrollTrigger.refresh()
. For example, if you make changes to the DOM that would cause a reflow and position changes like expanding content.
To wait for at least one requestAnimationFrame tick, and up to roughly 200ms before initiating the refresh, just pass in
true
for the
safe
parameter. This is useful because sometimes the browser doesn't actually render the DOM-related changes immediately, causing measurements to be inaccurate. For example, if you add a "click" event listener to an element that expands other content on the page and you call
ScrollTrigger.refresh()
in that callback, the changes may not have been fully rendered by that point, so it's the perfect place to enable
safe
mode like
ScrollTrigger.refresh(true)
.
What happens when you refresh?
â
Each ScrollTrigger will go through the following steps (in the order they were created):
A "refreshInit" event is dispatched
Any pinned elements are temporarily reverted to their non-pinned state (their natural place in the document flow)
If
scrub
is enabled, the animation gets temporarily reset to its beginning
The ScrollTrigger's start and end positions are recalculated based on the current DOM (natural flow). This also means that if you used a function-based value for
start
or
end
, it will be called.
Any pinned elements and animations are re-enabled according to the new position/progress.
An
update()
is called which will trigger any appropriate callbacks if the progress changed.
The ScrollTrigger instance's
onRefresh
callback fires.
Advanced: listening for refresh/refreshInit events
â
ScrollTrigger will perform a "refreshInit" event immediately BEFORE refreshing all of the ScrollTriggers on the page, and then a "refresh" event immediately AFTER it's done. You can
add a listener
accordingly to call a function of your choice:
ScrollTrigger
.
addEventListener
(
"refreshInit"
,
function
(
)
{
// this code will run BEFORE the refresh
}
)
;
ScrollTrigger
.
addEventListener
(
"refresh"
,
function
(
)
{
// this code will run AFTER all ScrollTriggers refreshed.
}
)
;
There's also a
ScrollTrigger.removeEventListener()
method. Notice that both methods are
static
methods, not instance methods.
What's the difference between refresh() and update()?
â
refresh()
involves recalculating where the ScrollTrigger's start/end positions should be based on the current DOM whereas an
update()
simply checks the scroller's scroll position and updates any linked animations and fires callbacks (if necessary). So a
refresh()
involves quite a bit more work, and it ends up calling
update()
too. You should only call
refresh()
when something has changed in the DOM and/or you need to force the recalculation of start/end positions.
Previous
ScrollTrigger.positionInViewport()
Next
ScrollTrigger.removeEventListener()
Contents
Details
What happens when you refresh?
Advanced: listening for refresh/refreshInit events
What's the difference between refresh() and update()?
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