tweenFromTo | GSAP | Docs & Learning
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
.tweenFromTo()
On this page
tweenFromTo
tweenFromTo
( fromPosition:[Number | Label], toPosition:[Number | Label], vars:Object ) : Tween
Creates a linear tween that essentially scrubs the playhead from a particular time or label to another time or label and then stops.
Parameters
fromPosition
: [Number | Label]
The beginning time in seconds or label from which the timeline should play.
toPosition
: [Number | Label]
The destination time in seconds or label to which the timeline should play.
vars
: Object
(default =
null
) - An optional vars object that will be passed to the Tween instance. This allows you to define an
onComplete
,
ease
,
delay
, or any other Tween special property.
Returns : Tween
â
Tween instance that handles tweening the timeline between the desired times and labels.
Details
â
Creates a linear tween that essentially scrubs the playhead from a particular time or label to another time or label and then stops. If you plan to sequence multiple playhead tweens one-after-the-other,
tweenFromTo()
is better to use than
tweenTo()
because it allows the duration to be determined immediately, ensuring that subsequent tweens that are appended to a sequence are positioned appropriately. For example, to make the timeline play from the label "myLabel1" to the "myLabel2" label, and then from "myLabel2" back to the beginning (a time of 0), simply do:
var
master
=
gsap
.
timeline
(
)
;
master
.
add
(
tl
.
tweenFromTo
(
"myLabel1"
,
"myLabel2"
)
)
;
master
.
add
(
tl
.
tweenFromTo
(
"myLabel2"
,
0
)
)
;
If you want advanced control over the tween, like adding an
onComplete
or changing the
ease
or adding a
delay
, just pass in a vars object with the appropriate properties.
For example, to tween from the start (0) to the 5-second spot on the timeline and then call a function named
myFunction
and pass in a parameter that references this timeline and use a
strong
ease, you'd do:
tl
.
tweenFromTo
(
0
,
5
,
{
onComplete
:
myFunction
,
onCompleteParams
:
[
tl
]
,
ease
:
"strong"
,
}
)
;
Remember, this method simply creates a tween that tweens the
time()
of your timeline. So you can store a reference to that tween if you want, and you can
kill()
it anytime.
Also note that
tweenFromTo()
does
NOT
affect the timeline's
reversed
property. So if your timeline is oriented normally (not reversed) and you tween to a time or label that precedes the current time, it will appear to go backwards but the
reversed
property will not change to true.
Also note that
tweenFromTo()
pauses the timeline immediately before tweening its
time()
, and it does not automatically resume after the tween completes. If you need to resume playback, you can always use an onComplete to call the
resume()
method.
Like all from-type methods in GSAP,
immediateRender
is
true
by default, meaning the timeline will immediately jump to the "from" time/label unless you set
immediateRender: false
(like
.tweenFromTo(1, 5, {immediateRender: false})
).
Previous
.totalTime()
Next
.tweenTo()
Contents
Returns : Tween
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