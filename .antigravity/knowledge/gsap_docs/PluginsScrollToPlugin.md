ScrollTo | GSAP | Docs & Learning
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
SplitText
Flip
more plugins
CSSRule
Draggable
DrawSVG
Easel
GSDevTools
Inertia
MorphSVG
MotionPath
MotionPathHelper
Observer
Physics2D
PhysicsProps
Pixi
ScrambleText
ScrollTo
methods
.config()
Text
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
more plugins
ScrollTo
On this page
ScrollTo
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
ScrollToPlugin
)
Minimal usage
//scroll to 400 pixels down from the top
gsap
.
to
(
window
,
{
duration
:
2
,
scrollTo
:
400
}
)
;
tip
If you want to do scroll-driven animations where things get triggered at certain scrollbar positions, use the
ScrollTrigger
plugin.
Description
â
Animates the scroll position of the window (like doing
window.scrollTo(x, y)
) or a DOM element (like doing
myDiv.scrollTop = y; myDiv.scrollLeft = x;
).
warning
using alongside
scroll-behavior: smooth
in CSS will cause conflicts
To scroll the window to a particular position, use window as the target of the tween like this:
//scroll to 400 pixels down from the top
gsap
.
to
(
window
,
{
duration
:
2
,
scrollTo
:
400
}
)
;
//or to scroll to the element with the ID "#someID" (as of GSAP 1.19.0):
gsap
.
to
(
window
,
{
duration
:
2
,
scrollTo
:
"#someID"
}
)
;
To tween the content of a div, make sure you've set the
overflow: scroll
on the div and then:
//scroll to 250 pixels down from the top of the content in the div
gsap
.
to
(
myDiv
,
{
duration
:
2
,
scrollTo
:
250
}
)
;
You can define an x or y value or both (to scroll on both the x and y axis). For example, to scroll to 400 pixels from the top and 200 pixels from the left, do this:
gsap
.
to
(
myDiv
,
{
duration
:
2
,
scrollTo
:
{
y
:
400
,
x
:
200
}
,
ease
:
"power2"
}
)
;
You can also optionally pass offsetX and/or offsetY numeric values if you want to offset the destination from the element.
//scroll #someID into view with 50 pixels from the top (like a margin)
gsap
.
to
(
window
,
{
duration
:
2
,
scrollTo
:
{
y
:
"#someID"
,
offsetY
:
50
}
}
)
;
The demo below uses the offsetY so that each section scrolls into view just under the navigation. Click the section buttons in the demo below. Check out the JS source.
loading...
To have ScrollToPlugin automatically sense if the scroll position was changed outside of itself (like if the user manually started dragging the scrollbar mid-tween) and cancel that portion of the tween, set
autoKill: true
inside the
scrollTo
object, like:
gsap
.
to
(
myDiv
,
{
duration
:
2
,
scrollTo
:
{
y
:
400
,
autoKill
:
true
}
,
ease
:
"power2"
,
}
)
;
If you would like to detect when autoKill gets triggered you can define an
onAutoKill
callback.
gsap
.
to
(
window
,
{
duration
:
2
,
scrollTo
:
{
y
:
300
,
autoKill
:
true
,
onAutoKill
:
myAutoKillFunction
}
,
}
)
;
function
myAutoKillFunction
(
)
{
alert
(
"autoKill"
)
;
}
You can also set autoKill globally via
ScrollToPlugin.config()
ScrollToPlugin
.
config
(
{
autoKill
:
true
}
)
To scroll to the maximum scroll position, use the string
"max"
as the value, like this:
gsap
.
to
(
myDiv
,
{
duration
:
2
,
scrollTo
:
{
y
:
"max"
}
}
)
;
If you don't wrap the value in an object, it will assume you want to scroll in the "y" direction, so these two lines are functionally equivalent:
gsap
.
to
(
myDiv
,
{
duration
:
2
,
scrollTo
:
{
y
:
"max"
}
}
)
;
gsap
.
to
(
myDiv
,
{
duration
:
2
,
scrollTo
:
"max"
}
)
;
Here's a basic example using anchors:
loading...
Previous
ScrambleText
Next
.config()
Contents
Description
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