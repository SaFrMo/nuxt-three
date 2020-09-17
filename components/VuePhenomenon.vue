<template>
    <section class="vue-phenomenon">
        <canvas :width="width" :height="height" ref="canvas"/>
        <slot name="vertex"/>
        <slot name="fragment"/>
    </section>
</template>

<script>
export default {
    props: {
        width: { type: Number, default: 300 },
        height: { type: Number, default: 150 },
        phenomenonOptions: { type: Object, default: () => {} },
    },
    async mounted() {
        if (!window) return

        if (!window.Phenomenon) {
            window.Phenomenon = require('phenomenon').default
        }

        await this.$nextTick()

        const { vertex, fragment, canvas } = this.$slots
        console.log(canvas ? canvas : this.$refs.canvas)

        new Phenomenon({
            canvas: this.$refs.canvas,
            ...this.phenomenonOptions,

            context: {
                ...(this.phenomenonOptions.context || {}),
            },

            settings: {
                ...(this.phenomenonOptions.settings || {}),
            },
        })

        // const vertex = this.$refs.vertex.innerText
        // const fragment = this.$refs.fragment.innerText
        //
        // // return shader
        // this.run(this, vertex, fragment)
        //
    },
}
</script>

<style lang="scss">
.vue-phenomenon {
}
</style>
