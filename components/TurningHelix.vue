<template>
    <div class="turning-helix">
        <canvas ref="canvas" width="248" height="248"/>

        <!-- Vertex shader -->
        <script type="shader/vertex" ref="vertex">
            attribute vec3 aPosition;
            attribute float aOffset;
            attribute float aTotal;

            uniform mat4 uProjectionMatrix;
            uniform mat4 uModelMatrix;
            uniform mat4 uViewMatrix;
            uniform float uTime;
            uniform vec2 uMouseViewportPos;

            varying vec3 color;

            void main(){
                vec3 pos = aPosition + vec3((aOffset - aTotal * uMouseViewportPos.x) * 0.1, 0., 0.);
                pos.y += sin(uTime + aOffset);
                pos.z += cos(uTime + aOffset);
                pos *= uMouseViewportPos.y;

                gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix *
                    vec4(pos, 1.0);

                color = vec3(0., sin(uTime + aOffset), cos(uTime + aOffset));
            }
        </script>

        <!-- Fragment shader -->
        <script type="shader/fragment" ref="fragment">
            precision mediump float;
            varying vec3 color;

            void main(){
                gl_FragColor = vec4(color, 1.);
            }
        </script>
    </div>
</template>

<script>
let Phenomenon
import { cube } from '~/libs/utils'

const multiplier = 100
let mousePos = [0.5, 0.5]

export default {
    async mounted() {
        Phenomenon = require('phenomenon').default

        const vertex = this.$refs.vertex.innerText
        const fragment = this.$refs.fragment.innerText

        // return shader
        this.run(this, vertex, fragment)
    },
    methods: {
        run(vm, vertex, fragment) {
            // init & mount the renderer
            const renderer = new Phenomenon({
                canvas: vm.$el.querySelector('canvas'),
                // position: { x: 0, y: 0, z: 3 },
                settings: {
                    clearColor: [239 / 255, 239 / 255, 239 / 255, 1]
                },
                shouldRender: true,
                debug: true
            })

            document.body.addEventListener('mousemove', evt => {
                mousePos = [
                    evt.x / window.innerWidth,
                    evt.y / window.innerHeight
                ]
            })

            const attributes = [
                {
                    name: 'aOffset',
                    data: i => [i],
                    size: 1
                },
                {
                    name: 'aTotal',
                    data: () => [multiplier],
                    size: 1
                }
            ]

            const uniforms = {
                uTime: {
                    type: 'float',
                    value: 0.0
                },
                uMouseViewportPos: {
                    type: 'vec2',
                    value: [0.0, 0.0]
                },
                uOffsetX: {
                    type: 'float',
                    value: 0.0
                }
            }

            renderer.add('test', {
                attributes,
                uniforms,
                vertex,
                fragment,
                multiplier,
                mode: 4,
                geometry: {
                    vertices: cube(0.2)
                },
                onRender: instance => {
                    instance.uniforms.uTime.value += 0.0166
                    instance.uniforms.uMouseViewportPos.value = mousePos
                }
            })
        }
    }
}
</script>
