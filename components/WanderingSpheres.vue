<template>
    <vue-three-wrap
        class="wandering-canvas"
        ref="canvas"
        :start="start"
        :update="update"
    />
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import VueThreeWrap from 'vue-three-wrap'
import { tween, easing, pointer, transform } from 'popmotion'
const { interpolate } = transform
import rect from '~/assets/rect-mixin'
import asyncWaitFor from '~/assets/asyncWaitFor'

const ref = {}
const raycaster = new THREE.Raycaster()
let hovering = []

export default {
    mixins: [rect],
    data() {
        return {
            masterX: 0,
            masterRotation: 0,
            mouseX: 0,
            mouseY: 0
        }
    },
    components: {
        'vue-three-wrap': VueThreeWrap
    },
    async mounted() {
        await asyncWaitFor('.wandering-canvas')

        pointer()
            .pipe(v => {
                v.x -= this.clientRect.left
                v.y -= this.clientRect.top

                v.x = interpolate([0, this.clientRect.width], [-1, 1])(v.x)
                v.y = interpolate([0, this.clientRect.height], [1, -1])(v.y)

                return v
            })
            .start(v => {
                this.mouseX = v.x
                this.mouseY = v.y
            })
    },
    methods: {
        start({ scene, camera }) {
            // add light
            ref.dirLight1 = new THREE.DirectionalLight(0xffffff, 1)
            ref.dirLight1.position.set(1, 0, 1)
            scene.add(ref.dirLight1)

            ref.dirLight2 = new THREE.DirectionalLight(0xefefef, 0.5)
            ref.dirLight2.position.set(-1, 0, 1)
            scene.add(ref.dirLight2)

            // add cubes
            ref.cubes = []

            for (let i = 0; i < 5; i++) {
                const geometry = new THREE.IcosahedronGeometry(1, 1, 1)
                const material = new THREE.MeshLambertMaterial({
                    color: 0xffffff
                })
                const color = new THREE.Mesh(geometry, material)

                const wireMat = new THREE.MeshBasicMaterial({
                    color: 0x333333,
                    wireframe: true
                })
                const wire = new THREE.Mesh(geometry, wireMat)
                wire.scale.set(1.01, 1.01, 1.01)

                const cube = new THREE.Group()
                cube.add(color)
                cube.add(wire)

                cube.position.y = 6 - i * 3

                ref.cubes.push(cube)
                scene.add(cube)
            }

            // add cube tween
            ref.cubeTween = tween({
                from: -8,
                to: 8,
                flip: Infinity,
                duration: 4000,
                ease: easing.easeInOut
            }).start(v => (this.masterX = v))

            // move camera
            camera.position.z = 10
        },
        update({ camera }) {
            // update raycaster
            raycaster.setFromCamera(
                new THREE.Vector2(this.mouseX, this.mouseY),
                camera
            )
            hovering = raycaster.intersectObjects(ref.cubes, true)

            this.masterRotation += 0.01
            const hObjects = hovering.map(h => h.object)
            const meshes = ref.cubes.map(g => g.children[0])
            meshes.filter(x => !hObjects.includes(x)).forEach(cube => {
                cube.parent.position.x = this.masterX
                cube.parent.rotation.x = cube.parent.rotation.z = this.masterRotation
            })

            meshes.forEach(cube => {
                let color = 0xffffff
                if (hovering.find(h => h.object == cube)) {
                    color = 0xff0000
                }
                cube.material.color.set(color)
            })
        }
    }
}
</script>
