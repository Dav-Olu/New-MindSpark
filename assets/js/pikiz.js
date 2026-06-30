(function ($) {
    "use strict";


    $('.form-one__control input, .form-one__control textarea')
    .on('focus', function () {
        $(this).closest('.form-one__control').addClass('is-focus');
    })
    .on('blur', function () {
        if (!this.value) {
        $(this).closest('.form-one__control').removeClass('is-focus');
        }
    });

    let dynamicyearElm = $(".dynamic-year");
    if (dynamicyearElm.length) {
        let currentYear = new Date().getFullYear();
        dynamicyearElm.html(currentYear);
    }

    //Fact Counter + Text Count
    if ($(".count-box").length) {
        $(".count-box").appear(
            function () {
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text(),
                    }).animate({
                        countNum: n,
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        },
                    });
                }
            }, {
                accY: 0,
            }
        );
    }

    if ($(".contact-form-validated").length) {
        $(".contact-form-validated").validate({
            // initialize the plugin
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                message: {
                    required: true,
                },
                subject: {
                    required: true,
                },
            },
            submitHandler: function (form) {
                // sending value with ajax request
                $.post(
                    $(form).attr("action"),
                    $(form).serialize(),
                    function (response) {
                        $(form).parent().find(".result").append(response);
                        $(form).find('input[type="text"]').val("");
                        $(form).find('input[type="email"]').val("");
                        $(form).find("textarea").val("");
                    }
                );
                return false;
            },
        });
    }

    // mailchimp form
    if ($(".mc-form").length) {
        $(".mc-form").each(function () {
            var Self = $(this);
            var mcURL = Self.data("url");
            var mcResp = Self.parent().find(".mc-form__response");

            Self.ajaxChimp({
                url: mcURL,
                callback: function (resp) {
                    // appending response
                    mcResp.append(function () {
                        return '<p class="mc-message">' + resp.msg + "</p>";
                    });
                    // making things based on response
                    if (resp.result === "success") {
                        // Do stuff
                        Self.removeClass("errored").addClass("successed");
                        mcResp.removeClass("errored").addClass("successed");
                        Self.find("input").val("");

                        mcResp.find("p").fadeOut(10000);
                    }
                    if (resp.result === "error") {
                        Self.removeClass("successed").addClass("errored");
                        mcResp.removeClass("successed").addClass("errored");
                        Self.find("input").val("");

                        mcResp.find("p").fadeOut(10000);
                    }
                },
            });
        });
    }

    // popup video and image
    if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false,
        });
    }

    if ($(".img-popup").length) {
        var groups = {};
        $(".img-popup").each(function () {
            var id = parseInt($(this).attr("data-group"), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });

        $.each(groups, function () {
            $(this).magnificPopup({
                type: "image",
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                    enabled: true,
                },
            });
        });
    }

    $(document).on("click", ".bw-popup-box-trigger-item", function (e) {
        e.preventDefault();
        $(".header-right-sidebar").addClass("isActive");
        $("body").addClass("locked");
    });

    $(document).on("click", ".header-right-sidebar__toggler", function (e) {
        e.preventDefault();
        $(".header-right-sidebar").removeClass("isActive");
        $("body").removeClass("locked");
    });

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        // if any li has .current elmnt add class
        selector.children("li").each(function () {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        // if no file name return
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }

    if ($(".main-menu__list").length) {
        // dynamic current class
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
    }

    if ($(".service-sidebar__nav").length) {
        // dynamic current class
        let mainNavUL = $(".service-sidebar__nav");
        dynamicCurrentMenuClass(mainNavUL);
    }

    if ($(".main-menu").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
    }

    if ($(".sticky-header").length) {
        $(".sticky-header")
            .clone()
            .insertAfter(".sticky-header")
            .addClass("sticky-header--cloned");
    }

    if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
            ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
            self.append(function () {
                return toggleBtn;
            });
            self.find("button").on("click", function (e) {
                e.preventDefault();
                let self = $(this);
                self.toggleClass("expanded");
                self.parent().toggleClass("expanded");
                self.parent().parent().children("ul").slideToggle();
            });
        });
    }

    if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
            e.preventDefault();
            $(".mobile-nav__wrapper").toggleClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $(".mobile-nav__wrapper").removeClass("expanded");
            $("body").toggleClass("locked");
        });
    }
    if ($(".mini-cart__toggler").length) {
        $(".mini-cart__toggler").on("click", function (e) {
            e.preventDefault();
            $(".mini-cart").toggleClass("expanded");
            $(".mobile-nav__wrapper").removeClass("expanded");
            $("body").toggleClass("locked");
        });
    }
    if ($(".odometer").length) {
        $(".odometer").appear(function (e) {
            var odo = $(".odometer");
            odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }

    if ($(".pikiz-accrodion").length) {
        var accrodionGrp = $(".pikiz-accrodion");
        accrodionGrp.each(function () {
            var accrodionName = $(this).data("grp-name");
            var Self = $(this);
            var accordion = Self.find(".accrodion");
            Self.addClass(accrodionName);
            Self.find(".accrodion .accrodion-content").hide();
            Self.find(".accrodion.active").find(".accrodion-content").show();
            accordion.each(function () {
                $(this)
                    .find(".accrodion-title")
                    .on("click", function () {
                        if ($(this).parent().hasClass("active") === false) {
                            $(".pikiz-accrodion." + accrodionName)
                                .find(".accrodion")
                                .removeClass("active");
                            $(".pikiz-accrodion." + accrodionName)
                                .find(".accrodion")
                                .find(".accrodion-content")
                                .slideUp();
                            $(this).parent().addClass("active");
                            $(this).parent().find(".accrodion-content").slideDown();
                        }
                    });
            });
        });
    }

    if ($(".tabs-box").length) {
        $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
            e.preventDefault();
            var target = $($(this).attr("data-tab"));

            if ($(target).is(":visible")) {
                return false;
            } else {
                target
                    .parents(".tabs-box")
                    .find(".tab-buttons")
                    .find(".tab-btn")
                    .removeClass("active-btn");
                $(this).addClass("active-btn");
                target
                    .parents(".tabs-box")
                    .find(".tabs-content")
                    .find(".tab")
                    .fadeOut(0);
                target
                    .parents(".tabs-box")
                    .find(".tabs-content")
                    .find(".tab")
                    .removeClass("active-tab");
                $(target).fadeIn(300);
                $(target).addClass("active-tab");
            }
        });
    }
    function pikizSlickInit() {
        // slick slider
        let pikizslickCarousel = $(".pikiz-slick__carousel");
        if (pikizslickCarousel.length) {
            pikizslickCarousel.each(function () {
                let elm = $(this);
                let options = elm.data("slick-options");
                let pikizslickCarousel = elm.slick(
                    "object" === typeof options ? options : JSON.parse(options)
                );
            });
        }
        let pikizslickCarouselCounter = $(
            ".pikiz-slick__custome-counter"
        );
        if (pikizslickCarouselCounter.length) {
            pikizslickCarouselCounter.each(function () {
                let elm = $(this);
                let options = elm.data("slick-options");
                let currentSlide;
                let slidesCount;
                let sliderCounter = document.createElement("div");
                sliderCounter.classList.add("pikiz-slick__counter");

                let updateSliderCounter = function (slick, currentIndex) {
                    currentSlide = slick.slickCurrentSlide() + 1;
                    slidesCount = slick.slideCount;
                    $(sliderCounter).html(
                        '<span class="pikiz-slick__counter__active">' +
                        currentSlide +
                        "</span>" +
                        "" +
                        "<span>" +
                        slidesCount +
                        "</span>"
                    );
                };
                elm.on("init", function (event, slick) {
                    elm.append(sliderCounter);
                    updateSliderCounter(slick);
                });
                elm.on("afterChange", function (event, slick, currentSlide) {
                    updateSliderCounter(slick, currentSlide);
                });

                let pikizslickCarousel = elm.slick(
                    "object" === typeof options ? options : JSON.parse(options)
                );
            });
        }
    }

    $('.slider-one__carousel .grid-mask').each(function() {
        let blocks = [];
        for (let i = 0; i < 24; i++) {
            let block = document.createElement('div');
            block.style.transitionDelay = `${Math.random() * 1.2}s`;
            blocks.push(block);
        }
        blocks.sort(() => Math.random() - 0.5);
        blocks.forEach(block => this.appendChild(block));
    });

    // $('.slider-one__carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    //     const $slides = $(this).find('.slider-one__item');
    //     $slides.find('.grid-mask').removeClass('active');
    //     const nextMask = $slides.eq(nextSlide).find('.grid-mask');
    //     setTimeout(() => {
    //         nextMask.classList.add('active');
    //     }, 50);
    //     const $dots = $(this).find('.slick-dots li');
    //     $dots.removeClass('active');
    //     $dots.each((i, dot) => {
    //         if (i <= nextSlide) $(dot).addClass('active');
    //     });
    // });


    /*-- One Page Menu --*/
    function SmoothMenuScroll() {
        var anchor = $(".scrollToLink");
        if (anchor.length) {
            anchor.children("a").bind("click", function (event) {
                if ($(window).scrollTop() > 10) {
                    var headerH = "0";
                } else {
                    var headerH = "0";
                }
                var target = $(this);
                $("html, body")
                    .stop()
                    .animate({
                            scrollTop: $(target.attr("href")).offset().top - headerH + "px",
                        },
                        900,
                        "easeInOutExpo"
                    );
                anchor.removeClass("current");
                anchor.removeClass("current-menu-ancestor");
                anchor.removeClass("current_page_item");
                anchor.removeClass("current-menu-parent");
                target.parent().addClass("current");
                event.preventDefault();
            });
        }
    }
    SmoothMenuScroll();

    function OnePageMenuScroll() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 117) {
            var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
            menuAnchor.each(function () {
                var sections = $(this).attr("href");
                $(sections).each(function () {
                    if ($(this).offset().top <= windscroll + 100) {
                        var Sectionid = $(sections).attr("id");
                        $(".one-page-scroll-menu").find("li").removeClass("current");
                        $(".one-page-scroll-menu")
                            .find("li")
                            .removeClass("current-menu-ancestor");
                        $(".one-page-scroll-menu")
                            .find("li")
                            .removeClass("current_page_item");
                        $(".one-page-scroll-menu")
                            .find("li")
                            .removeClass("current-menu-parent");
                        $(".one-page-scroll-menu")
                            .find("a[href*=\\#" + Sectionid + "]")
                            .parent()
                            .addClass("current");
                    }
                });
            });
        } else {
            $(".one-page-scroll-menu li.current").removeClass("current");
            $(".one-page-scroll-menu li:first").addClass("current");
        }
    }

    // window scroll event
    function stickyMenuUpScroll($targetMenu, $toggleClass) {
        var lastScrollTop = 0;
        window.addEventListener(
            "scroll",
            function () {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                if (st > 500) {
                    if (st > lastScrollTop) {
                        // downscroll code
                        $targetMenu.removeClass($toggleClass);
                        // console.log("down");
                    } else {
                        // upscroll code
                        $targetMenu.addClass($toggleClass);
                        // console.log("up");
                    }
                } else {
                    $targetMenu.removeClass($toggleClass);
                }
                lastScrollTop = st;
            },
            false
        );
    }
    stickyMenuUpScroll($(".sticky-header--normal"), "active");

    // window load event
    $(window).on("load", function () {
        pikizSlickInit();
    });

    $(window).on("scroll", function () {
        OnePageMenuScroll();
        if ($(".sticky-header--one-page").length) {
            var headerScrollPos = 130;
            var stricky = $(".sticky-header--one-page");
            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass("active");
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass("active");
            }
        }

        var scrollToTopBtn = ".scroll-to-top";
        if (scrollToTopBtn.length) {
            if ($(window).scrollTop() > 500) {
                $(scrollToTopBtn).addClass("show");
            } else {
                $(scrollToTopBtn).removeClass("show");
            }
        }
    });

})(jQuery);