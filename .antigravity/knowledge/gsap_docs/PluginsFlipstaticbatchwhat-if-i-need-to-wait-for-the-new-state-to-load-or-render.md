static-batch | GSAP | Docs & Learning
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
Flip.batch()
On this page
Added in v
3.9.0
Flip
.batch
Flip
.batch
( id:String ) : FlipBatch
Coordinates the creation of multiple Flip animations in the properly sequenced set of steps to avoid cross-contamination.
Parameters
id
: String
A unique identifier for this particular batch. If a matching one already exists, that FlipBatch will be returned. Otherwise, a new one will be created and returned. If you kill() a batch, it unregisters it and frees up that id.
Returns : FlipBatch
â
A FlipBatch instance
Details
â
Coordinates the creation of multiple Flip animations in the properly sequenced set of steps to avoid cross-contamination. For example,
all
of the
getState()
calls must happen
FIRST
because a state change in one may affect the position/size of elements in another. Then all the state changes should occur, and finally, the animations get created based on the entire new state.
Perhaps you've got multiple independent React components that are all involved in a Flip but the logic needs to be encapsulated as much as possible. Flip.batch() serves as a central hub. You grab the batch instance (typically by an
id
, but that's optional) and then create as many "actions" as you want (likely one for each component), and then
run()
the whole batch in a coordinated way, ensuring that the
getState()
calls happen, then the
setState()
, then
animate()
.
Usage
// first create (or get the existing) batch by id
let
batch
=
Flip
.
batch
(
"id"
)
;
Now we need to populate it with "actions". Each action can have any of the following (all are optional):
// add an action to the batch
let
action
=
batch
.
add
(
{
// record any state objects that you may need in the animate() function. "self" is the action.
getState
(
self
)
{
// Use Flip.getState() any number of times in here, return data the way you prefer working with it later via self.state.
return
Flip
.
getState
(
".box, .container"
)
;
}
,
// make state changes here...
setState
(
self
)
{
el
.
classList
.
toggle
(
"active"
)
;
return
gsap
.
utils
.
toArray
(
".box, .container"
)
;
// optionally return Array of targets; added to self.targets. Required if you want onEnter/onLeave to fire.
}
,
animate
(
self
)
{
// create as many Flip animations in here as you'd like...
Flip
.
from
(
self
.
state
,
{
duration
:
1
}
)
;
// self.state = whatever was returned from this action's getState() call
// self.targets = whatever was returned from this action's setState() call
// self.batch = parent batch instance
// self.timeline = flip animation timeline (same as self.batch.timeline - always reused)
}
,
onEnter
(
elements
)
{
// only called when elements are entering (ones that weren't present in the initial state/layout).
// in order for this to work, you must return an Array of targets from .setState()
}
,
onLeave
(
elements
)
{
// only called when elements are leaving (ones that are no longer present compared to the initial state/layout).
// in order for this to work, you must return an Array of targets from .setState()
}
,
onStart
(
self
)
{
// animation started
}
,
onComplete
(
self
)
{
// animation finished
}
,
once
:
true
,
// removes the action from its batch when animate() is called
}
)
;
After you
add()
as many actions as you want to the batch instance, you can simply
batch.run()
and it'll execute things in the proper order:
getState()
setState()
animate()
What if I need to wait for the new state to load or render?
â
No problem! There are two strategies you can choose from:
Use loadState(done) instead of setState()
The magic of loadState() is it gives you a "done" function to call whenever you're ready to continue, so it effectively pauses the batch in the meantime, preventing it from moving onto the animate() calls until all the loadState()
done
functions are triggered.
batch
.
add
(
{
...
// all done() when you're ready to continue.
loadState
(
done
)
{
// Pass targets to done(targets) if you want onEnter/onLeave to work.
done
(
gsap
.
utils
.
toArray
(
".box, .container"
)
)
;
}
}
)
;
-OR-
Break up the batch.run()
You can trigger
just
the
getState()
part of the entire batch first...
// calls JUST getState() on all of the batch's actions
batch
.
getState
(
)
;
Then apply state changes
OUTSIDE
of the batch, and then when you're ready...
// true means "skip the .getState() part!"
batch
.
run
(
true
)
;
Done!
Cleanup
â
You can
kill()
a batch...
batch
.
kill
(
)
;
...or an individual action:
let
action
=
batch
.
add
(
{
...
}
)
;
// then later...
action
.
kill
(
)
;
Remember, if you just want to run the action once, you can set
once: true
on that action and it'll automatically get killed when its animate() function is called.
Batch methods/properties
â
// flushes all actions and clears the batch.state
batch
.
clear
(
)
;
// true means only clear batch.state but keep all the actions
batch
.
clear
(
true
)
;
// triggers ONLY the getState() of all actions
batch
.
getState
(
)
;
// Searches the state objects that were captured inside ANY of this batch actions' most recent getState() call and returns the first one it finds that matches the provided data-flip-id value. For example, if you Flip.getState("#someID") inside this action's getState() and there's a, you could find that using action.getStateById("box1"); As a last resort, it will search batch.state too.
batch
.
getStateById
(
"flip-id"
)
;
// passing true records a merged copy of ALL the .getState() results into batch.state
batch
.
getState
(
true
)
;
// kills entire batch
batch
.
kill
(
)
;
// same as action.kill()
batch
.
remove
(
action
)
;
// executes the following parts of every action in this order: getState(), loadState(), setState(), animate(), onEnter(), onLeave(), onStart(), onComplete()
batch
.
run
(
)
;
// true means "skip the getState() part"
batch
.
run
(
true
)
;
// --- PROPERTIES ---
// Array of all the FlipAction instances
batch
.
actions
;
// a place to store any arbitrary data - your choice
batch
.
data
;
// the batch id
batch
.
id
;
// whenever you Flip.getState(targets, {batch: "id"}) it copies the results into the batch.state object. If you batch.getState(true), it'll overwrite the contents with all the ones that occur inside the .getState() of any actions in the batch.
batch
.
state
;
// the timeline instance. All Flip animations created inside animate() will be pushed into this.
batch
.
timeline
;
Action methods/properties
â
// same as batch.getStateById() except that it limits the scope to ones that were captured inside this action's getState() rather than the entire batch.
action
.
getStateById
(
"flip-id"
)
;
// kills just the action (removes it from the batch)
action
.
kill
(
)
;
// --- PROPERTIES ---
// the parent batch instance
action
.
batch
;
// whatever was returned by this action's getState()
action
.
state
;
// the batch's timeline (reused) - same as action.batch.timeline
action
.
timeline
;
// whatever was returned by this action's setState() or the done() function in loadState()
action
.
targets
;
Demo
â
Here's an advanced demo showing Flip.batch() at work:
https://codesandbox.io/s/topeka-quiz-gsap-flip-plugin-rs7lw
Previous
Flip
Next
Flip.fit()
Contents
Returns : FlipBatch
Details
What if I need to wait for the new state to load or render?
Cleanup
Batch methods/properties
Action methods/properties
Demo
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