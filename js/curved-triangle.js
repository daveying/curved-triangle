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
        scale: scale
    };
})();

function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var CurvedTriangle = function () {
    this.lodList = {};
}
CurvedTriangle.prototype.evalPose = function (u, v, w) {}
CurvedTriangle.prototype.evalNormal = function (u, v, w) {}
CurvedTriangle.prototype.getFacets = function (lod) {
    if (isNaN(lod)) return;
    if (lod < 0) return;
    lod = Math.round(lod);
    if (lodList[lod]) return lodList[lod];
    else {
        lodList[lod] = facet(lod);
        return lodList[lod];
    }
}
CurvedTriangle.prototype.facet = function (lod) {
    
}

var QuadaticTriangle = function () {
    this.p200 = []; this.p020 = []; this.p002 = []; // vertices
    this.p110 = []; this.p011 = []; this.p101 = []; // control points
    this.n200 = []; this.n020 = []; this.n002 = []; // vertex normals
    this.n110 = []; this.n011 = []; this.n101 = [];
}
inherits(QuadaticTriangle, CurvedTriangle);
QuadaticTriangle.prototype.set = function(p200_, p020_, p002_, p110_, p011_, p101_, n200_, n020_, n002_) {
    lodList = {};
    this.p200 = p200_; this.p020 = p020_; this.p002 = p002_;
    this.p110 = p110_; this.p011 = p011_; this.p101 = p101_;
    this.n200 = n200_; this.n020 = n020_; this.n002 = n002_;
    this.n110 = vector3Tools.scale(vector3Tools.add(this.n200, this.n020), 0.5);
    this.n011 = vector3Tools.scale(vector3Tools.add(this.n020, this.n002), 0.5);
    this.n101 = vector3Tools.scale(vector3Tools.add(this.n200, this.n002), 0.5);
}
QuadaticTriangle.prototype.evalPose = function(u, v, w) {
    if (u < 0 || v < 0 || u + v > 1) return;
    if (w === undefined) {
        w = 1 - u - v;
    } else if (u < 0 || u + v + w > 1) {
        return;
    }
    return vector3Tools.add(vector3Tools.scale(this.p200, u * u), 
                            vector3Tools.scale(this.p020, v * v),
                            vector3Tools.scale(this.p002, w * w),
                            vector3Tools.scale(this.p110, 2 * u * v),
                            vector3Tools.scale(this.p011, 2 * v * w),
                            vector3Tools.scale(this.p101, 2 * u * w));
}
QuadaticTriangle.prototype.evalNormal = function(u, v, w) {
    if (u < 0 || v < 0 || u + v > 1) return;
    if (w === undefined) {
        w = 1 - u - v;
    } else if (u < 0 || u + v + w > 1) {
        return;
    }
    return vector3Tools.add(vector3Tools.scale(this.n200, u * u), 
                            vector3Tools.scale(this.n020, v * v),
                            vector3Tools.scale(this.n002, w * w),
                            vector3Tools.scale(this.n110, 2 * u * v),
                            vector3Tools.scale(this.n011, 2 * v * w),
                            vector3Tools.scale(this.n101, 2 * u * w));
}

var CubicTriangle = function () {
    this.p300 = []; this.p030 = []; this.p003 = []; // vertices
    this.p210 = []; this.p120 = []; // control points in edges
    this.p021 = []; this.p012 = [];
    this.p201 = []; this.p102 = [];
    this.p111 = []; // control point in middle
    //cubic normals
    this.n300 = []; this.n030 = []; this.n003 = []; // vertex normals
    this.n210 = []; this.n120 = [];
    this.n021 = []; this.n012 = [];
    this.n201 = []; this.n102 = [];
    this.n111 = [];
    //quadratic normals
    this.n200 = []; this.n020 = []; this.n002 = []; // vertex normals
    this.n110 = []; this.n011 = []; this.n101 = [];
}
inherits(CubicTriangle, CurvedTriangle);
CubicTriangle.prototype.set = function(p300_, p030_, p003_, p210_, p120_,  p021_, p012_, p201_, p102_, p111_, n200_, n020_, n002_) {
    lodList = {};
    this.p300 = p300_; this.p030 = p030_; this.p003 = p003_;
    this.p210 = p210_; this.p120 = p120_;
    this.p021 = p021_; this.p012 = p012_;
    this.p201 = p201_; this.p102 = p102_;
    this.p111 = p111_;

    this.n200 = n200_; this.n020 = n020_; this.n002 = n002_;
    this.n110 = vector3Tools.scale(vector3Tools.add(this.n200, this.n020), 0.5);
    this.n011 = vector3Tools.scale(vector3Tools.add(this.n020, this.n002), 0.5);
    this.n101 = vector3Tools.scale(vector3Tools.add(this.n200, this.n002), 0.5);
}
CubicTriangle.prototype.evalNormal = function(u, v, w) {
    if (u < 0 || v < 0 || u + v > 1) return;
    if (w === undefined) {
        w = 1 - u - v;
    } else if (u < 0 || u + v + w > 1) {
        return;
    }
    return vector3Tools.add(vector3Tools.scale(this.n200, u * u * u), 
                            vector3Tools.scale(this.n020, v * v * v),
                            vector3Tools.scale(this.n002, w * w * w),
                            vector3Tools.scale(this.n110, 2 * u * v),
                            vector3Tools.scale(this.n011, 2 * v * w),
                            vector3Tools.scale(this.n101, 2 * u * w));
}
CubicTriangle.prototype.evalPose = function(u, v, w) {
    if (u < 0 || v < 0 || u + v > 1) return;
    if (w === undefined) {
        w = 1 - u - v;
    } else if (u < 0 || u + v + w > 1) {
        return;
    }
    return vector3Tools.add(vector3Tools.scale(this.n300, u * u), 
                            vector3Tools.scale(this.n030, v * v),
                            vector3Tools.scale(this.n003, w * w),
                            vector3Tools.scale(this.n210, 3 * u * u * v),
                            vector3Tools.scale(this.n120, 3 * u * v * v),
                            vector3Tools.scale(this.n021, 3 * v * v * w),
                            vector3Tools.scale(this.n012, 3 * v * w * w),
                            vector3Tools.scale(this.n201, 3 * u * u * w),
                            vector3Tools.scale(this.n102, 3 * u * w * w),
                            vector3Tools.scale(this.n111, 6 * u * v * w));
}