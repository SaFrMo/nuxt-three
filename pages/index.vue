<template>

    <main class="three-examples">

        <!-- examples of work -->
        <h2 class="section-title">Examples</h2>
        <ul class="grid">
            <li class="item" v-for="(item, i) in items" :key="i">
                <span class="title" v-html="startCase(item)" />
                <component :is="item" />
                <nuxt-link class="link" v-if="postExists(item)" :to="`/examples/${ item }`">…</nuxt-link>
            </li>
        </ul>

        <!-- utilities -->
        <h2 class="section-title">Utilities</h2>
        <ul class="grid">
            <li class="item">
                <span class="title">Info Textures</span>

                <nuxt-link class="link" to="/utilities/info-textures">...</nuxt-link>
            </li>
        </ul>
    </main>


</template>

<script>
import _startCase from 'lodash/startCase'

export default {
    data() {
        return {
            items: [
                'breathing-tower',
                'lighting-ref',
                'cartoon-pipe',
                'box-of-boxes',
                'rotating-lights',
                'trailing-pyramid',
                'ring-of-boxes',
                'wandering-spheres',
                'shape-clicker'
            ]
        }
    },
    methods: {
        startCase: _startCase,
        postExists(slug) {
            // check if a blog post for the given example exists
            try {
                require(`~/content/examples/${slug}.md`)
            } catch (err) {
                return false
            }

            return true
        }
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
    .section-title {
        font-family: $header-font;
        text-align: center;
        padding: 40px 20px 15px;
        margin: 0 auto;
        text-transform: lowercase;
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
                // opacity: 0;

                @include old-button;

                // &:focus {
                //     opacity: 1;
                // }
            }
            // &:hover .link {
            //     opacity: 1;
            // }
        }
    }
}
</style>
