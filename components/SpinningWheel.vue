<template>
    <vue-three-wrap :start="start" renderType="css" :class="['css', { ready }]">
        <div
            class="spoke"
            v-for="(entry, i) in entries"
            :key="i">

            <button @click="index++">↑</button>

            <p>{{ entry }}</p>

            <button @click="index--">↓</button>

        </div>
    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { spring } from 'popmotion'

const ref = {}
let inProgress = null

export default {
    data() {
        return {
            ready: false,
            entries: ['🙂', '😎', '😂', '😔', '🐄', '🍎'],
            radius: 120,
            index: 0
        }
    },
    methods: {
        start({ scene, camera, renderer, elements, CSS }) {
            // new CSS3DObject for each element
            ref.objects = elements.map(e => new CSS.CSS3DObject(e))

            ref.container = new THREE.Group()

            // place & add to scene
            ref.objects.forEach((o, i) => {
                ref.container.add(o)
                o.position.set(this.getPoint(i).x, this.getPoint(i).y, 0)

                // rotate so we'll be facing up when we land at the right spot
                const angle = Math.atan2(o.position.y, o.position.x)
                o.rotation.z = angle
            })

            camera.position.z = 80
            ref.container.position.set(-120, 0, 0)

            scene.add(ref.container)

            this.ready = true
        },
        getPoint(currentPoint) {
            let angle = -(2 * Math.PI) / this.entries.length

            this.angle = angle * currentPoint
            const x = Math.cos(this.angle) * this.radius
            const y = Math.sin(this.angle) * this.radius

            return { x, y }
        }
    },
    watch: {
        index(newVal) {
            if (inProgress) {
                inProgress.stop()
            }

            inProgress = spring({
                from: ref.container.rotation.z,
                to: ((Math.PI * 2) / this.entries.length) * newVal,
                stiffness: 280
            }).start(v => {
                ref.container.rotation.z = v
            })
        }
    }
}
</script>

<style lang="scss">
.vue-three-wrap.css {
    &:not(.ready) .spoke {
        opacity: 0;
    }

    .spoke {
        width: 80px;
        height: 80px;
        background: white;
        border: 1px solid #222;
        pointer-events: all;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        button {
            cursor: pointer;
            background: #ccc;
            width: 100%;

            &:hover,
            &:focus {
                background: #dedede;
            }
        }
        p {
            flex: 1;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            left: 2.5px;
        }
    }
}
</style>
