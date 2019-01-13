<template>
    <vue-three-wrap :start="start" :update="update" />
</template>

<script>
import VueThreeWrap from 'vue-three-wrap'
import * as THREE from 'three'

const ref = {}

export default {
    components: {
        'vue-three-wrap': VueThreeWrap
    },
    methods: {
        start({ scene, camera }) {
            // camera.position.y = 5
            camera.position.z = 4

            //This will add a starfield to the background of a scene
            const starsGeometry = new THREE.Geometry()

            for (var i = 0; i < 10000; i++) {
                var star = new THREE.Vector3()
                star.x = THREE.Math.randFloatSpread(3)
                star.y = THREE.Math.randFloatSpread(3)
                star.z = THREE.Math.randFloatSpread(3)

                starsGeometry.vertices.push(star)
            }

            const starsMaterial = new THREE.PointsMaterial({
                color: 0xff0000,
                size: 0.2,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.35
            })

            ref.starField = new THREE.Points(starsGeometry, starsMaterial)

            scene.add(ref.starField)
            // camera.lookAt(ref.starField.position)
        },
        update() {
            ref.starField.rotation.y -= 0.005
            const h = (Math.sin(Date.now() * 0.0005) + 1) / 2
            ref.starField.material.color.setHSL(h, 0.7, 0.1)
        }
    }
}
</script>
