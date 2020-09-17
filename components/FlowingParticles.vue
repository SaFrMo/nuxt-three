<template>
    <section class="flowing-particles">
        <vue-phenomenon :width="248" :height="248" :options="phenomOptions">
            <!-- vert -->
            <template v-slot:vertex>
                <script type="x-shader/vertex">
                    // test vert
                </script>
            </template>
            
            <!-- frag -->
            <template v-slot:fragment>
                <script type="x-shader/fragment">
                    // test frag
                </script>
            </template>
        </vue-phenomenon>
    </section>
</template>

<script>
export default {
    data() {
        return {
            phenomOptions: {
                settings: {
                    clearColor: [1, 0, 0, 1],
                },
            },
        }
    },
}
</script>

<style lang="scss">
.flowing-particles {
}
</style>
