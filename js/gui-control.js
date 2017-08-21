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
