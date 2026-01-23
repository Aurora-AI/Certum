static-fit | GSAP | Docs & Learning
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
Flip.fit()
On this page
Flip
.fit
Flip
.fit
( targetToResize:String | Element, destinationTargetOrState:String | Element | FlipState, vars:Object ) ;
Repositions/resizes one element so that it appears to fit exactly into the same area as another element. Using the
fitChild
special property, you can even scale/reposition an element so that one if its
child
elements is used for the fitting calculations instead! By default it alters the transforms (x, y, rotation, and skewX) as well as the width and height of the element, but if you set
scale: true
it will use scaleX and scaleY instead of width and height.
Parameters
targetToResize
: String | Element
The DOM element that should be resized/moved. Can be selector text like
".my-class"
or a reference to the Element itself.
destinationTargetOrState
: String | Element | FlipState
The DOM element or FlipState that should be fit into.
vars
: Object
The vars to use for the fit. This can contain standard tweening properties like
ease
,
duration
,
onComplete
, etc. as well as special settings like
absolute
,
fitChild
,
scale
, etc.
Details
â
Repositions/resizes one element so that it appears to fit exactly into the same
area as another element. Using the
fitChild
special property, you can even
scale/reposition an element so that one if its
child
elements is used for the
fitting calculations instead! By default it alters the transforms (x, y,
rotation, and skewX) as well as the width and height of the element, but if you
set
scale: true
it will use scaleX and scaleY instead of width and height.
Fitting will occur instantly unless you set a
duration
in the
vars
object in
which case it will return a
gsap.to()
tween. In
fact, you can define almost any standard GSAP tween property there like
onComplete
,
delay
,
ease
, etc. For example:
// fit ".box1" into the same area in the viewport as ".box2" immediately:
Flip
.
fit
(
'.box1'
,
'.box2'
)
;
// or animate there instead:
Flip
.
fit
(
'.box1'
,
'.box2'
,
{
duration
:
1
,
ease
:
'power1.inOut'
,
onComplete
:
(
)
=>
console
.
log
(
'done!'
)
}
)
;
You can even use a previously-recorded state object from
Flip.getState()
as the destination
so that the target fits into the same position/size it was at that time!
// capture state
const
state
=
Flip
.
getState
(
box1Element
)
;
// change state, like we'll put it into a different container:
newParent
.
appendChild
(
box1Element
)
;
// now fit it into where it was previously:
Flip
.
fit
(
box1Element
,
state
)
;
How cool is that?
The
vars
object (3rd parameter) can define any of the following [optional]
configuration properties
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
Boolean - if
true
, the target will have its
position
CSS property set to
absolute
. This can solve layout challenges with flex and grid layouts, for example.
fitChild
String | Element - to scale the element so that one of its
child
elements fits instead, define that child like
fitChild: ".child-class"
(or reference the child Element itself).
loading...
getVars
Boolean - if
true
, no fitting will occur, but only a vars object will be returned that contains the necessary information for the proper fitting so that it could be passed, for example, to a tween or used separately. For example, if you just want to figure out what the x, y, scaleX, scaleY, rotation, and skewX would be to properly fit, you could do:
let vars = Flip.fit(".box1", ".box2", {scale: true, getVars: true});
props
String - A comma delimited list of CSS properties (beyond the the standard ones that control position, dimensions, rotation, and skew) that should be changed to match the target's. For example,
"backgroundColor,color"
scale
Boolean - by default, Flip.fit() will affect the
width
and
height
CSS properties to alter the size, but if you'd rather scale the element instead (typically better performance), set
scale: true
. The only exception to this behavior is if you define a
fitChild
in which case it will
always
behave as if
scale: true
was defined (even if you omit it).
simple
Boolean - if
true
, Flip will skip the extra calculations that would be necessary to accommodate rotation/scale/skew in determining positions. It's like telling Flip
"I promise that there aren't any rotated/scaled/skewed containers for the Flipping elements"
which makes things
faster
. In most cases, the performance difference isn't noticeable, but if you're fitting a
lot
of elements it can help keep things snappy.
Previous
Flip.batch()
Next
Flip.from()
Contents
Details
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