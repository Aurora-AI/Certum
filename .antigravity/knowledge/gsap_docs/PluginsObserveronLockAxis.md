Observer | GSAP | Docs & Learning
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
Easel
GSDevTools
Inertia
MorphSVG
MotionPath
MotionPathHelper
Observer
properties
.deltaX
.deltaY
.event
.isDragging
.isEnabled
.isPressed
.startX
.startY
Observer.isTouch
.target
.vars
.velocityX
.velocityY
.x
.y
methods
.disable()
.enable()
.kill()
Observer.create()
Observer.getAll()
Observer.getById()
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
Observer
On this page
added in v
3.10.0
Observer
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
Observer
)
Minimal usage
Observer
.
create
(
{
target
:
window
,
// can be any element (selector text is fine)
type
:
"wheel,touch"
,
// comma-delimited list of what to listen for
onUp
:
(
)
=>
previous
(
)
,
onDown
:
(
)
=>
next
(
)
,
}
)
;
Super-flexible, unified way to sense meaningful events across all (touch/mouse/pointer) devices without wrestling with all the implementation details. Perhaps you want to respond to "scroll-like" user behavior which could be a mouse wheel spin, finger swipe on a touch device, a scrollbar drag, or a pointer press & drag...and of course you need directional data and velocity. No problem!
Detailed Walkthrough
Tell Observer which event types to watch (wheel, touch, pointer, and/or scroll) and it will collect delta values over the course of each requestAnimationFrame tick (
debounced
for performance by default) and automatically determine the biggest delta and then trigger the appropriate callback(s) like
onUp
,
onDown
,
onDrag
, etc. (see the full list below).
Look how easy it is to trigger next()/previous() functions based on when the user swipes up/down or uses their mouse wheel:
Observer
.
create
(
{
target
:
window
,
// can be any element (selector text is fine)
type
:
"wheel,touch"
,
// comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
onUp
:
(
)
=>
previous
(
)
,
onDown
:
(
)
=>
next
(
)
,
}
)
;
info
Observer is included in ScrollTrigger too!
â
There's a
ScrollTrigger.observe()
method that's identical to
Observer.create()
. Since ScrollTrigger's
normalizeScroll()
functionality leverages Observer under the hood (thus it's included inside ScrollTrigger anyway), it made sense to expose its functionality so that you can avoid loading Observer as a separate file if you're already using ScrollTrigger in your project. You're welcome. ð
Demo
â
Notice there's no actual scrolling in the demo below but you can use your mouse wheel (or swipe on touch devices) to initiate movement so it "feels" like a scroll:
loading...
Feature Highlights
Rich callback system
including onDown, onUp, onLeft, onRight, onDrag, onDragStart, onDragEnd, onHover, onHoverEnd, onToggleY, onToggleX, onChangeX, onChangeY, onChange, onClick, onPress, onRelease, onMove, onWheel, and onStop
Debounced
by default for maximum performance (you can set
debounce: false
if you prefer)
Cross-browser compatible
- automatically senses if TouchEvents, PointerEvents, or MouseEvents should be used.
Automatically prioritizes the event with the
largest delta
(like if a wheel and scroll and touch event all occur during the same debounced period)
read more...
Ignore certain elements, like
ignore: ".deadzone"
Get
velocity
(on x and y axis separately) as well as the clientX and clientY coordinates (for touch/pointer events)
Set a
minimum threshold for dragging
. For example, dragMinimum: 5 would only fire the onDragStart/onDrag/onDragEnd callbacks if the user moved 5 pixels or more.
Set a
tolerance
so that the movement-related callbacks only fire when a minimum delta is reached, so
tolerance: 50
would wait until there has been a change of at least 50 pixels, and then once that's reached it starts over.
Set a
wheelSpeed
multiplier if you'd like to tweak the wheel-related deltas (speed them up or slow them down).
Integrated with GSAP and
ScrollTrigger
Roughly
3.5kb gzipped
Config Object
â
The configuration object that is passed to
Observer.create()
can have any of the following optional properties:
Property
Description
axis
string
- when
lockAxis: true
is set, the first drag movement (with type: "pointer" and/or "touch") after each press will set the
axis
property to "x" or "y", depending on which direction the user moved. You can use the
onLockAxis()
callback to know when it gets set.
capture
Boolean
- if
true
, it will make the touch/pointer-related listeners use the capture phase. Like doing addEventListener("[type]", func, {capture: true});
debounce
Boolean
- by default, Observer will debounce events so that deltas are additive over the course of each requestAnimationFrame() tick in order to maximize performance, but you can disable that with
debounce: false
in which case it will check immediately on every event. The debounce affects all callbacks except
onPress
,
onRelease
,
onHover
,
onHoverEnd
,
onClick
,
onDragStart
, and
onDragEnd
because those aren't delta-related.
dragMinimum
Number
- the minimum distance (in pixels) necessary to be considered "dragging". This can help prevent tiny motions especially on touch devices from indicating intent. For example, just pressing down with a finger on a phone may register slight movement of a few pixels even though the user thinks their finger was stationary. dragMinimum only applies to the initial movement after pressing down, but continued dragging thereafter would only be subject to "tolerance" throttling.
id
String
- an arbitrary string ID which an be used to get the Observer via
Observer.getById()
.
ignore
Element | String | Array
- elements that you'd like the observer to
IGNORE
, so that when a scroll/touch/pointer/mouse event is triggered by one of these elements, it gets ignored completely. It checks the
event.target
to discern if the event should be ignored. You can define
ignore
as an Element reference, selector text like
".ignore-me"
, or an Array of elements (it can be as many as you'd like).
lockAxis
Boolean
- if
true
, the Observer will watch the direction of the very first drag move after each press (with type: "pointer" and/or "touch") and lock into that direction until the user releases the pointer/touch. So if the first drag is horizontal, then only the horizontal-related callbacks like
onChangeX()
will fire until the pointer/touch is released. There's even an
onLockAxis()
callback that you can tie into.
onChange
Function
- function to call when there is movement on
either
the y-axis (vertically)
or
the x-axis (horizontally). It will keep calling the function as long as the movement continues (subject to any tolerance threshold).
onChangeX
Function
- function to call when there is movement on the x-axis (horizontally). It will keep calling the function as long as the movement continues (subject to any tolerance threshold).
onChangeY
Function
- function to call when there is movement on the y-axis (vertically). It will keep calling the function as long as the movement continues (subject to any tolerance threshold).
onClick
Function
- function to call when the target is clicked.
onDown
Function
- function to call when downward motion is detected, meaning the delta values increase (like dragging your finger/mouse DOWNWARD...which makes the
y
coordinate
increase
). If you want to invert only the mouse wheel delta, you can set
wheelSpeed: -1
because it's a multiplier.
onDragStart
Function
- function to call when the user presses down on the target and then begins dragging (subject to
dragMinimum
). This only applies to "touch" and/or "pointer" types.
onDrag
Function
- function to call when the user moves the pointer/touch/mouse
while pressing
on the target element (only applies to "touch" and/or "pointer" types).
onDragEnd
Function
- function to call when the user stops dragging on the target element (only applies to "touch" and/or "pointer" types).
onLeft
Function
- function to call when motion is detected toward the left direction.
onLockAxis
Function
- function to call when the axis gets locked (requires
lockAxis: true
). You can check which axis via the Observer's
axis
property ("x" or "y").
onHover
Function
- function to call when the pointer/mouse hovers over the target ("pointerenter"/"mouseenter" event).
onHoverEnd
Function
- function to call when the pointer/mouse moves off the target ("pointerleave"/"mouseleave" event).
onMove
Function
- function to call when the user moves the pointer/mouse while hovered over the target element (only applies to "pointer" types). It listens for "pointermove"/"mousemove" events internally. Use
onDrag
if you want it to fire only while pressing and dragging. Note that when you define an onMove, it causes the Observer to measure delta values
while hovering
over the target, consequently triggering the appropriate movement-related callbacks like onUp, onDown, onChange, etc. for any pointer/mouse movement while over the target. Normally the movement-related callbacks are only triggered when the user
presses and drags
.
onPress
Function
- function to call when the user presses down on the target element (only applies to "touch" and/or "pointer" types).
onRelease
Function
- function to call when the touch/pointer is released after the
onPress
was called (only applies to "touch" and/or "pointer" types).
onRight
Function
- function to call when motion is detected toward the right direction.
onStop
Function
- function to call when changes have ceased for at least 0.25 seconds (configurable with
onStopDelay
)
onStopDelay
Number
- number of seconds to wait after changes have ceased firing before the
onStop
gets called (default: 0.25 seconds).
onToggleX
Function
- function to call when motion
switches direction
on the x-axis (horizontally).
onToggleY
Function
- function to call when motion
switches direction
on the y-axis (vertically).
onUp
Function
- function to call when upward motion is detected, meaning the delta values decrease (like dragging your finger/mouse UPWARD...which makes the
y
coordinate decrease). If you want to invert only the mouse wheel delta, you can set
wheelSpeed: -1
because it's a multiplier.
onWheel
Function
- function to call when the mouse wheel is used.
scrollSpeed
Number
- a multiplier for scroll delta values. This only applies to type
"scroll"
, meaning when the target dispatches a scroll event which is different than a wheel event. You could set
scrollSpeed: -1
to invert the delta values and have it call
onUp
instead of
onDown
(and vice versa).
scrollSpeed: 0.5
would make the delta values
half
of what they'd normally be.
Note: there's also a separate
wheelSpeed
option that only applies to wheel events.
target
Element | String
- the element whose events should be listened for. By default, it's the main viewport.
tolerance
Number
- the minimum distance (in pixels) necessary to trigger one of the callbacks like
onUp
,
onDown
,
onChangeY
, etc. So, for example, if the tolerance is 10 but the user only moves 8 pixels, no callback will be fired. Once the distance exceeds the tolerance amount, it fires the callbacks and resets, waiting for that distance to be exceeded again before firing the callback(s).
type
String
- a comma-delimited list of the types of actions you'd like to listen for which can include any (or all) of the following:
"wheel,touch,scroll,pointer"
. "touch" works on any touch devices regardless of browser (iOS/Android may use TouchEvents under the hood whereas Microsoft may use PointerEvents but Observer includes them both in "touch"). "pointer" covers any non-touch pointer/mouse press/drag/swipe movements. "wheel" is for mouse wheel movements, and "scroll" is for scroll events.
Default is
"wheel,touch,pointer"
wheelSpeed
Number
- a multiplier for wheel delta values. By default, it merely passes along the wheel event's delta that the browser reports but perhaps it seems faster/slower than when you press/drag with the pointer and you need a way to make them more similar. To make the wheel delta values half of what they normally are, for example, you'd do
wheelSpeed: 0.5
. You could set
wheelSpeed: -1
to invert the delta values and have it call
onUp
instead of
onDown
(and vice versa).
Note: there's also a separate
scrollSpeed
option that only applies to scroll events.
Callback data
â
Each callback is passed the Observer instance itself as the only parameter so that you can easily access data like
self.velocityX
,
self.velocityY
,
self.deltaX
,
self.deltaY
,
self.x
,
self.y
, etc. (see the sidebar to the left for a list of all the available properties) like:
Observer
.
create
(
{
...
onChange
:
(
self
)
=>
{
console
.
log
(
"velocity:"
,
self
.
velocityX
,
self
.
velocityY
,
"delta:"
,
self
.
deltaX
,
self
.
deltaY
,
"target element:"
,
self
.
target
,
"last event:"
,
self
.
event
)
;
}
}
)
;
There's a list of properties in the nav bar to the left.
Showcase & how-to demos
â
Observer showcase
Properties
â
deltaX
: Number
The amount of change (in pixels) horizontally since the last time a callback was fired on that axis. For example,
onChangeX
or
onRight
deltaY
: Number
The amount of change (in pixels) vertically since the last time a callback was fired on that axis. For example,
onChangeY
or
onDown
event
: Event
The most recent Event object (could be a TouchEvent, PointerEvent, MouseEvent, WheelEvent, or ScrollEvent based on whatever
type
you define)
isDragging
: Boolean
When the user presses on the
target
and drags more than the
dragMinimum
(0 by default),
isDragging
is set to
true
until the touch/pointer is released (even if the user continues dragging
outside the bounds of the target
).
isEnabled
: Boolean
Indicates whether or not the Observer is enabled. Use the
enable()
and
disable()
methods to set the state. When an Observer is disabled, it removes all of its event listeners from the target and obviously won't trigger any callbacks. There are
onEnable
and
onDisable
callbacks, though, which of course would be called when you enable/disable the Observer.
isPressed
: Boolean
Set to
true
while the user presses on the target (only applies to
type
of "pointer" and "touch")
startX
: Number
The
clientX
from the most recent
onPress
touch/pointer event, which refers to the horizontal distance from the left edge of the viewport. This only gets updated if you set the
type
to include "touch" and/or "pointer". It's quite useful for dragging logic.
startY
: Number
The
clientY
from the most recent
onPress
touch/pointer event, which refers to the vertical distance from the top edge of the viewport. This only gets updated if you set the
type
to include "touch" and/or "pointer". It's quite useful for dragging logic.
Observer
.isTouch
: Number
A way to discern the touch capabilities of the current device -
0
is mouse/pointer only (no touch),
1
is touch-only,
2
accommodates both.
target
: Element
The target Element
vars
: Object
The configuration object that was originally passed in to the Observer.create().
velocityX
: Number
The horizontal velocity (in pixels per second).
velocityY
: Number
The vertical velocity (in pixels per second).
x
: Number
the
clientX
from the most recent touch/pointer event, which refers to the horizontal distance from the left edge of the viewport. This only gets updated if you set the
type
to include "touch" and/or "pointer".
y
: Number
the
clientY
from the most recent touch/pointer event, which refers to the vertical distance from the top edge of the viewport. This only gets updated if you set the
type
to include "touch" and/or "pointer".
Methods
â
disable
( ) : void
Disables the Observer, removing the necessary event listeners and firing the
onDisable
callback if the Observer wasn't already disabled.
enable
( event:Event ) : Self
Enables the Observer, adding the necessary event listeners and firing the
onEnable
callback if the Observer wasn't already enabled.
kill
( ) : void
Kills the Observer instance, calling
disable()
and removing it from the internal Array so that it can no longer be found via .getAll() or .getById(), making it available for garbage collection. This is permanent. If you plan on enabling the instance again later, just use
disable()
instead of
kill()
.
Observer
.create
( vars:Object ) : Observer
Creates a new Observer instance according to the configuration details provided.
Observer
.getAll
( ) : Array
Gets an Array of all Observers that have been created (and not killed). This can be useful if, for example, your framework requires that you kill everything like on a routing change.
Observer
.getById
( id:String ) : Observer
The Observer instance with the matching
id
that was defined in the configuration
vars
object (or undefined if no matching ScrollTriggers are found)
FAQs
â
Can I apply multiple Observer instances to the same target?
Absolutely! That could be useful if, for example, you want certain callbacks debounced but others not. And remember that you can .disable() and .enable() an Observer anytime.
If I'm loading ScrollTrigger already, do I need to ALSO load Observer?
No, Observer is already included inside the ScrollTrigger file; you can access it via
ScrollTrigger.observe()
and skip loading the Observer file separately.
Demos
â
Check out the full collection of
How-to demos
and our favourite
inspiring community demos
on CodePen.
Previous
MotionPathHelper.editPath()
Next
.deltaX
Contents
Observer is included in ScrollTrigger too!
Demo
Config Object
Callback data
Showcase & how-to demos
Properties
Methods
FAQs
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