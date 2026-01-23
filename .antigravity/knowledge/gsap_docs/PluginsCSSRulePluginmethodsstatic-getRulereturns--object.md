static-getRule() | GSAP | Docs & Learning
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
methods
CSSRulePlugin.getRule()
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
CSSRule
methods
CSSRulePlugin.getRule()
On this page
CSSRulePlugin
.getRule
CSSRulePlugin
.getRule
( selector:String ) : Object
[static] Provides a simple way to find the style sheet object associated with a particular selector like
".myClass"
or
"#myID"
.
Parameters
selector
: String
The name that exactly matches the selector you want to animate (like
".myClassName"
).
Returns : Object
â
The stylesheet object (or an array of them if you define only a pseudo element selector like
::before
).
Details
â
Provides a simple way to find the style sheet object associated with a particular selector like
.myClass
or
#myID
. You'd use this method to determine the target of your tween.
For example, let's say you have CSS like this:
.myClass
{
color
:
#FF0000
;
}
.myClass
::before
{
content
:
"This content is before."
;
color
:
#00FF00
;
}
And you want to tween the color of the
.myClass::before
to
blue
. Make sure you load the CSSRulePlugin.js file and then you can do this:
var
rule
=
CSSRulePlugin
.
getRule
(
".myClass::before"
)
;
//get the rule
gsap
.
to
(
rule
,
{
duration
:
3
,
cssRule
:
{
color
:
"#0000FF"
}
}
)
;
Or you can feed the value directly into the tween like this:
gsap
.
to
(
CSSRulePlugin
.
getRule
(
".myClass::before"
)
,
{
duration
:
3
,
cssRule
:
{
color
:
"#0000FF"
}
,
}
)
;
Previous
CSSRule
Next
Draggable
Contents
Returns : Object
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