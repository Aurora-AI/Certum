static-from | GSAP | Docs & Learning
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
methods
Flip.batch()
Flip.fit()
Flip.from()
Flip.getState()
Flip.isFlipping()
Flip.killFlipsOf()
Flip.makeAbsolute()
Flip.to()
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
Flip
methods
Flip.from()
On this page
Flip
.from
Flip
.from
( state:FlipState, vars:Object ) : Timeline
Immediately moves/resizes the targets to match the provided
state
object, and then animates backwards to remove those offsets to end up at the current state. By default,
width
and
height
properties are used for the resizing, but you can set
scale: true
to scale instead (transform). It returns a timeline animation, so you can control it or add() other animations.
Parameters
state
: FlipState
A state obtained from
Flip.getState()
.
vars
: Object
The vars to use for the from animation. You can use any standard tween special property like
ease
,
duration
,
onComplete
, etc.
Returns : Timeline
â
A
timeline
animation
Details
â
Immediately moves/resizes the targets to match the provided
state
object, and then animates backwards to remove those offsets to end up at the current state. By default,
width
and
height
properties are used for the resizing, but you can set
scale: true
to scale instead (transform). It returns a timeline animation, so you can control it or add() other animations.
Detailed walkthrough
Usage
â
There are typically 3 steps to a "FLIP" animation:
Get the current state
â
// returns a state object containing data about the elements' current position/size/rotation in the viewport
const
state
=
Flip
.
getState
(
".targets"
)
;
This merely captures some data about the current state. Use selector text, an Element, an Array of Elements, or NodeList.
Flip.getState()
doesn't alter anything (unless there's an active flip animation affecting any of the targets in which case it will force it to completion to capture the final state accurately). By default, Flip only concerns itself with position, size, rotation, and skew. If you want your Flip animations to affect other CSS properties, you can define a configuration object with a comma-delimited list of
props
, like:
// record some extra properties (optional)
const
state
=
Flip
.
getState
(
".targets"
,
{
props
:
"backgroundColor,color"
}
)
;
Make your state changes
â
Perform DOM edits, styling updates, add/remove classes, or whatever is necessary to get things in their final state. There's no need to do that through the plugin (unless you're
batching
). For example, we'll toggle a class:
// make state changes. We'll toggle a class, for example:
element
.
classList
.
toggle
(
"full-screen"
)
;
Call
Flip.from(state, options)
â
Flip will look at the
state
object, compare the recorded positions/sizes to the current ones, immediately reposition/resize them to
appear
where they were in that previous state, and then animate the
removal
of those offsets. You can specify almost any standard tween special properties like
duration
,
ease
,
onComplete
, etc.
Flip.from()
returns a timeline that you can
add()
things to or control in any way:
// animate from the previous state to the current one:
Flip
.
from
(
state
,
{
duration
:
1
,
ease
:
"power1.inOut"
,
absolute
:
true
,
onComplete
:
myFunc
,
}
)
;
You can flip multiple elements at the same time. In fact, you can add a
stagger
to stagger their start times.
Special properties
â
The
Flip.from()
options object (2nd parameter) can contain any of the following optional properties
in addition to any standard tween properties like
duration
,
ease
,
onComplete
, etc.
which are described
elsewhere
:
Property
Description
absolute
Boolean | String | Array | NodeList | Element
- specifies which of the targets should have
position: absolute
applied during the course of the FLIP animation.
If
true
,
all
of the targets are affected, or use selector text like
".box"
(or an Array/NodeList of Elements, or even a single Element) to specify a subset of the targets.
This can solve layout challenges with flex and grid layouts, for example. If things aren't behaving in a seamless way, try setting
absolute: true
. Beware, that
position: absolute
removes the elements from document flow,
so things below can collapse. In that case, just define a subset that doesn't include the container element so it props the layout open.
(added in 3.9.0)
absoluteOnLeave
Boolean
- if
true
, any "leaving" Elements (ones passed to the
onLeave()
) will be set to
position: absolute
during the flip animation.
This can be very useful when you set elements to
display: none
to hide them in the final state, but you want to animate them out (fade, scale, whatever).
It's critical that they not affect layout but you still want them visible during the animation.
(added in 3.9.0)
fade
Boolean
- by default, if the target element associated with a particular
data-flip-id
in the previous state is a
different element
than the one with the same
data-flip-id
in the end state,
it will get swapped immediately but if you'd prefer that they cross-fade, set
fade: true
. Again, this only applies when swapping elements.
If the "swapping out" (leaving) element is
display: none
(CSS), obviously it won't be visible for fading but if you set the Flip to
absolute: true
,
it will force the element to the previous display state
during
the flip so that it can cross-fade. The reason
absolute: true
is necessary in this case is because
otherwise the element would affect document flow and throw off the positioning of other elements but if it is
position: absolute
(CSS), it's removed from the document flow and won't contaminate positioning.
nested
Boolean
- if the Flip has any
nested
targets (like a parent and its child are both in the
targets
), set
nested: true
to have Flip perform extra calculations to prevent those movements from compounding.
A parent's movement affects its children, so if both are mapped to end up 200px from their original position and Flip moves them both 200px, the child would end up moving 400px unless
nested: true
is set.
onEnter
Function
- A callback that's called if/when a target either isn't found in the original
state
or it was not in the document flow in that original state (like
display: none
),
but it
IS
in the document flow in the
end
state. Since there is no position/size data to compare to in the original state,
it won't be included in the flip animation, but the callback receives an Array of the entering elements as a parameter so that you can animate them as you please (like fade them in). A
ny animation returned by this callback will get added to the flip timeline so that it gets forced to completion if a competing flip interrupts it.
For example:
onEnter
:
elements
=>
gsap
.
fromTo
(
elements
,
{
opacity
:
0
}
,
{
opacity
:
1
}
)
onLeave
Function
- A callback that's called if/when a target is in the original
state
but not the end state, or if it isn't in the document flow in the end state (like
display: none
).
Since there is no position/size data to compare to in the end state, it won't be included in the flip animation, but the callback receives an Array of the leaving elements as a parameter so that you can animate them as you please (like fade them out).
these elements won't be visible unless you also set
absolute: true
(otherwise, it'd throw off document flow). If
absolute: true
is set, it will force
display
to whatever it was in the previous state and
then revert it back at the end of the flip. Any animation returned by this callback will get added to the flip timeline so that it gets forced to completion if a competing flip interrupts it.
For example:
onLeave
:
elements
=>
gsap
.
fromTo
(
elements
,
{
opacity
:
1
}
,
{
opacity
:
0
}
)
props
String
- a comma-delimited list of
camelCased
CSS properties that should be included in the flip animation beyond the standard positioning/size/rotation/skew ones. For example,
"backgroundColor,color"
.
This will only work, however, if the props exist in the
state
object (first parameter) because otherwise there's no corresponding data to pull from. By default,
Flip will use the
props
that were captured in the state with
Flip.getState(targets, props)
, so it's very rare that you'd need to define
props
in
Flip.from()
.
It's only useful if you want to
LIMIT
them to a subset of the ones captured in the state.
prune
Boolean
- if
true
, Flip will remove any targets from the animation that match the previous state (position/size) in order to conserve resources.
This requires a little more processing up-front, but it may improve performance during the animation when several get removed,
plus it also makes staggering more intuitive since you may not want non-animating targets to be factored into the staggering.
(added in 3.9.0)
|
scale
Boolean
- by default, Flip will affect the
width
and
height
CSS properties to alter the size, but if you'd rather scale the element instead (typically better performance), set
scale: true
. | |
simple
Boolean
- if
true
, Flip will skip the extra calculations that would be necessary to accommodate rotation/scale/skew in determining positions.
It's like telling Flip
"I promise that there aren't any rotated/scaled/skewed containers for the Flipping elements"
which makes things
faster
.
In most cases, the performance difference isn't noticeable, but if you're flipping a lot of elements it can help keep things snappy. |
| |
spin
Boolean | Number | Function
- if
true
, the elements will spin an extra 360 degrees during the flip animation which makes it look a little more fun.
Or you can define a
number
of full rotations, including a negative number, so
-1
would spin in the opposite direction once. If you provide a
function
,
it will be called once for each target so that you can return whatever value you'd like for each individual element's spin. This allows you to,
for example, have certain targets spin one direction, other elements spin another direction, or return 0 to not spin at all.
Sample code:
Flip
.
from
(
state
,
{
spin
:
(
index
,
target
)
=>
{
if
(
target
.
classList
.
contains
(
"clockwise"
)
)
{
return
1
;
}
else
if
(
target
.
classList
.
contains
(
"counter-clockwise"
)
)
{
return
-
1
;
}
else
{
return
0
;
}
}
}
)
;
targets
String | Element | Array | NodeList
- by default, Flip will use the targets from the
state
object (first parameter),
but you can specify a subset of those as either selector text (
".class, #id"
), an Element, an Array of Elements, or a NodeList.
If any of the targets provided is NOT found in the
state
object, it will be passed to the
onEnter
and
not
included in the flip animation because there's no previous state from which to pull position/size data. |
toggleClass
String
- adds a CSS class to the targets while the flip animation is in progress. For example
"flipping"
. |
|
zIndex
Number
- immediately sets the zIndex CSS property to this value for the entire course of the flip animation and then reverts at the end.
This makes it easy to ensure that your flipping elements are on top of other elements during the animation, for example. | |
Simple example
â
loading...
Flex example
â
loading...
How do I flip between two
different
elements?
â
Flip looks for a
data-flip-id
attribute on every element it interacts with (via
Flip.getState()
or
Flip.from()
, etc.) and if one isn't found, Flip assigns an incremented one automatically ("auto-1", "auto-2", etc.). It lets you correlate targets (the target with the
data-flip-id
of
"5"
in the "from" state gets matched up with the target with a
data-flip-id
of
"5"
in the end state). The
data-flip-id
can be any string, not just a number.
So if you want to flip between two different targets, make sure the data-flip-id attribute in the end state matches the one in the "from" state. When Flip sees that there are two with the same value in the from/end state, it will automatically figure out which one is disappearing (typically with
display: none
) and base things off of that to "swap" the elements. If you want them to crossfade, simply set
fade: true
, otherwise they'll immediately swap. And it is typically best to set
absolute: true
so that when Flip alters the
display
value, it doesn't affect the document flow.
loading...
Previous
Flip.fit()
Next
Flip.getState()
Contents
Returns : Timeline
Details
Usage
Get the current state
Make your state changes
Call
Flip.from(state, options)
Special properties
Simple example
Flex example
How do I flip between two
different
elements?
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