<template>
    <vue-three-wrap class="pyramid-follow" :start="start" :update="update" />
</template>

<script>
import VueThreeWrap from 'vue-three-wrap'
import * as THREE from 'three'
import raycaster from '~/assets/raycaster-mixin'
import _get from 'lodash/get'

const ref = {}

export default {
    mixins: [raycaster],
    data() {
        return {
            canvasSelector: '.pyramid-follow'
        }
    },
    methods: {
        start({ scene, camera }) {
            // add light
            ref.light = new THREE.PointLight(0xdddddd, 2)
            ref.light.castShadow = true
            ref.light.position.x = -5
            ref.light.position.y = 10
            scene.add(ref.light)

            // accent light
            ref.accent = new THREE.PointLight(0xccaaaa, 0.5)
            ref.accent.castShadow = true
            ref.accent.position.x = 5
            ref.accent.position.z = -4
            scene.add(ref.accent)

            // reusable material
            const mat = new THREE.MeshLambertMaterial({
                color: 0x666666,
                side: THREE.DoubleSide
            })

            // ground
            const planeGeo = new THREE.PlaneGeometry(20, 10)
            ref.plane = new THREE.Mesh(planeGeo, mat)
            ref.plane.position.y = -4
            ref.plane.rotation.set(THREE.Math.degToRad(90), 0, 0)
            scene.add(ref.plane)

            // tetrahedron
            const tetraGeo = new THREE.ConeGeometry(2, 3, 4)
            ref.tetra = new THREE.Mesh(tetraGeo, mat)
            scene.add(ref.tetra)

            // move camera
            camera.position.z = 10
        },
        update({ camera }) {
            this.updateRaycaster(camera)
            const intersectPlane = this.raycaster.intersectObject(ref.plane)
            if (intersectPlane.length) {
                const point = _get(intersectPlane, '[0].point', null)
                ref.tetra.position.set(point.x, point.y + 1, point.z)
            }
        }
    }
}
</script>
