<template>
    <vue-three-wrap
        :start="start"
        :update="update"
        class="sprite-orbit" >

        <div :class="['controls-wrap', { opened: show }]">
            <button :class="[{ pressed: show }]" @click="show = !show">⚙️</button>

            <div class="controls" v-if="show">
                <button @click="positionSprites">Reposition</button>
            </div>
        </div>

    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { transform, spring, stagger } from 'popmotion'
//const OrbitControls = require('three-orbit-controls')(THREE)
const { blendColor } = transform

let inProgress = []

const ref = {}

export default {
    data() {
        return {
            offsetX: 0,
            offsetY: 0,
            noiseSpeed: {
                x: 0.05,
                y: 0.02
            },
            show: false,
            color1: '#FF007F',
            color2: '#460026'
        }
    },
    methods: {
        start({ scene, camera }) {
            // place cube
            const geo = new THREE.SphereGeometry(0.8)
            const mat = new THREE.MeshLambertMaterial({ color: 0x050505 })
            ref.sphere = new THREE.Mesh(geo, mat)
            scene.add(ref.sphere)

            // light
            ref.light = new THREE.HemisphereLight(this.color1, this.color1)
            scene.add(ref.light)

            // place camera
            camera.position.z = 10
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            // prep for sprites
            ref.sprites = new THREE.Group()
            const spriteCount = 10

            // place sprites
            for (let i = 0; i < spriteCount; i++) {
                const blend = blendColor(this.color1, this.color2)
                const sprite = new THREE.Sprite(
                    new THREE.SpriteMaterial({
                        color: new THREE.Color(blend(i / (spriteCount - 1)))
                    })
                )

                ref.sprites.add(sprite)
            }
            this.positionSprites()
            scene.add(ref.sprites)

            // controls
            //new OrbitControls(camera)
        },
        update() {
            ref.sprites.rotation.y += 0.01
        },
        positionSprites() {
            const minDistance = 2.2
            const maxDistance = 3

            // stop current
            if (inProgress && inProgress.stop) {
                inProgress.stop()
            }

            // prep tweens
            const tweens = []

            ref.sprites.children.forEach(sprite => {
                const newPos = {
                    x:
                        Math.random() * maxDistance +
                        minDistance * (Math.random() > 0.5 ? -1 : 1),
                    y:
                        Math.random() * maxDistance +
                        minDistance * (Math.random() > 0.5 ? -1 : 1),
                    z:
                        Math.random() * maxDistance +
                        minDistance * (Math.random() > 0.5 ? -1 : 1)
                }
                tweens.push(
                    spring({
                        from: {
                            x: sprite.position.x,
                            y: sprite.position.y,
                            z: sprite.position.z
                        },
                        to: newPos,
                        damping: 12
                    })
                )
            })

            // start tweens
            inProgress = stagger(tweens, 30).start(values =>
                values.forEach((v = -1, i) => {
                    const current =
                        v == -1 ? ref.sprites.children[i].position : v
                    ref.sprites.children[i].position.set(v.x, v.y, v.z)
                })
            )
        }
    }
}
</script>

<style lang="scss">
.grid .item .vue-three-wrap.sprite-orbit {
    .controls-wrap .controls {
        justify-content: flex-end;
        padding-right: 5px;
        padding-bottom: 8px;
    }
}
</style>
