Modifiers | GSAP | Docs & Learning
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
Modifiers
On this page
Modifiers
What are internal plugins?
ModifiersPlugin is an internal plugin, It is
automatically included in GSAP's core
and
doesn't have to be loaded using gsap.registerPlugin()
.
You can think of internal plugins as just a part of GSAP.
Description
â
You can define a "modifier" function for almost any property. This modifier intercepts the value that GSAP would normally apply on each update ("tick"), feeds it to your function as the first parameter and lets you run custom logic, returning a new value that GSAP should then apply. This is perfect for tasks like snapping, clamping, wrapping, or other dynamic effects.
value, target
â
The modifier functions are passed two parameters:
value
(
number
|
string
) - The about-to-be-applied value from the regular tween. This is often a number, but could be a string based on whatever the property requires. For example if you're animating the
x
property, it would be a number, but if you're animating the
left
property it could be something like
"212px"
, or for the
boxShadow
property it could be
"10px 5px 10px rgb(255,0,0)"
.
target (
object
) - The target itself.
For example, change the
x
of one object based on the
y
of another object or change
rotation
based on the
direction
it is moving. Below are some examples that will help you get familiarized with the syntax.
Snap rotation
â
The tween below animates 360 degrees but the modifier function forces the value to jump to the closest 45-degree increment. Take note how the modifier function gets passed the value of the property that is being modified, in this case a
rotation
number.
loading...
If snapping is all that you're wanting to do, we recommend using the
SnapPlugin
that is built into GSAP's core.
Clamp with Modulus
â
The tween below animates
x
to 500 but the modifier function forces the value to wrap so that it's always between 0 and 100.
loading...
Here's the same sort of technique but using GSAP's
wrap utility function
:
loading...
Carousel Wrap
â
Have you ever built a carousel and wrestled with making it loop seamlessly? Perhaps you duplicated each asset or wrote some code that moved each item back to the beginning when it reached the end. With ModifiersPlugin you can get a seamless repeating carousel with a single
.to()
with a
stagger
! The example below tweens each box to a relative
x
position of
"+=500"
. Click the "show overflow" button to see each box get reset to
x: 0
when it goes beyond 500.
loading...
Advanced demos
â
We've only scratched the surface of what ModifiersPlugin can do. Our moderator
Blake Bowen
has been putting this plugin to the test and has an
impressive collection of demos
that will surely inspire you.
Caveats:
â
To modify CSS transform's
scale
, use
scaleX
and
scaleY
(since it's a shortcut for those). And use
rotation
, not
rotationZ
.
RoundPropsPlugin and SnapPlugin tap into the same mechanism internally as ModifiersPlugin (to maximize efficiency, minimize memory, and keep kb down). Think of a
roundProps
tween as just a shortcut that creates a modifier that applies
Math.round()
, thus you cannot do
both
roundProps
and a modifier on the same property. It's easy to get that functionality, though, by just doing
Math.round()
inside the modifier function.
FAQs
â
How do I include this plugin in my project?
Simply load GSAP's core - ModifiersPlugin is included automatically!
Do I need to register ModifiersPlugin?
Nope. ModifiersPlugin and other core plugins are built into the core and don't have to be registered.
Previous
EndArray
Next
Snap
Contents
Description
value, target
Snap rotation
Clamp with Modulus
Carousel Wrap
Advanced demos
Caveats:
FAQs
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