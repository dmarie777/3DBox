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
    width: window.innerWidth,
    height: window.innerHeight
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
controls.enableDamping = true

//Time
let clock = new THREE.Clock();
clock.start();

//Animation
function animate() {
    
    //Time 
    let deltaTime = clock.getDelta()
    console.log(clock, deltaTime);
    
    // Update controls
    controls.update()

    requestAnimationFrame(animate);

    mesh.rotation.x += deltaTime;
    mesh.rotation.y +=  deltaTime;
    renderer.render(scene, camera)
}
animate()
