SlowMo | GSAP | Docs & Learning
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
SlowMo
On this page
SlowMo
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
SlowMo is a configurable ease that produces a slow-motion effect that decelerates initially, then moves linearly for a certain portion of the ease (which you can choose) and then accelerates again at the end; it's great for effects like zooming text onto the screen, smoothly moving it long enough for people to read it, and then zooming it off the screen.
Without SlowMo, animators would often try to get the same effect by sequencing 3 tweens, one with an ease
.out
, then another with no ease (
ease: "none"
), and finally an ease
.in
. But the problem was that the eases didn't smoothly transition into one another so you'd see sudden shifts in velocity at the joints. SlowMo solves this problem and gives you complete control over how strong the eases are on each end and what portion of the movement in the middle is linear.
The first parameter,
linearRatio
, determines the proportion of the ease during which the rate of change will be linear (steady pace). This should be a number between 0 and 1. For example, 0.5 would be half, so the first 25% of the ease would be easing out (decelerating), then 50% would be linear, then the final 25% would be easing in (accelerating). If you choose 0.8, that would mean 80% of the ease would be linear, leaving 10% on each end to ease. The default is 0.7.
The second parameter,
power
, determines the strength of the ease at each end. If you define a value greater than 1, it will actually reverse the linear portion in the middle which can create interesting effects. The default is 0.7.
The third parameter,
yoyoMode
, provides an easy way to create companion tweens that sync with normal SlowMo tweens. For example, let's say you have a SlowMo tween that is zooming some text onto the screen and moving it linearly for a while and then zooming off, but you want to tween that alpha of the text at the beginning and end of the positional tween. Normally, you'd need to create 2 separate alpha tweens, 1 for the fade-in at the beginning and 1 for the fade-out at the end and you'd need to calculate their durations manually to ensure that they finish fading in by the time the linear motion begins and then they start fading out at the end right when the linear motion completes. But to make this whole process much easier, all you'd need to do is create a separate tween for the alpha and use the same duration but a SlowMo ease that has its
yoyoMode
parameter set to
true
.
Example code
â
//use the default SlowMo ease (linearRatio of 0.7 and power of 0.7)
gsap
.
to
(
myText
,
{
duration
:
5
,
x
:
600
,
ease
:
"slow"
}
)
;
//this gives the exact same effect as the line above, but uses a different syntax
gsap
.
to
(
myText
,
{
duration
:
5
,
x
:
600
,
ease
:
"slow(0.5, 0.8)"
}
)
;
//now let's create an opacity tween that syncs with the above positional tween, fading it in at the beginning and out at the end
gsap
.
from
(
myText
,
{
duration
:
5
,
opacity
:
0
,
ease
:
"slow(0.5, 0.8, true)"
}
)
;
Previous
RoughEase
Next
SteppedEase
Contents
Description
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