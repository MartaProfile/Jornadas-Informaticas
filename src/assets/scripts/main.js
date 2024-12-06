/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

import '../styles/main.scss';
import * as bootstrap from 'bootstrap';
import * as THREE from 'three';


/**
 * Write any other JavaScript below
 */


// Crear la escena
const scene = new THREE.Scene();

// Crear una cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Seleccionar contenedor
const container = document.querySelector('.seccion-form');

// Crear un renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

// Función para actualizar el tamaño del renderizador
function updateRendererSize() {
  const width = container.offsetWidth;
  const height = window.innerWidth <= 768 ? 300 : 400; // Ajustar altura en móviles y tablets

  renderer.setSize(width, height); // Redimensionar el renderizador
  camera.aspect = width / height; // Actualizar la proporción de la cámara
  camera.updateProjectionMatrix(); // Actualizar la matriz de proyección
}

// Llamar a la función para establecer el tamaño inicial del renderizador
updateRendererSize();

// Crear geometrías para el candado
const bodyGeometry = new THREE.BoxGeometry(1, 1.2, 0.5);
const arcGeometry = new THREE.TorusGeometry(0.5, 0.15, 16, 100, Math.PI);
const holeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32);

// Crear materiales
const yellowMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.8 });
const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

// Cuerpo del candado
const lockBody = new THREE.Mesh(bodyGeometry, yellowMaterial);
lockBody.position.y = -0.2;

// Arco del candado
const lockArc = new THREE.Mesh(arcGeometry, yellowMaterial);
lockArc.rotation.x = Math.PI / 50;
lockArc.position.y = 0.6;

// Agujero de la llave
const keyHole = new THREE.Mesh(holeGeometry, blackMaterial);
keyHole.rotation.x = Math.PI / 2;
keyHole.position.set(0, -0.4, 0.26);

// Agrupar todas las partes del candado
const lock = new THREE.Group();
lock.add(lockBody);
lock.add(lockArc);
lock.add(keyHole);

// Añadir el candado a la escena
scene.add(lock);

// Posicionar la cámara
camera.position.z = 3;

// Animar el candado
function animate() {
  requestAnimationFrame(animate);
  lock.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();


