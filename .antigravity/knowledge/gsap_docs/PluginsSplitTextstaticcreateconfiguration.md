static-create | GSAP | Docs & Learning
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
properties
.chars
.isSplit
.lines
.masks
.vars
.words
methods
.kill()
.revert()
.split()
SplitText.create()
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
SplitText
methods
SplitText.create()
On this page
SplitText
.create
SplitText
.create
( target: Element | String | Array
, vars:Object ) : SplitText
Creates and returns a standalone SplitText instance
Parameters
vars
: Object
An object containing all of the configuration details for the SplitText
Returns : SplitText
â
The new SplitText instance
Details
â
Creates a new standalone SplitText instance.
Example
â
SplitText
.
create
(
".headline"
,
{
type
:
"lines,words"
,
linesClass
:
"line"
,
wordsClass
:
"word++"
,
autoSplit
:
true
,
onSplit
:
(
self
)
=>
{
return
gsap
.
from
(
self
.
lines
,
{
yPercent
:
100
,
opacity
:
0
,
stagger
:
0.1
}
)
;
}
}
)
;
Configuration
â
see the main SplitText page.
Previous
.split()
Next
Flip
Contents
Returns : SplitText
Details
Example
Configuration
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