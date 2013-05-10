/*
 * Ajax Slider v.0.1.1
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
			cur_slide = 0;

		//let's find the index for the next slide we need
		// @direction = undefined, right or left
		// @t_slide = int. if defined jump to that slide number
		var get_slide = function(direction, t_slide){
			if(t_slide != undefined){
				cur_slide = t_slide;
			}else if(direction == undefined || direction == 'right'){
				// checking if we need to return to the first slide or continue
				if(cur_slide + 1 >= $(slides).length){
					cur_slide = 0;
				}else{
					cur_slide++;
				}
			}else{
				// checking if this is the first slide
				// if this is the first slide then go to the last
				if(cur_slide - 1 < 0){
					cur_slide = $(slides).length - 1;
				}else{
					cur_slide--;
				}
			}
		};

		// let's get the animation going
		var animate = function(){

			$(slides).fadeOut(defaults.effect_duration)
			$(slides).eq(cur_slide).fadeIn(defaults.effect_duration);
			create_ctrls();

		}

		var create_ctrls = function(){
			if($('#aslider-ctrls') != 0){ //let's remove all children for aslider-ctrls to update the active one
				$('#aslider-ctrls').children().remove();
			}
			$(slider).append('<span id="aslider-ctrls"></span>');
			for(var i = 0; $(slides).length > i; i++){
				if(i == cur_slide){
					$('#aslider-ctrls').append('<span data-slide="'+i+'" class="ctrl-btn ctrl-active"></span>');
				}else{
					$('#aslider-ctrls').append('<span data-slide="'+i+'" class="ctrl-btn"></span>');
				}
			}
			$('.ctrl-btn').click(function(){
				var t_slide = $(this).context.getAttribute('data-slide');
				get_slide(false, t_slide);
				animate();
			});
		}

		var init = function(){

			// adding classes to ul an li tags and hiding the whole thing
			$(slides).css('display', 'none');
			$(slider).addClass('aslider').children('li').addClass('slide');
			$(slider).css({'width' : defaults.width, 'height' : defaults.height});


			// adding prev and next controls
			$(slider).append('<span class="slide-controls slide-left" data-direction="left"></span>');
			$(slider).append('<span class="slide-controls slide-right" data-direction="right"></span>');

			// adding controls
			create_ctrls();

			$('.slide-controls').click(function(){
				var direction = $(this).context.getAttribute('data-direction');
				get_slide(direction);
				animate();
			});

			animate();
		}

		//let's do it!
		init();
	}

})(jQuery);