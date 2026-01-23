add | GSAP | Docs & Learning
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
.add()
On this page
add
add
( child:[Tween | Timeline | Label | Callback | Array], position:[Number | String | Label] ) : self
[override] Adds a tween, timeline, callback, or label (or an array of them) to the timeline.
Parameters
child
: [Tween | Timeline | Label | Callback | Array]
The tween, timeline, callback, or label (or array of them) to add
position
: [Number | String | Label]
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
Adds a tween, timeline, callback, or label (or an array of them) to the timeline.
Positioning animations in a timeline
â
By default, animations are added to the
end
of the timeline so that they're sequenced one-after-the-other but you can use the
position parameter
to control precisely where things are placed. It uses a flexible syntax with the following options:
Absolute time
(in seconds) measured from the start of the timeline, as a
number
like
3
// insert exactly 3 seconds from the start of the timeline
tl
.
add
(
animation
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
add
(
animation
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
add
(
animation
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
add
(
animation
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
Be sure to read our tutorial
Understanding the Position Parameter
which includes interactive timeline visualizations and a video.
Previous
.vars
Next
.addLabel()
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