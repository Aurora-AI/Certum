gsap.config() | GSAP | Docs & Learning
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
gsap.config()
On this page
gsap.config()
gsap.config()
lets you configure GSAP's settings that aren't Tween-specific, like
autoSleep
,
force3D
, and
units
. To affect properties that should be
inherited
by individual tweens, use
gsap.defaults()
instead. Here is a list of config() options:
autoSleep
- How many frames should elapse between internal checks to see if GSAP should power-down the internal ticker to conserve system resources and battery life on mobile devices. The default is
120
(about every 2 seconds).
force3D
- GSAP automatically attempts to maximize rendering performance by applying transforms with 3D components like
translate3d()
instead of
translate()
during
The animation to activate GPU acceleration, and then switches back to the 2D variant at the end (if possible) to conserve GPU memory. That describes
force3D:"auto"
behavior (the default). Setting
force3D: false
disables the behavior. Setting
force3D: true
will force all transform-related tweens to use the 3D component and NOT switch back to 2D at the end of the tween.
nullTargetWarn
- By default, GSAP will throw a warning when attempting to tween elements that don't exist (are null). You can suppress this warning by setting
nullTargetWarn: false
.
units
- Set the default CSS unit to be used for various properties when no unit is provided. For example,
{left: 100}
animates the CSS "left" property to be tweened to 100px because the default unit is "px" for the "left" property. If you want to make
{left: 100}
animate to 100% by default instead you could define
gsap.config({units: {left: "%"}})
. Only the properties that you set will be changed. The default for most numbers is
"px"
and rotation-related values are
"deg"
.
Example
â
// you only need to define the configuration settings you want to CHANGE. Omitted properties won't be affected.
gsap
.
config
(
{
autoSleep
:
60
,
force3D
:
false
,
nullTargetWarn
:
false
,
trialWarn
:
false
,
units
:
{
left
:
"%"
,
top
:
"%"
,
rotation
:
"rad"
}
,
}
)
;
Previous
gsap.version
Next
gsap.context()
Contents
Example
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