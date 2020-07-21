require("./helper");
require("./textures");
require("./custom_shader");

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
      }),
      sunMaterial: new THREE.MeshLambertMaterial({
        map:global.sunTexture,
        transparent:true,
        alphaMap:global.sunTexture,
        emissiveMap:global.sunTexture,
        emissiveIntensity:60,
        emissive:"orange"
      }),
      customMaterial : new THREE.ShaderMaterial({
        vertexShader:global.shader.vertex,
        fragmentShader:global.shader.fragment,
        uniforms:{colorA:{type:'vec3',value:new THREE.Color(0xACB6E5)},
        colorB:{type:'vec3',value:new THREE.Color(0x74ebd5)},
        u_resolution:{type:'vec2',value:new THREE.Vector2(100,100)},
        u_mouse:{type:'vec2',value:new THREE.Vector2(5,12)},
        u_time:{type:'float',value:0}}
      })
    
}