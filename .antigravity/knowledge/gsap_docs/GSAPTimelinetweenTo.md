tweenTo | GSAP | Docs & Learning
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
.tweenTo()
On this page
tweenTo
tweenTo
( position:[Number | Label], vars:Object ) : Tween
Creates a linear tween that essentially scrubs the playhead to a particular time or label and then stops.
Parameters
position
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
Creates a linear tween that essentially scrubs the playhead to a particular time or label and then stops. For example, to make the timeline play to the "myLabel2" label, simply do:
tl
.
tweenTo
(
"myLabel2"
)
;
If you want advanced control over the tween, like adding an
onComplete
or changing the
ease
or adding a
delay
, just pass in a
vars
object with the appropriate properties.
For example, to tween to the 5-second point on the timeline and then call a function named
myFunction
and pass in a parameter that references this timeline and use a
strong
ease, you'd do:
tl
.
tweenTo
(
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
Remember, this method simply creates a tween that pauses the timeline and then tweens the
time()
of the timeline. So you can store a reference to that tween if you want, and you can
kill()
it anytime.
Also note that
tweenTo()
does
NOT
affect the timeline's reversed state. So if your timeline is oriented normally (not reversed) and you tween to a time/label that precedes the current time, it will appear to go backwards but the reversed state will not change to true.
Also note that
tweenTo()
pauses the timeline immediately before tweening its
time()
, and it does
not
automatically resume after the tween completes. If you need to resume playback, you could always use an onComplete to call the timeline's
resume()
method.
If you plan to sequence multiple playhead tweens one-after-the-other, it is typically better to use
tweenFromTo()
so that you can define the starting point and ending point, allowing the duration to be accurately determined immediately.
Previous
.tweenFromTo()
Next
.yoyo()
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