selector | GSAP | Docs & Learning
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
Useful features & tools
Utility Methods
checkPrefix
clamp
distribute
getUnit
interpolate
mapRange
normalize
pipe
random
selector
shuffle
snap
splitColor
toArray
unitize
wrap
wrapYoyo
Staggers
Helper functions
React - useGSAP()
llms.txt
Utility Methods
selector
On this page
selector
Returns : Function
â
Returns a
selector function
that's scoped to a particular Element, meaning it'll only find
descendants
of that Element.
This is great for components because you can create a scoped selector for that component's main container element and then use that to select descendants. It's similar to calling
.querySelectorAll()
on that element â rather than on the document â except with a few added benefits:
It returns an
Array
rather than a
NodeList
, so you get access to convenient array methods like
.filter()
and
.map()
.
You can pass a
React ref
or
Angular ElementRef
to
gsap.utils.selector()
. Then when you use the resulting function, it will automatically check for the
.current
/
.nativeElement
in case it was re-rendered since creation.
// Vanilla
let
q
=
gsap
.
utils
.
selector
(
myElement
)
;
// or use selector text like ".class"
let
boxes
=
q
(
".box"
)
;
// finds only elements with the class "box" that are INSIDE myElement
// or plug directly into animations
gsap
.
to
(
q
(
".circle"
)
,
{
x
:
100
}
)
;
// React
let
el
=
useRef
(
)
;
let
q
=
gsap
.
utils
.
selector
(
el
)
;
useEffect
(
(
)
=>
{
// uses el.current.querySelectorAll() internally
gsap
.
to
(
q
(
".box"
)
,
{
x
:
100
}
)
;
}
,
[
]
)
;
// Angular
@
Component
(
{
...
}
)
class
MyComponent
implements
OnInit
{
constructor
(
private
el
:
ElementRef
)
{
this
.
q
=
gsap
.
utils
.
selector
(
el
)
;
}
ngOnInit
(
)
{
// uses this.el.nativeElement.querySelectorAll() internally
gsap
.
to
(
this
.
q
(
".box"
)
,
{
x
:
100
}
)
;
}
}
// Vue
{
mounted
(
)
{
this
.
$nextTick
(
(
)
=>
this
.
animate
(
)
)
;
}
,
methods
:
{
animate
(
)
{
let
q
=
gsap
.
utils
.
selector
(
this
.
$el
)
;
// uses this.$el.querySelectorAll() internally
gsap
.
to
(
q
(
".box"
)
,
{
x
:
100
}
)
;
}
}
}
A common pattern in React is to declare a ref for every element you want to animate, but that can make your code very verbose and hard to read.
loading...
By using a scoped selector, we only need to use a
single
ref. Then we can simply select the descendants.
loading...
Why not just use document.querySelectorAll(".class")?
â
Let's say you build a component that ends up rendering on a page like:
<
div
class
=
"my-component"
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
/
div
>
And then you use that component 3 times on a page...
<
my
-
component
>
<
my
-
component
>
<
my
-
component
>
Which then renders like:
<
div
class
=
"my-component"
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
/
div
>
<
div
class
=
"my-component"
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
/
div
>
<
div
class
=
"my-component"
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
div
class
=
"box"
>
<
/
div
>
<
/
div
>
Now think about what would happen if you wrote an animation like this so that when you click on an individual component, it animates its boxes:
myComponent
.
addEventListener
(
"click"
,
(
)
=>
gsap
.
to
(
".my-component .box"
,
{
x
:
100
,
stagger
:
0.1
}
)
)
;
That would end up making
ALL
the boxes on the entire page animate instead of just the ones inside that component. See the issue? We need a way to scope it to just the one component. Of course you could do
myComponentRef.current.querySelectorAll(".box")
as your tween's target but it just seems cleaner to have a selector() that's already scoped and you can just reuse that over and over again to select things by class name (but only in that component).
Parameters
â
scope
: [Element | String | Object] (optional) - The Element (or selector text or React Ref or Angular ElementRef) to which the selector text scope should be limited, like calling
scopeElement.querySelectorAll([selector-text])
rather than
document.querySelectorAll()
. In other words, it will only return
descendant
Elements of the scope Element. Remember,
gsap.utils.selector()
returns a reusable
selector function
, not the results of the selection.
Previous
random
Next
shuffle
Contents
Returns : Function
Why not just use document.querySelectorAll(".class")?
Parameters
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