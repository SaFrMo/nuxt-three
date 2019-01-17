<template>
    <vue-three-wrap :start="start" renderType="css" :update="update">
        <h2>I'm a title</h2><p>I'm a paragraph</p>
    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { CSS3DObject } from '~/assets/css3d'

const ref = {}

export default {
    methods: {
        start({ scene, camera, renderer, elements }) {
            ref.h2 = new CSS3DObject(elements[0])
            ref.p = new CSS3DObject(elements[1])

            ref.h2.position.set(20, 20, 0)
            ref.h2.lookAt(new THREE.Vector3(0, 20, 20))

            ref.p.position.set(-20, -20, 0)
            ref.p.lookAt(new THREE.Vector3(0, 0, 20))
            camera.position.z = 150

            // scene.add(ref.h2)
            scene.add(ref.p)
            renderer.render(scene, camera)
        },
        update() {
            // ref.h2.rotation.z += 0.01
        }
    }
}
</script>
