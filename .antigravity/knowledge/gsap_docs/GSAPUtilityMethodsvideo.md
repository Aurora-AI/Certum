Utility Methods | GSAP | Docs & Learning
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
On this page
Utility Methods
GSAP's utility methods can be surprisingly helpful. Note that many of them can optionally return FUNCTIONS so that they can be plugged directly into tweens, leveraging GSAP's function-based capabilities. In that case, they'll get called once for each target rather than just using the same end value for them all.
Video
â
combining utility methods
Available Utils
â
checkPrefix
Prefixes the proved CSS property if necessary
clamp
Clamp a value to fit within a specific range
clamp(0, 100, -12)
-> 0
distribute
Distribute a value among an array of objects either linearly or according to their position in a grid, optionally with easing applied.
getUnit
Get the unit of a string
getUnit("30px")
--> "px".
interpolate
Interpolate between almost any two values (numbers, colors, strings, arrays, complex strings, or even objects with multiple properties) ex
interpolate("red", "blue", 0.5)
--> "rgba(128,0,128,1)").
mapRange
: Number
Map one range to another ex
mapRange(-10, 10, 0, 100, 5) --> 75)
normalize
Map a number within a range to a progress between 0 to 1 ex
normalize(100, 200, 150) --> 0.5)
pipe
Sequence a number of function calls, passing the result of each into the next ex
pipe(clamp(0, 100), snap(5))(8) --> 10
random
Generate a random number based on parameters ex
random(0, 100, 5) --> 65)
or randomly pick an element from in a supplied array ex.
random(["red", "green", "blue"]) --> "red"
selector
Returns a
selector
function that is scoped to a particular Element (or React ref or Angular ElementRef). ex
selector(myElement)
shuffle
Shuffles the contents of an array in-place. ex
shuffle([1, 2, 3, 4, 5]) --> [4, 2, 1, 5, 3])
snap
Snap a value to either an increment ex
snap(5, 13)
-->
15
or to the closest value in an array ex
snap([0, 5, 10], 7)
-->
5
.
splitColor
Split any color into its red, green, blue (and optionally alpha) components. Or hue, saturation, and brightness. ex
splitColor("red")
-->
[255, 0, 0])
toArray
Convert almost any array-like object to an array, including selector text! ex -
toArray(".class")
-->
[element1, element2]
.
unitize
Wraps around another utility function, allowing it to accept values with units like "20px" or "50%", stripping off the unit when feeding into the wrapped utility function, and then adding it back to the result ex.
var wrap = gsap.utils.unitize( gsap.utils.wrap(0, 100) ) wrap("150px");
-->
"50px"
. Or force a specific unit ex
unitize( gsap.utils.mapRange(-10, 10, 0, 100), "%")
; --> always returns with
"%"
.
wrap
Returns the next item in an array or number in a range after the given index. Or returns a function that returns that object or value if no index is given.
wrapYoyo
Returns the element in an Array associated with the provided index or a number in a provided range, going backwards once the last index is reached (yoyo-ing). Or if no value to wrap is provided, it returns a reusable function that will do the wrapping accordingly when it's fed a value.
Previous
Text
Next
checkPrefix
Contents
Video
Available Utils
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