var displayModule = (function () {
    var mesh = null;

    // renderer
    var viewerDiv = document.getElementById('viewer-div');
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewerDiv.getBoundingClientRect().width, viewerDiv.getBoundingClientRect().height);
    viewerDiv.appendChild(renderer.domElement);

    // scene
    var scene = new THREE.Scene();

    // camera
    var camera = new THREE.PerspectiveCamera(45, viewerDiv.getBoundingClientRect().width / viewerDiv.getBoundingClientRect().height, 0.01, 1000);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    // lights
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

    // materials
    let alpha = 0.5, beta = 0.7, gamma = 0.6;
    var phongMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 ).multiplyScalar( 1 - beta * 0.2 ),
        specular: new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 ),
        reflectivity: beta,
        shininess: Math.pow( 2, alpha * 10 ),
        shading: THREE.SmoothShading,
        side: THREE.DoubleSide
    });
    var normalMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});

    // camera control
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

    // handle window resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = viewerDiv.getBoundingClientRect().width / viewerDiv.getBoundingClientRect().height;
        camera.updateProjectionMatrix();
        renderer.setSize( viewerDiv.getBoundingClientRect().width, viewerDiv.getBoundingClientRect().height );
        controls.handleResize();
        render();
    }

    // render and animate
    render();
    animate();
    function animate() {
        requestAnimationFrame( animate );
        controls.update();
    }
    function render() {
        renderer.render( scene, camera );
    }

    function addQuadTri(quadData) {
        var ct = new QuadaticTriangle();
        ct.set(quadData.P200, quadData.P020, quadData.P002, 
            quadData.P110, quadData.P011, quadData.P101,
            quadData.N200, quadData.N020, quadData.N002);
        var curveTri = ct.facet(quadData.lod);
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

        geom.computeFaceNormals();

        if (mesh !== null)scene.remove(mesh);
        mesh = new THREE.Mesh(geom, phongMaterial);
        scene.add(mesh);

        render();
    }

    //trisSet = {indices: [0,1,2,0,2,3], positions:[0,1,0,0,0,0,1,0,0,1,1,1], normals:[0,0,1,0,0,1,0,0,1,-1,-1,1]}
    function addTris(trisSet) {
        // trisSet = {
        //     indices: [],
        //     positions: [],
        //     normals: []
        // }
        var geom = new THREE.Geometry();
        trisSet.tempNormals = [];
        for ( let i = 0, len = trisSet.positions.length; i < len; i+=3){
            let v = new THREE.Vector3(trisSet.positions[i], trisSet.positions[i + 1], trisSet.positions[i + 2]);
            let n = new THREE.Vector3(trisSet.normals[i], trisSet.normals[i + 1], trisSet.normals[i + 2])
            geom.vertices.push(v);
            trisSet.tempNormals.push(n);
        }

        for (let i = 0, len = trisSet.indices.length; i < len; i+=3){
            let vertNormals = []; 
            vertNormals.push(trisSet.tempNormals[trisSet.indices[i]]);
            vertNormals.push(trisSet.tempNormals[trisSet.indices[i + 1]]);
            vertNormals.push(trisSet.tempNormals[trisSet.indices[i + 2]]);
            let v = new THREE.Face3(trisSet.indices[i], trisSet.indices[i + 1], trisSet.indices[i + 2], vertNormals);
            geom.faces.push(v);
        }
        //geom.computeFaceNormals();
        
        if (mesh !== null)scene.remove(mesh);
        mesh = new THREE.Mesh(geom, phongMaterial);
        scene.add(mesh);
        
        render();
    }

    function addCubicTri () {}

    return {
        addQuadTri: addQuadTri,
        addCubicTri: addCubicTri,
        addTris: addTris
    };

})();
