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
        options: { type: Object, default: () => {} },
    },
    data() {
        return {
            phenom: null,
        }
    },
    async mounted() {
        if (!window) return

        if (!window.Phenomenon) {
            window.Phenomenon = require('phenomenon').default
        }

        const opts = this.options || {}

        this.phenom = new Phenomenon({
            canvas: this.$refs.canvas,
            ...opts,

            context: {
                ...(opts.context || {}),
            },

            settings: {
                devicePixelRatio: window.devicePixelRatio,
                ...(opts.settings || {}),
            },
        })

        this.$emit('instantiated', this.phenom)
    },
}
</script>

<style lang="scss">
.vue-phenomenon {
}
</style>
