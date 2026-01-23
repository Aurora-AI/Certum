static-convertToPath | GSAP | Docs & Learning
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
Easel
GSDevTools
Inertia
MorphSVG
properties
MorphSVGPlugin.defaultRender
MorphSVGPlugin.defaultType
MorphSVGPlugin.defaultUpdateTarget
methods
MorphSVGPlugin.convertToPath()
MorphSVGPlugin.rawPathToString()
MorphSVGPlugin.stringToRawPath()
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
MorphSVG
methods
MorphSVGPlugin.convertToPath()
On this page
MorphSVGPlugin
.convertToPath
MorphSVGPlugin
.convertToPath
( shape:[Element | String], swap:Boolean ) : Array
Converts SVG shapes like
,
,
, or
into
Parameters
shape
: [Element | String]
An element or a selector string.
swap
: Boolean
By default, the resulting  will be swapped directly into the DOM in place of the provided shape element, but you can define
false
for
swap
to prevent that.
Returns : Array
â
Returns an Array of all
elements that were created.
Details
â
Technically it's only feasible to morph
elements or
/
elements, but there are plenty of times you will want to morph a
,
,
, or
. This method makes that possible by converting those basic shapes into
elements. It can be used like so:
MorphSVGPlugin
.
convertToPath
(
"#elementID"
)
;
You can pass in an element or selector text, so you could also have it convert ALL of those elements with one line:
MorphSVGPlugin
.
convertToPath
(
"circle, rect, ellipse, line, polygon, polyline"
)
;
This literally swaps in a
for each one directly in the DOM, and it should look absolutely identical. It'll keep the attributes like "id", etc. intact so that the conversion, you should be able to target the elements just as you would before.
//An svg  Like this:
<
rect id
=
"endShape"
width
=
"100"
height
=
"100"
fill
=
"red"
/
>
//becomes
<
path id
=
"endShape"
fill
=
"red"
d
=
"M100,0 v100 h-100 v-100 h100z"
>
<
/
path
>
Why not automatically do the conversion? Because that's a bit too intrusive and could cause problems. For example, if you had event listeners applied to the original element(s) or references in your own code to those elements. We feel it's best to make sure the developer is aware of and specifically requests this conversion rather than doing it automatically.
loading...
Notes
â
If you define an
rx
or
ry
attribute on a
element, make sure you define
both
(MorphSVGPlugin will default to a value of 0 whereas some browsers default to copying the one that was defined).
Previous
MorphSVGPlugin.defaultUpdateTarget
Next
MorphSVGPlugin.rawPathToString()
Contents
Returns : Array
Details
Notes
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