<template>
    <main class="camera-path">
        <vue-three-wrap :start="start" :update="update" />

        <!-- <div :class="['controls-wrap', { opened: show }]">
            <button :class="[{ pressed: show }]" @click="show = !show"><span class="emoji">⚙️</span></button>

            <div class="controls" v-if="show">
                <input type="range" min="0" max="1" step="0.01" v-model="seekPos" />
            </div>
        </div> -->
    </main>
</template>

<script>
import * as THREE from 'three'
import loadScene from 'vue-three-wrap/extras/load-gltf/'
import VueThreeWrap from 'vue-three-wrap'
import { tween, easing } from 'popmotion'

const ref = {}

export default {
    components: {
        'vue-three-wrap': VueThreeWrap
    },
    data() {
        return {
            seekPos: 0,
            show: false
        }
    },
    methods: {
        async start({ scene, camera, renderer }) {
            const loadedScene = await loadScene('/camera-track.glb')
            const objects = Array.from(loadedScene.scene.children)

            objects.forEach(obj => {
                scene.add(obj)
            })

            // attach animation mixer to icosphere
            const icosphere = objects[1]
            ref.mixer = new THREE.AnimationMixer(icosphere)

            // get movement animation
            ref.cameraMoveAnim = loadedScene.animations[0]

            // make a new AnimationAction for the movement
            ref.action = ref.mixer.clipAction(ref.cameraMoveAnim)
            ref.action.loop = THREE.LoopPingPong
            ref.action.play()

            // save icosphere as camera position
            ref.cameraPos = icosphere

            // add some lighting
            this.prepLighting(scene)

            // place and rotate the camera
            this.positionCamera(camera)

            // setInterval(() => {
            //     ref.action.time = Math.abs(Math.sin(Date.now() * 0.001))
            // }, 1000 / 12)

            tween({
                from: 0,
                to: 1,
                yoyo: Infinity,
                duration: 10000,
                ease: easing.easeInOut
            }).start(v => (this.seekPos = v))
        },
        update({ camera }) {
            if (ref.action) {
                ref.action.time = this.seekPos * ref.cameraMoveAnim.duration
            }
            if (ref.mixer) {
                ref.mixer.update(0)
            }
            this.positionCamera(camera)
        },
        prepLighting(scene) {
            // some nice lighting
            const output = {}

            // Ambient light
            output.light = new THREE.AmbientLight(0xffffff, 0.6)

            // Shadow light
            output.shadowLight = new THREE.DirectionalLight(0xffffff, 0.5)
            output.shadowLight.position.set(200, 200, 200)
            output.shadowLight.castShadow = true
            output.shadowLight.shadow.mapSize.width = output.shadowLight.shadow.mapSize.height = 2048

            // Backlight
            output.backLight = new THREE.DirectionalLight(0xffffff, 0.2)
            output.backLight.position.set(-100, 200, 50)

            // Add lights
            scene.add(output.backLight)
            scene.add(output.light)
            scene.add(output.shadowLight)

            // in case we want to do anything with these later
            return output
        },
        positionCamera(camera) {
            if (ref.cameraPos) {
                camera.position.copy(ref.cameraPos.position)
                camera.lookAt(new THREE.Vector3(0, 0, 0))
            }
        }
    }
}
</script>

<style lang="scss">
.camera-path {
    .controls-wrap .controls {
        position: absolute;
        top: initial;
        height: initial;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        z-index: 10;
    }
}
</style>
