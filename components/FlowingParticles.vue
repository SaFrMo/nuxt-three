<template>
    <section class="flowing-particles">
        <vue-phenomenon>
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
export default {}
</script>

<style lang="scss">
.flowing-particles {
}
</style>
