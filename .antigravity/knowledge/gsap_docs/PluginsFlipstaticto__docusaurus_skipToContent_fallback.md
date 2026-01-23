static-to | GSAP | Docs & Learning
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
Flip.to()
On this page
Flip
.to
Flip
.to
( state:FlipState, vars:Object ) : Timeline
Identical to
Flip.from()
except inverted, so this would animate
to
the provided state (from the current one).
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
Identical to
Flip.from()
except inverted, so this would animate
to
the provided state.
CAUTION
: it's almost always best to use
Flip.from()
because at the end of the animation, the inline styles get reverted/removed. Think of it like a
from()
is gradually
removing
offsets that were added initially to make the element(s) appear in the previous state. But a
Flip.to()
is gradually
adding
those offsets, so if they got removed at the end, things would suddenly jump to the pre-flipped state.
See the
Flip.from()
docs for all the options and usage information.
Flip.to()
is identical except that the direction is inverted.
Previous
Flip.makeAbsolute()
Next
CSSRule
Contents
Returns : Timeline
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