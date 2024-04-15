"use strict";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollSmoother);
console.clear();

select = function select(e) {
  return document.querySelector(e);
};

selectAll = function selectAll(e) {
  return document.querySelectorAll(e);
};

var stage = select('.stage');
var slides = selectAll(".slide");
var links = selectAll(".slide__scroll-link");
var titles = selectAll('.col__content-title');
var introTitle = new SplitText('.intro__title', {
  type: "lines",
  linesClass: "intro-line"
});
var splitTitles = new SplitText(titles, {
  type: "lines, chars",
  linesClass: "line",
  charsClass: "char",
  position: "relative"
});
var slideID = 0;
var smoother = ScrollSmoother.create({
  smooth: 2,
  effects: true,
  // normalizeScroll: true,
  smoothTouch: 0.1
});

function initHeader() {
  // animate the logo and fake burger button into place
  var tl = gsap.timeline({
    delay: 0.5
  });
  tl.from('.logo', {
    y: -40,
    opacity: 0,
    duration: 2,
    ease: 'power4'
  }).from('.nav-btn__svg rect', {
    scale: 0,
    transformOrigin: "center right",
    duration: 0.6,
    ease: 'power4',
    stagger: 0.1
  }, 0.6).to('.nav-rect', {
    scale: 0.8,
    transformOrigin: "center left",
    duration: 0.4,
    ease: 'power2',
    stagger: 0.1
  }, "-=0.6"); // create mouse animations for the faux burger button

  var navBtn = select('.nav-btn');
  navBtn.addEventListener("mouseover", function (e) {
    gsap.to('.nav-rect', {
      scaleX: 1,
      transformOrigin: "top left",
      duration: 0.4,
      ease: "power4"
    });
  });
  navBtn.addEventListener("mouseout", function (e) {
    gsap.to('.nav-rect', {
      scaleX: 0.8,
      transformOrigin: "top left",
      duration: 0.6,
      ease: "power4"
    });
  });
}

function initIntro() {
  // animate the intro elements into place
  var tl = gsap.timeline({
    delay: .5
  });
  tl.from('.intro-line', {
    // x: 100,
    y: 400,
    ease: 'power4',
    duration: 3
  }).from('.intro__txt', {
    x: -100,
    opacity: 0,
    ease: 'power4',
    duration: 3
  }, 0.7).from('.intro__img--1', {
    // x: -50,
    y: 150,
    opacity: 0,
    ease: 'power2',
    duration: 5
  }, 1).from('.intro__img--2', {
    // x: 50,
    y: -150,
    opacity: 0,
    ease: 'power2',
    duration: 5
  }, 1); // set up scrollTrigger animation for the when the intro scrolls out

  var stl = gsap.timeline({
    scrollTrigger: {
      trigger: '.intro',
      scrub: 1,
      start: "top bottom",
      // position of trigger meets the scroller position
      end: "bottom top"
    }
  });
  stl.to('.intro__title', {
    x: 400,
    ease: 'power4.in',
    duration: 3
  }).to('.intro__txt', {
    y: 100,
    ease: 'power4.in',
    duration: 3
  }, 0);
}

function initLinks() {
  // ScrollToPlugin links
  links.forEach(function (link, index, e) {
    var linkST = link.querySelector('.slide__scroll-line');
    link.addEventListener("click", function (e) {
      e.preventDefault();
      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: "#slide-" + (index + 2)
        },
        ease: "power2.inOut"
      });
      slideID++;
    });
    link.addEventListener("mouseover", function (e) {
      gsap.to(linkST, {
        y: 40,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power4"
      });
    });
    link.addEventListener("mouseout", function (e) {
      gsap.to(linkST, {
        y: 0,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power4"
      });
    });
  }); // ScrollToPlugin link back to the top

  var top = select('.footer__link-top');
  top.addEventListener("click", function (e) {
    e.preventDefault();
    scrollTop();
  });
  top.addEventListener("mouseover", function (e) {
    gsap.to('.footer__link-top-line', {
      scaleY: 3,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4"
    });
  });
  top.addEventListener("mouseout", function (e) {
    gsap.to('.footer__link-top-line', {
      scaleY: 1,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4"
    });
  }); // Dummy slide links

  var slideLinks = selectAll('.slide-link');
  slideLinks.forEach(function (slideLink, index, e) {
    var slideL = slideLink.querySelector('.slide-link__line');
    slideLink.addEventListener("mouseover", function (e) {
      gsap.to(slideL, {
        x: 20,
        scaleX: 0.3,
        transformOrigin: "right center",
        duration: 0.8,
        ease: "power4"
      });
    });
    slideLink.addEventListener("mouseout", function (e) {
      gsap.to(slideL, {
        x: 0,
        scaleX: 1,
        transformOrigin: "right center",
        duration: 0.8,
        ease: "power4"
      });
    });
  });
}

