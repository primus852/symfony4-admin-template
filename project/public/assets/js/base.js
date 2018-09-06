/* Global Vars */
var $version = '1.10.1';
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

/* Toggle Treview */
$(document).on('click', '.toggleTree', function (e) {
    e.preventDefault();

    var $items = $(this).next('.treeMenu');
    var $icon = $(this).children('i');
    if ($items.is(':visible')) {
        $icon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
    } else {
        $icon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
    }
    $items.toggle(200);

});