offset | GSAP | Docs & Learning
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
.offset()
On this page
.offset
.offset
( target:String | Element, position:String ) : Number
Calculates the numeric offset (scroll position in pixels) that corresponds to when a particular element reaches the specified position like:
Parameters
target
: String | Element
The target element
position
: String
The position in a space-delimited form, like
"center center"
or
"top 100px"
where the first value relates to the target element, and the second value relates to the viewport. So
"top 100px"
means
where the top of the target element hits 100px down from the top of the viewport."
Returns : Number
â
The numeric offset (in pixels)
Details
â
Calculates the numeric offset (scroll position in pixels) that corresponds to when a particular element reaches the specified position like:
// when the top of #box1 hits 100px down from the top of the viewport
let
offset
=
smoother
.
offset
(
"#box1"
,
"top 100px"
)
;
And then you can scroll there like:
smoother
.
scrollTop
(
offset
)
;
Or plug it into a tween:
gsap
.
to
(
smoother
,
{
scrollTop
:
offset
,
duration
:
1
,
}
)
;
Previous
.kill()
Next
.paused()
Contents
Returns : Number
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