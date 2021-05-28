"use strict";

const menuBurger = document.querySelector(".menu-burger");
const menuBody = document.querySelector(".menu-body");
const headerSubMenuBtns = document.querySelectorAll(".header__sublist-btn");

menuBurger.addEventListener("click", function(){
    menuBurger.classList.toggle("_active");
    menuBody.classList.toggle("_active");
});

/////////////////////////////////////////////////////////////////////////////

if(document.querySelector(".intro-slider__container")){
    new Swiper('.intro-slider__container', {
        speed: 600,
        navigation: {
            nextEl: '.intro-slider__btn-next',
            prevEl: '.intro-slider__btn-prev',
        },
    
        pagination: {
            el: '.intro-slider__pagination',
            type: 'bullets',
            clickable: true,
        },
    });
}

if(document.querySelector(".news__mainslider-container")){
    new Swiper('.news__mainslider-container', {
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.news__mainslider-arrow',
        },
    });
}

if(document.querySelector(".quotes__slider-container")){
    let quotesSlider = new Swiper('.quotes__slider-container', {
        speed: 1600,   
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        simulateTouch: false,
        preventInteractionOnTransition: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.quotes__pagination',
            type: 'bullets',
            clickable: true,
        },
    });
    const quotesSwiperCont = document.querySelector(".quotes__slider-container");
    quotesSwiperCont.addEventListener("mouseenter", function(){
        quotesSlider.autoplay.stop();
        console.log("stop");
    });
    quotesSwiperCont.addEventListener("mouseleave", function(){
        quotesSlider.autoplay.start();
    })
}

if(document.querySelector(".team__slider-container")){
    new Swiper('.team__slider-container', {
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            520: {
                slidesPerView: 2,
            },
            700: {
                spaceBetween: 30,
            },
            860: {
                speed: 600,
                slidesPerView: 3,
                updateOnWindowResize: true,
            },
        },
        navigation: {
            nextEl: '.team__slide-btn-next',
            prevEl: '.team__slide-btn-prev',
        },
    });
}

if(document.querySelector(".about__images")){

    let mql = window.matchMedia('(min-width: 992.99px)');

    const aboutSlider = new Swiper('.about__images', {
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 5,
        updateOnWindowResize: false,
        loop: true,
        simulateTouch: false,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        breakpoints: {
            992.98: {
                speed: 600,
                slidesPerView: 3,
                updateOnWindowResize: true,
            },
        },
    });
    const aboutSliderCont = document.querySelector(".about__images");
    let aboutSlides = document.querySelectorAll(".about__images-item");
    function sliderWidthListener(eve){
        if(eve.matches){
            aboutSlider.update();
            aboutSlides = document.querySelectorAll(".about__images-item");      
            for(let i = 0; i < aboutSlides.length; i++){
                const aboutSlide = aboutSlides[i];
                aboutSlide.setAttribute("data-slide", i);
            }
            let activeSlide = +aboutSliderCont.querySelector(".swiper-slide-active").getAttribute("data-slide");
            setSlideWidth(aboutSliderCont, activeSlide);   
            aboutSlider.on('slideChange', slideChangeHandler);
        } else{
            aboutSlider.off('slideChange', slideChangeHandler);
            aboutSlider.update();
        }
    }

    function setSlideWidth(sliderContainer, activeSlide){
        sliderContainer.querySelector(`[data-slide="${activeSlide}"]`).style.width = "60.938%";
        activeSlide = activeSlide >= (aboutSlides.length - 1) ? 0 : activeSlide + 1; 
        sliderContainer.querySelector(`[data-slide="${activeSlide}"]`).style.width = "19.271%";
        activeSlide = activeSlide >= (aboutSlides.length - 1) ? 0 : activeSlide + 1;
        sliderContainer.querySelector(`[data-slide="${activeSlide}"]`).style.width = "19.271%";
    }

    function slideChangeHandler(){
        let activeSlide = +aboutSliderCont.querySelector(".swiper-slide-active").getAttribute("data-slide") + 1;
        aboutSlides.forEach(slide => {
            slide.style.width = `${aboutSliderCont.clientWidth / aboutSlider.params.slidesPerView - aboutSlider.params.spaceBetween}px`;
        });
        setSlideWidth(aboutSliderCont, activeSlide);
    }

    sliderWidthListener(mql);

    mql.addEventListener("change", sliderWidthListener);
}

/////////////////////////////////////////////////////////////////////////////

let slideTimeout;
let slideOpen = false;

let _slideToggle = (element, duration) => {
    window.clearTimeout(slideTimeout);
    if(!slideOpen){
        return _slideDown(element, duration);
    } else {
        return _slideUp(element, duration);
    }
}
let _slideDown = (element, duration = 500) => {
    slideOpen = true;
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') 
        display = 'block';

    element.style.display = display;
    let height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    element.offsetHeight;
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = duration + 'ms';
    element.style.height = height + 'px';
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    slideTimeout = window.setTimeout(function () {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration)
}

let _slideUp = (element, duration = 500) => {
    slideOpen = false;
    element.style.height = element.offsetHeight + 'px';
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = duration + 'ms';
    element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    slideTimeout = window.setTimeout(function () {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration)
}

/////////////////////////////////////////////////////////////////////////////

headerSubMenuBtns.forEach((btn) => {
    btn.addEventListener("click", function(){
        btn.classList.toggle("_active");
        _slideToggle(btn.parentElement.querySelector(".header__sublist-wrapper"));
    });
});

/////////////////////////////////////////////////////////////////////////////

baguetteBox.run('.works__gallery');

/////////////////////////////////////////////////////////////////////////////

const form = document.querySelector(".contact__form");

form.addEventListener("submit", function(e){
    formSend(e, this);
})

function formSend(e, form) {
    let errors = formValidate(form);

    if(errors > 0){
        e.preventDefault();
    }
}

function formValidate(form) {
    let errors = 0;
    const reqInputs = form.querySelectorAll("._req");

    for(let reqInput of reqInputs){

        reqInput.classList.remove("_err");

        if(reqInput.classList.contains("_email") && emailTest(reqInput)){
            errors++;
            reqInput.classList.add("_err");

        } else if(!reqInput.value){
            errors++;
            reqInput.classList.add("_err");
        }

    }

    return errors;
}


function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}