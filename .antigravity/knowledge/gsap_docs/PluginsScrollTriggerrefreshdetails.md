refresh | GSAP | Docs & Learning
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
.refresh()
On this page
.refresh
.refresh
()
Forces the ScrollTrigger instance to re-calculate its start and end values (the scroll positions where it'll be activated).
Details
â
Forces the ScrollTrigger instance to re-calculate its
start
and
end
values (the scroll positions where it'll be activated).
note
There's a static
ScrollTrigger.refresh()
that forces
ALL
ScrollTriggers to recalculate their positions and it's much more common to call that method to ensure everything is recalculated in the order they were created. That can be critical because ScrollTriggers further down on the page could be affected by pins further up on the page.
Timelines are unique because when you create one with a ScrollTrigger, no animations have been added yet (and those may affect the start/end positions), so ScrollTrigger waits for one tick before calling its
refresh()
. There's no way for it to automatically know when you've added the last animation to the timeline, hence the need for the one-tick delay.
However, if the timeline's ScrollTrigger performs pinning, it could affect all the ScrollTriggers further down on the page. For example, if it pins an element for 500px (assuming
pinSpacing
isn't
false
), all the subsequent ScrollTriggers would need their
start
/
end
values increased by 500px. If you then create ScrollTriggers that aren't in timelines, their
start
/
end
values will be calculated right away (before the previous timeline's scrollTrigger...because of the 1-tick delay), so they won't factor in the pinning offset.
This can easily be solved by either manually calling
refresh()
on the timeline after you're done adding all the animations to it (and
BEFORE
you create subsequent ScrollTriggers further down the page) or simply call the static
ScrollTrigger.refresh()
method after you're done creating everything.
You can get the ScrollTrigger instance associated with a particular animation via its
scrollTrigger
property:
// create a timeline with a ScrollTrigger
const
tl
=
gsap
.
timeline
(
{
scrollTrigger
:
{
...
}
}
)
;
// after adding all animations to that timeline, we can manually force it to calculate its start/end (on just that instance):
tl
.
scrollTrigger
.
refresh
(
)
;
// or cause ALL ScrollTrigger instances to refresh using the static method:
ScrollTrigger
.
refresh
(
)
;
info
You can pass true to
ScrollTrigger.refresh(true)
to have it do a "safe" refresh, meaning that if the page is in the middle of scrolling, it'll wait until it's done before doing the refresh. That way, it won't kill an in-progress momentum scroll
Previous
.previous()
Next
.scroll()
Contents
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