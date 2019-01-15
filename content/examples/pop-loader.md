For this one, I want to recreate the incredible [Chris Gannon's](https://codepen.io/chrisgannon/) [ShuffleQueue Loader](https://codepen.io/chrisgannon/pen/xmQeze?editors=0010):

<p data-height="265" data-theme-id="light" data-slug-hash="xmQeze" data-default-tab="result" data-user="chrisgannon" data-pen-title="ShuffleQueue Loader" class="codepen">See the Pen <a href="https://codepen.io/chrisgannon/pen/xmQeze/">ShuffleQueue Loader</a> by Chris Gannon (<a href="https://codepen.io/chrisgannon">@chrisgannon</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

This is a gorgeous animation, but it uses, [GSAP](https://greensock.com/gsap), which I haven't used before. I really like working with [Popmotion](https://popmotion.io/), so I'd like to try to emulate the smoothness of GSAP with a toolset I'm more familiar with.

We'll start by recording the end result so we can analyze frame-by-frame. There are two basic parts to this animation:

1.  The dot that travels under the entire row:

    ![Four screenshots showing the dot in different positions.](/images/traveler.png)

1.  The dots that bounce and shift left. Each of these dots has the same animation, just delayed as they move down the row, so let's focus on one:

    ![Four screenshots with arrows pointing at the bouncing ball and a frame number label.](/images/storyboard-1.png)

    ![Four more screenshots, labelled the same as the previous, showing the rest of the animation.](/images/storyboard-2.png)

    I've also added some labels indicating the frame of each key point in the screenshot above, which we can use to figure out timing.

We'll set up our scene, then start out by mimicking the dot that travels under the entire row (we'll call it the "traveler").

## the setup

After some boilerplate and creating our traveler [styler](https://popmotion.io/stylefire/api/styler/):

```
const { styler, tween, spring } = window.popmotion

// animation duration in ms
const duration = 1500

// traveler styler
const traveler = styler(document.querySelector('.traveler'))
```

we'll use some ES6 to create stylers for the other balls:

```
const otherBalls =
    [...document.querySelectorAll('.ball:not(.traveler)')]
    .map(styler)
```

Here's what's happening there:

```
const otherBalls =
    // we'll `querySelectorAll` all balls that aren't the traveler
    // but since querySelectorAll doesn't return an array,
    // we'll use the spread operator to populate an array with the results
    [...document.querySelectorAll('.ball:not(.traveler)')]

    // then we'll map Popmotion's `styler(domElement)` function
    // over the selected elements to create an array of stylers
    .map(styler)

// those lines are equivalent to:
const elements = [...document.querySelectorAll('.ball:not(.traveler)')]
const otherBalls = []
elements.forEach(function(element){
    otherBalls.push(styler(element))
})
```

Finally, we'll make a placeholder animation to move the other balls out of the way:

```
// scoot other balls to the left
tween({
    to: '-30px',
    // remember we created a "duration" var earlier
    duration: duration,
    loop: Infinity
}).start(value => {
    // tell each styler to set its `translateX` value
    otherBalls.forEach(otherBall => otherBall.set('x', value))
})
```

## the traveler

The basic traveler motion just puts it 120px to the right of its starting position:

```
tween({
    to: '120px',
    duration: duration,
    loop: Infinity
}).start(traveler.set('x'))
```

There's a bit of overshoot, though, where the ball moves past its target point and corrects itself after doing so. I like to handle this with Popmotion's spring tool - I think it gives the animation a lot more life than an easing equation.

Here's what I ended up with - note the switch from the 'tween' function to 'spring':

```
// main traveler animation
spring({
    from: 0,
    to: '120px',
    stiffness: 50,
    damping: 8
}).start(traveler.set('x'))
```

And here's the result so far:

<p data-height="265" data-theme-id="light" data-slug-hash="OrqNzp" data-default-tab="result" data-user="SanderMoolin" data-pen-title="Traveler" class="codepen">See the Pen <a href="https://codepen.io/SanderMoolin/pen/OrqNzp/">Traveler</a> by Sander Moolin (<a href="https://codepen.io/SanderMoolin">@SanderMoolin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

It's got one extra little overshoot/correction at the end, but I like how that looks that in our version!

## the bouncer

Since we've highlighted the extremes of the bounce animation already in the screenshot above, let's put those to good use by making the bounce a Popmotion [keyframe](https://popmotion.io/api/keyframes) animation!

First, we'll assume that the animation in about 50 frames long, so we'll need to multiply each frame index by 2 to it as a percentage. Couple that with the Y offset and we've got a set of keyframe options that look like this:

```
values: [
    { y: 0 }, // 0
    { y: -40 }, // 0.36
    { y: 0 }, // 0.52
    { y: -15 }, // 0.64
    { y: 0 }, // 0.74
    { y: -6 }, // 0.84
    { y: 0 } // 1
],
// take those times from above and set them here:
times: [0, 0.36, 0.52, 0.64, 0.74, 0.84, 1],
```

That gives us the following:

<p data-height="265" data-theme-id="light" data-slug-hash="QzoGYr" data-default-tab="result" data-user="SanderMoolin" data-pen-title="Single Bounce" class="codepen">See the Pen <a href="https://codepen.io/SanderMoolin/pen/QzoGYr/">Single Bounce</a> by Sander Moolin (<a href="https://codepen.io/SanderMoolin">@SanderMoolin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

That's a good start! Let's include the squash and stretch in those keyframes.
