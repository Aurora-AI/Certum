static-scrollerProxy | GSAP | Docs & Learning
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
ScrollTrigger.scrollerProxy()
On this page
ScrollTrigger
.scrollerProxy
ScrollTrigger
.scrollerProxy
( scroller:String | Element, vars:Object )
Allows you to hijack the
scrollTop
and/or
scrollLeft
getters/setters for a particular scroller element so that you can implement things like smooth scrolling or other custom effects.
Parameters
scroller
: String | Element
Selector text or the Element that is the scroller to be proxied, like
"body"
or
".container"
vars
: Object
An object containing scrollTop and/or scrollLeft functions that serve as proxied getters/setters, like:
{scrollTop: function(value) {...}, scrollLeft: function(value) {...}}
. It can also contain a method for getBoundingClientRect(), scrollWidth(), scrollHeight() as well as an optional pinType: "fixed" | "transform"
Details
â
Allows you to hijack the
scrollTop
and/or
scrollLeft
getters/setters for a particular scroller element so that you can implement things like smooth scrolling or other custom effects.
GSAP's own
ScrollSmoother
is a smooth-scrolling plugin built
on top
of ScrollTrigger, so it is totally integrated and super easy to use. It uses native scroll technology to avoid most of the accessibility issues that plague other smooth-scrolling libraries. If you would like to use a 3rd party library you may need to make use of scrollerProxy(). We don't support other libraries but as a courtesy we've included some demos below with popular libraries.
How does it work?
â
Typically ScrollTrigger directly gets/sets the scroll position via the regular properties/methods on that scroller element, but you can provide your own getter/setter functions instead in order to deliver customized experiences, like:
// 3rd party library setup:
const
bodyScrollBar
=
Scrollbar
.
init
(
document
.
body
,
{
damping
:
0.1
,
delegateTo
:
document
,
}
)
;
// Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
ScrollTrigger
.
scrollerProxy
(
document
.
body
,
{
scrollTop
(
value
)
{
if
(
arguments
.
length
)
{
bodyScrollBar
.
scrollTop
=
value
;
// setter
}
return
bodyScrollBar
.
scrollTop
;
// getter
}
,
getBoundingClientRect
(
)
{
return
{
top
:
0
,
left
:
0
,
width
:
window
.
innerWidth
,
height
:
window
.
innerHeight
,
}
;
}
,
}
)
;
// when the smooth scroller updates, tell ScrollTrigger to update() too:
bodyScrollBar
.
addListener
(
ScrollTrigger
.
update
)
;
Basically you're saying
"Hey ScrollTrigger, whenever you want to get or set the scrollTop or getBoundingClientRect() on this element, use these methods instead"
and then you do whatever you want inside those methods.
walkthrough
Special properties
â
You
MUST
have either a
scrollTop
or
scrollLeft
getter/setter (or both); the rest may or may not be helpful (they're optional):
Property
Description
scrollTop
Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollTop value.
scrollLeft
Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollLeft value.
fixedMarkers
Boolean - If
true
, it treat the markers as if they're position: fixed. This is only helpful if you're integrating with a smooth scrolling library that results in markers being placed inside an element that's being translated. If you notice your markers moving when they shouldn't, try setting this to
true
.
(added in 3.7.0)
getBoundingClientRect
Function - A method that returns an object with
top
,
left
,
width
, and
height
properties indicating the bounding rect of the proxied scroller. It is most often
{top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}
.
scrollWidth
Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollWidth value.
scrollHeight
Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollHeight value.
pinType
"fixed" | "transform" - Determines the manner in which elements get pinned when they're associated with this proxied scroller (if the ScrollTrigger has a
pin
defined). By default, only the
uses
position: "fixed"
for pinning and in all other cases, transform offsets are used. Why? Because if the any ancestor element has a transform applied (even
transform: translate(0, 0)
), it creates a new context and
position: "fixed"
doesn't behave the way you'd expect. It's a browser thing, not a ScrollTrigger thing.
pinType
lets you force ScrollTrigger to use a specific pinning technique for the proxied scroller. If you notice jittery pins, try setting
pinType: "fixed"
(jitter is usually caused by the fact that the browser handles scrolling of the main page on a different thread, thus transforms that are applied via JS aren't in sync). If pins don't seem to be sticking at all, try setting
pinType: "transform"
.
GreenSock doesn't recommend or endorse any particular smooth scrolling library - the demos below are based on various forums posts.
Demo (
Locomotive Scroll
)
â
loading...
Demo (
smooth-scrollbar
)
â
loading...
loading...
ScrollTrigger.scrollerProxy() was added in GSAP
3.4.0
Previous
ScrollTrigger.saveStyles()
Next
ScrollTrigger.snapDirectional()
Contents
Details
How does it work?
Special properties
Demo (Locomotive Scroll)
Demo (smooth-scrollbar)
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