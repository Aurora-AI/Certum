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
.duration()
On this page
duration
duration
( value:Number ) : [Number | self]
[override] Gets the timeline's duration or, if used as a setter, adjusts the timeline's timeScale to fit it within the specified duration.
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
Gets the timeline's
duration
or, if used as a setter, adjusts the timeline's
timeScale
to fit it within the specified duration.
duration()
is identical to
totalDuration()
except for timeline instances that have a non-zero
repeat
in which case
totalDuration
includes
repeat
s and
repeatDelays
whereas
duration
doesn't.
For example, if a timeline has a
duration
of 2 and a
repeat
of 3, its
totalDuration
would be 8 (one standard play plus 3 repeats equals 4 total cycles).
Due to the fact that a timeline's
duration
is dictated by its contents, using this method as a setter will simply cause the
timeScale
to be adjusted to fit the current contents into the specified
duration
, but the
duration
value itself will remain unchanged.
For example, if there are 20-seconds worth of tweens in the timeline and you do
myTimeline.duration(10)
, the
timeScale
would be changed to 2. If you checked the
duration
again immediately after that, it would still return 20 because technically that is how long all the child tweens/timelines are but upon playback the speed would be doubled because of the
timeScale
.
This method serves as both a getter and setter. Omitting the parameter returns the current value (getter), whereas defining the parameter sets the value (setter) and returns the instance itself for easier chaining, like
myAnimation.duration(2).play(1);
//gets current duration
var
currentDuration
=
tl
.
duration
(
)
;
//adjusts the timeScale of myAnimation so that it fits into exactly 10 seconds on its parent timeline
tl
.
duration
(
10
)
;
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