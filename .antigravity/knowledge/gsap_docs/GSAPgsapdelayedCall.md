gsap.delayedCall() | GSAP | Docs & Learning
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
properties
gsap.effects
gsap.globalTimeline
gsap.ticker
gsap.utils
gsap.version
methods
gsap.config()
gsap.context()
gsap.defaults()
gsap.delayedCall()
gsap.exportRoot()
gsap.from()
gsap.fromTo()
gsap.getById()
gsap.getProperty()
gsap.getTweensOf()
gsap.isTweening()
gsap.killTweensOf()
gsap.matchMedia()
gsap.matchMediaRefresh()
gsap.parseEase()
gsap.quickSetter()
gsap.quickTo()
gsap.registerEase()
gsap.registerEffect()
gsap.registerPlugin()
gsap.set()
gsap.timeline()
gsap.to()
gsap.updateRoot()
Internal Plugins
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
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
GSAP
methods
gsap.delayedCall()
On this page
gsap.delayedCall()
Returns :
Tween
â
Details
â
Provides a simple way to call a function after a set amount of time, completely in-sync with the whole rendering loop (unlike a
setTimeout()
which may fire outside of the browser's screen refresh cycle). You can optionally pass any number of parameters to the function too.
//calls myFunction() after 1 second and passes 2 parameters:
gsap
.
delayedCall
(
1
,
myFunction
,
[
"param1"
,
"param2"
]
)
;
function
myFunction
(
param1
,
param2
)
{
//do stuff
}
To cancel/kill a delayed call, save a reference to it and then call .kill() on it when needed:
var
delayedCall
=
gsap
.
delayedCall
(
1
,
myFunction
)
;
// sometime later
delayedCall
.
kill
(
)
;
Or if you don't want to keep a reference to it, you can use the
gsap.killTweensOf()
method because a delayedCall() is merely a
Tween
with an onComplete and the function itself is the "target" of the Tween:
gsap
.
delayedCall
(
1
,
myFunction
)
;
// sometime later
gsap
.
killTweensOf
(
myFunction
)
;
Previous
gsap.defaults()
Next
gsap.exportRoot()
Contents
Returns : Tween
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