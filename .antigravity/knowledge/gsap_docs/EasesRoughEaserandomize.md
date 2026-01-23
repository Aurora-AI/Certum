RoughEase | GSAP | Docs & Learning
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
RoughEase
On this page
RoughEase
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
Most easing equations give a smooth, gradual transition between the start and end values, but
RoughEase
provides an easy way to get a rough, jagged effect instead, or you can also get an evenly-spaced back-and-forth movement if you prefer.
RoughEase
is in the EasePack file. Configure the
RoughEase
with any of these optional properties:
Config Object
â
Property
Description
clamp
Boolean
- Setting
clamp
to
true
will prevent points from exceeding the end value or dropping below the starting value. For example, if youâre tweening the x property from 0 to 100, the RoughEase would force all random points to stay between 0 and 100 if
clamp
is
true
, but if it is
false
, x could potentially jump above 100 or below 0 at some point during the tween (it would always end at 100 though in this example). Default:
false
.
points
Number
- The number of points to be plotted along the ease, making it jerk more or less frequently. Default:
20
.
randomize
Boolean
- By default, the placement of points will be randomized (creating the roughness) but you can set
randomize
to
false
to make the points zig-zag evenly across the ease. Using this in conjunction with a
taper
value can create a nice effect. Default:
true
.
strength
Number
- Controls how far from the template ease the points are allowed to wander (a small number like 0.1 keeps it very close to the template ease whereas a larger number like 5 creates much bigger variations). Default:
1
.
taper
String
(
"in"
|
"out"
|
"both"
|
"none"
) - To make the strength of the roughness taper towards the end or beginning or both, use
"out"
,
"in"
, or
"both"
respectively. Default:
"none"
.
template
String
- An ease that should be used as a template, like a general guide. The RoughEase will plot points that wander from that template. You can use this to influence the general shape of the RoughEase. Default:
"none"
.
Example code
â
//use the default values
gsap
.
from
(
element
,
{
duration
:
1
,
opacity
:
0
,
ease
:
"rough"
}
)
;
//or customize the configuration
gsap
.
to
(
element
,
{
duration
:
2
,
y
:
300
,
ease
:
"rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})"
}
)
;
Previous
ExpoScaleEase
Next
SlowMo
Contents
Description
Config Object
Example code
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