require("./helper");
require("./textures");

global.materials = {

    earthMaterial : new THREE.MeshStandardMaterial({
        map:global.earthTexture.diffuse,
        bumpMap:global.earthTexture.bump,
        bump:0.01, bumpScale:0.01,
        emissiveMap:global.earthTexture.lights,fog:true,
        emissive:"#111",
        emissiveIntensity:11    
      }),

      earthAtmosphere : new THREE.MeshStandardMaterial({
        map:global.earthTexture.clouds,
        transparent:true,
        opacity:0.31,
        color:"black",
        alphaMap:earthTexture.cloudAlpha
      }),

      moonMaterial: new THREE.MeshLambertMaterial({
          map:global.moonTexture.diffuse,
          bump:global.moonTexture.bump
      }),
      space: new THREE.MeshBasicMaterial({
          map:global.spaceTexture,
          side:THREE.DoubleSide
      })
    
}