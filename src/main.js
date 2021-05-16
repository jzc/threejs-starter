import * as THREE from "three";
import * as dat from "dat.gui";

// setup three.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(.1, .1, .1));
document.getElementById("container").appendChild(renderer.domElement);

// setup cube
const initialColor = "#6276c0";
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial( { color: initialColor } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// setup light

const light = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));
light.position.set(5, 5, 5);

camera.position.z = 5;

// setup gui

let gui = new dat.GUI();
let config = {
    _color: initialColor,
    set color(x) {
	this._color = x;
	material.color.set(x);
    },
    get color() {
	return this._color;
    }
};
gui.addColor(config, "color");

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();
