var displayModule = (function () {
    var viewer = document.getElementById('viewer');
    var renderer = new THREE.WebGLRenderer({
        canvas: viewer
    });
    renderer.setClearColor(0xeeeeee);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewer.getBoundingClientRect().width, viewer.getBoundingClientRect().height);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, viewer.getBoundingClientRect().width / viewer.getBoundingClientRect().height, 1, 1000);
    camera.position.set(2, 0, 15);
    scene.add(camera);

    var controls = new THREE.TrackballControls(camera, viewer);
    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 4.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshNormalMaterial());
    var geom = new THREE.Geometry();
    var v1 = new THREE.Vector3(0, 0, 0);
    var v2 = new THREE.Vector3(3, 0, 0);
    var v3 = new THREE.Vector3(3, 3, 0);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);

    geom.faces.push(new THREE.Face3(0, 1, 2));
    geom.computeFaceNormals();
    var mesh = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());
    scene.add(mesh);
    scene.add(cube);

    window.addEventListener('resize', onWindowResize, false);

    render();
    animate();
    function onWindowResize() {
        camera.aspect = viewer.getBoundingClientRect().width / viewer.getBoundingClientRect().height;
        camera.updateProjectionMatrix();

        renderer.setSize( viewer.getBoundingClientRect().width, viewer.getBoundingClientRect().height );

        controls.handleResize();

        render();
    }

    function animate() {
        requestAnimationFrame( animate );
        controls.update();
    }

    function render() {
        renderer.render( scene, camera );
    }

})();
