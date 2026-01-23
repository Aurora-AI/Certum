gsap.ticker | GSAP | Docs & Learning
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
properties
gsap.ticker
On this page
gsap.ticker
Type : Object
â
The
gsap.ticker
is like the heartbeat of the GSAP engine - it updates the
globalTimeline
on every
requestAnimationFrame
event, so it is perfectly synchronized with the browser's rendering cycle. You can add your own listener(s) to run custom logic after each update (great for game developers). Add as many listeners as you want.
Basic example
â
//add listener
gsap
.
ticker
.
add
(
myFunction
)
;
function
myFunction
(
)
{
//executes on every tick after the core engine updates
}
//to remove the listener later...
gsap
.
ticker
.
remove
(
myFunction
)
;
Callback parameters
â
The following parameters are passed to each listener function:
time
:
Number
- the total time (in seconds) since the ticker started. The ticker's start time may get pushed forward by lagSmoothing.
deltaTime
:
Number
- the amount of milliseconds that elapsed since the previous tick. Note: you can use
gsap.ticker.deltaRatio()
to get a ratio instead that's based on a certain target FPS.
frame
:
Number
- the frame (tick) number which gets incremented on each tick.
So your listener function could be setup to make use of those the parameters that are passed to it like so:
function
myFunction
(
time
,
deltaTime
,
frame
)
{
//makes use of time, deltaTime, and frame
}
Advanced options for .add()
â
There are two optional parameters you can use in
gsap.ticker.add()
:
once
:
Boolean
- the callback will only fire once and then get removed automatically
prioritize
:
Boolean
- the callback will be added to the top of the queue instead of the bottom, meaning it'll fire
before
any of the listeners currently in the queue. This is perfect for if you want your callback to fire before GSAP's global timeline.
// call myCallback once on the next requestAnimationFrame BEFORE the global timeline updates.
gsap
.
ticker
.
add
(
myCallback
,
true
,
true
)
;
These advanced options were added in GSAP 3.10.0
Throttling when tab is hidden
â
When the user switches to a different tab in the browser, the ticker's updates get throttled down significantly in order to conserve battery power and reduce load on the CPU (this happens because the browser itself throttles down
requestAnimationFrame
event dispatching). Typically
requestAnimationFrame
events occur around 60 times per second, but that's up to the browser and depends on system performance as well. Some modern devices update at 120hz (120 times per second). If
requestAnimationFrame
isn't supported, the ticker automatically falls back to using a regular
setTimeout()
loop.
Ticker properties
â
time
:
Number
- the total time (in seconds) since the ticker started. The ticker's start time may get pushed forward by lagSmoothing.
frame
:
Number
- the frame (tick) number which gets incremented on each tick.
gsap.ticker.fps()
â
To limit the ticker to a particular frame rate, you can use the
fps()
method like this:
// throttle the frames-per-second to 30
gsap
.
ticker
.
fps
(
30
)
;
Since it isn't possible to have the browser speed up the native
requestAnimationFrame
events (typically 60fps), you can't do something like
gsap.ticker.fps(100)
(well, you can but it'll still run at around 60fps). You could, however, do
gsap.ticker.fps(30)
to have the ticker skip beats when necessary in order to get you as close as possible to 30fps (or whatever fps you set
below
the native frequency).
gsap.ticker.deltaRatio()
â
(added in 3.5.0)
The
gsap.ticker.deltaRatio()
method returns the elapsed time since the last tick as a ratio based on a certain target FPS. For example, if you do
gsap.ticker.deltaRatio(60)
but the elapsed time since the last tick was actually more like it was running at 30fps (maybe things got bogged down), it would return
2
so that you can easily set up loops that dynamically adjust to frame rate variations, like:
gsap
.
ticker
.
add
(
function
(
)
{
obj
.
x
+=
3
\*
gsap
.
ticker
.
deltaRatio
(
60
)
;
// rate of change will always be consistent even if the frame rate fluctuates
}
)
;
The default
fps
parameter is 60, so you don't even need to pass one in unless you're using something other than 60fps. For example, if you'd like to get the ratio based on things running at 30fps, you'd do
gsap.ticker.deltaRatio(30)
Here's a demo
from Blake Bowen.
gsap.ticker.lagSmoothing()
â
The
gsap.ticker.lagSmoothing()
method acts as a getter and setter for GSAP's lag smoothing.
What happens when the CPU gets bogged down and there's a lag between renders?
â
For example, imagine a 2-second tween that should start right away, but the CPU is busy for a full second before it can render that tween for the first time. Most other animation engines (including CSS animations in some browsers) slide the start time forward to compensate but there's a
major
drawback to that approach: it sacrifices synchronization and can mangle delays so that when you try to neatly stagger animations, they
spew out in clumps/groups
. That's no good.
GSAP has always used a strict timing model that prioritizes perfect synchronization, meaning in the example above, the tween would render as if it's halfway done after the initial 1-second lag. Basically, every animation engine has to pay the lag tax one way or the other - either maintain strict timing and synchronization, or slide the starting times around and lose sync.
gsap.ticker.lagSmoothing()
gives you the best of both worlds because when the CPU gets bogged down, it adjusts the core timing mechanism on the next tick which affects
all
animations, thus everything remains
perfectly synchronized
. You can set the threshold (in millisecond) so that whenever there's a lag
greater than
that threshold, the engine will adjust the internal clock to act like the
adjustedLag
elapsed instead. Even though you call the static method on
gsap
, this one adjustment affects everything in GSAP (tweens,
timeline
s, and
delayedCall
s because they're all driven by a single timing mechanism at the heart of
gsap
).
For example, if the
threshold
is
500
and the
adjustedLag
is
33
(those are the defaults), the only time an adjustment will occur is when more than 500ms elapses between two ticks in which case it will act as though only 33ms elapsed. So if the CPU bogs down for 2 full seconds (yikes!), your animations will move 33ms worth of time on the next render instead of jumping a full 2-seconds.
\*Note:
this has no affect on the device's performance or true frame rate - this merely affects how GSAP reacts when the browser drops frames.\*
This feature is
already activated by default
, using a
threshold
of 500ms and a
adjustedLag
of 33ms, but if you want to change the settings you can do so like this:
//compensate only when 1000ms or more elapses between 2 ticks,//and then make it act like only 16ms elapsed:
gsap
.
ticker
.
lagSmoothing
(
1000
,
16
)
;
Why not set the values super low, like to 10 for both?
â
Because doing so wouldn't allow much breathing room, and it would naturally make your tweens look like they're running more slowly (because technically they are if the time is getting nudged forward on almost every render). Also note that if you've got any delayedCalls, those will be affected as well. That's a good thing - it ensures that you can rely on those to be perfectly synchronized with the rest of the engine, but if the browser is under heavy pressure and is only rendering a few frames per second, it'd seem as if time is literally slowing down and a 2-second tween (or delayedCall) might actually take 8 seconds to complete.
In most real-world scenarios, the defaults of 500 and 33 are ideal because they protect against significant hiccups in the browser/CPU while allowing minor variations in the frame rate without slowing things down unnecessarily.
If you'd like to disable lag smoothing, you can simply set it to 0 like
gsap.ticker.lagSmoothing(0)
which is the same as setting the threshold to a super large value so that it never kicks in.
Previous
gsap.globalTimeline
Next
gsap.utils
Contents
Type : Object
Basic example
Callback parameters
Advanced options for .add()
Throttling when tab is hidden
Ticker properties
gsap.ticker.fps()
gsap.ticker.deltaRatio()
gsap.ticker.lagSmoothing()
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