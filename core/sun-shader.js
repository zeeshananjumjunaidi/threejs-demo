
//const glsl = require('glsl-noise')
var glsl = require('glslify')

if(!global.shaders){
global.shaders={};
}
global.shaders.sun={};

global.shaders.sun.fragment= glsl( /*glsl */`
    //#pragma glslify: noise = require('glsl-noise/simplex/3d')
    #pragma glslify: noise = require(glsl-noise/simplex/3d);
    #pragma glslify: aastep = require(glsl-aastep);
    
    varying vec2 vUv; 
    varying vec3 vPosition;
    uniform vec3 color;
    uniform vec3 color2;
    uniform float time;
    uniform mat4 modelMatrix;

    float sphereRim (vec3 spherePosition) {
    vec3 normal = normalize(spherePosition.xyz);
    vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
    vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
    vec3 V = normalize(cameraPosition - worldPosition);
    float rim = 1.0 - max(dot(V, worldNormal), 0.0);
    return pow(smoothstep(0.0, 1.0, rim), 0.5);
    }
    void main() {
        vec2 center = vec2(0.5,0.5);

        // a % b = mod(a,b);
        vec2 q = vUv;
        q.x *= 2.0;
        vec2 pos = mod(q*8.0,1.0);
        
        float d = distance(pos,center);

        //float mask = aastep(0.25 + sin(time*vUv.x*0.25)*0.25,d);
        
        vec2 noiseInput = q * 4.0;
        float offset = noise(vec3(noiseInput.xy * 5.0,time));

        float mask = aastep(0.25 + offset,d);
        
        mask = 1.0 - mask;
        vec3 fragColor = mix(color,color2,mask);
        
        // a value between 0..1
        float rim = sphereRim(vPosition);
        fragColor+=rim*0.3;

        gl_FragColor = vec4(fragColor,1.0);
    }
`)
global.shaders.sun.vertext = /*glsl */ `
varying vec2 vUv; 
varying vec3 vPosition;
void main() {
    vPosition = position;
    vUv = uv;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
  }
` 
