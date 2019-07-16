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


	let swiperPartners = new Swiper(".slider .swiper-container", {
		slidesPerView: 4,
		a11y:{
			enabled: document.body.classList.contains("special__body")
		},
		loop: true,
		roundLengths: true,
		autoplay: false,
		spaceBetween: 40,
		navigation: {
	        nextEl: '.slider__nav .swiper-button-next',
	        prevEl: '.slider__nav .swiper-button-prev',
	    },
	    breakpoints: {
			1000: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			660: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			
		}
	});


	let swiperStandartBanner = new Swiper(".standart-slider .swiper-container", {

		effect: "fade",
		a11y:{
			enabled: document.body.classList.contains("special__body")
		},
		slidesPerView: 1,
		loop: true,
		roundLengths: true,
		autoplay: true,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true
		},
		navigation: {
	        nextEl: '.standart-slider .swiper-button-next',
	        prevEl: '.standart-slider .swiper-button-prev',
	      },
	});

	let swiperStandartTextSlider = new Swiper(".standart__text-slider  .swiper-container", {

		slidesPerView: 4,
		loop: true,
		roundLengths: true,
		// autoplay: true,
		spaceBetween: 40,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true
		},
		navigation: {
	        nextEl: '.standart__text-slider .swiper-button-next',
	        prevEl: '.standart__text-slider .swiper-button-prev',
	      },
	});



	$(window).on('scroll load', function(){
		if ($(".support-stat__item-num").length)
			if ($(".support-stat__item-num").offset().top + 50 <=
				$(window).scrollTop() + $(window).height()){
					$(".support-stat__item-num:not(.countered)").each((i, el) => {
						let $this = $(el),
							speed = 0;

						switch (i){
							case 0:
								speed = 4000;
							break;
							case 1:
								speed = 2000;
							break;

							default:
								speed = 3000;
						}

						$this.width($this.width())

						$this.countTo({
							speed: speed,
							onComplete(){
								$this.width("auto")
							}
						});

						$this.addClass("countered");
					});
			}

	})


	if($('body').hasClass('page-personal')){



		var list = document.querySelector('#filial__list');

		if(list){
			window.observer = new MutationObserver(function(mutations) {
			    mutations.forEach(function(mutation) {
			     let input = mutation.addedNodes[0].querySelector(".forms-input-cont--file:first-child:nth-last-child(2) .forms__input--file");

			     // console.log(mutation, input)

			     if (input)
			     	input.addEventListener("change", InputFileChange);
			    });
			});
			  
			observer.observe(list, {
			  	attributes: false, 
			  	childList: true, 
			  	characterData: false
			})
		  	
		}

		$("body").on("change", ".forms__input--file", function(e){

			var value = $(this)[0].files[0].name;
			// console.log(value);
			var inputHasFile = $(this).next('input[type="text"]').val(value);

			if(inputHasFile.length){
				$(this).nextAll('label').remove();
				// $(this).nextAll(".js__input-del").addClass('close-input');
			}

		});


	};


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
