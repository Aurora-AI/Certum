static-isInViewport | GSAP | Docs & Learning
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
ScrollTrigger.isInViewport()
On this page
ScrollTrigger
.isInViewport
ScrollTrigger
.isInViewport
( Element:Element | String, proportion:Number, horizontal:Boolean ) : Boolean
Returns
true
if the element is in the viewport. You can optionally specify a minimum proportion, like
ScrollTrigger.isInViewport(element, 0.2)
would only return
true
if at least 20% of the element is in the viewport.
Parameters
Element
: Element | String
The element or selector text
proportion
: Number
The minimum proportion of the element that must be in the viewport to return
true
, so 0.2 would mean that at least 20% of the element must be in the viewport in order for the method to return
true
horizontal
: Boolean
By default, the vertical position is evaluated but to use the horizontal position instead, set the horizontal parameter to
true
Details
â
Returns
true
if the element is in the viewport.
// is any part of the element in the viewport?
if
(
ScrollTrigger
.
isInViewport
(
element
)
)
{
// you can use selector text
// do stuff
}
You can optionally specify a minimum proportion, so 0.2 would only return
true
if at least 20% of the element is in the viewport:
// at least 20% of the element must be in the viewport for this to return true
if
(
ScrollTrigger
.
isInViewport
(
element
,
0.2
)
)
{
// do stuff
}
By default, it checks the
vertical
position but if you'd like to check the
horizontal
position instead, set the 3rd parameter to
true
like:
// check horizontal instead of vertical
if
(
ScrollTrigger
.
isInViewport
(
element
,
0.2
,
true
)
)
{
// do stuff
}
To find out the precise location of the element within the viewport, see the
ScrollTrigger.positionInViewport()
method.
Demo
â
loading...
Previous
ScrollTrigger.getById()
Next
ScrollTrigger.isScrolling()
Contents
Details
Demo
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