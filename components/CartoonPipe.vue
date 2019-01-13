<template>
    <div>
        <vue-three-wrap :start="start" :update="update" />

        <!-- Vertex shader -->
        <script id="vertexShader" type="x-shader/x-vertex">
            uniform vec2 uvScale;
            varying vec2 vUv;
            varying vec3 vNormal;
            uniform float time;

            void main() {
                vUv = uvScale * uv;

                // get extruded position
                vec3 extrude = normal * 5.;

                // current time in seconds (ie, 1.234)
                float timeInSeconds = time / 1000.;
                // speed of bulge movement
                float speed = 0.5;
                // number of divisions of this tube
                // (higher = more bulges in cartoon pipe)
                float divisions = 2.;
                // current coordinate, from 0 to 1
                float coord = fract((uv.x - timeInSeconds * speed) * divisions);
                // the higher the number, the stronger the bulge effect
                float bulgeExaggeration = 10.;
                // get intensity of current position
                float intensity = pow(smoothstep(0., 1., 1. - distance(coord, 0.5)), bulgeExaggeration);

                // build final position by mixing default position and extruded position
                vec3 pos = mix(position, position + extrude, intensity);

                vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
                vNormal = normal;

                gl_Position = projectionMatrix * mvPosition;
            }
        </script>

        <!-- Fragment shader -->
        <script type="x-shader/x-fragment" id="fragmentShader">
            varying vec3 vNormal;
            varying vec2 vUv;
            uniform vec3 color;

            void main() {
                vec3 light = vec3( 0.5, 0.2, 1.0 );
                light = normalize( light );
                float dProd = dot( vNormal, light ) * 0.5 + 0.5;
                gl_FragColor = vec4( vec3( dProd ) * vec3( color ), 1.0 );
            }
        </script>
    </div>
</template>

<script>
import VueThreeWrap from 'vue-three-wrap'
import * as THREE from 'three'

const ref = {}
let mountTime = 0

// copied from https://threejs.org/docs/index.html#api/en/geometries/TubeGeometry
function CustomSinCurve(scale) {
    THREE.Curve.call(this)

    this.scale = scale === undefined ? 1 : scale
}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype)
CustomSinCurve.prototype.constructor = CustomSinCurve

CustomSinCurve.prototype.getPoint = function(t) {
    var tx = t * 10 - 5
    var ty = Math.sin(2 * Math.PI * t) * 0.5
    var tz = 0

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale)
}

export default {
    components: {
        'vue-three-wrap': VueThreeWrap
    },
    methods: {
        async start({ scene, camera }) {
            mountTime = Date.now()
            camera.position.y = 5
            camera.position.z = 50

            // uniforms
            const uniforms = {
                amplitude: { value: 1.0 },
                color: { value: new THREE.Color(0xcc4444) },
                time: { value: Date.now() }
            }

            // shader material
            const shaderMat = new THREE.ShaderMaterial({
                uniforms,
                vertexShader: document.getElementById('vertexShader')
                    .textContent,
                fragmentShader: document.getElementById('fragmentShader')
                    .textContent
            })

            // pipe
            const path = new CustomSinCurve(10)
            const geo = new THREE.TubeGeometry(path, 64, 4, 8, false)
            ref.pipe = new THREE.Mesh(geo, shaderMat)
            // ref.pipe.rotateZ(Math.PI)
            scene.add(ref.pipe)
        },
        update() {
            ref.pipe.material.uniforms.time.value = Date.now() - mountTime
        }
    }
}
</script>
