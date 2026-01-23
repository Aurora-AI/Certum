Text | GSAP | Docs & Learning
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
Text
On this page
Text
Quick Start
CDN Link
Copy
gsap
.
registerPlugin
(
TextPlugin
)
Minimal usage
//replaces yourElement's text with "This is the new text"
gsap
.
to
(
yourElement
,
{
duration
:
2
,
text
:
"This is the new text"
,
ease
:
"none"
,
}
)
;
Replaces the text content of a DOM element one character at a time (or one word at a time if you set
delimiter: " "
). So when the tween is finished, the DOM element's text has been completely replaced. This also means that if you rewind or restart the tween, the text will be reverted.
Here is a simple example of replacing the text in yourElement:
//replaces yourElement's text with "This is the new text" over the course of 2 seconds
gsap
.
to
(
yourElement
,
{
duration
:
2
,
text
:
"This is the new text"
,
ease
:
"none"
,
}
)
;
Config Object
â
For advanced usage, set
text
to an object (like
text:{...}
) with any of the following properties:
Property
Description
delimiter
The character that should be used to split the text up. The default is
""
, so each character is isolated but if you'd prefer to animate in word-by-word instead you can use the space character, like
//replaces word-by-word because the delimiter is " " (a space)
gsap
.
to
(
"#element"
,
{
duration
:
2
,
text
:
{
value
:
"This is the new text"
,
delimiter
:
" "
},
ease
:
"none"
});
.
newClass
A CSS class that should be applied to the new text via a
tag. This makes it easy to have the new text differentiated visually from the old text, like maybe it should be red or bold or something - just create a class in your CSS and pass the name in here like
//wraps the old text in and the new text in a
gsap
.
to
(
"#element"
,
{
duration
:
2
,
text
:
{
value
:
"This is the new text"
,
newClass
:
"class2"
,
oldClass
:
"class1"
},
ease
:
"power2"
});
oldClass
A CSS class that should be applied to the old text via a
tag.
padSpace
If the new text is shorter than the old text, it can be useful to pad the trailing space with non-breaking space HTML characters so that the old text doesn't collapse. If that's the effect you want, set
padSpace: true
inside the text object.
preserveSpaces
If
true
, it will force TextPlugin to maintain extra spaces, swapping in
to make them show up in HTML.
rtl
if
true
, the text will be introduced from right-to-left (reverse order). See a
demo here
speed
Automatically adjust the
duration
of the tween according to how many changes there are in the text; a value of
1
is relatively slow, and a value of
20
is very fast. Without this feature, you'd need to specify a duration for the tween and it might be difficult to guess what looks good (animating 10 characters over 2 seconds looks VERY different than animating 500 in the same amount of time). In other words,
speed
lets you think more in terms of "changes per unit of time". Technically the formula is "0.05 / speed \* text\_changes".
type
If you'd like to only animate the differences in the text (skipping all of the character positions that are identical between the start and end strings), set
type: "diff"
(new in GSAP 3.0.4). If, for example, the first 50 characters are the same it might look like the animation is delayed because it's going character-by-character from the start, so
type: "diff"
solves that by skipping all the identical parts.
value
The replacement text string, like
"This is the new text"
(
REQUIRED
)
Use the object syntax for special properties
If you use any of the special properties above, make sure you put them
inside their own object
, not inside the main vars object, like this:
//GOOD:
gsap
.
to
(
yourElement
,
{
duration
:
1
,
text
:
{
value
:
"Your new text"
,
newClass
:
"class2"
,
delimiter
:
" "
,
}
,
}
)
;
//BAD:
gsap
.
to
(
yourElement
,
{
duration
:
1
,
text
:
"Your new text"
,
newClass
:
"class2"
,
delimiter
:
" "
,
}
)
;
TextPlugin will recognize simple HTML nodes like
  
and honor them (new in GSAP 3.0.4).
Demos
â
Check out the full collection of
text animation demos
on CodePen.
Previous
.config()
Next
Utility Methods
Contents
Config Object
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