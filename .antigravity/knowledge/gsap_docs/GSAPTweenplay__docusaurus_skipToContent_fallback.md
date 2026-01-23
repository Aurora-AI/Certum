play | GSAP | Docs & Learning
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
.play()
On this page
play
play
( from:Number, suppressEvents:Boolean ) : self
Begins playing forward, optionally from a specific time (by default playback begins from wherever the playhead currently is).
Parameters
from
: Number
(default =
null
) - The time from which the animation should begin playing (if none is defined, it will begin playing from wherever the playhead currently is).
suppressEvents
: Boolean
(default =
true
) - If
true
(the default), no events or callbacks will be triggered when the playhead moves to the new position defined in the
from
parameter.
Returns : self
â
self (makes chaining easier)
Details
â
Begins playing forward, optionally from a specific time (by default playback begins from wherever the playhead currently is). This also ensures that the instance is neither paused nor reversed.
If you define a "from" time (the first parameter, which could also be a label for timeline instances), the playhead moves there immediately and if there are any events/callbacks inbetween where the playhead was and the new time, they will not be triggered because by default
suppressEvents
(the 2nd parameter) is
true
. Think of it like picking the needle up on a record player and moving it to a new position before placing it back on the record. If, however, you do not want the events/callbacks suppressed during that initial move, simply set the
suppressEvents
parameter to
false
.
//begins playing from wherever the playhead currently is:
myAnimation
.
play
(
)
;
//begins playing from exactly 2-seconds into the animation:
myAnimation
.
play
(
2
)
;
// jumps to exactly 2-seconds into the animation and starts playing but doesn't suppress events (meaning it will trigger any callbacks between the old and new playhead positions):
myAnimation
.
play
(
2
,
false
)
;
tip
if the Tween's timeScale is exactly 0 when play() is called, it will be changed to 1 (otherwise it wouldn't play). If you're going to tween it up from 0 you can set it to a very small number before calling play() like
myAnimation.timeScale(myAnimation.timeScale() || 0.001).play()
so that it doesn't jump to 1.
Previous
.paused()
Next
.progress()
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