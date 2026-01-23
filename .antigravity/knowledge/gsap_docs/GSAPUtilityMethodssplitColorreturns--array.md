splitColor | GSAP | Docs & Learning
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
checkPrefix
clamp
distribute
getUnit
interpolate
mapRange
normalize
pipe
random
selector
shuffle
snap
splitColor
toArray
unitize
wrap
wrapYoyo
Staggers
Helper functions
React - useGSAP()
llms.txt
Utility Methods
splitColor
On this page
splitColor
Returns : Array
â
Converts a string-based color value into an array consisting of [red, green, blue] (or if an alpha value is required, it'll be in the last spot of a 4-element array). For example,
[255, 0 128, 1]
. You can optionally request HSLA (hue, saturation, lightness, and alpha) values instead by using the 2nd parameter.
splitColor()
will work with
"rgb()"
,
"rgba()"
,
"hsl()"
,
"hsla()"
, hexadecimal values, or any of the basic named colors like "red", "blue", etc.
An example of a returned value would be
[255, 128, 0]
or [
255, 102, 153, 0.5]
. Or if you prefer to get HSL-based values, just pass in
true
as the 2nd parameter.
gsap
.
utils
.
splitColor
(
"red"
)
;
// [255, 0, 0]
gsap
.
utils
.
splitColor
(
"#6fb936"
)
;
// [111, 185, 54]
gsap
.
utils
.
splitColor
(
"rgba(204, 153, 51, 0.5)"
)
;
// [204, 153, 51, 0.5]
// the 2nd parameter indicates we want an HSL value back instead of RGB:
gsap
.
utils
.
splitColor
(
"#6fb936"
,
true
)
;
// [94, 55, 47]
Parameters
â
color
: String - The color that should be split.
returnHSL
: Boolean - (optional) If
true
, the resulting Array will contain HSL/HSLA values instead of RGB/RGBA ones.
Previous
snap
Next
toArray
Contents
Returns : Array
Parameters
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