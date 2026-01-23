Attributes | GSAP | Docs & Learning
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
Attributes
EndArray
Modifiers
Snap
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
Internal Plugins
Attributes
On this page
Attributes
What are internal plugins?
GSAP animates attributes using an internal plugin, AttrPlugin is
automatically included in GSAP's core
and
doesn't have to be loaded using gsap.registerPlugin()
. You can think of internal plugins as just a part of GSAP.
Description
â
GSAP allows you to easily tween any numeric attribute of a DOM element. For example, let's say your DOM element looks like this:
<
rect id
=
"rect"
fill
=
"none"
x
=
"0"
y
=
"0"
width
=
"500"
height
=
"400"
>
<
/
rect
>
You could tween the "x", "y", "width", or "height" attributes like this:
gsap
.
to
(
"#rect"
,
{
duration
:
1
,
// x here refers to the x attribute
attr
:
{
x
:
100
,
y
:
50
,
width
:
100
,
height
:
100
}
,
ease
:
"none"
,
x
:
200
// animate translateX() transform
}
)
;
You can tween an unlimited number of attributes simultaneously. Just use the associated property name inside the
attr:{}
object. GSAP will retain suffixes like "%" meaning you can tween values like
.
Caveat: you cannot do unit conversion with attributes (like px to %)
Animating CSS
Do not attempt to animate CSS-related properties inside the attr object. GSAP handles
CSS
differently internally. In the example above, the
x
outside the
attr:{}
object will animate the CSS transform, whereas the x inside the attr object will animate the underlying geometry - the x coordinate of the rect element.
Previous
gsap.updateRoot()
Next
EndArray
Contents
Description
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