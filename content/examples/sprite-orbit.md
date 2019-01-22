I love [Popmotion](https://popmotion.io/pure/)'s [spring](https://popmotion.io/api/spring/) function probably to the point of overusing it. The `damping` and `stiffness` properties add so much character to animations that it's incredible bang for your buck.

I usually set the `damping` high enough to give one overshoot bounce and maybe tiiiiny second correction - here, for instance, are the values for this example:

```
spring({
    from: {
        x: sprite.position.x,
        y: sprite.position.y,
        z: sprite.position.z
    },
    to: newPos,
    damping: 12
})
```

The `sprite` in the settings refers to one of the sprites rotating the central sphere - a sprite is a super quick way in THREE.js to create a plane that always faces the camera, which you can texture and interact with as you like.

If you set the damping even higher - say, 28 - you can create a more natural-looking slide than a standard easing function. The panel containing this article shows and hides itself with a spring whose damping is set to 28 - click "hide description" in the top right corner to see it in action!

Once the spring is coupled with a sequential delay and some careful `stop` management, we've got a fully-functioning and natural-looking orbit effect:

```
// stop in-progress movement
if (inProgress && inProgress.stop) {
    inProgress.stop()
}

// [...create an array of springs called `springs` here]

// start springs
inProgress = stagger(springs, 30).start(values =>
    values.forEach((v = -1, i) => {
        const current =
            v == -1 ? ref.sprites.children[i].position : v
        ref.sprites.children[i].position.set(v.x, v.y, v.z)
    })
)
```

There's a lot going on there, so it might help to check out the [full source code](https://github.com/SaFrMo/nuxt-three/blob/master/components/SpriteOrbit.vue). Enjoy!
