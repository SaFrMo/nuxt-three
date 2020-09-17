<template>
    <section class="flowing-particles">
        <vue-phenomenon :options="phenomOptions" :instances="[{key: 'all'}]">
            <!-- vert -->
            <template v-slot:vertex>
                <script type="x-shader/vertex">
                    attribute vec3 aPosition;
                    
                    uniform mat4 uProjectionMatrix;
                    uniform mat4 uModelMatrix;
                    uniform mat4 uViewMatrix;

                    void main(){
                        gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(aPosition, 1.0);
                        gl_PointSize = 50.;
                    }
                </script>
            </template>
            
            <!-- frag -->
            <template v-slot:fragment>
                <script type="x-shader/fragment">
                    precision highp float;

                    void main(){
                        gl_FragColor = vec4(1., 0., 0., 1.0);
                    }
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
                    clearColor: [0, 0, 0, 1],
                    debug: true,
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
