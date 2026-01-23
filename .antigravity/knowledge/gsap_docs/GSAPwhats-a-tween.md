GSAP | GSAP | Docs & Learning
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
properties
gsap.effects
gsap.globalTimeline
gsap.ticker
gsap.utils
gsap.version
methods
gsap.config()
gsap.context()
gsap.defaults()
gsap.delayedCall()
gsap.exportRoot()
gsap.from()
gsap.fromTo()
gsap.getById()
gsap.getProperty()
gsap.getTweensOf()
gsap.isTweening()
gsap.killTweensOf()
gsap.matchMedia()
gsap.matchMediaRefresh()
gsap.parseEase()
gsap.quickSetter()
gsap.quickTo()
gsap.registerEase()
gsap.registerEffect()
gsap.registerPlugin()
gsap.set()
gsap.timeline()
gsap.to()
gsap.updateRoot()
Internal Plugins
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
Staggers
Helper functions
React - useGSAP()
llms.txt
GSAP
On this page
GSAP
Quick Start
or via a package manager like npm
npm install gsap
import
{
gsap
}
from
"gsap"
Minimal usage
// This is a Tween
gsap
.
to
(
".box"
,
{
rotation
:
27
,
x
:
100
,
duration
:
1
}
)
;
// And this is a Timeline, containing three sequenced tweens
let
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
to
(
"#green"
,
{
duration
:
1
,
x
:
786
}
)
.
to
(
"#blue"
,
{
duration
:
2
,
x
:
786
}
)
.
to
(
"#orange"
,
{
duration
:
1
,
x
:
786
}
)
The
gsap
object serves as the access point for most of GSAP's functionality. It's just a generic object with various methods and properties that create and control
Tweens
and
Timelines
, two of the most important concepts to understand.
Quick Overview
For a quick overview of the GSAP object, check out this video from the
"GSAP 3 Express" course
by Snorkl.tv - one of the best ways to learn the basics.
To get the most out of GSAP, it's crucial that you understand what Tweens and Timelines are:
What's a Tween?
â
A
Tween
is what does all the animation work - think of it like a
high-performance property setter
. You feed in targets (the objects you want to animate), a duration, and any properties you want it to animate and then when the Tween's playhead moves to a new position, figures out what the property values should be at that point applies them accordingly.
Common methods for creating a Tween:
â
gsap.to()
gsap.from()
gsap.fromTo()
For simple animations (no fancy sequencing), the methods above are all you need! For example:
//rotate and move elements with a class of "box" ("x" is a shortcut for a translateX() transform) over the course of 1 second.
gsap
.
to
(
".box"
,
{
rotation
:
27
,
x
:
100
,
duration
:
1
}
)
;
loading...
You can do basic sequencing by using the
delay
special property, but Timelines make sequencing and complex choreography much, much easier.
What's a Timeline?
â
A
Timeline
is a
container for Tweens.
It's the ultimate sequencing tool that lets you position animations in time wherever you want and then control the whole sequence easily with methods like
pause()
,
play()
,
progress()
,
reverse()
,
timeScale()
, etc.
Create as many Timelines as you want. You can even
nest them
which is fantastic for modularizing your animation code! Every animation (Tween and Timeline) gets placed onto a parent timeline (the
globalTimeline
by default). Moving a Timeline's playhead cascades down through its children so that the playheads stay aligned. A Timeline is purely about grouping things and coordinating time/playheads - it never actually sets properties on targets (Tweens handle that).
0
1
2
blueSpin
3
4
Play
Method for creating a Timeline:
â
gsap.timeline()
GSAP's API lets you control virtually anything on-the-fly, such as the playhead position, the
startTime
of any child, even play/pause/reverse the timeline or alter the timeScale itself.
Sequencing
â
First, create a Timeline:
var
tl
=
gsap
.
timeline
(
)
;
Then add a tween using one of the convenience methods -
to()
,
from()
, or
fromTo()
:
tl
.
to
(
".box"
,
{
duration
:
2
,
x
:
100
,
opacity
:
0.5
}
)
;
Do that as many times as you want. Notice we're calling
.to()
on the timeline instance
(the variable
tl
in this case), not the
gsap
object. This creates a tween and immediately puts it into that particular Timeline.
gsap.to()
, on the other hand, creates a standalone tween. By default, the animations will be sequenced one-after-the-other. You can even use method chaining to simplify your code like this:
//sequenced one-after-the-other
tl
.
to
(
".box1"
,
{
duration
:
2
,
x
:
100
}
)
//notice that there's no semicolon!
.
to
(
".box2"
,
{
duration
:
1
,
y
:
200
}
)
.
to
(
".box3"
,
{
duration
:
3
,
rotation
:
360
}
)
;
loading...
info
The whole GSAP platform is object-oriented and you could create individual tween instances with
gsap.to()
, for example, and then
timeline.add()
each one but it's just easier to call .to(), .from(), or .fromTo() directly on the Timeline instance to do the same thing in fewer steps.
Positioning
â
Define
exactly
where you want your animations to be placed into the timeline by using the optional
position parameter
. A number indicates an absolute time (in seconds), or a string with a
"+="
or
"-="
prefix indicates an offset relative to the END of the timeline. For example,
"+=2"
would be 2 seconds after the end, creating a 2-second gap.
"-=2"
would create a 2-second overlap.
0
1
2
blueSpin
3
4
Play
Labels
â
Use labels to mark certain spots on the timeline so that you can place animations there or navigate there during playback.
0
1
2
blueSpin
3
4
Play
//add a label at exactly 3 seconds
tl
.
addLabel
(
"step2"
,
3
)
//then later, we can seek() to that spot:
tl
.
seek
(
"step2"
)
;
Control methods
â
Tween
and
Timeline
both extend an Animation class that exposes a myriad of useful methods and properties. Here are some of the most frequently used:
pause
(
)
play
(
)
progress
(
)
restart
(
)
resume
(
)
reverse
(
)
seek
(
)
time
(
)
duration
(
)
timeScale
(
)
kill
(
)
loading...
Reference the Tween or Timeline instance with a variable, and then control it whenever you want:
//you only need to create a variable if you want to control it later...
var
tween
=
gsap
.
to
(
...
)
;
var
tl
=
gsap
.
timeline
(
)
;
//"tl" short for timeline
tl
.
to
(
...
)
.
to
(
...
)
;
//add animations.
//now we can control them...
tween
.
pause
(
)
;
tween
.
timeScale
(
2
)
;
//double speed
tl
.
seek
(
3
)
;
//jump to 3 seconds in
tl
.
progress
(
0.5
)
;
//halfway through
...
Previous
Installation
Next
gsap.effects
Contents
What's a Tween?
What's a Timeline?
Sequencing
Positioning
Labels
Control methods
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