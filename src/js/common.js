import $ from "jquery";
import  is from "is_js"
import Swiper from "swiper/dist/js/swiper.js";
import "./stock-sliders.js";
import "selectize/dist/js/selectize.min.js";

import "./tabs.js";
import "./accordion.js";
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

	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 23,
		slidesPerView: 5,
		loop: true,
		freeMode: true,
		// loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
    });

    var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		effect: "fade",
		loop: true,
		// loopedSlides: 5, //looped slides should be the same
		navigation: {
			nextEl: '.gallery-thumbs .swiper-button-next',
			prevEl: '.gallery-thumbs .swiper-button-prev',
			},
			thumbs: {
			swiper: galleryThumbs,
		},
    });


	

	



	




	$('.submenu').each((i,el) => {
		let $this = $(el);

		$this.closest('.head__menu-item').addClass('js__has-submenu');
	})


	$("body").on("click change", ".btn-clear", function(){
		$(this).prevAll('input[type="text"]').val("");
		
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




	$("body").on("click", ".scroll-top", function(){
        var scrollTop = $(window).scrollTop();
        $("html, body").animate({"scrollTop": 0}, "slow")
    });

	if (!is.touchDevice())
		$('select:not(.no-selectize)').each(function(i,el){
			let $this = $(el);

			$this.selectize({
				create: true,
			});

		})



});



$(window).on("load scroll resize touchmove", e => {

	if($(window).scrollTop() > 100){

		setTimeout(e => {
			$('.history__intro').remove();
			$('body').addClass('js__history-animate');
		}, 200);


	}

	if ($(window).scrollTop() > 800){
		$(".scroll-top").fadeIn(300);
		$(".scroll-top").css({
			'display': 'flex',
		})

	}else{
		$(".scroll-top").fadeOut(300);
		$(".scroll-top").removeClass('js__scrolled');
	};

	
});
