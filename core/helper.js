global.THREE = global.THREE;

global.textureLoader = new THREE.TextureLoader();


global.setupCamera = function setupCamera(){
    // Setup a camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(0, 0, -4);
    camera.lookAt(new THREE.Vector3());
    return camera;
}