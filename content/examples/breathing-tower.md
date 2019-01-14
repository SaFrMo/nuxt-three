A few things to take away from this example!

1.  Building a tower of cubes is a relative snap in three.js:

    ```
    // given vars `THREE`, `color`, and `scene`
    for (let i = 0; i < cubeCount; i++) {

        // (1, 1, 1) are the width, height, and depth
        // (or the x, y, and z axes)
        const geometry = new THREE.BoxGeometry(1, 1, 1)

        const material = new THREE.MeshLambertMaterial({
            color: color
        })

        const cube = new THREE.Mesh(geometry, material)
        cube.position.y = i - 1

        scene.add(cube)
    }
    ```

1.  Moving through the HSL wheel lets you get a natural gradient by only changing one value, the hue:

    ```
    <span style="background: hsl(100, 50%, 50%);"></span>
    <span style="background: hsl(140, 50%, 50%);"></span>
    <span style="background: hsl(180, 50%, 50%);"></span>
    <span style="background: hsl(220, 50%, 50%);"></span>
    ```

    <span style="width: 50px; height: 50px; background: hsl(100, 50%, 50%); display: inline-block;"></span><span style="width: 50px; height: 50px; background: hsl(140, 50%, 50%); display: inline-block;"></span><span style="width: 50px; height: 50px; background: hsl(180, 50%, 50%); display: inline-block;"></span><span style="width: 50px; height: 50px; background: hsl(220, 50%, 50%); display: inline-block;"></span>

1.  Using the absolute value of the sine of a number gives a generally smooth motion with one hard bounce as the value moves above or below 0.

This was the first test of the [vue-three-wrap](https://github.com/SaFrMo/vue-three-wrap) component, and I'm really happy with how it came out - the whole Vue template is under fifty lines and relatively readable. Take a look!

```
<template>
    <vue-three-wrap :start="start" :update="update" />
</template>

<script>
import * as THREE from 'three'
import { transform } from 'popmotion'

const ref = {}

export default {
    methods: {
        start({ scene, camera }) {
            // add light
            ref.dirLight = new THREE.DirectionalLight(0xffffff, 1)
            ref.dirLight.position.set(1, 0, 1)
            scene.add(ref.dirLight)

            // example adding a cube to the scene
            ref.cubes = []
            const cubeCount = 20
            const rainbow = transform.interpolate(
                [0, cubeCount - 1],
                ['hsl(200, 100%, 50%)', 'hsl(340, 100%, 50%)']
            )
            for (let i = 0; i < cubeCount; i++) {
                const geometry = new THREE.BoxGeometry(0.5, 1, 0.5)
                const material = new THREE.MeshLambertMaterial({
                    color: rainbow(i)
                })
                const cube = new THREE.Mesh(geometry, material)
                cube.position.y = i - 10
                ref.cubes.push(cube)
                scene.add(cube)
            }

            // move camera
            camera.position.z = 10
        },
        update() {
            ref.cubes.forEach((cube, i) => {
                cube.rotation.y -= 0.0002
                cube.scale.x = cube.scale.z =
                    Math.abs(Math.sin(Date.now() * 0.001 + i / 10) * 5) + 5
            })
        }
    }
}
</script>
```
