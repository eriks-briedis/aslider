/*
 * Ajax Slider v.0.1
 *
 * Author Eriks Briedis
 * http://eriks.designschemers.com
 * @eriks_b
 *
 * Copyright 2013, Eriks Briedis
 * License: GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */

(function($){

	$.fn.aslide = function(options){

		// the default settings
		var defaults = {
			width : 700,
			height : 400,
			autoplay : false,
			effect : 'fade',
			effect_duration : 600,
			slide_duration : 1500
		};

		var wrapper = this,
			slider = $(wrapper).selector,
			slides = $(wrapper).children('li'),
			count = 0,
			num_slides = $(slides).length,
			cur_slide = 0;

		$(slides).css('display', 'none');

		// let's get the animation going
		var animate = function(direction){

			//check if current slide count is in the range of total slide number
			if(count < num_slides){

				if(direction == undefined || direction == 'right'){
					count++;
				}else{
					count = cur_slide - 1;
				}

				$(slides).fadeOut(defaults.effect_duration);
				$(slides).eq(count).fadeIn(defaults.effect_duration, function(){

					if( defaults.autoplay === true ){ // only execute if autoplay is enabled
						setTimeout(function(){
						}, defaults.slide_duration); //let's wait for slide_duration and run animate again to show the next slide
					}
					cur_slide = $(this).index();
				});

			}else{
				count = 0; // reset count to start over
				animate(); // starting over

			}

		}

		var init = function(){

			// adding classes to ul an li tags
			$(slider).addClass('aslider').children('li').addClass('slide');
			$(slider).css({'width' : defaults.width, 'height' : defaults.height});



			// adding prev and next controls
			$(slider).append('<a class="slide-controls slide-left" data-direction="left" href="#"></a>');
			$(slider).append('<a class="slide-controls slide-right" data-direction="right" href="#"></a>');

			$('.slide-controls').click(function(){
				var direction = $(this).context.getAttribute('data-direction');
				animate(direction);
			});

			animate();
		}

		//let's do it!
		init();
	}

})(jQuery);