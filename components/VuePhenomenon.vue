<template>
    <section class="vue-phenomenon">
        <canvas ref="canvas"/>
        <slot name="vertex"/>
        <slot name="fragment"/>
    </section>
</template>

<script>
import get from 'lodash/get'

export default {
    props: {
        options: { type: Object, default: () => {} },
        instances: { type: Array, default: () => [] },
    },
    data() {
        return {
            phenom: null,
            addedKeys: [],
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

        // done mounting phenomenon
        this.$emit('instantiated', this.phenom)

        this.refreshInstances()
    },
    methods: {
        refreshInstances(hardRefresh = false) {
            if (!this.phenom) {
                console.warn('Phenomenon not initialized.')
                return
            }

            // TODO: hard refresh
            if (hardRefresh) {
            }

            for (let instance of this.instances) {
                console.log(instance)
                // already added, ignore
                if (this.addedKeys.includes(instance.key)) {
                    continue
                }

                const vertex =
                    get(instance, 'settings.vertex', null) ||
                    get(this.$slots, 'vertex[0].children[0].text', '')
                const fragment =
                    get(instance, 'settings.fragment', null) ||
                    get(this.$slots, 'fragment[0].children[0].text', '')

                this.phenom.add(instance.key, {
                    vertex,
                    fragment,
                    ...instance.settings,
                })
            }
        },
    },
}
</script>

<style lang="scss">
.vue-phenomenon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;

    canvas {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
