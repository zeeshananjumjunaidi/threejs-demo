require("./helper")

global.THREE = global.THREE;

global.earthTexture = {
     diffuse : textureLoader.load("textures/earth.diffuse.2k.jpg"),
     specular : textureLoader.load("textures/earth.spec.2k.jpg"),
     bump : textureLoader.load("textures/earth.bump.2k.jpg"),
     lights : textureLoader.load("textures/earth.lights.2k.jpg"),
     clouds : textureLoader.load("textures/earth.cloud.2k.jpg"),
     cloudAlpha : textureLoader.load("textures/earth.cloud-transparent.2k.jpg")
}

global.moonTexture = {
    diffuse : textureLoader.load("textures/moon.diffuse.2k.jpg"),
    bump : textureLoader.load("textures/moon.bump.2k.jpg")
}

global.spaceTexture = textureLoader.load("textures/stars.jpg");