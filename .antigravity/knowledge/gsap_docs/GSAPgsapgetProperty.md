gsap.getProperty() | GSAP | Docs & Learning
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
gsap.getProperty()
On this page
gsap.getProperty()
Returns : \*
â
Returns the value of the property requested as a number (if possible) unless you specify a unit in which case it will be added to the number, making it a string. Returns
null
if it doesn't exist.
gsap
.
getProperty
(
"#id"
,
"x"
)
;
// 20
gsap
.
getProperty
(
"#id"
,
"x"
,
"px"
)
;
// "20px"
gsap
.
getProperty
(
"#id"
,
"backgroundColor"
)
;
// "rgb(255, 128, 0)"
Details
â
getProperty()
provides an easy way to get the current value of any property and if it's a DOM element, you can even have it convert into a particular unit! For DOM elements, it will check the following properties in this order (and return it as soon as one is found): the element's inline CSS, the element's
.getComputedStyle()
CSS, a property on the element itself like (
element.property
), an attribute on the element (like
element.getAttribute(property)
). Returns
null
if it doesn't exist.
If you omit the unit parameter, it will return a
NUMBER
(at least for simple values where
parseFloat()
returns a number). For example, a "top" or "left" or "x" property that's technically "20px" would be returned as 20 (no unit suffix) because it's so common to need to deal with numbers in animation. In practical use, it would be annoying to get values like "20px" back from getProperty() and have to manually wrap it in
parseFloat()
. But again, if you want the unit included, just pass in that unit like
gsap.getProperty("#element", "x", "px")
and it will return a string accordingly.
Examples:
â
let
w
=
gsap
.
getProperty
(
"#id"
,
"width"
)
;
//you can use selector text
let
bgColor
=
gsap
.
getProperty
(
element
,
"backgroundColor"
)
;
// convert into a specific unit, like em
let
emWidth
=
gsap
.
getProperty
(
element
,
"width"
,
"em"
)
;
Reusable getter function
â
If you omit the
property
parameter,
gsap.getProperty()
will return a getter function that you can reuse to grab properties of that target object:
let
getter
=
gsap
.
getProperty
(
"#id"
)
;
var
x
=
getter
(
"x"
)
,
y
=
getter
(
"y"
,
"em"
)
;
//in em units
Previous
gsap.getById()
Next
gsap.getTweensOf()
Contents
Returns : \*
Details
Examples:
Reusable getter function
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