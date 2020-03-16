
$(document).ready(function () {
    getDateCurrent();
    table_action();
});
$(document).on('click', '.show_box_search', function () {

});
function getDateCurrent() {
    var today = new Date();
    var TIMECURENT = {
        hour: addZero(today.getHours()),
        min: addZero(today.getMinutes()),
        sec: addZero(today.getSeconds()),

        year: today.getFullYear(),
        mon: addZero(today.getMonth()),
        day: addZero(today.getDate()),
    };
    $('.time .hour').html(TIMECURENT.hour);
    $('.time .min').html(TIMECURENT.min);
    $('.time .sec').html(TIMECURENT.sec);

    $('.day .year').html(TIMECURENT.year);
    $('.day .mon').html(TIMECURENT.mon);
    $('.day .days').html(TIMECURENT.day);
    setTimeout(() => {
        getDateCurrent();

    }, 1000);
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function tabs_CONTROL_TICKED() {
    $(document).on('click', '.item_tabs_ticked', function () {
        $('.item_tabs_ticked').removeClass('active');
        $(this).addClass('active');
        get_ID = $(this).attr('data-tabs');
        $('.item_list_a').removeClass('activetabs');
        $('#tabsa' + get_ID).addClass('activetabs');
    });
}

function tabs_CONTROL_NOW($value) {
    $(document).on('click', '.' + $value, function () {
        $('.' + $value).removeClass('active');
        $(this).addClass('active');
        get_ID = $(this).attr('data-tabs');
        var DATAID = $('#tabs_' + get_ID).attr('data-id');
        var NAMECLASS = $('#' + DATAID + get_ID).attr('class');
        var FINTCLASS = $('#' + DATAID + get_ID).hasClass(NAMECLASS);

        $('.' + NAMECLASS).hide(300);
        $('#' + DATAID + get_ID).show(300);
    });
}
$(document).on('click', '.menu_show.open', function () {
    $('body').addClass('active_menu');
    var CONTROLMENU = {
        main_menu: 'main_menu',
    }
    $(this).removeClass('open');
    $(this).addClass('close');
    $('.' + CONTROLMENU.main_menu).addClass('on');

});

$(document).on('click', '.menu_show.close', function () {
    var CONTROLMENU = {
        main_menu: 'main_menu',
    }
    $(this).removeClass('close');
    $(this).addClass('open');
    $('.' + CONTROLMENU.main_menu).removeClass('on');
});

function table_action() {
    var len_box = $('.main_table .item_box').length;
    var margin_add = (len_box / 2) * 15;

    if (len_box > 0) {
        if (len_box % 2 == 1) {
            $('.main_table').css({
                width: (((len_box + 1) * 260) / 2) + margin_add
            });
        } else {
            $('.main_table').css({
                width: ((len_box * 260) / 2) + margin_add
            });
        }
        // $('.main_table').css({
        //     width: ((len_box * 260) / 2) + margin_add
        // });
    }
}

//===================================OPEN MODAL===================================
$(document).on('click', '.open_modal', function (e) {
    var data_target = $(this).attr('data-target');
    $('#' + data_target).show(100);
    $('#' + data_target).addClass('open');
    $('body').addClass('active_menu');
    $("body").append("<div class='ovelay_modal fade open' id='ovelay_modal'></div>");

});
function do_modal_close() {
    $('.modal').css({ 'display': 'none' });
    // we don't want to call do_totals2 directly, because it is what hides the element.
    window.setTimeout(do_modal_close, 40000);  // setTimeout accepts a function reference
}
$(document).on('click', '.modal.open', function (e) {

    $('.modal').removeClass('open');
    $('body').removeClass('active_menu');
    $("#ovelay_modal").remove();
    setTimeout(function () { $('.modal').css({ 'display': 'none' }); }, 200);
});

$(document).on('click', '.modal', function (e) {
    if (event) {
        event.preventDefault();
    }

});
// $(document).on('click', '.ovelay_modal', function (e) {
//     $('.modal').removeClass('open');
//     $('body').removeClass('active_menu');
//     $(this).remove();
//     setTimeout(function () { $('.modal').css({ 'display': 'none' }); }, 200);
// });