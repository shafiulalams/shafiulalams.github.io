/*
* 	Template Name         : Jaraya - Personal Portfolio HTML Template
* 	Theme Author Name     : Futurethemes
* 	Version               : 1.0
 */
/*  ======================================================
    Javascript Layout
    ====================================================== */
/*
    1.Basic
    2.Header
    3.Hero Banner
    4.About
    5.Services (My Skills, Counter Up)
    6.Portfolio
    7.Clients
*/
$(function() {
    "use-strict";

/*  ==================================================
    1.Basic (Wow Js), Scroll Top Btn,Preloader Effect
    ================================================== */
    // Wow Js Init
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        scrollContainer: null
    });
    wow.init();

    // Scroll Top Btn
    $(".scroll-top-btn").on("click", function() {
        $("html,body").stop().animate({
                scrollTop: 0
            },
            1000,
            'easeInOutExpo'
        );
    });

    /* Preloader Effect */
    $(window).on("load",function() {
        $(".preloader").fadeOut("600",function(){
            $(".preloader-wrap").remove();
        });
    });

/*  ==================================================
    2.Header
    ================================================== */
    // Variables
    var header = $(".header"),
        navbarMenu = $("#navbarMenu"),
        logoTransparent = $(".logo-brand-transparent"),
        logoNormal = $(".logo-brand-normal");

    // Window On Scroll Add Class Shrink
    $(window).on("scroll", function() {
        let scrolTop = $(this).scrollTop();
        if (scrolTop > 80) {
            header.addClass("header-shrink");
            logoTransparent.removeClass("active");
            logoNormal.addClass("active");
            $(".scroll-top-btn").addClass("active");
        } else {
            header.removeClass("header-shrink");
            logoNormal.removeClass("active");
            logoTransparent.addClass("active");
            $(".scroll-top-btn").removeClass("active");
        }
    });

    var scrolTop = $(window).scrollTop();
    if (scrolTop > 80) {
        header.addClass("header-shrink");
        logoTransparent.removeClass("active");
        logoNormal.addClass("active");
        $(".scroll-top-btn").addClass("active");
    } else {
        header.removeClass("header-shrink");
        logoNormal.removeClass("active");
        logoTransparent.addClass("active");
        $(".scroll-top-btn").removeClass("active");
    }

    // Navbar Toggle
    $(".navbar-toggle-btn").on("click", function() {
        navbarMenu.slideToggle(500);
        $(this).toggleClass("navbar-toggle-btn-active");
    });

    // Window On Resize Remove Attr Style ( Error Resolved)
    $(window).on("resize", function() {
        let documentSize = $(window).innerWidth();
        if (documentSize > 992) {
            navbarMenu.removeAttr("style");
        }
    });

    // Smooth scrolling when you click the links in the menu
    $('.nav-link').on("click", function() {
        $('html, body').stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000, 'easeInOutExpo');
    });

    // Scrollspy initiation
    $('body').scrollspy({
        target: '#navbarMenu',
        offset: 95
    });
/*  ==================================================
    3.Hero Banner
    ================================================== */
    // Variables
    var getOfferBtn = $(".get-offer-toggle-btn"),
        getOfferClose = $(".get-offer-close");

    // Get Offer Popup Open
    getOfferBtn.on("click", function() {
        $(".get-offer").stop().toggleClass("get-offer-show");
    });

    // Get Offer Popup Close
    getOfferClose.on("click", function() {
        $(".get-offer").stop().toggleClass("get-offer-show");
    });

    // Typed Js Hero Title Text
    var options = {
        strings: ["UI/UX Designer", "Web Developer", "Web Designer"],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true
    }

    var typed = new Typed("#typed-text", options);

    // Scroll Down Btn Animate
    $(".scroll-down-btn").on("click", function() {

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800, "easeInOutExpo");

    });

/*  ==================================================
    4.About
    ================================================== */
    // Magnific Popup Video Settings
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

/*  ==================================================
    5.Services (My Skills, Counter Up)
    ================================================== */
    // Variables
    var count = 0,
        a = 0,
        i, j, counterItem = $('.counter');

    /* My Skills */
    $(window).on("scroll", function() {
        var height = $(".my-skills-list").offset().top - $(window).innerHeight();
        if (count == 0 && $(window).scrollTop() > height) {
            $(".my-skills-list-item").each(function() {
                var skillsValue = $(this).find(".skills-progress-value").attr("data-skills-value"),
                    counters = $(this).find(".skills-text h6"),
                    countersQuantity = counters.length,
                    counter = [];
                    counters.text(skillsValue);

                for (i = 0; i < countersQuantity; i++) {
                    counter[i] = parseInt(counters[i].innerHTML);
                }

                var count = function(start, value, id) {
                    var localStart = start;
                    setInterval(function() {
                        if (localStart < value) {
                            localStart++;
                            counters[id].innerHTML = localStart + "%";
                        }
                    }, 20);
                }

                for (j = 0; j < countersQuantity; j++) {
                    count(0, counter[j], j);
                }

                $(this).find(".skills-progress-value").animate({
                    width: skillsValue + "%"
                }, 2000);

            });
            count = 1;
        }
    });

    /*  Counter Up */
    $('.counter').counterUp({
        delay: 15,
        time: 2000
    });

/*  ==================================================
    6.Portfolio
    ================================================== */
    /* Variables */
    var portfolioGrid = $('.portfolio-grid');

    /* Portfolio Gallery Magnific Popup Settings */
    portfolioGrid.magnificPopup({
        delegate: '.portfolio-zoom-link',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* Porfolio Filtering Click Events */
    $('.portfolio-filter > a').on("click", function() {
        $('.portfolio-filter .current').removeClass('current');
        $(this).addClass('current');
    });

    // Portfolio Masonary Gallery
    $('#masonaryGallery').imagesLoaded(function() {
        var $grid = $('.gallery-masonary').isotope({
            itemSelector: '.glry-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.glry-item',
            }
        });
        // filter items on button click
        $('.portfolio-filter > a').on('click', function() {
            var filterValue = $(this).attr('data-gallery-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
    });

/*  ==================================================
    7.Clients
    ================================================== */
    $('.testimonials-slider').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        dots: false,
        navText: [
            '<span class="fa fa-angle-left"></span>',
            '<span class="fa fa-angle-right"></span>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
});