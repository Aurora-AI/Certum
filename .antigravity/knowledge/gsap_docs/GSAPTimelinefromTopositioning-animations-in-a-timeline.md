fromTo | GSAP | Docs & Learning
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
properties
.autoRemoveChildren
.data
.labels
.parent
.scrollTrigger
.smoothChildTiming
.vars
methods
.add()
.addLabel()
.addPause()
.call()
.clear()
.currentLabel()
.delay()
.duration()
.endTime()
.eventCallback()
.from()
.fromTo()
.getById()
.getChildren()
.getTweensOf()
.globalTime()
.invalidate()
.isActive()
.iteration()
.kill()
.killTweensOf()
.nextLabel()
.pause()
.paused()
.play()
.previousLabel()
.progress()
.recent()
.remove()
.removeLabel()
.removePause()
.repeat()
.repeatDelay()
.restart()
.resume()
.reverse()
.reversed()
.revert()
.seek()
.set()
.shiftChildren()
.startTime()
.then()
.time()
.timeScale()
.to()
.totalDuration()
.totalProgress()
.totalTime()
.tweenFromTo()
.tweenTo()
.yoyo()
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
Timeline
methods
.fromTo()
On this page
fromTo
fromTo
( target:[ Object | Array | String ], fromVars:Object, toVars:Object, position:[ Number | String ] ) : self
Adds a
.fromTo()
tween to the end of the timeline - this is a convenience method that accomplishes exactly the same thing as
add( gsap.fromTo(...) )
but with less code.
Parameters
target
: [ Object | Array | String ]
Target object (or array of objects) whose properties should be affected. This can also be CSS selector text like "#feature" or "h2.author" (GSAP will pass selector strings to
document.querySelectorAll()
).
fromVars
: Object
An object defining the starting values for each property that should be animated. Do
NOT
put special properties like duration, ease, delay, etc. here - those go in the
toVars
parameter.
toVars
: Object
An object defining the end values for each property that should be animated as well as any special properties like
duration
,
onComplete
,
ease
, etc.
position
: [ Number | String ]
(default =
"+=0"
) - controls the insertion point in the timeline (by default, it's the end of the timeline). See options below, or the
Position Parameter article
which has interactive timeline visualizations and a video. If you define a label that doesn't exist yet, it will
automatically be added to the end of the timeline
Returns : self
â
self (makes chaining easier)
Details
â
Adds a
gsap.fromTo()
tween to the end of the timeline (or elsewhere using the "position" parameter) - this is a convenience method that accomplishes exactly the same thing as
add( gsap.fromTo(...) )
but with less code. For example:
var
tl
=
gsap
.
timeline
(
)
;
var
tween
=
gsap
.
fromTo
(
element
,
{
x
:
-
100
}
,
{
duration
:
1
,
x
:
100
}
)
;
tl
.
add
(
tween
)
;
//this line produces the same result as the previous two lines (just shorter)
tl
.
fromTo
(
element
,
{
x
:
-
100
}
,
{
duration
:
1
,
x
:
100
}
)
;
See the
gsap.fromTo() docs
for all the details and special properties available for a
fromTo()
Tween.
You can chain these calls together and use other convenience methods like
to()
,
call()
,
set()
, etc. to build out sequences very quickly:
//create a timeline that calls myFunction() when it completes
var
tl
=
gsap
.
timeline
(
{
onComplete
:
myFunction
}
)
;
//now we'll use chaining, but break each step onto a different line for readability...
//tween element's x from -100 to 100
tl
.
fromTo
(
element
,
{
x
:
-
100
}
,
{
duration
:
1
,
x
:
100
}
)
//then tween element's y to 50
.
to
(
element
,
{
duration
:
1
,
y
:
50
}
)
//then set element's opacity to 0.5 immediately
.
set
(
element
,
{
opacity
:
0
}
)
//then call otherFunction()
.
call
(
otherFunction
)
//finally tween the rotation of all elements with the class "myClass" to 45 and stagger the start times by 0.25 seconds
.
to
(
".myClass"
,
{
duration
:
1.5
,
rotation
:
45
,
stagger
:
0.25
}
)
;
Positioning animations in a timeline
â
By default, animations are added to the
end
of the timeline so that they're sequenced one-after-the-other but you can use the
position parameter
to control precisely where things are placed. It typically comes after the
vars
parameter and it uses a flexible syntax with the following options:
Absolute time
(in seconds) measured from the start of the timeline, as a
number
like
3
// insert exactly 3 seconds from the start of the timeline
tl
.
fromTo
(
".class"
,
{
x
:
100
}
,
{
x
:
200
}
,
3
)
;
Label
, like
"someLabel"
.
If the label doesn't exist, it'll be added to the end of the timeline.
// insert at the "someLabel" label
tl
.
fromTo
(
".class"
,
{
x
:
100
}
,
{
x
:
200
}
,
"someLabel"
)
;
"<"
The
start
of previous animation\*\*.
Think of
<
as a pointer back to the start of the previous animation.
// insert at the START of the previous animation
tl
.
fromTo
(
".class"
,
{
x
:
100
}
,
{
x
:
200
}
,
"<"
)
;
">"
- The
end
of the previous animation\*\*.
Think of
>
as a pointer to the end of the previous animation.
// insert at the END of the previous animation
tl
.
fromTo
(
".class"
,
{
x
:
100
}
,
{
x
:
200
}
,
">"
)
;
A complex string where
"+="
and
"-="
prefixes indicate
relative
values.
When a number follows
"<"
or
">"
, it is interpreted as relative so
"<2"
is the same as
"<+=2"
.
Examples:
"+=1"
- 1 second past the end of the timeline (creates a gap)
"-=1"
- 1 second before the end of the timeline (overlaps)
"myLabel+=2"
- 2 seconds past the label
"myLabel"
"<+=3"
- 3 seconds past the start of the previous animation
"<3"
- same as
"<+=3"
(see above) (
"+="
is implied when following
"<"
or
">"
)
">-0.5"
- 0.5 seconds before the end of the previous animation. It's like saying
"the end of the previous animation plus -0.5"
A complex string based on a
percentage
. When immediately following a
"+="
or
"-="
prefix, the percentage is based on
total duration
of the
animation being inserted
. When immediately following
"<"
or
">"
, it's based on the
total duration
of the
previous animation
.
Note: total duration includes repeats/yoyos
. Examples:
"-=25%"
- overlap with the end of the timeline by 25% of the inserting animation's total duration
"+=50%"
- beyond the end of the timeline by 50% of the inserting animation's total duration, creating a gap
"<25%"
- 25% into the previous animation (from its start). Same as
">-75%"
which is negative 75% from the
end
of the previous animation.
"<+=25%"
- 25% of the inserting animation's total duration past the start of the previous animation. Different than
"<25%"
whose percentage is based on the
previous animation's
total duration whereas anything immediately following
"+="
or
"-="
is based on the
inserting animation's
total duration.
"myLabel+=30%"
- 30% of the inserting animation's total duration past the label
"myLabel"
.
\*Percentage-based values were added in GSAP 3.7.0
\*\*The "previous animation" refers to the most recently-inserted animation, not necessarily the animation that is closest to the end of the timeline.
Position Parameter Interactive Demo
â
loading...
Be sure to read the
Position Parameter article
which includes interactive timeline visualizations and a video.
info
By default,
immediateRender
is
true
in
fromTo()
tweens, meaning that they immediately render their starting state regardless of any delay that is specified. You can override this behavior by passing
immediateRender: false
in the vars parameter so that it will wait to render until the tween actually begins.
Previous
.from()
Next
.getById()
Contents
Returns : self
Details
Positioning animations in a timeline
Position Parameter Interactive Demo
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