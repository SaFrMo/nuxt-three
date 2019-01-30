<template>
    <vue-three-wrap
        class="some-texturing"
        :start="start"
        v-if="readyToShow"/>

    <p class="texture-loading" v-else>(this one takes longer to load)</p>
</template>

<script>
import * as THREE from 'three'
import { transform } from 'popmotion'
import { loadTexture, wait } from '~/assets/utils/asyncLoaders'

const ref = {}

export default {
    data() {
        return {
            readyToShow: false,
            show: false
        }
    },
    methods: {
        start({ scene, camera }) {
            const geo = new THREE.BoxGeometry()
            const mat = new THREE.MeshBasicMaterial({ color: 0xffffff })

            // this should wait for the canvas in question to render,
            // but this is just a proof-of-concept

            console.log('starting')

            setTimeout(() => console.log(this), 2000)

            setTimeout(() => {
                const canvas = document.querySelector('.curve-ref canvas')
                ref.texture = new THREE.Texture(canvas)
                mat.map = ref.texture

                ref.cube = scene.add(new THREE.Mesh(geo, mat))

                camera.position.set(1, 1, 1)
                camera.lookAt(ref.cube.position)

                ref.texture.needsUpdate = true
                this.readyToShow = true

                console.log(this)
            }, 3000)
        }
    }
}
</script>

<style lang="scss">
.texture-loading {
    margin-top: 50px;
    text-align: center;
}
</style>
