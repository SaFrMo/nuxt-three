<template>

    <main class="three-examples">
    <h2>Examples</h2>

    <ul class="grid">
        <li class="item" v-for="(item, i) in items" :key="i">
            <nuxt-link :to="`/${ item.slug }`">
                <span class="title" v-html="startCase(item.slug)" />
                <component :is="item.component" />
            </nuxt-link>
        </li>
    </ul>
</main>


</template>

<script>
import _ from 'lodash'

export default {
    data() {
        return {
            items: [{ slug: 'purple-tower', component: 'purple-tower' }]
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

    button {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;

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
            }
            .wrap {
                position: relative;
                flex: 1;
            }
        }
    }
}
</style>
