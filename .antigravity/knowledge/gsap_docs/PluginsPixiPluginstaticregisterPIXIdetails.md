static-registerPIXI | GSAP | Docs & Learning
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
MotionPath
MotionPathHelper
Observer
Physics2D
PhysicsProps
Pixi
methods
PixiPlugin.registerPIXI()
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
Pixi
methods
PixiPlugin.registerPIXI()
On this page
PixiPlugin
.registerPIXI
PixiPlugin
.registerPIXI
( PIXI:Object ) ;
Registers the main PIXI library object with the PixiPlugin so that it can find the necessary classes/objects. You only need to register it once.
Parameters
PIXI
: Object
The main PIXI library object
Details
â
PixiPlugin needs some reference to the PIXI library object (usually
PIXI
), which it looks for in the global scope (
window
in most cases). However in a build system or ES module environment you might not have a global scope that has a reference to your
PIXI
object. That's where this method is useful. You can simply pass in that reference using this method like:
PixiPlugin
.
registerPIXI
(
PIXI
)
;
When importing the entire Pixi.js library, you can register Pixi like this:
import
{
gsap
}
from
"gsap"
;
import
{
PixiPlugin
}
from
"gsap/PixiPlugin"
;
import
\*
as
PIXI
from
"pixi.js"
;
gsap
.
registerPlugin
(
PixiPlugin
)
;
PixiPlugin
.
registerPIXI
(
PIXI
)
;
When importing individual Pixi.js modules, you can pass in the plugin's dependencies as an object.
Container
: (required)
Sprite
: (optional) Needed to render a textured object
filters
: (optional) Needed to animate
ColorMatrixFilter
and
BlurFilter
properties
import
{
gsap
}
from
"gsap"
;
import
{
PixiPlugin
}
from
"gsap/PixiPlugin"
;
import
{
Container
,
Sprite
,
BlurFilter
,
ColorMatrixFilter
}
from
"https://cdn.skypack.dev/pixi.js"
;
PixiPlugin
.
registerPIXI
(
{
Container
,
Sprite
,
BlurFilter
,
ColorMatrixFilter
}
)
;
Previous
Pixi
Next
ScrambleText
Contents
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