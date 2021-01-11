import * as THREE from "three";

let Colors = {
  red: 0xf25346,
  white: 0xdde3f1,
  pink: 0xDA75BE,
  purple: 0x8F75DA,
  blue: 0x68c3c0,
  lightblue: 0x8FE8E5,
  aqua: 0x18D1CB
};

let scene,
  camera,
  fov,
  aspectRatio,
  nearPlane,
  farPlane,
  HEIGHT,
  WIDTH,
  renderer,
  container;

const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();

  if (window.location.pathname.includes("contact")) {
    scene.fog = new THREE.Fog(0xFAE0F7, 100, 950);
  } else if (window.location.pathname.includes("projects")) {
    scene.fog = new THREE.Fog(0x8ce2db, 100, 950);
  } else {
    scene.fog = new THREE.Fog(0xD2F3F0, 100, 950);
  }

  aspectRatio = WIDTH / HEIGHT;
  fov = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  container = document.getElementById("world");
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", handleWindowResize, false);
  window.addEventListener("mousemove", handleMouseMove, false);
  // window.addEventListener("mouseleave", )
};

const handleMouseMove = (e) => {
  let arcX = e.clientX / window.innerWidth - 0.5;
  let arcY = e.clientY / window.innerHeight - 0.5;
  
  // only do this on desktop
  if (window.innerWidth > 1200) {
    camera.position.x = 0 + 150 * arcX;
    camera.position.y = 100 - 100 * arcY;
    camera.updateMatrix();
  }
}

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;

  // call this after any change of parameters
  camera.updateProjectionMatrix();
};

let hemisphereLight, shadowLight;

const createLights = () => {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

  shadowLight.position.set(150, 350, 350);

  shadowLight.castShadow = true;

  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;

  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
};

const Sea = function () {
  let geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

  geom.mergeVertices();

  let l = geom.vertices.length;

  this.waves = [];

  for (let i = 0; i < l; i++) {
    let v = geom.vertices[i];

    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random() * Math.PI * 2,
      amp: 5 + Math.random() * 15,
      speed: 0.016 + Math.random() * 0.032,
    });
  }

  let mat;
  if (window.location.pathname.includes("contact")) {
    mat = new THREE.MeshPhongMaterial({
      color: Colors.pink,
      transparent: true,
      opacity: 0.85,
      shading: THREE.FlatShading,
    });
  } else if (window.location.pathname.includes("projects")) {
    mat = new THREE.MeshPhongMaterial({
      color: Colors.aqua,
      transparent: true,
      opacity: 0.85,
      shading: THREE.FlatShading,
    });
  } else {
    mat = new THREE.MeshPhongMaterial({
      color: Colors.red,
      transparent: true,
      opacity: 0.85,
      shading: THREE.FlatShading,
    });
  }

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
};

Sea.prototype.moveWaves = function () {
  let verts = this.mesh.geometry.vertices;
  let l = verts.length;

  for (let i = 0; i < l; i++) {
    let v = verts[i];

    let vprops = this.waves[i];

    v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

    vprops.ang += vprops.speed;
  }

  this.mesh.geometry.verticesNeedUpdate = true;
  sea.mesh.rotation.z += 0.002;
};

const Cloud = function () {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "cloud";
  let geom = new THREE.BoxGeometry(20, 20, 20);
  let mat = new THREE.MeshPhongMaterial({
    color: Colors.white,
  });

  let nBlocs = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < nBlocs; i++) {
    let m = new THREE.Mesh(geom.clone(), mat);

    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;

    let s = 0.1 + Math.random() * 0.9;
    m.scale.set(s, s, s);
    this.mesh.add(m);
    m.castShadow = true;
    m.receiveShadow = true;
  }
};

Cloud.prototype.rotate = function () {
  let l = this.mesh.children.length;
  for (let i = 0; i < l; i++) {
    let m = this.mesh.children[i];
    m.rotation.z += Math.random() * 0.005 * (i + 1);
    m.rotation.y += Math.random() * 0.002 * (i + 1);
  }
};

let sea;
let sky;

const createSea = () => {
  sea = new Sea();

  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
};

const Sky = function () {
  this.mesh = new THREE.Object3D();
  this.nClouds = 20;
  this.clouds = [];

  let stepAngle = (Math.PI * 2) / this.nClouds;

  for (let i = 0; i < this.nClouds; i++) {
    let c = new Cloud();
    this.clouds.push(c);
    let a = stepAngle * i;
    let h = 750 + Math.random() * 200;

    c.mesh.position.y = Math.sin(a) * h;
    c.mesh.position.x = Math.cos(a) * h;

    c.mesh.rotation.z = a + Math.PI / 2;

    c.mesh.position.z = -400 - Math.random() * 400;

    let s = 1 + Math.random() * 2;
    c.mesh.scale.set(s, s, s);

    this.mesh.add(c.mesh);
  }
};

Sky.prototype.moveClouds = function () {
  for (let i = 0; i < this.nClouds; i++) {
    let c = this.clouds[i];
    c.rotate();
  }
  sky.mesh.rotation.z += 0.005;
};

const createSky = () => {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
};

const loop = () => {
  // updatePlane();
  // sea.mesh.rotation.z += 0.005;
  sea.moveWaves();
  sky.moveClouds();
  // console.log(sky);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

const init = (event) => {
  createScene();
  createLights();
  // createPlane();
  createSea();
  createSky();
  // createClouds();
  loop();
};

window.addEventListener("load", init);
