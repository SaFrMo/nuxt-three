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
            camera.position.z = 10
            camera.position.y = 5

            // add hemisphere light
            scene.add(new THREE.HemisphereLight(0xeeeeaa, 0x999933, 1))

            // reusable material + geometry
            const mat = new THREE.MeshLambertMaterial({
                color: 0xffffff
            })
            const geo = new THREE.BoxGeometry(0.7, 0.7, 0.7)

            const sphereCount = 12
            const degreePer = 360 / sphereCount
            const radius = 4.5

            // create boxes and distribute evenly around a circle
            ref.horizontalRing = new THREE.Group()
            for (let i = 0; i < sphereCount; i++) {
                const box = new THREE.Mesh(geo, mat)
                const x = radius * Math.sin(THREE.Math.degToRad(degreePer * i))
                const z = radius * Math.cos(THREE.Math.degToRad(degreePer * i))
                box.position.set(x, 0, z)
                ref.horizontalRing.add(box)
            }

            ref.ring2 = new THREE.Group()
            for (let i = 0; i < sphereCount; i++) {
                const box = new THREE.Mesh(geo, mat)
                const x = radius * Math.sin(THREE.Math.degToRad(degreePer * i))
                const z = radius * Math.cos(THREE.Math.degToRad(degreePer * i))
                box.position.set(x, 4.5, z)
                ref.ring2.add(box)
            }
            ref.ring2.rotation.x = THREE.Math.degToRad(degreePer / 2)

            ref.ring3 = new THREE.Group()
            for (let i = 0; i < sphereCount; i++) {
                const box = new THREE.Mesh(geo, mat)
                const x = radius * Math.sin(THREE.Math.degToRad(degreePer * i))
                const z = radius * Math.cos(THREE.Math.degToRad(degreePer * i))
                box.position.set(x, -4.5, z)
                ref.ring3.add(box)
            }
            ref.ring3.rotation.x = THREE.Math.degToRad(degreePer / 2)

            // add the boxes
            scene.add(ref.horizontalRing)
            scene.add(ref.ring2)
            scene.add(ref.ring3)

            // and look at the centerpoint
            camera.lookAt(0, 0, 0)
        },
        update() {
            // rotate groups while keeping children oriented in same position
            ref.horizontalRing.rotation.y += 0.01
            ref.horizontalRing.children.forEach(b => (b.rotation.y -= 0.01))

            ref.ring2.rotation.y -= 0.0075
            ref.ring2.children.forEach(b => (b.rotation.x += 0.01))

            ref.ring3.rotation.y -= 0.005
            ref.ring3.children.forEach(b => (b.rotation.z += 0.01))
        }
    }
}
</script>
