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
                    uniform float uTime;
                    varying vec4 vColor;

                    void main(){
                        vec3 finalPos = aPosition + aOffset + vec3(cos(aOffset.x + uTime) * 0.5) + vec3(0., -0.5, 0.);
                        gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(finalPos, 1.0);
                        gl_PointSize = 2.;
                        vColor = mix(vec4(0., 0., 0., 1.), vec4(1.), 0.35 - finalPos.z);
                    }
                </script>
            </template>
            
            <!-- frag -->
            <template v-slot:fragment>
                <script type="x-shader/fragment">
                    precision highp float;
                    varying vec4 vColor;

                    void main(){
                        gl_FragColor = vColor;
                    }
                </script>
            </template>
        </vue-phenomenon>
    </section>
</template>

<script>
let lastTime = Date.now()
export default {
    data() {
        return {
            radius: 3,
            cube: {
                multiplier: 5000,
                attributes: [
                    {
                        name: 'aOffset',
                        data: () => [this.rand(), this.rand(), 0],
                        size: 3,
                    },
                ],
                uniforms: {
                    uTime: {
                        value: 0.0,
                        type: 'float',
                    },
                },
                onRender: instance => {
                    instance.uniforms.uTime.value +=
                        (Date.now() - lastTime) / 500
                    lastTime = Date.now()
                },
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
