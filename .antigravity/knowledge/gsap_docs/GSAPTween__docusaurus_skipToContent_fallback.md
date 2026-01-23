Tween | GSAP | Docs & Learning
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
On this page
Tween
Quick Start
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
A Tween is what does all the animation work - think of it like a
high-performance property setter
. You feed in targets (the objects you want to animate), a duration, and any properties you want to animate and when its playhead moves to a new position, it figures out what the property values should be at that point applies them accordingly.
Methods for creating a Tween
(all of these methods return a Tween instance):
gsap.to()
gsap.from()
gsap.fromTo()
For simple animations, the methods above are all you need! For example:
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
Since GSAP can animate any property of any object, you are NOT limited to CSS properties or DOM objects. Go crazy. You may be surprised by how many things can be animated with GSAP and it "just works".
You can do basic sequencing by using the
delay
special property, but
Timelines
make sequencing and complex choreography much, much easier. A Timeline is like a container for multiple Tween instances (and/or other
Timelines
) where you can position them in time and control them as a whole. See the
Timeline docs
for details.
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
loading...
info
To simply fire off animations and let them run, there's no need to use variables. Tweens play immediately by default (though you can set a
delay
or
paused
value) and when they finish, they automatically dispose of themselves. Call
gsap.to()
as much as you want without worrying about cleanup.
Parameters
targets
- the object(s) whose properties you want to animate. This can be selector text like
".class"
,
"#id"
, etc. (GSAP uses
document.querySelectorAll()
internally) or it can be direct references to elements, Â generic objects, or even an array of objects
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
The duration of the animation (in seconds).
Default:
0.5
.
ease
Controls the rate of change during the animation, giving it a specific feel. For example,
"elastic"
or
"strong.inOut"
. See the
Ease Visualizer
for a list of all of the options.
ease
can be a String (most common) or a function that accepts a progress value between 0 and 1 and returns a converted, similarly normalized value.
Default:
"power1.out"
.
id
Allows you to (optionally) assign a unique identifier to your tween instance so that you can find it later with
gsap.getById()
and it will show up in
GSDevTools
with that id.
immediateRender
Normally a tween waits to render for the first time until the very next tick (update cycle) unless you specify a delay. Set
immediateRender: true
to force it to render immediately upon instantiation.
Default:
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
applied
.
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
.
onComplete
A function to call when the animation has completed.
onCompleteParams
An Array of parameters to pass the onComplete function. For example,
gsap.to(".class", {x:100, onComplete:myFunction, onCompleteParams:["param1", "param2"]});
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
.
paused
If
true
, the animation will pause itself immediately upon creation.
Default:
false
.
repeat
How many times the animation should repeat. So
repeat: 1
would play a total of two iterations.
Default:
0
.
repeat: -1
will repeat infinitely.
repeatDelay
Amount of time to wait between repeats (in seconds).
Default:
0
.
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
.
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
.
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
Â for a range or like
"random([red, blue, green])"
Â for an array and GSAP will swap in a random value
for each target
accordingly! This makes advanced randomized effects simple. You can even have the random number rounded to the closest increment of any number! For example:
gsap
.
to
(
".class"
,
{
x
:
"random(-100, 100, 5)"
//chooses a random number between -100 and 100 for each target, rounding to the closest 5!
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
//randomly selects one of the values (0, 100, 200, or 500)
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
20.
Staggers
â
If multiple targets are defined, you can easily
stagger
(offset) the start times for each by setting a value like
stagger: 0.1
(for 0.1 seconds between each start time). Or you can get much more advanced staggers by using a stagger object. For more information, see
the stagger documentation
.
Sequencing
â
For basic sequencing, you could use a
delay
on each tween (like
gsap.to(".class", {`delay: 0.5,`Â duration: 1, x: 100})
), but we
strongly
recommended using a
Timeline
for all but the simplest sequencing tasks because it gives you much greater flexibility, especially when you're experimenting with timing. It allows you to append tweens one-after-the-other and then control the entire sequence as a whole. You can even have the tweens overlap as much as you want, Â nest timelines as deeply as you want, and much, much more.
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
Notes / Tips
â
You can change the default ease via
gsap.defaults({ease: ...})
. The default is
"power1.out"
.
Kill all tweens of a particular object anytime with
gsap.killTweensOf(yourObject)
You can also use selector text like
gsap.killTweensOf("#someID");
You can kill all
delayedCall
s to a particular function with
gsap.killTweensOf(myFunction)
Methods
â
delay
( value:Number ) : [Number | self]
Gets or sets the animation's initial delay which is the length of time in seconds before the animation should begin.
duration
( value:Number ) : [Number | self]
Gets or sets the animation's duration, not including any repeats or repeatDelays.
endTime
( includeRepeats:Boolean ) : Number
Returns the time at which the animation will finish according to the parent timeline's local time.
eventCallback
( type:String, callback:Function, params:Array ) : [Function | self]
Gets or sets an event callback like
"onComplete", "onUpdate", "onStart"
or or
"onRepeat"
along with any parameters that should be passed to that callback.
globalTime
( localTime:Number ) : Number
Converts a local time to the corresponding time on the
gsap.globalTimeline
(factoring in all nesting, timeScales, etc.).
invalidate
( ) : self
[override] Flushes any internally-recorded starting/ending values which can be useful if you want to restart an animation without reverting to any previously recorded starting values.
isActive
( ) : Boolean
Indicates whether or not the animation is currently active (meaning the virtual playhead is actively moving across this instance's time span and it is not paused, nor are any of its ancestor timelines).
iteration
( ) : [Number | self]
Gets or sets the iteration (the current repeat) of tweens.
kill
( target:Object, propertiesList:String ) : self
Kills the animation entirely or in part depending on the parameters. To kill means to immediately stop the animation, remove it from its parent timeline, and release it for garbage collection.
pause
( atTime:Number, suppressEvents:Boolean ) : self
Pauses the instance, optionally jumping to a specific time.
paused
( value:Boolean ) : [Boolean | self]
Gets or sets the animation's paused state which indicates whether or not the animation is currently paused.
play
( from:Number, suppressEvents:Boolean ) : self
Begins playing forward, optionally from a specific time (by default playback begins from wherever the playhead currently is).
progress
( value:Number, suppressEvents:Boolean ) : [Number | self]
[override] Gets or sets the tween's progress which is a value between 0 and 1 indicating the position of the virtual playhead (excluding repeats) where 0 is at the beginning, 0.5 is halfway complete, and 1 is complete.
repeat
( value:Number ) : [Number | self]
Gets or sets the number of times that the tween should repeat after its first iteration.
repeatDelay
( value:Number ) : [Number | self]
Gets or sets the amount of time in seconds between repeats.
restart
( includeDelay:Boolean, suppressEvents:Boolean ) : self
Restarts and begins playing forward from the beginning.
resume
( ) : self
Resumes playing without altering direction (forward or reversed).
reverse
( from:\*, suppressEvents:Boolean ) : self
Reverses playback so that all aspects of the animation are oriented backwards including, for example, a tween's ease.
reversed
( value:Boolean ) : [Boolean | self]
Gets or sets the animation's reversed state which indicates whether or not the animation should be played backwards.
revert
( ) : Self
Reverts the animation and kills it, returning the targets to their pre-animation state including the removal of inline styles added by the animation.
seek
( time:\*, suppressEvents:Boolean ) : self
Jumps to a specific time without affecting whether or not the instance is paused or reversed.
startTime
( value:Number ) : [Number | self]
Gets or sets the time at which the animation begins on its parent timeline (after any delay that was defined).
targets
( ) : Array
then
( callback:Function ) : Promise
Returns a promise so that you can uses promises to track when a tween or timeline is complete.
time
( value:Number, suppressEvents:Boolean ) : [Number | self]
[override] Gets or sets the local position of the playhead (essentially the current time), not including any repeats or repeatDelays.
timeScale
( value:Number ) : [Number | self]
Factor that's used to scale time in the animation where 1 = normal speed (the default), 0.5 = half speed, 2 = double speed, etc.
totalDuration
( value:Number ) : [Number | self]
[override] Gets or sets the total duration of the tween in seconds including any repeats or repeatDelays.
totalProgress
( value:Number, suppressEvents:Boolean ) : [Number | self]
[override] Gets or sets the tween's totalProgress which is a value between 0 and 1 indicating the position of the virtual playhead (including repeats) where 0 is at the beginning, 0.5 is halfway complete, and 1 is complete.
totalTime
( time:Number, suppressEvents:Boolean ) : [Number | self]
Gets or sets the position of the playhead according to the totalDuration which includes any repeats and repeatDelays.
yoyo
( value:Boolean ) : [Boolean | self]
Gets or sets the tween's yoyo state, where true causes the tween to go back and forth, alternating backward and forward on each repeat.
Properties
â
data
: \*
A place to store any data you want (initially populated with
vars.data
if it exists).
ratio
[read-only]
the progress of the Tween (a value between 0 and 1 where 0.5 is in the middle)
after
being run through the
ease
. So this value may exceed the 0-1 range, like in the case of
ease: "back"
or
ease: "elastic"
. It can be useful as a multiplier for your own interpolation, like in an
onUpdate
callback.
scrollTrigger
:
ScrollTrigger
| undefined
A handy way to access the ScrollTrigger associated with a tween. This is only accessible if the tween has a ScrollTrigger.
vars
: Object
The configuration object passed into the constructor which contains all the properties/values you want to animate, along with any of the optional
special properties
like like
onComplete
,
onUpdate
, etc., like
gsap.to(".class",{onComplete: func});
Previous
Snap
Next
.data
Contents
Special Properties
Plugins
Function-based values
Random values
Relative values
Staggers
Sequencing
Keyframes
Notes / Tips
Methods
Properties
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