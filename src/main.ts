import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let width = window.innerWidth
let height = window.innerHeight

window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
 })

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')!,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(width, height);
camera.position.setZ(30);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

function addStar()
{
    const geometry = new THREE.SphereGeometry(0.1, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(undefined).map(() => THREE.MathUtils.randFloatSpread (100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(1000).fill(undefined).forEach(addStar);

function moveCamera()
{
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();