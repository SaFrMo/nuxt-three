<template>
    <vue-three-wrap :start="start" :update="update" />
</template>

<script>
/* eslint-disable */
import VueThreeWrap from 'vue-three-wrap'
import * as THREE from 'three'

const ref = {}

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld

    if (pointIsWorld) {
        obj.parent.localToWorld(obj.position) // compensate for world coordinate
    }

    obj.position.sub(point) // remove the offset
    obj.position.applyAxisAngle(axis, theta) // rotate the POSITION
    obj.position.add(point) // re-add the offset

    if (pointIsWorld) {
        obj.parent.worldToLocal(obj.position) // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta) // rotate the OBJECT
}

export default {
    components: {
        'vue-three-wrap': VueThreeWrap
    },
    methods: {
        start({ scene, camera }) {
            camera.position.z = 10

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

            // sphere
            const geo = new THREE.SphereGeometry(4, 64, 64)
            ref.sphere = new THREE.Mesh(geo, mat)
            scene.add(ref.sphere)

            ref.lights = [
                { light: new THREE.PointLight(0xffffff, 1), speed: 0.03 },
                { light: new THREE.PointLight(0xff0000, 1), speed: 0.024 },
                { light: new THREE.PointLight(0x00ff00, 1), speed: 0.027 }
            ]

            // light
            ref.lights.forEach(l => {
                const { light } = l
                light.castShadow = true
                light.position.x = -3
                light.position.z = 5
                scene.add(light)
            })
        },
        update() {
            ref.lights.forEach(light => {
                rotateAboutPoint(
                    light.light,
                    new THREE.Vector3(0),
                    new THREE.Vector3(0, 1, 0),
                    light.speed
                )
            })
        }
    }
}
</script>
