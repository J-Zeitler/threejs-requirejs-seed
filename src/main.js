'use strict';

require([
  'libs/vendor/text!shaders/passThrough.vert',
  'libs/vendor/text!shaders/passThrough.frag',
  'libs/vendor/orbitControls'
],

function (passThroughVert, passThroughFrag) {
  var t = new Date();
  var rendererStats;
  var camera, controls, renderer, scene;
  var plane, planeGeometry, planeMaterial;

  init();
  animate();

  function init() {
    System.logSystemInfo();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 3);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
    planeMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVert,
      fragmentShader: passThroughFrag
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x222222, 1);

    controls = new THREE.OrbitControls(camera);
    document.body.appendChild(renderer.domElement);

    rendererStats = new THREEx.RendererStats();
    rendererStats.domElement.style.position = 'absolute';
    rendererStats.domElement.style.left = '0px';
    rendererStats.domElement.style.bottom = '0px';
    document.body.appendChild(rendererStats.domElement);
  }

  function animate() {
    var dt = new Date() - t;
    t = new Date();

    renderer.render(scene, camera);
    rendererStats.update(renderer);
    controls.update();
    requestAnimationFrame(animate);
  }
});
