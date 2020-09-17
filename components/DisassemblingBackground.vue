<template>
    <section class="disassembling-background">
        <vue-phenomenon 
            :options="{ settings: { clearColor: [0,0,0,1] } }" 
            :instances="[{key: 'cube', settings: cube}]">
            
            <!-- vert -->
            <template v-slot:vertex>
                <script type="x-shader/vertex">
                    attribute vec3 aPosition;
                    attribute vec2 aGridPosition;
                    
                    uniform mat4 uProjectionMatrix;
                    uniform mat4 uModelMatrix;
                    uniform mat4 uViewMatrix;
                    uniform float uProgress;
                    
                    // TODO: convert gl points to 3d planes
                    // TODO: move on 3d bezier to single point, then stack vertically

                    void main(){
                        vec3 gridPosition = vec3(aGridPosition * 0.2, 0.);
                        vec3 bringToCamera = vec3(0., 0., 1.);
                        
                        vec3 finalPos = aPosition + gridPosition + bringToCamera;
                        
                        gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(finalPos, 1.0);
                        gl_PointSize = 60.;
                    }
                </script>
            </template>
            
            <!-- frag -->
            <template v-slot:fragment>
                <script type="x-shader/fragment">
                    precision highp float;

                    void main(){
                        gl_FragColor = vec4(1.);
                    }
                </script>
            </template>
            
        </vue-phenomenon>
    </section>
</template>

<script>
const perRow = 8
const perColumn = 11
export default {
    data() {
        return {
            radius: 3,
            cube: {
                multiplier: perRow * perColumn,
                attributes: [
                    {
                        name: 'aGridPosition',
                        data: (i, total) => [
                            (i % perColumn) - Math.floor(perColumn / 2),
                            Math.floor(i / perColumn) - Math.floor(perRow / 2),
                        ],
                        size: 2,
                    },
                ],
                uniforms: {
                    uProgress: {
                        value: 0.0,
                        type: 'float',
                    },
                },
                onRender: instance => {
                    instance.uniforms.uProgress.value = Math.sin(
                        Date.now() / 500
                    )
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
.disassembling-background {
}
</style>
