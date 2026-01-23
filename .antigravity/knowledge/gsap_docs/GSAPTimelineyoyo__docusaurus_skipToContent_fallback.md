yoyo | GSAP | Docs & Learning
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
.yoyo()
On this page
yoyo
yoyo
( value:Boolean ) : [Boolean | self]
Gets or sets the timeline's yoyo state, where true causes the timeline to go back and forth, alternating backward and forward on each repeat.
Parameters
value
: Boolean
(default =
false
) - Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
Returns : [Boolean | self]
â
Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
Details
â
Gets or sets the timeline's
yoyo
state, where
true
causes the timeline to go back and forth, alternating backward and forward on each repeat.
yoyo
works in conjunction with
repeat
, where
repeat
controls how many times the timeline repeats, and
yoyo
controls whether or not each repeat alternates direction. So in order to make a timeline
yoyo
, you must set its
repeat
to a non-zero value.
Yoyo-ing, has no affect on the timeline's
reversed
property. For example, if
repeat
is 2 and
yoyo
is
false
, it will look like: start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end. But if
yoyo
is
true
, it will look like: start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end.
You can set the
yoyo
property initially by passing
yoyo: true
in the
vars
parameter, like:
gsap.timeline({repeat: 1, yoyo: true});
This method serves as both a getter and setter. Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining, like
myTimeline.yoyo(true).repeat(3).timeScale(2).play(0.5);
//gets current yoyo state
var
yoyo
=
tl
.
yoyo
(
)
;
//sets yoyo to true
tl
.
yoyo
(
true
)
;
Previous
.tweenTo()
Next
CSS
Contents
Returns : [Boolean | self]
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