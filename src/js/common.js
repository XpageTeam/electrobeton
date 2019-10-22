import $ from "jquery";
import  is from "is_js"
import Swiper from "swiper/dist/js/swiper.js";
import "./stock-sliders.js";
import "selectize/dist/js/selectize.min.js";

// import "./tabs.js";
// import "./accordion.js";
import "./mobile-menu.js";
import "./standart-page.js"
import Sticky from "./x-widgets.js";


window.$ = $;
window.jQuery = $;
window.is = is;

require("./countTo.js");
require("../css/jquery.fancybox.css");

;(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})();

(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

document.addEventListener("DOMContentLoaded", e => {

	// $(".main-gallery__item figure").height(Math.max(...$(".main-gallery__item img").map(function(){
	// 	return $(this).height();
	// })));

	$('body').on("change", "input[type='file']", function(){
		var value = $(this)[0].files[0].name;
		$(this).closest('.multifile-container').find('.forms__input--file-support[type="text"]').val(value);
	});
	


	$("body").click(function(e){
		if (!$(e.target).is($("aside"))
		&& !$("aside").has(e.target).length
		&& $("body").hasClass("js__open-filter")
		&& !$(e.target).is($(".ico-filter"))
		&& !$(".ico-filter").has(e.target).length){
			$("body").removeClass("js__open-filter")
		}
	});


	$('.cat-2').prepend('<div class="cat-2-filter"><div class="ico-filter"></div></div>');

	$('.ico-filter').click(function(){
		$('body').toggleClass('js__open-filter');
	});

	if (is.ie())
		$('body').addClass('ie-fix');
	
		$("picture").each(function(){
			$(this).find("img").attr("src", $(this).find("source").attr("srcset"))
		})

	$(".head-contacts__item.ico-special, .header-special__link").click(function(){
		Cookies.set("special", 1);
		location.reload();
	});

	require("./jquery.fancybox.js");

	var galleryThumbs = new Swiper('.gallery-thumbs .swiper-list', {
		spaceBetween: 23,
		slidesPerView: 5,
		loop: false,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.gallery-thumbs .swiper-button-next',
			prevEl: '.gallery-thumbs .swiper-button-prev',
		},
		breakpoints: {
			670: {
				slidesPerView: 3,
			}
		}
    });

    var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		effect: "fade",
		loop: false,
		// loopedSlides: 5, //looped slides should be the same
		navigation: {
			nextEl: '.gallery-top .swiper-button-next',
			prevEl: '.gallery-top .swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
    });

    var mainBanner = new Swiper('.main-banner .swiper-container', {
		spaceBetween: 0,
		slidesPerView: 1,
		loop: true,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		effect: "fade",
	    navigation: {
			nextEl: '.main-banner__slider-arrow .swiper-button-next',
			prevEl: '.main-banner__slider-arrow .swiper-button-prev',
		},
	    pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	    },


					
	});


	// var cardSlider = new Swiper('.card-slider__list .swiper-container', {
	// 	spaceBetween: 0,
	// 	slidesPerView: 1,
	// 	loop: true,
	// 	freeMode: true,
	// 	watchSlidesVisibility: true,
	// 	watchSlidesProgress: true,
	// 	autoHeight: true,
	// 	effect: "fade",
	//     navigation: {
	// 		nextEl: '.card-slider-arrow .swiper-button-next',
	// 		prevEl: '.card-slider-arrow .swiper-button-prev',
	// 		},
	//     pagination: {
	//         el: '.swiper-pagination',
	//         clickable: true,
	//     	},


					
	// });



	$('.submenu').each((i,el) => {
		let $this = $(el);

		$this.closest('.head__menu-item').addClass('js__has-submenu');
	})


	$("body").on("click change", ".btn-clear", function(){
		$(this).prevAll('input[type="text"]').val("");
		
	});





	// $("body").on("click", ".scroll-top", function(){
 //        var scrollTop = $(window).scrollTop();
 //        $("html, body").animate({"scrollTop": 0}, "slow")
 //    });

	if (!is.touchDevice())
		$('select:not(.no-selectize)').each(function(i,el){
			let $this = $(el);

			$this.selectize({
				create: true,
			});

		})

	$(".links-top").click(function(){
		let $this = $(this);

		$this.closest('.links-cont').toggleClass('js__open');
		// $this.nextAll('.links-bot-cont').slideToggle();
	});

	$(".card-characteristics__item-top").click(function(){
		let $this = $(this);

		$this.closest('.card-characteristics__item').toggleClass('js__open');
		$this.nextAll('.card-characteristics__item-bot').slideToggle();
	});


	$(".fancybox").fancybox({
		trapFocus: false,
		touch: false,
		buttons: ["fullscreen", "slideShow", "close"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});



});



// $(window).on("load scroll resize touchmove", e => {

// 	if ($(window).scrollTop() > 800){
// 		$(".scroll-top").fadeIn(300);
// 		$(".scroll-top").css({
// 			'display': 'flex',
// 		})

// 	}else{
// 		$(".scroll-top").fadeOut(300);
// 		$(".scroll-top").removeClass('js__scrolled');
// 	};

	
// });
