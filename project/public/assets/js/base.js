/* Global Vars */
var $version = '0.0.1';
var cols = {},
    messageIsOpen = false;

$(function () {

    startTime(1);

    $('input').attr('autocomplete', 'off');

    // Bind the event.
    $(window).hashchange(function () {

        var hash = location.hash.replace(/^#/, '');
        if (hash === '') {
            $('.trigger-message-close').trigger('click');
        }

    });

    /* ------- Init Perfect Scrollbar ------- */
    var $ps = $('#perfectScroll');
    if ($ps.length) {
        new PerfectScrollbar('#perfectScroll');
    }
    new PerfectScrollbar('#pScrollerMenu');

    /* ------- Init tooltips ------- */
    var $tooltips = $('.tt');
    if ($tooltips.length) {
        initTooltips('.tt');
    }

    // Trigger the event (useful on page load).
    $(window).hashchange();

    var $curMenu = $('#' + GetNav);
    if (!$curMenu.is(':visible')) {
        $curMenu.parent().prev('a').trigger('click');
    }
    $curMenu.addClass('active');

    initOverlays();

    /* Init the Hashwatcher */
    detectHash();

    // Search box responsive stuff

    $('.search-box input').on('focus', function () {
        if ($(window).width() <= 1360) {
            cols.hideMessage();
        }
    });

});

/* Display Clock upon start */
function startTime(autostart) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#startClock').html("@" + h + ":" + m + ":" + s + " Uhr");
    var t = setTimeout(startTime, 1000);
    if (s === "00" || autostart > 0) {
        // TODO Update SFTP Crawl
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function initTooltips(selector) {
    $(selector).tooltipster({
        theme: 'tooltipster-punk',
        contentAsHTML: true, debug: false
    });
}

function initOverlays() {
    cols.showOverlay = function () {
        $('body').addClass('show-main-overlay');
    };
    cols.hideOverlay = function () {
        $('body').removeClass('show-main-overlay');
    };


    cols.showMessage = function () {
        $('body').addClass('show-message');
        messageIsOpen = true;
    };
    cols.hideMessage = function () {
        $('body').removeClass('show-message');
        messageIsOpen = false;
    };


    cols.showSidebar = function () {
        $('body').addClass('show-sidebar');
    };
    cols.hideSidebar = function () {
        $('body').removeClass('show-sidebar');
    };


    // Show sidebar when trigger is clicked

    $('.trigger-toggle-sidebar').on('click', function () {
        cols.showSidebar();
        cols.showOverlay();
    });


    $('.trigger-message-close').on('click', function () {

        var $mb = $(this).closest('.messageFly');

        if ($('.messageFly').length <= 1) {
            cols.hideMessage();
            $mb.remove();
            history.pushState("", document.title, window.location.pathname);
        } else {
            $mb.animate({left: '9999px'}, function () {
                $mb.remove();
            });
        }

    });

    // When you click the overlay, close everything
    $('#main > .overlay').on('click', function () {
        cols.hideOverlay();
        cols.hideMessage();
        cols.hideSidebar();
    });
}

function detectHash() {

    var hash = window.location.hash;
    if (!hash.length) {
        return false;
    }

    $("[data-hash=" + hash.replace('#', '') + "]").trigger('click');

}

function openNoty(type, text) {
    new Noty({
        layout: 'topRight',
        text: text,
        type: type,
        timeout: 3000,
        buttons: false
    }).show();
}

function loadDetails(trigger, id) {

    /* DIV */
    var $message = $('#' + id);
    $message.html('<i class="fa fa-spin fa-spinner fa-4x"></i>');

    /* Ajax Call */
    $.post(trigger.attr('data-url')).done(function (data) {
        $message.html(data);
        var sHash = window.location.hash.split('load-');
        if (sHash.length) {
            $('[data-device="' + sHash[1] + '"]').trigger('click');
        }

        $('#menuToggle > input').trigger('click');
        initOverlays();
        initTooltips('.tt');
    });
}

/* Click on any Listitem */
$(document).on('click', '.clickable', function (e) {

    e.preventDefault();
    window.location.hash = $(this).attr('data-hash');

    var $uId = Math.floor((Math.random() * 10000) + 1);

    $('body').append('<div class="messageFly" id="' + $uId + '"></div>');

    var $message = $('#' + $uId);
    $message.show();

    loadDetails($(this), $uId);

    if (messageIsOpen) {
        if (!$(this).hasClass('innerMessage')) {
            cols.hideMessage();
        }
        setTimeout(function () {
            cols.showMessage();
        }, 300);
    } else {
        cols.showMessage();
    }
    cols.showOverlay();
});
