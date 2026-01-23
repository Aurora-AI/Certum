gsap.killTweensOf() | GSAP | Docs & Learning
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
properties
gsap.effects
gsap.globalTimeline
gsap.ticker
gsap.utils
gsap.version
methods
gsap.config()
gsap.context()
gsap.defaults()
gsap.delayedCall()
gsap.exportRoot()
gsap.from()
gsap.fromTo()
gsap.getById()
gsap.getProperty()
gsap.getTweensOf()
gsap.isTweening()
gsap.killTweensOf()
gsap.matchMedia()
gsap.matchMediaRefresh()
gsap.parseEase()
gsap.quickSetter()
gsap.quickTo()
gsap.registerEase()
gsap.registerEffect()
gsap.registerPlugin()
gsap.set()
gsap.timeline()
gsap.to()
gsap.updateRoot()
Internal Plugins
Tween
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
GSAP
methods
gsap.killTweensOf()
gsap.killTweensOf()
Kills all the tweens (or specific tweening properties) of a particular object or the delayedCalls to a particular function. If, for example, you want to kill all tweens of elements with the class
"myClass"
, you'd do this:
gsap
.
killTweensOf
(
".myClass"
)
;
To kill only particular tweening properties of the object, use the second parameter. For example, if you only want to kill all the tweens of
myObject.opacity
and
myObject.x
, you'd do this:
gsap
.
killTweensOf
(
myObject
,
"opacity,x"
)
;
To kill all the delayedCalls (like ones created using
gsap.delayedCall(5, myFunction);
), you can simply call
gsap.killTweensOf(myFunction);
because delayedCalls are simply tweens that have their
target
and
onComplete
set to the same function (as well as a
delay
of course).
You can also pass in a string that defines selector text, like
"#myID"
to kill the tweens of the element with an ID of "myID" or
"\*"
to kill all tweens with DOM targets. You may also pass in an array of targets.
killTweensOf()
affects tweens that haven't begun yet too. If, for example, a tween of
myObject
has a
delay
of 5 seconds and
gsap.killTweensOf(myObject)
is called 2 seconds after the tween was created, it will still be killed even though it hasn't started yet.
Previous
gsap.isTweening()
Next
gsap.matchMedia()
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