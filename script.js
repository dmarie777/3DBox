import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

//parameters for the debug GUI
const obj = {
    width: 1,
    height: 1,
    depth: 1
}

//Textures
const image = new Image();
const metalCastTexture = new THREE.Texture(image);
metalCastTexture.colorSpace = THREE.SRGBColorSpace

image.onload = ()  => {
    metalCastTexture.needsUpdate = true;
}
image.src = '/static/MetalCastRusted/MetalCastRusted001_COL_2K.png'

//canvas
const canvas = document.querySelector('canvas.webgl');

console.log(THREE);

//Create Scene
const scene = new THREE.Scene();

//Create objects, we need to create a mesh which is a combination of a geometry (the shape) and the material(how it looks)
let geometry =new THREE.BoxGeometry(obj.width, obj.height, obj.depth);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
//Add objects to the scene
scene.add(mesh);
mesh.position.set(0, obj.height, 0)


//create planeGeometry
let plane = new THREE.PlaneGeometry(5, 5);
console.log(plane);
const materialPlane = new THREE.MeshBasicMaterial({
    map: metalCastTexture
});
const planeMesh = new THREE.Mesh( plane, materialPlane );
planeMesh.rotateX(-Math.PI / 2);

planeMesh.overdraw = true;
scene.add(planeMesh);


//create size of scene
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

//resize event
window.addEventListener('resize', () => {
    //Update sizes 
    size.width = window.innerWidth
    size.height = window.innerHeight

    //Update camera 
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    //Update renderer 
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//Add the camera, there are many kinds of cameras, and we can even have many cameras in one scene
//create camera /// 35
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.x = 2
camera.position.y = 0
camera.position.z = 2
//This moves the camera to the mesh no matter its position
camera.lookAt(planeMesh.position)
scene.add(camera)

//Add renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(size.width, size.height)

//Add Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement)
controls.enableDamping = true

// add debug gui
const gui = new GUI();
gui.add(document, 'title');

gui.add(obj, 'width', 0, 1).onChange(updateGeometry);
gui.add(obj, 'height', 0, 1).onChange(updateGeometry);
gui.add(obj, 'depth', 0, 1).onChange(updateGeometry);

//update Geometry 
function updateGeometry() {
    mesh.geometry.dispose();  // Dispose of the old geometry
    mesh.geometry =new THREE.BoxGeometry(obj.width, obj.height, obj.depth);
}


//Time
let clock = new THREE.Clock();
clock.start();

//Animation
function animate() {
    
    //Time 
    let deltaTime = clock.getDelta()
    
    // Update controls
    controls.update()

    requestAnimationFrame(animate);

    mesh.rotation.x += deltaTime;
    mesh.rotation.y +=  deltaTime;
    renderer.render(scene, camera)
}
animate()
