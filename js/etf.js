$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }

        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 900) {
                $(this).addClass("slide");
            }
        });
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('#back-to-top').tooltip('show');

    $('.btnModal').click(function(event) {
        event.preventDefault();
        $('#exitModal').modal({backdrop: 'static', keyboard: false})  ;
        $('#exitModal').modal('show');
    });
    $('.btnLeave').click(function(event) {
        location.href = 'http://www.merlinam.com/';
    });
});

function twoDec(val) {
    return parseFloat(Math.round(val * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function perc(val) {
    return (val == 'N/A') ? val : twoDec(val) +"%";
}

function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}
