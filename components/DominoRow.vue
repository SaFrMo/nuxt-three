<template>
    <vue-three-wrap :start="start" renderType="css" :class="['css', { ready }]">
        <p class="stone" v-for="i in 20">
            <span class="interact">Hover me!</span>

            <span>#{{ i }}</span>
        </p>
    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { tween, easing } from 'popmotion'

const ref = {}

export default {
    data() {
        return {
            ready: false
        }
    },
    methods: {
        start({ scene, camera, renderer, elements, CSS }) {
            // new CSS3DObject for each element
            ref.objects = elements.map(e => new CSS.CSS3DObject(e))

            // place & add to scene
            ref.objects.forEach((o, i) => {
                o.position.set(0, 0, i * -100)
                scene.add(o)
            })

            // move camera from far above to last item
            tween({
                from: { x: -40, y: 500, z: camera.position.z },
                to: { x: 70, y: 150, z: -1800 },
                flip: Infinity,
                duration: 15000,
                ease: easing.easeInOut
            }).start(v => {
                camera.position.x = v.x
                camera.position.y = v.y
                camera.position.z = v.z
                camera.lookAt(new THREE.Vector3(-40, camera.position.y, -2000))
            })

            this.ready = true
        }
    }
}
</script>

<style lang="scss">
.vue-three-wrap.css {
    &:not(.ready) .stone {
        opacity: 0;
    }

    .stone {
        background: tomato;
        width: 100px;
        height: 150px;
        transform-origin: center bottom;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        text-align: center;

        .interact {
            background: white;
            border-radius: 10px;
            padding: 10px 0;
            pointer-events: all;
            cursor: cell;
            margin-bottom: 10px;
            transition: background 0.4s, color 0.4s;

            &:hover {
                background: rgba(black, 0.4);
                color: white;
            }
        }
    }
}
</style>
