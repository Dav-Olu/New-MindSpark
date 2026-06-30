(function ($) {
    "use strict";

    $(window).on("load", function () {
        document.addEventListener("preloaderDone", function () {
            setTimeout(() => { 
                bwsplit_lettersHeading(); 
                bwSplitTextScroll();
                bwsplit_title();
                bwsplit_titleTwo();
            }, 300);
        });
    });

    function isRTL() {
        return document.documentElement.dir === "rtl";
    }


    gsap.registerPlugin( ScrollTrigger, SplitText);


    const mm = gsap.matchMedia();

    function initWOW() {
        if ($(".wow").length) {
            var wow = new WOW({
                boxClass: "wow",
                animateClass: "animated",
                mobile: true,
                live: true,
            });
            wow.init();
        }
    }

    // Title Animation

    function bwsplit_title() {

        document.querySelectorAll(".bw-spilt-title-one").forEach((atEl) => {
            const atSplit = new SplitText(atEl, {
                type: "words,chars",
                wordsClass: "word",
                charsClass: "char",
            });

            let atDuration = parseFloat(atEl.getAttribute("data-speed")) || 1;
            let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

            if (window.innerWidth <= 768) {
                atDuration = atDuration * 0.3;
            }

            gsap.set(atSplit.words, {
                willChange: "transform",
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            gsap.set(atSplit.chars, {
                willChange: "transform",
                opacity: 0,
                rotateX: -80,
                transformOrigin: "center center -10px",
            });

            gsap.set(atEl, {
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            gsap.to(atSplit.chars, {
                scrollTrigger: {
                    trigger: atEl,
                    start: "top 80%",
                },
                opacity: 1,
                rotateX: 0,
                duration: atDuration,
                delay: atDelay,
                ease: "power3.out",
                stagger: {
                    each: 0.05,
                    from: "center",
                    grid: "auto",
                },
            });
        });

        document.querySelectorAll(".bw-spilt-title-two").forEach((twbEl) => {
            twbEl.style.display = "block";

            const twbSplit = new SplitText(twbEl, {
                type: "words",
            });
            const twbWords = twbSplit.words;

            const twbY = parseFloat(twbEl.getAttribute("data-y")) || 20;
            const twbRotation =
                parseFloat(twbEl.getAttribute("data-rotation")) || 0;
            const twbBlur =
                parseFloat(twbEl.getAttribute("data-blur")) || 5;
            const twbDuration =
                parseFloat(twbEl.getAttribute("data-duration")) || 0.75;
            const twbStagger =
                parseFloat(twbEl.getAttribute("data-stagger")) || 0.02;
            const twbOpacity = twbBlur > 0 ? 0 : 1;

            if (twbBlur > 0) {
                twbWords.forEach((twbWord) => {
                    twbWord.style.opacity = 1;
                });
            }

            let atDelay = parseFloat(twbEl.getAttribute("data-delay")) || 0;

            gsap.from(twbWords, {
                y: twbY,
                rotation: twbRotation,
                filter: `blur(${twbBlur}px)`,
                opacity: twbOpacity,
                duration: twbDuration,
                delay: atDelay,
                stagger: twbStagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: twbEl,
                    start: "top 100%",
                    once: true,
                },
            });
        });
    }

    function bwsplit_titleTwo() {
        const headings = document.querySelectorAll(".bw-spilt-title-three");

        headings.forEach(heading => {
            const text = heading.textContent;
            heading.innerHTML = "";
            text.split("").forEach((char, index) => {
                const span = document.createElement("span");
                span.innerHTML = char === " " ? "&nbsp;" : char;
                span.style.transitionDelay = `${index * 0.05}s`;
                span.classList.add("animate");
                heading.appendChild(span);
            });
        });
    }

    function bwsplit_lettersHeading() {
        const elements = document.querySelectorAll(".letters-fade-in");

        elements.forEach((element) => {
            const lines = element.innerHTML.split("<br>");
            element.innerHTML = "";

            let globalIndex = 0;

            lines.forEach((line, lineIndex) => {
                const words = line.trim().split(/\s+/);

                words.forEach((word) => {
                    const wordSpan = document.createElement("span");
                    wordSpan.className = "word";

                    [...word].forEach((letter) => {
                        const charSpan = document.createElement("span");
                        charSpan.className = "char";
                        charSpan.textContent = letter;

                        const delayStep = parseFloat(element.dataset.delay) || 0.09;
                        charSpan.style.setProperty("--transition-delay", `${globalIndex * delayStep}s`);

                        wordSpan.appendChild(charSpan);
                        globalIndex++; 
                    });

                    element.appendChild(wordSpan);
                    element.appendChild(document.createTextNode(" "));
                    globalIndex++;
                });

                if (lineIndex < lines.length - 1) {
                    element.appendChild(document.createElement("br"));
                }
            });

            ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                once: true,
                onEnter: () => element.classList.add("is-visible"),
            });
        });
    }

    function bwSplitTextScroll() {
        document.querySelectorAll(".bw-split-text").forEach((el) => {
            const split = new SplitText(el, {
                type: "lines"
            });

            split.lines.forEach((line) => {
                gsap.fromTo(
                    line, {
                        backgroundPositionX: "100%"
                    }, {
                        backgroundPositionX: "0%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: line,
                            scrub: 1,
                            start: "top 90%",
                            end: "bottom center"
                        }
                    }
                );
            });
        });
    }

    function bwHeroAnimation() {

        mm.add("(min-width: 992px)", () => {
            document.querySelectorAll(".title-anim").forEach((el) => {

                const split = new SplitText(el, {
                    type: "words,chars",
                    wordsClass: "word",
                    charsClass: "char"
                });
                gsap.set(split.chars, {
                    scaleY: 0,
                    opacity: 0,
                    transformOrigin: "top center"
                });
                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    }
                });
                split.words.forEach((word) => {
                    const letters = word.querySelectorAll(".char");
                    tl.to(letters, {
                        scaleY: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.05
                    });
                });
            });

            const tlCustomer = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-one__customer",
                    start: "top 80%",
                }
            });

            tlCustomer.from(".hero-one__customer__thumb img", {
                x: -80,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.3
            })

            .from(".hero-one__customer__funfact", {
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            const tlLetter = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-one__quick-wrap",
                    start: "top 80%",
                }
            });

            tlLetter.from(".hero-one__quick-wrap", {
                x: 150,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.3
            })

            .from(".hero-one__list-wrap ul li", {
                x: 150,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.3
            });
        });
    }

    function bwHeroAnimationTwo(){
        mm.add("(min-width: 992px)", () => {

            const tlLetter = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-two__funfact",
                    start: "top 80%",
                }
            });

            tlLetter.from(".hero-two__funfact", {
                x: 250,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.3
            })

            .from(".hero-two__list-wrap ul li", {
                x: 150,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            })
            // .from(".hero-two__icon", {
            //     x: -150,
            //     opacity: 0,
            //     duration: 1.5,
            //     ease: "power3.out",
            //     stagger: 0.2
            // });
        });
    }

    function bwHeroAnimationThree(){
        mm.add("(min-width: 992px)", () => {

            const tlLetter = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-three__list-wrap",
                    start: "top 80%",
                }
            });

            tlLetter.from(".hero-three__list-wrap ul li", {
                x: -150,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.3
            })
            .from(".hero-three__thumb img", {
                y: -150,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            }, "<")
            .from(".hero-three__customer__thumb img", {
                x: -150,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            }, "<")
            .from(".hero-three__customer__funfact", {
                x: 150,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.3
            }, "<")
        });
    }

    function bwanimateHeroFour() {
        document.querySelectorAll(".hero-four__title-box").forEach(box => {
            const split = new SplitText(box, {
                type: "chars",
                charsClass: "char-inner"
            });
            gsap.set(split.chars, {
                y: 100,
                opacity: 0,
                rotateX: -90,
                filter: "blur(10px)"
            });
            gsap.to(split.chars, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.1,

                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        const tlLetter = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-four__list-wrap",
                start: "top 80%",
            }
        });

        tlLetter.from(".hero-four__list-wrap ul li", {
            x: -150,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3
        })

        const tlimage = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-four__thumb",
                start: "top 80%",
            }
        });
        tlimage.from(".hero-four__thumb img", {
            x: 150,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            stagger: 0.3
        })
        tlimage.fromTo(".hero-four__text", 
            { y: 150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.3 }
        );
    }

    function initHeroBannerAnimation() {
       mm.add("(min-width: 992px)", () => {
            const banner = document.querySelector(".hero-four__banner__move");
            const bannerInner = document.querySelector(".hero-four__banner__box");
            if (!banner) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-four",
                    start: "top -100%",
                    end: "+=200%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.3,
                    anticipatePin: 1
                }
            });
            tl.to(banner, {
                y: "120vh",
                ease: "none",
                duration: 1
            })
            .to(bannerInner, {
                x: "-55%",
                rotation: 360,
                ease: "none",
                duration: 1
            })
            .to(banner, {
                x: "55%",
                y: "120vh",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                ease: "none"
            })
            .to(banner, {
                width: "100vw",
                height: "100vh",
                borderRadius: 0,
                ease: "none"
            })
            .to(bannerInner, {
                maskImage: "none",
                webkitMaskImage: "none",
                ease: "none"
            }, "<");
        });
    }

    function initDualHoverText() {
        document.querySelectorAll(".footer-widget__social-link a").forEach(link => {
            let text = link.textContent.trim();
            link.innerHTML = `
            <span class="social-wrap">
                <span class="social-top">${text}</span>
                <span class="social-bottom">${text}</span>
            </span>
            `;
            let topText = link.querySelector(".social-top");
            let bottomText = link.querySelector(".social-bottom");
            let splitTop = new SplitText(topText, { type: "chars" });
            let splitBottom = new SplitText(bottomText, { type: "chars" });
            gsap.set(splitBottom.chars, { y: "100%" });

            let tl = gsap.timeline({ paused: true });

            tl.to(splitTop.chars, {
                y: "-100%",
                stagger: 0.03,
                duration: 0.4,
                ease: "power2.out"
            })
            .to(splitBottom.chars, {
                y: "0%",
                stagger: 0.03,
                duration: 0.4,
                ease: "power2.out"
            }, 0);

            link.addEventListener("mouseenter", () => tl.play());
            link.addEventListener("mouseleave", () => tl.reverse());

        });
    }


    // Big Taxt Animation

    function initFooterBigTextAnim() {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".main-footer__big-text",
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            }
        });

        tl.from(".main-footer__big-text", {
            x: 300,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });

        tl.fromTo(
            ".main-footer__big-text span", {
                scaleY: 1
            }, {
                scaleY: 1.6,
                duration: 0.35,
                yoyo: true,
                repeat: 1,
                stagger: 0.12,
                ease: "power2.out"
            },
            "-=0.3"
        );
    }

    function initFooterBigTextAnimTwo() {

        const tlTwo = gsap.timeline({
            scrollTrigger: {
                trigger: ".main-footer__big-text-two",
                start: "top 90%",
                toggleActions: "play none none none",
                once: true
            }
        });

        tlTwo.fromTo(
            ".main-footer__big-text-two span",
            { scaleY: 1 },
            { 
                scaleY: 0.6,
                duration: 0.35,
                yoyo: true,
                repeat: 1,
                stagger: 0.18,
                ease: "power3.out"
            }
        );
    }

    // Image Animation

    function initScaleAnimations() {
        const scales = document.querySelectorAll(".scale");
        scales.forEach((item) => {
            gsap.to(item, {
                scale: 1,
                duration: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            });
        });
        const images = document.querySelectorAll(`${".scale"} img`);
        images.forEach((img) => {
            gsap.set(img, {
                scale: 1.3
            });
            gsap.to(img, {
                scale: 1,
                duration: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            });
        });
    }

    function image_animation() {
        gsap.utils.toArray(".bw-img-anim-left").forEach((img) => {
            gsap.to(img, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        gsap.utils.toArray(".bw-img-anim-right").forEach((img) => {
            gsap.to(img, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }

    function initImageParallax() {
        mm.add("(min-width: 992px)", () => {
            gsap.utils.toArray(".img-container").forEach((wrap) => {
            const img = wrap.querySelector("img");
            if (!img) return;

            gsap.fromTo(img,
                { y: "-10%" },
                {
                y: "10%",
                ease: "none",
                scrollTrigger: {
                    trigger: wrap,
                    scrub: true
                }
                }
            );
            });
        });
    }

    function imageHoverScrollReveal() {
        document.querySelectorAll(".image-hover").forEach((el) => {
            gsap.to(el, {
            "--before-x": "-100%",
            "--after-x": "100%",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 30%",
                scrub: true
            }
            });
        });
    }


    function error_animation() {
        const bwtl = gsap.timeline({});

        bwtl.from(".error-404__title > span", {
                duration: 1.5,
                y: "-100vh",
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            })
            .from(".error-404__subtitle", {
                duration: 1,
                y: 40,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.3")
            .from(".error-404__shape img", {
                duration: 1,
                x: 40,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.3")
            .from(".error-404__text", {
                duration: 1,
                y: 40,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.6");
    }

    function footerCTAScrollAnimation() {
        if (document.querySelectorAll(".footer__cta").length > 0) {
            var tl = gsap.timeline({
                ease: "none",
                scrollTrigger: {
                    trigger: ".footer__cta",
                    pin: true,
                    pinSpacing: true,
                    scrub: 2,
                    start: 'bottom 100%',
                    end: "200%",
                }
            });
            tl.to(".footer__cta .footer__cta__bg", {
                scale: "10",
                delay: 0.1,
                ease: "power2.in"
            });
            tl.to(".footer__cta .footer__cta__title", {
                fontSize: "clamp(32px, 12vw, 140px)",
                ease: "power2.in"
            }, "<");

            tl.to(".footer__cta .footer__cta__link", {
                fontSize: "clamp(14px, 2.5vw, 32px)",
                ease: "power2.in"
            }, "<");
        }
    }

    function pricingStickyActive() {

        if ($(".pricing-card").length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        var $cards = $(".pricing-card");
        var $plans = $(".pricing-card-categories-plan__item");

        $cards.each(function (index) {

            ScrollTrigger.create({
                trigger: this,
                start: "top center",
                end: "bottom center",

                onEnter: function () {
                    setActive(index);
                },
                onEnterBack: function () {
                    setActive(index);
                }
            });

        });

        function setActive(index) {
            $cards.removeClass("active");
            $plans.removeClass("active");

            $cards.eq(index).addClass("active");
            $plans.eq(index).addClass("active");
        }
    }

    function initFadeAnimations() {
        const fadeArray_items = document.querySelectorAll(".bwfade-anim");

        if (fadeArray_items.length > 0) {
            const fadeArray = gsap.utils.toArray(".bwfade-anim");

            fadeArray.forEach((item) => {
                let fade_direction = "bottom";
                let onscroll_value = 1;
                let duration_value = 1.15;
                let fade_offset = 50;
                let delay_value = 0.15;
                let ease_value = "power2.out";
                if (item.getAttribute("data-offset")) {
                    fade_offset = parseInt(item.getAttribute("data-offset"));
                }
                if (item.getAttribute("data-duration")) {
                    duration_value = parseFloat(item.getAttribute("data-duration"));
                }
                if (item.getAttribute("data-direction")) {
                    fade_direction = item.getAttribute("data-direction");
                }
                if (item.getAttribute("data-on-scroll")) {
                    onscroll_value = parseInt(item.getAttribute("data-on-scroll"));
                }
                if (item.getAttribute("data-delay")) {
                    delay_value = parseFloat(item.getAttribute("data-delay"));
                }
                if (item.getAttribute("data-ease")) {
                    ease_value = item.getAttribute("data-ease");
                }
                let animation_settings = {
                    opacity: 0,
                    ease: ease_value,
                    duration: duration_value,
                    delay: delay_value,
                };
                if (fade_direction === "top") {
                    animation_settings.y = -fade_offset;
                }
                if (fade_direction === "left") {
                    animation_settings.x = -fade_offset;
                }
                if (fade_direction === "bottom") {
                    animation_settings.y = fade_offset;
                }
                if (fade_direction === "right") {
                    animation_settings.x = fade_offset;
                }
                if (onscroll_value === 1) {
                    animation_settings.scrollTrigger = {
                        trigger: item,
                        start: "top 85%",
                    };
                }

                gsap.from(item, animation_settings);
            });
        }
    }

    function initServiceAnimation() {
        mm.add("(min-width: 992px)", () => {
            const area = document.querySelector(".service-area");
            if (!area) return;

            const boxes = area.querySelectorAll(".service-card");
            if (boxes.length === 0) return;

            gsap.from(boxes, {
                x: "100%",
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    scrub: 2,
                    trigger: area.querySelector(".service-area__inner"),
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse",
                }
            });
        });
    }

    // Smooth Scroll
    // function initSmoothScroll() {
    //     if (
    //         typeof gsap === "undefined" ||
    //         typeof ScrollSmoother === "undefined" ||
    //         !document.querySelector("#smooth-wrapper") ||
    //         !document.querySelector("#smooth-content")
    //     ) {
    //         return;
    //     }

    //     gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    //     ScrollSmoother.create({
    //         wrapper: "#smooth-wrapper",
    //         content: "#smooth-content",
    //         smooth: 1.35,
    //         smoothTouch: 0.15,
    //         effects: true,
    //         ignoreMobileResize: true,
    //     });

    //     ScrollTrigger.refresh();
    // }

    function scrollTopPercentage() {
        const scrollElementWrap = $("#scroll-top");
        const scrollValueEl = $("#scroll-top-value");

        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                const scrollValue = Math.round(self.progress * 100);

                scrollElementWrap.css(
                    "background",
                    `conic-gradient(var(--pikiz-base) ${scrollValue}%, var(--pikiz-white) ${scrollValue}%)`
                );

                if (self.scroll() > 100) {
                    scrollElementWrap.addClass("active");
                } else {
                    scrollElementWrap.removeClass("active");
                }
                if (scrollValue < 96) {
                    scrollValueEl.text(`${scrollValue}%`);
                } else {
                    scrollValueEl.html('<i class="fas fa-arrow-up"></i>');
                }
            },
        });

        scrollElementWrap.on("click", function () {
            gsap.to(window, {
                scrollTo: {
                    y: 0
                },
                duration: 1,
                ease: "power2.out",
            });
        });
    }

    // Work Three Anmimation
    function designChooseAnimation() {
        if (!document.querySelectorAll('.work-three-wrap').length) return;

        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {

            document.querySelectorAll('.work-three-wrap').forEach(wrap => {

                const pairs = wrap.querySelectorAll('.item:nth-child(odd)');

                pairs.forEach(pair => {

                    const item1 = pair.querySelector('.work-three-style-one');
                    const item2 = pair.nextElementSibling ?.querySelector('.work-three-style-two');

                    if (!item1 || !item2) return;

                    gsap.set(item1, {
                        xPercent: -120,
                        rotate: -40
                    });
                    gsap.set(item2, {
                        xPercent: 120,
                        rotate: 40
                    });

                    gsap.timeline({
                            scrollTrigger: {
                                trigger: pair,
                                start: "top 90%",
                                end: "top 20%",
                                scrub: 1,
                            }
                        })
                        .to(item1, {
                            xPercent: 0,
                            rotate: 0,
                            ease: "none"
                        }, 0)
                        .to(item2, {
                            xPercent: 0,
                            rotate: 0,
                            ease: "none"
                        }, 0);

                });
            });

            return () => {
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        });
    }
    
    // Button Circle Button Hover
    function pikizCircleButtonHover() {

        $(".pikiz-circle-btn").on("mouseenter mouseleave", function (e) {
            const x = e.pageX - $(this).offset().left;
            const y = e.pageY - $(this).offset().top;

            $(this).find(".pikiz-circle-btn__dot").css({
                left: x,
                top: y
            });
        });

        const wrappers = gsap.utils.toArray(".pikiz-circle-btn__wrapper");
        const buttons = gsap.utils.toArray(".pikiz-circle-btn");

        wrappers.forEach((wrapper, i) => {

            $(wrapper).on("mousemove", function (e) {
                parallax(e, buttons[i], 80);
            });

            $(wrapper).on("mouseleave", function () {
                gsap.to(buttons[i], {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: "power2.out"
                });
            });

            function parallax(e, target, movement) {
                const $this = $(wrapper);
                const relX = e.pageX - $this.offset().left;
                const relY = e.pageY - $this.offset().top;

                gsap.to(target, {
                    duration: 0.5,
                    x: ((relX - $this.width() / 2) / $this.width()) * movement,
                    y: ((relY - $this.height() / 2) / $this.height()) * movement,
                    ease: "power2.out"
                });
            }
        });
    }

    function playLoaderAnimation() {
        const svg = document.getElementById("svg");
        const tl = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0,
        });
        tl.to(svg, {
            duration: 0.5,
            attr: {
                d: curve
            },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.5,
            attr: {
                d: flat
            },
            ease: "power2.easeOut",
        });
        tl.to(".loader-wrap", {
            y: -1500,
        });
        tl.to(".loader-wrap", {
            zIndex: -1,
            display: "none",
        });
        tl.from(
            "main", {
                y: 100,
                opacity: 0,
                delay: 0.3,
            },
            "-=1.5"
        );
    }

    // Custom Cursor 
    function initWorkCardCursor(options = {}) {
        const {
            cardSelector = ".cursor-text",
            cursorSelector = ".custom-cursor-text",
            defaultText = "VIEW",
            followSpeed = 0.25
        } = options;

        const cursor = document.querySelector(cursorSelector);
        const cards = document.querySelectorAll(cardSelector);

        if (!cursor || !cards.length) return;

        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: followSpeed,
            ease: "power3.out"
            });
        });

        cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
            cursor.textContent = card.dataset.cursorText || defaultText;

            gsap.to(cursor, {
                opacity: 1,
                scale: 1,
                duration: 0.25
            });
            });

            card.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
                opacity: 0,
                scale: 0.8,
                duration: 0.25
            });
            });
        });
    }

    function heroImageFullScreen() {
        mm.add("(min-width: 1200px)", () => {
            const hero = document.querySelector(".banner-image__fullscreen");
            const box = document.querySelector(".banner-image__box");
            if (!hero || !box) return;

            gsap.to(box, {
                width: "100vw",
                height: "100vh",
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true
                }
            });
        });
    }

    function serviceItemScaleAnimation() {
        document.querySelectorAll(".service-two__item, .service-three__item").forEach((item) => {
            gsap.to(item, {
                scale: 1,
                opacity: 1,
                y: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "bottom 60%",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    // markers: true
                }
            });
        });
    }

    function serviceItemScaleAnimationTwo() {
        document.querySelectorAll(".service-four__item").forEach((item) => {
            gsap.to(item, {
                opacity: 1,
                scale: 1,
                x: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "bottom 60%",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    toggleActions: "play reverse play reverse"
                }
            });
        });
    }

    function bannerReveal() {
        const shapes = document.querySelectorAll(".banner-image__wrap__shape");
        gsap.fromTo(
            shapes,
            { y: 0 },
            {
               y: (index) => (index % 2 === 0 ? "-100%" : "100%"),
                ease: "power3.out",
                duration: 1,
                scrollTrigger: {
                    trigger: ".banner-image__one",
                    start: "top 30%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    function bannerRevealTwo() {
        const shapes = document.querySelectorAll(".banner-image__three__wrap__shape");
       gsap.to(shapes, {
            width: "0%",
            duration: 0.5,
            ease: "power3.inOut",
            stagger: 0.05,
            scrollTrigger: {
                trigger: ".banner-image__three",
                start: "top 30%",
                toggleActions: "play none none reverse"
            }
        });
    }

    function faqShapeRotate() {
        const svg = document.querySelector(".faq-shape-svg");
        const svgPath = document.querySelector(".faq-shape-svg path");
        if (!svg) return;
        mm.add("(min-width: 1200px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".faq-three",
                    start: "top -100%",
                    end: "+=200%",
                    pin: true,
                    scrub: 1.3,
                    anticipatePin: 1
                }
            });

            tl.to(svg, {
                y: "120vh",
                ease: "none",
                duration: 1
            });

            tl.to(svg, {
                rotation: 720,
                scale: 20,
                transformOrigin: "50% 50%",
                ease: "none",
                duration: 1
            });
            tl.to(svgPath, {
                fill: "#FFF5F0",
                ease: "none",
                duration: 1
            }, "<");
            tl.to(".faq-three", {
                backgroundColor: "#FFF5F0",
                duration: 0.45,
            }, "-=0.50");
        });
    }

    function faqShapeRotateTwo() {
        const svg = document.querySelector(".funfact-one__shape");
        if (!svg) return;
        mm.add("(min-width: 1200px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".funfact-one",
                    start: "top -120%",
                    end: "+=200%",
                    pin: true,
                    scrub: 1.3,
                    anticipatePin: 1
                }
            });

            tl.to(svg, {
                y: "100vh",
                ease: "none",
                duration: 1
            });
            
            tl.to(svg, {
                x: "55%",
                ease: "none",
                duration: 1
            });
            tl.to(svg, {
                rotation: 720,
                scale: 20,
                transformOrigin: "50% 50%",
                ease: "none",
                duration: 1
            });
            tl.to(".funfact-one", {
                backgroundColor: "#0C0610",
                duration: 0.45,
            }, "-=0.50");
        });
    }

    function initActuallyAreaAnimation() {
        mm.add("(min-width: 992px)", () => {
            const section = document.querySelector(".cta-two-area");
            if (!section) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: "top top",
                end: "bottom+=1500 top",
                }
            });

            const split = new SplitText(section.querySelectorAll(".bw_line"), { type: "lines" });

            split.lines.forEach((line) => {
                gsap.fromTo(line, 
                { backgroundPositionX: document.documentElement.dir === "rtl" ? "0%" : "100%" },
                {
                    backgroundPositionX: document.documentElement.dir === "rtl" ? "100%" : "0%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: line,
                        scrub: 1,
                        start: "top 25%",
                        end: "center 25%",
                    }
                });

            });

            tl.to(section.querySelector(".cta-two-area-scale"), {
                scale: 40,
                opacity: 0,
                ease: "power4.inOut",
                delay: 0.35,
                duration: 0.75,
            });

            tl.to(section, {
                backgroundColor: "#0C0610",
                duration: 0.45,
            }, "-=0.50");
        });
    }

    function initBrandBannerAnimation() {
        mm.add("(min-width: 992px)", () => {
            gsap.utils.toArray(".brand-banner__item").forEach((item) => {

                const bg = item.querySelector(".brand-banner__item__bg");
                const overlay = item.querySelector(".brand-banner__item__shape");
                const texts = item.querySelectorAll(".brand-banner__item__text");
                const textBox = item.querySelector(".brand-banner__item__text-box");

                let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top top",
                    end: "+=120%",
                    scrub: 1,
                    pin: true
                }
                });
                tl.from(bg, {
                    scale: 1.3,
                    y: 150,
                    ease: "none"
                }, 0);

                tl.to(texts, {
                    y: 0,
                    stagger: 0.15,
                    ease: "power4.out",
                    duration: 1
                }, 0.2);
                tl.to(textBox, {
                    y: -200,
                    ease: "none"
                }, 0.5);

                tl.to(overlay, {
                    autoAlpha: 0.7,
                    ease: "none",
                    duration: 0.6
                }, 0.5);

            });
        });
    }

    function initApproachAnimation() {
        mm.add("(min-width: 992px)", () => {
            const box = document.querySelector(".approach-area__content__box");
            if (!box) return;
            gsap.set(box, { x: 440, y: -80 });

            gsap.to(box, {
                x: 0,
                y: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".approach-area",
                    start: "top top",
                    end: "+=120%",
                    scrub: 1,
                    pin: true
                }
            });

        });
    }

    function cinematicCtaReveal() {
        mm.add("(min-width: 992px)", () => {
            if (!document.querySelector(".cta-footer-two")) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: ".cta-footer-two",
                start: "bottom 100%",
                end: "+=200%",
                scrub: true,
                pin: true,
                anticipatePin: 1
                }
            });

            tl.to(".cta-footer-two__bg", {
                opacity: 1,
                duration: 1,
                scale: 1,
                ease: "none"
            })
            .to(".cta-footer-two__content", {
                scale: 1,
                filter: "blur(0px)",
                duration: 2,
                ease: "power2.out"
            }, ">-=0.2");
        });
    }

    $(document).ready(function () {
        setTimeout(function () {
            $('#container').addClass('loaded');
        }, 500);

        setTimeout(function () {
            $('.loader-wrap').fadeOut(1000, function () {
                $(this).remove();
                document.dispatchEvent(new Event("preloaderDone"));
            });
        }, 3000);
    });

    $(window).on("load", function () {
        playLoaderAnimation();
        initHeroBannerAnimation();
        ScrollTrigger.refresh();
        document.addEventListener("preloaderDone", function () {

            initBrandBannerAnimation();
            ScrollTrigger.refresh();
            initWorkCardCursor();
            heroImageFullScreen();
            serviceItemScaleAnimation();
            ScrollTrigger.refresh();
            error_animation();
            initImageParallax();
            pricingStickyActive();
            initFadeAnimations();
            initScaleAnimations();
            initApproachAnimation();
            initServiceAnimation();
            scrollTopPercentage();
            designChooseAnimation();
            pikizCircleButtonHover();
            footerCTAScrollAnimation();
            initWOW()
            imageHoverScrollReveal();
            bannerReveal();
            bannerRevealTwo();
            faqShapeRotate();
            faqShapeRotateTwo();
            initActuallyAreaAnimation();
            serviceItemScaleAnimationTwo();
            cinematicCtaReveal();
            bwHeroAnimation();
            bwHeroAnimationTwo();
            bwHeroAnimationThree();
            bwanimateHeroFour();
            initFooterBigTextAnimTwo();
            initDualHoverText();
            
            setTimeout(() => { image_animation();}, 500);
            if (document.querySelector(".main-footer__big-text")) { initFooterBigTextAnim(); }

        });
    });

})(jQuery);