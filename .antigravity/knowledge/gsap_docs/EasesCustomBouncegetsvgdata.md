CustomBounce | GSAP | Docs & Learning
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
CustomBounce
On this page
CustomBounce
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
CustomEase
,
CustomBounce
)
Minimal usage
//Create a custom bounce ease:
CustomBounce
.
create
(
"myBounce"
,
{
strength
:
0.6
,
squash
:
3
,
squashID
:
"myBounce-squash"
,
}
)
;
//do the bounce by affecting the "y" property.
gsap
.
from
(
".class"
,
{
duration
:
2
,
y
:
-
200
,
ease
:
"myBounce"
}
)
;
//and do the squash/stretch at the same time:
gsap
.
to
(
".class"
,
{
duration
:
2
,
scaleX
:
1.4
,
scaleY
:
0.6
,
ease
:
"myBounce-squash"
,
transformOrigin
:
"center bottom"
,
}
)
;
loading...
Description
â
GSAP always has the tried-and-true
"bounce"
ease, but there is no built-in way to customize how "bouncy" it is, nor could you easily get a synchronized squash and stretch effect during the bounce because:
The "bounce" ease needs to stick to the ground momentarily at the point of the bounce while the squashing occurs.
"bounce"
offers no such customization.
There was no way to create the corresponding [synchronized] scaleX/scaleY ease for the squashing/stretching.
CustomEase
solves this now, but it'd still be very difficult to manually draw that ease with all the points lined up in the right spots to match up with the bounces.
With CustomBounce, you can set a few parameters and it'll create
BOTH
CustomEases for you (one for the bounce, and one [optionally] for the squash/stretch). Think of CustomBounce like a wrapper that creates a CustomEase under the hood based on the variables you pass in.
CustomBounce extends
CustomEase
(which you must include in your project) and it lets you set the bounce and (optionally) a squash and stretch.
Ease walkthrough
Options
â
Property
Description
strength
Number
- A number between 0 and 1 that determines how âbouncyâ the ease is, so 0.9 will have a lot more bounces than 0.3. Default:
0.7
.
endAtStart
Boolean
- If
true
, the ease will end back where it started, allowing you to get an effect like an object sitting on the ground, leaping into the air, and bouncing back down to a stop. Default:
false
.
squash
Number
- Controls how long the squash should last (the gap between bounces, when it appears âstuckâ). Typically 2 is a good number, but 4 (as an example) would make the squash longer in relation to the rest of the ease. Default:
0
.
squashID
String
- The ID that should be assigned to the squash ease. The default is whatever the ID of the bounce is plus â-squashâ appended to the end. For example,
CustomBounce.create("hop", {strength: 0.6, squash: 2})
would default to a squash ease ID of
"hop-squash"
.
How do you get the bounce and the squash and stretch to work together? You'd use two tweens; one for the position (
y
), and the other for the
scaleX
and
scaleY
, with both running at the same time:
gsap
.
registerPlugin
(
CustomEase
,
CustomBounce
)
;
// register
//Create a custom bounce ease:
CustomBounce
.
create
(
"myBounce"
,
{
strength
:
0.6
,
squash
:
3
,
squashID
:
"myBounce-squash"
,
}
)
;
//do the bounce by affecting the "y" property.
gsap
.
from
(
".class"
,
{
duration
:
2
,
y
:
-
200
,
ease
:
"myBounce"
}
)
;
//and do the squash/stretch at the same time:
gsap
.
to
(
".class"
,
{
duration
:
2
,
scaleX
:
1.4
,
scaleY
:
0.6
,
ease
:
"myBounce-squash"
,
transformOrigin
:
"center bottom"
,
}
)
;
.getSVGData()
â
CustomBounce also shares CustomEase's method that calculates the SVG
data string for visualizing any ease graphically at any size that you define, like
{width: 500, height: 400, x: 10, y: 50}
. You can supply a CustomEase or the ID associated with one, or even a standard ease like
Power2.easeOut
. Feed in a
path
in the vars object and it'll populate its
d
attribute for you, like:
//create a CustomEase with an ID of "hop"
CustomBounce
.
create
(
"myBounce"
,
{
strength
:
0.6
,
squash
:
3
,
squashID
:
"myBounce-squash"
,
}
)
;
//draw the ease visually in the SVG that has an ID of "ease" at 500px by 400px:
CustomEase
.
getSVGData
(
"myBounce"
,
{
width
:
500
,
height
:
400
,
path
:
"#ease"
}
)
;
String format
â
You can also use GSAP's condensed string formatting for eases, like:
ease
:
"bounce(0.5)"
;
//<-- easy!
ease
:
"bounce({strength:0.5, endAtStart:true})"
;
//advanced
Demos
â
CustomBounce demos
Previous
Easing
Next
CustomEase
Contents
Description
Options
.getSVGData()
String format
Demos
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