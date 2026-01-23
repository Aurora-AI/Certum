gsap.set() | GSAP | Docs & Learning
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
gsap.set()
On this page
gsap.set()
Returns :
Tween
â
Immediately sets properties of the target(s) accordingly - essentially a zero-duration
to()
tween with a more intuitive name. So the following lines produce identical results:
gsap
.
set
(
".class"
,
{
x
:
100
,
y
:
50
,
opacity
:
0
}
)
;
gsap
.
to
(
".class"
,
{
duration
:
0
,
x
:
100
,
y
:
50
,
opacity
:
0
}
)
;
And of course you can use an array or selector text to set the properties of multiple targets at the same time, like:
gsap
.
set
(
[
obj1
,
obj2
,
obj3
]
,
{
x
:
100
,
y
:
50
,
opacity
:
0
}
)
;
If you find yourself setting the same property of the same object over and over again many times (like in a pointermove event), consider using
gsap.quickSetter()
because it can deliver even better performance.
Previous
gsap.registerPlugin()
Next
gsap.timeline()
Contents
Returns : Tween
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