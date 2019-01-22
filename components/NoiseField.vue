<template>
    <vue-three-wrap-dev
        camera-type="orthographic"
        fov="10"
        :start="start"
        :update="update" />
</template>

<script>
import * as THREE from 'three'

const ref = {}

export default {
    methods: {
        start({ scene, camera }) {
            // grid size
            const width = 10
            const height = 10

            const geo = new THREE.BoxGeometry()
            const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
            ref.cube = new THREE.Mesh(geo, mat)
            scene.add(ref.cube)

            // place camera
            camera.position.x = 3
            camera.position.y = 1
            camera.position.z = 3
            camera.lookAt(ref.cube.position)
        },
        update() {
            ref.cube.rotation.y -= 0.01
        }
    }
}
</script>
