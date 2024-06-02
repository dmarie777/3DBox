import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//canvas
const canvas = document.querySelector('canvas.webgl')

console.log(THREE);

//Create Scene
const scene = new THREE.Scene();

//Create objects, we need to create a mesh which is a combination of a geometry (the shape) and the material(how it looks)
const geometry =new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

//Add objects to the scene
scene.add(mesh)

//Add the camera, there are many kinds of cameras, and we can even have many cameras in one scene
//create size of scene
const size = {
    width: 800,
    height: 600
}
//create camera /// 35
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.x = 2
camera.position.y = 0
camera.position.z = 2
//This moves the camera to the mesh no matter its position
camera.lookAt(mesh.position)

scene.add(camera)

//Add renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(size.width, size.height)

//Add Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement)

//Time
let clock = new THREE.Clock();
clock.start();

//Animation
function animate() {
    
    //Time 
    let deltaTime = clock.getElapsedTime()
    console.log(deltaTime);
    
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.001 * deltaTime;
    mesh.rotation.y += 0.001 * deltaTime;

    renderer.render(scene, camera)
}
animate()
