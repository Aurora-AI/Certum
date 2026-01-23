CustomWiggle | GSAP | Docs & Learning
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
CustomBounce
CustomEase
CustomWiggle
ExpoScaleEase
RoughEase
SlowMo
SteppedEase
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
Easing
CustomWiggle
On this page
CustomWiggle
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
CustomEase
,
CustomWiggle
)
Minimal usage
//Create a wiggle with 6 oscillations (default type:"easeOut")
CustomWiggle
.
create
(
"myWiggle"
,
{
wiggles
:
6
}
)
;
//now use it in an ease. "rotation" will wiggle to 30 and back just as much in the opposite direction, ending where it began.
gsap
.
to
(
".class"
,
{
duration
:
2
,
rotation
:
30
,
ease
:
"myWiggle"
}
)
;
Description
â
CustomWiggle extends
CustomEase
(which you must include in your project as well), and it lets you set a wiggle amount and type.
Ease walkthrough
Demo
â
CustomWiggle Types
loading...
Config Object
â
Property
Description
wiggles
Integer
- The number of oscillations back and forth. Default: 10.
type
String
(âeaseOutâ | âeaseInOutâ | âanticipateâ | âuniformâ | ârandomâ) - The type (or style) of wiggle (see demo above). Default: âeaseOutâ.
amplitudeEase
Ease
Provides advanced control over the shape of the amplitude (y-axis in the
ease visualizer
). You define an ease that controls the amplitudeâs progress from 1 toward 0 over the course of the tween. Defining an amplitudeEase (or timingEase) will override the âtypeâ (think of the 5 âtypesâ as convenient presets for amplitudeEase and timingEase combinations). See the
example CodePen
to play around and visualize how it works.
timingEase
Ease
Provides advanced control over how the waves are plotted over time (x-axis in the
ease visualizer
). Defining an timingEase (or amplitudeEase) will override the âtypeâ (think of the 5 âtypesâ as convenient presets for amplitudeEase and timingEase combinations). See the
example CodePen
to play around and visualize how it works.
How do you control the strength of the wiggle (or how far it goes)? Simply by setting the tween property values themselves. For example, a wiggle to
rotation:30
would be stronger than
rotation:10
. Remember that an ease just controls the ratio of movement toward whatever value you supply for each property in your tween.
Sample code
â
gsap
.
registerPlugin
(
CustomEase
,
CustomWiggle
)
;
// register
//Create a wiggle with 6 oscillations (default type:"easeOut")
CustomWiggle
.
create
(
"myWiggle"
,
{
wiggles
:
6
}
)
;
//now use it in an ease. "rotation" will wiggle to 30 and back just as much in the opposite direction, ending where it began.
gsap
.
to
(
".class"
,
{
duration
:
2
,
rotation
:
30
,
ease
:
"myWiggle"
}
)
;
//Create a 10-wiggle anticipation ease:
CustomWiggle
.
create
(
"funWiggle"
,
{
wiggles
:
10
,
type
:
"anticipate"
}
)
;
gsap
.
to
(
".class"
,
{
duration
:
2
,
rotation
:
30
,
ease
:
"funWiggle"
}
)
;
//Alternatively, make sure CustomWiggle is loaded and use GSAP's string ease format
ease
:
"wiggle(15)"
//<-- easy!
ease
:
"wiggle({type:anticipate, wiggles:8})"
//advanced
Wiggling isn't just for "rotation"; you can use it for any property. For example, you could create a swarm effect by using just 2 randomized wiggle tweens on "x" and "y", as
demonstrated here
.
Demo collection
â
CustomWiggle demos
Previous
CustomEase
Next
ExpoScaleEase
Contents
Description
Demo
Config Object
Sample code
Demo collection
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