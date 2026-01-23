ExpoScaleEase | GSAP | Docs & Learning
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
CustomBounce
CustomEase
CustomWiggle
ExpoScaleEase
RoughEase
SlowMo
SteppedEase
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
Easing
ExpoScaleEase
On this page
ExpoScaleEase
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
EasePack
)
Minimal usage
// we're starting at a scale of 1 and animating to 2, so pass those into config()...
gsap
.
to
(
"#image"
,
{
duration
:
1
,
scale
:
2
,
ease
:
"expoScale(1, 2)"
}
)
;
Not included in the Core
This ease is in the EasePack file. To learn how to include this in your project, see
the Installation page
.
Description
â
There's an interesting phenomena that occurs when you animate an object's
scale
that makes it appear to change speed
even with a linear ease
;
ExpoScaleEase
compensates for this effect by bending the easing curve accordingly. This is the secret sauce for silky-smooth zooming/scaling animations.
Video Explanation
â
Walkthrough
Configuration
â
In order for ExpoScaleEase to create the correct easing curve, you must pass in the
starting
and
ending
scale values in the string, like:
// we're starting at a scale of 1 and animating to 2, so pass those into config()...
gsap
.
to
(
"#image"
,
{
duration
:
1
,
scale
:
2
,
ease
:
"expoScale(1, 2)"
}
)
;
It can also accept a 3rd parameter, the ease that you'd like it to bend (the default is
"none"
). So, for example, if you'd like to use
"power2.inOut"
, your code would look like:
//scale from 0.5 to 3 using "power2.inOut" ...
gsap
.
fromTo
(
"#image"
,
{
scale
:
0.5
}
,
{
duration
:
1
,
scale
:
3
,
ease
:
"expoScale(0.5, 3, power2.inOut)"
}
)
;
Note:
The scale values passed into the
config()
method
must be non-zero
because the math wouldn't work with 0. You're welcome to use a small value like 0.01 instead. Using a
SUPER
small number like 0.00000001 may not be ideal because a large portion of the tween would be used going through the very small values.
Simple Demo
â
loading...
Complex Demo
â
loading...
Previous
CustomWiggle
Next
RoughEase
Contents
Description
Video Explanation
Configuration
Simple Demo
Complex Demo
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