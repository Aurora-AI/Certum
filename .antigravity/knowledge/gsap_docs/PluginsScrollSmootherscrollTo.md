scrollTo | GSAP | Docs & Learning
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
ScrollSmoother
properties
.progress
.scrollTrigger
.vars
methods
.content()
.effects()
.getVelocity()
.kill()
.offset()
.paused()
.scrollTo()
.scrollTop()
.smooth()
ScrollSmoother.create()
ScrollSmoother.get()
.wrapper()
SplitText
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
ScrollSmoother
methods
.scrollTo()
On this page
.scrollTo
.scrollTo
( target:Number | String | Element, smooth:Boolean, position:String ) ;
Scrolls to a particular position or element
Parameters
target
: Number | String | Element
The target element, or use a number to specify a particular scroll position (pixels). You can use selector text or the element itself, like
"#box1"
smooth
: Boolean
If
true
, the normal smoothing will be applied according to how you configured your ScrollSmoother (e.g.
smooth: 1
would take 1 second). Remember that by default, on mobile there is NO smoothing (like
smoothTouch: 0
). Otherwise, it will immediately jump to the position.
position
: String
You can optionally define a position in a space-delimited form, like
"center center"
or
"top 100px"
where the first value relates to the target element, and the second value relates to the viewport. So
"top 100px"
means
where the top of the target element hits 100px down from the top of the viewport."
Details
â
Scrolls to a particular target or position. You can specify whether or not it should immediately jump there or apply smoothing as it goes, and you can even specify a position like
"top 100px"
where the first value relates to the target element, and the second relates to the viewport.
Examples
â
when the button is clicked, smoothly go to the spot where the #box1 element hits 100px down from the top of the viewport:
let
smoother
=
ScrollSmoother
.
create
(
{
...
}
)
;
button
.
addEventListener
(
"click"
,
(
)
=>
smoother
.
scrollTo
(
"#box1"
,
true
,
"top 100px"
)
)
;
Or simply jump to where the element hits the top of the viewport immediately:
smoother
.
scrollTo
(
"#box1"
)
;
Or specify a numeric scroll position (in pixels):
smoother
.
scrollTo
(
500
)
;
Want to jump straight to that point without animation?
â
specify false and it'll jump right down.
smoother
.
scrollTo
(
500
,
false
)
;
Want to customize the animation to that scroll position?
â
Use the
offset()
method to find the correct position, and feed it to a GSAP tween like:
gsap
.
to
(
smoother
,
{
// don't let it go beyond the maximum scrollable area
scrollTop
:
Math
.
min
(
ScrollTrigger
.
maxScroll
(
window
)
,
smoother
.
offset
(
"#box1"
,
"top 100px"
)
)
,
duration
:
1
,
}
)
;
When you set the scroll position in this way, it will work even if
paused()
is
true
.
Previous
.paused()
Next
.scrollTop()
Contents
Details
Examples
Want to jump straight to that point without animation?
Want to customize the animation to that scroll position?
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