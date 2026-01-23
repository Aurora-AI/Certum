# https://thebookofshaders.com/examples/

Examples Gallery
================

Created by [kynd](https://www.kynd.info)([@kyndinfo](https://twitter.com/kyndinfo)) and Patricio Gonzalez Vivo([@patriciogv](https://twitter.com/patriciogv))

This is a collection of examples extracted from the chapters of this book together with shared shaders kindly donated by other readers using [the on-line editor](http://editor.thebookofshaders.com/). Feel free to explore and tweak them bit by bit. Once you have something you are proud of, click the "Export" and then copy the "URL to code...". Send it to [@bookofshaders](https://twitter.com/bookofshaders) or [@kyndinfo](https://twitter.com/kyndinfo). We are looking forward to see it!

[Hello World
-----------](../02/)

Usually the "Hello world!" example is the first step to learning a new language. In GPU-land rendering text is an overcomplicated task for a first step, instead we'll choose a bright welcoming color to shout our enthusiasm!

[Uniforms
--------](../03/)

Learn how to use Uniform variables. Uniform variables, or simply *uniforms* are the variables that carry information equally accessible from all of the threads of your shader. The [GSLS editor](http://editor.thebookofshaders.com/) has three uniforms set up for you.

```
uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;     // Time in seconds since load
```

[Algorithmic drawing
===================

Shaping functions
-----------------](../05/)

Shaping functions is fundamental technique that is recursively used throughout this book that let you control the variation of the value at will. Study how different functions of x are used to create different shapes and try making your own function.

[more](../examples/?chapter=05)

[Colors
------](../06/)

Familiarize yourself with how to express colors in shaders. The examples cover how to mix colors and beautifully animate them over time as well as conversion between two different models(RGB and HSB).
In GLSL, colors are simply just vectors, which means you can easily apply the concepts and techniques you learn here to other

[more](../examples/?chapter=06)

[Shapes
------](../07/)

Let's look at how to draw simple shapes in a parallel procedural way. In a nutshell, all you need to do is to determine if each pixel belongs to the shape you want to draw or not, and apply different colors accordingly. You can use coordinate system like a grid paper to draw rectangles and squares. We'll look at more advanced concept called distance field to draw more complex shapes.

[more](../examples/?chapter=07)

[2D Matrices
-----------](../08/)

Matrix is a very powerful tool for manipulating vectors. By mastering how to use matrices, you can freely translate, scale and rotate shapes. Since the technique can be equally applied to anything expressed by vectors, we will look at many more advanced use of matrices later in this book.
Matrices may look complex at a first glance, but you'll find it very handy and useful as you get used to the concept. Let's practice here and learn basics with simple examples.

[more](../examples/?chapter=08)

[Patterns
--------](../09/)

Repetitive patterns are perfect theme for computational sketching. Different from conventional way of drawing, shaders lets you draw everything parallelly at once. Instead of repeating the same procedure many times, you will wrap and repeat the "space". Sounds like Sci-Fi? Let's find out what it really means.

[more](../examples/?chapter=09)

[Generative designs
==================](../10/)

Life is boring if everything was predictable. Though nothing is truly random in computers, we can create pseudo-randomness that looks totally unpredictable using simple tricks to create more interesting patterns and behaviors.

[more](../examples/?chapter=10)

[Noise
-----](../11/)

How can we create more natural looking textures like surface of the roads, rocks, trees and clouds? Noise function is the answer.
Since Ken Perlin invented his first noise algorithm in 80s, the technique has been extensively used throughout computer graphics and simulations. Even if you have never heard of the name, it's not possible you have never seen it. Let's look step by step at how the function is built and works. We also cover more efficient version of the algorithm called simplex noise.

[more](../examples/?chapter=11)

MotionToolKit
=============

*[kynd](http://www.kynd.info) Sep 9, 2016*

Designing motion in a fragment shader is not straight forward and can be a bit tedious since it is not an animation tool after all. Here are some convenient tools and examples for controlling easing and timing, drawing shapes, and combining all these to create a nice sequence of motion. The first five examples introduce many useful functions that you can use as building blocks for your design. Following examples demonstrate how you can combine these tool to design complex animations.

[more](../examples/?chapter=motionToolKit)

Procedural Textures
===================

*[kynd](http://www.kynd.info) Nov 20, 2016*

Shaders are often used to create realistic surfaces of natural or artificial material such as wood, marble, granite, metal, stone, etc. without using photographs or pre-rendered images. Here are demonstrations of some basic techniques. All the examples are based on a number of random and noise functions from [Random](http://thebookofshaders.com/10/), [Noise](http://thebookofshaders.com/11/), [Cellular Noise](http://thebookofshaders.com/12/) and [Fractal Brownian Motion](http://thebookofshaders.com/13/) chapters. Once you get the basic ideas, try tweaking and adding more details to make them more realistic, coming up with new textures and optimizing the performance.

Note that the terrain examples at the bottom use normal map and lighting which are techniques not yet introduced in this book. In short, what they do is to generate a map of the directions of the surface and shade the pixels accordingly. We will cover these ideas in future chapters. Stay tuned.

[more](../examples/?chapter=proceduralTexture)