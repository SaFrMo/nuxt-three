<template>
    <div class="lighting">
        <vue-three-wrap :start="start" :update="update" />

        <div :class="['controls-wrap', { opened: show }]">
            <button :class="[{ pressed: show }]" @click="show = !show">⚙️</button>

            <div class="controls" v-if="show">
                <ul class="list">
                    <li v-for="(light, i) in lights" :key="i">
                        <input
                            type="radio"
                            :value="light.name"
                            :id="light.name"
                            v-model="currentLight"
                        />
                        <label :for="light.name" v-html="light.name" />
                    </li>
                </ul>

                <p
                    class="description"
                    v-html="cmpLight ? cmpLight.description : ''"
                />
            </div>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three'

const ref = {}

export default {
    props: {
        showControls: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            show: false,
            lights: [],
            currentLight: 'spot'
        }
    },
    methods: {
        start({ scene, camera, renderer }) {
            camera.position.y = 0.75
            camera.position.z = 10

            renderer.shadowMap.enabled = true
            renderer.shadowMap.type = THREE.PCFSoftShadowMap
            // renderer.gammaInput = true
            // renderer.gammaOutput = true
            // reusable material
            const mat = new THREE.MeshLambertMaterial({
                color: 0xffffff
            })

            // sphere
            const geo = new THREE.SphereGeometry(4, 64, 64)
            ref.sphere = new THREE.Mesh(geo, mat)
            ref.sphere.castShadow = true
            scene.add(ref.sphere)

            // plane
            const plane = new THREE.PlaneGeometry(20, 10)
            ref.plane = new THREE.Mesh(plane, mat)
            ref.plane.position.y = -4.2
            ref.plane.rotation.set(THREE.Math.degToRad(-90), 0, 0)
            ref.plane.receiveShadow = true
            scene.add(ref.plane)

            // add lights
            const color = 0x44cc44
            // ambient
            const ambient = new THREE.AmbientLight(color)
            this.lights.push({
                name: 'ambient',
                light: ambient,
                description: 'all objects lighted equally. no shadows.'
            })
            scene.add(ambient)

            // directional
            const directional = new THREE.DirectionalLight(color, 1)
            directional.position.set(0, 1, 2)
            directional.target.position.set(0, 0, 0)
            this.lights.push({
                name: 'directional',
                light: directional,
                description: 'far away & angled. like the sun.'
            })
            scene.add(directional)

            // hemisphere
            const hemi = new THREE.HemisphereLight(color, 0xffffbb, 1)
            this.lights.push({
                name: 'hemisphere',
                light: hemi,
                description: 'top & bottom halves. smooth.'
            })
            scene.add(hemi)

            // point
            const point = new THREE.PointLight(color, 1, 100)
            point.position.set(5, 3, 10)
            this.lights.push({
                name: 'point',
                light: point,
                description: 'one point, all angles. a light bulb.'
            })
            scene.add(point)

            // spot
            const spot = new THREE.SpotLight(color)
            spot.position.set(5, 3, 10)
            spot.lookAt(ref.sphere)
            spot.castShadow = true

            this.lights.push({
                name: 'spot',
                light: spot,
                description: 'a point and a cone.'
            })
            scene.add(spot)

            // update lights
            this.updateLights()
        },
        update({ renderer }) {
            // ref.plane.rotation.y += 0.1
            renderer.gammaOutput = this.gamma
        },
        updateLights() {
            this.lights.forEach(l => {
                l.light.visible = this.currentLight == l.name
            })
        }
    },
    computed: {
        cmpLight() {
            return this.lights.find(x => x.name == this.currentLight)
        }
    },
    watch: {
        currentLight() {
            this.updateLights()
        }
    }
}
</script>

<style lang="scss">
.lighting .controls-wrap {
    position: absolute;
    top: 37px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 3px;

    button {
        @include old-button;
    }

    // controls
    .controls {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 0;
        right: 3px;
        height: 100%;
        width: 60%;
        font-size: 14px;

        & > * {
            padding: 5px;
            background: rgba(white, 0.8);
        }

        .list {
            list-style: none;
            text-align: right;
        }
        .description {
            margin: 0 0 3px;
            text-align: right;
        }
    }
}
</style>
