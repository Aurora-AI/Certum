Pixi | GSAP | Docs & Learning
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
On this page
Pixi
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
PixiPlugin
)
Minimal usage
gsap
.
to
(
graphics
,
{
duration
:
2
,
pixi
:
{
lineColor
:
"purple"
}
}
)
;
PixiPlugin makes it much easier to animate things in
PixiJS
, a popular canvas library that's extremely performant. Without the plugin, it's a tad cumbersome with certain properties because they're tucked inside sub-objects in PixiJS's API, like
object.position.x
,
object.scale.y
,
object.skew.x
, etc. Plus PixiJS defines rotational values in radians instead of degrees which isn't as intuitive for most developers and designers. PixiPlugin saves you a bunch of headaches:
//old way (without plugin):
gsap
.
to
(
pixiObject
.
scale
,
{
x
:
2
,
y
:
1.5
,
duration
:
1
}
)
;
gsap
.
to
(
pixiObject
.
skew
,
{
x
:
(
30
\*
Math
.
PI
)
/
180
,
duration
:
1
}
)
;
gsap
.
to
(
pixiObject
,
{
rotation
:
(
60
\*
Math
.
PI
)
/
180
,
duration
:
1
}
)
;
//new way (with plugin):
gsap
.
to
(
pixiObject
,
{
pixi
:
{
scaleX
:
2
,
scaleY
:
1.5
,
skewX
:
30
,
rotation
:
60
}
,
duration
:
1
,
}
)
;
Notice
rotational values are defined in degrees, not radians
. Yay!
Be sure to include the PixiPlugin correctly:
import
\*
as
PIXI
from
"pixi.js"
;
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
// register the plugin
gsap
.
registerPlugin
(
PixiPlugin
)
;
// give the plugin a reference to the PIXI object
PixiPlugin
.
registerPIXI
(
PIXI
)
;
PixiJS examples
â
There are a bunch of GSAP-based examples in the
PixiJS documentation here
! It's a great place to start.
Colors
â
PixiJS requires that you define color-related values in a format like
0xFF0000
but with PixiPlugin, you can define them the same way you would in CSS, like
"red"
,
"#F00"
,
"#FF0000"
,
"rgb(255,0,0)"
,
"hsl(0, 100%, 50%)"
, or
0xFF0000
. You can even do relative HSL values!
"hsl(+=180, +=0%, +=0%)"
.
//named colors
gsap
.
to
(
graphics
,
{
duration
:
2
,
pixi
:
{
lineColor
:
"purple"
}
}
)
;
//relative hsl() color that reduces brightness but leaves the hue and saturation the same:
gsap
.
to
(
graphics
,
{
duration
:
2
,
pixi
:
{
fillColor
:
"hsl(+=0, +=0%, -=30%)"
}
,
}
)
;
ColorMatrixFilter
â
Another big convenience is that PixiPlugin recognizes some special values like
saturation
,
brightness
,
contrast
,
hue
, and
colorize
(which all leverage a
ColorMatrixFilter
under the hood).
var
image
=
new
PIXI
.
Sprite
.
from
(
"http://pixijs.github.io/examples/required/assets/panda.png"
)
;
app
.
stage
.
addChild
(
image
)
;
var
tl
=
gsap
.
timeline
(
{
defaults
:
{
duration
:
2
}
}
)
;
//colorize fully red. Change colorAmount to 0.5 to make it only halfway colorized, for example:
tl
.
to
(
image
,
{
pixi
:
{
colorize
:
"red"
,
colorizeAmount
:
1
}
}
)
//change the hue 180 degrees (opposite)
.
to
(
image
,
{
pixi
:
{
hue
:
180
}
}
)
//completely desaturate
.
to
(
image
,
{
pixi
:
{
saturation
:
0
}
}
)
//blow out the brightness to double the normal amount
.
to
(
image
,
{
pixi
:
{
brightness
:
2
}
}
)
//increase the contrast
.
to
(
image
,
{
pixi
:
{
contrast
:
1.5
}
}
)
;
loading...
Or if you have a custom
ColorMatrixFilter
, just pass that in as the
colorMatrixFilter
property and it'll handle animating between states:
var
filter
=
new
PIXI
.
filters
.
ColorMatrixFilter
(
)
;
filter
.
sepia
(
)
;
gsap
.
to
(
image
,
{
pixi
:
{
colorMatrixFilter
:
filter
}
,
duration
:
2
}
)
;
BlurFilter
â
PixiPlugin recognizes
blur
,
blurX
, and
blurY
properties, so it's very simple to apply a blur without having to create a new
BlurFilter
instance, add it to the filters array, and animate its properties separately.
//blur on both the x and y axis to a blur amount of 15
gsap
.
to
(
image
,
{
pixi
:
{
blurX
:
15
,
blurY
:
15
}
,
duration
:
2
}
)
;
Directional rotation
â
You can control which direction a rotation tween goes by appending a suffix for
clockwise
(
"\_cw"
),
counter-clockwise
(
"\_ccw"
), or the
shortest direction
(
"\_short"
). For example, if the element's rotation is currently 170 degrees and you want to tween it to -170 degrees, a normal rotation tween would travel a total of 340 degrees in the counter-clockwise direction, but
rotation: "-170\_short"
suffix, it would travel 20 degrees in the clockwise direction instead! Example:
gsap
.
to
(
element
,
{
pixi
:
{
rotation
:
"-170\_short"
}
,
duration
:
2
,
}
)
;
Directional rotation capabilities were added in GSAP 3.2, so make sure you've got the latest update.
Other properties
â
PixiPlugin can handle almost any other property as well - there is no pre-determined list of "allowed" properties. PixiPlugin simply improves developer ergonomics for anyone animating in PixiJS. Less code, fewer headaches, and faster production. For a full listing of properties that the PixiPlugin helps with, see
the PixiPlugin Typescript declarations
.
Methods
â
PixiPlugin
.registerPIXI
( PIXI:Object ) ;
Registers the main PIXI library object with the PixiPlugin so that it can find the necessary classes/objects. You only need to register it once.
Previous
PhysicsProps
Next
PixiPlugin.registerPIXI()
Contents
PixiJS examples
Colors
ColorMatrixFilter
BlurFilter
Directional rotation
Other properties
Methods
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