Plugins | GSAP | Docs & Learning
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
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
What's a plugin?
On this page
Plugins
info
A plugin adds extra capabilities to GSAP's core. This allows the GSAP core to remain relatively small and lets you add features only when you need them.
Plugin Overview
â
Included in GSAP's Core
GSAP
CDN
Tween
and
Timeline
Animate anything
CSS properties
Attributes
Array Values
and more...
Eases
"none"
"power1"
"power2"
"power3"
"power4"
"back"
"bounce"
"circ"
"elastic"
"expo"
"sine"
"steps(n)"
Animate efficiently
Staggers
Callbacks
Snapping
Modifiers
Keyframes
Ticker with lag smoothing
Cleanup - context() & revert()
Responsivity & Accessibility - matchMedia()
Utility Methods
checkPrefix()
clamp()
distribute()
getUnit()
interpolate()
mapRange()
normalize()
pipe()
random()
selector()
shuffle()
snap()
splitColor()
toArray()
unitize()
wrap()
wrapYoyo()
Scroll Plugins
ScrollTrigger
popular
CDN
ScrollTo
CDN
ScrollSmoother
requires
ScrollTrigger
CDN
Text Plugins
SplitText
popular
CDN
ScrambleText
CDN
Text Replacement
CDN
SVG Plugins
DrawSVG
popular
CDN
MorphSVG
CDN
MotionPath
CDN
MotionPathHelper
CDN
UI Plugins
Flip
popular
CDN
Draggable
CDN
Inertia
CDN
Observer
CDN
Other Plugins
Physics2D
CDN
PhysicsProps
CDN
GSDevTools
CDN
Easel
CDN
Pixi
CDN
Eases
CustomEase
popular
CDN
EasePack
rough
,
slow
, and
expoScale
CDN
CustomWiggle
requires
CustomEase
CDN
CustomBounce
requires
CustomEase
CDN
React
useGSAP()
popular
npm
Installing/Loading a plugin
â
At the end of the day, all the plugins are just JS files - just like the core library. You can install them with script tags, via npm, with yarn, or even with a tgz file.
Head on over to our
install helper
to choose your own adventure.
Registering a plugin
â
Registering a plugin with the GSAP core ensures that the two work seamlessly together and also prevents tree shaking issues in build tools/bundlers. You only need to register a plugin once before using it, like:
//list as many as you'd like
gsap
.
registerPlugin
(
MotionPathPlugin
,
ScrollTrigger
,
MorphSVGPlugin
)
;
Obviously you need to load the plugin file first. There is no harm in registering the same plugin multiple times (but it doesn't help either).
Previous
SteppedEase
Next
ScrollTrigger
Contents
Plugin Overview
Installing/Loading a plugin
Registering a plugin
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