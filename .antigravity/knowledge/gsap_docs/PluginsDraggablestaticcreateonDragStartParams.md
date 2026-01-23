static-create | GSAP | Docs & Learning
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
properties
.autoScroll
.deltaX
.deltaY
.endRotation
.endX
.endY
.isPressed
.isThrowing
.lockAxis
.lockedAxis
.maxRotation
.maxX
.maxY
.minRotation
.minX
.minY
.pointerEvent
.pointerX
.pointerY
.rotation
.startX
.startY
.target
.tween
.vars
.x
.y
.zIndex
methods
.addEventListener()
.applyBounds()
Draggable.create()
.disable()
.enable()
.enabled()
.endDrag()
Draggable.get()
.getDirection()
Draggable.hitTest()
.kill()
.startDrag()
Draggable.timeSinceDrag()
.update()
DrawSVG
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
Draggable
methods
Draggable.create()
On this page
Draggable.create
Draggable.create
( target:Object, vars:Object ) : Array
[static] A more flexible way to create Draggable instances than the constructor (
new Draggable(...)
).
Parameters
target
: Object
The element that should be draggable; this can be a regular DOM element or an array of elements. For example,
document.getElementById("yourID")
or
$("#yourID")
or
"#yourID"
or
[element1, element2, element3]
.
vars
: Object
An object containing optional configuration data like
{type: "x,y", inertia: true, edgeResistance: 0.8, onDrag: yourFunction}
.
Returns : Array
â
An array of Draggable instances (one for each element).
Details
â
Provides a more flexible way to create Draggable instances than the constructor (
new Draggable(...)
) because the
Draggable.create()
method can accommodate elements, arrays of elements or even selector text like
".yourClass"
.
Draggable.create()
always returns an array of Draggable instances, one for each element. Remember an individual Draggable instance can only be associated with a single element - that's why
Draggable.create()
creates one for each element and spits back an array.
Any of the following are valid:
//a regular DOM element
Draggable
.
create
(
document
.
getElementById
(
"yourID"
)
,
{
type
:
"x,y"
}
)
;
//or selector text
Draggable
.
create
(
"#yourID"
,
{
type
:
"x,y"
}
)
;
//or an array of elements
Draggable
.
create
(
[
element1
,
element2
,
element3
]
,
{
type
:
"x,y"
}
)
;
The second parameter is the
vars
object that contains any optional configuration data. Any of the following properties can be defined:
Config Object
â
Property
Description
activeCursor
String
- The cursorâs CSS value that should be used between the time they press and then release the pointer/mouse. This can be different than the regular
cursor
value, like:
cursor: "grab", activeCursor: "grabbing"
.
allowContextMenu
Boolean
- If
true
, Draggable will allow context menus (like if a user right-clicks or long-touches). Normally this is suppressed because it can get in the way of dragging (especially on touch devices). Default:
false
.
allowEventDefault
Boolean
- If
true
,
preventDefault()
wonât be called on the original mouse/pointer/touch event. This can be useful if you want to permit the default behavior like touch-scrolling. Typically, however, itâs best to let Draggable call
preventDefault()
on the events in order to deliver the best usability with dragging. Default:
false
.
allowNativeTouchScrolling
Boolean
- By default, allows you to native touch-scroll in the opposite direction as Draggables that are limited to one axis . For example, a Draggable of
type: "x"
or
"left"
would permit native touch-scrolling in the vertical direction, and
type: "y"
or
"top"
would permit native horizontal touch-scrolling. Default:
true
.
autoScroll
Number
- To enable auto-scrolling when a Draggable is dragged within 40px of an edge of a scrollable container, set autoScroll to a non-zero value, where 1 is normal speed, 2 is double-speed, etc. (you can use any number). For a more intuitive or natural feel, it will scroll faster as the mouse/touch gets closer to the edge. The default value is 0 (no auto-scrolling). See
this CodePen
for a demo.
bounds
[
Element
|
String
|
Object
]
- To cause the draggable element to stay within the bounds of another DOM element (like a container), you can pass the element like
bounds: document.getElementById("container")
or even selector text like
"#container"
. If you prefer, you can define bounds as a rectangle instead, like
bounds: {top: 100, left: 0, width: 1000, height: 800}
which is based on the parentâs coordinate system (top and left would be from the upper left corner of the parent). Or you can define specific maximum and minimum values like
bounds: {minX: 10, maxX: 300, minY: 50, maxY: 500}
or
bounds: {minRotation: 0, maxRotation: 270}
.
callbackScope
Object
- The scope to be used for all of the callbacks (
onDrag
,
onDragEnd
,
onDragStart
, etc). The scope is what
this
refers to inside any of the callbacks. The older callback-specific scope properties are deprecated but still work.
clickableTest
Function
- Your Draggable may contain child elements that are âclickableâ, like links
tags,
or
elements, etc. By default, it treats clicks and taps on those elements differently, not allowing the user to drag them. You can set
dragClickables: true
to override that, but it still may be handy to control exactly what Draggable considers to be a âclickableâ element, so you can use your own function that accepts the clicked-on element as the only parameter and returns true or false accordingly. Draggable will call this function whenever the user presses their mouse or finger down on a Draggable, and the target of that event will be passed to your clickableTest function.
cursor
String
- By default (except for
type: "rotation"
), the cursor CSS property of the element is set to
move
so that when the mouse rolls over it, thereâs a visual cue indicating that itâs moveable, but you may define a different cursor if you prefer (as described at
https://devdocs.io/css/cursor
) like
cursor: "pointer"
.
dragClickables
Boolean
- By default, Draggable will work on pretty much any element, but sometimes you might want clicks on
,
,
,
, and
elements (as well as any element that has a
data-clickable="true"
attribute) NOT to trigger dragging so that the browserâs default behavior fires (like clicking on an input would give it focus and drop the cursor there to begin typing), so if you want Draggable to ignore those clicks and allow the default behavior instead, set
dragClickables: false
.
dragResistance
Number
- A number between 0 and 1 that controls the degree to which resistance is constantly applied to the element as it is dragged, where 1 wonât allow it to be dragged at all, 0.75 applies a lot of resistance (making the object travel at quarter-speed), and 0.5 would be half-speed, etc. This can even apply to rotation.
edgeResistance
Number
- A number between 0 and 1 that controls the degree to which resistance is applied to the element as it goes outside the bounds (if any are applied), where 1 wonât allow it to be dragged past the bounds at all, 0.75 applies a lot of resistance (making the object travel at quarter-speed beyond the border while dragging), and 0.5 would be half-speed beyond the border, etc. This can even apply to rotation.
force3D
Boolean
- By default, 3D transforms are used (when the browser supports them) in order to force the element onto its own layer on the GPU, thus speeding compositing. Typically this provides the best performance, but you can disable it by setting
force3D: false
. This may be a good idea if the element that youâre dragging contains child elements that are animating.
inertia
[
Boolean
|
Object
]
- InertiaPlugin is the key to getting the momentum-based motion after the usersâ mouse (or touch) is released. To have Draggable auto-apply an InertiaPlugin tween to the element when the mouse is released (or touch ends), you can set
inertia: true
(
inertia
also works). Or for advanced effects, you can define the actual inertia object that will get fed into tween, like
inertia: {top: {min: 0, max: 1000, end: [0,200,400,600]}}
. However, if you want ultimate control over the InertiaPlugin tween, you can simply use an
onDragEnd
to call your own function that creates the tween. If
inertia: true
is defined, you may also use any of the following configuration properties that apply to the movement after the mouse/touch is released...
View More details
snap
: [
Function
|
Object
|
Array
] - Allows you to define rules for where the element can land after it gets released. For example, maybe you want the rotation to always end at a 90-degree increment or you want the
x
and
y
values to be exactly on a grid (whichever cell is closest to the natural landing spot) or maybe you want it to land on a very specific value. You can define the snap in any of the following ways:
As a function
- This function will be passed one numeric parameter, the natural ending value. The function must return whatever the new ending value should be (you run whatever logic you want inside the function and spit back the value). For example, to make the value snap to the closest increment of 50, youâd do
snap: function(endValue) { return Math.round(endValue / 50) \* 50; }
.
As an Array
- If you use an array of values, InertiaPlugin will first plot the natural landing position and then loop through the array and find the closest number (as long as itâs not outside any bounds you defined). For example, to have it choose the closest number from 10, 50, 200, and 450, youâd do
snap: [10,50,200,450]
.
As an object
- If youâd like to use different logic for each property, like if
type
is
"x,y"
and youâd like to have the
x
part snap to one set of values, and the
y
part snap to a different set of values, you can use an object that has matching properties, like:
snap:{x: [5,20,80,400], y: [10,60,80,500]}
or if
type
is
"top,left"
and you want to use a different function for each, you could do something like
snap: {top: function(endValue) { return Math.round(endValue / 50) \* 50; }, left: function(endValue) { return Math.round(endValue / 100) \* 100; }}
. You can define a points property inside this object that combines both
x
and
y
, like
liveSnap: {points: [{x: 0, y: 0},{x: 100, y: 0}], radius: 20}
which will snap to any point in the array when itâs within 20px (distance). Or you can even use a function-based value to run your own snapping logic, like
liveSnap: {points: function(point) { //run custom logic and return a new point }}
. See the
snapping section
of this page for examples.
onThrowUpdate
:
Function
- A function that should be called each time the InertiaPlugin tween updates/renders (basically on each âtickâ of the engine while the tween is active). This only applies to the tween that gets generated after the user releases their mouse/touch - the function is not called while the user is dragging the element (thatâs what
onDrag
is for). By default, the scope of the
onThrowUpdate
is the Draggable instance itself, but you may define an
callbackScope
if you prefer, just like any other tween.
onThrowComplete
:
Function
- A function that should be called when the InertiaPlugin tween finishes. This only applies to the tween that gets generated after the user releases their mouse/touch - the function is not called immediately when the user releases their mouse/touch - thatâs what
onDragEnd
is for. By default, the scope of the
onThrowComplete
is the Draggable instance itself, but you may define an
callbackScope
if you prefer, just like any other tween.
throwResistance
:
Number
- A number (
1000
by default) that controls how much resistance or friction there is when the mouse/touch is released and momentum-based motion is enabled (by setting
inertia: true
). The larger the number, the more resistance and the quicker the motion decelerates. (requires InertiaPlugin and setting
inertia: true
, otherwise
throwResistance
will simply be ignored.)
maxDuration
:
Number
- The maximum duration (in seconds) that the kinetic-based inertia tween can last. InertiaPlugin will automatically analyze the velocity and bounds and determine an appropriate duration (faster movements would typically result in longer tweens to decelerate), but you can cap the duration by defining a
maxDuration
. The default is 10 seconds. This has nothing to do with the maximum amount of time that the user can drag the object - itâs only the inertia tween that results after they release the mouse/touch. (requires InertiaPlugin and setting
inertia: true
, otherwise
maxDuration
will simply be ignored.)
minDuration
:
Number
- The minimum duration (in seconds) that the kinetic-based inertia tween should last. InertiaPlugin will automatically analyze the velocity and bounds and determine an appropriate duration (faster movements would typically result in longer tweens to decelerate), but you can force the tween to take at least a certain amount of time by defining a
minDuration
. The default is 0.2 seconds. This has nothing to do with the minimum amount of time that the user can drag the object - itâs only the inertia tween that results after they release the mouse/touch. (requires InertiaPlugin and setting
inertia: true
, otherwise minDuration will simply be ignored.)
overshootTolerance
:
Number
- Affects how much overshooting is allowed before smoothly returning to the resting position at the end of the tween. This can happen when the initial velocity from the flick would normally cause it to exceed the bounds/min/max. The larger the
overshootTolerance
the more leeway the tween has to temporarily shoot past the max/min if necessary. The default is
1
. If you donât want to allow any overshooting, you can set it to
0
.
liveSnap
[
Function
|
Boolean
|
Array
|
Object
]
- Allows you to define rules that get applied
WHILE
the element is being dragged (whereas regular snap affects only the end value(s), where the element lands after the drag is released). For example, maybe you want the rotation to snap to 10-degree increments while dragging or you want the x and y values to snap to a grid (whichever cell is closest). You can define the
liveSnap
in any of the following ways:
View More details
As a function
- This function will be passed one numeric parameter, the natural (unaltered) value. The function must return whatever the new value should be (you run whatever logic you want inside your function and spit back the value). For example, to make the value snap to the closest increment of 50, youâd do
liveSnap: function(value) { return Math.round(value / 50) \* 50; }
.
As an array
- If you use an array of values, Draggable will loop through the array and find the closest number (as long as itâs not outside any bounds you defined). For example, to have it choose the closest number from 10, 50, 200, and 450, youâd do
liveSnap: [10,50,200,450]
.
As an object
- If youâd like to use different logic for each property, like if
type
is
"x,y"
and youâd like to have the âxâ part snap to one set of values, and the âyâ part snap to a different set of values, you can use an object that has matching properties, like:
liveSnap: {x: [5,20,80,400], y: [10,60,80,500]}
. Or if
type
is
"top,left"
and you want to use a different function for each, youâd do something like
liveSnap: {top: function(value) { return Math.round(value / 50) \* 50; }, left: function(value) { return Math.round(value / 100) \* 100; }}
. You can define a
points
property inside this object that combines both x and y, like
liveSnap: {points:[{x: 0, y: 0}, {x: 100, y: 0}], radius: 20}
which will snap to any point in the array when itâs within 20px (distance). Or you can even use a function-based value to run your own snapping logic, like
liveSnap: {points: function(point) { //run custom logic and return a new point }}
. See the
snapping section
of this page for examples.
As a boolean (
true
)
- Live snapping will use whatever is defined for the
snap
(so that instead of only applying to the end value(s), it will apply it âliveâ while dragging too).
lockAxis
Boolean
- If
true
, dragging more than 2 pixels in either direction (horizontally or vertically) will lock movement into that axis so that the element can only be dragged that direction (horizontally or vertically, whichever had the most initial movement) during that drag. No diagonal movement will be allowed. Obviously this is only applicable for Draggables with a
type
of
"x,y"
, or
"top,left"
. If you only want to allow vertical movement, you should set the
type
to
"y"
or
"top"
. If you only want to allow horizontal movement, you should set the
type
to
"x"
or
"left"
.
minimumMovement
Number
- By default, Draggable requires that the Draggable element moves more than 2 pixels in order to be interpreted as a drag, but you can change that threshold using
minimumMovement
. So
minimumMovement: 6
would require that the Draggable element moves more than 6 pixels to be interpreted as a drag.
onClick
Function
- A function that should be called only when the mouse/touch is pressed on the element and released without moving 3 pixels or more. This makes it easier to discern the userâs intent (click or drag). Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access its
pageX
,
pageY
,
target
,
currentTarget
, etc.
onClickParams
Array
- An optional array of parameters to feed the
onClick
callback. For example,
onClickParams: ["clicked", 5]
would work with this code:
onClick: function(message, num) { console.log("message: " + message + ", num: " + num); }
.
onDrag
Function
- A function that should be called every time the mouse (or touch) moves during the drag. Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access its
pageX
,
pageY
,
target
,
currentTarget
, etc. This is only called once per requestAnimationFrame.
onDragParams
Array
- An optional array of parameters to feed the
onDrag
callback. For example,
onDragParams: ["dragged", 5]
would work with this code:
onDrag: function(message, num) { console.log("message: " + message + ", num: " + num); }
.
onDragEnd
Function
- A function that should be called as soon as the mouse (or touch) is
released
after the drag. Even if nothing is moved, the
onDragEnd
will always fire, whereas the
onClick
callback only fires if the mouse/touch moves is less than 3 pixels. Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access
pageX
,
pageY
,
target
,
currentTarget
, etc.
onDragEndParams
Array
- An optional array of parameters to feed the
onDragEnd
callback. For example,
onDragEndParams: ["drag ended", 5]
would work with this code:
onDragEnd: function(message, num) { console.log("message: " + message + ", num: " + num); }
.
onDragStart
Function
- A function that should be called as soon as the mouse (or touch) moves more than 2 pixels, meaning that dragging has begun. Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access
pageX
,
pageY
,
target
,
currentTarget
, etc.
onDragStartParams
Array
- An optional array of parameters to feed the
onDragStart
callback. For example,
onDragStartParams: ["drag started", 5]
would work with this code:
onDragStart: function(message, num) { console.log("message: " + message + ", num: " + num); }
.
onLockAxis
Function
- A function that should be called as soon as movement is locked into the horizontal or vertical axis. This happens when
lockAxis
is
true
and the user drags enough for Draggable to determine which axis to lock. It also happens on touch-enabled devices when you have a Draggable whose type only permits it to drag along one axis (like
type: "x"
,
type: "y"
,
type: "left"
, or
type: "top"
) and the user touch-drags and Draggable determines the direction, either allowing native touch-scrolling or Draggable-induced dragging. Inside the function,
this
refers to the Draggable instance, making it easy to access the locked axis (
this.lockedAxis
which will either be
"x"
or
"y"
), or the target element (
this.target
), etc. By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access
pageX
,
pageY
,
target
,
currentTarget
, etc.
onMove
Function
- A function that should be called every time the mouse (or touch) moves during the drag. Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access its
pageX
,
pageY
,
target
,
currentTarget
, etc. This is different than
onDrag
in that it can fire multiple times per requestAnimationFrame. In general, it is better to use
onDrag
, but this is available if, for some reason, need to
.stopPropogation
or
.stopImmediatePropogation
on the drag event.
onPress
Function
- A function that should be called as soon as the mouse (or touch) presses down on the element. Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access
pageX
,
pageY
,
target
,
currentTarget
, etc.
onPressInit
Function
- A function that should be called before the starting values are recorded in the
onPress
, allowing you to make changes before any dragging occurs.
onPressInit
always fires BEFORE
onPress
.
See demo
.
onPressParams
Array
- An optional array of parameters to feed the
onPress
callback. For example,
onPressParams: ["drag started", 5]
would work with this code:
onPress: function(message, num) { console.log("message: " + message + ", num: " + num); }
.
onRelease
Function
- A function that should be called as soon as the mouse (or touch) is released after having been pressed on the target element, regardless of whether or not anything was dragged. Inside that function,
this
refers to the Draggable instance (unless you specifically set the scope using
callbackScope
), making it easy to access the target element (
this.target
) or the boundary coordinates (
this.maxX
,
this.minX
,
this.maxY
, and
this.minY
). By default, the
pointerEvent
(last mouse or touch event related to the Draggable) will be passed as the only parameter to the callback so that you can, for example, access
pageX
,
pageY
,
target
,
currentTarget
, etc.
onReleaseParams
Array
- An optional array of parameters to feed the
onRelease
callback. For example,
onReleaseParams: ["drag ended", 5]
would work with this code:
onRelease: function(message, num) { console.log("message: " + message + ", num: " + num); }
.
trigger
[
Element
|
String
|
Object
]
- If you want only a certain area to trigger the dragging (like the top bar of a window) instead of the entire element, you can define a child element as the trigger, like
trigger: yourElement
,
trigger: "#topBar"
, or
trigger: $("#yourID")
. You may define the trigger as an element or a selector string
type
String
- Indicates the type of dragging (the properties that the dragging should affect). Any of the following work: [
"x,y"
(basically the
translateX
and
translateY
of transform) |
"left,top"
|
"rotation"
|
"x"
|
"y"
|
"top"
|
"left"
]. The default is
"x,y"
.
zIndexBoost
Boolean
- By default, for vertical or horizontal dragging, when an element is pressed/touched, it has its
zIndex
set to a high value (
1000
by default) and that number gets incremented and applied to each new element that gets pressed/touched so that the stacking order looks correct (newly pressed objects rise to the top), but if you prefer to skip this behavior set
zIndexBoost: false
.
Note that if you're applying Draggable to a dynamically created element, that element should first be appended to the DOM before calling Draggable.create().
Previous
.applyBounds()
Next
.disable()
Contents
Returns : Array
Details
Config Object
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