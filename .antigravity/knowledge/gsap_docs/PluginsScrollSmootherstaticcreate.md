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
methods
ScrollSmoother.create()
On this page
ScrollSmoother
.create
ScrollSmoother
.create
( ) ;
Details
â
Creates (and returns) a new ScrollSmoother instance. There can only be one, of course, at any given time because it's controlling the scroll of the root page. If a ScrollSmoother instance already exists, its
kill()
method will be called before creating the new one in the
ScrollSmoother.create()
call. If you want to get a reference to the ScrollSmoother that was already created, use the
ScrollSmoother.get()
method.
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
div id
=
"smooth-wrapper"
>
<
div id
=
"smooth-content"
>
<
!
--
-
ALL
YOUR
CONTENT
HERE
--
-
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
/
body
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
Usage & special properties
â
The configuration object can have any of the following optional properties:
Speed (parallax)
â
When you set
effects: true
, ScrollSmoother finds all elements that have a
data-speed
attribute and applies a parallax effect accordingly so that they move at the designated speed. For example:
<
div data
-
speed
=
"0.5"
>
<
/
div
>
<
!
--
half
-
speed
of
scroll
--
>
<
div data
-
speed
=
"2"
>
<
/
div
>
<
!
--
double
-
speed
of
scroll
--
>
<
div data
-
speed
=
"1"
>
<
/
div
>
<
!
--
normal speed
of
scroll
--
>
<
div data
-
speed
=
"auto"
>
<
/
div
>
<
!
--
auto
-
calculated based on how far it can move inside its container
--
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
div data
-
speed
=
"clamp(0.5)"
>
<
/
div
>
<
!
--
clamped half
-
speed
--
>
Walkthrough
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
div data
-
lag
=
"0.5"
>
<
/
div
>
<
!
--
takes
0.5
seconds to
"catch up"
--
>
<
div data
-
lag
=
"0.8"
>
<
/
div
>
<
!
--
takes
0.8
seconds to
"catch up"
--
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
Previous
.smooth()
Next
ScrollSmoother.get()
Contents
Details
Setup
Usage & special properties
Speed (parallax)
"auto" speed
clamp() speed effects
Lag (the delightful kind)
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