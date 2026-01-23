static-killFlipsOf | GSAP | Docs & Learning
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
methods
Flip.batch()
Flip.fit()
Flip.from()
Flip.getState()
Flip.isFlipping()
Flip.killFlipsOf()
Flip.makeAbsolute()
Flip.to()
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
Flip
methods
Flip.killFlipsOf()
On this page
Flip
.killFlipsOf
Flip
.killFlipsOf
( targets:String | Array | NodeList | Element, complete:boolean ) ;
Immediately kills the Flip animation associated with any of the targets provided.
Parameters
targets
: String | Array | NodeList | Element
The targets whose Flip animations should be killed. It can be selector text, an Array, Element, or NodeList.
complete
: boolean
If
false
, the flip animation(s) will be forced to completion rather than just stopped.
Details
â
Immediately kills the Flip animation associated with any of the targets provided. It will also force them to completion unless the 2nd parameter is explicitly set to
false
.
Flip
.
killFlipsOf
(
".box, .container"
)
;
Previous
Flip.isFlipping()
Next
Flip.makeAbsolute()
Contents
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