gsap.getTweensOf() | GSAP | Docs & Learning
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
gsap.getTweensOf()
On this page
gsap.getTweensOf()
Returns : Array
â
Returns an array containing all the tweens of a particular target (or group of targets) that have not yet been released for garbage collection.
Details
â
Returns an array containing all the tweens of a particular target (or group of targets) that have not yet been released for garbage collection which typically happens when the tween completes. For example,
gsap.getTweensOf(".myClass")
returns an array of all tweens of elements with the "myClass" class applied. You can pass in the actual element/target/object instead, of course.
Since the method only finds tweens that haven't been released for garbage collection, if you create a tween and then let it finish and then a while later try to find it with
getTweensOf()
, it may not be found because it was released by the engine for garbage collection. Remember, one of the best parts of GSAP is that it saves you from the headache of managing garbage collection chores. Otherwise, you'd need to manually dispose each tween you create, making things much more cumbersome.
gsap
.
to
(
obj1
,
{
x
:
100
}
)
;
gsap
.
to
(
obj2
,
{
x
:
100
}
)
;
gsap
.
to
(
[
obj1
,
obj2
]
,
{
opacity
:
0
}
)
;
var
a1
=
gsap
.
getTweensOf
(
obj1
)
;
//finds 2 tweens
var
a2
=
gsap
.
getTweensOf
(
[
obj1
,
obj2
]
)
;
//finds 3 tweens
Previous
gsap.getProperty()
Next
gsap.isTweening()
Contents
Returns : Array
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