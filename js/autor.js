$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 1000) {
        $('#scrollDown').addClass('scrolled');
        $('#scrollUp').addClass('scrolled');
    } else {
        $('#scrollDown').removeClass('scrolled');
        $('#scrollUp').removeClass('scrolled');
    }
});
