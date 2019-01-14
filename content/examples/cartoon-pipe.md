I'm pretty excited about this one!

I wanted an effect of an item being pushed through a pipe, like you sometimes see in old cartoons:

<video src="/video/popeye.mp4" muted controls width="600" height="400"></video>

The pipe itself is a cool trick from the documentation ([link](https://threejs.org/docs/index.html#api/en/geometries/TubeGeometry)) that creates a curve and places a tube along that curve. I think this example could get away with any kind of geometry, but a tube is perfect for the pipe theme.

After placing the pipe, I added a new material with and linked it to an in-document shader like this:

```
// This is some arbitrary data we'll be passing to our shader
const uniforms = {
    amplitude: { value: 1.0 },
    color: { value: new THREE.Color(0xcc4444) },
    time: { value: Date.now() }
}

// shader material
const shaderMat = new THREE.ShaderMaterial({
    uniforms: uniforms,

    // the `vertex shader` figures out the position of each vertex in the model
    // we'll tell it to look for an HTML element with the ID "vertexShader"
    vertexShader: document.getElementById('vertexShader')
        .textContent,

    // the `fragment shader` figures out the color of each pixel of the model
    // we'll tell it to look for an HTML element with the ID "fragmentShader"
    fragmentShader: document.getElementById('fragmentShader')
        .textContent
})
```

Adding a shader to a material really opens up the power of WebGL to THREE.js - you can do [all](https://threejs.org/examples/?q=shader#webgl_shader_lava) [sorts](https://threejs.org/examples/?q=shader#webgl_shaders_ocean2) of [amazing](https://threejs.org/examples/?q=shader#webgl_shaders_ocean) [things](https://threejs.org/examples/?q=shader#webgl_shader) with shaders.
