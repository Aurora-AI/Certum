duration | GSAP | Docs & Learning
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
.duration()
On this page
duration
duration
( value:Number ) : [Number | self]
Gets or sets the animation's duration, not including any repeats or repeatDelays.
Parameters
value
: Number
(default =
NaN
) - Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
Returns : [Number | self]
â
Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining.
Details
â
Gets or sets the animation's
duration
, not including any
repeat
s or
repeatDelay
s. For example, if a tween has a
duration
of 2 and a
repeat
of 3, its
totalDuration
would be 8 (one standard play plus 3 repeats equals 4 total cycles).
This method serves as both a getter and setter. Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining, like
myAnimation.duration(2).delay(0.5).play(1);
var
currentDuration
=
myAnimation
.
duration
(
)
;
//gets current durationmyAnimation.duration(2); //sets duration
Previous
.delay()
Next
.endTime()
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