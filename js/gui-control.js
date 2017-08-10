var controlPanelModule = (function () {
    var $pencilIcon = $('#data-input-icon');
    console.log($pencilIcon);
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
            $dataInput.fadeOut(1);
            dataInputOpen = false;
        } else {
            $dataInput.fadeIn(1);
            dataInputOpen = true;
        }
    });
    $cogIcon.click(function () {
        if (dataInputOpen) {
            $dataInput.hide();
            dataInputOpen = false;
        }
        if (infoShowOpen) {
            $infoShow.fadeOut(1);
            infoShowOpen = false;
        } else {
            $infoShow.fadeIn(1);
            infoShowOpen = true;
        }
    });

    function hideAll () {
        if (infoShowOpen) {
            $infoShow.fadeOut(1);
            infoShowOpen = false;
        }
        if (dataInputOpen) {
            $dataInput.fadeOut(1);
            dataInputOpen = false;
        }
    }
    return {
        hideAll: hideAll
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
