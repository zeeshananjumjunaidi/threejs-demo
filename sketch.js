require("./core/setup");
require("./core/helper");
require("./core/textures");
require("./core/materials");
require("./core/lights");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });
  
  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = setupCamera();
  camera.position.set(10,5,0);
  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();
  scene.background = global.spaceTexture;

  // Setup a geometry
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
  const planeGeometry = new THREE.PlaneGeometry(1,1,10,10);


   // Setup a mesh with geometry + material
   const earthMesh = new THREE.Mesh(sphereGeometry, global.materials.earthMaterial);
  //  scene.add(earthMesh);
   // Setup Earth Atmosphere
   const earthAtmosphereMesh = new THREE.Mesh(sphereGeometry, global.materials.earthAtmosphere);
   earthAtmosphereMesh.scale.set(1.02,1.02,1.02);
  //  scene.add(earthAtmosphereMesh);
   const earth = new THREE.Group();
   earth.add(earthMesh);
   earth.add(earthAtmosphereMesh);
  scene.add(earth);

  const moonMesh = new THREE.Mesh(sphereGeometry,global.materials.moonMaterial);

  // scene.add(moonMesh);
  const moon  = new THREE.Group();
  moon.add(moonMesh);
  scene.add(moon);

  moonMesh.position.set(5,0,0);
  moonMesh.scale.set(0.2,0.2,0.2);

  // Add lights
  const sunLight = global.lights.sunLight;
  sunLight.position.set(0,0.5,40);
  scene.add(sunLight);

  const sunMesh = new THREE.Mesh(planeGeometry,global.materials.sunMaterial);
  sunMesh.position.set(sunLight.position.x,sunLight.position.y,sunLight.position.z);
  sunMesh.scale.set(2,2,2);
  scene.add(sunMesh);
  // const sunHandler = new THREE.DirectionalLightHelper(sunLight);
  // scene.add(sunHandler);
 
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      sunMesh.lookAt(camera.position);
      var animationSpeed=2;
      var earthSpinSpeed =animationSpeed* time * 0.1;
      earthAtmosphereMesh.rotation.set(0,earthSpinSpeed*1.2,0);
      earth.rotation.set(0,earthSpinSpeed,0);
      moonMesh.rotation.set(0,earthSpinSpeed*-0.3,0);
      moon.rotation.set(0,earthSpinSpeed*-0.3,0);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
