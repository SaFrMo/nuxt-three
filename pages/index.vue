<template>

    <main class="three-examples">
    <h2>Examples</h2>

    <ul class="grid">
        <li class="item" v-for="(item, i) in items" :key="i">
            <span class="title" v-html="startCase(item)" />
            <component :is="item" />
            <nuxt-link class="link" :to="`/examples/${ item }`">…</nuxt-link>
        </li>
    </ul>
</main>


</template>

<script>
import _ from 'lodash'

export default {
    data() {
        return {
            items: ['breathing-tower', 'lighting-ref']
        }
    },
    methods: {
        startCase: _.startCase
    }
}
</script>

<style lang="scss">
.three-examples {
    font-family: $font-family;

    .link {
        text-align: center;
        &:hover,
        &:focus {
            .title {
                z-index: 5;
            }
        }
    }
    .grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .item {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px solid $black;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin: 20px;

            .title {
                border-bottom: 1px solid $black;
                padding: 8px 5px 10px;
                font-family: $header-font;
                text-transform: lowercase;
                font-weight: 700;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                background: $white;
                font-size: 16px;
                padding: 10px 5px;
                display: block;
                text-align: center;
            }
            .wrap {
                position: relative;
                flex: 1;
            }
            .three-view,
            canvas {
                pointer-events: none;
            }
            .link {
                position: absolute;
                bottom: 5px;
                left: 3px;
                text-decoration: none;
                opacity: 0;

                @include old-button;

                &:focus {
                    opacity: 1;
                }
            }
            &:hover .link {
                opacity: 1;
            }
        }
    }
}
</style>
