<template>
    <section class="flowing-particles">
        <vue-phenomenon :instances="[{key: 'cube', settings: cube}]">
            <!-- vert -->
            <template v-slot:vertex>
                <script type="x-shader/vertex">
                    attribute vec3 aPosition;
                    attribute vec3 aOffset;
                    
                    uniform mat4 uProjectionMatrix;
                    uniform mat4 uModelMatrix;
                    uniform mat4 uViewMatrix;

                    void main(){
                        gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(aPosition + aOffset, 1.0);
                        gl_PointSize = 10.;
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
            radius: 1,
            cube: {
                multiplier: 50,
                attributes: [
                    {
                        name: 'aOffset',
                        data: (i, total) => [this.rand(), this.rand(), 0],
                        size: 3,
                    },
                ],
            },
        }
    },
    methods: {
        rand() {
            return Math.random() * this.radius - this.radius / 2
        },
    },
}
</script>

<style lang="scss">
.flowing-particles {
}
</style>
