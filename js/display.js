var displayModule = (function () {
    var viewerDiv = document.getElementById('viewer-div');
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewerDiv.getBoundingClientRect().width, viewerDiv.getBoundingClientRect().height);
    viewerDiv.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, viewerDiv.getBoundingClientRect().width / viewerDiv.getBoundingClientRect().height, 1, 1000);
    camera.position.set(0, 0, 15);
    scene.add(camera);

    var controls = new THREE.TrackballControls(camera, viewerDiv);
    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 4.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 1.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);

    //var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
    var ct = new QuadaticTriangle();
    ct.set([0, 1, 0], [0, 0,0],[1,0,0],[0,0.5,0],[0.5,0,0],[0.5,0.5,1],[0,0,1],[0,0,1],[0,0,1]);
    var curveTri = ct.facet(8);
    var geom = new THREE.Geometry();
    for ( let i = 0, len = curveTri.vertices.length; i < len; i++){
        let v = new THREE.Vector3(curveTri.vertices[i][0], curveTri.vertices[i][1], curveTri.vertices[i][2]);
        geom.vertices.push(v);
    }
    for (let i = 0, len = curveTri.index.length; i < len; i++){
        let v = new THREE.Face3(curveTri.index[i][0], curveTri.index[i][1], curveTri.index[i][2]);
        geom.faces.push(v);
    }

    //geom.faces.push(new THREE.Face3(0, 1, 2));
    geom.computeFaceNormals();
    var mesh = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
    scene.add(mesh);
    //scene.add(cube);

    window.addEventListener('resize', onWindowResize, false);

    render();
    animate();
    function onWindowResize() {
        camera.aspect = viewerDiv.getBoundingClientRect().width / viewerDiv.getBoundingClientRect().height;
        camera.updateProjectionMatrix();
        renderer.setSize( viewerDiv.getBoundingClientRect().width, viewerDiv.getBoundingClientRect().height );
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
