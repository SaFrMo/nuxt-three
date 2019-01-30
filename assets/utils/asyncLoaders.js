import * as THREE from 'three'

export const loadTexture = async path => {
    return new Promise((res, rej) => {
        new THREE.TextureLoader().load(path, res)
    })
}

export const wait = function(length) {
    return new Promise(function(res, rej) {
        setTimeout(res, length)
    })
}
