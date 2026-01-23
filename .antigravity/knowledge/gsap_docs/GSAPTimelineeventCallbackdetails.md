eventCallback | GSAP | Docs & Learning
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
.eventCallback()
On this page
eventCallback
eventCallback
( type:String, callback:Function, params:Array ) : [Function | self]
Gets or sets an event callback like
onComplete
,
onUpdate
,
onStart
,
onReverseComplete
, or
onRepeat
along with any parameters that should be passed to that callback.
Parameters
type
: String
The type of event callback, like
onComplete
,
onUpdate
,
onStart
, or
onRepeat
. This is case-sensitive.
callback
: Function
(default =
null
) - The function that should be called when the event occurs.
params
: Array
(default =
null
) - An array of parameters to pass the callback.
Returns : [Function | self]
â
Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
Details
â
Gets or sets an event callback like
"onComplete"
,
"onUpdate"
,
"onStart"
,
"onReverseComplete"
,
"onInterrupt"
, or
"onRepeat"
along with any parameters that should be passed to that callback. This is the same as defining the values directly in the constructor's
vars
parameter initially, so the following two lines are functionally equivalent:
//the following two lines produce IDENTICAL results for onComplete behavior:
gsap
.
to
(
obj
,
{
duration
:
1
,
x
:
100
,
onComplete
:
myFunction
,
onCompleteParams
:
[
"param1"
,
"param2"
]
,
}
)
;
myAnimation
.
eventCallback
(
"onComplete"
,
myFunction
,
[
"param1"
,
"param2"
]
)
;
The benefit of using
eventCallback()
is that it allows you to set callbacks even
after
the animation instance has been created and it also allows you to inspect the callback references or even delete them on-the-fly (use
null
to delete the event callback).
//deletes the onUpdate
myAnimation
.
eventCallback
(
"onUpdate"
,
null
)
;
warning
Animation instances can only have one callback associated with each event type (one
onComplete
, one
onUpdate
, one
onStart
, etc.). So setting a new value will overwrite the old one. All of the values populate the
vars
object too which was originally passed into the constructor (think of that like a storage place for configuration data).
This method serves as both a getter and setter. Omitting all but the first parameter returns the current value (getter), whereas defining more than the first parameter sets the value (setter) and returns the instance itself for easier chaining, like
myAnimation
.
eventCallback
(
"onComplete"
,
completeHandler
)
.
eventCallback
(
"onUpdate"
,
updateHandler
,
[
"param1"
]
)
.
play
(
1
)
;
`
`
`
Previous
.endTime()
Next
.from()
Contents
Returns : [Function | self]
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