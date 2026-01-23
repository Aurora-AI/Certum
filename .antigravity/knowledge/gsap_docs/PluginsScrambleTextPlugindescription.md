ScrambleText | GSAP | Docs & Learning
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
ScrambleText
On this page
ScrambleText
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
ScrambleTextPlugin
)
Minimal usage
gsap
.
to
(
element
,
{
duration
:
1
,
scrambleText
:
"THIS IS NEW TEXT"
}
)
;
loading...
Description
â
Scrambles the text in a DOM element with randomized characters (uppercase by default, but you can define lowercase or a set of custom characters), refreshing new randomized characters at regular intervals while gradually revealing your new text (or the original text) over the course of the tween (left to right by default). Visually it looks like a computer decoding a string of text. Great for rollovers.
Config Object
â
You can simply pass a string of text directly as the
scrambleText
and it'll use the defaults for revealing it, or you can customize the settings by using a generic object with any of the following properties:
Property
Description
text
String
- The text that should replace the existing text in the DOM element. If omitted (or if
"{original}"
), the original text will be used.
chars
String
- The characters that should be randomly swapped in to the scrambled portion the text. You can use
"upperCase"
,
"lowerCase"
,
"upperAndLowerCase"
, or a custom string of characters, like
"XO"
or
"TMOWACB"
, or
"jompaWB!^"
, etc. Default:
"upperCase"
.
tweenLength
Boolean
- If the length of the replacement text is different than the original text, the difference will be gradually tweened so that the length doesnât suddenly jump. For example, if the original text is 50 characters and the replacement text is 100 characters, during the tween the number of characters would gradually move from 50 to 100 instead of jumping immediatley to 100. However, if youâd prefer to have it immediately jump, set
tweenLength
to
false
. Default:
true
.
revealDelay
Number
- If youâd like the reveal (unscrambling) of the new text to be delayed for a certain portion of the tween so that the scrambled text is entirely visible for a while, use revealDelay to define the time youâd like to elapse before the reveal begins. For example, if the tweenâs duration is 3 seconds but youâd like the scrambled text to remain entirely visible for first 1 second of the tween, youâd set
revealDelay
to
1
. Default:
0
.
newClass
String
- If youâd like the new text to have a particular class applied (using a
tag wrapped around it), use
newClass: "YOUR\_CLASS\_NAME"
. This makes it easy to create a distinct look for the new text. Default:
null
.
oldClass
String
- If youâd like the
old
(original) text to have a particular class applied (using a
tag wrapped around it), use
oldClass: "YOUR\_CLASS\_NAME"
. This makes it easy to create a distinct look for the old text. Default:
null
.
speed
Number
- Controls how frequently the scrambled characters are refreshed. The default is
1
but you could slow things down by using
0.2
for example (or any number). Default:
1
.
delimiter
String
- By default, each character is replaced one-by-one, but if youâd prefer to have things revealed word-by-word, you could use a delimiter of
" "
(space). Default:
""
.
rightToLeft
Boolean
- If
true
the text will be revealed from right to left. Default:
false
.
Usage
â
//use the defaults
gsap
.
to
(
element
,
{
duration
:
1
,
scrambleText
:
"THIS IS NEW TEXT"
}
)
;
//or customize things:
gsap
.
to
(
element
,
{
duration
:
1
,
scrambleText
:
{
text
:
"THIS IS NEW TEXT"
,
chars
:
"XO"
,
revealDelay
:
0.5
,
speed
:
0.3
,
newClass
:
"myClass"
}
}
)
;
Demos
â
Check out the full collection of
text animation demos
on CodePen.
Previous
PixiPlugin.registerPIXI()
Next
ScrollTo
Contents
Description
Config Object
Usage
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