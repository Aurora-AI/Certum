revert | GSAP | Docs & Learning
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
properties
.data
.ratio
.scrollTrigger
.vars
methods
.delay()
.duration()
.endTime()
.eventCallback()
.globalTime()
.invalidate()
.isActive()
.iteration()
.kill()
.pause()
.paused()
.play()
.progress()
.repeat()
.repeatDelay()
.restart()
.resume()
.reverse()
.reversed()
.revert()
.seek()
.startTime()
.targets()
.then()
.time()
.timeScale()
.totalDuration()
.totalProgress()
.totalTime()
.yoyo()
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
Tween
methods
.revert()
On this page
revert
revert
( ) : Self
Reverts the animation and kills it, returning the targets to their pre-animation state including the removal of inline styles added by the animation.
Returns : Self
â
The Tween itself, for easy chaining
Details
â
Reverts the animation and kills it, returning the targets to their pre-animation state including the removal of inline styles added by the animation.
The problem
â
What if you want to revert an element back to its state
BEFORE
it was animated? You could just
animation.progress(0)
, right?
Sort of
. Consider this element:
<
div
class
=
"box"
>
<
/
div
>
No inline styles at all
. The opacity is 1 (the default) and then you do this:
// fade out
let
tween
=
gsap
.
to
(
".box"
,
{
opacity
:
0
}
)
;
Now let's try getting back to the original state:
tween
.
progress
(
0
)
.
pause
(
)
;
That does indeed set it back to the starting values that GSAP parsed from the computed style:
<
!
--
inline style is still present
--
>
<
div
class
=
"box"
style
=
"opacity: 1"
>
<
/
div
>
But that means
it
still has inline styles
. Usually that doesn't matter, but perhaps a media query CSS rule sets opacity to 0.5 on that element. Doh! The inline style will overrule the class rule. So we need a way to have a tween/timeline keep track of the original inline styles and
REMOVE
the ones that it added. That requires a new method because
progress(0)
SHOULD
set inline styles to ensure the state is what it's supposed to be at that point in the animation.
The solution: animation.revert()
â
GSAP 3.11 added a
.revert()
method to all Tweens and Timelines, so it's as simple as:
animation
.
revert
(
)
;
// removes inline styles that were added by the animation
Previous
.reversed()
Next
.seek()
Contents
Returns : Self
Details
The problem
The solution: animation.revert()
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