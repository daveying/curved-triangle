var displayModule = (function () {
    var viewerDiv = document.getElementById('viewer-div');
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewerDiv.getBoundingClientRect().width, viewerDiv.getBoundingClientRect().height);
    viewerDiv.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, viewerDiv.getBoundingClientRect().width / viewerDiv.getBoundingClientRect().height, 1, 1000);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    // var ambientLight = new THREE.AmbientLight( 0x000000 );
    // scene.add( ambientLight );

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );

    scene.add( new THREE.AmbientLight( 0xffffff ) );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

    // var pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
    // particleLight.add( pointLight );

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
    ct.set([0, 1, 0], [0, 0, 0], [1, 0, 0], [0, 0.5, 0], [0.5, 0, 0], [-0.544432, 0.532, 0], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
    var curveTri = ct.facet(3);
    var geom = new THREE.Geometry();
    for ( let i = 0, len = curveTri.vertices.length; i < len; i++){
        let v = new THREE.Vector3(curveTri.vertices[i][0], curveTri.vertices[i][1], curveTri.vertices[i][2]);
        geom.vertices.push(v);
    }
    function formAVector3(arr){
        return new THREE.Vector3(arr[0], arr[1], arr[2]);
    }
    for (let i = 0, len = curveTri.index.length; i < len; i++){
        let vertNormals = []; 
        vertNormals.push(formAVector3(curveTri.normals[curveTri.index[i][0]]));
        vertNormals.push(formAVector3(curveTri.normals[curveTri.index[i][1]]));
        vertNormals.push(formAVector3(curveTri.normals[curveTri.index[i][2]]));
        let v = new THREE.Face3(curveTri.index[i][0], curveTri.index[i][1], curveTri.index[i][2], vertNormals);
        geom.faces.push(v);
    }

    let alpha = 0.5, beta = 0.7, gamma = 0.6;
    var phongMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 ).multiplyScalar( 1 - beta * 0.2 ),
        specular: new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 ),
        reflectivity: beta,
        shininess: Math.pow( 2, alpha * 10 ),
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
    });
    var normalMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    geom.computeFaceNormals();
    var mesh = new THREE.Mesh(geom, phongMaterial);
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
