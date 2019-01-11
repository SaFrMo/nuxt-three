<template>

    <main class="single-example">

        <component :is="$route.params.slug" :show-controls="!articleVisible"/>

        <div :class="['content-wrap', { hidden: !articleVisible }]" ref="article">
            <div class="nav">
                <nuxt-link class="link-home" to="/">Home</nuxt-link>

                <button @click="toggleVisible">
                    {{ articleVisible ? 'hide' : 'show' }} description
                </button>
            </div>

            <article class="article" v-html="cmpContent"/>
        </div>

    </main>

</template>

<script>
import { spring, styler } from 'popmotion'

let inProgress = null

export default {
    fetch({ params, store, redirect }) {
        try {
            const content = require(`~/content/examples/${params.slug}.md`)
            store.commit('ADD_EXAMPLE_ENTRY', { slug: params.slug, content })
        } catch (err) {
            redirect('/404')
        }
    },
    data() {
        return {
            articleVisible: true,
            articleStyler: null
        }
    },
    computed: {
        cmpContent() {
            return _get(
                this,
                `$store.state.examples[${this.$route.params.slug}]`
            )
        }
    },
    methods: {
        toggleVisible() {
            // toggle visibility
            this.articleVisible = !this.articleVisible

            // build a styler
            this.articleStyler = styler(this.$refs.article)

            // stop in-progress motion
            if (inProgress) inProgress.stop()

            // save top position to make sure it's animatable by popmotion
            const y = this.$refs.article.getBoundingClientRect().top
            this.articleStyler.set('y', y)

            // create and start tween
            inProgress = spring({
                from: this.articleStyler.get('y'),
                to: this.articleVisible ? 0 : window.innerHeight - 160,
                stiffness: 300,
                damping: 20
            }).start({
                update: this.articleStyler.set('y'),
                complete: () => {
                    if (!this.articleVisible) {
                        this.articleStyler.set('y', 'calc(100% - 80px)')
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
$gap: 40px;

.single-example {
    overflow: hidden;
    @include fill(fixed);

    .home-link {
        position: absolute;
    }
    .display {
        font-size: 0;
    }
    .content-wrap {
        position: fixed;
        top: $gap;
        right: $gap;
        bottom: $gap;
        left: $gap;
        background: rgba($white, 0.9);
        border: 1px solid $black;
        padding: 40px;
        border-radius: 15px;
        max-width: 1200px;
        margin: auto;

        .nav {
            display: flex;
            justify-content: space-between;
        }
        .content {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 100%;
        }
    }
}
</style>
