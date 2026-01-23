totalTime | GSAP | Docs & Learning
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
.totalTime()
On this page
totalTime
totalTime
( time:Number, suppressEvents:Boolean ) : [Number | self]
Gets or sets the position of the playhead according to the totalDuration which includes any repeats and repeatDelays.
Parameters
time
: Number
(default =
NaN
) - Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining. Negative values will be interpreted from the
END
of the animation.
suppressEvents
: Boolean
(default =
false
) - If
true
, no events or callbacks will be triggered when the playhead moves to the new position defined in the
time
parameter.
Returns : [Number | self]
â
Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
Details
â
Gets or sets the position of the playhead according to the
totalDuration
which
includes any repeats and repeatDelays
. For example, if a tween has a
duration
of 2 and a
repeat
of 3,
totalTime
will go from 0 to 8 during the course of the tween (plays once then repeats 3 times, making 4 total cycles) whereas
time
will go from 0 to 2 a total of 4 times. If you added a
repeatDelay
of 1, that would make the
totalTime
go from 0 to 11 over the course of the tween.
This method serves as both a getter and setter. Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
totalTime
will never exceed the
totalDuration
, nor will it be less than 0 (values will be clipped appropriately). Negative values will be interpreted from the
END
of the animation. For example, -2 would be 2 seconds before the end. If the animation's
totalDuration
is 6 and you do
myAnimation.totalTime(-2)
, it will jump to a
totalTime
of 4.
//gets total time
var
totalTime
=
myAnimation
.
totalTime
(
)
;
//sets total time, jumping to new value just like seek().
myAnimation
.
totalTime
(
2
)
;
Previous
.totalProgress()
Next
.yoyo()
Contents
Returns : [Number | self]
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