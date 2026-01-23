PhysicsProps | GSAP | Docs & Learning
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
CSS
Easing
Plugins
What's a plugin?
ScrollTrigger
ScrollSmoother
SplitText
Flip
more plugins
CSSRule
Draggable
DrawSVG
Easel
GSDevTools
Inertia
MorphSVG
MotionPath
MotionPathHelper
Observer
Physics2D
PhysicsProps
Pixi
ScrambleText
ScrollTo
Text
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
more plugins
PhysicsProps
On this page
PhysicsProps
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
PhysicsPropsPlugin
)
Minimal usage
gsap
.
to
(
obj
,
{
duration
:
2
,
physicsProps
:
{
x
:
{
velocity
:
100
,
acceleration
:
200
}
,
y
:
{
velocity
:
-
200
,
friction
:
0.1
}
,
}
,
}
)
;
Description
â
Sometimes it's useful to tween a value at a particular velocity and/or acceleration without a specific end value in mind. PhysicsPropsPlugin allows you to tween
any
numeric property of
any
object based on these concepts. Keep in mind that any easing equation you define for your tween will be completely ignored for these properties. Instead, the physics parameters will determine the movement/easing.
Config Object
â
Property
Description
velocity
Number
- The initial velocity of the object measured in units per second. Default:
0
.
acceleration
Number
- The amount of acceleration applied to the object, measured in units per second. Default:
0
.
friction
Number
- A value between 0 and 1 where 0 is no friction, 0.08 is a small amount of friction, and 1 will completely prevent any movement. This is not meant to be precise or scientific in any way, but it serves as an easy way to apply a friction-like physics effect to your tween. Generally it is best to experiment with this number a bit, starting at a very low value like
0.02
. Also note that friction requires more processing than physics tweens without any friction. Default:
0
.
info
These parameters are not intended to be dynamically updateable. But one unique convenience is that everything is reverseable. So if you create several physics-based tweens, for example, and throw them into a timeline, you could simply call reverse() on the timeline to watch the objects retrace their steps right back to the beginning. Here are the parameters you can define (note that
friction
and
acceleration
are both completely optional):
Demos
â
PhysicsProps demos
Previous
Physics2D
Next
Pixi
Contents
Description
Config Object
Demos
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