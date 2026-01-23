gsap.globalTimeline | GSAP | Docs & Learning
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
properties
gsap.globalTimeline
On this page
gsap.globalTimeline
Type :
Timeline
â
gsap.globalTimeline
is the root Timeline instance that drives everything in GSAP, making it a powerful way to affect all animations at once. Keep in mind, however, that
gsap.delayedCalls()
are also technically tweens, so if you
pause()
or
timeScale()
the globalTimeline, it will affect delayedCalls() too. If you want to omit those, check out
gsap.exportRoot()
.
Useful Methods
â
gsap.globalTimeline
.pause()
- Pauses the global timeline which affects
ALL
animations. Returns itself.
gsap.globalTimeline
.play()
- Resumes the global timeline which affects
ALL
animations. Returns itself.
gsap.globalTimeline
.paused()
- Returns
true
if the global timeline is paused. Returns
false
if the global timeline is playing.
gsap.globalTimeline
.timeScale()
- Gets or sets the global time scale which is a multiplier that affects
ALL
animations. This doesn't actually set the
timeScale()
of each individual tween/timeline, but rather it affects the rate at which the root timeline plays (that timeline contains all other animations). This is a great way to globally speed up or slow down all animations at once. For example:
gsap
.
globalTimeline
.
timeScale
(
0.5
)
;
//plays at half-speed
gsap
.
globalTimeline
.
timeScale
(
2
)
;
//plays twice the normal speed
var
currentTimeScale
=
gsap
.
globalTimeline
.
timeScale
(
)
;
//returns the current global timeScale
info
Keep in mind that since the global timeline is used to run all other tweens and timelines,
gsap.globalTimeline.isActive()
will always return
true
regardless of whether or not there are any tweens or timelines currently active.
Previous
gsap.effects
Next
gsap.ticker
Contents
Type : Timeline
Useful Methods
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