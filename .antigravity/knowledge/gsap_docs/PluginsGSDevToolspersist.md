GSDevTools | GSAP | Docs & Learning
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
methods
GSDevTools.create()
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
GSDevTools
On this page
GSDevTools
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
GSDevTools
)
Minimal usage
GSDevTools
.
create
(
)
;
Description
â
GSDevTools gives you a
visual UI
for interacting with and debugging
GSAP
animations, complete with advanced playback controls, keyboard shortcuts, global synchronization and more. Jump to specific scenes, set in/out points, play in slow motion to reveal intricate details, and even switch to a "minimal" mode on small screens. GSDevTools makes building and reviewing GSAP animations simply delightful.
Get Started
â
Import GSDevTools through a script tag or import the plugin from the GSAP package
<
script
src
=
"
https://cdn.jsdelivr.net/npm/
[email protected]
/dist/GSDevTools.min.js
"
>
import
{
GSDevTools
}
from
"gsap/GSDevTools"
;
Create a GSDevTools instance
GSDevTools
.
create
(
)
;
That's it!
Though we suggest linking it to a particular animation instance because then GSDevTools doesn't need to worry all the global syncing of things. You can do that by setting the
animation
value of the dev tools instance:
var
tl
=
gsap
.
timeline
(
)
;
tl
.
to
(
...
)
;
// add your animations, etc.
// link it to this specific timeline:
GSDevTools
.
create
(
{
animation
:
tl
}
)
;
The demo below shows GSDevTools running with its default settings. It automatically gives you control over every animation on the global timeline.
loading...
Select an animation by id
â
Any GSAP animation (tween or timeline) can be assigned an
id
(a string) which causes it to show up in the animation menu. That makes it easy to jump to any scene. Notice how the timeline
and
each tween below have an
id
assigned:
//give the timeline and child tweens their own id.
var
tl
=
gsap
.
timeline
(
{
id
:
"timeline"
}
)
;
tl
.
to
(
".orange"
,
{
duration
:
1
,
x
:
700
,
id
:
"orange"
}
)
.
to
(
".green"
,
{
duration
:
2
,
x
:
700
,
ease
:
"bounce"
,
id
:
"green"
,
}
)
;
//give this tween an id
gsap
.
to
(
".grey"
,
{
duration
:
1
,
x
:
700
,
rotation
:
360
,
delay
:
3
,
id
:
"grey"
}
)
;
//instantiate GSDevTools with default settings
GSDevTools
.
create
(
)
;
Now each id shows up in the animations menu (lower left).
loading...
Persistence between refreshes
â
For added convenience, when you manually set the in/out points, animation,
timeScale
, or looping state in the UI, they persist between refreshes! This means you can drag the in/out points to isolate a particular section and then tweak the code, hit refresh, and see the changes immediately within that cropped area. Any values set in the
GSDevTools.create({...})
method will override manual selections. Set
persist: false
to disable persistence. If you encounter persistence contamination (e.g. setting
timeScale
in one affects another), simply assign a unique
id
to the GSDevTools instance (the recorded values are segregated by
id
, session, and domain).
Config Object
â
GSDevTools can be configured extensively. Optionally define any of these properties in the config object:
Property
Description
animation
[
String
|
Animation
] - If you define an animation, like
animation: myTimeline
,
animation: myTween
or
animation: "id"
, that animation will be initially selected. By default, the global timeline is selected.
container
[
String
|
Element
] - Specify the container element for GSDevTools, like:
"#devTools"
or
document.getElementById ("devTools")
.
css
[
Object
|
String
] - The CSS you want on the outer div, like
{width: "50%", bottom: "30px"}
or a string of CSS like
"width: 50%; bottom: 30px"
.
globalSync
Boolean - Animations can be kept in context and synchronized with the root timeline (scrubbing one scrubs them all). To enable this, set
globalSync: true
to hook it to the global timeline.
hideGlobalTimeline
Boolean - If
true
, the Global Timeline will be removed from the animation menu.
id
String - A unique string to identify the GSDevTools instance.
inTime
[
Number
|
String
] - Position of the in marker (time, in seconds, or label or animation
id
).
keyboard
Boolean - If
true
(the default), keyboard shortcuts will work. Note: Only one GSDevTools instance can listen for keyboard shortcuts.
loop
Boolean - Initial loop state.
minimal
Boolean - If
true
, the UI will only show minimal controls (scrubber, play/pause, and timeScale). Note: When the screen is less than 600px it automatically switches to minimal mode anyway.
outTime
[
Time
|
Label
] - Position of the out marker (time, in seconds, or label, or animation
id
).
paused
Boolean - Initial paused state.
persist
Boolean - By default, GSDevTools remembers the in and out points, selected animation, timeScale, and looping state between refreshes in the same domain session, but you can disable that behavior by setting
persist: false
.
timeScale
Number - Initial
timeScale
.
visibility
String -
"auto"
causes the controls to automatically hide when you roll off of them for about 1 second, and return when you move your mouse over the area again.
info
Keyboard Controls
â
SPACEBAR:
play/pause
UP/DOWN ARROWS:
increase/decrease timeScale
LEFT ARROW:
rewind
RIGHT ARROW:
jump to end
L:
toggle loop
I:
set the in point to current position of playhead
O:
set the out point to current position of playhead
H:
hide/show toggle
Tips and tricks
â
It is almost always best to define an animation directly like
GSDevTools.create({ animation: yourAnimation... });
so that it doesn't need to worry about mergine all the global animations in.
Clicking the GSAP logo (bottom right) gets you right to the
docs
!
Double-click on the in/out marker(s) to reset them both immediately.
If the playback UI is obscuring part of your animation, just tap the "H" key to hide it (and again to bring it back) - you can still use all the keyboard shortcuts even when it's invisible.
Advanced demos
â
We purposefully chose very basic animations for the demos above, but here's one that illustrates how easy GSDevTools makes it to control and debug even complex animation sequences.
loading...
warning
GSDevTools doesn't work with ScrollTrigger-driven animations because that would be logically impossible to have the scrollbar and the GSDevTools scrubber both control the same animation.
Methods
â
GSDevTools
.create
( config:Object ) : GSDevTools
FAQs
â
Why is my Global Timeline 1000 seconds long?
That means you've probably got an infinitely repeating animation somewhere. GSDevTools caps its duration at 1000 seconds. Scrubbing to Infinity is awkward.
How do I kill/destroy/remove the dev tools instance?
If you have a reference to the dev tools (it's probably easiest to give the dev tools instance an id, i.e.
GSDevTools
.
create
(
{
id
:
"main"
}
)
then you can kill the instance by using
GSDevTools
.
getById
(
"main"
)
.
kill
(
)
Does GSDevTools work with other animation libraries?
Nope, it depends on some unique capabilities baked into the GSAP architecture.
Previous
Easel
Next
GSDevTools.create()
Contents
Description
Get Started
Select an animation by id
Persistence between refreshes
Config Object
Keyboard Controls
Tips and tricks
Advanced demos
Methods
FAQs
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