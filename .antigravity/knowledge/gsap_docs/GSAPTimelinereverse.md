reverse | GSAP | Docs & Learning
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
methods
.reverse()
On this page
reverse
reverse
( from:\*, suppressEvents:Boolean ) : self
Reverses playback so that all aspects of the animation are oriented backwards including, for example, a tween's ease.
Parameters
from
: \*
(default =
null
) - The time (or label for Timeline instances) from which the animation should begin playing in reverse (if none is defined, it will begin playing from wherever the playhead currently is). To begin at the very end of the animation, use
0
. Negative numbers are relative to the end of the animation, so -1 would be 1 second from the end.
suppressEvents
: Boolean
Boolean
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
Reverses playback so that all aspects of the animation are oriented backwards including, for example, a tween's ease. This will cause the instance's
time
and
totalTime
to move back towards zero as well. You can optionally define a specific time to jump to before reversing (by default it begins playing in reverse from wherever the playhead currently is). Calling
reverse()
also ensures that the instance is neither paused nor reversed.
To jump to the very end of the animation and play in reverse from there, use 0 as the "from" parameter, like
reverse(0)
.
To check whether or not the instance is reversed, use the
reversed()
method, like if (
myAnimation.reversed()) {...}
If you define a "from" time (the first parameter, which could also be a label for timeline instances), the playhead moves there immediately and if there are any events/callbacks inbetween where the playhead was and the new time, they will not be triggered because by default
suppressEvents
(the 2nd parameter) is
true
. Think of it like picking the needle up on a record player and moving it to a new position before placing it back on the record. If, however, you do not want the events/callbacks suppressed during that initial move, simply set the
suppressEvents
parameter to
false
.
//reverses playback from wherever the playhead currently is:
tl
.
reverse
(
)
;
//reverses playback from exactly 2 seconds into the animation:
tl
.
reverse
(
2
)
;
//reverses playback from exactly 2 seconds into the animation but doesn't suppress events during the initial move:
tl
.
reverse
(
2
,
false
)
;
//reverses playback from the very END of the animation:
tl
.
reverse
(
0
)
;
//reverses playback starting from exactly 1 second before the end of the animation:
tl
.
reverse
(
-
1
)
;
//flips the orientation (if it's forward, it will go backward, if it is backward, it will go forward):
if
(
tl
.
reversed
(
)
)
{
tl
.
play
(
)
;
}
else
{
tl
.
reverse
(
)
;
}
//flips the orientation using the reversed() method instead (shorter version of the code above):
tl
.
reversed
(
!
tl
.
reversed
(
)
)
;
Previous
.resume()
Next
.reversed()
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