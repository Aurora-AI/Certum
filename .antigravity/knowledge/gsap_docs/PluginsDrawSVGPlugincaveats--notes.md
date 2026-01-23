DrawSVG | GSAP | Docs & Learning
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
methods
DrawSVGPlugin.getLength()
DrawSVGPlugin.getPosition()
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
DrawSVG
On this page
DrawSVG
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
DrawSVGPlugin
)
Minimal usage
//draws all elements with the "draw-me" class applied
gsap
.
from
(
'.draw-me'
,
{
duration
:
1
,
drawSVG
:
0
}
)
;
Description
â
DrawSVGPlugin allows you to progressively reveal (or hide) the stroke of an SVG
,
,
,
,
, or
. You can even animate outward from the center of the stroke (or any position/segment). It does this by controlling the
stroke-dashoffset
and
stroke-dasharray
CSS properties.
Think of the drawSVG value as describing the stroked portion of the overall SVG element (which doesn't necessarily have to start at the beginning). For example,
drawSVG:"20% 80%"
renders the stroke between the 20% and 80% positions, meaning there's a 20% gap on each end. If you started at
"50% 50%"
and animated to
"0% 100%"
, it would draw the stroke from the middle outward to fill the whole path.
loading...
Remember, the
drawSVG
value doesn't describe the values between which you want to animate - it describes the end state to which you're animating (or the beginning if you're using a
from()
tween). So
gsap.to("#path", {duration: 1, drawSVG: "20% 80%"})
animates it from wherever the stroke is currently to a state where the stroke exists between the 20% and 80% positions along the path. It does
NOT
animate it from 20% to 80% over the course of the tween.
This is a
good
thing because it gives you much more flexibility. You're not limited to starting out at a single point along the path and animating in one direction only. You control the whole segment (starting and ending positions). So you could even animate a dash from one end of the path to the other, never changing size, like
gsap.fromTo("#path", {drawSVG: "0 5%"}, {duration: 1, drawSVG: "95% 100%"});
You may use either percentages or absolute lengths. If you use a single value,
0
is assumed for the starting value, so
"100%"
is the same as
"0 100%"
and
"true"
.
IMPORTANT:
In order to animate the stroke, you must first actually apply one using either CSS or SVG attributes:
/\* Define a stroke and stroke-width in CSS: \*/
.yourPath
{
stroke-width
:
10
px
;
stroke
:
red
;
}
/\* or as SVG attributes: \*/
Detailed walkthrough
How do I animate many strokes and stagger animations?
â
The great thing about having DrawSVGPlugin integrated into GSAP is that you can tap into the rich API to quickly create complex effects and have total control (
pause
,
resume
,
reverse
,
seek
, nesting, etc.). So let's say you have 20 SVG elements that all have the class
draw-me
applied to them, and you want to draw them in a staggered fashion. You could do:
//draws all elements with the "draw-me" class applied with staggered start times 0.1 seconds apart
gsap
.
from
(
'.draw-me'
,
{
duration
:
1
,
stagger
:
0.1
,
drawSVG
:
0
}
)
;
Or you could create a timeline and drop the tweens into it so that you can control the entire sequence as a whole:
var
tl
=
gsap
.
timeline
(
)
;
tl
.
from
(
".draw-me"
,
{
duration
:
2
,
drawSVG
:
0
}
,
0.1
)
;
//now we can control it:
tl
.
pause
(
)
;
tl
.
play
(
)
;
tl
.
reverse
(
)
;
tl
.
seek
(
0.5
)
;
...
Add
"live"
to recalculate length throughout animation
â
In rare situations, the length of the SVG element itself may change during the drawSVG animation (like if the window is resized and things are responsive). In that case, you can simply append
"live"
to the value which will cause DrawSVGPlugin to update the length on every tick of the animation. So, for example,
drawSVG: "20% 70% live"
.
Splitting a multi-segment
â
Usually it's best to use DrawSVGPlugin on
elements that are just one segment (doesn't contain multiple "M" commands) because browsers have a hard time properly rendering a single stroke through multiple segments, but we've crafted a helper function that automatically splits a multi-segment
into a
for each segment, as seen in this demo:
loading...
Caveats / Notes
â
DrawSVGPlugin does not animate the fill of the SVG at all - it only affects the stroke using
stroke-dashoffset
and
stroke-dasharray
CSS properties.
In some rare situations, Firefox doesn't properly calculate the total length of
elements, so you may notice that the path stops a bit short even if you animate to 100%. In this (uncommon) scenario, there are two solutions: either add more anchors to your path to make the control points hug closer to the path, or overshoot the percentage a bit, like use
102%
instead of
100%
. To be clear, this is a Firefox bug, not a bug with DrawSVGPlugin.
As of December 2014, iOS Safari has a bug that causes it to render
strokes incorrectly in some cases (too thick, and slight artifacts around the edges, plus it misplaces the origin). The best workaround is to either convert your
to a
or
.
You cannot affect the contents of a
element because browsers simply don't allow it. Well, you can tween them but you won't see any changes on the screen.
Methods
â
DrawSVGPlugin
.getLength
( element:[Element | Selector text] ) : Number
Provides an easy way to get the length of an SVG element's stroke including:
,
,
,
,
,
, and
DrawSVGPlugin
.getPosition
( element:[Element | Selector text] ) : Number
Provides an easy way to get the current position of the DrawSVG.
Demos
â
Check out the full collection of
How-to demos
and our favourite
inspiring community demos
on CodePen.
Previous
.update()
Next
DrawSVGPlugin.getLength()
Contents
Description
How do I animate many strokes and stagger animations?
Add
"live"
to recalculate length throughout animation
Splitting a multi-segment
Caveats / Notes
Methods
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