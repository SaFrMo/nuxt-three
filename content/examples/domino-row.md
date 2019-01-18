This one's all about applying the THREE.js [CSS3DRenderer](https://threejs.org/docs/index.html#examples/renderers/CSS3DRenderer) to the vue-three-wrapper component.

THREE.js is an amazing tool on its own, but it becomes even more powerful when you add interactivity. Normally, that takes some raycasting calculation to figure out where the user's mouse is, but I wanted to make use of the built-in features of HTML5:

-   CSS styling
-   Accessibility (keyboard navigation, screen reader support, semantic elements)
-   A huge range of events and animations available to JS and CSS

THREE.js nominally has a CSS 3D renderer (used for stunning examples like this [periodic table](https://threejs.org/examples/?q=period#css3d_periodictable)), but it takes a bit of work to set up. You need to include the renderer and new CSS object declarations yourself (see the [source](https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html#L105) for the periodic table), which is easier said than done in a modern module setup like we're using in Vue components.

Couple that with the fact that the best [module version](https://www.npmjs.com/package/three-renderer-css3d) of the CSS renderer I could find doesn't look well maintained or supported and it's not an ideal situation for the vue-three-wrapper.

## Bundling

My solution was to copy the code from the package above, which exports an old-but-usable version of THREE's CSS supports, and make it available directly in the vue-three-wrapper component. The entirety of the `start` method for this component looks like this:

```
start({ scene, camera, elements, CSS }) {
    // new CSS3DObject for each element
    // (`elements` is an array of each valid element in the default slot)
    // (the CSS object includes CSS3DRenderer, CSS3DObject, and CSS3DSprite)
    ref.objects = elements.map(e => new CSS.CSS3DObject(e))

    // place & add to scene
    ref.objects.forEach((o, i) => {
        o.position.set(0, 0, i * -100)
        scene.add(o)
    })

    // move camera from far above to last item
    tween({
        from: { x: -40, y: 500, z: camera.position.z },
        to: { x: 70, y: 150, z: -1800 },
        flip: Infinity,
        duration: 15000,
        ease: easing.easeInOut
    }).start(v => {
        camera.position.x = v.x
        camera.position.y = v.y
        camera.position.z = v.z
        camera.lookAt(new THREE.Vector3(-40, camera.position.y, -2000))
    })

    // mark ready so that we turn on opacity
    this.ready = true
}
```

Most of that sample is controlling the movement of the camera - once we wrap DOM elements in a CSS3DObject, we can place them just like we would anything else in THREE.js!

The full source for this component is available [here](https://github.com/SaFrMo/nuxt-three/blob/master/components/DominoRow.vue). Enjoy!
