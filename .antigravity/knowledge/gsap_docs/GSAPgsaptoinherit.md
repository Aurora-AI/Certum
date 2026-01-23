gsap.to() | GSAP | Docs & Learning
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
methods
gsap.to()
On this page
gsap.to()
Returns :
Tween
â
The most common type of animation is a
to()
tween because it allows you to define the
destination values
(and most people think in terms of animating
to
certain values):
// rotate and move elements with a class of "box"
// ("x" is a shortcut for a translateX() transform) over the course of 1 second.
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
GSAP figures out the current values automatically (you don't need to define starting values, though you can in a
fromTo()
tween). Since GSAP can animate
any
property of
any
object, you are
NOT
limited to CSS properties or DOM objects. Go crazy. You may be surprised by how many things can be animated with GSAP and it "just works".
To control the Tween instance later, assign it to a variable (GSAP is conveniently object-oriented):
let
tween
=
gsap
.
to
(
".class"
,
{
rotation
:
360
,
duration
:
5
,
ease
:
"elastic"
}
)
;
//now we can control it!
tween
.
pause
(
)
;
tween
.
seek
(
2
)
;
tween
.
progress
(
0.5
)
;
tween
.
play
(
)
;
...
loading...
To simply fire off animations and let them run, there's no need to use variables. Tweens play immediately by default (though you can set a
delay
or
paused
value) and when they finish, they automatically dispose of themselves. Call
gsap.to()
as much as you want without worrying about cleanup.
Other types of tweens:
from()
- you define the
starting
values to animate
"from"
, GSAP uses the current values as the destinations (like a tween running backwards)
fromTo()
- you define the
starting and ending
values.
Parameters
â
targets
- the object(s) whose properties you want to animate. This can be selector text like
".class"
,
"#id"
, etc. (GSAP uses
document.querySelectorAll()
internally) or it can be direct references to elements, generic objects, or even an array of objects.
vars
- an object containing all the properties/values you want to animate, along with any special properties like
ease
,
duration
,
delay
, or
onComplete
(listed below).
Special Properties
â
Add any of these to your
vars
object to give your animation special powers:
Property
Description
callbackScope
The scope to be used for all of the callbacks (onStart, onUpdate, onComplete, etc.).
data
Assign arbitrary data to this property (a string, a reference to an object, whatever) and it gets attached to the tween instance itself so that you can reference it later like
yourTween.data
.
delay
Amount of delay before the animation should begin (in seconds).
duration
The duration of the animation (in seconds). Default:
0.5
ease
Controls the rate of change during the animation, giving it a specific feel. For example,
"elastic"
or
"strong.inOut"
. See the
Ease Visualizer
for a list of all of the options.
ease
can be a String (most common) or a function that accepts a progress value between 0 and 1 and returns a converted, similarly normalized value. Default:
"power1.out"
id
Allows you to (optionally) assign a unique identifier to your tween instance so that you can find it later with
gsap.getById()
and it will show up in
GSDevTools
with that id.
immediateRender
Normally a tween waits to render for the first time until the very next tick (update cycle) unless you specify a delay. Set
immediateRender: true
to force it to render immediately upon instantiation. Default:
false
for
to()
tweens,
true
for
from()
and
fromTo()
tweens or anything with a
scrollTrigger
applied.
inherit
Normally tweens inherit from their parent timeline's
defaults
object (if one is defined), but you can disable this on a per-tween basis by setting
inherit: false
.
lazy
When a tween renders for the very first time and reads its starting values, GSAP will try to delay writing of values until the very end of the current "tick" which can improve performance because it avoids the read/write/read/write layout thrashing that browsers dislike. To disable lazy rendering for a particular tween, set
lazy: false
. In most cases, there's no need to set
lazy
. To learn more, watch
this video
.
Default:
true
(except for zero-duration tweens)
onComplete
A function to call when the animation has completed
onCompleteParams
An Array of parameters to pass the onComplete function. For example,
gsap.to(".class", {x:100, onComplete:myFunction, onCompleteParams:["param1", "param2"]});
onInterrupt
A function to call when the animation is interrupted, meaning if/when the tween is killed before it completes. This could happen because its kill() method is called or due to overwriting.
onInterruptParams
An Array of parameters to pass the onInterrupt function. For example,
gsap.to(".class", {x:100, onInterrupt:myFunction, onInterruptParams:["param1", "param2"]});
.
onRepeat
A function to call each time the animation enters a new iteration cycle (repeats). Obviously this only occurs if you set a non-zero
repeat
.
onRepeatParams
An Array of parameters to pass the onRepeat function.
onReverseComplete
A function to call when the animation has reached its beginning again from the reverse direction (excluding repeats).
onReverseCompleteParams
An Array of parameters to pass the onReverseComplete function.
onStart
A function to call when the animation begins (when its time changes from 0 to some other value which can happen more than once if the tween is restarted multiple times).
onStartParams
An Array of parameters to pass the onStart function.
onUpdate
A function to call every time the animation updates (on each "tick" that moves its playhead).
onUpdateParams
An Array of parameters to pass the onUpdate function.
overwrite
If
true
, all tweens of the same targets will be killed immediately regardless of what properties they affect. If
"auto"
, when the tween renders for the first time it hunt down any conflicts in active animations (animating the same properties of the same targets) and kill
only those parts
of the other tweens. Non-conflicting parts remain intact. If
false
, no overwriting strategies will be employed.
Default:
false
paused
If
true
, the animation will pause itself immediately upon creation.
Default:
false
repeat
How many times the animation should repeat. So
repeat: 1
would play a total of two iterations. Use -1 to repeat infinitely.
Default:
0
repeatDelay
Amount of time to wait between repeats (in seconds).
Default:
0
repeatRefresh
Setting
repeatRefresh: true
causes a repeating tween to
invalidate()
and re-record its starting/ending values internally on each full iteration (not including yoyo's). This is useful when you use dynamic values (relative, random, or function-based). For example,
x: "random(-100, 100)"
would get a new random x value on each repeat.
duration
,
delay
, and
stagger
do
NOT
refresh.
reversed
If
true
, the animation will start out with its playhead reversed, meaning it will be oriented to move toward its start. Since the playhead begins at a time of 0 anyway, a reversed tween will
appear
paused initially because its playhead cannot move backward past the start.
runBackwards
If
true
, the animation will invert its starting and ending values (this is what a
from()
tween does internally), though the ease doesn't get flipped. In other words, you can make a
to()
tween into a
from()
by setting
runBackwards: true
.
stagger
If multiple targets are defined, you can easily
stagger
the start times for each by setting a value like
stagger: 0.1
(for 0.1 seconds between each start time). Or you can get much more advanced staggers by using a stagger object. For more information, see
the stagger documentation
.
startAt
Defines starting values for any properties (even if they're not animating). For example,
startAt: {x: -100, opacity: 0}
yoyo
If
true
, every other
repeat
iteration will run in the opposite direction so that the tween appears to go back and forth. This has no affect on the
reversed
property though. So if
repeat
is
2
and
yoyo
is
false
, it will look like: start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end. But if
yoyo
is
true
, it will look like: start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end.
Default:
false
yoyoEase
Allows you to alter the ease in the tween's
yoyo
phase. Set it to a specific ease like
"power2.in"
or set it to
true
to simply invert the tween's normal
ease
. Note: GSAP is smart enough to automatically set
yoyo: true
if you define any
yoyoEase
, so there's less code for you to write.
Default:
false
keyframes
To animate the targets to various states, use
keyframes
- an array of vars objects that serve as
to()
tweens. For example,
keyframes: [{x:100, duration:1}, {y:100, duration:0.5}]
. All keyframes will be perfectly sequenced back-to-back, but you can define a
delay
value to add spacing between each step (or a negative delay would create an overlap). Keyframes are only to be used in
to()
tweens.
Plugins
â
A plugin adds extra capabilities to GSAP's core. Some plugins make it easier to work with rendering libraries like PIXI.js or EaselJS while other plugins add superpowers like
morphing
SVG shapes, adding
drag and drop
functionality, etc. This allows the GSAP core to remain relatively small and lets you add features only when you need them.
See the full list of plugins here
.
Function-based values
â
Get incredibly dynamic animations by using a function for any value, and it will get called
once for each target
the first time the tween renders, and whatever is returned by that function will be used as the value. This can be very useful for applying conditional logic or randomizing things (though GSAP has baked-in randomizing capabilities too...scroll down for that).
gsap
.
to
(
".class"
,
{
x
:
100
,
//normal value
y
:
function
(
index
,
target
,
targets
)
{
//function-based value
return
index \
\*
50
;
}
,
duration
:
1
}
)
;
The function is passed three parameters:
index - the index of the target in the array. For example, if there are 3

elements with the class ".box", and you
gsap.to(".box", ...)
, the function gets called 3 times (once for each target); the index would be
0
first, then
1
, and finally
2
.
target - the target itself (the

element in this example)
targets - the array of targets (same as
tween.targets()
)
Random values
â
Define random values as a string like
"random(-100, 100)"
for a range or like
"random([red, blue, green])"
for an array and GSAP will swap in a random value
for each target
accordingly! This makes advanced randomized effects simple. You can even have the random number rounded to the closest increment of any number! For example:
gsap
.
to
(
".class"
,
{
// chooses a random number between -100 and 100
// for each target, rounding to the closest 5!
x
:
"random(-100, 100, 5)"
,
}
)
;
Or use an array-like value and GSAP will randomly select one of those:
gsap
.
to
(
".class"
,
{
x
:
"random([0, 100, 200, 500])"
,
// randomly selects one of the values (0, 100, 200, or 500)
}
)
;
There's also a
gsap.utils.random()
function that you can use directly if you prefer.
Relative values
â
Use a
"+="
or
"-="
prefix to indicate a relative value. For example,
gsap.to(".class", {x:"-=20"});
will animate
x
20 pixels
less than
whatever it is when the tween starts.
{x:"+=20"}
would
add
20. To use a variable in a relative way, simply add the
"+="
or
"-="
prefix, like
{x: "+=" + yourVariable}
.
Staggers
â
If multiple targets are defined, you can easily
stagger
(offset) the start times for each by setting a value like
stagger: 0.1
(for 0.1 seconds between each start time).Or you can get much more advanced staggers by using a stagger object. For more information, see
the stagger documentation
.
Sequencing
â
For basic sequencing, you could use a
delay
on each tween (like
gsap.to(".class", {
delay: 0.5,
duration: 1, x: 100})
), but we
strongly
recommended using a
Timeline
for all but the simplest sequencing tasks because it gives you much greater flexibility, especially when you're experimenting with timing. It allows you to append tweens one-after-the-other and then control the entire sequence as a whole. You can even have the tweens overlap as much as you want, nest timelines as deeply as you want, and much, much more.
Timelines have convenient
to()
,
from()
, and
fromTo()
methods as well so you can very easily chain them together and build complex sequences:
let
tl
=
gsap
.
timeline
(
)
;
//create the timeline
tl
.
to
(
".class1"
,
{
x
:
100
}
)
//start sequencing
.
to
(
".class2"
,
{
y
:
100
,
ease
:
"elastic"
}
)
.
to
(
".class3"
,
{
rotation
:
180
}
)
;
Keyframes
â
If you find yourself animating the same target over and over again, you should definitely check out
Keyframes
which can make your code much more concise. They also let you port animations over from CSS animations easily.
Learn more about keyframes
Callbacks
â
Callbacks are functions that are called after certain events happen in a tween or timeline like when they start, complete, repeat, reverse complete, or update. They can be very useful for debugging, keeping different parts of your project in sync, and many other things.
Callbacks and Callback scope
To learn more about GSAP's callbacks, check out this video from the
"GSAP 3 Express" course
by Snorkl.tv - one of the best ways to learn the basics of GSAP 3.
Previous
gsap.timeline()
Next
gsap.updateRoot()
Contents
Returns : Tween
Parameters
Special Properties
Plugins
Function-based values
Random values
Relative values
Staggers
Sequencing
Keyframes
Callbacks
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