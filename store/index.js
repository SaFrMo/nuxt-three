export default {
    state() {
        return {
            blog: {},
            examples: {}
        }
    },
    mutations: {
        ADD_BLOG_ENTRY(state, { slug, content }) {
            state.blog[slug] = content
        },
        ADD_EXAMPLE_ENTRY(state, { slug, content }) {
            state.examples[slug] = content
        }
    }
}
