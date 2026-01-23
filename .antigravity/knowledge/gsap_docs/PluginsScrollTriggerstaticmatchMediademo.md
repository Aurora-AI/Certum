static-matchMedia | GSAP | Docs & Learning
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
ScrollTrigger.matchMedia()
On this page
Deprecated
in favor of
gsap.matchMedia()
in 3.11.0+
ScrollTrigger
.matchMedia
ScrollTrigger
.matchMedia
( vars:Object )
[DEPRECATED] Allows you to set up ScrollTriggers that only apply to certain viewport sizes (using media queries).
Parameters
vars
: Object
A configuration object containing a key for each media query, like
{"(min-width: 800px)": function() { ... }, "(max-width: 799px)": function() { ... }}
. A special
"all"
key can be used for ScrollTriggers that should persist.
Allows you to set up ScrollTriggers that only apply to certain viewport sizes (using media queries). It's surprisingly simple, actually - you pass in a configuration object with a key for each media query like "(min-width: 800px)" and an associated function that should run when that media query matches. Do all your setup tasks inside that function. Any ScrollTriggers that are created inside that function are automatically reverted and killed when that media query no longer matches! If the ScrollTrigger has an animation associated with it, that will also be reverted and killed.
Detailed Walkthrough
Without
matchMedia(), you would need to:
Manually set up your own
window.matchMedia()
functionality, handlers, etc.
Manually
kill()
each ScrollTrigger that doesn't apply to the new size. That means either keeping track of them in an Array or using
ScrollTrigger.getAll()
.
Make sure things get reverted to their pre-pinned, pre-ScrollTrigger state before creating new ScrollTriggers so that they aren't contaminated. For example, if you had something pinned, it must get unpinned and put back into the normal document flow so that your CSS rules affect it properly.
But with
ScrollTrigger.matchMedia()
, it handles most of that automatically.
Each key in the configuration object is exactly the kind of rule you'd pass into the native
window.matchMedia()
.
Each media query's function will get called whenever it becomes active (matches). So if a user resizes the browser past the breakpoint and back again multiple times, the function would get called that many times. Keep in mind that when the media query becomes inactive (not matching anymore), all of the associated ScrollTriggers get reverted and killed, so you don't need to worry about them building up.
Simple structure
â
ScrollTrigger
.
matchMedia
(
{
// large
"(min-width: 960px)"
:
function
(
)
{
// setup animations and ScrollTriggers for screens 960px wide or greater...
// These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
}
,
// medium
"(min-width: 600px) and (max-width: 959px)"
:
function
(
)
{
// The ScrollTriggers created inside these functions are segregated and get
// reverted/killed when the media query doesn't match anymore.
}
,
// small
"(max-width: 599px)"
:
function
(
)
{
// The ScrollTriggers created inside these functions are segregated and get
// reverted/killed when the media query doesn't match anymore.
}
,
// all
all
:
function
(
)
{
// ScrollTriggers created here aren't associated with a particular media query,
// so they persist.
}
,
}
)
;
Demo
â
loading...
tip
You can also use
ScrollTrigger.saveStyles()
to record the current inline styles of elements that may be affected by animations later. Then, whenever ScrollTrigger reverts things internally for that media query, it will revert the inline styles accordingly. For example, if your element starts with no inline styles but then you animate the opacity and "x" position, the element will have "opacity" and "transform" inline styles (even if you rewind the tween) which would override other CSS rules. This solves that issue.
Example code
â
// record the initial inline CSS for these elements so that ScrollTrigger can revert them even if animations add inline styles later
ScrollTrigger
.
saveStyles
(
".panel, #logo"
)
;
// if you put this INSIDE one of the functions, it'll only revert the recorded elements when that media query no longer matches. You can use ScrollTrigger.saveStyles() in multiple places.
ScrollTrigger
.
matchMedia
(
{
// desktop
"(min-width: 800px)"
:
function
(
)
{
gsap
.
to
(
".panel"
,
{
xPercent
:
-
100
,
scrollTrigger
:
{
trigger
:
".panel"
,
scrub
:
1
,
pin
:
true
,
end
:
"+=500"
,
}
,
}
)
;
}
,
// mobile
"(max-width: 799px)"
:
function
(
)
{
gsap
.
to
(
"#logo"
,
{
scale
:
0.5
,
scrollTrigger
:
{
trigger
:
".nav-bar"
,
start
:
"top top"
,
toggleActions
:
"play none reverse none"
,
}
,
}
)
;
}
,
// all
all
:
function
(
)
{
gsap
.
set
(
".photo"
,
{
opacity
:
0
}
)
;
ScrollTrigger
.
batch
(
".photo"
,
{
onEnter
:
(
elements
)
=>
gsap
.
to
(
elements
,
{
opacity
:
1
,
stagger
:
0.1
,
overwrite
:
true
}
)
,
}
)
;
}
,
}
)
;
Teardown function
â
You can [optionally]
return a function
which will be called when that breakpoint no longer matches so that you can do custom cleanup routines like killing other animations that aren't ScrollTrigger-related. For example:
ScrollTrigger
.
matchMedia
(
{
// desktop
"(min-width: 800px)"
:
function
(
)
{
// ScrollTrigger (this automatically gets killed when the breakpoint no longer matches...
gsap
.
to
(
".panel"
,
{
xPercent
:
-
100
,
scrollTrigger
:
{
trigger
:
".panel"
,
scrub
:
1
,
end
:
"+=500"
,
}
,
}
)
;
// other animations that aren't ScrollTrigger-related...
let
tl
=
gsap
.
timeline
(
)
;
tl
.
to
(
".box"
,
{
rotation
:
360
}
)
.
to
(
".box"
,
{
y
:
100
}
)
;
// THIS IS THE KEY! Return a function that'll get called when the breakpoint no longer matches so we can kill() the animation (or whatever)
return
function
(
)
{
tl
.
kill
(
)
;
// other cleanup code can go here.
}
;
}
,
}
)
;
Remember, ScrollTrigger automatically kills all ScrollTriggers created inside the media query function when that media query no longer matches, so you only need a teardown function for things that aren't directly related to ScrollTriggers. The animation that is associated with a particular ScrollTrigger will be killed along with the ScrollTrigger when the media query no longer matches. Any (or all) of the media queries can return a function.
Mobile device doesn't seem to work?
â
Try adding this in your
:
<
meta name
=
"viewport"
content
=
"width=device-width, initial-scale=1"
>
ScrollTrigger.matchMedia() was added in GSAP
3.4.0.
The teardown return function capability was added in
3.5.0.
Previous
ScrollTrigger.killAll()
Next
ScrollTrigger.maxScroll()
Contents
Simple structure
Demo
Example code
Teardown function
Mobile device doesn't seem to work?
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