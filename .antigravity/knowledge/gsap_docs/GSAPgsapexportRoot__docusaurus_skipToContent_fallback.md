gsap.exportRoot() | GSAP | Docs & Learning
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
gsap.exportRoot()
On this page
gsap.exportRoot()
Returns :
Timeline
â
A new Timeline instance containing the root tweens and timelines
Details
â
Seamlessly transfers all tweens, timelines, and [optionally] delayed calls from the root timeline into a new timeline so that you can perform advanced tasks on a seemingly global basis without affecting tweens/timelines that you create
after
the export.
For example, imagine a game that uses the GSAP for all of its animations and at some point during the game, you want to slow everything down to a stop (animating the
timeScale
) while at the same time animating a new popup window into place:
var
tl
=
gsap
.
exportRoot
(
)
;
gsap
.
to
(
tl
,
{
duration
:
0.5
,
timeScale
:
0
}
)
;
//this tween isn't affected because it's created after the export.
gsap
.
fromTo
(
myWindow
,
{
scaleX
:
0
,
scaleY
:
0
}
,
{
duration
:
1
,
scaleX
:
1
,
scaleY
:
1
}
)
;
You could then re-animate things when you're ready by tweening the
timeScale
back to 1. Or you could use
exportRoot()
to collect all the animations and
pause()
them and then animate the popup screen (or whatever). Then
resume()
that instance or even
reverse()
.
You can
exportRoot()
as many times as you want; all it does is wrap all the loose tweens, timelines, and delayedCalls into a timeline which itself gets placed onto the root, so if you
exportRoot()
again, that timeline would get wrapped into another one, etc. Things can be nested as deeply as you want.
warning
Completed tweens and timelines are removed from the globalTimeline (for automatic garbage collection), so if you
exportRoot()
after
a particular tween completes, it won't be included in the export.
Previous
gsap.delayedCall()
Next
gsap.from()
Contents
Returns : Timeline
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