pause | GSAP | Docs & Learning
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
methods
.pause()
On this page
pause
pause
( atTime:Number, suppressEvents:Boolean ) : self
Pauses the instance, optionally jumping to a specific time.
Parameters
atTime
: Number
(default =
null
) - The time that the instance should jump to before pausing (if none is defined, it will pause wherever the playhead is currently located).
suppressEvents
: Boolean
default =
true
) - If
true
(the default), no events or callbacks will be triggered when the playhead moves to the new position defined in the
atTime
parameter.
Returns : self
â
self (makes chaining easier)
Details
â
Pauses the instance, optionally jumping to a specific time.
If you define a time to jump to (the first parameter, which could also be a label for timeline instances), the playhead moves there immediately and if there are any events/callbacks inbetween where the playhead was and the new time, they will not be triggered because by default
suppressEvents
(the 2nd parameter) is
true
. Think of it like picking the needle up on a record player and moving it to a new position before placing it back on the record. If, however, you do not want the events/callbacks suppressed during that initial move, simply set the
suppressEvents
parameter to
false
.
//pauses wherever the playhead currently is:
myAnimation
.
pause
(
)
;
//jumps to exactly 2-seconds into the animation and then pauses:
myAnimation
.
pause
(
2
)
;
//jumps to exactly 2-seconds into the animation and pauses but doesn't suppress events during the initial move:
myAnimation
.
pause
(
2
,
false
)
;
Previous
.kill()
Next
.paused()
Contents
Returns : self
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