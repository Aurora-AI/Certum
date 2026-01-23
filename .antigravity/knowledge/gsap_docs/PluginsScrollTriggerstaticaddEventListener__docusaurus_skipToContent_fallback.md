static-addEventListener | GSAP | Docs & Learning
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
ScrollTrigger.addEventListener()
On this page
ScrollTrigger
.addEventListener
ScrollTrigger
.addEventListener
( type:String, callback:Function ) : null
Add a listener for any of the following events: "scrollStart", "scrollEnd", "refreshInit", "revert", "matchMedia", or"refresh" which get dispatched globally when
any
such ScrollTrigger-related event occurs (it is not tied to a particular instance).
Parameters
type
: String
Event type which may be "scrollStart", "scrollEnd", "refreshInit", "revert", "matchMedia", or "refresh".
callback
: Function
The function to call when the event occurs
Details
â
Add a listener for any of the following events:
"matchMedia"
- when a ScrollTrigger.matchMedia() breakpoint is reached and finishes executing.
"refreshInit"
- typically just after a resize occurs and
BEFORE
ScrollTrigger does all of its recalculating of start/end values in the [new] document flow. This will also happen when you call
ScrollTrigger.refresh()
directly.
"refresh"
- immediately after ScrollTrigger finishes all of its recalculations of start/end values when a refresh occurs (typically after a resize event or when ScrollTrigger.refresh() is called directly).
"revert"
- when ScrollTrigger reverts the page to its original state, after it has removed all of its pinning spacers, etc. This typically happens between a "refreshInit" event and a "refresh" event.
"scrollStart"
- when any ScrollTrigger-related scroller begins scrolling
"scrollEnd"
- when any ScrollTrigger-related scroller stops scrolling (when roughly 200ms elapses since the last "scroll" event AND the user doesn't have a pointer/mouse pressed on the document/scrollbar)
These events get dispatched
globally
when
any
such ScrollTrigger-related event occurs (it is not tied to a particular instance).
Example
â
ScrollTrigger
.
addEventListener
(
"scrollEnd"
,
(
)
=>
console
.
log
(
"scrolling ended!"
)
)
;
Previous
.scroll()
Next
ScrollTrigger.batch()
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