function initSlides() {
  // Animation of each slide scrolling into view
  slides.forEach(function (slide, i) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: slide,
        start: "40% 50%" // position of trigger meets the scroller position

      }
    });
    tl.from(slide.querySelectorAll('.col__content-title'), {
      ease: "power4",
      y: "+=5vh",
      duration: 2.5
    }).from(slide.querySelectorAll('.line__inner'), {
      y: 200,
      duration: 2,
      ease: "power4",
      stagger: 0.1
    }, 0).from(slide.querySelectorAll('.col__content-txt'), {
      x: 100,
      y: 50,
      opacity: 0,
      duration: 2,
      ease: "power4"
    }, 0.4).from(slide.querySelectorAll('.slide-link'), {
      x: -100,
      y: 100,
      opacity: 0,
      duration: 2,
      ease: "power4"
    }, 0.3).from(slide.querySelectorAll('.slide__scroll-link'), {
      y: 200,
      duration: 3,
      ease: "power4"
    }, 0.4).to(slide.querySelectorAll('.slide__scroll-line'), {
      scaleY: 0.6,
      transformOrigin: "bottom left",
      duration: 2.5,
      ease: "elastic(1,0.5)"
    }, 1.4);
  }); // External footer link scroll animation

  gsap.from('.footer__link', {
    scrollTrigger: {
      trigger: '.footer',
      scrub: 2,
      start: "50% 100%",
      // position of trigger meets the scroller position
      end: "0% 0%"
    },
    y: "20vh",
    ease: 'sine'
  });
}

function initParallax() {
  slides.forEach(function (slide, i) {
    var imageWrappers = slide.querySelectorAll('.col__image-wrap');
    gsap.fromTo(imageWrappers, {
      y: "-30vh"
    }, {
      y: "30vh",
      scrollTrigger: {
        trigger: slide,
        scrub: true,
        start: "top bottom",
        // position of trigger meets the scroller position
        snap: {
          snapTo: 0.5,
          // 0.5 'cause the scroll animation range is 200vh for parallax effect
          duration: 1,
          ease: 'power4.inOut'
        }
      },
      ease: 'none'
    });
  });
}

function scrollTop() {
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: "#slide-0"
    },
    ease: "power2.inOut"
  });
  gsap.to('.footer__link-top-line', {
    scaleY: 1,
    transformOrigin: "bottom center",
    duration: 0.6,
    ease: "power4"
  });
}

function initKeys() {
  document.addEventListener('keydown', function (e) {
    e.preventDefault();

    if (event.keyCode == 40) {
      //down arrow to next slide
      if (slideID <= slides.length) {
        slideID++;
        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: "#slide-" + slideID
          },
          ease: "power2.inOut"
        });
      }
    } else if (event.keyCode == 38) {
      // up arrow to top
      slideID = 0;
      scrollTop();
    }
  });
}

function init() {
  gsap.set(stage, {
    autoAlpha: 1
  });
  initHeader();
  initIntro();
  initLinks();
  initSlides();
  initParallax();
  initKeys();
}

window.onload = function () {
  init();
};
//# sourceMappingURL=green.dev.js.map
