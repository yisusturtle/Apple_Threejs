import './styles/style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
    antialias: true,

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.set(0, 1.9, -4.8);

renderer.render(scene, camera);

const loader = new GLTFLoader();

loader.load('./modelos/mackbook.glb', function(gltf) {
    gltf.scene.position.setX(1);
    scene.add(gltf.scene);

}, undefined, function(error) {

    console.error(error);

});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/* const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(lightHelper, gridHelper, cameraHelper); */

const controls = new OrbitControls(camera, renderer.domElement);


const spaceTexture = new THREE.TextureLoader().load('./src/background.jpg')
scene.background = spaceTexture;

/* function movCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.x = t * -0.02;
    camera.position.y = t * -0.02;
}

document.body.onscroll = movCamera */

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();