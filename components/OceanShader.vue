<template>
    <vue-three-wrap :start="start" :update="update">

    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { transform } from 'popmotion'

const ref = {}

export default {
    methods: {
        start({ scene, camera }) {
            // create plane
            const geo = new THREE.PlaneGeometry(5, 5)
            const mat = new THREE.MeshBasicMaterial({ color: 0x0000ff })
            ref.plane = new THREE.Mesh(geo, mat)
            ref.plane.position.z = -2
            ref.plane.position.y = -3
            ref.plane.rotation.x = -Math.PI / 2
            // position camera
            camera.position.x = 5
            camera.lookAt(ref.plane.position)
            scene.add(ref.plane)
        },
        update() {}
    }
}
</script>
