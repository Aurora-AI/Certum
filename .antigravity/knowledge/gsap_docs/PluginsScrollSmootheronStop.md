ScrollSmoother | GSAP | Docs & Learning
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
properties
.progress
.scrollTrigger
.vars
methods
.content()
.effects()
.getVelocity()
.kill()
.offset()
.paused()
.scrollTo()
.scrollTop()
.smooth()
ScrollSmoother.create()
ScrollSmoother.get()
.wrapper()
SplitText
Flip
more plugins
Useful features & tools
Utility Methods
Staggers
Helper functions
React - useGSAP()
llms.txt
ScrollSmoother
On this page
added in v
3.10.0
ScrollSmoother
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
ScrollSmoother
)
Minimal usage
ScrollSmoother
.
create
(
{
smooth
:
1
,
effects
:
true
}
)
;
ScrollSmoother adds a vertical smooth-scrolling effect to a ScrollTrigger-based page. Unlike most smooth-scrolling libraries, ScrollSmoother leverages
NATIVE
scrolling - it doesn't add "fake" scrollbars nor does it mess with touch/pointer functionality. That means it doesn't suffer from many of the accessibility annoyances common with smooth-scrolling sites.
Detailed walkthrough
Highlights
Feature Highlights
â
Uses the browser's
native scroll
; no "fake" scrollbars.
Add a
parallax effect
by defining a
data-speed
attribute on any element, like
data-speed="0.5"
would make that element "scroll" at half-speed while it's in the viewport. It arrives at its normal position in the document flow when it's
centered
vertically.
Put a larger image/element inside a container that has
overflow: hidden
and then set the child's
data-speed="auto"
and it'll automatically calculate exactly how far it can move inside that container (parallax).
Make an element appear to
lag behind
, taking a certain amount of time to "catch up" to the smoothed scroll position. It's a really fun effect! Simply define a
data-lag
attribute, like
data-lag="0.5"
would take 0.5 seconds to "catch up".
read more...
ScrollSmoother is
seamlessly integrated
with
ScrollTrigger
and GSAP for mega-robust animation capabilities.
Set
paused(true)
to completely halt scrolling (users can't even drag the scrollbar) - great for modals.
The
normalizeScroll: true
feature prevents [most] mobile browser address bars from hiding/showing (resizing the viewport), stops overscroll behavior, and solves multi-thread synchronization challenges!
A side benefit of using ScrollSmoother is that it avoids issues caused by browser multi-threading, like the small jump that sometimes happens when pinning/unpinning, or the occasional "jitter" of a pinned element in certain rare scenarios. You can even set
normalizeScroll: true
to avoid common problems like the hiding/showing of the address bar on mobile browsers, plus it'll work around iOS Safari bugs that occasionally cause jitter. See
ScrollTrigger.normalizeScroll()
for details.
Setup
â
Your HTML content should reside in a single
content
element (usually a

but it doesn't really matter) - that's what gets moved around when the user scrolls. That
content
element is wrapped in a
wrapper
element that serves as the viewport. The actual scrollbar remains on the
, so your setup would look like:
<
body
>
<
div
id
=
"
smooth-wrapper
"
>
<
div
id
=
"
smooth-content
"
>



Under the hood, everything flows through
ScrollTrigger
which watches the page's native scroll position and then ScrollSmoother applies transforms to the
content
to gradually catch up with that scroll position. So if you suddenly drag the native scrollbar 500px, ScrollSmoother will gradually move the content to that spot using inline CSS transforms (
matrix3d()
) on the
content
. Since ScrollSmoother is built on top of ScrollTrigger, don't forget to register them both:
gsap
.
registerPlugin
(
ScrollTrigger
,
ScrollSmoother
)
;
Example
â
// create the scrollSmoother before your scrollTriggers
ScrollSmoother
.
create
(
{
smooth
:
1
,
// how long (in seconds) it takes to "catch up" to the native scroll position
effects
:
true
,
// looks for data-speed and data-lag attributes on elements
smoothTouch
:
0.1
// much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
}
)
;
loading...
Config Object
â
The configuration object can have any of the following optional properties:
Property
Description
content
Element | String
- the element containing all of your HTML content. This one
content
element is what gets moved around when scrolling. By default, it will automatically find the element with an id of "smooth-content", so if you're following that convention there's no need to even define
content
. The HTML structure would look like this:
<
div
id
=
"
smooth-wrapper
"
>
<
div
id
=
"
smooth-content
"
>



ease
String | Function
- the easing function to be used for smooth scrolling (defaults to "expo").
effects
boolean | String | Array
- if
true
, ScrollSmoother will find all elements that have a
data-speed
and/or
data-lag
attribute and apply those effects accordingly so that they move at the designated speed or delay, so
data-speed="0.5"
would scroll at half the normal speed, and
data-speed="2"
would scroll at twice the normal speed.
data-lag="0.8"
would take 0.8 seconds to "catch up" to the smoothed scroll position. You can also use selector text or an Array of elements, so
effects: ".box"
would only look for the attributes on elements with the ".box" class. You can use the
effects()
method to apply effects directly via JavaScript instead. See that method's docs for more details about how effects work.
Note: effects should not be nested.
effectsPadding
Number
- Normally effects applied to a particular element begin as soon as the natural position of the element enters the viewport and then end when the natural position leaves the viewport, but in some rare cases you may want to expand that, so you can pass a number (in pixels) as the
effectsPadding
.
Added in 3.11.4
effectsPrefix
String
- perhaps you're already using
data-speed
and/or
data-lag
for other purposes and you'd like to use a custom prefix for effects data attributes like
effectsPrefix: "scroll-"
would resolve to
data-scroll-speed
and
data-scroll-lag
.
Added in 3.10.5
ignoreMobileResize
Boolean
- if
true
, vertical resizes (of 25% of the viewport height) on touch-only devices won't trigger a
ScrollTrigger.refresh()
, avoiding the jumps that can happen when the start/end values are recalculated. Beware that if you skip the refresh(), the start/end trigger positions may be inaccurate but in many scenarios that's preferable to the visual jumps that occur due to the new start/end positions.
onFocusIn
Function
- a function to call when a new element receives focus and you can return
false
if you want ScrollSmoother to skip ensuring that the element is in the viewport (overriding that default behavior).
onStop
Function
- a function to call when the smoothed scroll comes to a stop (catches up to the native scroll position).
onUpdate
Function
- a function to call after each time the SmoothScroller updates the position of the content.
normalizeScroll
boolean
- if
true
, it forces scrolling to be done on the JavaScript thread, ensuring it is synchronized and the address bar doesn't show/hide on mobile devices. This is the same as calling
ScrollTrigger.normalizeScroll()
except that it
debounces
because smooth scrolling makes that possible.
smooth
Number
- the time (in seconds) that it takes to "catch up" to the native scroll position. By default, it is 0.8 seconds.
smoothTouch
Boolean | Number
- by default, ScrollSmoother will
NOT
apply scroll smoothing on touch-only devices (like phones) because that typically feels odd to users when it disconnects from their finger's drag position, but you can force smoothing on touch devices too by setting
smoothTouch: true
(same as
smooth
value) or specify an amount like
smoothTouch: 0.1
(in seconds).
speed
Number
- a multiplier for overall scroll speed, so
2
would make it scroll twice the normal speed, and
0.5
would make it scroll at half-speed.
added in version 3.11.4
.
wrapper
Element | String
- the outer-most element that serves as the viewport. Its only child should be the
content
element which is what gets moved around when scrolling. By default, it will automatically find the element with an id of "smooth-wrapper", so if you're following that convention there's no need to even define
wrapper
. If it cannot find a wrapper, one will automatically be created. You can use selector text like
"#elementID"
or reference the element itself.
Speed (parallax)
â
When you set
effects: true
, ScrollSmoother finds all elements that have a
data-speed
attribute and applies a parallax effect accordingly so that they move at the designated speed. For example:
<
div
data-speed
=
"
0.5
"
>

<
div
data-speed
=
"
2
"
>

<
div
data-speed
=
"
1
"
>

<
div
data-speed
=
"
auto
"
>

"auto" speed
â
When you set the speed to
"auto"
, it will calculate how far it can move inside its
parent container
in the direction of the largest gap (up or down). So it's perfect for parallax effects - just make the child larger than its parent, align it where you want it (typically its top edge at the top of the container, or the bottom edge at the bottom of the container) and let ScrollSmoother do its magic. Obviously set
overflow: hidden
on the parent so it clips the child.
clamp() speed effects
â
Have you ever had an element that you natively placed toward the very top of your page but when you apply a
data-speed
, it starts out shifted from its native position? That's because by default, speed effects cause elements to reach their "native" position when
centered vertically
in the viewport, so they'll likely start out offset. Starting in version 3.12, you can wrap your speed value in
"clamp()"
to make them start out in their native position if they're "above the fold" (inside the viewport when scrolled to the very top). Under the hood,
data-speed
effects are driven by ScrollTrigger instances, so this a way to employ ScrollTrigger's clamp() feature that prevents the start/end values from "leaking" outside the page bounds (never less than 0 and never more than the maximum scroll position). For example:
<
div
data-speed
=
"
clamp(0.5)
"
>

Feature Walkthrough
You can also use the
effects()
method to dynamically apply speed or lag effects to targets (including function-based ones).
Note: effects
should not be nested
.
let
scroller
=
ScrollSmoother
.
create
(
{
...
}
)
;
scroller
.
effects
(
".box"
,
{
speed
:
0.5
,
lag
:
0.1
}
)
;
Keep in mind that the elements will hit their "natural" position in the
CENTER
of the viewport. Here's a visual demo from
@snorkltv
:
loading...
Lag (the delightful kind)
â
Think of a "lag" like making the element lazy, allowing it to drift from its normal scroll position, taking a certain amount of time to "catch up". You can assign slightly different lags to elements in close proximity to give them a staggered effect when scrolling that's quite pleasing to the eye. If you set
effects: true
on the ScrollSmoother.create() config, it'll automatically find any elements with the
data-lag
attribute and apply that effect:
<
div
data-lag
=
"
0.5
"
>

<
div
data-lag
=
"
0.8
"
>

You can also use the
effects()
method to dynamically apply speed or lag effects to targets (including function-based ones) via JavaScript.
let
scroller
=
ScrollSmoother
.
create
(
{
...
}
)
;
scroller
.
effects
(
".box"
,
{
lag
:
0.5
,
speed
:
1
}
)
;
Caveats
â
warning
\*\*
position: fixed
should be outside the wrapper \*\*- since the
content
has a CSS
transform
applied, browsers create a new containing block and that means
position: fixed
elements will be fixed to the
content
rather than the viewport. That's not a bug - it's just how CSS/browsers work. You can use ScrollTrigger pinning instead or you could put any
position: fixed
elements OUTSIDE the
wrapper
/
content
.
normalizeScroll: true
doesn't prevent the address bar from hiding/showing on iOS phones in portrait orientation
- the latest Apple iOS makes it impossible to prevent that (at least from what we can tell). Even though
event.preventDefault()
is called on all scroll-related events, the browser
still
imposes that behavior. If that causes a jump due to the window resizing and making your ScrollTriggers recalculate their start/end positions, you could
ScrollTrigger.config({ ignoreMobileResize: true });
Properties
â
.progress
: Number
The progress value of the overall page scroll where 0 is at the very top and 1 is at the very bottom and 0.5 is halfway scrolled. This value will animate during the smooth scrolling and end when the
onStop
fires.
.scrollTrigger
: ScrollTrigger
The ScrollTrigger instance that ScrollSmoother created internally to manage the smooth scrolling effect of the page.
.vars
: Object
The configuration object passed into the
ScrollSmoother.create()
initially.
Methods
â
.content
( element:String | Element ) : Element | self
Gets/Sets the content element.
.effects
( targets:String | Element | Array, config:Object | null ) : Array
Adds parallax elements that should be managed by the ScrollSmoother
.getVelocity
( ) : Number
Returns the current velocity of the smoothed scroll in pixels-per-second
.kill
( ) ;
Kills the entire ScrollSmoother as well as any effects that were applied.
.offset
( target:String | Element, position:String ) : Number
Calculates the numeric offset (scroll position in pixels) that corresponds to when a particular element reaches the specified position like:
.paused
( pause:Boolean ) : Boolean | self
Gets/Sets the paused state - if
true
, nothing will scroll (except via
scrollTop()
or
scrollTo()
on this instance).
.scrollTo
( target:Number | String | Element, smooth:Boolean, position:String ) ;
Scrolls to a particular position or element
.scrollTop
( position:Number ) : Number | void
Immediately gets/sets the scroll position (in pixels).
.smooth
( duration:Number ) : Number | self
Gets/Sets the number of seconds it takes to catch up to the scroll position (smoothing).
ScrollSmoother
.create
( ) ;
ScrollSmoother
.get
( ) : ScrollSmoother
Returns the ScrollSmoother instance (if one has been created). There can only be one instance at any given time.
.wrapper
( element:String | Element ) : Element | self
Gets/Sets the wrapper element.
Demos
â
Check out the full collection of
Scroll animation demos
on CodePen.
Previous
ScrollTrigger.update()
Next
.progress
Contents
Feature Highlights
Setup
Example
Config Object
Speed (parallax)
"auto" speed
clamp() speed effects
Lag (the delightful kind)
Caveats
Properties
Methods
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