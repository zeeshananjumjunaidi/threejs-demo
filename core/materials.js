require("./helper");
require("./textures");
require("./custom_shader");
require("./sun-shader");

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
        opacity:0.7,
        color:"gray",
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
      sunMaterial:  new THREE.ShaderMaterial({
        vertexShader:global.shaders.sun.vertext,
        fragmentShader:global.shaders.sun.fragment,
        uniforms:{
          time:{value:0},
          color:{value:new THREE.Color('#ff0')},  
          color2:{value:new THREE.Color('#fc0')}  
        },extensions:{
          derivatives:true
        }
      }),
      customMaterial : new THREE.ShaderMaterial({
        vertexShader:global.shaders.sun.vertext,
        fragmentShader:global.shaders.sun.fragment,
        uniforms:{
          time:{value:0},
          color:{value:new THREE.Color('#ff0')},  
          color2:{value:new THREE.Color('#f50')}  
        },extensions:{
          derivatives:true
        }
      })
    
}