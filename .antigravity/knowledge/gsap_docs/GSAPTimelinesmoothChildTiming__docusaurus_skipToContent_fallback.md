smoothChildTiming | GSAP | Docs & Learning
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
properties
.autoRemoveChildren
.data
.labels
.parent
.scrollTrigger
.smoothChildTiming
.vars
methods
.add()
.addLabel()
.addPause()
.call()
.clear()
.currentLabel()
.delay()
.duration()
.endTime()
.eventCallback()
.from()
.fromTo()
.getById()
.getChildren()
.getTweensOf()
.globalTime()
.invalidate()
.isActive()
.iteration()
.kill()
.killTweensOf()
.nextLabel()
.pause()
.paused()
.play()
.previousLabel()
.progress()
.recent()
.remove()
.removeLabel()
.removePause()
.repeat()
.repeatDelay()
.restart()
.resume()
.reverse()
.reversed()
.revert()
.seek()
.set()
.shiftChildren()
.startTime()
.then()
.time()
.timeScale()
.to()
.totalDuration()
.totalProgress()
.totalTime()
.tweenFromTo()
.tweenTo()
.yoyo()
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
Timeline
properties
.smoothChildTiming
On this page
smoothChildTiming
smoothChildTiming
: Boolean
Controls whether or not child tweens and timelines are repositioned automatically (changing their
startTime
) in order to maintain smooth playback when properties are changed on-the-fly.
Details
â
Controls whether or not child tweens and timelines are repositioned automatically (changing their
startTime
) in order to maintain smooth playback when properties are changed on-the-fly.
For example, imagine that the timeline's playhead is on a child tween that is 75% complete, moving
obj.x
from 0 to 100 and then that tween's
reverse()
method is called. If
smoothChildTiming
is
false
(the default except for the root timelines), the tween would flip in place, keeping its
startTime
consistent. Therefore the playhead of the timeline would now be at the tween's 25% completion point instead of 75%. Remember, the timeline's playhead position and direction are unaffected by child tween/timeline changes.
obj.x
would jump from 75 to 25, but the tween's position in the timeline would remain consistent.
However, if
smoothChildTiming
is
true
, that child tween's
startTime
would be adjusted so that the timeline's playhead intersects with the same spot on the tween (75% complete) as it had immediately before
reverse()
was called, thus playback appears perfectly smooth.
obj.x
would still be 75 and it would continue from there as the playhead moves on, but since the tween is reversed now
obj.x
will travel back towards 0 instead of 100. Ultimately it's a decision between prioritizing smooth on-the-fly playback (
true
) or consistent position(s) of child tweens and timelines (
false
).
Some examples of properties/methods that on-the-fly changes could affect
startTime
(when
smoothChildTiming
is
true
) :
reversed
,
timeScale
,
progress
,
totalProgress
,
time
,
totalTime
,
delay
,
pause
,
resume
,
duration
, and
totalDuration
.
The
gsap.globalTimeline
has
smoothChildTiming
set to
true
.
Previous
.scrollTrigger
Next
.vars
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