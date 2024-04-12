import * as THREE from 'three'

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
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3
scene.add(camera)

//Add renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(size.width, size.height)

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera)
}

animate()