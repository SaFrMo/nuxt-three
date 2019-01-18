<template>
    <vue-three-wrap :start="start" renderType="css" class="css">
        <p class="stone" v-for="i in 20"><span>{{ i }}</span></p>
    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'

const ref = {}

export default {
    methods: {
        start({ scene, camera, renderer, elements, CSS }) {
            ref.objects = elements.map(e => new CSS.CSS3DObject(e))
            ref.objects.forEach((o, i) => {
                if (o === undefined) return
                o.position.set(0, 0, i * -100)
                scene.add(o)
            })

            camera.position.set(100, 100, 150)
            camera.lookAt(new THREE.Vector3(0, 100, -250))
        }
    }
}
</script>

<style lang="scss">
.vue-three-wrap.css {
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
    }
}
</style>
