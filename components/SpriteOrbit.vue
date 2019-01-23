<template>
    <vue-three-wrap
        :start="start"
        :update="update"
        class="sprite-orbit" >

        <div :class="['controls-wrap', { opened: show }]">
            <button :class="[{ pressed: show }]" @click="show = !show"><span class="emoji">⚙️</span></button>

            <div class="controls" v-if="show">
                <button @click="positionSprites">Reposition</button>
            </div>
        </div>

    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { transform, spring, stagger } from 'popmotion'
const { blendColor } = transform

let inProgress = []

const ref = {}

export default {
    data() {
        return {
            show: false,
            color1: '#FF007F',
            color2: '#460026'
        }
    },
    methods: {
        start({ scene, camera }) {
            // place center sphere
            const geo = new THREE.SphereGeometry(0.8, 30, 30)
            const mat = new THREE.MeshLambertMaterial({ color: this.color2 })
            ref.sphere = new THREE.Mesh(geo, mat)
            scene.add(ref.sphere)

            // light
            ref.light = new THREE.HemisphereLight(this.color1, this.color1)
            scene.add(ref.light)

            // place camera
            camera.position.z = 10

            // prep for sprites
            ref.sprites = new THREE.Group()
            const spriteCount = 10

            // create sprites
            for (let i = 0; i < spriteCount; i++) {
                // blend between  our two colors
                const blend = blendColor(this.color1, this.color2)

                // create a new sprite
                const sprite = new THREE.Sprite(
                    new THREE.SpriteMaterial({
                        color: new THREE.Color(blend(i / (spriteCount - 1)))
                    })
                )

                // add to sprite group
                ref.sprites.add(sprite)
            }

            // position sprites
            this.positionSprites()

            // add sprite group to scene
            scene.add(ref.sprites)
        },
        update() {
            ref.sprites.rotation.y += 0.01
        },
        positionSprites() {
            const minDistance = 2.2
            // this is misnamed - max distance will actually be maxDistance + minDistance
            const maxDistance = 3

            // stop current
            if (inProgress && inProgress.stop) {
                inProgress.stop()
            }

            // prep springs
            const springs = []

            ref.sprites.children.forEach(sprite => {
                // randomly create a new position
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
                springs.push(
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

            // start springs
            inProgress = stagger(springs, 30).start(values =>
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
