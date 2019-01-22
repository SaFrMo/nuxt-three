<template>

    <main :class="['single-example', { 'article-hidden': !articleVisible }]">

        <component :is="$route.params.slug" :show-controls="!articleVisible"/>

        <div :class="['content-wrap', { hidden: !articleVisible }]" ref="article">
            <div class="nav">
                <nuxt-link class="link-home" to="/">home</nuxt-link>

                <h1 class="title" v-html="cmpTitle"/>

                <button @click="toggleVisible" class="toggle-visible">
                    {{ articleVisible ? 'hide' : 'show' }} description
                </button>
            </div>

            <article class="content" v-html="cmpContent"/>
        </div>

    </main>

</template>

<script>
import { spring, styler } from 'popmotion'
import _startCase from 'lodash/startCase'

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
        cmpTitle() {
            return _startCase(_get(this, '$route.params.slug', ''))
        },
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
                from: this.articleVisible ? window.innerHeight - 140 : 0,
                to: this.articleVisible ? 0 : window.innerHeight - 140,
                stiffness: 200,
                damping: 28
            }).start({
                update: this.articleStyler.set('y'),
                complete: () => {
                    if (!this.articleVisible) {
                        this.articleStyler.set('y', 'calc(100% - 60px)')
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
$gap: 40px;
$mobile-gap: 20px;

.single-example {
    overflow: hidden;
    @include fill(fixed);

    .controls-wrap {
        transition: opacity 0.3s;
        position: absolute;
    }
    &:not(.article-hidden) .controls-wrap {
        opacity: 0;
    }

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
        overflow-y: auto;

        .nav {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            .title {
                text-align: center;
                text-transform: lowercase;
                font-size: 18px;
            }
            .toggle-visible {
                text-align: right;
            }
        }
        .content {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: calc(100% - 50px);
            margin-top: 50px;
            line-height: 1.4;

            & > * {
                margin: 20px auto;
                max-width: 600px;

                &:first-child {
                    margin-top: 0;
                }
            }
            li {
                margin-bottom: 20px;
            }

            // code examples
            code {
                background: $black;
                display: inline-block;
                color: $white;
                padding: 20px;
                margin: 20px auto;
                border-radius: 15px;
                max-width: 100%;
                overflow-x: auto;
            }

            pre > code {
                width: 100%;
            }

            p > code {
                padding: 2px 5px;
                border-radius: 5px;
                margin: 0;
                position: relative;
                top: 5px;
                width: initial;
            }
        }
    }
}

@media (#{ $mobile }) {
    .single-example {
        .content-wrap {
            right: $mobile-gap;
            left: $mobile-gap;
            padding: 20px 20px;
            overflow-y: hidden;

            .nav {
                grid-template-columns: 100%;

                .title,
                .toggle-visible {
                    text-align: right;
                    padding: 0;
                }
            }
            .content {
                -webkit-overflow-scrolling: touch;
                margin-top: 22px;
                padding-bottom: 20px;

                ul,
                ol {
                    padding: 0;
                }
            }
        }
    }
}
</style>
