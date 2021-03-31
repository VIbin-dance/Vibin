/**
* Template Name: Resi - v2.1.0
* Template URL: https://bootstrapmade.com/resi-free-bootstrap-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function ($) {
    "use strict";

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 16;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function () {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }

        // video view tag
        // var mediaDevices = navigator.mediaDevices;
        // let video = document.getElementById('camera');

        // navigator.mediaDevices.getUserMedia({
        //     audio: false,
        //     video: {
        //         width: { min: 1024, ideal: 1280, max: 1920 },
        //         height: { min: 576, ideal: 720, max: 1080 }
        //     }
        // }).then(stream => {
        //     video.srcObject = stream;
        //     video.play();
        // }).catch(err => {
        //     console.log("An error occurred: " + err);
        // });

        // navigator.mediaDevices.ondevicechange = function (event) {
        //     updateDeviceList();
        // }

        // function updateDeviceList() {
        //     navigator.mediaDevices.enumerateDevices()
        //     .then( devices => {
        //         audioList.innerHTML = "";
        //         videoList.innerHTML = "";

        //         devices.forEach( device => {
        //             let elem = document.createElement("li");
        //             let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

        //             elem.innerHTML = "<strong>" + device.label + "</strong> (" + direction + ")";
        //             if (type === "audio") {
        //                 audioList.appendChild(elem);
        //             } else if (type === "video") {
        //                 videoList.appendChild(elem);
        //             }
        //         });
        //     });
        // }

        // event EventListener
        // document.querySelector('video').addEventListener('play', () => {
        //     alert('Video is playing!!!')
        // })
        // document.querySelector('button').addEventListener('click', () => {
        //     context.resume().then(() => {
        //         console.log('Playback resumed successfully');
        //     });
        // });

    });

    // Mobile Navigation
    // if ($('.nav-menu').length) {
    //   var $mobile_nav = $('.nav-menu').clone().prop({
    //     class: 'mobile-nav d-lg-none'
    //   });
    //   $('body').append($mobile_nav);
    //   $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    //   $('body').append('<div class="mobile-nav-overly"></div>');

    //   $(document).on('click', '.mobile-nav-toggle', function(e) {
    //     $('body').toggleClass('mobile-nav-active');
    //     $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    //     $('.mobile-nav-overly').toggle();
    //   });

    //   $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
    //     e.preventDefault();
    //     $(this).next().slideToggle(300);
    //     $(this).parent().toggleClass('active');
    //   });

    //   $(document).click(function(e) {
    //     var container = $(".mobile-nav, .mobile-nav-toggle");
    //     if (!container.is(e.target) && container.has(e.target).length === 0) {
    //       if ($('body').hasClass('mobile-nav-active')) {
    //         $('body').removeClass('mobile-nav-active');
    //         $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    //         $('.mobile-nav-overly').fadeOut();
    //       }
    //     }
    //   });
    // } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    //   $(".mobile-nav, .mobile-nav-toggle").hide();
    // }

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, #mobile-nav');

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function () {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });

    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // jQuery counterUp
    // $('[data-toggle="counter-up"]').counterUp({
    //     delay: 10,
    //     time: 1000
    // });

    // Porfolio isotope and filter
    // $(window).on('load', function () {
    //     var portfolioIsotope = $('.portfolio-container').isotope({
    //         itemSelector: '.portfolio-item'
    //     });

    //     $('#portfolio-flters li').on('click', function () {
    //         $("#portfolio-flters li").removeClass('filter-active');
    //         $(this).addClass('filter-active');

    //         portfolioIsotope.isotope({
    //             filter: $(this).data('filter')
    //         });
    //     });

    //     // Initiate venobox (lightbox feature used in portofilo)
    //     $(document).ready(function () {
    //         $('.venobox').venobox();
    //     });
    // });

    // Portfolio details carousel
    // $(".portfolio-details-carousel").owlCarousel({
    //     autoplay: true,
    //     dots: true,
    //     loop: true,
    //     items: 1
    // });

    $(document).ready(function () {
    
        // chat box - scroll down animation
        $(".message_wrap").animate({ scrollTop: $('.message_wrap ul').prop("scrollHeight")}, 300);

        // ////////////////////////////////////////////////////////
        // ///  channel infor - copy ingest server, stream key
        // ////////////////////////////////////////////////////////
        $('#copy_ingest').click(function () {
            var copyText = $("#ch_ingest");
            copyText.select();
            // copyText.setSelectionRange(0, 99999); /* For mobile devices */
            /* Copy the text inside the text field */
            document.execCommand("copy");
        })
        $('#copy_skey').click(function () {
            var copyText = $("#ch_streamkey");
            copyText.select();
            // copyText.setSelectionRange(0, 99999); /* For mobile devices */
            /* Copy the text inside the text field */
            document.execCommand("copy");
        })
    });

})(jQuery);