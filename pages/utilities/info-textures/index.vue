<template>

    <main class="info-textures">

        <h1 class="title">Info Textures</h1>

        <div class="canvas-wrap">
            <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"/>

        </div>

        <div class="controls">

            <div class="x">
                <div>
                    <input type="color" id="low-x" v-model="lowX">
                    <label for="low-x">X Low</label>
                </div>

                <div>
                    <input type="color" id="hight-x" v-model="highX">
                    <label for="high-x">X High</label>
                </div>
            </div>

            <div class="y">
                <div>
                    <input type="color" id="low-y" v-model="lowY">
                    <label for="low-y">Y Low</label>
                </div>

                <div>
                    <input type="color" id="hight-y" v-model="highY">
                    <label for="high-y">Y High</label>
                </div>
            </div>

            <div class="dimensions">
                <div>
                    <input type="number" v-model="canvasWidth" id="canvasWidth">
                    <label for="canvasWidth">Canvas Width</label>
                </div>

                <div>
                    <input type="number" v-model="canvasHeight" id="canvasHeight">
                    <label for="canvasWidth">Canvas Height</label>
                </div>
            </div>

        </div>

    </main>

</template>

<script>
export default {
    data() {
        return {
            lowX: '#000000',
            highX: '#ff0000',
            lowY: '#000000',
            highY: '#00ff00',
            canvasWidth: 512,
            canvasHeight: 512
        }
    }
}
</script>

<style lang="scss">
.info-textures {
    .title {
        text-align: center;
        margin-top: 40px;
        font-family: $header-font;
        text-transform: lowercase;
    }
    canvas {
        max-width: 100%;
        margin: auto;
        display: block;
    }
}
</style>
