<template>
    <vue-three-wrap class="curve-ref" :start="start" camera-type="ortho" fov="10" :update="update" >

        <div :class="['controls-wrap', { opened: show }]">
            <button :class="[{ pressed: show }]" @click="show = !show"><span class="emoji">⚙️</span></button>

            <div class="controls" v-if="show">
                <ul class="list">
                    <li v-for="(curve, i) in curves" :key="i">
                        <input
                            type="radio"
                            :value="curve"
                            :id="curve"
                            v-model="curveType"
                        />
                        <label :for="curve" v-html="curve" />
                    </li>
                </ul>
            </div>
        </div>


    </vue-three-wrap>
</template>

<script>
import * as THREE from 'three'
import { stagger, spring } from 'popmotion'

const ref = {}
let inProgress = null

export default {
    data() {
        return {
            lineWidth: 9,
            pointCount: 25,
            curveType: 'CatmullRomCurve3',
            points: [
                new THREE.Vector3(-5, 0, 0),
                new THREE.Vector3(-3, 0, 0),
                new THREE.Vector3(3, 5, 0),
                new THREE.Vector3(5, 5, 0)
            ],
            show: false,
            curves: [
                'CatmullRomCurve3',
                // 'ArcCurve',
                // 'CubicBezierCurve',
                // 'EllipseCurve',
                // 'LineCurve',
                // 'QuadraticBezierCurve',
                // 'SplineCurve',
                // 'CubicBezierCurve3',
                'LineCurve3',
                // 'QuadraticBezierCurve3',
                'None'
            ]
        }
    },
    methods: {
        start({ scene, camera }) {
            // move camera
            camera.position.y = 3
            camera.position.z = 3

            // calculate from given vars
            const segmentLength = this.lineWidth / this.pointCount
            const startX = -this.lineWidth / 2 + segmentLength / 2
            ref.container = new THREE.Group()

            // prep geo
            const geo = new THREE.BoxGeometry()

            // prep material
            const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
            const wireMat = new THREE.MeshBasicMaterial({
                color: 0x000000,
                wireframe: true,
                opacity: 0.3,
                transparent: true
            })

            // add points
            for (let i = 0; i < this.pointCount; i++) {
                const box = new THREE.Mesh(geo, mat)
                box.add(new THREE.Mesh(geo, wireMat))
                box.position.x = startX + segmentLength * i
                box.scale.set(segmentLength, segmentLength, segmentLength)

                ref.container.add(box)
            }

            // move points
            this.updatePoints()

            scene.add(ref.container)
        },
        update() {},
        updatePoints() {
            // get new curve
            const equation = THREE[this.curveType]

            // cancel if no curve
            if (!equation && this.curveType != 'None') {
                return
            }

            // build curve
            let curve = null
            if (this.curveType == 'LineCurve3') {
                curve = new equation(
                    this.points[0],
                    this.points[this.points.length - 1]
                )
            } else if (this.curveType == 'None') {
                curve = new THREE.LineCurve3(
                    new THREE.Vector3(this.startX, 0, 0),
                    new THREE.Vector3(this.startX + this.lineWidth, 0, 0)
                )
            } else {
                curve = new equation(this.points)
            }

            // stop existing animation
            if (inProgress && inProgress.stop) {
                inProgress.stop()
            }

            // prep to build springs
            const springs = []

            // build springs
            ref.container.children.forEach((child, i) => {
                // get point
                const progress = i / this.pointCount
                const point = curve.getPointAt(progress)

                // add spring to point
                springs.push(
                    new spring({
                        from: { y: child.position.y },
                        to: { y: point.y }
                    })
                )
            })

            // start animation
            inProgress = stagger(springs, 20).start(values =>
                values.forEach((v = null, i) => {
                    if (v !== null) {
                        ref.container.children[i].position.y = v.y
                    }
                })
            )
        }
    },
    watch: {
        curveType() {
            this.updatePoints()
        }
    }
}
</script>
