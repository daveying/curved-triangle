var vector3Tools = (function () {
    function add (...res) {
        var result = [0, 0, 0];
        for (let i = 0; i < res.length; i++) {
            result[0] += res[i][0];
            result[1] += res[i][1];
            result[2] += res[i][2];
        }
        return result;
    }
    function scale (v, s) {
        return [s * v[0], s * v[1], s * v[2]];
    }

    return {
        add: add,
        scale: scale,
    };
})();

var quadTrisModule = (function () {
    var p200 = [], p020 = [], p002 = []; // vertices
    var p110 = [], p011 = [], p101 = []; // control points
    var n200 = [], n020 = [], n002 = []; // vertex normals
    var n110 = [], n011 = [], n101 = [];
    var lodList = {};

    function set(p200_, p020_, p002_, p110_, p011_, p101_, n200_, n020_, n002_) {
        lodList = {};
        p200 = p200_; p020 = p020_; p002 = p002_;
        p110 = p110_; p011 = p011_; p101 = p101_;
        n200 = n200_; n020 = n020_; n002 = n002_;
        n110 = vector3Tools.scale(vector3Tools.add(n200, n020), 0.5);
        n011 = vector3Tools.scale(vector3Tools.add(n020, n002), 0.5);
        n101 = vector3Tools.scale(vector3Tools.add(n200, n002), 0.5);
    }
    function getFacets(lod) {
        if (isNaN(lod)) return;
        if (lod < 0) return;
        lod = Math.round(lod);
        if (lodList[lod]) return lodList[lod];
        else {
            lodList[lod] = facet(lod);
            return lodList[lod];
        }
    }
    function facet(lod) {

    }
    function evalPose(u, v, w) {
        if (u < 0 || v < 0 || u + v > 1) return;
        if (w === undefined) {
            w = 1 - u - v;
        } else if (u < 0 || u + v + w > 1) {
            return;
        }
        return vector3Tools.add(vector3Tools.scale(p200, u * u), 
                                vector3Tools.scale(p020, v * v),
                                vector3Tools.scale(p002, w * w),
                                vector3Tools.scale(p110, 2 * u * v),
                                vector3Tools.scale(p011, 2 * v * w),
                                vector3Tools.scale(p101, 2 * u * w));
    }
    function evalNormal(u, v, w) {
        if (u < 0 || v < 0 || u + v > 1) return;
        if (w === undefined) {
            w = 1 - u - v;
        } else if (u < 0 || u + v + w > 1) {
            return;
        }
        return vector3Tools.add(vector3Tools.scale(n200, u * u), 
                                vector3Tools.scale(n020, v * v),
                                vector3Tools.scale(n002, w * w),
                                vector3Tools.scale(n110, 2 * u * v),
                                vector3Tools.scale(n011, 2 * v * w),
                                vector3Tools.scale(n101, 2 * u * w));
    }
})();