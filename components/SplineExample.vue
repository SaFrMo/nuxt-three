<template>
    <vue-three-wrap :start="start" :update="update" />
</template>

<script>
import * as THREE from 'three'

const ref = {}

export default {
    methods: {
        start({ scene, camera }) {
            // move camera
            camera.position.x = 4
            camera.position.y = 3
            camera.position.z = 3
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            // build mat
            const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
            const wireMat = new THREE.MeshBasicMaterial({
                color: 0x000000,
                opacity: 0.3,
                wireframe: true,
                transparent: true
            })

            // build points
            const spline = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-2, 0, 0),
                new THREE.Vector3(-2, 0, -3),
                new THREE.Vector3(0, 0, -3),
                new THREE.Vector3(2, 0, -3),
                new THREE.Vector3(2, 0, 0),
                new THREE.Vector3(2, 0, 3),
                new THREE.Vector3(0, 0, 3),
                new THREE.Vector3(-2, 0, 3),
                new THREE.Vector3(-2, 0, 0)
            ])

            // build geo
            const geo = new THREE.TubeBufferGeometry(spline, 64, 0.2, 8, false)

            ref.curve = new THREE.Mesh(geo, mat)
            const wire = new THREE.Mesh(geo, wireMat)
            ref.curve.add(wire)
            scene.add(ref.curve)
        },
        update() {
            ref.curve.rotation.y -= 0.001
        }
    }
}
</script>
