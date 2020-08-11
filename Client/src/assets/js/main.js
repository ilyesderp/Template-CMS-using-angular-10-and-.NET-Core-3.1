/**
 * removePreloader
 * init_header
 * ResponsiveMenu
 * fixHeight
 * consIsotope
 * ajaxContactForm
 * gmap3
 * owlcarousel
 * goTop
 */
function myfonction(id) {
    document.getElementById(id).click();
};

function updatefiltre() {
    localStorage.setItem('seg', '1');
    localStorage.setItem('user', '1');
}
function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.seek(fileWriter.length); // Start write position at EOF.

      // Create a new Blob and write it to log.txt.
      var blob = new Blob(['Hello World'], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}



;
(function($) {

    'use strict'



    var removePreloader = function() {
        setTimeout(function() {
            $('.preloader').css({
                'opacity': 0,
                'visibility': 'hidden'
            });
        }, 1000);
    };

    var init_header = function() {
        //var largeScreen = matchMedia('only screen and (min-width: 768px)').matches;
        //if( largeScreen ) {
        if ($().sticky) {

            $('header.header-sticky').sticky();

        }
        //}
    };

    var init_header04 = function() {
        if ($('.header04').length) {
            var largeScreen = matchMedia('only screen and (min-width: 768px)').matches;
            if (largeScreen) {
                $('.header04 #mainnav > ul > li').width($('#mainnav').width() / ($('.header04 #mainnav > ul > li').length));
            } else {
                $('.header04 #mainnav > ul > li').width('auto');
            }
        }
    };

    var ResponsiveMenu = {
        menuType: 'desktop',
        initial: function(winWidth) {
            ResponsiveMenu.menuWidthDetect(winWidth);
            ResponsiveMenu.menuBtnClick();
            ResponsiveMenu.parentMenuClick();
        },
        menuWidthDetect: function(winWidth) {
            var currMenuType = 'desktop';
            if (matchMedia('only screen and (max-width: 1024px)').matches) {
                currMenuType = 'mobile';
            }
            if (currMenuType !== ResponsiveMenu.menuType) {
                ResponsiveMenu.menuType = currMenuType;
                if (currMenuType === 'mobile') {
                    $('.mainnav li.mega a').after($('.mega-wrap ul.sub-menu'));
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    $('#header').find('.header-wrap').after($mobileMenu);
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    $('.mega-wrap .content.menu h3').after($('.mainnav li.mega ul.sub-menu').show());
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');
                    $desktopMenu.find('.sub-menu').removeAttr('style');
                    $('#header').find('.btn-menu').after($desktopMenu);
                    $('.btn-submenu').remove();
                }
            } // clone and insert menu
        },
        menuBtnClick: function() {
            $('.btn-menu').on('click', function() {
                $('#mainnav-mobi').slideToggle(300);
                $(this).toggleClass('active');
            });
        }, // click on moblie button
        parentMenuClick: function() {
            $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
                if ($(this).has('ul')) {
                    e.stopImmediatePropagation()
                    $(this).next('ul').slideToggle(300);
                    $(this).toggleClass('active');
                }
            });
        } // click on sub-menu button
    };
    var setupMegaMenu = function() {
        $('#mainnav > ul > li.mega a').hover(function() {
            $('.mega-wrap').fadeIn('300');
        }, function() {
            setTimeout(function() {
                if ($('.mega-wrap:hover').length == 0) {
                    $('.mega-wrap').fadeOut('300');
                }
            }, 50);
        });
        $('.mega-wrap').mouseleave(function(event) {
            event.preventDefault();
        }, function(event) {
            $('.mega-wrap').fadeOut('300');
        });
    }
    var leftMenu = function() {
        if ($('.left-side-menu').length) {
            $('#header').after($('nav.mainnav'));
            $('.btn-left-menu').on('click', function(event) {
                $('nav.mainnav').addClass('active');
                $(this).fadeOut('fast');
            });
            $('.btn-close-menu').on('click', function(event) {
                $('nav.mainnav').removeClass('active');
                $('.btn-left-menu').fadeIn('fast');
            });
        }
    }

    var textScroll = function() {
        if ($('.main-slider .text-content').hasClass('scroll')) {
            var current = 1;
            var height = $('.text-scroll').height();
            var numberDivs = $('.text-scroll').children().length;
            var first = $('.text-scroll h1:nth-child(1)');

            setInterval(function() {
                var number = current * -height;
                first.css('margin-top', number + 'px');
                if (current === numberDivs) {
                    first.css('margin-top', '0px');
                    current = 1;
                } else current++;
            }, 2500);
        } // end if
    }

    var fixHeight = function(img, text) {
        if (matchMedia('only screen and (min-width: 768px)').matches) {
            $('body').imagesLoaded(function() {
                if ($(img).length && $(text).length) {
                    $(img).height($(text).outerHeight());
                }
            });
        }
    };

    function filtervalueIsotope() {
        var user = "";
        var seg = "";
        if (!localStorage.hasOwnProperty('user') && !localStorage.hasOwnProperty('user')) {
            localStorage.setItem('user', '1');
            localStorage.setItem('seg', '1');

        }

        if (localStorage.getItem('user') == '1') user = ".particulier";
        if (localStorage.getItem('user') == '2') user = ".professionnel";
        if (localStorage.getItem('user') == '3') user = ".entreprise";
        if (localStorage.getItem('seg') == '1') seg = ".classiques";
        if (localStorage.getItem('seg') == '2') seg = ".islamique";
        return user.concat(seg);
    };
    var countchar = function(txt, charac) {

        var count = 0;

        for (var i = 0; i < txt.length; i++) {

            if (txt.charAt(i) === charac) {
                count++;
            }

        }
        return count;
    }
    var consIsotope = function(elm, param) { //portofolio, portofio2
        if ($().isotope) {
            var $container = $(elm);
            var filters = {};

            var param1 = '';
            if (param == null || param == '') {
                param1 = filtervalueIsotope();
            }

            $container.imagesLoaded(function() {
                $container.isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s',

                    filter: (param1 !== undefined) ? param1 : '',
                }); // end isotope
            });
            $container.prev().find('li').on('click', function() {

                var $buttonGroup = $(this).parents('.filter');
                var filterGroup = $buttonGroup.attr('data-filter-group');

                // set filter for group
                filters[filterGroup] = $(this).find("a").attr('data-filter');

                // combine filters
                var filterValue = concatValues(filters);

                var count = countchar(String(filterValue), '.');

                if (count == '1') {
                    if (filterGroup == 'con1') {
                        if (localStorage.getItem('seg') == '1') filterValue = filterValue.concat(".classiques");
                        if (localStorage.getItem('seg') == '2') filterValue = filterValue.concat(".islamique");

                    }

                    if (filterGroup == 'con2') {

                        if (localStorage.getItem('user') == '1') filterValue = filterValue.concat(".particulier");
                        if (localStorage.getItem('user') == '2') filterValue = filterValue.concat(".professionnel");
                        if (localStorage.getItem('user') == '3') filterValue = filterValue.concat(".entreprise");

                    }
                }




                var tmp = $container.prev().find('li');
                if ($(tmp.parent().attr("data-filter")) !== undefined && filterGroup !== undefined) {
                    tmp = $(tmp).filter(function(index) {
                        if ($(this).parent().attr("data-filter-group") == filterGroup) {
                            return true;
                        } else return false;
                    });
                }
                $(tmp).removeClass('active');
                $(this).addClass('active');
                //var selector = $(this).find("a").attr('data-filter');

                UpdateSessionItems(String(filterValue));

                $container.isotope({
                    filter: filterValue
                });
                return false;
            });
        };
    };




    //Isotope function for Compte Page
    var isoCompte = function(elm, param) { //portofolio, portofio3
        if ($().isotope) {
            var $container = $(elm);
            var filters = {};

            var param1 = '';
            if (param == null || param == '') {
                param1 = filtervalueIsotope();
            }
            $container.imagesLoaded(function() {
                $container.isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s',
                    filter: (param1 !== undefined) ? param1 : '',
                }); // end isotope
            });

            $container.prev().find('li').on('click', function() {
                var $buttonGroup = $(this).parents('.filter');
                var filterGroup = $buttonGroup.attr('data-filter-group');

                // set filter for group
                filters[filterGroup] = $(this).find("a").attr('data-filter');
                // combine filters

                var filterValue = concatValues(filters);
                var count = countchar(String(filterValue), '.');

                if (count == '1') {
                    if (filterGroup == 'con1') {
                        if (localStorage.getItem('seg') == '1') filterValue = filterValue.concat(".classiques");
                        if (localStorage.getItem('seg') == '2') filterValue = filterValue.concat(".islamique");

                    }


                    if (filterGroup == 'con2') {

                        if (localStorage.getItem('user') == '1') filterValue = filterValue.concat(".particulier");
                        if (localStorage.getItem('user') == '2') filterValue = filterValue.concat(".professionnel");
                        if (localStorage.getItem('user') == '3') filterValue = filterValue.concat(".entreprise");

                    }
                }

                //$grid.isotope({ filter: filterValue });
                var tmp = $container.prev().find('li');
                //console.log($container.prev().find('li'))

                if ($(tmp.parent().attr("data-filter-group")) !== undefined && filterGroup !== undefined) {
                    // if ($(this).find("a").attr('data-filter')==".particulierCompte" || $(this).find("a").attr('data-filter')==".professionnel" || $(this).find("a").attr('data-filter')==".entreprise" ){

                    // $(tmp).removeClass('active');
                    // $(this).addClass('active');
                    // $container.isotope({ filter: $(this).find("a").attr('data-filter') });

                    // return false;
                    //}
                    tmp = $(tmp).filter(function(index) {
                        if ($(this).parent().attr("data-filter-group") == filterGroup) {
                            return true;
                        } else return false;
                    });
                }
                $(tmp).removeClass('active');
                $(this).addClass('active');
                //var selector = $(this).find("a").attr('data-filter');

                UpdateSessionItems(String(filterValue));
                $container.isotope({
                    filter: filterValue
                });
                return false;
            });
        };
    };

    // flatten object by concatting values
    function concatValues(obj) {
        var value = '';
        for (var prop in obj) {
            value += obj[prop];
        }
        return value;
    }

    var popupGallery = function() {
        if ($().magnificPopup) {
            $('.popup-gallery').magnificPopup({
                delegate: 'a.popup',
                type: 'image',
                removalDelay: 600,
                tLoading: 'Loading image #%curr%...',
                mainClass: 'my-mfp-slide-bottom',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title');
                    }
                }
            });
        }
    };

    var ajaxContactForm = function(formId) {
        $(formId).each(function() {
            $(this).validate({
                submitHandler: function(form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', {
                            'class': 'loading'
                        });

                    $.ajax({
                        type: "POST",
                        url: $form.attr('action'),
                        data: str,
                        beforeSend: function() {
                            $form.find('.send-wrap').append(loading);
                        },
                        success: function(msg) {
                            var result, alertClass;

                            if (msg == 'Success') {
                                result = 'Your message has been sent. Thank you!';
                                alertClass = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                alertClass = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'kul-alert col-md-12 ' + alertClass,
                                    'text': result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );
                        },
                        complete: function(xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        });
    };



    var consCarousel = function(elm) {
        $(elm).each(function() {
            if ($().owlCarousel) {
                $(this).owlCarousel({
                    items: $(this).data('items'),
                    itemsDesktop: [1199, $(this).data('itemsdesktop')],
                    itemsDesktopSmall: [979, $(this).data('itemsdesktopsmall')],
                    itemsTablet: [768, $(this).data('itemstablet')],
                    itemsMobile: [479, $(this).data('itemsmobile')],
                    slideSpeed: $(this).data('slidespeed'),
                    autoPlay: $(this).data('autoplay'),
                    pagination: $(this).data('pagination'),
                    responsive: $(this).data('responsive')
                });
            }
        });
    };

    var countTo = function(elmDetect) {
        if ($().waypoint && $(elmDetect).length) {
            $(elmDetect).waypoint(function() {
                if ($().countTo) {
                    $('.timer').countTo();
                }
            });
        }
    };

    var parallax = function() {
        if ($().parallax) {
            $('.bg-parallax').parallax("50%", 0.5);
        }
    };

    var goTop = function() {
        $('.totop a').on('click', function() {
            $("html, body").animate({
                scrollTop: 0
            }, 1000, 'easeInOutExpo');
            return false;
        });
    };

    var closeAlert = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.kul-alert').remove();
            e.preventDefault();
        })
    };
    var UpdateSessionItems = function(str) {




        var n = str.search("classiques");

        if (n != -1) localStorage.setItem('seg', '1');
        n = str.search("islamique");
        if (n != -1) localStorage.setItem('seg', '2');
        var m = str.search("particulier");
        if (m != -1) localStorage.setItem('user', '1');
        m = str.search("particulierCompte");
        if (m != -1) localStorage.setItem('user', '1');
        m = str.search("professionnel");
        if (m != -1) localStorage.setItem('user', '2');
        m = str.search("entreprise");
        if (m != -1) localStorage.setItem('user', '3');



    };


    /*var init_filter = function() {


        // first time var does not exist


        // executes when HTML-Document is loaded and DOM is ready
        if (localStorage.getItem('user') == '1' && localStorage.getItem('seg') == '1') {

            document.getElementById("part").classList.add('active');
            document.getElementById("classique").classList.add('active');


            var param = '.particulier.classiques';

            $('.portfolio').isotope({
                itemSelector: '.item',
                transitionDuration: '1s',
                filter: (param !== undefined) ? param : '',
            });
            $('.portfolio3').isotope({
                itemSelector: '.item',
                transitionDuration: '1s',
                filter: (param !== undefined) ? param : '',
            });


            document.getElementById("prof").classList.remove('active');
            document.getElementById("entrep").classList.remove('active');

            document.getElementById("islamique").classList.remove('active');


        } else {

            if (localStorage.getItem('user') == '1' && localStorage.getItem('seg') == '2') {
                document.getElementById("part").classList.add('active');
                document.getElementById("islamique").classList.add('active');

                var param = '.particulier.islamique';
                var param1 = '.particulierCompte.islamique';
                $('.portfolio').isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s',
                    filter: (param !== undefined) ? param : '',
                });
                $('.portfolio3').isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s',
                    filter: (param1 !== undefined) ? param1 : '',
                });

                document.getElementById("prof").classList.remove('active');
                document.getElementById("entrep").classList.remove('active');

                document.getElementById("classique").classList.remove('active');


            } else {


                //  professionnel **********************************************

                if (localStorage.getItem('user') == '2' && localStorage.getItem('seg') == '1') {

                    document.getElementById("part").classList.remove('active');
                    document.getElementById("entrep").classList.remove('active');

                    document.getElementById("islamique").classList.remove('active');

                    document.getElementById("prof").classList.add('active');

                    document.getElementById("classique").classList.add('active');
                    var param = '.professionnel.classiques';

                    $('.portfolio').isotope({
                        itemSelector: '.item',
                        transitionDuration: '1s',
                        filter: (param !== undefined) ? param : '',
                    });
                    $('.portfolio3').isotope({
                        itemSelector: '.item',
                        transitionDuration: '1s',
                        filter: (param !== undefined) ? param : '',
                    });


                } else {

                    if (localStorage.getItem('user') == '2' && localStorage.getItem('seg') == '2') {
                        document.getElementById("part").classList.remove('active');
                        document.getElementById("entrep").classList.remove('active');

                        document.getElementById("classique").classList.remove('active');


                        document.getElementById("prof").classList.add('active');
                        document.getElementById("islamique").classList.add('active');
                        var param = '.professionnel.islamique';

                        $('.portfolio').isotope({
                            itemSelector: '.item',
                            transitionDuration: '1s',
                            filter: (param !== undefined) ? param : '',
                        });
                        $('.portfolio3').isotope({
                            itemSelector: '.item',
                            transitionDuration: '1s',
                            filter: (param !== undefined) ? param : '',
                        });


                    } else {
                        // entreprise ****************************************************

                        if (localStorage.getItem('user') == '3' && localStorage.getItem('seg') == '1') {

                            document.getElementById("part").classList.remove('active');
                            document.getElementById("prof").classList.remove('active');

                            document.getElementById("islamique").classList.remove('active');


                            document.getElementById("entrep").classList.add('active');
                            document.getElementById("classique").classList.add('active');
                            var param = '.entreprise.classiques';

                            $('.portfolio').isotope({
                                itemSelector: '.item',
                                transitionDuration: '1s',
                                filter: (param !== undefined) ? param : '',
                            });
                            $('.portfolio3').isotope({
                                itemSelector: '.item',
                                transitionDuration: '1s',
                                filter: (param !== undefined) ? param : '',
                            });


                        } else {

                            if (localStorage.getItem('user') == '3' && localStorage.getItem('seg') == '2') {

                                document.getElementById("part").classList.remove('active');
                                document.getElementById("prof").classList.remove('active');

                                document.getElementById("classique").classList.remove('active');


                                document.getElementById("entrep").classList.add('active');
                                document.getElementById("islamique").classList.add('active');
                                var param = '.entreprise.islamique';

                                $('.portfolio').isotope({
                                    itemSelector: '.item',
                                    transitionDuration: '1s',
                                    filter: (param !== undefined) ? param : '',
                                });
                                $('.portfolio3').isotope({
                                    itemSelector: '.item',
                                    transitionDuration: '1s',
                                    filter: (param !== undefined) ? param : '',
                                });

                            } else { */

                                /*********** reste ************/
                                /*if (localStorage.getItem('user') == null || localStorage.getItem('seg') == null) {


                                    document.getElementById("part").classList.add('active');
                                    document.getElementById("classique").classList.add('active');

                                    var param = '.particulier.classiques';

                                    $('.portfolio').isotope({
                                        itemSelector: '.item',
                                        transitionDuration: '1s',
                                        filter: (param !== undefined) ? param : '',
                                    });
                                    $('.portfolio3').isotope({
                                        itemSelector: '.item',
                                        transitionDuration: '1s',
                                        filter: (param !== undefined) ? param : '',
                                    });

                                    document.getElementById("prof").classList.remove('active');
                                    document.getElementById("entrep").classList.remove('active');
                                    document.getElementById("islamique").classList.remove('active');


                                } else {


                                    document.getElementById("part").classList.add('active');
                                    document.getElementById("classique").classList.add('active');

                                    var param = '.particulier.classiques';

                                    $('.portfolio').isotope({
                                        itemSelector: '.item',
                                        transitionDuration: '1s',
                                        filter: (param !== undefined) ? param : '',
                                    });
                                    $('.portfolio3').isotope({
                                        itemSelector: '.item',
                                        transitionDuration: '1s',
                                        filter: (param !== undefined) ? param : '',
                                    });

                                    document.getElementById("prof").classList.remove('active');
                                    document.getElementById("entrep").classList.remove('active');
                                    document.getElementById("islamique").classList.remove('active');


                                }
                            }
                        }
                    }
                }
            }
        }
    };*/

    // Dom Ready
    $(function() {

        removePreloader();

        init_header();
        init_header04();
        ResponsiveMenu.initial($(window).width());
        setupMegaMenu();
        leftMenu();
        $(window).resize(function() {
            ResponsiveMenu.menuWidthDetect($(this).width());

            init_header04();
            fixHeight('.feature-box .image', '.feature-box .text');
            fixHeight('.news-box02 .image', '.news-box02 .text');
            if (matchMedia('only screen and (min-width: 991px)').matches) {
                fixHeight('.blog-post', '.main-content');
                leftMenu();
            }
        });
        $(window).on('load', function(event) {
            fixHeight('.feature-box .image', '.feature-box .text');
            fixHeight('.news-box02 .image', '.news-box02 .text');

        });
        if (matchMedia('only screen and (min-width: 991px)').matches) {
            fixHeight('.blog-post', '.main-content');
        }

        consCarousel('.testimonial');
        consCarousel('.offer');
        consCarousel('.testimonial02');
        consCarousel('.testimonial03');
        consCarousel('.clients-carousel');

        //consIsotope('.portfolio', '');
        //consIsotope('.portfolio2', '.conditions');
        //isoCompte('.portfolio3', '');
        //init_filter(); à remettre si pour plus tard

        consIsotope('.masonry main > div.content');

        popupGallery();
        ajaxContactForm('#requestForm');
        ajaxContactForm('#subscribeForm');
        ajaxContactForm('#contact-form');
        //googleMap();
        countTo('.section-portfolio');
        countTo('.services-box02');
        parallax();
        goTop();

        closeAlert();

    });


})(jQuery);