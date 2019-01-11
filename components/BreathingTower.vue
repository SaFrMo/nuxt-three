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
                // cube.position.x = -8
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
