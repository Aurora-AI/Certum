static-positionInViewport | GSAP | Docs & Learning
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
ScrollTrigger.positionInViewport()
On this page
ScrollTrigger
.positionInViewport
ScrollTrigger
.positionInViewport
( element:Element | String, referencePoint:String | Number, horizontal:Boolean ) : Number
Returns a normalized value representing the element's position in relation to the viewport where 0 is at the top of the viewport, 0.5 is in the center, and 1 is at the bottom. So, for example, if the top of the element is 80% down from the top of the viewport, the following code would return 0.8:
ScrollTrigger.positionInViewport(element, "top");
Parameters
element
: Element | String
The element or selector text
referencePoint
: String | Number
The reference point on the element from which to measure, like "center" or "top" or "bottom" or you can use a number indicating how many pixels from the top/left, so 20 would mean 20 pixels down from the top of the element.
horizontal
: Boolean
By default, the vertical position is measured but to change to horizontal mode, set horizontal to
true
Details
â
Returns a normalized value representing the element's position in relation to the viewport where 0 is at the top of the viewport, 0.5 is in the center, and 1 is at the bottom.
ScrollTrigger
.
positionInViewport
(
element
)
;
By default, it uses the center of the element as a reference point but you can control that with the 2nd parameter. Use keywords like
"center"
(the default),
"top"
, or
"bottom"
. Or you can use a number of pixels from the element's top, so
20
would make the reference point 20 pixels down from the top of the element So, for example, if the top of the element is 80% down from the top of the viewport, the following code would return 0.8:
ScrollTrigger
.
positionInViewport
(
element
,
"top"
)
;
For the reference point (2nd parameter), .
By default, vertical measurements are used but to switch to horizontal, you can set the 3rd parameter to
true
:
// horizontal mode
ScrollTrigger
.
positionInViewport
(
element
,
"center"
,
true
)
;
If you just want to check if the element is in the viewport (a Boolean value), see the
ScrollTrigger.isInViewport()
method which is a bit cheaper performance-wise.
Demo
â
loading...
Previous
ScrollTrigger.observe()
Next
ScrollTrigger.refresh()
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