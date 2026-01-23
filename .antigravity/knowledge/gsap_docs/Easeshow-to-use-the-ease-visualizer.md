Easing | GSAP | Docs & Learning
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
Easing
Plugin Eases
"slow"
,
"rough"
, and
"expoScale"
eases are not in the core - they are packaged together in an
EasePack
file in order to minimize file size.
"CustomEase"
,
"CustomBounce"
, and
"CustomWiggle"
are packaged independently as well (not in the core).
See the
installation page
for details.
Easing is the primary way to change the timing of your tweens.
Simply changing the ease can adjust the entire feel and personality of your animation. There are infinite eases that you can use in GSAP so we created the visualizer below to help you choose exactly the type of easing that you need.
Ease Visualizer
value:
0.00
progress:
0.00
power0
power1
power2
power3
power4
Preview
graph
clock
box
Show editing hints
Add point: ALT-CLICK on line
Toggle smooth/corner: ALT-CLICK anchor
Get handle from corner anchor: ALT-DRAG
Toggle select: SHIFT-CLICK anchor
Delete anchor: press DELETE key
Undo: CTRL-Z
Core
none
power1
in
inOut
out
power2
power3
power4
back
bounce
circ
elastic
expo
sine
steps
Ease pack
rough
slow
expoScale
Extra Eases
CustomEase
CustomBounce
CustomWiggle
Share Ease
// click to modify the underlined values
gsap
.to
(
target
,
{
duration:
0.5
1
2.5
5
10
,
ease:
"
back
bounce
circ
elastic
expo
none
quad/power1
Cubic/power2
quart/power3
strong/Quint/power4
sine
rough
slow
steps
expoScale
Custom
CustomBounce
CustomWiggle
.
in
inOut
out
",
none",
(
{
template:
back
bounce
circ
elastic
expo
none/linear
quad/power1
Cubic/power2
quart/power3
strong/Quint/power4
sine
.
in
inOut
out
none
,
strength:
0.2
0.5
1
1.5
2
,
points:
10
20
50
100
200
,
taper:
none
in
out
both
,
randomize:
,
clamp:
}
)",
(
0.1
0.3
0.5
0.7
0.9
,
0.1
0.4
0.7
1
2
,
)",
(
scale from 1 to 2
scale from 0.5 to 7
scale from 10 to 2
>
,
none
power1.in
power1.out
power1.inOut
power2.in
power2.out
power2.inOut
>
)",
(
2
6
12
20
40
)",
(
1
1.2
1.5
1.75
2
,
0.1
0.2
0.3
0.4
0.5
0.75
1
)",
(
1
1.4
1.7
2
3
4
)",
create("custom", "
"0"
"),
create("myWiggle",
{
wiggles:
1
5
10
15
20
,
type:
easeOut
easeInOut
anticipate
uniform
random
}
),
create("myBounce",
{
strength:
0.1
0.5
0.7
0.9
1
,
endAtStart:
true
false
,
squash:
1
2
3
4
,
squashID: "myBounce-squash"
}
),
y:
-500
rotation:
360
x:
"400%"
}
);
none (linear)
none
none
none
power1
out
inOut
in
power2
out
inOut
in
power3
out
inOut
in
power4
out
inOut
in
back
out
inOut
in
elastic
out
inOut
in
bounce
out
inOut
in
Other
rough
slow
steps
circ
out
inOut
in
expo
out
inOut
in
sine
out
inOut
in
Coding tip - Default Easing
GSAP uses a default ease of
"power1.out"
. You can overwrite this in any tween by setting the
ease
property of that tween to another (valid) ease value. You can set a different default ease for GSAP by using
gsap.defaults()
. You can also set defaults for particular
timelines
.
gsap
.
defaults
(
{
ease
:
"power2.in"
,
duration
:
1
,
}
)
;
gsap
.
timeline
(
{
defaults
:
{
ease
:
"power2.in"
}
}
)
How to use the Ease Visualizer
â
To use the ease visualizer, simply click on the ease name that you'd like to use. You can also click on the underlined text to change the values and type of ease.
Use the navigation links in the menu to the left for more information about complex eases.
Video Walkthrough
Huge thanks to Carl for providing this video. We highly recommend their extensive GSAP training at
CreativeCodingClub.com
. Enroll today in their
Free GSAP course
and discover the joy of animating with code.
Next
CustomBounce
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