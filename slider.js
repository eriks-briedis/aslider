/*
 * Ajax Slider v.0.1.3
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
			responsive : false, // accepts true or false
			width : 700,
			height : 400, // only if responive is set to true - slider width and height in px
			autoplay : false, // acepts true or false
			effect : 'slide', // accepts fade or slide
			effect_duration : 400, // how long it takes to go to a new slide in ms
			slide_duration : 3000 // how long one slide is displayed - with autoplay only
		};

		var wrapper = this,
			slider = $(wrapper).selector,
			slides = $(wrapper).children('li'),
			cur_slide = 0,
			prev_slide = null;

		var settings = function(){

			if( defaults.responsive == true ){
				$(window).resize(function() {
					set_slider_height();
				});
				set_slider_height();
			}else{
				$(slider).css({'width' : defaults.width, 'height' : defaults.height});
			}
		};

		//let's find the index for the next slide we need
		// @direction = undefined, right or left
		// @t_slide = int. if defined jump to that slide number
		var get_slide = function(direction, t_slide){
			prev_slide = cur_slide; // storing the last slide for animations
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

		// function for making the slider responsive
		// set width to 100%
		// set height to current image height
		var set_slider_height = function(){
			var e = $(slides).eq(cur_slide).children('img');
			defaults.height = e.height();
			$(slider).css({
					'width' : 100 + '%',
					'height' : defaults.height
				});
		};

		// let's get the animation going
		var animate = function(){

			// switch statement for animation effects
			switch(defaults.effect){
				case 'fade':
					$(slides).stop().transition({
						'opacity' : 0
					}, defaults.effect_duration).css({
						'display' : 'none'
					});
					$(slides).eq(cur_slide).css({
						'opacity' : 0,
						'display' : 'block'
					}).stop().transition({
						'opacity' : 1
					}, defaults.effect_duration);
					break;
				case 'slide':
					var slider_width = $(slider).width(); // get the width of the slider for correct slide amount

					if( cur_slide > prev_slide || prev_slide == null ){
						$(slides).eq(cur_slide).css({
							'display' : 'block',
							'left' : -slider_width
						}).animate({
							'left' : 0
						}, defaults.effect_duration, 'swing');

						if( prev_slide != null ){
							$(slides).eq(prev_slide).animate({
								'left' : slider_width
							}, defaults.effect_duration, 'swing', function(){
								$(slides).eq(prev_slide).css({
									'display' : 'none'
								});
							});
						}
					}else{
						// slide right to left
						$(slides).eq(cur_slide).css({
							'display' : 'block',
							'left' : slider_width,
							'z-index' : 100
						}).animate({
							'left' : 0
						}, defaults.effect_duration);

						$(slides).eq(prev_slide).animate({
							'left' : -slider_width
						}, 'swing', function(){
							$(this).css({
								'display' : 'none',
								'z-index' : 0
							});
						});
					}
					break;
				default:
					alert('Not a recognized effect');
					break;
			}
			create_ctrls();

			// if autoplay is enabled
			// setting a timer for each slide
			if( defaults.autoplay == true ){
				setTimeout(function(){
					get_slide();
					animate();
				}, defaults.slide_duration);
			}

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
			settings();

		}

		//let's do it!
		init();
	}

})(jQuery);