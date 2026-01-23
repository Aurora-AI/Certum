static-getPosition | GSAP | Docs & Learning
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
methods
DrawSVGPlugin.getLength()
DrawSVGPlugin.getPosition()
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
DrawSVG
methods
DrawSVGPlugin.getPosition()
On this page
DrawSVGPlugin
.getPosition
DrawSVGPlugin
.getPosition
( element:[Element | Selector text] ) : Number
Provides an easy way to get the current position of the DrawSVG.
Parameters
element
: [Element | Selector text]
The element (or the selector text for the element) whose position you'd like to get.
Returns : Number
â
The position of an SVG element's stroke.
Details
â
Provides an easy way to get the position of an SVG element's stroke including:
,
,
,
,
,
, and
.
When combined with the length (obtained using
DrawSVGPlugin.getLength
), you can calculate the total percentage at any given moment like so:
function
getPercentage
(
element
)
{
return
Math
.
floor
(
DrawSVGPlugin
.
getPosition
(
element
)
[
1
]
/
(
DrawSVGPlugin
.
getLength
(
element
)
/
100
)
)
;
}
Previous
DrawSVGPlugin.getLength()
Next
Easel
Contents
Returns : Number
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