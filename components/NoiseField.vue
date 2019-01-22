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
const { blendColor } = transform

const color1 = '#E4D9FF'
const color2 = '#1E2749'

const ref = {}
class NoiseCell {
    constructor(x, y, scene) {
        this.x = x
        this.y = y

        const geo = new THREE.BoxGeometry()
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        this.cube = new THREE.Mesh(geo, mat)
    }
}

export default {
    methods: {
        start({ scene, camera }) {
            // grid size
            const width = 10
            const height = 10

            // prep to save cubes
            ref.cubes = new THREE.Group()
            scene.add(ref.cubes)

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const cell = new NoiseCell(x, y)
                    cell.cube.position.x = x
                    cell.cube.position.z = y
                    cell.cube.material.color = new THREE.Color(color1)
                    ref.cubes.add(cell.cube)
                }
            }

            // place camera
            camera.position.x = 25
            camera.position.y = 15
            camera.position.z = 25
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            // place cubes
            ref.cubes.position.x -= width / 4
            ref.cubes.position.z -= height / 4
        },
        update() {
            // ref.cube.rotation.y -= 0.01
        }
    }
}
</script>
