ratio | GSAP | Docs & Learning
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
properties
.data
.ratio
.scrollTrigger
.vars
methods
.delay()
.duration()
.endTime()
.eventCallback()
.globalTime()
.invalidate()
.isActive()
.iteration()
.kill()
.pause()
.paused()
.play()
.progress()
.repeat()
.repeatDelay()
.restart()
.resume()
.reverse()
.reversed()
.revert()
.seek()
.startTime()
.targets()
.then()
.time()
.timeScale()
.totalDuration()
.totalProgress()
.totalTime()
.yoyo()
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
Tween
properties
.ratio
On this page
ratio
ratio
[read-only]
the progress of the Tween (a value between 0 and 1 where 0.5 is in the middle)
after
being run through the
ease
. So this value may exceed the 0-1 range, like in the case of
ease: "back"
or
ease: "elastic"
. It can be useful as a multiplier for your own interpolation, like in an
onUpdate
callback.
Details
â
[read-only] the progress of the Tween (a value between 0 and 1 where 0.5 is in the middle)
after
being run through the
ease
. So this value may exceed the 0-1 range, like in the case of
ease: "back"
or
ease: "elastic"
. It can be useful as a multiplier for your own interpolation, like in an
onUpdate
callback.
So if you have a one second tween with an ease of
"power2.out"
, at the 0.5 second mark (where the progress is also half way),
tween.progress()
will report 0.5 while
tween.ratio
will report 0.875. As the code below shows,
this.ratio
is always equal to value you can obtain from passing the tween's
.progress()
into the ease function.
const
easeFunc
=
gsap
.
parseEase
(
"power2.out"
)
;
const
tween
=
gsap
.
to
(
{
foo
:
0
}
,
{
foo
:
10
,
duration
:
1
,
ease
:
"power2.out"
}
)
;
tween
.
pause
(
0.5
)
;
// pause at 0.5 seconds which is halfway in this 1-second tween
console
.
log
(
tween
.
progress
(
)
)
;
// 0.5
console
.
log
(
tween
.
ratio
)
;
// 0.875
console
.
log
(
easeFunc
(
tween
.
progress
(
)
)
)
;
// 0.875
Previous
.data
Next
.scrollTrigger
Contents
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