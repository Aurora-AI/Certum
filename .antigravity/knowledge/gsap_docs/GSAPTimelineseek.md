seek | GSAP | Docs & Learning
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
.seek()
On this page
seek
seek
( position:\*, suppressEvents:Boolean ) : self
[override] Jumps to a specific time (or label) without affecting whether or not the instance is paused or reversed.
Parameters
position
: \*
The position to go to, described in any of the following ways: a numeric value indicates an absolute position, like 3 would be exactly 3 seconds from the beginning of the timeline. A string value can be either a label (i.e. "myLabel") or a relative value using the "+=" or "-=" prefixes like "-=2" (2 seconds before the end of the timeline) or a combination like "myLabel+=2" to indicate 2 seconds after "myLabel" See the
Position Parameter article
which has interactive timeline visualizations and a video.
suppressEvents
: Boolean
(default =
true
) - If
true
(the default), no events or callbacks will be triggered when the playhead moves to the new position defined in the
time
parameter.
Returns : self
â
self (makes chaining easier)
Details
â
Jumps to a specific time (or label) without affecting whether or not the instance is paused or reversed.
If there are any events/callbacks inbetween where the playhead was and the new time, they will not be triggered because by default
suppressEvents
(the 2nd parameter) is
true
. Think of it like picking the needle up on a record player and moving it to a new position before placing it back on the record. If, however, you do not want the events/callbacks suppressed during that initial move, simply set the
suppressEvents
parameter to
false
.
//jumps to exactly 2 seconds
tl
.
seek
(
2
)
;
//jumps to exactly 2 seconds but doesn't suppress events during the initial move:
tl
.
seek
(
2
,
false
)
;
//jumps to the "myLabel" label
tl
.
seek
(
"myLabel"
)
;
Previous
.revert()
Next
.set()
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