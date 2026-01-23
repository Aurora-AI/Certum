CSS | GSAP | Docs & Learning
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
Staggers
Helper functions
React - useGSAP()
llms.txt
CSS
On this page
CSS
GSAP can animate pretty much ANY CSS-related property
of DOM elements. Commonly animated properties are transforms, opacity and colors. But GSAP can handle anything you throw at it. There is no official list as it would be far too long, but
if in doubt - try it out!
CSS properties
â
GSAP can animate any
animatable CSS property
, and many that aren't
officially
animatable using CSS.
Hyphenated CSS properties
It's important to note that hyphenated-names become CamelCaseNames. So instead of "font-size", you'd use "fontSize". "background-color" will be "backgroundColor".
// some example properties.
gsap
.
to
(
element
,
{
backgroundColor
:
"red"
,
// background-color
fontSize
:
12
,
// font-size
boxShadow
:
"0px 0px 20px 20px red"
,
// animate complex strings
borderRadius
:
"50% 50%"
,
height
:
"auto"
,
// animate between auto and a px value ðª
}
)
;
Non-animatable properties...
â
If you define a property that is non-animatable â like
position: "absolute"
or
borderStyle: "solid"
â GSAP will instantly apply the property for you . These non-tweenable properties will be set at the beginning of the tween (except
display: "none"
which will be applied at the end of the tween for obvious reasons).
What's a 'non-animatable property'?
In order for a property to be animatable, the start, end and in between values must be valid. If you animate between
rotation: 0
and
rotation: 360
, there are valid numerical values in between. Following this logic, you can't animate between two different background images as there is no valid CSS for
a little bit of that image and a tiny bit of that one
. background-image is a binary property, there is either an image or there isn't an image, there's no inbetween to animate.
Animating Layout
Some other "impossible properties" are
layout
properties. These are far too complex for a normal tween - but will be handled
magically
by GSAP's
FLIP plugin
Transforms
â
GSAP provides built in aliases for transforms which are cross browser friendly, more performant and more reliable than animating the transform string.
gsap
.
to
(
element
,
{
// writing out the transform string ð¥
// transform: "translate(-50%,-50%)"
xPercent
:
-
50
,
yPercent
:
-
50
,
}
)
;
In regular CSS, the order that you list the transforms matters but GSAP always applies them in the same order for consistency: translation (
x
,
y
,
z
), then
scale
, then
rotationX
, then
rotationY
, then
skew
, then
rotation
(same as
rotationZ
).
Deep Dive - Why use shorthand transforms?
When you define a transform as a string, like
"transform: translateX(50px)"
, GSAP applies it to the element and then reads back and parses the
matrix()
or
matrix3d()
that the browser creates. This process is necessary because the string can contain any number or order of transform values, such as
"translateX(50px) rotate(40deg) scale(0.5,0.5) translateY(100px) rotate(30deg)"
. This approach involves a lot of extra work. Additionally, according to the CSS spec, the order of operation matters which can lead to unexpected results for people unfamiliar with CSS transforms.
When you define properties using the shorthand like
x:50
instead of
"transform: translateX(50px)"
, GSAP can directly handle that one value without the need for extra calculations. In short, using GSAP for transforms offers performance gains, optimizations for speed and an intuitive and consistent order-of-operation.
We strongly recommend using GSAP's built-in aliases for transforms unless you specifically require a non-standard order-of-operation, which is rare.
Quick reference
â
Here's a list of the shorthand transforms and some other commonly used properties.
GSAP
Description or equivalent CSS
x: 100
transform: translateX(100px)
y: 100
transform: translateY(100px)
xPercent: 50
transform: translateX(50%)
yPercent: 50
transform: translateY(50%)
scale: 2
transform: scale(2)
scaleX: 2
transform: scaleX(2)
scaleY: 2
transform: scaleY(2)
rotation: 90
transform: rotate(90deg)
rotation: "1.25rad"
transform: rotate(1.25rad)
skew: 30
transform: skew(30deg)
skewX: 30
transform: skewX(30deg)
skewY: "1.23rad"
transform: skewY(1.23rad)
transformOrigin: "center 40%"
transform-origin: center 40%
opacity: 0
adjust the elements opacity
autoAlpha: 0
shorthand for opacity & visibility
duration: 1
animation-duration: 1s
repeat: -1
animation-iteration-count: infinite
repeat: 2
animation-iteration-count: 3
delay: 2
animation-delay: 2s
yoyo: true
animation-direction: alternate
Notes about transforms
To do percentage-based translation use
xPercent
and
yPercent
instead of
x
or
y
which are typically pixel based. This allows you to combine px and percentage transformations.
You can use scale as a shortcut to control both the
scaleX
and
scaleY
properties identically.
You can define relative values, like
rotation: "+=30"
.
The order in which you declare the transform properties makes no difference.
GSAP has nothing to do with the rendering quality of the element in the browser. Some browsers seem to render transformed elements beautifully while others don't handle anti-aliasing as well.
Percentage-based x/y translations also work on SVG elements.
Complex strings
â
GSAP can animate complex values like
boxShadow: "0px 0px 20px 20px red"
,
borderRadius: "50% 50%"
, and
border: "5px solid rgb(0,255,0)"
. When necessary, it attempts to figure out if the property needs a vendor prefix and applies it accordingly.
Units
â
GSAP has sensible defaults for units. If you want to set the x property, you can say
x: 24
instead of x: "24px" because GSAP uses pixels as the default unit for x. If you want to specify a particular unit you can append the unit value on the end and wrap the value in a string.
gsap
.
to
(
HTMLelement
,
{
rotation
:
360
// default deg
rotation
:
"1.25rad"
// use radians instead
x
:
24
// using px
x
:
"20vw"
// use viewport widths instead
}
)
;
info
If the unit of measurement that's currently used doesn't match the current one, GSAP will convert them for you. e.g. Tweening an element's width from "50%" to "200px".
3D Transforms
â
You can animate 3D properties like
rotationX
,
rotationY
,
rotationZ
(identical to regular
rotation
),
z
,
perspective
, and
transformPerspective
in all modern browsers (see
Can I Use
for details about browser support for 3D transforms). You can animate 3D transform properties and 2D properties together intuitively:
gsap
.
to
(
element
,
{
duration
:
2
,
rotationX
:
45
,
scaleX
:
0.8
,
z
:
-
300
,
}
)
;
warning
To get your elements to have a true 3D visual perspective applied, you must either set the perspective property of the parent element or set the special
transformPerspective
of the element itself
The
transformPerspective
is like adding a
perspective()
directly inside the CSS
transform
style, like:
transform: perspective(500px) rotateX(45deg)
which only applies to that specific element. Common values range from around 200 to 1000, the lower the number the stronger the perspective distortion. If you want a group of elements to share a common perspective (the same vanishing point), you should set the regular
perspective
property
on the parent/container of those elements.
//apply a perspective to the PARENT element (the container) to make the perspective apply to all child elements (typically best)
gsap
.
set
(
container
,
{
perspective
:
500
}
)
;
//or apply perspective to a single element using "transformPerspective"
gsap
.
set
(
element
,
{
transformPerspective
:
500
}
)
;
//sample css:
.
myClass
{
transform
:
translate3d
(
10px
,
0px
,
-
200px
)
rotateY
(
45deg
)
scale
(
1.5
,
1.5
)
;
}
//corresponding GSAP transform (animated over 2 seconds):
gsap
.
to
(
element
,
{
duration
:
2
,
scale
:
1.5
,
rotationY
:
45
,
x
:
10
,
y
:
0
,
z
:
-
200
}
)
;
//sample CSS that uses a perspective():
.
myClass
{
transform
:
perspective
(
500px
)
translateY
(
50px
)
rotate
(
120deg
)
;
}
//corresponding GSAP transform (set, not animated):
gsap
.
set
(
element
,
{
transformPerspective
:
500
,
rotation
:
120
,
y
:
50
}
)
;
For more information about perspective, see
this article
.
Notes about 3D transforms
In browsers that don't support 3D transforms, they'll be ignored. For example, rotationX may not work, but rotation would. See
can I use
for a chart of which browser versions support 3D transforms.
All transforms are cached, so you can tween individual properties without worrying that they'll be lost. You don't need to define all of the transform properties on every tween - only the ones you want to animate. You can read the transform-related values (or any property) anytime using the method. If you'd like to clear those values (including the transform applied to the inline style of the element), you can use
clearProps: "transform"
. If you'd like to force GSAP to re-parse the transform data from the CSS (rather than use the data it had recorded from previous tweens), you can pass
parseTransform: true
into the
config
object.
GSAP has nothing to do with the rendering quality of the element in the browser. Some browsers seem to render transformed elements beautifully while others don't handle anti-aliasing as well.
To learn more about CSS 3D transforms, see
this article
Opera mini does not support 3D transforms
force3D
â
force3D
defaults to
"auto"
mode which means transforms are automatically optimized for speed by using
translate3d()
instead of
translate()
. This typically results in the browser putting that element onto its own compositor layer, making animation updates more efficient. In
"auto"
mode, GSAP will automatically switch back to 2D when the tween is done (if 3D isn't necessary) to free up more GPU memory. If you'd prefer to keep it in 3D mode, you can set
force3D: true
. Or, to stay in 2D mode whenever possible, set
force3D: false
. See
Myth Busting CSS Animations vs JavaScript"
for more details about performance.
transformOrigin
â
Sets the origin around which all transforms (2D and/or 3D) occur. By default, it is in the center of the element (
"50% 50%"
). You can define the values using the keywords
"top"
,
"left"
,
"right"
, or
"bottom"
or you can use percentages (bottom right corner would be
"100% 100%"
) or pixels. If, for example, you want an object to spin around its top left corner you can do this:
//spins around the element's top left corner
gsap
.
to
(
element
,
{
duration
:
2
,
rotation
:
360
,
transformOrigin
:
"left top"
,
}
)
;
The first value in the quotes corresponds to the x-axis and the second corresponds to the y-axis, so to make the object transform around exactly 50px in from its left edge and 20px from its top edge, you could do:
//spins/scales around a point offset from the top left by 50px, 20px
gsap
.
to
(
element
,
{
duration
:
2
,
rotation
:
270
,
scale
:
0.5
,
transformOrigin
:
"50px 20px"
,
}
)
;
This even works with SVG elements!
You can define a transformOrigin as a
3D value
by adding a 3rd number, like to rotate around the y-axis from a point that is offset 400px in the distance, you could do:
//rotates around a point that is 400px back in 3D space, creating an interesting effect:
gsap
.
to
(
element
,
{
duration
:
2
,
rotationY
:
360
,
transformOrigin
:
"50% 50% -400px"
,
}
)
;
SVG
GSAP does make
transformOrigin
work on SVG elements consistently across browsers. But keep in mind that SVG elements don't officially support 3D transforms according to the spec.
SVG
â
svgOrigin
â
Only for SVG elements
Works exactly like
transformOrigin
but it uses the SVG's global coordinate space instead of the element's local coordinate space. This can be very useful if, for example, you want to make a bunch of SVG elements rotate around a common point. You can either define an
svgOrigin
or a
transformOrigin
, not both (for obvious reasons). So you can do
gsap.to(svgElement, {duration: 1, rotation: 270, svgOrigin: "250 100"})
if you'd like to rotate
svgElement
as though its origin is at x: 250, y: 100 in the SVG canvas's global coordinates. Units are not required. It also records the value in a
data-svg-origin
attribute so that it can be parsed back in.
svgOrigin
doesn't accommodate percentage-based values.
loading...
smoothOrigin
â
Only for SVG elements
When changing the
transformOrigin
(or
svgOrigin
) of an SVG element, CSSPlugin will now automatically record/apply some offsets to ensure that the element doesn't "jump". You can disable this by setting
CSSPlugin.defaultSmoothOrigin = false
, or you can control it on a per-tween basis using
smoothOrigin: true
or
smoothOrigin: false
.
Deep Dive - Why use shorthand transforms?
The way transforms and transform-origins work in the browser (and according to the official spec), changing the origin causes the element jump in a jarring way. For example, if you rotate 180 degrees when the
transform-origin
is in the element's top left corner, it ends up at a very different position than if you applied the same rotation around its bottom right corner. Since GSAP is focused on solving real-world problems for animators (most of whom prefer to smoothly alter the
transformOrigin
), the
smoothOrigin
feature in GSAP solves this issue. This also means that if you create SVG artwork in an authoring program like Adobe Flash where it may not be easy/obvious to control where the element's origin is, things will "just work" when you define a
transformOrigin
via GSAP. Currently, this feature only applies to SVG elements, as that is where it is more commonly a pain-point.
directionalRotation
â
Tweens rotation for a CSS property in a particular direction which can be either
clockwise
(
"\_cw"
suffix),
counter-clockwise
(
"\_ccw"
suffix), or in the
shortest direction
(
"\_short"
suffix) in which case the plugin chooses the direction for you based on the shortest path. For example, if the element's rotation is currently 170 degrees and you want to tween it to -170 degrees, a normal rotation tween would travel a total of 340 degrees in the counter-clockwise direction, but if you use the \_short suffix, it would travel 20 degrees in the clockwise direction instead. Example:
gsap
.
to
(
element
,
{
duration
:
2
,
rotation
:
"-170\_short"
,
}
)
;
//or even use it on 3D rotations and use relative prefixes:
gsap
.
to
(
element
,
{
duration
:
2
,
rotation
:
"-170\_short"
,
rotationX
:
"-=30\_cw"
,
rotationY
:
"1.5rad\_ccw"
,
}
)
;
Notice that the value is in quotes, thus a string with a particular suffix indicating the direction (
\_cw
,
\_ccw
, or
\_short
). You can also use the
"+="
or
"-="
prefix to indicate relative values. Directional rotation suffixes are supported in all rotational properties (
rotation
,
rotationX
, and
rotationY
); you don't need to use
directionalRotation
as the property name. There is a
DirectionalRotationPlugin
that you can use to animate objects that aren't DOM elements, but there's no need to load that plugin if you're just animating CSS-related properties with CSSPlugin because it has DirectionalRotationPlugin's capabilities baked-in. Check out an
interactive example here
.
autoAlpha
â
Identical to
opacity
except that when the value hits
0
the
visibility
property will be set to
hidden
in order to improve browser rendering performance and prevent clicks/interactivity on the target. When the value is anything other than
0
,
visibility
will be set to
inherit
. It is not set to
visible
in order to honor inheritance (imagine the parent element is hidden - setting the child to visible explicitly would cause it to appear when that's probably not what was intended). And for convenience, if the element's
visibility
is initially set to
hidden
and
opacity
is
1
, it will assume
opacity
should also start at
0
. This makes it simple to start things out on your page as invisible (set your CSS
visibility: hidden
) and then fade them in whenever you want.
//fade out and set visibility:hidden
gsap
.
to
(
element
,
{
duration
:
2
,
autoAlpha
:
0
,
}
)
;
//in 2 seconds, fade back in with visibility:visible
gsap
.
to
(
element
,
{
duration
:
2
,
autoAlpha
:
1
,
delay
:
2
}
)
;
CSS variables
â
GSAP can animate CSS variables in browsers that support them.
loading...
clearProps
â
You may enter a comma-delimited list of property names into
clearProps
that you want to clear from the element's
style
property when the tween completes (or use
"all"
or
true
to clear all properties). This can be useful if, for example, you have a class (or some other selector) that should apply certain styles to an element when the tween is over that would otherwise get overridden by the
element.style
-specific data that was applied during the tween. Typically you do
not
need to include vendor prefixes.
clearProps
also clears the "transform" attribute of SVG elements that have been affected by GSAP because GSAP always applies transforms (like x, y, rotation, scale, etc.) via the transform
attribute
to avoid browser bugs/quirks. Clearing any transform-related property (like
x
,
y
,
scale
,
rotation
, etc.) will clear the
entire
transform
because those are all merged into one "transform" CSS property.
//tweens 3 properties and then clears only "left" and "transform" (because "scale" affects the "transform" css property. CSSPlugin automatically applies the vendor prefix if necessary too)
gsap
.
from
(
element
,
{
duration
:
5
,
scale
:
0
,
left
:
200
,
backgroundColor
:
"red"
,
clearProps
:
"scale,left"
,
// note: "scale" (or any transform-related property) clears all transforms
}
)
;
autoRound
â
By default, CSSPlugin will round pixel values and
zIndex
to the closest integer during the tween (the inbetween values) because it improves browser performance, but if you'd rather disable that behavior, pass
autoRound: false
in the CSS object. You can still use the
SnapPlugin
to manually define properties that you want rounded.
If you need to animate numeric attributes (rather than CSS-related properties), you can use the
AttrPlugin
. And to replace the text in a DOM element, use the
TextPlugin
.
Try out what you've learnt!
â
Try it out
loading...
FAQs
â
How do I include this in my project?
Simply load GSAP's core - CSSPlugin is included automatically!
Do I need to use the css:
wrapper in tweens?
Nope. That was required
wayyy
back when GSAP was first created but due to the frequency of animating DOM elements, GSAP removed the need to use that for animating CSS properties.
Next
Attributes
Contents
CSS properties
Non-animatable properties...
Transforms
Quick reference
Complex strings
Units
3D Transforms
force3D
transformOrigin
SVG
svgOrigin
smoothOrigin
directionalRotation
autoAlpha
CSS variables
clearProps
autoRound
Try out what you've learnt!
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