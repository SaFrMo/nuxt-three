<template>

    <main class="three-examples">

    <h2 class="section-title">Examples</h2>

    <p class="info">click <span class="sample-link">…</span> for more info</p>
    <p class="info"><a href="https://github.com/SaFrMo/nuxt-three">source for this site</a></p>

    <ul class="grid">
        <li class="item" v-for="(item, i) in items" :key="i">
            <span class="title" v-html="startCase(item)" />
            <component :is="item" />
            <nuxt-link class="link" v-if="postExists(item)" :to="`/examples/${ item }`">…</nuxt-link>
        </li>
    </ul>

    <h2 class="section-title"><a href="https://github.com/vaneenige/phenomenon" target="_blank">Phenomenon.js</a> examples</h2>
    <ul class="grid">
        <li class="item" v-for="(item, i) in phenomenonItems" :key="i">
            <span class="title" v-html="startCase(item)" />
            <component :is="item" />
            <nuxt-link class="link" v-if="postExists(item)" :to="`/examples/${ item }`">…</nuxt-link>
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
                'spinning-wheel',
                'ring-of-boxes',
                'wandering-spheres',
                'shape-clicker',
                'domino-row',
                'noise-field',
                'sprite-orbit',
                'spline-example',
                'curve-ref'
            ],
            phenomenonItems: ['turning-helix']
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
    .info {
        text-align: center;

        .sample-link {
            @include old-button(inline-block);
            position: relative;
            bottom: 3px;
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
            width: 250px;
            height: 250px;
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
            // .vue-three-wrap,
            // canvas {
            //     pointer-events: none;
            // }
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

.controls-wrap {
    position: absolute;
    top: 37px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 3px;
    pointer-events: all;

    button {
        @include old-button;
    }

    // controls
    .controls {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 0;
        right: 3px;
        height: 100%;
        width: 70%;
        max-width: 220px;
        font-size: 14px;
        text-align: right;

        & > * {
            padding: 5px;
            background: rgba(white, 0.8);
        }

        .list {
            list-style: none;
            text-align: right;
        }
        .description {
            margin: 0 0 3px;
            text-align: right;
        }
    }
}
</style>
