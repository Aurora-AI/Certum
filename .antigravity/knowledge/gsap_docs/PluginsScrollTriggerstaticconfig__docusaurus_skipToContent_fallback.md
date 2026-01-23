static-config | GSAP | Docs & Learning
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
ScrollTrigger.config()
On this page
ScrollTrigger
.config
ScrollTrigger
.config
( vars:Object )
Allows you to configure certain global behaviors of ScrollTrigger like
limitCallbacks
Parameters
vars
: Object
A configuration object with the properties you'd like to affect, like
{ limitCallbacks: true }
Details
â
Allows you to configure certain global behaviors of ScrollTrigger like:
limitCallbacks
[Boolean]
- if
true
, ScrollTrigger will only fire callbacks (onEnter, onLeave, onEnterBack, onLeaveBack) when the active state is
toggled
. For example, if you have a grid of 100 elements that each have a ScrollTrigger associated with them, and only 10 are on the screen at any given time and then you scroll down so that only boxes 50 - 60 are showing and reload the page,
limitCallbacks: true
would skip the
onEnter
for elements 1-49. The default limitCallbacks value is
false
meaning that the
onEnter
for elements 1-60 would all fire in this scenario.
autoRefreshEvents
[String]
- by default, ScrollTrigger will refresh() on the following events: "visibilitychange,DOMContentLoaded,load,resize" but you can set it to a subset of those if you prefer. For example, if you don't want it to refresh on
visibilitychange
(when the browser tab changes from hidden to visible), you could set
autoRefreshEvents: "DOMContentLoaded,load,resize"
.
(added in 3.6.0)
syncInterval
[Number]
- by default, ScrollTrigger checks the scroll position every 200ms and updates things accordingly. This accomplishes two key things: 1) Some very old browsers have a bug that could cause them not to fire "scroll" events while touch-scrolling, so this helps work around that (though it's extremely rare these days), and 2) it keeps the velocity-tracking features functioning accurately. If velocity data was only updated on scroll events, it wouldn't return down to 0 when scrolling stops. So you can alter how often (in milliseconds) syncing occurs, like if you want to effectively disable it you could do
ScrollTrigger.config({syncInterval: 999999999 });
.
ignoreMobileResize
if
true
, vertical resizes (of 25% of the viewport height) on
touch-only
devices won't trigger a
ScrollTrigger.refresh()
, avoiding the jumps that can happen when the start/end values are recalculated. Beware that if you skip the refresh(), the start/end trigger positions may be inaccurate but in many scenarios that's preferable to the visual jumps that occur due to the new start/end positions.
(added in version 3.10.0)
Example
â
// only fire callbacks when the active state toggles
ScrollTrigger
.
config
(
{
limitCallbacks
:
true
,
ignoreMobileResize
:
true
,
}
)
;
ScrollTrigger.config()
was added in version 3.3.4.
Previous
ScrollTrigger.clearScrollMemory()
Next
ScrollTrigger.create()
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