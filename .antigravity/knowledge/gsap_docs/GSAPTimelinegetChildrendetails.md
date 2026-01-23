getChildren | GSAP | Docs & Learning
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
.getChildren()
On this page
getChildren
getChildren
( nested:Boolean, tweens:Boolean, timelines:Boolean, ignoreBeforeTime:Number ) : Array
Returns an array containing all the tweens and/or timelines nested in this timeline.
Parameters
nested
: Boolean
(default =
true
) - Determines whether or not tweens and/or timelines that are inside nested timelines should be returned. If you only want the "top level" tweens and timelines, set this to
false
.
tweens
: Boolean
(default =
true
) - Determines whether or not tweens should be included in the results.
timelines
: Boolean
(default =
true
) - Determines whether or not timelines should be included in the results.
ignoreBeforeTime
: Number
Number
(default =
-Infinity
) - All children with start times that are less than this value will be ignored.
Returns : Array
â
An Array of child tweens and timelines.
Details
â
Returns an array containing all the tweens and/or timelines nested in this timeline that match the provided criteria. Callbacks (delayed calls) are considered zero-duration tweens.
//first, let's set up a master timeline and nested timeline:
var
master
=
gsap
.
timeline
(
{
defaults
:
{
duration
:
1
}
}
)
,
nested
=
gsap
.
timeline
(
)
;
//drop 2 tweens into the nested timeline
nested
.
to
(
"#e1"
,
{
duration
:
1
,
x
:
100
}
)
.
to
(
"#e2"
,
{
duration
:
2
,
y
:
200
}
)
;
//drop 3 tweens into the master timeline
master
.
to
(
"#e3"
,
{
top
:
200
}
)
.
to
(
"#e4"
,
{
left
:
100
}
)
.
to
(
"#e5"
,
{
backgroundColor
:
"red"
}
)
;
//nest the timeline:
master
.
add
(
nested
)
;
//get only the direct children of the master timeline:
var
children
=
master
.
getChildren
(
false
,
true
,
true
)
;
console
.
log
(
children
.
length
)
;
//"3" (2 tweens and 1 timeline)
//get all of the tweens/timelines (including nested ones) that occur AFTER 0.5 seconds
children
=
master
.
getChildren
(
true
,
true
,
true
,
0.5
)
;
console
.
log
(
children
.
length
)
;
//"5" (4 tweens and 1 timeline)
//get only tweens (not timelines) of master (including nested tweens):
children
=
master
.
getChildren
(
true
,
true
,
false
)
;
console
.
log
(
children
.
length
)
;
//"5" (5 tweens)
Previous
.getById()
Next
.getTweensOf()
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