var controlPanelModule = (function () {
    var $pencilIcon = $('#data-input-icon');
    var $cogIcon = $('#info-show-icon');
    var $dataInput = $('#data-input');
    var $infoShow = $('#info-show');
    $dataInput.hide();
    $infoShow.hide();
    var dataInputOpen = false;
    var infoShowOpen = false;
    $pencilIcon.click(function () {
        if (infoShowOpen) {
            $infoShow.hide();
            infoShowOpen = false;
        }
        if (dataInputOpen) {
            $dataInput.fadeOut(100);
            dataInputOpen = false;
        } else {
            $dataInput.fadeIn(100);
            dataInputOpen = true;
        }
    });
    $cogIcon.click(function () {
        if (dataInputOpen) {
            $dataInput.hide();
            dataInputOpen = false;
        }
        if (infoShowOpen) {
            $infoShow.fadeOut(100);
            infoShowOpen = false;
        } else {
            $infoShow.fadeIn(100);
            infoShowOpen = true;
        }
    });

    function hideAll () {
        if (infoShowOpen) {
            $infoShow.fadeOut(100);
            infoShowOpen = false;
        }
        if (dataInputOpen) {
            $dataInput.fadeOut(100);
            dataInputOpen = false;
        }
    }
    return {
        hideAll: hideAll,
        hideDataInput: function () {
            $dataInput.fadeOut(100);
            dataInputOpen = false;
        },
        hideInfoShow: function () {
            $infoShow.fadeOut(100);
            infoShowOpen = false;
        }
    };
})();

var logoCtrl = (function () {
    // logo change
    var logoA = document.getElementById('my-logo');
    var logoImgGray = document.getElementById('my-logo-img-gray');
    var logoImgWhite = document.getElementById('my-logo-img-white');
    var originalStyle = logoImgGray.style['display'];
    logoA.onmouseover = function (event) {
        logoImgGray.style['display'] = "none";
        logoImgWhite.style['display'] = originalStyle;
    }
    logoA.onmouseout = function (event) {
        logoImgWhite.style['display'] = "none";
        logoImgGray.style['display'] = originalStyle;
    }
})();

$('#viewer-div').click(function () {
    controlPanelModule.hideAll();
});

var popWindowCtrl = (function () {
    var closeSpans = document.getElementsByClassName('window-close');
    for (let i = 0, len = closeSpans.length; i < len; i++){
        closeSpans[i].onmouseover = function (event) {
            closeSpans[i].style['color'] = '#dcdcdc';
        }
        closeSpans[i].onmouseout = function (event) {
            closeSpans[i].style['color'] = '#878787';
        }
        closeSpans[i].onclick = function (event) {
            if (event.path[3].id === 'data-input') {
                controlPanelModule.hideDataInput();
            }
            if (event.path[3].id === 'info-show') {
                controlPanelModule.hideInfoShow();
            }
        }
    }
})();

var quadPopWindowModule = (function () {
    var quadData = {};
    var drawButton = document.getElementById('draw-button');

    var P200Input = document.getElementById('P200');
    var P020Input = document.getElementById('P020');
    var P002Input = document.getElementById('P002');

    var P110Input = document.getElementById('P110');
    var P011Input = document.getElementById('P011');
    var P101Input = document.getElementById('P101');

    var N200Input = document.getElementById('N200');
    var N020Input = document.getElementById('N020');
    var N002Input = document.getElementById('N002');

    var LodInput = document.getElementById('quad-lod');

    function readInput() {
        var p200Str = P200Input.value;
        var p020Str = P020Input.value;
        var p002Str = P002Input.value;
        var p110Str = P110Input.value;
        var p101Str = P101Input.value;
        var p011Str = P011Input.value;

        var n200Str = N200Input.value;
        var n020Str = N020Input.value;
        var n002Str = N002Input.value;
        var lodStr = LodInput.value;
        var floatRegex = /(-?\d+)(\.\d+)?/g;
        var intRegex = /\d{1,2}/g;
        var vectorRegex = /^((-?\d+)(\.\d+)?[,|，][\s]*){2}(-?\d+)(\.\d+)?[\s]*$/;
        var lodRegex = /^\d{1,2}$/;
        
        if (vectorRegex.test(p200Str) &&
          vectorRegex.test(p020Str) &&
          vectorRegex.test(p002Str) &&
          vectorRegex.test(p110Str) &&
          vectorRegex.test(p101Str) &&
          vectorRegex.test(p011Str) &&
          vectorRegex.test(n200Str) &&
          vectorRegex.test(n020Str) &&
          vectorRegex.test(n002Str)) {
            
            quadData.P200 = p200Str.match(floatRegex).map(parseFloat);
            quadData.P020 = p020Str.match(floatRegex).map(parseFloat);
            quadData.P002 = p002Str.match(floatRegex).map(parseFloat);
            quadData.P110 = p110Str.match(floatRegex).map(parseFloat);
            quadData.P011 = p011Str.match(floatRegex).map(parseFloat);
            quadData.P101 = p101Str.match(floatRegex).map(parseFloat);
            quadData.N200 = n200Str.match(floatRegex).map(parseFloat);
            quadData.N020 = n020Str.match(floatRegex).map(parseFloat);
            quadData.N002 = n002Str.match(floatRegex).map(parseFloat);

        }
        if (lodRegex.test(lodStr)) {
            quadData.lod = parseInt(lodStr);
        }
        displayModule.addQuadTri(quadData);
    }


    drawButton.onclick = readInput;

})();
