<template>
    <vue-three-wrap-dev
        camera-type="orthographic"
        fov="10"
        :start="start"
        :update="update" />
</template>

<script>
import * as THREE from 'three'
import { transform } from 'popmotion'
const Noise = require('noisejs')
const { blendColor, interpolate } = transform

// prep colors
const color1 = '#E4D9FF'
const color2 = '#1E2749'
const blend = blendColor(color1, color2)

// prep noise interpolation
const noiseInterpolate = interpolate([-1, 1], [0, 1])

// prep noise
const noise = new Noise.Noise(Math.random())

const ref = {}
class NoiseCell {
    constructor(x, y, noise) {
        this.x = x
        this.y = y
        this.noise = 0

        const geo = new THREE.BoxGeometry()
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        this.cube = new THREE.Mesh(geo, mat)

        this.updateNoise()
    }

    updateNoise(offsetX = 0, offsetY = 0) {
        const scale = 10
        const maxHeight = 3

        const noiseVal = noiseInterpolate(
            noise.simplex2(
                (this.x + offsetX) / scale,
                (this.y + offsetY) / scale
            )
        )
        this.cube.material.color = new THREE.Color(blend(noiseVal))
        this.cube.scale.y = noiseVal * maxHeight + 1.5
    }
}

export default {
    data() {
        return {
            offsetX: 0,
            offsetY: 0,
            noiseSpeed: {
                x: 0.05,
                y: 0.02
            }
        }
    },
    methods: {
        start({ scene, camera }) {
            // grid size
            const width = 15
            const height = 15

            // prep to save cubes
            ref.cubes = new THREE.Group()
            scene.add(ref.cubes)
            ref.cells = []

            // prep noise
            const scale = 10

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // create cell
                    const cell = new NoiseCell(x, y)

                    // place cell
                    cell.cube.position.x = x
                    cell.cube.position.z = y
                    ref.cells.push(cell)

                    // add to group
                    ref.cubes.add(cell.cube)
                }
            }

            // place camera
            camera.position.x = 25
            camera.position.y = 15
            camera.position.z = 25
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            // place cubes
            ref.cubes.position.x -= width / 6
            ref.cubes.position.z -= height / 6
        },
        update() {
            // ref.cube.rotation.y -= 0.01
            ref.cells.forEach(cell => {
                cell.updateNoise(this.offsetX, this.offsetY)
            })

            this.offsetX += this.noiseSpeed.x
            this.offsetY += this.noiseSpeed.y
        }
    }
}
</script>
