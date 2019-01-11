<template>

    <main class="single-example">

        <component :is="$route.params.slug"/>

        <div class="content-wrap">
            <nuxt-link class="link-home" to="/">Home</nuxt-link>

            <article class="article" v-html="cmpContent"/>
        </div>

    </main>

</template>

<script>
export default {
    fetch({ params, store, redirect }) {
        try {
            const content = require(`~/content/examples/${params.slug}.md`)
            store.commit('ADD_EXAMPLE_ENTRY', { slug: params.slug, content })
        } catch (err) {
            redirect('/404')
        }
    },
    computed: {
        cmpContent() {
            return _get(
                this,
                `$store.state.examples[${this.$route.params.slug}]`
            )
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

        .content {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 100%;
        }
    }
}
</style>
