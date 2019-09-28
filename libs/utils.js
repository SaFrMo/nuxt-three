// random between -val and val
export const random = function(val) {
    return -val + Math.random() * val * 2
}

// cube geometry
export const cube = function(size) {
    return [
        { x: size, y: size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: -size },
        { x: size, y: -size, z: size },
        { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: -size },
        { x: -size, y: size, z: size },
        { x: -size, y: -size, z: -size },
        { x: -size, y: -size, z: size },
        { x: -size, y: size, z: size },
        { x: -size, y: size, z: -size },
        { x: -size, y: size, z: size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: size },
        { x: size, y: size, z: size },
        { x: size, y: size, z: -size },
        { x: -size, y: -size, z: size },
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: size },
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: -size },
        { x: size, y: -size, z: size },
        { x: -size, y: size, z: size },
        { x: -size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: -size, y: -size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: size, y: size, z: -size },
        { x: size, y: -size, z: -size },
        { x: -size, y: size, z: -size },
        { x: size, y: -size, z: -size },
        { x: -size, y: -size, z: -size },
        { x: -size, y: size, z: -size }
    ]
}
