static-normalizeScroll | GSAP | Docs & Learning
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
ScrollTrigger.normalizeScroll()
On this page
ScrollTrigger
.normalizeScroll
ScrollTrigger
.normalizeScroll
( normalize:Boolean | Object ) : ScrollObserver | null
Forces scrolling to be done on the JavaScript thread, ensuring screen updates are synchronized and the address bar doesn't show/hide on [most] mobile devices.
Parameters
normalize
: Boolean | Object
If
true
, it'll force scrolling to be done on the JavaScript thread and prevent mobile browser address bars from showing/hiding. If
false
, it'll use native scrolling which is often handled on a separate thread and may cause repainting to be slightly out of sync. You can pass in a configuration object instead if you'd like to tweak the observer properties. For example { type: "touch,wheel,pointer" } would cause the page to be drag-scrollable with the mouse/pointer. See Observer docs for options (most callbacks are not available since they're used internally)
Details
â
By default, ScrollTrigger leverages the browser's
native
scrolling behavior but there are three potential problems you may encounter with native scrolling:
Address bar showing/hiding on mobile browsers, resizing the viewport
- have you ever noticed a sudden shift after the address bar shows/hides? That's because the when the viewport resizes, ScrollTrigger must recalculate the start/end positions and they likely change at the new viewport size (hence the jump). It's logically impossible to keep things accurate in terms of trigger positions AND avoid any changes. This isn't a bug in ScrollTrigger. You could prevent it from recalculating (see
config()
) but then your trigger positions become inaccurate.
Multi-threaded synchronization issues
- if you scroll quickly you may see a pinned ScrollTrigger appear to
jump
when it initially pins/unpins. Why? Because modern browsers handle scrolling on a different thread, so it may repaint the screen as if the page was scrolled
past
the point of the pinning...and then the JavaScript thread runs a few milliseconds later and applies the pinning, causing the perceived jump. See
Firefox's explanation
.
iOS Safari bugs which misreport position data, causing jitter
- some of these bugs have been around since 2017 and still haven't been fixed. The browser misreports scroll position as well as event.clientX/Y intermittently, causing things to "jitter". So when ScrollTrigger asks the browser
"what's your scroll position"
or
"where is the user's finger on the screen?"
, iOS Safari provides the
wrong
value quite frequently.
Overscroll behavior
- some browsers like iOS Safari ignore the
overscroll-behavior
CSS and force the annoying overscroll bouncing behavior when you reach the top or bottom of the page.
Inconsistent momentum scroll across devices
- Android and iOS touch-scroll with momentum very differently.
Solution
â
When you set
ScrollTrigger.normalizeScroll(true)
, it intercepts native scroll behavior and handles it on the JavaScript thread instead which has the following results:
Prevents the address bar from showing/hiding
on [most] mobile devices, maintaining a consistent viewport size (resize shifts disappear). One exception we know of is the most recent version of iOS, only on phones in portrait orientation where the browser forces the show/hide (it seems impossible to work around, but you can still use
ScrollTrigger.config({ ignoreMobileResize: true})
to skip refreshes in that case).
Prevents over-scroll and bounce-back
scroll behavior.
Since scrolling is done on the JavaScript thread,
screen updates are synchronized
(no more pin jumping due to repaint mis-timing)
ScrollTrigger
works around the iOS bugs
by skipping every other "touchmove" event and managing the position internally rather than relying on the browser's reporting. The "touchmove" skips only occur on iOS devices.
Momentum scrolling for touch is handled by ScrollTrigger consistently across all devices.
This is a hybrid form of scroll-jacking; it technically is cancelling native scroll events but it's not imposing any fake scrollbars or different acceleration or anything like that - it's simply grabbing the delta and applying it via JavaScript to solve the problems mentioned above. This also minimizes accessibility side effects.
Basic Usage
â
The method can be used as a getter or setter
ScrollTrigger
.
normalizeScroll
(
true
)
;
// enable
ScrollTrigger
.
normalizeScroll
(
false
)
;
// disable
let
normalizer
=
ScrollTrigger
.
normalizeScroll
(
)
;
// gets the Observer instance that's handling normalization (if enabled, of course)
Advanced Configuration
â
Internally, it uses an
Observer
to work its magic, so you could pass in a configuration object that contains any of the following optional properties:
Example
â
ScrollTrigger
.
normalizeScroll
(
{
allowNestedScroll
:
true
,
lockAxis
:
false
,
momentum
:
self
=>
Math
.
min
(
3
,
self
.
velocityY
/
1000
)
,
// dynamically control the duration of the momentum when flick-scrolling
type
:
"touch,wheel,pointer"
,
// now the page will be drag-scrollable on desktop because "pointer" is in the list
}
)
;
Caveats
â
In order to avoid interfering with gestures, it'll relinquish control on touch devices when there are multiple touches occurring and when the page is zoomed to a scale other than 1 (like after a pinch-zoom).
Some mobile browsers hide the scrollbar until you're
actively
scrolling but since normalizeScroll() intercepts the browser's native scrolling behavior, that doesn't occur. At this point, we haven't implemented any "fake" ones but you're welcome to do so; it should be relatively easy to do by tapping into the data ScrollTrigger provides. In fact, you could use a simple ScrollTrigger with no scroller/trigger and no start/end (because it defaults to the entire page) and animate a scrollbar

. If you need help, post in the
forums
.
This is considered an experimental feature at this point but it seems to work quite well. If you run into any problems, please post in our
forums
.
Why doesn't ScrollTrigger always normalize scroll by default?
â
Because it often isn't needed and we prefer to let the browser handle things natively as much as possible.
normalizeScroll()
seems like a setting that's important to opt-in to. ScrollTrigger was designed specifically
not
to do scroll-jacking because we wanted it to remain as "pure" and non-intrusive as possible.
What's with the iOS browser bugs?
â
Here's just a sampling of the various unresolved bugs we encountered in Safari which was
by far
the most problematic browser (mostly on mobile):
1
|
2
|
3
|
4
|
5
. Some were reported back in
January 2018
and still haven't been fixed. We tried reaching out to the Safari team directly on many occasions, but they were unresponsive. If anyone knows a way to reach them, please let us know; we'd love to collaborate on workarounds. We sunk hundreds of hours into troubleshooting and normalizeScroll() represents our best crack at working around the various browser bugs and inconsistencies. We welcome
suggestions
.
Previous
ScrollTrigger.maxScroll()
Next
ScrollTrigger.observe()
Contents
Details
Solution
Basic Usage
Advanced Configuration
Example
Caveats
Why doesn't ScrollTrigger always normalize scroll by default?
What's with the iOS browser bugs?
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