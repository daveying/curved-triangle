var displayModule = (function () {
    var viewer = document.getElementById('viewer');
    var renderer = new THREE.WebGLRenderer({
        canvas: viewer
    });
    renderer.setClearColor(0xeeeeee);
    renderer.setSize(viewer.getBoundingClientRect().width, viewer.getBoundingClientRect().height);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, viewer.getBoundingClientRect().width / viewer.getBoundingClientRect().height, 1, 1000);
    camera.position.set(2, 0, 15);
    scene.add(camera);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
                            new THREE.MeshPhongMaterial({
                                color: 0xff0000
                            }));
    scene.add(cube);
    renderer.render(scene, camera);
})();
