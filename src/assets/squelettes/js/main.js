/*-----------------------------------------------------------------------------------

    /* ----------------------------------

    JS Active Code Index
            
        01. Preloader
        02. Sticky Header
        03. Scroll To Top
        04. Wow animation - on scroll
        05. Parallax
        06. Video
        07. Tab Effect
        08. Resize function
        09. FullScreenHeight function
        10. ScreenFixedHeight function
        11. FullScreenHeight and screenHeight with resize function
        12. Copy to clipboard
        13. Change Background Image
        14. Sliders
        15. Tabs
        16. CountUp
        17. Countdown
        18. Current Year
        19. Isotop
        
    ---------------------------------- */    

(function($) {

    "use strict";

    var $window = $(window);

        /*------------------------------------
            01. Preloader
        --------------------------------------*/

        $('#preloader').fadeOut('normall', function() {
            $(this).remove();
        });

        /*------------------------------------
            02. Sticky Header
        --------------------------------------*/

        $window.on('scroll', function() {
            var scroll = $window.scrollTop();
            var logochange = $(".navbar-brand img");
            var logodefault = $(".navbar-brand.logodefault img");
            var logoDark = $(".navbar-brand.dark img");
            if (scroll <= 50) {
                $("header").removeClass("scrollHeader").addClass("fixedHeader");
                logochange.attr('src', 'squelettes/img/logos/logo-inner.png');
                logodefault.attr('src', 'squelettes/img/logos/logo.png');
                logoDark.attr('src', 'squelettes/img/logos/logo.png');
            } 
            else {
                $("header").removeClass("fixedHeader").addClass("scrollHeader");
                logochange.attr('src', 'squelettes/img/logos/logo.png');
                logodefault.attr('src', 'squelettes/img/logos/logo.png');
                logoDark.attr('src', 'squelettes/img/logos/logo.png');
            }
        });

        /*------------------------------------
            03. Scroll To Top
        --------------------------------------*/

        $window.on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                $(".scroll-to-top").fadeIn(400);

            } else {
                $(".scroll-to-top").fadeOut(400);
            }
        });

        $(".scroll-to-top").on('click', function(event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
        });

        /*------------------------------------
            04. Wow animation - on scroll
        --------------------------------------*/
        
        var wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: false, // default
            live: true // default
        })
        wow.init();

        $(".text-animation").waypoint(function() {
            $('.text-animation.animated').textillate();
        }, { offset: '100%'});

        if ($(".tilt").length !== 0) {
            $('.tilt').tilt({
                maxTilt:        6,
                perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
                scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
                speed:          300,    // Speed of the enter/exit transition.
                reset:          true   // If the tilt effect has to be reset on exit.
            });
        }

        /*------------------------------------
            05. Parallax
        --------------------------------------*/

        // sections background image from data background
        var pageSection = $(".parallax,.bg-img");
        pageSection.each(function(indx) {

            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });
        
        /*------------------------------------
            06. Video
        --------------------------------------*/

        $('.popup-social-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
        });

        $('.source-modal').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160
        });

        /*------------------------------------
            07. Tab Effect
        --------------------------------------*/

        //Click on first li element
        $( ".tab1" ).click(function() {
        $( ".second, .third, .four" ).fadeOut();
        $( ".first" ).fadeIn(1000);
        });

        //Click on second li element
        $( ".tab2" ).click(function() {
        $( ".first, .third, .four" ).fadeOut();
        $( ".second" ).fadeIn(1000);
        });

        //Click on third li element
        $( ".tab3" ).click(function() {
        $( ".second, .first, .four" ).fadeOut();
        $( ".third" ).fadeIn(1000);
        });
                
        /*------------------------------------
            08. Resize function
        --------------------------------------*/

        $window.resize(function(event) {
            setTimeout(function() {
                SetResizeContent();
            }, 500);
            event.preventDefault();
        });

        /*------------------------------------
            09. FullScreenHeight function
        --------------------------------------*/

        function fullScreenHeight() {
            var element = $(".full-screen");
            var $minheight = $window.height();
            element.css('min-height', $minheight);
        }

        /*------------------------------------
            10. ScreenFixedHeight function
        --------------------------------------*/

        function ScreenFixedHeight() {
            var $headerHeight = $("header").height();
            var element = $(".screen-height");
            var $screenheight = $window.height() - $headerHeight;
            element.css('height', $screenheight);
        }

        /*------------------------------------
            11. FullScreenHeight and screenHeight with resize function
        --------------------------------------*/        

        function SetResizeContent() {
            fullScreenHeight();
            ScreenFixedHeight();
        }

        SetResizeContent();

        /*------------------------------------
            12. Copy to clipboard
        --------------------------------------*/

        if ($(".copy-clipboard").length !== 0) {
            new ClipboardJS('.copy-clipboard');
            $('.copy-clipboard').on('click', function() {
                var $this = $(this);
                var originalText = $this.text();
                $this.text('Copied');
                setTimeout(function() {
                    $this.text('Copy')
                    }, 2000);
            });
        };

        /*------------------------------------
            13. Change Background Image
        --------------------------------------*/

        $('.vision-wrapper').on('mouseenter', function (e) {
            var bg = $(this).data('background');
            $('.vision-changebg').animate({ opacity: 0.9 }, 50, function(){
                $('.vision-changebg').css('background-image', 'url(' + bg + ')');
            });
            $('.vision-changebg').delay(50).animate({ opacity: 0.9 }, 50);
        });
        

    // === when document ready === //
    $(document).ready(function() {

        /*------------------------------------
            14. Sliders
        --------------------------------------*/

        // Testmonial2
        $('.testimonial-style1').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 0,
            smartSpeed:800,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });

        // Testmonials carousel7
        $('.testimonial-style2').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 0,
            autoplay: true,
            thumbs: true,
            thumbsPrerendered: true,
            autoplayTimeout: 5000,
            smartSpeed:800,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });

        // Testmonial8
        $('.testimonial-style3').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 0,
            smartSpeed:800,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });  

        // testmonial-carousel
        $('.testimonial-style4').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1500,
            nav: false,
            dots: true,
            center:false,
            margin: 10,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 2
                },
                1400: {
                    items: 3
                }
            }
        });     

        // testmonial-carousel
        $('.portfolio-slider').owlCarousel({
            center: true,
            items:2,
            loop:true,
            dots: false,
            margin:30,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 900,
            responsive:{
                0: {
                    items: 1
                },
                576: {
                    items: 2,
                    center: false
                },
                1200: {
                    items: 2,
                    center: false
                },
                1400: {
                    items: 3
                }
            }
        }); 

        // portfolio-carousel
        $('.portfolio-carousel').owlCarousel({
            center: false,
            items:1,
            loop:true,
            dots: false,
            margin:40,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 900,
            responsive:{
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1400: {
                    items: 5
                }
            }
        }); 

         

        // Projets
        $('.projets').owlCarousel({
            loop: true,
            responsiveClass: true,
            center: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 30,
            smartSpeed: 900,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });


        // Videos
        $('.videos').owlCarousel({
            loop: true,
            responsiveClass: true,
            center: true,
            nav: false,
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            margin: 30,
            smartSpeed: 900,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });


        // servicesusager
        $('.servicesusager').owlCarousel({
            loop: true,
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            margin: 30,
            smartSpeed: 900,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 4
                }
            }
        });

        // Testmonial6
        $('.vision-changebg').owlCarousel({
            loop: true,
            responsiveClass: true,
            center: false,
            nav: false,
            dots: false,
            autoplay: false,
            autoplayTimeout: 5000,
            margin: 0,
            smartSpeed: 900,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 4,
                    loop: false
                }
            }
        });

        // Sliderfade
        $('.slider-fade1').owlCarousel({
            items: 1,
            loop:true,
            dots: true,
            margin: 0,
            nav: false,
            navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
            autoplay: true,
            autoplayTimeout:15000,
            smartSpeed:15000,
            mouseDrag:false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive: {
                992: {
                nav: true,
                dots: false
                }
            }
            
        });

        // Sliderfade
        $('.slider-fade2').owlCarousel({
            items: 1,
            loop:true,
            dots: true,
            margin: 0,
            nav: false,
            navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
            autoplay: true,
            autoplayTimeout:15000,
            smartSpeed:15000,
            mouseDrag:false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive: {
                992: {
                nav: true,
                dots: false
                }
            }
        });

        // Sliderfade3
        $('.slider-fade3').owlCarousel({
            items: 1,
            loop:true,
            dots: true,
            margin: 0,
            nav: false,
            navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
            autoplay: true,
            autoplayTimeout:15000,
            smartSpeed:15000,
            mouseDrag:false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive: {
                992: {
                nav: true,
                dots: false
                }
            }            
        });

        // Clients carousel
        $('.client-style1').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            smartSpeed:800,
            autoplayTimeout: 3000,
            responsiveClass: true,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 30
                },
                481: {
                    items: 2,
                    margin: 15
                },
                576: {
                    items: 3,
                    margin: 30
                },
                992: {
                    items: 4,
                    margin: 40
                },
                1200: {
                    items: 5,
                    margin: 60
                },
                1600: {
                    items: 7,
                    margin: 80
                }
            }
        });

        // Clients carousel
        $('.clients-style2').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            smartSpeed:800,
            autoplayTimeout: 3000,
            responsiveClass: true,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 2,
                    margin: 30
                },
                576: {
                    items: 3,
                    margin: 40
                },
                768: {
                    items: 3,
                    margin: 40
                },
                992: {
                    items: 4,
                    margin: 60
                },
                1200: {
                    items: 5,
                    margin: 80
                }
            }
        });

        // Clients carousel
        $('.clients-style3').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            smartSpeed:800,
            autoplayTimeout: 3000,
            responsiveClass: true,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 30
                },
                481: {
                    items: 2,
                    margin: 15
                },
                576: {
                    items: 3,
                    margin: 30
                },
                992: {
                    items: 4,
                    margin: 40
                },
                1200: {
                    items: 5,
                    margin: 60
                },
                1600: {
                    items: 7,
                    margin: 80
                }
            }
        });

        // Clients carousel
        $('.client-style4').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            smartSpeed:800,
            autoplayTimeout: 3000,
            responsiveClass: true,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 30
                },
                481: {
                    items: 2,
                    margin: 15
                },
                576: {
                    items: 4,
                    margin: 30
                },
                992: {
                    items: 4,
                    margin: 30
                },
                1200: {
                    items: 4,
                    margin: 30
                },
                1600: {
                    items: 5,
                    margin: 30
                }
            }
        });
        
        // Default owlCarousel
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop:true,
            dots: false,
            margin: 0,
            autoplay:true,
            smartSpeed:500
        });

        // Slider text animation
        var owl = $('.slider-fade1');
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index - 2;     // Position of the current item
            $('.h5').removeClass('animated fadeInUp');
            $('.title').removeClass('animated fadeInUp');
            $('p').removeClass('animated fadeInUp');
            $('a').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.h5').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.title').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('a').addClass('animated fadeInUp');
        });

        // Slider text animation
        var owl = $('.slider-fade2');
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index - 2;     // Position of the current item
            $('.text-animations').removeClass('animated');
            $('.title').removeClass('animated fadeInUp');
            $('.butn').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.text-animations').addClass('animated');
            $('.text-animations').textillate('in');
            $('.owl-item').not('.cloned').eq(item).find('.title').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated fadeInUp');
        });

        // Slider text animation
        var owl = $('.slider-fade3');
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index - 2;     // Position of the current item
            $('span').removeClass('animated fadeInUp');
            $('h1').removeClass('animated fadeInUp');
            $('p').removeClass('animated fadeInUp');
            $('a').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('span').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('a').addClass('animated fadeInUp');
        });

        /*------------------------------------
            15. Tabs
        --------------------------------------*/

        //Horizontal Tab
        if ($(".horizontaltab").length !== 0) {
            $('.horizontaltab').easyResponsiveTabs({
                type: 'default', //Types: default, vertical, accordion
                width: 'auto', //auto or any width like 600px
                fit: true, // 100% fit in a container
                tabidentify: 'hor_1', // The tab groups identifier
                activate: function(event) { // Callback function if tab is switched
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        }

        /*------------------------------------
            16. CountUp
        --------------------------------------*/

        $('.countup').counterUp({
            delay: 25,
            time: 2000
        });

        /*------------------------------------
            17. Countdown
        --------------------------------------*/

        // CountDown for coming soon page
        if ($(".countdown").length !== 0) {
            $(".countdown").countdown({
                    date: "01 Jan 2024 00:01:00", //set your date and time. EX: 15 May 2014 12:00:00
                    format: "on"
            });
        }

        /*------------------------------------
            18. Current Year
        --------------------------------------*/

        $('.current-year').text(new Date().getFullYear());
        
    });

    // === when window loading === //
    $window.on("load", function() {

        /*------------------------------------
            19. Isotop
        --------------------------------------*/

        var $PortfolioGallery = $('.portfolio-gallery-isotope').isotope({
            // options
        });

        // filter items on button click
        $('.filtering').on('click', 'span', function() {
            var filterValue = $(this).attr('data-filter');
            $PortfolioGallery.isotope({
                filter: filterValue
            });
        });

        $('.filtering').on('click', 'span', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('.portfolio-gallery,.portfolio-gallery-isotope').lightGallery();

        // stellar
        $window.stellar();
        
    });

})(jQuery);
