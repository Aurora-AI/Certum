kill | GSAP | Docs & Learning
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
.kill()
On this page
kill
kill
( target:Object, propertiesList:String ) : self
Kills the animation entirely or in part depending on the parameters. To kill means to immediately stop the animation, remove it from its parent timeline, and release it for garbage collection.
Parameters
target
: Object
(default =
null
) - To kill only aspects of the animation related to a particular target (or targets), reference it here. For example, to kill only parts having to do with
myObject
, do
kill(myObject)
or to kill only parts having to do with
myObject1
and
myObject2
, do
kill([myObject1, myObject2])
. If no target is defined,
ALL
targets will be affected.
propertiesList
: String
(default =
"all"
) - a comma-delimited list of property names that should no longer be animated by this Tween. If no object (or
null
or
"all"
) is defined,
ALL
properties will be killed.
Returns : self
â
self (makes chaining easier)
Details
â
Kills the animation entirely or in part depending on the parameters. Simply calling
kill()
(omitting the parameters) will immediately stop the animation, remove it from its parent timeline, wipe out any property tweens and release it for garbage collection.
// kill the entire animation:
animation
.
kill
(
)
;
// set to null so the reference is removed
animation
=
null
;
To kill only a certain target (or targets) from the animation, use the first parameter. To kill particular tweening properties of the animation, use the second parameter which is a comma-delimited list of property names.
// kill all parts of the animation related to the target "myObject" (if the tween has multiple targets, the others will not be affected):
animation
.
kill
(
myObject
)
;
// kill only the "x" and "y" properties of the animation (all targets):
animation
.
kill
(
null
,
"x,y"
)
;
// kill only the "x" and "y" properties of animations of the target "myObject":
animation
.
kill
(
myObject
,
"x,y"
)
;
// kill only the "opacity" properties of animations of the targets "myObject1" and "myObject2":
animation
.
kill
(
[
myObject1
,
myObject2
]
,
"opacity"
)
;
//you could use selector text instead, like ".class1, .class2"
warning
don't kill() an animation if you want to use it again later - you could pause() it instead if you want to reuse it.
Previous
.iteration()
Next
.pause()
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